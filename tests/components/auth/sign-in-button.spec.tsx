/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it, vi } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signInGithubAction } from "../../../src/features/auth/actions/sign-in-github-action";
import { SignInButton } from "../../../src/features/auth/components/sign-in-button";

afterEach(() => {
  cleanup();
});

const successResult = {};

vi.mock("@/features/auth/actions/sign-in-github-action", () => ({
  signInGithubAction: vi.fn(async () => successResult),
}));

interface SignInGithubMock {
  mockImplementationOnce: (fn: () => never) => void;
  mockReset: () => void;
  mockResolvedValue: (value: typeof successResult) => void;
  mockResolvedValueOnce: (value: { serverError: string }) => void;
}

const signInGithub = signInGithubAction as unknown as SignInGithubMock;

const errorResult = (serverError: string) => ({ serverError });

const clickGithubSignIn = async () => {
  const user = userEvent.setup();
  render(<SignInButton />);
  await user.click(
    screen.getByRole("button", { name: /sign in with github/i }),
  );
};

describe("SignInButton GitHub OAuth errors", () => {
  afterEach(() => {
    signInGithub.mockReset();
    signInGithub.mockResolvedValue(successResult);
  });

  it("surfaces a serverError message to the user", async () => {
    signInGithub.mockResolvedValueOnce(errorResult("OAuth failed"));

    await clickGithubSignIn();

    const formError = await screen.findByTestId("form-error");
    expect(formError.textContent).toMatch(/oauth failed/i);
  });

  it("surfaces a handleServerError message", async () => {
    signInGithub.mockResolvedValueOnce(errorResult("GitHub unreachable"));

    await clickGithubSignIn();

    const formError = await screen.findByTestId("form-error");
    expect(formError.textContent).toMatch(/github unreachable/i);
  });

  it("surfaces the unknown-error fallback", async () => {
    signInGithub.mockResolvedValueOnce(
      errorResult("An unknown error occurred"),
    );

    await clickGithubSignIn();

    const formError = await screen.findByTestId("form-error");
    expect(formError.textContent).toMatch(/an unknown error occurred/i);
  });

  it("does not surface NEXT_REDIRECT as a form error", async () => {
    signInGithub.mockImplementationOnce(() => {
      throw Object.assign(new Error("NEXT_REDIRECT"), {
        digest: "NEXT_REDIRECT;replace;/;303;",
      });
    });

    const user = userEvent.setup();
    render(<SignInButton />);

    await user.click(
      screen.getByRole("button", { name: /sign in with github/i }),
    );

    expect(screen.queryByTestId("form-error")).toBeNull();
  });
});
