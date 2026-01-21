import { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Zone d\'intervention - Photographe Yvelines 78',
  description:
    'Melody Floc\'h, photographe portrait et lifestyle intervient aux Essarts-le-Roi et dans tout le secteur des Yvelines (78) : Rambouillet, Saint-Arnoult-en-Yvelines, Le Perray-en-Yvelines, Clairefontaine, Bullion, Gazeran, Auffargis, Cernay-la-Ville, Bonnelles. Séances photo en studio et à domicile.',
  openGraph: {
    title: 'Zone d\'intervention | Melody Floc\'h - Photographe Yvelines',
    description:
      'Photographe portrait dans les Yvelines. Studio aux Essarts-le-Roi, déplacement dans tout le secteur de Rambouillet.',
  },
}

export default function ZoneInterventionPage() {
  const villes = [
    {
      nom: 'Les Essarts-le-Roi',
      code: '78690',
      description: 'Studio photo principal situé aux Essarts-le-Roi. Séances portrait, noir & blanc et lifestyle en studio professionnel.',
      highlight: true,
    },
    {
      nom: 'Rambouillet',
      code: '78120',
      description: 'Séances photo à domicile ou en extérieur à Rambouillet. Portraits de famille, shooting lifestyle et photos artistiques.',
    },
    {
      nom: 'Saint-Arnoult-en-Yvelines',
      code: '78730',
      description: 'Photographe portrait à Saint-Arnoult-en-Yvelines. Déplacement à domicile pour vos séances photo personnalisées.',
    },
    {
      nom: 'Le Perray-en-Yvelines',
      code: '78610',
      description: 'Séances photo portrait et lifestyle au Perray-en-Yvelines. Studio mobile disponible pour shooting à domicile.',
    },
    {
      nom: 'Clairefontaine-en-Yvelines',
      code: '78120',
      description: 'Photographie portrait à Clairefontaine-en-Yvelines. Séances en extérieur dans les cadres naturels environnants.',
    },
    {
      nom: 'Bullion',
      code: '78830',
      description: 'Service de photographie portrait et lifestyle à Bullion. Séances photo à domicile ou en extérieur.',
    },
    {
      nom: 'Gazeran',
      code: '78125',
      description: 'Photographe à domicile à Gazeran. Portraits de famille, photos de couple et séances lifestyle.',
    },
    {
      nom: 'Auffargis',
      code: '78610',
      description: 'Séances photo portrait à Auffargis. Déplacement à domicile pour shooting personnalisé.',
    },
    {
      nom: 'Cernay-la-Ville',
      code: '78720',
      description: 'Photographie portrait à Cernay-la-Ville. Cadre naturel exceptionnel pour séances photo en extérieur.',
    },
    {
      nom: 'Bonnelles',
      code: '78830',
      description: 'Service photographique à Bonnelles. Portraits artistiques et photographie lifestyle.',
    },
    {
      nom: 'Émancé',
      code: '78125',
      description: 'Photographe portrait à Émancé. Séances photo à domicile ou en studio aux Essarts-le-Roi.',
    },
    {
      nom: 'Ponthévrard',
      code: '78730',
      description: 'Séances photo à Ponthévrard. Service de photographie portrait et lifestyle à domicile.',
    },
    {
      nom: 'Longvilliers',
      code: '78730',
      description: 'Photographe à Longvilliers. Shooting photo portrait et lifestyle avec déplacement à domicile.',
    },
  ]

  return (
    <>
      <PageHero
        title="Zone d'intervention"
        description="Photographe portrait et lifestyle dans les Yvelines"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="heading-md mb-6">Photographe dans les Yvelines (78)</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Basée aux <strong>Essarts-le-Roi (78690)</strong>, j'interviens dans tout le 
                secteur des <strong>Yvelines</strong> pour vos <strong>séances photo portrait</strong> et 
                <strong> lifestyle</strong>. Mon <strong>studio photo</strong> vous accueille aux Essarts-le-Roi, 
                et je me déplace également à votre domicile dans les communes environnantes.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Que vous recherchiez un <strong>photographe à Rambouillet</strong>, 
                <strong> Saint-Arnoult-en-Yvelines</strong>, <strong>Le Perray-en-Yvelines</strong> ou dans 
                les villages alentours, je suis à votre disposition pour créer ensemble des portraits 
                qui vous ressemblent.
              </p>
            </div>

            <div className="bg-primary-50 rounded-2xl p-8 mb-12">
              <h3 className="text-xl font-serif font-semibold mb-4 text-center">
                Studio photo aux Essarts-le-Roi
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Mon <strong>studio photo professionnel</strong> situé aux <strong>Essarts-le-Roi</strong> est 
                équipé pour réaliser tous types de <strong>séances portrait</strong> : portraits artistiques, 
                photographie noir et blanc, photos de famille, portraits corporate. Un espace chaleureux 
                et professionnel pour vous mettre à l'aise devant l'objectif.
              </p>
              <div className="text-center">
                <Link href="/booking" className="btn-primary">
                  Réserver une séance au studio
                </Link>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <h3 className="heading-sm mb-8 text-center">
              Villes et communes où j'interviens
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {villes.map((ville) => (
                <div
                  key={ville.code}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    ville.highlight
                      ? 'bg-primary-100 border-primary-600'
                      : 'bg-white border-gray-200 hover:border-primary-400'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-serif font-semibold text-lg text-gray-900">
                      {ville.nom}
                    </h4>
                    {ville.highlight && (
                      <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded">
                        Studio
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-primary-600 font-medium mb-3">
                    {ville.code}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {ville.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-serif font-semibold mb-6 text-center">
                Services de photographie dans les Yvelines
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary-600 mb-2">En studio</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ Portraits artistiques</li>
                    <li>✓ Photographie noir et blanc</li>
                    <li>✓ Photos corporate / professionnelles</li>
                    <li>✓ Book photo</li>
                    <li>✓ Portraits de famille</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-600 mb-2">À domicile / Extérieur</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ Séances lifestyle</li>
                    <li>✓ Photos de famille à domicile</li>
                    <li>✓ Shooting en extérieur</li>
                    <li>✓ Photos de couple</li>
                    <li>✓ Portraits dans votre environnement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-50">
        <div className="container-custom text-center">
          <h2 className="heading-md mb-6">Votre commune n'est pas dans la liste ?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            N'hésitez pas à me contacter pour discuter de votre projet. 
            Je peux me déplacer dans d'autres communes des Yvelines selon votre demande.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Me contacter
            </Link>
            <Link href="/booking" className="btn-secondary">
              Réserver une séance
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Photographie Portrait',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Melody Floc\'h Photography',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Les Essarts-le-Roi',
                addressRegion: 'Yvelines',
                postalCode: '78690',
                addressCountry: 'FR',
              },
            },
            areaServed: villes.map((ville) => ({
              '@type': 'City',
              name: ville.nom,
              containedInPlace: {
                '@type': 'AdministrativeArea',
                name: 'Yvelines',
              },
            })),
          }),
        }}
      />
    </>
  )
}
