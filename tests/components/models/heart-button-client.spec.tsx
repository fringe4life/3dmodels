/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it, vi } from "bun:test";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toggleLike } from "../../../src/features/models/likes/actions/toggle-like";
import { HeartButtonClient } from "../../../src/features/models/likes/components/heart-button-client";

vi.mock("@/features/models/likes/actions/toggle-like", () => ({
  toggleLike: vi.fn(async (_prev: unknown, _formData: FormData) => ({
    data: { hasLiked: true, likes: 3 },
  })),
}));

afterEach(() => {
  cleanup();
});

const baseProps = {
  hasLiked: false,
  likes: 2,
  slug: "m1",
} as const;

describe("HeartButtonClient", () => {
  it("renders like control for authenticated user", async () => {
    const user = userEvent.setup();
    render(
      <HeartButtonClient
        hasLiked={false}
        isAuthenticated={true}
        likes={2}
        slug="m1"
        toggleAction={toggleLike}
      />,
    );
    const btn = screen.getByRole("button", { name: /^like this model$/i });
    expect(btn).toBeDefined();
    expect(screen.queryByText("Sign in to like this model")).toBeNull();
    expect(document.querySelector("[popover]")).toBeNull();
    await user.click(btn);
  });

  it("renders a sign-in link for unauthenticated users", async () => {
    const user = userEvent.setup();
    const toggleAction = vi.fn();
    render(
      <HeartButtonClient
        {...baseProps}
        isAuthenticated={false}
        toggleAction={toggleAction}
      />,
    );

    const signInLink = screen.getByRole("link", {
      name: /^sign in to like this model$/i,
    });
    expect(signInLink.getAttribute("href")).toBe("/signin");
    expect(signInLink.hasAttribute("disabled")).toBe(false);
    expect(
      screen.queryByRole("button", { name: /^sign in to like this model$/i }),
    ).toBeNull();

    const hint = document.querySelector("[popover='hint']");
    expect(hint).not.toBeNull();
    expect(hint?.textContent?.trim()).toBe("Sign in to like this model");
    expect(hint?.getAttribute("role")).toBe("tooltip");

    await user.click(signInLink);
    expect(toggleAction).not.toHaveBeenCalled();
  });

  it("keeps the optimistic like count while the action is in flight", async () => {
    const user = userEvent.setup();
    const deferred = Promise.withResolvers<{
      data: { hasLiked: boolean; likes: number };
    }>();
    const toggleAction = vi.fn(
      (_prev: unknown, _formData: FormData) => deferred.promise,
    );

    render(
      <HeartButtonClient
        {...baseProps}
        disableTransition={true}
        isAuthenticated={true}
        toggleAction={toggleAction}
      />,
    );

    const button = screen.getByRole("button", { name: /^like this model$/i });
    expect(button.textContent).toContain("2");

    await user.click(button);

    await waitFor(() => {
      expect(button.textContent).toContain("3");
    });

    await Promise.resolve();
    await Promise.resolve();

    expect(button.textContent).toContain("3");
    expect(button.textContent).not.toMatch(/\b2\b/);

    deferred.resolve({ data: { hasLiked: true, likes: 3 } });

    await waitFor(() => {
      expect(button.textContent).toContain("3");
    });
  });

  it("keeps field error outside the like button", async () => {
    const user = userEvent.setup();
    const toggleAction = vi.fn(async (_prev: unknown, _formData: FormData) => ({
      validationErrors: {
        fieldErrors: { slug: ["Model slug is required"] },
        formErrors: [],
      },
    }));

    render(
      <HeartButtonClient
        {...baseProps}
        disableTransition={true}
        isAuthenticated={true}
        toggleAction={toggleAction}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /^like this model$/i }),
    );

    await waitFor(() => {
      expect(toggleAction).toHaveBeenCalled();
    });

    const fieldError = await screen.findByTestId("field-error-slug");
    const likeButton = screen.getByRole("button", {
      name: /^like this model$/i,
    });
    expect(likeButton.contains(fieldError)).toBe(false);
    expect(fieldError.closest("form")).not.toBeNull();
  });
});
