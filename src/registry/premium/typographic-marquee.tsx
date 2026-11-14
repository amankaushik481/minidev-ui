"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Big display phrases separated by accent dots, scrolling endlessly across a band, for a bold typographic break between sections.
 * The band loops on the compositor (a CSS transform), pauses while the
 * pointer is over it, and holds still for reduced motion. Screen readers
 * read the phrases once; the looping copy is hidden from them.
 *
 * Use it as a loud divider or a list of selling points. Reach for
 * LogoWallMotion for logos, MarqueeQuotes for testimonials, and the free
 * Marquee for a small, quiet ticker.
 *
 * @example
 * <TypographicMarquee phrases={["Bank sync", "Auto reminders", "One-click close"]} duration={24} />
 */
type TypographicMarqueeProps = {
  /** Phrases in order. Keep them short: two or three words each. */
  phrases?: string[]
  /** @deprecated Use `phrases`. */
  text?: string
  /** Seconds for one full loop. Higher is calmer. */
  duration?: number
  className?: string
}

function TypographicMarquee({ phrases, text, duration = 28, className }: TypographicMarqueeProps) {
  const items =
    phrases ??
    (text
      ? [text]
      : ["Realtime sync", "Offline first", "SOC 2 Type II", "99.99% uptime", "Ships weekly", "Loved by teams"])
  const copy = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 whitespace-nowrap">
      {items.map((phrase, i) => (
        <li
          key={i}
          className="text-3xl font-medium tracking-[-0.026em] text-fg sm:text-5xl sm:tracking-[-0.030em]"
        >
          {phrase}
          <span aria-hidden className="mx-5 text-accent sm:mx-6">·</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div
      data-slot="typographic-marquee"
      data-tier="premium"
      className={cn(
        "w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-border bg-bg py-6 sm:py-8",
        className
      )}
    >
      <div
        data-slot="typographic-marquee-track"
        className="flex w-max [animation:marquee_var(--marquee-d)_linear_infinite] hover:[animation-play-state:paused] motion-reduce:[animation:none]"
        style={{ "--marquee-d": `${duration}s` } as React.CSSProperties}
      >
        {copy()}
        {copy(true)}
      </div>
    </div>
  )
}
export { TypographicMarquee }
export type { TypographicMarqueeProps }
