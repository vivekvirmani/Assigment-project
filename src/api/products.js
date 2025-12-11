import { api } from "./apiClient";

// Fetch all products
export const fetchProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

// Fetch single product
export const fetchSingleProduct = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

// Update product
export const updateProduct = async ({ id, body }) => {
  const { data } = await api.put(`/products/${id}`, body);
  return data;
};

// Delete product
export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
