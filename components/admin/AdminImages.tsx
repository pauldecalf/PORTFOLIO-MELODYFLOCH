'use client'

import { useState, useEffect } from 'react'
import { SiteImage } from '@prisma/client'
import { uploadSiteImage, deleteSiteImage, toggleSiteImageStatus } from '@/app/actions/admin'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'

interface AdminImagesProps {
  images: SiteImage[]
}

const imageKeys = [
  { key: 'hero-home', label: 'Hero Page d\'accueil', category: 'hero' },
  { key: 'about-melody', label: 'Photo À propos', category: 'about' },
  { key: 'preview-portraits', label: 'Aperçu Portraits', category: 'preview' },
  { key: 'preview-nb', label: 'Aperçu Noir & Blanc', category: 'preview' },
  { key: 'preview-lifestyle', label: 'Aperçu Lifestyle', category: 'preview' },
]

export default function AdminImages({ images: initialImages }: AdminImagesProps) {
  const [images, setImages] = useState<SiteImage[]>(initialImages)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedKey, setSelectedKey] = useState(imageKeys[0].key)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [selectedImage, setSelectedImage] = useState<SiteImage | null>(null)

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsUploading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await uploadSiteImage(formData)

      if (result.success) {
        setMessage({ type: 'success', text: 'Image uploadée avec succès !' })
        // S'assurer que l'onglet images est préservé dans l'URL
        if (typeof window !== 'undefined') {
          window.location.hash = 'images'
        }
        // Recharger la page pour afficher la nouvelle image
        setTimeout(() => window.location.reload(), 1500)
      } else {
        setMessage({ type: 'error', text: result.error || 'Erreur lors de l\'upload' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Une erreur est survenue' })
    } finally {
      setIsUploading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette image ?')) return

    const result = await deleteSiteImage(id)
    if (result.success) {
      // Mettre à jour le state local sans recharger la page
      setImages((prev) => prev.filter((img) => img.id !== id))
    } else {
      alert(result.error)
    }
  }

  async function handleToggleStatus(id: string) {
    const result = await toggleSiteImageStatus(id)
    if (result.success) {
      // Mettre à jour le state local sans recharger la page
      setImages((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, isActive: !img.isActive } : img
        )
      )
    } else {
      alert(result.error)
    }
  }

  const selectedKeyData = imageKeys.find((k) => k.key === selectedKey)

  // Fermer la modale avec la touche Échap
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null)
      }
    }

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape)
      // Empêcher le scroll du body quand la modale est ouverte
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold mb-6">Gestion des Images</h2>

      {/* Formulaire d'upload */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Uploader une image</h3>

        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Emplacement de l'image
            </label>
            <select
              name="key"
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              className="input-field"
              required
            >
              {imageKeys.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </select>
            <input type="hidden" name="category" value={selectedKeyData?.category} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Fichier image (JPG, PNG, WebP - max 5MB)
            </label>
            <input
              type="file"
              name="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Texte alternatif (SEO)
            </label>
            <input
              type="text"
              name="altText"
              placeholder="Description de l'image pour le référencement"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description (optionnel)
            </label>
            <textarea
              name="description"
              placeholder="Informations complémentaires"
              rows={3}
              className="input-field resize-none"
            />
          </div>

          {message && (
            <div
              className={`p-4 rounded-md ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isUploading}
            className="btn-primary disabled:opacity-50"
          >
            {isUploading ? 'Upload en cours...' : 'Uploader l\'image'}
          </button>
        </form>
      </div>

      {/* Liste des images */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Images du site ({images.length})</h3>

        {images.length === 0 ? (
          <p className="text-gray-500">Aucune image uploadée</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div 
                  className="relative h-48 mb-3 bg-gray-100 rounded cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.url}
                    alt={image.altText}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                      {imageKeys.find((k) => k.key === image.key)?.label || image.key}
                    </span>
                  </div>

                  <p className="text-sm font-medium">{image.altText}</p>

                  {image.description && (
                    <p className="text-xs text-gray-600">{image.description}</p>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleToggleStatus(image.id)}
                      className={`flex-1 text-xs py-2 px-3 rounded ${
                        image.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {image.isActive ? 'Active' : 'Inactive'}
                    </button>

                    <button
                      onClick={() => handleDelete(image.id)}
                      className="flex-1 text-xs py-2 px-3 bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Comment ça marche ?</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Uploadez une image pour chaque emplacement du site</li>
          <li>• Les images sont automatiquement optimisées</li>
          <li>• Vous pouvez activer/désactiver une image sans la supprimer</li>
          <li>• Le texte alternatif améliore votre référencement Google</li>
          <li>• Cliquez sur une image pour l'afficher en grand</li>
        </ul>
      </div>

      {/* Modale d'affichage en grand */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
              aria-label="Fermer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <Image
                src={selectedImage.url}
                alt={selectedImage.altText}
                fill
                className="object-contain"
                sizes="90vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                <div className="container-custom">
                  <p className="font-semibold text-lg mb-1">{selectedImage.altText}</p>
                  {selectedImage.description && (
                    <p className="text-sm text-gray-300">{selectedImage.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    {imageKeys.find((k) => k.key === selectedImage.key)?.label || selectedImage.key}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

