// Section témoignages — vrais avis vérifiés publiés sur Superprof
// Source : https://www.superprof.fr/mma-grappling-muay-thai-progressez-coach-diplome-bpjeps-sport-contact-ancien-combattant-professionnel-mma.html
import { useLang } from '../context/LangContext'

const TEXTES_SECTION = {
  fr: {
    surtitre: 'Ce qu\'ils disent',
    titre:    'Avis Vérifiés',
    note:     'Note globale : ★★★★★ 5/5 — 38 avis vérifiés',
    source:   'Avis publié sur Superprof',
  },
  en: {
    surtitre: 'What they say',
    titre:    'Verified Reviews',
    note:     'Overall rating: ★★★★★ 5/5 — 38 verified reviews',
    source:   'Review published on Superprof',
  },
}

// Les avis restent en français — ce sont des citations authentiques de clients francophones
const AVIS = [
  {
    nom:        'Marie-Alix',
    note:       5,
    date:       '21/08/2025',
    discipline: 'MMA',
    texte: "Bechir est tout ce qu'on attend d'un prof particulier et même plus ! Toujours très attentif et à l'écoute, il prend vraiment le temps de comprendre mes besoins et d'adapter chaque séance en fonction de ma progression. On sent à chaque instant qu'il aime enseigner et transmettre sa passion pour le MMA, son énergie et son enthousiasme sont contagieux... Sa pédagogie est excellente : il trouve toujours des solutions claires et efficaces pour m'aider à dépasser mes blocages. Bref, un vrai mélange de professionnalisme, de patience et de passion — je ne peux que recommander, allez-y les yeux fermés !",
  },
  {
    nom:        'Hugo',
    note:       5,
    date:       '10/07/2020',
    discipline: 'MMA',
    texte: "Un excellent prof ! Bechir est un coach exceptionnel, très à l'écoute et qui sait s'adapter à chaque élève. Très observateur et attentif, il arrive à trouver les mots justes pour faire progresser très rapidement. Sa connaissance des arts martiaux est exceptionnelle, et pour cause ; il a combattu dans plusieurs pays et dans plusieurs disciplines, c'est ce qui a orienté mon choix. C'est un vrai passionné qui fait son travail consciencieusement, sur le tatami comme en dehors.",
  },
  {
    nom:        'Rachid',
    note:       5,
    date:       '18/03/2023',
    discipline: 'MMA',
    texte: "J'ai pris mon premier cours en dernière minute. Je ne peux que confirmer ce qui est dit dans les autres avis. Recherché du fait de sa carrière professionnelle et de ses nombreux voyages et entraînements auprès d'autres professionnels. Il sait vraiment ce qu'il fait. Ses entraînements sont structurés et il s'adapte au profil.",
  },
  {
    nom:        'Malik',
    note:       5,
    date:       '25/09/2025',
    discipline: 'MMA',
    texte: "Super coach, pédagogue et motivant, qui adapte ses séances aux objectifs de chacun. Parfait pour progresser rapidement. Je recommande vivement ses cours à tous ceux qui veulent améliorer leur technique et leur condition physique.",
  },
  {
    nom:        'Benjamin',
    note:       5,
    date:       '19/05/2023',
    discipline: 'Muay Thai',
    texte: "Mon 1er cours avec Bechir était plus que parfait. En tant que débutant j'ai été pris en main dès mon entrée dans la salle. Mise à l'aise, échauffement, pédagogie, patience... Tout est bien maîtrisé et expliqué. On a pris le temps et avancé à mon rythme. Hâte d'avoir mon prochain cours !",
  },
  {
    nom:        'Théo',
    note:       5,
    date:       '09/06/2022',
    discipline: 'MMA',
    texte: "Bechir est l'un des meilleurs coachs que j'ai rencontré. Il est pédagogue, attentif, donne de très bons conseils et nous aide à nous surpasser. Il est sympa et humainement il est au top, je recommande les yeux fermés.",
  },
]

export default function Testimonials() {
  const { lang } = useLang()
  const tx       = TEXTES_SECTION[lang]

  const etoiles = (n) => '★'.repeat(n) + '☆'.repeat(5 - n)

  return (
    <section id="avis" className="py-20 bg-zinc-900">
      <div className="container-site">

        <div className="text-center mb-12">
          <p className="text-amber-400 font-heading uppercase tracking-widest text-sm mb-2">{tx.surtitre}</p>
          <h2 className="section-title">{tx.titre}</h2>
          <span className="section-divider mx-auto" />
          <p className="text-zinc-500 text-sm mt-2">{tx.note}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AVIS.map(a => (
            <div key={a.nom} className="card p-6 flex flex-col gap-3">

              <div className="flex items-center justify-between">
                <span className="text-amber-400 text-lg tracking-tight">{etoiles(a.note)}</span>
                <span className="text-xs text-zinc-600 border border-zinc-700 px-2 py-0.5 font-heading uppercase">
                  {a.discipline}
                </span>
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed flex-1">"{a.texte}"</p>

              <div className="border-t border-zinc-800 pt-3 flex items-end justify-between">
                <div>
                  <p className="text-white font-heading font-semibold text-sm">— {a.nom}</p>
                  <p className="text-zinc-600 text-xs">{a.date}</p>
                </div>
                {/* Lien vers la source Superprof */}
                <a
                  href="https://www.superprof.fr/mma-grappling-muay-thai-progressez-coach-diplome-bpjeps-sport-contact-ancien-combattant-professionnel-mma.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-amber-400 text-xs transition-colors"
                  title={tx.source}
                >
                  Superprof ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
