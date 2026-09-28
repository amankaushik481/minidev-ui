"use client"
import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

type Item = { value: string; label: string }

type MultiSelectProps = {
  items: Item[]
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function MultiSelect({ items, value, onChange, placeholder = "Select…", disabled, className }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState<string[]>([])
  const selected = value ?? internal
  const setSelected = (next: string[]) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }
  const labels = items.filter((i) => selected.includes(i.value))
  return (
    <div data-slot="multi-select" className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          disabled={disabled}
          aria-label={placeholder}
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
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm hover:bg-sunken"
                onClick={() => setSelected(on ? selected.filter((v) => v !== item.value) : [...selected, item.value])}
              >
                <CheckIcon className={cn("size-4", on ? "opacity-100 text-accent" : "opacity-0")} />
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
              className="inline-flex h-6 items-center gap-1 rounded-md border border-border bg-sunken px-2 text-xs text-fg"
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
