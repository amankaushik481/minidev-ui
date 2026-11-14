"use client"
import * as React from "react"
import { Checkbox } from "@/registry/ui/checkbox"

/**
 * RowSelection — the select checkbox for a data table row or header, with an indeterminate state.
 *
 * Put one in each row's first cell and one in the header with `indeterminate` when only some rows
 * are selected. It is a Checkbox with a default "Select row" name; give each row a specific one.
 *
 * @example
 * <RowSelection checked={allSelected} indeterminate={someSelected} onCheckedChange={toggleAll} aria-label="Select all rows" />
 * <RowSelection checked={selected.has(row.id)} onCheckedChange={(on) => toggle(row.id, on)} aria-label={`Select ${row.name}`} />
 */
function RowSelection({
  checked,
  indeterminate,
  onCheckedChange,
  disabled,
  className,
  "aria-label": ariaLabel,
}: {
  /** Whether the row is selected. */
  checked?: boolean
  /** Shows a dash: some, not all, rows are selected. Use on the header checkbox. */
  indeterminate?: boolean
  /** Fires with the new checked state. */
  onCheckedChange?: (v: boolean) => void
  disabled?: boolean
  className?: string
  /** Accessible name. Defaults to "Select row". */
  "aria-label"?: string
}) {
  return (
    <span data-slot="row-selection" className={className}>
      <Checkbox
        aria-label={ariaLabel ?? "Select row"}
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        onCheckedChange={(v) => onCheckedChange?.(!!v)}
      />
    </span>
  )
}
export { RowSelection }
