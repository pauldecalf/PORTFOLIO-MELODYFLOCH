import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Types de séances
  const sessionTypes = [
    {
      name: 'Séance Essentiel',
      slug: 'essentiel',
      description: 'Séance photo portrait d\'une heure, parfaite pour découvrir mon univers photographique.',
      duration: 60,
      price: 150,
      order: 1,
    },
    {
      name: 'Séance Signature',
      slug: 'signature',
      description: 'Séance photo approfondie de 90 minutes avec plusieurs looks et ambiances.',
      duration: 90,
      price: 250,
      order: 2,
    },
    {
      name: 'Séance Premium',
      slug: 'premium',
      description: 'Expérience photo complète de 2 heures avec coaching, plusieurs tenues et décors.',
      duration: 120,
      price: 400,
      order: 3,
    },
  ]

  for (const session of sessionTypes) {
    await prisma.sessionType.upsert({
      where: { slug: session.slug },
      update: session,
      create: session,
    })
  }

  console.log('✅ Types de séances créés')

  // Disponibilités hebdomadaires (Mardi au Samedi, 9h-18h)
  const availabilities = [
    // Mardi
    { dayOfWeek: 2, startTime: '09:00', endTime: '18:00' },
    // Mercredi
    { dayOfWeek: 3, startTime: '09:00', endTime: '18:00' },
    // Jeudi
    { dayOfWeek: 4, startTime: '09:00', endTime: '18:00' },
    // Vendredi
    { dayOfWeek: 5, startTime: '09:00', endTime: '18:00' },
    // Samedi
    { dayOfWeek: 6, startTime: '10:00', endTime: '16:00' },
  ]

  for (const availability of availabilities) {
    await prisma.weeklyAvailability.upsert({
      where: {
        dayOfWeek_startTime_endTime: {
          dayOfWeek: availability.dayOfWeek,
          startTime: availability.startTime,
          endTime: availability.endTime,
        },
      },
      update: availability,
      create: availability,
    })
  }

  console.log('✅ Disponibilités hebdomadaires créées')

  // Exemple de dates bloquées (période des fêtes)
  const blockedDates = [
    new Date('2024-12-24'),
    new Date('2024-12-25'),
    new Date('2024-12-31'),
    new Date('2025-01-01'),
  ]

  for (const date of blockedDates) {
    await prisma.blockedDate.upsert({
      where: { date },
      update: { date, reason: 'Vacances' },
      create: { date, reason: 'Vacances' },
    })
  }

  console.log('✅ Dates bloquées créées')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

