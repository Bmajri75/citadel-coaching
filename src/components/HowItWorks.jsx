import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const TEXTS = {
  fr: {
    surtitre: 'Simple et rapide',
    titre:    'Comment ça marche',
    etapes: [
      { num: '01', titre: 'Remplissez votre demande', desc: 'Discipline, objectif, disponibilités — quelques lignes suffisent. Je m\'adapte à votre niveau et vos contraintes.' },
      { num: '02', titre: 'Payez en ligne (90€)', desc: 'Paiement sécurisé via Stripe. Visa, Mastercard, Amex. Votre séance est enregistrée instantanément.' },
      { num: '03', titre: 'Je vous contacte sous 24h', desc: 'Je vous appelle ou vous écris pour confirmer le lieu de rendez-vous et préparer votre première séance.' },
    ],
    cta: 'Réserver ma séance',
  },
  en: {
    surtitre: 'Simple and fast',
    titre:    'How it works',
    etapes: [
      { num: '01', titre: 'Fill in your request', desc: 'Discipline, goal, availability — a few lines is all it takes. I adapt to your level and schedule.' },
      { num: '02', titre: 'Pay online (€90)', desc: 'Secure payment via Stripe. Visa, Mastercard, Amex. Your session is registered instantly.' },
      { num: '03', titre: 'I contact you within 24h', desc: 'I call or message you to confirm the meeting location and prepare for your first session.' },
    ],
    cta: 'Book my session',
  },
}

export default function HowItWorks() {
  const { lang } = useLang()
  const tx = TEXTS[lang]

  return (
    <section className="py-12 md:py-20 bg-zinc-900">
      <div className="container-site">
        <div className="text-center mb-8 md:mb-14">
          <p className="text-amber-400 font-heading uppercase tracking-widest text-sm mb-2">{tx.surtitre}</p>
          <h2 className="section-title">{tx.titre}</h2>
          <span className="section-divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 md:mb-12">
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
