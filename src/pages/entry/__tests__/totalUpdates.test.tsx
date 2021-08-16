import { render, screen } from "../../../test-utils";
import userEvent from "@testing-library/user-event";

import Options from "../options";
import OrderEntry from "../orderEntry";

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

  test("Grand total should start at $0.00", async () => {
    render(<Options optionType="toppings" />);

    const toppingsTotal = screen.getByText("Toppings total: $", {
      exact: false,
    });
    expect(toppingsTotal).toHaveTextContent("0.00");

    // Add an await to end of test to avoid "Can't perform a React state update on an unmounted component" error
    await screen.findByRole("checkbox", {
      name: "Cherries",
    });
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

  test("Should update grand total correctly if scoops added first", async () => {
    render(<OrderEntry />);

    // Initial
    const grandTotal = screen.getByRole("heading", {
      name: /grand total \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");

    // Add scoop
    const chocolateScoopInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateScoopInput);
    userEvent.type(chocolateScoopInput, "1");
    expect(grandTotal).toHaveTextContent("2.00");

    // Add topping
    const hotFudgeToppingCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    userEvent.click(hotFudgeToppingCheckbox);
    expect(grandTotal).toHaveTextContent("3.00");

    // Remove topping
    userEvent.click(hotFudgeToppingCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });

  test("Should update grand total correctly if toppings added first", async () => {
    render(<OrderEntry />);

    // Initial
    const grandTotal = screen.getByRole("heading", {
      name: /grand total \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");

    // Add topping
    const hotFudgeToppingCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    userEvent.click(hotFudgeToppingCheckbox);
    expect(grandTotal).toHaveTextContent("1.00");

    // Add scoop
    const chocolateScoopInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateScoopInput);
    userEvent.type(chocolateScoopInput, "2");
    expect(grandTotal).toHaveTextContent("5.00");

    // Remove a scoop
    userEvent.type(chocolateScoopInput, "1");
    expect(grandTotal).toHaveTextContent("3.00");
  });
});
