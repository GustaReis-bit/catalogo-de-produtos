# Catálogo de Produtos

Uma aplicação web de catálogo de produtos desenvolvida com React, TypeScript e Vite. O projeto oferece um fluxo completo para exibir produtos, filtrá-los, navegar pelos detalhes e cadastrar novos itens.

---

## 🚀 Visão geral

- Interface responsiva e moderna com Tailwind CSS
- Busca por produtos e filtro por categorias
- Página de detalhes com informações, estoque e ação de exclusão
- Formulário de cadastro validado para novos produtos
- Integração com API fictícia usando Axios
- Layout adaptado para desktop e mobile

---

## 📦 Tecnologias

- React 19
- TypeScript 6
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- ESLint

---

## ⚙️ Instalação

```bash
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador.

---

## 🧪 Scripts úteis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a build de produção |
| `npm run preview` | Pré-visualiza a build de produção |
| `npm run lint` | Executa o ESLint no projeto |

---

## 📁 Estrutura do projeto

```text
.
├─ public/
├─ src/
│  ├─ api/
│  │  └─ products.ts
│  ├─ assets/
│  ├─ components/
│  │  ├─ ui/
│  │  │  └─ SkeletonCard.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ ProductCard.tsx
│  │  ├─ ProductDetail.tsx
│  │  ├─ ProductForm.tsx
│  │  └─ ProductList.tsx
│  ├─ hooks/
│  │  └─ useProducts.ts
│  ├─ pages/
│  │  ├─ EditProductPage.tsx
│  │  ├─ HomePage.tsx
│  │  ├─ NewProductPage.tsx
│  │  ├─ ProductDetailPage.tsx
│  │  └─ NotFoundPage.tsx
│  ├─ types/
│  │  └─ index.ts
│  ├─ App.css
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ eslint.config.js
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
├─ vite.config.ts
└─ README.md
```

---

## 🔧 Arquivos principais

- `src/App.tsx` — rota principal e estrutura de navegação
- `src/api/products.ts` — chamadas para API de produtos
- `src/hooks/useProducts.ts` — hook de carregamento e estado de produtos
- `src/components/ProductList.tsx` — lista produtos e aplica filtros
- `src/components/ProductForm.tsx` — formulário de cadastro de produto
- `src/components/ProductDetail.tsx` — exibe informações detalhadas do produto
- `src/types/index.ts` — definições de tipos TypeScript compartilhadas

---

## 🌐 Rotas da aplicação

- `/` — catálogo de produtos
- `/new` — página de criação de novo produto
- `/product/:id` — detalhe do produto
- `*` — página 404

---

## ℹ️ Observações

- O projeto usa um endpoint MockAPI público em `src/api/products.ts`.
- Para usar seu próprio backend, atualize a constante `BASE_URL`.
- O cadastro de produto gera nota fictícia e timestamp automaticamente.

---

## 💡 Melhorias futuras

- Autenticação de usuário
- Paginação e ordenação
- Filtro avançado por faixa de preço e estoque
- Upload real de imagem
- Integração com backend real

