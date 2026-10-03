"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { CircleIcon, DownloadIcon, RotateCwIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { Slider } from "@/registry/ui/slider"

const SNAPPY = { type: "spring", bounce: 0.18, duration: 0.42 } as const
const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const
const RELEASE = { type: "spring", stiffness: 400, damping: 40 } as const
const ELASTIC = 0.12

type CropRect = {
  /** Left edge in source pixels, measured on the image after `rotation`. */
  x: number
  y: number
  width: number
  height: number
  /** Clockwise rotation in degrees: 0, 90, 180 or 270. */
  rotation: number
}

type CropOptions = {
  rotation?: number
  /** Clip to an ellipse (a circle for square crops). Use a PNG or WebP type to keep the corners transparent. */
  circle?: boolean
  /** Output width in pixels. Height follows the crop's aspect. Defaults to the crop's own width. */
  width?: number
  type?: string
  quality?: number
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    if (!src.startsWith("data:") && !src.startsWith("blob:")) img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Could not load the image"))
    img.src = src
  })
}

/**
 * Renders a crop rectangle (as returned by ImageCropper's onCrop) to a Blob
 * with a canvas. Remote images need CORS headers or the canvas is tainted.
 */
async function getCroppedBlob(src: string | HTMLImageElement, rect: CropRect, opts: CropOptions = {}): Promise<Blob> {
  const img = typeof src === "string" ? await loadImage(src) : src
  const rotation = (((opts.rotation ?? rect.rotation ?? 0) % 360) + 360) % 360
  const nw = img.naturalWidth
  const nh = img.naturalHeight
  const ew = rotation % 180 ? nh : nw
  const eh = rotation % 180 ? nw : nh
  const k = (opts.width ?? rect.width) / rect.width
  const canvas = document.createElement("canvas")
  canvas.width = Math.max(1, Math.round(rect.width * k))
  canvas.height = Math.max(1, Math.round(rect.height * k))
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas 2D is not available")
  ctx.imageSmoothingQuality = "high"
  if (opts.circle) {
    ctx.beginPath()
    ctx.ellipse(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2, 0, 0, Math.PI * 2)
    ctx.clip()
  }
  ctx.scale(k, k)
  ctx.translate(-rect.x, -rect.y)
  ctx.translate(ew / 2, eh / 2)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.drawImage(img, -nw / 2, -nh / 2, nw, nh)
  const type = opts.type ?? "image/png"
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Export failed"))), type, opts.quality ?? 0.92))
}

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(258 62% 22%)"/><stop offset="0.38" stop-color="hsl(282 52% 42%)"/><stop offset="0.68" stop-color="hsl(336 72% 64%)"/><stop offset="0.86" stop-color="hsl(28 92% 70%)"/></linearGradient>
<radialGradient id="sun" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="hsl(46 100% 90%)"/><stop offset="0.55" stop-color="hsl(36 100% 74%)"/><stop offset="1" stop-color="hsl(18 96% 66%)"/></radialGradient>
<radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="hsl(36 100% 80%)" stop-opacity="0.65"/><stop offset="1" stop-color="hsl(336 80% 70%)" stop-opacity="0"/></radialGradient>
<linearGradient id="lake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(330 52% 56%)"/><stop offset="0.5" stop-color="hsl(270 40% 34%)"/><stop offset="1" stop-color="hsl(244 44% 16%)"/></linearGradient>
</defs>
<rect width="1200" height="800" fill="url(#sky)"/>
<g fill="hsl(48 100% 96%)" opacity="0.8"><circle cx="110" cy="70" r="2"/><circle cx="260" cy="140" r="1.6"/><circle cx="420" cy="54" r="2.2"/><circle cx="590" cy="120" r="1.4"/><circle cx="930" cy="64" r="2"/><circle cx="1080" cy="150" r="1.8"/><circle cx="1010" cy="40" r="1.4"/><circle cx="330" cy="30" r="1.4"/><circle cx="760" cy="96" r="1.6"/></g>
<circle cx="770" cy="470" r="260" fill="url(#glow)"/>
<circle cx="770" cy="470" r="96" fill="url(#sun)"/>
<path d="M0 470 L120 360 L210 420 L330 290 L450 410 L540 350 L660 452 L760 380 L880 300 L990 400 L1090 340 L1200 410 L1200 560 L0 560Z" fill="hsl(286 38% 46%)" opacity="0.85"/>
<path d="M0 520 L90 450 L200 500 L300 420 L420 492 L520 440 L640 516 L740 470 L860 430 L960 498 L1070 452 L1200 506 L1200 560 L0 560Z" fill="hsl(266 40% 30%)"/>
<rect y="556" width="1200" height="244" fill="url(#lake)"/>
<g fill="hsl(40 100% 86%)" opacity="0.7"><rect x="700" y="574" width="140" height="4" rx="2"/><rect x="720" y="596" width="100" height="3" rx="1.5"/><rect x="736" y="616" width="68" height="3" rx="1.5"/><rect x="750" y="636" width="40" height="2" rx="1"/></g>
<path d="M0 556 L1200 556" stroke="hsl(30 100% 84%)" stroke-opacity="0.5" stroke-width="2"/>
<path d="M0 700 C160 664 300 676 430 700 C560 724 650 690 760 700 L760 800 L0 800Z" fill="hsl(232 46% 12%)"/>
<g fill="hsl(228 50% 9%)"><path d="M92 700 L118 600 L144 700Z"/><path d="M136 704 L170 560 L204 704Z"/><path d="M196 706 L222 620 L248 706Z"/><path d="M1010 720 L1046 590 L1082 720Z"/><path d="M1064 724 L1094 630 L1124 724Z"/></g>
<path d="M760 760 C900 730 1040 716 1200 724 L1200 800 L760 800Z" fill="hsl(232 46% 12%)"/>
</svg>`

const SAMPLE_SRC = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(SAMPLE_SVG)}`

