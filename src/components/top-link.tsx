import { css } from "@styled-system/css";
import { circle } from "@styled-system/patterns";
import { FaArrowUp } from "react-icons/fa";

const TopLink = () => (
  <a
    className={circle({
      "@container scroll-state(scrollable: top)": {
        translate: "0",
      },
      backgroundColor: { _hover: "bg.muted", base: "bg.surface" },
      insetBlockEnd: 5,
      insetInlineEnd: 5,
      padding: 2,
      position: "fixed",
      shadow: "sm",
      shadowColor: "gray.300/20",
      size: 10,
      transitionDuration: "normal",
      transitionProperty: "translate,colors",
      transitionTimingFunction: { _supportsLinear: "glide", base: "ease-out" },
      translate: "token(sizes.28) 0",
      zIndex: 1000,
    })}
    href="#top"
  >
    <FaArrowUp />
    <span className={css({ srOnly: true })}>Back to top</span>
  </a>
);

export { TopLink };
