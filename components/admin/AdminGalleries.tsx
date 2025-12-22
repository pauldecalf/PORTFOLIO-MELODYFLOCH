'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  uploadGalleryImage,
  deleteGalleryImage,
  toggleGalleryImageActive,
  updateGalleryImageOrder,
} from '@/app/actions/admin'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'

interface GalleryImage {
  id: string
  gallery: string
  filename: string
  url: string
  altText: string
  description: string | null
  isActive: boolean
  order: number
}

interface AdminGalleriesProps {
  images: GalleryImage[]
}

export default function AdminGalleries({ images: initialImages }: AdminGalleriesProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages)
  const [selectedGallery, setSelectedGallery] = useState<string>('portraits')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const galleries = [
    { value: 'portraits', label: 'Portraits' },
    { value: 'noir-et-blanc', label: 'Portraits Noir & Blanc' },
    { value: 'lifestyle', label: 'À travers mon objectif' },
  ]

  const filteredImages = images
    .filter((img) => img.gallery === selectedGallery)
    .sort((a, b) => a.order - b.order)

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUploading(true)
    setUploadError('')
    setUploadSuccess(false)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await uploadGalleryImage(formData)

      if (result.success) {
        setUploadSuccess(true)
        e.currentTarget.reset()
        // Recharger la page pour afficher la nouvelle image
        window.location.reload()
      } else {
        setUploadError(result.error || 'Erreur lors de l\'upload')
      }
    } catch (error) {
      setUploadError('Erreur lors de l\'upload')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (imageId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) return

    const result = await deleteGalleryImage(imageId)

    if (result.success) {
      setImages((prev) => prev.filter((img) => img.id !== imageId))
    } else {
      alert(result.error || 'Erreur lors de la suppression')
    }
  }

  const handleToggleActive = async (imageId: string) => {
    const result = await toggleGalleryImageActive(imageId)

    if (result.success) {
      setImages((prev) =>
        prev.map((img) =>
          img.id === imageId ? { ...img, isActive: !img.isActive } : img
        )
      )
    } else {
      alert(result.error || 'Erreur lors de la modification')
    }
  }

  const handleOrderChange = async (imageId: string, newOrder: number) => {
    const result = await updateGalleryImageOrder(imageId, newOrder)

    if (result.success) {
      setImages((prev) =>
        prev.map((img) =>
          img.id === imageId ? { ...img, order: newOrder } : img
        )
      )
    } else {
      alert(result.error || 'Erreur lors de la modification')
    }
  }

  return (
    <div className="space-y-6">
      {/* Formulaire d'upload */}
      <Card>
        <CardHeader>
          <CardTitle>Ajouter une image</CardTitle>
          <CardDescription>
            Uploadez une nouvelle image dans votre galerie portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gallery">Galerie *</Label>
              <Select name="gallery" id="gallery" required>
                {galleries.map((gallery) => (
                  <option key={gallery.value} value={gallery.value}>
                    {gallery.label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="altText">Texte alternatif (SEO) *</Label>
              <Input
                type="text"
                name="altText"
                id="altText"
                required
                placeholder="Ex: Portrait lifestyle en extérieur"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optionnelle)</Label>
              <Textarea
                name="description"
                id="description"
                rows={2}
                placeholder="Description de l'image..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Ordre d'affichage</Label>
              <Input
                type="number"
                name="order"
                id="order"
                defaultValue={0}
                min={0}
              />
              <p className="text-xs text-gray-500">
                Les images sont triées par ordre croissant
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Fichier image *</Label>
              <Input
                type="file"
                name="file"
                id="file"
                accept="image/*"
                required
              />
              <p className="text-xs text-gray-500">
                Formats acceptés: JPG, PNG, WebP, GIF (max 10 MB)
              </p>
            </div>

            {uploadError && (
              <div className="p-4 bg-red-50 text-red-800 rounded-md text-sm">
                {uploadError}
              </div>
            )}

            {uploadSuccess && (
              <div className="p-4 bg-green-50 text-green-800 rounded-md text-sm">
                Image uploadée avec succès !
              </div>
            )}

            <Button
              type="submit"
              disabled={isUploading}
              className="w-full"
            >
              {isUploading ? 'Upload en cours...' : 'Uploader l\'image'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Liste des images par galerie */}
      <Card>
        <CardHeader>
          <CardTitle>Images existantes</CardTitle>
          <CardDescription>
            Gérez les images de vos galeries portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Sélecteur de galerie */}
          <div className="mb-6">
            <div className="inline-flex gap-1 p-1 bg-gray-100 rounded-lg">
              {galleries.map((gallery) => {
                const count = images.filter((img) => img.gallery === gallery.value).length
                return (
                  <Button
                    key={gallery.value}
                    onClick={() => setSelectedGallery(gallery.value)}
                    variant={selectedGallery === gallery.value ? 'default' : 'ghost'}
                    size="sm"
                    className="relative"
                  >
                    {gallery.label}
                    <Badge variant="secondary" className="ml-2">
                      {count}
                    </Badge>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Grille d'images */}
          {filteredImages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg font-medium">Aucune image dans cette galerie</p>
              <p className="text-sm mt-2">Commencez par uploader votre première image</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredImages.map((image) => (
                <Card
                  key={image.id}
                  className={!image.isActive ? 'opacity-60' : ''}
                >
                  <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-t-lg">
                    <Image
                      src={image.url}
                      alt={image.altText}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Ordre: {image.order}
                        </span>
                        <Badge variant={image.isActive ? 'success' : 'destructive'}>
                          {image.isActive ? 'Activée' : 'Désactivée'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {image.altText}
                      </p>
                      {image.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {image.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={image.order}
                        onChange={(e) =>
                          handleOrderChange(image.id, parseInt(e.target.value) || 0)
                        }
                        className="w-20 h-9"
                        title="Modifier l'ordre"
                      />

                      <Button
                        onClick={() => handleToggleActive(image.id)}
                        variant={image.isActive ? 'outline' : 'secondary'}
                        size="sm"
                        className="flex-1"
                      >
                        {image.isActive ? 'Désactiver' : 'Activer'}
                      </Button>

                      <Button
                        onClick={() => handleDelete(image.id)}
                        variant="destructive"
                        size="sm"
                      >
                        Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

