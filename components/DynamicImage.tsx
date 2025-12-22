import Image from 'next/image'
import { getImageByKey } from '@/lib/images'

interface DynamicImageProps {
  imageKey: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  placeholderText?: string
}

export default async function DynamicImage({
  imageKey,
  alt,
  className = '',
  fill = false,
  width,
  height,
  priority = false,
  placeholderText,
}: DynamicImageProps) {
  const image = await getImageByKey(imageKey)

  // Si une image est uploadée, l'afficher
  if (image) {
    if (fill) {
      return (
        <Image
          src={image.url}
          alt={image.altText || alt}
          fill
          className={className}
          priority={priority}
          style={{ objectFit: 'cover' }}
        />
      )
    }

    return (
      <Image
        src={image.url}
        alt={image.altText || alt}
        width={width || 800}
        height={height || 600}
        className={className}
        priority={priority}
      />
    )
  }

  // Sinon, afficher un placeholder
  return (
    <div
      className={`bg-gradient-to-br from-gray-300 to-gray-200 flex items-center justify-center ${className}`}
      style={fill ? { position: 'absolute', inset: 0 } : { width: width || 800, height: height || 600 }}
    >
      <span className="text-gray-400 text-sm text-center px-4">
        {placeholderText || imageKey}
      </span>
    </div>
  )
}


