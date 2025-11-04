import { forwardRef } from "react";

export const gridComponents = (itemWidth: string) => ({
  List: forwardRef(({ style, children, ...props }: any, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        display: "flex",
        flexWrap: "wrap",
        ...style,
      }}
    >
      {children}
    </div>
  )),
  Item: ({ children, ...props }: any) => (
    <div
      {...props}
      style={{
        padding: "0.25rem",
        width: itemWidth
      }}
    >
      {children}
    </div>
  ),
});
