import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')

    const where: any = { isActive: true }
    if (category) {
      where.category = category
    }

    const images = await prisma.siteImage.findMany({
      where,
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Erreur API images:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}


