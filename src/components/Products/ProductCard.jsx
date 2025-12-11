export default function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={() => onClick(product.id)}
      className="border rounded-lg p-4 shadow-sm bg-white cursor-pointer 
                 hover:shadow-md transition flex flex-col items-center"
    >
      <div className="w-full h-40 flex justify-center items-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>

      <h3 className="text-sm font-semibold line-clamp-2 mt-3 text-center">
        {product.title}
      </h3>

      <p className="text-gray-600 text-xs capitalize mt-1">
        {product.category}
      </p>

      <p className="font-bold text-lg mt-2 text-[#0F1111]">
        ₹{product.price}
      </p>
    </div>
  );
}
