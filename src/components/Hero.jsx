// src/components/Hero.jsx

function Hero() {
  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary/30 to-secondary -z-10"></div>

      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 py-20 text-center">
        {/* Badge */}
        <div className="inline-block mb-6 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full">
          <p className="text-accent text-sm font-semibold">
            🥋 Coach diplômé BPJEPS • Ancien combattant pro de MMA
          </p>
        </div>

        {/* Titre principal */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          BECHIR MAJRI
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            COACHING PRIVÉ
          </span>
        </h1>

        {/* Sous-titre */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          MMA • Muay Thai • Grappling
        </p>

        <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto">
          Dépassez vos limites avec un coaching personnalisé adapté à tous les
          niveaux. Du débutant au confirmé, atteignez vos objectifs.
        </p>

        {/* Prix */}
        <div className="inline-block mb-8 px-8 py-4 bg-secondary/80 border border-primary/30 rounded-xl">
          <p className="text-accent text-sm font-semibold mb-1">Séance privée</p>
          <p className="text-4xl font-bold text-white">
            90€ <span className="text-lg text-gray-400">/ heure</span>
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#reservation"
            className="bg-primary hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/50 w-full sm:w-auto"
          >
            Réserver maintenant
          </a>
          <a
            href="#disciplines"
            className="bg-secondary/80 hover:bg-secondary text-white font-semibold px-8 py-4 rounded-lg border border-primary/30 hover:border-primary transition-all w-full sm:w-auto"
          >
            Découvrir les disciplines
          </a>
        </div>

        {/* Infos */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-primary text-2xl">📍</span>
            <span>Paris 17ème • Porte Maillot</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-2xl">⏰</span>
            <span>Du lundi au Dimanche</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-2xl">✅</span>
            <span>Tous niveaux acceptés</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#disciplines" className="text-white/50 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default Hero;
