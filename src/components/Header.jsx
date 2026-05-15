// src/components/Header.jsx

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-primary/20">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-3xl">🥊</div>
            <div>
              <h1 className="text-2xl font-bold text-white">Citadel Coaching</h1>
              <p className="text-xs text-accent">MMA • Muay Thai • Grappling</p>
            </div>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#accueil"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Accueil
            </a>
            <a
              href="#disciplines"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Disciplines
            </a>
            <a
              href="#tarifs"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Tarifs
            </a>
            <a
              href="#apropos"
              className="text-gray-300 hover:text-white transition-colors"
            >
              À propos
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </a>
            <a
              href="#reservation"
              className="bg-primary hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-all transform hover:scale-105"
            >
              Réserver
            </a>
          </div>

          {/* Bouton mobile */}
          <div className="md:hidden">
            <a
              href="#reservation"
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
