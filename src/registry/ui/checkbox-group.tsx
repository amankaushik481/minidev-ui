"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A labelled group that stacks related Checkboxes, so screen readers announce the group name before each option.
 *
 * Use for "pick any" choices (notification channels, permissions). For "pick one" use RadioGroup; for filters as chips use ChipFilter.
 * Give it a `label` (visible) or an `aria-label`.
 *
 * @example
 * <CheckboxGroup label="Email me about">
 *   <Label className="flex items-center gap-2"><Checkbox name="notify" value="invoices" defaultChecked /> Paid invoices</Label>
 *   <Label className="flex items-center gap-2"><Checkbox name="notify" value="reports" /> Weekly reports</Label>
 * </CheckboxGroup>
 */
type CheckboxGroupProps = React.ComponentProps<"div"> & {
  /** Visible group heading; also names the group for screen readers. */
  label?: React.ReactNode
  /** Stack vertically (default) or wrap in a row. */
  orientation?: "vertical" | "horizontal"
}

function CheckboxGroup({ label, orientation = "vertical", className, children, ...props }: CheckboxGroupProps) {
  const id = React.useId()
  return (
    <div
      role="group"
      data-slot="checkbox-group"
      data-orientation={orientation}
      aria-labelledby={label ? `${id}-label` : undefined}
      className={cn("flex gap-2", orientation === "vertical" ? "flex-col" : "flex-row flex-wrap gap-x-4", className)}
      {...props}
    >
      {label ? (
        <div id={`${id}-label`} className={cn("text-sm font-medium text-fg", orientation === "horizontal" && "w-full")}>
          {label}
        </div>
      ) : null}
      {children}
    </div>
  )
}
export { CheckboxGroup }
export type { CheckboxGroupProps }
