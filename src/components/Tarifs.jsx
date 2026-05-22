// Section "Zones d'intervention & Tarifs"
// Remplace les références à l'adresse précise (Paris 17 / Bd Gouvion-Saint-Cyr)
// Affiche un tableau avec bordures dégradées dorées
import { useLang } from '../context/LangContext'

const TEXTS = {
  fr: {
    surtitre: 'Où j\'interviens',
    titre:    'Zones & Tarifs',
    zone:     'Paris & Île-de-France',
    lignes: [
      { service: 'Séance privée',       tarif: '90€ / heure',          detail: 'Sur rendez-vous, 7j/7' },
      { service: 'Déplacement',         tarif: 'Prix selon la distance', detail: 'Je viens chez vous ou en salle' },
      { service: 'Stage',               tarif: 'Sur devis',              detail: 'Groupes, clubs, entreprises' },
      { service: 'Coaching international', tarif: 'Sur demande',         detail: 'Déplacements possibles à l\'étranger' },
    ],
    note: '* Contactez-moi pour établir un devis personnalisé',
    cta:  'Réserver une séance',
  },
  en: {
    surtitre: 'Where I work',
    titre:    'Zones & Pricing',
    zone:     'Paris & Île-de-France',
    lignes: [
      { service: 'Private session',     tarif: '€90 / hour',             detail: 'By appointment, 7 days/week' },
      { service: 'Travel to you',       tarif: 'Distance-based pricing', detail: 'I come to your location or gym' },
      { service: 'Training camp',       tarif: 'Custom quote',           detail: 'Groups, clubs, corporate events' },
      { service: 'International coaching', tarif: 'On request',          detail: 'Available for international travel' },
    ],
    note: '* Contact me for a personalised quote',
    cta:  'Book a session',
  },
}

export default function Tarifs() {
  const { lang } = useLang()
  const tx       = TEXTS[lang]

  return (
    <section id="tarifs" className="py-20 bg-zinc-950">
      <div className="container-site max-w-3xl">

        <div className="text-center mb-10">
          <p className="text-amber-400 font-heading uppercase tracking-widest text-sm mb-2">{tx.surtitre}</p>
          <h2 className="section-title">{tx.titre}</h2>
          <span className="section-divider mx-auto" />
          <p className="text-zinc-400 text-sm mt-3">{tx.zone}</p>
        </div>

        {/* Tableau avec bordure dégradée dorée
            Astuce CSS : on met un fond dégradé sur le conteneur, puis un fond plein sur l'intérieur.
            L'espace de 1px entre les deux crée l'effet de bordure dégradée. */}
        <div
          className="p-px rounded"
          style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #78350f 50%, #f59e0b 100%)' }}
        >
          <div className="bg-zinc-900 rounded overflow-hidden">

            {tx.lignes.map((l, i) => (
              <div
                key={l.service}
                className={`grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 p-5 sm:p-6 items-center ${
                  // Ligne de séparation entre les lignes (sauf la dernière)
                  i < tx.lignes.length - 1 ? 'border-b border-zinc-800' : ''
                } ${
                  // Première ligne mise en valeur (la séance principale)
                  i === 0 ? 'bg-amber-500/5' : ''
                }`}
              >
                {/* Nom du service */}
                <p className={`font-heading uppercase tracking-wide text-sm ${
                  i === 0 ? 'text-amber-400' : 'text-white'
                }`}>
                  {l.service}
                </p>

                {/* Tarif — mis en valeur */}
                <p className={`font-heading font-bold text-xl sm:text-center ${
                  i === 0 ? 'text-amber-400' : 'text-white'
                }`}>
                  {l.tarif}
                </p>

                {/* Détail */}
                <p className="text-zinc-400 text-sm sm:text-right">{l.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-zinc-600 text-xs text-center mt-4">{tx.note}</p>

        <div className="text-center mt-8">
          <a href="/#reservation" className="btn-primary">{tx.cta}</a>
        </div>
      </div>
    </section>
  )
}
