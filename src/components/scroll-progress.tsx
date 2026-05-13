import { css } from "../../styled-system/css";

const ScrollProgress = () => (
  <div
    aria-hidden="true"
    className={css({
      pointerEvents: "none",
      position: "fixed",
      insetInline: 0,
      zIndex: 20,
      flexShrink: 0,
      display: "block",
      blockSize: 2,
      inlineSize: "full",
      backgroundColor: "gray.400/15",
      _supportsScroll: {
        opacity: 0,
        animationName: "navProgressReveal",
        animationTimingFunction: "linear",
        animationFillMode: "both",
        animationTimeline: "scroll()",
        animationRange: "100px 100%",
      },
    })}
  >
    <div
      className={css({
        inlineSize: "full",
        blockSize: "full",
        backgroundColor: "brand",
        transform: "scaleX(0)",
        transformOrigin: "inline-start",
        _supportsScroll: {
          animationName: "navProgressFill",
          animationTimingFunction: "linear",
          animationFillMode: "both",
          animationTimeline: "scroll()",
          animationRange: "0% 100%",
        },
      })}
    />
  </div>
);

export { ScrollProgress };
