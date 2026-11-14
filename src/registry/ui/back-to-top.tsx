"use client"
import * as React from "react"
import { ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A floating back to top button that appears after the reader scrolls, with a ring that fills as they progress.
 *
 * Use on long docs, articles and changelogs. Fixed bottom-right; move it with `className`. Scrolls
 * smoothly unless reduced motion is on, then moves focus to `<main>` (or the first `<h1>`) so
 * keyboard users land at the top too. While hidden it is out of the tab order.
 *
 * @example
 * <BackToTop threshold={600} />
 * // inside a scrolling panel:
 * <BackToTop target={panelRef} className="absolute" />
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
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const el = target?.current
        ;(el ?? window).scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
        const top = (el?.querySelector("h1, h2") ?? document.querySelector("main") ?? document.querySelector("h1")) as HTMLElement | null
        if (top) {
          // Headings and <main> are not focusable by default; make them programmatically focusable.
          if (!top.hasAttribute("tabindex")) top.setAttribute("tabindex", "-1")
          top.focus({ preventScroll: true })
        }
      }}
      className={cn(
        "fixed right-5 bottom-5 z-40 grid size-11 place-items-center rounded-full border border-border bg-raised text-fg shadow-overlay outline-none transition-[opacity,translate] focus-visible:ring-2 focus-visible:ring-accent",
        visible ? "translate-y-0 opacity-100 duration-200 ease-hairline" : "pointer-events-none translate-y-3 opacity-0 duration-[160ms] ease-exit",
        className,
      )}
    >
      <svg aria-hidden viewBox="0 0 44 44" className="absolute inset-0 size-full -rotate-90">
        <circle cx="22" cy="22" r={r} fill="none" className="stroke-border" strokeWidth="2" />
        <circle cx="22" cy="22" r={r} fill="none" className="stroke-accent" strokeWidth="2" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - progress)} />
      </svg>
      <ArrowUpIcon aria-hidden className="relative size-4" />
    </button>
  )
}

export { BackToTop }
export type { BackToTopProps }
