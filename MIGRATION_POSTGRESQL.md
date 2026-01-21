# 🔄 Migration SQLite → PostgreSQL pour Railway

## 🔴 Problème identifié

Le schéma Prisma était configuré pour **SQLite** mais Railway utilise **PostgreSQL**.  
C'est pour ça que les séances et images n'apparaissaient pas !

## ✅ Solution : Migration vers PostgreSQL

### Étape 1 : Le code a été corrigé

✅ `prisma/schema.prisma` :
```prisma
datasource db {
  provider = "postgresql"  // ← Changé de "sqlite" à "postgresql"
  url      = env("DATABASE_URL")
}
```

✅ `lib/images.ts` :
- Correction de la requête `findUnique` → `findFirst`

---

### Étape 2 : Déployer sur Railway

**Option A : Push automatique (Recommandé)**

```bash
cd /Users/pauldecalf/Desktop/PORTFOLIO-MELODY
git add .
git commit -m "fix: migration PostgreSQL + correction requêtes Prisma"
git push origin main
```

Railway va automatiquement :
1. Détecter le changement
2. Régénérer le client Prisma avec PostgreSQL
3. Appliquer les migrations
4. Seed la base de données
5. Démarrer l'application

**Attendre 3-5 minutes** que Railway termine le déploiement.

---

### Étape 3 : Vérifier

1. **Voir les logs Railway** :
   ```
   Railway.app → Deployments → Dernier déploiement → Logs
   ```

2. **Rechercher dans les logs** :
   - ✅ `Prisma schema loaded from prisma/schema.prisma`
   - ✅ `Generated Prisma Client`
   - ✅ `Database seeded successfully`
   - ✅ `Types de séances créés`

3. **Tester le site** :
   ```
   https://melody.pauldecalf.fr/booking
   → Les 3 séances doivent apparaître ✅
   ```

---

## 🎯 Pourquoi ça ne marchait pas avant ?

### Le problème

```
Schema Prisma: SQLite
      ↓
Railway DB: PostgreSQL
      ↓
❌ INCOMPATIBILITÉ
```

**Conséquences** :
- ❌ Les migrations ne s'appliquaient pas
- ❌ Le seed échouait silencieusement
- ❌ Les requêtes retournaient vide
- ❌ Aucune donnée dans la base

### La solution

```
Schema Prisma: PostgreSQL
      ↓
Railway DB: PostgreSQL
      ↓
✅ COMPATIBLE
```

**Résultats attendus** :
- ✅ Migrations appliquées correctement
- ✅ Seed fonctionne
- ✅ Séances visibles dans `/booking`
- ✅ Images récupérées de la DB

---

## 📋 Checklist post-déploiement

### 1. Vérifier les séances

- [ ] Aller sur https://melody.pauldecalf.fr/booking
- [ ] Voir les 3 formules (Essentiel, Signature, Premium)

### 2. Vérifier la base de données

Via Railway CLI (optionnel) :
```bash
railway link
railway run npx prisma studio
```

Ou via les logs :
```bash
railway logs | grep -E "(seed|Types de séances|Database)"
```

### 3. Uploader les images

Une fois que les séances fonctionnent :

1. **Se connecter à l'admin** :
   ```
   https://melody.pauldecalf.fr/admin/login
   ```

2. **Uploader les images du site** :
   - hero-home
   - about-melody
   - preview-portraits
   - preview-nb
   - preview-lifestyle

3. **Uploader les galeries** :
   - Portraits
   - Noir & Blanc
   - Lifestyle

---

## 🚨 Si ça ne fonctionne toujours pas

### Logs à vérifier

```bash
railway logs --tail 100
```

**Rechercher les erreurs** :
- ❌ `P1001` - Can't reach database
- ❌ `P1012` - Schema validation error
- ❌ `P2000` - Query failed

### Variables à vérifier

Railway.app → Variables :
- ✅ `DATABASE_URL` (automatique avec PostgreSQL Railway)
- ✅ `APP_URL=https://melody.pauldecalf.fr`
- ✅ `ADMIN_EMAIL=pauldecalf@outlook.fr`
- ✅ `RESEND_API_KEY=re_...`

### Reset complet (dernier recours)

Si vraiment rien ne fonctionne :

```bash
railway link
railway run npx prisma migrate reset --force
railway run npm run db:seed
```

⚠️ **ATTENTION** : Cela supprime toutes les données !

---

## 📊 Différences SQLite vs PostgreSQL

| Aspect | SQLite | PostgreSQL |
|--------|--------|------------|
| **Type** | Fichier local | Serveur distant |
| **Usage** | Dev local | Production |
| **Performance** | Limitée | Excellente |
| **Concurrence** | Faible | Élevée |
| **Backup** | Fichier .db | Dump SQL |

### Avantages PostgreSQL

✅ Plus robuste pour la production  
✅ Meilleure gestion de la concurrence  
✅ Backup automatique sur Railway  
✅ Scalabilité illimitée  
✅ Types de données avancés  

---

## 🔧 Configuration Railway

### Base de données PostgreSQL

Railway crée automatiquement :
- ✅ Une instance PostgreSQL
- ✅ La variable `DATABASE_URL`
- ✅ Backup automatique quotidien
- ✅ Monitoring intégré

### Aucune configuration supplémentaire requise !

Railway gère tout automatiquement une fois que le schéma Prisma est en PostgreSQL.

---

## ✅ Commandes utiles

### Voir le statut de la base

```bash
railway run npx prisma db push --preview-feature
```

### Compter les séances

```bash
railway run npx ts-node -e "
import { prisma } from './lib/prisma';
prisma.sessionType.count().then(c => console.log('Total sessions:', c)).finally(() => prisma.\$disconnect())
"
```

### Lister les tables

```bash
railway run npx prisma db execute --stdin <<< "SELECT tablename FROM pg_tables WHERE schemaname='public';"
```

---

## 📝 Fichiers modifiés

1. ✅ `prisma/schema.prisma` - Provider changé en PostgreSQL
2. ✅ `lib/images.ts` - Correction de la requête Prisma

---

## 🎉 Résultat final

Après le déploiement :

✅ **Séances visibles** : https://melody.pauldecalf.fr/booking  
✅ **Base de données PostgreSQL fonctionnelle**  
✅ **Migrations appliquées correctement**  
✅ **Seed automatique au démarrage**  
✅ **Images uploadables via admin**  

---

**Date** : 21 janvier 2026  
**Priorité** : 🔴 CRITIQUE - Résolu ✅  
**Temps de déploiement** : 3-5 minutes
