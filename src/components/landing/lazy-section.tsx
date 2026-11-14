"use client"
import * as React from "react"

/*
 * Below-the-fold landing sections, made live on approach.
 *
 * The server renders every section in full, so the HTML that search engines,
 * AI crawlers and the first paint see is complete. In the browser a section's
 * code is not even downloaded until the section comes within a screen of the
 * viewport. Until then React leaves the server HTML exactly as it is (it never
 * re-applies a stable dangerouslySetInnerHTML), and the live component takes
 * its place once its chunk has loaded. After a client-side navigation there is
 * no server HTML, so a placeholder of the measured height holds the space.
 *
 * on="view" (default) goes live within a screen of the viewport and skips its
 * rendering work while off screen (content-visibility). on="input" is for the
 * first screen: it goes live on the visitor's first input, or 8 s after load,
 * so a page nobody has touched yet stays idle.
 */

type Mod = { default: React.ComponentType }

const LOADERS = {
  stage: () => import("@/components/landing/hero-stage").then((m): Mod => ({ default: m.StageCards })),
  agents: () => import("@/components/landing/agents").then((m): Mod => ({ default: m.AgentSection })),
  templates: () => import("@/components/landing/templates-strip").then((m): Mod => ({ default: m.TemplatesStrip })),
  materials: () => import("@/components/landing/materials").then((m): Mod => ({ default: m.Materials })),
  exploded: () => import("@/components/landing/exploded").then((m): Mod => ({ default: m.Exploded })),
  proof: () => import("@/components/landing/sections").then((m): Mod => ({ default: m.ProofStrip })),
  physics: () => import("@/components/landing/physics").then((m): Mod => ({ default: m.Physics })),
  bento: () => import("@/components/landing/bento").then((m): Mod => ({ default: m.Bento })),
  blueprint: () => import("@/components/landing/physics").then((m): Mod => ({ default: m.BlueprintCallout })),
  craft: () => import("@/components/landing/craft").then((m): Mod => ({ default: m.Craft })),
  install: () => import("@/components/landing/sections").then((m): Mod => ({ default: m.InstallSection })),
  categories: () => import("@/components/landing/sections").then((m): Mod => ({ default: m.CategoryIndex })),
  cta: () => import("@/components/landing/sections").then((m): Mod => ({ default: m.FinalCta })),
}

export type LazySectionId = keyof typeof LOADERS

/* Server render only: React waits for the import and renders the section inline. */
const SERVER = Object.fromEntries(Object.entries(LOADERS).map(([id, load]) => [id, React.lazy(load)])) as unknown as Record<
  LazySectionId,
  React.ComponentType
>

/* One object for every render, so React sees no change and never rewrites the server HTML. */
const KEEP = { __html: "" }
const subscribe = () => () => {}

const INPUTS = ["pointermove", "pointerdown", "keydown", "scroll", "touchstart"] as const

export function LazySection({ id, sm = 0, lg = 0, on = "view" }: { id: LazySectionId; sm?: number; lg?: number; on?: "view" | "input" }) {
  const ref = React.useRef<HTMLDivElement>(null)
  // true on the server and while hydrating server HTML, false in a client-only render
  const hydrating = React.useSyncExternalStore(subscribe, () => false, () => true)
  const [fromServer] = React.useState(hydrating)
  const [Live, setLive] = React.useState<React.ComponentType | null>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el || Live) return
    let alive = true
    const go = () => {
      LOADERS[id]()
        .then((m) => {
          if (alive) setLive(() => m.default)
        })
        .catch(() => {}) // keep the server HTML if the chunk cannot load
    }
    if (on === "input" && !fromServer) {
      // client-side navigation: nothing on screen to keep, and the visitor is clearly here
      go()
      return () => {
        alive = false
      }
    }
    if (on === "input") {
      let timer = 0
      const start = () => {
        stop()
        go()
      }
      const stop = () => {
        clearTimeout(timer)
        INPUTS.forEach((e) => window.removeEventListener(e, start))
      }
      const later = () => {
        timer = window.setTimeout(start, 8000)
      }
      INPUTS.forEach((e) => window.addEventListener(e, start, { passive: true, once: true }))
      if (document.readyState === "complete") later()
      else window.addEventListener("load", later, { once: true })
      return () => {
        alive = false
        stop()
        window.removeEventListener("load", later)
      }
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        go()
      },
      { rootMargin: "800px 0px" }
    )
    io.observe(el)
    return () => {
      alive = false
      io.disconnect()
    }
  }, [id, on, fromServer, Live])

  const cv = on === "view"
  const className = cv ? "cv-section" : undefined
  const style = cv ? ({ "--cv-sm": `${sm}px`, "--cv-lg": `${lg}px` } as React.CSSProperties) : undefined
  if (typeof window === "undefined") {
    const Section = SERVER[id]
    return (
      <div ref={ref} data-lazy={id} className={className} style={style}>
        <Section />
      </div>
    )
  }
  if (Live) {
    return (
      <div ref={ref} data-lazy={id} data-live="" className={className} style={style}>
        <Live />
      </div>
    )
  }
  if (fromServer) {
    return <div ref={ref} data-lazy={id} className={className} style={style} dangerouslySetInnerHTML={KEEP} suppressHydrationWarning />
  }
  return <div ref={ref} data-lazy={id} className={cv ? "cv-section cv-hold" : undefined} style={style} />
}
