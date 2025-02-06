'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex-api'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'
import { useState } from 'react'
import { eachDayOfInterval, endOfMonth, format, isSameDay, startOfMonth } from 'date-fns'
import { MonthDropdown } from './month-dropdown'

export const ChartByMonth = () => {
  const [month, setMonth] = useState(new Date())

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month),
  })

  const { data: visits } = useSuspenseQuery(
    convexQuery(api.litterboxVisits.get, {
      interval: {
        start: startOfMonth(new Date(month)).getTime(),
        end: endOfMonth(new Date(month)).getTime(),
      },
    })
  )

  const formattedData = daysInMonth.map(day => {
    const visitsFromDay = visits.filter(visit => isSameDay(new Date(visit.createdAt), day))

    return {
      day: format(day, 'dd'),
      amount: visitsFromDay.length,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2 justify-between">
          <div>
            <span>By month</span>
          </div>

          <MonthDropdown selectedMonth={month} onChange={setMonth} />
          {/* <span className="text-sm text-muted-foreground">{visits.length} visits</span> */}
        </CardTitle>
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

export const ChartByMonthSkeleton = () => {
  // Just a random number for the bars lines to show
  const mockValues = [100]

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  })

  const mockData = Array.from({ length: daysInMonth.length }, (_, i) => ({
    day: format(daysInMonth[i], 'dd'),
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
