'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { BookingData } from '../BookingWizard'
import { createBooking } from '@/app/actions/booking'

interface BookingStepConfirmationProps {
  bookingData: BookingData
  onBack: () => void
}

export default function BookingStepConfirmation({
  bookingData,
  onBack,
}: BookingStepConfirmationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await createBooking({
        sessionTypeId: bookingData.sessionTypeId,
        date: bookingData.date!.toISOString(),
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        clientName: bookingData.clientName,
        clientEmail: bookingData.clientEmail,
        clientPhone: bookingData.clientPhone,
        message: bookingData.message,
      })

      if (result.success) {
        setIsSuccess(true)
      } else {
        setError(result.error || 'Une erreur est survenue')
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la réservation')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
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
        </div>

        <h2 className="heading-md mb-4 text-green-900">Réservation confirmée !</h2>
        
        <p className="text-lg text-gray-700 mb-6">
          Votre séance photo a été réservée avec succès.
        </p>

        <div className="bg-green-50 rounded-lg p-6 max-w-md mx-auto mb-8 text-left">
          <h3 className="font-semibold mb-4 text-green-900">Récapitulatif de votre réservation</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-600">Type de séance :</span>
              <span className="block font-medium text-gray-900">{bookingData.sessionType?.name}</span>
            </div>
            <div>
              <span className="text-gray-600">Date :</span>
              <span className="block font-medium text-gray-900">
                {format(bookingData.date!, 'EEEE d MMMM yyyy', { locale: fr })}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Horaire :</span>
              <span className="block font-medium text-gray-900">
                {bookingData.startTime} - {bookingData.endTime}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <p className="text-gray-600">
            Un email de confirmation a été envoyé à <strong>{bookingData.clientEmail}</strong> 
            avec tous les détails de votre séance.
          </p>
          
          <p className="text-gray-600">
            Si vous avez des questions, n'hésitez pas à me contacter.
          </p>

          <div className="pt-4">
            <a href="/" className="btn-primary inline-block">
              Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="heading-md mb-4">Confirmation de votre réservation</h2>
      <p className="text-gray-600 mb-8">
        Vérifiez les informations avant de confirmer votre réservation
      </p>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-sm text-gray-500 mb-2">TYPE DE SÉANCE</h3>
            <p className="text-lg font-medium">{bookingData.sessionType?.name}</p>
            <p className="text-sm text-gray-600">
              {bookingData.sessionType?.duration} minutes • {bookingData.sessionType?.price}€
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-500 mb-2">DATE & HORAIRE</h3>
            <p className="text-lg font-medium">
              {format(bookingData.date!, 'EEEE d MMMM yyyy', { locale: fr })}
            </p>
            <p className="text-sm text-gray-600">
              De {bookingData.startTime} à {bookingData.endTime}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-500 mb-2">VOS COORDONNÉES</h3>
            <p className="text-lg font-medium">{bookingData.clientName}</p>
            <p className="text-sm text-gray-600">{bookingData.clientEmail}</p>
            {bookingData.clientPhone && (
              <p className="text-sm text-gray-600">{bookingData.clientPhone}</p>
            )}
          </div>

          {bookingData.message && (
            <div>
              <h3 className="font-semibold text-sm text-gray-500 mb-2">VOTRE MESSAGE</h3>
              <p className="text-sm text-gray-700">{bookingData.message}</p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="bg-primary-50 rounded-lg p-6 mb-8">
        <h3 className="font-semibold mb-3">Conditions de réservation</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li className="flex items-start">
            <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Vous recevrez un email de confirmation immédiatement
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Possibilité d'annulation ou de modification jusqu'à 48h avant la séance
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Le paiement s'effectue le jour de la séance
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="btn-secondary disabled:opacity-50 !text-sm sm:!text-base px-4 sm:px-8 py-2 sm:py-3"
        >
          ← Modifier
        </button>
        <button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed !text-sm sm:!text-base px-4 sm:px-8 py-2 sm:py-3"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white inline" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Confirmation...
            </>
          ) : (
            <>
              <span className="hidden sm:inline">Confirmer la réservation</span>
              <span className="sm:hidden">Confirmer</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

