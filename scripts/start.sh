#!/bin/sh
set -e

echo "🔧 Applying Prisma migrations..."
npx prisma migrate deploy

echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🌱 Checking if database needs seeding..."
# Vérifier si la table SessionType existe et contient des données
SESSION_COUNT=$(npx prisma db execute --stdin <<EOF 2>/dev/null || echo "0"
SELECT COUNT(*) as count FROM SessionType;
EOF
)

if [ "$SESSION_COUNT" = "0" ] || [ -z "$SESSION_COUNT" ]; then
  echo "🌱 Seeding database..."
  npm run db:seed || echo "⚠️ Seed failed, continuing anyway..."
else
  echo "✅ Database already seeded"
fi

echo "🚀 Starting Next.js..."
exec npm start

