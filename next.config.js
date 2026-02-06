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
  webpack: (config, { isServer }) => {
    // MongoDB ne doit être utilisé que côté serveur
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        'fs/promises': false,
      }
    }
    return config
  },
}

module.exports = nextConfig

