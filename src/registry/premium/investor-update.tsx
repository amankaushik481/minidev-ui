"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { FlipStatBoard, type FlipStat } from "@/registry/premium/flip-stat-board"
import { MaskedGradientHeadline } from "@/registry/premium/masked-gradient-headline"
import { CursorSpotlightPanel } from "@/registry/premium/cursor-spotlight-panel"
import { HorizontalProductRail } from "@/registry/premium/horizontal-product-rail"

/**
 * An investor update page: a quarter eyebrow and gradient headline, a flip-counter stat board, a "What shipped" list, a product rail and a spotlit "Ask" panel.
 *
 * A page template for a public or emailed-as-link update. Every block takes
 * props: pass your own `stats`, `shipped` and `ask`. The sample is the
 * fictional Lumen; never ship invented numbers for a real company. For a
 * single metric row use FlipStatBoard on its own.
 *
 * @example
 * <InvestorUpdate quarter="Q3 2026" headline="Profitable on a monthly basis." stats={[{ value: 1284, label: "Paying teams" }]} shipped={["Approvals", "Multi-currency"]} />
 */
type InvestorUpdateProps = {
  /** Period shown in the eyebrow, e.g. "Q3 2026". */
  quarter?: string
  /** Gradient headline, rendered as an h2 by MaskedGradientHeadline. */
  headline?: string
  /** Paragraph under the headline. */
  summary?: string
  /** Headline metrics for the flip board. */
  stats?: FlipStat[]
  /** Bullet points under "What shipped". */
  shipped?: string[]
  /** Body of the closing "Ask" panel. */
  ask?: string
  className?: string
}

function InvestorUpdate({
  quarter = "Q3",
  headline = "Building the ledger finance teams refuse to leave.",
  summary = "Lumen is invoicing and payments for teams that close their books every day. This quarter we shipped approvals, multi-currency and self-serve onboarding.",
  stats = [
    { value: 1284, label: "Paying teams" },
    { value: 48, label: "Currencies settled" },
    { value: 3, label: "Releases shipped" },
  ],
  shipped = [
    "Approvals and an audit trail for refunds and credits",
    "Multi-currency ledger with locked rates",
    "Self-serve onboarding, from signup to first invoice",
  ],
  ask = "We are hiring two engineers and a designer. Introductions to finance leads at 50 to 500 person companies are the most useful help right now.",
  className,
}: InvestorUpdateProps) {
  const reduce = useReducedMotion()
  return (
    <article data-slot="investor-update" data-tier="premium" className={cn("mx-auto max-w-3xl space-y-12 px-6 py-16", className)}>
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Investor update · {quarter}</p>
        <MaskedGradientHeadline>{headline}</MaskedGradientHeadline>
        <motion.p
          initial={reduce ? false : { y: 8 }}
          animate={{ y: 0 }}
          transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.16, duration: 0.5 }}
          className="text-base leading-[1.55] text-pretty text-fg-muted"
        >
          {summary}
        </motion.p>
      </header>
      <FlipStatBoard stats={stats} />
      <section className="space-y-3">
        <h2 className="text-xl font-medium tracking-[-0.014em] text-fg">What shipped</h2>
        <ul className="space-y-2 text-sm leading-[1.55] text-fg-muted">
          {shipped.map((item) => (
            <li key={item} className="border-l border-accent-line pl-3">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <HorizontalProductRail title="Product surfaces" />
      <CursorSpotlightPanel title="Ask" body={ask} />
    </article>
  )
}
export { InvestorUpdate }
export type { InvestorUpdateProps }
