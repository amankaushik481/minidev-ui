"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Label — the caption for a form control; point htmlFor at the control's id so clicking it focuses the field.
 *
 * Use it beside Input, Textarea, Checkbox, Switch and friends. It dims when a
 * native `peer` control before it is `:disabled` or a `group` ancestor has
 * data-disabled="true"; Base UI controls (Checkbox, Switch, Radio) render a
 * span, so use the `group` wrapper for those. For a label with description and
 * error text wired up for you use FormField.
 *
 * @example
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" />
 */
type LabelProps = React.ComponentProps<"label">

function Label({ className, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-[0.8125rem] leading-none font-medium text-fg select-none",
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
export type { LabelProps }
