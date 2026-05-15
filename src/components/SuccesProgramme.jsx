// src/components/SuccesProgramme.jsx
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

function SuccesProgramme() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    fetch(`/api/get-program-download?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.error) {
          setStatus('error');
        } else {
          setData(res);
          setStatus('ok');
        }
      })
      .catch(() => setStatus('error'));
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-pulse">⏳</div>
          <p className="text-white text-xl">Vérification du paiement...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-white mb-3">Paiement non confirmé</h1>
          <p className="text-gray-400 mb-8">
            Le paiement n'a pas pu être vérifié. Si vous avez été débité, contactez-nous à{' '}
            <strong className="text-white">bmajri@gmail.com</strong>.
          </p>
          <Link to="/programmes" className="inline-block bg-primary hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-all">
            Retour aux programmes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full">

        {/* Confirmation */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-white mb-3">Merci pour votre achat !</h1>
          <p className="text-gray-300 text-lg">
            Votre programme <strong className="text-white">{data?.nom}</strong> est prêt.
          </p>
          {data?.customerEmail && (
            <p className="text-gray-400 text-sm mt-2">
              Achat confirmé pour <strong className="text-white">{data.customerEmail}</strong>
            </p>
          )}
        </div>

        {/* Téléchargement */}
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 text-center mb-6">
          <div className="text-4xl mb-4">📥</div>
          <h2 className="text-xl font-bold text-white mb-2">Téléchargez votre programme</h2>
          <p className="text-gray-400 text-sm mb-6">
            Cliquez ci-dessous pour télécharger votre PDF. Sauvegardez-le sur votre appareil.
          </p>

          {data?.pdfUrl ? (
            <a
              href={data.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary hover:bg-red-700 text-white font-bold px-10 py-4 rounded-xl transition-all transform hover:scale-105 text-lg"
            >
              <span>📄</span>
              <span>Télécharger le PDF</span>
            </a>
          ) : (
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
              <p className="text-accent text-sm">
                ⏳ Votre programme sera disponible très prochainement.<br />
                Vous recevrez un email à <strong>{data?.customerEmail}</strong> avec le lien de téléchargement.
              </p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-secondary/80 border border-primary/10 rounded-xl p-6 mb-8 text-sm text-gray-400 space-y-2">
          <p>💡 <strong className="text-white">Conservez ce lien</strong> — bookmarkez cette page pour accéder à votre PDF à tout moment.</p>
          <p>❓ Un problème ? Contactez <strong className="text-white">bmajri@gmail.com</strong> ou le <strong className="text-white">+33 7 53 61 14 77</strong>.</p>
        </div>

        {/* CTA coaching */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20 rounded-2xl p-6">
          <p className="text-white font-semibold mb-2">Vous voulez aller plus loin ?</p>
          <p className="text-gray-400 text-sm mb-4">
            Réservez une séance privée avec Bechir Majri pour une progression personnalisée.
          </p>
          <Link
            to="/#reservation"
            className="inline-block bg-black/50 hover:bg-black border border-primary/30 hover:border-primary text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Réserver une séance — 90€
          </Link>
        </div>

      </div>
    </div>
  );
}

export default SuccesProgramme;
