import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🖼️  Initialisation des clés d\'images...')

  const imageKeys = [
    {
      key: 'hero-home',
      category: 'home',
      order: 1,
      altText: 'Melody Floc\'h - Photographe Portrait & Lifestyle',
      description: 'Image principale de la page d\'accueil',
    },
    {
      key: 'preview-portraits',
      category: 'home',
      order: 2,
      altText: 'Aperçu galerie Portraits',
      description: 'Aperçu de la galerie Portraits sur la page d\'accueil',
    },
    {
      key: 'preview-nb',
      category: 'home',
      order: 3,
      altText: 'Aperçu galerie Noir & Blanc',
      description: 'Aperçu de la galerie Noir & Blanc sur la page d\'accueil',
    },
    {
      key: 'preview-lifestyle',
      category: 'home',
      order: 4,
      altText: 'Aperçu galerie Lifestyle',
      description: 'Aperçu de la galerie Lifestyle sur la page d\'accueil',
    },
    {
      key: 'about-melody',
      category: 'about',
      order: 1,
      altText: 'Melody Floc\'h - Photographe',
      description: 'Photo de Melody sur la page À propos',
    },
  ]

  for (const imageData of imageKeys) {
    const existing = await prisma.siteImage.findUnique({
      where: { key: imageData.key },
    })

    if (!existing) {
      console.log(`  → Création de la clé: ${imageData.key}`)
      // On ne crée pas l'image si elle n'existe pas, on laisse juste un placeholder
      // L'utilisateur devra uploader ses images via l'admin
    } else {
      console.log(`  ✓ Clé existante: ${imageData.key}`)
    }
  }

  console.log('\n✅ Initialisation terminée!')
  console.log('\nℹ️  Pour uploader des images, rendez-vous sur /admin > Images')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })



