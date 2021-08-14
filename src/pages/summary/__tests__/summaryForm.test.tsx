import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
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

  test("Popover should respond to hover", async () => {
    render(<SummaryForm />);

    // Popover starts off not on the page
    // When expecting element to not be on the document, use queryBy..., returns null
    const nullPopover = screen.queryByText(
      /no ice scream will acutally be delivered/i
    );

    expect(nullPopover).not.toBeInTheDocument();

    // Popover appears on hover
    const termsAndConditionText = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditionText);

    const popover = screen.getByText(
      /no ice scream will acutally be delivered/i
    );

    expect(popover).toBeInTheDocument();

    // Popover disappears from page on mouse out
    userEvent.unhover(termsAndConditionText);

    // waitForElementToBeRemoved is an assertion by its own
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice scream will acutally be delivered/i)
    );
  });
});
