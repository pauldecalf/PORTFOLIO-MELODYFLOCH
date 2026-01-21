# 🚨 ACTIONS IMMÉDIATES - Configuration Railway

## ⚠️ Problème constaté

Le site https://melody.pauldecalf.fr affiche encore l'ancien contenu :
- ❌ "Prête à capturer" (féminin) au lieu de "Prêt" (masculin)
- ❌ "photographe professionnelle" au lieu de "professionnel"
- ❌ "Passionnée" au lieu de "Passionné"

**Cause** : La variable d'environnement `APP_URL` n'est pas configurée sur Railway.

---

## ✅ Solution : Configurer Railway

### Étape 1 : Aller sur Railway

1. Ouvrir https://railway.app
2. Se connecter avec votre compte
3. Ouvrir le projet **PORTFOLIO-MELODY**

### Étape 2 : Configurer les variables d'environnement

1. Cliquer sur votre service (celui qui contient le code Next.js)
2. Aller dans l'onglet **Variables**
3. Ajouter/Modifier ces variables :

```bash
APP_URL=https://melody.pauldecalf.fr
ADMIN_EMAIL=pauldecalf@outlook.fr
RESEND_API_KEY=re_NhNUJsVr_FKsryMmjXhHE8qqNHk7bErFE
```

**Important** : La variable `APP_URL` est **CRITIQUE** pour que le site affiche le bon contenu.

### Étape 3 : Redéployer

Railway redémarrera automatiquement après l'ajout des variables.  
Si ce n'est pas le cas :
1. Aller dans **Deployments**
2. Cliquer sur **"Redeploy"** sur le dernier déploiement

### Étape 4 : Vérifier (attendre 2-3 minutes)

1. Vider le cache du navigateur : **Ctrl+Shift+R** (ou Cmd+Shift+R sur Mac)
2. Aller sur https://melody.pauldecalf.fr
3. Vérifier que le contenu est au masculin :
   - ✅ "Prêt à capturer vos plus beaux moments ?"
   - ✅ "photographe professionnel"
   - ✅ "Passionné par l'art du portrait"

---

## 📋 Variables d'environnement complètes

Voici toutes les variables à configurer sur Railway :

| Variable | Valeur | Obligatoire |
|----------|--------|-------------|
| `APP_URL` | `https://melody.pauldecalf.fr` | ✅ OUI |
| `ADMIN_EMAIL` | `pauldecalf@outlook.fr` | ✅ OUI |
| `RESEND_API_KEY` | `re_NhNUJsVr_FKsryMmjXhHE8qqNHk7bErFE` | ✅ OUI |
| `DATABASE_URL` | (Automatique avec Railway PostgreSQL) | ✅ OUI |
| `UPLOAD_DIR` | `/data/uploads` | ⚠️ Si volume |
| `ADMIN_PASSWORD_HASH` | (Hash du mot de passe) | ✅ OUI |

---

## 🔐 Générer le ADMIN_PASSWORD_HASH

Si vous n'avez pas encore de `ADMIN_PASSWORD_HASH`, générez-en un :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Ou utilisez un générateur en ligne : https://generate-secret.vercel.app/32

Puis ajoutez-le dans les variables Railway :
```
ADMIN_PASSWORD_HASH=votre_hash_généré_ici
```

---

## 🖼️ Pour les images (Volume persistant)

### Créer un volume Railway

1. Dans Railway, aller dans votre service
2. Aller dans **Settings** → **Volumes**
3. Cliquer sur **Add Volume**
4. Configurer :
   - **Mount Path** : `/data`
   - **Size** : 5GB (ou plus selon besoin)
5. Sauvegarder

### Ajouter la variable UPLOAD_DIR

Dans les **Variables**, ajouter :
```
UPLOAD_DIR=/data/uploads
```

### Pourquoi un volume ?

Sans volume, les images uploadées via l'admin sont **perdues** à chaque redéploiement.  
Avec un volume, elles sont **conservées** de façon permanente.

---

## 🚀 Déployer les nouveaux changements

Le code a été mis à jour localement. Pour déployer sur Railway :

### Option 1 : Push automatique (Recommandé)

```bash
cd /Users/pauldecalf/Desktop/PORTFOLIO-MELODY
git add .
git commit -m "feat: passage au masculin + config domaine melody.pauldecalf.fr"
git push origin main
```

Railway détectera le push et redéploiera automatiquement.

### Option 2 : Redéploiement manuel

Dans Railway :
1. Aller dans **Deployments**
2. Cliquer sur le dernier déploiement
3. Cliquer sur **"Redeploy"**

---

## ✅ Checklist finale

### Configuration Railway (À faire maintenant)
- [ ] Ajouter `APP_URL=https://melody.pauldecalf.fr`
- [ ] Ajouter `ADMIN_EMAIL=pauldecalf@outlook.fr`
- [ ] Ajouter `RESEND_API_KEY=re_NhNUJsVr_FKsryMmjXhHE8qqNHk7bErFE`
- [ ] Ajouter `ADMIN_PASSWORD_HASH` (générer si nécessaire)
- [ ] Créer un volume persistant (optionnel mais recommandé)
- [ ] Ajouter `UPLOAD_DIR=/data/uploads` (si volume créé)

### Déploiement
- [ ] Faire le commit et push vers GitHub
- [ ] Attendre le redéploiement Railway (2-3 minutes)
- [ ] Vider le cache navigateur (Ctrl+Shift+R)
- [ ] Vérifier https://melody.pauldecalf.fr

### Tests de vérification
- [ ] Le texte est au masculin ("Prêt", "professionnel", "Passionné")
- [ ] Le formulaire de contact fonctionne
- [ ] Le système de réservation fonctionne
- [ ] L'admin est accessible : https://melody.pauldecalf.fr/admin/login

---

## 📞 En cas de problème

### Le site n'affiche toujours pas le bon contenu

1. **Vérifier les variables Railway** :
   - Sont-elles bien configurées ?
   - `APP_URL` est-elle exactement `https://melody.pauldecalf.fr` ?

2. **Vérifier le déploiement** :
   - Aller dans Railway → Deployments
   - Le dernier déploiement est-il réussi (✅) ?
   - Voir les logs pour détecter les erreurs

3. **Forcer le refresh** :
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)
   - Ou ouvrir en navigation privée

4. **Vérifier le commit Git** :
   - Les changements sont-ils bien sur GitHub ?
   - Railway les a-t-il détectés ?

### Logs Railway

Pour voir les logs en temps réel :
```bash
railway logs --follow
```

Ou dans l'interface : **Railway** → **Deployments** → **Logs**

---

## 📚 Documentation complète

Pour plus de détails, voir :
- `RAILWAY_DEPLOY.md` - Guide complet de déploiement Railway
- `DEPLOY_INSTRUCTIONS.md` - Instructions détaillées
- `GUIDE_SEO_ACTIONS.md` - Actions SEO post-déploiement
- `.env.production` - Template des variables d'environnement

---

**Date** : 21 janvier 2026  
**URL de production** : https://melody.pauldecalf.fr  
**Status** : ⏳ En attente de configuration Railway
