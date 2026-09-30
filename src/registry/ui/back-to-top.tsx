"use client"
import * as React from "react"
import { ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A back to top button that appears after the reader scrolls, with a ring
 * that fills as they progress through the page. Scrolls smoothly unless
 * reduced motion is on, then moves focus to the top of the document.
 */
type BackToTopProps = {
  /** Show after this many pixels of scroll. */
  threshold?: number
  /** Element to scroll; defaults to the window. */
  target?: React.RefObject<HTMLElement | null>
  className?: string
}

function BackToTop({ threshold = 400, target, className }: BackToTopProps) {
  const [progress, setProgress] = React.useState(0)
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    const el = target?.current
    const read = () => {
      const top = el ? el.scrollTop : window.scrollY
      const max = el ? el.scrollHeight - el.clientHeight : document.documentElement.scrollHeight - window.innerHeight
      setVisible(top > threshold)
      setProgress(max > 0 ? Math.min(1, top / max) : 0)
    }
    read()
    const src: HTMLElement | Window = el ?? window
    src.addEventListener("scroll", read, { passive: true })
    return () => src.removeEventListener("scroll", read)
  }, [threshold, target])
  const r = 19
  const c = 2 * Math.PI * r
  return (
    <button
      type="button"
      data-slot="back-to-top"
      aria-label="Back to top"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const el = target?.current
        ;(el ?? window).scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
        ;(document.querySelector("main, h1") as HTMLElement | null)?.focus?.({ preventScroll: true })
      }}
      className={cn(
        "fixed right-5 bottom-5 z-40 grid size-11 place-items-center rounded-full border border-border bg-raised text-fg shadow-overlay outline-none transition-[opacity,transform] duration-300 focus-visible:ring-2 focus-visible:ring-accent",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        className,
      )}
    >
      <svg aria-hidden viewBox="0 0 44 44" className="absolute inset-0 size-full -rotate-90">
        <circle cx="22" cy="22" r={r} fill="none" stroke="var(--border)" strokeWidth="2" />
        <circle cx="22" cy="22" r={r} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - progress)} />
      </svg>
      <ArrowUpIcon className="relative size-4" />
    </button>
  )
}

export { BackToTop }
export type { BackToTopProps }
