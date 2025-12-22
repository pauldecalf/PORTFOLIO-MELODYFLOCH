import fs from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'
import sharp from 'sharp'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

// Créer le dossier uploads si nécessaire
export async function ensureUploadDir() {
  try {
    await fs.access(UPLOAD_DIR)
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true })
  }
}

// Sauvegarder une image uploadée
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

  // Optimiser l'image avec Sharp
  await sharp(buffer)
    .resize(2000, 2000, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: 85 })
    .toFile(filepath)

  return {
    filename,
    url: `/uploads/${filename}`,
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

// Valider la taille du fichier (max 5MB)
export function isValidFileSize(file: File, maxSizeMB: number = 5): boolean {
  const maxSize = maxSizeMB * 1024 * 1024
  return file.size <= maxSize
}


