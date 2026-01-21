# 🎉 Nouvelles Fonctionnalités Admin

## 📸 Gestion des Images

### Vue d'ensemble
L'admin peut maintenant uploader et gérer toutes les images affichées sur le site internet sans toucher au code.

### Fonctionnalités

#### Upload d'images
- **Emplacements disponibles :**
  - Hero Page d'accueil
  - Photo À propos  
  - Aperçu Portraits
  - Aperçu Noir & Blanc
  - Aperçu Lifestyle

#### Optimisation automatique
- Redimensionnement automatique (max 2000px)
- Compression JPEG à 85% de qualité
- Format optimisé pour le web

#### Gestion
- Activer/Désactiver une image sans la supprimer
- Texte alternatif pour le SEO
- Description optionnelle
- Aperçu visuel

### Utilisation

1. Aller sur `/admin` → Onglet "🖼️ Images"
2. Sélectionner l'emplacement de l'image
3. Choisir un fichier (JPG, PNG, WebP - max 5MB)
4. Renseigner le texte alternatif (important pour le SEO)
5. Cliquer sur "Uploader l'image"

L'image sera automatiquement optimisée et affichée sur le site !

### API

Les images peuvent être récupérées via API :
- `/api/images` - Toutes les images actives
- `/api/images?category=hero` - Images d'une catégorie
- `/api/images/[key]` - Une image spécifique

---

## ✉️ Système d'Envoi d'Emails

### Vue d'ensemble
Envoyez des emails directement depuis l'interface admin à vos clients.

### Fonctionnalités

#### Composition d'email
- Sélection rapide depuis les réservations
- Destinataire personnalisé
- Sujet et message personnalisés
- Templates pré-remplis

#### Templates disponibles
1. **Rappel séance** - Rappeler une séance prochaine
2. **Photos prêtes** - Notifier que les photos sont disponibles
3. **Demande d'avis** - Demander un retour client

#### Historique
- Tous les emails envoyés sont enregistrés
- Statut : Envoyé ✓ / Échoué ✗
- Date et heure d'envoi
- Contenu complet accessible

### Utilisation

1. Aller sur `/admin` → Onglet "✉️ Emails"
2. Option A : Sélectionner un client depuis les réservations
3. Option B : Saisir manuellement un email
4. Remplir le sujet et le message
5. Utiliser un template ou personnaliser
6. Envoyer

### Liaison avec réservations
Les emails peuvent être liés à une réservation spécifique pour un meilleur suivi.

---

## 📊 Statuts des Réservations

### Vue d'ensemble
Workflow complet de gestion des réservations avec 6 statuts.

### Les 6 Statuts

| Statut | Description | Couleur |
|--------|-------------|---------|
| 🟡 **En attente** | Réservation initiale | Jaune |
| 🔵 **Confirmée** | Réservation confirmée par email | Bleu |
| 🟣 **Contacté** | Client contacté pour préparation | Violet |
| 🟢 **Payée** | Paiement reçu | Vert |
| ⚫ **Terminée** | Séance effectuée | Gris |
| 🔴 **Annulée** | Réservation annulée | Rouge |

### Workflow recommandé

```
[En attente] → Nouvelle réservation arrive
    ↓
[Confirmée] → Email de confirmation envoyé automatiquement
    ↓
[Contacté] → Vous contactez le client pour préparer la séance
    ↓
[Payée] → Paiement reçu (avant ou après la séance)
    ↓
[Terminée] → Séance réalisée et photos livrées
```

### Notes internes

À chaque changement de statut, vous pouvez ajouter des notes internes :
- Préférences du client
- Informations complémentaires
- Rappels pour la séance
- Notes de paiement

Ces notes sont **privées** et ne sont visibles que dans l'admin.

### Utilisation

1. Aller sur `/admin` → Onglet "📅 Réservations"
2. Trouver la réservation
3. Cliquer sur le menu déroulant du statut
4. Sélectionner le nouveau statut
5. Ajouter une note interne (optionnel)
6. Valider

Le statut est mis à jour instantanément !

---

## 🗄️ Base de Données

### Nouvelles tables

