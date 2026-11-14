"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { MaskedGradientHeadline } from "@/registry/premium/masked-gradient-headline"
import { MagneticCta } from "@/registry/premium/magnetic-cta"

/**
 * A marketing changelog section: an eyebrow, a gradient headline, a Subscribe button and a timeline of release cards that slide in as they scroll into view.
 *
 * Pass `entries` newest first; mark the release you want to sell with
 * `highlight`. Use it on a public "What's new" page; for a quieter timeline
 * with New/Fix tags use ChangelogMotion.
 *
 * @example
 * <ChangelogMarketing entries={[{ version: "v2.4", date: "Oct 8", dateTime: "2026-10-08", title: "Approvals", items: ["Route refunds to an approver"], highlight: true }]} />
 */
type Entry = {
  /** Version label, e.g. "v2.4". Must be unique. */
  version: string
  /** Human date as displayed, e.g. "Oct 8". */
  date: string
  /** Machine-readable date for the time element, e.g. "2026-10-08". */
  dateTime?: string
  title: string
  /** Bullet points for the release. */
  items: string[]
  /** Accent the card and its timeline dot. */
  highlight?: boolean
}

type ChangelogMarketingProps = {
  /** Releases, newest first. */
  entries?: Entry[]
  className?: string
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function ChangelogMarketing({
  entries = [
    {
      version: "v0.6",
      date: "Sep 14",
      dateTime: "2026-09-14",
      title: "Launch pages that feel expensive",
      highlight: true,
      items: ["Kinetic type + sticky story", "Magnetic CTA + wipe compare", "Launch + investor kits"],
    },
    {
      version: "v0.5",
      date: "Aug 28",
      dateTime: "2026-08-28",
      title: "Email, admin, page kits",
      items: ["Transactional email", "Admin console density", "Careers / pricing / blog"],
    },
    {
      version: "v0.4",
      date: "Aug 9",
      dateTime: "2026-08-09",
      title: "Templates + AI studio",
      items: ["SaaS landing", "Charts density", "Composer surfaces"],
    },
  ],
  className,
}: ChangelogMarketingProps) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="changelog-marketing" data-tier="premium" className={cn("space-y-10", className)}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Changelog</p>
          <MaskedGradientHeadline>What just shipped.</MaskedGradientHeadline>
        </div>
        <MagneticCta variant="outline">Subscribe</MagneticCta>
      </div>
      <ol className="relative space-y-0 border-l border-border">
        {entries.map((e, i) => (
          <motion.li
            key={e.version}
            initial={reduce ? false : { x: -8 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={reduce ? { duration: 0 } : { ...MORPH, delay: i * 0.06 }}
            className="relative ml-6 pb-10 last:pb-0"
          >
            <span
              className={cn(
                // Centred on the 1px rule: the li starts 24px + 1px border to its right.
                "absolute top-1.5 -left-6 size-3 -translate-x-1/2 rounded-full border-2 border-bg",
                e.highlight ? "bg-accent" : "bg-fg-subtle"
              )}
              aria-hidden
            />
            <div className={cn("rounded-xl border border-border bg-surface p-5", e.highlight && "border-accent-line")}>
              <div className="flex flex-wrap items-center gap-2 text-xs text-fg-muted">
                <span className="font-mono font-medium text-fg">{e.version}</span>
                <span aria-hidden>·</span>
                <time dateTime={e.dateTime}>{e.date}</time>
              </div>
              <h3 className="mt-2 text-lg font-medium tracking-[-0.008em] text-fg">{e.title}</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm text-fg-muted marker:text-fg-subtle">
                {e.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
export { ChangelogMarketing }
export type { ChangelogMarketingProps, Entry as ChangelogMarketingEntry }
