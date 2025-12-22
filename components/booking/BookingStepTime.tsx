'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface TimeSlot {
  startTime: string
  endTime: string
  available: boolean
}

interface BookingStepTimeProps {
  sessionTypeId: string
  date: Date
  selectedTime: string
  onSelectTime: (startTime: string, endTime: string) => void
  onBack: () => void
}

export default function BookingStepTime({
  sessionTypeId,
  date,
  selectedTime,
  onSelectTime,
  onBack,
}: BookingStepTimeProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchSlots() {
      setIsLoading(true)
      try {
        const response = await fetch(
          `/api/booking/available-slots?sessionTypeId=${sessionTypeId}&date=${date.toISOString()}`
        )
        const data = await response.json()
        
        if (data.slots) {
          setSlots(data.slots)
        }
      } catch (error) {
        console.error('Erreur chargement créneaux:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSlots()
  }, [sessionTypeId, date])

  const availableSlots = slots.filter((slot) => slot.available)

  return (
    <div>
      <h2 className="heading-md mb-4">Choisissez votre horaire</h2>
      <p className="text-gray-600 mb-2">
        Date sélectionnée : <strong>{format(date, 'EEEE d MMMM yyyy', { locale: fr })}</strong>
      </p>
      <p className="text-gray-600 mb-8">Sélectionnez le créneau horaire qui vous convient</p>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Chargement des créneaux...</p>
        </div>
      ) : availableSlots.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg text-gray-600 mb-2">Aucun créneau disponible</p>
          <p className="text-sm text-gray-500">
            Malheureusement, tous les créneaux sont réservés pour cette date. 
            Veuillez choisir une autre date.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {availableSlots.map((slot) => (
            <button
              key={slot.startTime}
              onClick={() => onSelectTime(slot.startTime, slot.endTime)}
              className={`p-4 rounded-lg border-2 text-center transition-all hover:shadow-md ${
                selectedTime === slot.startTime
                  ? 'border-primary-600 bg-primary-50 shadow-lg'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              <div className="font-semibold text-lg">{slot.startTime}</div>
              <div className="text-xs text-gray-500 mt-1">→ {slot.endTime}</div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="btn-secondary">
          ← Retour
        </button>
      </div>
    </div>
  )
}

