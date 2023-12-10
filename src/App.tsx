import { useState } from "react";
import ProductCard from "./Component/ProductCard/ProductCard";
import Button from "./Component/UI/Button";
import Model from "./Component/UI/Model";
import { productList } from "./data";
import { formInputsList } from "./data";
import Input from "./Component/UI/Input";
const App = () => {
  const renderProductCard = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const renderFormInput = formInputsList.map((input) => (
    <div className="flex flex-col">
      <label className="mb-2 text-md text-gray-800" htmlFor={input.id}>
        {input.label}
      </label>
      <Input key={input.id} name={input.name} id={input.id} />
    </div>
  ));

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <main className="container mx-auto">
      <Button
        width="w-full"
        onClick={openModal}
        className=" bg-gray-400 hover:bg-gray-500  "
      >
        Cancel
      </Button>
      <div className="m-5 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {renderProductCard}
      </div>
      <div>
        <Model title="Modal" closeModal={closeModal} isOpen={isOpen}>
          <form
            action="
        "
          >
            {renderFormInput}
            <div className="flex align-ceter gap-2 mt-4">
              <Button
                width="w-full"
                className=" bg-indigo-400 hover:bg-indigo-500  "
              >
                Submit
              </Button>
              <Button
                width="w-full"
                className=" bg-gray-400 hover:bg-gray-500  "
              >
                Cancel
              </Button>
            </div>
          </form>
        </Model>
      </div>
    </main>
  );
};

export default App;
