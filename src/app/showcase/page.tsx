"use client"
import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { LumenApp } from "@/components/showcase/lumen-app"
import { SITE } from "@/lib/site"
import { Button } from "@/registry/ui/button"

const USED = [
  ["Button", "button"], ["Input", "input"], ["Tabs", "tabs"], ["Switch", "switch"], ["Checkbox", "checkbox"], ["Status badge", "status-badge"],
  ["Area chart", "area-chart"], ["Line chart", "line-chart"], ["Chat thread", "chat-thread"], ["Prompt input", "prompt-input"],
  ["Tool call card", "tool-call-card"], ["Reasoning block", "reasoning-block"], ["Textarea", "textarea"], ["Label", "label"],
]

export default function ShowcasePage() {
  return (
    <div className="min-h-full overflow-x-clip bg-bg text-fg">
      <SiteHeader solid />
      <main>
        <section className="relative isolate overflow-hidden">
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid [--grid-size:48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_20%,transparent_75%)]" />
          <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">Showcase</p>
              <h1 className="mt-3 text-[2.5rem] leading-[1.02] font-medium tracking-[-0.042em] text-fg sm:text-6xl sm:leading-[0.98]">
                A whole product.
                <br />
                <span className="text-fg-subtle">Zero custom components.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.65] text-fg-muted">
                Lumen is a fictional finance app built entirely from MiniDev UI. Click through the sidebar: every screen, chart, table and
                control below is a component you can copy today.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
            <LumenApp />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="text-3xl font-medium tracking-[-0.035em] text-fg">What it is made of</h2>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-fg-muted">Each piece links to its docs, with the source, a live preview and a one-line install.</p>
              <Button className="mt-6" variant="outline" render={<Link href="/gallery" />}>Browse all components <ArrowRightIcon /></Button>
            </div>
            <ul className="flex flex-wrap content-start gap-2">
              {USED.map(([label, name]) => (
                <li key={name}>
                  <Link href={`/docs/${name}`} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-[0.8125rem] font-medium text-fg shadow-key outline-none transition-[border-color] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
                    {label}
                    <ArrowUpRightIcon className="size-3.5 text-fg-subtle" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center lg:px-8">
            <div className="max-w-xl">
              <p className="text-2xl font-medium tracking-[-0.025em] text-fg">Want Lumen, but it is your product?</p>
              <p className="mt-2 text-[0.9375rem] leading-[1.65] text-fg-muted">{SITE.studio.name} designs and builds MVPs in 30 days on this exact kit. The first prototype is free.</p>
            </div>
            <Button size="lg" render={<a href={SITE.studio.url} target="_blank" rel="noreferrer" />}>Talk to the studio <ArrowUpRightIcon /></Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
