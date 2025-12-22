# 📸 Guide d'utilisation des Images

## Vue d'ensemble

Les images du site sont maintenant entièrement **gérables depuis l'administration**. Vous pouvez uploader, activer/désactiver et gérer toutes les images du site sans modifier le code.

---

## Images à configurer sur le site

Voici les **clés d'images** que vous devez uploader pour que les images apparaissent sur le site :

### 🏠 Page d'accueil (`/`)

| Clé | Description | Emplacement |
|-----|-------------|-------------|
| `hero-home` | Image hero principale | En-tête de la page d'accueil |
| `preview-portraits` | Aperçu galerie Portraits | Section "Portfolio" |
| `preview-nb` | Aperçu galerie Noir & Blanc | Section "Portfolio" |
| `preview-lifestyle` | Aperçu galerie Lifestyle | Section "Portfolio" |
| `about-melody` | Photo de Melody | Section "À propos" |

### 👤 Page À propos (`/about`)

| Clé | Description | Emplacement |
|-----|-------------|-------------|
| `about-melody` | Photo portrait de Melody | Principale |

---

## Comment uploader une image

1. **Connectez-vous à l'administration** : `/admin`
2. **Allez dans l'onglet "Images"**
3. **Cliquez sur "Uploader une image"**
4. **Remplissez le formulaire :**
   - **Clé** : Utilisez exactement une des clés listées ci-dessus (ex: `hero-home`)
   - **Catégorie** : Par exemple `home`, `about`, `portfolio`
   - **Ordre** : Pour ordonner les images (si plusieurs dans la même catégorie)
   - **Texte alternatif** : Description de l'image (important pour le SEO)
   - **Fichier** : Votre image (JPG, PNG, WebP)

5. **Cliquez sur "Uploader"**

L'image sera automatiquement :
- ✅ Optimisée (compression, redimensionnement)
- ✅ Stockée dans `/public/uploads/`
- ✅ Enregistrée dans la base de données
- ✅ Activée et visible sur le site

---

## Vérifier qu'une image est bien uploadée

### Depuis l'administration

1. Allez dans l'onglet **"Images"**
2. Vous devriez voir votre image dans la liste avec :
   - Sa miniature
   - Sa clé (ex: `hero-home`)
   - Son statut (badge vert si activée)
   - Les actions (désactiver, supprimer)

### Sur le site

1. Ouvrez la page correspondante (ex: `/` pour `hero-home`)
2. L'image devrait s'afficher à la place du placeholder gris

**Si l'image ne s'affiche pas :**
- Vérifiez que la clé est exactement celle attendue (sensible à la casse)
- Vérifiez que l'image est bien activée (badge vert dans l'admin)
- Actualisez la page (Cmd+R / Ctrl+R)
- Vérifiez la console du navigateur pour d'éventuelles erreurs

---

## Gérer les images

### Désactiver une image

1. Dans l'admin, onglet "Images"
2. Cliquez sur le bouton **"Désactiver"** à côté de l'image
3. L'image ne sera plus visible sur le site (le placeholder apparaîtra)

### Supprimer une image

1. Dans l'admin, onglet "Images"
2. Cliquez sur le bouton **"Supprimer"**
3. L'image sera supprimée de la base de données et du dossier `/public/uploads/`

### Remplacer une image

1. **Supprimez** l'ancienne image
2. **Uploadez** la nouvelle avec la même clé

---

## Recommandations

### Formats d'image

- **JPG** : Pour les photos (meilleure compression)
- **PNG** : Pour les images avec transparence
- **WebP** : Format moderne (meilleure qualité/taille)

### Dimensions recommandées

| Type | Dimensions | Poids max |
|------|------------|-----------|
| Hero home | 1920x1080px | 500 KB |
| Aperçus portfolio | 800x800px | 200 KB |
| Photo Melody | 800x1000px | 300 KB |

> Les images sont automatiquement optimisées, mais partir avec des images de bonne qualité améliore le rendu final.

### Texte alternatif (Alt Text)

**Très important pour le SEO !**

Exemples de bons textes alternatifs :
- ✅ `Séance photo portrait lifestyle à Tarbes`
- ✅ `Portrait noir et blanc artistique par Melody Floc'h`
- ✅ `Melody Floc'h, photographe portrait lifestyle`

❌ Évitez :
- `image1.jpg`
- `photo`
- Laisser vide

---

## Dépannage

### "Erreur lors de l'upload"

- Vérifiez la taille du fichier (max 10 MB)
- Vérifiez le format (JPG, PNG, WebP, GIF)
- Vérifiez que le dossier `/public/uploads/` existe et est accessible en écriture

### L'image apparaît dans l'admin mais pas sur le site

1. Vérifiez que la **clé** est exactement celle attendue (voir tableau ci-dessus)
2. Vérifiez que l'image est bien **activée** (badge vert)
3. Actualisez la page du site (Cmd+R / Ctrl+R)
4. Videz le cache du navigateur

### L'image est déformée

Les images sont redimensionnées automatiquement avec `object-fit: cover`. Assurez-vous d'uploader des images avec les bonnes proportions (voir tableau ci-dessus).

---

## Ajouter de nouvelles zones d'images

Si vous souhaitez rendre d'autres parties du site configurables (ex: portfolio, pricing, contact), il faudra :

1. Ajouter un composant `DynamicImage` dans la page concernée
2. Définir une nouvelle clé (ex: `pricing-bg`)
3. Uploader l'image avec cette clé depuis l'admin

**Exemple :**

```tsx
<DynamicImage
  imageKey="pricing-bg"
  alt="Tarifs séances photo"
  fill
  placeholderText="Image tarifs"
/>
```

---

## Besoin d'aide ?

Si une image ne s'affiche pas :
1. Vérifiez la clé dans le tableau ci-dessus
2. Vérifiez qu'elle est activée dans l'admin
3. Ouvrez la console du navigateur (F12) pour voir les erreurs
4. Contactez le développeur si le problème persiste

---

**Bon upload ! 📸✨**


