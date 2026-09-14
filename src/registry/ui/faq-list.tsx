"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/registry/ui/accordion"

type Faq = { q: string; a: string }

function FaqList({ items, className }: { items: Faq[]; className?: string }) {
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
