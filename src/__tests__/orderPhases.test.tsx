import { render, screen } from "@testing-library/react"; // App is already wrapped inside providers
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import { server } from "../mocks/server";
import App from "../App";

describe("Order phases happy path", () => {
  test("Should go through order phases correctly", async () => {
    render(<App />);

    // ****** inProgress Phase ******
    const inProgressHeadline = screen.getByRole("heading", {
      name: "Design Your Sundae!",
    });
    expect(inProgressHeadline).toBeInTheDocument();

    // Totals start off as $0.00
    const scoopsTotal = screen.getByText("scoops total", { exact: false });
    expect(scoopsTotal).toHaveTextContent("0.00");
    const toppingsTotal = screen.getByText("toppings total", {
      exact: false,
    });
    expect(toppingsTotal).toHaveTextContent("0.00");
    const grandTotal = screen.getByText("Grand total", { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");

    // Add scoops and toppings - await and find because scoops/toppings are added async
    const vanillaScoopInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaScoopInput);
    userEvent.type(vanillaScoopInput, "2");

    const hotFudgeToppingCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    userEvent.click(hotFudgeToppingCheckbox);

    // Click order button and go to review summary phase
    const reviewButton = screen.getByRole("button", { name: "Order" });
    reviewButton.click();

    // ****** review (summary) Phase ******
    const reviewHeadline = screen.getByRole("heading", {
      name: "Order Summary",
    });
    expect(reviewHeadline).toBeInTheDocument();

    // Check summary info
    const scoopsSummary = screen.getByRole("heading", { name: /scoops: \$/i });
    expect(scoopsSummary).toHaveTextContent("4.00");
    const toppingsSummary = screen.getByRole("heading", {
      name: /toppings: \$/i,
    });
    expect(toppingsSummary).toHaveTextContent("1.00");
    const totalSummary = screen.getByRole("heading", { name: /total: \$/i });
    expect(totalSummary).toHaveTextContent("5.00");
    const options = screen.getAllByRole("listitem");
    const optionsText = options.map((op) => op.textContent);
    expect(optionsText).toEqual(["2 x Vanilla", "Hot fudge"]);
    // expect(screen.getByText("2 x Vanilla")).toBeInTheDocument();
    // expect(screen.getByText("Hot fudge")).toBeInTheDocument();

    // Accept terms and click confirm, go to complete page
    const termsCheckbox = screen.getByRole("checkbox");
    termsCheckbox.click();

    const completeButton = screen.getByRole("button", {
      name: "Confirm Order",
    });
    completeButton.click();

    // ****** complete Phase ******
    const mockOrderNumber = Math.floor(Math.random() * 10000000000);
    server.resetHandlers(
      rest.post("http://localhost:3030/order", (req, res, ctx) => {
        return res(ctx.json({ orderNumber: mockOrderNumber }));
      })
    );

    // Check we have order number, click new order
    screen.getByText("Loading...");

    await screen.findByRole("heading", { name: "Thank You!" });
    screen.getByText(`Your order number is ${mockOrderNumber}`);

    const resetButton = screen.getByRole("button", {
      name: "Create new order",
    });
    resetButton.click();

    // Reset msw server to have default routes and handlers
    server.resetHandlers();

    // Check subtotals to be reset
    const completeHeadline = screen.getByRole("heading", {
      name: "Design Your Sundae!",
    });
    expect(completeHeadline).toBeInTheDocument();

    // setTimeoue 0 to give context time to update state
    setTimeout(() => {
      const grandTotalReset = screen.getByText("Grand total", { exact: false });
      expect(grandTotalReset).toHaveTextContent("0.00");

      const scoopsTotalReset = screen.getByText("scoops total", {
        exact: false,
      });
      expect(scoopsTotalReset).toHaveTextContent("0.00");

      const toppingsTotalReset = screen.getByText("toppings total", {
        exact: false,
      });
      expect(toppingsTotalReset).toHaveTextContent("0.00");
    }, 0);

    // await state updates to get rid of jest async warnings
    // Can also move the below await & finds up before assertions to avoid using setTimeout
    await screen.findByAltText(/vanilla scoop/i);
    await screen.findByAltText(/M&Ms topping/i);
  });
});
