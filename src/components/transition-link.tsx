"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { addTransitionType, useTransition } from "react";

const TransitionLink = ({ type, ...props }: TransitionLinkProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleNavigate = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    startTransition(() => {
      addTransitionType(type);
      router.push(props.href);
    });
  };

  return (
    <Link
      onNavigate={handleNavigate}
      style={{ opacity: isPending ? 0.5 : 1 }}
      {...props}
    />
  );
};

export { TransitionLink };
interface TransitionLinkProps {
  children: React.ReactNode;
  href: string;
  type: "forwards" | "backwards";
}
