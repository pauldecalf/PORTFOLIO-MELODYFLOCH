import { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import PricingCard from '@/components/PricingCard'

export const metadata: Metadata = {
  title: 'Tarifs',
  description:
    'Découvrez les tarifs de Melody Floc\'h pour vos séances photo portrait et lifestyle. Des formules adaptées à tous vos besoins, de la séance découverte à l\'expérience premium.',
  openGraph: {
    title: 'Tarifs | Melody Floc\'h',
    description:
      'Découvrez les tarifs de Melody Floc\'h pour vos séances photo portrait et lifestyle. Des formules adaptées à tous vos besoins.',
  },
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        title="Tarifs & Formules"
        description="Des offres adaptées à vos envies pour des portraits qui vous ressemblent"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg text-gray-600 leading-relaxed">
              Que vous souhaitiez découvrir la <strong>photographie portrait professionnelle</strong>, 
              offrir une <strong>séance photo</strong> à un proche, ou créer des souvenirs mémorables, 
              j'ai conçu des formules flexibles qui s'adaptent à vos besoins et votre budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <PricingCard
              name="Essentiel"
              price={150}
              duration={60}
              description="Parfait pour découvrir mon univers photographique et obtenir de magnifiques portraits"
              features={[
                'Séance d\'une heure',
                '1 tenue de votre choix',
                '10 photos retouchées HD',
                'Galerie en ligne privée',
                'Téléchargement illimité',
                'Conseils préparation',
              ]}
            />
            <PricingCard
              name="Signature"
              price={250}
              duration={90}
              description="La formule la plus populaire, idéale pour explorer différents looks et ambiances"
              features={[
                'Séance de 90 minutes',
                '2 à 3 tenues différentes',
                '20 photos retouchées HD',
                'Galerie en ligne privée',
                'Téléchargement illimité',
                'Conseils styling personnalisés',
                'Photos bonus disponibles',
              ]}
              highlighted
            />
            <PricingCard
              name="Premium"
              price={400}
              duration={120}
              description="Une expérience photo complète et sur-mesure pour des résultats exceptionnels"
              features={[
                'Séance de 2 heures',
                'Tenues illimitées',
                '40 photos retouchées HD',
                'Galerie en ligne privée',
                'Téléchargement illimité',
                'Coaching & styling complet',
                'Toutes les photos bonus',
                '2 impressions 20x30cm offertes',
              ]}
            />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-primary-50 rounded-2xl p-8 md:p-10 mb-12">
              <h2 className="heading-sm mb-6 text-center">Ce qui est inclus dans toutes les formules</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-primary-600 mr-3 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Retouche professionnelle</h3>
                    <p className="text-sm text-gray-600">
                      Chaque photo est minutieusement retouchée pour sublimer votre image
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-primary-600 mr-3 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Galerie en ligne sécurisée</h3>
                    <p className="text-sm text-gray-600">
                      Accédez à vos photos où vous voulez, quand vous voulez
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-primary-600 mr-3 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Conseils personnalisés</h3>
                    <p className="text-sm text-gray-600">
                      Aide au choix des tenues et conseils pour préparer votre séance
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-primary-600 mr-3 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Livraison rapide</h3>
                    <p className="text-sm text-gray-600">
                      Recevez vos photos finales sous 2 semaines maximum
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-primary-200 rounded-2xl p-8 md:p-10">
              <h2 className="heading-sm mb-4 text-center">Services supplémentaires</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="font-semibold">Photos supplémentaires</h3>
                    <p className="text-sm text-gray-600">Ajoutez des photos retouchées à votre sélection</p>
                  </div>
                  <span className="text-lg font-semibold text-primary-600">15€/photo</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="font-semibold">Impressions Fine Art</h3>
                    <p className="text-sm text-gray-600">Tirages haute qualité sur papier d'art (20x30cm)</p>
                  </div>
                  <span className="text-lg font-semibold text-primary-600">45€</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="font-semibold">Album photo premium</h3>
                    <p className="text-sm text-gray-600">Album relié cuir avec vos plus belles photos (30 pages)</p>
                  </div>
                  <span className="text-lg font-semibold text-primary-600">250€</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Séance à domicile</h3>
                    <p className="text-sm text-gray-600">Je me déplace chez vous (selon localisation)</p>
                  </div>
                  <span className="text-lg font-semibold text-primary-600">Sur devis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-md mb-8 text-center">Questions fréquentes</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Combien de temps dure une séance ?</h3>
                <p className="text-gray-600">
                  Selon la formule choisie, de 1h à 2h. Je prends toujours le temps nécessaire 
                  pour que vous soyez à l'aise et obtenir les meilleurs résultats.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Où se déroulent les séances ?</h3>
                <p className="text-gray-600">
                  En studio ou en extérieur selon vos préférences et le style souhaité. 
                  Je peux également me déplacer à votre domicile (supplément selon localisation).
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Quand vais-je recevoir mes photos ?</h3>
                <p className="text-gray-600">
                  Vous recevrez vos photos finales retouchées dans un délai de 2 semaines maximum 
                  après la séance, via une galerie en ligne privée.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Puis-je offrir une séance photo ?</h3>
                <p className="text-gray-600">
                  Absolument ! Les séances photo font de merveilleux cadeaux. Contactez-moi pour 
                  obtenir un bon cadeau personnalisé.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-md mb-6">Prêt à réserver votre séance photo ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Choisissez votre formule et réservez votre créneau en quelques clics
          </p>
          <Link href="/booking" className="inline-block bg-white text-primary-600 px-10 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors">
            Réserver maintenant
          </Link>
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
              '@type': 'ProfessionalService',
              name: 'Melody Floc\'h Photography',
            },
            offers: [
              {
                '@type': 'Offer',
                name: 'Séance Essentiel',
                price: '150',
                priceCurrency: 'EUR',
              },
              {
                '@type': 'Offer',
                name: 'Séance Signature',
                price: '250',
                priceCurrency: 'EUR',
              },
              {
                '@type': 'Offer',
                name: 'Séance Premium',
                price: '400',
                priceCurrency: 'EUR',
              },
            ],
          }),
        }}
      />
    </>
  )
}

