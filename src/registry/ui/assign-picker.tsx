"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"

/**
 * A list of teammates to assign something to, with the current assignee highlighted.
 *
 * Use inline in a popover or side panel to pick one owner for a task, ticket or invoice. Prefer
 * `Combobox` when the team is long enough to need search. Follows the WAI-ARIA listbox pattern:
 * one Tab stop, Arrow Up/Down and Home/End move, Enter or Space (or click) selects.
 *
 * @example
 * const [assignee, setAssignee] = React.useState("theo")
 * <AssignPicker value={assignee} onChange={setAssignee}
 *   people={[{ id: "maya", name: "Maya Chen" }, { id: "theo", name: "Theo Okafor" }]} />
 */
type Person = {
  /** Value passed to `onChange`. */
  id: string
  /** Display name; initials are derived for the avatar. */
  name: string
}

type AssignPickerProps = {
  /** People to choose from. Omit for sample data. */
  people?: Person[]
  /** Controlled selection. Leave undefined for an uncontrolled picker. */
  value?: string
  /** Initial selection for the uncontrolled picker. */
  defaultValue?: string
  /** Called with the chosen person's id. */
  onChange?: (id: string) => void
  /** Accessible name of the list. */
  label?: string
  className?: string
}

const SAMPLE_PEOPLE: Person[] = [
  { id: "maya", name: "Maya Chen" },
  { id: "theo", name: "Theo Okafor" },
  { id: "priya", name: "Priya Raman" },
  { id: "sam", name: "Sam Lowe" },
  { id: "ada", name: "Ada Novak" },
]

const initials = (name: string) => name.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()

function AssignPicker({
  people = SAMPLE_PEOPLE,
  value,
  defaultValue = "theo",
  onChange,
  label = "Assignee",
  className,
}: AssignPickerProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const current = value ?? inner
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const selectedIndex = people.findIndex((p) => p.id === current)
  // The single Tab stop: the selected person, or the first one.
  const tabStop = selectedIndex === -1 ? 0 : selectedIndex
  const select = (id: string) => {
    if (value === undefined) setInner(id)
    onChange?.(id)
  }
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = people.length - 1
    const next = e.key === "ArrowDown" ? Math.min(last, i + 1) : e.key === "ArrowUp" ? Math.max(0, i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : null
    if (next == null) return
    e.preventDefault()
    refs.current[next]?.focus()
  }
  return (
    <div data-slot="assign-picker" role="listbox" aria-label={label} className={cn("w-56 rounded-xl border border-border bg-raised p-1", className)}>
      {people.map((p, i) => {
        const on = p.id === current
        return (
          <button
            key={p.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="option"
            aria-selected={on}
            tabIndex={i === tabStop ? 0 : -1}
            className={cn(
              "flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-fg outline-none transition-[background-color] duration-[70ms] hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent",
              on && "bg-sunken font-medium"
            )}
            onKeyDown={(e) => onKeyDown(e, i)}
            onClick={() => select(p.id)}
          >
            <Avatar className="size-6">
              <AvatarFallback aria-hidden className="text-[10px]">{initials(p.name)}</AvatarFallback>
            </Avatar>
            {p.name}
          </button>
        )
      })}
    </div>
  )
}
export { AssignPicker }
export type { AssignPickerProps, Person as AssignPickerPerson }