type Aspect = "1:1" | "4:3" | "16:9" | "3:2" | "4:5" | "9:16"

const ratio = (a: string) => {
  const [w, h] = a.split(":").map(Number)
  return w > 0 && h > 0 ? w / h : 1
}
const even = (n: number) => Math.max(2, Math.round(n / 2) * 2)
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

type View = { fx: number; fy: number; zoom: number; rot: number }
type Mode = "instant" | "snappy" | "morph" | "release"

/**
 * Crop an image inside a frame: drag to pan, zoom with the slider, the wheel
 * or a pinch, switch between aspect presets, mask to a circle for avatars and
 * rotate in 90 degree steps. The image rubber-bands at the frame edges and
 * settles back on release. Keyboard: arrows pan (Shift for bigger steps),
 * + and - zoom, R rotates. onCrop returns the crop rectangle in source pixels,
 * and the exported getCroppedBlob(src, rect, opts) renders it with a canvas.
 */
type ImageCropperProps = {
  /** Image URL or data URI. Remote images need CORS headers for getCroppedBlob. */
  src?: string
  alt?: string
  /** Aspect presets offered, as "w:h". */
  aspects?: Aspect[]
  defaultAspect?: Aspect
  /** Start with the circular avatar mask on. */
  defaultCircle?: boolean
  /** Offer the circular mask toggle. */
  allowCircle?: boolean
  /** Largest zoom, as a multiple of the size that just covers the frame. */
  maxZoom?: number
  /** Show the live preview and crop details beside the frame. */
  showPreview?: boolean
  /** Called with the crop in source pixels once an interaction settles. */
  onCrop?: (rect: CropRect, info: { aspect: Aspect; circle: boolean }) => void
  /** File name used by the export button. */
  fileName?: string
  className?: string
}

