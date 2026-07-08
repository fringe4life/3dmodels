import { css } from "@styled-system/css";

const ScrollProgress = () => (
  <div
    aria-hidden="true"
    className={css({
      _supportsScroll: {
        animationFillMode: "both",
        animationName: "navProgressReveal",
        animationRange: "100px 100%",
        animationTimeline: "scroll()",
        animationTimingFunction: "linear",
        opacity: 0,
      },
      backgroundColor: "gray.400/15",
      blockSize: 2,
      display: "block",
      flexShrink: 0,
      inlineSize: "full",
      insetInline: 0,
      pointerEvents: "none",
      position: "fixed",
      zIndex: 20,
    })}
  >
    <div
      className={css({
        _supportsScroll: {
          animationFillMode: "both",
          animationName: "navProgressFill",
          animationRange: "0% 100%",
          animationTimeline: "scroll()",
          animationTimingFunction: "linear",
        },
        backgroundColor: "brand",
        blockSize: "full",
        inlineSize: "full",
        transform: "scaleX(0)",
        transformOrigin: "inline-start",
      })}
    />
  </div>
);

export { ScrollProgress };
