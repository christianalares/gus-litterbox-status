import { api } from './_generated/api'
import { httpAction, mutation, query } from './_generated/server'
import { z } from 'zod'
import { v } from 'convex/values'

export const get = query({
  args: {},
  handler: async ctx => {
    const visits = await ctx.db.query('litterboxVisits').withIndex('by_createdAt').order('asc').collect()

    return visits
  },
})

export const post = mutation({
  args: {
    duration: v.number(),
    createdAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const createdVisit = await ctx.db.insert('litterboxVisits', {
      duration: args.duration,
      createdAt: args.createdAt ?? Date.now(),
    })

    return createdVisit
  },
})

const postVisitSchema = z.object({
  duration: z.number(),
  createdAt: z.number().optional(),
})

export const postVisit = httpAction(async (ctx, request) => {
  const body = await request.json()
  const headers = request.headers

  const authHeader = headers.get('Authorization')

  if (authHeader !== `Bearer ${process.env.CONVEX_POST_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const parsedBody = postVisitSchema.safeParse(body)

  if (!parsedBody.success) {
    return new Response('Invalid body', { status: 400 })
  }

  await ctx.runMutation(api.litterboxVisits.post, {
    duration: parsedBody.data.duration,
    createdAt: parsedBody.data.createdAt,
  })

  return new Response(null, {
    status: 200,
    headers: new Headers({
      'Access-Control-Allow-Origin': 'https://my.homey.app',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }),
  })
})
