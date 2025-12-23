import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    // Chemin vers le fichier
    const UPLOAD_DIR = process.env.UPLOAD_DIR 
      ? process.env.UPLOAD_DIR 
      : path.join(process.cwd(), 'public', 'uploads')
    
    const filepath = path.join(UPLOAD_DIR, params.filename)

    // Vérifier que le fichier existe
    try {
      await fs.access(filepath)
    } catch {
      return new NextResponse('Image not found', { status: 404 })
    }

    // Lire le fichier
    const fileBuffer = await fs.readFile(filepath)
    
    // Déterminer le type MIME
    const ext = path.extname(params.filename).toLowerCase()
    const mimeTypes: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
    }
    const contentType = mimeTypes[ext] || 'application/octet-stream'

    // Retourner l'image avec les bons headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error serving image:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

