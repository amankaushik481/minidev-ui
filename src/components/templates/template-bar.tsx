"use client"
import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { MaterialSwitcher } from "@/registry/ui/light-provider"
import { useTheme } from "@/components/theme-toggle"
import { MoonIcon, SunIcon, SwatchBookIcon } from "lucide-react"

/*
 * The MiniDev bar that floats over every template preview: back to the
 * index, material + theme switches, and the one ask that matters.
 */
export function TemplateBar({ name, kind }: { name: string; kind: string }) {
  const reduce = useReducedMotion()
  const { dark, toggle } = useTheme()
  return (
    <motion.div
      data-material="hairline"
      data-blueprint-ignore
      initial={reduce ? false : { y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", bounce: 0.16, duration: 0.6, delay: 1.2 }}
      className="fixed inset-x-0 bottom-4 z-[70] flex justify-center px-3"
    >
      <div className="flex max-w-full items-center gap-1.5 overflow-x-auto rounded-2xl border border-border bg-raised p-1.5 text-[13px] shadow-overlay">
        <Link href="/templates" className="flex h-9 shrink-0 items-center gap-2 rounded-xl px-3 text-fg-muted outline-none hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent" aria-label="All templates">
          <ArrowLeftIcon className="size-4" />
          <span className="hidden sm:inline">
            <span className="font-medium text-fg">{name}</span> <span className="text-fg-subtle">· {kind}</span>
          </span>
        </Link>
        <span className="h-5 w-px shrink-0 bg-border" />
        <MaterialSwitcher size="sm" labels={false} className="shrink-0" />
        <button type="button" onClick={toggle} aria-label={dark ? "Light mode" : "Dark mode"} className="grid size-9 shrink-0 place-items-center rounded-xl text-fg-muted outline-none hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent">
          {dark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
        </button>
        <Link href={`/brand/${name.toLowerCase().replace(/[^a-z]/g, "")}`} className="flex h-9 shrink-0 items-center gap-2 rounded-xl px-3 text-fg-muted outline-none hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent">
          <SwatchBookIcon className="size-4" />
          <span className="hidden md:inline">Brand kit</span>
        </Link>
        <Link href="/studio" className="flex h-9 shrink-0 items-center gap-2 rounded-xl bg-ink px-3.5 font-medium text-on-ink shadow-ink outline-none hover:bg-ink-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-raised">
          Build my version
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </motion.div>
  )
}

export function TemplateFooter({ brand, note }: { brand: React.ReactNode; note: string }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pt-12 pb-28 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
        <div className="max-w-xs">
          {brand}
          <p className="mt-3 text-[13px] leading-[1.6] text-fg-muted">{note}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-[13px] sm:grid-cols-3">
          {["Product", "Pricing", "Security", "Changelog", "Careers", "Contact"].map((l) => (
            <a key={l} href="#" className="text-fg-muted hover:text-fg">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/** Wraps a template: applies its brand class and default material, restores the site's on leave. */
export function TemplateShell({ name, kind, material, className, children }: { name: string; kind: string; material: "hairline" | "glass" | "metal" | "paper"; className?: string; children: React.ReactNode }) {
  React.useEffect(() => {
    const el = document.documentElement
    const prev = el.getAttribute("data-material")
    const forced = new URLSearchParams(location.search).get("material")
    el.setAttribute("data-material", forced || material)
    return () => {
      if (prev) el.setAttribute("data-material", prev)
    }
  }, [material])
  return (
    <div className={`${className ?? ""} min-h-full bg-bg text-fg`}>
      {children}
      <TemplateBar name={name} kind={kind} />
    </div>
  )
}
