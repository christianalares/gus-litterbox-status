import { cn } from '@/lib/utils'

import { Calendar, Cat, Monitor, Moon, Sun, type LucideProps } from 'lucide-react'

const icons = {
  calendar: Calendar,
  cat: Cat,
  moon: Moon,
  sun: Sun,
  monitor: Monitor,
}

export type IconName = keyof typeof icons

type IconProps = {
  name: IconName
  className?: string
} & LucideProps

export const Icon = ({ name, className, ...restProps }: IconProps) => {
  const IconComponent = icons[name]

  return <IconComponent className={cn(className)} {...restProps} />
}
