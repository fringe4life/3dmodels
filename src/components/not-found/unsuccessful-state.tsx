import { GenericComponent } from "@/components/generic-component";
import { UnsuccessfulStateListItem } from "@/components/not-found/unsuccessful-state-list-item";
import type { UnsuccessfulStateProps } from "@/types";
import { css } from "../../../styled-system/css";
import { flex, grid } from "../../../styled-system/patterns";

const UnsuccessfulState = ({
  heading,
  subheading,
  action,
  listItems,
  isError = false,
}: UnsuccessfulStateProps) => (
  <div
    // "min-block-[60vh] mx-4 grid place-items-center p-4"
    className={grid({
      minBlockSize: "60vh",
      marginInline: 4,
      placeItems: "center",
      padding: 4,
    })}
    data-error={isError}
    data-not-found={!isError}
  >
    <div
      className={css({
        maxInlineSize: "2xl",
        spaceY: 6,
        textAlign: "center",
      })}
    >
      <div className={css({ spaceY: 2 })}>
        <h1
          className={css({
            fontWeight: "bold",
            fontSize: { base: "4xl", sm: "5xl" },
            letterSpacing: "tight",
            color: "red.500",
          })}
        >
          {heading}
        </h1>
        <p className={css({ color: "gray.600", fontSize: "lg" })}>
          {subheading}
        </p>
      </div>

      <div
        className={css({
          spaceY: 4,
          rounded: "lg",
          borderColor: "gray.200",
          backgroundColor: "white",
          padding: 6,
          textAlign: "left",
        })}
      >
        <h2 className={css({ fontWeight: "semibold", fontSize: "xl" })}>
          What you can do:
        </h2>
        <GenericComponent
          as="ul"
          Component={UnsuccessfulStateListItem}
          className={css({ spaceY: 2, color: "gray.600" })}
          items={listItems}
          renderKey={(_item, index) => index}
          renderProps={(item) => ({ text: item.text })}
        />
      </div>
      {!!action && (
        <div
          className={flex({
            direction: { base: "column", md: "row" },
            gap: 2,
            justify: { sm: "center" },
          })}
        >
          {action}
        </div>
      )}
    </div>
  </div>
);

export { UnsuccessfulState };
