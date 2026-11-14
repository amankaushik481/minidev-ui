"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"

/**
 * A vertical release timeline whose entries slide in as they scroll into view, with version, date and a New, Fix or Premium tag per release.
 *
 * Pass `entries` newest first. The section heading is an h2 and each release
 * an h3, so it drops into any page under its h1. Use it for a product
 * changelog or release notes page; for a louder marketing version with a
 * Subscribe button use ChangelogMarketing.
 *
 * @example
 * <ChangelogMotion entries={[{ version: "v2.4.0", date: "Oct 8, 2026", title: "Approvals", tag: "New", items: ["Refunds route to an approver"] }]} />
 */
type Entry = {
  /** Version label, e.g. "v2.4.0". Must be unique. */
  version: string
  /** Date as displayed. */
  date: string
  title: string
  /** Bullet points for the release. */
  items: string[]
  /** Badge next to the date. */
  tag?: "New" | "Fix" | "Premium"
}

type ChangelogMotionProps = {
  /** Releases, newest first. */
  entries?: Entry[]
  /** Section heading. */
  title?: string
  className?: string
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

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

function ChangelogMotion({ entries = SAMPLE_ENTRIES, title = "What shipped", className }: ChangelogMotionProps) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="changelog-motion" data-tier="premium" className={cn("mx-auto max-w-2xl space-y-10", className)}>
      <div className="text-center">
        <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Changelog</p>
        <h2 className="mt-2 text-3xl font-medium tracking-[-0.022em] text-balance text-fg">{title}</h2>
      </div>
      <ol className="relative space-y-8 border-l border-border pl-6">
        {entries.map((e, i) => (
          <motion.li
            key={e.version}
            initial={reduce ? false : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={reduce ? { duration: 0 } : { ...MORPH, delay: i * 0.05 }}
            className="relative"
          >
            {/* Centred on the 1px rule: the li starts 24px + 1px border to its right. */}
            <span className="absolute top-1.5 -left-6 size-2.5 -translate-x-1/2 rounded-full border border-border bg-accent" aria-hidden />
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-fg-muted">{e.version}</span>
              <span className="text-xs text-fg-muted">{e.date}</span>
              {e.tag ? <Badge variant="outline">{e.tag}</Badge> : null}
            </div>
            <h3 className="mt-1 text-base font-medium text-fg">{e.title}</h3>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-fg-muted marker:text-fg-subtle">
              {e.items.map((item) => (
                <li key={item}>{item}</li>
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
