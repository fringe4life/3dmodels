/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import { expect, test } from "@playwright/test";

test.describe("mobile navigation menu", () => {
  test.use({ viewport: { height: 844, width: 390 } });

  test("closes after tapping a navigation link", async ({ page }) => {
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: /navigation menu/i });
    await menuButton.click();

    const popover = page.locator("#mobile-navigation");
    await expect(popover).toBeVisible();

    await page.getByRole("link", { name: /about/i }).click();
    await expect(page).toHaveURL(/\/about/);
    await expect(popover).toBeHidden();
  });
});

test.describe("desktop navigation", () => {
  test.use({ viewport: { height: 844, width: 768 } });

  test("shows inline nav links without the mobile menu button", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /^about$/i })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /navigation menu/i }),
    ).toBeHidden();
  });
});
