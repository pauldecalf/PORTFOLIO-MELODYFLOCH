# 🚀 Guide de déploiement Railway - MongoDB Atlas

## Problème résolu
Les erreurs 404 sur les images viennent d'un problème de configuration de la base de données en production.

## Solution : Configuration Railway

### Étape 1 : Configurer les variables d'environnement

1. Allez sur **Railway.app** → Votre projet
2. Cliquez sur votre service (melody-photography)
3. Allez dans **"Variables"**
4. Ajoutez/Modifiez les variables suivantes :

```env
DATABASE_URL=mongodb+srv://admin:admin@atlascluster.vfolo9m.mongodb.net/melody-photography?retryWrites=true&w=majority&appName=AtlasCluster
APP_URL=https://melody.pauldecalf.fr
ADMIN_EMAIL=pauldecalf@outlook.fr
RESEND_API_KEY=re_NhNUJsVr_FKsryMmjXhHE8qqNHk7bErFE
UPLOAD_DIR=/data/uploads
ADMIN_PASSWORD_HASH=8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
NODE_ENV=production
```

### Étape 2 : Redéployer

Une fois les variables sauvegardées, Railway redéploiera automatiquement.

Sinon, vous pouvez forcer un redéploiement :
1. Allez dans **"Deployments"**
2. Cliquez sur **"Redeploy"** sur le dernier déploiement

### Étape 3 : Vérifier les logs

1. Allez dans **"Deployments"**
2. Cliquez sur le déploiement en cours
3. Regardez les logs pour vérifier :
   - ✅ `Database schema synced`
   - ✅ `Seed completed` (ou `skipped`)
   - ✅ `Server running on...`

### Étape 4 : Tester le site

1. Allez sur **https://melody.pauldecalf.fr**
2. Le site devrait afficher des placeholders gris (pas d'erreur 404)
3. Connectez-vous à **https://melody.pauldecalf.fr/admin/login** (mot de passe: `admin`)
4. Uploadez vos images dans la section "Images"

## Problèmes courants

### Les images ne s'affichent toujours pas
→ C'est normal ! La base de données est vide. Vous devez :
1. Vous connecter à l'admin
2. Uploader vos images
3. Les images s'afficheront ensuite

### Erreur de connexion MongoDB
→ Vérifiez que :
- L'URL MongoDB est correcte
- Le mot de passe ne contient pas de caractères spéciaux non encodés
- MongoDB Atlas autorise les connexions depuis n'importe quelle IP (0.0.0.0/0)

### Le site ne démarre pas
→ Regardez les logs Railway pour voir l'erreur exacte

## Configuration MongoDB Atlas

Si vous devez configurer les accès réseau :

1. Allez sur **MongoDB Atlas** : https://cloud.mongodb.com
2. Cliquez sur **"Network Access"** (menu gauche)
3. Ajoutez **0.0.0.0/0** pour autoriser toutes les IPs (Railway utilise des IPs dynamiques)
4. Sauvegardez

## Volume persistant pour les uploads (Optionnel)

Pour que les images uploadées persistent entre les redéploiements :

1. Railway → Votre service → **"Settings"**
2. Scrollez jusqu'à **"Volumes"**
3. Créez un nouveau volume :
   - **Mount Path** : `/data/uploads`
   - **Size** : 1 GB (ou plus selon vos besoins)
4. Sauvegardez

**Note** : Sans volume, les images seront perdues à chaque redéploiement. Utilisez plutôt un service de stockage externe (AWS S3, Cloudinary, etc.) pour la production.

## Checklist finale

- [ ] Variables d'environnement configurées dans Railway
- [ ] DATABASE_URL pointe vers MongoDB Atlas
- [ ] Site redéployé
- [ ] Logs vérifiés (pas d'erreur)
- [ ] Site accessible (https://melody.pauldecalf.fr)
- [ ] Admin accessible (/admin/login)
- [ ] Images uploadées via l'admin

---

**Besoin d'aide ?** Consultez les logs Railway pour identifier le problème exact.
