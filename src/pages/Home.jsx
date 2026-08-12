import { useLang } from '../context/LangContext'
import { useSEO }  from '../hooks/useSEO'
import Hero         from '../components/Hero'
import HowItWorks   from '../components/HowItWorks'
import Services     from '../components/Services'
import About        from '../components/About'
import Gallery      from '../components/Gallery'
import Tarifs       from '../components/Tarifs'
import Testimonials from '../components/Testimonials'

const STATS_TEXTS = {
  fr: [
    { valeur: '+10 ans', label: "d'expérience" },
    { valeur: '38',      label: 'avis 5 étoiles' },
    { valeur: 'Certifiés', label: 'diplômés d\'État' },
    { valeur: '90€',     label: 'la séance d\'1h' },
  ],
  en: [
    { valeur: '10+ yrs',    label: 'of experience' },
    { valeur: '38',         label: '5-star reviews' },
    { valeur: 'Certified',  label: 'state diplomas' },
    { valeur: '€90',        label: '1h session' },
  ],
}

function Stats() {
  const { lang } = useLang()
  const chiffres = STATS_TEXTS[lang]
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

  useSEO({
    title:       lang === 'fr'
      ? 'Citadel Coaching — Coach MMA certifié BPJEPS Paris / IDF · Muay Thai · BJJ'
      : 'Citadel Coaching — BPJEPS Certified MMA Coach Paris / IDF · Muay Thai · BJJ',
    description: lang === 'fr'
      ? 'Coach MMA certifié BPJEPS sur Paris et Île-de-France. Séances privées sur-mesure — MMA, Muay Thai, BJJ, Musculation. 90€/h, réservez en ligne, 7j/7.'
      : 'BPJEPS certified MMA coach in Paris and Île-de-France. Tailored private sessions — MMA, Muay Thai, BJJ, Strength training. €90/h, book online, 7 days/week.',
    canonical:   'https://citadel-coaching.fr/',
  })

  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <Services />
      <About />
      <Gallery />
      <Tarifs />
      <Testimonials />
    </>
  )
}
