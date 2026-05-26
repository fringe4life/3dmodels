import { css } from "@styled-system/css";
import { circle } from "@styled-system/patterns";
import { FaArrowUp } from "react-icons/fa";

const TopLink = () => (
  <a
    className={circle({
      size: 10,
      position: "fixed",
      insetBlockEnd: 5,
      insetInlineEnd: 5,
      zIndex: 1000,
      translate: "token(sizes.28) 0",
      backgroundColor: { base: "bg.surface", _hover: "bg.muted" },
      padding: 2,
      shadow: "sm",
      shadowColor: "gray.300/20",
      transitionProperty: "translate,colors",
      transitionDuration: "normal",
      transitionTimingFunction: { base: "ease-out", _supportsLinear: "glide" },
      "@container scroll-state(scrollable: top)": {
        translate: "0",
      },
    })}
    href="#top"
  >
    <FaArrowUp />
    <span className={css({ srOnly: true })}>Back to top</span>
  </a>
);

export { TopLink };
