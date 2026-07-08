/** Optional stable keys; falls back to list index when neither is set. */
export interface GenericListItemKey {
  id?: string | number;
  slug?: string;
}

const getItemKey = (item: GenericListItemKey, index: number): React.Key =>
  item.id ?? (item.slug || index);

interface GenericComponentProps<
  T extends GenericListItemKey,
  P,
  E extends React.ElementType = "div",
> {
  as?: E;
  Component: React.ComponentType<P>;
  className?: string;
  items: T[];
  renderProps: (item: T, index: number) => P;
  wrapperProps?: React.ComponentPropsWithoutRef<E>;
}

const GenericComponent = <
  T extends GenericListItemKey,
  P,
  E extends React.ElementType = "div",
>({
  Component,
  items,
  renderProps,
  className = "",
  as,
  wrapperProps,
}: GenericComponentProps<T, P, E>) => {
  const Wrapper = as || "div";
  return (
    <Wrapper className={className} {...wrapperProps}>
      {items.map((item, index) => (
        <Component
          {...renderProps(item, index)}
          key={getItemKey(item, index)}
        />
      ))}
    </Wrapper>
  );
};

export { GenericComponent };
