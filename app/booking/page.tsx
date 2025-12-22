import { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import BookingWizard from '@/components/BookingWizard'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Réserver une séance',
  description:
    'Réservez votre séance photo avec Melody Floc\'h en ligne. Choisissez votre formule, votre date et votre créneau horaire en quelques clics.',
  openGraph: {
    title: 'Réserver une séance | Melody Floc\'h',
    description:
      'Réservez votre séance photo avec Melody Floc\'h en ligne. Choisissez votre formule, votre date et votre créneau horaire.',
  },
}

export const dynamic = 'force-dynamic'

export default async function BookingPage() {
  // Récupérer les types de séances actifs
  const sessionTypes = await prisma.sessionType.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return (
    <>
      <PageHero
        title="Réserver votre séance photo"
        description="Choisissez votre formule et réservez votre créneau en quelques étapes"
      />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <BookingWizard sessionTypes={sessionTypes} />
        </div>
      </section>
    </>
  )
}

