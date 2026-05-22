import { useLang } from '../context/LangContext'

const TEXTS = {
  fr: {
    surtitre:    'Ce que j\'enseigne',
    titre:       'Les Disciplines',
    disciplines: [
      {
        nom:         'Muay Thai',
        image:       '/photos/fight-kick.jpg',
        alt:         'Cours de Muay Thai Paris — coaching privé Bechir Majri',
        description: "L'art des 8 membres — poings, pieds, genoux, coudes. Technique debout, gestion des distances et conditionnement physique poussé. Tous niveaux, de l'initiation à la préparation combat.",
        points: ['Garde et déplacements', 'Combinaisons et timing', 'Travail au sac et à la mitaine', 'Sparring encadré'],
      },
      {
        nom:         'BJJ / Grappling',
        image:       '/photos/coach-gi.jpg',
        alt:         'Coaching privé BJJ Paris — Bechir Majri en kimono Gi',
        description: 'Maîtrisez le combat au sol. Positions, renversements, soumissions — en Gi comme en NoGi. Méthode Gracie Barra adaptée à tous les gabarits et tous les niveaux.',
        points: ['Positions fondamentales', 'Takedowns et renversements', 'Soumissions Gi & NoGi', 'Préparation compétition'],
      },
      {
        nom:         'MMA',
        image:       '/photos/fight-mma.jpg',
        alt:         'Coaching privé MMA Paris — séance avec Bechir Majri',
        description: "L'art martial complet. On assemble ici le travail debout (Muay Thai), les transitions et le sol (BJJ/Grappling). Programme sur mesure : compétition, autodéfense ou remise en forme.",
        points: ['Transitions debout / sol', 'Stratégie de combat', 'Conditionnement MMA', 'Analyse vidéo sur demande'],
      },
    ],
  },
  en: {
    surtitre:    'What I teach',
    titre:       'Disciplines',
    disciplines: [
      {
        nom:         'Muay Thai',
        image:       '/photos/fight-kick.jpg',
        alt:         'Private Muay Thai classes Paris — Coach Bechir Majri',
        description: 'The art of 8 limbs — punches, kicks, knees, elbows. Stand-up technique, distance management and intensive conditioning. All levels, from beginner to fight preparation.',
        points: ['Guard & footwork', 'Combinations & timing', 'Pad and bag work', 'Supervised sparring'],
      },
      {
        nom:         'BJJ / Grappling',
        image:       '/photos/coach-gi.jpg',
        alt:         'Private BJJ coaching Paris — Bechir Majri in Gi',
        description: 'Master ground fighting. Positions, takedowns, submissions — Gi and NoGi. Gracie Barra method adapted for all body types and skill levels.',
        points: ['Fundamental positions', 'Takedowns & sweeps', 'Gi & NoGi submissions', 'Competition prep'],
      },
      {
        nom:         'MMA',
        image:       '/photos/fight-mma.jpg',
        alt:         'Private MMA coaching Paris — Bechir Majri session',
        description: 'The complete martial art. We combine stand-up striking (Muay Thai), transitions and ground work (BJJ/Grappling). Custom program: competition, self-defense or fitness.',
        points: ['Stand-up / ground transitions', 'Fight strategy', 'MMA conditioning', 'Video analysis on request'],
      },
    ],
  },
}

export default function Services() {
  const { lang }    = useLang()
  const tx          = TEXTS[lang]

  return (
    <section id="disciplines" className="py-20 bg-zinc-900">
      <div className="container-site">

        <div className="text-center mb-12">
          <p className="text-amber-400 font-heading uppercase tracking-widest text-sm mb-2">{tx.surtitre}</p>
          <h2 className="section-title">{tx.titre}</h2>
          <span className="section-divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tx.disciplines.map(d => (
            <div key={d.nom} className="card group overflow-hidden flex flex-col">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={d.image}
                  alt={d.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                  <h3 className="text-2xl font-heading font-bold uppercase text-white">{d.nom}</h3>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{d.description}</p>
                <ul className="mt-auto space-y-1.5">
                  {d.points.map(p => (
                    <li key={p} className="flex items-center gap-2 text-sm text-zinc-300">
                      <span className="text-amber-400 flex-shrink-0">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
