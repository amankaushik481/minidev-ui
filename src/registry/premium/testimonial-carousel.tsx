"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * One large customer quote at a time that rotates on its own, with dot and Previous / Next controls.
 * It follows the WAI-ARIA carousel pattern: a labelled region, slide
 * buttons with `aria-current`, rotation that pauses while the pointer or
 * keyboard focus is inside and stops once the visitor takes control, and a
 * polite announcement only when the visitor changes the slide. Quotes rise on
 * the morph spring and leave faster; reduced motion never auto-rotates.
 *
 * Use it for three to six longer testimonials. Reach for MarqueeQuotes for
 * many short quotes at once, and the free Testimonial or PressQuote for a
 * single static quote. Use real customer words: never invent testimonials.
 *
 * @example
 * <TestimonialCarousel interval={6000} items={[{ quote: "Month-end close went from four days to one.", name: "Maya Patel", role: "Controller, Northwind" }]} />
 */
type TestimonialItem = {
  /** The quote, without quotation marks. */
  quote: string
  name: string
  /** Role and company, e.g. "Controller, Northwind". */
  role: string
}

type TestimonialCarouselProps = {
  items?: TestimonialItem[]
  /** Milliseconds each quote stays while auto-rotating. 0 turns rotation off. */
  interval?: number
  /** Accessible name of the carousel region. */
  label?: string
  className?: string
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const
const EXIT = { duration: 0.16, ease: [0.3, 0, 0.8, 0.15] } as const

function TestimonialCarousel({
  items = [
    { quote: "We replaced four tools with one, and nobody asked to go back.", name: "Sam Rivera", role: "Founder" },
    { quote: "The first product in years our designers did not want to redesign.", name: "Lee Park", role: "Design Eng" },
    { quote: "Setup took an afternoon. We shipped the same week.", name: "Ava Chen", role: "PM" },
  ],
  interval = 4500,
  label = "Customer testimonials",
  className,
}: TestimonialCarouselProps) {
  const reduce = useReducedMotion()
  const [i, setI] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const [manual, setManual] = React.useState(false)
  const n = items.length
  const index = n ? i % n : 0
  const item = items[index]
  const rotating = !reduce && !paused && !manual && interval > 0 && n > 1

  React.useEffect(() => {
    if (!rotating) return
    const id = window.setInterval(() => setI((x) => (x + 1) % n), interval)
    return () => window.clearInterval(id)
  }, [rotating, n, interval])

  const show = (to: number) => {
    setManual(true)
    setI(((to % n) + n) % n)
  }

  if (!item) return null
  return (
    <section
      data-slot="testimonial-carousel"
      data-tier="premium"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false)
      }}
      className={cn("rounded-2xl border border-border bg-surface p-5 shadow-raised sm:p-8", className)}
    >
      {/* Announce only slides the visitor chose; auto-rotation stays silent. */}
      <div aria-live={manual ? "polite" : "off"} className="grid">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.figure
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${n}`}
            initial={reduce ? false : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { y: -12, opacity: 0, transition: EXIT }}
            transition={reduce ? { duration: 0 } : MORPH}
            className="col-start-1 row-start-1"
          >
            <blockquote className="text-xl font-medium tracking-[-0.014em] text-fg sm:text-2xl">“{item.quote}”</blockquote>
            <figcaption className="mt-4 text-sm text-fg-muted">
              <span className="font-medium text-fg">{item.name}</span> · {item.role}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex items-center gap-1">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Show testimonial ${idx + 1}`}
            aria-current={idx === index ? "true" : undefined}
            onClick={() => show(idx)}
            className="group flex h-8 w-7 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span
              data-slot="testimonial-carousel-dot"
              className={cn(
                "h-1.5 w-6 rounded-full transition-colors duration-[70ms]",
                idx === index ? "bg-accent" : "bg-border group-hover:bg-border-strong"
              )}
            />
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <Button type="button" size="sm" variant="outline" onClick={() => show(index - 1)}>
            Prev
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => show(index + 1)}>
            Next
          </Button>
        </div>
      </div>
    </section>
  )
}
export { TestimonialCarousel }
export type { TestimonialCarouselProps, TestimonialItem }
