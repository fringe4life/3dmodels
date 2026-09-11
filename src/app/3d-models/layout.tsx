import { css, keyframes } from "@styled-system/css";
import { grid, gridItem } from "@styled-system/patterns";
import { NuqsAdapterBoundary } from "@/components/nuqs/nuqs-adapter-boundary";

/** Horizontal category strip: edge fade follows self-scroll (see 3d-models layout) */
const categoriesScrollMask = keyframes({
  "0%": {
    maskImage: "linear-gradient(to right, black 95%, transparent 100%)",
  },
  "5%": {
    maskImage:
      "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
  },
  "95%": {
    maskImage:
      "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
  },
  "100%": {
    maskImage: "linear-gradient(to right, transparent 0%, black 5%)",
  },
});

const ModelsLayout = ({
  children,
  categories,
  results,
}: LayoutProps<"/3d-models">) => (
  <NuqsAdapterBoundary>
    <div
      className={grid({
        columnGap: { md: 20 },
        gridTemplateColumns: {
          md: "token(sizes.categoryWidthTablet) 1fr",
        },
        gridTemplateRows: { base: "min-content 1fr", md: "1fr" },
        minBlockSize: "full",
      })}
    >
      <aside
        className={gridItem({
          backgroundColor: "white",
          borderBottomWidth: { base: 2, md: 0 },
          borderColor: "gray.200",
          colStart: { md: 1 },
          maxInlineSize: { base: "100dvw", md: "categoryWidthTablet" },
          position: "relative",
        })}
      >
        <nav
          className={css({
            _notSupportsScroll: {
              maskImage:
                "linear-gradient(to right, black 95%, transparent 100%)",
              md: { maskImage: "none" },
            },
            _supportsScroll: {
              animationDuration: "auto",
              animationFillMode: "both",
              animationName: categoriesScrollMask,
              animationRange: "0% 100%",
              animationTimeline: "scroll(self inline)",
              animationTimingFunction: "glide",
            },
            md: {
              insetBlockStart: "6.5rem",
              maxBlockSize: "calc(100dvh - 7.5rem)",
              overflowX: "hidden",
              overflowY: "auto",
              position: "sticky",
            },
            overflowX: "auto",
            position: "sticky",
            scrollbar: "hidden",
          })}
        >
          {categories}
        </nav>
      </aside>
      <section
        className={gridItem({
          alignSelf: "start",
          padding: 4,
        })}
      >
        {children}
        {results}
      </section>
    </div>
  </NuqsAdapterBoundary>
);

export default ModelsLayout;
