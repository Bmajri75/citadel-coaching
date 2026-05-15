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
    descriptionComplete: [
      'Le MMA (Mixed Martial Arts) est la discipline de combat la plus complète qui soit, alliant frappe debout, clinch et combat au sol dans un seul et même art. Le coaching privé MMA Paris 17 s\'adresse à tous les niveaux — du grand débutant cherchant à découvrir la discipline, jusqu\'au compétiteur souhaitant affiner sa stratégie de combat.',
      'Lors de chaque séance de coaching privé MMA à Paris, vous travaillez les fondamentaux dans le bon ordre : garde et déplacements, jab-cross, coups de pied et genoux, entrées en lutte et transitions debout-sol. Chaque erreur est corrigée immédiatement, avant qu\'elle ne devienne un réflexe ancré. C\'est l\'avantage décisif du coaching individuel sur les cours collectifs.',
      'Débuter le MMA à Paris sans expérience est non seulement possible, c\'est même recommandé. En 8 à 12 semaines de séances régulières, les progrès sont visibles : explosivité, coordination, gestion de l\'espace et confiance en soi évoluent rapidement. Le coaching MMA Paris 17 est disponible 7j/7, de 08h à 10h et de 14h à 17h, à Porte Maillot.',
    ],
    emoji: '🥊',
  },
  {
    id: 2,
    nom: 'Muay Thai',
    titre: 'Boxe Thaïlandaise',
    description: "L'art des 8 membres. Travaillez vos coups de poing, de pied, genoux et coudes dans un travail technique et cardio de haute intensité.",
    descriptionComplete: [
      'Le Muay Thai, ou boxe thaïlandaise, est l\'art des 8 membres : poings, coudes, genoux et tibias. Discipline de référence pour les combattants MMA du monde entier, elle développe une frappe puissante, précise et coordonnée, tout en forgeant un cardio et une résistance physique hors du commun.',
      'Les cours Muay Thai Paris 17 en format individuel vous permettent de progresser deux à trois fois plus vite qu\'en cours collectif. Chaque séance de boxe thaïlandaise Paris individuel est structurée : travail technique sur sac, pattes d\'ours, enchaînements poing-pied-genou, travail de clinch et défense. Votre garde, votre mobilité de hanches et vos réflexes évoluent séance après séance.',
      'Une heure de cours Muay Thai Paris 17 brûle entre 700 et 900 kcal selon votre niveau d\'engagement — l\'une des disciplines les plus efficaces pour la perte de poids et la remise en forme. Idéal également pour la self-défense, le Muay Thai s\'adapte à tous les profils, du débutant complet à l\'athlète confirmé cherchant à perfectionner sa technique de frappe.',
    ],
    emoji: '🇹🇭',
  },
  {
    id: 3,
    nom: 'BJJ',
    titre: 'Jiu-Jitsu Brésilien — Gi & NoGi',
    description: 'Combat au sol et soumissions en Gi et NoGi. Maîtrisez les projections, contrôles et soumissions avec la méthode Gracie Barra — la référence mondiale.',
    descriptionComplete: [
      'Le Jiu-Jitsu Brésilien (BJJ) regroupe toutes les techniques de combat au sol sans frappes : projections, contrôles de position, étranglements et clés articulaires. Pratiqué en Gi (kimono) et en NoGi (sans kimono), le cours BJJ Paris 17 en coaching privé est dispensé dans la tradition Gracie Barra par un Purple Belt certifié. Vous progressez sans les lacunes qu\'un cours collectif laisse souvent s\'installer.',
      'En Jiu-Jitsu Brésilien Paris privé, vous apprenez les 4 positions clés — garde, demi-garde, monture et contrôle du dos — ainsi que les soumissions fondamentales : rear naked choke, triangle et armbar. Les statistiques MMA sont claires : environ 70% des combats professionnels se terminent au sol. Maîtriser le BJJ Paris 17 est indispensable pour tout pratiquant de sport de combat sérieux.',
      'Le format NoGi (short + rashguard, sans kimono) est particulièrement adapté au MMA et au submission wrestling. Que vous prépariez une compétition de BJJ Gi ou NoGi, que vous souhaitiez compléter votre MMA, ou simplement découvrir l\'art subtil du combat au sol, ce coaching Jiu-Jitsu Brésilien Paris 17 basé sur la méthode Gracie Barra vous fournira des outils techniques immédiatement applicables.',
    ],
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
  bio: `Passionné de sports de combat depuis plus de 20 ans, j'ai forgé mon expérience comme combattant professionnel de MMA avant de me consacrer entièrement au coaching. Diplômé BPJEPS et Purple Belt Gracie Barra, je coache aujourd'hui des athlètes de tous niveaux — du grand débutant au compétiteur.\n\nMon approche est simple : des bases solides, une technique irréprochable, et une progression adaptée à chaque personne. Que votre objectif soit la forme, la confiance en vous ou la compétition, je construis un programme sur mesure pour vous.`,
  specialites: [
    'MMA — Combat complet',
    'Muay Thai — Boxe Thaïlandaise',
    'BJJ — Jiu-Jitsu Brésilien (Gi & NoGi)',
    'Préparation physique combat',
  ],
  tel: '+33 7 53 61 14 77',
  email: 'bmajri@gmail.com',
};
