import { Link } from 'react-router-dom';

// ─── Página 404 ───────────────────────────────────────────────────────────────

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-fade-in">
      <p className="font-mono text-6xl font-bold text-ink-100 mb-4 select-none">404</p>
      <h1 className="font-display text-2xl font-semibold text-ink-800 mb-2">Page not found</h1>
      <p className="text-ink-400 text-sm mb-6">
        The page you're looking for doesn't exist or was moved.
      </p>
      <Link
        to="/"
        className="px-5 py-2.5 bg-ink-950 text-cream text-sm font-medium rounded-sm
                   hover:bg-ink-800 transition-colors"
      >
        Voltar ao catálogo
      </Link>
    </main>
  );
}
