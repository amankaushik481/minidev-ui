"use client"
import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon, CornerDownLeftIcon, FileTextIcon, LayoutGridIcon, MailIcon, SearchIcon, SparklesIcon, UserPlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Switch } from "@/registry/ui/switch"
import { Checkbox } from "@/registry/ui/checkbox"
import { Kbd } from "@/registry/ui/kbd"
import { StatusBadge } from "@/registry/ui/status-badge"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { ChatThread } from "@/registry/ui/chat-thread"
import { PromptInput } from "@/registry/ui/prompt-input"
import { ToolCallCard } from "@/registry/ui/tool-call-card"
import { ReasoningBlock } from "@/registry/ui/reasoning-block"
import { BarChart } from "@/registry/ui/bar-chart"

function Tile({
  title,
  href,
  hint,
  className,
  bodyClassName,
  children,
}: {
  title: string
  href: string
  hint: string
  className?: string
  bodyClassName?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("group/tile relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-raised", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="min-w-0">
          <p className="text-[0.8125rem] font-medium text-fg">{title}</p>
          <p className="truncate text-xs text-fg-subtle">{hint}</p>
        </div>
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1 text-xs font-medium text-fg-muted outline-none transition-colors hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
        >
          Explore <ArrowRightIcon className="size-3 transition-transform duration-200 ease-hairline group-hover/tile:translate-x-0.5" />
        </Link>
      </div>
      <div className={cn("relative flex min-h-0 flex-1 flex-col bg-bg/50 p-4 sm:p-5", bodyClassName)}>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots [--grid-size:14px] opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  )
}

/* ── AI ──────────────────────────────────────────────────────────────────── */

const REPLY =
  "Done. I added a yearly toggle to the pricing table, kept prices in tabular numerals, and marked the Scale plan as recommended. Both themes pass contrast."

type Msg = { id: string; role: "user" | "assistant"; content: React.ReactNode; streaming?: boolean }

function AiDemo() {
  const [prompt, setPrompt] = React.useState("")
  const [msgs, setMsgs] = React.useState<Msg[]>([
    { id: "u1", role: "user", content: "Add a yearly toggle to the pricing table" },
  ])
  const [phase, setPhase] = React.useState<"idle" | "tool" | "stream">("idle")
  const [streamed, setStreamed] = React.useState(REPLY)

  const run = (text: string) => {
    setMsgs([{ id: "u" + Date.now(), role: "user", content: text }])
    setPhase("tool")
    setStreamed("")
    window.setTimeout(() => setPhase("stream"), 900)
  }

  React.useEffect(() => {
    if (phase !== "stream") return
    let i = 0
    const id = window.setInterval(() => {
      i += 3
      setStreamed(REPLY.slice(0, i))
      if (i >= REPLY.length) {
        window.clearInterval(id)
        setPhase("idle")
      }
    }, 18)
    return () => window.clearInterval(id)
  }, [phase])

  const streaming = phase === "stream"
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
        <ChatThread className="min-h-0 flex-none overflow-visible" messages={msgs} />
        <ReasoningBlock active={phase === "tool"} duration="3s">
          Pricing table uses PlanCard × 3. A SegmentedControl above it keeps the toggle on the same baseline as the heading.
        </ReasoningBlock>
        <ToolCallCard name="edit_file" args={'"pricing-table.tsx"'} status={phase === "tool" ? "running" : "done"} duration="0.8s" defaultOpen={false}>
          + {"<SegmentedControl items={[\"Monthly\", \"Yearly\"]} />"}
        </ToolCallCard>
        {phase !== "tool" ? (
          <ChatThread className="min-h-0 flex-none overflow-visible" messages={[{ id: "a", role: "assistant", content: streamed || " ", streaming }]} />
        ) : null}
        {phase === "idle" ? <PricingArtifact /> : null}
      </div>
      <PromptInput
        value={prompt}
        onChange={setPrompt}
        placeholder="Ask for a change…"
        onSubmit={() => {
          if (!prompt.trim()) return
          run(prompt.trim())
          setPrompt("")
        }}
        toolbar={
          <span className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-sunken px-2 text-[11px] font-medium text-fg-muted">
            <SparklesIcon className="size-3 text-accent" /> Opus
          </span>
        }
      />
    </div>
  )
}

