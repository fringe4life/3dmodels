// my-framework/global.d.ts
declare global {
  // biome-ignore lint/style/useConsistentTypeDefinitions: example
  interface DirectiveRegistry {
    "use cache": never;
  }
}

export {};
