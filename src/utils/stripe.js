// src/utils/stripe.js
import { loadStripe } from '@stripe/stripe-js';

// Utilise la variable d'environnement
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default stripePromise;
export const PRIX_SEANCE = 7000;
export const PAYMENT_INFO = {
  currency: 'eur',
  description: 'Séance de coaching privé Citadel Coaching',
  amount: PRIX_SEANCE,
};
