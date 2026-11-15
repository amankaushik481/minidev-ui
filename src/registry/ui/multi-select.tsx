"use client"
import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

/**
 * MultiSelect — a popover list with check marks and removable chips for the chosen items.
 *
 * Each option is a toggle button (aria-pressed), so Tab and Space/Enter work without a
 * custom keyboard model; chips under the trigger remove an item in one click and are
 * labelled "Remove <name>". Use it for 2 to ~20 options; for long or searchable
 * lists use Combobox, for free-form entry use TagsInput.
 *
 * @example
 * const [reviewers, setReviewers] = React.useState<string[]>([])
 * <MultiSelect
 *   aria-label="Reviewers"
 *   items={[{ value: "maya", label: "Maya Chen" }, { value: "theo", label: "Theo Okafor" }]}
 *   value={reviewers}
 *   onChange={setReviewers}
 * />
 */

type Item = {
  /** Stored in the selection array. */
  value: string
  /** Text in the list, the trigger and the chip. */
  label: string
}

// Reviewers who can approve an invoice in Lumen.
const SAMPLE_ITEMS: Item[] = [
  { value: "maya-chen", label: "Maya Chen" },
  { value: "theo-okafor", label: "Theo Okafor" },
  { value: "priya-raman", label: "Priya Raman" },
  { value: "sam-lowe", label: "Sam Lowe" },
  { value: "ada-novak", label: "Ada Novak" },
  { value: "jonas-weber", label: "Jonas Weber" },
]
// Preselected only for the built-in demo data.
const SAMPLE_SELECTED = ["maya-chen", "priya-raman"]

type MultiSelectProps = {
  /** Options in display order. */
  items?: Item[]
  /** Controlled selection. */
  value?: string[]
  /** Initial selection when uncontrolled. */
  defaultValue?: string[]
  /** Fires with the full new selection after every toggle or chip removal. */
  onChange?: (value: string[]) => void
  /** Trigger text when nothing is selected. */
  placeholder?: string
  disabled?: boolean
  /** Accessible name for the trigger, e.g. "Reviewers". The current selection is read after it. */
  "aria-label"?: string
  /** Classes for the trigger button. */
  className?: string
  /** Submits each selected value as its own hidden input under this name, so `FormData.getAll(name)` returns the array. No name by default. */
  name?: string
}

function MultiSelect({
  items = SAMPLE_ITEMS,
  value,
  defaultValue,
  onChange,
  placeholder = "Select…",
  disabled,
  "aria-label": ariaLabel,
  className,
  name,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState<string[]>(() => defaultValue ?? (items === SAMPLE_ITEMS ? SAMPLE_SELECTED : []))
  const selected = value ?? internal
  const setSelected = (next: string[]) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }
  const labels = items.filter((i) => selected.includes(i.value))
  return (
    <div data-slot="multi-select" className="space-y-2">
      {name ? selected.map((v) => <input key={v} type="hidden" name={name} value={v} disabled={disabled} />) : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          disabled={disabled}
          aria-label={ariaLabel ? `${ariaLabel}: ${labels.length ? labels.map((l) => l.label).join(", ") : placeholder}` : undefined}
          className={cn(
            "flex min-h-9 w-72 items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-left text-sm",
            "shadow-highlight outline-none hover:border-fg-subtle",
            "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            "disabled:opacity-50",
            className
          )}
        >
          <span className={cn("truncate", labels.length === 0 && "text-fg-subtle")}>
            {labels.length === 0 ? placeholder : labels.map((l) => l.label).join(", ")}
          </span>
          <ChevronsUpDownIcon className="size-4 shrink-0 text-fg-muted" />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-72 p-1">
          {items.map((item) => {
            const on = selected.includes(item.value)
            return (
              <button
                key={item.value}
                type="button"
                aria-pressed={on}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm outline-none transition-[background-color] duration-[70ms] hover:bg-sunken focus-visible:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
                onClick={() => setSelected(on ? selected.filter((v) => v !== item.value) : [...selected, item.value])}
              >
                <CheckIcon aria-hidden className={cn("size-4", on ? "opacity-100 text-accent" : "opacity-0")} />
                {item.label}
              </button>
            )
          })}
        </PopoverContent>
      </Popover>
      {labels.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {labels.map((l) => (
            <button
              key={l.value}
              type="button"
              disabled={disabled}
              aria-label={`Remove ${l.label}`}
              className="inline-flex h-6 items-center gap-1 rounded-md border border-border bg-sunken px-2 text-xs text-fg outline-none transition-[border-color] duration-[70ms] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
              onClick={() => setSelected(selected.filter((v) => v !== l.value))}
            >
              {l.label}
              <span aria-hidden className="text-fg-muted">×</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
export { MultiSelect }
export type { MultiSelectProps, Item as MultiSelectItem }
