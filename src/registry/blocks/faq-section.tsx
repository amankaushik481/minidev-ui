"use client"
import * as React from "react"
import { PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/*
 * FaqSection: a heading column with a contact line, and an accordion whose
 * answers open by animating grid rows (no measuring), plus rotating to a
 * cross. One open at a time; arrow keys move between questions.
 */

type Faq = { q: string; a: React.ReactNode }

type FaqSectionProps = {
  eyebrow?: string
  title?: React.ReactNode
  description?: React.ReactNode
  items?: Faq[]
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
  className,
}: FaqSectionProps) {
  const [open, setOpen] = React.useState<number | null>(0)
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const id = React.useId()
  return (
    <section data-slot="faq-section" className={cn("mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8", className)}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          {eyebrow ? <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">{eyebrow}</p> : null}
          <h2 className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance text-fg sm:text-5xl">{title}</h2>
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
                      const d = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0
                      if (!d) return
                      e.preventDefault()
                      refs.current[(i + d + items.length) % items.length]?.focus()
                    }}
                    className="group/q flex w-full items-center justify-between gap-6 py-5 text-left text-[16px] font-medium tracking-[-0.01em] text-fg outline-none focus-visible:text-accent-fg"
                  >
                    {it.q}
                    <span className={cn("grid size-7 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 ease-hairline", on ? "rotate-45 border-ink bg-ink text-on-ink" : "border-border text-fg-muted group-hover/q:border-border-strong group-hover/q:text-fg")}>
                      <PlusIcon className="size-3.5" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                  className={cn("grid transition-[grid-template-rows] duration-300 ease-hairline", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                >
                  <div className="overflow-hidden">
                    <p className={cn("max-w-xl pb-6 text-[15px] leading-[1.65] text-fg-muted transition-opacity duration-300", on ? "opacity-100 delay-75" : "opacity-0")}>{it.a}</p>
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
