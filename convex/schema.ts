import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  litterboxVisits: defineTable({
    duration: v.number(),
    createdAt: v.number(),
  }).index('by_createdAt', ['createdAt']),
})
