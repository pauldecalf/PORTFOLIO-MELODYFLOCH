import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

// Fonction helper pour normaliser l'URL avec protocole
function getBaseUrl(): string {
  const url = process.env.APP_URL || 'http://localhost:3000'
  // Si l'URL n'a pas de protocole, ajouter https://
  if (url && !url.match(/^https?:\/\//)) {
    return `https://${url}`
  }
  return url
}

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: 'Melody Floc\'h | Photographe Portrait Les Essarts-le-Roi 78690',
    template: '%s | Melody Floc\'h Photographe',
  },
  description: 'Melody Floc\'h, photographe professionnel aux Essarts-le-Roi (78690). Spécialisé en portraits artistiques, séances photo noir & blanc et photographie lifestyle. Service dans les Yvelines : Rambouillet, Saint-Arnoult, Le Perray-en-Yvelines.',
  keywords: [
    'Melody Floc\'h',
    'photographe Les Essarts-le-Roi',
    'photographe 78690',
    'photographe Yvelines',
    'photographe Rambouillet',
    'photographe portrait Yvelines',
    'séance photo Les Essarts-le-Roi',
    'photographie lifestyle Yvelines',
    'portraits noir et blanc',
    'photographe professionnel 78',
    'photographe Saint-Arnoult-en-Yvelines',
    'photographe Le Perray-en-Yvelines',
    'shooting photo Rambouillet',
    'studio photo Yvelines',
    'photographie artistique 78690',
  ],
  authors: [{ name: 'Melody Floc\'h' }],
  creator: 'Melody Floc\'h',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: getBaseUrl(),
    siteName: 'Melody Floc\'h Photography',
    title: 'Melody Floc\'h | Photographe Portrait Les Essarts-le-Roi 78690',
    description: 'Melody Floc\'h, photographe professionnel aux Essarts-le-Roi (Yvelines). Portraits artistiques, noir & blanc et photographie lifestyle. Secteur Rambouillet, Saint-Arnoult, Le Perray-en-Yvelines.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Melody Floc\'h - Photographe Portrait Les Essarts-le-Roi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Melody Floc\'h | Photographe Portrait Les Essarts-le-Roi 78690',
    description: 'Melody Floc\'h, photographe professionnel aux Essarts-le-Roi (Yvelines). Portraits artistiques, noir & blanc et photographie lifestyle.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

