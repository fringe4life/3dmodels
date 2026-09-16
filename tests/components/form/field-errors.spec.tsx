import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import {
  type ActionFieldErrors,
  FieldError,
} from "../../../src/components/form/field-errors";

const EMAIL_ERROR = "Email is required";

describe("FieldError", () => {
  afterEach(cleanup);

  it("announces the first email field error as an alert", () => {
    const fieldErrors: ActionFieldErrors = {
      email: [EMAIL_ERROR, "Must be a valid email"],
    };
    render(<FieldError fieldErrors={fieldErrors} name="email" />);

    const alert = screen.getByRole("alert");
    expect(alert.getAttribute("data-testid")).toBe("field-error-email");
    expect(alert.textContent).toBe(EMAIL_ERROR);
  });

  it("does not announce when fieldErrors is empty", () => {
    render(<FieldError fieldErrors={{}} name="email" />);

    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.queryByTestId("field-error-email")).toBeNull();
  });
});
