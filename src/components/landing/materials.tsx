"use client"
import * as React from "react"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { NumberRoll } from "@/registry/ui/number-roll"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { StatusBadge } from "@/registry/ui/status-badge"
import { Switch } from "@/registry/ui/switch"
import type { Material } from "@/registry/ui/light-provider"

/* The same markup four times. Only data-material changes. */

const PANELS: { m: Material; name: string; note: string }[] = [
  { m: "hairline", name: "Hairline", note: "Unlit. 1px lines, quiet depth. For products that should disappear." },
  { m: "glass", name: "Glass", note: "Frosted, translucent, lit from your cursor. Colour moves behind it." },
  { m: "metal", name: "Metal", note: "Brushed aluminium, bevels that turn with the light, machined thumbs." },
  { m: "paper", name: "Paper", note: "Warm stock, real grain, long soft shadows. Editorial and calm." },
]

const LINE = "M0 52 L22 44 L44 48 L66 34 L88 38 L110 24 L132 28 L154 14 L176 18 L200 6"

function Kit({ plan, setPlan, rev }: { plan: string; setPlan: (v: string) => void; rev: number }) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-border bg-surface p-3.5 shadow-raised">
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-fg-muted">Revenue</p>
          <StatusBadge tone="success">+12%</StatusBadge>
        </div>
        <p className="mt-1 text-[24px] leading-7 font-medium tracking-[-0.03em] text-fg">
          <NumberRoll value={rev} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} />
        </p>
        <svg viewBox="0 0 200 60" className="mt-2 h-10 w-full" preserveAspectRatio="none" aria-hidden>
          <path d={LINE} fill="none" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-3.5 py-3 shadow-raised">
        <div>
          <p className="text-[13px] font-medium text-fg">Auto-reminders</p>
          <p className="text-[11.5px] text-fg-muted">3 days before due</p>
        </div>
        <Switch defaultChecked aria-label="Auto-reminders" />
      </div>
      <SegmentedControl size="sm" fullWidth aria-label="Plan" value={plan} onChange={setPlan} items={["Starter", "Team", "Scale"]} />
      <div className="flex gap-2">
        <Button size="sm" className="flex-1">Upgrade</Button>
        <Button size="sm" variant="outline">Later</Button>
      </div>
      <div className="flex items-start gap-2.5 rounded-xl border border-border bg-raised p-3 shadow-overlay">
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-success text-white">
          <CheckIcon className="size-3" strokeWidth={3} />
        </span>
        <div className="min-w-0">
          <p className="text-[12.5px] font-medium text-fg">Invoice paid</p>
          <p className="truncate text-[11.5px] text-fg-muted">Northwind Labs, $12,400</p>
        </div>
      </div>
    </div>
  )
}

export function Materials() {
  const [plan, setPlan] = React.useState("Team")
  const rev = plan === "Starter" ? 18240 : plan === "Team" ? 48290 : 131640
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">Materials</p>
        <h2 className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance text-fg sm:text-5xl">
          Same code. Four materials.
        </h2>
        <p className="mt-4 text-[1.0625rem] leading-[1.65] text-pretty text-fg-muted">
          Every component speaks in tokens, so a material is one attribute: <code className="rounded-md bg-sunken px-1.5 py-0.5 font-mono text-[0.9em] text-fg">data-material=&quot;metal&quot;</code>{" "}
          on any element. The four panels below run the exact same markup. Change the plan in one and watch all four.
        </p>
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {PANELS.map((p) => (
          <div
            key={p.m}
            data-material={p.m}
            className={cn("relative isolate overflow-hidden rounded-3xl border border-border bg-bg p-4 shadow-raised", p.m === "glass" && "bg-transparent")}
          >
            {p.m === "glass" ? (
              <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
                <div className="absolute inset-0 bg-[linear-gradient(160deg,oklch(0.86_0.08_300),oklch(0.9_0.06_220)_55%,oklch(0.9_0.07_350))] dark:bg-[linear-gradient(160deg,oklch(0.3_0.12_300),oklch(0.25_0.08_230)_55%,oklch(0.28_0.1_345))]" />
                <div className="absolute -top-10 -left-8 size-48 rounded-full bg-accent opacity-60 blur-3xl" />
                <div className="absolute -right-10 bottom-10 size-44 rounded-full bg-accent-2 opacity-50 blur-3xl" />
                <div className="absolute top-1/2 left-1/3 size-36 rounded-full bg-info opacity-40 blur-3xl" />
              </div>
            ) : null}
            <div className="mb-4 flex items-baseline justify-between px-1">
              <p className="text-[15px] font-medium tracking-[-0.01em] text-fg">{p.name}</p>
              <code className="font-mono text-[10.5px] text-fg-subtle">{p.m}</code>
            </div>
            <Kit plan={plan} setPlan={setPlan} rev={rev} />
            <p className="mt-4 px-1 text-[12.5px] leading-[1.5] text-fg-muted">{p.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
