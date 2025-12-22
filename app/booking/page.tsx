import { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import BookingWizard from '@/components/BookingWizard'
import { prisma } from '@/lib/prisma'
import { SessionType } from '@prisma/client'

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
  let sessionTypes: SessionType[] = []
  try {
    sessionTypes = await prisma.sessionType.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })
  } catch (error: any) {
    // Si la table n'existe pas, retourner un tableau vide
    // Les migrations devraient créer la table au prochain démarrage
    console.error('Erreur lors de la récupération des types de séances:', error)
    sessionTypes = []
  }

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

