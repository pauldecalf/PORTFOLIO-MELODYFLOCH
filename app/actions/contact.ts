'use server'

import { z } from 'zod'
import { sendContactEmail } from '@/lib/email'

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    }

    // Validation
    const validated = contactSchema.parse(data)

    // Envoi de l'email
    await sendContactEmail(
      validated.name,
      validated.email,
      validated.phone,
      validated.message
    )

    return { success: true }
  } catch (error) {
    console.error('Erreur soumission formulaire contact:', error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      }
    }

    return {
      success: false,
      error: 'Une erreur est survenue lors de l\'envoi du message.',
    }
  }
}

