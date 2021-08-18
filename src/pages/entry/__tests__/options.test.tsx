import userEvent from "@testing-library/user-event";

import { render, screen } from "../../../test-utils";
import { scoops, toppings } from "../../../mocks/handlers";
import Options from "../options";

describe("Options", () => {
  test("Should display image for each scoop from server", async () => {
    render(<Options optionType="scoops" />);

    // When waiting for anything to appear asynchronously, must use `await findBy`
    const scoopImages = (await screen.findAllByRole("img", {
      name: /scoop$/i,
    })) as HTMLImageElement[];

    // Confirm length
    expect(scoopImages).toHaveLength(scoops.length);

    // Confirm alt text
    const scoopImagesAlt = scoopImages.map((img) => img.alt);
    expect(scoopImagesAlt).toEqual(scoops.map((s) => `${s.name} scoop`));
  });

  test("Should display image for each topping from server", async () => {
    render(<Options optionType="toppings" />);

    const toppingImages = (await screen.findAllByRole("img", {
      name: /topping$/i,
    })) as HTMLImageElement[];

    expect(toppingImages).toHaveLength(toppings.length);

    const toppingImagesAlt = toppingImages.map((img) => img.alt);

    expect(toppingImagesAlt).toEqual(toppings.map((t) => `${t.name} topping`));
  });

  // Skip because conflict with next text
  test.skip("Should display input error when scoop input is invalid", async () => {
    render(<Options optionType="scoops" />);

    const scoopInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    userEvent.clear(scoopInput);
    expect(scoopInput).not.toHaveClass("is-invalid");

    userEvent.type(scoopInput, "-1");
    expect(scoopInput).toHaveClass("is-invalid");

    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, "11");
    expect(scoopInput).toHaveClass("is-invalid");

    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, "1.5");
    expect(scoopInput).toHaveClass("is-invalid");
  });

  test("Should not update scoops total with invalid input", async () => {
    render(<Options optionType="scoops" />);

    const scoopInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    const scoopsTotal = screen.getByText("Scoops total: $", { exact: false });

    userEvent.clear(scoopInput);
    expect(scoopsTotal).toHaveTextContent("0.00");

    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, "1");
    expect(scoopsTotal).toHaveTextContent("2.00");

    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, "-1");
    expect(scoopsTotal).toHaveTextContent("0.00");
  });
});
