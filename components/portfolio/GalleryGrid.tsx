'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface GalleryImage {
  id: string
  url: string
  altText: string
  description: string | null
}

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const navigateImage = (direction: number) => {
    const newIndex = currentIndex + direction
    if (newIndex >= 0 && newIndex < images.length) {
      setCurrentIndex(newIndex)
      setSelectedImage(images[newIndex])
    }
  }

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  // Fermer la modale avec la touche Échap et navigation avec les flèches
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null)
      }
    }

    const handleArrowKeys = (e: KeyboardEvent) => {
      if (!selectedImage) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const newIndex = currentIndex - 1
        if (newIndex >= 0) {
          setCurrentIndex(newIndex)
          setSelectedImage(images[newIndex])
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        const newIndex = currentIndex + 1
        if (newIndex < images.length) {
          setCurrentIndex(newIndex)
          setSelectedImage(images[newIndex])
        }
      }
    }

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('keydown', handleArrowKeys)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleArrowKeys)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage, currentIndex, images])

  const handleDownload = async (imageUrl: string, altText: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${altText.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error)
      alert('Erreur lors du téléchargement de l\'image')
    }
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg mb-4">
          Cette galerie est en cours de création.
        </p>
        <p className="text-gray-400 text-sm">
          Les images seront bientôt disponibles.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, i) => (
          <div
            key={image.id}
            className="relative aspect-square rounded-lg overflow-hidden image-hover-effect bg-gray-200 animate-fade-in cursor-pointer"
            style={{ animationDelay: `${(i % 12) * 0.05}s` }}
            onClick={() => handleImageClick(image, i)}
          >
            <Image
              src={image.url}
              alt={image.altText}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
            {image.description && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-white text-sm">{image.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modale d'affichage en grand */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton fermer */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70"
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

            {/* Bouton précédent */}
            {currentIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage(-1)
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70"
                aria-label="Image précédente"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Bouton suivant */}
            {currentIndex < images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage(1)
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70"
                aria-label="Image suivante"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}

            {/* Image */}
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <Image
                src={selectedImage.url}
                alt={selectedImage.altText}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />

              {/* Informations et bouton télécharger */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent text-white p-6">
                <div className="container-custom">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-lg mb-1">{selectedImage.altText}</p>
                      {selectedImage.description && (
                        <p className="text-sm text-gray-300 mb-2">{selectedImage.description}</p>
                      )}
                      <p className="text-xs text-gray-400">
                        {currentIndex + 1} / {images.length}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownload(selectedImage.url, selectedImage.altText)
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-medium"
                      aria-label="Télécharger l'image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Télécharger
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

