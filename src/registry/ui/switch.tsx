"use client"
import * as React from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { LoaderCircleIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Switch - hairline track with a raised thumb that leans on press, then springs across.
 * While pressed the thumb stretches toward where it is about to go. The track only changes colour.
 * 44px hit area via ::after. Pass `label` (+ `description`) for a settings row
 * where the whole row is clickable.
 */

type Size = "sm" | "default"

const SIZE: Record<Size, { track: string; thumb: string; rest: number; stretch: number; spinner: string; label: string }> = {
  sm: { track: "h-4 w-7", thumb: "h-3", rest: 12, stretch: 4, spinner: "size-2", label: "mt-0.5" },
  default: { track: "h-5 w-9", thumb: "h-4", rest: 16, stretch: 4, spinner: "size-2.5", label: "" },
}

type SwitchProps = Omit<SwitchPrimitive.Root.Props, "children"> & {
  size?: Size
  /** Shows a spinner in the thumb. Stays focusable but can't be toggled. */
  loading?: boolean
  /** Renders a settings row: label on the left, switch on the right, whole row clickable. */
  label?: React.ReactNode
  description?: React.ReactNode
}

function chain<E>(a: ((e: E) => void) | undefined, b: (e: E) => void) {
  return (e: E) => {
    a?.(e)
    b(e)
  }
}

function Switch({
  className,
  size = "default",
  loading = false,
  label,
  description,
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  readOnly,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  onKeyDown,
  onKeyUp,
  onBlur,
  ...props
}: SwitchProps) {
  const [inner, setInner] = React.useState(defaultChecked)
  const checked = checkedProp ?? inner
  const [pressed, setPressed] = React.useState(false)
  const reduce = useReducedMotion()
  const id = React.useId()
  const s = SIZE[size]
  const interactive = !disabled && !readOnly && !loading
  const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true"
  const row = label != null || description != null
  const release = () => requestAnimationFrame(() => setPressed(false))

  const press = {
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => {
      if (interactive && e.button === 0) setPressed(true)
    },
    onPointerUp: release,
    onPointerLeave: () => setPressed(false),
    onPointerCancel: () => setPressed(false),
  }

  const control = (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      data-loading={loading || undefined}
      checked={checked}
      disabled={disabled}
      readOnly={readOnly || loading}
      aria-busy={loading || undefined}
      aria-labelledby={row && label != null && !props["aria-label"] ? `${id}-label` : undefined}
      aria-describedby={row && description != null ? `${id}-desc` : undefined}
      onCheckedChange={(next, details) => {
        setPressed(false)
        if (checkedProp === undefined) setInner(next)
        onCheckedChange?.(next, details)
      }}
      onKeyDown={chain(onKeyDown, (e) => {
        if (interactive && e.key === " ") setPressed(true)
      })}
      onKeyUp={chain(onKeyUp, release)}
      onBlur={chain(onBlur, () => setPressed(false))}
      onPointerDown={row ? onPointerDown : chain(onPointerDown, press.onPointerDown)}
      onPointerUp={row ? onPointerUp : chain(onPointerUp, press.onPointerUp)}
      onPointerLeave={row ? onPointerLeave : chain(onPointerLeave, press.onPointerLeave)}
      onPointerCancel={row ? onPointerCancel : chain(onPointerCancel, press.onPointerCancel)}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 outline-none",
        "bg-sunken transition-[background-color,box-shadow] duration-[140ms] ease-hairline",
        invalid
          ? "shadow-[inset_0_0_0_1px_var(--danger)]"
          : "shadow-[inset_0_0_0_1px_var(--border-strong)] data-checked:shadow-[inset_0_0_0_1px_var(--accent)]",
        "after:absolute after:-inset-x-2 after:-inset-y-3",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "data-checked:justify-end data-checked:bg-accent",
        "hover:data-unchecked:bg-[color-mix(in_oklch,var(--sunken),var(--fg)_6%)] hover:data-checked:bg-accent-hover",
        row && "group-hover/switch-row:data-unchecked:bg-[color-mix(in_oklch,var(--sunken),var(--fg)_6%)] group-hover/switch-row:data-checked:bg-accent-hover",
        readOnly && !loading && "cursor-default",
        loading && "cursor-progress",
        "data-disabled:cursor-not-allowed data-disabled:opacity-45",
        s.track,
        row && s.label,
        !row && className
      )}
      {...props}
    >
      <motion.span
        data-slot="switch-thumb"
        data-checked={checked || undefined}
        data-pressed={pressed || undefined}
        layout
        layoutDependency={`${checked}-${pressed}`}
        transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.18, duration: 0.42 }}
        style={{ width: pressed ? s.rest + s.stretch : s.rest, borderRadius: 999 }}
        className={cn("pointer-events-none grid shrink-0 place-items-center bg-raised shadow-key", s.thumb)}
      >
        {loading ? (
          <LoaderCircleIcon aria-hidden className={cn("animate-spin text-accent", s.spinner)} strokeWidth={3} />
        ) : null}
      </motion.span>
    </SwitchPrimitive.Root>
  )

  if (!row) return control

  return (
    <label
      data-slot="switch-row"
      data-disabled={disabled || undefined}
      {...press}
      className={cn(
        "group/switch-row flex w-full cursor-pointer items-start justify-between gap-4 select-none",
        (disabled || readOnly) && "cursor-default",
        loading && "cursor-progress",
        disabled && "cursor-not-allowed",
        className
      )}
    >
      <span className={cn("grid min-w-0 gap-0.5", disabled && "opacity-60")}>
        {label != null ? (
          <span id={`${id}-label`} className="text-[0.8125rem] leading-5 font-medium text-fg">
            {label}
          </span>
        ) : null}
        {description != null ? (
          <span id={`${id}-desc`} className="text-xs text-pretty text-fg-muted">
            {description}
          </span>
        ) : null}
      </span>
      {control}
      <span className="sr-only" aria-live="polite">
        {loading ? "Saving" : ""}
      </span>
    </label>
  )
}

export { Switch }
export type { SwitchProps }
