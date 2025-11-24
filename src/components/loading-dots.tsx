import { cacheLife } from "next/cache";

// biome-ignore lint/suspicious/useAwait: needed for use cache
export default async function LoadingDots() {
  "use cache";
  cacheLife("max");
  return (
    <div className="-translate-y-1/2 loading-dots absolute top-1/2 left-95/100 text-gray-500 text-sm">
      .
    </div>
  );
}
