import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { checkAuth } from '@/lib/auth'
import AdminLoginForm from '@/components/admin/AdminLoginForm'

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLoginPage() {
  const isAuthenticated = await checkAuth()

  if (isAuthenticated) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-serif font-bold text-gray-900">
            Administration
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Connectez-vous pour accéder au panneau d'administration
          </p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  )
}

