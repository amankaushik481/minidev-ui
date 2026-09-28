"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type OtpInputProps = {
  length?: number
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
  "aria-label"?: string
}

function OtpInput({ length = 6, value, onChange, disabled, className, ...a11y }: OtpInputProps) {
  const [internal, setInternal] = React.useState("")
  const digits = (value ?? internal).padEnd(length, " ").slice(0, length).split("")
  const refs = React.useRef<(HTMLInputElement | null)[]>([])
  const setAt = (i: number, ch: string) => {
    const next = digits.map((d, idx) => (idx === i ? ch : d === " " ? "" : d))
    const joined = next.join("").replace(/ /g, "").slice(0, length)
    if (value === undefined) setInternal(joined)
    onChange?.(joined)
  }
  return (
    <div role="group" aria-label={a11y["aria-label"] ?? "One-time code"} className={cn("flex gap-2", className)} data-slot="otp-input">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el }}
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          aria-label={`Digit ${i + 1}`}
          value={digits[i] === " " ? "" : digits[i]}
          className={cn(
            "h-11 w-10 rounded-lg border border-border bg-surface text-center text-base tabular-nums text-fg",
            "shadow-highlight outline-none",
            "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            "disabled:opacity-50"
          )}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "").slice(-1)
            setAt(i, v)
            if (v && i < length - 1) refs.current[i + 1]?.focus()
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !digits[i]?.trim() && i > 0) refs.current[i - 1]?.focus()
          }}
        />
      ))}
    </div>
  )
}
export { OtpInput }
