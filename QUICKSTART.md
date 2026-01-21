# 🚀 Guide de démarrage rapide

## Installation en 5 minutes

### 1. Installer les dépendances
```bash
npm install
```

### 2. Créer le fichier .env
Créez un fichier `.env` à la racine :

```env
DATABASE_URL="file:./dev.db"
RESEND_API_KEY="re_votre_cle_api_resend"
ADMIN_EMAIL="votre@email.com"
APP_URL="https://melody.pauldecalf.fr"
ADMIN_PASSWORD="admin123"
```

> **Note** : Pour obtenir une clé API Resend, inscrivez-vous sur [resend.com](https://resend.com) (gratuit)

### 3. Initialiser la base de données
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Lancer le serveur
```bash
npm run dev
```

Le site est maintenant accessible sur **http://localhost:3000** 🎉

## 📍 Pages disponibles

- **/** - Page d'accueil
- **/portfolio** - Portfolio avec galeries
- **/about** - À propos
- **/pricing** - Tarifs
- **/contact** - Formulaire de contact
- **/booking** - Système de réservation
- **/admin** - Interface admin (mot de passe : celui configuré dans .env)

## 🧪 Tester le système de réservation

1. Allez sur http://localhost:3000/booking
2. Choisissez un type de séance
3. Sélectionnez une date disponible
4. Choisissez un créneau horaire
5. Remplissez vos informations
6. Confirmez la réservation
7. Vérifiez votre email (ou les logs si Resend n'est pas configuré)

## 🔐 Accéder à l'admin

1. Allez sur http://localhost:3000/admin
2. Entrez le mot de passe configuré dans `.env`
3. Vous verrez le dashboard avec toutes les réservations

## 📊 Voir la base de données

```bash
npx prisma studio
```

Cela ouvrira une interface graphique sur http://localhost:5555

## 🐛 Problèmes courants

### La base de données ne se crée pas
```bash
# Supprimez le dossier prisma (si existant)
rm -rf prisma/*.db

# Recréez tout
npx prisma migrate dev --name init
npx prisma db seed
```

### Les emails ne sont pas envoyés
- Vérifiez que `RESEND_API_KEY` est bien configuré dans `.env`
- Vérifiez les logs du terminal pour voir les erreurs
- En développement, vous pouvez utiliser le mode sandbox de Resend

### Erreur de compilation TypeScript
```bash
# Nettoyez et réinstallez
rm -rf node_modules .next
npm install
npm run dev
```

## 📝 Prochaines étapes

1. **Remplacer les images placeholder** dans les composants
2. **Configurer Resend** correctement pour l'envoi d'emails
3. **Personnaliser les couleurs** dans `tailwind.config.ts`
4. **Ajouter vos vraies photos** dans le portfolio
5. **Modifier les disponibilités** dans `prisma/seed.ts` si nécessaire
6. **Tester toutes les fonctionnalités** avant de déployer

## 🚢 Déploiement

Pour déployer sur Vercel :

1. Poussez votre code sur GitHub
2. Connectez votre repo sur [vercel.com](https://vercel.com)
3. Ajoutez les variables d'environnement
4. Changez `DATABASE_URL` pour PostgreSQL
5. Déployez !

---

Besoin d'aide ? Consultez le [README.md](./README.md) complet.

