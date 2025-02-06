import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

export const Ping = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger className="absolute top-4 right-4">
          <div>
            <div className="size-3 animate-ping rounded-full bg-emerald-500" style={{ animationDuration: '2s' }} />
            <div className="absolute left-0 top-0 size-3 rounded-full bg-emerald-500" />
          </div>
        </TooltipTrigger>

        <TooltipContent align="center" side="left" sideOffset={12}>
          <p>All data is live</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
