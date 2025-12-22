'use client'

import { useState } from 'react'
import { BookingData } from '../BookingWizard'

interface BookingStepInfoProps {
  bookingData: BookingData
  onSubmit: (data: Partial<BookingData>) => void
  onBack: () => void
}

export default function BookingStepInfo({
  bookingData,
  onSubmit,
  onBack,
}: BookingStepInfoProps) {
  const [formData, setFormData] = useState({
    clientName: bookingData.clientName || '',
    clientEmail: bookingData.clientEmail || '',
    clientPhone: bookingData.clientPhone || '',
    message: bookingData.message || '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.clientName || formData.clientName.length < 2) {
      newErrors.clientName = 'Le nom doit contenir au moins 2 caractères'
    }

    if (!formData.clientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Email invalide'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validate()) {
      onSubmit(formData)
    }
  }

  return (
    <div>
      <h2 className="heading-md mb-4">Vos informations</h2>
      <p className="text-gray-600 mb-8">
        Complétez vos coordonnées pour finaliser la réservation
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            id="clientName"
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            className={`input-field ${errors.clientName ? 'border-red-500' : ''}`}
            placeholder="Prénom Nom"
          />
          {errors.clientName && (
            <p className="mt-1 text-sm text-red-600">{errors.clientName}</p>
          )}
        </div>

        <div>
          <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="clientEmail"
            value={formData.clientEmail}
            onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
            className={`input-field ${errors.clientEmail ? 'border-red-500' : ''}`}
            placeholder="votre@email.com"
          />
          {errors.clientEmail && (
            <p className="mt-1 text-sm text-red-600">{errors.clientEmail}</p>
          )}
        </div>

        <div>
          <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone (optionnel)
          </label>
          <input
            type="tel"
            id="clientPhone"
            value={formData.clientPhone}
            onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
            className="input-field"
            placeholder="06 12 34 56 78"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message (optionnel)
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            className="input-field resize-none"
            placeholder="Parlez-nous de vos envies, de votre projet photo..."
          />
        </div>

        <div className="bg-primary-50 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Note :</strong> Vous recevrez un email de confirmation avec tous les détails 
            de votre réservation. Si vous avez des questions, n'hésitez pas à les inclure dans le message.
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <button type="button" onClick={onBack} className="btn-secondary">
            ← Retour
          </button>
          <button type="submit" className="btn-primary">
            Continuer →
          </button>
        </div>
      </form>
    </div>
  )
}

