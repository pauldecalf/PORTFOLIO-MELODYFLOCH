'use client'

import { useState, useEffect } from 'react'
import { Booking, SessionType, WeeklyAvailability, BlockedDate, SiteImage, EmailLog, GalleryImage } from '@prisma/client'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { logoutAdmin, cancelBooking, deleteBooking, createBlockedDate, deleteBlockedDate, updateBookingStatus } from '@/app/actions/admin'
import AdminImages from './AdminImages'
import AdminEmails from './AdminEmails'
import AdminGalleries from './AdminGalleries'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'

type BookingWithSessionType = Booking & {
  sessionType: SessionType
}

interface AdminDashboardProps {
  bookings: BookingWithSessionType[]
  sessionTypes: SessionType[]
  weeklyAvailabilities: WeeklyAvailability[]
  blockedDates: BlockedDate[]
  siteImages: SiteImage[]
  emailLogs: EmailLog[]
  galleryImages: GalleryImage[]
}

const BOOKING_STATUSES = [
  { value: 'PENDING', label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'CONFIRMED', label: 'Confirmée', color: 'bg-blue-100 text-blue-800' },
  { value: 'CONTACTED', label: 'Contacté', color: 'bg-purple-100 text-purple-800' },
  { value: 'PAID', label: 'Payée', color: 'bg-green-100 text-green-800' },
  { value: 'COMPLETED', label: 'Terminée', color: 'bg-gray-100 text-gray-800' },
  { value: 'CANCELLED', label: 'Annulée', color: 'bg-red-100 text-red-800' },
]

