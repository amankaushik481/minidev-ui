"use client"
import * as React from "react"
import { Toc } from "@/registry/ui/toc"
import type { Example } from "./types"

const SECTIONS = [
  { id: "toc-ex-overview", title: "Overview" },
  { id: "toc-ex-limits", title: "Rate limits" },
  { id: "toc-ex-errors", title: "Errors" },
  { id: "toc-ex-retries", title: "Retries", level: 2 as const },
]

function ScrollSpyToc() {
  const scroller = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(SECTIONS[0].id)
  React.useEffect(() => {
    const root = scroller.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit) setActive(hit.target.id)
      },
      { root, rootMargin: "0px 0px -70% 0px" }
    )
    root.querySelectorAll("h3").forEach((h) => io.observe(h))
    return () => io.disconnect()
  }, [])
  return (
    <div className="flex w-full max-w-xl gap-4">
      <div ref={scroller} className="h-56 flex-1 overflow-y-auto rounded-xl border border-border bg-surface px-4">
        {SECTIONS.map((s) => (
          <section key={s.id} className="py-4">
            <h3 id={s.id} className="text-sm font-medium text-fg">{s.title}</h3>
            <p className="mt-2 h-28 text-sm text-fg-muted">Notes on {s.title.toLowerCase()} for the Lumen API.</p>
          </section>
        ))}
      </div>
      <Toc items={SECTIONS} activeId={active} className="w-40" />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Follows the reader with activeId",
    description: "An IntersectionObserver reports the heading near the top of the scroll area, and Toc highlights it.",
    code: `const SECTIONS = [
  { id: "toc-ex-overview", title: "Overview" },
  { id: "toc-ex-limits", title: "Rate limits" },
  { id: "toc-ex-errors", title: "Errors" },
  { id: "toc-ex-retries", title: "Retries", level: 2 as const },
]

function ScrollSpyToc() {
  const scroller = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(SECTIONS[0].id)
  React.useEffect(() => {
    const root = scroller.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit) setActive(hit.target.id)
      },
      { root, rootMargin: "0px 0px -70% 0px" }
    )
    root.querySelectorAll("h3").forEach((h) => io.observe(h))
    return () => io.disconnect()
  }, [])
  return (
    <div className="flex w-full max-w-xl gap-4">
      <div ref={scroller} className="h-56 flex-1 overflow-y-auto rounded-xl border border-border bg-surface px-4">
        {SECTIONS.map((s) => (
          <section key={s.id} className="py-4">
            <h3 id={s.id} className="text-sm font-medium text-fg">{s.title}</h3>
            <p className="mt-2 h-28 text-sm text-fg-muted">Notes on {s.title.toLowerCase()} for the Lumen API.</p>
          </section>
        ))}
      </div>
      <Toc items={SECTIONS} activeId={active} className="w-40" />
    </div>
  )
}`,
    node: <ScrollSpyToc />,
  },
  {
    title: "Changelog index",
    description: "Without activeId the last clicked entry stays marked; levels indent sub-entries.",
    code: `<Toc
  items={[
    { id: "v2-4", title: "2.4: Payment links" },
    { id: "v2-4-api", title: "API changes", level: 2 },
    { id: "v2-3", title: "2.3: Usage billing" },
    { id: "v2-2", title: "2.2: Tax rates" },
  ]}
/>`,
    node: (
      <Toc
        items={[
          { id: "v2-4", title: "2.4: Payment links" },
          { id: "v2-4-api", title: "API changes", level: 2 },
          { id: "v2-3", title: "2.3: Usage billing" },
          { id: "v2-2", title: "2.2: Tax rates" },
        ]}
      />
    ),
  },
]
