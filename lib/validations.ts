import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

export const bookingFormSchema = z.object({
  sessionTypeId: z.string().min(1, 'Veuillez sélectionner un type de séance'),
  date: z.string().min(1, 'Veuillez sélectionner une date'),
  startTime: z.string().min(1, 'Veuillez sélectionner un créneau horaire'),
  endTime: z.string().min(1),
  clientName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  clientEmail: z.string().email('Email invalide'),
  clientPhone: z.string().optional(),
  message: z.string().optional(),
})

export const sessionTypeFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  duration: z.number().min(30, 'La durée minimum est de 30 minutes'),
  price: z.number().min(0, 'Le prix doit être positif'),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
})

export const weeklyAvailabilitySchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format HH:mm requis'),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format HH:mm requis'),
  isActive: z.boolean().default(true),
})

export const blockedDateSchema = z.object({
  date: z.string().min(1, 'Date requise'),
  reason: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type BookingFormData = z.infer<typeof bookingFormSchema>
export type SessionTypeFormData = z.infer<typeof sessionTypeFormSchema>
export type WeeklyAvailabilityData = z.infer<typeof weeklyAvailabilitySchema>
export type BlockedDateData = z.infer<typeof blockedDateSchema>

