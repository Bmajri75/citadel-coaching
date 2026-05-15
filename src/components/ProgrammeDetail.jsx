// src/components/ProgrammeDetail.jsx
import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getProgrammeById } from '../data/programmes';

function ProgrammeDetail() {
  const { id } = useParams();
  const programme = getProgrammeById(id);

  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!programme) return <Navigate to="/programmes" replace />;

  const handleAchat = async (e) => {
    e.preventDefault();
    if (!email || !nom) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/create-program-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ programmeId: id, email, nom }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors du paiement.');
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">

      {/* Retour */}
      <div className="pt-24 pb-4 px-6">
        <Link to="/programmes" className="text-gray-400 hover:text-white text-sm transition-colors">
          ← Retour aux programmes
        </Link>
      </div>

      {/* Hero programme */}
      <div className={`bg-gradient-to-br ${programme.couleur} py-16 px-6`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-7xl mb-4">{programme.emoji}</div>
          <div className="inline-block bg-primary/20 border border-primary/40 rounded-full px-4 py-1 text-accent text-sm font-semibold mb-4">
            {programme.niveau} • {programme.duree} • {programme.pages}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{programme.nom}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">{programme.accroche}</p>
          <div className="flex items-center justify-center gap-6">
            <span className="text-5xl font-bold text-white">{programme.prix}€</span>
            <a href="#achat" className="bg-primary hover:bg-red-700 text-white font-bold px-10 py-4 rounded-xl transition-all transform hover:scale-105 text-lg">
              Acheter maintenant →
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Ce que vous allez apprendre */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Ce que vous allez <span className="text-primary">apprendre</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {programme.benefices.map((b, i) => (
              <div key={i} className="flex items-start gap-3 bg-primary/10 border border-primary/20 rounded-xl p-4">
                <span className="text-primary text-xl mt-0.5">✓</span>
                <p className="text-gray-200">{b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pour qui */}
        <div className="bg-secondary/80 border border-primary/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            🎯 Ce programme est fait pour vous si...
          </h2>
          <ul className="space-y-3">
            {programme.pourQui.map((p, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Contenu du programme */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Contenu du <span className="text-primary">programme</span>
          </h2>
          <div className="space-y-3">
            {programme.contenu.map((c, i) => (
              <div key={i} className="flex items-center justify-between bg-black/40 border border-primary/10 rounded-xl px-6 py-4 hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs text-accent font-semibold">{c.section}</p>
                    <p className="text-white font-semibold">{c.titre}</p>
                  </div>
                </div>
                <span className="text-gray-500 text-sm">{c.pages}</span>
              </div>
            ))}
          </div>
        </div>

        {/* À propos du coach */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20 rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="text-6xl">👨‍🏫</div>
          <div>
            <p className="text-accent text-sm font-semibold mb-1">Votre coach</p>
            <h3 className="text-2xl font-bold text-white mb-2">Bechir Majri</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Coach diplômé BPJEPS, Purple Belt Gracie Barra et ancien combattant professionnel de MMA.
              Plus de 20 ans d'expérience dans les sports de combat, coach d'athlètes professionnels.
              Ces programmes condensent tout ce que j'ai appris pour vous faire progresser plus vite.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {['BPJEPS', 'BF2 FMMAF', 'Purple Belt Gracie Barra', 'Ancien combattant pro'].map((d) => (
                <span key={d} className="bg-primary/20 text-accent text-xs px-3 py-1 rounded-full">{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Formulaire d'achat */}
        <div id="achat" className="bg-secondary/80 border border-primary/30 rounded-2xl p-8 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">
            Obtenir le programme
          </h2>
          <p className="text-gray-400 text-center text-sm mb-6">
            Téléchargement immédiat après paiement
          </p>

          {/* Récap prix */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 flex justify-between items-center">
            <div>
              <p className="text-white font-bold">{programme.nom}</p>
              <p className="text-gray-400 text-sm">PDF • Accès à vie</p>
            </div>
            <span className="text-2xl font-bold text-white">{programme.prix}€</span>
          </div>

          <form onSubmit={handleAchat} className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">Votre prénom *</label>
              <input
                type="text"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Jean"
                className="w-full bg-black/50 text-white border-2 border-primary/30 focus:border-primary rounded-xl px-4 py-3 outline-none"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Votre email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jean@email.com"
                className="w-full bg-black/50 text-white border-2 border-primary/30 focus:border-primary rounded-xl px-4 py-3 outline-none"
              />
              <p className="text-gray-500 text-xs mt-1">Le lien de téléchargement sera accessible sur la page suivante.</p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3">
                <p className="text-red-300 text-sm">⚠️ {error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !nom}
              className="w-full bg-primary hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            >
              {loading ? (
                <><span className="animate-spin">⏳</span><span>Redirection...</span></>
              ) : (
                <><span>🔒</span><span>Payer {programme.prix}€ et télécharger</span></>
              )}
            </button>
          </form>

          <div className="mt-4 text-center text-gray-500 text-xs">
            🔒 Paiement sécurisé par Stripe • SSL/TLS
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProgrammeDetail;
