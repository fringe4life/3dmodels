import type { Route } from "next";
import type { SearchParams } from "nuqs/server";
import type { ReactNode } from "react";
import type { ActionState } from "@/utils/to-action-state";
/**
 * Used to handle potential failures. It can be used to return a value or null or undefined.
 */
export type Maybe<T> = T | null | undefined;
export type List<T> = Maybe<T[]>;

export interface SearchParamsProps {
  searchParams: Promise<SearchParams>;
}

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
export interface UnsuccessfulStateLink {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}

export interface UnsuccessfulStateProps {
  heading: string;
  subheading: string;
  action?: ReactNode;
  listItems: UnsuccessfulStateListItemProps[];
  isError?: boolean;
}

export interface UnsuccessfulStateListItemProps {
  text: string;
}

export interface NavLinkProps {
  href: Route;
  children: ReactNode;
  matchStrategy?: "includes" | "endsWith";
  borderPosition?: "bottom" | "left";
  liClassName?: string;
}

export interface GenericComponentProps<
  T,
  P,
  E extends React.ElementType = "div",
> {
  Component: React.ComponentType<P>;
  items: T[];
  renderProps: (item: T, index: number) => P;
  renderKey: (item: T, index: number) => React.Key;
  className?: string;
  as?: E;
  wrapperProps?: React.ComponentPropsWithoutRef<E>;
}

export interface FieldErrorProps {
  actionState: Maybe<ActionState>;
  name: string;
}
