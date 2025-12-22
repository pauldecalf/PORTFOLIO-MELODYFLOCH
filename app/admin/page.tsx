import { redirect } from 'next/navigation'
import { checkAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import AdminDashboard from '@/components/admin/AdminDashboard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    redirect('/admin/login')
  }

  // Récupérer les données
  const [bookings, sessionTypes, weeklyAvailabilities, blockedDates, siteImages, emailLogs, galleryImages] = await Promise.all([
    prisma.booking.findMany({
      include: {
        sessionType: true,
      },
      orderBy: {
        date: 'asc',
      },
    }),
    prisma.sessionType.findMany({
      orderBy: {
        order: 'asc',
      },
    }),
    prisma.weeklyAvailability.findMany({
      orderBy: {
        dayOfWeek: 'asc',
      },
    }),
    prisma.blockedDate.findMany({
      orderBy: {
        date: 'asc',
      },
    }),
    prisma.siteImage.findMany({
      orderBy: {
        order: 'asc',
      },
    }),
    prisma.emailLog.findMany({
      orderBy: {
        sentAt: 'desc',
      },
      take: 50, // Limiter aux 50 derniers
    }),
    prisma.galleryImage.findMany({
      orderBy: {
        order: 'asc',
      },
    }),
  ])

  return <AdminDashboard
    bookings={bookings}
    sessionTypes={sessionTypes}
    weeklyAvailabilities={weeklyAvailabilities}
    blockedDates={blockedDates}
    siteImages={siteImages}
    emailLogs={emailLogs}
    galleryImages={galleryImages}
  />
}

