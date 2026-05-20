import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api/products';
import { CATEGORIES } from '../types';
import type { ProductFormData } from '../types';

type FormErrors = Partial<Record<keyof ProductFormData, string>>;

const INITIAL: ProductFormData = {
  name: '',
  description: '',
  price: 0,
  category: '',
  image: '',
  stock: 0,
};

const CATEGORY_PT: Record<string, string> = {
  Electronics: 'Eletrônicos',
  Clothing: 'Roupas',
  Books: 'Livros',
  'Home & Garden': 'Casa & Jardim',
  Sports: 'Esportes',
  Beauty: 'Beleza',
  Toys: 'Brinquedos',
  Food: 'Alimentos',
};

function validate(data: ProductFormData): FormErrors {
  const errs: FormErrors = {};
  if (!data.name.trim()) errs.name = 'Nome é obrigatório';
  else if (data.name.length < 3) errs.name = 'Nome deve ter ao menos 3 caracteres';
  if (!data.description.trim()) errs.description = 'Descrição é obrigatória';
  else if (data.description.length < 10) errs.description = 'Descrição deve ter ao menos 10 caracteres';
  if (!data.category) errs.category = 'Selecione uma categoria';
  if (data.price <= 0) errs.price = 'Preço deve ser maior que zero';
  if (data.stock < 0) errs.stock = 'Estoque não pode ser negativo';
  if (data.image && !/^https?:\/\/.+\..+/.test(data.image)) {
    errs.image = 'Deve ser uma URL válida (https://…)';
  }
  return errs;
}

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}

function Field({ label, error, required, children, hint }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink-700 mb-1.5">
        {label}
        {required && <span className="text-amber-600 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

const inputCls = (error?: string) =>
  `w-full px-3 py-2.5 bg-white border rounded-sm text-ink-900 text-sm placeholder-ink-300
   focus:outline-none focus:ring-1 transition-colors ${
     error
       ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
       : 'border-ink-200 focus:border-ink-500 focus:ring-ink-200'
   }`;

export default function ProductForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ProductFormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
    if (errors[name as keyof ProductFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setApiError(null);
    try {
      const created = await createProduct(form);
      navigate(`/product/${created.id}`, { state: { created: true } });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao criar produto';
      setApiError(message);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-up" style={{ opacity: 0 }} noValidate>

      {apiError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-red-600 text-sm animate-fade-in">
          {apiError}
        </div>
      )}

      {/* Nome */}
      <Field label="Nome do produto" error={errors.name} required>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="ex: Fone de Ouvido Bluetooth"
          className={inputCls(errors.name)}
        />
      </Field>

      {/* Descrição */}
      <Field label="Descrição" error={errors.description} required>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descreva o produto em detalhes…"
          rows={4}
          className={`${inputCls(errors.description)} resize-none`}
        />
      </Field>

      {/* Preço + Estoque */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Preço (R$)" error={errors.price} required>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 text-sm pointer-events-none">
              R$
            </span>
            <input
              type="number"
              name="price"
              value={form.price || ''}
              onChange={handleChange}
              placeholder="0,00"
              min={0}
              step={0.01}
              className={`${inputCls(errors.price)} pl-9`}
            />
          </div>
        </Field>
        <Field label="Qtd. em estoque" error={errors.stock} required>
          <input
            type="number"
            name="stock"
            value={form.stock || ''}
            onChange={handleChange}
            placeholder="0"
            min={0}
            className={inputCls(errors.stock)}
          />
        </Field>
      </div>

      {/* Categoria */}
      <Field label="Categoria" error={errors.category} required>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className={inputCls(errors.category)}
        >
          <option value="">Selecione uma categoria…</option>
          {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
            <option key={cat} value={cat}>{CATEGORY_PT[cat] ?? cat}</option>
          ))}
        </select>
      </Field>

      {/* URL da imagem */}
      <Field
        label="URL da imagem"
        error={errors.image}
        hint="Opcional. Deixe em branco para usar uma imagem padrão."
      >
        <input
          type="url"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://exemplo.com/imagem.jpg"
          className={inputCls(errors.image)}
        />
      </Field>

      {/* Preview da imagem */}
      {form.image && !errors.image && (
        <div className="rounded-sm overflow-hidden border border-ink-100 h-40 animate-fade-in">
          <img
            src={form.image}
            alt="Pré-visualização"
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      )}

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex-1 px-6 py-3 border border-ink-200 text-ink-700 text-sm font-medium
                     rounded-sm hover:bg-ink-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 px-6 py-3 bg-ink-950 text-cream text-sm font-medium rounded-sm
                     hover:bg-ink-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Criando…' : 'Criar Produto'}
        </button>
      </div>
    </form>
  );
}