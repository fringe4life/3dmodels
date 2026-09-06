interface Success<T> {
  data: T;
  error: null;
}
interface Failure<E = unknown> {
  data: null;
  error: E;
}

type Result<T, E = unknown> = Success<T> | Failure<E>;

export const tryCatch = async <T>(
  operation: () => Promise<T>,
): Promise<Result<T>> => {
  try {
    const data = await operation();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
