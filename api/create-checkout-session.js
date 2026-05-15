import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { nom, email, tel, discipline, date, heure } = req.body;

  if (!nom || !email || !discipline || !date || !heure) {
    return res.status(400).json({ error: 'Informations de réservation incomplètes.' });
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
              name: `Séance privée - ${discipline}`,
              description: `${new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} à ${heure} • 15 bd Gouvion-Saint-Cyr, 75017 Paris`,
            },
            unit_amount: 9000,
          },
          quantity: 1,
        },
      ],
      metadata: { nom, tel, discipline, date, heure },
      success_url: `${siteUrl}/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#reservation`,
      locale: 'fr',
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Erreur Stripe :', err);
    res.status(500).json({ error: err.message });
  }
}
