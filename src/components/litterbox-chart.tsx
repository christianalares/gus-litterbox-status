'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex-api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'
import groupBy from 'lodash.groupby'

export const LitterboxChart = () => {
  const { data: visits } = useSuspenseQuery(convexQuery(api.litterboxVisits.get, {}))

  const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const groupedByDay = groupBy(visits, visit => {
    const day = new Date(visit.createdAt).toLocaleDateString('en-US', { weekday: 'long' })
    return day
  })

  const formattedData = DAYS_OF_WEEK.map(day => ({
    day,
    amount: groupedByDay[day]?.length ?? 0,
  }))

  return (
    <Card className="rounded-none h-full flex flex-col">
      <CardHeader>
        <CardTitle>Litterbox Visits</CardTitle>
        <CardDescription>By day of the week</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <ChartContainer
          className="aspect-auto h-[250px] md:h-full w-full"
          config={{
            amount: {
              label: 'Visits',
              color: 'var(--color-chart-1)',
            },
          }}
        >
          <BarChart accessibilityLayer data={formattedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
