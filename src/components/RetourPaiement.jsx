// src/components/RetourPaiement.jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function RetourPaiement() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [customerEmail, setCustomerEmail] = useState('');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    fetch(`/api/session-status?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email || '');
      })
      .catch(() => setStatus('error'));
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-white text-xl">Vérification du paiement...</div>
      </div>
    );
  }

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold text-white mb-4">Paiement confirmé !</h1>
          <p className="text-gray-300 mb-6">
            Merci pour votre réservation. Un email de confirmation a été envoyé à{' '}
            <strong className="text-white">{customerEmail}</strong>.
          </p>
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-8">
            <p className="text-accent text-sm">
              📍 15 bd Gouvion-Saint-Cyr, 75017 Paris<br />
              📞 +33 7 53 61 14 77
            </p>
          </div>
          <a
            href="/"
            className="inline-block bg-primary hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-all"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">❌</div>
        <h1 className="text-3xl font-bold text-white mb-4">Paiement non complété</h1>
        <p className="text-gray-300 mb-8">
          Le paiement n'a pas pu être finalisé. Aucun montant n'a été débité.
        </p>
        <a
          href="/#reservation"
          className="inline-block bg-primary hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-all"
        >
          Réessayer
        </a>
      </div>
    </div>
  );
}

export default RetourPaiement;
