export default function Pill({
  children,
  className = "",
}: React.ComponentProps<"span">) {
  return (
    <span
      className={`corner-squircle inline-block self-center rounded-full border border-gray-400 bg-transparent px-3 py-1 text-gray-800 text-sm ${className}`}
    >
      {children}
    </span>
  );
}
