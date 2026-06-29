// Section Hero — première chose que voit le visiteur
// Plein écran, photo de fond avec superposition sombre, titre et CTAs
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const TEXTS = {
  fr: {
    badge:    'Paris / Île-de-France',
    titre1:   'Coaching MMA',
    titre2:   'Privé Paris / IDF',
    sous:     'Muay Thai · BJJ Gi & NoGi · MMA · Grappling',
    accroche: 'Coach certifié BPJEPS, Purple Belt Gracie Barra,\nancien combattant professionnel — tous niveaux, 7j/7.',
    cta1:     'Réserver une séance — 70€',
    cta2:     'Voir les programmes',
    scroll:   'Défiler',
  },
  en: {
    badge:    'Paris / Île-de-France',
    titre1:   'Private MMA',
    titre2:   'Coaching Paris / IDF',
    sous:     'Muay Thai · BJJ Gi & NoGi · MMA · Grappling',
    accroche: 'BPJEPS certified coach, Gracie Barra Purple Belt,\nformer professional MMA fighter — all levels, 7 days/week.',
    cta1:     'Book a session — €70',
    cta2:     'View programs',
    scroll:   'Scroll',
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
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 container-site px-4">
        <p className="inline-block border border-amber-500 text-amber-400 font-heading uppercase tracking-widest text-xs px-4 py-1 mb-6">
          {tx.badge}
        </p>

        <h1 className="section-title text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4">
          {tx.titre1}<br />
          <span className="text-amber-400">{tx.titre2}</span>
        </h1>

        <p className="text-zinc-300 text-lg sm:text-xl mb-3 font-body">{tx.sous}</p>

        <p className="text-zinc-400 max-w-xl mx-auto mb-8 text-sm sm:text-base whitespace-pre-line">
          {tx.accroche}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/#reservation" onClick={e => { const el = document.getElementById('reservation'); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }) } }} className="btn-primary text-base py-3 px-8">{tx.cta1}</a>
          <Link to="/programmes"   className="btn-outline text-base py-3 px-8">{tx.cta2}</Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-zinc-400 text-xs flex flex-col items-center gap-1">
        <span>{tx.scroll}</span>
        <span>↓</span>
      </div>
    </section>
  )
}
