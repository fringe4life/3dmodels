import { ViewTransition } from "react";
import type { Category } from "@/db/schema/models";

type CategoriesHeaderProps = {
  category: Pick<Category, "displayName">;
  title?: string;
};

export default function CategoriesHeader({ category }: CategoriesHeaderProps) {
  return (
    <ViewTransition>
      <div className="mb-6">
        <h1 className="font-bold text-2xl text-gray-900">
          {category?.displayName} Models
        </h1>
        <p className="mt-2 text-gray-600">
          Browse our collection of {category?.displayName ?? "all"} 3D printing
          models
        </p>
      </div>
    </ViewTransition>
  );
}
