'use client'

import { useState, useEffect } from 'react'
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isAfter, startOfDay } from 'date-fns'
import { fr } from 'date-fns/locale'

interface BookingStepDateProps {
  sessionTypeId: string
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
  onBack: () => void
}

export default function BookingStepDate({
  sessionTypeId,
  selectedDate,
  onSelectDate,
  onBack,
}: BookingStepDateProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [availableDates, setAvailableDates] = useState<Date[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAvailableDates() {
      setIsLoading(true)
      try {
        const start = startOfMonth(currentMonth)
        const end = endOfMonth(addMonths(currentMonth, 1))
        
        const response = await fetch(
          `/api/booking/available-dates?start=${start.toISOString()}&end=${end.toISOString()}`
        )
        const data = await response.json()
        
        if (data.dates) {
          setAvailableDates(data.dates.map((d: string) => new Date(d)))
        }
      } catch (error) {
        console.error('Erreur chargement dates:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailableDates()
  }, [currentMonth])

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const isDateAvailable = (date: Date) => {
    return availableDates.some((availableDate) => isSameDay(availableDate, date))
  }

  const isPastDate = (date: Date) => {
    return !isAfter(startOfDay(date), startOfDay(new Date())) && !isSameDay(date, new Date())
  }

  return (
    <div>
      <h2 className="heading-md mb-4">Sélectionnez une date</h2>
      <p className="text-gray-600 mb-8">Choisissez le jour de votre séance photo</p>

      {/* Navigation mois */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Mois précédent"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h3 className="text-xl font-serif font-semibold">
          {format(currentMonth, 'MMMM yyyy', { locale: fr })}
        </h3>

        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Mois suivant"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Calendrier */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Chargement des disponibilités...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {/* Espaces vides avant le 1er jour du mois */}
            {Array.from({ length: (startOfMonth(currentMonth).getDay() + 6) % 7 }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Jours du mois */}
            {days.map((day) => {
              const isAvailable = isDateAvailable(day)
              const isPast = isPastDate(day)
              const isSelected = selectedDate && isSameDay(day, selectedDate)
              const isCurrentMonth = isSameMonth(day, currentMonth)

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => isAvailable && !isPast && onSelectDate(day)}
                  disabled={!isAvailable || isPast || !isCurrentMonth}
                  className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-primary-600 text-white shadow-lg'
                      : isAvailable && !isPast && isCurrentMonth
                      ? 'bg-white border-2 border-primary-200 text-gray-900 hover:border-primary-400 hover:shadow-md'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {format(day, 'd')}
                </button>
              )
            })}
          </div>

          <div className="mt-6 flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-600">
              Les dates disponibles sont affichées avec une bordure colorée. Sélectionnez une date pour voir les créneaux horaires disponibles.
            </p>
          </div>
        </>
      )}

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="btn-secondary">
          ← Retour
        </button>
      </div>
    </div>
  )
}

