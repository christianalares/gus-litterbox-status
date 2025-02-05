'use client'

import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { ReactNode } from 'react'

const NEXT_PUBLIC_CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL

if (!NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('NEXT_PUBLIC_CONVEX_URL is not set')
}

const convex = new ConvexReactClient(NEXT_PUBLIC_CONVEX_URL)

export function Providers({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}
