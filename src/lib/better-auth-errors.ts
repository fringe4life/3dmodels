// Helper function to map Better Auth errors to field errors
export function mapBetterAuthErrorToFields(
  errorMessage: string,
  errorCode?: string,
): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};
  const lowerMessage = errorMessage.toLowerCase();

  // Password-related errors
  if (
    errorCode === "INVALID_PASSWORD" ||
    lowerMessage.includes("invalid password") ||
    lowerMessage.includes("incorrect password")
  ) {
    fieldErrors.password = [errorMessage];
  } else if (
    errorCode === "PASSWORD_TOO_WEAK" ||
    lowerMessage.includes("password is too weak") ||
    lowerMessage.includes("weak password")
  ) {
    fieldErrors.password = [errorMessage];
  } else if (
    errorCode === "PASSWORD_COMPROMISED" ||
    lowerMessage.includes("password is compromised")
  ) {
    fieldErrors.password = [errorMessage];
  }
  // Email-related errors
  else if (
    (lowerMessage.includes("email") &&
      (lowerMessage.includes("not found") ||
        lowerMessage.includes("invalid") ||
        lowerMessage.includes("does not exist"))) ||
    lowerMessage.includes("user already exists") ||
    lowerMessage.includes("email already registered")
  ) {
    fieldErrors.email = [errorMessage];
  }

  return fieldErrors;
}
