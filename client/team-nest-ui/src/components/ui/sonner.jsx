import { useTheme } from "@/components/ThemeProvider"
import { Toaster as Sonner, toast } from "sonner";
import { IconCircleCheck, IconInfoCircle, IconAlertTriangle, IconAlertOctagon, IconLoader } from "@tabler/icons-react"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      position="top-right"
      richColors
      icons={{
        success: (
          <IconCircleCheck className="size-4" />
        ),
        info: (
          <IconInfoCircle className="size-4" />
        ),
        warning: (
          <IconAlertTriangle className="size-4" />
        ),
        error: (
          <IconAlertOctagon className="size-4" />
        ),
        loading: (
          <IconLoader className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        }
      }
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props} />
  );
}

// Helper functions for toast notifications
const showToast = {
  success: (message, options = {}) => {
    toast.success(message, {
      duration: 4000,
      ...options,
    });
  },
  error: (message, options = {}) => {
    toast.error(message, {
      duration: 5000,
      ...options,
    });
  },
  info: (message, options = {}) => {
    toast.info(message, {
      duration: 4000,
      ...options,
    });
  },
  warning: (message, options = {}) => {
    toast.warning(message, {
      duration: 4500,
      ...options,
    });
  },
  loading: (message, options = {}) => {
    return toast.loading(message, options);
  },
  promise: (promise, messages) => {
    return toast.promise(promise, messages);
  },
  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },
};

export { Toaster, showToast, toast }
