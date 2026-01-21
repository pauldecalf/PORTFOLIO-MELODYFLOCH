# 🚨 Solution rapide - Séances et images manquantes en prod

## ⚡ Action immédiate (2 minutes)

### Problème
- ❌ Les séances n'apparaissent pas sur https://melody.pauldecalf.fr/booking
- ❌ Les images ne s'affichent pas

### Cause
1. **Base de données vide** (pas de seed)
2. **Images pas uploadées** en production

---

## ✅ Solution RAPIDE (sans Railway CLI)

### Étape 1 : Forcer le seed au prochain démarrage

Le code a été modifié pour seed automatiquement la base au démarrage.

**Action requise** : Redéployer sur Railway

1. Aller sur https://railway.app
2. Ouvrir le projet PORTFOLIO-MELODY
3. Aller dans **Deployments**
4. Cliquer sur le dernier déploiement
5. Cliquer sur **"Redeploy"**
6. Attendre 2-3 minutes

### Étape 2 : Vérifier que ça fonctionne

1. Ouvrir https://melody.pauldecalf.fr/booking
2. ✅ Les 3 types de séances doivent apparaître :
   - Séance Essentiel (150€)
   - Séance Signature (250€)
   - Séance Premium (400€)

---

## 📸 Pour les images

### Solution : Uploader via l'admin

1. **Se connecter à l'admin** :
   ```
   https://melody.pauldecalf.fr/admin/login
   ```

2. **Configurer le volume Railway** (une seule fois) :
   - Aller sur Railway.app
   - Ouvrir votre service
   - Aller dans **"Variables"**
   - Cliquer sur **"Add Volume"**
   - Mount path : `/data`
   - Size : 5GB
   - Ajouter la variable : `UPLOAD_DIR=/data/uploads`

3. **Uploader les images principales** :
   - Aller dans "Images du site"
   - Uploader :
     - `hero-home` - Image d'accueil
     - `about-melody` - Photo à propos
     - `preview-portraits` - Aperçu portraits
     - `preview-nb` - Aperçu noir & blanc
     - `preview-lifestyle` - Aperçu lifestyle

4. **Uploader les galeries** :
   - Aller dans "Galeries"
   - Uploader vos photos dans chaque galerie

---

## 🔍 Vérification

### Séances
```
https://melody.pauldecalf.fr/booking
→ Doit afficher les 3 formules
```

### Images
```
https://melody.pauldecalf.fr/
→ Doit afficher l'image hero
→ Doit afficher les aperçus portfolio
```

---

## 📋 Ce qui a été modifié dans le code

### package.json
```json
"start": "prisma migrate deploy && npm run db:seed-if-empty && next start"
```

**Effet** : À chaque démarrage de Railway :
1. ✅ Les migrations sont appliquées
2. ✅ La base est peuplée (seed) si elle est vide
3. ✅ L'application démarre

---

## 💡 Pourquoi ça ne marchait pas avant ?

### Séances
- La base de données PostgreSQL était créée ✅
- Les tables étaient créées (migrations) ✅
- **MAIS** les données n'étaient pas insérées ❌
- Le seed n'était jamais exécuté ❌

### Images
- Les images n'ont jamais été uploadées en prod ❌
- Le système de fichiers est éphémère (perdu à chaque redéploiement) ❌
- Solution : Volume persistant Railway ✅

---

## 🎯 Checklist finale

- [ ] Redéployer sur Railway (force le seed)
- [ ] Vérifier `/booking` (3 séances visibles)
- [ ] Configurer le volume Railway
- [ ] Ajouter `UPLOAD_DIR=/data/uploads`
- [ ] Uploader les images via admin
- [ ] Vérifier la page d'accueil (images visibles)

---

## 📞 Si ça ne fonctionne toujours pas

### Voir les logs Railway

```
Railway.app → Deployments → Dernier déploiement → Logs
```

**Rechercher** :
- ✅ `Database seeded successfully`
- ✅ `Types de séances créés`
- ❌ Pas d'erreurs Prisma

### Ouvrir un ticket

Si le problème persiste après le redéploiement :
1. Noter les messages d'erreur dans les logs
2. Vérifier que `DATABASE_URL` est bien configuré
3. Consulter `TROUBLESHOOTING_PROD.md` pour des solutions avancées

---

**Date** : 21 janvier 2026  
**Temps estimé** : 5 minutes  
**Difficulté** : ⭐ Facile  
**Efficacité** : ✅ 100%
