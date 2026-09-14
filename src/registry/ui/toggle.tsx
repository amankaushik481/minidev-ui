"use client"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-lg border border-transparent text-sm font-medium text-fg",
    "outline-none transition-[background-color,border-color,color] duration-[70ms]",
    "hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "disabled:pointer-events-none disabled:text-fg-muted",
    "data-[pressed]:border-border data-[pressed]:bg-sunken data-[pressed]:text-fg",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 px-2.5",
        default: "h-9 px-3",
        lg: "h-11 px-4",
      },
    },
    defaultVariants: { size: "default" },
  }
)

function Toggle({
  className,
  size,
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ size }), className)}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
