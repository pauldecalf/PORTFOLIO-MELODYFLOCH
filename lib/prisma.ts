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
      const results = await cursor.toArray()
      return results.map((doc: any) => ({ ...doc, id: doc._id.toString() }))
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
      let cursor = col.find(options?.where || {})
      if (options?.orderBy) cursor = cursor.sort(options.orderBy)
      const results = await cursor.toArray()
      return results.map((doc: any) => ({ ...doc, id: doc._id.toString() }))
    },
    findUnique: async (options: any) => {
      const col = await getCollection('sessionTypes')
      return col.findOne({ _id: new ObjectId(options.where.id) })
    },
    count: async (options?: any) => {
      const col = await getCollection('sessionTypes')
      return col.countDocuments(options?.where || {})
    },
    upsert: async (options: any) => {
      const col = await getCollection('sessionTypes')
      const existing = await col.findOne(options.where)
      if (existing) {
        const data = { ...options.update, updatedAt: new Date() }
        await col.updateOne(options.where, { $set: data })
        return { ...existing, ...data }
      } else {
        const doc = { ...options.create, createdAt: new Date(), updatedAt: new Date(), isActive: true }
        const result = await col.insertOne(doc)
        return { ...doc, id: result.insertedId.toString() }
      }
    },
  },
  weeklyAvailability: {
    findMany: async (options?: any) => {
      const col = await getCollection('weeklyAvailabilities')
      const results = await col.find(options?.where || {}).toArray()
      return results.map((doc: any) => ({ ...doc, id: doc._id.toString() }))
    },
    findFirst: async (options?: any) => {
      const col = await getCollection('weeklyAvailabilities')
      return col.findOne(options?.where || {})
    },
    create: async (options: any) => {
      const col = await getCollection('weeklyAvailabilities')
      const doc = { ...options.data, createdAt: new Date(), updatedAt: new Date(), isActive: true }
      const result = await col.insertOne(doc)
      return { ...doc, id: result.insertedId.toString() }
    },
  },
  blockedDate: {
    findMany: async (options?: any) => {
      const col = await getCollection('blockedDates')
      let cursor = col.find(options?.where || {})
      if (options?.orderBy) cursor = cursor.sort(options.orderBy)
      const results = await cursor.toArray()
      return results.map((doc: any) => ({ ...doc, id: doc._id.toString() }))
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
      let cursor = col.find(options?.where || {})
      if (options?.orderBy) cursor = cursor.sort(options.orderBy)
      const results = await cursor.toArray()
      return results.map((doc: any) => ({ ...doc, id: doc._id.toString() }))
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
    upsert: async (options: any) => {
      const col = await getCollection('siteImages')
      const existing = await col.findOne(options.where)
      if (existing) {
        const data = { ...options.update, updatedAt: new Date() }
        await col.updateOne(options.where, { $set: data })
        return { ...existing, ...data }
      } else {
        const doc = { ...options.create, createdAt: new Date(), updatedAt: new Date() }
        const result = await col.insertOne(doc)
        return { ...doc, id: result.insertedId.toString() }
      }
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
      let cursor = col.find(options?.where || {})
      if (options?.orderBy) cursor = cursor.sort(options.orderBy)
      const results = await cursor.toArray()
      return results.map((doc: any) => ({ ...doc, id: doc._id.toString() }))
    },
    findUnique: async (options: any) => {
      const col = await getCollection('galleryImages')
      return col.findOne({ _id: new ObjectId(options.where.id) })
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
    upsert: async (options: any) => {
      const col = await getCollection('galleryImages')
      const existing = await col.findOne(options.where)
      if (existing) {
        const data = { ...options.update, updatedAt: new Date() }
        await col.updateOne(options.where, { $set: data })
        return { ...existing, ...data }
      } else {
        const doc = { ...options.create, createdAt: new Date(), updatedAt: new Date() }
        const result = await col.insertOne(doc)
        return { ...doc, id: result.insertedId.toString() }
      }
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
      let cursor = col.find(options?.where || {})
      if (options?.orderBy) cursor = cursor.sort(options.orderBy)
      const results = await cursor.toArray()
      return results.map((doc: any) => ({ ...doc, id: doc._id.toString() }))
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
