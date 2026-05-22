// Section galerie photos — aperçu de l'univers du coach
import { useState } from 'react'
import { useLang } from '../context/LangContext'

const PHOTOS = [
  { src: '/photos/hero-entree.jpg',         alt: 'Bechir Majri entrée ring — foule en délire' },
  { src: '/photos/coaching-avant-combat.jpg', alt: 'Coaching avant combat — concentration maximale' },
  { src: '/photos/victoire-cage.jpg',       alt: 'Victoire dans la cage MMA' },
  { src: '/photos/coach-entree-bw.jpg',     alt: 'Entrée team — noir et blanc' },
  { src: '/photos/champions-ufc.jpg',       alt: 'Avec Chael Sonnen, Dan Henderson & Daniel Woirin' },
  { src: '/photos/coach-gi.jpg',            alt: 'Bechir Majri — Purple Belt Gracie Barra' },
]

const TEXTS = {
  fr: { surtitre: 'En images', titre: 'Galerie' },
  en: { surtitre: 'In pictures', titre: 'Gallery' },
}

export default function Gallery() {
  const { lang }   = useLang()
  const tx         = TEXTS[lang]
  const [lightbox, setLightbox] = useState(null) // index de la photo ouverte

  const fermer = () => setLightbox(null)
  const prev   = () => setLightbox(i => (i - 1 + PHOTOS.length) % PHOTOS.length)
  const next   = () => setLightbox(i => (i + 1) % PHOTOS.length)

  return (
    <section className="py-20 bg-black">
      <div className="container-site">

        <div className="text-center mb-10">
          <p className="text-amber-400 font-heading uppercase tracking-widest text-sm mb-2">{tx.surtitre}</p>
          <h2 className="section-title">{tx.titre}</h2>
          <span className="section-divider mx-auto" />
        </div>

        {/* Grille masonry 3 colonnes */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PHOTOS.map((p, i) => (
            <button
              key={p.src}
              onClick={() => setLightbox(i)}
              className="overflow-hidden group focus:outline-none"
            >
              <img
                src={p.src}
                alt={p.alt}
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={fermer}
        >
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            className="absolute left-4 text-white text-3xl font-bold px-4 py-2 hover:text-amber-400 transition-colors"
          >
            ‹
          </button>

          <img
            src={PHOTOS[lightbox].src}
            alt={PHOTOS[lightbox].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={e => e.stopPropagation()}
          />

          <button
            onClick={e => { e.stopPropagation(); next() }}
            className="absolute right-4 text-white text-3xl font-bold px-4 py-2 hover:text-amber-400 transition-colors"
          >
            ›
          </button>

          <button
            onClick={fermer}
            className="absolute top-4 right-4 text-white text-2xl hover:text-amber-400 transition-colors"
          >
            ✕
          </button>

          <p className="absolute bottom-6 text-zinc-400 text-sm font-heading uppercase tracking-wide">
            {lightbox + 1} / {PHOTOS.length}
          </p>
        </div>
      )}
    </section>
  )
}
