import * as React from "react";
import { cn } from "@/lib/utils";
import { IconCheck } from "@tabler/icons-react";

const Checkbox = React.forwardRef(
  ({ className, checked, indeterminate, ...props }, ref) => (
    <div className="relative inline-flex">
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          "peer size-4 cursor-pointer rounded border border-input bg-background checked:bg-primary checked:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        checked={checked}
        {...props}
      />
      {checked && (
        <IconCheck className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 text-primary-foreground pointer-events-none" />
      )}
      {indeterminate && !checked && (
        <div className="absolute left-1/2 top-1/2 size-2 bg-primary -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      )}
    </div>
  ),
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
