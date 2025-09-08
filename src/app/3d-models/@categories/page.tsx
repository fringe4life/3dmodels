import CategoriesNav from "@/features/categories/components/CategoriesNav";

// This parallel route will be statically generated once at build time
// The CategoriesNav component will fetch categories data and render the list
// Client-side styling updates will be handled by usePathname hook
export default function CategoriesNavPage() {
  return <CategoriesNav />;
}
