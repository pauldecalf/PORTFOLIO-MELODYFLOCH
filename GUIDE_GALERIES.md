# 📸 Guide de gestion des galeries du portfolio

## 🎯 Vue d'ensemble

Vous pouvez maintenant **ajouter, modifier et supprimer** les images des galeries du portfolio directement depuis l'administration, sans toucher au code !

Les 3 galeries disponibles sont :
- **Portraits** (`portraits`)
- **Portraits Noir & Blanc** (`noir-et-blanc`)
- **À travers mon objectif** (`lifestyle`)

---

## 🚀 Comment ajouter des images à une galerie

### 1. Accéder à l'administration

1. Allez sur `/admin`
2. Connectez-vous avec votre mot de passe
3. Cliquez sur l'onglet **"📸 Galeries"**

### 2. Uploader une image

1. **Sélectionnez la galerie** dans le menu déroulant :
   - Portraits
   - Portraits Noir & Blanc
   - À travers mon objectif

2. **Remplissez le texte alternatif (SEO)** :
   - Exemple : "Portrait lifestyle en extérieur"
   - Exemple : "Portrait noir et blanc artistique"
   - Important pour le référencement Google !

3. **Description (optionnelle)** :
   - Une description qui s'affichera au survol de l'image sur le site

4. **Ordre d'affichage** :
   - Les images sont triées par ordre croissant (0, 1, 2, 3...)
   - Vous pouvez modifier l'ordre après l'upload

5. **Choisissez votre image** :
   - Formats acceptés : JPG, PNG, WebP, GIF
   - Taille maximale : 10 MB

6. **Cliquez sur "Uploader l'image"**

L'image sera automatiquement :
- ✅ Optimisée et redimensionnée
- ✅ Stockée dans `/public/uploads/gallery/`
- ✅ Visible sur le site immédiatement

---

## 📋 Gérer les images existantes

### Voir les images par galerie

Dans l'onglet **"📸 Galeries"**, cliquez sur les boutons :
- **Portraits (X)** : Voir les X images de la galerie Portraits
- **Portraits Noir & Blanc (X)** : Voir les X images de la galerie Noir & Blanc
- **À travers mon objectif (X)** : Voir les X images de la galerie Lifestyle

### Modifier l'ordre d'affichage

1. Trouvez l'image dans la liste
2. Modifiez le numéro dans le champ **"Ordre"**
3. L'ordre est automatiquement sauvegardé

💡 **Astuce** : Pour réorganiser plusieurs images :
- Image 1 : ordre 0
- Image 2 : ordre 1
- Image 3 : ordre 2
- etc.

### Désactiver une image

1. Cliquez sur le bouton **"Désactiver"**
2. L'image disparaîtra du site mais restera dans la base de données
3. Vous pouvez la réactiver plus tard en cliquant sur **"Activer"**

### Supprimer une image

1. Cliquez sur le bouton **"Supprimer"**
2. Confirmez la suppression
3. ⚠️ **Attention** : La suppression est définitive !

---

## 🌐 Où sont affichées les images ?

### Page Portfolio (`/portfolio`)

- Affiche **les 8 premières images** de chaque galerie
- Lien "Voir toute la galerie" pour voir toutes les images

### Page Galerie individuelle (`/portfolio/portraits`, `/portfolio/noir-et-blanc`, `/portfolio/lifestyle`)

- Affiche **toutes les images** de la galerie sélectionnée
- Grille responsive (3 colonnes sur desktop, 2 sur tablette, 1 sur mobile)
- Effet hover avec description (si renseignée)

---

## 💡 Recommandations

### Dimensions d'images

| Type | Dimensions recommandées | Poids max |
|------|-------------------------|-----------|
| Portrait | 1200x1200px | 500 KB |
| Paysage | 1600x1200px | 500 KB |
| Carré | 1200x1200px | 500 KB |

> Les images sont automatiquement optimisées, mais partir avec des images de bonne qualité améliore le rendu final.

### Texte alternatif (SEO)

**Très important pour le référencement Google !**

✅ Bons exemples :
- "Portrait lifestyle d'une femme en extérieur"
- "Portrait noir et blanc artistique d'un homme"
- "Séance photo famille en lifestyle"
- "Portrait professionnel en studio"

