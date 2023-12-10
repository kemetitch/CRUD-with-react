import { ReactNode } from "react";
import { ButtonHTMLAttributes } from "react";

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  width?: "w-fit" | "w-full";
}
const Button = ({ children, className, width = "w-full", ...rest }: Iprops) => {
  return (
    <button
      className={`${className} ${width} p-2 text-white rounded-md `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
