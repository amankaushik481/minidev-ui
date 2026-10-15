"use client"
import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { REGISTRY_LOADERS } from "@/lib/registry-loaders"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { componentCopy, humanTitle } from "@/lib/seo-routes"
import { cn } from "@/lib/utils"

class Boundary extends React.Component<{ fallback: React.ReactNode; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {}
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

const STAGE_W = 1280
const MIN_H = 420
const MAX_H = 760

/**
 * A real, scaled-down render of a registry block, loaded when it scrolls into view, with a link to its docs page.
 * Used by the block hubs so the SEO pages show the actual component instead of a drawing of it.
 */
export function LiveBlock({ name, priority = false }: { name: string; priority?: boolean }) {
  const entry = COMPONENT_INDEX.find((c) => c.name === name)
  const ref = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(0.3)
  const [near, setNear] = React.useState(priority)
  const [mod, setMod] = React.useState<Record<string, unknown> | null>(null)
  const inner = React.useRef<HTMLDivElement>(null)
  const [stageH, setStageH] = React.useState(MIN_H)

  // Fit the stage to the block's natural height, within sane bounds, so short sections do not float in empty space.
  React.useEffect(() => {
    const el = inner.current
    if (!el || !mod) return
    const ro = new ResizeObserver(([e]) => setStageH(Math.max(MIN_H, Math.min(MAX_H, Math.round(e.contentRect.height)))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [mod])

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / STAGE_W))
    ro.observe(el)
    if (!near) {
      const io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && setNear(true), { rootMargin: "400px 0px" })
      io.observe(el)
      return () => {
        ro.disconnect()
        io.disconnect()
      }
    }
    return () => ro.disconnect()
  }, [near])

  React.useEffect(() => {
    if (!near || mod) return
    let live = true
    REGISTRY_LOADERS[name]?.().then((m) => live && setMod(m)).catch(() => live && setMod({}))
    return () => {
      live = false
    }
  }, [near, name, mod])

  if (!entry) return null
  const Comp = mod?.[entry.title] as React.ComponentType | undefined
  const copy = componentCopy(entry)
  const title = humanTitle(entry.title)
  const fallback = <div className="grid h-full place-items-center text-[14px] text-fg-subtle">Open the page to see it live</div>

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-raised">
      <div ref={ref} className="relative w-full overflow-hidden border-b border-border bg-bg" style={{ aspectRatio: `${STAGE_W} / ${stageH}` }}>
        <div inert aria-hidden className={cn("pointer-events-none absolute top-0 left-0 origin-top-left select-none", !mod && "animate-pulse")} style={{ width: STAGE_W, height: stageH, transform: `scale(${scale})` }}>
          {Comp ? (
            <Boundary fallback={fallback}>
              <div ref={inner} className="w-full bg-bg text-fg" style={{ minHeight: MIN_H }}>
                <Comp />
              </div>
            </Boundary>
          ) : mod ? (
            fallback
          ) : null}
        </div>
        <Link href={`/docs/${entry.name}`} aria-label={`Open ${title}`} className="absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-accent ring-inset" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[1.0625rem] font-medium tracking-[-0.02em] text-fg">
            <Link href={`/docs/${entry.name}`} className="outline-none after:absolute focus-visible:underline">{title}</Link>
          </h3>
          <span className="shrink-0 rounded-md border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle uppercase">{entry.kind === "premium" ? "motion" : entry.kind}</span>
        </div>
        <p className="mt-1.5 line-clamp-3 text-[0.875rem] leading-[1.6] text-fg-muted">{copy.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <code className="truncate font-mono text-[11px] text-fg-subtle">npx shadcn@latest add @minidev/{entry.name}</code>
          <Link href={`/docs/${entry.name}`} className="inline-flex shrink-0 items-center gap-1 text-[0.8125rem] font-medium text-fg">
            Code <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
