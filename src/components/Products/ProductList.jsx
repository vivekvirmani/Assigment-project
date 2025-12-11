import { useContext, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";
import AuthContext from "../Auth/AuthProvider";

export default function ProductList() {
  const { data, isLoading, error } = useProducts();
  const [selectedId, setSelectedId] = useState(null);
  const { logout } = useContext(AuthContext);

  if (isLoading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading data</p>;

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products</h2>

        <button
          onClick={logout}
          className="bg-[#6d5656e3] text-white px-4 py-1 rounded-md hover:bg-red-600 cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Product Grid **THIS WAS MISSING** */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={setSelectedId} 
          />
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedId && (
        <ProductDetailModal
          id={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
