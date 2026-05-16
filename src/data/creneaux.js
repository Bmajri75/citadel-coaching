// src/data/creneaux.js

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
    description: 'Combat complet alliant pieds-poings et grappling. Développez votre explosivité, votre technique de combat global et votre condition physique.',
    emoji: '🥊',
  },
  {
    id: 2,
    nom: 'Muay Thai',
    titre: 'Boxe Thaïlandaise',
    description: "L'art des 8 membres. Travaillez vos coups de poing, de pied, genoux et coudes dans un travail technique et cardio de haute intensité.",
    emoji: '🇹🇭',
  },
  {
    id: 3,
    nom: 'BJJ',
    titre: 'Jiu-Jitsu Brésilien — Gi & NoGi',
    description: 'Combat au sol et soumissions en Gi et NoGi. Maîtrisez les projections, contrôles et soumissions avec la méthode Gracie Barra — la référence mondiale.',
    emoji: '🥋',
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
    'Tous niveaux — du débutant au compétiteur',
    'Feedback détaillé après chaque séance',
    'Disponible 7j/7 pour toutes vos questions',
  ],
  lieu: '15 bd Gouvion-Saint-Cyr, 75017 Paris',
  metro: 'Porte Maillot (Ligne 1) • Porte de Champerret (Ligne 3 / T3b)',
  horaires: 'Tous les jours : 08h-10h et 14h-17h',
};

export const coach = {
  nom: 'Bechir Majri',
  titre: 'Coach sportif diplômé BPJEPS • Purple Belt Gracie Barra',
  diplomes: [
    'BPJEPS Sports de Contact',
    'BF2 FMMAF',
    'Purple Belt Gracie Barra',
    'Professionnel MMA',
  ],
  bio: `Ancien combattant professionnel de MMA, diplômé BPJEPS et Purple Belt Gracie Barra. Je coache tous les niveaux — du débutant complet au compétiteur.\n\nUne approche directe : bases solides, technique irréprochable, programme sur mesure.`,
  specialites: [
    'MMA — Combat complet',
    'Muay Thai — Boxe Thaïlandaise',
    'BJJ — Jiu-Jitsu Brésilien (Gi & NoGi)',
    'Préparation physique combat',
  ],
  tel: '+33 7 53 61 14 77',
  email: 'bmajri@gmail.com',
};
