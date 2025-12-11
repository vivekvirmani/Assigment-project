import { useState } from "react";
import { useDeleteProduct, useProduct } from "../../hooks/useProducts";
import EditProductForm from "./EditProductForm";
import ConfirmDialog from "./ConfirmDialog";

export default function ProductDetailModal({ id, onClose }) {
  const { data, isLoading } = useProduct(id);
  const deleteMutation = useDeleteProduct();

  const [isEditing, setIsEditing] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (!data) return <div className="p-4">Product not found</div>;

  const handleDelete = async () => {
  await deleteMutation.mutateAsync(data.id); // delete locally
  onClose(); // close modal
};


  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl cursor-pointer"
        >
          ×
        </button>

        <img src={data.image} className="h-40 mx-auto" />

        <h2 className="text-xl font-bold mt-2">{data.title}</h2>
        <p className="text-gray-700 mb-2">{data.description}</p>
        <p className="font-semibold mb-2">₹{data.price}</p>
        <p className="text-sm">Rating: {data.rating?.rate} ⭐</p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-green-700 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-600"
           
          >
            Edit
          </button>

          <button
            onClick={() => setIsConfirm(true)}
            className="bg-red-700 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600"
          >
            Delete
          </button>
        </div>

        {isEditing && (
          <EditProductForm
            product={data}
            onCloseEdit={() => setIsEditing(false)}
          />
        )}

        {isConfirm && (
          <ConfirmDialog
            onConfirm={handleDelete}
            onCancel={() => setIsConfirm(false)}
          />
        )}
      </div>
    </div>
  );
}
