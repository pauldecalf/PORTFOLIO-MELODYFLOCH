import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const COOKIE_NAME = 'admin_auth'

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get(COOKIE_NAME)
  return authCookie?.value === 'authenticated'
}

export async function setAuth() {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  })
}

export async function clearAuth() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}

