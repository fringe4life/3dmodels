import { FaArrowUp } from "react-icons/fa";
import { css } from "../../styled-system/css";
import { square } from "../../styled-system/patterns";

// className="fixed inset-be-5 inset-e-5 z-1000 translate-x-28 rounded-full bg-white to-top-link p-2.5 shadow-gray-300 shadow-sm transition-transform duration-200 ease-out hover:bg-gray-200"
const TopLink = () => (
  <a
    className={css({
      position: "fixed",
      insetBlockEnd: 5,
      insetInlineEnd: 5,
      zIndex: 1000,
      translate: "token(sizes.28) 0",
      rounded: "full",
      backgroundColor: { base: "bg.surface", _hover: "bg.muted" },
      padding: 2,
      shadow: "sm",
      shadowColor: "gray.300/20",
      transitionProperty: "translate",
      transitionDuration: "normal",
      transitionTimingFunction: { base: "ease-out", _supportsLinear: "glide" },
      "@container scroll-state(scrollable: top)": {
        translate: "0",
      },
    })}
    href="#top"
  >
    <FaArrowUp className={square({ size: "5" })} />
    <span className={css({ srOnly: true })}>Back to top</span>
  </a>
);

export { TopLink };
