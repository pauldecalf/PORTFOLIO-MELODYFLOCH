# 🔧 Résolution des problèmes de production

## 🔴 Problème : Séances et images n'apparaissent pas en prod

### Diagnostic rapide

#### 1. Vérifier les logs Railway

```bash
# Dans votre terminal
railway logs --follow

# Ou sur Railway.app :
# Deployments → Cliquer sur le dernier déploiement → Logs
```

**Rechercher ces erreurs** :
- ❌ `Erreur lors de la récupération des types de séances`
- ❌ `The table main.SessionType does not exist`
- ❌ `No SessionType found`

---

## ✅ Solution 1 : Peupler la base de données (SEED)

### Problème identifié
La base de données PostgreSQL existe, mais elle est **vide** (pas de types de séances).

### Solution A : Seed automatique via Railway CLI

1. **Installer Railway CLI** (si pas déjà fait) :
```bash
npm install -g @railway/cli
```

2. **Se connecter** :
```bash
railway login
```

3. **Lier au projet** :
```bash
cd /Users/pauldecalf/Desktop/PORTFOLIO-MELODY
railway link
```

4. **Exécuter le seed** :
```bash
railway run npm run db:seed
```

### Solution B : Seed via script personnalisé Railway

1. **Aller sur Railway.app**
2. **Ouvrir votre projet** PORTFOLIO-MELODY
3. **Aller dans Settings** → **Deploy**
4. **Ajouter une commande de build personnalisée** :

```bash
# Dans "Build Command" (si ce n'est pas déjà fait)
npm install && npx prisma generate && npm run build

# Dans "Start Command" (REMPLACER l'existant)
npx prisma migrate deploy && npm run db:seed-if-empty && npm start
```

5. **Redéployer** (Deploy → Redeploy)

### Solution C : Seed manuel via script

Créer un fichier temporaire `seed-prod.js` :

```javascript
// Exécuter : railway run node seed-prod.js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Types de séances
  const sessionTypes = [
    {
      name: 'Séance Essentiel',
      slug: 'essentiel',
      description: 'Séance photo portrait d\'une heure',
      duration: 60,
      price: 150,
      order: 1,
      isActive: true,
    },
    {
      name: 'Séance Signature',
      slug: 'signature',
      description: 'Séance photo approfondie de 90 minutes',
      duration: 90,
      price: 250,
      order: 2,
      isActive: true,
    },
    {
      name: 'Séance Premium',
      slug: 'premium',
      description: 'Expérience photo complète de 2 heures',
      duration: 120,
      price: 400,
      order: 3,
      isActive: true,
    },
  ]

  for (const session of sessionTypes) {
    await prisma.sessionType.upsert({
      where: { slug: session.slug },
      update: session,
      create: session,
    })
  }

  console.log('✅ Session types created')

  // Disponibilités
  const availabilities = [
    { dayOfWeek: 2, startTime: '09:00', endTime: '18:00' },
    { dayOfWeek: 3, startTime: '09:00', endTime: '18:00' },
    { dayOfWeek: 4, startTime: '09:00', endTime: '18:00' },
    { dayOfWeek: 5, startTime: '09:00', endTime: '18:00' },
    { dayOfWeek: 6, startTime: '10:00', endTime: '16:00' },
  ]

  for (const availability of availabilities) {
    await prisma.weeklyAvailability.upsert({
      where: {
        dayOfWeek_startTime_endTime: {
          dayOfWeek: availability.dayOfWeek,
          startTime: availability.startTime,
          endTime: availability.endTime,
        },
      },
      update: availability,
      create: availability,
    })
  }

  console.log('✅ Weekly availabilities created')
  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Puis exécuter :
```bash
railway run node seed-prod.js
```

---

## ✅ Solution 2 : Corriger le problème des images

### Diagnostic

Les images ne s'affichent pas car :
1. ❌ Aucune image uploadée en production
2. ❌ Le volume persistant n'est pas configuré
3. ❌ La variable `UPLOAD_DIR` n'est pas définie

### Solution : Configuration complète

#### Étape 1 : Créer un volume Railway

1. **Aller sur Railway.app**
2. **Ouvrir votre service** (celui avec le code Next.js)
3. **Aller dans l'onglet "Variables"**
4. **Cliquer sur "Add Volume"** (en bas)
5. **Configurer** :
   - **Mount Path** : `/data`
   - **Size** : 5GB (ajustable)
6. **Sauvegarder**

#### Étape 2 : Ajouter la variable UPLOAD_DIR

Dans le même écran "Variables", ajouter :
```
UPLOAD_DIR=/data/uploads
```

#### Étape 3 : Redéployer

Railway redémarrera automatiquement. Attendre 2-3 minutes.

#### Étape 4 : Uploader les images

1. **Se connecter à l'admin** :
   ```
   https://melody.pauldecalf.fr/admin/login
   ```

2. **Aller dans "Galeries"**

3. **Uploader les images** pour chaque galerie :
   - Portraits
   - Noir & Blanc
   - Lifestyle

4. **Aller dans "Images du site"**

5. **Uploader les images principales** :
   - `hero-home` - Image d'accueil
   - `about-melody` - Photo à propos
   - `preview-portraits` - Aperçu portraits
   - `preview-nb` - Aperçu noir & blanc
   - `preview-lifestyle` - Aperçu lifestyle

---

## 🔍 Vérification post-correction

### 1. Vérifier les séances

```bash
# Ouvrir la console Railway
railway run npx prisma studio

