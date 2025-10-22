import { Suspense } from "react";
import CategoriesNav, {
  CategoriesNavFallback,
} from "@/features/categories/components/categories-nav";

export default function CategoriesNavCatchAllPage() {
  return (
    <Suspense fallback={<CategoriesNavFallback />}>
      <CategoriesNav />
    </Suspense>
  );
}
