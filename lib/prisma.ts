// Émulation de l'API Prisma avec MongoDB natif
import { getCollection } from './mongodb'
import { ObjectId } from 'mongodb'

export const prisma = {
  booking: {
    findMany: async (options?: any) => {
      const col = await getCollection('bookings')
      const query = options?.where || {}
      let cursor = col.find(query)
      if (options?.orderBy) cursor = cursor.sort(options.orderBy)
      return cursor.toArray()
    },
    findUnique: async (options: any) => {
      const col = await getCollection('bookings')
      return col.findOne({ _id: new ObjectId(options.where.id) })
    },
    create: async (options: any) => {
      const col = await getCollection('bookings')
      const doc = { ...options.data, createdAt: new Date(), updatedAt: new Date() }
      const result = await col.insertOne(doc)
      return { ...doc, id: result.insertedId.toString() }
    },
    update: async (options: any) => {
      const col = await getCollection('bookings')
      const data = { ...options.data, updatedAt: new Date() }
      await col.updateOne({ _id: new ObjectId(options.where.id) }, { $set: data })
      return data
    },
    delete: async (options: any) => {
      const col = await getCollection('bookings')
      await col.deleteOne({ _id: new ObjectId(options.where.id) })
      return {}
    },
  },
  sessionType: {
    findMany: async (options?: any) => {
      const col = await getCollection('sessionTypes')
      return col.find(options?.where || {}).toArray()
    },
    findUnique: async (options: any) => {
      const col = await getCollection('sessionTypes')
      return col.findOne({ _id: new ObjectId(options.where.id) })
    },
  },
  weeklyAvailability: {
    findMany: async (options?: any) => {
      const col = await getCollection('weeklyAvailabilities')
      return col.find(options?.where || {}).toArray()
    },
    findFirst: async (options?: any) => {
      const col = await getCollection('weeklyAvailabilities')
      return col.findOne(options?.where || {})
    },
  },
  blockedDate: {
    findMany: async () => {
      const col = await getCollection('blockedDates')
      return col.find({}).toArray()
    },
    findFirst: async (options?: any) => {
      const col = await getCollection('blockedDates')
      return col.findOne(options?.where || {})
    },
    create: async (options: any) => {
      const col = await getCollection('blockedDates')
      const doc = { ...options.data, createdAt: new Date(), updatedAt: new Date() }
      const result = await col.insertOne(doc)
      return { ...doc, id: result.insertedId.toString() }
    },
    delete: async (options: any) => {
      const col = await getCollection('blockedDates')
      await col.deleteOne({ _id: new ObjectId(options.where.id) })
      return {}
    },
  },
  siteImage: {
    findMany: async (options?: any) => {
      const col = await getCollection('siteImages')
      return col.find(options?.where || {}).toArray()
    },
    findFirst: async (options?: any) => {
      const col = await getCollection('siteImages')
      return col.findOne(options?.where || {})
    },
    findUnique: async (options: any) => {
      const col = await getCollection('siteImages')
      return col.findOne({ _id: new ObjectId(options.where.id) })
    },
    create: async (options: any) => {
      const col = await getCollection('siteImages')
      const doc = { ...options.data, createdAt: new Date(), updatedAt: new Date() }
      const result = await col.insertOne(doc)
      return { ...doc, id: result.insertedId.toString() }
    },
    update: async (options: any) => {
      const col = await getCollection('siteImages')
      const data = { ...options.data, updatedAt: new Date() }
      await col.updateOne({ _id: new ObjectId(options.where.id) }, { $set: data })
      return data
    },
    delete: async (options: any) => {
      const col = await getCollection('siteImages')
      await col.deleteOne({ _id: new ObjectId(options.where.id) })
      return {}
    },
  },
  galleryImage: {
    findMany: async (options?: any) => {
      const col = await getCollection('galleryImages')
      return col.find(options?.where || {}).toArray()
    },
    count: async (options?: any) => {
      const col = await getCollection('galleryImages')
      return col.countDocuments(options?.where || {})
    },
    create: async (options: any) => {
      const col = await getCollection('galleryImages')
      const doc = { ...options.data, createdAt: new Date(), updatedAt: new Date() }
      const result = await col.insertOne(doc)
      return { ...doc, id: result.insertedId.toString() }
    },
    update: async (options: any) => {
      const col = await getCollection('galleryImages')
      const data = { ...options.data, updatedAt: new Date() }
      await col.updateOne({ _id: new ObjectId(options.where.id) }, { $set: data })
      return data
    },
    delete: async (options: any) => {
      const col = await getCollection('galleryImages')
      await col.deleteOne({ _id: new ObjectId(options.where.id) })
      return {}
    },
  },
  emailLog: {
    findMany: async (options?: any) => {
      const col = await getCollection('emailLogs')
      return col.find(options?.where || {}).toArray()
    },
    create: async (options: any) => {
      const col = await getCollection('emailLogs')
      const doc = { ...options.data, sentAt: new Date() }
      const result = await col.insertOne(doc)
      return { ...doc, id: result.insertedId.toString() }
    },
  },
  $disconnect: async () => {},
}
