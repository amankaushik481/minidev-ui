"use client"
import * as React from "react"
import { Checkbox } from "@/registry/ui/checkbox"
function RowSelection({
  checked,
  indeterminate,
  onCheckedChange,
  "aria-label": ariaLabel,
}: {
  checked?: boolean
  indeterminate?: boolean
  onCheckedChange?: (v: boolean) => void
  "aria-label"?: string
}) {
  return (
    <span data-slot="row-selection">
      <Checkbox
        aria-label={ariaLabel ?? "Select row"}
        checked={indeterminate ? ("indeterminate" as never) : checked}
        onCheckedChange={(v) => onCheckedChange?.(!!v)}
      />
    </span>
  )
}
export { RowSelection }
