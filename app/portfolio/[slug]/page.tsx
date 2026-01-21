import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import GalleryGrid from '@/components/portfolio/GalleryGrid'
import { getGalleryImages } from '@/lib/images'

const galleries = {
  portraits: {
    title: 'Portraits',
    description:
      'Une collection de portraits photographiques réalisés aux Essarts-le-Roi et dans les Yvelines. Chaque séance photo portrait célèbre l\'individualité et la beauté unique de chaque personne. Melody Floc\'h capture votre personnalité avec sensibilité et authenticité en studio ou à domicile (Rambouillet, Saint-Arnoult-en-Yvelines, Le Perray).',
    count: 24,
  },
  'noir-et-blanc': {
    title: 'Portraits Noir & Blanc',
    description:
      'Photographie noir et blanc intemporelle aux Essarts-le-Roi (78690). Le noir et blanc révèle l\'âme du portrait avec intensité. Melody Floc\'h, photographe dans les Yvelines, crée des portraits en noir et blanc qui transcendent les époques. Séances en studio ou en extérieur.',
    count: 18,
  },
  lifestyle: {
    title: 'À travers mon objectif',
    description:
      'Photographie lifestyle dans les Yvelines par Melody Floc\'h. Séances photo naturelles et spontanées aux Essarts-le-Roi, Rambouillet et environs. Ces images lifestyle capturent la beauté du quotidien et racontent des histoires authentiques de vie de famille.',
    count: 30,
  },
}

type GallerySlug = keyof typeof galleries

export function generateStaticParams() {
  return Object.keys(galleries).map((slug) => ({
    slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const gallery = galleries[params.slug as GallerySlug]

  if (!gallery) {
    return {
      title: 'Galerie non trouvée',
    }
  }

  return {
    title: gallery.title,
    description: gallery.description,
    openGraph: {
      title: `${gallery.title} | Melody Floc'h`,
      description: gallery.description,
    },
  }
}

export default async function GalleryPage({ params }: { params: { slug: string } }) {
  const gallery = galleries[params.slug as GallerySlug]

  if (!gallery) {
    notFound()
  }

  // Récupérer les images de la galerie
  const images = await getGalleryImages(params.slug)

  return (
    <>
      <PageHero title={gallery.title} description={gallery.description} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <GalleryGrid images={images} />

          <div className="mt-12 text-center">
            <Link href="/portfolio" className="btn-secondary">
              ← Retour au portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-50">
        <div className="container-custom text-center">
          <h2 className="heading-md mb-6">Inspiré(e) par ce que vous voyez ?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Créons ensemble des images qui vous ressemblent
          </p>
          <Link href="/booking" className="btn-primary">
            Réserver votre séance
          </Link>
        </div>
      </section>
    </>
  )
}

