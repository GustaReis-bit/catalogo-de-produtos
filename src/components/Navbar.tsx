import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Catálogo' },
    { to: '/new', label: 'Novo Produto' },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-ink-950 border-b border-ink-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px]">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-7 h-7 bg-amber-500 rounded-sm flex items-center justify-center
                              group-hover:bg-amber-400 transition-colors duration-200 flex-shrink-0">
                <span className="text-ink-950 font-mono text-xs font-bold leading-none">P</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-semibold text-base text-cream tracking-tight">
                  Palladium
                </span>
                <span className="font-mono text-[9px] text-ink-400 uppercase tracking-widest hidden sm:block">
                  Catálogo de Produtos
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden sm:flex items-center gap-0.5">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium transition-all duration-150 rounded-sm ${
                      isActive
                        ? 'bg-amber-500 text-ink-950'
                        : 'text-ink-300 hover:text-cream hover:bg-ink-800'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden p-2 rounded-sm text-ink-400 hover:text-cream hover:bg-ink-800 transition-colors"
              aria-label="Abrir menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Faixa âmbar decorativa */}
      <div className="h-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-ink-950 border-b border-ink-800 animate-fade-in">
          <nav className="px-4 py-2 flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                    isActive ? 'bg-amber-500 text-ink-950' : 'text-ink-300 hover:text-cream hover:bg-ink-800'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}