import { MetadataRoute } from 'next'

function getBaseUrl(): string {
  const url = process.env.APP_URL || 'http://localhost:3000'
  // Si l'URL n'a pas de protocole, ajouter https://
  if (url && !url.match(/^https?:\/\//)) {
    return `https://${url}`
  }
  return url
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

