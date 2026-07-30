# Citadel Coaching — citadel-coaching.fr

Plateforme SaaS de mise en relation entre clients et coachs MMA certifiés sur Paris et Île-de-France.

## Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React 18 + Vite 5 + Tailwind CSS |
| Auth & BDD | Supabase (PostgreSQL + RLS + Storage) |
| Paiement | Stripe Checkout (PHP backend) |
| Hébergement | o2switch (shared hosting) |
| Langue | FR / EN (contexte React) |

## Architecture

```
citadel-coaching-site/
├── src/
│   ├── pages/
│   │   ├── Home.jsx              # Page d'accueil — collectif
│   │   ├── Coachs.jsx            # Liste publique des coachs vérifiés
│   │   ├── DemandeCoaching.jsx   # Formulaire réservation + paiement Stripe
│   │   ├── Login.jsx             # Connexion admin / coach
│   │   ├── Activation.jsx        # Activation compte coach (token email)
│   │   ├── Succes.jsx            # Page de confirmation post-paiement
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx     # KPIs admin
│   │   │   ├── Requests.jsx      # Toutes les demandes
│   │   │   ├── RequestDetail.jsx # Détail + attribution coach
│   │   │   ├── Coaches.jsx       # Liste des coachs
│   │   │   ├── CoachDetail.jsx   # Vérification + publication profil
│   │   │   └── Invitations.jsx   # Envoi invitations coachs
│   │   └── coach/
│   │       ├── Dashboard.jsx     # Tableau de bord coach
│   │       ├── Requests.jsx      # Demandes assignées + réponse
│   │       └── Profile.jsx       # Profil public + upload photo
│   ├── components/
│   │   ├── Hero.jsx              # Hero collectif
│   │   ├── HowItWorks.jsx        # Section "Comment ça marche" (4 étapes)
│   │   ├── Navbar.jsx            # Navigation + switch FR/EN
│   │   ├── AdminLayout.jsx       # Sidebar espace admin
│   │   ├── CoachLayout.jsx       # Sidebar espace coach
│   │   └── ProtectedRoute.jsx    # Guard route par rôle
│   ├── context/
│   │   ├── AuthContext.jsx       # Session Supabase + rôle
│   │   └── LangContext.jsx       # FR / EN
│   └── lib/
│       └── supabase.js           # Client Supabase
├── api/                          # Backend PHP (o2switch)
│   ├── config.php                # Clés Stripe + SITE_URL (non commité)
│   ├── stripe-helper.php         # Helpers cURL Stripe
│   ├── create-checkout-session.php
│   └── session-status.php
└── public/
    └── photos/                   # Assets images
```

## Parcours client

```
/coachs               → Voir les profils certifiés
/demande-coaching     → Choisir un coach + remplir sa demande + payer 90€ (Stripe)
/succes               → Confirmation paiement
```

## Espaces privés

| URL | Rôle | Accès |
|---|---|---|
| `/login` | Tous | Email + mot de passe |
| `/activation?token=xxx` | Coach | Lien d'invitation (48h) |
| `/admin` | Admin | Dashboard KPIs + gestion |
| `/coach` | Coach | Demandes assignées + profil |

## Schéma base de données (Supabase)

- `profiles` — rôle (admin / coach) lié à `auth.users`
- `coaches` — profil public, photo, disciplines, zones, carte pro
- `coach_invitations` — tokens d'invitation email (48h, usage unique)
- `coaching_requests` — demandes clients avec `preferred_coach_id`
- `request_assignments` — attribution coach → demande
- `request_status_history` — historique des changements de statut
- `admin_notes` — notes internes sur les demandes

RLS activé sur toutes les tables. Fonction `is_admin()` SECURITY DEFINER.

## Déploiement

### 1. Variables d'environnement

Créer `.env.local` à la racine (non commité) :

```env
VITE_SUPABASE_URL=https://VOTRE_ID.supabase.co
VITE_SUPABASE_ANON_KEY=votre_anon_key_ici
```

### 2. Build

```bash
npm install
npm run build
cd dist && zip -r ~/Desktop/dist.zip .
```

### 3. Upload sur o2switch

1. `dist.zip` → extraire dans `public_html/`
2. `api/create-checkout-session.php` → copier dans `public_html/api/`
3. Vérifier que `public_html/api/config.php` contient la vraie clé Stripe

### 4. Supabase Storage

Bucket `coach-photos` (public) requis pour les photos de profil des coachs.

## Sécurité

- `api/config.php` dans `.gitignore` — ne jamais commiter
- `.env.local` dans `.gitignore` — ne jamais commiter
- `VITE_SUPABASE_SERVICE_KEY` interdit côté frontend
- RLS Supabase active sur toutes les tables
