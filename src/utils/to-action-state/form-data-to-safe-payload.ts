/** Never echoed back through ActionState.payload (RSC → client). */
const SENSITIVE_FORM_KEYS = [
  "confirmPassword",
  "newPassword",
  "password",
] as const;

type SensitiveFormKey = (typeof SENSITIVE_FORM_KEYS)[number];

const sensitiveKeySet = new Set<string>(SENSITIVE_FORM_KEYS);

/** Full form minus secrets — use as ActionState U; payload is Partial of this. */
export type SafeFormFields<T extends Record<string, unknown>> = Omit<
  T,
  SensitiveFormKey
>;

/** FormData → plain Partial payload for ActionState; strips sensitive keys. */
export const formDataToSafePayload = <
  T extends Record<string, unknown> = Record<string, string>,
>(
  formData: FormData,
): Partial<SafeFormFields<T>> => {
  const payload: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (sensitiveKeySet.has(key)) {
      continue;
    }
    if (typeof value === "string") {
      payload[key] = value;
    }
  }

  return payload as Partial<SafeFormFields<T>>;
};
