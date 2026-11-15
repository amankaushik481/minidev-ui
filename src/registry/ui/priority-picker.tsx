"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * PriorityPicker — a row of four pill radios (Low, Medium, High, Urgent) for an issue or task priority.
 *
 * Use it in issue forms and task sidebars. Arrow keys move and select, like any radio group.
 * Pass `name` to submit the value with a form. For an arbitrary option list use SegmentedControl or RadioGroup.
 *
 * @example
 * const [priority, setPriority] = React.useState<Priority>("medium")
 * <PriorityPicker value={priority} onChange={setPriority} />
 */

type Priority = "low" | "medium" | "high" | "urgent"

const levels: { value: Priority; label: string; color: string }[] = [
  { value: "low", label: "Low", color: "bg-fg-subtle" },
  { value: "medium", label: "Medium", color: "bg-warning" },
  { value: "high", label: "High", color: "bg-danger" },
  { value: "urgent", label: "Urgent", color: "bg-danger ring-2 ring-danger/30" },
]

function PriorityPicker({
  value,
  defaultValue,
  onChange,
  disabled,
  name,
  "aria-label": ariaLabel = "Priority",
  className,
}: {
  /** Controlled priority: "low" | "medium" | "high" | "urgent". Leave unset for uncontrolled. */
  value?: Priority | (string & {})
  /** Starting priority when uncontrolled. Nothing is selected by default. */
  defaultValue?: Priority
  /** Fires with the picked priority. */
  onChange?: (value: Priority) => void
  disabled?: boolean
  /** Form field name. When set, a hidden input submits the current priority ("" when none). Unset by default. */
  name?: string
  /** Accessible name of the group. */
  "aria-label"?: string
  className?: string
}) {
  const [inner, setInner] = React.useState<string | undefined>(defaultValue)
  const current = value ?? inner
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const selected = levels.findIndex((l) => l.value === current)
  const pick = (i: number) => {
    const v = levels[i].value
    if (value === undefined) setInner(v)
    onChange?.(v)
  }
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = levels.length
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown" ? (i + 1) % n
      : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i - 1 + n) % n
      : e.key === "Home" ? 0
      : e.key === "End" ? n - 1
      : -1
    if (next < 0) return
    e.preventDefault()
    refs.current[next]?.focus()
    pick(next)
  }
  return (
    <div
      data-slot="priority-picker"
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      className={cn("flex flex-wrap gap-1.5", className)}
    >
      {levels.map((l, i) => {
        const on = i === selected
        return (
          <button
            key={l.value}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={on}
            disabled={disabled}
            tabIndex={i === (selected < 0 ? 0 : selected) ? 0 : -1}
            data-state={on ? "on" : "off"}
            className={cn(
              "inline-flex h-7 items-center gap-1.5 rounded-md border px-2 text-xs font-medium outline-none",
              "transition-[background-color,border-color,color] duration-[70ms] ease-hairline",
              "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              "disabled:cursor-not-allowed disabled:opacity-45",
              on ? "border-border bg-sunken text-fg" : "border-transparent text-fg-muted hover:bg-sunken hover:text-fg"
            )}
            onClick={() => pick(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className={cn("size-1.5 rounded-full", l.color)} aria-hidden />
            {l.label}
          </button>
        )
      })}
      {name ? <input type="hidden" name={name} value={selected < 0 ? "" : levels[selected].value} disabled={disabled} /> : null}
    </div>
  )
}
export { PriorityPicker }
export type { Priority }
