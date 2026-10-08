/**
 * Instant-navigation shells under Partial Prefetching + ensureStatic.
 *
 * Expects an already-running app at E2E_BASE_URL / http://localhost:3000
 * (playwright.config has no webServer — same as other e2e specs).
 *
 * Prefer production (`EXPOSE_TESTING_API=1 bun run build` then `bun run start`)
 * so Link prefetch={true} warms like production. `next dev` enables the
 * testing API automatically but may not prefetch the same way.
 *
 * Deliberately skips asserting session auth chrome (Sign In / avatar) as
 * instant — getUser() awaits navigation(), so that UI fills after navigate.
 */
/** biome-ignore-all lint/performance/useTopLevelRegex: test */

import { instant } from "@next/playwright";
import { expect, test } from "@playwright/test";

test.describe("instant marketing / auth shells", () => {
  test.use({ viewport: { height: 900, width: 1024 } });

  test("about is instant on client nav from home", async ({ page }) => {
    await page.goto("/");
    // Warm Link prefetch={true} for /about before locking navigations.
    await page.getByRole("link", { name: /^about$/i }).hover();
    await page.waitForLoadState("networkidle");

    await instant(page, async () => {
      await page.getByRole("link", { name: /^about$/i }).click();
      await page.waitForURL((url) => url.pathname === "/about");
      await expect(
        page.getByRole("heading", { name: /about printforge/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: /empowering makers worldwide/i }),
      ).toBeVisible();
    });
  });

  test("sign in is instant on client nav from home", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /sign in/i }).hover();
    await page.waitForLoadState("networkidle");

    await instant(page, async () => {
      await page.getByRole("link", { name: /sign in/i }).click();
      await page.waitForURL((url) => url.pathname === "/signin");
      await expect(
        page.getByRole("heading", { name: /sign in to your account/i }),
      ).toBeVisible();
      await expect(page.getByLabel(/email address/i)).toBeVisible();
    });
  });

  test("home is instant on client nav from about via logo", async ({
    page,
  }) => {
    await page.goto("/about");
    // Logo is a raw <Link prefetch>, not NavLink — About/Sign-in specs miss this path.
    await page
      .getByRole("link", { name: /go to the printforge homepage/i })
      .hover();
    await page.waitForLoadState("networkidle");

    await instant(page, async () => {
      await page
        .getByRole("link", { name: /go to the printforge homepage/i })
        .click();
      await page.waitForURL((url) => url.pathname === "/");
      await expect(
        page.getByRole("heading", {
          name: /discover what's possible with 3d printing/i,
        }),
      ).toBeVisible();
      await expect(
        page.getByText(/your go-to platform for 3d printing files/i),
      ).toBeVisible();
    });
  });

  test("about is instant on initial page load", async ({ page, baseURL }) => {
    await instant(
      page,
      async () => {
        await page.goto("/about");
        await expect(
          page.getByRole("heading", { name: /about printforge/i }),
        ).toBeVisible();
        await expect(
          page.getByRole("heading", { name: /empowering makers worldwide/i }),
        ).toBeVisible();
      },
      { baseURL: baseURL ?? undefined },
    );
  });
});
