import { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Spécialités Photo - Photographe Polyvalent Les Essarts-le-Roi',
  description:
    'Melody Floc\'h, photographe polyvalent aux Essarts-le-Roi (78690). Spécialités : mariage, grossesse, bébé, famille, nouveau-né, animaux, corporate, couple. Photographe professionnel dans les Yvelines.',
  openGraph: {
    title: 'Spécialités Photo | Melody Floc\'h - Photographe Yvelines',
    description:
      'Photographe mariage, grossesse, bébé, famille, animaux et corporate aux Essarts-le-Roi. Services photo complets dans les Yvelines.',
  },
}

export default function SpecialitesPage() {
  const specialites = [
    {
      nom: 'Photographe Mariage',
      slug: 'mariage',
      icon: '💍',
      description: 'Immortalisez le plus beau jour de votre vie avec des photos de mariage authentiques et émouvantes. Reportage complet de la préparation à la soirée, dans les Yvelines et alentours.',
      mots_cles: 'photographe mariage Les Essarts-le-Roi, photographe mariage Rambouillet, photographe mariage Yvelines 78',
      services: [
        'Préparation des mariés',
        'Cérémonie (civile et/ou religieuse)',
        'Vin d\'honneur et cocktail',
        'Séance couple',
        'Soirée et première danse',
        'Reportage complet',
      ],
    },
    {
      nom: 'Photographe Grossesse',
      slug: 'grossesse',
      icon: '🤰',
      description: 'Séances photo grossesse pour immortaliser ce moment unique. Photos de femme enceinte en studio ou extérieur, mettant en valeur votre ventre rond avec douceur et élégance.',
      mots_cles: 'photographe grossesse, photographe femme enceinte, photo maternité Yvelines',
      services: [
        'Séance en studio',
        'Séance en extérieur',
        'Shooting en couple',
        'Photos de famille avec fratrie',
        'Book grossesse',
        'Photos intimistes ou lifestyle',
      ],
    },
    {
      nom: 'Photographe Bébé & Nouveau-né',
      slug: 'bebe',
      icon: '👶',
      description: 'Séances photo nouveau-né et bébé dans les premiers jours ou mois de vie. Photos douces et naturelles de votre bébé, à domicile ou en studio aux Essarts-le-Roi.',
      mots_cles: 'photographe bébé, photographe nouveau-né, photo naissance Yvelines',
      services: [
        'Séance nouveau-né (0-15 jours)',
        'Séance bébé (1-12 mois)',
        'Photos à domicile',
        'Photos en studio',
        'Accessoires et décors fournis',
        'Séance avec parents/fratrie',
      ],
    },
    {
      nom: 'Photographe Famille',
      slug: 'famille',
      icon: '👨‍👩‍👧‍👦',
      description: 'Séances photo famille pour capturer vos moments précieux ensemble. Photos naturelles et authentiques de toute la famille, en studio ou en extérieur dans les Yvelines.',
      mots_cles: 'photographe famille Yvelines, séance photo famille Les Essarts-le-Roi, photographe famille Rambouillet',
      services: [
        'Séance famille complète',
        'Photos multi-générations',
        'Séance en extérieur',
        'Séance lifestyle à domicile',
        'Portraits individuels inclus',
        'Photos de fratrie',
      ],
    },
    {
      nom: 'Photographe Enfant',
      slug: 'enfant',
      icon: '🧒',
      description: 'Séances photo enfant pour capturer leur spontanéité et leur joie de vivre. Photos ludiques et naturelles en studio ou en extérieur, adaptées à l\'âge de vos enfants.',
      mots_cles: 'photographe enfant, séance photo enfant Yvelines, photographe pour enfants',
      services: [
        'Portraits d\'enfants',
        'Photos de fratrie',
        'Séances thématiques',
        'Photos d\'anniversaire',
        'Book enfant',
        'Séances ludiques et amusantes',
      ],
    },
    {
      nom: 'Photographe Couple',
      slug: 'couple',
      icon: '💑',
      description: 'Séances photo couple pour célébrer votre amour. Photos romantiques et complices en studio ou dans les beaux paysages des Yvelines. Idéal pour EVJF, Saint-Valentin ou simplement pour vous.',
      mots_cles: 'photographe couple, séance photo couple Yvelines, photographe Saint-Valentin',
      services: [
        'Séance engagement/fiançailles',
        'Photos de couple romantiques',
        'Séance lifestyle',
        'Photos Save the Date',
        'Shooting extérieur',
        'Book couple',
      ],
    },
    {
      nom: 'Photographe Corporate',
      slug: 'corporate',
      icon: '💼',
      description: 'Photos professionnelles et portraits corporate pour entrepreneurs, dirigeants et équipes. Photos LinkedIn, site web, communication d\'entreprise. Studio aux Essarts-le-Roi ou déplacement en entreprise.',
      mots_cles: 'photographe professionnel, photographe corporate Yvelines, photo LinkedIn, portrait professionnel',
      services: [
        'Portraits corporate',
        'Photos LinkedIn',
        'Photos d\'équipe',
        'Reportage entreprise',
        'Photos de produits',
        'Shooting en entreprise',
      ],
    },
    {
      nom: 'Photographe Book & Mode',
      slug: 'book',
      icon: '📸',
      description: 'Création de book photo professionnel pour mannequins, comédiens, artistes. Shooting mode et portraits artistiques pour votre portfolio. Studio professionnel équipé.',
      mots_cles: 'photographe book, shooting photo mode, photographe mannequin, book photo professionnel',
      services: [
        'Book mannequin',
        'Book comédien',
        'Portfolio artistique',
        'Shooting mode',
        'Photos beauty',
        'Conseils styling',
      ],
    },
    {
      nom: 'Photographe Animaux',
      slug: 'animaux',
      icon: '🐕',
      description: 'Séances photo avec vos animaux de compagnie (chiens, chats, chevaux). Portraits d\'animaux en studio ou extérieur, seuls ou avec leurs maîtres. Séances adaptées au tempérament de votre animal.',
      mots_cles: 'photographe animaux, photographe chien, photographe chat, photo animaux de compagnie Yvelines',
      services: [
        'Portraits d\'animaux',
        'Photos chien/chat',
        'Photos équestres',
        'Séance maître et animal',
        'Photos en extérieur',
        'Patience et douceur assurées',
      ],
    },
    {
      nom: 'Photographe Événementiel',
      slug: 'evenementiel',
      icon: '🎉',
      description: 'Couverture photo de vos événements : anniversaires, baptêmes, communions, fêtes familiales ou professionnelles. Reportage discret et complet de votre événement dans les Yvelines.',
      mots_cles: 'photographe événementiel, photographe anniversaire, photographe baptême, photographe communion',
      services: [
        'Anniversaires (enfants/adultes)',
        'Baptêmes et communions',
        'Fêtes familiales',
        'Événements d\'entreprise',
        'Reportage complet',
        'Photos spontanées et posées',
      ],
    },
  ]

  return (
    <>
      <PageHero
        title="Mes Spécialités Photo"
        description="Photographe polyvalent pour tous vos moments de vie"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Basé aux <strong>Essarts-le-Roi (78690)</strong>, je suis un{' '}
              <strong>photographe polyvalent</strong> intervenant dans tout le secteur des{' '}
              <strong>Yvelines</strong>. Que vous recherchiez un{' '}
              <strong>photographe mariage</strong>, un <strong>photographe grossesse</strong>, un{' '}
              <strong>photographe bébé</strong> ou pour tout autre projet photo, je m'adapte à vos 
              besoins et à vos envies.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Chaque spécialité est abordée avec le même soin du détail et la même passion. 
              Mon studio photo aux Essarts-le-Roi vous accueille, ou je me déplace à votre domicile 
              dans les communes de <strong>Rambouillet</strong>, <strong>Saint-Arnoult-en-Yvelines</strong>,{' '}
              <strong>Le Perray-en-Yvelines</strong> et alentours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {specialites.map((specialite, index) => (
              <div
                key={specialite.slug}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary-400 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="text-5xl mb-4 text-center">{specialite.icon}</div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3 text-center">
                  {specialite.nom}
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                  {specialite.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-primary-600 mb-2">Services inclus :</h4>
                  <ul className="space-y-1">
                    {specialite.services.slice(0, 4).map((service, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start">
                        <span className="text-primary-600 mr-2">✓</span>
                        {service}
                      </li>
                    ))}
                    {specialite.services.length > 4 && (
                      <li className="text-xs text-gray-500 italic">
                        + {specialite.services.length - 4} autres prestations
                      </li>
                    )}
                  </ul>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    href="/contact"
                    className="block text-center text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    Demander un devis →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-primary-50 rounded-2xl p-8">
              <h2 className="text-2xl font-serif font-semibold mb-6 text-center">
                Pourquoi me choisir pour vos photos ?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Expérience polyvalente</h3>
                    <p className="text-sm text-gray-600">
                      Plus de 10 ans d'expérience dans tous types de photographie
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Studio professionnel</h3>
                    <p className="text-sm text-gray-600">
                      Studio équipé aux Essarts-le-Roi (78690)
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Déplacement possible</h3>
                    <p className="text-sm text-gray-600">
                      Intervention dans toutes les Yvelines (Rambouillet, Saint-Arnoult...)
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Retouche professionnelle</h3>
                    <p className="text-sm text-gray-600">
                      Toutes les photos sont minutieusement retouchées
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-md mb-6">Une question sur une spécialité ?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Vous ne trouvez pas la prestation que vous cherchez ? Contactez-moi pour discuter 
              de votre projet photo. Je suis à l'écoute de toutes vos demandes et je m'adapte 
              à vos besoins spécifiques.
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
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-md mb-8 text-center">Questions fréquentes par spécialité</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">
                  Quand réserver une séance photo grossesse ?
                </h3>
                <p className="text-gray-600">
                  L'idéal est entre le 7ème et 8ème mois de grossesse, lorsque le ventre est bien 
                  rond mais que vous êtes encore à l'aise pour bouger et prendre des poses.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">
                  Quel est l'âge idéal pour une séance photo nouveau-né ?
                </h3>
                <p className="text-gray-600">
                  Les 10-15 premiers jours de vie sont idéaux pour les poses « cocon ». Mais je réalise 
                  aussi de magnifiques séances jusqu'à 3 mois avec des poses plus éveillées.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">
                  Faites-vous le reportage complet du mariage ?
                </h3>
                <p className="text-gray-600">
                  Oui ! De la préparation le matin jusqu'à la première danse le soir. Je peux aussi 
                  couvrir uniquement la cérémonie ou une partie selon vos besoins et votre budget.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">
                  Mon chien/chat est timide, est-ce un problème ?
                </h3>
                <p className="text-gray-600">
                  Pas du tout ! J'ai l'habitude des animaux timides. Je prends le temps nécessaire 
                  pour qu'ils se sentent à l'aise. La patience est ma devise lors des séances avec animaux.
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
            Quelle que soit votre spécialité recherchée, je suis là pour capturer vos moments précieux
          </p>
          <Link
            href="/booking"
            className="inline-block bg-white text-primary-600 px-10 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
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
            serviceType: 'Photographie Professionnelle',
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
            areaServed: {
              '@type': 'State',
              name: 'Yvelines',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Services Photographiques',
              itemListElement: specialites.map((spec) => ({
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: spec.nom,
                  description: spec.description,
                },
              })),
            },
          }),
        }}
      />
    </>
  )
}
