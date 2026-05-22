/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind analyse ces fichiers pour supprimer les classes CSS inutilisées au build
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      // Polices Google Fonts ajoutées dans index.css
      fontFamily: {
        heading: ['Oswald', 'sans-serif'], // Titres — style martial arts
        body:    ['Inter',  'sans-serif'], // Corps de texte — lisibilité
      },
      colors: {
        // Couleur d'accentuation dorée (boutons, liens actifs, badges)
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
    },
  },
  plugins: [],
}
