'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex-api'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'
import { eachDayOfInterval, endOfWeek, format, isSameDay, startOfWeek } from 'date-fns'

export const ChartByDayOfWeek = () => {
  const { data: visits } = useSuspenseQuery(convexQuery(api.litterboxVisits.get, {}))

  const daysInWeek = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  })

  const formattedData = daysInWeek.map(day => {
    const visitsFromDay = visits.filter(visit => isSameDay(new Date(visit.createdAt), day))

    return {
      day: format(day, 'EEEE'),
      amount: visitsFromDay.length,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">By day of the week</CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <ChartContainer
          className="aspect-auto h-[250px] w-full"
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

export const ChartByDayOfWeekSkeleton = () => {
  // Just a random number for the bars lines to show
  const mockValues = [100]

  const daysInWeek = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  })

  const mockData = Array.from({ length: daysInWeek.length }, (_, i) => ({
    day: format(daysInWeek[i], 'EEEE'),
    amount: mockValues[i],
  }))

  return (
    <Card className="relative">
      <p className="font-mono font-bold text-2xl animate-pulse absolute inset-0 flex items-center justify-center">
        Loading data
      </p>

      <CardHeader>
        <CardTitle className="text-base">By day of the week</CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <ChartContainer
          className="aspect-auto h-[250px] w-full"
          config={{
            amount: {
              label: 'Visits',
              color: 'var(--color-border)',
            },
          }}
        >
          <BarChart accessibilityLayer data={mockData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
            />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={8} className="hidden" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
