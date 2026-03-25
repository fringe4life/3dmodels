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

export interface UnsuccessfulStateProps {
  action?: ReactNode;
  heading: string;
  isError?: boolean;
  listItems: UnsuccessfulStateListItemProps[];
  subheading: string;
}

export interface UnsuccessfulStateListItemProps {
  text: string;
}

export interface NavLinkProps {
  borderPosition?: "bottom" | "left";
  children: ReactNode;
  className?: string;
  href: Route;
  matchStrategy?: "includes" | "endsWith";
}

export interface NavLinkListItemProps extends NavLinkProps {
  liClassName?: string;
}

export interface GenericComponentProps<
  T,
  P,
  E extends React.ElementType = "div",
> {
  as?: E;
  Component: React.ComponentType<P>;
  className?: string;
  items: T[];
  renderKey: (item: T, index: number) => React.Key;
  renderProps: (item: T, index: number) => P;
  wrapperProps?: React.ComponentPropsWithoutRef<E>;
}

export interface FieldErrorProps {
  actionState: Maybe<ActionState>;
  name: string;
}
