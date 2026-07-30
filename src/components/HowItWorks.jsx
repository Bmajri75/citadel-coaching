import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const TEXTS = {
  fr: {
    surtitre: 'Simple et rapide',
    titre:    'Comment ça marche',
    etapes: [
      { num: '01', titre: 'Vous choisissez votre coach', desc: 'Parcourez les profils certifiés du collectif. Chaque coach est diplômé d\'État et vérifié par Citadel Coaching.' },
      { num: '02', titre: 'Vous remplissez votre demande', desc: 'Discipline, objectif, disponibilités — quelques lignes suffisent. Indiquez vos préférences, on s\'adapte.' },
      { num: '03', titre: 'Vous payez en ligne (90€)', desc: 'Paiement sécurisé via Stripe. Visa, Mastercard, Amex. Votre séance est confirmée instantanément.' },
      { num: '04', titre: 'Votre coach vous contacte', desc: 'Sous 24h maximum, votre coach confirme le lieu de rendez-vous et se prépare pour vous.' },
    ],
    cta: 'Commencer maintenant',
  },
  en: {
    surtitre: 'Simple and fast',
    titre:    'How it works',
    etapes: [
      { num: '01', titre: 'Choose your coach', desc: 'Browse certified profiles from our collective. Every coach holds a state diploma and has been verified by Citadel Coaching.' },
      { num: '02', titre: 'Fill in your request', desc: 'Discipline, goal, availability — a few lines is all it takes. Tell us your preferences, we adapt.' },
      { num: '03', titre: 'Pay online (€90)', desc: 'Secure payment via Stripe. Visa, Mastercard, Amex. Your session is confirmed instantly.' },
      { num: '04', titre: 'Your coach contacts you', desc: 'Within 24 hours maximum, your coach confirms the meeting location and prepares for you.' },
    ],
    cta: 'Get started',
  },
}

export default function HowItWorks() {
  const { lang } = useLang()
  const tx = TEXTS[lang]

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container-site">
        <div className="text-center mb-14">
          <p className="text-amber-400 font-heading uppercase tracking-widest text-sm mb-2">{tx.surtitre}</p>
          <h2 className="section-title">{tx.titre}</h2>
          <span className="section-divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tx.etapes.map((e, i) => (
            <div key={e.num} className="relative">
              {i < tx.etapes.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-full w-full h-px bg-zinc-700 z-0" style={{ width: 'calc(100% - 2rem)' }} />
              )}
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                  <span className="font-heading font-bold text-amber-400 text-lg">{e.num}</span>
                </div>
                <h3 className="font-heading font-bold text-base mb-2 text-white">{e.titre}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/demande-coaching" className="btn-primary text-base py-3.5 px-10">{tx.cta}</Link>
        </div>
      </div>
    </section>
  )
}
