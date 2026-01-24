import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🧹 Nettoyage des images de test...\n')

  // Supprimer toutes les images de test avec des altText invalides
  const deleted = await prisma.siteImage.deleteMany({
    where: {
      OR: [
        { altText: { contains: 'test' } },
        { altText: { contains: 'esfhgsdgh' } },
        { altText: { contains: 'azerty' } },
        { key: { contains: 'test' } },
      ],
    },
  })

  console.log(`✅ ${deleted.count} images de test supprimées\n`)

  // Supprimer toutes les images de galerie de test
  const deletedGallery = await prisma.galleryImage.deleteMany({
    where: {
      OR: [
        { altText: { contains: 'test' } },
        { altText: { contains: 'esfhgsdgh' } },
        { altText: { contains: 'azerty' } },
      ],
    },
  })

  console.log(`✅ ${deletedGallery.count} images de galerie de test supprimées\n`)

  // Afficher les images restantes
  const remainingSiteImages = await prisma.siteImage.count()
  const remainingGalleryImages = await prisma.galleryImage.count()

  console.log('📊 Images restantes:')
  console.log(`   - Images du site: ${remainingSiteImages}`)
  console.log(`   - Images de galerie: ${remainingGalleryImages}`)
  console.log('')

  if (remainingSiteImages === 0 && remainingGalleryImages === 0) {
    console.log('💡 La base de données est maintenant propre.')
    console.log('   Connectez-vous à /admin pour uploader de vraies images.')
  }
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
