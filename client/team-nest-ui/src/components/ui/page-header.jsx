import * as React from "react"
import { cn } from "@/lib/utils"

function PageHeader({ className, children, ...props }) {
  return (
    <div 
      className={cn(
        "flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
}

function PageHeaderHeading({ className, children, icon: Icon, ...props }) {
  return (
    <div className="flex items-center gap-3">
      {Icon && (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
      )}
      <div className={cn("space-y-1", className)} {...props}>
        {children}
      </div>
    </div>
  )
}

function PageHeaderTitle({ className, ...props }) {
  return (
    <h1 
      className={cn(
        "text-2xl font-semibold tracking-tight",
        className
      )} 
      {...props} 
    />
  )
}

function PageHeaderDescription({ className, ...props }) {
  return (
    <p 
      className={cn(
        "text-sm text-muted-foreground",
        className
      )} 
      {...props} 
    />
  )
}

function PageHeaderActions({ className, ...props }) {
  return (
    <div 
      className={cn(
        "flex items-center gap-2 mt-4 sm:mt-0",
        className
      )} 
      {...props} 
    />
  )
}

export {
  PageHeader,
  PageHeaderHeading,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
}
