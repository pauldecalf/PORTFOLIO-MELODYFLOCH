# 🚨 SERVEUR CRASH EN PROD - Solution immédiate

## ❌ Symptôme
Le serveur Railway crash quand on accède à https://melody.pauldecalf.fr

## 🔍 Causes possibles

1. **Migrations Prisma non appliquées** sur PostgreSQL
2. **Tables manquantes** dans la base de données
3. **Erreur dans le seed** qui fait crasher le démarrage
4. **Requêtes Prisma incompatibles** avec PostgreSQL

---

## ⚡ Solution IMMÉDIATE

### Étape 1 : Désactiver temporairement le seed automatique

Le problème vient probablement du seed qui essaie de s'exécuter sur une base sans tables.

**Modifier le script de démarrage** :

```bash
cd /Users/pauldecalf/Desktop/PORTFOLIO-MELODY
```

Ouvrir `package.json` et modifier :

```json
"start": "prisma migrate deploy && next start"
```

(On retire temporairement `npm run db:seed-if-empty`)

### Étape 2 : Déployer le fix

```bash
git add package.json
git commit -m "fix: désactive seed temporairement pour debug"
git push origin main
```

**Attendre 2-3 minutes** que Railway redéploie.

### Étape 3 : Vérifier que le serveur démarre

Accéder à : https://melody.pauldecalf.fr

**Si le serveur démarre** → Passer à l'étape 4  
**Si le serveur crash encore** → Voir Section "Debug avancé"

---

## 🔧 Étape 4 : Appliquer les migrations manuellement

Une fois que le serveur démarre (même si les données sont vides), appliquer les migrations :

### Via Railway CLI

```bash
# Installer Railway CLI si besoin
npm install -g @railway/cli

# Se connecter
railway login

# Lier le projet
cd /Users/pauldecalf/Desktop/PORTFOLIO-MELODY
railway link

# Appliquer les migrations
railway run npx prisma migrate deploy

# Vérifier que ça fonctionne
railway run npx prisma db execute --stdin <<< "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';"
```

**Résultat attendu** : Liste des tables créées
- SessionType
- WeeklyAvailability
- BlockedDate
- Booking
- SiteImage
- GalleryImage
- EmailLog

### Étape 5 : Seed manuel

```bash
railway run npm run db:seed
```

**Résultat attendu** :
```
✅ Types de séances créés
✅ Disponibilités hebdomadaires créées
✅ Database seeded successfully
```

### Étape 6 : Réactiver le seed automatique

```json
"start": "prisma migrate deploy && npm run db:seed-if-empty && next start"
```

```bash
git add package.json
git commit -m "fix: réactive seed après migration manuelle"
git push origin main
```

---

## 🐛 Debug avancé : Voir les logs Railway

### Accéder aux logs

1. Aller sur https://railway.app
2. Ouvrir votre projet
3. Cliquer sur le service
4. Onglet "Deployments"
5. Cliquer sur le dernier déploiement
6. Onglet "Logs"

### Erreurs courantes et solutions

#### Erreur 1 : `The table "SessionType" does not exist`

**Solution** : Les migrations ne sont pas appliquées

```bash
railway run npx prisma migrate deploy
```

#### Erreur 2 : `Can't reach database server at ...`

**Solution** : Vérifier que la base PostgreSQL est bien créée

```bash
# Dans Railway, vérifier que vous avez un service PostgreSQL
# Variables → DATABASE_URL doit pointer vers postgresql://...
```

#### Erreur 3 : `Error: P1001: Can't reach database`

**Solution** : Problème de connexion

1. Railway.app → PostgreSQL service
2. Vérifier qu'il est bien démarré
3. Variables → Vérifier DATABASE_URL

#### Erreur 4 : `PrismaClientInitializationError`

**Solution** : Client Prisma mal généré

```bash
railway run npx prisma generate
railway run npx prisma migrate deploy
```

---

## 🔍 Vérification de la base de données

### Lister les tables

```bash
railway run npx ts-node -e "
import { prisma } from './lib/prisma';
prisma.\$queryRaw\`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'\`
  .then(console.log)
  .finally(() => prisma.\$disconnect())
"
```

### Compter les séances

```bash
railway run npx ts-node -e "
import { prisma } from './lib/prisma';
prisma.sessionType.count()
  .then(c => console.log('Total sessions:', c))
  .finally(() => prisma.\$disconnect())
"
```

**Si ça retourne 0** → Le seed n'a pas fonctionné

---

## 🆘 Solution d'urgence : Reset complet

**⚠️ ATTENTION : Supprime toutes les données !**

Si rien ne fonctionne, reset complet de la base :

```bash
railway link
railway run npx prisma migrate reset --force
```

Puis :

```bash
railway run npx prisma migrate deploy
railway run npm run db:seed
```

---

## 📋 Checklist de debug

- [ ] Logs Railway consultés
- [ ] Erreurs identifiées
- [ ] Seed désactivé temporairement
- [ ] Serveur démarre (même sans données)
- [ ] Migrations appliquées manuellement
- [ ] Tables créées (vérification)
- [ ] Seed exécuté manuellement
- [ ] Séances visibles dans /booking
- [ ] Seed automatique réactivé

---

## 🔧 Fix permanent : Améliorer la gestion d'erreurs

Pour éviter que le serveur crash si le seed échoue, on peut améliorer `scripts/seed-if-empty.ts` :

```typescript
// Ajouter un try-catch global
async function seedIfEmpty() {
  try {
    // ... code existant ...
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    // NE PAS FAIRE ÉCHOUER LE PROCESSUS
    // Le serveur doit démarrer même si le seed échoue
  } finally {
    await prisma.$disconnect()
  }
}

seedIfEmpty().catch(err => {
  console.error('Fatal seed error:', err)
  // Ne pas exit(1) pour ne pas crasher le serveur
})
```

---

## 💡 Prévention future

### 1. Ajouter des logs détaillés

Dans `package.json` :

```json
"start": "echo '🚀 Starting server...' && prisma migrate deploy && echo '✅ Migrations done' && npm run db:seed-if-empty && echo '✅ Seed done' && next start"
```

### 2. Variable pour désactiver le seed

Ajouter dans Railway Variables :

```
SKIP_SEED=false
```

Et dans `scripts/seed-if-empty.ts` :

```typescript
if (process.env.SKIP_SEED === 'true') {
  console.log('⏭️  Seed skipped (SKIP_SEED=true)')
  return
}
```

---

## 📞 Commandes utiles

### Voir l'état du service

```bash
railway status
```

### Redémarrer le service

```bash
railway restart
```

### Voir les variables d'environnement

```bash
railway variables
```

### Ouvrir Prisma Studio

```bash
railway run npx prisma studio
```

---

## ✅ Une fois le problème résolu

Après avoir corrigé le crash :

1. **Vérifier** : https://melody.pauldecalf.fr/booking
2. **Uploader** les images via l'admin
3. **Tester** toutes les pages
4. **Monitorer** les logs Railway pendant 10-15 minutes

---

**Temps estimé** : 10-20 minutes  
**Difficulté** : ⭐⭐ Moyenne  
**Priorité** : 🔴 CRITIQUE
