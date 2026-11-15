"use client"
import * as React from "react"
import { Checkbox } from "@/registry/ui/checkbox"
import { CheckoutSummary } from "@/registry/ui/checkout-summary"
import { Label } from "@/registry/ui/label"
import type { Example } from "./types"

function PayForm() {
  const [agreed, setAgreed] = React.useState(false)
  const [paid, setPaid] = React.useState(false)
  return (
    <form
      className="flex w-full max-w-xs flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        setPaid(true)
      }}
    >
      <CheckoutSummary
        items={[
          { name: "Team plan · 4 seats", price: "$96.00" },
          { name: "Sales tax", price: "$7.68" },
        ]}
        total="$103.68"
        payLabel={paid ? "Paid" : "Pay $103.68"}
        payType="submit"
        disabled={!agreed || paid}
      />
      <Label className="flex items-center gap-2 font-normal">
        <Checkbox checked={agreed} onCheckedChange={setAgreed} /> I agree to the terms of service
      </Label>
    </form>
  )
}

export const examples: Example[] = [
  {
    title: "Your own lines and button text",
    description: "Prices are display strings; put the amount in the button so people see what they pay.",
    code: `<CheckoutSummary
  title="Your order"
  items={[
    { name: "Pro · annual", price: "$480.00" },
    { name: "Priority support", price: "$120.00" },
  ]}
  total="$600.00"
  payLabel="Pay $600.00"
  onPay={() => console.log("pay")}
  className="w-full max-w-xs"
/>`,
    node: (
      <CheckoutSummary
        title="Your order"
        items={[
          { name: "Pro · annual", price: "$480.00" },
          { name: "Priority support", price: "$120.00" },
        ]}
        total="$600.00"
        payLabel="Pay $600.00"
        onPay={() => console.log("pay")}
        className="w-full max-w-xs"
      />
    ),
  },
  {
    title: "Submit a form, disabled until ready",
    description: "payType=\"submit\" makes Pay submit the surrounding form; disabled blocks it until the terms are accepted.",
    code: `function PayForm() {
  const [agreed, setAgreed] = React.useState(false)
  const [paid, setPaid] = React.useState(false)
  return (
    <form
      className="flex w-full max-w-xs flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        setPaid(true)
      }}
    >
      <CheckoutSummary
        items={[
          { name: "Team plan · 4 seats", price: "$96.00" },
          { name: "Sales tax", price: "$7.68" },
        ]}
        total="$103.68"
        payLabel={paid ? "Paid" : "Pay $103.68"}
        payType="submit"
        disabled={!agreed || paid}
      />
      <Label className="flex items-center gap-2 font-normal">
        <Checkbox checked={agreed} onCheckedChange={setAgreed} /> I agree to the terms of service
      </Label>
    </form>
  )
}`,
    node: <PayForm />,
  },
]
