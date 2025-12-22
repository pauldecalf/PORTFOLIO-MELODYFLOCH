'use client'

import { useState } from 'react'
import { submitContactForm } from '@/app/actions/contact'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setMessage({
          type: 'success',
          text: 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.',
        })
        // Réinitialiser le formulaire
        const form = document.getElementById('contact-form') as HTMLFormElement
        form?.reset()
      } else {
        setMessage({
          type: 'error',
          text: result.error || 'Une erreur est survenue. Veuillez réessayer.',
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Une erreur est survenue. Veuillez réessayer.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nom complet *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="input-field"
          placeholder="Votre nom"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="input-field"
          placeholder="votre@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Téléphone (optionnel)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="input-field"
          placeholder="06 12 34 56 78"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="input-field resize-none"
          placeholder="Décrivez votre projet, vos envies, ou posez-moi vos questions..."
        />
      </div>

      {message && (
        <div
          className={`p-4 rounded-md ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        En soumettant ce formulaire, vous acceptez d'être contacté par email ou téléphone 
        concernant votre demande.
      </p>
    </form>
  )
}

