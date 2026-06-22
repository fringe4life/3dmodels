import { css } from "@styled-system/css";
import { flex, grid, gridItem } from "@styled-system/patterns";
import type { ReactNode } from "react";
import { GenericComponent } from "@/components/generic-component";
import {
  UnsuccessfulStateListItem,
  type UnsuccessfulStateListItemProps,
} from "@/components/not-found/unsuccessful-state-list-item";

export interface UnsuccessfulStateProps {
  action?: ReactNode;
  heading: string;
  isError?: boolean;
  listItems: UnsuccessfulStateListItemProps[];
  subheading: string;
}

const UnsuccessfulState = ({
  heading,
  subheading,
  action,
  listItems,
  isError = false,
}: UnsuccessfulStateProps) => (
  <div
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
      className={gridItem({
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
            color: "error",
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
          borderColor: "border.subtle",
          backgroundColor: "bg.surface",
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
