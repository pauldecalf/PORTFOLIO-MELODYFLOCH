# Instructions de déploiement - melody.pauldecalf.fr

## 🌐 Configuration du domaine de production

Le site est déployé sur : **https://melody.pauldecalf.fr**

---

## ⚙️ Configuration Railway - Variables d'environnement

### Variables à configurer dans Railway

Aller dans **Settings** → **Variables** et ajouter :

```bash
# URL de production (IMPORTANT)
APP_URL=https://melody.pauldecalf.fr

# Email administrateur
ADMIN_EMAIL=pauldecalf@outlook.fr

# Clé API Resend (pour les emails)
RESEND_API_KEY=re_NhNUJsVr_FKsryMmjXhHE8qqNHk7bErFE

# Base de données (automatique avec Railway PostgreSQL)
DATABASE_URL=postgresql://...

# Répertoire des uploads (si volume Railway)
UPLOAD_DIR=/data/uploads

# Mot de passe admin (hash)
ADMIN_PASSWORD_HASH=[votre_hash]
```

---

## 🔄 Déployer les modifications

### 1. Vérifier les changements localement

```bash
cd /Users/pauldecalf/Desktop/PORTFOLIO-MELODY
npm run build
```

### 2. Commit et push vers GitHub

```bash
git add .
git commit -m "Update: passage au masculin et configuration domaine"
git push origin main
```

### 3. Railway déploie automatiquement

Railway détecte le push et redéploie automatiquement :
- ⏱️ Build : ~2-3 minutes
- ✅ Mise à jour automatique sur https://melody.pauldecalf.fr

---

## 🖼️ Gestion des images

### Problème actuel

Le site en production montre encore l'ancien contenu (texte au féminin).  
Cela signifie que la variable `APP_URL` n'est **pas configurée** sur Railway.

### Solution immédiate

1. **Aller sur Railway** : https://railway.app
2. Ouvrir votre projet "PORTFOLIO-MELODY"
3. Aller dans **Variables**
4. Ajouter/Modifier :
   ```
   APP_URL=https://melody.pauldecalf.fr
   ```
5. **Redémarrer** le service (Railway le fait automatiquement)

### Vérification

Une fois redéployé, vérifier sur https://melody.pauldecalf.fr que :
- ✅ Le texte est au masculin ("Prêt à capturer" au lieu de "Prête")
- ✅ "photographe professionnel" (au lieu de "professionnelle")
- ✅ Les métadonnées SEO sont correctes

---

## 🗂️ Volume persistant pour les images

### Créer un volume Railway

Les images uploadées via l'admin doivent être stockées dans un volume persistant :

1. Dans Railway, aller dans **Variables**
2. Cliquer sur **New Volume**
3. Configurer :
   - **Mount Path** : `/data`
   - **Size** : 5GB minimum

4. Ajouter la variable :
   ```
   UPLOAD_DIR=/data/uploads
   ```

### Routes API pour les images

Le code est déjà configuré pour servir les images via :
```
https://melody.pauldecalf.fr/api/uploads/[filename]
```

Cela permet de servir les images depuis le volume Railway.

---

## 🔍 SEO - Actions post-déploiement

### 1. Google Search Console

1. Aller sur : https://search.google.com/search-console
2. Ajouter la propriété : `https://melody.pauldecalf.fr`
3. Vérifier la propriété (DNS ou balise HTML)
4. Soumettre le sitemap : `https://melody.pauldecalf.fr/sitemap.xml`

### 2. Google My Business

1. Créer une fiche : https://business.google.com
2. Informations :
   - **Nom** : Melody Floc'h Photography
   - **Catégorie** : Photographe
   - **Adresse** : Les Essarts-le-Roi, 78690, France
   - **Site web** : https://melody.pauldecalf.fr
   - **Horaires** : Mar-Ven 9h-18h, Sam 10h-16h

### 3. Réseaux sociaux (Recommandé)

Créer des profils et ajouter dans le code :

**Instagram** : @melodyflochphotography  
**Facebook** : Melody Floc'h Photography

Puis mettre à jour `app/page.tsx` ligne 284 :
```typescript
sameAs: [
  'https://www.instagram.com/melodyflochphotography',
  'https://www.facebook.com/melodyflochphotography',
],
```

---

## 📊 Monitoring

### Vérifier que le site fonctionne

```bash
# Test du site
curl -I https://melody.pauldecalf.fr

# Test de l'API
curl https://melody.pauldecalf.fr/api/auth/check
```

### Logs Railway

```bash
railway logs --follow
```

Ou dans l'interface Railway → **Deployments** → **Logs**

---

## ⚠️ Points d'attention

### Le site montre encore l'ancien contenu ?

**Causes possibles** :
1. ❌ `APP_URL` pas configurée sur Railway
2. ❌ Cache du navigateur (Ctrl+Shift+R pour forcer le refresh)
3. ❌ Railway n'a pas encore redéployé (attendre 2-3 minutes)
4. ❌ Le push Git n'a pas été fait

**Solution** :
1. Vérifier que le commit est bien sur GitHub
2. Vérifier que Railway a détecté le push (voir Deployments)
3. Vérifier les variables d'environnement Railway
4. Forcer un redéploiement si nécessaire

### Les images ne s'affichent pas ?

**Solution** :
1. Vérifier que `UPLOAD_DIR=/data/uploads` est configuré
2. Vérifier que le volume est monté sur `/data`
3. Re-uploader les images via l'admin

---

## 🎯 Checklist de mise en production

### Configuration Railway
- [x] Projet créé sur Railway
- [x] Repository GitHub connecté
- [x] PostgreSQL ajouté
- [ ] **Variable `APP_URL=https://melody.pauldecalf.fr` configurée**
- [ ] Variable `ADMIN_EMAIL=pauldecalf@outlook.fr` configurée
- [ ] Variable `RESEND_API_KEY` configurée
- [ ] Domaine personnalisé configuré
- [ ] Volume persistant créé (optionnel mais recommandé)

### SEO et contenu
- [x] Contenu passé au masculin
- [x] Optimisation SEO locale (Yvelines)
- [x] Page Zone d'intervention créée
- [ ] Images uploadées via l'admin
- [ ] Google Search Console configuré
- [ ] Google My Business créé
- [ ] Sitemap soumis

### Tests
- [ ] Site accessible sur https://melody.pauldecalf.fr
- [ ] SSL actif (cadenas vert)
- [ ] Formulaire de contact fonctionnel
- [ ] Système de réservation fonctionnel
- [ ] Admin accessible et fonctionnel
- [ ] Images affichées correctement

---

## 📞 Contacts et ressources

- **Site de production** : https://melody.pauldecalf.fr
- **Admin** : https://melody.pauldecalf.fr/admin/login
- **Railway Dashboard** : https://railway.app
- **Documentation complète** : voir `RAILWAY_DEPLOY.md`
- **Guide SEO** : voir `GUIDE_SEO_ACTIONS.md`

---

**Dernière mise à jour** : 21 janvier 2026  
**Status** : ✅ Code prêt - ⏳ Configuration Railway nécessaire
