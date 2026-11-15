"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * OtpInput — a one-time code field drawn as separate slots, with SMS autofill, paste and a shake on error.
 *
 * One real <input> sits invisibly over the slots, so paste, SMS autofill
 * (autocomplete="one-time-code"), backspace, selection and screen readers all behave
 * natively. The slots are pure paint: a fake caret, a glyph that settles in, a shake
 * when `status` turns "invalid". Use it for 2FA and email verification codes; for
 * other fixed-shape values use MaskedInput.
 *
 * @example
 * <OtpInput length={6} groups={[3, 3]} onComplete={verify} status={error ? "invalid" : "idle"} />
 */

type Status = "idle" | "invalid" | "success"

type OtpInputProps = {
  /** Number of characters in the code. */
  length?: number
  /** Controlled code. */
  value?: string
  /** Initial code when uncontrolled. */
  defaultValue?: string
  /** Fires with the cleaned code on every edit. */
  onChange?: (value: string) => void
  /** Fires once when every slot is filled. */
  onComplete?: (value: string) => void
  /** Split the slots into groups, e.g. [3, 3] renders "123 – 456". Must sum to `length`. */
  groups?: number[]
  /** Allowed characters. "alphanumeric" upper-cases letters. */
  pattern?: "numeric" | "alphanumeric"
  /** "invalid" shakes and turns the slots red (aria-invalid); "success" turns them green. */
  status?: Status
  disabled?: boolean
  autoFocus?: boolean
  /** Form field name for the hidden input. */
  name?: string
  /** Id for the real input, so a `<label htmlFor>` can name it. With `id` set, the default aria-label is dropped. */
  id?: string
  /** Slot size: "default" 40×44, "lg" 48×56. */
  size?: "default" | "lg"
  className?: string
  /** Accessible name. Defaults to "One-time code" when there is no `id`. */
  "aria-label"?: string
}

const RX = { numeric: /[^0-9]/g, alphanumeric: /[^0-9a-zA-Z]/g }

function OtpInput({
  length = 6,
  value: valueProp,
  defaultValue = "",
  onChange,
  onComplete,
  groups,
  pattern = "numeric",
  status = "idle",
  disabled,
  autoFocus,
  name,
  id,
  size = "default",
  className,
  "aria-label": ariaLabel,
}: OtpInputProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const value = (valueProp ?? inner).slice(0, length)
  const [focused, setFocused] = React.useState(false)
  const [sel, setSel] = React.useState<[number, number]>([value.length, value.length])
  const ref = React.useRef<HTMLInputElement>(null)
  const [shakeKey, setShakeKey] = React.useState(0)
  // Shake each time status becomes "invalid": adjust state during render, not in an effect.
  const [prevStatus, setPrevStatus] = React.useState(status)
  if (status !== prevStatus) {
    setPrevStatus(status)
    if (status === "invalid") setShakeKey((k) => k + 1)
  }

  const commit = (raw: string) => {
    const clean = raw.replace(RX[pattern], "").slice(0, length)
    const next = pattern === "alphanumeric" ? clean.toUpperCase() : clean
    if (valueProp === undefined) setInner(next)
    onChange?.(next)
    if (next.length === length && value.length !== length) onComplete?.(next)
  }

  const syncSel = () => {
    const el = ref.current
    if (!el) return
    const start = el.selectionStart ?? 0
    const end = el.selectionEnd ?? start
    setSel([start, end])
  }

  // Slot layout: [3,3] → [[0,1,2],[3,4,5]]
  const layout = React.useMemo(() => {
    const g = groups && groups.reduce((a, b) => a + b, 0) === length ? groups : [length]
    let n = 0
    return g.map((count) => Array.from({ length: count }, () => n++))
  }, [groups, length])

  const activeIndex = Math.min(sel[0], length - 1)
  const tone =
    status === "invalid" ? "danger" : status === "success" ? "success" : "idle"

  return (
    <div
      data-slot="otp-input"
      data-status={status}
      className={cn("relative inline-flex w-fit", disabled && "cursor-not-allowed opacity-50", className)}
    >
      <input
        ref={ref}
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        autoFocus={autoFocus}
        // aria-label would beat a <label htmlFor={id}>, so only default it without an id.
        aria-label={ariaLabel ?? (id ? undefined : "One-time code")}
        aria-invalid={status === "invalid" || undefined}
        autoComplete="one-time-code"
        inputMode={pattern === "numeric" ? "numeric" : "text"}
        pattern={pattern === "numeric" ? "[0-9]*" : "[0-9a-zA-Z]*"}
        spellCheck={false}
        onChange={(e) => {
          commit(e.target.value)
          requestAnimationFrame(syncSel)
        }}
        onFocus={() => {
          setFocused(true)
          // Always land at the end so typing continues where the code stops.
          requestAnimationFrame(() => {
            const el = ref.current
            if (el) el.setSelectionRange(el.value.length, el.value.length)
            syncSel()
          })
        }}
        onBlur={() => setFocused(false)}
        onSelect={syncSel}
        onKeyUp={syncSel}
        className="absolute inset-0 z-10 w-full cursor-text bg-transparent text-transparent caret-transparent outline-none selection:bg-transparent disabled:cursor-not-allowed"
        style={{ letterSpacing: "-0.5em", fontSize: 1 }}
      />
      <div
        key={shakeKey}
        aria-hidden
        className={cn("flex items-center gap-2", shakeKey > 0 && "animate-[shake-x_360ms_var(--ease-hairline)]")}
      >
        {layout.map((slots, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 ? <span className="h-px w-3 rounded-full bg-border-strong" /> : null}
            <div className="flex items-center gap-1.5">
              {slots.map((i) => {
                const ch = value[i]
                const isActive = focused && (sel[0] === sel[1] ? i === activeIndex && (value.length < length || i === length - 1) : i >= sel[0] && i < sel[1])
                const showCaret = focused && sel[0] === sel[1] && i === value.length && value.length < length
                return (
                  <div
                    key={i}
                    data-active={isActive || undefined}
                    data-filled={ch ? "" : undefined}
                    className={cn(
                      "relative grid place-items-center rounded-lg border bg-surface font-mono font-medium text-fg tabular-nums shadow-xs",
                      "transition-[border-color,box-shadow,background-color] duration-[140ms] ease-hairline",
                      size === "lg" ? "h-14 w-12 text-2xl" : "h-11 w-10 text-lg",
                      tone === "idle" && (ch ? "border-border-strong" : "border-border"),
                      tone === "idle" && isActive && "border-accent shadow-[0_0_0_3px_var(--accent-soft)]",
                      tone === "danger" && "border-danger bg-[color-mix(in_oklch,var(--danger)_5%,var(--surface))] text-danger",
                      tone === "success" && "border-success bg-[color-mix(in_oklch,var(--success)_6%,var(--surface))]"
                    )}
                  >
                    {ch ? (
                      <span key={ch + i} className="animate-[glyph-in_180ms_var(--ease-hairline)_both]">
                        {ch}
                      </span>
                    ) : showCaret ? (
                      <span className="h-[45%] w-px animate-[caret-blink_1.1s_steps(1)_infinite] bg-fg" />
                    ) : (
                      <span className="size-1 rounded-full bg-border-strong" />
                    )}
                  </div>
                )
              })}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export { OtpInput }
export type { OtpInputProps }
