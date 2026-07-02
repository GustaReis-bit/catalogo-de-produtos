import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../api/products';
import type { Product } from '../types';

interface Props {
  product: Product;
}

// ─── Detalhes do produto ──────────────────────────────────────────────────────

export default function ProductDetail({ product }: Props) {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Handle para confirmação e exclusão do produto.
  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    setDeleting(true);

    try {
      await deleteProduct(product.id);
      navigate('/', { state: { deleted: product.name } });
    } catch {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  const stockLabel =
    product.stock === 0
      ? {
        text: 'Sem Estoque',
        cls: 'bg-red-50 text-red-600 border-red-100',
      }
      : product.stock <= 5
        ? {
          text: `Estoque Baixo — Restam ${product.stock}`,
          cls: 'bg-amber-50 text-amber-700 border-amber-100',
        }
        : {
          text: `Em Estoque (${product.stock})`,
          cls: 'bg-green-50 text-green-700 border-green-100',
        };

  return (
    <div
      className="animate-fade-up"
      style={{ animationDelay: '0s', opacity: 0 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Imagem */}
        <div className="rounded-sm overflow-hidden bg-parchment aspect-square lg:aspect-auto">
          <img
            src={
              product.image ||
              `https://picsum.photos/seed/${product.id}/600/600`
            }
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://picsum.photos/seed/${product.id}/600/600`;
            }}
          />
        </div>

        {/* Informações */}
        <div className="flex flex-col">
          {/* Categoria + avaliação */}
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-0.5 bg-ink-100 text-ink-600 text-xs font-medium rounded-sm">
              {product.category}
            </span>

            <div className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 text-amber-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>

              <span className="text-xs font-mono text-ink-500">
                {(product.rating || 4.0).toFixed(1)} avaliação
              </span>
            </div>
          </div>

          {/* Nome */}
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-950 leading-tight mb-4">
            {product.name}
          </h1>

          {/* Preço */}
          <p className="font-display text-4xl font-semibold text-ink-950 mb-5">
            R$ {Number(product.price).toFixed(2)}
          </p>

          {/* Indicador de estoque */}
          <span
            className={`self-start px-3 py-1 rounded-sm text-sm border font-medium mb-5 ${stockLabel.cls}`}
          >
            {stockLabel.text}
          </span>

          {/* Descrição */}
          <div className="border-t border-ink-100 pt-5 mb-6">
            <h2 className="text-xs font-medium text-ink-400 uppercase tracking-widest mb-2">
              Descrição
            </h2>

            <p className="text-ink-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Metadados */}
          <div className="border-t border-ink-100 pt-5 mb-8">
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-ink-400 text-xs uppercase tracking-wide mb-0.5">
                  ID
                </dt>

                <dd className="font-mono text-ink-700">
                  #{product.id}
                </dd>
              </div>

              <div>
                <dt className="text-ink-400 text-xs uppercase tracking-wide mb-0.5">
                  Adicionado em
                </dt>

                <dd className="text-ink-700">
                  {product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString(
                      'pt-BR',
                      {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      }
                    )
                    : '—'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <button
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-3 border border-ink-200 text-ink-700 text-sm font-medium rounded-sm hover:bg-ink-50 transition-colors"
            >
              ← Voltar para o Catálogo
            </button>

            <button
              onClick={() => navigate(`/edit/${product.id}`)}
              className="flex-1 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-sm hover:bg-blue-700 transition-colors"
            >
              Editar Produto
            </button>
            
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`flex-1 px-6 py-3 text-sm font-medium rounded-sm transition-colors ${confirmDelete
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-ink-950 text-cream hover:bg-ink-800'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {deleting
                ? 'Excluindo...'
                : confirmDelete
                  ? 'Confirmar Exclusão'
                  : 'Excluir Produto'}
            </button>
          </div>

          {confirmDelete && !deleting && (
            <p className="text-xs text-red-500 mt-2 text-center animate-fade-in">
              Clique novamente para excluir permanentemente o produto.
              <button
                onClick={() => setConfirmDelete(false)}
                className="underline ml-1"
              >
                Cancelar
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}