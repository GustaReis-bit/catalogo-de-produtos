import axios from 'axios';
import type { Product, ProductFormData } from '../types';

// ─── URL base do MockAPI ──────────────────────────────────────────────────────
const BASE_URL = 'https://69fe52738c70b15fa3ca6976.mockapi.io/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Endpoints de produtos ───────────────────────────────────────────────────

/** Buscar todos os produtos */
export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>('/products');
  return data;
};

/** Buscar um produto pelo id */
export const fetchProductById = async (id: string): Promise<Product> => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};

/** Criar um novo produto */
export const createProduct = async (
  product: ProductFormData
): Promise<Product> => {
  const payload = {
    ...product,
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    createdAt: new Date().toISOString(),
  };

  const { data } = await api.post<Product>('/products', payload);
  return data;
};

/** Atualizar produto existente */
export const updateProduct = async (
  id: string,
  product: ProductFormData
): Promise<Product> => {
  const { data } = await api.put<Product>(
    `/products/${id}`,
    product
  );

  return data;
};

/** Excluir um produto */
export const deleteProduct = async (
  id: string
): Promise<void> => {
  await api.delete(`/products/${id}`);
};

export default api;