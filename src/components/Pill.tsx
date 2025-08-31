import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  className?: string;
};

export default function Pill({ children, className = "" }: PillProps) {
  return (
    <span
      className={`inline-block rounded-full border border-gray-400 bg-transparent px-3 py-1 text-gray-800 text-sm ${className}`}
    >
      {children}
    </span>
  );
}
