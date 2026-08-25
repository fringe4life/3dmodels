import { vi } from "bun:test";

const RedirectType = {
  push: "push",
  replace: "replace",
} as const;

vi.mock("next/navigation", () => {
  const push = vi.fn();
  const replace = vi.fn();
  const back = vi.fn();
  const forward = vi.fn();
  const prefetch = vi.fn();
  return {
    RedirectType,
    redirect: vi.fn(() => {
      throw new Error("NEXT_REDIRECT");
    }),
    unstable_rethrow: vi.fn((error: unknown) => {
      throw error;
    }),
    usePathname: () => "/test-path",
    useRouter: () => ({ back, forward, prefetch, push, replace }),
    useSearchParams: () => new URLSearchParams(""),
  };
});

vi.mock("next/headers", () => ({ headers: () => new Map() }));

vi.mock("next/cookies", () => ({
  cookies: () => ({
    delete: vi.fn(),
    get: vi.fn(),
    set: vi.fn(),
  }),
}));
