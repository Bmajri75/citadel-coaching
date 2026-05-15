// src/components/Succes.jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Succes() {
  const [searchParams] = useSearchParams();
  const [info, setInfo] = useState(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) return;
    fetch(`/api/session-status?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => setInfo(data))
      .catch(() => {});
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">

        <div className="text-7xl mb-6">✅</div>

        <h1 className="text-4xl font-bold text-white mb-4">
          Réservation confirmée !
        </h1>

        <p className="text-gray-300 text-lg mb-2">
          Merci pour votre paiement.
        </p>

        {info?.customer_email && (
          <p className="text-gray-400 mb-8">
            Un email de confirmation a été envoyé à{' '}
            <strong className="text-white">{info.customer_email}</strong>.
          </p>
        )}

        <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 mb-8 text-left">
          <h2 className="text-white font-bold mb-4">Votre séance :</h2>
          <div className="space-y-2 text-gray-300 text-sm">
            <p>📍 <strong>Lieu :</strong> 15 bd Gouvion-Saint-Cyr, 75017 Paris</p>
            <p>🚇 <strong>Métro :</strong> Porte Maillot (L1) • Porte de Champerret (L3)</p>
            <p>📞 <strong>Contact :</strong> +33 7 53 61 14 77</p>
            <p>💰 <strong>Montant payé :</strong> 90,00 €</p>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-8">
          <p className="text-accent text-sm">
            En cas de question ou d'empêchement, contactez Bechir Majri au{' '}
            <strong>+33 7 53 61 14 77</strong> ou par email à{' '}
            <strong>bmajri@gmail.com</strong>.
          </p>
        </div>

        <a
          href="/"
          className="inline-block bg-primary hover:bg-red-700 text-white font-semibold px-10 py-4 rounded-lg transition-all transform hover:scale-105"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}

export default Succes;
