import type { ReactDoctorConfig } from "react-doctor/api";

export default {
  serverAuthFunctionNames: ["getUser"],
  deadCode: false,
  scope: "full",
  verbose: true,
  share: false,
  ignore: {
    files: ["styled-system/**", "docs/**"],
    overrides: [
      {
        files: ["src/app/3d-models/@results/**"],
        rules: ["react-doctor/nextjs-missing-metadata"],
      },
      {
        files: ["src/db/seed.ts"],
        rules: [
          "react-doctor/async-parallel",
          "react-doctor/async-await-in-loop",
        ],
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
} satisfies ReactDoctorConfig;
