// src/data/creneaux.js

// Créneaux disponibles tous les jours : 08:00 / 09:00 / 14:00 / 15:00 / 16:00
const creneauxJournaliers = ['08:00', '09:00', '14:00', '15:00', '16:00'];

export const creneaux = {
  lundi:    creneauxJournaliers,
  mardi:    creneauxJournaliers,
  mercredi: creneauxJournaliers,
  jeudi:    creneauxJournaliers,
  vendredi: creneauxJournaliers,
  samedi:   creneauxJournaliers,
  dimanche: creneauxJournaliers,
};

export const disciplines = [
  {
    id: 1,
    nom: 'MMA',
    titre: 'Mixed Martial Arts',
    description:
      "Combat complet alliant pieds-poings et grappling. Développez votre explosivité et votre technique de combat global.",
    emoji: '🥊',
  },
  {
    id: 2,
    nom: 'Muay Thai',
    titre: 'Boxe Thaïlandaise',
    description:
      "L'art des 8 membres. Travaillez vos coups de poing, coups de pied, genoux et coudes. Cardio intense garanti.",
    emoji: '🇹🇭',
  },
  {
    id: 3,
    nom: 'Grappling',
    titre: 'Jiu-Jitsu Brésilien',
    description:
      "Combat au sol et soumissions. Maîtrisez les projections, contrôles et étranglements. Technique pure.",
    emoji: '🤼',
  },
];

export const tarif = {
  nom: 'Séance Privée',
  prix: 90,
  duree: '1 heure',
  inclus: [
    'Programme personnalisé à vos objectifs',
    'Coaching technique individuel',
    'Correction posture et gestes',
    'Tous niveaux (débutant à competiteur)',
    'Feedback après séance',
    'Disponible 7j/7 pour toutes questions',
  ],
  lieu: '15 bd Gouvion-Saint-Cyr, 75017 Paris',
  metro: 'Porte Maillot (Ligne 1), Porte de Champerret (Ligne 3) T3b',
};

export const coach = {
  nom: 'Bechir Majri',
  titre: 'Coach sportif diplômé',
  diplomes: [
    'BPJEPS',
    'BF2 (FMMAF)',
    'Purple Belt Gracie Barra',
    'Ancien combattant pro de MMA',
  ],
  bio: `Passionné de sports de combat depuis plus de 20 ans et coach d'athlètes professionnels, je mets mon expérience de combattant et mes compétences de coach diplômé BPJEPS au service de votre progression.\n\nQue vous soyez débutant ou confirmé, mon approche personnalisée vous permettra d'atteindre vos objectifs : perte de poids, gain de confiance, perfectionnement technique.`,
  specialites: ['MMA', 'Muay Thai', 'Grappling'],
  tel: '+33 7 53 61 14 77',
  email: 'bmajri@gmail.com',
};
