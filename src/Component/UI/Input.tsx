import { InputHTMLAttributes } from "react";
interface Iprops extends InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ ...rest }: Iprops) => {
  return (
    <input
      className="border-2 focus:ring-1 focus:ring-indigo-500 border-gray-300 shadow-md focus:border-indigo-400 focus:outline-none rounded-md p-2 text-md"
      {...rest}
    ></input>
  );
};

export default Input;
