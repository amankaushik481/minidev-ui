"use client"
import { Testimonial } from "@/registry/ui/testimonial"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Case study quote",
    description: "Leave quotation marks out of quote; curly ones are added. Without src the avatar shows the initials.",
    code: `<Testimonial
  quote="We used to spend the first week of every month matching payouts. Now it is a Monday morning review."
  name="Priya Raman"
  role="VP Finance, Halcyon"
/>`,
    node: (
      <Testimonial
        quote="We used to spend the first week of every month matching payouts. Now it is a Monday morning review."
        name="Priya Raman"
        role="VP Finance, Halcyon"
      />
    ),
  },
  {
    title: "Quote grid",
    description: "Two or three cards in a grid work under a pricing table; override max-w-md with max-w-none so each card fills its column.",
    code: `<div className="grid w-full gap-3 md:grid-cols-3">
  <Testimonial className="max-w-none" quote="Approvals used to live in email. Now there is an audit trail." name="Marcus Webb" role="Controller, Parallel" />
  <Testimonial className="max-w-none" quote="Setup took one afternoon, including the bank feed." name="Elena Sorrentino" role="COO, Kestrel" />
  <Testimonial className="max-w-none" quote="Reminders go out on time, and nobody has to remember them." name="Tom Lindqvist" role="Finance Lead, Foxglove" />
</div>`,
    node: (
      <div className="grid w-full gap-3 md:grid-cols-3">
        <Testimonial className="max-w-none" quote="Approvals used to live in email. Now there is an audit trail." name="Marcus Webb" role="Controller, Parallel" />
        <Testimonial className="max-w-none" quote="Setup took one afternoon, including the bank feed." name="Elena Sorrentino" role="COO, Kestrel" />
        <Testimonial className="max-w-none" quote="Reminders go out on time, and nobody has to remember them." name="Tom Lindqvist" role="Finance Lead, Foxglove" />
      </div>
    ),
  },
]
