import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const TEXTS = {
  fr: {
    description: 'Coaching privé MMA, Muay Thai et BJJ sur Paris et l\'Île-de-France. Coach diplômé BPJEPS, Purple Belt Gracie Barra, ancien combattant professionnel.',
    nav:         'Navigation',
    liens: [
      { label: 'Accueil',        to: '/'             },
      { label: 'Programmes PDF', to: '/programmes'   },
      { label: 'Blog',           to: '/blog'         },
      { label: 'Réserver',       to: '/#reservation' },
    ],
    contact:   'Contact',
    zone:      '📍 Paris / Île-de-France',
    copyright: 'Tous droits réservés.',
  },
  en: {
    description: 'Private MMA, Muay Thai and BJJ coaching across Paris and Île-de-France. BPJEPS certified coach, Gracie Barra Purple Belt, former professional fighter.',
    nav:         'Navigation',
    liens: [
      { label: 'Home',           to: '/'             },
      { label: 'PDF Programs',   to: '/programmes'   },
      { label: 'Blog',           to: '/blog'         },
      { label: 'Book a session', to: '/#reservation' },
    ],
    contact:   'Contact',
    zone:      '📍 Paris / Île-de-France',
    copyright: 'All rights reserved.',
  },
}

export default function Footer() {
  const { lang } = useLang()
  const tx       = TEXTS[lang]
  const annee    = new Date().getFullYear()

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 pt-12 pb-6">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          <div>
            <img src="/photos/logo-citadel.png" alt="Citadel Coaching" className="h-16 w-auto mb-4" />
            <p className="text-zinc-400 text-sm leading-relaxed">{tx.description}</p>
          </div>

          <div>
            <h3 className="font-heading uppercase tracking-wide text-sm text-white mb-4">{tx.nav}</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              {tx.liens.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-amber-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading uppercase tracking-wide text-sm text-white mb-4">{tx.contact}</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>{tx.zone}</li>
              <li><a href="tel:+33753611477" className="hover:text-amber-400 transition-colors">📞 07 53 61 14 77</a></li>
              <li><a href="mailto:contact@citadel-coaching.fr" className="hover:text-amber-400 transition-colors">✉️ contact@citadel-coaching.fr</a></li>
              <li className="pt-2 flex gap-4">
                <a href="https://www.instagram.com/bmmajri/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Instagram</a>
                <a href="https://www.youtube.com/@bmajri" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">YouTube</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
          © {annee} Citadel Coaching — Bechir Majri. {tx.copyright}
        </div>
      </div>
    </footer>
  )
}
