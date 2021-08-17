import { render, screen, waitFor } from "../../../test-utils";
import { rest } from "msw";
import { server } from "../../../mocks/server";

import OrderEntry from "../orderEntry";
import userEvent from "@testing-library/user-event";

describe("OrderEntry", () => {
  test("Should display alert banner on error", async () => {
    // Overwrite msw handler for this test
    // server.resetHandlers resets request handlers to the initial list given to the setupServer call, or to the explicit next request handlers list, if given.
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<OrderEntry setOrderPhase={jest.fn()} />);

    // await screen.findAllByRole only await util first alert is on the screen, not both
    // await waitFor waits for the expectations to pass.
    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(2);
    });
  });

  test("Should disable order button when no scoop is selected", async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);

    const chocolateScoopInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    expect(chocolateScoopInput).toBeInTheDocument();
    userEvent.clear(chocolateScoopInput);
    userEvent.type(chocolateScoopInput, "0");

    const orderButton = screen.getByRole("button", { name: "Order" });
    expect(orderButton).toBeDisabled();

    userEvent.clear(chocolateScoopInput);
    userEvent.type(chocolateScoopInput, "1");
    expect(orderButton).toBeEnabled();

    userEvent.clear(chocolateScoopInput);
    userEvent.type(chocolateScoopInput, "0");
    expect(orderButton).toBeDisabled();
  });
});
