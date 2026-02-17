import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const colorVariants = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    gradient: "from-primary to-primary/60",
  },
  info: {
    bg: "bg-info/10", 
    text: "text-info",
    gradient: "from-info to-info/60",
  },
  success: {
    bg: "bg-success/10",
    text: "text-success", 
    gradient: "from-success to-success/60",
  },
  warning: {
    bg: "bg-warning/10",
    text: "text-warning",
    gradient: "from-warning to-warning/60",
  },
  pending: {
    bg: "bg-pending/10",
    text: "text-pending",
    gradient: "from-pending to-pending/60",
  },
  destructive: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    gradient: "from-destructive to-destructive/60",
  },
  muted: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    gradient: "from-muted-foreground to-muted-foreground/60",
  },
}

function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "primary",
  trend,
  trendLabel,
  progress,
  className,
  ...props
}) {
  const colors = colorVariants[color] || colorVariants.primary

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-primary/5",
        className
      )} 
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <div className={cn("flex size-9 items-center justify-center rounded-lg", colors.bg)}>
            <Icon className={cn("size-4", colors.text)} />
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tabular-nums">{value}</span>
          {trend && (
            <span className={cn(
              "text-xs font-medium",
              trend > 0 ? "text-success" : trend < 0 ? "text-destructive" : "text-muted-foreground"
            )}>
              {trend > 0 ? "+" : ""}{trend}%
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
        {progress !== undefined && (
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div 
              className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-500", colors.gradient)}
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function StatsCardGrid({ className, children, ...props }) {
  return (
    <div 
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
}

export { StatsCard, StatsCardGrid, colorVariants }
