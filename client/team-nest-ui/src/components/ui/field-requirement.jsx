import { cn } from "@/lib/utils";
import { FormLabel } from "./form";
import { Label } from "./label";

function RequiredLabel({ children, className, required = true, htmlFor }) {
  const LabelComponent = htmlFor ? Label : FormLabel;
  const labelProps = htmlFor ? { htmlFor } : {};

  return (
    <LabelComponent
      className={cn("flex items-center gap-1", className)}
      {...labelProps}
    >
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
    </LabelComponent>
  );
}

export default RequiredLabel;
