// src/components/BlogArticle.jsx
import { useParams, Link, Navigate } from 'react-router-dom';
import { getArticleBySlug, articles } from '../data/blog';
import SEO from './SEO';
import Header from './Header';
import Footer from './Footer';

function BlogArticle() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) return <Navigate to="/blog" replace />;

  const autresArticles = articles.filter((a) => a.slug !== slug).slice(0, 3);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.titre,
    description: article.metaDescription,
    datePublished: article.dateISO,
    author: { '@type': 'Person', name: 'Bechir Majri' },
    publisher: {
      '@type': 'Organization',
      name: 'Citadel Coaching',
      logo: { '@type': 'ImageObject', url: 'https://citadel-coaching.vercel.app/photos/hero.jpg' },
    },
    image: `https://citadel-coaching.vercel.app${article.image}`,
    url: `https://citadel-coaching.vercel.app/blog/${article.slug}`,
    mainEntityOfPage: `https://citadel-coaching.vercel.app/blog/${article.slug}`,
  };

  return (
    <div className="min-h-screen bg-secondary">
      <SEO
        title={article.titre}
        description={article.metaDescription}
        canonical={`/blog/${article.slug}`}
        image={article.image}
        type="article"
        structuredData={schema}
      />
      <Header />

      {/* Hero article */}
      <div className="relative pt-20">
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={article.image}
            alt={article.titre}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-black/50 to-black/30"></div>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-6 pb-20">
        <div className="max-w-3xl mx-auto -mt-16 relative z-10">

          {/* Carte article */}
          <div className="bg-secondary border border-primary/20 rounded-2xl p-8 md:p-10 mb-12">

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link to="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">
                ← Blog
              </Link>
              <span className="text-gray-600">·</span>
              <span className="text-accent text-sm font-semibold">{article.emoji} {article.categorie}</span>
              <span className="text-gray-600">·</span>
              <span className="text-gray-500 text-sm">{article.date}</span>
              <span className="text-gray-600">·</span>
              <span className="text-gray-500 text-sm">{article.temps}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-snug">
              {article.titre}
            </h1>
            <p className="text-gray-400 text-lg mb-8">{article.sousTitre}</p>

            {/* Auteur */}
            <div className="flex items-center gap-3 pb-8 border-b border-primary/20 mb-8">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-xl">🥊</div>
              <div>
                <p className="text-white font-semibold text-sm">{article.auteur}</p>
                <p className="text-gray-500 text-xs">Coach BPJEPS Sports de Contact • Professionnel MMA • Purple Belt Gracie Barra</p>
              </div>
            </div>

            {/* Corps de l'article */}
            <div className="prose-custom space-y-6">
              {article.contenu.map((bloc, i) => {
                if (bloc.type === 'intro') {
                  return (
                    <p key={i} className="text-gray-200 text-lg leading-relaxed border-l-4 border-primary pl-4 italic">
                      {bloc.texte}
                    </p>
                  );
                }
                if (bloc.type === 'h2') {
                  return (
                    <h2 key={i} className="text-2xl font-bold text-white pt-4">
                      {bloc.texte}
                    </h2>
                  );
                }
                if (bloc.type === 'paragraphe') {
                  return (
                    <p key={i} className="text-gray-300 leading-relaxed">
                      {bloc.texte}
                    </p>
                  );
                }
                if (bloc.type === 'conclusion') {
                  return (
                    <div key={i} className="bg-primary/10 border border-primary/30 rounded-xl p-6 mt-6">
                      <p className="text-gray-200 leading-relaxed">{bloc.texte}</p>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-primary/20">
              {article.tags.map((tag) => (
                <span key={tag} className="bg-secondary border border-primary/20 text-gray-400 text-xs px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20 rounded-2xl p-8 text-center mb-12">
            <p className="text-white font-bold text-xl mb-2">Passez de la théorie à la pratique</p>
            <p className="text-gray-400 mb-6">Réservez une séance privée avec Bechir à Paris 17ème — 90€ / heure, 7j/7.</p>
            <a
              href="/#reservation"
              className="inline-block bg-primary hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105"
            >
              Réserver maintenant
            </a>
          </div>

          {/* Autres articles */}
          {autresArticles.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Autres articles</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {autresArticles.map((a) => (
                  <Link
                    key={a.slug}
                    to={`/blog/${a.slug}`}
                    className="group bg-secondary/80 border border-primary/20 rounded-xl overflow-hidden hover:border-primary/50 transition-all"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img src={a.image} alt={a.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-4">
                      <p className="text-white text-sm font-semibold group-hover:text-primary transition-colors leading-snug">{a.titre}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BlogArticle;
