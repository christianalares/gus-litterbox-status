'use client'

import dynamic from 'next/dynamic'
import { Icon } from './ui/icon'

// const ThemeSwitcher = dynamic(() => import('./theme-switcher'), { ssr: false })

const ThemeSwitcher = dynamic(() => import('@/components/theme-switcher').then(({ ThemeSwitcher }) => ThemeSwitcher), {
  ssr: false,
  // loading: () => <Skeleton className="w-36 h-8" />,
})

export const Header = () => {
  return (
    <header className="px-4 py-4 border-b flex items-center justify-between">
      <span className="font-bold font-roboto-slab text-muted-foreground flex items-center gap-4">
        <Icon name="cat" className="text-foreground" />
        <span className="border-l pl-4 text-[clamp(1.2rem,_4vw,_1.5rem)]">Gus Litterbox Stats</span>
      </span>

      <ThemeSwitcher />
    </header>
  )
}
