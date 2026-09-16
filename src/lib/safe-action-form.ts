interface EchoableFormField {
  readonly name: string;
  readonly type: string;
}

/**
 * Read a non-secret field from `useStateAction`'s last `input`.
 * Password types stay out of `defaultValue`. Hook `input` is client FormData, not a server echo.
 * Lives here — `safe-action.ts` is `server-only`.
 */
const lastNonSecretFormValue = (
  input: unknown,
  field: EchoableFormField,
): string | undefined => {
  if (field.type === "password" || !(input instanceof FormData)) {
    return undefined;
  }
  const value = input.get(field.name);
  return typeof value === "string" ? value : undefined;
};

export { lastNonSecretFormValue };
