// src/components/StripeCheckout.jsx
// Redirection simple vers le Payment Link Stripe — zéro backend
import { useEffect } from 'react';

function StripeCheckout({ formData, onBack }) {
  const paymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK;

  const handlePay = () => {
    if (!paymentLink) {
      alert('Lien de paiement non configuré. Contactez le coach.');
      return;
    }
    // Encode les infos client dans l'URL pour pré-remplir Stripe si possible
    const url = new URL(paymentLink);
    url.searchParams.set('prefilled_email', formData.email || '');
    window.location.href = url.toString();
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Paiement sécurisé</h3>

      {/* Récapitulatif */}
      <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 mb-6">
        <h4 className="text-white font-bold mb-3">
          Récapitulatif de votre commande :
        </h4>
        <div className="space-y-2 text-gray-300 text-sm mb-4">
          <p>
            🥋 <strong>Discipline :</strong> {formData.discipline}
          </p>
          <p>
            📅 <strong>Date :</strong>{' '}
            {new Date(formData.date).toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <p>
            🕐 <strong>Heure :</strong> {formData.heure}
          </p>
          <p>
            📍 <strong>Lieu :</strong> 15 bd Gouvion-Saint-Cyr, 75017 Paris
          </p>
        </div>
        <div className="border-t border-primary/30 pt-4">
          <div className="flex justify-between text-white text-xl font-bold">
            <span>Total à payer :</span>
            <span>90,00 €</span>
          </div>
        </div>
      </div>

      {/* Info sécurité */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
        <p className="text-green-400 text-sm">
          <strong>🔒 Paiement sécurisé</strong> — Vous allez être redirigé vers
          la page de paiement Stripe. Vos données bancaires sont protégées.
        </p>
      </div>

      {/* Boutons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-black/50 hover:bg-black text-white font-semibold rounded-lg border-2 border-primary/30 transition-all"
        >
          ← Retour
        </button>
        <button
          type="button"
          onClick={handlePay}
          className="flex-1 px-6 py-3 bg-primary hover:bg-red-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <span>🔒</span>
          <span>Payer 90€ en ligne</span>
        </button>
      </div>

      {/* Sécurité */}
      <div className="mt-6 text-center text-gray-400 text-xs">
        <p>🔒 Paiement sécurisé par Stripe • SSL/TLS</p>
        <p>Vos informations bancaires ne sont jamais stockées sur nos serveurs</p>
      </div>
    </div>
  );
}

export default StripeCheckout;
