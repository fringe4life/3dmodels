import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { FormError } from "../../../src/components/form/form-error";

const FORM_ERROR_MESSAGE = "Invalid email or password";

describe("FormError", () => {
  afterEach(cleanup);

  it("announces a serverError as an alert", () => {
    render(<FormError isPending={false} serverError={FORM_ERROR_MESSAGE} />);

    const alert = screen.getByRole("alert");
    expect(alert.getAttribute("data-testid")).toBe("form-error");
    expect(alert.textContent).toBe(FORM_ERROR_MESSAGE);
  });

  it("does not announce when there is no serverError", () => {
    render(<FormError isPending={false} />);

    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.queryByTestId("form-error")).toBeNull();
  });

  it("does not announce while pending", () => {
    render(<FormError isPending serverError={FORM_ERROR_MESSAGE} />);

    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.queryByTestId("form-error")).toBeNull();
  });

  it("does not announce when serverError is undefined", () => {
    render(<FormError isPending={false} serverError={undefined} />);

    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.queryByTestId("form-error")).toBeNull();
  });
});
