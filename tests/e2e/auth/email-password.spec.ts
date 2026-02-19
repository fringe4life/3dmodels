/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import { expect, test } from "@playwright/test";

test("email/password sign in", async ({ page }) => {
  await page.goto("/(auth)/signin");
  await page.getByLabel(/email/i).fill("test@example.com");
  await page.getByLabel(/password/i).fill("StrongPass123!");
  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(page).toHaveURL(/\/3d-models/);
  await expect(page.getByRole("navigation")).toBeVisible();
});
