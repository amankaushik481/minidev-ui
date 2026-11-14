"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"

/**
 * LiveCursorsBar — overlapping initials of the people editing right now, each ringed in their cursor colour, with a count.
 *
 * Use it in the header of a collaborative document or canvas. For a static
 * stack of members use AvatarGroup, for one person's online state use
 * PresenceDot, and for "typing…" use TypingIndicator.
 *
 * @example
 * <LiveCursorsBar people={[{ name: "Maya Chen", color: "var(--chart-1)" }, { name: "Theo Okafor", color: "var(--chart-2)" }]} />
 */
type LiveCursorPerson = {
  /** Display name; the first letter becomes the initial. */
  name: string
  /** Cursor colour as any CSS colour; prefer chart tokens such as var(--chart-2). */
  color: string
}

type LiveCursorsBarProps = {
  /** People currently in the document. */
  people?: LiveCursorPerson[]
  className?: string
}

function LiveCursorsBar({
  people = [
    { name: "Maya Chen", color: "var(--accent)" },
    { name: "Theo Okafor", color: "var(--chart-2)" },
    { name: "Ada Novak", color: "var(--chart-3)" },
  ],
  className,
}: LiveCursorsBarProps) {
  const names = people.map((p) => p.name).join(", ")
  return (
    <div data-slot="live-cursors-bar" role="group" aria-label={`Editing now: ${names}`} className={cn("flex items-center gap-2", className)}>
      <ul aria-hidden className="flex -space-x-2">
        {people.map((p, i) => (
          <li key={`${p.name}-${i}`}>
            <Avatar className="size-7 ring-2 ring-bg" title={p.name}>
              <AvatarFallback className="bg-surface text-fg" style={{ boxShadow: `inset 0 0 0 2px ${p.color}` }}>
                {p.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
          </li>
        ))}
      </ul>
      <p aria-hidden className="text-xs text-fg-muted">
        <span className="font-medium tabular-nums text-fg">{people.length}</span> editing now
      </p>
    </div>
  )
}
export { LiveCursorsBar }
export type { LiveCursorsBarProps, LiveCursorPerson }
