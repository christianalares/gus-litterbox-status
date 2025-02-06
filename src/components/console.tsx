'use client'

import { useEffect, useRef } from 'react'

export const Console = () => {
  const mounted = useRef(true)

  useEffect(() => {
    if (mounted.current) {
      console.log('🐈‍⬛ 📊 https://github.com/christianalares/gus-litterbox-status')
    }

    return () => {
      mounted.current = false
    }
  }, [])

  return null
}
