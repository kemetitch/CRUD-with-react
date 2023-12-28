interface Iprops {
  msg: string;
}
const Error = ({ msg }: Iprops) => {
  return <>{msg ? <span className="text-red-500 font-semibold">{msg}</span> : null}</>;
};

export default Error;
