"use client"
import * as React from "react"
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from "motion/react"
import { ChevronsLeftRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { AppMock } from "@/components/landing/app-mock"

const BASE_W = 1200
const BASE_H = 680
const REST = 56

/**
 * WireCanvas — the hero. The same product rendered twice: its hairline spec
 * underneath, the finished UI on top, split by a draggable accent line.
 * On load the line sweeps across and "renders" the product from the spec.
 */
export function WireCanvas({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const wrap = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState<number | null>(null)
  const split = useMotionValue(reduce ? REST : 0)
  const scaleMV = useMotionValue(1)
  const clip = useTransform(split, (v) => `inset(0 ${100 - v}% 0 0 round 18px)`)
  // Line position lives in canvas space so it matches the clip when cropped on mobile.
  const left = useTransform([split, scaleMV], ([v, s]) => `${((v as number) / 100) * BASE_W * (s as number)}px`)
  const productLabelOpacity = useTransform(split, [8, 20], [0, 1])
  const specLabelOpacity = useTransform(split, [80, 92], [1, 0])
  const [val, setVal] = React.useState(reduce ? REST : 0)
  useMotionValueEvent(split, "change", (v) => setVal(Math.round(v)))
  const dragging = React.useRef(false)

  React.useLayoutEffect(() => {
    const el = wrap.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      // Below ~720px we crop instead of shrinking into illegibility.
      const next = w >= 720 ? w / BASE_W : Math.max(w / BASE_W, 0.56)
      scaleMV.set(next)
      setScale(next)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [scaleMV])

  React.useEffect(() => {
    if (reduce) {
      split.set(REST)
      return
    }
    const c = animate(split, [0, 100, REST], { duration: 2.6, delay: 0.5, times: [0, 0.62, 1], ease: [[0.65, 0, 0.35, 1], [0.4, 0, 0.2, 1]] })
    return () => c.stop()
  }, [reduce, split])

  const setFromClientX = (x: number) => {
    const el = wrap.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const canvasW = BASE_W * (scale ?? 1)
    split.set(Math.max(0, Math.min(100, ((x - r.left) / canvasW) * 100)))
  }

  const h = BASE_H * (scale ?? 0)

  return (
    <div className={cn("relative", className)}>
      <div
        ref={wrap}
        className="relative w-full overflow-hidden rounded-[18px] select-none"
        style={{ height: scale ? h : undefined, aspectRatio: scale ? undefined : `${BASE_W} / ${BASE_H}` }}
        onPointerDown={(e) => {
          dragging.current = true
          ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
          split.stop()
          setFromClientX(e.clientX)
        }}
        onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {scale ? (
          <div className="absolute top-0 left-0 origin-top-left" style={{ transform: `scale(${scale})`, width: BASE_W, height: BASE_H }}>
            <AppMock wire className="absolute inset-0" />
            <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
              <AppMock />
            </motion.div>
          </div>
        ) : null}

        {/* Split line + grip */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-accent shadow-[0_0_0_1px_color-mix(in_oklch,var(--accent)_18%,transparent),0_0_24px_2px_color-mix(in_oklch,var(--accent)_45%,transparent)]"
          style={{ left, maxWidth: 1 }}
        >
          <div
            role="slider"
            tabIndex={0}
            aria-label="Compare product with its hairline spec"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={val}
            aria-valuetext={`${val}% product`}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                e.preventDefault()
                split.stop()
                split.set(Math.max(0, Math.min(100, split.get() + (e.key === "ArrowLeft" ? -5 : 5))))
              }
            }}
            className="pointer-events-auto absolute top-1/2 left-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-accent-line bg-raised text-accent-fg shadow-md outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <ChevronsLeftRightIcon className="size-4" />
          </div>
        </motion.div>

        {/* Side labels */}
        <motion.span
          className="pointer-events-none absolute bottom-3 z-10 hidden -translate-x-[calc(100%+12px)] rounded-full border border-border bg-raised/90 px-2.5 py-1 text-[11px] font-medium text-fg shadow-sm backdrop-blur sm:inline-flex"
          style={{ left, opacity: productLabelOpacity }}
        >
          Product
        </motion.span>
        <motion.span
          className="pointer-events-none absolute bottom-3 z-10 hidden translate-x-3 items-center gap-1.5 rounded-full border border-accent-line bg-raised/90 px-2.5 py-1 font-mono text-[11px] text-accent-fg shadow-sm backdrop-blur sm:inline-flex"
          style={{ left, opacity: specLabelOpacity }}
        >
          Hairline spec
        </motion.span>
      </div>
    </div>
  )
}
