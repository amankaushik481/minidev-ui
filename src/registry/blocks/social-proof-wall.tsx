"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/*
 * SocialProofWall: a logo marquee that pauses on hover and fades at the
 * edges, then a masonry wall of quotes in three columns that drift at
 * different speeds. Sample content is fictional; replace with your own.
 */

type Quote = { quote: string; name: string; role: string; initials?: string; metric?: string }

type SocialProofWallProps = {
  eyebrow?: string
  title?: React.ReactNode
  logos?: string[]
  quotes?: Quote[]
  className?: string
}

const LOGOS = ["Northwind", "Halcyon", "Oakridge", "Parallel", "Vantage", "Kestrel", "Umbra", "Meridian", "Foxglove", "Tessellate"]

const QUOTES: Quote[] = [
  { quote: "We closed the books four days faster in the first month. The anomaly alerts alone paid for the year.", name: "Priya Raman", role: "VP Finance, Halcyon", metric: "4 days faster close" },
  { quote: "I stopped building dashboards nobody opened. Now the CEO asks Lumen, and so do I.", name: "Marcus Webb", role: "Head of Data, Parallel" },
  { quote: "Setup took an afternoon. Stripe, HubSpot and our warehouse, all talking to each other.", name: "Elena Sorrentino", role: "COO, Kestrel", metric: "1 afternoon to set up" },
  { quote: "It flagged a refund spike on a Sunday before anyone on the team noticed. That was a $40k save.", name: "Daniel Okafor", role: "Founder, Umbra" },
  { quote: "The answers come with the reason. That is the difference between a chart and a decision.", name: "Hana Ito", role: "CFO, Meridian" },
  { quote: "Our board pack builds itself now. I review it, I don't assemble it.", name: "Tom Lindqvist", role: "Finance Lead, Foxglove", metric: "12 hours saved a month" },
  { quote: "Security review took one call. SSO, audit log, EU residency: all there.", name: "Aisha Karim", role: "IT Director, Oakridge" },
  { quote: "The Slack digest is the first thing our whole leadership team reads on Monday.", name: "Leo Brandt", role: "CEO, Vantage" },
  { quote: "We replaced three tools and a spreadsheet nobody trusted.", name: "Sofia Marín", role: "RevOps, Tessellate" },
]

function Wordmark({ name, i }: { name: string; i: number }) {
  const style = i % 3
  return (
    <span className="flex h-10 shrink-0 items-center gap-2 px-8 text-fg-subtle transition-colors duration-200 hover:text-fg">
      <span
        aria-hidden
        className={cn("size-5 border-2 border-current", style === 0 && "rounded-full", style === 1 && "rotate-45 rounded-[4px]", style === 2 && "rounded-md border-dashed")}
      />
      <span className={cn("text-lg tracking-[-0.02em]", style === 1 ? "font-semibold" : "font-medium", style === 2 && "font-mono text-base tracking-normal")}>{name}</span>
    </span>
  )
}

function QuoteCard({ q }: { q: Quote }) {
  const initials = q.initials ?? q.name.split(" ").map((w) => w[0]).join("")
  return (
    <figure className="rounded-2xl border border-border bg-surface p-5 shadow-raised">
      {q.metric ? <p className="mb-3 inline-flex rounded-full bg-accent-soft px-2.5 py-1 text-[11.5px] font-medium text-accent-fg">{q.metric}</p> : null}
      <blockquote className="text-[14px] leading-[1.6] text-fg">&ldquo;{q.quote}&rdquo;</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full border border-border bg-sunken text-[11px] font-medium text-fg-muted">{initials}</span>
        <span>
          <span className="block text-[13px] font-medium text-fg">{q.name}</span>
          <span className="block text-[12px] text-fg-muted">{q.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

function SocialProofWall({
  eyebrow = "Customers",
  title = "Finance teams that stopped waiting for Monday.",
  logos = LOGOS,
  quotes = QUOTES,
  className,
}: SocialProofWallProps) {
  const cols = [0, 1, 2].map((c) => quotes.filter((_, i) => i % 3 === c))
  return (
    <section data-slot="social-proof-wall" className={cn("py-24 sm:py-32", className)}>
      <div className="group/marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-[marquee_40s_linear_infinite] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none">
          {[...logos, ...logos].map((l, i) => (
            <Wordmark key={i} name={l} i={i} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow ? <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">{eyebrow}</p> : null}
          <h2 className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance text-fg sm:text-5xl">{title}</h2>
        </div>
        <div className="relative mt-12 h-[640px] overflow-hidden [mask-image:linear-gradient(transparent,black_12%,black_85%,transparent)]">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cols.map((col, c) => (
              <div key={c} className={cn("space-y-4", c === 1 && "hidden md:block", c === 2 && "hidden lg:block")}>
                <div
                  className="space-y-4 motion-reduce:animate-none"
                  style={{ animation: `wall-up ${38 + c * 9}s linear infinite` }}
                >
                  {[...col, ...col].map((q, i) => (
                    <QuoteCard key={i} q={q} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes wall-up { from { transform: translateY(0) } to { transform: translateY(calc(-50% - 8px)) } }`}</style>
    </section>
  )
}

export { SocialProofWall }
export type { SocialProofWallProps, Quote }
