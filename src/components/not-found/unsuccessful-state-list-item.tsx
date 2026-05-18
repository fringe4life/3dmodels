import type { UnsuccessfulStateListItemProps } from "@/types";
import { css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";

const UnsuccessfulStateListItem = ({
  text,
}: UnsuccessfulStateListItemProps) => (
  <li className={flex({ align: "start", gap: 2 })}>
    <span className={css({ marginBlockStart: 1 })}>•</span>
    <span>{text}</span>
  </li>
);

export { UnsuccessfulStateListItem };
