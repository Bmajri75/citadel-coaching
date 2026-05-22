import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Les fichiers statiques (photos, favicon, robots.txt, sitemap.xml)
  // se trouvent dans le dossier public/ → copiés tel quels dans dist/
  publicDir: 'public',

  build: {
    // Le résultat du build ira dans dist/
    // Pour déployer : uploader le contenu de dist/ + le dossier api/ sur le serveur
    outDir: 'dist',
    emptyOutDir: true,

    rollupOptions: {
      output: {
        // Sépare les librairies (React, etc.) des fichiers métier
        // → meilleur cache navigateur : React change rarement
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
