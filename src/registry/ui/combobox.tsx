"use client"
import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A select-style button that opens a searchable list: type to filter, arrow keys to move, Enter to pick. Built on Base UI Combobox.
 *
 * Use when a single choice has more than about 7 options (customers, assignees, countries). For a short fixed list use Select;
 * for several choices use MultiSelect; for free text with suggestions use Autocomplete. Uncontrolled unless `value` is passed.
 * Label it with FormField (pass the same `id` to both) or `aria-label`.
 *
 * @example
 * const [customer, setCustomer] = React.useState("northwind")
 * <FormField id="customer" label="Customer">
 *   <Combobox id="customer" items={[{ value: "northwind", label: "Northwind Traders" }]} value={customer} onChange={setCustomer} />
 * </FormField>
 */
type ComboboxProps = {
  /** Options. `value` must be unique; `label` is shown and searched. */
  items?: Item[]
  /** Controlled selection (an item's `value`). Leave undefined for an uncontrolled combobox. */
  value?: string
  /** Initial selection for the uncontrolled combobox. */
  defaultValue?: string
  /** Called with the picked item's `value`. */
  onChange?: (value: string) => void
  /** Trigger text while nothing is selected. */
  placeholder?: string
  /** Placeholder of the search field inside the popup. Defaults to "Filter…". */
  searchPlaceholder?: string
  disabled?: boolean
  /** Classes for the trigger button (width defaults to w-64). */
  className?: string
  /** Shown when the filter matches nothing. */
  emptyText?: string
  /** Id for the trigger, so a `<label htmlFor>` or FormField can name it. */
  id?: string
  /** Submits the selected `value` under this name inside a `<form>`. */
  name?: string
  /** Requires a selection before the form submits. */
  required?: boolean
  /** Accessible name when there is no visible label. */
  "aria-label"?: string
}

type Item = { value: string; label: string }

const SAMPLE_ITEMS: Item[] = [
  { value: "northwind", label: "Northwind Traders" },
  { value: "acme", label: "Acme Industries" },
  { value: "blue-harbor", label: "Blue Harbor Co." },
  { value: "cobalt", label: "Cobalt Systems" },
  { value: "helix", label: "Helix Biotech" },
  { value: "juniper", label: "Juniper Studio" },
  { value: "meridian", label: "Meridian Freight" },
]

const toLabel = (i: Item) => i.label
const toValue = (i: Item) => i.value
const same = (a: Item, b: Item) => a.value === b.value

function Combobox({
  items = SAMPLE_ITEMS,
  value,
  defaultValue,
  onChange,
  placeholder = "Select…",
  searchPlaceholder = "Filter…",
  disabled,
  className,
  emptyText = "No results",
  id,
  name,
  required,
  "aria-label": ariaLabel,
}: ComboboxProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const current = value ?? inner
  const selected = items.find((i) => i.value === current) ?? null
  return (
    <div data-slot="combobox">
      <ComboboxPrimitive.Root
        items={items}
        value={selected}
        onValueChange={(next: Item | null) => {
          if (!next) return
          if (value === undefined) setInner(next.value)
          onChange?.(next.value)
        }}
        itemToStringLabel={toLabel}
        itemToStringValue={toValue}
        isItemEqualToValue={same}
        disabled={disabled}
        name={name}
        required={required}
      >
        <ComboboxPrimitive.Trigger
          id={id}
          aria-label={ariaLabel}
          data-placeholder={selected ? undefined : ""}
          className={cn(
            "inline-flex h-9 w-64 items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-fg",
            "shadow-highlight outline-none transition-[border-color] duration-[70ms] ease-hairline",
            "hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            "data-disabled:cursor-not-allowed data-disabled:opacity-50",
            className
          )}
        >
          <span className={cn("truncate", !selected && "text-fg-subtle")}>{selected?.label ?? placeholder}</span>
          <ChevronsUpDownIcon aria-hidden className="size-4 shrink-0 text-fg-muted" />
        </ComboboxPrimitive.Trigger>
        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner align="start" sideOffset={6} className="isolate z-50 outline-none">
            <ComboboxPrimitive.Popup
              data-slot="combobox-content"
              aria-label={ariaLabel ?? placeholder}
              className={cn(
                "w-(--anchor-width) min-w-64 max-w-(--available-width) origin-(--transform-origin) rounded-xl border border-border bg-raised p-1 text-fg shadow-overlay outline-none",
                "duration-200 ease-hairline data-closed:duration-150",
                "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
              )}
            >
              <ComboboxPrimitive.Input
                aria-label="Filter options"
                placeholder={searchPlaceholder}
                className="mb-1 h-8 w-full rounded-md border border-border bg-surface px-2 text-sm text-fg outline-none placeholder:text-fg-subtle focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]"
              />
              <ComboboxPrimitive.Empty className="px-2 py-2 text-xs text-fg-muted empty:hidden">{emptyText}</ComboboxPrimitive.Empty>
              <ComboboxPrimitive.List className="max-h-[min(14rem,var(--available-height))] overflow-auto overscroll-contain scroll-py-1">
                {(item: Item) => (
                  <ComboboxPrimitive.Item
                    key={item.value}
                    value={item}
                    className={cn(
                      "flex w-full cursor-default items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm outline-none select-none",
                      "transition-[background-color] duration-[70ms] data-highlighted:bg-sunken data-selected:text-fg"
                    )}
                  >
                    <span className="grid size-4 shrink-0 place-items-center">
                      <ComboboxPrimitive.ItemIndicator>
                        <CheckIcon aria-hidden className="size-4 text-accent-fg" />
                      </ComboboxPrimitive.ItemIndicator>
                    </span>
                    <span className="truncate">{item.label}</span>
                  </ComboboxPrimitive.Item>
                )}
              </ComboboxPrimitive.List>
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>
    </div>
  )
}
export { Combobox }
export type { ComboboxProps, Item as ComboboxItem }
