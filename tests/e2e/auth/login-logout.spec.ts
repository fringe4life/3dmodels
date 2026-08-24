/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import { expect, test } from "@playwright/test";

test("login then logout (Better Auth)", async ({ page }) => {
  // Ensure user exists (optionally run a signup step or have a test seed)
  await page.goto("/(auth)/signin");
  await page.getByLabel(/email/i).fill("test@example.com");
  await page.getByLabel(/password/i).fill("StrongPass123!");
  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(page).toHaveURL(/\/3d-models/);
  const signOut = page.getByRole("button", { name: /sign out|log out/i });
  await expect(signOut).toBeVisible();

  await signOut.click();
  await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
});
