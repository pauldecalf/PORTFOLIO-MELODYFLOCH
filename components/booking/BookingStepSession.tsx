import { SessionType } from '@prisma/client'

interface BookingStepSessionProps {
  sessionTypes: SessionType[]
  selectedId: string
  onSelect: (sessionType: SessionType) => void
}

export default function BookingStepSession({
  sessionTypes,
  selectedId,
  onSelect,
}: BookingStepSessionProps) {
  return (
    <div>
      <h2 className="heading-md mb-4">Choisissez votre type de séance</h2>
      <p className="text-gray-600 mb-8">
        Sélectionnez la formule qui correspond le mieux à vos envies
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sessionTypes.map((session) => (
          <button
            key={session.id}
            onClick={() => onSelect(session)}
            className={`text-left p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
              selectedId === session.id
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <h3 className="text-xl font-serif font-semibold mb-2">{session.name}</h3>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-bold text-primary-600">{session.price}€</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{session.duration} minutes</p>
            <p className="text-gray-700 text-sm leading-relaxed">{session.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

