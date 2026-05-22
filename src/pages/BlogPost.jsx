// Page d'un article de blog — contenu en FR ou EN selon la langue active
import { useParams, Link } from 'react-router-dom'
import { getArticleBySlug } from '../data/blog'
import { useLang } from '../context/LangContext'
import { useSEO }  from '../hooks/useSEO'

export default function BlogPost() {
  const { slug }    = useParams()
  const { lang }    = useLang()
  const article     = getArticleBySlug(slug)

  if (!article) {
    return (
      <main className="pt-24 pb-20 bg-zinc-950 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="section-title mb-4">{lang === 'fr' ? 'Article introuvable' : 'Article not found'}</h1>
          <Link to="/blog" className="btn-outline">← {lang === 'fr' ? 'Retour au blog' : 'Back to blog'}</Link>
        </div>
      </main>
    )
  }

  // Titre et contenu dans la langue active
  const titre   = lang === 'en' && article.titreEn   ? article.titreEn   : article.titre
  const contenu = lang === 'en' && article.contenuEn ? article.contenuEn : article.contenu

  const desc = lang === 'en' && article.descriptionEn ? article.descriptionEn : article.description

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: titre,
    description: desc,
    image: `https://citadel-coaching.fr${article.image}`,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: lang === 'en' ? 'en-GB' : 'fr-FR',
    url: `https://citadel-coaching.fr/blog/${article.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://citadel-coaching.fr/blog/${article.slug}`,
    },
    author: {
      '@type': 'Person',
      name: 'Bechir Majri',
      '@id': 'https://citadel-coaching.fr/#coach',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Citadel Coaching',
      '@id': 'https://citadel-coaching.fr/#business',
      logo: {
        '@type': 'ImageObject',
        url: 'https://citadel-coaching.fr/photos/logo-citadel-2.png',
      },
    },
  }

  useSEO({
    title:          `${titre} — Citadel Coaching`,
    description:    desc,
    canonical:      `https://citadel-coaching.fr/blog/${article.slug}`,
    structuredData: blogSchema,
  })

  const formaterDate = (iso) =>
    new Date(iso).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  const ctaTexts = {
    fr: { question: 'Envie de progresser avec un coach certifié ?', cta: 'Réserver une séance — 90€', retour: '← Retour au blog' },
    en: { question: 'Want to progress with a certified coach?',      cta: 'Book a session — €90',    retour: '← Back to blog' },
  }
  const cta = ctaTexts[lang]

  return (
    <main className="pt-24 pb-20 bg-zinc-950 min-h-screen">
      <div className="container-site max-w-3xl">

        <Link to="/blog" className="text-zinc-500 hover:text-amber-400 text-sm font-heading uppercase tracking-wide transition-colors mb-8 inline-block">
          {cta.retour}
        </Link>

        <img src={article.image} alt={titre} className="w-full h-64 sm:h-80 object-cover mb-8" />

        <p className="text-zinc-500 text-sm font-heading uppercase tracking-wide mb-3">
          {formaterDate(article.date)}
        </p>

        <h1 className="section-title text-3xl sm:text-4xl mb-6">{titre}</h1>

        {/* Contenu HTML — sûr car il vient de notre propre fichier data/blog.js */}
        <div className="prose-article" dangerouslySetInnerHTML={{ __html: contenu }} />

        {/* CTA */}
        <div className="mt-12 p-6 border border-amber-500/30 bg-amber-500/5 text-center">
          <p className="font-heading uppercase tracking-wide text-white mb-3">{cta.question}</p>
          <Link to="/#reservation" className="btn-primary">{cta.cta}</Link>
        </div>
      </div>
    </main>
  )
}
