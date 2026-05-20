import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { useProducts } from '../hooks/useProducts';

export default function HomePage() {
  const { products, status, error, refetch } = useProducts();
  const location = useLocation();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.deleted) {
      setToast(`"${location.state.deleted}" foi removido`);
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [location.state]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-mono text-ink-400 uppercase tracking-widest mb-1">Explorar</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-950">Catálogo de Produtos</h1>
        </div>
        <Link
          to="/new"
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-ink-950 text-cream text-sm
                     font-medium rounded-sm hover:bg-ink-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar produto
        </Link>
      </div>

      <ProductList
        products={products}
        loading={status === 'loading'}
        error={error}
        onRetry={refetch}
      />

      {toast && (
        <div className="fixed bottom-6 right-6 bg-ink-950 text-cream text-sm px-4 py-3
                        rounded-sm shadow-lg animate-fade-up z-50">
          {toast}
        </div>
      )}
    </main>
  );
}