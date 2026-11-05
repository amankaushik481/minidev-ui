"use client"
import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon, CheckIcon, CopyIcon } from "lucide-react"
import { EXAMPLE_LOADERS } from "@/lib/example-loaders"
import type { Example } from "@/registry/examples/types"
import { cn } from "@/lib/utils"

class Boundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {}
  render() {
    return this.state.failed ? <p className="text-[13px] text-fg-subtle">This example could not render here. Open the docs to try it.</p> : this.props.children
  }
}

/**
 * A live example inside a guide: the component's own docs example, rendered for
 * real so the reader can click it. Its code loads only when it nears the
 * viewport, so a long guide stays light.
 */
export function GuideExample({ name, index = 0, caption, label }: { name: string; index?: number; caption?: string; label: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [ex, setEx] = React.useState<Example | null | undefined>(undefined)
  const [copied, setCopied] = React.useState(false)
  const cmd = `npx shadcn@latest add @minidev/${name}`

  React.useEffect(() => {
    const el = ref.current
    const load = EXAMPLE_LOADERS[name]
    if (!el || !load) return setEx(null)
    let alive = true
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        load()
          .then((m) => alive && setEx(m.examples[index] ?? m.examples[0] ?? null))
          .catch(() => alive && setEx(null))
      },
      { rootMargin: "600px 0px" }
    )
    io.observe(el)
    return () => {
      alive = false
      io.disconnect()
    }
  }, [name, index])

  return (
    <figure ref={ref} className="not-prose overflow-hidden rounded-2xl border border-border shadow-raised">
      <div className="relative min-h-[220px] bg-bg text-fg">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots [--grid-size:14px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]" />
        <div className="relative flex min-h-[220px] w-full min-w-0 flex-wrap items-center justify-center gap-4 overflow-x-auto p-6 sm:p-8">
          {ex === undefined ? (
            <span className="text-[13px] text-fg-subtle">Loading the live {label}…</span>
          ) : ex === null ? (
            <Link href={`/docs/${name}`} className="text-[13px] text-fg-muted underline underline-offset-4">
              See the live {label} on its docs page
            </Link>
          ) : (
            <Boundary>{ex.node}</Boundary>
          )}
        </div>
      </div>
      <figcaption className="flex flex-col gap-3 border-t border-border bg-surface px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="min-w-0">
          <span className="block text-[0.875rem] font-medium text-fg">{label}</span>
          {caption ? <span className="mt-0.5 block text-[0.8125rem] leading-[1.55] text-fg-muted">{caption}</span> : null}
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(cmd)
              } catch {}
              setCopied(true)
              setTimeout(() => setCopied(false), 1400)
            }}
            aria-label={`Copy install command: ${cmd}`}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-bg px-2.5 font-mono text-[11.5px] text-fg-muted outline-none transition-colors hover:text-fg focus-visible:ring-2 focus-visible:ring-accent",
              copied && "text-success"
            )}
          >
            {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
            {copied ? "Copied" : `@minidev/${name}`}
          </button>
          <Link
            href={`/docs/${name}`}
            className="inline-flex h-8 items-center gap-1 rounded-lg px-2 text-[12.5px] font-medium text-fg outline-none hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent"
          >
            Docs <ArrowRightIcon className="size-3.5" />
          </Link>
        </span>
      </figcaption>
    </figure>
  )
}
