import { HTMLAttributes } from "react";

interface Iprops extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}
const ProductColor = ({ color, ...rest }: Iprops) => {
  return (
    <span
      className="block rounded-full w-6 h-6"
      style={{ backgroundColor: color }}
      {...rest}
    ></span>
  );
};

export default ProductColor;
