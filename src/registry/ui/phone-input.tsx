"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

/**
 * PhoneInput — a telephone field with the phone keypad on mobile and tel autofill, free-form so any country's format works.
 *
 * Accepts every native input prop (name, required, aria-invalid…); onChange gives the
 * string. Validate and normalise (e.g. to E.164) on submit, not while typing. For a
 * fixed national format with live formatting use MaskedInput with "(999) 999-9999".
 *
 * @example
 * <label htmlFor="phone">Phone</label>
 * <PhoneInput id="phone" name="phone" value={phone} onChange={setPhone} />
 */
type PhoneInputProps = Omit<React.ComponentProps<"input">, "type" | "value" | "onChange" | "size"> & {
  /** Controlled value. Leave it out for an uncontrolled field (use defaultValue). */
  value?: string
  /** Fires with the raw text on every edit. */
  onChange?: (value: string) => void
  /** Accessible name. Defaults to "Phone number" when there is no `id` to hang a label on. */
  "aria-label"?: string
}

function PhoneInput({
  value,
  onChange,
  className,
  id,
  placeholder = "+1 (555) 000-0000",
  "aria-label": ariaLabel,
  ...props
}: PhoneInputProps) {
  return (
    <input
      id={id}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      value={value}
      placeholder={placeholder}
      aria-label={ariaLabel ?? (id ? undefined : "Phone number")}
      data-slot="phone-input"
      className={cn(inputVariants({ size: "default" }), "tabular-nums", className)}
      onChange={(e) => onChange?.(e.target.value)}
      {...props}
    />
  )
}
export { PhoneInput }
export type { PhoneInputProps }