function ImageCropper({
  src = SAMPLE_SRC,
  alt = "Lumen sample landscape",
  aspects = ["1:1", "4:3", "16:9"],
  defaultAspect = "4:3",
  defaultCircle = false,
  allowCircle = true,
  maxZoom = 4,
  showPreview = true,
  onCrop,
  fileName = "lumen-cover.png",
  className,
}: ImageCropperProps) {
  const reduce = useReducedMotion()
  const uid = React.useId()
  const stageRef = React.useRef<HTMLDivElement>(null)
  const [stageW, setStageW] = React.useState(0)
  const [natural, setNatural] = React.useState<{ w: number; h: number } | null>(null)
  const [aspect, setAspect] = React.useState<Aspect>(defaultAspect)
  const [circle, setCircle] = React.useState(defaultCircle)
  const [view, setViewState] = React.useState<View>({ fx: 0.5, fy: 0.5, zoom: 1, rot: 0 })
  const [mode, setMode] = React.useState<Mode>("snappy")
  const [active, setActive] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const viewRef = React.useRef(view)
  viewRef.current = view

  React.useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setStageW(Math.round(e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  React.useEffect(() => {
    let alive = true
    setNatural(null)
    setViewState({ fx: 0.5, fy: 0.5, zoom: 1, rot: 0 })
    loadImage(src)
      .then((img) => alive && setNatural({ w: img.naturalWidth || 1, h: img.naturalHeight || 1 }))
      .catch(() => alive && setNatural(null))
    return () => {
      alive = false
    }
  }, [src])

  const effAspect: Aspect = circle ? "1:1" : aspect
  const a = ratio(effAspect)
  const stageH = stageW ? even(clamp(stageW * 0.66, 240, 380)) : 0
  const pad = stageW < 360 ? 16 : 24
  const cw = stageW ? even(Math.min(stageW - pad * 2, (stageH - pad * 2) * a)) : 0
  const ch = stageW ? even(cw / a) : 0

  const turned = (((view.rot % 360) + 360) % 360) % 180 !== 0
  const ew = natural ? (turned ? natural.h : natural.w) : 1
  const eh = natural ? (turned ? natural.w : natural.h) : 1
  const base = cw && natural ? Math.max(cw / ew, ch / eh) : 1
  const geo = React.useRef({ ew, eh, base, cw, ch })
  geo.current = { ew, eh, base, cw, ch }

  // Keep the point under the frame centre inside the bounds that let the image cover the frame.
  const bound = React.useCallback((v: View, elastic = false): View => {
    const { ew, eh, base, cw, ch } = geo.current
    const s = base * v.zoom
    const hx = Math.min(0.5, cw / (2 * ew * s))
    const hy = Math.min(0.5, ch / (2 * eh * s))
    const fit = (f: number, h: number) => {
      const c = clamp(f, h, 1 - h)
      return elastic ? c + (f - c) * ELASTIC : c
    }
    return { ...v, fx: fit(v.fx, hx), fy: fit(v.fy, hy) }
  }, [])

  const setView = React.useCallback(
    (next: View, m: Mode, elastic = false) => {
      setMode(m)
      setViewState(bound(next, elastic))
    },
    [bound]
  )

  // Re-clamp when the frame or image geometry changes (aspect, mask, resize, rotation).
  React.useEffect(() => {
    setViewState((v) => bound(v))
  }, [cw, ch, ew, eh, bound])

  const zoomAt = React.useCallback(
    (zoom: number, px: number, py: number, m: Mode) => {
      const v = viewRef.current
      const { ew, eh, base } = geo.current
      const z = clamp(zoom, 1, maxZoom)
      const s0 = base * v.zoom
      const s1 = base * z
      const fx = v.fx + px / (ew * s0) - px / (ew * s1)
      const fy = v.fy + py / (eh * s0) - py / (eh * s1)
      setView({ ...v, zoom: z, fx, fy }, m)
    },
    [maxZoom, setView]
  )

  // Wheel zoom needs a non-passive listener to keep the page from scrolling.
  React.useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (!natural) return
      e.preventDefault()
      const r = el.getBoundingClientRect()
      const factor = Math.exp(-e.deltaY * (e.deltaMode === 1 ? 0.05 : 0.0018))
      zoomAt(viewRef.current.zoom * factor, e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2, "instant")
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [natural, zoomAt])

  const pointers = React.useRef(new Map<number, { x: number; y: number }>())
  const gesture = React.useRef<{ x: number; y: number; view: View; dist: number } | null>(null)

  const startGesture = () => {
    const pts = [...pointers.current.values()]
    if (!pts.length) {
      gesture.current = null
      return
    }
    const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length
    const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length
    const dist = pts.length > 1 ? Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) : 0
    gesture.current = { x: cx, y: cy, view: viewRef.current, dist }
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!natural || (e.pointerType === "mouse" && e.button !== 0)) return
    e.currentTarget.setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    startGesture()
    setActive(true)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId) || !gesture.current) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const g = gesture.current
    const pts = [...pointers.current.values()]
    const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length
    const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length
    const { ew, eh, base } = geo.current
    let zoom = g.view.zoom
    if (pts.length > 1 && g.dist > 0) {
      zoom = clamp(g.view.zoom * (Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) / g.dist), 1, maxZoom)
    }
    const r = e.currentTarget.getBoundingClientRect()
    const px = g.x - r.left - r.width / 2
    const py = g.y - r.top - r.height / 2
    const s0 = base * g.view.zoom
    const s1 = base * zoom
    // Keep the image point that was under the gesture centre under it, then follow the centre.
    const fx = g.view.fx + px / (ew * s0) - px / (ew * s1) - (cx - g.x) / (ew * s1)
    const fy = g.view.fy + py / (eh * s0) - py / (eh * s1) - (cy - g.y) / (eh * s1)
    setView({ ...g.view, zoom, fx, fy }, "instant", true)
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.delete(e.pointerId)) return
    if (pointers.current.size) {
      startGesture()
      return
    }
    gesture.current = null
    setActive(false)
    setView(viewRef.current, "release")
  }

  const rotate = () => {
    const v = viewRef.current
    // The point under the centre turns with the image.
    setMode("morph")
    setViewState({ ...v, rot: v.rot + 90, fx: 1 - v.fy, fy: v.fx })
  }

  const reset = () => setView({ fx: 0.5, fy: 0.5, zoom: 1, rot: 0 }, "morph")

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const v = viewRef.current
    const { ew, eh, base } = geo.current
    const s = base * v.zoom
    const step = e.shiftKey ? 48 : 12
    const pan = (dx: number, dy: number) => setView({ ...v, fx: v.fx - dx / (ew * s), fy: v.fy - dy / (eh * s) }, "snappy")
    switch (e.key) {
      case "ArrowLeft":
        pan(-step, 0)
        break
      case "ArrowRight":
        pan(step, 0)
        break
      case "ArrowUp":
        pan(0, -step)
        break
      case "ArrowDown":
        pan(0, step)
        break
      case "+":
      case "=":
        zoomAt(v.zoom + 0.2, 0, 0, "snappy")
        break
      case "-":
      case "_":
        zoomAt(v.zoom - 0.2, 0, 0, "snappy")
        break
      case "r":
      case "R":
        rotate()
        break
      case "0":
        reset()
        break
      default:
        return
    }
    e.preventDefault()
  }

  const s = base * view.zoom
  const ox = (0.5 - view.fx) * ew * s
  const oy = (0.5 - view.fy) * eh * s
  const rect: CropRect | null = natural && cw
    ? (() => {
        const w = Math.min(ew, Math.round(cw / s))
        const h = Math.min(eh, Math.round(ch / s))
        return {
          x: clamp(Math.round(view.fx * ew - w / 2), 0, ew - w),
          y: clamp(Math.round(view.fy * eh - h / 2), 0, eh - h),
          width: w,
          height: h,
          rotation: (((view.rot % 360) + 360) % 360),
        }
      })()
    : null

  const latest = React.useRef(onCrop)
  latest.current = onCrop
  const key = rect ? `${rect.x},${rect.y},${rect.width},${rect.height},${rect.rotation},${circle},${effAspect}` : ""
  const [settled, setSettled] = React.useState<CropRect | null>(null)
  React.useEffect(() => {
    if (!rect || active) return
    const t = window.setTimeout(() => {
      setSettled(rect)
      latest.current?.(rect, { aspect: effAspect, circle })
    }, 160)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, active])

  const tr =
    reduce || mode === "instant" ? { duration: 0 } : mode === "release" ? RELEASE : mode === "morph" ? MORPH : SNAPPY
  const frameTr = reduce ? { duration: 0 } : MORPH

  const previewW = 112
  const pw = a >= 1 ? previewW : even(previewW * a)
  const ph = even(pw / a)
  const k = cw ? pw / cw : 0

  const imgStyle = natural
    ? { width: natural.w, height: natural.h, marginLeft: -natural.w / 2, marginTop: -natural.h / 2 }
    : undefined

  const exportPng = async () => {
    if (!rect) return
    setBusy(true)
    try {
      const blob = await getCroppedBlob(src, rect, { circle, type: "image/png" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = fileName
      link.click()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    } finally {
      setBusy(false)
    }
  }

  const aspectOptions = aspects.map((x) => ({ value: x, label: x, disabled: circle && x !== "1:1" }))

  return (
    <div data-slot="image-cropper" className={cn("grid w-full max-w-3xl gap-4", showPreview && "md:grid-cols-[minmax(0,1fr)_10.5rem]", className)}>
      <div className="flex min-w-0 flex-col gap-3">
        <div
          ref={stageRef}
          tabIndex={0}
          role="group"
          aria-roledescription="image cropper"
          aria-label={`Crop ${alt}`}
          aria-describedby={`${uid}-help`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
          className={cn(
            "relative isolate touch-none overflow-hidden rounded-xl border border-border bg-sunken outline-none select-none",
            "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            natural ? (active ? "cursor-grabbing" : "cursor-grab") : "cursor-progress"
          )}
          style={{ height: stageH || 280 }}
        >
          {natural && cw ? (
            <>
              <motion.img
                src={src}
                alt=""
                draggable={false}
                initial={false}
                animate={{ x: ox, y: oy, scale: s, rotate: view.rot }}
                transition={tr}
                className="pointer-events-none absolute top-1/2 left-1/2 max-w-none origin-center"
                style={imgStyle}
              />
              <motion.div
                aria-hidden
                initial={false}
                animate={{ width: cw, height: ch, borderRadius: circle ? cw / 2 : 12 }}
                transition={frameTr}
                className="pointer-events-none absolute top-1/2 left-1/2 overflow-hidden border border-on-ink/80 dark:border-ink/80"
                style={{
                  x: "-50%",
                  y: "-50%",
                  boxShadow: "0 0 0 100vmax var(--overlay-scrim), 0 0 0 100vmax var(--overlay-scrim)",
                }}
              >
                <span
                  className={cn(
                    "absolute inset-0 transition-opacity duration-200 ease-hairline",
                    active ? "opacity-100" : "opacity-0"
                  )}
                >
                  <span className="absolute inset-y-0 left-1/3 w-px bg-on-ink/50 dark:bg-ink/50" />
                  <span className="absolute inset-y-0 left-2/3 w-px bg-on-ink/50 dark:bg-ink/50" />
                  <span className="absolute inset-x-0 top-1/3 h-px bg-on-ink/50 dark:bg-ink/50" />
                  <span className="absolute inset-x-0 top-2/3 h-px bg-on-ink/50 dark:bg-ink/50" />
                </span>
              </motion.div>
            </>
          ) : (
            <span className="absolute inset-0 grid place-items-center text-xs text-fg-subtle">Loading image</span>
          )}
        </div>
        <p id={`${uid}-help`} className="sr-only">
          Drag, or use the arrow keys, to move the image. Scroll, pinch, or press plus and minus to zoom. Press R to rotate and 0 to reset.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <SegmentedControl
            aria-label="Aspect ratio"
            size="sm"
            options={aspectOptions}
            value={effAspect}
            onChange={(v) => {
              setMode("morph")
              setAspect(v as Aspect)
            }}
          />
          {allowCircle ? (
            <Button
              type="button"
              size="sm"
              variant="outline"
              aria-pressed={circle}
              onClick={() => {
                setMode("morph")
                setCircle((c) => !c)
              }}
              className="aria-pressed:border-accent-line aria-pressed:bg-accent-soft aria-pressed:text-accent-fg aria-pressed:[&_svg]:text-accent-fg"
            >
              <CircleIcon className="size-3.5" />
              <span className="max-sm:sr-only">Circle</span>
            </Button>
          ) : null}
          <Button type="button" size="sm" variant="outline" onClick={rotate} aria-label="Rotate 90 degrees clockwise" disabled={!natural}>
            <RotateCwIcon className="size-3.5" />
            <span className="max-sm:sr-only">Rotate</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" size="icon-sm" variant="ghost" aria-label="Zoom out" disabled={!natural || view.zoom <= 1} onClick={() => zoomAt(view.zoom - 0.25, 0, 0, "snappy")}>
            <ZoomOutIcon className="size-4" />
          </Button>
          <Slider
            aria-label="Zoom"
            min={1}
            max={maxZoom}
            step={0.01}
            value={view.zoom}
            disabled={!natural}
            format={(n) => `${Math.round(n * 100)}%`}
            onValueChange={(n) => zoomAt(Array.isArray(n) ? n[0] : (n as number), 0, 0, "instant")}
            className="min-w-0 flex-1"
          />
          <Button type="button" size="icon-sm" variant="ghost" aria-label="Zoom in" disabled={!natural || view.zoom >= maxZoom} onClick={() => zoomAt(view.zoom + 0.25, 0, 0, "snappy")}>
            <ZoomInIcon className="size-4" />
          </Button>
          <span className="w-10 text-right font-mono text-xs text-fg-muted tabular-nums">{Math.round(view.zoom * 100)}%</span>
        </div>
      </div>

      {showPreview ? (
        <div className="flex min-w-0 flex-row items-start gap-4 md:flex-col md:gap-3">
          <div className="flex shrink-0 flex-col gap-2">
            <span className="text-xs font-medium text-fg-muted">Preview</span>
            <div className="grid size-[8.5rem] place-items-center rounded-xl border border-border bg-surface shadow-raised">
              <motion.div
                initial={false}
                animate={{ width: pw, height: ph, borderRadius: circle ? pw / 2 : 8 }}
                transition={frameTr}
                className="relative overflow-hidden bg-sunken"
              >
                {natural && cw ? (
                  <motion.img
                    src={src}
                    alt={`Cropped preview of ${alt}`}
                    draggable={false}
                    initial={false}
                    animate={{ x: ox * k, y: oy * k, scale: s * k, rotate: view.rot }}
                    transition={tr}
                    className="pointer-events-none absolute top-1/2 left-1/2 max-w-none origin-center"
                    style={imgStyle}
                  />
                ) : null}
              </motion.div>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-xs tabular-nums">
              <dt className="text-fg-subtle">Size</dt>
              <dd className="text-fg">{settled ? `${settled.width} × ${settled.height}` : "–"}</dd>
              <dt className="text-fg-subtle">Origin</dt>
              <dd className="text-fg">{settled ? `${settled.x}, ${settled.y}` : "–"}</dd>
              <dt className="text-fg-subtle">Turn</dt>
              <dd className="text-fg">{settled ? `${settled.rotation}°` : "–"}</dd>
            </dl>
            <Button type="button" size="sm" variant="outline" onClick={exportPng} disabled={!rect || busy} className="w-fit">
              <DownloadIcon className="size-3.5" /> {busy ? "Exporting" : "Export PNG"}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export { ImageCropper, getCroppedBlob }
export type { ImageCropperProps, CropRect, CropOptions }
