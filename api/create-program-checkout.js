import Stripe from 'stripe';
import { programmesConfig } from './_programmes-config.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { programmeId, email, nom } = req.body;

  if (!programmeId || !email) {
    return res.status(400).json({ error: 'Informations manquantes.' });
  }

  const programme = programmesConfig[programmeId];
  if (!programme) {
    return res.status(404).json({ error: 'Programme introuvable.' });
  }

  const siteUrl = process.env.SITE_URL || process.env.VITE_SITE_URL;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: programme.nom,
              description: 'Programme PDF — Citadel Coaching',
            },
            unit_amount: programme.prix * 100,
          },
          quantity: 1,
        },
      ],
      metadata: { programmeId, nom: nom || '' },
      success_url: `${siteUrl}/succes-programme?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/programmes/${programmeId}`,
      locale: 'fr',
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Erreur Stripe programme :', err);
    res.status(500).json({ error: err.message });
  }
}
