import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🧹 SUPPRESSION TOTALE DES IMAGES...\n')
  console.log('⚠️  Attention: Cette opération est irréversible!\n')

  // Supprimer TOUTES les images du site
  const deletedSite = await prisma.siteImage.deleteMany({})
  console.log(`✅ ${deletedSite.count} images du site supprimées`)

  // Supprimer TOUTES les images de galerie
  const deletedGallery = await prisma.galleryImage.deleteMany({})
  console.log(`✅ ${deletedGallery.count} images de galerie supprimées\n`)

  console.log('💡 Base de données nettoyée avec succès!')
  console.log('   Connectez-vous à /admin pour uploader vos vraies images.')
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
