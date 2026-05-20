import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

// ─── Página de novo produto ───────────────────────────────────────────────────

export default function NewProductPage() {
  const navigate = useNavigate();

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Navegação breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-ink-400 mb-8 font-mono">
        <button onClick={() => navigate('/')} className="hover:text-ink-700 transition-colors">
          Catalogo
        </button>
        <span>/</span>
        <span className="text-ink-600">Novo Produto</span>
      </nav>

      {/* Cabeçalho */}
      <div className="mb-8">
        <p className="text-xs font-mono text-ink-400 uppercase tracking-widest mb-1">Criar</p>
        <h1 className="font-display text-3xl font-bold text-ink-950">Novo Produto</h1>
        <p className="text-ink-400 text-sm mt-1.5">
          Preencha os detalhes abaixo para adicionar um produto ao catálogo.
        </p>
      </div>

      {/* Divisor */}
      <div className="border-t border-ink-100 mb-8" />

      <ProductForm />
    </main>
  );
}
