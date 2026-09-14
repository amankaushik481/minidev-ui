"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"

type Person = { id: string; name: string }

function AssignPicker({
  people,
  value,
  onChange,
  className,
}: {
  people: Person[]
  value?: string
  onChange?: (id: string) => void
  className?: string
}) {
  return (
    <div data-slot="assign-picker" role="listbox" aria-label="Assignee" className={cn("w-56 rounded-xl border border-border bg-raised p-1", className)}>
      {people.map((p) => {
        const on = p.id === value
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
            onClick={() => onChange?.(p.id)}
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
