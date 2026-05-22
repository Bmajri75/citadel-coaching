// Page blog — liste les articles disponibles
import { Link } from 'react-router-dom'
import { ARTICLES } from '../data/blog'
import { useLang } from '../context/LangContext'
import { useSEO }  from '../hooks/useSEO'

const TEXTS = {
  fr: { surtitre: 'Conseils & techniques', titre: 'Le Blog', description: 'MMA, Muay Thai, BJJ — articles pratiques rédigés par un coach certifié.', lire: 'Lire l\'article →' },
  en: { surtitre: 'Tips & techniques',     titre: 'Blog',    description: 'MMA, Muay Thai, BJJ — practical articles written by a certified coach.',   lire: 'Read article →'  },
}

export default function Blog() {
  const { lang } = useLang()
  const tx       = TEXTS[lang]

  useSEO({
    title:       lang === 'fr' ? 'Blog MMA Paris — Conseils Coach Certifié | Citadel Coaching' : 'MMA Blog Paris — Tips from a Certified Coach | Citadel Coaching',
    description: lang === 'fr' ? 'Articles pratiques sur le MMA, Muay Thai et BJJ rédigés par Bechir Majri, coach certifié BPJEPS et ancien combattant professionnel à Paris.' : 'Practical articles on MMA, Muay Thai and BJJ by Bechir Majri, BPJEPS certified coach and former professional fighter in Paris.',
    canonical:   'https://citadel-coaching.fr/blog',
  })

  const formaterDate = (iso) =>
    new Date(iso).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <main className="pt-24 pb-20 bg-zinc-950 min-h-screen">
      <div className="container-site">

        <div className="text-center mb-12">
          <p className="text-amber-400 font-heading uppercase tracking-widest text-sm mb-2">{tx.surtitre}</p>
          <h1 className="section-title">{tx.titre}</h1>
          <span className="section-divider mx-auto" />
          <p className="text-zinc-400 max-w-xl mx-auto text-sm mt-2">{tx.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES.map(a => {
            const titre = lang === 'en' && a.titreEn   ? a.titreEn   : a.titre
            const desc  = lang === 'en' && a.descriptionEn ? a.descriptionEn : a.description
            return (
              <Link key={a.slug} to={`/blog/${a.slug}`} className="card group overflow-hidden flex flex-col hover:border-amber-500/50 transition-colors">
                <div className="h-52 overflow-hidden">
                  <img src={a.image} alt={titre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <p className="text-zinc-600 text-xs font-heading uppercase tracking-wide">{formaterDate(a.date)}</p>
                  <h2 className="font-heading font-semibold text-lg uppercase tracking-wide text-white group-hover:text-amber-400 transition-colors">{titre}</h2>
                  <p className="text-zinc-400 text-sm flex-1">{desc}</p>
                  <span className="text-amber-400 text-sm font-heading uppercase tracking-wide mt-2">{tx.lire}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
