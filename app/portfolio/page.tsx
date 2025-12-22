import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import { getGalleryImages, getGalleryImageCount } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Découvrez le portfolio de Melody Floc\'h : photographie portrait, noir & blanc et lifestyle. Une sélection de mes plus beaux travaux photographiques.',
  openGraph: {
    title: 'Portfolio | Melody Floc\'h',
    description:
      'Découvrez le portfolio de Melody Floc\'h : photographie portrait, noir & blanc et lifestyle.',
  },
}

export default async function PortfolioPage() {
  // Récupérer les images et comptes pour chaque galerie
  const [portraitsImages, noirEtBlancImages, lifestyleImages] = await Promise.all([
    getGalleryImages('portraits'),
    getGalleryImages('noir-et-blanc'),
    getGalleryImages('lifestyle'),
  ])

  const galleries = [
    {
      title: 'Portraits',
      slug: 'portraits',
      description:
        'Des portraits qui révèlent la personnalité et l\'authenticité de chacun. Capturer l\'essence d\'une personne à travers mon objectif.',
      images: portraitsImages,
      imageCount: portraitsImages.length,
    },
    {
      title: 'Portraits Noir & Blanc',
      slug: 'noir-et-blanc',
      description:
        'L\'intemporalité du noir et blanc pour des portraits d\'une rare intensité émotionnelle. Le jeu d\'ombres et de lumières sublime chaque visage.',
      images: noirEtBlancImages,
      imageCount: noirEtBlancImages.length,
    },
    {
      title: 'À travers mon objectif',
      slug: 'lifestyle',
      description:
        'Des moments de vie capturés avec naturel et spontanéité. La beauté du quotidien révélée par la photographie lifestyle.',
      images: lifestyleImages,
      imageCount: lifestyleImages.length,
    },
  ]

  return (
    <>
      <PageHero
        title="Portfolio"
        description="Découvrez une sélection de mes travaux en photographie portrait et lifestyle"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-16">
            {galleries.map((gallery, index) => (
              <div key={gallery.slug} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mb-8">
                  <h2 className="heading-md mb-4">{gallery.title}</h2>
                  <p className="text-lg text-gray-600 max-w-3xl">
                    {gallery.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.images.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-gray-500">
                      Aucune image dans cette galerie. Ajoutez des images via l'administration.
                    </div>
                  ) : (
                    gallery.images.slice(0, 8).map((image, i) => (
                      <div
                        key={image.id}
                        className="relative aspect-square rounded-lg overflow-hidden image-hover-effect bg-gray-200"
                      >
                        <Image
                          src={image.url}
                          alt={image.altText}
                          fill
                          className="object-cover"
                          quality={100}
                          unoptimized={true}
                        />
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-6 text-center">
                  <Link
                    href={`/portfolio/${gallery.slug}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Voir toute la galerie ({gallery.imageCount} photos)
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-50">
        <div className="container-custom text-center">
          <h2 className="heading-md mb-6">Envie de votre propre séance photo ?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Réservez dès maintenant votre séance photo portrait ou lifestyle
          </p>
          <Link href="/booking" className="btn-primary">
            Réserver une séance
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          name: 'Portfolio Melody Floc\'h',
          description:
            'Portfolio de photographie portrait, noir & blanc et lifestyle par Melody Floc\'h',
            url: `${process.env.APP_URL || 'http://localhost:3000'}/portfolio`,
          }),
        }}
      />
    </>
  )
}

