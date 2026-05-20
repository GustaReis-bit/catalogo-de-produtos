import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import NewProductPage from './pages/NewProductPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cream flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/new" element={<NewProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <footer className="border-t border-ink-100 py-5 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <span className="font-mono text-xs text-ink-300">Palladium Catalog</span>
            <span className="font-mono text-xs text-ink-300">{new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
