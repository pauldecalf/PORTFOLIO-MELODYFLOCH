#!/bin/bash

echo "🚨 DÉPLOIEMENT DU FIX URGENT"
echo "============================"
echo ""
echo "Problème : SQLite → PostgreSQL"
echo "Solution : Migration du schéma Prisma"
echo ""

git add prisma/schema.prisma lib/images.ts
git add MIGRATION_POSTGRESQL.md FIX_URGENT.md
git add package.json

git commit -m "fix: migration PostgreSQL - résout séances et images manquantes

- Changement provider SQLite → PostgreSQL
- Correction requête Prisma findUnique → findFirst
- Seed automatique au démarrage
- Documentation complète

Fixes #1 - Séances et images ne s'affichent pas en prod"

echo ""
echo "🚀 Push vers GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ DÉPLOIEMENT RÉUSSI !"
    echo ""
    echo "📋 Prochaines étapes:"
    echo "1. Railway redéploie automatiquement (3-5 min)"
    echo "2. Vérifier: https://melody.pauldecalf.fr/booking"
    echo "3. Uploader les images via l'admin"
    echo ""
    echo "📚 Voir FIX_URGENT.md pour plus de détails"
else
    echo ""
    echo "❌ Erreur lors du push"
fi
