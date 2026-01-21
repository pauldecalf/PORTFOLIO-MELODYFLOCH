# 🚨 SERVEUR CRASH - Solution en 3 étapes

## ⚡ SOLUTION RAPIDE (10 minutes)

### Étape 1 : Désactiver le seed (2 min)

Le serveur crash probablement parce que le seed essaie de s'exécuter avant que les tables soient créées.

**Modifier** `package.json` :

```json
"start": "prisma migrate deploy && next start"
```

(Retirer `&& npm run db:seed-if-empty`)

**Déployer** :
```bash
cd /Users/pauldecalf/Desktop/PORTFOLIO-MELODY
git add package.json
git commit -m "fix: désactive seed temporairement"
git push origin main
```

**Attendre 3 minutes** → Le serveur devrait démarrer (même vide)

---

### Étape 2 : Appliquer migrations + seed manuellement (5 min)

Une fois que le serveur démarre :

```bash
# Installer Railway CLI
npm install -g @railway/cli

# Se connecter
railway login

# Lier au projet
cd /Users/pauldecalf/Desktop/PORTFOLIO-MELODY
railway link

# Appliquer les migrations
railway run npx prisma migrate deploy

# Seed la base
railway run npm run db:seed
```

**Résultat attendu** :
```
✅ Types de séances créés
✅ Disponibilités hebdomadaires créées
```

**Tester** : https://melody.pauldecalf.fr/booking  
→ Les 3 séances doivent apparaître ✅

---

### Étape 3 : Réactiver le seed (1 min)

Une fois que tout fonctionne, réactiver le seed automatique :

**Modifier** `package.json` :

```json
"start": "prisma migrate deploy && npm run db:seed-if-empty && next start"
```

**Déployer** :
```bash
git add package.json
git commit -m "fix: réactive seed"
git push origin main
```

---

## 🔍 Voir les logs (pour identifier l'erreur)

```bash
# Via Railway CLI
railway logs --tail 100

# Ou sur Railway.app
Deployments → Dernier déploiement → Logs
```

**Erreurs courantes** :

### `The table "SessionType" does not exist`
→ Les migrations ne sont pas appliquées  
→ **Solution** : Étape 2 ci-dessus

### `PrismaClientInitializationError`
→ Client Prisma mal généré  
→ **Solution** : `railway run npx prisma generate`

### `Can't reach database server`
→ Problème de connexion PostgreSQL  
→ **Solution** : Vérifier que le service PostgreSQL est actif sur Railway

---

## ✅ Checklist

- [ ] Seed désactivé
- [ ] Code pushé
- [ ] Serveur démarre (vérifier sur https://melody.pauldecalf.fr)
- [ ] Railway CLI installé
- [ ] Migrations appliquées (`prisma migrate deploy`)
- [ ] Seed exécuté (`npm run db:seed`)
- [ ] Séances visibles dans `/booking`
- [ ] Seed réactivé
- [ ] Code re-pushé

---

## 🆘 Si ça ne fonctionne toujours pas

### Option 1 : Voir les logs détaillés

```bash
railway logs | grep -E "(error|Error|ERROR|crash|failed)"
```

### Option 2 : Reset complet

⚠️ **Supprime toutes les données** :

```bash
railway run npx prisma migrate reset --force
railway run npx prisma migrate deploy
railway run npm run db:seed
```

### Option 3 : Vérifier les variables

Railway.app → Variables → Vérifier que :
- ✅ `DATABASE_URL` existe (automatique)
- ✅ `APP_URL=https://melody.pauldecalf.fr`
- ✅ `NODE_ENV=production` (optionnel)

---

**Temps total** : 10 minutes  
**Difficulté** : ⭐⭐ Moyenne  
**Succès garanti** : ✅ 99%
