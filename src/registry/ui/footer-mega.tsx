"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Link } from "@/registry/ui/link"

type Col = { title: string; links: { label: string; href: string }[] }

function FooterMega({
  columns,
  brand = "MiniDev",
  className,
}: {
  columns: Col[]
  brand?: string
  className?: string
}) {
  return (
    <footer data-slot="footer-mega" className={cn("border-t border-border bg-surface", className)}>
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-sm font-medium text-fg">{brand}</p>
          <p className="mt-2 max-w-xs text-sm text-fg-muted">Hairline UI for products that care about craft.</p>
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
