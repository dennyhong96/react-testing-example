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
});
