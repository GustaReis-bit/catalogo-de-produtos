import { useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { useProducts } from '../hooks/useProducts';

export default function EditProductPage() {
  const { id } = useParams();

  const {
    products,
    status,
    error,
  } = useProducts();

  if (status === 'loading') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        Carregando produto...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        Erro ao carregar produto.
      </div>
    );
  }

  const product = products.find(
    (p) => String(p.id) === String(id)
  );

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        Produto não encontrado.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-6">
        Editar Produto
      </h1>

      <ProductForm
        initialData={{
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          image: product.image,
          stock: product.stock,
        }}
        productId={String(product.id)}
        isEditing
      />
    </div>
  );
}