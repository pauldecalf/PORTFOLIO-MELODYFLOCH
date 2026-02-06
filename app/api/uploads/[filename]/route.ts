import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const requestedFilename = params.filename
  
  try {
    // Chemin vers le fichier
    const UPLOAD_DIR = process.env.UPLOAD_DIR 
      ? process.env.UPLOAD_DIR 
      : path.join(process.cwd(), 'public', 'uploads')
    
    const filepath = path.join(UPLOAD_DIR, requestedFilename)

    console.log(`[IMAGE] Demande: ${requestedFilename}`)
    console.log(`[IMAGE] Cherche dans: ${UPLOAD_DIR}`)
    console.log(`[IMAGE] Chemin complet: ${filepath}`)

    // Vérifier que le fichier existe
    try {
      await fs.access(filepath)
      console.log(`[IMAGE] ✅ Fichier trouvé`)
    } catch (error) {
      console.error(`[IMAGE] ❌ Fichier introuvable: ${filepath}`)
      
      // Lister les fichiers disponibles pour debug
      try {
        const files = await fs.readdir(UPLOAD_DIR)
        console.log(`[IMAGE] Fichiers disponibles (${files.length}):`, files.slice(0, 10))
      } catch (e) {
        console.error(`[IMAGE] Impossible de lire le dossier uploads:`, e)
      }
      
      return new NextResponse('Image not found', { status: 404 })
    }

    // Lire le fichier
    const fileBuffer = await fs.readFile(filepath)
    
    // Déterminer le type MIME
    const ext = path.extname(requestedFilename).toLowerCase()
    const mimeTypes: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
    }
    const contentType = mimeTypes[ext] || 'application/octet-stream'

    console.log(`[IMAGE] ✅ Servie avec succès (${(fileBuffer.length / 1024).toFixed(2)} KB)`)

    // Retourner l'image avec les bons headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error(`[IMAGE] ❌ Erreur serveur pour ${requestedFilename}:`, error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}


