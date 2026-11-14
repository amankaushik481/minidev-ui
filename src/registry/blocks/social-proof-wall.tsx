"use client"
import * as React from "react"
import { PauseIcon, PlayIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * SocialProofWall — a customer section: a logo marquee that fades at the edges, then a wall of quotes in up to three columns drifting at different speeds.
 *
 * Use once on a landing page, after the product sections. Motion pauses on hover and with the "Pause motion" button
 * (WCAG 2.2.2), and stops entirely under reduced motion; duplicated copies used for the loop are hidden from screen
 * readers. The default logos and quotes are fictional samples: always pass your own real customers. For a single
 * featured quote use a Testimonial; for a static logo row use LogoCloud.
 *
 * @example
 * <SocialProofWall logos={["Acme", "Globex"]} quotes={[{ quote: "Closed the books in two days.", name: "Jane Doe", role: "CFO, Acme" }]} />
 */
type Quote = {
  /** The quote text, without quotation marks. */
  quote: string
  /** Person's full name. */
  name: string
  /** Role and company, e.g. "CFO, Acme". */
  role: string
  /** Avatar initials. Derived from `name` when omitted. */
  initials?: string
  /** Optional outcome chip above the quote, e.g. "4 days faster close". */
  metric?: string
}

type SocialProofWallProps = {
  /** Small mono label above the title. Empty string hides it. */
  eyebrow?: string
  /** Section heading (rendered as h2). */
  title?: React.ReactNode
  /** Company names for the marquee, rendered as text wordmarks. */
  logos?: string[]
  /** Quotes, distributed round-robin into three columns. */
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
    <span className="flex h-10 shrink-0 items-center gap-2 px-8 text-fg-subtle transition-colors duration-200 hover:text-fg motion-reduce:transition-none">
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
  const [paused, setPaused] = React.useState(false)
  const titleId = React.useId()
  const hold = paused && "[animation-play-state:paused]"
  return (
    <section data-slot="social-proof-wall" aria-labelledby={titleId} className={cn("py-24 sm:py-32", className)}>
      <div className="group/marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul
          aria-label="Customers"
          className={cn("flex w-max animate-[marquee_40s_linear_infinite] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none", hold)}
        >
          {logos.map((l, i) => (
            <li key={`a${i}`}>
              <Wordmark name={l} i={i} />
            </li>
          ))}
          {/* second copy only makes the loop seamless */}
          {logos.map((l, i) => (
            <li key={`b${i}`} aria-hidden>
              <Wordmark name={l} i={i + logos.length} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow ? <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">{eyebrow}</p> : null}
          <h2 id={titleId} className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance text-fg sm:text-5xl">
            {title}
          </h2>
          <Button variant="ghost" size="sm" className="mt-4 motion-reduce:hidden" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
            {paused ? <PlayIcon aria-hidden /> : <PauseIcon aria-hidden />}
            {paused ? "Play motion" : "Pause motion"}
          </Button>
        </div>
        <div className="relative mt-8 h-[640px] overflow-hidden [mask-image:linear-gradient(transparent,black_12%,black_85%,transparent)]">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cols.map((col, c) => (
              <div key={c} className={cn("space-y-4", c === 1 && "hidden md:block", c === 2 && "hidden lg:block")}>
                {/* class, not inline style, so motion-reduce:animate-none can win */}
                <div
                  className={cn("space-y-4 animate-[wall-up_var(--wall-d)_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none", hold)}
                  style={{ "--wall-d": `${38 + c * 9}s` } as React.CSSProperties}
                >
                  {col.map((q, i) => (
                    <QuoteCard key={i} q={q} />
                  ))}
                  <div aria-hidden className="space-y-4">
                    {col.map((q, i) => (
                      <QuoteCard key={i} q={q} />
                    ))}
                  </div>
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
