#!/bin/bash

echo "🔍 Vérification de la configuration avant déploiement"
echo "===================================================="
echo ""

# Vérifier que les fichiers importants existent
echo "📁 Vérification des fichiers..."

FILES=(
  "prisma/schema.prisma"
  "scripts/safe-start.js"
  "scripts/seed-if-empty.ts"
  ".env.production.example"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file manquant"
  fi
done

echo ""
echo "📦 Vérification du schema Prisma..."
if grep -q "provider = \"mongodb\"" prisma/schema.prisma; then
  echo "  ✅ Provider MongoDB configuré"
else
  echo "  ❌ Provider MongoDB non configuré"
fi

echo ""
echo "🌍 Variables d'environnement à configurer sur Railway:"
echo ""
echo "DATABASE_URL (MONGODB)"
echo "APP_URL"
echo "ADMIN_EMAIL"
echo "RESEND_API_KEY"
echo "UPLOAD_DIR"
echo "ADMIN_PASSWORD_HASH"
echo ""

echo "📚 Consultez DEPLOIEMENT_RAILWAY_FIX.md pour le guide complet"
echo ""

# Proposer de commiter
echo "💾 Voulez-vous commiter et pousser les changements ? (o/n)"
read -r response

if [[ "$response" =~ ^([oO][uU][iI]|[oO])$ ]]; then
  echo ""
  echo "📤 Commit et push des modifications..."
  git add .
  git commit -m "fix: configuration production MongoDB Atlas

✅ Ajout guide de déploiement Railway
✅ Fichier .env.production.example
✅ Documentation complète

Résout les erreurs 404 sur les images en production"
  
  git push origin main
  
  if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Push réussi !"
    echo ""
    echo "🚀 Prochaines étapes:"
    echo "1. Allez sur Railway.app"
    echo "2. Configurez les variables d'environnement"
    echo "3. Attendez le redéploiement"
    echo "4. Testez le site"
    echo ""
    echo "📖 Voir DEPLOIEMENT_RAILWAY_FIX.md"
  else
    echo ""
    echo "❌ Erreur lors du push"
  fi
else
  echo ""
  echo "⏸️  Commit annulé"
  echo ""
  echo "💡 Pour commiter manuellement:"
  echo "   git add ."
  echo "   git commit -m \"fix: configuration production\""
  echo "   git push origin main"
fi
