# 🐛 Guide de débogage production - Railway

## Erreur : "Application error: a server-side exception has occurred"

Cette erreur Next.js indique un problème côté serveur. Suivez ces étapes dans l'ordre.

---

## 🔍 Étape 1 : Consulter les logs Railway

### Comment accéder aux logs :

1. Allez sur **Railway.app**
2. Sélectionnez votre projet
3. Cliquez sur le service
4. **Deployments** → Cliquez sur le dernier déploiement
5. Onglet **"Logs"** (ou **"Build Logs"** / **"Deploy Logs"**)

### Que chercher dans les logs :

#### ✅ Logs normaux (bon signe)
```
📦 Step 1/4: Syncing database schema...
✅ Database schema synced
🌱 Step 2/4: Seeding database...
✅ Seed completed
🧹 Step 3/4: Cleaning orphaned files...
✅ Cleanup completed
🎯 Step 4/4: Starting Next.js server...
Server running on...
```

#### ❌ Erreurs courantes

##### Erreur 1 : Variable d'environnement manquante
```
Error: Environment variable not found: DATABASE_URL
```
**Solution** : Ajoutez la variable manquante dans Railway → Variables

##### Erreur 2 : Connexion MongoDB refusée
```
PrismaClientInitializationError
MongoNetworkError: connection refused
```
**Solution** : Vérifiez MongoDB Atlas Network Access (autoriser 0.0.0.0/0)

##### Erreur 3 : Clé API Resend invalide
```
Error: Missing API key. Pass it to the constructor
```
**Solution** : Vérifiez `RESEND_API_KEY` dans Railway → Variables

##### Erreur 4 : Build failed
```
npm ERR! code 1
Build failed
```
**Solution** : Problème de dépendances ou de code. Vérifiez les logs de build.

---

## 🔧 Étape 2 : Vérifier les variables d'environnement

### Checklist des variables Railway

Allez dans **Railway → Variables** et vérifiez :

- [ ] `DATABASE_URL` : `mongodb+srv://admin:admin@atlascluster.vfolo9m.mongodb.net/melody?retryWrites=true&w=majority&appName=AtlasCluster`
- [ ] `APP_URL` : `https://melody.pauldecalf.fr`
- [ ] `ADMIN_EMAIL` : `pauldecalf@outlook.fr`
- [ ] `RESEND_API_KEY` : `re_NhNUJsVr_FKsryMmjXhHE8qqNHk7bErFE`
- [ ] `UPLOAD_DIR` : `/data/uploads`
- [ ] `ADMIN_PASSWORD_HASH` : `8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918`
- [ ] `NODE_ENV` : `production`

### Comment vérifier

1. Railway → Votre service → **Variables**
2. Comparez avec la liste ci-dessus
3. Si une variable manque ou est incorrecte, corrigez-la
4. Sauvegardez → Railway redéploiera automatiquement

---

## 🗄️ Étape 3 : Vérifier MongoDB Atlas

### 1. Vérifier que la base existe

1. Allez sur https://cloud.mongodb.com
2. **Database** → **Browse Collections**
3. Vérifiez que la base **`melody`** existe
4. Si elle n'existe pas, elle sera créée automatiquement au premier démarrage

### 2. Vérifier Network Access

1. **Network Access** (menu gauche)
2. Vérifiez qu'il y a une entrée : **0.0.0.0/0** (Allow access from anywhere)
3. Si elle n'existe pas :
   - Cliquez sur **"Add IP Address"**
   - Sélectionnez **"Allow access from anywhere"**
   - Confirmez

### 3. Vérifier les identifiants

Dans votre URL de connexion :
```
mongodb+srv://admin:admin@atlascluster.vfolo9m.mongodb.net/melody
              ^^^^^ ^^^^^
              user  password
```

Vérifiez que l'utilisateur `admin` existe et a le bon mot de passe :
1. **Database Access** (menu gauche)
2. Trouvez l'utilisateur `admin`
3. Si nécessaire, éditez et changez le mot de passe

---

## 🚀 Étape 4 : Redéployer

Après avoir corrigé un problème :

### Option A : Redéploiement automatique
Si vous avez modifié les variables d'environnement, Railway redéploie automatiquement.

### Option B : Redéploiement manuel
1. Railway → **Deployments**
2. Trouvez le dernier déploiement
3. Cliquez sur **"..."** → **"Redeploy"**

### Option C : Push un nouveau commit
```bash
git commit --allow-empty -m "fix: force redeploy"
git push origin main
```

---

## 🧪 Étape 5 : Tester après le redéploiement

Attendez que le déploiement soit terminé (icône verte ✅), puis testez :

1. **Page d'accueil** : https://melody.pauldecalf.fr
2. **Admin** : https://melody.pauldecalf.fr/admin/login
3. **API de santé** : https://melody.pauldecalf.fr/api/auth/check

Si l'erreur persiste, retournez à l'**Étape 1** et consultez les nouveaux logs.

---

## 🆘 Problèmes spécifiques

### "Invalid `prisma.X.findFirst()` invocation"

**Cause** : Problème de connexion à MongoDB ou schéma non synchronisé

**Solution** :
```bash
# En local, vérifiez que le schéma est correct
npm run db:push

# Puis commitez et pushez si ça fonctionne
git add .
git commit -m "fix: sync prisma schema"
git push origin main
```

### "Cannot find module 'X'"

**Cause** : Dépendance manquante

**Solution** :
```bash
# Vérifiez que package.json est à jour
npm install

# Commitez le package-lock.json si modifié
git add package-lock.json
git commit -m "fix: update dependencies"
git push origin main
```

### "ENOENT: no such file or directory"

**Cause** : Fichier ou dossier manquant (probablement le dossier uploads)

**Solution** : Le script `safe-start.js` devrait créer les dossiers nécessaires. Si l'erreur persiste, ajoutez un volume persistant sur Railway (voir DEPLOIEMENT_RAILWAY_FIX.md).

---

## 📊 Checklist complète de débogage

- [ ] Logs Railway consultés
- [ ] Erreur identifiée dans les logs
- [ ] Variables d'environnement vérifiées sur Railway
- [ ] MongoDB Atlas accessible (Network Access à 0.0.0.0/0)
- [ ] Base de données `melody` existe
- [ ] Identifiants MongoDB corrects
- [ ] Application redéployée
- [ ] Site testé et fonctionnel

---

## 💡 Astuce

**Active les logs en temps réel** pendant le déploiement :
1. Railway → Deployments → Dernier déploiement
2. Gardez l'onglet ouvert pour voir les logs en direct
3. Identifiez exactement où ça échoue

---

**✅ 99% des erreurs viennent de variables d'environnement manquantes ou incorrectes !**