function PricingArtifact() {
  const plans = [
    { n: "Starter", p: "$0" },
    { n: "Pro", p: "$15" },
    { n: "Scale", p: "$39", rec: true },
  ]
  return (
    <div className="animate-[rise-in_260ms_var(--ease-hairline)_both] overflow-hidden rounded-xl border border-border bg-surface shadow-xs">
      <div className="flex h-9 items-center justify-between border-b border-border bg-sunken/50 px-3">
        <span className="font-mono text-[11px] text-fg-muted">pricing-table.tsx</span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-success">
          <span className="size-1.5 rounded-full bg-success" /> Preview
        </span>
      </div>
      <div className="p-3.5">
        <div className="mx-auto mb-3 flex w-fit items-center rounded-lg border border-border bg-sunken p-[2px] text-[10.5px]">
          <span className="px-2.5 py-0.5 text-fg-muted">Monthly</span>
          <span className="rounded-md bg-surface px-2.5 py-0.5 font-medium text-fg shadow-[0_1px_2px_0_oklch(0_0_0/0.08),0_0_0_1px_var(--border)]">Yearly</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {plans.map((p) => (
            <div key={p.n} className={cn("relative rounded-lg border p-2.5", p.rec ? "border-accent bg-accent-soft/60 shadow-[0_0_0_3px_var(--accent-soft)]" : "border-border bg-bg")}>
              {p.rec ? <span className="absolute -top-2 right-2 rounded-full bg-accent px-1.5 text-[9px] font-medium text-on-accent">Best value</span> : null}
              <p className="text-[11px] text-fg-muted">{p.n}</p>
              <p className="mt-0.5 text-[15px] font-medium tracking-[-0.02em] tabular-nums text-fg">{p.p}<span className="text-[10px] font-normal text-fg-subtle">/mo</span></p>
              <span className={cn("mt-2 block h-5 rounded-md", p.rec ? "bg-ink" : "border border-border bg-surface")} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Data ────────────────────────────────────────────────────────────────── */

const ROWS = [
  { id: "c1", name: "Ada Okafor", email: "ada@northwind.dev", role: "Owner", status: "Active", tone: "success" },
  { id: "c2", name: "Leo Brandt", email: "leo@halcyon.health", role: "Admin", status: "Invited", tone: "accent" },
  { id: "c3", name: "Mira Sato", email: "mira@parabola.studio", role: "Member", status: "Active", tone: "success" },
  { id: "c4", name: "Tomás Reyes", email: "tomas@kestrel.io", role: "Member", status: "Suspended", tone: "danger" },
] as const

function DataDemo() {
  const [sel, setSel] = React.useState<Set<string>>(new Set(["c2"]))
  const all = sel.size === ROWS.length
  const toggle = (id: string) => setSel((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-xs">
      <div className="flex h-11 items-center gap-3 border-b border-border px-3">
        <Checkbox
          aria-label="Select all"
          checked={all}
          indeterminate={sel.size > 0 && !all}
          onCheckedChange={() => setSel(all ? new Set() : new Set(ROWS.map((r) => r.id)))}
        />
        {sel.size ? (
          <div className="flex flex-1 items-center justify-between gap-2 animate-[rise-in_160ms_var(--ease-hairline)_both]">
            <span className="text-xs font-medium text-fg">{sel.size} selected</span>
            <div className="flex gap-1.5">
              <Button size="xs" variant="outline">Change role</Button>
              <Button size="xs" variant="destructive">Remove</Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-between text-xs text-fg-subtle">
            <span>Member</span>
            <span className="hidden sm:inline">Status</span>
          </div>
        )}
      </div>
      {ROWS.map((r) => (
        <div
          key={r.id}
          onClick={(e) => { if (!(e.target as HTMLElement).closest("[data-slot=checkbox]")) toggle(r.id) }}
          className={cn(
            "flex h-12 cursor-pointer items-center gap-3 border-b border-border/70 px-3 transition-colors duration-[70ms] last:border-0",
            sel.has(r.id) ? "bg-accent-soft" : "hover:bg-sunken/60"
          )}
        >
          <Checkbox checked={sel.has(r.id)} onCheckedChange={() => toggle(r.id)} aria-label={`Select ${r.name}`} />
          <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border bg-sunken text-[10px] font-semibold text-fg-muted">
            {r.name.split(" ").map((p) => p[0]).join("")}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[0.8125rem] font-medium text-fg">{r.name}</span>
            <span className="block truncate text-[11px] text-fg-subtle">{r.email}</span>
          </span>
          <span className="hidden w-16 text-xs text-fg-muted sm:block">{r.role}</span>
          <StatusBadge tone={r.tone}>{r.status}</StatusBadge>
        </div>
      ))}
    </div>
  )
}

/* ── Billing ─────────────────────────────────────────────────────────────── */

function BillingDemo() {
  const [cycle, setCycle] = React.useState<"monthly" | "yearly">("yearly")
  const [plan, setPlan] = React.useState("team")
  const plans = [
    { id: "pro", name: "Pro", m: 19, note: "For solo builders" },
    { id: "team", name: "Team", m: 49, note: "Up to 20 seats" },
  ]
  return (
    <div className="flex flex-1 flex-col gap-3">
      <Tabs value={cycle} onValueChange={(v) => setCycle(v as "monthly" | "yearly")}>
        <TabsList className="w-full">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">
            Yearly <span className="rounded-full bg-success/12 px-1.5 text-[10px] font-medium text-success">−20%</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div role="radiogroup" aria-label="Plan" className="grid gap-2">
        {plans.map((p) => {
          const on = plan === p.id
          const price = cycle === "yearly" ? Math.round(p.m * 0.8) : p.m
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setPlan(p.id)}
              className={cn(
                "flex items-center gap-3 rounded-xl border bg-surface p-3 text-left outline-none transition-[border-color,box-shadow] duration-[140ms] ease-hairline",
                "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                on ? "border-accent shadow-[0_0_0_3px_var(--accent-soft)]" : "border-border hover:border-border-strong"
              )}
            >
              <span className={cn("grid size-4 shrink-0 place-items-center rounded-full border transition-colors", on ? "border-accent bg-accent" : "border-border-strong")}>
                <span className={cn("size-1.5 rounded-full bg-on-accent transition-transform duration-200 ease-spring", on ? "scale-100" : "scale-0")} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.8125rem] font-medium text-fg">{p.name}</span>
                <span className="block text-[11px] text-fg-subtle">{p.note}</span>
              </span>
              <span className="text-right">
                <span key={price} className="inline-block animate-[rise-in_200ms_var(--ease-hairline)_both] text-lg font-medium tracking-[-0.02em] tabular-nums text-fg">${price}</span>
                <span className="text-[11px] text-fg-subtle">/mo</span>
              </span>
            </button>
          )
        })}
      </div>
      <Button className="mt-auto w-full">Continue to checkout</Button>
    </div>
  )
}

/* ── Settings ────────────────────────────────────────────────────────────── */

function SettingsDemo() {
  const [v, setV] = React.useState({ digest: true, product: false, security: true })
  const rows = [
    { k: "digest", t: "Weekly digest", d: "A Monday summary of activity" },
    { k: "product", t: "Product updates", d: "New features, once a month" },
    { k: "security", t: "Security alerts", d: "Sign-ins from new devices" },
  ] as const
  return (
    <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface shadow-xs">
      {rows.map((r) => (
        <div
          key={r.k}
          onClick={(e) => { if (!(e.target as HTMLElement).closest("[data-slot=switch]")) setV((s) => ({ ...s, [r.k]: !s[r.k] })) }}
          className="flex cursor-pointer items-center gap-3 px-3.5 py-3 transition-colors hover:bg-sunken/40"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[0.8125rem] font-medium text-fg">{r.t}</span>
            <span className="block truncate text-[11px] text-fg-subtle">{r.d}</span>
          </span>
          <Switch checked={v[r.k]} onCheckedChange={(c) => setV((s) => ({ ...s, [r.k]: c }))} aria-label={r.t} />
        </div>
      ))}
    </div>
  )
}

/* ── Command ─────────────────────────────────────────────────────────────── */

const CMDS = [
  { icon: FileTextIcon, label: "New invoice", hint: "Billing", key: "N" },
  { icon: UserPlusIcon, label: "Invite teammate", hint: "Workspace", key: "I" },
  { icon: LayoutGridIcon, label: "Open dashboard", hint: "Navigation", key: "D" },
  { icon: MailIcon, label: "Email receipts", hint: "Billing", key: "E" },
  { icon: SparklesIcon, label: "Ask Lumen AI", hint: "Assistant", key: "A" },
]

function CommandDemo() {
  const [q, setQ] = React.useState("")
  const [active, setActive] = React.useState(0)
  const list = CMDS.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()))
  React.useEffect(() => setActive(0), [q])
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-raised shadow-overlay">
      <div className="flex h-11 items-center gap-2.5 border-b border-border px-3">
        <SearchIcon className="size-4 text-fg-subtle" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(list.length - 1, a + 1)) }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)) }
          }}
          aria-label="Type a command"
          placeholder="Type a command…"
          className="h-full flex-1 bg-transparent text-[0.8125rem] text-fg outline-none placeholder:text-fg-subtle"
        />
        <Kbd>⌘K</Kbd>
      </div>
      <div className="p-1.5" role="listbox" aria-label="Commands">
        {list.length ? (
          list.map((c, i) => (
            <div
              key={c.label}
              role="option"
              aria-selected={i === active}
              onMouseMove={() => setActive(i)}
              className={cn("flex h-9 cursor-default items-center gap-2.5 rounded-lg px-2 text-[0.8125rem]", i === active ? "bg-sunken text-fg" : "text-fg-muted")}
            >
              <c.icon className={cn("size-4", i === active ? "text-accent" : "text-fg-subtle")} />
              <span className="flex-1 font-medium">{c.label}</span>
              <span className="text-[11px] text-fg-subtle">{c.hint}</span>
              {i === active ? <CornerDownLeftIcon className="size-3.5 text-fg-subtle" /> : <Kbd className="h-[18px] min-w-[18px] text-[10px]">{c.key}</Kbd>}
            </div>
          ))
        ) : (
          <p className="py-6 text-center text-xs text-fg-subtle">No commands match “{q}”</p>
        )}
      </div>
    </div>
  )
}

