"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/registry/ui/accordion"

/** Frequently asked questions as an accordion: one question per row, the answer unfolds beneath it. */
type Faq = { q: string; a: string }

const SAMPLE_ITEMS: Faq[] = [
  { q: "How does the free trial work?", a: "Every Lumen workspace starts with 14 days of the Growth plan. No card is needed, and you keep your data if you move to Starter afterwards." },
  { q: "Can I change plans later?", a: "Yes. Upgrades apply immediately and are prorated. Downgrades take effect at the end of the current billing period." },
  { q: "Which currencies can I invoice in?", a: "Growth and Scale support 135 currencies with daily exchange rates. Starter invoices in your workspace's base currency." },
  { q: "Do you offer discounts for annual billing?", a: "Annual plans are billed at ten months' price, so you get two months free compared to paying monthly." },
  { q: "Is my financial data encrypted?", a: "All data is encrypted in transit and at rest. Lumen is SOC 2 Type II certified, and audit logs are available on the Scale plan." },
]

type FaqListProps = {
  /** Question and answer pairs. Defaults to Lumen billing questions. */
  items?: Faq[]
  className?: string
}

function FaqList({ items = SAMPLE_ITEMS, className }: FaqListProps) {
  return (
    <Accordion data-slot="faq-list" className={cn("max-w-2xl", className)}>
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`faq-${i}`}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionPanel>{item.a}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
export { FaqList }
export type { FaqListProps, Faq }
