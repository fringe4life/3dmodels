import type { ReactDoctorConfig } from "react-doctor/api";

export default {
  deadCode: false,
  ignore: {
    files: ["styled-system/**", "docs/**"],
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
        files: ["src/features/auth/actions/sign-out-action.ts"],
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
