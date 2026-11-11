import type { ReactDoctorConfig } from "react-doctor/api";

export default {
  deadCode: false,
  ignore: {
    // Generated / local-only trees (also gitignored). Without this, leftover
    // Playwright HTML-report bundles are scanned as app JS and trip
    // insecure-crypto-risk on vendor Math.random / hash helpers.
    files: [
      "styled-system/**",
      "docs/**",
      "playwright-report/**",
      "test-results/**",
      "blob-report/**",
    ],
    overrides: [
      {
        files: ["src/app/3d-models/@results/**"],
        rules: ["react-doctor/nextjs-missing-metadata"],
      },

      {
        files: [
          "src/features/auth/actions/sign-in-action.ts",
          "src/features/auth/actions/sign-up-action.ts",
        ],
        rules: ["react-doctor/nextjs-no-redirect-in-try-catch"],
      },
      {
        files: ["src/lib/auth/sign-out-action.ts"],
        rules: ["react-doctor/server-auth-actions"],
      },
    ],
  },
  scope: "full",
  serverAuthFunctionNames: ["getUser"],
  share: false,
  verbose: true,
} satisfies ReactDoctorConfig;

// run in terminal
// export _VARLOCK_ENV_KEY="$(bun x varlock generate-key --plain)"
