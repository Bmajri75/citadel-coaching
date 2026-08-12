import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const TEXTS = {
  fr: {
    badge:    'Coach certifié BPJEPS — Paris / Île-de-France',
    titre1:   'Coaching MMA privé',
    titre2:   'à Paris',
    sous:     'MMA · Muay Thai · BJJ · Grappling · Musculation',
    accroche: 'Coach diplômé d\'État. Séances sur-mesure à Paris et en Île-de-France.\nRéservez en ligne — commencez cette semaine.',
    cta1:     'Réserver ma séance',
    cta2:     'Voir les programmes',
  },
  en: {
    badge:    'BPJEPS Certified Coach — Paris / Île-de-France',
    titre1:   'Private MMA coaching',
    titre2:   'in Paris',
    sous:     'MMA · Muay Thai · BJJ · Grappling · Strength',
    accroche: 'State-certified BPJEPS coach. Tailored sessions in Paris and Île-de-France.\nBook online — start this week.',
    cta1:     'Book my session',
    cta2:     'View programs',
  },
}

export default function Hero() {
  const { lang } = useLang()
  const tx       = TEXTS[lang]

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-center"
      style={{
        backgroundImage: 'url(/photos/hero-entree.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 container-site px-4 max-w-3xl">
        <p className="inline-flex items-center gap-2 border border-amber-500/60 text-amber-400 font-heading uppercase tracking-widest text-xs px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
          {tx.badge}
        </p>

        <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-7xl leading-[1.05] mb-4">
          {tx.titre1}<br />
          <span className="text-amber-400">{tx.titre2}</span>
        </h1>

        <p className="text-zinc-300 text-sm sm:text-lg mb-2 font-body tracking-wide">{tx.sous}</p>

        <p className="text-zinc-400 max-w-xl mx-auto mb-8 text-sm sm:text-base whitespace-pre-line leading-relaxed">
          {tx.accroche}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/demande-coaching" className="btn-primary text-sm sm:text-base py-3 px-8 sm:py-3.5 sm:px-10">{tx.cta1}</Link>
          <Link to="/programmes" className="btn-outline text-sm sm:text-base py-3 px-8 sm:py-3.5 sm:px-10">{tx.cta2}</Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500 flex flex-col items-center gap-1">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
