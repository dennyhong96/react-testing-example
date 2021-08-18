import { render, screen } from "../../../test-utils";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import OrderConfirmation from "..";

describe("OrderConfirmation", () => {
  test("Should disable alert on server error", async () => {
    render(<OrderConfirmation setOrderPhase={jest.fn()} />);

    // Overwrite route & andler
    server.resetHandlers(
      rest.post("http://localhost:3030/order", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    const alertBanner = await screen.findByRole("alert");
    expect(alertBanner).toBeInTheDocument();
  });
});
