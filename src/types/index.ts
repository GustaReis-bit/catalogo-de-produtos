// ─── Tipos de produto ─────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  createdAt: string;
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'rating'>;

// ─── Tipos de resposta da API ─────────────────────────────────────────────────

export interface ApiError {
  message: string;
  status?: number;
}

// ─── Tipos de estado de UI ───────────────────────────────────────────────────

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface FilterState {
  search: string;
  category: string;
}

// ─── Constantes ───────────────────────────────────────────────────────────────
export const CATEGORIES = [
  'All',
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Beauty',
  'Toys',
  'Food',
] as const;

export type Category = (typeof CATEGORIES)[number];
