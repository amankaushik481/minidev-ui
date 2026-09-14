"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

type Item = { title: string; blurb: string; tag?: string }

function HorizontalProductRail({
  items = [
    { title: "AI Studio", blurb: "Composer, tools, notebook cells.", tag: "Product" },
    { title: "Billing", blurb: "Plans, invoices, seat maps.", tag: "Commerce" },
    { title: "Admin", blurb: "SSO, quotas, impersonation.", tag: "Ops" },
    { title: "Charts", blurb: "Area, radar, sparklines.", tag: "Data" },
    { title: "Email", blurb: "Welcome + receipt kits.", tag: "Marketing" },
  ],
  ariaLabel = "Product surfaces",
  className,
}: {
  items?: Item[]
  ariaLabel?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  return (
    <div data-slot="horizontal-product-rail" data-tier="premium" className={cn("space-y-3", className)}>
      <div className="flex items-end justify-between gap-3 px-1">
        <p className="text-lg font-medium tracking-[-0.008em] text-fg">Product surfaces</p>
        <p className="text-xs text-fg-muted">Drag or scroll</p>
      </div>
      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 outline-none focus-visible:ring-2 focus-visible:ring-accent [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <motion.article
            key={item.title}
            initial={reduce ? false : { x: 24 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={reduce ? undefined : { y: -4 }}
            className="w-64 shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-surface shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]"
          >
            <div className="aspect-[16/10] border-b border-border bg-[radial-gradient(circle_at_70%_30%,oklch(0.48_0.17_285/0.2),transparent_60%)] bg-sunken" />
            <div className="space-y-1 p-4">
              {item.tag ? <p className="text-[10px] font-medium tracking-[0.01em] text-fg-muted uppercase">{item.tag}</p> : null}
              <h4 className="text-sm font-medium text-fg">{item.title}</h4>
              <p className="text-xs leading-[1.55] text-fg-muted">{item.blurb}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
export { HorizontalProductRail }
