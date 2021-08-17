import { render, screen, waitFor } from "@testing-library/react"; // App is already wrapped inside providers
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import { server } from "../mocks/server";
import App from "../App";

describe("Order phases happy path", () => {
  test("Should go through order phases correctly", async () => {
    render(<App />);

    // ****** inProgress Phase ******
    screen.getByRole("heading", {
      name: "Design Your Sundae!",
    });

    // Totals start off as $0.00
    const scoopsTotal = screen.getByText("scoops total", { exact: false });
    expect(scoopsTotal).toHaveTextContent("0.00");

    const toppingsTotal = screen.getByText("toppings total", {
      exact: false,
    });
    expect(toppingsTotal).toHaveTextContent("0.00");

    const grandTotal = screen.getByText("Grand total", { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");

    // Add scoops and toppings
    const vanillaScoopInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaScoopInput);
    userEvent.type(vanillaScoopInput, "2");

    const hotFudgeToppingCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    userEvent.click(hotFudgeToppingCheckbox);

    // Click order button
    const reviewButton = screen.getByRole("button", { name: "Order" });
    reviewButton.click();

    // ****** review Phase ******
    // Check summary info
    screen.getByRole("heading", {
      name: "Order Summary",
    });

    // Accept terms and click confirm
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
    screen.getByRole("heading", {
      name: "Design Your Sundae!",
    });

    await waitFor(async () => {
      await screen.findByAltText(/vanilla scoop/i);
      await screen.findByAltText(/M&Ms topping/i);

      const grandTotal = screen.getByText("Grand total", { exact: false });
      expect(grandTotal).toHaveTextContent("0.00");

      const scoopsTotal = screen.getByText("scoops total", { exact: false });
      expect(scoopsTotal).toHaveTextContent("0.00");

      const toppingsTotal = screen.getByText("toppings total", {
        exact: false,
      });
      expect(toppingsTotal).toHaveTextContent("0.00");
    });
  });
});
