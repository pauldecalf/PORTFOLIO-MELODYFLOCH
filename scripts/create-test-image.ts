import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔧 Création d\'un enregistrement de test...\n')

  // Remplacez par le nom de votre fichier
  const filename = 'hero-485f69ed-f597-401b-9304-97ee571896fc.jpeg'
  
  const image = await prisma.siteImage.create({
    data: {
      key: 'hero-home',
      filename: filename,
      url: `/api/uploads/${filename}`,
      altText: 'Melody Floc\'h - Photographe Portrait & Lifestyle',
      category: 'hero',
      description: 'Image principale de la page d\'accueil',
      isActive: true,
      order: 1,
    },
  })

  console.log('✅ Image créée en base de données:')
  console.log(`   🔑 Key: ${image.key}`)
  console.log(`   📁 Filename: ${image.filename}`)
  console.log(`   🔗 URL: ${image.url}`)
  console.log('\n💡 Rechargez votre page pour voir l\'image !')
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
