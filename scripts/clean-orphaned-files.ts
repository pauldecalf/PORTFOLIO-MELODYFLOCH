import { PrismaClient } from '@prisma/client'
import fs from 'fs/promises'
import path from 'path'

const prisma = new PrismaClient()

const UPLOAD_DIR = process.env.UPLOAD_DIR 
  ? process.env.UPLOAD_DIR 
  : path.join(process.cwd(), 'public', 'uploads')

async function main() {
  console.log('🔍 Recherche des fichiers orphelins...\n')

  // 1. Récupérer tous les fichiers du dossier uploads
  let files: string[] = []
  try {
    files = await fs.readdir(UPLOAD_DIR)
    // Ignorer .gitkeep
    files = files.filter(f => f !== '.gitkeep')
  } catch (error) {
    console.error('❌ Erreur lecture dossier uploads:', error)
    return
  }

  console.log(`📁 ${files.length} fichiers trouvés dans le dossier uploads\n`)

  // 2. Récupérer tous les noms de fichiers en DB
  const siteImages = await prisma.siteImage.findMany()
  const galleryImages = await prisma.galleryImage.findMany()

  const dbFilenames = new Set([
    ...siteImages.map(img => img.filename),
    ...galleryImages.map(img => img.filename),
  ])

  console.log(`📊 ${dbFilenames.size} fichiers référencés en base de données\n`)

  // 3. Trouver les fichiers orphelins (dans uploads mais pas en DB)
  const orphanedFiles = files.filter(file => !dbFilenames.has(file))

  if (orphanedFiles.length === 0) {
    console.log('✅ Aucun fichier orphelin détecté')
    return
  }

  console.log(`⚠️  ${orphanedFiles.length} fichiers orphelins détectés:\n`)
  orphanedFiles.forEach(file => {
    console.log(`   - ${file}`)
  })

  console.log('\n🧹 Suppression des fichiers orphelins...\n')

  let deleted = 0
  let errors = 0

  for (const file of orphanedFiles) {
    const filepath = path.join(UPLOAD_DIR, file)
    try {
      await fs.unlink(filepath)
      console.log(`  ✅ Supprimé: ${file}`)
      deleted++
    } catch (error) {
      console.error(`  ❌ Erreur suppression ${file}:`, error)
      errors++
    }
  }

  console.log(`\n📊 Résumé:`)
  console.log(`   - Fichiers supprimés: ${deleted}`)
  console.log(`   - Erreurs: ${errors}`)
  console.log(`\n✅ Nettoyage terminé!`)
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
