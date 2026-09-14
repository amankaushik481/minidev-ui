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
        "shadow-[inset_0_1px_0_oklch(1_0_0/0.5)]",
        className
      )}
      {...props}
    />
  )
}

export { ToggleGroup }
