import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchProducts, fetchSingleProduct, updateProduct, deleteProduct } from "../api/products";

export const PRODUCTS_QUERY_KEY = ["products"];

// Fetch all products
export function useProducts() {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

// Fetch single product
export function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchSingleProduct(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

// Update product
export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (updated) => {
      // update product list cache
      qc.setQueryData(PRODUCTS_QUERY_KEY, (old = []) =>
        old.map((p) => (p.id === updated.id ? { ...p, ...updated } : p))
      );
      // update single product cache
      qc.setQueryData(["product", updated.id], updated);
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct, // call API (optional)
    onSuccess: (_res, id) => {
      // Remove product from local cache
      qc.setQueryData(PRODUCTS_QUERY_KEY, (old = []) =>
        old.filter((p) => p.id !== id)
      );

      // Remove single product cache if exists
      qc.removeQueries(["product", id]);

      // ❌ Do NOT invalidate queries — prevents refetch from server
    },
  });
}

