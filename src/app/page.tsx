'use client'

import { useQuery } from 'convex/react'
import { api } from '@/../convex/_generated/api'

export default function Home() {
  const visits = useQuery(api.litterboxVisits.get)

  console.log(visits)

  return <main>Hello</main>
}
