import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, fetchProductById } from '../api/products';
import type { Product, LoadingState } from '../types';

// ─── Hook de produtos ─────────────────────────────────────────────────────────

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  // Função para carregar a lista de produtos e atualizar o estado de carregamento/erro.
  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
      setStatus('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load products';
      setError(message);
      setStatus('error');
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { products, status, error, refetch: load };
}

// ─── Hook de produto único ────────────────────────────────────────────────────

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const load = async () => {
      setStatus('loading');
      setError(null);
      try {
        const data = await fetchProductById(id);
        if (!cancelled) {
          setProduct(data);
          setStatus('success');
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to load product';
          setError(message);
          setStatus('error');
        }
      }
    };

    load();
    return () => { cancelled = true; };
  }, [id]);

  return { product, status, error };
}
