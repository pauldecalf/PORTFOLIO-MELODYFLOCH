import { Resend } from 'resend'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const resend = new Resend(process.env.RESEND_API_KEY)

interface BookingEmailData {
  clientName: string
  clientEmail: string
  sessionTypeName: string
  date: Date
  startTime: string
  endTime: string
  message?: string
}

/**
 * Envoie un email de confirmation au client
 */
export async function sendClientConfirmationEmail(data: BookingEmailData) {
  const { clientName, clientEmail, sessionTypeName, date, startTime, endTime, message } = data

  const dateFormatted = format(date, 'EEEE d MMMM yyyy', { locale: fr })

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
          .booking-details {
            background: #f5f3f0;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .booking-details h2 {
            color: #8c7863;
            font-size: 18px;
            margin-top: 0;
          }
          .detail-row {
            margin: 10px 0;
          }
          .detail-label {
            font-weight: 600;
            color: #666;
          }
          .footer {
            border-top: 1px solid #ddd;
            padding-top: 20px;
            margin-top: 30px;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background: #8c7863;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Melody Photography</h1>
        </div>
        
        <div class="content">
          <p>Bonjour ${clientName},</p>
          
          <p>Merci pour votre confiance ! Votre séance photo est confirmée.</p>
          
          <div class="booking-details">
            <h2>Détails de votre réservation</h2>
            
            <div class="detail-row">
              <span class="detail-label">Type de séance :</span>
              <span>${sessionTypeName}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Date :</span>
              <span>${dateFormatted}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Horaire :</span>
              <span>${startTime} - ${endTime}</span>
            </div>
            
            ${message ? `
            <div class="detail-row">
              <span class="detail-label">Votre message :</span>
              <div style="margin-top: 5px;">${message}</div>
            </div>
            ` : ''}
          </div>
          
          <p>Je suis impatiente de capturer vos plus beaux moments ! Si vous avez des questions ou souhaitez des conseils pour préparer votre séance, n'hésitez pas à me contacter.</p>
          
          <p><strong>Quelques conseils pour votre séance :</strong></p>
          <ul>
            <li>Portez des vêtements dans lesquels vous vous sentez à l'aise et confiante</li>
            <li>Évitez les motifs trop chargés qui peuvent distraire l'attention</li>
            <li>Prévoyez plusieurs tenues si votre forfait le permet</li>
            <li>Reposez-vous bien la veille pour avoir un regard lumineux</li>
          </ul>
          
          <p>À très bientôt,</p>
          <p><strong>Melody Floc'h</strong><br>
          Photographe portrait & lifestyle</p>
        </div>
        
        <div class="footer">
          <p>Melody Floc'h Photography<br>
          Email : ${process.env.ADMIN_EMAIL}<br>
          Site : ${process.env.APP_URL}</p>
        </div>
      </body>
    </html>
  `

  const textContent = `
Bonjour ${clientName},

Merci pour votre confiance ! Votre séance photo est confirmée.

DÉTAILS DE VOTRE RÉSERVATION
Type de séance : ${sessionTypeName}
Date : ${dateFormatted}
Horaire : ${startTime} - ${endTime}
${message ? `\nVotre message : ${message}` : ''}

Je suis impatiente de capturer vos plus beaux moments ! Si vous avez des questions ou souhaitez des conseils pour préparer votre séance, n'hésitez pas à me contacter.

QUELQUES CONSEILS POUR VOTRE SÉANCE :
- Portez des vêtements dans lesquels vous vous sentez à l'aise et confiante
- Évitez les motifs trop chargés qui peuvent distraire l'attention
- Prévoyez plusieurs tenues si votre forfait le permet
- Reposez-vous bien la veille pour avoir un regard lumineux

À très bientôt,
Melody Floc'h
Photographe portrait & lifestyle

---
Melody Floc'h Photography
Email : ${process.env.ADMIN_EMAIL}
Site : ${process.env.APP_URL}
  `

  try {
    const result = await resend.emails.send({
      from: `Melody Floc'h <${process.env.ADMIN_EMAIL}>`,
      to: clientEmail,
      subject: '✨ Votre séance photo est confirmée',
      html: htmlContent,
      text: textContent,
    })

    return result
  } catch (error) {
    console.error('Erreur envoi email client:', error)
    throw error
  }
}

/**
 * Envoie un email de notification à l'admin (photographe)
 */
