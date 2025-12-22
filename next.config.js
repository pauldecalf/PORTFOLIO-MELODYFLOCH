/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Désactiver la conversion automatique pour préserver la qualité
    formats: [],
    // Qualité maximale pour les images
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig

