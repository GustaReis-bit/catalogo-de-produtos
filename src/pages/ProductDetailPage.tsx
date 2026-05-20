import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import ProductDetail from '../components/ProductDetail';

// ─── Esqueleto de carregamento ─────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      <div className="aspect-square shimmer-bg rounded-sm" />
      <div className="space-y-4 pt-2">
        <div className="h-3 w-24 shimmer-bg rounded" />
        <div className="h-9 w-3/4 shimmer-bg rounded" />
        <div className="h-10 w-1/3 shimmer-bg rounded" />
        <div className="h-6 w-32 shimmer-bg rounded" />
        <div className="space-y-2 pt-4 border-t border-ink-100">
          <div className="h-3 w-full shimmer-bg rounded" />
          <div className="h-3 w-full shimmer-bg rounded" />
          <div className="h-3 w-2/3 shimmer-bg rounded" />
        </div>
      </div>
    </div>
  );
}

// ─── Página de detalhes do produto ─────────────────────────────────────────────

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, status, error } = useProduct(id ?? '');

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Navegação breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-ink-400 mb-8 font-mono">
        <button onClick={() => navigate('/')} className="hover:text-ink-700 transition-colors">
          Catalogo
        </button>
        <span>/</span>
        <span className="text-ink-600 truncate max-w-xs">
          {product?.name ?? (status === 'loading' ? '…' : 'Product')}
        </span>
      </nav>

      {status === 'loading' && <DetailSkeleton />}

      {status === 'error' && (
        <div className="flex flex-col items-center py-20 text-center animate-fade-in">
          <p className="text-ink-400 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-ink-950 text-cream text-sm rounded-sm hover:bg-ink-800"
          >
            ← Voltar ao catálogo
          </button>
        </div>
      )}

      {status === 'success' && product && <ProductDetail product={product} />}
    </main>
  );
}
