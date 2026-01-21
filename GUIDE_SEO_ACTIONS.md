# Guide d'actions SEO - Melody Floc'h Photography

## 🚀 Actions immédiates (À faire maintenant)

### 1. Google Search Console
```bash
1. Aller sur https://search.google.com/search-console
2. Ajouter la propriété avec votre domaine
3. Vérifier la propriété
4. Soumettre le sitemap : https://votre-domaine.com/sitemap.xml
```

### 2. Google My Business
```bash
1. Aller sur https://business.google.com
2. Créer une fiche entreprise
3. Renseigner :
   - Nom : Melody Floc'h Photography
   - Catégorie : Photographe / Studio de photographie
   - Adresse : Les Essarts-le-Roi, 78690
   - Téléphone : [À compléter]
   - Site web : [Votre URL]
   - Horaires : Mar-Ven 9h-18h, Sam 10h-16h
4. Ajouter des photos du studio
5. Demander la vérification (courrier postal)
```

### 3. Compléter les informations manquantes

**Dans le code (variables d'environnement)** :
```env
# .env
APP_URL=https://melody.pauldecalf.fr
ADMIN_EMAIL=contact@melodyphotography.fr
# Ajouter si nécessaire :
BUSINESS_PHONE=+33...
BUSINESS_ADDRESS_STREET=...
```

**Dans les données structurées** :
- Ajouter le numéro de téléphone dans `app/page.tsx` (ligne 263)
- Ajouter l'adresse complète si disponible

---

## 📱 Réseaux sociaux (Recommandé)

### Créer des profils professionnels
1. **Instagram** : @melodyflochphotography
   - Bio : "Photographe Portrait & Lifestyle 📸 Les Essarts-le-Roi, Yvelines 🇫🇷"
   - Lien : votre-site.com

2. **Facebook Page** : Melody Floc'h Photography
   - Catégorie : Photographe
   - Localisation : Les Essarts-le-Roi

3. **Pinterest** : Melody Floc'h Photography
   - Excellent pour les photographes !

### Ajouter les liens dans le code
```typescript
// Dans app/page.tsx, ligne 284
sameAs: [
  'https://www.instagram.com/melodyflochphotography',
  'https://www.facebook.com/melodyflochphotography',
  'https://www.pinterest.fr/melodyflochphotography',
],
```

---

## 📊 Suivi et analyse

### Google Analytics
```html
<!-- À ajouter dans app/layout.tsx -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Métriques à suivre
- Visites organiques (Search Console)
- Positions sur mots-clés locaux
- Taux de conversion réservations
- Villes d'origine des visiteurs

---

## 🎯 Optimisations futures

### Contenu de blog (1-2 articles/mois)
**Idées d'articles optimisés SEO** :

1. "5 lieux magiques pour une séance photo portrait à Rambouillet"
   - Mot-clé : photographe Rambouillet, séance photo Rambouillet
   
2. "Comment préparer sa séance photo portrait aux Essarts-le-Roi"
   - Mot-clé : séance photo Les Essarts-le-Roi

3. "Portrait en noir et blanc : pourquoi choisir cette option intemporelle"
   - Mot-clé : portrait noir et blanc, photographe noir et blanc

4. "Séance photo en famille dans les Yvelines : conseils d'une photographe"
   - Mot-clé : photographe famille Yvelines

### Backlinks locaux
**Demander des liens depuis** :
- Mairies des communes (annuaire des commerçants)
- Blogs locaux Yvelines
- Partenaires (coiffeurs, maquilleurs, wedding planners)
- Annuaires professionnels (PagesJaunes, Yelp France)

### Avis clients
**Stratégie** :
1. Après chaque séance, envoyer un email avec lien Google My Business
2. Afficher les avis sur la page d'accueil
3. Demander de mentionner la ville dans l'avis si possible

---

## 🔍 Tests et validation

### Vérifier les données structurées
```bash
1. Aller sur https://search.google.com/test/rich-results
2. Tester l'URL de chaque page
3. Vérifier qu'il n'y a pas d'erreurs
```

### Pages à tester en priorité
- [x] Page d'accueil (LocalBusiness)
- [x] Page À propos (Person)
- [x] Page Zone d'intervention (Service)
- [x] Page Tarifs (Offer)

### Vitesse du site
```bash
1. Aller sur https://pagespeed.web.dev
2. Tester votre site
3. Objectif : Score > 90 sur mobile et desktop
```

---

## 📝 Checklist mensuelle

### Mois 1
- [ ] Créer Google My Business
- [ ] Soumettre sitemap à Search Console
- [ ] Créer profils réseaux sociaux
- [ ] Écrire 1er article de blog
- [ ] Demander 5 premiers avis clients

### Mois 2
- [ ] Analyser premiers résultats Search Console
- [ ] Écrire 2ème article de blog
- [ ] Obtenir 3 backlinks locaux
- [ ] Poster régulièrement sur réseaux sociaux

### Mois 3
- [ ] Optimiser les pages avec faible performance
- [ ] Créer landing pages ville spécifiques si besoin
- [ ] Analyser conversions et ajuster
- [ ] Continuer création de contenu

---

## 🎨 Optimisation des images

### Alt text optimisé
**Format recommandé** :
```
"Portrait [type] par Melody Floc'h, photographe à [ville]"
```

**Exemples** :
- "Portrait femme noir et blanc par Melody Floc'h, photographe Les Essarts-le-Roi"
- "Séance photo lifestyle famille par Melody Floc'h, photographe Rambouillet"
- "Portrait artistique studio par Melody Floc'h, photographe Yvelines"

### Noms de fichiers
**Format** : `service-ville-numero.jpg`
```
portrait-essarts-le-roi-01.jpg
lifestyle-rambouillet-famille-02.jpg
noir-blanc-studio-yvelines-03.jpg
```

---

## 💡 Conseils avancés

### 1. Créer des FAQ locales
Ajouter une section FAQ sur chaque page avec des questions comme :
- "Où se trouve le studio photo de Melody Floc'h ?" → Les Essarts-le-Roi
- "Melody Floc'h se déplace-t-elle à Rambouillet ?" → Oui
- "Quels sont les tarifs pour une séance photo aux Essarts-le-Roi ?"

### 2. Enrichir le contenu existant
- Ajouter des témoignages avec mention de la ville
- Créer une galerie "Réalisations par ville"
- Ajouter une carte interactive sur la page Zone d'intervention

### 3. Maillage interne
- Lier "Zone d'intervention" depuis chaque page
- Créer des liens contextuels entre pages
- Ajouter des CTA géolocalisés

---

## 📞 Contact et support

Si vous avez des questions sur l'optimisation SEO :
1. Vérifier le fichier `SEO_OPTIMIZATION_2026.md` pour le détail complet
2. Utiliser Google Search Console pour suivre les performances
3. Tester régulièrement avec les outils Google (Rich Results, PageSpeed)

---

**Date de création** : 21 janvier 2026
**Prochaine révision recommandée** : 21 avril 2026 (3 mois)
