import { prisma } from './prisma'

/**
 * Récupère une image par sa clé
 */
export async function getImageByKey(key: string) {
  try {
    const image = await prisma.siteImage.findUnique({
      where: {
        key,
        isActive: true,
      },
    })
    return image
  } catch (error) {
    console.error(`Erreur récupération image ${key}:`, error)
    return null
  }
}

/**
 * Récupère plusieurs images par catégorie
 */
export async function getImagesByCategory(category: string) {
  try {
    const images = await prisma.siteImage.findMany({
      where: {
        category,
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    })
    return images
  } catch (error) {
    console.error(`Erreur récupération images catégorie ${category}:`, error)
    return []
  }
}

/**
 * Récupère toutes les images actives
 */
export async function getAllActiveImages() {
  try {
    const images = await prisma.siteImage.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    })
    return images
  } catch (error) {
    console.error('Erreur récupération images:', error)
    return []
  }
}

// ============================================
// GALERIES DU PORTFOLIO
// ============================================

/**
 * Récupère les images d'une galerie du portfolio
 */
export async function getGalleryImages(gallery: string) {
  try {
    const images = await prisma.galleryImage.findMany({
      where: {
        gallery,
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    })
    return images
  } catch (error) {
    console.error(`Erreur récupération images galerie ${gallery}:`, error)
    return []
  }
}

/**
 * Récupère le nombre d'images d'une galerie
 */
export async function getGalleryImageCount(gallery: string) {
  try {
    const count = await prisma.galleryImage.count({
      where: {
        gallery,
        isActive: true,
      },
    })
    return count
  } catch (error) {
    console.error(`Erreur comptage images galerie ${gallery}:`, error)
    return 0
  }
}

/**
 * Récupère une image preview pour une galerie (première image)
 */
export async function getGalleryPreview(gallery: string) {
  try {
    const image = await prisma.galleryImage.findFirst({
      where: {
        gallery,
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    })
    return image
  } catch (error) {
    console.error(`Erreur récupération preview galerie ${gallery}:`, error)
    return null
  }
}

