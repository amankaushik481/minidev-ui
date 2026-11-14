"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Two rows of short customer quotes drifting in opposite directions, for a calm wall of social proof.
 * Each row loops on the compositor (a CSS transform), pauses while the
 * pointer is over it, and holds still for reduced motion. Screen readers get
 * each quote once; the looping copies are hidden from them.
 *
 * Use it for many short quotes at a glance. Reach for TestimonialCarousel for
 * one long quote at a time with controls, and LogoWallMotion for logos. Use
 * real customer words: never invent testimonials.
 *
 * @example
 * <MarqueeQuotes items={[{ quote: "Month-end close went from four days to one.", name: "Maya Patel, Northwind" }]} />
 */
type MarqueeQuote = {
  /** The quote, without quotation marks. */
  quote: string
  /** Who said it, with their company or role. */
  name: string
}

type MarqueeQuotesProps = {
  /** Quotes for the first row; the second row shows them in reverse order. */
  items?: MarqueeQuote[]
  /** Seconds for one full loop of a row. Higher is calmer. */
  duration?: number
  className?: string
}

function Row({ items, reverse, duration }: { items: MarqueeQuote[]; reverse?: boolean; duration: number }) {
  const copy = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-4 pr-4">
      {items.map((q, i) => (
        <li key={i} className="w-72 shrink-0">
          <figure className="h-full rounded-xl border border-border bg-surface p-4 shadow-highlight">
            <blockquote className="text-sm leading-[1.55] text-fg">“{q.quote}”</blockquote>
            <figcaption className="mt-3 text-xs text-fg-muted">{q.name}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max [animation:marquee_var(--marquee-d)_linear_infinite] hover:[animation-play-state:paused] motion-reduce:[animation:none]"
        style={{ "--marquee-d": `${duration}s`, animationDirection: reverse ? "reverse" : undefined } as React.CSSProperties}
      >
        {copy()}
        {copy(true)}
      </div>
    </div>
  )
}

function MarqueeQuotes({
  items = [
    { quote: "Finally motion that matches the product kit.", name: "Jordan Lee" },
    { quote: "Calm, fast, and it never gets in the way.", name: "Sam Ortiz" },
    { quote: "We shipped the launch page in one afternoon.", name: "Riley Ng" },
    { quote: "Every screen looks like someone cared.", name: "Ava Chen" },
  ],
  duration = 32,
  className,
}: MarqueeQuotesProps) {
  return (
    <div data-slot="marquee-quotes" data-tier="premium" className={cn("space-y-4", className)}>
      <Row items={items} duration={duration} />
      {/* The second row repeats the same quotes, so it is hidden from screen readers entirely. */}
      <div aria-hidden>
        <Row items={[...items].reverse()} duration={duration} reverse />
      </div>
    </div>
  )
}
export { MarqueeQuotes }
export type { MarqueeQuotesProps, MarqueeQuote }
