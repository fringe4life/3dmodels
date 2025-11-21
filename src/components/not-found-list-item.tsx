export type NotFoundListItemProps = {
  text: string;
};

export default function NotFoundListItem({ text }: NotFoundListItemProps) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 text-primary">•</span>
      <span>{text}</span>
    </li>
  );
}
