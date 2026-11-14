"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A frame viewer with a strip of thumbnails and a scrub slider below it; pick a thumbnail or drag the slider to change the frame.
 *
 * The slider is a native range input (arrow keys, Home, End) and the strip
 * keeps the current thumbnail scrolled into view. Pass `renderFrame` to draw
 * your own frame (a video still, a step of an animation); without it the
 * viewer shows the frame number. Works uncontrolled (`defaultValue`) or
 * controlled (`value` + `onValueChange`). Use it to step through a sequence;
 * for comparing two states use BeforeAfterWipe.
 *
 * @example
 * <FilmstripScrub frames={24} renderFrame={(i) => <img src={`/frames/${i}.jpg`} alt={`Frame ${i + 1}`} />} />
 */
type FilmstripScrubProps = {
  /** Number of frames. */
  frames?: number
  /** Selected frame index (0-based) when controlled. */
  value?: number
  /** Initial frame index when uncontrolled. */
  defaultValue?: number
  /** Called with the new frame index. */
  onValueChange?: (index: number) => void
  /** Draws the selected frame in the viewer. Defaults to the frame number. */
  renderFrame?: (index: number) => React.ReactNode
  className?: string
}

function FilmstripScrub({ frames = 12, value, defaultValue = 3, onValueChange, renderFrame, className }: FilmstripScrubProps) {
  const reduce = useReducedMotion()
  const id = React.useId()
  const [inner, setInner] = React.useState(defaultValue)
  const i = Math.min(Math.max(0, value ?? inner), Math.max(0, frames - 1))
  const strip = React.useRef<HTMLDivElement>(null)
  const moved = React.useRef(false)
  const set = (n: number) => {
    moved.current = true
    if (value === undefined) setInner(n)
    onValueChange?.(n)
  }
  // Keep the selected thumbnail visible; scroll the strip only (never the page), and not on first render.
  React.useEffect(() => {
    const el = strip.current
    const thumb = el?.children[i] as HTMLElement | undefined
    if (!el || !thumb || !moved.current) return
    const left = thumb.offsetLeft // the strip is position: relative, so this is relative to it
    if (left < el.scrollLeft || left + thumb.offsetWidth > el.scrollLeft + el.clientWidth) {
      el.scrollTo({ left: left - (el.clientWidth - thumb.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" })
    }
  }, [i, reduce])
  return (
    <div data-slot="filmstrip-scrub" data-tier="premium" className={cn("space-y-3", className)}>
      <div className="aspect-[16/9] overflow-hidden rounded-xl border border-border bg-sunken">
        {renderFrame ? (
          renderFrame(i)
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="font-mono text-xs text-fg-muted">FRAME</p>
              <p className="text-4xl font-medium text-fg tabular-nums">{String(i + 1).padStart(2, "0")}</p>
            </div>
          </div>
        )}
      </div>
      <div ref={strip} role="group" aria-label="Filmstrip" className="relative flex gap-1 overflow-x-auto pb-1">
        {Array.from({ length: frames }, (_, n) => (
          <button
            key={n}
            type="button"
            aria-label={`Frame ${n + 1}`}
            aria-pressed={n === i}
            onClick={() => set(n)}
            className={cn(
              "h-14 w-20 shrink-0 rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-accent",
              n === i ? "border-accent bg-accent-soft" : "border-border bg-surface hover:border-border-strong"
            )}
          />
        ))}
      </div>
      <label className="block text-xs text-fg-muted" htmlFor={`${id}-scrub`}>
        Scrub
      </label>
      <input
        id={`${id}-scrub`}
        type="range"
        min={0}
        max={Math.max(0, frames - 1)}
        value={i}
        aria-valuetext={`Frame ${i + 1} of ${frames}`}
        onChange={(e) => set(Number(e.target.value))}
        className="w-full accent-accent"
      />
    </div>
  )
}
export { FilmstripScrub }
export type { FilmstripScrubProps }
