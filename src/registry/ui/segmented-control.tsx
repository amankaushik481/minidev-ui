"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * SegmentedControl — a row of options with a raised thumb that glides to the selected one.
 *
 * Use it for two to five mutually exclusive views or modes (Monthly / Yearly, List / Board).
 * It is a radio group: Tab lands on the selected option, arrows move and select, Home and End
 * jump. Controlled with `value` + `onChange` or uncontrolled with `defaultValue`. For form
 * fields use RadioGroup; for switching whole panels use Tabs; for on/off toolbar buttons use
 * ToggleGroup.
 *
 * @example
 * <SegmentedControl items={["Day", "Week", "Month"]} defaultValue="Week" aria-label="Range" />
 * <SegmentedControl
 *   aria-label="Layout"
 *   value={layout}
 *   onChange={setLayout}
 *   options={[{ value: "list", label: "List", icon: <ListIcon /> }, { value: "board", label: "Board", icon: <KanbanIcon /> }]}
 * />
 */

/*
 * GOLD STANDARD COMPONENT. Other components copy the patterns in this file:
 * - one visual idea (a raised thumb that glides between options),
 * - every state designed (rest, hover, pressed, focus-visible, selected, disabled),
 * - real keyboard support (roving tabindex, arrows, Home/End),
 * - controlled + uncontrolled, sizes via a lookup, tokens only.
 */

type Option = {
  /** Value passed to `onChange`. */
  value: string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  /** Short trailing detail, e.g. "-20%" or a count. */
  badge?: React.ReactNode
}

type Size = "sm" | "default" | "lg"

const SIZE: Record<Size, { track: string; item: string; text: string }> = {
  sm: { track: "h-8 rounded-lg p-0.5", item: "gap-1.5 rounded-md px-2.5 [&_svg]:size-3.5", text: "text-xs" },
  default: { track: "h-9 rounded-[10px] p-0.5", item: "gap-1.5 rounded-lg px-3 [&_svg]:size-4", text: "text-[0.8125rem]" },
  lg: { track: "h-11 rounded-xl p-1", item: "gap-2 rounded-lg px-4 [&_svg]:size-4", text: "text-sm" },
}

type SegmentedControlProps = {
  /** Full options. */
  options?: Option[]
  /** Shorthand: plain labels, value = label. */
  items?: string[]
  /** Controlled selected value. */
  value?: string
  /** Starting value when uncontrolled. Defaults to the first option. */
  defaultValue?: string
  /** Fires with the newly selected value. */
  onChange?: (value: string) => void
  /** Track height: 32, 36 or 44px. */
  size?: Size
  /** Stretch to the container and split space evenly. */
  fullWidth?: boolean
  disabled?: boolean
  className?: string
  /** Accessible name of the group. Always set one that says what is being chosen. */
  "aria-label"?: string
  /** Submits the selected value in a hidden input under this name. No name by default. */
  name?: string
}

function SegmentedControl({
  options: optionsProp,
  items,
  value: valueProp,
  defaultValue,
  onChange,
  size = "default",
  fullWidth,
  disabled,
  className,
  "aria-label": ariaLabel = "Options",
  name,
}: SegmentedControlProps) {
  const options = React.useMemo<Option[]>(
    () => optionsProp ?? (items ?? ["Monthly", "Yearly"]).map((i) => ({ value: i, label: i })),
    [optionsProp, items]
  )
  const [inner, setInner] = React.useState(defaultValue ?? options[0]?.value)
  const value = valueProp ?? inner
  const layoutId = React.useId()
  const reduce = useReducedMotion()
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const s = SIZE[size]

  const select = (v: string) => {
    if (valueProp === undefined) setInner(v)
    onChange?.(v)
  }

  const enabled = options.map((o, i) => (o.disabled || disabled ? -1 : i)).filter((i) => i >= 0)
  // The selected option is the Tab stop; with no match, the first enabled one is, so the group stays reachable.
  const selectedIndex = options.findIndex((o) => o.value === value)
  const tabStop = selectedIndex >= 0 ? selectedIndex : (enabled[0] ?? 0)
  const move = (from: number, dir: 1 | -1 | "first" | "last") => {
    const pos = enabled.indexOf(from)
    const next =
      dir === "first" ? enabled[0] : dir === "last" ? enabled[enabled.length - 1] : enabled[(pos + dir + enabled.length) % enabled.length]
    if (next === undefined) return
    refs.current[next]?.focus()
    select(options[next].value)
  }

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      data-slot="segmented-control"
      className={cn(
        "relative isolate inline-flex items-stretch bg-sunken ring-1 ring-border ring-inset",
        s.track,
        fullWidth && "flex w-full",
        disabled && "opacity-50",
        className
      )}
    >
      {name ? <input type="hidden" name={name} value={value ?? ""} disabled={disabled} /> : null}
      {options.map((o, i) => {
        const active = o.value === value
        const isDisabled = disabled || o.disabled
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={isDisabled}
            tabIndex={i === tabStop ? 0 : -1}
            data-state={active ? "on" : "off"}
            onClick={() => select(o.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); move(i, 1) }
              if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); move(i, -1) }
              if (e.key === "Home") { e.preventDefault(); move(i, "first") }
              if (e.key === "End") { e.preventDefault(); move(i, "last") }
            }}
            className={cn(
              "group/seg relative inline-flex items-center justify-center font-medium whitespace-nowrap outline-none select-none",
              "transition-[color] duration-[70ms] ease-hairline",
              "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-sunken",
              "disabled:cursor-not-allowed disabled:opacity-45",
              s.item,
              s.text,
              fullWidth && "flex-1",
              active ? "text-fg" : "text-fg-muted hover:text-fg"
            )}
          >
            {active ? (
              <motion.span
                layoutId={layoutId}
                aria-hidden
                data-slot="segmented-control-thumb"
                className="absolute inset-0 -z-10 rounded-[inherit] bg-raised shadow-raised ring-1 ring-border"
                transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.18, duration: 0.42 }}
              />
            ) : (
              <span
                aria-hidden
                className="absolute inset-0 -z-10 rounded-[inherit] bg-fg/0 transition-colors duration-[70ms] group-hover/seg:bg-fg/[0.035] group-active/seg:bg-fg/[0.06]"
              />
            )}
            {o.icon}
            <span>{o.label}</span>
            {o.badge ? (
              <span
                className={cn(
                  "rounded-full px-1.5 py-px font-mono text-[10px] leading-4 tabular-nums transition-colors duration-[70ms]",
                  active ? "bg-accent-soft text-accent-fg" : "bg-fg/5 text-fg-subtle"
                )}
              >
                {o.badge}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

export { SegmentedControl }
export type { SegmentedControlProps }