# Ou directement dans le navigateur
railway run "npx prisma db seed"
```

Ou simplement aller sur :
```
https://melody.pauldecalf.fr/booking
```

**Résultat attendu** : Les 3 types de séances s'affichent (Essentiel, Signature, Premium)

### 2. Vérifier les images

Tester directement :
```
https://melody.pauldecalf.fr/api/uploads/test.jpg
```

Si vous obtenez une erreur 404, c'est normal (l'image n'existe pas encore).
Si vous obtenez une erreur 500 ou autre, il y a un problème.

### 3. Vérifier les logs

```bash
railway logs --tail 100
```

**Rechercher** :
- ✅ `Session types created`
- ✅ `Weekly availabilities created`
- ❌ Pas d'erreurs Prisma

---

## 📋 Checklist complète

### Configuration Railway

- [ ] Base de données PostgreSQL créée
- [ ] Variable `DATABASE_URL` automatiquement définie
- [ ] Variable `APP_URL=https://melody.pauldecalf.fr` ajoutée
- [ ] Variable `ADMIN_EMAIL=pauldecalf@outlook.fr` ajoutée
- [ ] Variable `RESEND_API_KEY` ajoutée
- [ ] Variable `ADMIN_PASSWORD_HASH` ajoutée
- [ ] Volume persistant créé (mount sur `/data`)
- [ ] Variable `UPLOAD_DIR=/data/uploads` ajoutée

### Base de données

- [ ] Migrations appliquées (`prisma migrate deploy`)
- [ ] Seed exécuté (`npm run db:seed`)
- [ ] Types de séances créés (3 séances)
- [ ] Disponibilités créées (5 jours)

### Images

- [ ] Images du site uploadées via admin
- [ ] Images des galeries uploadées via admin
- [ ] Volume persistant fonctionnel

### Tests

- [ ] Page `/booking` affiche les séances
- [ ] Page d'accueil affiche les images
- [ ] Formulaire de contact fonctionne
- [ ] Admin accessible

---

## 🚨 Solution d'urgence : Reset complet

Si rien ne fonctionne, faire un reset complet :

### 1. Supprimer et recréer la base de données

**⚠️ ATTENTION : Cela supprime TOUTES les données !**

```bash
railway run npx prisma migrate reset --force
```

### 2. Réappliquer les migrations et seed

```bash
railway run npx prisma migrate deploy
railway run npm run db:seed
```

### 3. Redéployer

```bash
# Dans Railway : Deployments → Redeploy
```

---

## 📞 Commandes utiles

### Voir les tables Prisma

```bash
railway run npx prisma studio
```

### Voir les types de séances

```bash
railway run npx ts-node -e "
import { prisma } from './lib/prisma';
prisma.sessionType.findMany().then(console.log).finally(() => prisma.\$disconnect())
"
```

### Compter les séances

```bash
railway run npx ts-node -e "
import { prisma } from './lib/prisma';
prisma.sessionType.count().then(r => console.log('Total sessions:', r)).finally(() => prisma.\$disconnect())
"
```

---

## ✅ Solution recommandée (ordre d'exécution)

### Étape 1 : Seed la base de données

```bash
cd /Users/pauldecalf/Desktop/PORTFOLIO-MELODY
railway link  # Si pas déjà fait
railway run npm run db:seed
```

### Étape 2 : Configurer le volume

1. Railway.app → Service → Variables
2. Add Volume : `/data` (5GB)
3. Add Variable : `UPLOAD_DIR=/data/uploads`

### Étape 3 : Vérifier

```bash
# Ouvrir le site
open https://melody.pauldecalf.fr/booking

# Vérifier les logs
railway logs --tail 50
```

### Étape 4 : Uploader les images

1. Se connecter à l'admin
2. Aller dans Galeries et Images du site
3. Uploader toutes les images nécessaires

---

**Date** : 21 janvier 2026  
**Status** : Guide de résolution complet  
**Priorité** : 🔴 URGENT
