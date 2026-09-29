import { css } from "@styled-system/css";
import { grid } from "@styled-system/patterns";

// Auth forms are static; session lives in root navbar (deferred via navigation()).
export const unstable_ensureStatic = "prefetch";

const AuthLayout = ({ children }: LayoutProps<"/">) => (
  <div
    className={grid({
      minBlockSize: "full",
      paddingInline: 4,
      placeContent: "center",
    })}
  >
    <div
      className={css({
        inlineSize: "full",
        marginBlockStart: 8,
        maxInlineSize: "md",
      })}
    >
      {children}
    </div>
  </div>
);

export default AuthLayout;
