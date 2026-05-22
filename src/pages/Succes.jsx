// Page de confirmation après paiement d'une séance
// Stripe redirige ici avec ?session_id=xxx — on vérifie + on affiche le récap complet
import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const TEXTS = {
  fr: {
    verification: 'Vérification du paiement…',
    titre:        'Séance confirmée !',
    merci:        'Merci pour votre réservation.',
    emailEnvoye:  'Un email de confirmation a été envoyé à',
    contact24h:   'Bechir vous contactera sous 24h pour confirmer le lieu de rendez-vous.',
    urgence:      "En cas d'urgence :",
    retour:       "Retour à l'accueil",
    discipline:   'Discipline',
    date:         'Date',
    heure:        'Heure',
    montant:      'Montant payé',
    erreurTitre:  'Paiement non confirmé',
    erreurDesc:   "Le paiement n'a pas pu être vérifié. Si vous avez été prélevé, contactez-nous immédiatement.",
    retourAccueil: "Retour à l'accueil",
  },
  en: {
    verification: 'Verifying payment…',
    titre:        'Session confirmed!',
    merci:        'Thank you for your booking.',
    emailEnvoye:  'A confirmation email has been sent to',
    contact24h:   'Bechir will contact you within 24h to confirm the meeting location.',
    urgence:      'In case of emergency:',
    retour:       'Back to home',
    discipline:   'Discipline',
    date:         'Date',
    heure:        'Time',
    montant:      'Amount paid',
    erreurTitre:  'Payment not confirmed',
    erreurDesc:   "Payment could not be verified. If you were charged, contact us immediately.",
    retourAccueil: 'Back to home',
  },
}

export default function Succes() {
  const { lang }                    = useLang()
  const tx                          = TEXTS[lang]
  const [params]                    = useSearchParams()
  const sessionId                   = params.get('session_id')
  const [etat, setEtat]             = useState('chargement')
  const [reservation, setReservation] = useState(null)

  useEffect(() => {
    if (!sessionId) { setEtat('erreur'); return }

    fetch(`/api/session-status?session_id=${encodeURIComponent(sessionId)}`)
      .then(r => r.json())
      .then(data => {
        if (data.status === 'complete' || data.status === 'paid') {
          setReservation(data)
          setEtat('ok')
        } else {
          setEtat('erreur')
        }
      })
      .catch(() => setEtat('erreur'))
  }, [sessionId])

  document.title = lang === 'fr' ? 'Réservation confirmée — Citadel Coaching' : 'Booking confirmed — Citadel Coaching'

  return (
    <main className="pt-24 pb-20 bg-zinc-950 min-h-screen flex items-center justify-center">
      <div className="container-site max-w-lg text-center">

        {etat === 'chargement' && (
          <p className="text-zinc-400 animate-pulse">{tx.verification}</p>
        )}

        {etat === 'ok' && reservation && (
          <div className="card p-8 sm:p-10">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-amber-400">✓</span>
            </div>

            <h1 className="section-title text-2xl sm:text-3xl mb-2">{tx.titre}</h1>
            <p className="text-zinc-300 mb-6">{tx.merci}</p>

            {/* Récapitulatif de la réservation */}
            <div className="border border-zinc-800 mb-6 text-left">
              {reservation.discipline && (
                <div className="flex justify-between px-4 py-3 border-b border-zinc-800">
                  <span className="text-zinc-500 text-sm">{tx.discipline}</span>
                  <span className="text-white font-semibold text-sm">{reservation.discipline}</span>
                </div>
              )}
              {reservation.date && (
                <div className="flex justify-between px-4 py-3 border-b border-zinc-800">
                  <span className="text-zinc-500 text-sm">{tx.date}</span>
                  <span className="text-white font-semibold text-sm">{reservation.date}</span>
                </div>
              )}
              {reservation.heure && (
                <div className="flex justify-between px-4 py-3 border-b border-zinc-800">
                  <span className="text-zinc-500 text-sm">{tx.heure}</span>
                  <span className="text-white font-semibold text-sm">{reservation.heure}</span>
                </div>
              )}
              <div className="flex justify-between px-4 py-3">
                <span className="text-zinc-500 text-sm">{tx.montant}</span>
                <span className="text-amber-400 font-bold">90 €</span>
              </div>
            </div>

            {reservation.customer_email && (
              <p className="text-zinc-400 text-sm mb-2">
                {tx.emailEnvoye} <span className="text-white">{reservation.customer_email}</span>
              </p>
            )}
            <p className="text-zinc-400 text-sm mb-1">{tx.contact24h}</p>
            <p className="text-zinc-400 text-sm mb-8">
              {tx.urgence}{' '}
              <a href="tel:+33753611477" className="text-amber-400">07 53 61 14 77</a>
            </p>

            <Link to="/" className="btn-primary">{tx.retour}</Link>
          </div>
        )}

        {etat === 'erreur' && (
          <div className="card p-8">
            <h1 className="section-title text-2xl mb-3">{tx.erreurTitre}</h1>
            <p className="text-zinc-400 mb-6">{tx.erreurDesc}</p>
            <a href="mailto:contact@citadel-coaching.fr" className="btn-outline block mb-3">
              contact@citadel-coaching.fr
            </a>
            <Link to="/" className="text-zinc-500 hover:text-white text-sm">{tx.retourAccueil}</Link>
          </div>
        )}

      </div>
    </main>
  )
}
