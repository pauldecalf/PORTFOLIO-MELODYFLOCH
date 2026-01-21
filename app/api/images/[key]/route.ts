import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const image = await prisma.siteImage.findUnique({
      where: {
        key: params.key,
        isActive: true,
      },
    })

    if (!image) {
      return NextResponse.json(
        { error: 'Image non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json(image)
  } catch (error) {
    console.error('Erreur API image:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}



