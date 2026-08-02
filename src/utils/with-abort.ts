/**
 * Reject when `signal` aborts. Does not cancel the underlying operation —
 * only stops awaiting it (needed for APIs with no AbortSignal support).
 */
export const withAbort = <T>(
  promise: Promise<T>,
  signal: AbortSignal,
): Promise<T> => {
  if (signal.aborted) {
    return Promise.reject(
      signal.reason ?? new DOMException("Aborted", "AbortError"),
    );
  }

  return new Promise<T>((resolve, reject) => {
    let settled = false;

    const onAbort = () => {
      if (settled) {
        return;
      }
      settled = true;
      signal.removeEventListener("abort", onAbort);
      reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
    };

    signal.addEventListener("abort", onAbort, { once: true });

    promise.then(
      (value) => {
        if (settled) {
          return;
        }
        settled = true;
        signal.removeEventListener("abort", onAbort);
        resolve(value);
      },
      (error: unknown) => {
        if (settled) {
          return;
        }
        settled = true;
        signal.removeEventListener("abort", onAbort);
        reject(error);
      },
    );
  });
};

/**
 * Merge optional signals (e.g. `cacheSignal()` may be `null`) into one.
 */
export const toCombinedAbortSignal = (
  ...signals: Array<AbortSignal | null | undefined>
): AbortSignal => {
  const active = signals.filter((signal): signal is AbortSignal =>
    Boolean(signal),
  );

  if (active.length === 0) {
    return new AbortController().signal;
  }

  if (active.length === 1) {
    const [only] = active;
    return only;
  }

  return AbortSignal.any(active);
};
