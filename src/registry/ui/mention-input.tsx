"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

type MentionInputProps = {
  value?: string
  onChange?: (value: string) => void
  suggestions?: string[]
  disabled?: boolean
  className?: string
  id?: string
  placeholder?: string
  "aria-label"?: string
}

function MentionInput({
  value,
  onChange,
  suggestions = [],
  disabled,
  className,
  id,
  placeholder = "Write a comment… use @ to mention",
  ...a11y
}: MentionInputProps) {
  const [open, setOpen] = React.useState(false)
  const [q, setQ] = React.useState("")
  const listId = React.useId()
  const filtered = suggestions.filter((s) => s.toLowerCase().includes(q.toLowerCase())).slice(0, 6)
  return (
    <div data-slot="mention-input" className={cn("relative w-full", className)}>
      <textarea
        id={id}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        aria-label={a11y["aria-label"] ?? "Mention input"}
        aria-describedby={open && filtered.length ? listId : undefined}
        rows={3}
        className={cn(inputVariants({ size: "default" }), "h-auto min-h-20 resize-y py-2")}
        onChange={(e) => {
          const v = e.target.value
          onChange?.(v)
          const m = v.match(/@([\w.-]*)$/)
          if (m) {
            setQ(m[1])
            setOpen(true)
          } else {
            setOpen(false)
            setQ("")
          }
        }}
      />
      {open && filtered.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Mention suggestions"
          className="absolute z-50 mt-1.5 max-h-48 w-56 overflow-auto rounded-xl border border-border bg-raised p-1 shadow-[0_8px_24px_oklch(0.35_0.02_250/0.10)]"
        >
          {filtered.map((s) => (
            <li key={s} role="option" aria-selected={false}>
              <button
                type="button"
                className="flex w-full rounded-lg px-2.5 py-1.5 text-left text-sm hover:bg-sunken"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  const next = (value ?? "").replace(/@[\w.-]*$/, `@${s} `)
                  onChange?.(next)
                  setOpen(false)
                }}
              >
                @{s}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
export { MentionInput }
