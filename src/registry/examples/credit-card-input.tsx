"use client"
import * as React from "react"
import { LockIcon } from "lucide-react"
import { CreditCardInput, type CreditCardValue } from "@/registry/ui/credit-card-input"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function PayDemo() {
  const [card, setCard] = React.useState<CreditCardValue | null>(null)
  const brand = card && card.brand !== "unknown" ? card.brand[0].toUpperCase() + card.brand.slice(1) : null
  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <CreditCardInput onChange={setCard} showBrands={false} hint="Your card is tokenized by the payment provider; Lumen never sees the number." />
      <Button type="submit" size="lg" className="w-full" disabled={!card?.valid}>
        <LockIcon /> Pay $12,400.00{brand ? ` with ${brand}` : ""}
      </Button>
    </form>
  )
}

export const examples: Example[] = [
  {
    title: "Card number only",
    description: "Hide the name and postal code fields when the provider does not need them; the brand badges stay as a hint of what is accepted.",
    code: `<CreditCardInput showName={false} showPostalCode={false} label="Payment method" hint="Charged on the 1st of each month." />`,
    node: <CreditCardInput showName={false} showPostalCode={false} label="Payment method" hint="Charged on the 1st of each month." />,
  },
  {
    title: "Reading the value",
    description: "onChange reports every edit with the parsed fields and a valid flag, which is what gates the pay button.",
    code: `function PayDemo() {
  const [card, setCard] = React.useState<CreditCardValue | null>(null)
  const brand = card && card.brand !== "unknown" ? card.brand[0].toUpperCase() + card.brand.slice(1) : null
  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <CreditCardInput onChange={setCard} showBrands={false} hint="Your card is tokenized by the payment provider; Lumen never sees the number." />
      <Button type="submit" size="lg" className="w-full" disabled={!card?.valid}>
        <LockIcon /> Pay $12,400.00{brand ? \` with \${brand}\` : ""}
      </Button>
    </form>
  )
}`,
    node: <PayDemo />,
  },
  {
    title: "Saved card, disabled",
    description: "defaultValue fills the fields and disabled locks them, the usual way to show the card on file before a change card action.",
    code: `<CreditCardInput
  defaultValue={{ name: "Maya Chen", number: "4242 4242 4242 4242", expiry: "12/28", cvc: "123", postalCode: "98101" }}
  disabled
  label="Card on file"
  hint="Used for the Northwind workspace."
/>`,
    node: (
      <CreditCardInput
        defaultValue={{ name: "Maya Chen", number: "4242 4242 4242 4242", expiry: "12/28", cvc: "123", postalCode: "98101" }}
        disabled
        label="Card on file"
        hint="Used for the Northwind workspace."
      />
    ),
  },
]
