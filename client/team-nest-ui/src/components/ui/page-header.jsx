import * as React from "react";
import { cn } from "@/lib/utils";

function PageHeader({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function PageHeaderHeading({ className, children, icon: Icon, ...props }) {
  return (
    <div className="flex items-start sm:items-center gap-2 sm:gap-3 min-w-0">
      {Icon && (
        <div className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-4 sm:size-5" />
        </div>
      )}
      <div
        className={cn("space-y-0.5 sm:space-y-1 min-w-0", className)}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

function PageHeaderTitle({ className, ...props }) {
  return (
    <h1
      className={cn(
        "text-xl sm:text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function PageHeaderDescription({ className, ...props }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

function PageHeaderActions({ className, ...props }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 mt-4 sm:mt-0 w-full sm:w-auto",
        className,
      )}
      {...props}
    />
  );
}

export {
  PageHeader,
  PageHeaderHeading,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
};
