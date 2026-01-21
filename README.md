# Melody Photography

Site web professionnel pour photographe portrait & lifestyle, construit avec Next.js 14 (App Router), TypeScript, Prisma et TailwindCSS.

## 🎯 Fonctionnalités

### Partie publique
- **Page d'accueil SEO optimisée** avec contenu enrichi et Schema.org
- **Portfolio** avec galeries (Portraits, Noir & Blanc, Lifestyle)
- **Page À propos** présentant la photographe
- **Tarifs** avec 3 formules détaillées
- **Contact** avec formulaire fonctionnel
- **Système de réservation complet** :
  - Choix du type de séance
  - Sélection de la date
  - Choix du créneau horaire disponible
  - Formulaire d'informations client
  - Confirmation et validation

### Fonctionnalités techniques
- ✅ Gestion des disponibilités hebdomadaires
- ✅ Dates bloquées (vacances, jours fériés)
- ✅ Prévention du double-booking
- ✅ Buffer entre les séances (15 min par défaut)
- ✅ Timezone Europe/Paris
- ✅ Emails automatiques (client + admin) via Resend
- ✅ Interface admin protégée par mot de passe

### Partie admin (`/admin`)
- Dashboard avec statistiques
- Gestion des réservations (annuler, supprimer)
- Gestion des dates bloquées
- Vue des disponibilités hebdomadaires

### SEO
- Metadata optimisée par page
- OpenGraph et Twitter Cards
- Sitemap.xml automatique
- Robots.txt
- Schema.org (ProfessionalService, Person)
- Contenu textuel SEO-friendly
- Alt text sur toutes les images

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation locale

1. **Cloner le projet** (déjà fait)

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**

Créez un fichier `.env` à la racine du projet :

```env
# Database
DATABASE_URL="file:./dev.db"

# Email (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
ADMIN_EMAIL="votre@email.com"

# App
APP_URL="https://melody.pauldecalf.fr"

# Admin
ADMIN_PASSWORD="votre_mot_de_passe_admin"
```

4. **Initialiser la base de données**

```bash
# Créer la migration initiale
npx prisma migrate dev --name init

# Peupler la base avec des données de test
npx prisma db seed
```

5. **Lancer le serveur de développement**

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📧 Configuration des emails (Resend)

1. Créez un compte sur [resend.com](https://resend.com)
2. Ajoutez et vérifiez votre domaine (ou utilisez le sandbox pour les tests)
3. Créez une API Key
4. Ajoutez la clé dans le fichier `.env` : `RESEND_API_KEY`
5. Configurez `ADMIN_EMAIL` avec l'email de la photographe

Les emails seront envoyés automatiquement :
- Au client : confirmation de réservation
- À l'admin : notification de nouvelle réservation
- Au client : confirmation d'annulation (si annulée depuis l'admin)

## 🔐 Interface admin

### Accès
1. Allez sur `/admin`
2. Connectez-vous avec le mot de passe configuré dans `.env` (`ADMIN_PASSWORD`)

### Fonctionnalités admin
- **Dashboard** : vue d'ensemble avec statistiques
- **Gestion des réservations** :
  - Liste des séances avec statuts (En attente, Confirmée, Contacté, Payée, Terminée, Annulée)
  - Changement de statut en un clic
  - Notes internes pour chaque réservation
  - Annulation avec email automatique
- **Gestion des images** (🆕) :
  - Upload d'images pour chaque section du site
  - Optimisation automatique
  - Texte alternatif pour le SEO
  - Activer/Désactiver sans supprimer
