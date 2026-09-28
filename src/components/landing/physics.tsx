"use client"
import * as React from "react"
import { PlusIcon, RulerIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Kbd } from "@/registry/ui/kbd"
import { MorphPanel } from "@/registry/ui/morph-panel"
import { NumberRoll } from "@/registry/ui/number-roll"
import { OtpInput } from "@/registry/ui/otp-input"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { useBlueprint } from "@/components/blueprint/blueprint"

function Tile({ n, title, body, children, className }: { n: string; title: string; body: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("group/tile relative flex min-h-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-raised", className)}>
      <div className="relative grid flex-1 place-items-center overflow-visible bg-dots p-6 [--grid-size:14px]">{children}</div>
      <div className="border-t border-border px-5 py-4">
        <p className="font-mono text-[11px] text-accent-fg">{n}</p>
        <p className="mt-1 text-[15px] font-medium tracking-[-0.01em] text-fg">{title}</p>
        <p className="mt-1 text-[13px] leading-[1.55] text-fg-muted">{body}</p>
      </div>
    </div>
  )
}

function LiveRevenue() {
  const [v, setV] = React.useState(48290)
  const [sales, setSales] = React.useState(0)
  React.useEffect(() => {
    const t = setInterval(() => setV((x) => x + Math.round(80 + Math.random() * 420)), 2600)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="w-full max-w-[280px] rounded-xl border border-border bg-raised p-4 shadow-overlay">
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] text-fg-muted">Revenue today</p>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-fg-subtle">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-success/60" />
            <span className="relative size-1.5 rounded-full bg-success" />
          </span>
          Live
        </span>
      </div>
      <p className="mt-2 text-[34px] leading-10 font-medium tracking-[-0.035em] text-fg">
        <NumberRoll value={v} trend format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} />
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[12px] text-fg-subtle tabular-nums">{sales} manual sales</span>
        <Button
          size="xs"
          variant="outline"
          onClick={() => {
            setV((x) => x + 1200)
            setSales((s) => s + 1)
          }}
        >
          <PlusIcon /> $1,200 sale
        </Button>
      </div>
    </div>
  )
}

function RollingPrice() {
  const [period, setPeriod] = React.useState("yearly")
  const yearly = period === "yearly"
  return (
    <div className="flex w-full max-w-[280px] flex-col items-center gap-5">
      <SegmentedControl
        aria-label="Billing period"
        value={period}
        onChange={setPeriod}
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly", badge: "-20%" },
        ]}
      />
      <div className="w-full rounded-xl bg-ink p-4 text-on-ink shadow-ink">
        <p className="text-[12.5px] opacity-70">Team</p>
        <p className="mt-1 flex items-baseline gap-1">
          <span className="text-[40px] leading-[44px] font-medium tracking-[-0.04em]">
            <NumberRoll value={yearly ? 24 : 30} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} />
          </span>
          <span className="text-[13px] opacity-60">/ seat / mo</span>
        </p>
        <p className="mt-1 text-[12px] opacity-60">
          Billed <NumberRoll value={yearly ? 288 : 360} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} /> per seat {yearly ? "yearly" : "over 12 months"}
        </p>
      </div>
    </div>
  )
}

function OtpTile() {
  const [status, setStatus] = React.useState<"idle" | "invalid" | "success">("idle")
  const [code, setCode] = React.useState("")
  return (
    <div className="flex flex-col items-center gap-3">
      <OtpInput
        value={code}
        status={status}
        groups={[3, 3]}
        onChange={(v) => {
          setCode(v)
          if (status !== "idle") setStatus("idle")
        }}
        onComplete={(v) => setTimeout(() => setStatus(v === "424242" ? "success" : "invalid"), 200)}
      />
      <p className={cn("text-[12px]", status === "invalid" ? "text-danger" : status === "success" ? "text-success" : "text-fg-subtle")}>
        {status === "invalid" ? "Wrong code. It shook, did you feel it?" : status === "success" ? "Verified." : "Try 424242, or anything else."}
      </p>
    </div>
  )
}

export function Physics() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="max-w-2xl">
        <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">Physics</p>
        <h2 className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance text-fg sm:text-5xl">
          Things that move have mass.
        </h2>
        <p className="mt-4 text-[1.0625rem] leading-[1.65] text-fg-muted">
          AI can write a component in seconds. It cannot make one feel right. Every moving part here runs on a tuned spring, keeps its
          identity while it moves, and holds still for anyone who asks for reduced motion.
        </p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <Tile n="MorphPanel" title="The button becomes the panel" body="One surface stretches on a spring. Corners ease from 10 to 16px. Nothing pops.">
          <div className="h-[236px] w-full max-w-[340px]">
            <MorphPanel />
          </div>
        </Tile>
        <Tile n="NumberRoll" title="Numbers roll, not swap" body="Only the digits that changed move. Columns keep their place as the number grows.">
          <LiveRevenue />
        </Tile>
        <Tile n="SegmentedControl + NumberRoll" title="Price changes you can follow" body="The thumb glides, the discount badge lights, and the price counts to its new value.">
          <RollingPrice />
        </Tile>
        <Tile n="OtpInput" title="Wrong answers shake" body="One real input under painted slots. Paste and SMS autofill just work.">
          <OtpTile />
        </Tile>
      </div>
    </section>
  )
}

export function BlueprintCallout() {
  const { on, toggle } = useBlueprint()
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-raised">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-70 [--grid-size:32px] [mask-image:linear-gradient(90deg,transparent,black_60%)]" />
        <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">Blueprint</p>
            <h2 className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance text-fg sm:text-5xl">
              The spec ships with the component.
            </h2>
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.65] text-fg-muted">
              Hold <Kbd>⌥</Kbd> on any page of this site and hover anything. You get the box, the padding, the gaps, the radius, the type,
              and the exact token classes it was built from. Off-grid values get flagged. Your AI agent reads the same spec from{" "}
              <a href="/llms.txt" className="font-medium text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg-subtle">
                llms.txt
              </a>
              .
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" variant={on ? "outline" : "accent"} onClick={toggle}>
                <RulerIcon /> {on ? "Turn Blueprint off" : "Turn Blueprint on"}
              </Button>
              <span className="text-[13px] text-fg-subtle">then hover the card on the right</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div data-slot="card" className="rounded-xl border border-border bg-raised p-5 shadow-overlay">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full border border-border bg-sunken text-[12px] font-medium text-fg-muted">NL</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-fg">Northwind Labs</p>
                  <p className="text-[12px] text-fg-muted">INV-2041 · due in 3 days</p>
                </div>
                <p className="text-[15px] font-medium text-fg tabular-nums">$12,400</p>
              </div>
              <div className="mt-5 flex gap-2">
                <Button className="flex-1">Send reminder</Button>
                <Button variant="outline">View</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
