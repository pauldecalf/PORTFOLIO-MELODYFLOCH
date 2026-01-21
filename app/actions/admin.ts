'use server'

import { verifyPassword, setAuth, clearAuth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { sendCancellationEmail } from '@/lib/email'
import { saveUploadedImage, deleteUploadedImage, isValidImage, isValidFileSize } from '@/lib/upload'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function loginAdmin(formData: FormData) {
  const password = formData.get('password') as string

  if (!password) {
    return { success: false, error: 'Mot de passe requis' }
  }

  if (verifyPassword(password)) {
    await setAuth()
    return { success: true }
  }

  return { success: false, error: 'Mot de passe incorrect' }
}

export async function logoutAdmin() {
  await clearAuth()
  redirect('/admin/login')
}

export async function cancelBooking(bookingId: string) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { sessionType: true },
    })

    if (!booking) {
      return { success: false, error: 'Réservation non trouvée' }
    }

    // Mettre à jour le statut
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED' },
    })

    // Envoyer un email au client
    try {
      await sendCancellationEmail(
        booking.clientName,
        booking.clientEmail,
        booking.sessionType.name,
        booking.date,
        booking.startTime
      )
    } catch (emailError) {
      console.error('Erreur envoi email annulation:', emailError)
    }

    return { success: true }
  } catch (error) {
    console.error('Erreur annulation réservation:', error)
    return { success: false, error: 'Erreur lors de l\'annulation' }
  }
}

export async function deleteBooking(bookingId: string) {
  try {
    await prisma.booking.delete({
      where: { id: bookingId },
    })

    return { success: true }
  } catch (error) {
    console.error('Erreur suppression réservation:', error)
    return { success: false, error: 'Erreur lors de la suppression' }
  }
}

