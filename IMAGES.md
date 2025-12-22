# 📸 Guide des images à ajouter

Ce document liste toutes les images à remplacer dans le site pour le rendre complet.

## 🎯 Images prioritaires

### Page d'accueil (/)
- **Hero principale** : Grande image portrait verticale (1200x1600px minimum)
  - Format : JPG/WebP optimisé
  - Position : Section hero à droite
  - Sujet : Portrait représentatif du style Melody

- **Aperçu portfolio** (3 images) :
  - Image 1 : Portrait classique
  - Image 2 : Portrait noir & blanc
  - Image 3 : Photo lifestyle/spontanée
  - Format : Carré 800x800px minimum

- **Section À propos** :
  - Photo portrait de Melody (800x1000px)

### Portfolio (/portfolio)

#### Galerie Portraits
- Minimum **24 photos** de portraits variés
- Format : Carré 1200x1200px ou 4:5
- Diversité : différents sujets, expressions, éclairages

#### Galerie Noir & Blanc
- Minimum **18 photos** noir & blanc
- Format : Carré 1200x1200px
- Style : Contraste fort, intemporel

#### Galerie Lifestyle (À travers mon objectif)
- Minimum **30 photos** lifestyle/spontanées
- Format : Varié (carré, paysage)
- Style : Naturel, moments de vie

### Page À propos (/about)
- **Portrait de Melody** : Photo professionnelle avec appareil photo ou en shooting
  - Format : Portrait 800x1000px

### Autres pages
- **OpenGraph image** (`/public/og-image.jpg`) :
  - 1200x630px
  - Représente le site pour partage social

## 📁 Structure des dossiers recommandée

```
public/
├── og-image.jpg              # Image OpenGraph
├── hero-home.jpg             # Hero page d'accueil
├── about-melody.jpg          # Photo à propos
├── portfolio/
│   ├── portraits/
│   │   ├── portrait-01.jpg
│   │   ├── portrait-02.jpg
│   │   └── ... (24 images)
│   ├── noir-blanc/
│   │   ├── nb-01.jpg
│   │   ├── nb-02.jpg
│   │   └── ... (18 images)
│   └── lifestyle/
│       ├── lifestyle-01.jpg
│       ├── lifestyle-02.jpg
│       └── ... (30 images)
└── preview/                  # Miniatures homepage
    ├── preview-portraits.jpg
    ├── preview-nb.jpg
    └── preview-lifestyle.jpg
```

## 🔧 Où remplacer les images dans le code

### 1. Page d'accueil (`app/page.tsx`)

**Hero principale :**
```tsx
// Ligne ~57
<div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-200...">
```
Remplacer par :
```tsx
<Image
  src="/hero-home.jpg"
  alt="Melody Photography - Portrait"
  fill
  className="object-cover"
  priority
/>
```

**Aperçu portfolio :**
```tsx
// Ligne ~96-110
{[1, 2, 3].map((i) => (
  // ... remplacer les divs par des images réelles
))}
```

### 2. Page À propos (`app/about/page.tsx`)

```tsx
// Ligne ~34
<div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-200...">
```
Remplacer par une vraie image de Melody

### 3. Portfolio (`app/portfolio/[slug]/page.tsx`)

```tsx
// Ligne ~76
{[...Array(gallery.count)].map((_, i) => (
  // Remplacer par vraies images du portfolio
))}
```

## 📐 Optimisation des images

### Recommandations
1. **Format** : Utiliser WebP quand possible (meilleur compression)
2. **Taille** : Ne pas dépasser 500Ko par image
3. **Dimensions** : Pas plus de 2000px sur la dimension la plus grande
4. **Compression** : Utiliser TinyPNG ou similaire avant upload

### Outils recommandés
- **Compression** : [TinyPNG](https://tinypng.com)
- **Conversion WebP** : [Squoosh](https://squoosh.app)
- **Redimensionnement** : Photoshop, Lightroom, ou [Birme](https://www.birme.net)

## 🎨 Style photographique du site

Pour que les images s'intègrent bien au design :
- **Luminosité** : Photos bien exposées
- **Couleurs** : Tons chauds qui s'accordent avec la palette beige/marron du site
- **Noir & blanc** : Contrastes marqués
- **Cadrage** : Centré ou règle des tiers
- **Arrière-plan** : Sobre pour que le sujet ressorte

## 🚀 Import rapide avec Next.js Image

Next.js optimise automatiquement les images avec le composant `<Image>`.

Exemple d'utilisation :
```tsx
import Image from 'next/image'

<Image
  src="/portfolio/portraits/portrait-01.jpg"
  alt="Portrait photographique par Melody Photography"
  width={1200}
  height={1200}
  className="rounded-lg"
/>
```

## ✅ Checklist avant mise en production

- [ ] Toutes les images placeholder remplacées
- [ ] Images optimisées (< 500Ko)
- [ ] Alt text descriptifs sur toutes les images
- [ ] OpenGraph image créée (1200x630px)
- [ ] Test sur mobile et desktop
- [ ] Vérification des temps de chargement

---

💡 **Astuce** : Commencez par remplacer les images de la page d'accueil et du portfolio principal, ce sont les plus visibles !

