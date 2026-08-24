/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import { expect, test } from "@playwright/test";

const VALID_EMAIL = "test@example.com";
const VALID_PASSWORD = "StrongPass123!";

test("sign-in shows form error for bad credentials then succeeds after correction", async ({
  page,
}) => {
  await page.goto("/(auth)/signin");

  const emailInput = page.getByLabel(/email/i);
  const passwordInput = page.getByLabel(/password/i);

  await emailInput.fill("nope@example.com");
  await passwordInput.fill("WrongPass123!");
  await page.getByRole("button", { name: /sign in/i }).click();

  const formError = page.getByTestId("form-error");
  await expect(formError).toBeVisible();
  await expect(formError).toContainText(/invalid/i);

  await emailInput.fill("");
  await passwordInput.fill("");
  await emailInput.fill(VALID_EMAIL);
  await passwordInput.fill(VALID_PASSWORD);
  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(formError).toBeHidden();
  await expect(page).toHaveURL(/\/3d-models/);
});
