// Section "À propos" — présentation du coach
import { useLang } from '../context/LangContext'

const YOUTUBE_ID = 'ceS3432vSGw'

const TEXTS = {
  fr: {
    surtitre:    'Le Coach',
    titre:       'Bechir Majri',
    badge:       '+ de 10 ans d\'expérience',
    bio1:        "Ancien combattant professionnel de MMA, j'ai arrêté la compétition pour me consacrer entièrement à la transmission. Mon objectif : vous faire progresser plus vite que je ne l'ai fait moi-même, en vous évitant les erreurs que j'ai mises des années à corriger.",
    bio2:        (
      <>
        Diplômé <strong>BPJEPS Sports de Contact</strong>, certifié{' '}
        <strong>BF2 FMMAF</strong> et{' '}
        <strong>Purple Belt Gracie Barra</strong>, j'interviens sur Paris et toute l'Île-de-France,
        7 jours sur 7, matin et après-midi.
      </>
    ),
    certifs:     ['BPJEPS Sports de Contact', 'BF2 FMMAF', 'Purple Belt Gracie Barra', 'Pro MMA — Sherdog'],
    championsLabel: 'Sparring avec des champions UFC',
    championsCaption: 'Avec Chael Sonnen, Daniel Woirin & Dan Henderson — après un entraînement commun',
    videoLabel:  'Highlight — voir le coach en action',
  },
  en: {
    surtitre:    'The Coach',
    titre:       'Bechir Majri',
    badge:       '10+ years of experience',
    bio1:        "A former professional MMA fighter, I stepped away from competition to focus entirely on coaching. My goal: make you progress faster than I did, by helping you avoid the mistakes that took me years to correct.",
    bio2:        (
      <>
        <strong>BPJEPS Sports de Contact</strong> certified,{' '}
        <strong>BF2 FMMAF</strong> and{' '}
        <strong>Gracie Barra Purple Belt</strong> — I coach across Paris and the Île-de-France region,
        7 days a week, morning and afternoon.
      </>
    ),
    certifs:     ['BPJEPS Sports de Contact', 'BF2 FMMAF', 'Gracie Barra Purple Belt', 'Pro MMA — Sherdog'],
    championsLabel: 'Sparring with UFC Champions',
    championsCaption: 'With Chael Sonnen, Daniel Woirin & Dan Henderson — after a joint training session',
    videoLabel:  'Highlight — watch the coach in action',
  },
}

export default function About() {
  const { lang } = useLang()
  const tx       = TEXTS[lang]

  return (
    <section id="coach" className="py-20 bg-zinc-950">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Photo */}
          <div className="relative">
            <img
              src="/photos/coach-entree-bw.jpg"
              alt="Bechir Majri — Coach MMA Paris IDF"
              className="w-full max-w-md mx-auto lg:mx-0 object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 bg-amber-500 text-black font-heading uppercase text-xs font-bold px-3 py-2 tracking-wider">
              {tx.badge}
            </div>
          </div>

          {/* Texte */}
          <div>
            <p className="text-amber-400 font-heading uppercase tracking-widest text-sm mb-2">{tx.surtitre}</p>
            <h2 className="section-title mb-2">{tx.titre}</h2>
            <span className="section-divider" />

            <p className="text-zinc-300 mb-4 leading-relaxed">{tx.bio1}</p>
            <p className="text-zinc-300 mb-6 leading-relaxed">{tx.bio2}</p>

            <div className="flex flex-wrap gap-3">
              {tx.certifs.map(c => (
                <span key={c} className="border border-zinc-700 text-zinc-400 text-xs font-heading uppercase tracking-wide px-3 py-1.5">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Photo avec champions UFC — crédibilité */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border border-zinc-800 p-6">
          <img
            src="/photos/champions-ufc.jpg"
            alt="Bechir Majri avec Chael Sonnen, Dan Henderson et Daniel Woirin"
            className="w-full object-cover"
            loading="lazy"
          />
          <div>
            <p className="text-amber-400 font-heading uppercase tracking-widest text-xs mb-3">
              {tx.championsLabel}
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">{tx.championsCaption}</p>
          </div>
        </div>

        {/* Highlight vidéo YouTube */}
        <div className="mt-16">
          <p className="text-amber-400 font-heading uppercase tracking-widest text-xs mb-4 text-center">
            {tx.videoLabel}
          </p>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
              title="Bechir Majri — MMA Highlight"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

      </div>
    </section>
  )
}
