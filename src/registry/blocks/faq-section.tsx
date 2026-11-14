"use client"
import * as React from "react"
import { PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * FaqSection — a landing-page FAQ: a heading column with a contact line beside a one-open-at-a-time accordion.
 *
 * Use near the end of a marketing page, before the closing CTA. Answers open by animating grid rows (no measuring) and
 * the plus turns into a cross. Keyboard follows the WAI-ARIA accordion pattern: Enter/Space toggles, Arrow Up/Down move
 * between questions, Home/End jump to the first/last. Closed answers are inert. For an in-app collapsible list use
 * Accordion.
 *
 * @example
 * <FaqSection items={[{ q: "Do you store our data?", a: "Only aggregates, encrypted at rest." }]} />
 */
type Faq = {
  /** The question; also the accordion trigger's label. Must be unique. */
  q: string
  /** The answer; text or rich content (links stay unfocusable while closed). */
  a: React.ReactNode
}

type FaqSectionProps = {
  /** Small mono label above the title. Empty string hides it. */
  eyebrow?: string
  /** Section heading (rendered as h2). */
  title?: React.ReactNode
  /** Line under the heading, e.g. how to reach a person. */
  description?: React.ReactNode
  /** Questions in order. Defaults to Lumen's FAQ. */
  items?: Faq[]
  /** Index of the question open on first render; `null` starts all closed. */
  defaultOpen?: number | null
  className?: string
}

const ITEMS: Faq[] = [
  { q: "How long does setup take?", a: "Most teams connect their first three sources in under 20 minutes. The baselines are ready the next morning." },
  { q: "Do you store our data?", a: "We store aggregated metrics, not raw records. Keys are read-only and encrypted, and you can pick EU or US residency." },
  { q: "Can Lumen change anything in our systems?", a: "No. Lumen only reads. When it suggests an action, a person approves it, and every answer is logged." },
  { q: "What happens after the trial?", a: "You pick a plan or drop to Starter, which is free forever for one person. We never charge without asking." },
  { q: "Do you offer discounts for startups?", a: "Yes. Companies under two years old and under $1M ARR get Team at half price for the first year." },
]

function FaqSection({
  eyebrow = "FAQ",
  title = "Questions, answered.",
  description = "Something else on your mind? Write to us and a person replies the same day.",
  items = ITEMS,
  defaultOpen = 0,
  className,
}: FaqSectionProps) {
  const [open, setOpen] = React.useState<number | null>(defaultOpen)
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const id = React.useId()
  return (
    <section data-slot="faq-section" aria-labelledby={`${id}-title`} className={cn("mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8", className)}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          {eyebrow ? <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">{eyebrow}</p> : null}
          <h2 id={`${id}-title`} className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance text-fg sm:text-5xl">{title}</h2>
          {description ? <p className="mt-4 max-w-sm text-[15px] leading-[1.65] text-fg-muted">{description}</p> : null}
        </div>
        <div className="divide-y divide-border border-y border-border">
          {items.map((it, i) => {
            const on = open === i
            return (
              <div key={it.q}>
                <h3>
                  <button
                    ref={(el) => {
                      refs.current[i] = el
                    }}
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={on}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(on ? null : i)}
                    onKeyDown={(e) => {
                      const n = items.length
                      const to =
                        e.key === "ArrowDown" ? (i + 1) % n : e.key === "ArrowUp" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1
                      if (to < 0) return
                      e.preventDefault()
                      refs.current[to]?.focus()
                    }}
                    className="group/q flex w-full items-center justify-between gap-6 py-5 text-left text-[16px] font-medium tracking-[-0.01em] text-fg rounded-md outline-none focus-visible:text-accent-fg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
                  >
                    {it.q}
                    <span aria-hidden className={cn("grid size-7 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 ease-hairline motion-reduce:transition-none", on ? "rotate-45 border-ink bg-ink text-on-ink" : "border-border text-fg-muted group-hover/q:border-border-strong group-hover/q:text-fg")}>
                      <PlusIcon className="size-3.5" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                  inert={!on}
                  className={cn("grid transition-[grid-template-rows] duration-300 ease-hairline motion-reduce:transition-none", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                >
                  <div className="overflow-hidden">
                    <div className={cn("max-w-xl pb-6 text-[15px] leading-[1.65] text-fg-muted transition-opacity duration-300 motion-reduce:transition-none", on ? "opacity-100 delay-75" : "opacity-0")}>{it.a}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { FaqSection }
export type { FaqSectionProps, Faq }
