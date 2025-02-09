'use client'

import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { OpenPanelComponent } from '@openpanel/nextjs'

const NEXT_PUBLIC_CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL
const NEXT_PUBLIC_OPENPANEL_DASHBOARD_CLIENT_ID = process.env.NEXT_PUBLIC_OPENPANEL_DASHBOARD_CLIENT_ID
const OPENPANEL_SECRET = process.env.OPENPANEL_SECRET

if (!NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('NEXT_PUBLIC_CONVEX_URL is not set')
}

if (!NEXT_PUBLIC_OPENPANEL_DASHBOARD_CLIENT_ID) {
  throw new Error('NEXT_PUBLIC_OPENPANEL_DASHBOARD_CLIENT_ID is not set')
}

if (!OPENPANEL_SECRET) {
  throw new Error('OPENPANEL_SECRET is not set')
}

const convex = new ConvexReactClient(NEXT_PUBLIC_CONVEX_URL)

const convexQueryClient = new ConvexQueryClient(convex)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
})

convexQueryClient.connect(queryClient)

const ThemeProvider = ({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

const OpenPanelProvider = () => {
  return (
    <>
      <OpenPanelComponent
        clientId={NEXT_PUBLIC_OPENPANEL_DASHBOARD_CLIENT_ID}
        clientSecret={OPENPANEL_SECRET}
        trackScreenViews
        disabled={process.env.NODE_ENV !== 'production'}
        trackOutgoingLinks
      />
    </>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OpenPanelProvider />

      <ConvexProvider client={convex}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </ConvexProvider>
    </>
  )
}
