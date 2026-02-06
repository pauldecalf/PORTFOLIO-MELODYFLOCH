import fs from 'fs/promises'
import path from 'path'

const UPLOAD_DIR = process.env.UPLOAD_DIR 
  ? process.env.UPLOAD_DIR 
  : path.join(process.cwd(), 'public', 'uploads')

async function checkUploads() {
  console.log('🔍 VERIFICATION DES IMAGES UPLOADEES\n')
  console.log('📁 Dossier:', UPLOAD_DIR)
  console.log('🌍 Environnement:', process.env.NODE_ENV || 'development')
  console.log('')

  // Vérifier si le dossier existe
  try {
    await fs.access(UPLOAD_DIR)
    console.log('✅ Le dossier existe\n')
  } catch {
    console.log('❌ Le dossier n\'existe pas\n')
    console.log('Création du dossier...')
    await fs.mkdir(UPLOAD_DIR, { recursive: true })
    console.log('✅ Dossier créé\n')
  }

  // Lister les fichiers
  console.log('📷 FICHIERS PRESENTS:\n')
  const files = await fs.readdir(UPLOAD_DIR)
  
  if (files.length === 0) {
    console.log('⚠️  Aucun fichier trouvé')
  } else {
    const imageFiles = files.filter(f => 
      f.match(/\.(jpg|jpeg|png|webp|gif)$/i) && f !== '.gitkeep'
    )
    
    console.log(`Total: ${files.length} fichier(s)`)
    console.log(`Images: ${imageFiles.length}`)
    console.log('')
    
    if (imageFiles.length > 0) {
      console.log('Liste des images:')
      for (const file of imageFiles) {
        const filepath = path.join(UPLOAD_DIR, file)
        const stats = await fs.stat(filepath)
        const sizeMB = (stats.size / 1024 / 1024).toFixed(2)
        const date = stats.mtime.toLocaleString('fr-FR')
        console.log(`  ✓ ${file}`)
        console.log(`    Taille: ${sizeMB} MB`)
        console.log(`    Modifié: ${date}`)
        console.log(`    URL: /api/uploads/${file}`)
        console.log('')
      }
    }
  }

  console.log('\n✨ Vérification terminée')
}

checkUploads().catch(console.error)
