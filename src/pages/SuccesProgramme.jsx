// Page de confirmation après achat d'un programme PDF
// Stripe redirige ici avec ?session_id=xxx
// On récupère le lien de téléchargement via l'API
import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

export default function SuccesProgramme() {
  document.title = 'Programme acheté — Citadel Coaching'

  const [params]    = useSearchParams()
  const sessionId   = params.get('session_id')

  const [etat, setEtat]         = useState('chargement')
  const [programme, setProgramme] = useState({ nom: '', pdfUrl: '', email: '' })

  useEffect(() => {
    if (!sessionId) { setEtat('erreur'); return }

    // Appel à l'API PHP qui vérifie le paiement et renvoie le lien de téléchargement
    fetch(`/api/get-program-download?session_id=${encodeURIComponent(sessionId)}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) { setEtat('erreur'); return }
        setProgramme({ nom: data.nom, pdfUrl: data.pdfUrl, email: data.customerEmail })
        setEtat('ok')
      })
      .catch(() => setEtat('erreur'))
  }, [sessionId])

  return (
    <main className="pt-24 pb-20 bg-zinc-950 min-h-screen flex items-center justify-center">
      <div className="container-site max-w-lg text-center">

        {etat === 'chargement' && (
          <p className="text-zinc-400 animate-pulse">Préparation de votre téléchargement…</p>
        )}

        {etat === 'ok' && (
          <div className="card p-8 sm:p-12">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📥</span>
            </div>

            <h1 className="section-title text-2xl sm:text-3xl mb-3">Achat confirmé !</h1>
            <p className="text-zinc-300 mb-2">
              Votre programme <span className="text-white font-semibold">{programme.nom}</span> est prêt.
            </p>
            {programme.email && (
              <p className="text-zinc-400 text-sm mb-6">
                Un lien de téléchargement a également été envoyé à <span className="text-white">{programme.email}</span>.
              </p>
            )}

            {/* Bouton de téléchargement — affiché uniquement si l'URL PDF est renseignée */}
            {programme.pdfUrl ? (
              <a
                href={programme.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary block mb-6"
              >
                Télécharger le PDF
              </a>
            ) : (
              <p className="text-zinc-500 text-sm mb-6 border border-zinc-800 px-4 py-3">
                Le PDF sera envoyé par email dans les prochaines heures.
              </p>
            )}

            <Link to="/programmes" className="text-zinc-500 hover:text-amber-400 text-sm transition-colors">
              Voir les autres programmes →
            </Link>
          </div>
        )}

        {etat === 'erreur' && (
          <div className="card p-8">
            <h1 className="section-title text-2xl mb-3">Paiement non confirmé</h1>
            <p className="text-zinc-400 mb-6">
              Impossible de vérifier votre achat. Si vous avez été prélevé, contactez-nous.
            </p>
            <a href="mailto:contact@citadel-coaching.fr" className="btn-outline block mb-3">
              contact@citadel-coaching.fr
            </a>
            <Link to="/programmes" className="text-zinc-500 hover:text-white text-sm">
              Retour aux programmes
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
