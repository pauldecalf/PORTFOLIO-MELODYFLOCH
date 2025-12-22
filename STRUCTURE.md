# 📂 Structure du projet Melody Photography

## Vue d'ensemble

```
PORTFOLIO-MELODY/
├── app/                          # Next.js App Router
│   ├── actions/                  # Server Actions
│   │   ├── admin.ts             # Actions admin (login, cancel booking, etc.)
│   │   ├── booking.ts           # Création de réservations
│   │   └── contact.ts           # Envoi formulaire contact
│   │
│   ├── api/                      # API Routes
│   │   └── booking/
│   │       ├── available-dates/  # Dates disponibles
│   │       └── available-slots/  # Créneaux disponibles
│   │
│   ├── admin/                    # Interface administration
│   │   ├── login/               # Page de connexion admin
│   │   └── page.tsx             # Dashboard admin
│   │
│   ├── booking/                  # Système de réservation
│   │   └── page.tsx
│   │
│   ├── portfolio/                # Galeries photos
│   │   ├── [slug]/              # Pages galeries individuelles
│   │   └── page.tsx             # Page portfolio principale
│   │
│   ├── about/                    # À propos
│   ├── pricing/                  # Tarifs
│   ├── contact/                  # Contact
│   ├── mentions-legales/         # Mentions légales
│   ├── privacy/                  # Politique de confidentialité
│   │
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Page d'accueil
│   ├── globals.css               # Styles globaux
│   ├── loading.tsx               # État de chargement
│   ├── not-found.tsx             # Page 404
│   ├── sitemap.ts                # Génération sitemap.xml
│   └── robots.ts                 # Génération robots.txt
│
├── components/                   # Composants React
│   ├── admin/                    # Composants admin
│   │   ├── AdminDashboard.tsx
│   │   └── AdminLoginForm.tsx
│   │
│   ├── booking/                  # Composants réservation
│   │   ├── BookingStepSession.tsx    # Étape 1 : choix séance
│   │   ├── BookingStepDate.tsx       # Étape 2 : choix date
│   │   ├── BookingStepTime.tsx       # Étape 3 : choix horaire
│   │   ├── BookingStepInfo.tsx       # Étape 4 : infos client
│   │   └── BookingStepConfirmation.tsx # Étape 5 : confirmation
│   │
│   ├── BookingWizard.tsx         # Wizard de réservation principal
│   ├── Header.tsx                # En-tête navigation
│   ├── Footer.tsx                # Pied de page
│   ├── PageHero.tsx              # Bannière hero pages
│   ├── TestimonialCard.tsx       # Carte témoignage
│   ├── PricingCard.tsx           # Carte tarif
│   └── ContactForm.tsx           # Formulaire contact
│
├── lib/                          # Utilitaires et logique métier
│   ├── prisma.ts                # Client Prisma singleton
│   ├── availability.ts          # Logique disponibilités & créneaux
│   ├── email.ts                 # Templates & envoi emails (Resend)
│   ├── validations.ts           # Schémas validation Zod
│   └── auth.ts                  # Authentification admin simple
│
├── prisma/                       # Base de données
│   ├── schema.prisma            # Schéma de la DB
│   ├── seed.ts                  # Données initiales (seed)
│   └── dev.db                   # DB SQLite (dev only)
│
├── public/                       # Assets statiques
│   └── .gitkeep
│
├── tailwind.config.ts            # Configuration Tailwind
├── tsconfig.json                 # Configuration TypeScript
├── next.config.js                # Configuration Next.js
├── package.json                  # Dépendances npm
├── .env                          # Variables d'environnement (à créer)
├── .env.local                    # Template .env
├── .gitignore
├── README.md                     # Documentation complète
├── QUICKSTART.md                 # Guide démarrage rapide
└── STRUCTURE.md                  # Ce fichier
```

## 🗂️ Détail des dossiers clés

### `/app` - App Router Next.js

Le dossier `app` utilise la nouvelle architecture App Router de Next.js 14. Chaque dossier avec un `page.tsx` devient une route publique.

**Routes principales :**
- `/` → Page d'accueil
- `/portfolio` → Portfolio
- `/portfolio/[slug]` → Galerie individuelle (portraits, noir-et-blanc, lifestyle)
- `/about` → À propos
- `/pricing` → Tarifs
- `/contact` → Contact
- `/booking` → Réservation
- `/admin` → Dashboard admin (protégé)
- `/admin/login` → Connexion admin

