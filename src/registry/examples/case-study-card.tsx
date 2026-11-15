"use client"
import { CaseStudyCard } from "@/registry/ui/case-study-card"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Customer stories",
    description: "One outcome per card with href, so each card opens the full story. invertDelta shows a fall as good, for figures like hours spent.",
    code: `<div className="grid w-full gap-4 sm:grid-cols-3">
  <CaseStudyCard href="#" company="Acme Logistics" title="Invoices paid on time" result="94%" delta={18} />
  <CaseStudyCard href="#" company="Northwind" title="Hours spent on month-end" result="18 h" delta={-42} invertDelta />
  <CaseStudyCard href="#" company="Pine & Co" title="Cash collected in Q3" result="$1.2M" delta={27} />
</div>`,
    node: (
      <div className="grid w-full gap-4 sm:grid-cols-3">
        <CaseStudyCard href="#" company="Acme Logistics" title="Invoices paid on time" result="94%" delta={18} />
        <CaseStudyCard href="#" company="Northwind" title="Hours spent on month-end" result="18 h" delta={-42} invertDelta />
        <CaseStudyCard href="#" company="Pine & Co" title="Cash collected in Q3" result="$1.2M" delta={27} />
      </div>
    ),
  },
  {
    title: "Result without a delta",
    description: "Leave out delta when the figure speaks for itself; without href the card renders as an article.",
    code: `<CaseStudyCard
  className="max-w-xs"
  company="Fernhill Studio"
  title="Month-end close, down from a week"
  result="2 days"
/>`,
    node: (
      <CaseStudyCard
        className="max-w-xs"
        company="Fernhill Studio"
        title="Month-end close, down from a week"
        result="2 days"
      />
    ),
  },
]
