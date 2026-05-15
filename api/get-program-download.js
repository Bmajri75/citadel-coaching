import Stripe from 'stripe';
import { programmesConfig } from './_programmes-config.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'session_id manquant.' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'Paiement non confirmé.' });
    }

    const programmeId = session.metadata?.programmeId;
    const programme = programmesConfig[programmeId];

    if (!programme) {
      return res.status(404).json({ error: 'Programme introuvable.' });
    }

    res.status(200).json({
      nom: programme.nom,
      pdfUrl: programme.pdfUrl,
      customerEmail: session.customer_details?.email || '',
    });
  } catch (err) {
    console.error('Erreur vérification paiement :', err);
    res.status(500).json({ error: err.message });
  }
}
