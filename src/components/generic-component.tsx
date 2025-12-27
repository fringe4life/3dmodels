import type { GenericComponentProps } from "@/types";

const GenericComponent = <T, P, E extends React.ElementType = "div">({
  Component,
  items,
  renderProps,
  renderKey,
  className = "",
  as,
  wrapperProps,
}: GenericComponentProps<T, P, E>) => {
  const Wrapper = as || "div";
  return (
    <Wrapper className={className} {...wrapperProps}>
      {items.map((item, index) => (
        <Component key={renderKey(item, index)} {...renderProps(item, index)} />
      ))}
    </Wrapper>
  );
};

export { GenericComponent };
