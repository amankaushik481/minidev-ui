"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"

type Entry = { version: string; date: string; title: string; items: string[]; tag?: "New" | "Fix" | "Premium" }

type ChangelogMotionProps = {
  entries?: Entry[]
  className?: string
}

const SAMPLE_ENTRIES: Entry[] = [
  {
    version: "v2.4.0",
    date: "Oct 8, 2026",
    title: "Approvals and audit trail",
    tag: "New",
    items: [
      "Refunds and credits over $1,000 now route to an approver",
      "Every approval decision is logged with actor and timestamp",
      "Audit trail export to CSV from the Settings page",
    ],
  },
  {
    version: "v2.3.2",
    date: "Sep 24, 2026",
    title: "Invoice reminders",
    tag: "Fix",
    items: [
      "Reminders no longer send after a partial payment lands",
      "Fixed timezone drift on due dates for customers in Europe",
    ],
  },
  {
    version: "v2.3.0",
    date: "Sep 9, 2026",
    title: "Multi-currency ledger",
    tag: "Premium",
    items: [
      "Bill in one currency and report in another with locked rates",
      "Month end reconciliation view with per-currency totals",
      "Northwind-style parent and child accounts",
    ],
  },
]

/** A vertical release timeline whose entries slide in as they scroll into view, with version, date and tag per release. */
function ChangelogMotion({ entries = SAMPLE_ENTRIES, className }: ChangelogMotionProps) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="changelog-motion" data-tier="premium" className={cn("mx-auto max-w-2xl space-y-10", className)}>
      <div className="text-center">
        <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Changelog</p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-0.022em] text-fg">What shipped</h1>
      </div>
      <ol className="relative space-y-8 border-l border-border pl-6">
        {entries.map((e, i) => (
          <motion.li
            key={e.version}
            initial={reduce ? false : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative"
          >
            <span className="absolute top-1.5 -left-[1.91rem] size-2.5 rounded-full border border-border bg-accent" aria-hidden />
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-fg-muted">{e.version}</span>
              <span className="text-xs text-fg-muted">{e.date}</span>
              {e.tag ? <Badge variant="outline">{e.tag}</Badge> : null}
            </div>
            <h2 className="mt-1 text-base font-medium text-fg">{e.title}</h2>
            <ul className="mt-2 space-y-1 text-sm text-fg-muted">
              {e.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
export { ChangelogMotion }
export type { ChangelogMotionProps, Entry as ChangelogEntry }
