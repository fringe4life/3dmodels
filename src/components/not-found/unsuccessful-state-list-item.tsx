export type UnsuccessfulStateListItemProps = {
  text: string;
};

const UnsuccessfulStateListItem = ({
  text,
}: UnsuccessfulStateListItemProps) => (
  <li className="flex items-start gap-2">
    <span className="mt-1">•</span>
    <span>{text}</span>
  </li>
);

export default UnsuccessfulStateListItem;
