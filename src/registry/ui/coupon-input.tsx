"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { cn } from "@/lib/utils"

/**
 * A coupon or promo-code field with an Apply button and an inline, announced success or error message.
 *
 * Use in a checkout or upgrade flow beside CheckoutSummary or OrderSummary. Validate on your server in `onApply`: return `true` for
 * a valid code, `false` or an error string for an invalid one (a Promise works too). Enter applies; it never submits the surrounding form.
 * Without `onApply` it runs a demo check that accepts "HAIRLINE".
 *
 * @example
 * <CouponInput onApply={async (code) => (await fetch(`/api/coupons/${code}`)).ok} successMessage="20% off applied" />
 */
type CouponInputProps = {
  /** Validates the trimmed code. Return true when valid, false or an error message when not. */
  onApply?: (code: string) => boolean | string | Promise<boolean | string>
  /** Shown after a valid code. Defaults to "Coupon applied". */
  successMessage?: string
  /** Shown after an invalid code when `onApply` returns false. Defaults to "Invalid code". */
  errorMessage?: string
  /** Input placeholder and accessible name. Defaults to "Coupon code". */
  label?: string
  className?: string
}

type Result = { ok: boolean; message: string } | null

function CouponInput({ onApply, successMessage, errorMessage = "Invalid code", label = "Coupon code", className }: CouponInputProps) {
  const id = React.useId()
  const [code, setCode] = React.useState("")
  const [result, setResult] = React.useState<Result>(null)
  const [pending, setPending] = React.useState(false)

  const apply = async () => {
    const c = code.trim()
    if (!c || pending) return
    setPending(true)
    try {
      const r = onApply ? await onApply(c) : c.toUpperCase() === "HAIRLINE"
      setResult(
        r === true
          ? { ok: true, message: successMessage ?? (onApply ? "Coupon applied" : "Coupon applied: 20% off the Pro plan") }
          : { ok: false, message: typeof r === "string" ? r : errorMessage }
      )
    } catch {
      setResult({ ok: false, message: "Could not check the code. Try again." })
    } finally {
      setPending(false)
    }
  }

  return (
    <div data-slot="coupon-input" className={cn("space-y-2", className)}>
      <div className="flex gap-2">
        <Input
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
            setResult(null)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              apply()
            }
          }}
          placeholder={label}
          aria-label={label}
          aria-invalid={result?.ok === false || undefined}
          aria-describedby={`${id}-msg`}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
        />
        <Button type="button" variant="outline" onClick={apply} disabled={pending || !code.trim()} aria-busy={pending || undefined}>
          Apply
        </Button>
      </div>
      <p id={`${id}-msg`} aria-live="polite" className={cn("text-xs empty:hidden", result?.ok ? "text-success" : "text-danger")}>
        {result?.message ?? ""}
      </p>
    </div>
  )
}
export { CouponInput }
export type { CouponInputProps }