export default function AdminDashboard({
  bookings,
  sessionTypes,
  weeklyAvailabilities,
  blockedDates,
  siteImages,
  emailLogs,
  galleryImages,
}: AdminDashboardProps) {
  const [newBlockedDate, setNewBlockedDate] = useState('')
  const [newBlockedReason, setNewBlockedReason] = useState('')
  const [activeTab, setActiveTab] = useState('bookings')
  const [statusChangeModal, setStatusChangeModal] = useState<{
    bookingId: string
    newStatus: string
  } | null>(null)
  const [internalNotes, setInternalNotes] = useState('')

  // Restaurer l'onglet actif depuis l'URL hash au chargement
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '')
      if (hash && ['bookings', 'images', 'emails', 'galleries', 'blocked'].includes(hash)) {
        setActiveTab(hash)
      }
    }
  }, [])

  // Mettre à jour l'URL hash quand l'onglet change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (typeof window !== 'undefined') {
      window.location.hash = value
    }
  }

  const now = new Date()
  const upcomingBookings = bookings.filter(
    (b) => b.status !== 'CANCELLED' && b.status !== 'COMPLETED' && new Date(b.date) >= now
  )
  const pastBookings = bookings.filter(
    (b) => (b.status === 'COMPLETED' || new Date(b.date) < now) && b.status !== 'CANCELLED'
  )
  const cancelledBookings = bookings.filter((b) => b.status === 'CANCELLED')
  
  function handleStatusChange(bookingId: string, newStatus: string) {
    setStatusChangeModal({ bookingId, newStatus })
    setInternalNotes('')
  }

  async function confirmStatusChange() {
    if (!statusChangeModal) return

    const result = await updateBookingStatus(
      statusChangeModal.bookingId,
      statusChangeModal.newStatus,
      internalNotes.trim() || undefined
    )
    
    if (result.success) {
      setStatusChangeModal(null)
      setInternalNotes('')
      window.location.reload()
    } else {
      alert(result.error)
    }
  }

  function cancelStatusChange() {
    setStatusChangeModal(null)
    setInternalNotes('')
  }

  async function handleLogout() {
    await logoutAdmin()
  }

  async function handleCancelBooking(bookingId: string) {
    if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      const result = await cancelBooking(bookingId)
      if (result.success) {
        window.location.reload()
      } else {
        alert(result.error)
      }
    }
  }

  async function handleDeleteBooking(bookingId: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer définitivement cette réservation ?')) {
      const result = await deleteBooking(bookingId)
      if (result.success) {
        window.location.reload()
      } else {
        alert(result.error)
      }
    }
  }

  async function handleAddBlockedDate(e: React.FormEvent) {
    e.preventDefault()
    if (!newBlockedDate) return

    const result = await createBlockedDate(newBlockedDate, newBlockedReason)
    if (result.success) {
      setNewBlockedDate('')
      setNewBlockedReason('')
      window.location.reload()
    } else {
      alert(result.error)
    }
  }

  async function handleDeleteBlockedDate(id: string) {
    if (confirm('Supprimer cette date bloquée ?')) {
      const result = await deleteBlockedDate(id)
      if (result.success) {
        window.location.reload()
      } else {
        alert(result.error)
      }
    }
  }

  const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-serif font-bold">Administration</h1>
            <div className="flex gap-4">
              <a href="/" className="text-sm text-gray-600 hover:text-primary-600">
                ← Retour au site
              </a>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-red-600"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">À venir</p>
                  <p className="text-3xl font-bold text-primary-600">{upcomingBookings.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Terminées</p>
                  <p className="text-3xl font-bold text-green-600">{pastBookings.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Annulées</p>
                  <p className="text-3xl font-bold text-red-600">{cancelledBookings.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-2xl">❌</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Images</p>
                  <p className="text-3xl font-bold text-blue-600">{siteImages.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl">🖼️</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Emails</p>
                  <p className="text-3xl font-bold text-purple-600">{emailLogs.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-2xl">✉️</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <Card className="overflow-hidden">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="bg-gray-50 w-full flex-col md:flex-row border-b border-gray-200 rounded-none p-0 h-auto">
              <TabsTrigger 
                value="bookings" 
                className="w-full md:w-auto rounded-none py-3 md:py-4 px-4 md:px-6 data-[state=active]:bg-white data-[state=active]:border-l-4 md:data-[state=active]:border-l-0 data-[state=active]:border-b-0 md:data-[state=active]:border-b-2 data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 data-[state=active]:shadow-sm font-medium justify-start md:justify-center"
              >
                <span className="mr-2">📅</span>
                Réservations
              </TabsTrigger>
              <TabsTrigger 
                value="images" 
                className="w-full md:w-auto rounded-none py-3 md:py-4 px-4 md:px-6 data-[state=active]:bg-white data-[state=active]:border-l-4 md:data-[state=active]:border-l-0 data-[state=active]:border-b-0 md:data-[state=active]:border-b-2 data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 data-[state=active]:shadow-sm font-medium justify-start md:justify-center"
              >
                <span className="mr-2">🖼️</span>
                Images
              </TabsTrigger>
              <TabsTrigger 
                value="emails" 
                className="w-full md:w-auto rounded-none py-3 md:py-4 px-4 md:px-6 data-[state=active]:bg-white data-[state=active]:border-l-4 md:data-[state=active]:border-l-0 data-[state=active]:border-b-0 md:data-[state=active]:border-b-2 data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 data-[state=active]:shadow-sm font-medium justify-start md:justify-center"
              >
                <span className="mr-2">✉️</span>
                Emails
              </TabsTrigger>
              <TabsTrigger 
                value="galleries" 
                className="w-full md:w-auto rounded-none py-3 md:py-4 px-4 md:px-6 data-[state=active]:bg-white data-[state=active]:border-l-4 md:data-[state=active]:border-l-0 data-[state=active]:border-b-0 md:data-[state=active]:border-b-2 data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 data-[state=active]:shadow-sm font-medium justify-start md:justify-center"
              >
                <span className="mr-2">📸</span>
                Galeries
              </TabsTrigger>
              <TabsTrigger 
                value="blocked" 
                className="w-full md:w-auto rounded-none py-3 md:py-4 px-4 md:px-6 data-[state=active]:bg-white data-[state=active]:border-l-4 md:data-[state=active]:border-l-0 data-[state=active]:border-b-0 md:data-[state=active]:border-b-2 data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 data-[state=active]:shadow-sm font-medium justify-start md:justify-center"
              >
                <span className="mr-2">🚫</span>
                Disponibilités
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="p-6">
              <div className="space-y-8">
                {/* Réservations à venir */}
                <div>
                  <h2 className="text-xl font-serif font-semibold mb-4">
                    Réservations à venir ({upcomingBookings.length})
                  </h2>
                  {upcomingBookings.length === 0 ? (
                    <p className="text-gray-500">Aucune réservation à venir</p>
                  ) : (
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => {
                        const statusInfo = BOOKING_STATUSES.find(s => s.value === booking.status) || BOOKING_STATUSES[0]
                        return (
                        <div
                          key={booking.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <h3 className="font-semibold text-lg">{booking.clientName}</h3>
                                <select
                                  value={booking.status}
                                  onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                  className={`text-sm px-3 py-1 rounded font-medium ${statusInfo.color}`}
                                >
                                  {BOOKING_STATUSES.map(status => (
                                    <option key={status.value} value={status.value}>
                                      {status.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                                <div>
                                  <strong>Séance :</strong> {booking.sessionType.name}
                                </div>
                                <div>
                                  <strong>Date :</strong>{' '}
                                  {format(new Date(booking.date), 'EEEE d MMMM yyyy', { locale: fr })}
                                </div>
                                <div>
                                  <strong>Horaire :</strong> {booking.startTime} - {booking.endTime}
                                </div>
                                <div>
                                  <strong>Email :</strong> {booking.clientEmail}
                                </div>
                                {booking.clientPhone && (
                                  <div>
                                    <strong>Tél :</strong> {booking.clientPhone}
                                  </div>
                                )}
                              </div>
                              {booking.message && (
                                <div className="mt-2 p-3 bg-gray-50 rounded text-sm">
                                  <strong>Message :</strong> {booking.message}
                                </div>
                              )}
                              {booking.internalNotes && (
                                <div className="mt-2 p-3 bg-yellow-50 rounded text-sm border-l-4 border-yellow-400">
                                  <strong>Notes internes :</strong> {booking.internalNotes}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="ml-4 px-4 py-2 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                      )})}
                    </div>
                  )}
                </div>

                {/* Réservations passées */}
                <div>
                  <h2 className="text-xl font-serif font-semibold mb-4">
                    Réservations passées ({pastBookings.length})
                  </h2>
                  {pastBookings.length === 0 ? (
                    <p className="text-gray-500">Aucune réservation passée</p>
                  ) : (
                    <div className="space-y-4">
                      {pastBookings.slice(0, 10).map((booking) => (
                        <div
                          key={booking.id}
                          className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{booking.clientName}</h3>
                              <div className="text-sm text-gray-600">
                                {booking.sessionType.name} •{' '}
                                {format(new Date(booking.date), 'd MMM yyyy', { locale: fr })} •{' '}
                                {booking.startTime}
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="text-sm text-gray-400 hover:text-red-600"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Réservations annulées */}
                {cancelledBookings.length > 0 && (
                  <div>
                    <h2 className="text-xl font-serif font-semibold mb-4">
                      Réservations annulées ({cancelledBookings.length})
                    </h2>
                    <div className="space-y-4">
                      {cancelledBookings.slice(0, 5).map((booking) => (
                        <div
                          key={booking.id}
                          className="border border-red-200 rounded-lg p-4 bg-red-50"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{booking.clientName}</h3>
                              <div className="text-sm text-gray-600">
                                {booking.sessionType.name} •{' '}
                                {format(new Date(booking.date), 'd MMM yyyy', { locale: fr })} •{' '}
                                {booking.startTime}
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="text-sm text-gray-400 hover:text-red-600"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                </div>
            </TabsContent>

            <TabsContent value="images" className="p-6">
              <AdminImages images={siteImages} />
            </TabsContent>

            <TabsContent value="emails" className="p-6">
              <AdminEmails upcomingBookings={upcomingBookings} emailLogs={emailLogs} />
            </TabsContent>

            <TabsContent value="galleries" className="p-6">
              <AdminGalleries images={galleryImages} />
            </TabsContent>

            <TabsContent value="blocked" className="p-6">
              <div className="space-y-8">
                {/* Ajouter une date bloquée */}
                <div>
                  <h2 className="text-xl font-serif font-semibold mb-4">Ajouter une date bloquée</h2>
                  <form onSubmit={handleAddBlockedDate} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <Label htmlFor="blocked-date" className="block text-sm font-medium mb-2">
                          Date *
                        </Label>
                        <input
                          id="blocked-date"
                          type="date"
                          value={newBlockedDate}
                          onChange={(e) => setNewBlockedDate(e.target.value)}
                          className="input-field w-full"
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="blocked-reason" className="block text-sm font-medium mb-2">
                          Raison (optionnelle)
                        </Label>
                        <input
                          id="blocked-reason"
                          type="text"
                          value={newBlockedReason}
                          onChange={(e) => setNewBlockedReason(e.target.value)}
                          placeholder="Ex: Vacances, Maintenance..."
                          className="input-field w-full"
                        />
                      </div>
                      <div className="flex items-end">
                        <button type="submit" className="btn-primary whitespace-nowrap w-full sm:w-auto">
                          Ajouter
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Liste des dates bloquées */}
                <div>
                  <h2 className="text-xl font-serif font-semibold mb-4">
                    Dates bloquées ({blockedDates.length})
                  </h2>
                  {blockedDates.length === 0 ? (
                    <p className="text-gray-500">Aucune date bloquée</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {blockedDates.map((blocked) => (
                        <div
                          key={blocked.id}
                          className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                        >
                          <div>
                            <div className="font-semibold">
                              {format(new Date(blocked.date), 'EEEE d MMMM yyyy', { locale: fr })}
                            </div>
                            {blocked.reason && (
                              <div className="text-sm text-gray-600">{blocked.reason}</div>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeleteBlockedDate(blocked.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Supprimer
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Disponibilités hebdomadaires */}
                <div>
                  <h2 className="text-xl font-serif font-semibold mb-4">Disponibilités hebdomadaires</h2>
                  <div className="space-y-2">
                    {weeklyAvailabilities.map((avail) => (
                      <div
                        key={avail.id}
                        className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                      >
                        <div>
                          <strong>{dayNames[avail.dayOfWeek]}</strong> : {avail.startTime} -{' '}
                          {avail.endTime}
                        </div>
                        <span
                          className={`text-sm px-3 py-1 rounded ${
                            avail.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {avail.isActive ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    Pour modifier les disponibilités, modifiez directement la base de données ou le seed.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* Modale de changement de statut */}
      {statusChangeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={cancelStatusChange}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-serif font-semibold mb-4">
              Changer le statut de la réservation
            </h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Nouveau statut :{' '}
                <span className="font-semibold">
                  {BOOKING_STATUSES.find(s => s.value === statusChangeModal.newStatus)?.label}
                </span>
              </p>
            </div>

            <div className="mb-6">
              <Label htmlFor="internalNotes" className="block mb-2">
                Notes internes (optionnel)
              </Label>
              <Textarea
                id="internalNotes"
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Ajoutez des notes internes pour cette réservation..."
                rows={4}
                className="w-full"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelStatusChange}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmStatusChange}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

