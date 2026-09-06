import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { FieldError } from "../../../src/components/form/field-errors";
import type { ActionState } from "../../../src/utils/to-action-state/types";

const EMAIL_ERROR = "Email is required";

const fieldErrorState = (
  fieldErrors: ActionState["fieldErrors"],
): ActionState => ({
  fieldErrors,
  message: "",
  status: "ERROR",
  timestamp: 1,
});

describe("FieldError", () => {
  afterEach(cleanup);

  it("announces the first email field error as an alert", () => {
    render(
      <FieldError
        actionState={fieldErrorState({
          email: [EMAIL_ERROR, "Must be a valid email"],
        })}
        name="email"
      />,
    );

    const alert = screen.getByRole("alert");
    expect(alert.getAttribute("data-testid")).toBe("field-error-email");
    expect(alert.textContent).toBe(EMAIL_ERROR);
  });

  it("does not announce when fieldErrors is empty", () => {
    render(<FieldError actionState={fieldErrorState({})} name="email" />);

    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.queryByTestId("field-error-email")).toBeNull();
  });
});
