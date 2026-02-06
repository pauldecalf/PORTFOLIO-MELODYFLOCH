/**
 * Utilitaire pour convertir les URLs d'images
 * Peut être utilisé côté client et côté serveur
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
