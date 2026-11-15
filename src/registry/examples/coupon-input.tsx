"use client"
import * as React from "react"
import { CouponInput } from "@/registry/ui/coupon-input"
import type { Example } from "./types"

// Stands in for a request to your coupon endpoint.
const checkCode = (code: string) =>
  new Promise<boolean | string>((resolve) =>
    setTimeout(() => {
      const c = code.toUpperCase()
      resolve(c === "WELCOME15" ? true : c === "SPRING24" ? "SPRING24 ended on 31 May." : false)
    }, 600)
  )

export const examples: Example[] = [
  {
    title: "Checked on the server",
    description: "onApply can be async. Return true, false, or a message that explains why the code failed. Try WELCOME15 or SPRING24.",
    code: `const checkCode = (code: string) =>
  new Promise<boolean | string>((resolve) =>
    setTimeout(() => {
      const c = code.toUpperCase()
      resolve(c === "WELCOME15" ? true : c === "SPRING24" ? "SPRING24 ended on 31 May." : false)
    }, 600)
  )

<CouponInput onApply={checkCode} successMessage="15% off your first invoice" className="w-full max-w-xs" />`,
    node: <CouponInput onApply={checkCode} successMessage="15% off your first invoice" className="w-full max-w-xs" />,
  },
  {
    title: "Gift card field",
    description: "label sets the placeholder and the accessible name; errorMessage replaces \"Invalid code\".",
    code: `<CouponInput
  label="Gift card number"
  errorMessage="That gift card has no balance left."
  onApply={(code) => code.length === 16}
  className="w-full max-w-xs"
/>`,
    node: (
      <CouponInput
        label="Gift card number"
        errorMessage="That gift card has no balance left."
        onApply={(code) => code.length === 16}
        className="w-full max-w-xs"
      />
    ),
  },
]
