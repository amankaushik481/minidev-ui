"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * EditableHeading — a page or document title that is itself a text input, styled as a heading.
 *
 * Use for click-to-rename titles (documents, projects, dashboards). Enter
 * commits and leaves the field, Escape restores the text from when editing
 * began. For an editable table cell use `InlineCellEdit`; for a labelled form
 * field use `Input` inside `FormField`.
 *
 * @example
 * const [title, setTitle] = React.useState("Q4 revenue review")
 * <EditableHeading value={title} onChange={setTitle} aria-label="Report title" />
 */
type EditableHeadingProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange"> & {
  /** Controlled text. */
  value?: string
  /** Initial text when uncontrolled. */
  defaultValue?: string
  /** Called with the new text on every keystroke (and on Escape revert). */
  onChange?: (value: string) => void
  /** Shown when empty. */
  placeholder?: string
  /** Accessible name. Defaults to "Title". */
  "aria-label"?: string
}

function EditableHeading({
  value,
  defaultValue = "",
  onChange,
  className,
  placeholder = "Untitled",
  "aria-label": ariaLabel = "Title",
  onFocus,
  onKeyDown,
  ...props
}: EditableHeadingProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const current = value ?? internal
  const before = React.useRef(current)
  const set = (next: string) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }
  return (
    <input
      data-slot="editable-heading"
      {...props}
      aria-label={ariaLabel}
      value={current}
      placeholder={placeholder}
      className={cn(
        "w-full rounded-md bg-transparent text-2xl font-medium tracking-[-0.018em] text-fg outline-none",
        "placeholder:text-fg-subtle focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
      onFocus={(e) => {
        before.current = e.currentTarget.value
        onFocus?.(e)
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e)
        if (e.defaultPrevented || e.nativeEvent.isComposing) return
        if (e.key === "Enter") {
          e.preventDefault()
          e.currentTarget.blur()
        } else if (e.key === "Escape") {
          e.preventDefault()
          set(before.current)
          e.currentTarget.blur()
        }
      }}
      onChange={(e) => set(e.target.value)}
    />
  )
}
export { EditableHeading }
export type { EditableHeadingProps }
