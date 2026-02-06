// Types pour remplacer les types Prisma

export interface SessionType {
  id: string
  _id?: any
  name: string
  slug: string
  description: string
  duration: number
  price: number
  isActive: boolean
  order: number
  createdAt?: Date
  updatedAt?: Date
}

export interface Booking {
  id: string
  _id?: any
  sessionTypeId: string
  sessionType?: SessionType
  date: Date
  startTime: string
  endTime: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  message?: string
  status: string
  internalNotes?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface WeeklyAvailability {
  id: string
  _id?: any
  dayOfWeek: number
  startTime: string
  endTime: string
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface BlockedDate {
  id: string
  _id?: any
  date: Date
  reason?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface SiteImage {
  id: string
  _id?: any
  key: string
  filename: string
  url: string
  altText: string
  category: string
  description?: string
  isActive: boolean
  order: number
  createdAt?: Date
  updatedAt?: Date
}

export interface GalleryImage {
  id: string
  _id?: any
  gallery: string
  filename: string
  url: string
  altText: string
  description: string | null
  isActive: boolean
  order: number
  createdAt?: Date
  updatedAt?: Date
}

export interface EmailLog {
  id: string
  _id?: any
  recipient: string
  subject: string
  content: string
  sentAt: Date
  sentBy: string
  bookingId?: string
  status: string
}
