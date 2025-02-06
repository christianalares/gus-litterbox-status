import type { Metadata } from 'next'
import { Geist, Geist_Mono, Roboto_Slab } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { cn } from '@/lib/utils'
import { Header } from '@/components/header'
import { Console } from '@/components/console'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const robotoSlab = Roboto_Slab({
  variable: '--font-roboto-slab',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Gus Litterbox Stats',
  description: "Real-time stats for my cat Gus's litterbox habits",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(geistSans.variable, geistMono.variable, robotoSlab.variable)}
    >
      <body className="antialiased">
        <Providers>
          <Console />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
