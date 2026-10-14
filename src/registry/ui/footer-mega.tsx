"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Link } from "@/registry/ui/link"

/** A multi-column site footer: brand and tagline on the left, titled link columns across the rest. */
type Col = { title: string; links: { label: string; href: string }[] }

const SAMPLE_COLUMNS: Col[] = [
  {
    title: "Product",
    links: [
      { label: "Invoicing", href: "#" },
      { label: "Payments", href: "#" },
      { label: "Reconciliation", href: "#" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API reference", href: "#" },
      { label: "Webhooks", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Customers", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
]

type FooterMegaProps = {
  /** Link columns after the brand block. Defaults to three Lumen columns. */
  columns?: Col[]
  /** Brand name shown in the first column. */
  brand?: string
  /** Short line under the brand name. */
  tagline?: string
  className?: string
}

function FooterMega({
  columns = SAMPLE_COLUMNS,
  brand = "Lumen",
  tagline = "Invoicing and payments for teams that close their books every day.",
  className,
}: FooterMegaProps) {
  return (
    <footer data-slot="footer-mega" className={cn("w-full border-t border-border bg-surface", className)}>
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-sm font-medium text-fg">{brand}</p>
          <p className="mt-2 max-w-xs text-sm text-fg-muted">{tagline}</p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">{col.title}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.label}><Link href={l.href} className="text-sm text-fg-muted hover:text-fg">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}
export { FooterMega }
export type { FooterMegaProps, Col as FooterMegaColumn }
