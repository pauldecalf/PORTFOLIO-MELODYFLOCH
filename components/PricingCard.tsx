import Link from 'next/link'

interface PricingCardProps {
  name: string
  price: number
  duration: number
  description: string
  features: string[]
  highlighted?: boolean
}

export default function PricingCard({
  name,
  price,
  duration,
  description,
  features,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-8 ${
        highlighted
          ? 'bg-primary-600 text-white shadow-xl ring-2 ring-primary-600'
          : 'bg-white shadow-sm border border-gray-200'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-yellow-400 text-primary-900 text-sm font-semibold px-4 py-1 rounded-full">
            Le plus populaire
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className={`text-2xl font-serif font-bold mb-2 ${highlighted ? 'text-white' : 'text-gray-900'}`}>
          {name}
        </h3>
        <div className="flex items-baseline justify-center gap-2">
          <span className={`text-5xl font-bold ${highlighted ? 'text-white' : 'text-primary-600'}`}>
            {price}€
          </span>
        </div>
        <p className={`mt-2 text-sm ${highlighted ? 'text-white/90' : 'text-gray-500'}`}>
          {duration} minutes
        </p>
      </div>

      <p className={`text-center mb-6 ${highlighted ? 'text-white/90' : 'text-gray-600'}`}>
        {description}
      </p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className={`flex-shrink-0 w-5 h-5 mr-3 mt-0.5 ${
                highlighted ? 'text-white' : 'text-primary-600'
              }`}
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
            <span className={highlighted ? 'text-white/90' : 'text-gray-600'}>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/booking"
        className={`block w-full text-center py-3 px-6 rounded-md font-medium transition-colors ${
          highlighted
            ? 'bg-white text-primary-600 hover:bg-gray-100'
            : 'bg-primary-600 text-white hover:bg-primary-700'
        }`}
      >
        Réserver
      </Link>
    </div>
  )
}

