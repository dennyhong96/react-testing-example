import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../summaryForm";

describe("SummaryForm component", () => {
  test("Should disable submit button by default", () => {
    render(<SummaryForm />);

    const submitButton = screen.getByRole("button", { name: /confirm order/i });
    expect(submitButton).toBeVisible();
    expect(submitButton).toBeDisabled();
  });

  test("Should enable submit button after checking the checkbox", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const submitButton = screen.getByRole("button", { name: /confirm order/i });

    expect(submitButton).toBeVisible();
    expect(checkbox).toBeVisible();
    expect(submitButton).toBeDisabled();

    userEvent.click(checkbox);
    expect(submitButton).toBeEnabled();
  });

  test("Should disable submit button after unchecking the checkbox", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const submitButton = screen.getByRole("button", { name: /confirm order/i });

    expect(submitButton).toBeVisible();
    expect(checkbox).toBeVisible();
    expect(submitButton).toBeDisabled();

    userEvent.click(checkbox);
    expect(submitButton).toBeEnabled();

    userEvent.click(checkbox);
    expect(submitButton).toBeDisabled();
  });
});
