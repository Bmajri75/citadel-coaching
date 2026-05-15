// src/components/Hero.jsx
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary/20 to-black -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-secondary via-secondary/80 to-transparent -z-10"></div>

      <div className="container mx-auto px-6 py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Colonne gauche — Texte */}
          <div>
            {/* Badge */}
            <div className="inline-block mb-6 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full">
              <p className="text-accent text-sm font-semibold">
                🥋 Coach diplômé BPJEPS • Purple Belt Gracie Barra • Ancien combattant pro MMA
              </p>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              BECHIR MAJRI
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                COACHING PRIVÉ
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-3">MMA • Muay Thai • Grappling</p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              20 ans d'expérience au service de votre progression. Coaching personnalisé, tous niveaux, 7j/7 à Paris 17ème.
            </p>

            {/* Prix */}
            <div className="inline-block mb-8 px-6 py-3 bg-secondary/80 border border-primary/30 rounded-xl">
              <p className="text-accent text-sm font-semibold mb-1">Séance privée</p>
              <p className="text-3xl font-bold text-white">
                90€ <span className="text-base text-gray-400">/ heure</span>
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="#reservation"
                className="bg-primary hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/50 text-center"
              >
                Réserver une séance
              </a>
              <Link
                to="/programmes"
                className="bg-secondary/80 hover:bg-secondary text-white font-semibold px-8 py-4 rounded-lg border border-primary/30 hover:border-primary transition-all text-center"
              >
                📚 Programmes PDF
              </Link>
            </div>

            {/* Infos */}
            <div className="flex flex-wrap gap-5 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary">📍</span>
                <span>Paris 17ème • Porte Maillot</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">⏰</span>
                <span>7j/7 • 08h-10h et 14h-17h</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✅</span>
                <span>Tous niveaux acceptés</span>
              </div>
            </div>
          </div>

          {/* Colonne droite — Photo */}
          <div className="relative hidden md:block">
            <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/20">
              <img
                src="/photos/hero.jpg"
                alt="Bechir Majri — Citadel Coaching"
                className="w-full h-auto object-cover"
                style={{ maxHeight: '620px', objectPosition: 'top center' }}
              />
              {/* Overlay dégradé bas */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary to-transparent"></div>
            </div>

            {/* Badge flottant */}
            <div className="absolute -bottom-4 -left-4 bg-primary text-white font-bold px-5 py-3 rounded-xl shadow-xl">
              <p className="text-sm">20 ans d'expérience</p>
            </div>
            <div className="absolute top-4 right-4 bg-black/70 border border-primary/40 text-white font-semibold px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
              🥊 Combattant pro MMA
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#disciplines" className="text-white/40 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default Hero;
