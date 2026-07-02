import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface Props {
  product: Product;
  index?: number;
}

const CATEGORY_PT: Record<string, string> = {
  Electronics: 'Eletrônicos',
  Clothing: 'Roupas',
  Books: 'Livros',
  'Home & Garden': 'Casa e Jardim',
  Sports: 'Esportes',
  Beauty: 'Beleza',
  Toys: 'Brinquedos',
  Food: 'Alimentos',
};

// ─── Avaliação por estrelas ───────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.round(rating)
              ? 'text-amber-500'
              : 'text-ink-200'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}

      <span className="text-xs text-ink-400 ml-0.5 font-mono">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

// ─── Cartão de produto ─────────────────────────────────────────────────────────

export default function ProductCard({ product, index = 0 }: Props) {
  const staggerClass = `stagger-${Math.min(index + 1, 8)}`;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <Link
      to={`/product/${product.id}`}
      className={`group block bg-white border border-ink-100 rounded-sm overflow-hidden
                  hover:border-ink-300 hover:shadow-lg hover:-translate-y-0.5
                  transition-all duration-200 animate-fade-up ${staggerClass}`}
    >
      {/* Imagem */}
      <div className="relative aspect-[4/3] overflow-hidden bg-parchment">
        <img
          src={
            product.image ||
            `https://picsum.photos/seed/${product.id}/400/300`
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://picsum.photos/seed/${product.id}/400/300`;
          }}
        />

        {/* Badge de categoria */}
        <span
          className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-white/90 backdrop-blur-sm
                     text-ink-700 text-xs font-medium border border-ink-100 rounded-sm"
        >
          {CATEGORY_PT[product.category] || product.category}
        </span>

        {/* Sem estoque */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-ink-950 text-cream text-xs font-medium px-3 py-1">
              Sem Estoque
            </span>
          </div>
        )}

        {/* Estoque baixo */}
        {isLowStock && (
          <span
            className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-amber-500 text-white
                       text-xs font-medium rounded-sm"
          >
            Restam {product.stock}
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <h3
          className="font-display font-semibold text-ink-950 text-base leading-snug mb-1
                     group-hover:text-amber-700 transition-colors line-clamp-1"
        >
          {product.name}
        </h3>

        <p className="text-ink-400 text-sm leading-relaxed line-clamp-2 mb-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <StarRating rating={product.rating || 4.0} />

          <span className="font-display font-semibold text-ink-950 text-lg">
            {Number(product.price).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}