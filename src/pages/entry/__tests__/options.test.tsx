import { render, screen } from "@testing-library/react";

import Options from "../options";

describe("options", () => {
  test("Should display image for each scoop from server", async () => {
    render(<Options optionType="scoops" />);

    // When waiting for anything to appear asynchronously, must use `await findBy`
    const images = (await screen.findAllByRole("img", {
      name: /scoop$/i,
    })) as HTMLImageElement[];

    // Confirm length
    expect(images).toHaveLength(2);

    // Confirm alt text
    const imagesAltText = images.map((img) => img.alt);
    expect(imagesAltText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });
});
