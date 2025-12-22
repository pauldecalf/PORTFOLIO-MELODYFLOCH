import Link from 'next/link'
import Image from 'next/image'
import TestimonialCard from '@/components/TestimonialCard'
import PricingCard from '@/components/PricingCard'
import DynamicImage from '@/components/DynamicImage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photographe Portrait & Lifestyle | Melody Floc\'h',
  description:
    'Melody Floc\'h, photographe spécialisée en portraits artistiques, noir & blanc et photographie lifestyle. Réservez votre séance photo pour capturer vos plus beaux moments avec une photographe passionnée.',
  openGraph: {
    title: 'Photographe Portrait & Lifestyle | Melody Floc\'h',
    description:
      'Melody Floc\'h, photographe spécialisée en portraits artistiques, noir & blanc et photographie lifestyle. Réservez votre séance photo.',
  },
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="heading-xl mb-6">
                Photographe Portrait & Lifestyle
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Bienvenue dans mon univers photographique. Je suis Melody Floc'h, photographe spécialisée 
              en <strong>portraits artistiques</strong>, <strong>photographie noir et blanc</strong> et 
              <strong> séances lifestyle</strong>. Mon approche sensible et authentique met en valeur 
              votre personnalité unique à travers des clichés intemporels.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Que ce soit pour une séance photo portrait professionnelle, des photos de famille 
                ou un shooting lifestyle, je crée avec vous des images qui racontent votre histoire. 
                Chaque séance photo est une expérience personnalisée où l'émotion et la beauté 
                naturelle prennent vie devant l'objectif.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking" className="btn-primary text-center">
                  Réserver une séance
                </Link>
                <Link href="/portfolio" className="btn-secondary text-center">
                  Voir mon portfolio
                </Link>
              </div>
            </div>

            <div className="relative h-[500px] lg:h-[600px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-100 rounded-2xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-gray-200 rounded-2xl overflow-hidden shadow-2xl">
                <DynamicImage
                  imageKey="hero-home"
                  alt="Melody Floc'h - Photographe Portrait"
                  fill
                  priority
                  placeholderText="Image hero principale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Aperçu du Portfolio</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez une sélection de mes travaux en photographie portrait et lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { key: 'preview-portraits', title: 'Portraits', slug: 'portraits' },
              { key: 'preview-nb', title: 'Noir & Blanc', slug: 'noir-et-blanc' },
              { key: 'preview-lifestyle', title: 'Lifestyle', slug: 'lifestyle' },
            ].map((item) => (
              <Link
                key={item.key}
                href={`/portfolio/${item.slug}`}
                className="group relative h-80 rounded-lg overflow-hidden image-hover-effect"
              >
                <DynamicImage
                  imageKey={item.key}
                  alt={`Aperçu ${item.title}`}
                  fill
                  placeholderText={`Aperçu ${item.title}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-xl font-serif font-semibold">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/portfolio" className="btn-primary">
              Voir tout le portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
                <DynamicImage
                  imageKey="about-melody"
                  alt="Melody Floc'h - Photographe"
                  fill
                  placeholderText="Photo à propos"
                />
              </div>
            </div>

            <div>
              <h2 className="heading-lg mb-6">À propos de moi</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Passionnée par l'art du portrait depuis plus de 10 ans, j'ai développé un style 
                photographique unique qui allie élégance intemporelle et authenticité. Mon approche 
                privilégie la connexion humaine et l'émotion sincère.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Chaque séance photo est pour moi l'opportunité de révéler la beauté naturelle 
                et la personnalité de mes clients. Je crois que les plus belles photos sont celles 
                qui capturent l'essence même d'un moment, d'un regard, d'une émotion.
              </p>
              <Link href="/about" className="btn-secondary">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Pricing Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Mes Offres de Séances Photo</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des formules adaptées à vos besoins pour des portraits qui vous ressemblent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-10">
            <PricingCard
              name="Essentiel"
              price={150}
              duration={60}
              description="Parfait pour découvrir mon univers photographique"
              features={[
                'Séance d\'une heure',
                '1 tenue',
                '10 photos retouchées',
                'Galerie en ligne privée',
              ]}
            />
            <PricingCard
              name="Signature"
              price={250}
              duration={90}
              description="La formule la plus populaire pour des portraits variés"
              features={[
                'Séance de 90 minutes',
                '2-3 tenues',
                '20 photos retouchées',
                'Galerie en ligne privée',
                'Conseils styling',
              ]}
              highlighted
            />
            <PricingCard
              name="Premium"
              price={400}
              duration={120}
              description="Une expérience photo complète et personnalisée"
              features={[
                'Séance de 2 heures',
                'Tenues illimitées',
                '40 photos retouchées',
                'Galerie en ligne privée',
                'Coaching & styling',
                'Impressions offertes',
              ]}
            />
          </div>

          <div className="text-center">
            <Link href="/pricing" className="btn-secondary">
              Voir tous les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Ils m'ont fait confiance</h2>
            <p className="text-lg text-gray-600">
              Les avis de mes clients après leur séance photo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard
              quote="Une expérience exceptionnelle ! Melody a su me mettre à l'aise et capturer mon essence. Les photos sont magnifiques, j'en suis encore émue."
              author="Sophie L."
              session="Séance Portrait"
            />
            <TestimonialCard
              quote="Un talent incroyable pour la photographie noir et blanc. Chaque cliché raconte une histoire. Je recommande vivement !"
              author="Marc D."
              session="Séance Noir & Blanc"
            />
            <TestimonialCard
              quote="Professionnalisme, créativité et bienveillance. Melody est une photographe passionnée qui sublime chaque instant. Merci pour ces souvenirs précieux."
              author="Emma R."
              session="Séance Lifestyle"
            />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">Prête à capturer vos plus beaux moments ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Réservez dès maintenant votre séance photo et offrez-vous une expérience unique
          </p>
          <Link href="/booking" className="inline-block bg-white text-primary-600 px-10 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors">
            Réserver ma séance photo
          </Link>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Melody Floc\'h Photography',
          description:
            'Melody Floc\'h, photographe spécialisée en portraits artistiques, noir & blanc et photographie lifestyle',
            url: process.env.APP_URL || 'http://localhost:3000',
            telephone: '',
            priceRange: '€€',
            image: `${process.env.APP_URL || 'http://localhost:3000'}/og-image.jpg`,
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'FR',
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '10:00',
                closes: '16:00',
              },
            ],
            sameAs: [],
          }),
        }}
      />
    </>
  )
}

