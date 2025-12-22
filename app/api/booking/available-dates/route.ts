import { NextRequest, NextResponse } from 'next/server'
import { getAvailableDates } from '@/lib/availability'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const startStr = searchParams.get('start')
    const endStr = searchParams.get('end')

    if (!startStr || !endStr) {
      return NextResponse.json(
        { error: 'Paramètres start et end requis' },
        { status: 400 }
      )
    }

    const start = new Date(startStr)
    const end = new Date(endStr)

    const dates = await getAvailableDates(start, end)

    return NextResponse.json({
      dates: dates.map((date) => date.toISOString()),
    })
  } catch (error) {
    console.error('Erreur API available-dates:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