/* ── Auth ────────────────────────────────────────────────────────────────── */

function AuthDemo() {
  return (
    <div className="mx-auto flex w-full max-w-[300px] flex-1 flex-col justify-center gap-3">
      <div className="text-center">
        <p className="text-[0.9375rem] font-medium tracking-[-0.01em] text-fg">Sign in to Lumen</p>
        <p className="mt-0.5 text-xs text-fg-subtle">Welcome back. Pick up where you left off.</p>
      </div>
      <Button variant="outline" className="w-full">
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.9-5.5 3.9-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12s4.3 9.6 9.6 9.6c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12Z" />
        </svg>
        Continue with Google
      </Button>
      <div className="flex items-center gap-3 text-[11px] text-fg-subtle">
        <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
      </div>
      <Input type="email" placeholder="you@company.com" aria-label="Email" />
      <Button className="w-full">Continue with email</Button>
    </div>
  )
}

/* ── Chart ───────────────────────────────────────────────────────────────── */

function ChartDemo() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-medium tracking-[-0.025em] tabular-nums text-fg">12,480</p>
        <span className="rounded-md bg-success/10 px-1.5 py-0.5 text-[11px] font-medium text-success">+18.2%</span>
      </div>
      <p className="text-xs text-fg-subtle">Signups this week · hover a bar</p>
      <BarChart
        className="mt-3 h-44"
        data={[
          { label: "Mon", value: 1420 },
          { label: "Tue", value: 1810 },
          { label: "Wed", value: 1560 },
          { label: "Thu", value: 2240 },
          { label: "Fri", value: 2010 },
          { label: "Sat", value: 1290 },
          { label: "Sun", value: 1150 },
        ]}
      />
    </div>
  )
}

