import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { FormError } from "../../../src/components/form/form-error";
import type { ActionState } from "../../../src/utils/to-action-state/types";

const FORM_ERROR_MESSAGE = "Invalid email or password";

const errorState = (message: string): ActionState => ({
  fieldErrors: {},
  message,
  status: "ERROR",
  timestamp: 1,
});

const successState = (message: string): ActionState => ({
  fieldErrors: {},
  message,
  status: "SUCCESS",
  timestamp: 1,
});

describe("FormError", () => {
  afterEach(cleanup);

  it("announces an ERROR ActionState message as an alert", () => {
    render(
      <FormError
        actionState={errorState(FORM_ERROR_MESSAGE)}
        isPending={false}
      />,
    );

    const alert = screen.getByRole("alert");
    expect(alert.getAttribute("data-testid")).toBe("form-error");
    expect(alert.textContent).toBe(FORM_ERROR_MESSAGE);
  });

  it("does not announce SUCCESS ActionState", () => {
    render(
      <FormError actionState={successState("Signed in")} isPending={false} />,
    );

    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.queryByTestId("form-error")).toBeNull();
  });

  it("does not announce while pending", () => {
    render(
      <FormError actionState={errorState(FORM_ERROR_MESSAGE)} isPending />,
    );

    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.queryByTestId("form-error")).toBeNull();
  });

  it("does not announce when actionState is null", () => {
    render(<FormError actionState={null} isPending={false} />);

    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.queryByTestId("form-error")).toBeNull();
  });
});
