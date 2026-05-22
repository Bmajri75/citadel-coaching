// Page de détail d'un programme + bouton d'achat
// L'ID du programme vient de l'URL : /programmes/:id
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProgrammeById } from '../data/programmes'

export default function ProgrammeDetail() {
  const { id } = useParams() // Récupère l'ID depuis l'URL
  const programme = getProgrammeById(id)

  const [email, setEmail]         = useState('')
  const [nom, setNom]             = useState('')
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur]       = useState('')

  // Programme introuvable → page 404 simple
  if (!programme) {
    return (
      <main className="pt-24 pb-20 bg-zinc-950 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="section-title mb-4">Programme introuvable</h1>
          <Link to="/programmes" className="btn-outline">← Voir tous les programmes</Link>
        </div>
      </main>
    )
  }

  document.title = `${programme.nom} — Citadel Coaching`

  const acheter = async (e) => {
    e.preventDefault()
    if (!email) return
    setErreur('')
    setChargement(true)

    try {
      // Appel à l'API PHP qui crée une session Stripe Checkout pour le programme
      const res = await fetch('/api/create-program-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ programmeId: programme.id, email, nom }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error ?? 'Une erreur est survenue.')

      // Redirection vers la page de paiement Stripe
      window.location.href = data.url
    } catch (err) {
      setErreur(err.message)
      setChargement(false)
    }
  }

  return (
    <main className="pt-24 pb-20 bg-zinc-950 min-h-screen">
      <div className="container-site max-w-4xl">

        {/* Lien retour */}
        <Link to="/programmes" className="text-zinc-500 hover:text-amber-400 text-sm font-heading uppercase tracking-wide transition-colors mb-8 inline-block">
          ← Retour aux programmes
        </Link>

        {/* Grille : info à gauche, achat à droite */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Détails du programme (3 colonnes sur desktop) */}
          <div className="lg:col-span-3">
            <img
              src={programme.image}
              alt={programme.nom}
              className="w-full h-56 object-cover mb-6"
            />

            <div className="flex gap-3 mb-4">
              <span className="border border-amber-500/50 text-amber-400 text-xs font-heading uppercase px-2 py-1">{programme.niveau}</span>
              <span className="border border-zinc-700 text-zinc-400 text-xs font-heading uppercase px-2 py-1">{programme.discipline}</span>
              <span className="border border-zinc-700 text-zinc-400 text-xs font-heading uppercase px-2 py-1">{programme.duree}</span>
            </div>

            <h1 className="section-title mb-3">{programme.nom}</h1>
            <p className="text-zinc-300 mb-6 leading-relaxed">{programme.description}</p>

            {/* Ce que le programme contient */}
            <h2 className="font-heading uppercase text-sm text-white tracking-wide mb-3">Contenu du programme</h2>
            <ul className="space-y-2.5">
              {programme.details.map(d => (
                <li key={d} className="flex items-start gap-3 text-zinc-300 text-sm">
                  <span className="text-amber-400 mt-0.5 flex-shrink-0">✓</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Bloc achat (2 colonnes sur desktop, fixe en haut) */}
          <div className="lg:col-span-2">
            <div className="card p-6 sticky top-24">
              <p className="text-3xl font-heading font-bold text-amber-400 mb-1">{programme.prix}€</p>
              <p className="text-zinc-500 text-xs mb-5">Téléchargement PDF instantané après paiement</p>

              <form onSubmit={acheter} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-zinc-400 text-xs uppercase tracking-wide font-heading">Votre prénom</label>
                  <input
                    type="text"
                    value={nom}
                    onChange={e => setNom(e.target.value)}
                    placeholder="Jean"
                    className="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-zinc-400 text-xs uppercase tracking-wide font-heading">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="jean@exemple.fr"
                    className="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                {erreur && (
                  <p className="text-red-400 text-sm border border-red-800 px-3 py-2">⚠ {erreur}</p>
                )}

                <button
                  type="submit"
                  disabled={chargement}
                  className="btn-primary w-full text-center py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {chargement ? 'Redirection…' : `Acheter — ${programme.prix}€`}
                </button>

                <p className="text-center text-zinc-600 text-xs">Paiement sécurisé · Stripe</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
