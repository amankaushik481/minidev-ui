"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"

type Person = { id: string; name: string }

/** A list of teammates to assign something to; one option is highlighted and keyboard focusable. */
type AssignPickerProps = {
  people?: Person[]
  /** Controlled selection. Leave undefined for an uncontrolled picker. */
  value?: string
  /** Initial selection for the uncontrolled picker. */
  defaultValue?: string
  onChange?: (id: string) => void
  className?: string
}

const SAMPLE_PEOPLE: Person[] = [
  { id: "maya", name: "Maya Chen" },
  { id: "theo", name: "Theo Okafor" },
  { id: "priya", name: "Priya Raman" },
  { id: "sam", name: "Sam Lowe" },
  { id: "ada", name: "Ada Novak" },
]

function AssignPicker({
  people = SAMPLE_PEOPLE,
  value,
  defaultValue = "theo",
  onChange,
  className,
}: AssignPickerProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const current = value ?? inner
  return (
    <div data-slot="assign-picker" role="listbox" aria-label="Assignee" className={cn("w-56 rounded-xl border border-border bg-raised p-1", className)}>
      {people.map((p) => {
        const on = p.id === current
        return (
          <button
            key={p.id}
            type="button"
            role="option"
            aria-selected={on}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm outline-none hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent",
              on && "bg-sunken"
            )}
            onClick={() => {
              if (value === undefined) setInner(p.id)
              onChange?.(p.id)
            }}
          >
            <Avatar className="size-6">
              <AvatarFallback className="text-[9px]">{p.name.slice(0, 2).toUpperCase()}</AvatarFallback>
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
