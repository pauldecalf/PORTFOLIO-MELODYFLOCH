#!/bin/bash

echo "🚀 Script de déploiement - melody.pauldecalf.fr"
echo "================================================"
echo ""

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé"
    echo "Assurez-vous d'être dans le répertoire du projet"
    exit 1
fi

# Build local pour vérifier qu'il n'y a pas d'erreurs
echo "📦 Build de l'application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    echo "Corrigez les erreurs avant de déployer"
    exit 1
fi
echo "✅ Build réussi"
echo ""

# Vérifier le statut Git
echo "📝 Vérification des modifications Git..."
git status --short
echo ""

# Demander confirmation
read -p "Voulez-vous commit et push ces modifications ? (o/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Oo]$ ]]; then
    echo "❌ Déploiement annulé"
    exit 0
fi

# Commit
echo "💾 Création du commit..."
git add .
git commit -m "feat: passage au masculin + config domaine melody.pauldecalf.fr

- Passage de tout le contenu au masculin
- Optimisation SEO locale (13 villes Yvelines)
- Configuration domaine https://melody.pauldecalf.fr
- Documentation complète de déploiement
"

if [ $? -ne 0 ]; then
    echo "⚠️ Aucune modification à commiter ou erreur Git"
fi

# Push
echo "🚀 Push vers GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Déploiement réussi !"
    echo ""
    echo "📋 Prochaines étapes:"
    echo "1. Railway détectera le push et redéploiera automatiquement (2-3 min)"
    echo "2. Configurez les variables d'environnement sur Railway:"
    echo "   APP_URL=https://melody.pauldecalf.fr"
    echo "   ADMIN_EMAIL=pauldecalf@outlook.fr"
    echo "   RESEND_API_KEY=re_NhNUJsVr_FKsryMmjXhHE8qqNHk7bErFE"
    echo ""
    echo "3. Vérifiez le site: https://melody.pauldecalf.fr"
    echo ""
    echo "📚 Voir ACTION_IMMEDIATE.md pour plus de détails"
else
    echo "❌ Erreur lors du push"
    echo "Vérifiez votre connexion et vos droits d'accès au repository"
    exit 1
fi
