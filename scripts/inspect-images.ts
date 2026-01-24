import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔍 Inspection des images en base de données...\n')

  // Images du site
  const siteImages = await prisma.siteImage.findMany()
  
  console.log('📸 Images du site (SiteImage):')
  if (siteImages.length === 0) {
    console.log('   Aucune image')
  } else {
    siteImages.forEach(img => {
      console.log(`\n  🔑 Key: ${img.key}`)
      console.log(`  📁 Filename: ${img.filename}`)
      console.log(`  🔗 URL: ${img.url}`)
      console.log(`  ✏️  Alt: ${img.altText}`)
      console.log(`  ${img.isActive ? '✅' : '❌'} Active`)
    })
  }

  // Images de galerie
  const galleryImages = await prisma.galleryImage.findMany()
  
  console.log('\n\n📸 Images de galerie (GalleryImage):')
  if (galleryImages.length === 0) {
    console.log('   Aucune image')
  } else {
    galleryImages.forEach(img => {
      console.log(`\n  🎨 Gallery: ${img.gallery}`)
      console.log(`  📁 Filename: ${img.filename}`)
      console.log(`  🔗 URL: ${img.url}`)
      console.log(`  ✏️  Alt: ${img.altText}`)
      console.log(`  ${img.isActive ? '✅' : '❌'} Active`)
    })
  }

  console.log('\n\n📊 Résumé:')
  console.log(`   - Images du site: ${siteImages.length}`)
  console.log(`   - Images de galerie: ${galleryImages.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
