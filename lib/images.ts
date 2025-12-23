import { prisma } from './prisma'

/**
 * Convertit une URL d'image pour utiliser l'API route en production
 * Cette fonction peut être utilisée côté serveur et client
 */
export function getImageUrl(url: string): string {
  // Si l'URL commence déjà par /api/uploads, la retourner telle quelle
  if (url.startsWith('/api/uploads/')) {
    return url
  }
  
  // Si l'URL commence par /uploads/, la convertir en /api/uploads/ en production
  if (url.startsWith('/uploads/')) {
    const filename = url.replace('/uploads/', '')
    // En production, toujours utiliser l'API route pour servir les images
    // Cela permet de servir les images même si elles sont sur un volume persistant
    if (typeof window === 'undefined') {
      // Côté serveur
      return process.env.NODE_ENV === 'production' 
        ? `/api/uploads/${filename}`
        : url
    } else {
      // Côté client - détecter si on est en production via l'URL
      const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1')
      return isProduction 
        ? `/api/uploads/${filename}`
        : url
    }
  }
  
  // Sinon, retourner l'URL telle quelle (peut être une URL externe)
  return url
}

export async function getImageByKey(key: string) {
  try {
    const image = await prisma.siteImage.findUnique({
      where: {
        key,
        isActive: true,
      },
    })

    if (!image) {
      return null
    }

    return {
      ...image,
      url: getImageUrl(image.url),
    }
  } catch (error) {
    console.error('Erreur récupération image:', error)
    return null
  }
}

export async function getImagesByCategory(category: string) {
  try {
    const images = await prisma.siteImage.findMany({
      where: {
        category,
        isActive: true,
      },
      orderBy: { order: 'asc' },
    })

    return images.map(image => ({
      ...image,
      url: getImageUrl(image.url),
    }))
  } catch (error) {
    console.error('Erreur récupération images:', error)
    return []
  }
}

export async function getGalleryImages(gallery: string) {
  try {
    const images = await prisma.galleryImage.findMany({
      where: {
        gallery,
        isActive: true,
      },
      orderBy: { order: 'asc' },
    })

    return images.map(image => ({
      ...image,
      url: getImageUrl(image.url),
    }))
  } catch (error) {
    console.error('Erreur récupération images galerie:', error)
    return []
  }
}

export async function getGalleryImageCount(gallery: string): Promise<number> {
  try {
    return await prisma.galleryImage.count({
      where: {
        gallery,
        isActive: true,
      },
    })
  } catch (error) {
    console.error('Erreur comptage images galerie:', error)
    return 0
  }
}
