'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  uploadGalleryImage,
  uploadMultipleGalleryImages,
  deleteGalleryImage,
  toggleGalleryImageActive,
  updateGalleryImageOrder,
  updateGalleryImage,
} from '@/app/actions/admin'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'

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

interface ImageToUpload {
  file: File
  preview: string
  altText: string
  description: string
  order: number
}

export default function AdminGalleries({ images: initialImages }: AdminGalleriesProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages)
  const [selectedGallery, setSelectedGallery] = useState<string>('portraits')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState(false)
  
  // État pour l'upload multiple
  const [uploadMode, setUploadMode] = useState<'single' | 'multiple'>('single')
  const [selectedFiles, setSelectedFiles] = useState<ImageToUpload[]>([])
  const [isUploadingMultiple, setIsUploadingMultiple] = useState(false)
  
  // État pour l'édition d'image
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [editFormData, setEditFormData] = useState({
    altText: '',
    description: '',
    order: 0,
    gallery: '',
    isActive: true,
  })
  const [isUpdating, setIsUpdating] = useState(false)

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

  const handleEditClick = (image: GalleryImage) => {
    setEditingImage(image)
    setEditFormData({
      altText: image.altText,
      description: image.description || '',
      order: image.order,
      gallery: image.gallery,
      isActive: image.isActive,
    })
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingImage) return

    setIsUpdating(true)
    try {
      const result = await updateGalleryImage(editingImage.id, {
        altText: editFormData.altText,
        description: editFormData.description || null,
        order: editFormData.order,
        gallery: editFormData.gallery,
        isActive: editFormData.isActive,
      })

      if (result.success) {
        setImages((prev) =>
          prev.map((img) =>
            img.id === editingImage.id
              ? {
                  ...img,
                  altText: editFormData.altText,
                  description: editFormData.description || null,
                  order: editFormData.order,
                  gallery: editFormData.gallery,
                  isActive: editFormData.isActive,
                }
              : img
          )
        )
        setEditingImage(null)
      } else {
        alert(result.error || 'Erreur lors de la mise à jour')
      }
    } catch (error) {
      alert('Erreur lors de la mise à jour')
    } finally {
      setIsUpdating(false)
    }
  }

  // Gestion de la sélection multiple de fichiers
  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const newImages: ImageToUpload[] = files.map((file, index) => ({
      file,
      preview: URL.createObjectURL(file),
      altText: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      description: '',
      order: selectedFiles.length + index,
    }))

    setSelectedFiles((prev) => [...prev, ...newImages])
    e.target.value = '' // Réinitialiser l'input
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => {
      const newFiles = [...prev]
      URL.revokeObjectURL(newFiles[index].preview)
      newFiles.splice(index, 1)
      // Réajuster les ordres
      return newFiles.map((img, i) => ({ ...img, order: i }))
    })
  }

  const updateImageData = (index: number, field: keyof ImageToUpload, value: string | number) => {
    setSelectedFiles((prev) => {
      const newFiles = [...prev]
      newFiles[index] = { ...newFiles[index], [field]: value }
      return newFiles
    })
  }

  const handleMultipleUpload = async () => {
    if (selectedFiles.length === 0) {
      setUploadError('Veuillez sélectionner au moins une image')
      return
    }

    // Valider que tous les champs requis sont remplis
    const invalidImages = selectedFiles.filter((img) => !img.altText.trim())
    if (invalidImages.length > 0) {
      setUploadError('Veuillez remplir le texte alternatif pour toutes les images')
      return
    }

    setIsUploadingMultiple(true)
    setUploadError('')
    setUploadSuccess(false)

    try {
      const formData = new FormData()
      formData.append('gallery', selectedGallery)
      
      const imagesData = selectedFiles.map((img, index) => ({
        fileName: img.file.name,
        altText: img.altText.trim(),
        description: img.description.trim() || undefined,
        order: img.order,
        fileIndex: index,
      }))
      
      formData.append('imagesData', JSON.stringify(imagesData))
      
      // Ajouter chaque fichier avec un index
      selectedFiles.forEach((img, index) => {
        formData.append(`file_${index}`, img.file)
      })

      const result = await uploadMultipleGalleryImages(formData)

      if (result.success) {
        setUploadSuccess(true)
        setSelectedFiles([])
        // Nettoyer les previews
        selectedFiles.forEach((img) => URL.revokeObjectURL(img.preview))
        setTimeout(() => window.location.reload(), 2000)
      } else {
        setUploadError(result.error || 'Erreur lors de l\'upload')
      }
    } catch (error) {
      setUploadError('Erreur lors de l\'upload des images')
    } finally {
      setIsUploadingMultiple(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Formulaire d'upload */}
      <Card>
        <CardHeader>
          <CardTitle>Ajouter des images</CardTitle>
          <CardDescription>
            Uploadez une ou plusieurs images dans votre galerie portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={uploadMode} onValueChange={(v) => setUploadMode(v as 'single' | 'multiple')}>
            <TabsList className="mb-6">
              <TabsTrigger value="single">Upload simple</TabsTrigger>
              <TabsTrigger value="multiple">Upload multiple</TabsTrigger>
            </TabsList>

            <TabsContent value="single">
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
                Formats acceptés: JPG, PNG, WebP, GIF (max 20 MB, qualité préservée)
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
            </TabsContent>

            <TabsContent value="multiple">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="gallery-multiple">Galerie *</Label>
                  <Select 
                    id="gallery-multiple"
                    value={selectedGallery}
                    onChange={(e) => setSelectedGallery(e.target.value)}
                  >
                    {galleries.map((gallery) => (
                      <option key={gallery.value} value={gallery.value}>
                        {gallery.label}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="files-multiple">Sélectionner plusieurs images *</Label>
                  <Input
                    type="file"
                    id="files-multiple"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelection}
                  />
                  <p className="text-xs text-gray-500">
                    Formats acceptés: JPG, PNG, WebP, GIF (max 20 MB chacune, qualité préservée)
                  </p>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {selectedFiles.length} image{selectedFiles.length > 1 ? 's' : ''} sélectionnée{selectedFiles.length > 1 ? 's' : ''}
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          selectedFiles.forEach((img) => URL.revokeObjectURL(img.preview))
                          setSelectedFiles([])
                        }}
                      >
                        Tout effacer
                      </Button>
                    </div>

                    <div className="space-y-4 max-h-[600px] overflow-y-auto border rounded-lg p-4">
                      {selectedFiles.map((imageData, index) => (
                        <Card key={index} className="border-gray-200">
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                <Image
                                  src={imageData.preview}
                                  alt={imageData.file.name}
                                  fill
                                  className="object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                  aria-label="Supprimer"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                              <div className="md:col-span-2 space-y-3">
                                <div className="space-y-1">
                                  <Label htmlFor={`altText-${index}`}>Texte alternatif (SEO) *</Label>
                                  <Input
                                    id={`altText-${index}`}
                                    value={imageData.altText}
                                    onChange={(e) => updateImageData(index, 'altText', e.target.value)}
                                    placeholder="Ex: Portrait lifestyle en extérieur"
                                    required
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label htmlFor={`description-${index}`}>Description (optionnelle)</Label>
                                  <Textarea
                                    id={`description-${index}`}
                                    value={imageData.description}
                                    onChange={(e) => updateImageData(index, 'description', e.target.value)}
                                    rows={2}
                                    placeholder="Description de l'image..."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label htmlFor={`order-${index}`}>Ordre d'affichage</Label>
                                  <Input
                                    type="number"
                                    id={`order-${index}`}
                                    value={imageData.order}
                                    onChange={(e) => updateImageData(index, 'order', parseInt(e.target.value) || 0)}
                                    min={0}
                                  />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {uploadError && (
                      <div className="p-4 bg-red-50 text-red-800 rounded-md text-sm">
                        {uploadError}
                      </div>
                    )}

                    {uploadSuccess && (
                      <div className="p-4 bg-green-50 text-green-800 rounded-md text-sm">
                        Images uploadées avec succès !
                      </div>
                    )}

                    <Button
                      type="button"
                      onClick={handleMultipleUpload}
                      disabled={isUploadingMultiple || selectedFiles.length === 0}
                      className="w-full"
                    >
                      {isUploadingMultiple 
                        ? `Upload en cours... (${selectedFiles.length} images)` 
                        : `Uploader ${selectedFiles.length} image${selectedFiles.length > 1 ? 's' : ''}`}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
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
            <div className="flex flex-col md:flex-row gap-1 p-1 bg-gray-100 rounded-lg">
              {galleries.map((gallery) => {
                const count = images.filter((img) => img.gallery === gallery.value).length
                return (
                  <Button
                    key={gallery.value}
                    onClick={() => setSelectedGallery(gallery.value)}
                    variant={selectedGallery === gallery.value ? 'default' : 'ghost'}
                    size="sm"
                    className="relative w-full md:w-auto justify-start md:justify-center"
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
                      quality={100}
                      unoptimized={true}
                    />
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <div className="space-y-4">
                      <div className="flex items-center justify-start pt-4 mt-2">
                        <div className="flex items-center gap-2">
                          <Label className="text-xs text-gray-500 font-semibold">Statut:</Label>
                          <Badge variant={image.isActive ? 'success' : 'destructive'}>
                            {image.isActive ? 'Activée' : 'Désactivée'}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500 font-semibold block mb-1">Texte alternatif:</Label>
                        <p className="text-xs text-gray-500 line-clamp-2 font-light">
                          {image.altText}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500 font-semibold block mb-1">Description:</Label>
                        <p className="text-xs text-gray-500 line-clamp-2 font-light">
                          {image.description || <span className="text-gray-400 italic">Aucune description</span>}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <Button
                          onClick={() => handleEditClick(image)}
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto"
                          aria-label="Modifier l'image"
                        >
                          Modifier
                        </Button>

                        <Button
                          onClick={() => handleToggleActive(image.id)}
                          variant={image.isActive ? 'outline' : 'secondary'}
                          size="sm"
                          className="w-full sm:flex-1"
                          aria-label={image.isActive ? 'Désactiver l\'image' : 'Activer l\'image'}
                        >
                          {image.isActive ? 'Désactiver' : 'Activer'}
                        </Button>

                        <Button
                          onClick={() => handleDelete(image.id)}
                          variant="destructive"
                          size="sm"
                          className="w-full sm:w-auto"
                          aria-label="Supprimer l'image"
                        >
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal d'édition */}
      {editingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Modifier l'image</CardTitle>
              <CardDescription>
                Modifiez les informations de l'image
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={editingImage.url}
                    alt={editingImage.altText}
                    fill
                    className="object-cover"
                    quality={100}
                    unoptimized={true}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-gallery">Galerie *</Label>
                  <Select
                    id="edit-gallery"
                    value={editFormData.gallery}
                    onChange={(e) => setEditFormData({ ...editFormData, gallery: e.target.value })}
                    required
                  >
                    {galleries.map((gallery) => (
                      <option key={gallery.value} value={gallery.value}>
                        {gallery.label}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-altText">Texte alternatif (SEO) *</Label>
                  <Input
                    id="edit-altText"
                    type="text"
                    value={editFormData.altText}
                    onChange={(e) => setEditFormData({ ...editFormData, altText: e.target.value })}
                    required
                    placeholder="Ex: Portrait lifestyle en extérieur"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description (optionnelle)</Label>
                  <Textarea
                    id="edit-description"
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    rows={3}
                    placeholder="Description de l'image..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-order">Ordre d'affichage</Label>
                  <Input
                    id="edit-order"
                    type="number"
                    value={editFormData.order}
                    onChange={(e) => setEditFormData({ ...editFormData, order: parseInt(e.target.value) || 0 })}
                    min={0}
                  />
                  <p className="text-xs text-gray-500">
                    Les images sont triées par ordre croissant
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="edit-isActive"
                    checked={editFormData.isActive}
                    onChange={(e) => setEditFormData({ ...editFormData, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="edit-isActive" className="cursor-pointer">
                    Image activée
                  </Label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingImage(null)}
                    className="w-full sm:flex-1"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full sm:flex-1"
                  >
                    {isUpdating ? 'Mise à jour...' : 'Enregistrer les modifications'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

