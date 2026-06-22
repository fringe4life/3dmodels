import { css } from "@styled-system/css";
import { flex } from "@styled-system/patterns";
import type { GenericListItemKey } from "@/components/generic-component";

export interface UnsuccessfulStateListItemProps extends GenericListItemKey {
  text: string;
}

const UnsuccessfulStateListItem = ({
  text,
}: UnsuccessfulStateListItemProps) => (
  <li className={flex({ align: "start", gap: 2 })}>
    <span className={css({ marginBlockStart: 1 })}>•</span>
    <span>{text}</span>
  </li>
);

export { UnsuccessfulStateListItem };
