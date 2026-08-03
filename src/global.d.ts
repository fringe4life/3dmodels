// my-framework/global.d.ts

import type { HTMLAttributes } from "react";

declare module "react" {
  // biome-ignore lint/style/noNamespace: React's JSX types are namespace-based.
  namespace JSX {
    interface IntrinsicElements {
      selectedcontent: HTMLAttributes<HTMLElement>;
    }
  }
}

declare global {
  interface DirectiveRegistry {
    "use cache": never;
    "use cache: private": never;
    "use cache: remote": never;
  }
  module "*.css";
}
