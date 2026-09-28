"use client"
import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRightIcon, CheckIcon, CopyIcon, RulerIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { Button } from "@/registry/ui/button"
import { Kbd } from "@/registry/ui/kbd"
import { useBlueprint } from "@/components/blueprint/blueprint"

export const COUNTS = {
  total: COMPONENT_INDEX.length,
  ui: COMPONENT_INDEX.filter((c) => c.kind === "ui").length,
  blocks: COMPONENT_INDEX.filter((c) => c.kind === "block").length,
  motion: COMPONENT_INDEX.filter((c) => c.kind === "premium").length,
}

export function InstallPill({ className }: { className?: string }) {
  const cmd = `npm i ${SITE.npmPackage}`
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

const rise = (reduce: boolean | null, delay: number) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12, filter: "blur(4px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: 0.7, delay, ease: [0.2, 0, 0, 1] as const },
      }

export function Hero() {
  const reduce = useReducedMotion()
  const { toggle } = useBlueprint()
  return (
    <section className="relative isolate overflow-hidden">
      {/* Hairline field */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid [--grid-size:56px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black_20%,transparent_75%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_50%_60%_at_50%_-10%,color-mix(in_oklch,var(--accent)_14%,transparent),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.div {...rise(reduce, 0)}>
            <button
              type="button"
              onClick={toggle}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 py-1 pr-3 pl-1 text-[12.5px] text-fg-muted shadow-xs backdrop-blur outline-none transition-colors hover:border-border-strong hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-on-accent">
                <RulerIcon className="size-3" /> New
              </span>
              <span className="sm:hidden">Blueprint mode. Tap to try</span>
              <span className="hidden sm:inline-flex sm:items-center sm:gap-1">
                Blueprint mode: hold <Kbd className="h-4.5 min-w-4.5 text-[10px]">⌥</Kbd> anywhere, or click here
              </span>
              <ArrowRightIcon className="size-3.5 transition-transform duration-200 ease-hairline group-hover:translate-x-0.5" />
            </button>
          </motion.div>

          <motion.h1
            {...rise(reduce, 0.08)}
            className="mt-7 text-[2.75rem] leading-[1.02] font-medium tracking-[-0.045em] text-fg sm:text-6xl sm:leading-[0.98] lg:text-[5.25rem] lg:leading-[0.95] lg:tracking-[-0.052em]"
          >
            Every pixel,
            <br />
            <span className="text-gradient-accent">accounted for.</span>
          </motion.h1>

          <motion.p {...rise(reduce, 0.16)} className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.6] text-fg-muted sm:text-lg">
            {COUNTS.total}+ free React&nbsp;+&nbsp;Tailwind components for real product screens. Drawn to a hairline spec, moved by
            real springs, and honest enough to show their measurements. Scroll down and we will take one apart.
          </motion.p>

          <motion.div {...rise(reduce, 0.24)} className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button size="lg" render={<Link href="/gallery" />}>
              Browse components
              <ArrowRightIcon />
            </Button>
            <InstallPill />
          </motion.div>

          <motion.ul {...rise(reduce, 0.3)} className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-fg-subtle">
            {["Free and MIT, forever", "Light + dark from one token set", "Base UI accessibility", "shadcn-compatible"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <CheckIcon className="size-3.5 text-accent" /> {t}
              </li>
            ))}
          </motion.ul>
        </div>

      </div>
    </section>
  )
}
