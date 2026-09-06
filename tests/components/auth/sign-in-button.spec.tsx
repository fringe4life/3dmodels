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

const successActionState = {
  fieldErrors: {},
  message: "",
  status: "SUCCESS" as const,
  timestamp: Date.now(),
};

vi.mock("@/features/auth/actions/sign-in-github-action", () => ({
  signInGithubAction: vi.fn(async () => successActionState),
}));

interface SignInGithubMock {
  mockImplementationOnce: (fn: () => never) => void;
  mockReset: () => void;
  mockResolvedValue: (value: typeof successActionState) => void;
  mockResolvedValueOnce: (value: {
    fieldErrors: Record<string, never>;
    message: string;
    status: "ERROR";
    timestamp: number;
  }) => void;
}

const signInGithub = signInGithubAction as unknown as SignInGithubMock;

const errorActionState = (message: string) => ({
  fieldErrors: {},
  message,
  status: "ERROR" as const,
  timestamp: Date.now(),
});

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
    signInGithub.mockResolvedValue(successActionState);
  });

  it("surfaces an ERROR ActionState message to the user", async () => {
    signInGithub.mockResolvedValueOnce(errorActionState("OAuth failed"));

    await clickGithubSignIn();

    const formError = await screen.findByTestId("form-error");
    expect(formError.textContent).toMatch(/oauth failed/i);
  });

  it("surfaces a fromErrorToActionState ERROR ActionState", async () => {
    signInGithub.mockResolvedValueOnce(errorActionState("GitHub unreachable"));

    await clickGithubSignIn();

    const formError = await screen.findByTestId("form-error");
    expect(formError.textContent).toMatch(/github unreachable/i);
  });

  it("surfaces the unknown-error fallback ActionState", async () => {
    signInGithub.mockResolvedValueOnce(
      errorActionState("An unknown error occurred"),
    );

    await clickGithubSignIn();

    const formError = await screen.findByTestId("form-error");
    expect(formError.textContent).toMatch(/an unknown error occurred/i);
  });

  it("does not surface NEXT_REDIRECT as a form error", async () => {
    signInGithub.mockImplementationOnce(() => {
      throw new Error("NEXT_REDIRECT");
    });

    const user = userEvent.setup();
    render(<SignInButton />);

    await expect(
      user.click(screen.getByRole("button", { name: /sign in with github/i })),
    ).rejects.toThrow("NEXT_REDIRECT");

    expect(screen.queryByTestId("form-error")).toBeNull();
  });
});
