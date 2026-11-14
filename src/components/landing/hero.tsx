"use client"
import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon, BotIcon, CheckIcon, CopyIcon, MousePointer2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site"
import { COMPONENT_COUNTS } from "@/lib/component-lite"
import { Button } from "@/registry/ui/button"
import { LazySection } from "@/components/landing/lazy-section"
import { MaterialSwitcher } from "@/registry/ui/light-provider"
import { LightField } from "@/registry/premium/light-field"

export const COUNTS = COMPONENT_COUNTS

const AGENT_READY = ["One-command install", "MCP server", "llms.txt", "Markdown docs per component", "Every value is a token"]

export function InstallPill({ className }: { className?: string }) {
  const cmd = `npx shadcn add ${SITE.registry}/button`
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(cmd) } catch {}
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      aria-label={copied ? "Copied install command" : `Copy install command: ${cmd}`}
      className={cn(
        "group/pill inline-flex h-11 items-center gap-3 rounded-[0.625rem] border border-border bg-surface pr-2 pl-4 font-mono text-[13px] text-fg shadow-key outline-none",
        "transition-[border-color,background-color] duration-[140ms] ease-hairline hover:border-border-strong",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
    >
      <span className="text-fg-subtle select-none">$</span>
      <span>{cmd}</span>
      <span className={cn("grid size-7 place-items-center rounded-md transition-colors", copied ? "bg-success/12 text-success" : "text-fg-subtle group-hover/pill:bg-sunken group-hover/pill:text-fg")}>
        {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      </span>
    </button>
  )
}

/* Parallax toward the light: nearer things (higher depth) move more. */
const depth = (d: number): React.CSSProperties => ({
  transform: `translate3d(calc(var(--sx) * ${-d * 3}px), calc(var(--sy) * ${-d * 3}px), 0)`,
})

/* The switcher stays live from the start; the product cards below it go live on first input (hero-stage.tsx). */
function Stage() {
  return (
    <div className="relative mx-auto mt-12 max-w-6xl sm:mt-14">
      <div className="mb-8 flex flex-col items-center gap-3">
        <MaterialSwitcher size="lg" className="hidden sm:inline-flex" />
        <MaterialSwitcher className="sm:hidden" />
        <p className="flex items-center gap-2 text-[12.5px] text-fg-subtle">
          <MousePointer2Icon className="size-3.5" />
          <span className="hidden sm:inline">Move your cursor, it is the light. Then switch the material.</span>
          <span className="sm:hidden">The light drifts on its own. Switch the material.</span>
        </p>
      </div>
      {/* Colour behind the glass, so there is something to refract. */}
      <div aria-hidden className="only-glass pointer-events-none absolute inset-x-0 top-24 bottom-0 -z-10">
        <div style={depth(-6)} className="absolute top-[8%] left-[6%] size-[340px] rounded-full bg-accent opacity-55 blur-[90px]" />
        <div style={depth(-4)} className="absolute top-[30%] left-[42%] size-[300px] rounded-full bg-info opacity-45 blur-[90px]" />
        <div style={depth(-7)} className="absolute top-[4%] right-[4%] size-[320px] rounded-full bg-accent-2 opacity-50 blur-[90px]" />
      </div>
      <LazySection id="stage" on="input" />
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-8">
      {/* The light, visible on the page itself */}
      <div aria-hidden className="absolute inset-0 -z-10 [mask-image:linear-gradient(black_62%,transparent)]">
        {/* A still CSS version of the light shows at once; the WebGL field fades in over it when the browser is idle. */}
        <div className="hero-silk absolute inset-0" />
        <LightField className="absolute inset-0" fps={24} resolution={0.4} />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-50 [--grid-size:56px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black_20%,transparent_75%)]" />

      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="hero-rise">
            <Link
              href="/docs/ai"
              className="group inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface py-1 pr-3 pl-1 text-[12.5px] text-fg-muted shadow-xs outline-none transition-colors hover:border-border-strong hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-on-accent">
                <BotIcon aria-hidden className="size-3" /> New
              </span>
              <span className="truncate sm:hidden">MCP server for your coding agent</span>
              <span className="hidden sm:inline">An MCP server for Claude Code, Cursor and Codex</span>
              <ArrowRightIcon aria-hidden className="size-3.5 shrink-0 transition-transform duration-200 ease-hairline group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* The headline only slides (no fade), so it is the first thing painted: it is the page's LCP. */}
          <h1
            style={{ animationDelay: "0.08s" }}
            className="hero-lift mt-7 text-[2.6rem] leading-[1.02] font-medium tracking-[-0.045em] text-balance sm:text-6xl sm:leading-[0.98] lg:text-[5rem] lg:leading-[0.95] lg:tracking-[-0.055em]"
          >
            <span className="text-fg-subtle">Every UI kit is flat.</span>
            <br />
            <span className="text-lit">This one is lit.</span>
          </h1>

          <p style={{ animationDelay: "0.16s" }} className="hero-lift mt-6 max-w-2xl text-[1.0625rem] leading-[1.6] text-pretty text-fg-muted sm:text-lg">
            {COUNTS.total} free React components, blocks and templates for Tailwind&nbsp;CSS&nbsp;v4, built on Base&nbsp;UI. Your coding agent installs
            them in one command and gets them right the first time. One light crosses the page and every component catches it. MIT,
            shadcn-compatible.
          </p>

          <div style={{ animationDelay: "0.24s" }} className="hero-rise mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button size="lg" render={<Link href="/gallery" />}>
              Browse components
              <ArrowRightIcon />
            </Button>
            <InstallPill />
          </div>

          <ul
            aria-label="Built for AI agents"
            style={{ animationDelay: "0.32s" }}
            className="hero-rise mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[12.5px] text-fg-muted"
          >
            {AGENT_READY.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <CheckIcon aria-hidden className="size-3.5 text-accent-fg" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <Stage />
      </div>
    </section>
  )
}
