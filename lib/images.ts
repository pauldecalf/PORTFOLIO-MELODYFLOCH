import { prisma } from './prisma'
import { getImageUrl } from './image-url'

// Ré-exporter pour compatibilité
export { getImageUrl }

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
