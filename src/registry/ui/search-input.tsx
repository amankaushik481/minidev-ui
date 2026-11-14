"use client"
import * as React from "react"
import { SearchIcon, XIcon } from "lucide-react"
import { InputAffix } from "@/registry/ui/input-affix"
import { cn } from "@/lib/utils"

/**
 * SearchInput — a search field with a magnifier icon and a clear button that appears once there is text.
 *
 * Use it for list filters, table search and site search. Escape or the clear button empties it
 * and keeps focus in the field. Controlled (`value` + `onChange`) or uncontrolled. Clearing calls
 * `onClear` and an `onChange` whose `target.value` is "". For a field with a result list use
 * SearchWithResults; for a command launcher use CommandPalette.
 *
 * @example
 * <SearchInput aria-label="Search invoices" placeholder="Search invoices…" value={q} onChange={(e) => setQ(e.target.value)} />
 */
type SearchInputProps = Omit<React.ComponentProps<"input">, "size" | "prefix" | "type"> & {
  /** Field height: 32, 36 or 44px. */
  size?: "sm" | "default" | "lg"
  /** Fires after the clear button or Escape empties the field. */
  onClear?: () => void
  /** Classes for the outer field box; className goes to the inner input. */
  containerClassName?: string
}

function SearchInput({ className, containerClassName, onClear, value, defaultValue, onChange, onKeyDown, size = "default", ...props }: SearchInputProps) {
  const [internal, setInternal] = React.useState(defaultValue?.toString() ?? "")
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const controlled = value !== undefined
  const current = controlled ? String(value ?? "") : internal
  const clear = () => {
    const input = wrapRef.current?.querySelector("input")
    if (!controlled) {
      setInternal("")
      // Uncontrolled: the DOM owns the text, so empty it there too.
      if (input) input.value = ""
    }
    onClear?.()
    onChange?.({ target: { value: "" }, currentTarget: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
    input?.focus()
  }
  return (
    <div data-slot="search-input" ref={wrapRef}>
      <InputAffix
        type="search"
        size={size}
        leading={<SearchIcon aria-hidden />}
        trailing={
          current ? (
            <button
              type="button"
              aria-label="Clear search"
              className="rounded-md p-0.5 text-fg-muted outline-none transition-[color] duration-[70ms] hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
              onClick={clear}
            >
              <XIcon aria-hidden className="size-3.5" />
            </button>
          ) : null
        }
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => {
          if (!controlled) setInternal(e.target.value)
          onChange?.(e)
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e)
          if (e.key === "Escape" && current && !e.defaultPrevented) {
            e.preventDefault()
            clear()
          }
        }}
        containerClassName={cn(containerClassName)}
        className={className}
        {...props}
      />
    </div>
  )
}
export { SearchInput }
export type { SearchInputProps }
