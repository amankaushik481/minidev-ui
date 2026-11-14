"use client"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * A two-state button (pressed or not) for toolbar actions such as bold or "show archived", built on Base UI.
 *
 * Controlled with `pressed` + `onPressedChange`, or uncontrolled with `defaultPressed`. Icon-only toggles need an `aria-label`. Use `Switch` for settings that take effect immediately, and `ToggleGroup` for a set of related toggles.
 *
 * @example
 * <Toggle aria-label="Bold" pressed={bold} onPressedChange={setBold}><BoldIcon /></Toggle>
 */
const toggleVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent text-sm font-medium text-fg [&_svg]:size-4 [&_svg]:shrink-0",
    "outline-none transition-[background-color,border-color,color] duration-[70ms]",
    "hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "disabled:pointer-events-none disabled:text-fg-muted data-[disabled]:pointer-events-none data-[disabled]:text-fg-muted",
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
