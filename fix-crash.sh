#!/bin/bash

echo "🚨 FIX CRASH SERVEUR - Solution d'urgence"
echo "========================================="
echo ""

# Étape 1 : Désactiver le seed
echo "📝 Étape 1/4 : Désactivation seed automatique..."
cat > package.json.tmp << 'EOF'
{
  "name": "melody-photography",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "prisma migrate deploy && next start",
    "postinstall": "prisma generate",
    "lint": "next lint",
    "db:migrate": "prisma migrate deploy",
    "db:seed": "tsx prisma/seed.ts",
    "db:seed-if-empty": "tsx scripts/seed-if-empty.ts"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@prisma/client": "^5.9.0",
    "resend": "^3.2.0",
    "zod": "^3.22.4",
    "date-fns": "^3.3.0",
    "date-fns-tz": "^3.0.0",
    "sharp": "^0.33.2"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "typescript": "^5.3.3",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.33",
    "autoprefixer": "^10.4.17",
    "prisma": "^5.9.0",
    "tsx": "^4.7.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.2.0"
  }
}
EOF
mv package.json.tmp package.json
echo "✅ Seed désactivé"

# Étape 2 : Commit et push
echo ""
echo "📤 Étape 2/4 : Déploiement du fix..."
git add package.json scripts/seed-if-empty.ts
git commit -m "fix(urgent): désactive seed pour stabiliser serveur"
git push origin main

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du push"
    exit 1
fi

echo "✅ Fix déployé"
echo ""
echo "⏳ Attendre 3 minutes que Railway redéploie..."
echo ""
read -p "Appuyer sur Entrée quand le serveur a redémarré..."

# Étape 3 : Instructions pour migrations manuelles
echo ""
echo "🔧 Étape 3/4 : Appliquer les migrations manuellement"
echo ""
echo "Exécuter les commandes suivantes:"
echo ""
echo "  railway link"
echo "  railway run npx prisma migrate deploy"
echo "  railway run npm run db:seed"
echo ""
read -p "Appuyer sur Entrée après avoir exécuté ces commandes..."

# Étape 4 : Réactiver le seed
echo ""
echo "✅ Étape 4/4 : Réactivation du seed automatique..."
cat > package.json.tmp << 'EOF'
{
  "name": "melody-photography",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "prisma migrate deploy && npm run db:seed-if-empty && next start",
    "postinstall": "prisma generate",
    "lint": "next lint",
    "db:migrate": "prisma migrate deploy",
    "db:seed": "tsx prisma/seed.ts",
    "db:seed-if-empty": "tsx scripts/seed-if-empty.ts"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@prisma/client": "^5.9.0",
    "resend": "^3.2.0",
    "zod": "^3.22.4",
    "date-fns": "^3.3.0",
    "date-fns-tz": "^3.0.0",
    "sharp": "^0.33.2"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "typescript": "^5.3.3",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.33",
    "autoprefixer": "^10.4.17",
    "prisma": "^5.9.0",
    "tsx": "^4.7.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.2.0"
  }
}
EOF
mv package.json.tmp package.json

git add package.json
git commit -m "fix: réactive seed après migration manuelle réussie"
git push origin main

echo ""
echo "✅ CORRECTION TERMINÉE !"
echo ""
echo "📋 Vérification finale:"
echo "1. Attendre 2-3 minutes"
echo "2. Tester: https://melody.pauldecalf.fr/booking"
echo "3. Vérifier que les 3 séances s'affichent"
echo ""
