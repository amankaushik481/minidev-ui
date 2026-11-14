"use client"
import * as React from "react"
import { Input } from "@/registry/ui/input"
import { cn } from "@/lib/utils"

/**
 * InlineCellEdit — a table cell value that turns into a text field on click; Enter or blur saves, Escape cancels.
 *
 * Use it for quick edits inside DataTable or Table rows. For a heading edited
 * in place use EditableHeading, and for multi-field edits open a Dialog or
 * Sheet with a form.
 *
 * @example
 * <InlineCellEdit value={row.name} label="Customer name" onChange={(name) => save(row.id, { name })} />
 */
type InlineCellEditProps = {
  /** The saved value shown when not editing. */
  value: string
  /** Called with the new text when the edit is committed (Enter or blur), only if it changed. */
  onChange?: (value: string) => void
  /** Accessible name for the button and the field, for example the column name. */
  label?: string
  /** Shown when the value is empty. */
  placeholder?: string
  className?: string
}

function InlineCellEdit({ value, onChange, label = "Edit cell", placeholder = "Edit", className }: InlineCellEditProps) {
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(value)
  const done = React.useRef(false)
  const button = React.useRef<HTMLButtonElement>(null)
  const refocus = React.useRef(false)
  // Follow a new value from the parent during render, not in an effect.
  const [seen, setSeen] = React.useState(value)
  if (seen !== value) {
    setSeen(value)
    setDraft(value)
  }
  React.useEffect(() => {
    if (!editing && refocus.current) {
      refocus.current = false
      button.current?.focus()
    }
  }, [editing])

  // Enter, Escape and blur can all fire for one edit; only the first one counts.
  const finish = (commit: boolean, returnFocus: boolean) => {
    if (done.current) return
    done.current = true
    refocus.current = returnFocus
    setEditing(false)
    if (commit && draft !== value) onChange?.(draft)
    else setDraft(value)
  }

  if (!editing) {
    return (
      <button
        ref={button}
        data-slot="inline-cell-edit"
        type="button"
        aria-label={`${label}: ${value || placeholder}`}
        className={cn(
          "rounded-md px-1 text-left text-sm text-fg outline-none transition-colors duration-[70ms] hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent",
          className
        )}
        onClick={() => {
          done.current = false
          setEditing(true)
        }}
      >
        {value || <span className="text-fg-subtle">{placeholder}</span>}
      </button>
    )
  }
  return (
    <Input
      autoFocus
      data-slot="inline-cell-edit"
      className={cn("h-8", className)}
      value={draft}
      aria-label={label}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => finish(true, false)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          finish(true, true)
        }
        if (e.key === "Escape") {
          e.preventDefault()
          e.stopPropagation()
          finish(false, true)
        }
      }}
    />
  )
}
export { InlineCellEdit }
export type { InlineCellEditProps }