❌ À éviter :
- "IMG_1234.jpg"
- "photo"
- Laisser vide

### Description

La description est **optionnelle** mais recommandée pour :
- Donner du contexte à l'image
- Raconter une histoire
- Ajouter des informations techniques

Elle s'affichera au survol de l'image sur le site.

---

## 🎨 Nombre d'images par galerie

Il n'y a **pas de limite** au nombre d'images par galerie. Vous pouvez en ajouter autant que vous voulez !

**Recommandations** :
- **Portraits** : 20-30 images
- **Portraits Noir & Blanc** : 15-25 images
- **À travers mon objectif** : 25-40 images

Plus vous avez d'images, plus votre portfolio sera riche et varié !

---

## 🔍 Vérifier que les images s'affichent

### Depuis l'administration

1. Allez dans l'onglet **"📸 Galeries"**
2. Sélectionnez la galerie
3. Vous devriez voir toutes vos images avec :
   - Leur miniature
   - Leur ordre
   - Leur statut (activée / désactivée)

### Sur le site

1. Allez sur `/portfolio`
2. Vous devriez voir les 8 premières images de chaque galerie
3. Cliquez sur "Voir toute la galerie" pour voir toutes les images

---

## 🛠️ Dépannage

### Les images ne s'affichent pas

1. **Vérifiez que l'image est activée** (badge vert)
2. **Actualisez la page** du site (Cmd+R / Ctrl+R)
3. **Videz le cache** du navigateur (Cmd+Shift+R / Ctrl+Shift+R)
4. **Vérifiez la console** du navigateur (F12) pour voir les erreurs

### L'upload échoue

- **Vérifiez la taille du fichier** (max 10 MB)
- **Vérifiez le format** (JPG, PNG, WebP, GIF)
- **Vérifiez que Sharp est installé** :
  ```bash
  npm list sharp
  ```

### L'ordre ne se met pas à jour

1. Actualisez la page de l'administration
2. Vérifiez que le numéro d'ordre est bien un entier (0, 1, 2, 3...)

---

## 📊 Statistiques

Dans le dashboard admin (onglet "Réservations"), vous verrez :
- Le **nombre total d'images** de toutes les galeries

---

## 🎯 Exemple de workflow

### Ajouter une nouvelle série de portraits

1. **Sélectionnez vos meilleures photos** (20-30 images)
2. **Optimisez-les** (Lightroom, Photoshop, etc.)
3. **Exportez-les** en JPG (1200x1200px, qualité 80%)
4. **Allez dans l'admin** → Onglet "📸 Galeries"
5. **Uploadez chaque image** avec :
   - La galerie "Portraits"
   - Un texte alternatif descriptif
   - Une description (optionnelle)
   - Un ordre (0, 1, 2, 3...)
6. **Vérifiez sur le site** : `/portfolio/portraits`

---

## 📖 Résumé des clés de galeries

| Clé | Nom affiché | Page |
|-----|-------------|------|
| `portraits` | Portraits | `/portfolio/portraits` |
| `noir-et-blanc` | Portraits Noir & Blanc | `/portfolio/noir-et-blanc` |
| `lifestyle` | À travers mon objectif | `/portfolio/lifestyle` |

---

## ⚙️ Technique (pour développeurs)

### Structure de la base de données

Le modèle `GalleryImage` contient :
- `id` : Identifiant unique
- `gallery` : Clé de la galerie (`portraits`, `noir-et-blanc`, `lifestyle`)
- `filename` : Nom du fichier
- `url` : URL de l'image
- `altText` : Texte alternatif (SEO)
- `description` : Description (optionnelle)
- `isActive` : Statut (activée / désactivée)
- `order` : Ordre d'affichage
- `createdAt` / `updatedAt` : Timestamps

### API

Les images sont récupérées via :
- `getGalleryImages(gallery)` : Récupère toutes les images d'une galerie
- `getGalleryImageCount(gallery)` : Compte le nombre d'images
- `getGalleryPreview(gallery)` : Récupère la première image (preview)

---

**Bonne gestion de vos galeries ! 📸✨**



