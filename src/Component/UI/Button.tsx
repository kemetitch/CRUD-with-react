import { ReactNode } from "react";

interface Iprops {
  children: ReactNode;
  className?: string;
}
const Button = ({ children, className }: Iprops) => {
  return (
    <button className={`${className} p-2 text-white rounded-md flex-1`}>
      {children}
    </button>
  );
};

export default Button;