export async function sendAdminNotificationEmail(data: BookingEmailData) {
  const { clientName, clientEmail, sessionTypeName, date, startTime, endTime, message } = data

  const dateFormatted = format(date, 'EEEE d MMMM yyyy', { locale: fr })

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #8c7863;
            color: white;
            padding: 20px;
            border-radius: 8px;
          }
          .content {
            padding: 20px 0;
          }
          .booking-card {
            border: 2px solid #8c7863;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .detail-row {
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
          }
          .detail-label {
            font-weight: 600;
            color: #666;
            display: inline-block;
            min-width: 150px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎉 Nouvelle réservation !</h1>
        </div>
        
        <div class="content">
          <p>Une nouvelle séance photo vient d'être réservée.</p>
          
          <div class="booking-card">
            <div class="detail-row">
              <span class="detail-label">Client :</span>
              <span>${clientName}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Email :</span>
              <span><a href="mailto:${clientEmail}">${clientEmail}</a></span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Type de séance :</span>
              <span>${sessionTypeName}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Date :</span>
              <span>${dateFormatted}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Horaire :</span>
              <span>${startTime} - ${endTime}</span>
            </div>
            
            ${message ? `
            <div class="detail-row">
              <span class="detail-label">Message du client :</span>
              <div style="margin-top: 5px; font-style: italic;">${message}</div>
            </div>
            ` : ''}
          </div>
          
          <p><a href="${process.env.APP_URL}/admin" style="display: inline-block; padding: 12px 30px; background: #8c7863; color: white; text-decoration: none; border-radius: 5px;">Voir dans l'admin</a></p>
        </div>
      </body>
    </html>
  `

  const textContent = `
NOUVELLE RÉSERVATION !

Client : ${clientName}
Email : ${clientEmail}
Type de séance : ${sessionTypeName}
Date : ${dateFormatted}
Horaire : ${startTime} - ${endTime}
${message ? `\nMessage du client : ${message}` : ''}

Voir dans l'admin : ${process.env.APP_URL}/admin
  `

  try {
    const result = await resend.emails.send({
      from: `Melody Floc'h <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL!,
      subject: `🎉 Nouvelle réservation - ${clientName}`,
      html: htmlContent,
      text: textContent,
    })

    return result
  } catch (error) {
    console.error('Erreur envoi email admin:', error)
    throw error
  }
}

/**
 * Envoie un email d'annulation au client
 */
export async function sendCancellationEmail(
  clientName: string,
  clientEmail: string,
  sessionTypeName: string,
  date: Date,
  startTime: string
) {
  const dateFormatted = format(date, 'EEEE d MMMM yyyy', { locale: fr })

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Melody Floc'h</h1>
        </div>
        
        <div class="content">
          <p>Bonjour ${clientName},</p>
          
          <p>Votre séance photo du <strong>${dateFormatted}</strong> à <strong>${startTime}</strong> (${sessionTypeName}) a été annulée.</p>
          
          <p>Si vous souhaitez reprogrammer votre séance, n'hésitez pas à prendre un nouveau rendez-vous sur notre site.</p>
          
          <p>Cordialement,<br>
          <strong>Melody Floc'h</strong></p>
        </div>
      </body>
    </html>
  `

  const textContent = `
Bonjour ${clientName},

Votre séance photo du ${dateFormatted} à ${startTime} (${sessionTypeName}) a été annulée.

Si vous souhaitez reprogrammer votre séance, n'hésitez pas à prendre un nouveau rendez-vous sur notre site.

Cordialement,
Melody Floc'h
  `

  try {
    const result = await resend.emails.send({
      from: `Melody Floc'h <${process.env.ADMIN_EMAIL}>`,
      to: clientEmail,
      subject: 'Annulation de votre séance photo',
      html: htmlContent,
      text: textContent,
    })

    return result
  } catch (error) {
    console.error('Erreur envoi email annulation:', error)
    throw error
  }
}

/**
 * Envoie un email de contact
 */
export async function sendContactEmail(
  name: string,
  email: string,
  phone: string | undefined,
  message: string
) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ''}
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      </body>
    </html>
  `

  const textContent = `
Nouveau message de contact

Nom : ${name}
Email : ${email}
${phone ? `Téléphone : ${phone}` : ''}

Message :
${message}
  `

  try {
    const result = await resend.emails.send({
      from: `Melody Floc'h <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL!,
      replyTo: email,
      subject: `Message de ${name}`,
      html: htmlContent,
      text: textContent,
    })

    return result
  } catch (error) {
    console.error('Erreur envoi email contact:', error)
    throw error
  }
}

