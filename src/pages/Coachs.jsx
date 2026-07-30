import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useSEO } from '../hooks/useSEO'
import { useLang } from '../context/LangContext'

const DISCIPLINES_FR = { mma: 'MMA', muay_thai: 'Muay Thai', bjj: 'BJJ', musculation: 'Musculation' }

const TEXTS = {
  fr: {
    surtitre:  'Collectif certifié',
    titre:     'Nos Coachs',
    sous:      'Chaque coach est diplômé d\'État, titulaire d\'une carte professionnelle valide et sélectionné personnellement par Citadel Coaching.',
    demande:   'Demander une séance',
    experience:'d\'expérience',
    zones:     'Zones',
    disciplines:'Disciplines',
    aucun:     'Aucun coach disponible pour le moment.',
  },
  en: {
    surtitre:  'Certified collective',
    titre:     'Our Coaches',
    sous:      'Every coach holds a state diploma, a valid professional card, and has been personally selected by Citadel Coaching.',
    demande:   'Request a session',
    experience:'of experience',
    zones:     'Areas',
    disciplines:'Disciplines',
    aucun:     'No coaches available at the moment.',
  },
}

export default function Coachs() {
  const { lang } = useLang()
  const tx = TEXTS[lang]
  const [coachs, setCoachs] = useState([])
  const [chargement, setChargement] = useState(true)

  useSEO({
    title: lang === 'fr'
      ? 'Nos Coachs MMA Paris — Collectif Certifié | Citadel Coaching'
      : 'Our MMA Coaches Paris — Certified Collective | Citadel Coaching',
    description: lang === 'fr'
      ? 'Découvrez les coachs certifiés de Citadel Coaching : MMA, Muay Thai, BJJ, Musculation. Diplômés d\'État, sélectionnés sur Paris et IDF.'
      : 'Meet the certified coaches of Citadel Coaching: MMA, Muay Thai, BJJ, Strength training. State-certified, based in Paris and IDF.',
    canonical: 'https://citadel-coaching.fr/coachs',
  })

  useEffect(() => {
    supabase
      .from('coaches')
      .select('id, prenom, nom, bio, photo_url, discipline_principale, disciplines_sec, zones, experience')
      .eq('is_published', true)
      .eq('statut_verification', 'verifie')
      .then(({ data }) => {
        setCoachs(data ?? [])
        setChargement(false)
      })
  }, [])

  return (
    <main className="pt-28 pb-20 bg-zinc-950 min-h-screen">
      <div className="container-site">

        <div className="text-center mb-16">
          <p className="text-amber-400 font-heading uppercase tracking-widest text-sm mb-3">{tx.surtitre}</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{tx.titre}</h1>
          <span className="section-divider mx-auto mb-6" />
          <p className="text-zinc-400 max-w-2xl mx-auto text-base leading-relaxed">{tx.sous}</p>
        </div>

        {chargement ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : coachs.length === 0 ? (
          <p className="text-center text-zinc-500 py-20">{tx.aucun}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {coachs.map(coach => (
              <div key={coach.id} className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-amber-500/40 transition-colors">
                <div className="aspect-[4/3] bg-zinc-800 overflow-hidden">
                  {coach.photo_url
                    ? <img src={coach.photo_url} alt={`${coach.prenom} ${coach.nom}`} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-zinc-600 text-5xl font-bold">{coach.prenom?.[0]}</div>
                  }
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-heading font-bold mb-1">{coach.prenom} {coach.nom}</h2>
                  {coach.discipline_principale && (
                    <p className="text-amber-400 font-heading uppercase tracking-wide text-xs mb-3">{DISCIPLINES_FR[coach.discipline_principale] ?? coach.discipline_principale}</p>
                  )}
                  {coach.bio && <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3">{coach.bio}</p>}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(coach.disciplines_sec ?? []).map(d => (
                      <span key={d} className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 px-2 py-0.5 rounded">
                        {DISCIPLINES_FR[d] ?? d}
                      </span>
                    ))}
                  </div>
                  {coach.zones?.length > 0 && (
                    <p className="text-zinc-500 text-xs">{tx.zones} : {coach.zones.join(', ')}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link to="/demande-coaching" className="btn-primary text-lg px-8 py-4">
            {tx.demande}
          </Link>
        </div>

      </div>
    </main>
  )
}
