import { useState, ChangeEvent, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import ProductCard from "./Component/ProductCard/ProductCard";
import Button from "./Component/UI/Button";
import Model from "./Component/UI/Model";
import { categories, colors, productList } from "./data";
import { formInputsList } from "./data";
import Input from "./Component/UI/Input";
import { IProduct } from "./interfaces";
import { InputValidation } from "./Component/Validation";
import Error from "./Component/Error/Error";
import ProductColor from "./Component/UI/ProductColor";
import { v4 as uuid } from "uuid";
import Select from "./Component/UI/Select";

const App = () => {
  const defaultProduct = {
    id: "",
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  //--------------------state---------------------
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [editProduct, setEditProduct] = useState<IProduct>(defaultProduct);
  const [editProductIdx, setEditProductIdx] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [tempEditColors, setTempEditColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  //--------------------functoins--------------------
  const closeRemoveModal = () => {
    setIsRemoveModalOpen(false);
  };

  const openRemveModal = () => {
    setIsRemoveModalOpen(true);
  };
  //--------------------Handlers--------------------
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const changeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
    // setErrors({ ...errors, [name]: "" });
  };
  const cancelHandler = () => {
    setProduct(defaultProduct);
    closeModal();
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = InputValidation({
      title: product.title,
      description: product.description,
      price: product.price,
      imageURL: product.imageURL,
    });
    const hasError = Object.values(errors).some((error) => error !== "");
    if (hasError) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      { ...product, uuid, colors: tempColors, category: selectedCategory },
      ...prev,
    ]);
    setProduct(defaultProduct);
    setTempColors([]);
    closeModal();
    toast("Product Added successfully");
  };
  const submitEditHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = InputValidation({
      title: editProduct.title,
      description: editProduct.description,
      price: editProduct.price,
      imageURL: editProduct.imageURL,
    });
    const hasError = Object.values(errors).some((error) => error !== "");
    if (hasError) {
      setErrors(errors);
      return;
    }
    const ubdatedProduct = [...products];
    ubdatedProduct[editProductIdx] = {
      ...editProduct,
      colors: tempColors.concat(editProduct.colors),
    };
    setProducts(ubdatedProduct);
    setEditProduct(defaultProduct);
    setTempColors([]);
    closeEditModal();
    toast("Product Edited successfully");
  };

  const removeConfirmHandler = () => {
    const filtered = products.filter(
      (product) => product.id !== editProduct.id
    );
    setProducts(filtered);
    closeRemoveModal();
    toast("Product removed successfully");
  };
  // -------------------------render-------------------
  const renderProductCard = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      setTempEditColors={setTempEditColors}
      product={product}
      setEditProduct={setEditProduct}
      openEditModal={openEditModal}
      setEditProductIdx={setEditProductIdx}
      idx={idx}
      openRemoveModal={openRemveModal}
    />
  ));

  const renderFormInput = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col">
      <label className="mb-2 text-md text-gray-800" htmlFor={input.id}>
        {input.label}
      </label>
      <Input
        key={input.id}
        name={input.name}
        id={input.id}
        value={product[input.name]}
        onChange={changeHandler}
      />
      <Error msg={errors[input.name]}></Error>
    </div>
  ));
  const renderEditFormInput = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col">
      <label className="mb-2 text-md text-gray-800" htmlFor={input.id}>
        {input.label}
      </label>
      <Input
        key={input.id}
        name={input.name}
        id={input.id}
        value={editProduct[input.name]}
        onChange={changeEditHandler}
      />
      <Error msg={errors[input.name]}></Error>
    </div>
  ));
  const renderProductColor = colors.map((color) => {
    return (
      <ProductColor
        key={color}
        color={color}
        onClick={() => {
          if (tempColors.includes(color)) {
            setTempColors((prev) => prev.filter((item) => item !== color));
            return;
          }

          setTempColors((prev) => [...prev, color]);
          if (tempEditColors.includes(color)) {
            setTempEditColors((prev) => prev.filter((item) => item !== color));
            return;
          }
          console.log(tempEditColors);

          setTempEditColors((prev) => [...prev, color]);
        }}
      ></ProductColor>
    );
  });
  const renderEditProductColor = colors.map((color) => {
    return (
      <ProductColor
        key={color}
        color={color}
        onClick={() => {
          if (tempEditColors.includes(color)) {
            setTempEditColors((prev) => prev.filter((item) => item !== color));
            return;
          }
          console.log(tempEditColors);

          setTempEditColors((prev) => [...prev, color]);
        }}
      ></ProductColor>
    );
  });
  const renderColorCode = tempColors.map((color) => (
    <span
      className="text-xs p-1 text-white rounded-md"
      style={{ backgroundColor: color }}
      key={color}
    >
      {color}
    </span>
  ));
  const renderEditColorCode = tempEditColors.map((color) => (
    <span
      className="text-xs p-1 text-white rounded-md"
      style={{ backgroundColor: color }}
      key={color}
    >
      {color}
    </span>
  ));

  return (
    <main className="container mx-auto">
      <div className="mx-auto text-center mt-5">
        <Button
          width="w-fit"
          onClick={openModal}
          className=" bg-indigo-500  hover:bg-indigo-600  "
        >
          Build A Product
        </Button>
      </div>
      <div className="m-5 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {renderProductCard}
      </div>
      <div>
        <Model title="Modal" closeModal={closeModal} isOpen={isOpen}>
          <form
            onSubmit={submitHandler}
            action="
        "
          >
            {renderFormInput}
            <Select
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <div className="flex gap-2 my-3 flex-wrap">
              {renderProductColor}
            </div>
            <div className="flex gap-2 my-3 flex-wrap">{renderColorCode}</div>
            <div className="flex align-ceter gap-2 mt-4">
              <Button
                width="w-full"
                className=" bg-indigo-400 hover:bg-indigo-500  "
              >
                Submit
              </Button>
              <Button
                onClick={cancelHandler}
                width="w-full"
                className=" bg-gray-400 hover:bg-gray-500  "
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Model>
        <Model
          title="Modal"
          closeModal={closeEditModal}
          isOpen={isEditModalOpen}
        >
          <form
            onSubmit={submitEditHandler}
            action="
        "
          >
            this edit modal
            {renderEditFormInput}
            <Select
              selectedCategory={editProduct.category}
              setSelectedCategory={(value) =>
                setEditProduct({ ...editProduct, category: value })
              }
            />
            <div className="flex gap-2 my-3 flex-wrap">
              {renderEditProductColor}
            </div>
            <div className="flex gap-2 my-3 flex-wrap">
              {renderEditColorCode}
            </div>
            <div className="flex align-ceter gap-2 mt-4">
              <Button
                width="w-full"
                className=" bg-indigo-600 hover:bg-indigo-700  "
              >
                Submit
              </Button>
              <Button
                onClick={cancelHandler}
                width="w-full"
                className=" bg-gray-300 text-gray-950 hover:bg-gray-400 "
              >
                Cancel
              </Button>
            </div>
          </form>
        </Model>
        <Model
          title="Modal"
          closeModal={closeRemoveModal}
          isOpen={isRemoveModalOpen}
        >
          <div>
            <h3 className="font-bold text-xl">
              are you sure you want to remove this product from your store?
            </h3>
            <p className="py-4 text-gray-500">
              Deleting this product will remove it permanently from your
              inventory. any associated data , sales histroy, and other related
              information will also be deleted please make sure the intended
              action
            </p>
            <div className="flex gap-2">
              <Button
                width="w-full"
                className=" bg-red-600 hover:bg-red-700  "
                onClick={removeConfirmHandler}
              >
                Yes, remove
              </Button>
              <Button
                width="w-full"
                className=" bg-gray-300 text-gray-950 hover:bg-gray-400  "
              >
                Cancel
              </Button>
            </div>
          </div>
        </Model>
      </div>
      <Toaster />
    </main>
  );
};

export default App;
