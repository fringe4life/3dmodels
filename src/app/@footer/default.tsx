import { ViewTransition } from "react";
import { getCurrentYear } from "@/lib/date";

const FooterDefault = async () => {
  const currentYear = await getCurrentYear();
  return (
    <ViewTransition name="main-footer">
      <footer className="grid place-content-center text-gray-500 text-sm">
        <p>&copy; {currentYear} PrintForge</p>
      </footer>
    </ViewTransition>
  );
};

export default FooterDefault;
