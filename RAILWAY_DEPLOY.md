# Déploiement sur Railway - Melody Floc'h Photography

## 🚀 Configuration Railway

### Variables d'environnement requises

Dans Railway, configurez les variables suivantes :

```bash
# URL de production
APP_URL=https://melody.pauldecalf.fr

# Email admin
ADMIN_EMAIL=pauldecalf@outlook.fr

# Clé API Resend
RESEND_API_KEY=re_NhNUJsVr_FKsryMmjXhHE8qqNHk7bErFE

# Base de données PostgreSQL (fournie par Railway)
DATABASE_URL=postgresql://...

# Répertoire des uploads (si volume Railway)
UPLOAD_DIR=/data/uploads

# Hash du mot de passe admin (générer avec: openssl rand -base64 32)
ADMIN_PASSWORD_HASH=...
```

---

## 📦 Configuration du domaine

### 1. Dans Railway

1. Aller dans les Settings du projet
2. Section "Domains"
3. Ajouter le domaine personnalisé : `melody.pauldecalf.fr`
4. Railway vous donnera une adresse CNAME

### 2. Configuration DNS

Chez votre fournisseur DNS (OVH, Cloudflare, etc.) :

```
Type: CNAME
Nom: melody
Cible: [URL fournie par Railway]
TTL: Auto
```

### 3. Vérification

Une fois le DNS propagé (peut prendre jusqu'à 24h) :
- ✅ Le site sera accessible sur https://melody.pauldecalf.fr
- ✅ Le certificat SSL sera automatiquement généré par Railway

---

## 🗄️ Volume persistant pour les images

### Créer un volume Railway

1. Dans le projet Railway, aller dans "Variables"
2. Cliquer sur "New Variable" → "Add Volume"
3. Configurer :
   - **Mount Path** : `/data`
   - **Size** : 5GB (ajustable)

4. Ajouter la variable d'environnement :
   ```
   UPLOAD_DIR=/data/uploads
   ```

### Pourquoi un volume ?

Railway utilise un système de fichiers **éphémère** :
- ❌ Les fichiers uploadés sont perdus à chaque redéploiement
- ✅ Un volume persistant conserve les images entre les déploiements

### Alternative : Stockage cloud

Pour une solution plus scalable :
- **Cloudinary** : Gratuit jusqu'à 25GB
- **AWS S3** : Pay-as-you-go
- **Vercel Blob** : Intégration facile

---

## 🔧 Scripts de démarrage

Le `package.json` est configuré pour :

```json
{
  "scripts": {
    "start": "prisma migrate deploy && next start",
    "postinstall": "prisma generate"
  }
}
```

**Ce qui se passe au démarrage** :
1. `prisma generate` → Génère le client Prisma
2. `prisma migrate deploy` → Applique les migrations de base de données
3. `next start` → Démarre l'application

---

## 🗃️ Base de données PostgreSQL

### Créer la base de données

1. Dans Railway, cliquer sur "New" → "Database" → "PostgreSQL"
2. Railway créera automatiquement la variable `DATABASE_URL`

### Appliquer les migrations

Les migrations s'appliquent automatiquement au démarrage grâce à :
```bash
prisma migrate deploy
```

### Seed initial (optionnel)

Pour peupler la base avec des données initiales :
```bash
npm run db:seed
```

---

## 📊 Monitoring

### Logs Railway

```bash
# Voir les logs en temps réel
railway logs

# Ou dans l'interface Railway → Deployments → Logs
```

### Métriques importantes

- **Build time** : ~2-3 minutes
- **Cold start** : ~5-10 secondes
- **Memory** : ~200MB (ajustable)
- **CPU** : Partagé (gratuit) ou dédié (payant)

---

## 🔒 Sécurité

### Variables sensibles

✅ **Configurées sur Railway** :
- `RESEND_API_KEY`
- `ADMIN_PASSWORD_HASH`
- `DATABASE_URL`

❌ **Jamais dans le code** :
- Pas dans `.env` committé
- Pas dans les fichiers publics

### HTTPS automatique

Railway fournit automatiquement :
- ✅ Certificat SSL (Let's Encrypt)
- ✅ Redirection HTTP → HTTPS
- ✅ En-têtes de sécurité

---

## 🐛 Débogage

### Le site ne charge pas

1. Vérifier les logs Railway
2. Vérifier que `APP_URL` est correct
3. Vérifier la propagation DNS : `dig melody.pauldecalf.fr`

### Les images ne s'affichent pas

1. Vérifier que `UPLOAD_DIR` est configuré
2. Vérifier que le volume est monté sur `/data`
3. Tester l'API route : `https://melody.pauldecalf.fr/api/uploads/test.jpg`

### Emails non envoyés

1. Vérifier `RESEND_API_KEY` dans les variables Railway
2. Vérifier `ADMIN_EMAIL` est correct
3. Tester dans l'interface Resend : https://resend.com/emails

---

## 🚀 Déploiement continu

### Configuration Git

Railway se déploie automatiquement à chaque push sur `main` :

```bash
git add .
git commit -m "Update content"
git push origin main
```

Railway détectera le push et :
1. ✅ Buildera l'application
2. ✅ Appliquera les migrations
3. ✅ Redémarrera le service
4. ✅ Le site sera mis à jour (downtime : ~10s)

---

## 📈 Optimisations

### Build cache

Railway met en cache :
- ✅ `node_modules`
- ✅ `.next` (partiellement)
- ✅ Prisma client

### Performance

Pour améliorer les performances :
1. Activer le plan "Pro" (CPU dédié)
2. Ajouter un CDN (Cloudflare)
3. Optimiser les images (déjà fait avec Next.js)

---

## 💰 Coûts

### Plan Hobby (Gratuit)

- ✅ 500h de runtime/mois
- ✅ 100GB de bande passante
- ✅ Domaine personnalisé
- ✅ SSL automatique

### Plan Pro (5$/mois)

- ✅ Runtime illimité
- ✅ CPU dédié
- ✅ Plus de mémoire
- ✅ Support prioritaire

---

## 📞 Support

### Documentation officielle

- Railway : https://docs.railway.app
- Next.js : https://nextjs.org/docs
- Prisma : https://www.prisma.io/docs

### Logs utiles

```bash
# Voir les logs de build
railway logs --build

# Voir les logs de runtime
railway logs --runtime

# Suivre les logs en temps réel
railway logs --follow
```

---

## ✅ Checklist de déploiement

- [x] Créer le projet Railway
- [x] Connecter le repository GitHub
- [x] Configurer les variables d'environnement
- [x] Ajouter PostgreSQL
- [x] Configurer le domaine personnalisé `melody.pauldecalf.fr`
- [x] Ajouter un volume persistant (optionnel)
- [x] Configurer DNS (CNAME)
- [ ] Tester le site : https://melody.pauldecalf.fr
- [ ] Vérifier les emails
- [ ] Uploader les images via l'admin
- [ ] Créer une fiche Google My Business
- [ ] Soumettre le sitemap à Google Search Console

---

**Date de création** : 21 janvier 2026  
**URL de production** : https://melody.pauldecalf.fr  
**Dernière mise à jour** : Build réussi ✅
