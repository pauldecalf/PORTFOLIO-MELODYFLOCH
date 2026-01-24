# 🖼️ Guide de gestion des images

## Problème résolu : Images orphelines

### Qu'est-ce qu'une image orpheline ?

Une **image orpheline** se produit quand :
- ✅ L'enregistrement existe dans la base de données MongoDB (avec alt, description, etc.)
- ❌ Le fichier image physique n'existe plus dans `/uploads/`

Cela cause des erreurs 404 car le site essaie de charger une image qui n'existe plus.

### Pourquoi ça arrive ?

1. **Suppression manuelle** : Vous supprimez le fichier sans supprimer l'enregistrement DB
2. **Redéploiement** : Sur Railway sans volume persistant, les uploads sont perdus à chaque redéploiement
3. **Changement de base de données** : Passer d'une DB à une autre sans migrer les fichiers

---

## 🛠️ Scripts de maintenance

### 1. Vérifier l'intégrité des images

```bash
npm run db:check-integrity
```

Ce script :
- ✅ Vérifie que chaque enregistrement DB a son fichier
- 🧹 Supprime automatiquement les enregistrements orphelins
- 📊 Affiche un résumé

**⚠️ À lancer après chaque redéploiement sur Railway (si pas de volume persistant)**

### 2. Nettoyer les images de test

```bash
npm run db:clean-images
```

Supprime les images avec des alt/descriptions de test comme "esfhgsdgh", "test", "azerty".

### 3. Supprimer TOUTES les images

```bash
npm run db:reset-images
```

⚠️ **DANGER** : Supprime toutes les images de la base de données. À utiliser pour repartir à zéro.

---

## 📋 Checklist pour éviter les images orphelines

### En local

- [ ] Toujours supprimer les images via l'interface admin (`/admin`)
- [ ] Ne JAMAIS supprimer manuellement les fichiers dans `public/uploads`
- [ ] Lancer `npm run db:check-integrity` régulièrement

### En production (Railway)

- [ ] **Option A** : Configurer un volume persistant (recommandé)
  - Railway → Settings → Volumes → Ajouter `/data/uploads`
  - Met à jour `.env` : `UPLOAD_DIR=/data/uploads`
  
- [ ] **Option B** : Utiliser un stockage externe
  - AWS S3, Cloudinary, ou autre CDN
  - Modifier `lib/upload.ts` pour uploader sur le service externe
  
- [ ] Lancer `npm run db:check-integrity` après chaque redéploiement

---

## 🚀 Solution recommandée pour la production

### Utiliser un volume persistant sur Railway

1. **Allez sur Railway.app** → Votre service
2. **Settings** → **Volumes** → **New Volume**
3. Configurez :
   - **Mount Path** : `/data/uploads`
   - **Size** : 5 GB (ajustable selon vos besoins)
4. Mettez à jour la variable d'environnement :
   ```env
   UPLOAD_DIR=/data/uploads
   ```
5. Redéployez l'application

**Avantages** :
- ✅ Les images persistent entre les redéploiements
- ✅ Pas besoin de service externe
- ✅ Pas de coût supplémentaire (inclus dans Railway)

**Inconvénients** :
- ❌ Les images ne sont pas dans un CDN (pas de cache global)
- ❌ Pas de backup automatique (pensez à exporter régulièrement)

---

## 🔍 Diagnostic en cas de problème

### Symptôme : Erreur 404 sur les images

1. **Vérifier la base de données** :
   ```bash
   npm run db:check-integrity
   ```

2. **Vérifier le dossier uploads** :
   ```bash
   # En local
   ls -la public/uploads/
   
   # Sur Railway (via terminal)
   ls -la /data/uploads/
   ```

3. **Vérifier les variables d'environnement** :
   - `DATABASE_URL` pointe vers la bonne base MongoDB
   - `UPLOAD_DIR` pointe vers le bon dossier
   - `APP_URL` est correct

### Symptôme : Images avec alt="esfhgsdgh" ou descriptions bizarres

Ce sont des images de test. Nettoyez-les :
```bash
npm run db:clean-images
```

### Symptôme : Les images ne s'affichent pas après upload

1. Vérifiez que le fichier a bien été uploadé :
   ```bash
   ls -la public/uploads/
   ```

2. Vérifiez que l'enregistrement existe dans la DB via l'admin

3. Videz le cache du navigateur (Ctrl+Shift+R)

---

## 📦 Workflow recommandé

### En développement local

1. Uploadez vos images via `/admin`
2. Testez que tout fonctionne
3. Commitez UNIQUEMENT le code (pas les images)
4. Les images restent en local

### En production

1. Déployez le code sur Railway
2. Configurez le volume persistant
3. Uploadez les images de production via `/admin` en production
4. Les images persistent sur le volume Railway

### Séparation local/production

Si vous voulez des images différentes entre local et production :

- **Option A** : Utilisez des bases MongoDB différentes
  ```env
  # Local
  DATABASE_URL=mongodb+srv://...@cluster.net/melody-dev
  
  # Production
  DATABASE_URL=mongodb+srv://...@cluster.net/melody-prod
  ```

- **Option B** : Synchronisez manuellement
  - Uploadez les images en local
  - Exportez-les
  - Ré-uploadez en production

---

## 🎯 Commandes rapides

```bash
# Vérifier et nettoyer les images orphelines
npm run db:check-integrity

# Nettoyer les images de test
npm run db:clean-images

# Tout supprimer (reset complet)
npm run db:reset-images

# Réinitialiser avec les données de base (types de séances, etc.)
npm run db:seed
```

---

**✅ Votre base de données est maintenant propre et cohérente !**
