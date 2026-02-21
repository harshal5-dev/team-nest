import { cn } from "@/lib/utils";
import { FormLabel } from "./form";

function RequiredLabel({ children, className, required = true }) {
  return (
    <FormLabel className={cn("flex items-center gap-1", className)}>
      <span>{children}</span>
      {required ? (
        <>
          <span className="text-destructive font-semibold" aria-hidden="true">
            *
          </span>
          <span className="sr-only">(required)</span>
        </>
      ) : (
        <span className="text-xs font-normal text-muted-foreground">
          (Optional)
        </span>
      )}
    </FormLabel>
  );
}

export default RequiredLabel;
