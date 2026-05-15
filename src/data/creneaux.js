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
    description:
      'Combat complet alliant pieds-poings et grappling. Développez votre explosivité, votre technique de combat global et votre condition physique.',
    emoji: '🥊',
  },
  {
    id: 2,
    nom: 'Muay Thai',
    titre: 'Boxe Thaïlandaise',
    description:
      "L'art des 8 membres. Travaillez vos coups de poing, de pied, genoux et coudes dans un travail technique et cardio de haute intensité.",
    emoji: '🇹🇭',
  },
  {
    id: 3,
    nom: 'Grappling',
    titre: 'Jiu-Jitsu Brésilien',
    description:
      'Combat au sol et soumissions. Maîtrisez les projections, contrôles et soumissions avec la méthode Gracie Barra — la référence mondiale.',
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
  bio: `Passionné de sports de combat depuis plus de 20 ans, j'ai forgé mon expérience comme combattant professionnel de MMA avant de me consacrer entièrement au coaching. Diplômé BPJEPS et Purple Belt Gracie Barra, je coache aujourd'hui des athlètes de tous niveaux — du grand débutant au compétiteur.\n\nMon approche est simple : des bases solides, une technique irréprochable, et une progression adaptée à chaque personne. Que votre objectif soit la forme, la confiance en vous ou la compétition, je construis un programme sur mesure pour vous.`,
  specialites: [
    'MMA — Combat complet',
    'Muay Thai — Boxe Thaïlandaise',
    'Grappling & Jiu-Jitsu Brésilien',
    'Préparation physique combat',
  ],
  tel: '+33 7 53 61 14 77',
  email: 'bmajri@gmail.com',
};
