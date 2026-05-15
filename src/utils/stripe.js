// src/utils/stripe.js
// Payment Link Stripe — aucun backend nécessaire
// Le Payment Link est défini dans .env : VITE_STRIPE_PAYMENT_LINK=https://buy.stripe.com/VOTRE_LIEN

export const PRIX_SEANCE = 9000; // 90€ en centimes (pour référence)
export const PAYMENT_INFO = {
  currency: 'eur',
  description: 'Séance de coaching privé Citadel Coaching',
  amount: PRIX_SEANCE,
};