- **Envoi d'emails** (🆕) :
  - Composer et envoyer des emails depuis l'admin
  - Templates pré-remplis (rappel, photos prêtes, demande d'avis)
  - Sélection rapide depuis les réservations
  - Historique complet des envois
- **Dates bloquées** : bloquer des dates (vacances, jours fériés)
- **Disponibilités** : visualisation des horaires hebdomadaires

### Modifier les disponibilités hebdomadaires

Les disponibilités sont configurées dans `prisma/seed.ts`. Par défaut :
- Mardi au vendredi : 9h-18h
- Samedi : 10h-16h

Pour modifier :
1. Éditez `prisma/seed.ts`
2. Relancez : `npx prisma db seed`

## 📁 Structure du projet

```
PORTFOLIO-MELODY/
├── app/
│   ├── actions/          # Server Actions (booking, contact, admin, images, emails)
│   ├── api/              # API Routes (disponibilités, images)
│   ├── admin/            # Interface admin complète
│   ├── booking/          # Système de réservation
│   ├── portfolio/        # Galeries photos
│   ├── about/            # À propos
│   ├── pricing/          # Tarifs
│   ├── contact/          # Contact
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Page d'accueil
│   ├── sitemap.ts        # Génération sitemap
│   └── robots.ts         # Génération robots.txt
├── components/
│   ├── booking/          # Composants système de réservation
│   ├── admin/            # Composants admin
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/
│   ├── prisma.ts         # Client Prisma
│   ├── availability.ts   # Logique disponibilités
│   ├── email.ts          # Templates emails
│   ├── validations.ts    # Schémas Zod
│   └── auth.ts           # Authentification admin
├── prisma/
│   ├── schema.prisma     # Schéma base de données
│   └── seed.ts           # Données initiales
└── public/               # Assets statiques
```

## 🗄️ Base de données

### Modèles Prisma

- **SessionType** : types de séances (Essentiel, Signature, Premium)
- **WeeklyAvailability** : disponibilités hebdomadaires récurrentes
- **BlockedDate** : dates bloquées (vacances)
- **Booking** : réservations clients avec statuts et notes internes
- **SiteImage** : images du site gérées via l'admin
- **EmailLog** : historique des emails envoyés

### Ajouter un type de séance

Via la base de données Prisma :

```bash
npx prisma studio
```

Ou modifier directement `prisma/seed.ts` et relancer le seed.

## 🎨 Personnalisation

### Couleurs (Tailwind)

Les couleurs sont configurées dans `tailwind.config.ts` :
- `primary` : palette principale (tons beige/marron)

### Polices

- **Titres** : Playfair Display (serif)
- **Texte** : Inter (sans-serif)

### Images

**⚠️ IMPORTANT : Les images du site sont maintenant gérables via l'administration !**

#### Images du site (hero, about, etc.)
1. Connectez-vous à l'administration : `/admin`
2. Allez dans l'onglet **"🖼️ Images"**
3. Uploadez vos images avec les bonnes clés (ex: `hero-home`, `about-melody`, etc.)

📖 **Consultez le [GUIDE_IMAGES.md](./GUIDE_IMAGES.md) pour la liste complète des clés d'images.**

#### Images des galeries du portfolio
1. Connectez-vous à l'administration : `/admin`
2. Allez dans l'onglet **"📸 Galeries"**
3. Uploadez vos photos dans les galeries Portraits, Noir & Blanc, ou Lifestyle

📖 **Consultez le [GUIDE_GALERIES.md](./GUIDE_GALERIES.md) pour le guide complet de gestion des galeries.**

## 🚢 Déploiement

### Vercel (recommandé)

1. Poussez votre code sur GitHub
2. Importez le projet sur [vercel.com](https://vercel.com)
3. Configurez les variables d'environnement
4. Changez `DATABASE_URL` pour PostgreSQL (Vercel Postgres ou autre)
5. Déployez

### Autre hébergeur

1. Build de production :
```bash
npm run build
```

2. Lancer en production :
```bash
npm start
```

3. Configurez les variables d'environnement sur votre hébergeur

## 📊 Migration vers PostgreSQL (Production)

Pour la production, remplacez SQLite par PostgreSQL :

1. **Modifier `prisma/schema.prisma`** :
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. **Mettre à jour DATABASE_URL** :
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

3. **Créer les migrations** :
```bash
npx prisma migrate deploy
```

4. **Seed** :
```bash
npx prisma db seed
```

## 🧪 Tests

Pour tester le système de réservation :

1. Lancez l'app en local
2. Allez sur `/booking`
3. Suivez le processus de réservation
4. Vérifiez la réception des emails (vérifiez vos spams)
5. Connectez-vous à `/admin` pour voir la réservation

## 📝 TODO / Améliorations futures

- [x] ✅ Gestion des images via l'admin
- [x] ✅ Système d'envoi d'emails depuis l'admin
- [x] ✅ Statuts avancés pour les réservations
- [ ] Système de galerie lightbox
- [ ] Paiement en ligne (Stripe)
- [ ] Calendrier Google sync
- [ ] Export des réservations en CSV
- [ ] Système de notation/avis clients
- [ ] Blog/Actualités
- [ ] Newsletter

## 🤝 Support

Pour toute question ou problème :
1. Vérifiez les logs serveur
2. Vérifiez la configuration des variables d'environnement
3. Consultez la documentation Prisma, Next.js ou Resend

## 📄 Licence

Projet privé - Tous droits réservés © 2024 Melody Photography

---

**Développé avec ❤️ par Paul pour Melody Photography**

