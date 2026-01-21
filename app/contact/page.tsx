import { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact - Photographe Les Essarts-le-Roi 78690',
  description:
    'Contactez Melody Floc\'h, photographe aux Essarts-le-Roi (78690). Réservez votre séance photo portrait ou lifestyle dans les Yvelines. Studio photo à Rambouillet, déplacement à domicile dans le 78.',
  openGraph: {
    title: 'Contact | Melody Floc\'h - Photographe Yvelines',
    description:
      'Contactez Melody Floc\'h pour une séance photo dans les Yvelines. Studio aux Essarts-le-Roi.',
  },
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        description="Une question ? Un projet photo ? Je serais ravi d'échanger avec vous"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Informations de contact */}
            <div>
              <h2 className="heading-md mb-6">Parlons de votre projet</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Vous souhaitez <strong>réserver une séance photo</strong>, obtenir plus d'informations 
                sur mes services, ou simplement discuter de votre projet ? N'hésitez pas à me contacter, 
                je réponds généralement sous 24h.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Studio photo</h3>
                    <p className="text-gray-600">
                      Les Essarts-le-Roi<br />
                      78690, Yvelines<br />
                      <span className="text-sm text-gray-500">
                        Secteur : Rambouillet, Saint-Arnoult, Le Perray-en-Yvelines
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:contact@melodyphotography.fr"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      contact@melodyphotography.fr
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Disponibilité</h3>
                    <p className="text-gray-600">
                      Du mardi au vendredi : 9h - 18h<br />
                      Samedi : 10h - 16h<br />
                      <span className="text-sm text-gray-500">
                        Déplacement possible dans les Yvelines
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Réservation rapide</h3>
                    <p className="text-gray-600 mb-2">
                      Réservez directement votre créneau en ligne
                    </p>
                    <Link href="/booking" className="text-primary-600 hover:text-primary-700 font-medium">
                      Accéder au système de réservation →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Délai de réponse</h3>
                <p className="text-sm text-gray-600">
                  Je m'efforce de répondre à tous les messages dans les <strong>24 heures</strong>. 
                  Si vous n'avez pas de réponse sous 48h, vérifiez vos spams ou renvoyez-moi un message.
                </p>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div>
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-serif font-semibold mb-6">Envoyez-moi un message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-50">
        <div className="container-custom text-center">
          <h2 className="heading-md mb-6">Ou réservez directement votre séance</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Vous savez déjà quelle formule vous intéresse ? Gagnez du temps en réservant 
            directement votre créneau en ligne.
          </p>
          <Link href="/booking" className="btn-primary">
            Réserver une séance photo
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Melody Floc\'h',
          description:
            'Contactez Melody Floc\'h pour réserver une séance photo ou poser vos questions',
            url: `${process.env.APP_URL || 'http://localhost:3000'}/contact`,
          }),
        }}
      />
    </>
  )
}

