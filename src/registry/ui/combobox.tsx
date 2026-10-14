"use client"
import * as React from "react"
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

type Item = { value: string; label: string }

/** A button that opens a filterable list of options in a popover; uncontrolled unless a value is passed. */
type ComboboxProps = {
  items?: Item[]
  /** Controlled selection. Leave undefined for an uncontrolled combobox. */
  value?: string
  /** Initial selection for the uncontrolled combobox. */
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  emptyText?: string
}

const SAMPLE_ITEMS: Item[] = [
  { value: "northwind", label: "Northwind Traders" },
  { value: "acme", label: "Acme Industries" },
  { value: "blue-harbor", label: "Blue Harbor Co." },
  { value: "cobalt", label: "Cobalt Systems" },
  { value: "helix", label: "Helix Biotech" },
  { value: "juniper", label: "Juniper Studio" },
  { value: "meridian", label: "Meridian Freight" },
]

function Combobox({ items = SAMPLE_ITEMS, value, defaultValue, onChange, placeholder = "Select…", disabled, className, emptyText = "No results" }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [inner, setInner] = React.useState(defaultValue)
  const current = value ?? inner
  const selected = items.find((i) => i.value === current)
  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
  return (
    <div data-slot="combobox">
      <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        aria-label={selected?.label ?? placeholder}
        className={cn(
          "inline-flex h-9 w-64 items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-fg",
          "shadow-highlight outline-none",
          "hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          "disabled:opacity-50",
          className
        )}
      >
        <span className={cn(!selected && "text-fg-subtle")}>{selected?.label ?? placeholder}</span>
        <ChevronsUpDownIcon className="size-4 text-fg-muted" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-1">
        <input
          aria-label="Filter"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter…"
          className="mb-1 h-8 w-full rounded-md border border-border bg-surface px-2 text-sm outline-none focus-visible:border-accent"
        />
        <div className="max-h-56 overflow-auto">
          {filtered.length === 0 ? (
            <p className="px-2 py-2 text-xs text-fg-muted">{emptyText}</p>
          ) : (
            filtered.map((item) => (
              <button
                key={item.value}
                type="button"
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm",
                  "transition-[background-color] duration-[70ms] hover:bg-sunken",
                  item.value === current && "bg-sunken"
                )}
                onClick={() => {
                  if (value === undefined) setInner(item.value)
                  onChange?.(item.value)
                  setOpen(false)
                  setQuery("")
                }}
              >
                <CheckIcon className={cn("size-4", item.value === current ? "opacity-100 text-accent" : "opacity-0")} />
                {item.label}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
    </div>
  )
}
export { Combobox }
export type { ComboboxProps, Item as ComboboxItem }
