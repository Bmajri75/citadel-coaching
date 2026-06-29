// Page d'accueil — assemble toutes les sections dans l'ordre d'affichage
import { useEffect } from 'react'
import { useLang } from '../context/LangContext'
import { useSEO }  from '../hooks/useSEO'
import Hero            from '../components/Hero'
import Services        from '../components/Services'
import About           from '../components/About'
import Gallery         from '../components/Gallery'
import Tarifs          from '../components/Tarifs'
import Testimonials    from '../components/Testimonials'
import ReservationForm from '../components/ReservationForm'

// Barre de statistiques clés
const STATS_TEXTS = {
  fr: [
    { valeur: '+10 ans', label: "d'expérience" },
    { valeur: '38',      label: 'avis 5 étoiles' },
    { valeur: '7j/7',    label: 'disponibilité' },
    { valeur: '70€',     label: "la séance d'1h" },
  ],
  en: [
    { valeur: '10+ yrs', label: 'of experience' },
    { valeur: '38',      label: '5-star reviews' },
    { valeur: '7d/wk',   label: 'availability' },
    { valeur: '€70',     label: '1h session' },
  ],
}

function Stats() {
  const { lang }  = useLang()
  const chiffres  = STATS_TEXTS[lang]
  return (
    <div className="bg-amber-500 py-8">
      <div className="container-site grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {chiffres.map(c => (
          <div key={c.label}>
            <p className="font-heading font-bold text-2xl sm:text-3xl text-black">{c.valeur}</p>
            <p className="text-black/70 text-sm font-body uppercase tracking-wide">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const { lang } = useLang()

  useEffect(() => {
    if (window.location.hash === '#reservation') {
      setTimeout(() => {
        document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [])

  useSEO({
    title:       lang === 'fr' ? 'Coach MMA Paris — Coaching Privé MMA · Muay Thai · BJJ | Bechir Majri' : 'MMA Coach Paris — Private MMA · Muay Thai · BJJ Coaching | Bechir Majri',
    description: lang === 'fr' ? 'Coach MMA certifié BPJEPS, Purple Belt Gracie Barra, ancien combattant professionnel. Coaching privé MMA, Muay Thai, BJJ sur Paris et IDF — 70€/h, 7j/7.' : 'BPJEPS certified MMA coach, Gracie Barra Purple Belt, former professional fighter. Private MMA, Muay Thai, BJJ coaching in Paris and Île-de-France — €70/h, 7 days/week.',
    canonical:   'https://citadel-coaching.fr/',
  })

  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <About />
      <Gallery />
      <Tarifs />
      <Testimonials />
      <ReservationForm />
    </>
  )
}
