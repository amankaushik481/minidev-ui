"use client"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cn } from "@/lib/utils"

/**
 * A row of `Toggle` buttons that share pressed state, built on Base UI: single-select by default, `multiple` for formatting bars.
 *
 * `value` is always an array of the pressed toggles' `value`s. Arrow keys move focus between toggles. Use `SegmentedControl` for a view switch with a sliding thumb, and `RadioGroup` inside forms.
 *
 * @example
 * <ToggleGroup defaultValue={["left"]} aria-label="Text alignment">
 *   <Toggle value="left" aria-label="Align left"><AlignLeftIcon /></Toggle>
 *   <Toggle value="center" aria-label="Align center"><AlignCenterIcon /></Toggle>
 * </ToggleGroup>
 */
function ToggleGroup({ className, ...props }: ToggleGroupPrimitive.Props) {
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
