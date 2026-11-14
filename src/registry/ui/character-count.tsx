"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A "42/280" counter for a text field that turns red past the limit and tells screen readers only when the limit is near.
 *
 * Place it under a Textarea or Input and point the field's `aria-describedby` at its `id`.
 * It does not block typing; pair it with the field's `maxLength` if you need a hard cap.
 *
 * @example
 * const [text, setText] = React.useState("")
 * <Textarea value={text} onChange={(e) => setText(e.target.value)} aria-describedby="bio-count" />
 * <CharacterCount id="bio-count" value={text.length} max={280} />
 */
type CharacterCountProps = {
  /** Current length, usually `value.length`. */
  value?: number
  /** The limit. Past it the count turns red. */
  max: number
  /** Remaining characters at which screen readers start hearing the count. Defaults to 10% of `max`. */
  warnAt?: number
  /** Id for the field's `aria-describedby`. */
  id?: string
  className?: string
}

function CharacterCount({ value = 0, max, warnAt, id, className }: CharacterCountProps) {
  const over = value > max
  const left = max - value
  const near = left <= (warnAt ?? Math.ceil(max * 0.1))
  return (
    <p
      id={id}
      data-slot="character-count"
      data-over={over || undefined}
      className={cn("text-xs tabular-nums", over ? "text-danger" : near ? "text-warning" : "text-fg-muted", className)}
    >
      <span aria-hidden>
        {value}/{max}
      </span>
      <span className="sr-only">{`${value} of ${max} characters`}</span>
      {/* Announce only near the limit so typing is not read out on every keystroke. */}
      <span className="sr-only" aria-live="polite">
        {near ? (over ? `${-left} characters over the limit` : `${left} characters left`) : ""}
      </span>
    </p>
  )
}
export { CharacterCount }
export type { CharacterCountProps }
