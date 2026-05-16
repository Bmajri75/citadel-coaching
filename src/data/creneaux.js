// src/data/creneaux.js — données structurelles uniquement (texte dans src/i18n/)

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
  { id: 1, emoji: '🥊' },
  { id: 2, emoji: '🇹🇭' },
  { id: 3, emoji: '🥋' },
];

export const tarif = {
  prix: 90,
  lieu: '15 bd Gouvion-Saint-Cyr, 75017 Paris',
  metro: 'Porte Maillot (Ligne 1) • Porte de Champerret (Ligne 3 / T3b)',
};

export const coach = {
  nom: 'Bechir Majri',
  tel: '+33 7 53 61 14 77',
  email: 'bmajri@gmail.com',
};
