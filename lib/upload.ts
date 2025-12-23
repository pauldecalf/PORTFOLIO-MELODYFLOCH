import fs from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

// En production sur Railway, utiliser un volume persistant si disponible
// Sinon utiliser le dossier public/uploads (qui sera perdu à chaque redéploiement)
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

  // En production, utiliser l'API route pour servir les images
  // Cela permet de servir les images même si elles sont sur un volume persistant
  const url = process.env.NODE_ENV === 'production' 
    ? `/api/uploads/${filename}`
    : `/uploads/${filename}`

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


