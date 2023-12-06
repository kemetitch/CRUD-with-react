import ProductCard from "./Component/ProductCard/ProductCard";
import { productList } from "./data";
const App = () => {
  const renderProductCard = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <main className="container mx-auto">
      <div className="m-5 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {renderProductCard}
      </div>
    </main>
  );
};

export default App;
