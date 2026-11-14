"use client"
import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

/**
 * A horizontal, scroll-snapping row of slides with previous/next buttons.
 *
 * Use for testimonials, product shots or cards that do not fit in one row. Shows about 1.2 slides
 * on phones, 2 on tablets and 3 on desktop; touch users swipe natively. Prefer `Marquee` for an
 * auto-scrolling logo strip. Follows the WAI-ARIA carousel pattern: a labelled region, each slide
 * a group named "2 of 6", Arrow Left/Right scroll when the track is focused, buttons disable at the
 * ends, and scrolling is instant under reduced motion.
 *
 * @example
 * <Carousel label="Customer stories">
 *   {stories.map((s) => <StoryCard key={s.id} {...s} />)}
 * </Carousel>
 */
type CarouselProps = {
  /** One child per slide. */
  children: React.ReactNode
  className?: string
  /** Accessible name of the carousel region. */
  label?: string
}

function Carousel({ children, className, label = "Carousel" }: CarouselProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [edges, setEdges] = React.useState({ start: true, end: false })
  const slides = React.Children.toArray(children)

  const update = React.useCallback(() => {
    const el = ref.current
    if (!el) return
    const start = el.scrollLeft <= 1
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
    setEdges((p) => (p.start === start && p.end === end ? p : { start, end }))
  }, [])

  React.useEffect(() => {
    update()
    const el = ref.current
    if (!el || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [update, slides.length])

  const scroll = (dir: -1 | 1) => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reduce ? "auto" : "smooth" })
  }

  return (
    <div data-slot="carousel" role="region" aria-roledescription="carousel" aria-label={label} className={cn("relative", className)}>
      <div className="mb-2 flex justify-end gap-1">
        <IconButton type="button" size="icon-sm" variant="outline" aria-label="Previous slides" disabled={edges.start} onClick={() => scroll(-1)}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton type="button" size="icon-sm" variant="outline" aria-label="Next slides" disabled={edges.end} onClick={() => scroll(1)}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <div
        ref={ref}
        tabIndex={0}
        role="group"
        aria-label="Slides"
        onScroll={update}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain rounded-lg pb-2 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return
          if (e.key === "ArrowRight") {
            e.preventDefault()
            scroll(1)
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault()
            scroll(-1)
          }
        }}
      >
        {slides.map((child, i) => (
          <div
            key={React.isValidElement(child) && child.key != null ? child.key : i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className="min-w-[80%] snap-start sm:min-w-[45%] lg:min-w-[30%]"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
export { Carousel }
export type { CarouselProps }
