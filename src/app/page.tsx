import { ChartByDayOfWeek, ChartByDayOfWeekSkeleton } from '@/components/chart-by-day-of-week'
import Image from 'next/image'
import { Suspense } from 'react'
import gus from '@/assets/gus.webp'
import { ChartByMonth, ChartByMonthSkeleton } from '@/components/chart-by-month'
import { NumberOfVisitsNumber } from '@/components/number-of-visits-number'
import { Ping } from '@/components/ping'

export default function Home() {
  return (
    <main className="p-4 md:p-8 relative max-w-7xl mx-auto">
      <Ping />

      <div className="flex flex-col gap-8">
        <div className="items-center flex flex-col sm:flex-row sm:h-60 gap-4">
          <div className="max-h-60 aspect-square rounded-4xl overflow-hidden">
            <Image priority src={gus} alt="Gus" width={1000} height={1000} />
          </div>

          <div className="flex-1 flex items-center justify-center">
            <NumberOfVisitsNumber />
          </div>
        </div>

        <Suspense fallback={<ChartByDayOfWeekSkeleton />}>
          <ChartByDayOfWeek />
        </Suspense>

        <Suspense fallback={<ChartByMonthSkeleton />}>
          <ChartByMonth />
        </Suspense>
      </div>
    </main>
  )
}
