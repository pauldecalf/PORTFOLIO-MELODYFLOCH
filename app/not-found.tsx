import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-serif font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-2xl font-serif font-semibold mb-4">Page non trouvée</h2>
        <p className="text-gray-600 mb-8">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <Link href="/" className="btn-primary">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}

