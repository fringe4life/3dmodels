import { grid } from "@styled-system/patterns";
import { ViewTransition } from "react";
import { getCurrentYear } from "@/lib/date";

const FooterDefault = async () => {
  const currentYear = await getCurrentYear();
  return (
    <ViewTransition name="main-footer">
      <footer
        className={grid({
          color: "gray.500",
          placeContent: "center",
        })}
      >
        <p>&copy; {currentYear} PrintForge</p>
      </footer>
    </ViewTransition>
  );
};

export default FooterDefault;
