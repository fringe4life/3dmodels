import { vi } from "bun:test";

vi.mock("next/navigation", () => {
  const push = vi.fn();
  const replace = vi.fn();
  const back = vi.fn();
  const forward = vi.fn();
  const prefetch = vi.fn();
  return {
    useRouter: () => ({ push, replace, back, forward, prefetch }),
    usePathname: () => "/test-path",
    useSearchParams: () => new URLSearchParams(""),
  };
});

vi.mock("next/headers", () => {
  return { headers: () => new Map() };
});

vi.mock("next/cookies", () => {
  return {
    cookies: () => ({
      get: vi.fn(),
      set: vi.fn(),
      delete: vi.fn(),
    }),
  };
});
