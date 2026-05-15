// api/_programmes-config.js
// Fichier privé (préfixe _) — non exposé comme route Vercel
// Les URLs PDF sont stockées ici côté serveur uniquement

export const programmesConfig = {
  'mma-debutant': {
    nom: 'MMA Débutant',
    prix: 29,
    pdfUrl: process.env.PDF_MMA_DEBUTANT || '',
  },
  'muay-thai-debutant': {
    nom: 'Muay Thai Débutant',
    prix: 29,
    pdfUrl: process.env.PDF_MUAY_THAI_DEBUTANT || '',
  },
  'grappling-debutant': {
    nom: 'Grappling Débutant',
    prix: 29,
    pdfUrl: process.env.PDF_GRAPPLING_DEBUTANT || '',
  },
  'musculation-debutant': {
    nom: 'Musculation Débutant',
    prix: 29,
    pdfUrl: process.env.PDF_MUSCULATION_DEBUTANT || '',
  },
  'musculation-sport-combat': {
    nom: 'Muscu & Sport de Combat',
    prix: 39,
    pdfUrl: process.env.PDF_MUSCULATION_SPORT_COMBAT || '',
  },
  'programme-minceur': {
    nom: 'Programme Minceur',
    prix: 29,
    pdfUrl: process.env.PDF_MINCEUR || '',
  },
};
