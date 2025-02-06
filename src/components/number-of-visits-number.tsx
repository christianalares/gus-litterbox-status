'use client'

import { api } from '@convex-api'
import { convexQuery } from '@convex-dev/react-query'
import { useQuery } from '@tanstack/react-query'
import NumberFlow from '@number-flow/react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export const NumberOfVisitsNumber = () => {
  const { data: visits, isLoading } = useQuery(convexQuery(api.litterboxVisits.get, {}))
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const displayValue = visits?.length ?? 0

  const shouldShow = !isMounted || isLoading

  return (
    <div
      className={cn(
        'transition-opacity duration-300 flex flex-col items-center',
        shouldShow ? 'opacity-0' : 'opacity-100'
      )}
    >
      <NumberFlow className="text-8xl font-mono" value={displayValue} />
      <motion.span
        className="text-2xl text-muted-foreground/40"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: shouldShow ? 20 : -20, opacity: shouldShow ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        total litterbox visits
      </motion.span>
    </div>
  )
}
