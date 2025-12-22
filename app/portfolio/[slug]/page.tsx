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
      'Une collection de portraits qui célèbrent l\'individualité et la beauté unique de chaque personne. Chaque séance photo portrait est une exploration de la personnalité, capturée avec sensibilité et authenticité.',
    count: 24,
  },
  'noir-et-blanc': {
    title: 'Portraits Noir & Blanc',
    description:
      'Le noir et blanc révèle l\'âme du portrait. Sans la distraction de la couleur, l\'émotion et l\'expression prennent toute leur intensité. Ces photographies noir et blanc intemporelles transcendent les époques.',
    count: 18,
  },
  lifestyle: {
    title: 'À travers mon objectif',
    description:
      'La photographie lifestyle capture la beauté du quotidien. Ces images spontanées et naturelles racontent des histoires authentiques, des moments de vie préservés pour toujours.',
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

