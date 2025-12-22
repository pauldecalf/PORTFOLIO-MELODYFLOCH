'use client'

import { useState } from 'react'
import { loginAdmin } from '@/app/actions/admin'

export default function AdminLoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await loginAdmin(formData)

      if (result.success) {
        window.location.href = '/admin'
      } else {
        setError(result.error || 'Mot de passe incorrect')
      }
    } catch (err) {
      setError('Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="mt-8 space-y-6">
      <div>
        <label htmlFor="password" className="sr-only">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
          placeholder="Mot de passe"
        />
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Connexion...' : 'Se connecter'}
        </button>
      </div>
    </form>
  )
}

