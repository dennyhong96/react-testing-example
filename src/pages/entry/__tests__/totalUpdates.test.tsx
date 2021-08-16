import { render, screen } from "../../../test-utils";
import userEvent from "@testing-library/user-event";

import Options from "../options";

describe("totalUpdates", () => {
  test("Should update scoop total when scoops changes", async () => {
    render(<Options optionType="scoops" />); // Redux, Context provider, router, etc

    // initial total
    const scoopSubtotal = screen.getByText("Scoops total: $", {
      exact: false, // Default is true
    });

    expect(scoopSubtotal).toHaveTextContent("0.00");

    // update scoops
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput); // Clear the input first, prevents 01 -> 10
    userEvent.type(vanillaInput, "1");
    expect(scoopSubtotal).toHaveTextContent("2.00");

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(scoopSubtotal).toHaveTextContent("6.00");
  });

  test("Should update topping total when toppings changes", async () => {
    render(<Options optionType="toppings" />);

    // Initial
    const toppingsTotal = screen.getByText("Toppings total: $", {
      exact: false,
    });
    expect(toppingsTotal).toHaveTextContent("0.00");

    // Add toppings
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    expect(toppingsTotal).toHaveTextContent("1.00");

    // Add more toppings
    const mmsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });
    userEvent.clear(mmsCheckbox);
    userEvent.click(mmsCheckbox);
    expect(toppingsTotal).toHaveTextContent("2.00");

    // Uncheck
    userEvent.click(cherriesCheckbox);
    expect(toppingsTotal).toHaveTextContent("1.00");
  });
});
