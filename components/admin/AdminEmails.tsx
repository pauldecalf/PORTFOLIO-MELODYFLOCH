'use client'

import { useState } from 'react'
import { EmailLog, Booking } from '@/lib/types'
import { sendAdminEmail } from '@/app/actions/admin'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

type BookingWithSessionType = Booking & {
  sessionType: { name: string }
}

interface AdminEmailsProps {
  upcomingBookings: BookingWithSessionType[]
  emailLogs: EmailLog[]
}

export default function AdminEmails({ upcomingBookings, emailLogs }: AdminEmailsProps) {
  const [isSending, setIsSending] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<string>('')

  async function handleSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSending(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await sendAdminEmail(formData)

      if (result.success) {
        setMessage({ type: 'success', text: 'Email envoyé avec succès !' })
        // Réinitialiser le formulaire
        e.currentTarget.reset()
        setTimeout(() => window.location.reload(), 2000)
      } else {
        setMessage({ type: 'error', text: result.error || 'Erreur lors de l\'envoi' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Une erreur est survenue' })
    } finally {
      setIsSending(false)
    }
  }

  function fillFromBooking(bookingId: string) {
    const booking = upcomingBookings.find((b) => b.id === bookingId)
    if (booking) {
      const recipientInput = document.getElementById('recipient') as HTMLInputElement
      const subjectInput = document.getElementById('subject') as HTMLInputElement
      
      recipientInput.value = booking.clientEmail
      subjectInput.value = `Votre séance photo - ${booking.sessionType.name}`
      setSelectedBooking(bookingId)
    }
  }

  const templates = [
    {
      name: 'Rappel séance',
      subject: 'Rappel : Votre séance photo approche',
      content: `Bonjour,\n\nJe vous rappelle que votre séance photo est prévue prochainement.\n\nN'hésitez pas à me contacter si vous avez des questions.\n\nÀ très bientôt,\nMelody Floc'h`,
    },
    {
      name: 'Photos prêtes',
      subject: 'Vos photos sont prêtes !',
      content: `Bonjour,\n\nBonne nouvelle ! Vos photos sont prêtes et disponibles dans votre galerie privée.\n\nJe vous envoie le lien par email séparé.\n\nCordialement,\nMelody Floc'h`,
    },
    {
      name: 'Demande d\'avis',
      subject: 'Votre avis nous intéresse',
      content: `Bonjour,\n\nJ'espère que vous êtes satisfait(e) de votre séance photo !\n\nSi vous avez quelques minutes, votre avis serait très précieux pour moi.\n\nMerci pour votre confiance,\nMelody Floc'h`,
    },
  ]

  const applyTemplate = (template: typeof templates[0]) => {
    const subjectInput = document.getElementById('subject') as HTMLInputElement
    const contentInput = document.getElementById('content') as HTMLTextAreaElement
    
    if (subjectInput) subjectInput.value = template.subject
    if (contentInput) contentInput.value = template.content
  }

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold mb-6">Envoi d&apos;Emails</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulaire d'envoi */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Composer un email</h3>

          <form onSubmit={handleSend} className="space-y-4">
            {/* Sélection rapide depuis réservations */}
            {upcomingBookings.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ou sélectionner un client
                </label>
                <select
                  className="input-field"
                  onChange={(e) => fillFromBooking(e.target.value)}
                  defaultValue=""
                >
                  <option value="">-- Choisir une réservation --</option>
                  {upcomingBookings.map((booking) => (
                    <option key={booking.id} value={booking.id}>
                      {booking.clientName} - {format(new Date(booking.date), 'd MMM', { locale: fr })}
                    </option>
                  ))}
                </select>
                {selectedBooking && <input type="hidden" name="bookingId" value={selectedBooking} />}
              </div>
            )}

            <div>
              <label htmlFor="recipient" className="block text-sm font-medium mb-2">
                Destinataire *
              </label>
              <input
                type="email"
                id="recipient"
                name="recipient"
                placeholder="email@example.com"
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Sujet *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Sujet de l'email"
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Message *
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="Votre message..."
                rows={8}
                className="input-field resize-none"
                required
              />
            </div>

            {/* Templates rapides */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Templates rapides
              </label>
              <div className="flex flex-wrap gap-2">
                {templates.map((template, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => applyTemplate(template)}
                    className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    {template.name}
                  </button>
                ))}
              </div>
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
              disabled={isSending}
              className="w-full btn-primary disabled:opacity-50"
            >
              {isSending ? 'Envoi en cours...' : 'Envoyer l\'email'}
            </button>
          </form>
        </div>

        {/* Historique des emails */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Historique ({emailLogs.length})</h3>

          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {emailLogs.length === 0 ? (
              <p className="text-gray-500 text-sm">Aucun email envoyé</p>
            ) : (
              emailLogs.map((log) => (
                <div
                  key={log.id}
                  className={`border rounded-lg p-4 ${
                    log.status === 'sent'
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-sm">{log.subject}</p>
                      <p className="text-xs text-gray-600">À : {log.recipient}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        log.status === 'sent'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {log.status === 'sent' ? 'Envoyé' : 'Échoué'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {format(new Date(log.sentAt), 'dd/MM/yyyy à HH:mm', { locale: fr })}
                  </p>
                  <details className="mt-2">
                    <summary className="text-xs text-gray-600 cursor-pointer hover:text-gray-800">
                      Voir le contenu
                    </summary>
                    <p className="text-xs text-gray-700 mt-2 whitespace-pre-line">
                      {log.content}
                    </p>
                  </details>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Conseils</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Utilisez les templates pour gagner du temps</li>
          <li>• Personnalisez toujours le message pour chaque client</li>
          <li>• Les emails sont automatiquement enregistrés dans l&apos;historique</li>
          <li>• Vous pouvez lier un email à une réservation spécifique</li>
        </ul>
      </div>
    </div>
  )
}

