"use client"
import * as React from "react"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"
import { Label } from "@/registry/ui/label"
import type { Example } from "./types"

const PLANS = [
  { value: "starter", label: "Starter", description: "Up to 3 seats and 50 invoices a month" },
  { value: "pro", label: "Pro", description: "Unlimited seats and invoices, priority support" },
  { value: "business", label: "Business", description: "SSO, audit log and a dedicated success manager" },
]

function ControlledDemo() {
  const [method, setMethod] = React.useState("card")
  return (
    <div className="flex flex-col gap-3">
      <RadioGroup value={method} onValueChange={(v) => setMethod(v as string)} aria-label="Payment method">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="card" id="pm-card" />
          <Label htmlFor="pm-card">Card ending 4242</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="bank" id="pm-bank" />
          <Label htmlFor="pm-bank">Bank transfer</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="invoice" id="pm-invoice" />
          <Label htmlFor="pm-invoice">Pay by invoice</Label>
        </div>
      </RadioGroup>
      <p className="text-xs text-fg-muted">
        {method === "card" ? "Charged today." : method === "bank" ? "Allow 2 to 3 business days." : "Net 30 terms apply."}
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "With labels",
    description: "Each item gets an id and a Label with htmlFor, and defaultValue picks the initial option.",
    code: `<RadioGroup defaultValue="30" aria-label="Payment terms" className="w-fit">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="14" id="terms-14" />
    <Label htmlFor="terms-14">Net 14</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="30" id="terms-30" />
    <Label htmlFor="terms-30">Net 30</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="60" id="terms-60" />
    <Label htmlFor="terms-60">Net 60</Label>
  </div>
</RadioGroup>`,
    node: (
      <RadioGroup defaultValue="30" aria-label="Payment terms" className="w-fit">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="14" id="terms-14" />
          <Label htmlFor="terms-14">Net 14</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="30" id="terms-30" />
          <Label htmlFor="terms-30">Net 30</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="60" id="terms-60" />
          <Label htmlFor="terms-60">Net 60</Label>
        </div>
      </RadioGroup>
    ),
  },
  {
    title: "Controlled value",
    description: "Use value and onValueChange to keep the choice in state and explain what it means.",
    code: `function ControlledDemo() {
  const [method, setMethod] = React.useState("card")
  return (
    <div className="flex flex-col gap-3">
      <RadioGroup value={method} onValueChange={(v) => setMethod(v as string)} aria-label="Payment method">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="card" id="pm-card" />
          <Label htmlFor="pm-card">Card ending 4242</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="bank" id="pm-bank" />
          <Label htmlFor="pm-bank">Bank transfer</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="invoice" id="pm-invoice" />
          <Label htmlFor="pm-invoice">Pay by invoice</Label>
        </div>
      </RadioGroup>
      <p className="text-xs text-fg-muted">
        {method === "card" ? "Charged today." : method === "bank" ? "Allow 2 to 3 business days." : "Net 30 terms apply."}
      </p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "With descriptions",
    description: "Map over your options and put a helper line under each label.",
    code: `const PLANS = [
  { value: "starter", label: "Starter", description: "Up to 3 seats and 50 invoices a month" },
  { value: "pro", label: "Pro", description: "Unlimited seats and invoices, priority support" },
  { value: "business", label: "Business", description: "SSO, audit log and a dedicated success manager" },
]

<RadioGroup defaultValue="pro" aria-label="Plan" className="max-w-sm gap-3">
  {PLANS.map((p) => (
    <div key={p.value} className="flex items-start gap-3">
      <RadioGroupItem value={p.value} id={"plan-" + p.value} className="mt-0.5" />
      <div className="grid gap-1">
        <Label htmlFor={"plan-" + p.value}>{p.label}</Label>
        <p className="text-xs text-fg-muted">{p.description}</p>
      </div>
    </div>
  ))}
</RadioGroup>`,
    node: (
      <RadioGroup defaultValue="pro" aria-label="Plan" className="max-w-sm gap-3">
        {PLANS.map((p) => (
          <div key={p.value} className="flex items-start gap-3">
            <RadioGroupItem value={p.value} id={"plan-" + p.value} className="mt-0.5" />
            <div className="grid gap-1">
              <Label htmlFor={"plan-" + p.value}>{p.label}</Label>
              <p className="text-xs text-fg-muted">{p.description}</p>
            </div>
          </div>
        ))}
      </RadioGroup>
    ),
  },
  {
    title: "Disabled option",
    description: "Disable a single item to keep it visible but unselectable, or the whole group with disabled on the root.",
    code: `<RadioGroup defaultValue="email" aria-label="Send invoices by" className="w-fit">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="email" id="send-email" />
    <Label htmlFor="send-email">Email</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="post" id="send-post" disabled />
    <Label htmlFor="send-post">Post, not available in your region</Label>
  </div>
</RadioGroup>`,
    node: (
      <RadioGroup defaultValue="email" aria-label="Send invoices by" className="w-fit">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="email" id="send-email" />
          <Label htmlFor="send-email">Email</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="post" id="send-post" disabled />
          <Label htmlFor="send-post">Post, not available in your region</Label>
        </div>
      </RadioGroup>
    ),
  },
]
