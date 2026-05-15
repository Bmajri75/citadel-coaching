// src/components/StripeCheckout.jsx
import { useState } from 'react';

function StripeCheckout({ formData, onBack }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePay = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Impossible de créer la session de paiement.');
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Paiement sécurisé</h3>

      {/* Récapitulatif */}
      <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 mb-6">
        <h4 className="text-white font-bold mb-3">Récapitulatif de votre commande :</h4>
        <div className="space-y-2 text-gray-300 text-sm mb-4">
          <p>🥋 <strong>Discipline :</strong> {formData.discipline}</p>
          <p>
            📅 <strong>Date :</strong>{' '}
            {new Date(formData.date).toLocaleDateString('fr-FR', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            })}
          </p>
          <p>🕐 <strong>Heure :</strong> {formData.heure}</p>
          <p>👤 <strong>Nom :</strong> {formData.nom}</p>
          <p>📧 <strong>Email :</strong> {formData.email}</p>
          <p>📍 <strong>Lieu :</strong> 15 bd Gouvion-Saint-Cyr, 75017 Paris</p>
        </div>
        <div className="border-t border-primary/30 pt-4 flex justify-between text-white text-xl font-bold">
          <span>Total à payer :</span>
          <span>90,00 €</span>
        </div>
      </div>

      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
        <p className="text-green-400 text-sm">
          <strong>🔒 Paiement sécurisé</strong> — Vous allez être redirigé vers la page
          de paiement Stripe. Vos données bancaires sont protégées par chiffrement SSL.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
          <p className="text-red-300 text-sm">⚠️ {error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="px-6 py-3 bg-black/50 hover:bg-black text-white font-semibold rounded-lg border-2 border-primary/30 transition-all disabled:opacity-50"
        >
          ← Retour
        </button>
        <button
          type="button"
          onClick={handlePay}
          disabled={loading}
          className="flex-1 px-6 py-3 bg-primary hover:bg-red-700 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin inline-block">⏳</span>
              <span>Redirection en cours...</span>
            </>
          ) : (
            <>
              <span>🔒</span>
              <span>Payer 90€ en ligne</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-6 text-center text-gray-400 text-xs">
        <p>🔒 Paiement sécurisé par Stripe • SSL/TLS</p>
        <p>Vos informations bancaires ne sont jamais stockées sur nos serveurs</p>
      </div>
    </div>
  );
}

export default StripeCheckout;
