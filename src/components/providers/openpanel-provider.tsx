import { OpenPanelComponent } from '@openpanel/nextjs'

export const OpenPanelProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OpenPanelComponent
        clientId={process.env.NEXT_PUBLIC_OPENPANEL_DASHBOARD_CLIENT_ID!}
        clientSecret={process.env.OPENPANEL_SECRET!}
        trackScreenViews
        disabled={process.env.NODE_ENV !== 'production'}
        trackOutgoingLinks
      />
      {children}
    </>
  )
}
