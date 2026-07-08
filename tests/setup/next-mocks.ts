import { vi } from "bun:test";

vi.mock("next/navigation", () => {
  const push = vi.fn();
  const replace = vi.fn();
  const back = vi.fn();
  const forward = vi.fn();
  const prefetch = vi.fn();
  return {
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
