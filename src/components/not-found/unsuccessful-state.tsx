import { css } from "@styled-system/css";
import { flex, grid, gridItem } from "@styled-system/patterns";
import type { ReactNode } from "react";
import { GenericComponent } from "@/components/generic-component";
import {
  UnsuccessfulStateListItem,
  type UnsuccessfulStateListItemProps,
} from "@/components/not-found/unsuccessful-state-list-item";

interface UnsuccessfulStateProps {
  action?: ReactNode;
  heading: string;
  isError?: boolean;
  listItems: UnsuccessfulStateListItemProps[];
  subheading: string;
}

const renderUnsuccesfulItem = ({ text }: UnsuccessfulStateListItemProps) => ({
  text,
});

const UnsuccessfulState = ({
  heading,
  subheading,
  action,
  listItems,
  isError = false,
}: UnsuccessfulStateProps) => (
  <div
    className={grid({
      marginInline: 4,
      minBlockSize: "60vh",
      padding: 4,
      placeItems: "center",
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
            color: "error",
            fontSize: { base: "4xl", sm: "5xl" },
            fontWeight: "bold",
            letterSpacing: "tight",
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
          backgroundColor: "bg.surface",
          borderColor: "border.subtle",
          padding: 6,
          rounded: "lg",
          spaceY: 4,
          textAlign: "left",
        })}
      >
        <h2 className={css({ fontSize: "xl", fontWeight: "semibold" })}>
          What you can do:
        </h2>
        <GenericComponent
          as="ul"
          Component={UnsuccessfulStateListItem}
          className={css({ color: "gray.600", spaceY: 2 })}
          items={listItems}
          renderProps={renderUnsuccesfulItem}
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