export async function createBlockedDate(date: string, reason?: string) {
  try {
    await prisma.blockedDate.create({
      data: {
        date: new Date(date),
        reason: reason || null,
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Erreur création date bloquée:', error)
    return { success: false, error: 'Erreur lors de la création' }
  }
}

export async function deleteBlockedDate(id: string) {
  try {
    await prisma.blockedDate.delete({
      where: { id },
    })

    return { success: true }
  } catch (error) {
    console.error('Erreur suppression date bloquée:', error)
    return { success: false, error: 'Erreur lors de la suppression' }
  }
}

// ==================== GESTION DES STATUTS ====================

export async function updateBookingStatus(bookingId: string, status: string, internalNotes?: string) {
  try {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { 
        status,
        internalNotes: internalNotes || undefined,
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Erreur mise à jour statut:', error)
    return { success: false, error: 'Erreur lors de la mise à jour' }
  }
}

// ==================== GESTION DES IMAGES ====================

export async function uploadSiteImage(formData: FormData) {
  try {
    const file = formData.get('file') as File
    const key = formData.get('key') as string
    const altText = formData.get('altText') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string

    if (!file || !key || !altText || !category) {
      return { success: false, error: 'Champs requis manquants' }
    }

    // Validation
    if (!isValidImage(file)) {
      return { success: false, error: 'Format d\'image invalide. Utilisez JPG, PNG ou WebP' }
    }

    if (!isValidFileSize(file, 20)) {
      return { success: false, error: 'L\'image ne doit pas dépasser 20 MB' }
    }

    // Supprimer l'ancienne image si elle existe
    const existingImage = await prisma.siteImage.findUnique({
      where: { key },
    })

    if (existingImage) {
      await deleteUploadedImage(existingImage.filename)
    }

    // Sauvegarder la nouvelle image
    const { filename, url } = await saveUploadedImage(file, category)

    // Enregistrer en DB
    await prisma.siteImage.upsert({
      where: { key },
      update: {
        filename,
        url,
        altText,
        category,
        description: description || null,
      },
      create: {
        key,
        filename,
        url,
        altText,
        category,
        description: description || null,
      },
    })

    return { success: true, url }
  } catch (error) {
    console.error('Erreur upload image:', error)
    return { success: false, error: 'Erreur lors de l\'upload' }
  }
}

export async function deleteSiteImage(id: string) {
  try {
    const image = await prisma.siteImage.findUnique({
      where: { id },
    })

    if (!image) {
      return { success: false, error: 'Image non trouvée' }
    }

    // Supprimer le fichier
    await deleteUploadedImage(image.filename)

    // Supprimer de la DB
    await prisma.siteImage.delete({
      where: { id },
    })

    return { success: true }
  } catch (error) {
    console.error('Erreur suppression image:', error)
    return { success: false, error: 'Erreur lors de la suppression' }
  }
}

export async function toggleSiteImageStatus(id: string) {
  try {
    const image = await prisma.siteImage.findUnique({
      where: { id },
    })

    if (!image) {
      return { success: false, error: 'Image non trouvée' }
    }

    await prisma.siteImage.update({
      where: { id },
      data: { isActive: !image.isActive },
    })

    return { success: true }
  } catch (error) {
    console.error('Erreur changement statut image:', error)
    return { success: false, error: 'Erreur lors du changement' }
  }
}

// ==================== ENVOI D'EMAILS ====================

export async function sendAdminEmail(formData: FormData) {
  try {
    const recipient = formData.get('recipient') as string
    const subject = formData.get('subject') as string
    const content = formData.get('content') as string
    const bookingId = formData.get('bookingId') as string | null

    if (!recipient || !subject || !content) {
      return { success: false, error: 'Tous les champs sont requis' }
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(recipient)) {
      return { success: false, error: 'Email invalide' }
    }

    // Envoyer l'email
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: recipient,
      subject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                text-align: center;
                padding: 30px 0;
                border-bottom: 2px solid #8c7863;
              }
              .header h1 {
                font-family: Georgia, serif;
                font-size: 28px;
                color: #8c7863;
                margin: 0;
              }
              .content {
                padding: 30px 0;
              }
              .footer {
                border-top: 1px solid #ddd;
                padding-top: 20px;
                margin-top: 30px;
                text-align: center;
                color: #666;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Melody Floc'h</h1>
            </div>
            
            <div class="content">
              ${content.replace(/\n/g, '<br>')}
            </div>
            
            <div class="footer">
              <p>Melody Floc'h Photography<br>
              Email : ${process.env.ADMIN_EMAIL}<br>
              Site : ${process.env.APP_URL}</p>
            </div>
          </body>
        </html>
      `,
      text: content,
    })

    // Logger l'envoi
    await prisma.emailLog.create({
      data: {
        recipient,
        subject,
        content,
        bookingId: bookingId || null,
        status: 'sent',
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Erreur envoi email:', error)

    // Logger l'échec
    try {
      await prisma.emailLog.create({
        data: {
          recipient: formData.get('recipient') as string,
          subject: formData.get('subject') as string,
          content: formData.get('content') as string,
          bookingId: (formData.get('bookingId') as string) || null,
          status: 'failed',
        },
      })
    } catch {}

    return { success: false, error: 'Erreur lors de l\'envoi de l\'email' }
  }
}

// ============================================
// GESTION DES GALERIES DU PORTFOLIO
// ============================================

export async function uploadGalleryImage(formData: FormData) {
  try {
    const gallery = formData.get('gallery') as string
    const altText = formData.get('altText') as string
    const description = formData.get('description') as string || null
    const order = parseInt(formData.get('order') as string) || 0
    const file = formData.get('file') as File

    if (!gallery || !altText || !file) {
      return { success: false, error: 'Tous les champs requis doivent être remplis' }
    }

    // Valider la galerie
    const validGalleries = ['portraits', 'noir-et-blanc', 'lifestyle']
    if (!validGalleries.includes(gallery)) {
      return { success: false, error: 'Galerie invalide' }
    }

    // Valider l'image
    if (!isValidImage(file)) {
      return { success: false, error: 'Format d\'image non supporté. Utilisez JPG, PNG, WebP ou GIF.' }
    }

    if (!isValidFileSize(file, 20)) {
      return { success: false, error: 'Fichier trop volumineux (max 20 MB)' }
    }

    // Sauvegarder l'image
    const { filename, url } = await saveUploadedImage(file, 'gallery')

    // Créer l'entrée en DB
    await prisma.galleryImage.create({
      data: {
        gallery,
        filename,
        url,
        altText,
        description,
        order,
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Erreur upload image galerie:', error)
    return { success: false, error: 'Erreur lors de l\'upload de l\'image' }
  }
}

export async function uploadMultipleGalleryImages(formData: FormData) {
  try {
    const gallery = formData.get('gallery') as string
    const imagesDataJson = formData.get('imagesData') as string
    
    if (!gallery || !imagesDataJson) {
      return { success: false, error: 'Données manquantes' }
    }

    const imagesData = JSON.parse(imagesDataJson) as Array<{
      fileName: string
      altText: string
      description?: string
      order: number
      fileIndex: number
    }>

    if (imagesData.length === 0) {
      return { success: false, error: 'Aucune image à uploader' }
    }

    // Valider la galerie
    const validGalleries = ['portraits', 'noir-et-blanc', 'lifestyle']
    if (!validGalleries.includes(gallery)) {
      return { success: false, error: 'Galerie invalide' }
    }

    const results = []
    const errors = []

    for (const imageData of imagesData) {
      const file = formData.get(`file_${imageData.fileIndex}`) as File
      
      if (!file) {
        errors.push(`${imageData.fileName}: Fichier manquant`)
        continue
      }

      try {
        // Valider l'image
        if (!isValidImage(file)) {
          errors.push(`${imageData.fileName}: Format non supporté`)
          continue
        }

        if (!isValidFileSize(file, 20)) {
          errors.push(`${imageData.fileName}: Fichier trop volumineux (max 20 MB)`)
          continue
        }

        // Sauvegarder l'image
        const { filename, url } = await saveUploadedImage(file, 'gallery')

        // Créer l'entrée en DB
        await prisma.galleryImage.create({
          data: {
            gallery,
            filename,
            url,
            altText: imageData.altText,
            description: imageData.description || null,
            order: imageData.order,
          },
        })

        results.push({ fileName: imageData.fileName, success: true })
      } catch (error) {
        console.error(`Erreur upload ${imageData.fileName}:`, error)
        errors.push(`${imageData.fileName}: Erreur lors de l'upload`)
      }
    }

    if (results.length === 0) {
      return { 
        success: false, 
        error: `Aucune image n'a pu être uploadée. Erreurs: ${errors.join(', ')}` 
      }
    }

    return { 
      success: true, 
      uploaded: results.length,
      total: imagesData.length,
      errors: errors.length > 0 ? errors : undefined
    }
  } catch (error) {
    console.error('Erreur upload multiple images galerie:', error)
    return { success: false, error: 'Erreur lors de l\'upload des images' }
  }
}

export async function deleteGalleryImage(imageId: string) {
  try {
    const image = await prisma.galleryImage.findUnique({
      where: { id: imageId },
    })

    if (!image) {
      return { success: false, error: 'Image non trouvée' }
    }

    // Supprimer le fichier
    await deleteUploadedImage(image.filename)

    // Supprimer de la DB
    await prisma.galleryImage.delete({
      where: { id: imageId },
    })

    return { success: true }
  } catch (error) {
    console.error('Erreur suppression image galerie:', error)
    return { success: false, error: 'Erreur lors de la suppression de l\'image' }
  }
}

export async function toggleGalleryImageActive(imageId: string) {
  try {
    const image = await prisma.galleryImage.findUnique({
      where: { id: imageId },
    })

    if (!image) {
      return { success: false, error: 'Image non trouvée' }
    }

    await prisma.galleryImage.update({
      where: { id: imageId },
      data: { isActive: !image.isActive },
    })

    return { success: true }
  } catch (error) {
    console.error('Erreur toggle image galerie:', error)
    return { success: false, error: 'Erreur lors de la modification de l\'image' }
  }
}

export async function updateGalleryImageOrder(imageId: string, newOrder: number) {
  try {
    await prisma.galleryImage.update({
      where: { id: imageId },
      data: { order: newOrder },
    })

    return { success: true }
  } catch (error) {
    console.error('Erreur mise à jour ordre image galerie:', error)
    return { success: false, error: 'Erreur lors de la mise à jour de l\'ordre' }
  }
}

export async function updateGalleryImage(
  imageId: string,
  data: {
    altText?: string
    description?: string | null
    order?: number
    gallery?: string
    isActive?: boolean
  }
) {
  try {
    const image = await prisma.galleryImage.findUnique({
      where: { id: imageId },
    })

    if (!image) {
      return { success: false, error: 'Image non trouvée' }
    }

    await prisma.galleryImage.update({
      where: { id: imageId },
      data: {
        altText: data.altText !== undefined ? data.altText : image.altText,
        description: data.description !== undefined ? data.description : image.description,
        order: data.order !== undefined ? data.order : image.order,
        gallery: data.gallery !== undefined ? data.gallery : image.gallery,
        isActive: data.isActive !== undefined ? data.isActive : image.isActive,
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Erreur mise à jour image galerie:', error)
    return { success: false, error: 'Erreur lors de la mise à jour de l\'image' }
  }
}
