# 🔄 Stratégie ISO Local/Production

## Principe

Ce projet utilise **la même base de données MongoDB** pour le développement local ET la production.

```
Local (localhost:3000)          Production (Railway)
         ↓                              ↓
         └────────────► MongoDB Atlas ◄─┘
                    (base: melody)
```

## Avantages

✅ **Environnement isomorphe** : Ce que vous voyez en local est exactement ce qui est en production
✅ **Pas de synchronisation** : Les données sont toujours à jour
✅ **Test réaliste** : Vous testez avec les vraies données de production
✅ **Simplification** : Une seule base de données à gérer

## Configuration

### Base de données unique

```env
DATABASE_URL=mongodb+srv://admin:admin@atlascluster.vfolo9m.mongodb.net/melody?retryWrites=true&w=majority&appName=AtlasCluster
```

- **Base de données** : `melody`
- **Utilisée par** : Local ET Production

### Différences Local vs Production

Seules ces variables changent :

| Variable | Local | Production |
|----------|-------|------------|
| `APP_URL` | `http://localhost:3000` | `https://melody.pauldecalf.fr` |
| `UPLOAD_DIR` | `./public/uploads` | `/data/uploads` |
| `NODE_ENV` | `development` | `production` |

## ⚠️ Précautions

### 1. Uploads séparés

Les **fichiers images** sont stockés localement :
- **Local** : `public/uploads/` (sur votre machine)
- **Production** : `/data/uploads/` (volume Railway)

**Conséquence** : Si vous uploadez une image en local, elle ne sera pas visible en production (et vice-versa), MAIS l'enregistrement en base de données sera partagé.

**Solution** : Utilisez les scripts de nettoyage pour maintenir la cohérence :
```bash
npm run db:check-integrity      # Supprime les enregistrements DB sans fichiers
npm run db:clean-orphaned-files # Supprime les fichiers sans enregistrement DB
```

### 2. Tests de suppression

Quand vous supprimez quelque chose en local, **c'est supprimé en production aussi** !

**Bonnes pratiques** :
- ✅ Testez les suppressions en local avant de les faire en production
- ✅ Vérifiez toujours ce que vous supprimez
- ✅ Les scripts de nettoyage sont automatiques au démarrage en production

### 3. Données de test

Évitez de créer des données de test qui pollueraient la production :
- ❌ Pas de réservations de test
- ❌ Pas d'images de test avec alt="test123"
- ✅ Utilisez le script `db:clean-images` pour nettoyer si besoin

## Workflow recommandé

### Développement d'une nouvelle fonctionnalité

1. **Développez en local** avec la vraie base de données
2. **Testez** que tout fonctionne
3. **Commitez** le code
4. **Pushez** vers GitHub
5. Railway redéploie automatiquement
6. **La production est déjà à jour** (même base de données)

### Gestion des images

1. **Uploadez les images directement en production** via `/admin`
2. Les images seront stockées sur le volume Railway
3. En local, vous verrez les placeholders (images pas sur votre machine)
4. C'est normal et voulu !

### Alternative : Bases séparées (si besoin)

Si vous préférez avoir des bases séparées :

```env
# Local (.env)
DATABASE_URL=mongodb+srv://...@cluster.net/melody-dev

# Production (Railway)
DATABASE_URL=mongodb+srv://...@cluster.net/melody-prod
```

**Avantages** :
- ✅ Isolation complète
- ✅ Possibilité de tester des suppressions sans risque

**Inconvénients** :
- ❌ Données différentes entre local et production
- ❌ Nécessite de synchroniser les données manuellement
- ❌ Plus complexe à maintenir

## Scripts de maintenance

### Au démarrage de la production

Le script `safe-start.js` exécute automatiquement :

1. **Sync du schéma** (`prisma db push`)
2. **Seed des données de base** (types de séances, disponibilités)
3. **Nettoyage des fichiers orphelins** (supprime les fichiers sans DB)
4. **Démarrage du serveur**

### Manuellement

```bash
# Nettoyage complet (DB ↔ Fichiers)
npm run db:check-integrity && npm run db:clean-orphaned-files

# Reset complet (DANGER!)
npm run db:reset-images  # Supprime toutes les images de la base
```

## Résumé

| Élément | Partagé ? | Local | Production |
|---------|-----------|-------|------------|
| Base de données MongoDB | ✅ Oui | `melody` | `melody` |
| Enregistrements (réservations, séances) | ✅ Oui | Partagés | Partagés |
| Fichiers uploads | ❌ Non | `public/uploads/` | `/data/uploads/` |
| Code source | ✅ Oui | Git | Git |

**En résumé** : Même base de données, fichiers séparés, code partagé via Git.

---

**✅ Cette approche est idéale pour un projet solo ou une petite équipe !**
