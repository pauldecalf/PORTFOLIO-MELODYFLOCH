import { prisma } from './prisma'
import { format, parse, addMinutes, isWithinInterval, isSameDay } from 'date-fns'
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'

const TIMEZONE = 'Europe/Paris'
const BUFFER_MINUTES = 15 // Buffer entre les séances

export interface TimeSlot {
  startTime: string // "HH:mm"
  endTime: string // "HH:mm"
  available: boolean
}

/**
 * Récupère tous les créneaux disponibles pour une date et un type de séance donnés
 */
export async function getAvailableSlots(
  date: Date,
  sessionTypeId: string
): Promise<TimeSlot[]> {
  // Récupérer le type de séance
  const sessionType = await prisma.sessionType.findUnique({
    where: { id: sessionTypeId },
  })

  if (!sessionType || !sessionType.isActive) {
    return []
  }

  const dayOfWeek = date.getDay()

  // Vérifier si la date est bloquée
  const isBlocked = await prisma.blockedDate.findFirst({
    where: {
      date: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  })

  if (isBlocked) {
    return []
  }

  // Récupérer les disponibilités pour ce jour de la semaine
  const weeklyAvailabilities = await prisma.weeklyAvailability.findMany({
    where: {
      dayOfWeek,
      isActive: true,
    },
  })

  if (weeklyAvailabilities.length === 0) {
    return []
  }

  // Récupérer toutes les réservations pour cette date
  const existingBookings = await prisma.booking.findMany({
    where: {
      date: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999)),
      },
      status: 'CONFIRMED',
    },
  })

  const slots: TimeSlot[] = []

  // Pour chaque période de disponibilité
  for (const availability of weeklyAvailabilities) {
    const startHour = parse(availability.startTime, 'HH:mm', date)
    const endHour = parse(availability.endTime, 'HH:mm', date)

    // Générer tous les créneaux possibles (par tranches de 30 minutes)
    let currentTime = startHour
    const slotInterval = 30 // minutes

    while (currentTime < endHour) {
      const slotEnd = addMinutes(currentTime, sessionType.duration)

      // Vérifier que le créneau ne dépasse pas la fin de disponibilité
      if (slotEnd <= endHour) {
        const startTimeStr = format(currentTime, 'HH:mm')
        const endTimeStr = format(slotEnd, 'HH:mm')

        // Vérifier si ce créneau est disponible (pas de conflit avec les réservations)
        const isAvailable = !hasConflict(
          startTimeStr,
          endTimeStr,
          existingBookings
        )

        slots.push({
          startTime: startTimeStr,
          endTime: endTimeStr,
          available: isAvailable,
        })
      }

      currentTime = addMinutes(currentTime, slotInterval)
    }
  }

  return slots
}

/**
 * Vérifie si un créneau entre en conflit avec les réservations existantes
 */
function hasConflict(
  startTime: string,
  endTime: string,
  bookings: Array<{ startTime: string; endTime: string }>
): boolean {
  const [startHour, startMin] = startTime.split(':').map(Number)
  const [endHour, endMin] = endTime.split(':').map(Number)
  const startMinutes = startHour * 60 + startMin
  const endMinutes = endHour * 60 + endMin

  for (const booking of bookings) {
    const [bStartHour, bStartMin] = booking.startTime.split(':').map(Number)
    const [bEndHour, bEndMin] = booking.endTime.split(':').map(Number)
    const bStartMinutes = bStartHour * 60 + bStartMin - BUFFER_MINUTES
    const bEndMinutes = bEndHour * 60 + bEndMin + BUFFER_MINUTES

    // Vérifier le chevauchement
    if (startMinutes < bEndMinutes && endMinutes > bStartMinutes) {
      return true
    }
  }

  return false
}

/**
 * Vérifie si une date/heure est disponible pour une réservation
 */
export async function isSlotAvailable(
  date: Date,
  startTime: string,
  endTime: string,
  sessionTypeId: string
): Promise<boolean> {
  const slots = await getAvailableSlots(date, sessionTypeId)
  const slot = slots.find((s) => s.startTime === startTime && s.endTime === endTime)
  return slot?.available ?? false
}

/**
 * Récupère les prochaines dates disponibles (pour affichage dans le calendrier)
 */
export async function getAvailableDates(
  startDate: Date,
  endDate: Date
): Promise<Date[]> {
  const availableDates: Date[] = []
  const current = new Date(startDate)

  while (current <= endDate) {
    const dayOfWeek = current.getDay()

    // Vérifier si ce jour de la semaine a des disponibilités
    const hasAvailability = await prisma.weeklyAvailability.findFirst({
      where: {
        dayOfWeek,
        isActive: true,
      },
    })

    // Vérifier si la date n'est pas bloquée
    const isBlocked = await prisma.blockedDate.findFirst({
      where: {
        date: {
          gte: new Date(current.setHours(0, 0, 0, 0)),
          lt: new Date(current.setHours(23, 59, 59, 999)),
        },
      },
    })

    if (hasAvailability && !isBlocked) {
      availableDates.push(new Date(current))
    }

    current.setDate(current.getDate() + 1)
  }

  return availableDates
}

