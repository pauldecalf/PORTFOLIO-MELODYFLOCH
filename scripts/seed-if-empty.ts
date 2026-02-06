import { prisma } from '../lib/prisma'

async function seedIfEmpty() {
  try {
    console.log('🔍 Checking database state...')
    
    // Vérifier si des types de séances existent déjà
    const existingSessions = await prisma.sessionType.count()
    
    if (existingSessions > 0) {
      console.log('✅ Database already seeded, skipping...')
      return
    }

    console.log('🌱 Seeding database...')
    console.log('⏳ Creating session types...')

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
      { dayOfWeek: 2, startTime: '09:00', endTime: '18:00' },
      { dayOfWeek: 3, startTime: '09:00', endTime: '18:00' },
      { dayOfWeek: 4, startTime: '09:00', endTime: '18:00' },
      { dayOfWeek: 5, startTime: '09:00', endTime: '18:00' },
      { dayOfWeek: 6, startTime: '10:00', endTime: '16:00' },
    ]

    for (const availability of availabilities) {
      // Pour MongoDB, on vérifie manuellement si ça existe
      const existing = await prisma.weeklyAvailability.findFirst({
        where: {
          dayOfWeek: availability.dayOfWeek,
          startTime: availability.startTime,
          endTime: availability.endTime,
        },
      })
      
      if (!existing) {
        await prisma.weeklyAvailability.create({
          data: availability,
        })
      }
    }

    console.log('✅ Disponibilités hebdomadaires créées')
    console.log('✅ Database seeded successfully')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    // Ne pas faire échouer le processus si le seed échoue
  } finally {
    await prisma.$disconnect()
  }
}

seedIfEmpty()


