import { NavLink } from "react-router";
import { cn } from "@/lib/utils";

export function AppLogo({ className, showText = true, size = "default", href = "/dashboard", asLink = true }) {
  const sizes = {
    sm: "size-9",
    default: "size-10",
    lg: "size-12",
  };

  const iconSizes = {
    sm: "size-5",
    default: "size-6",
    lg: "size-7",
  };

  const textSizes = {
    sm: "text-lg",
    default: "text-xl",
    lg: "text-2xl",
  };

  const wrapperClasses = cn("flex items-center gap-2.5 group/logo", asLink && "cursor-pointer", className);

  const content = (
    <>
      {/* Logo Icon */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl bg-primary flex-shrink-0",
          "shadow-lg shadow-primary/25",
          "transition-all duration-500 ease-out",
          "group-hover/logo:shadow-xl group-hover/logo:shadow-primary/40",
          "group-hover/logo:scale-105",
          "animate-pulse-glow",
          sizes[size]
        )}
      >
        {/* Nest icon - stylized bird/home shape */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={cn(
            "text-primary-foreground transition-transform duration-500",
            "group-hover/logo:rotate-[10deg]",
            iconSizes[size]
          )}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Nest base */}
          <path
            d="M4 19c0-4 4-6 8-6s8 2 8 6"
            strokeLinecap="round"
            fill="currentColor"
            fillOpacity="0.2"
            className="origin-center transition-all duration-500"
          />
          {/* Bird shape */}
          <path
            d="M12 13c-2.5 0-4.5-2-4.5-4.5S9.5 4 12 4s4.5 2 4.5 4.5-2 4.5-4.5 4.5z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          {/* Wing detail */}
          <path
            d="M9 8.5c0 1.5 1.5 3 3 3s3-1.5 3-3-1.5-2.5-3-2.5-3 1-3 2.5z"
            fill="currentColor"
            className="origin-center"
          />
          {/* Eye */}
          <circle cx="13" cy="7" r="0.5" fill="currentColor" />
        </svg>
        
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
        
        {/* Shine effect on hover */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 overflow-hidden"
        >
          <div 
            className="absolute inset-0 -translate-x-full group-hover/logo:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </div>
      </div>

      {/* Logo Text */}
      <div 
        className={cn(
          "flex flex-col min-w-0 overflow-hidden transition-all duration-300 ease-in-out",
          showText ? "w-auto opacity-100" : "w-0 opacity-0"
        )}
      >
        <span
          className={cn(
            "font-bold tracking-tight text-foreground leading-none whitespace-nowrap",
            "transition-all duration-300",
            textSizes[size]
          )}
        >
          <span className="inline-block transition-transform duration-300 group-hover/logo:translate-x-0.5">
            Team
          </span>
          <span 
            className="inline-block text-primary transition-all duration-300 group-hover/logo:translate-x-1 group-hover/logo:scale-110 group-hover/logo:text-violet-500"
          >
            Nest
          </span>
        </span>
        <span 
          className={cn(
            "text-[10px] font-medium text-muted-foreground tracking-wide uppercase whitespace-nowrap",
            "transition-all duration-500 delay-75",
            "group-hover/logo:tracking-widest group-hover/logo:text-muted-foreground/80"
          )}
        >
          Collaboration Hub
        </span>
      </div>
      
      {/* Add keyframe styles */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 10px 15px -3px oklch(0.51 0.23 277 / 0.25), 0 4px 6px -4px oklch(0.51 0.23 277 / 0.25);
          }
          50% {
            box-shadow: 0 10px 25px -3px oklch(0.51 0.23 277 / 0.45), 0 4px 10px -4px oklch(0.51 0.23 277 / 0.35);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );

  if (asLink) {
    return (
      <NavLink to={href} className={wrapperClasses}>
        {content}
      </NavLink>
    );
  }

  return (
    <div className={wrapperClasses}>
      {content}
    </div>
  );
}

export default AppLogo;
