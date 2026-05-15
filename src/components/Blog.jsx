// src/components/Blog.jsx
import { Link } from 'react-router-dom';
import { articles } from '../data/blog';
import SEO from './SEO';
import Header from './Header';
import Footer from './Footer';

const categoriesCouleurs = {
  MMA: 'bg-red-900/40 text-red-300 border-red-500/30',
  'Muay Thai': 'bg-orange-900/40 text-orange-300 border-orange-500/30',
  BJJ: 'bg-blue-900/40 text-blue-300 border-blue-500/30',
  Coaching: 'bg-accent/20 text-accent border-accent/30',
};

function Blog() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Citadel Coaching — MMA, Muay Thai, BJJ',
    description: 'Conseils, guides et actualités sur les sports de combat par Bechir Majri, coach MMA Paris 17.',
    url: 'https://citadel-coaching.vercel.app/blog',
    author: {
      '@type': 'Person',
      name: 'Bechir Majri',
    },
  };

  return (
    <div className="min-h-screen bg-secondary">
      <SEO
        title="Blog MMA Paris — Conseils, Guides & Actualités Sports de Combat"
        description="Conseils techniques, guides pour débutants et actualités sports de combat par Bechir Majri, coach certifié BPJEPS, professionnel MMA à Paris 17ème. MMA, Muay Thai, BJJ — tout ce qu'il faut savoir pour progresser."
        canonical="/blog"
        structuredData={schema}
      />
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-b from-black to-secondary pt-28 pb-16 px-6 text-center">
        <div className="inline-block mb-4 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full">
          <p className="text-accent text-sm font-semibold">✍️ Blog — Citadel Coaching</p>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Conseils & <span className="text-primary">Actualités</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Guides techniques, conseils d'entraînement et actualités des sports de combat par Bechir Majri — coach MMA Paris 17.
        </p>
      </div>

      {/* Articles */}
      <div className="container mx-auto px-6 pb-20">
        <div className="max-w-5xl mx-auto">

          {/* Article en vedette */}
          <div className="mb-12">
            <Link
              to={`/blog/${articles[0].slug}`}
              className="group block bg-secondary/80 border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
            >
              <div className="md:grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={articles[0].image}
                    alt={articles[0].titre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40 md:bg-gradient-to-t md:from-transparent md:to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    À la une
                  </span>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${categoriesCouleurs[articles[0].categorie]}`}>
                      {articles[0].emoji} {articles[0].categorie}
                    </span>
                    <span className="text-gray-500 text-sm">{articles[0].temps}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {articles[0].titre}
                  </h2>
                  <p className="text-gray-400 mb-6 leading-relaxed">{articles[0].extrait}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{articles[0].date} · {articles[0].auteur}</span>
                    <span className="text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      Lire →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Grille des autres articles */}
          <div className="grid md:grid-cols-3 gap-6">
            {articles.slice(1).map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group bg-secondary/80 border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.titre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full border ${categoriesCouleurs[article.categorie]}`}>
                    {article.emoji} {article.categorie}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="text-white font-bold mb-2 group-hover:text-primary transition-colors leading-snug">
                    {article.titre}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{article.extrait}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">{article.date}</span>
                    <span className="text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform">Lire →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA coaching */}
          <div className="mt-16 bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Prêt à passer à la pratique ?</h3>
            <p className="text-gray-400 mb-6">De la théorie à l'entraînement — réservez votre séance privée à Paris 17ème.</p>
            <a
              href="/#reservation"
              className="inline-block bg-primary hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105"
            >
              Réserver une séance — 90€
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Blog;
