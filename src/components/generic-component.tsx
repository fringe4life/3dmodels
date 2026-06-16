import type { GenericComponentProps, GenericListItemKey } from "@/types";

const getItemKey = (item: GenericListItemKey, index: number): React.Key => {
  if (item.id != null) {
    return item.id;
  }
  if (item.slug != null && item.slug !== "") {
    return item.slug;
  }
  return index;
};

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
          key={getItemKey(item, index)}
          {...renderProps(item, index)}
        />
      ))}
    </Wrapper>
  );
};

export { GenericComponent };
