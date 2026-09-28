"use client"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cn } from "@/lib/utils"

function ToggleGroup({
  className,
  ...props
}: ToggleGroupPrimitive.Props) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      className={cn(
        "inline-flex items-center gap-1 rounded-xl border border-border bg-surface p-1",
        "shadow-highlight",
        className
      )}
      {...props}
    />
  )
}

export { ToggleGroup }
