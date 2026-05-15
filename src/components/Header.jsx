// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLink = (to, label) =>
    isHome ? (
      <a href={to} className="text-gray-300 hover:text-white transition-colors">{label}</a>
    ) : (
      <Link to={`/${to}`} className="text-gray-300 hover:text-white transition-colors">{label}</Link>
    );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-primary/20">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="text-3xl">🥊</div>
            <div>
              <h1 className="text-2xl font-bold text-white">Citadel Coaching</h1>
              <p className="text-xs text-accent">MMA • Muay Thai • BJJ</p>
            </div>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLink('#accueil', 'Accueil')}
            {navLink('#disciplines', 'Disciplines')}
            {navLink('#tarifs', 'Tarifs')}
            {navLink('#apropos', 'À propos')}
            <Link
              to="/programmes"
              className={`transition-colors font-semibold ${
                location.pathname.startsWith('/programmes')
                  ? 'text-primary'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              📚 Programmes
            </Link>
            <Link
              to="/blog"
              className={`transition-colors font-semibold ${
                location.pathname.startsWith('/blog')
                  ? 'text-primary'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              ✍️ Blog
            </Link>
            {navLink('#contact', 'Contact')}
            <a
              href="/#reservation"
              className="bg-primary hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-all transform hover:scale-105"
            >
              Réserver
            </a>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <Link to="/blog" className="text-gray-300 font-semibold text-sm">
              ✍️ Blog
            </Link>
            <Link to="/programmes" className="text-accent font-semibold text-sm">
              📚 PDF
            </Link>
            <a
              href="/#reservation"
              className="bg-primary text-white font-semibold px-4 py-2 rounded-lg text-sm"
            >
              Réserver
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
