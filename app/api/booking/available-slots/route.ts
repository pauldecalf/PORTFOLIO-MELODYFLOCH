import { NextRequest, NextResponse } from 'next/server'
import { getAvailableSlots } from '@/lib/availability'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sessionTypeId = searchParams.get('sessionTypeId')
    const dateStr = searchParams.get('date')

    if (!sessionTypeId || !dateStr) {
      return NextResponse.json(
        { error: 'Paramètres sessionTypeId et date requis' },
        { status: 400 }
      )
    }

    const date = new Date(dateStr)

    const slots = await getAvailableSlots(date, sessionTypeId)

    return NextResponse.json({ slots })
  } catch (error) {
    console.error('Erreur API available-slots:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

