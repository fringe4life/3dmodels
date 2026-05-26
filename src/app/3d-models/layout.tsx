import { css } from "@styled-system/css";
import { grid, gridItem } from "@styled-system/patterns";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const ModelsLayout = ({
  children,
  categories,
  results,
}: LayoutProps<"/3d-models">) => (
  <NuqsAdapter>
    <div
      className={grid({
        minBlockSize: "full",
        gridTemplateRows: { base: "min-content 1fr", md: "1fr" },
        gridTemplateColumns: {
          md: "token(sizes.categoryWidthTablet) 1fr",
        },
        columnGap: { md: 20 },
      })}
    >
      <aside
        className={gridItem({
          maxInlineSize: { base: "100dvw", md: "categoryWidthTablet" },
          position: "relative",
          borderBottomWidth: { base: 2, md: 0 },
          borderColor: "gray.200",
          backgroundColor: "white",
          colStart: { md: 1 },
        })}
      >
        <nav
          className={css({
            position: "sticky",
            overflowX: "auto",
            md: {
              insetBlockStart: "50%",
              translate: "0 -50%",
              overflow: "visible",
              position: "fixed",
            },
            scrollbar: "hidden",
            _supportsScroll: {
              animationName: "categoriesScrollMask",
              animationDuration: "auto",
              animationTimingFunction: "glide",
              animationFillMode: "both",
              animationTimeline: "scroll(self inline)",
              animationRange: "0% 100%",
            },
            _notSupportsScroll: {
              maskImage:
                "linear-gradient(to right, black 95%, transparent 100%)",
              md: { maskImage: "none" },
            },
          })}
        >
          {categories}
        </nav>
      </aside>
      <section
        className={gridItem({
          alignSelf: "center",
          padding: 4,
        })}
      >
        {children}
        {results}
      </section>
    </div>
  </NuqsAdapter>
);

export default ModelsLayout;
