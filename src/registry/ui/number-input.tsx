"use client"
import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"
import { IconButton } from "@/registry/ui/icon-button"

/**
 * NumberInput — a numeric field with minus and plus buttons, clamped to min and max.
 *
 * Typing is free while the field has focus (you can clear it or type "15" past a min
 * of 10); the value is clamped and committed on blur or Enter. ArrowUp/ArrowDown step
 * natively, buttons disable at the bounds, and decimal steps avoid float drift
 * (0.1 + 0.2 stays 0.3). Controlled or uncontrolled. Use Slider for a rough value
 * on a range; use it for exact counts like seats or quantities.
 *
 * @example
 * const [seats, setSeats] = React.useState(5)
 * <NumberInput value={seats} onChange={setSeats} min={1} max={50} aria-label="Seats" />
 */
type NumberInputProps = {
  /** Controlled value. */
  value?: number
  /** Initial value when uncontrolled. */
  defaultValue?: number
  /** Fires with each committed, clamped value. */
  onChange?: (value: number) => void
  /** Lowest allowed value. */
  min?: number
  /** Highest allowed value. */
  max?: number
  /** Amount the buttons and arrow keys add or remove. */
  step?: number
  disabled?: boolean
  /** Classes for the wrapper. */
  className?: string
  /** Pair with a visible <label htmlFor>. */
  id?: string
  /** Form field name. */
  name?: string
  /** Accessible name. Defaults to "Number" when there is no `id` to hang a label on. */
  "aria-label"?: string
}

const decimals = (n: number) => (String(n).split(".")[1] ?? "").length

function NumberInput({
  value,
  defaultValue = 0,
  onChange,
  min,
  max,
  step = 1,
  disabled,
  className,
  id,
  name,
  "aria-label": ariaLabel,
}: NumberInputProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  // Text being typed; null when the field shows the committed value.
  const [draft, setDraft] = React.useState<string | null>(null)
  const current = value ?? internal
  const clamp = (n: number) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, n))

  const set = (n: number) => {
    const next = clamp(n)
    if (value === undefined) setInternal(next)
    if (next !== current) onChange?.(next)
  }
  const nudge = (dir: 1 | -1) => {
    setDraft(null)
    set(Number((current + dir * step).toFixed(Math.max(decimals(step), decimals(current)))))
  }
  const commit = () => {
    if (draft === null) return
    const n = Number(draft)
    if (draft.trim() !== "" && Number.isFinite(n)) set(n)
    setDraft(null)
  }

  return (
    <div data-slot="number-input" className={cn("inline-flex items-center gap-1", className)}>
      <IconButton
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="Decrease"
        disabled={disabled || (min != null && current <= min)}
        onClick={() => nudge(-1)}
      >
        <MinusIcon />
      </IconButton>
      <input
        id={id}
        name={name}
        type="number"
        inputMode={Number.isInteger(step) && (min == null || min >= 0) ? "numeric" : "decimal"}
        disabled={disabled}
        value={draft ?? String(current)}
        min={min}
        max={max}
        step={step}
        aria-label={ariaLabel ?? (id ? undefined : "Number")}
        className={cn(inputVariants({ size: "default" }), "w-20 text-center tabular-nums")}
        onChange={(e) => {
          setDraft(e.target.value)
          // Native spinner and arrow keys produce a complete number: commit it straight away.
          const n = e.target.valueAsNumber
          if (Number.isFinite(n) && n === clamp(n)) set(n)
        }}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit()
        }}
      />
      <IconButton
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="Increase"
        disabled={disabled || (max != null && current >= max)}
        onClick={() => nudge(1)}
      >
        <PlusIcon />
      </IconButton>
    </div>
  )
}
export { NumberInput }
export type { NumberInputProps }
