"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

type AutocompleteProps = {
  options: string[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
  "aria-label"?: string
}

function Autocomplete({ options, value, onChange, placeholder, disabled, className, id, ...a11y }: AutocompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState("")
  const listId = React.useId()
  const current = value ?? internal
  const filtered = options.filter((o) => o.toLowerCase().includes(current.toLowerCase())).slice(0, 8)
  return (
    <div className={cn("relative w-64", className)} data-slot="autocomplete">
      <input
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        value={current}
        role="combobox"
        aria-label={a11y["aria-label"] ?? placeholder ?? "Autocomplete"}
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listId}
        className={cn(inputVariants({ size: "default" }))}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onChange={(e) => {
          if (value === undefined) setInternal(e.target.value)
          onChange?.(e.target.value)
          setOpen(true)
        }}
      />
      {open && filtered.length > 0 ? (
        <ul id={listId} role="listbox" className="absolute z-50 mt-1.5 max-h-56 w-full overflow-auto rounded-xl border border-border bg-raised p-1 shadow-lg">
          {filtered.map((opt) => (
            <li key={opt}>
              <div
                role="option"
                aria-selected={opt === current}
                tabIndex={-1}
                className="flex w-full cursor-pointer rounded-lg px-2.5 py-1.5 text-left text-sm hover:bg-sunken"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (value === undefined) setInternal(opt)
                  onChange?.(opt)
                  setOpen(false)
                }}
              >
                {opt}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul id={listId} hidden role="listbox" />
      )}
    </div>
  )
}
export { Autocomplete }
