import { getCurrentYear } from "@/lib/date";

export default async function FooterDefault() {
  const currentYear = await getCurrentYear();
  return (
    <footer className="grid place-content-center text-gray-500 text-sm">
      <p>&copy; {currentYear} PrintForge</p>
    </footer>
  );
}
