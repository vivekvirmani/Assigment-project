import { useQuery } from "@tanstack/react-query";
import { fetchSingleProduct } from "../api/products"; // use the function that exists
import { PRODUCTS_QUERY_KEY } from "./useProducts";

export const PRODUCT_QUERY_KEY = (id) => ["product", id];

export function useProducts() {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

