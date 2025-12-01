export type NotFoundListItemProps = {
  text: string;
};

const NotFoundListItem = ({ text }: NotFoundListItemProps) => (
  <li className="flex items-start gap-2">
    <span className="mt-1 text-primary">•</span>
    <span>{text}</span>
  </li>
);

export default NotFoundListItem;
