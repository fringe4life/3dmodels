import type { ReactDoctorConfig } from "react-doctor/api";

export default {
  serverAuthFunctionNames: ["getUser"],
  scope: "full",
  verbose: true,
  share: false,
  ignore: {
    files: ["styled-system", "docs"],
    rules: [
      "react-doctor/only-export-components",
      "react-doctor/server-auth-actions",
      "deslop/unused-file",
      "deslop/unused-dependency",
      "deslop/unused-dev-dependency",
    ],
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
    ],
  },
} satisfies ReactDoctorConfig;
