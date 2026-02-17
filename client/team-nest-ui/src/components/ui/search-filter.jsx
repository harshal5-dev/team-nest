import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IconSearch, IconFilter, IconX } from "@tabler/icons-react"

function SearchFilter({ className, children, ...props }) {
  return (
    <div 
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
}

function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Search...",
  className,
  ...props 
}) {
  return (
    <div className={cn("relative flex-1 max-w-sm", className)}>
      <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="pl-9 h-9 bg-muted/40 border-transparent focus:bg-background focus:border-input transition-colors"
        {...props}
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 size-6 hover:bg-transparent"
          onClick={() => onChange?.("")}
        >
          <IconX className="size-3" />
        </Button>
      )}
    </div>
  )
}

function FilterSelect({
  value,
  onChange,
  placeholder = "Filter",
  options = [],
  icon: Icon = IconFilter,
  className,
  ...props
}) {
  return (
    <Select value={value} onValueChange={onChange} {...props}>
      <SelectTrigger className={cn("w-[160px] h-9 bg-muted/40 border-transparent focus:bg-background focus:border-input", className)}>
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-muted-foreground" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { SearchFilter, SearchInput, FilterSelect }
