import { IProduct } from "../../interfaces";
import Image from "../Image/Image";
import Button from "../UI/Button";
import ProductColor from "../UI/ProductColor";
import { descriptionSlice } from "../functions/descriptionSlice";

interface Iprops {
  product: IProduct;
  setEditProduct: (product: IProduct) => void;
  openEditModal: () => void;
  openRemoveModal: () => void;
  setEditProductIdx: (Idx: number) => void;
  idx: number;
  setTempEditColors: (arr: string[]) => void;
}

const ProductCard = ({
  product,
  setEditProduct,
  openEditModal,
  setEditProductIdx,
  setTempEditColors,
  openRemoveModal,
  idx,
}: Iprops) => {
  const renderProductColor = product.colors.map((color) => {
    return <ProductColor key={color} color={color}></ProductColor>;
  });
  const EditHandler = () => {
    openEditModal();
    setEditProductIdx(idx);
    setTempEditColors(product.colors);
    setEditProduct(product);
  };
  const removerHandler = () => {
    setEditProduct(product);
    openRemoveModal();
  };
  return (
    <div className=" p-3  bg-white rounded-md border flex flex-col max-w-md  mx-auto md:mx-0">
      <Image
        classname="rounded-md min-h-[300px]"
        alt="Product Card"
        url={product.imageURL}
      />
      <h2 className="my-2">{product.title}</h2>

      <p>{descriptionSlice(product.description)}</p>
      {product.colors.length > 0 ? (
        <div className="flex items-center gap-2 my-3">{renderProductColor}</div>
      ) : (
        <h3 className="mb-3 mt-2 text-lg font-bold">No Selected Colors</h3>
      )}
      <div className="flex gap-2 mb-4 items-center justify-between">
        <span>${product.price}</span>

        <Image
          classname="rounded-full w-10 h-10 object-cover"
          alt="Product Card"
          url={product.category.imageURL}
        />
      </div>
      <div className="flex justify-between gap-2">
        <Button
          width="w-full"
          className=" bg-indigo-500 hover:bg-indigo-600 "
          onClick={EditHandler}
        >
          EDIT
        </Button>
        <Button
          onClick={removerHandler}
          width="w-full"
          className=" bg-red-500 hover:bg-red-600  "
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
//https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
