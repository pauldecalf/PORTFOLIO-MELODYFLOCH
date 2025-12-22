import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-50 border-t border-primary-100">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-primary-700 mb-4">
              Melody Floc'h
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Photographe spécialisée en portraits artistiques et photographie lifestyle.
              Capturer l'authenticité et la beauté de chaque instant.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-primary-700 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/portfolio"
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Réserver
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-primary-700 mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                Email:{' '}
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'contact@melodyphotography.fr'}`}
                  className="hover:text-primary-600 transition-colors"
                >
                  contact@melodyphotography.fr
                </a>
              </li>
              <li className="text-sm text-gray-600">
                <Link
                  href="/booking"
                  className="inline-block mt-4 btn-primary text-sm py-2 px-6"
                >
                  Réserver une séance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {currentYear} Melody Floc'h. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/mentions-legales"
                className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
              >
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

