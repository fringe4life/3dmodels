"use client";

export default function CategoriesError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center gap-4 p-4 md:flex-col md:items-start">
      <p className="text-muted-foreground text-sm">Failed to load categories</p>
      <button
        className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </div>
  );
}
