"use client"
import * as React from "react"
import Link from "next/link"
import { CATEGORIES } from "@/content/categories"
import { ArrowRightIcon, ArrowUpRightIcon, BotIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site"
import { Button } from "@/registry/ui/button"
import { CodeBlock } from "@/registry/ui/code-block"
import { SectionHead } from "@/components/landing/bento"
import { COUNTS, InstallPill } from "@/components/landing/hero"

/* ── Proof strip ─────────────────────────────────────────────────────────── */

export function ProofStrip() {
  const items = [
    { k: `${COUNTS.ui}`, v: "UI components" },
    { k: `${COUNTS.blocks}`, v: "full-page blocks" },
    { k: `${COUNTS.motion}`, v: "motion moments" },
    { k: "2", v: "themes, one token set" },
    { k: "AA", v: "contrast, both themes" },
    { k: "$0", v: "MIT, free forever" },
  ]
  return (
    <section aria-label="By the numbers" className="border-y border-border">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-6 xl:border-x xl:border-border">
        {items.map((i) => (
          <div key={i.v} className="flex flex-col-reverse gap-1 bg-bg px-5 py-7 sm:px-6">
            <dt className="text-[0.8125rem] text-fg-muted">{i.v}</dt>
            <dd className="text-3xl font-medium tracking-[-0.035em] tabular-nums text-fg sm:text-4xl">{i.k}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* ── Install ─────────────────────────────────────────────────────────────── */

const STEP_CODE = [
  { n: "01", t: "Install", d: "One package. React, Tailwind v4 and Base UI are the only peers.", code: `npm i ${SITE.npmPackage}`, lang: "bash" },
  {
    n: "02",
    t: "Import",
    d: "Every component is a single file you can also copy straight into your repo.",
    code: `import { Button } from "${SITE.npmPackage}/ui/button"
import { DataTable } from "${SITE.npmPackage}/ui/data-table"`,
    lang: "tsx",
  },
  {
    n: "03",
    t: "Ship",
    d: "Tokens live in CSS, so theming is a variable change, not a rebuild.",
    code: `export default function Billing() {
  return <Button size="lg">Upgrade to Team</Button>
}`,
    lang: "tsx",
  },
]

export function InstallSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            align="left"
            eyebrow="Copy. Paste. Own it."
            title="No lock-in. The code is yours."
            body="Install the package, or copy one file and change anything. There is no runtime, no theme provider, no wrapper to fight."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <InstallPill />
            <Button size="lg" variant="outline" render={<Link href="/docs" />}>
              Read the docs
            </Button>
          </div>
          <div className="mt-10 flex gap-4 rounded-2xl border border-border bg-surface p-5 shadow-raised">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-accent-line bg-accent-soft text-accent-fg">
              <BotIcon className="size-5" />
            </span>
            <div>
              <p className="text-[0.9375rem] font-medium text-fg">Your AI already knows it.</p>
              <p className="mt-1 text-[0.8125rem] leading-[1.6] text-fg-muted">
                Point Cursor, Claude or any agent at <a href="/llms.txt" className="font-mono text-[12px] text-accent-fg underline decoration-accent-line underline-offset-4 hover:decoration-accent">/llms.txt</a>.
                Every component and its import, in one file a model can read.
              </p>
            </div>
          </div>
        </div>

        <ol className="relative space-y-10">
          <span aria-hidden className="absolute top-2 bottom-2 left-[15px] w-px bg-[linear-gradient(to_bottom,var(--border),var(--border)_85%,transparent)]" />
          {STEP_CODE.map((s) => (
            <li key={s.n} className="relative grid grid-cols-[32px_1fr] gap-5">
              <span className="relative z-10 grid size-8 place-items-center rounded-full border border-border bg-surface font-mono text-[11px] text-fg-muted shadow-key">
                {s.n}
              </span>
              <div className="min-w-0">
                <p className="text-lg font-medium tracking-[-0.014em] text-fg">{s.t}</p>
                <p className="mt-1 text-[0.875rem] leading-[1.6] text-fg-muted">{s.d}</p>
                <CodeBlock className="mt-4" code={s.code} language={s.lang} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ── Category index ──────────────────────────────────────────────────────── */

export function CategoryIndex() {
  const blurb = (d: string) => {
    const tail = d.split(": ").slice(1).join(": ") || d
    const first = tail.split(/(?<=\.)\s/)[0].replace(/\.$/, "")
    return first.charAt(0).toUpperCase() + first.slice(1)
  }
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHead align="left" eyebrow="Index" title="Everything, one hairline apart." />
        <Button variant="outline" render={<Link href="/components" />}>
          Browse all {CATEGORIES.length} categories <ArrowRightIcon />
        </Button>
      </div>
      <ul className="grid gap-px border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c, i) => (
          <li key={c.id} className="bg-bg">
            <Link
              href={`/components/${c.id}`}
              className="group flex h-full items-start gap-4 px-1 py-5 outline-none transition-colors duration-[140ms] hover:bg-surface focus-visible:bg-sunken sm:px-5"
            >
              <span className="mt-0.5 font-mono text-[11px] text-fg-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-[0.9375rem] font-medium tracking-[-0.01em] text-fg">
                  {c.h1.charAt(0).toUpperCase() + c.h1.slice(1)}
                  <ArrowUpRightIcon className="size-3.5 -translate-x-1 text-fg-subtle opacity-0 transition-[opacity,transform] duration-200 ease-hairline group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
                <span className="mt-1 line-clamp-2 block text-[0.8125rem] leading-[1.5] text-fg-muted">{blurb(c.description)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ── Final CTA ───────────────────────────────────────────────────────────── */

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-border">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid [--grid-size:56px] [mask-image:radial-gradient(ellipse_60%_80%_at_50%_100%,black_10%,transparent_70%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-80 bg-[radial-gradient(ellipse_50%_70%_at_50%_110%,color-mix(in_oklch,var(--accent)_16%,transparent),transparent_70%)]" />
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-28 text-center sm:px-6 sm:py-36">
        <h2 className="text-[2.5rem] leading-[1] font-medium tracking-[-0.045em] text-fg sm:text-6xl lg:text-7xl">
          Stop rebuilding
          <br />
          <span className="text-fg-subtle">the boring parts.</span>
        </h2>
        <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.6] text-fg-muted">
          Settings pages, invoice tables, sign-in flows, chat composers. They are already drawn. Spend your week on the part only you can build.
        </p>
        <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button size="xl" render={<Link href="/gallery" />}>
            Start browsing <ArrowRightIcon />
          </Button>
          <Button size="xl" variant="outline" render={<Link href="/showcase" />}>
            See it in a real product
          </Button>
        </div>
      </div>
    </section>
  )
}
