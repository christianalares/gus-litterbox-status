import { LitterboxChart } from '@/components/litterbox-chart'
import Image from 'next/image'
import { Suspense } from 'react'
import gus from '@/assets/gus.webp'

export default function Home() {
  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        <div className="self-center aspect-square max-w-[40dvw] rounded-4xl overflow-hidden">
          <Image priority src={gus} alt="Gus" width={1000} height={1000} className="w-full h-full" />
        </div>

        <div className="flex-1 rounded-4xl h-[200px] md:h-auto overflow-hidden border border-foreground/20">
          <Suspense fallback={<div>Loading...</div>}>
            <LitterboxChart />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
