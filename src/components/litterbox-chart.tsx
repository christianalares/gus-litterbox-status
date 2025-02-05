'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex-api'

export const LitterboxChart = () => {
  const { data: visits } = useSuspenseQuery(convexQuery(api.litterboxVisits.get, {}))

  return (
    <div>
      <h1 className="font-sans">Litterbox Chart</h1>
      {visits.map(visit => (
        <div key={visit._id}>
          <p>{visit._id}</p>
          <p>{visit.duration}</p>
        </div>
      ))}
    </div>
  )
}
