// src/components/StripeCheckout.jsx
import { useCallback, useState } from 'react';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { stripePromise } from '../utils/stripe';

function StripeCheckout({ formData, onBack }) {
  const [error, setError] = useState(null);

  const fetchClientSecret = useCallback(async () => {
    setError(null);
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Erreur lors de la création du paiement.');
      throw new Error(data.error);
    }

    const { clientSecret } = await res.json();
    return clientSecret;
  }, [formData]);

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Paiement sécurisé</h3>

      {/* Récapitulatif */}
      <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 mb-6">
        <h4 className="text-white font-bold mb-3">Récapitulatif :</h4>
        <div className="space-y-1 text-gray-300 text-sm mb-4">
          <p>🥋 <strong>Discipline :</strong> {formData.discipline}</p>
          <p>
            📅 <strong>Date :</strong>{' '}
            {new Date(formData.date).toLocaleDateString('fr-FR', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            })}
          </p>
          <p>🕐 <strong>Heure :</strong> {formData.heure}</p>
          <p>👤 <strong>Nom :</strong> {formData.nom}</p>
          <p>📍 <strong>Lieu :</strong> 15 bd Gouvion-Saint-Cyr, 75017 Paris</p>
        </div>
        <div className="border-t border-primary/30 pt-4 flex justify-between text-white text-xl font-bold">
          <span>Total :</span>
          <span>90,00 €</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
          <p className="text-red-300 text-sm">⚠️ {error}</p>
        </div>
      )}

      {/* Checkout Stripe intégré */}
      <div className="rounded-xl overflow-hidden mb-6">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="px-6 py-3 bg-black/50 hover:bg-black text-white font-semibold rounded-lg border-2 border-primary/30 transition-all"
      >
        ← Retour
      </button>

      <div className="mt-6 text-center text-gray-400 text-xs">
        <p>🔒 Paiement sécurisé par Stripe • SSL/TLS</p>
        <p>Vos informations bancaires ne sont jamais stockées sur nos serveurs</p>
      </div>
    </div>
  );
}

export default StripeCheckout;
