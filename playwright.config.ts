import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: [["list"], ["html", { open: "never" }]],
  retries: 0,
  testDir: "./tests/e2e",
  timeout: 30_000,
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3000",
    headless: true,
    trace: "retain-on-failure",
  },
});
