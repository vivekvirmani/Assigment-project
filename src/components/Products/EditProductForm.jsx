import { useState } from "react";
import { useUpdateProduct } from "../../hooks/useProducts";

export default function EditProductForm({ product, onCloseEdit }) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);

  const updateMutation = useUpdateProduct();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateMutation.mutateAsync({
      id: product.id,
      body: {
        title,
        price,
        description: product.description,
        category: product.category,
      },
    });

    onCloseEdit();
  };

  return (
    <div className="mt-4 p-3 border rounded bg-gray-100">
      <h3 className="font-bold mb-2">Edit Product</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-700 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-600"
          >
            Save
          </button>

          <button
            type="button"
            onClick={onCloseEdit}
            className="bg-gray-400 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
