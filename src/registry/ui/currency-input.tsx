"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

/**
 * A money amount field with the currency code inside on the left, a decimal keypad on mobile and tabular digits.
 *
 * Use for prices, invoice amounts and payouts. The value is the typed string (digits, ".", "," and "-"); parse it yourself, e.g. `Number(v.replace(/,/g, ""))`,
 * and store minor units on the server. For a stepper with +/- use NumberInput; for quantities use QuantityStepper.
 * Label it with FormField (same `id`) or `aria-label`; without either it is named "Amount in USD".
 *
 * @example
 * const [amount, setAmount] = React.useState("")
 * <FormField id="amount" label="Amount"><CurrencyInput id="amount" currency="EUR" value={amount} onChange={setAmount} /></FormField>
 */
type CurrencyInputProps = {
  /** Controlled value. Leave undefined for an uncontrolled field. */
  value?: string
  /** Initial value for the uncontrolled field. */
  defaultValue?: string
  /** Called with the sanitised string on every edit. */
  onChange?: (value: string) => void
  /** ISO 4217 code shown inside the field, e.g. "USD", "EUR". Defaults to "USD". */
  currency?: string
  /** Defaults to "0.00". */
  placeholder?: string
  /** Form field name for FormData. */
  name?: string
  required?: boolean
  disabled?: boolean
  /** Classes for the wrapper (width defaults to w-40). */
  className?: string
  /** Id for a `<label htmlFor>` or FormField. */
  id?: string
  "aria-label"?: string
  "aria-invalid"?: boolean
  "aria-describedby"?: string
}

function CurrencyInput({
  value,
  defaultValue,
  onChange,
  currency = "USD",
  placeholder = "0.00",
  name,
  required,
  disabled,
  className,
  id,
  ...aria
}: CurrencyInputProps) {
  const codeId = React.useId()
  const [inner, setInner] = React.useState(defaultValue ?? "")
  return (
    <div data-slot="currency-input" className={cn("relative w-40", className)}>
      <span
        id={codeId}
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-xs font-medium text-fg-muted"
      >
        {currency}
      </span>
      <input
        id={id}
        name={name}
        type="text"
        inputMode="decimal"
        autoComplete="transaction-amount"
        required={required}
        disabled={disabled}
        value={value ?? inner}
        // A visible <label htmlFor> must stay the name, so only fall back when there is no id to label.
        aria-label={aria["aria-label"] ?? (id ? undefined : `Amount in ${currency}`)}
        aria-invalid={aria["aria-invalid"]}
        aria-describedby={cn(codeId, aria["aria-describedby"])}
        placeholder={placeholder}
        className={cn(inputVariants({ size: "default" }), "pl-12 tabular-nums")}
        onChange={(e) => {
          const clean = e.target.value.replace(/[^\d.,-]/g, "")
          if (value === undefined) setInner(clean)
          onChange?.(clean)
        }}
      />
    </div>
  )
}
export { CurrencyInput }
export type { CurrencyInputProps }
