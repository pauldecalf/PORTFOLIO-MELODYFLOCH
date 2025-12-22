'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { isSlotAvailable } from '@/lib/availability'
import { sendClientConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email'
import { parse, addMinutes } from 'date-fns'

const bookingSchema = z.object({
  sessionTypeId: z.string().min(1, 'Type de séance requis'),
  date: z.string().min(1, 'Date requise'),
  startTime: z.string().min(1, 'Horaire requis'),
  endTime: z.string().min(1, 'Horaire requis'),
  clientName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  clientEmail: z.string().email('Email invalide'),
  clientPhone: z.string().optional(),
  message: z.string().optional(),
})

export async function createBooking(data: {
  sessionTypeId: string
  date: string
  startTime: string
  endTime: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  message?: string
}) {
  try {
    // Validation
    const validated = bookingSchema.parse(data)

    // Récupérer le type de séance
    const sessionType = await prisma.sessionType.findUnique({
      where: { id: validated.sessionTypeId },
    })

    if (!sessionType || !sessionType.isActive) {
      return {
        success: false,
        error: 'Type de séance invalide ou non disponible',
      }
    }

    const bookingDate = new Date(validated.date)

    // Vérifier la disponibilité du créneau
    const isAvailable = await isSlotAvailable(
      bookingDate,
      validated.startTime,
      validated.endTime,
      validated.sessionTypeId
    )

    if (!isAvailable) {
      return {
        success: false,
        error: 'Ce créneau n\'est plus disponible. Veuillez en choisir un autre.',
      }
    }

    // Créer la réservation
    const booking = await prisma.booking.create({
      data: {
        sessionTypeId: validated.sessionTypeId,
        date: bookingDate,
        startTime: validated.startTime,
        endTime: validated.endTime,
        clientName: validated.clientName,
        clientEmail: validated.clientEmail,
        clientPhone: validated.clientPhone || null,
        message: validated.message || null,
        status: 'CONFIRMED',
      },
      include: {
        sessionType: true,
      },
    })

    // Envoyer les emails
    try {
      await Promise.all([
        sendClientConfirmationEmail({
          clientName: booking.clientName,
          clientEmail: booking.clientEmail,
          sessionTypeName: sessionType.name,
          date: booking.date,
          startTime: booking.startTime,
          endTime: booking.endTime,
          message: booking.message || undefined,
        }),
        sendAdminNotificationEmail({
          clientName: booking.clientName,
          clientEmail: booking.clientEmail,
          sessionTypeName: sessionType.name,
          date: booking.date,
          startTime: booking.startTime,
          endTime: booking.endTime,
          message: booking.message || undefined,
        }),
      ])
    } catch (emailError) {
      console.error('Erreur envoi emails:', emailError)
      // La réservation est créée même si l'email échoue
    }

    return {
      success: true,
      bookingId: booking.id,
    }
  } catch (error) {
    console.error('Erreur création réservation:', error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      }
    }

    return {
      success: false,
      error: 'Une erreur est survenue lors de la création de la réservation.',
    }
  }
}