export function Bento() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <SectionHead
        eyebrow="Live, not screenshots"
        title="Built for the screens people live in."
        body="Every tile below is the real component, running. Type in the composer, select rows, flip the billing cycle."
      />
      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        <Tile title="AI surfaces" hint="Composer, reasoning, tool calls, streaming" href="/gallery/ai" className="lg:col-span-6 lg:row-span-2" bodyClassName="min-h-[520px]">
          <AiDemo />
        </Tile>
        <Tile title="Data" hint="Selection, bulk actions, status" href="/gallery/data-table" className="lg:col-span-6">
          <DataDemo />
        </Tile>
        <Tile title="Billing" hint="Plans, cycles, checkout" href="/gallery/billing" className="lg:col-span-3">
          <BillingDemo />
        </Tile>
        <Tile title="Settings" hint="Preferences that save themselves" href="/gallery/settings" className="lg:col-span-3">
          <SettingsDemo />
        </Tile>
        <Tile title="Command" hint="Keyboard-first navigation" href="/gallery/navigation" className="lg:col-span-4">
          <CommandDemo />
        </Tile>
        <Tile title="Auth" hint="Sign in, sign up, 2FA, magic links" href="/gallery/auth" className="lg:col-span-4">
          <AuthDemo />
        </Tile>
        <Tile title="Charts" hint="Area, line, bar, sparklines" href="/gallery/charts" className="lg:col-span-4">
          <ChartDemo />
        </Tile>
      </div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, body, align = "center" }: { eyebrow: string; title: React.ReactNode; body?: React.ReactNode; align?: "center" | "left" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "")}>
      <p className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">
        <span className="h-px w-5 bg-accent-line" />
        {eyebrow}
        {align === "center" ? <span className="h-px w-5 bg-accent-line" /> : null}
      </p>
      <h2 className="mt-4 text-[2rem] leading-[1.05] font-medium tracking-[-0.035em] text-fg sm:text-5xl sm:leading-[1.02] sm:tracking-[-0.04em]">{title}</h2>
      {body ? <p className="mt-4 text-base leading-[1.6] text-fg-muted sm:text-[1.0625rem]">{body}</p> : null}
    </div>
  )
}
