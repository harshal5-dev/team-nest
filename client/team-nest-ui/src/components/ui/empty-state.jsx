import * as React from "react"
import { cn } from "@/lib/utils"
import { IconInbox } from "@tabler/icons-react"

function EmptyState({
  icon: Icon = IconInbox,
  title = "No data found",
  description,
  action,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 px-6 py-12 text-center",
        className
      )}
      {...props}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-muted/50 text-muted-foreground/70 mb-4">
        <Icon className="size-6" />
      </div>
      <h3 className="text-sm font-medium text-foreground mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

export { EmptyState }
