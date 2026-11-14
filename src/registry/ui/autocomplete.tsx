"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

/**
 * A text field that suggests matching options as you type, with the first eight matches in a listbox.
 *
 * Free text is allowed: the value is whatever is typed, and picking a suggestion fills it in. Use
 * for "type or pick" fields (customer, city, tag). Prefer `Combobox` when the value must be one of
 * the options, and `Select` for a short fixed list. Follows the WAI-ARIA combobox pattern: Arrow
 * Down/Up move through suggestions, Enter picks, Escape closes, focus stays in the input.
 *
 * @example
 * const [customer, setCustomer] = React.useState("")
 * <Autocomplete options={["Northwind Traders", "Acme Industries"]} value={customer}
 *   onChange={setCustomer} placeholder="Bill to" aria-label="Customer" />
 */
type AutocompleteProps = {
  /** Suggestions, matched case-insensitively anywhere in the string. Omit for sample data. */
  options?: string[]
  /** Controlled text. */
  value?: string
  /** Initial text when uncontrolled. */
  defaultValue?: string
  /** Called with the text on every keystroke and when a suggestion is picked. */
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  /** Classes for the wrapper (sets the width; default `w-64`). */
  className?: string
  /** Input id, for an external `<label htmlFor>`. */
  id?: string
  /** Form field name. */
  name?: string
  /** Accessible name when there is no visible label. Falls back to the placeholder. */
  "aria-label"?: string
}

const SAMPLE_OPTIONS = [
  "Northwind Traders",
  "Northstar Logistics",
  "Acme Industries",
  "Blue Harbor Co.",
  "Cobalt Systems",
  "Granite Peak Outfitters",
  "Helix Biotech",
  "Juniper Studio",
  "Meridian Freight",
  "Summit Dental Group",
]

function Autocomplete({
  options = SAMPLE_OPTIONS,
  value,
  defaultValue = "",
  onChange,
  placeholder = "Search…",
  disabled,
  className,
  id,
  name,
  ...a11y
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState(defaultValue)
  const [active, setActive] = React.useState(-1)
  const listId = React.useId()
  const current = value ?? internal
  const filtered = options.filter((o) => o.toLowerCase().includes(current.toLowerCase())).slice(0, 8)
  const expanded = open && filtered.length > 0
  const activeIndex = active < filtered.length ? active : -1

  React.useEffect(() => {
    if (activeIndex >= 0) document.getElementById(`${listId}-${activeIndex}`)?.scrollIntoView({ block: "nearest" })
  }, [activeIndex, listId])

  const commit = (next: string) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }
  const pick = (opt: string) => {
    commit(opt)
    setOpen(false)
    setActive(-1)
  }

  return (
    <div className={cn("relative w-64", className)} data-slot="autocomplete">
      <input
        id={id}
        name={name}
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        value={current}
        autoComplete="off"
        role="combobox"
        aria-label={a11y["aria-label"] ?? (id ? undefined : placeholder)}
        aria-autocomplete="list"
        aria-expanded={expanded}
        aria-controls={listId}
        aria-activedescendant={expanded && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
        className={cn(inputVariants({ size: "default" }))}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setOpen(false)
          setActive(-1)
        }}
        onChange={(e) => {
          commit(e.target.value)
          setOpen(true)
          setActive(-1)
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault()
            if (!expanded) {
              setOpen(true)
              setActive(e.key === "ArrowDown" ? 0 : filtered.length - 1)
              return
            }
            const n = filtered.length
            const step = e.key === "ArrowDown" ? 1 : -1
            setActive((i) => (i < 0 ? (step > 0 ? 0 : n - 1) : (i + step + n) % n))
          } else if (e.key === "Enter" && expanded && activeIndex >= 0) {
            e.preventDefault()
            pick(filtered[activeIndex])
          } else if (e.key === "Escape" && expanded) {
            e.preventDefault()
            setOpen(false)
            setActive(-1)
          }
        }}
      />
      <ul
        id={listId}
        role="listbox"
        aria-label={a11y["aria-label"] ?? placeholder}
        hidden={!expanded}
        className="absolute z-50 mt-1.5 max-h-56 w-full overflow-auto rounded-xl border border-border bg-raised p-1 shadow-overlay"
      >
        {filtered.map((opt, i) => (
          <li
            key={opt}
            id={`${listId}-${i}`}
            role="option"
            aria-selected={i === activeIndex}
            data-highlighted={i === activeIndex ? "" : undefined}
            className="flex w-full cursor-pointer rounded-lg px-2.5 py-1.5 text-left text-sm text-fg transition-[background-color] duration-[70ms] hover:bg-sunken data-[highlighted]:bg-sunken"
            onMouseDown={(e) => e.preventDefault()}
            onMouseEnter={() => setActive(i)}
            onClick={() => pick(opt)}
          >
            {opt}
          </li>
        ))}
      </ul>
    </div>
  )
}
export { Autocomplete }
export type { AutocompleteProps }