#### **SiteImage**
```prisma
- id: ID unique
- key: Clé d'emplacement (hero-home, about-melody, etc.)
- filename: Nom du fichier
- url: URL de l'image (/uploads/...)
- altText: Texte alternatif SEO
- category: Catégorie (hero, portfolio, about)
- description: Description optionnelle
- isActive: Active ou non
- order: Ordre d'affichage
```

#### **EmailLog**
```prisma
- id: ID unique
- recipient: Email destinataire
- subject: Sujet
- content: Contenu de l'email
- sentAt: Date d'envoi
- sentBy: Qui a envoyé (admin)
- bookingId: Lien vers réservation (optionnel)
- status: sent / failed
```

#### **Booking** (mis à jour)
```prisma
+ status: PENDING / CONFIRMED / CONTACTED / PAID / COMPLETED / CANCELLED
+ internalNotes: Notes privées admin
```

---

## 🔐 Sécurité

### Upload d'images
- ✅ Validation du type de fichier (JPEG, PNG, WebP uniquement)
- ✅ Limitation de taille (5 MB maximum)
- ✅ Noms de fichiers uniques (UUID)
- ✅ Optimisation automatique (prévention des très grandes images)

### Envoi d'emails
- ✅ Validation de l'email destinataire
- ✅ Tous les champs obligatoires validés
- ✅ Historique complet des envois
- ✅ Gestion des erreurs

### Statuts
- ✅ Changement uniquement via l'admin
- ✅ Historique préservé (updatedAt)
- ✅ Notes internes sécurisées

---

## 📁 Structure des fichiers

```
app/
├── actions/
│   └── admin.ts (+ fonctions images, emails, statuts)
├── api/
│   └── images/
│       ├── route.ts (liste des images)
│       └── [key]/route.ts (image par clé)
└── admin/
    └── page.tsx (+ images et emails)

components/
└── admin/
    ├── AdminDashboard.tsx (+ onglets Images/Emails)
    ├── AdminImages.tsx (nouveau)
    └── AdminEmails.tsx (nouveau)

lib/
└── upload.ts (nouveau - gestion upload)

prisma/
└── schema.prisma (+ SiteImage, EmailLog, statuts)

public/
└── uploads/ (nouveau - stockage images)
```

---

## 🚀 Migration depuis l'ancienne version

Les données existantes sont préservées :
- ✅ Toutes les réservations conservent leur statut
- ✅ Les anciennes réservations "CONFIRMED" restent confirmées
- ✅ Aucune perte de données

Les nouveaux statuts disponibles :
- PENDING, CONFIRMED, CONTACTED, PAID, COMPLETED, CANCELLED

---

## 💡 Conseils d'utilisation

### Images
- Utilisez des images de haute qualité (elles seront optimisées)
- Renseignez toujours le texte alternatif pour le SEO
- Préférez le format JPEG pour les photos
- Activez/désactivez plutôt que supprimer (vous pouvez réutiliser)

### Emails
- Personnalisez chaque message
- Utilisez les templates comme base
- Vérifiez l'historique avant de renvoyer
- Liez les emails aux réservations pour un meilleur suivi

### Statuts
- Suivez le workflow recommandé
- Ajoutez des notes internes utiles
- Passez en "Terminée" après livraison des photos
- Les réservations passées peuvent rester en "Confirmée" si non traitées

---

## 📊 Statistiques

Le dashboard affiche maintenant :
- 📅 Réservations à venir
- ✅ Réservations terminées
- ❌ Réservations annulées
- 🖼️ Nombre d'images
- ✉️ Emails envoyés

---

## 🆘 Dépannage

### L'upload d'image échoue
- Vérifiez la taille (< 5 MB)
- Vérifiez le format (JPG, PNG, WebP)
- Vérifiez les permissions du dossier `public/uploads/`

### L'email n'est pas envoyé
- Vérifiez la configuration Resend (`RESEND_API_KEY`)
- Vérifiez l'email dans l'historique (statut "failed")
- Consultez les logs du serveur

### Le statut ne change pas
- Rechargez la page
- Vérifiez votre connexion admin
- Consultez les logs du serveur

---

✅ **Toutes les nouvelles fonctionnalités sont opérationnelles !**



