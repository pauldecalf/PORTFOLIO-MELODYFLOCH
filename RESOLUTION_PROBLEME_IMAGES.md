# 🔧 Résolution : Les images ne s'affichent pas

## 🎯 Problème initial

Lorsque vous uploadiez une image via l'administration, le message de confirmation s'affichait mais l'image n'apparaissait pas sur le site.

## 🔍 Cause du problème

Les images étaient bien **uploadées et enregistrées** dans la base de données, mais les **pages du site utilisaient encore des placeholders statiques** au lieu de récupérer les images de la base de données.

## ✅ Solution mise en place

### 1. Création d'un système d'images dynamiques

**Nouveaux fichiers créés :**

- **`lib/images.ts`** : Fonctions pour récupérer les images depuis la base de données
- **`components/DynamicImage.tsx`** : Composant qui affiche une image de la DB ou un placeholder

### 2. Mise à jour des pages du site

Les pages suivantes ont été modifiées pour utiliser les images dynamiques :

- ✅ **Page d'accueil** (`/`) : Hero, aperçus portfolio, photo Melody
- ✅ **Page À propos** (`/about`) : Photo de Melody

### 3. Documentation complète

Un guide complet a été créé : **[GUIDE_IMAGES.md](./GUIDE_IMAGES.md)**

Ce guide contient :
- La liste de toutes les clés d'images à uploader
- Comment uploader une image
- Comment vérifier qu'une image est bien uploadée
- Dépannage et recommandations

---

## 📸 Clés d'images à uploader

Pour que les images apparaissent sur le site, vous devez uploader des images avec ces **clés exactes** :

### Page d'accueil (`/`)

| Clé | Description |
|-----|-------------|
| `hero-home` | Image hero principale (en-tête) |
| `preview-portraits` | Aperçu galerie Portraits |
| `preview-nb` | Aperçu galerie Noir & Blanc |
| `preview-lifestyle` | Aperçu galerie Lifestyle |
| `about-melody` | Photo de Melody (section À propos) |

### Page À propos (`/about`)

| Clé | Description |
|-----|-------------|
| `about-melody` | Photo portrait de Melody |

---

## 🚀 Comment uploader vos images

1. **Connectez-vous à l'administration** : `http://localhost:3000/admin`
2. **Allez dans l'onglet "Images"**
3. **Cliquez sur "Uploader une image"**
4. **Remplissez le formulaire :**
   - **Clé** : Utilisez **exactement** une des clés ci-dessus (ex: `hero-home`)
   - **Catégorie** : `home`, `about`, `portfolio`...
   - **Ordre** : 1, 2, 3... (pour trier les images)
   - **Texte alternatif** : Description SEO (ex: "Séance photo portrait lifestyle")
   - **Fichier** : Votre image (JPG, PNG, WebP)
5. **Cliquez sur "Uploader"**
6. **Actualisez la page du site** (Cmd+R / Ctrl+R)

L'image devrait maintenant apparaître sur le site ! 🎉

---

## 🔎 Vérification

### Dans l'administration

- Allez dans l'onglet **"Images"**
- Vous devriez voir votre image avec :
  - Sa miniature
  - Sa clé (ex: `hero-home`)
  - Un badge vert (activée)

### Sur le site

- Ouvrez la page correspondante (ex: `/` pour `hero-home`)
- L'image devrait s'afficher à la place du placeholder gris

---

## ⚠️ Important : Sensibilité à la casse

Les clés d'images sont **sensibles à la casse** et doivent être **exactement identiques** :

- ✅ `hero-home` (correct)
- ❌ `Hero-Home` (incorrect)
- ❌ `hero_home` (incorrect)
- ❌ `herohome` (incorrect)

---

## 🛠️ Dépannage

### L'image ne s'affiche toujours pas

1. **Vérifiez la clé** : Elle doit être exactement celle listée dans le tableau
2. **Vérifiez le statut** : L'image doit être activée (badge vert)
3. **Actualisez la page** : Cmd+R (Mac) / Ctrl+R (Windows)
4. **Videz le cache** : Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
5. **Vérifiez la console** : Ouvrez les DevTools (F12) et regardez les erreurs

### L'upload échoue

- Vérifiez la taille du fichier (max 10 MB)
- Vérifiez le format (JPG, PNG, WebP, GIF)
- Vérifiez que Sharp est bien installé :
  ```bash
  npm list sharp
  ```
  Si absent :
  ```bash
  npm install sharp
  ```

---

## 📋 Liste de vérification

- [ ] J'ai uploadé l'image `hero-home` pour la page d'accueil
- [ ] J'ai uploadé les images `preview-portraits`, `preview-nb`, `preview-lifestyle`
- [ ] J'ai uploadé l'image `about-melody` pour la page À propos
- [ ] Toutes mes images sont **activées** (badge vert)
- [ ] J'ai vérifié que les images s'affichent bien sur le site
- [ ] J'ai rempli le texte alternatif (important pour le SEO)

---

## 📖 Documentation complète

Pour plus de détails, consultez :
- **[GUIDE_IMAGES.md](./GUIDE_IMAGES.md)** : Guide complet sur la gestion des images
- **[README.md](./README.md)** : Documentation générale du projet

---

**Tout devrait maintenant fonctionner correctement ! 🎨✨**

Si vous rencontrez encore des problèmes, n'hésitez pas à consulter la console du navigateur (F12) pour voir les erreurs détaillées.


