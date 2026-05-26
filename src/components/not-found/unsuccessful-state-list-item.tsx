import { css } from "@styled-system/css";
import { flex } from "@styled-system/patterns";
import type { UnsuccessfulStateListItemProps } from "@/types";

const UnsuccessfulStateListItem = ({
  text,
}: UnsuccessfulStateListItemProps) => (
  <li className={flex({ align: "start", gap: 2 })}>
    <span className={css({ marginBlockStart: 1 })}>•</span>
    <span>{text}</span>
  </li>
);

export { UnsuccessfulStateListItem };
