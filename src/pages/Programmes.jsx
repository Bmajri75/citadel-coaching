// Page listant les programmes PDF
// Les programmes sont temporairement désactivés (disabled: true dans programmes.js)
import { useLang } from '../context/LangContext'
import { useSEO }  from '../hooks/useSEO'
import { PROGRAMMES } from '../data/programmes'

const TEXTS = {
  fr: {
    surtitre:       'Téléchargement immédiat après paiement',
    titre:          "Programmes d'Entraînement",
    description:    'Des programmes structurés conçus par un coach certifié, à suivre chez vous ou en salle.',
    bientot:        'Bientôt disponible',
    voir:           'Voir le programme →',
    note_combat:    '⚠ Les sports de combat nécessitent une pratique physique avec un partenaire. Ces programmes proposent les bases en solo (drilles, shadow work) — utiles pour préparer vos séances de coaching privé.',
    note_combat_titre: 'À propos des programmes de combat',
  },
  en: {
    surtitre:       'Immediate download after payment',
    titre:          'Training Programs',
    description:    'Structured programs designed by a certified coach, to follow at home or in the gym.',
    bientot:        'Coming soon',
    voir:           'View program →',
    note_combat:    '⚠ Combat sports require physical practice with a partner. These programs cover the solo fundamentals (drills, shadow work) — useful to prepare for your private coaching sessions.',
    note_combat_titre: 'About the combat programs',
  },
}

export default function Programmes() {
  const { lang } = useLang()
  const tx       = TEXTS[lang]

  useSEO({
    title:       lang === 'fr' ? 'Programmes d\'Entraînement MMA PDF — Citadel Coaching' : 'MMA Training Programs PDF — Citadel Coaching',
    description: lang === 'fr' ? 'Programmes d\'entraînement MMA, Muay Thai, BJJ et musculation en PDF — conçus par un coach certifié BPJEPS. Téléchargement immédiat après paiement.' : 'MMA, Muay Thai, BJJ and weight training programs in PDF — designed by a BPJEPS certified coach. Immediate download after payment.',
    canonical:   'https://citadel-coaching.fr/programmes',
  })

  // Programmes de sport de combat (affiche la note d'avertissement)
  const progsCombat   = PROGRAMMES.filter(p => ['MMA', 'Muay Thai', 'BJJ Gi / NoGi'].includes(p.discipline))
  const progsFitness  = PROGRAMMES.filter(p => !['MMA', 'Muay Thai', 'BJJ Gi / NoGi'].includes(p.discipline))

  return (
    <main className="pt-24 pb-20 bg-zinc-950 min-h-screen">
      <div className="container-site">

        <div className="text-center mb-12">
          <p className="text-amber-400 font-heading uppercase tracking-widest text-sm mb-2">{tx.surtitre}</p>
          <h1 className="section-title">{tx.titre}</h1>
          <span className="section-divider mx-auto" />
          <p className="text-zinc-400 max-w-xl mx-auto text-sm mt-2">{tx.description}</p>
        </div>

        {/* Note d'avertissement pour les programmes de combat */}
        <div className="mb-10 border border-amber-500/30 bg-amber-500/5 p-5">
          <p className="font-heading uppercase text-amber-400 text-xs tracking-wide mb-2">{tx.note_combat_titre}</p>
          <p className="text-zinc-300 text-sm leading-relaxed">{tx.note_combat}</p>
        </div>

        {/* Programmes combat */}
        <ProgrammeGrille programmes={progsCombat} lang={lang} tx={tx} />

        {/* Séparateur */}
        <div className="my-12 border-t border-zinc-800" />

        {/* Programmes fitness */}
        <ProgrammeGrille programmes={progsFitness} lang={lang} tx={tx} />

      </div>
    </main>
  )
}

// Composant interne — grille de cartes programmes
function ProgrammeGrille({ programmes, lang, tx }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {programmes.map(p => {
        const nom    = lang === 'en' && p.nomEn    ? p.nomEn    : p.nom
        const niveau = lang === 'en' && p.niveauEn ? p.niveauEn : p.niveau
        const desc   = lang === 'en' && p.descriptionEn ? p.descriptionEn : p.description

        return (
          <div key={p.id} className={`card flex flex-col overflow-hidden ${p.disabled ? 'opacity-80' : ''}`}>

            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <img src={p.image} alt={nom} className="w-full h-full object-cover" loading="lazy" />

              {/* Badge niveau */}
              <div className="absolute top-3 left-3 bg-black/70 text-amber-400 text-xs font-heading uppercase px-2 py-1 tracking-wide">
                {niveau}
              </div>

              {/* Bannière "Bientôt disponible" par-dessus l'image */}
              {p.disabled && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="border border-amber-500 text-amber-400 font-heading uppercase text-sm tracking-widest px-4 py-2">
                    {tx.bientot}
                  </span>
                </div>
              )}
            </div>

            {/* Contenu */}
            <div className="p-5 flex flex-col flex-1 gap-2">
              <h2 className="font-heading font-semibold uppercase text-white tracking-wide">{nom}</h2>
              <p className="text-zinc-500 text-xs">{p.discipline} · {p.duree}</p>
              <p className="text-zinc-400 text-sm flex-1">{desc}</p>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800">
                <span className={`text-2xl font-heading font-bold ${p.disabled ? 'text-zinc-600' : 'text-amber-400'}`}>
                  {p.prix}€
                </span>
                {/* Pas de lien si désactivé */}
                {!p.disabled && (
                  <span className="text-amber-400 text-sm font-heading uppercase tracking-wide">{tx.voir}</span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
