import fs from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

/**
 * STOCKAGE 100% LOCAL SUR LE SYSTÈME DE FICHIERS
 * 
 * IMPORTANT POUR LA PRODUCTION:
 * Configurez la variable d'environnement UPLOAD_DIR pour pointer vers un volume persistant
 * 
 * Exemples selon votre hébergeur:
 * - Railway: UPLOAD_DIR="/app/data/uploads" (avec volume monté sur /app/data)
 * - VPS/Serveur dédié: UPLOAD_DIR="/var/www/uploads"
 * - Docker: UPLOAD_DIR="/uploads" (avec volume Docker)
 * 
 * Si UPLOAD_DIR n'est pas défini, utilise public/uploads (OK en dev, PERDU en prod cloud)
 */

const UPLOAD_DIR = process.env.UPLOAD_DIR 
  ? process.env.UPLOAD_DIR 
  : path.join(process.cwd(), 'public', 'uploads')

// Créer le dossier uploads si nécessaire
export async function ensureUploadDir() {
  try {
    await fs.access(UPLOAD_DIR)
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true })
  }
}

// Sauvegarder une image uploadée (sans compression pour préserver la qualité)
export async function saveUploadedImage(
  file: File,
  category: string = 'general'
): Promise<{ filename: string; url: string }> {
  await ensureUploadDir()

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Générer un nom de fichier unique
  const ext = path.extname(file.name)
  const filename = `${category}-${randomUUID()}${ext}`
  const filepath = path.join(UPLOAD_DIR, filename)

  // Sauvegarder l'image dans son format d'origine sans compression ni redimensionnement
  await fs.writeFile(filepath, buffer)

  console.log(`[UPLOAD] ✅ Image sauvegardée: ${filename}`)
  console.log(`[UPLOAD] Chemin: ${filepath}`)

  // Toujours utiliser l'API route pour servir les images
  // Cela permet de servir les images même depuis un volume externe
  const url = `/api/uploads/${filename}`

  console.log(`[UPLOAD] URL générée: ${url}`)

  return {
    filename,
    url,
  }
}

// Supprimer une image
export async function deleteUploadedImage(filename: string): Promise<void> {
  const filepath = path.join(UPLOAD_DIR, filename)
  try {
    await fs.unlink(filepath)
  } catch (error) {
    console.error('Erreur suppression image:', error)
  }
}

// Valider qu'un fichier est une image
export function isValidImage(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  return validTypes.includes(file.type)
}

// Valider la taille du fichier (max 20MB par défaut pour préserver la qualité)
export function isValidFileSize(file: File, maxSizeMB: number = 20): boolean {
  const maxSize = maxSizeMB * 1024 * 1024
  return file.size <= maxSize
}