### `/components` - Composants réutilisables

Tous les composants React du projet, organisés par fonctionnalité.

**Composants principaux :**
- `BookingWizard` : Orchestrateur du système de réservation en 5 étapes
- `Header` / `Footer` : Navigation et pied de page
- `PricingCard` : Affichage d'une formule de séance
- `TestimonialCard` : Affichage d'un témoignage client

### `/lib` - Logique métier

Contient toute la logique métier et les utilitaires partagés.

**Fichiers importants :**
- `availability.ts` : Calcul des disponibilités, créneaux, dates ouvrées
- `email.ts` : Templates HTML des emails et envoi via Resend
- `validations.ts` : Schémas de validation Zod pour tous les formulaires
- `auth.ts` : Authentification simple par cookie pour l'admin

### `/prisma` - Base de données

**Modèles :**
- `SessionType` : Types de séances photo (Essentiel, Signature, Premium)
- `WeeklyAvailability` : Disponibilités hebdomadaires (jours et horaires)
- `BlockedDate` : Dates bloquées (vacances, congés)
- `Booking` : Réservations clients avec statut (CONFIRMED, CANCELLED, COMPLETED)

## 🔄 Flux de données

### Réservation d'une séance

```
1. Client : /booking
2. Sélection type de séance → BookingStepSession
3. Sélection date → BookingStepDate
   └─> API: /api/booking/available-dates
4. Sélection créneau → BookingStepTime
   └─> API: /api/booking/available-slots
5. Formulaire infos → BookingStepInfo
6. Confirmation → BookingStepConfirmation
   └─> Server Action: createBooking()
       ├─> Vérification disponibilité
       ├─> Création en DB (Prisma)
       ├─> Envoi email client (Resend)
       └─> Envoi email admin (Resend)
```

### Administration

```
1. Admin : /admin/login
2. Authentification → loginAdmin() (Server Action)
3. Cookie auth → /admin
4. Dashboard → AdminDashboard
   ├─> Voir réservations
   ├─> Annuler réservation → cancelBooking()
   ├─> Bloquer dates → createBlockedDate()
   └─> Déconnexion → logoutAdmin()
```

## 🎨 Styles & Design System

### Tailwind Configuration

**Couleurs principales :**
- `primary-*` : Palette beige/marron (50 à 900)

**Composants utilitaires :**
- `.btn-primary` : Bouton primaire
- `.btn-secondary` : Bouton secondaire
- `.input-field` : Champ de formulaire
- `.container-custom` : Conteneur centré max-width
- `.heading-xl/lg/md/sm` : Titres responsive

### Polices

- **Serif (titres)** : Playfair Display
- **Sans-serif (texte)** : Inter

## 🔐 Sécurité

- **Admin protégé** : Authentification par mot de passe + cookie httpOnly
- **Server Actions** : Validation Zod côté serveur
- **API Routes** : Pas d'exposition de données sensibles
- **CORS** : Pas de CORS (API interne uniquement)

## 📦 Dépendances principales

| Package | Usage |
|---------|-------|
| `next` | Framework React App Router |
| `react` | Bibliothèque UI |
| `@prisma/client` | ORM base de données |
| `prisma` | CLI Prisma (dev) |
| `resend` | Envoi d'emails |
| `zod` | Validation schémas |
| `date-fns` | Manipulation dates |
| `date-fns-tz` | Gestion timezone |
| `tailwindcss` | Framework CSS |
| `typescript` | Typage statique |

## 🚀 Commandes utiles

```bash
# Développement
npm run dev              # Lance le serveur dev

# Base de données
npx prisma migrate dev   # Crée/applique migrations
npx prisma db seed       # Peuple la DB
npx prisma studio        # Interface graphique DB

# Production
npm run build            # Build production
npm start                # Lance production

# Génération
npx prisma generate      # Génère client Prisma
```

## 📊 Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DATABASE_URL` | URL connexion DB | `file:./dev.db` |
| `RESEND_API_KEY` | Clé API Resend | `re_xxx...` |
| `ADMIN_EMAIL` | Email photographe | `melody@example.com` |
| `APP_URL` | URL publique app | `http://localhost:3000` |
| `ADMIN_PASSWORD` | Mot de passe admin | `admin123` |

---

Ce document est un complément au [README.md](./README.md) principal.

