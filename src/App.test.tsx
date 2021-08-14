import { fireEvent, render, screen } from "@testing-library/react";

import App, { replaceCamelWithSpaces } from "./App";

// Use roles as much as possible to ensure app is accessible to screen readers
// https://www.w3.org/TR/wai-aria/#role_definitions
describe("Color button", () => {
  test("Should have correct initial color and initial text", () => {
    render(<App />);
    const colorButton = screen.getByRole("button", {
      name: "Change to Midnight Blue",
    });
    expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

    fireEvent.click(colorButton);
    expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
    expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
  });

  test("Should be enabled by default, checkbox not checked", () => {
    render(<App />);
    const checkbox = screen.getByRole("checkbox", { name: "Disabled" });
    expect(checkbox).not.toBeChecked();

    const colorButton = screen.getByRole("button", {
      name: "Change to Midnight Blue",
    });
    expect(colorButton).toBeEnabled();
  });

  test("Should be disabled on checkbox check", () => {
    render(<App />);
    const checkbox = screen.getByRole("checkbox", { name: "Disabled" });
    const colorButton = screen.getByRole("button", {
      name: "Change to Midnight Blue",
    });

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(colorButton).toBeDisabled();
    expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(colorButton).toBeEnabled();
    expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

    fireEvent.click(colorButton);
    fireEvent.click(checkbox);
    expect(colorButton).toBeDisabled();
    expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
    fireEvent.click(checkbox);
    expect(colorButton).toBeEnabled();
    expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
  });
});

describe("replaceCamelWithSpaces", () => {
  test("Works for no inner Capital letters", () => {
    expect(replaceCamelWithSpaces("red")).toBe("red");
  });

  test("Works for one inner Capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner Capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
