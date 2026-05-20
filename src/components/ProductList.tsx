import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import SkeletonCard from './ui/SkeletonCard';
import { CATEGORIES } from '../types';
import type { Product, FilterState } from '../types';

interface Props {
  products: Product[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative flex-1 min-w-0">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300 pointer-events-none"
        fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Buscar produtos…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-ink-200 rounded-sm
                   text-ink-900 placeholder-ink-300 text-sm
                   focus:outline-none focus:border-ink-500 focus:ring-1 focus:ring-ink-500 transition-colors"
      />
      {value && (
        <button onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

const CATEGORY_PT: Record<string, string> = {
  All: 'Todos',
  Electronics: 'Eletrônicos',
  Clothing: 'Roupas',
  Books: 'Livros',
  'Home & Garden': 'Casa & Jardim',
  Sports: 'Esportes',
  Beauty: 'Beleza',
  Toys: 'Brinquedos',
  Food: 'Alimentos',
};

function CategoryFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat === 'All' ? '' : cat)}
          className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-all duration-150 ${
            (value === '' && cat === 'All') || value === cat
              ? 'bg-ink-950 text-cream'
              : 'bg-white border border-ink-200 text-ink-600 hover:border-ink-400 hover:text-ink-950'
          }`}
        >
          {CATEGORY_PT[cat] ?? cat}
        </button>
      ))}
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="font-display font-semibold text-ink-800 mb-1">Algo deu errado</h3>
      <p className="text-ink-400 text-sm mb-4 max-w-sm">{message}</p>
      <button onClick={onRetry}
        className="px-4 py-2 bg-ink-950 text-cream text-sm rounded-sm hover:bg-ink-800 transition-colors">
        Tentar novamente
      </button>
    </div>
  );
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-parchment flex items-center justify-center mb-4">
        <svg className="w-7 h-7 text-ink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 className="font-display font-semibold text-ink-800 mb-1">
        {hasFilters ? 'Nenhum produto encontrado' : 'Nenhum produto cadastrado'}
      </h3>
      <p className="text-ink-400 text-sm">
        {hasFilters ? 'Tente ajustar sua busca ou filtros.' : 'Adicione o primeiro produto para começar.'}
      </p>
    </div>
  );
}

export default function ProductList({ products, loading, error, onRetry }: Props) {
  const [filters, setFilters] = useState<FilterState>({ search: '', category: '' });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !filters.search ||
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || p.category === filters.category;
      return matchesSearch && matchesCategory;
    });
  }, [products, filters]);

  const hasFilters = !!(filters.search || filters.category);

  return (
    <section>
      <div className="mb-6 space-y-3">
        <SearchBar value={filters.search} onChange={(search) => setFilters((f) => ({ ...f, search }))} />
        <CategoryFilter value={filters.category} onChange={(category) => setFilters((f) => ({ ...f, category }))} />
      </div>

      {!loading && !error && products.length > 0 && (
        <p className="text-xs text-ink-400 mb-4 font-mono">
          {filtered.length} de {products.length} produtos
          {hasFilters && ' (filtrado)'}
        </p>
      )}

      {error && <ErrorState message={error} onRetry={onRetry} />}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && <EmptyState hasFilters={hasFilters} />}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}