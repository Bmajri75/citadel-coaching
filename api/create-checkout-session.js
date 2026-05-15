import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { nom, email, tel, discipline, date, heure } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'payment',
      currency: 'eur',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Séance privée - ${discipline}`,
              description: `${date} à ${heure} • 15 bd Gouvion-Saint-Cyr, 75017 Paris`,
            },
            unit_amount: 9000, // 90€ en centimes
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: { nom, tel, discipline, date, heure },
      return_url: `${process.env.VITE_SITE_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.status(200).json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error('Erreur Stripe :', err);
    res.status(500).json({ error: err.message });
  }
}
