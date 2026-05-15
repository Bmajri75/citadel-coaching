// api/_programmes-config.js
// Fichier privé (préfixe _) — non exposé comme route Vercel
// Les URLs PDF sont stockées ici côté serveur uniquement

export const programmesConfig = {
  'mma-debutant': {
    nom: 'Fondamentaux MMA',
    prix: 29,
    pdfUrl: process.env.PDF_MMA_DEBUTANT || '',
  },
  'muay-thai-technique': {
    nom: 'Muay Thai Technique',
    prix: 39,
    pdfUrl: process.env.PDF_MUAY_THAI || '',
  },
  'grappling-soumissions': {
    nom: 'Grappling & Soumissions',
    prix: 49,
    pdfUrl: process.env.PDF_GRAPPLING || '',
  },
};
