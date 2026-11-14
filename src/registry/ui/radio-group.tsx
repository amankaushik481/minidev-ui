"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "@/lib/utils"

/**
 * RadioGroup — accessible single choice radios on Base UI, with arrow-key navigation built in.
 *
 * Use it for two to six mutually exclusive options shown at once, each with a Label. For a
 * compact switcher use SegmentedControl; for long lists use Select. Base UI's `onValueChange`
 * receives `(value, eventDetails)`.
 *
 * @example
 * <RadioGroup defaultValue="card" aria-label="Payment method" onValueChange={(v) => setMethod(v as string)}>
 *   <div className="flex items-center gap-2">
 *     <RadioGroupItem value="card" id="pm-card" />
 *     <Label htmlFor="pm-card">Card</Label>
 *   </div>
 *   <div className="flex items-center gap-2">
 *     <RadioGroupItem value="bank" id="pm-bank" />
 *     <Label htmlFor="pm-bank">Bank transfer</Label>
 *   </div>
 * </RadioGroup>
 */
function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2.5", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 cursor-pointer items-center justify-center rounded-full outline-none",
        "border border-border-strong bg-surface shadow-xs",
        "transition-[background-color,border-color] duration-[70ms] ease-hairline",
        "after:absolute after:-inset-3",
        "hover:border-fg-subtle",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "data-checked:border-accent data-checked:bg-accent data-checked:shadow-ink",
        "aria-invalid:border-danger",
        "data-disabled:cursor-not-allowed data-disabled:opacity-45",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        keepMounted
        className="flex items-center justify-center"
      >
        <span data-slot="radio-group-dot" className="size-1.5 scale-0 rounded-full bg-on-accent transition-transform duration-200 ease-spring group-data-checked/radio-group-item:scale-100" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
