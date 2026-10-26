/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import { expect, test } from "@playwright/test";

test("email/password sign in", async ({ page }) => {
  await page.goto("/(auth)/signin");
  await page.getByLabel(/email/iu).fill("test@example.com");
  await page.getByLabel(/password/iu).fill("StrongPass123!");
  await page.getByRole("button", { name: /sign in/iu }).click();

  await expect(page).toHaveURL(/\/3d-models/u);
  await expect(page.getByRole("navigation")).toBeVisible();
});
