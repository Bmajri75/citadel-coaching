// src/components/Highlights.jsx

function Highlights() {
  return (
    <section id="highlights" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full">
              <p className="text-accent text-sm font-semibold">🎬 Highlights — Combats professionnels</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Bechir Majri <span className="text-primary">en action</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Regardez les highlights de mes combats MMA professionnels — la technique, l'explosivité et la stratégie que je transmets à mes élèves.
            </p>
          </div>

          {/* Vidéo embed */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/20 bg-black">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/ceS3432vSGw?rel=0&modestbranding=1"
                title="Bechir Majri — Highlights combats MMA professionnels"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Stats sous la vidéo */}
          <div className="grid grid-cols-3 gap-6 mt-10">
            <div className="bg-secondary/60 border border-primary/20 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-primary mb-1">20+</p>
              <p className="text-gray-300 text-sm">Années de pratique</p>
            </div>
            <div className="bg-secondary/60 border border-primary/20 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-primary mb-1">Pro</p>
              <p className="text-gray-300 text-sm">Niveau MMA</p>
            </div>
            <div className="bg-secondary/60 border border-primary/20 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-primary mb-1">⭐ 5/5</p>
              <p className="text-gray-300 text-sm">Avis élèves</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <a
              href="#reservation"
              className="inline-block bg-primary hover:bg-red-700 text-white font-bold px-10 py-4 rounded-xl transition-all transform hover:scale-105 text-lg"
            >
              Réserver une séance avec Bechir
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Highlights;
