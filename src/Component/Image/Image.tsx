interface Iprops {
  url: string;
  alt: string;
  classname: string;
}
const Image = ({ url, alt, classname }: Iprops) => {
  return <img src={url} alt={alt} className={classname}></img>;
};

export default Image;
