"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { MaskedGradientHeadline } from "@/registry/premium/masked-gradient-headline"
import { MagneticCta } from "@/registry/premium/magnetic-cta"

type Entry = { version: string; date: string; title: string; items: string[]; highlight?: boolean }

function ChangelogMarketing({
  entries = [
    {
      version: "v0.6",
      date: "Sep 14",
      title: "Launch pages that feel expensive",
      highlight: true,
      items: ["Kinetic type + sticky story", "Magnetic CTA + wipe compare", "Launch + investor kits"],
    },
    {
      version: "v0.5",
      date: "Sep 14",
      title: "Email, admin, page kits",
      items: ["Transactional email", "Admin console density", "Careers / pricing / blog"],
    },
    {
      version: "v0.4",
      date: "Sep 14",
      title: "Templates + AI studio",
      items: ["SaaS landing", "Charts density", "Composer surfaces"],
    },
  ],
  className,
}: {
  entries?: Entry[]
  className?: string
}) {
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
            transition={{ delay: i * 0.06 }}
            className="relative ml-6 pb-10 last:pb-0"
          >
            <span
              className={cn(
                "absolute top-1.5 -left-[31px] size-3 rounded-full border-2 border-bg",
                e.highlight ? "bg-accent" : "bg-fg-subtle"
              )}
              aria-hidden
            />
            <div className={cn("rounded-xl border border-border bg-surface p-5", e.highlight && "border-accent/35")}>
              <div className="flex flex-wrap items-center gap-2 text-xs text-fg-muted">
                <span className="font-mono font-medium text-fg">{e.version}</span>
                <span>·</span>
                <time>{e.date}</time>
              </div>
              <h3 className="mt-2 text-lg font-medium tracking-[-0.008em] text-fg">{e.title}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-fg-muted">
                {e.items.map((item) => (
                  <li key={item}>• {item}</li>
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
