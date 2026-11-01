import { CardTilt } from "@/registry/premium/card-tilt"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom copy",
    description: "title and body replace the sample text; size the card with className.",
    code: `<CardTilt
  title="Paid in 140 currencies"
  body="Customers pay in their own currency and Lumen settles in yours, at the rate locked on send."
  className="w-80"
/>`,
    node: (
      <CardTilt
        title="Paid in 140 currencies"
        body="Customers pay in their own currency and Lumen settles in yours, at the rate locked on send."
        className="w-80"
      />
    ),
  },
  {
    title: "Feature grid",
    description: "Each card tilts on its own, so a row of three reads as separate objects under the pointer.",
    code: `<div className="grid w-full gap-4 sm:grid-cols-3">
  <CardTilt title="Reminders with manners" body="Polite, timed and escalating. Customers pay nine days sooner." />
  <CardTilt title="Live cash view" body="Every account and currency in one number you can trust." />
  <CardTilt title="A full audit trail" body="Every change, who made it and why, kept forever." />
</div>`,
    node: (
      <div className="grid w-full gap-4 sm:grid-cols-3">
        <CardTilt title="Reminders with manners" body="Polite, timed and escalating. Customers pay nine days sooner." />
        <CardTilt title="Live cash view" body="Every account and currency in one number you can trust." />
        <CardTilt title="A full audit trail" body="Every change, who made it and why, kept forever." />
      </div>
    ),
  },
]
