import { prisma } from './prisma'

/**
 * Convertit une URL d'image pour utiliser l'API route
 * SIMPLIFIÉ: Toujours utiliser /api/uploads/ en dev ET prod
 */
export function getImageUrl(url: string): string {
  // Si l'URL commence déjà par /api/uploads, la retourner telle quelle
  if (url.startsWith('/api/uploads/')) {
    return url
  }
  
  // Si l'URL commence par /uploads/, la convertir en /api/uploads/
  if (url.startsWith('/uploads/')) {
    const filename = url.replace('/uploads/', '')
    return `/api/uploads/${filename}`
  }
  
  // Sinon, retourner l'URL telle quelle (peut être une URL externe)
  return url
}

export async function getImageByKey(key: string) {
  try {
    const image = await prisma.siteImage.findFirst({
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
