import { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import DynamicImage from '@/components/DynamicImage'

export const metadata: Metadata = {
  title: 'À propos - Photographe Les Essarts-le-Roi',
  description:
      'Découvrez Melody Floc\'h, photographe portrait et lifestyle aux Essarts-le-Roi (78690). Passionné par l\'art du portrait depuis plus de 10 ans. Studio photo dans les Yvelines, secteur Rambouillet.',
  openGraph: {
    title: 'À propos | Melody Floc\'h - Photographe Yvelines',
    description:
      'Melody Floc\'h, photographe professionnel aux Essarts-le-Roi. Portraits artistiques et lifestyle dans les Yvelines.',
  },
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="À propos de moi"
        description="L'histoire d'une passion pour la photographie et l'humain"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-[500px] animate-fade-in">
              <div className="absolute inset-0 bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
                <DynamicImage
                  imageKey="about-melody"
                  alt="Melody Floc'h - Photographe Portrait & Lifestyle"
                  fill
                  placeholderText="Photo portrait Melody"
                />
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="heading-md mb-6">Melody Floc'h, photographe portrait & lifestyle aux Essarts-le-Roi</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Bonjour, je suis Melody Floc'h, <strong>photographe professionnel</strong> basé aux 
                  <strong> Essarts-le-Roi (78690)</strong>. Spécialisé dans les <strong>portraits artistiques</strong> et 
                  la <strong>photographie lifestyle</strong>, j'exerce depuis plus de 10 ans dans les 
                  <strong> Yvelines</strong>. Mon <strong>studio photo</strong> situé aux Essarts-le-Roi me permet 
                  d'accueillir mes clients dans un cadre professionnel et chaleureux.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Ma passion pour la <strong>photographie portrait</strong> a débuté dans mon adolescence. 
                  Fascinée par le pouvoir d'une image à figer l'émotion et raconter une histoire, j'ai 
                  naturellement orienté ma carrière vers le <strong>portrait photographique</strong>. 
                  J'interviens principalement dans le secteur de <strong>Rambouillet</strong>, 
                  <strong> Saint-Arnoult-en-Yvelines</strong>, <strong>Le Perray-en-Yvelines</strong> et les 
                  communes environnantes des Yvelines.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Mon approche photographique privilégie l'<strong>authenticité</strong> et la 
                  <strong> connexion humaine</strong>. Je crois que les plus belles photos sont celles 
                  où l'on se sent soi-même, où l'on oublie la caméra. C'est pourquoi je prends le temps 
                  de créer une atmosphère détendue lors de chaque <strong>séance photo</strong>, que ce soit 
                  en studio aux Essarts-le-Roi ou à domicile dans les Yvelines.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="heading-md mb-8 text-center">Mon approche photographique</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">Authenticité</h3>
                <p className="text-gray-600">
                  Je capture vos émotions vraies, sans artifice. Chaque photo reflète votre 
                  personnalité unique et votre beauté naturelle.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">Lumière</h3>
                <p className="text-gray-600">
                  La maîtrise de la lumière est au cœur de mon travail. Je sculpte les visages 
                  et crée des ambiances uniques pour chaque séance.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">Complicité</h3>
                <p className="text-gray-600">
                  Une séance photo réussie commence par une vraie connexion. Je mets tout en 
                  œuvre pour vous mettre à l'aise et révéler le meilleur de vous-même.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-md mb-6">Ma philosophie</h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Pour moi, la photographie n'est pas seulement une question de technique ou de matériel. 
                C'est avant tout un <strong>art de la rencontre</strong> et de l'<strong>écoute</strong>. 
                Chaque personne qui se présente devant mon objectif est unique, avec son histoire, 
                sa sensibilité, sa beauté propre.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Mon rôle est de créer un espace où vous pouvez être vous-même, complètement, 
                et de capturer ces instants de grâce où votre authenticité transparaît. 
                C'est cette magie que je cherche à chaque séance photo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-md mb-6">Travaillons ensemble</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Que vous souhaitiez des portraits professionnels, des photos de famille ou une séance 
            lifestyle, je serais ravi de créer avec vous des images qui vous ressemblent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="inline-block bg-white text-primary-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Réserver une séance
            </Link>
            <Link href="/contact" className="inline-block border-2 border-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors">
              Me contacter
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Melody Floc\'h',
          jobTitle: 'Photographe Portrait & Lifestyle',
          description:
            'Melody Floc\'h, photographe professionnel spécialisé en portraits artistiques et photographie lifestyle aux Essarts-le-Roi (Yvelines)',
            url: `${process.env.APP_URL || 'http://localhost:3000'}/about`,
            workLocation: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Les Essarts-le-Roi',
                addressRegion: 'Yvelines',
                postalCode: '78690',
                addressCountry: 'FR',
              },
            },
            sameAs: [],
          }),
        }}
      />
    </>
  )
}

