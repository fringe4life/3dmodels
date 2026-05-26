import { css } from "@styled-system/css";
import { grid } from "@styled-system/patterns";

const AuthLayout = ({ children }: LayoutProps<"/">) => (
  <div
    className={grid({
      minBlockSize: "full",
      placeContent: "center",
      paddingInline: 4,
    })}
  >
    <div
      className={css({
        inlineSize: "full",
        maxInlineSize: "md",
        marginBlockStart: 8,
      })}
    >
      {children}
    </div>
  </div>
);

export default AuthLayout;
