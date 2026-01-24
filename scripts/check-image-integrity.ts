import { PrismaClient } from '@prisma/client'
import fs from 'fs/promises'
import path from 'path'

const prisma = new PrismaClient()

const UPLOAD_DIR = process.env.UPLOAD_DIR 
  ? process.env.UPLOAD_DIR 
  : path.join(process.cwd(), 'public', 'uploads')

async function main() {
  console.log('🔍 Vérification de la cohérence images...\n')

  // 1. Vérifier les images du site
  console.log('📸 Images du site (SiteImage):')
  const siteImages = await prisma.siteImage.findMany()
  
  const orphanedSiteImages = []
  
  for (const image of siteImages) {
    const filepath = path.join(UPLOAD_DIR, image.filename)
    try {
      await fs.access(filepath)
      console.log(`  ✅ ${image.key}: fichier existe`)
    } catch {
      console.log(`  ❌ ${image.key}: FICHIER MANQUANT (${image.filename})`)
      orphanedSiteImages.push(image)
    }
  }

  // 2. Vérifier les images de galerie
  console.log('\n📸 Images de galerie (GalleryImage):')
  const galleryImages = await prisma.galleryImage.findMany()
  
  const orphanedGalleryImages = []
  
  for (const image of galleryImages) {
    const filepath = path.join(UPLOAD_DIR, image.filename)
    try {
      await fs.access(filepath)
      console.log(`  ✅ ${image.gallery}: fichier existe`)
    } catch {
      console.log(`  ❌ ${image.gallery}: FICHIER MANQUANT (${image.filename})`)
      orphanedGalleryImages.push(image)
    }
  }

  // 3. Résumé
  console.log('\n📊 Résumé:')
  console.log(`   - Images du site: ${siteImages.length} enregistrements`)
  console.log(`   - Images de galerie: ${galleryImages.length} enregistrements`)
  console.log(`   - Images orphelines (DB sans fichier): ${orphanedSiteImages.length + orphanedGalleryImages.length}`)

  // 4. Proposer le nettoyage
  if (orphanedSiteImages.length > 0 || orphanedGalleryImages.length > 0) {
    console.log('\n🧹 Nettoyage des enregistrements orphelins...')
    
    // Supprimer les enregistrements sans fichiers
    for (const image of orphanedSiteImages) {
      await prisma.siteImage.delete({
        where: { id: image.id },
      })
      console.log(`  ✅ Supprimé: ${image.key} (${image.altText})`)
    }
    
    for (const image of orphanedGalleryImages) {
      await prisma.galleryImage.delete({
        where: { id: image.id },
      })
      console.log(`  ✅ Supprimé: ${image.gallery} - ${image.altText}`)
    }
    
    console.log(`\n✅ ${orphanedSiteImages.length + orphanedGalleryImages.length} enregistrements orphelins supprimés`)
  } else {
    console.log('\n✅ Aucun problème de cohérence détecté')
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
