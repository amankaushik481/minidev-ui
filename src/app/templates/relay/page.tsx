"use client"
import * as React from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"
import { ArrowRightIcon, BotIcon, CheckIcon, CircleDollarSignIcon, GaugeIcon, HandIcon, LoaderIcon, MailIcon, PlayIcon, RotateCcwIcon, SearchIcon, ShieldCheckIcon, UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { TemplateFooter, TemplateShell } from "@/components/templates/template-bar"
import { FloatingNav } from "@/registry/blocks/floating-nav"
import { BentoLive } from "@/registry/blocks/bento-live"
import { ScrollStory } from "@/registry/blocks/scroll-story"
import { SocialProofWall } from "@/registry/blocks/social-proof-wall"
import { PricingPlans } from "@/registry/blocks/pricing-plans"
import { FaqSection } from "@/registry/blocks/faq-section"
import { CtaBand } from "@/registry/blocks/cta-band"
import { Button } from "@/registry/ui/button"
import { NumberRoll } from "@/registry/ui/number-roll"

const Brand = () => (
  <span className="flex items-center gap-2 font-mono text-[14px] font-semibold tracking-[-0.02em] text-fg">
    <span className="grid size-7 place-items-center rounded-lg bg-accent text-on-accent shadow-ink">
      <BotIcon className="size-4" />
    </span>
    relay
  </span>
)

/* ── the live agent run ───────────────────────────────────────────────── */
type Run = { icon: typeof SearchIcon; label: string; detail: string; ms: number; tool?: string }
const RUN: Run[] = [
  { icon: MailIcon, label: "Read ticket #4411", detail: "\"I was charged twice for my March order.\"", ms: 420 },
  { icon: SearchIcon, label: "Look up customer", detail: "Maya Chen · Pro plan · 2 years", ms: 610, tool: "shopify.customer" },
  { icon: CircleDollarSignIcon, label: "Find the charges", detail: "2 × $49.00 on Mar 14, 3s apart. Duplicate.", ms: 880, tool: "stripe.charges" },
  { icon: ShieldCheckIcon, label: "Check policy", detail: "Duplicate charges: refund, no approval needed", ms: 300, tool: "policy.refunds" },
  { icon: RotateCcwIcon, label: "Refund $49.00", detail: "re_3PqX… succeeded", ms: 940, tool: "stripe.refunds" },
  { icon: UserIcon, label: "Reply and close", detail: "Sent in Maya's language, ticket solved", ms: 520, tool: "zendesk.reply" },
]

function AgentConsole() {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const [i, setI] = React.useState(-1)
  const [runId, setRunId] = React.useState(0)
  React.useEffect(() => {
    if (!inView) return
    if (reduce) return setI(RUN.length)
    setI(0)
    let n = 0
    let t: ReturnType<typeof setTimeout>
    const next = () => {
      n += 1
      setI(n)
      if (n < RUN.length) t = setTimeout(next, RUN[n].ms + 350)
    }
    t = setTimeout(next, RUN[0].ms + 500)
    return () => clearTimeout(t)
  }, [inView, runId, reduce])
  const done = i >= RUN.length
  const total = RUN.slice(0, Math.max(0, i)).reduce((a, r) => a + r.ms, 0)
  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-border bg-surface shadow-overlay">
      <div className="flex h-11 items-center gap-3 border-b border-border bg-sunken/60 px-4">
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((k) => (
            <span key={k} className="size-2.5 rounded-full border border-border-strong" />
          ))}
        </span>
        <p className="font-mono text-[11.5px] text-fg-muted">run_8f2c · support-agent</p>
        <span className={cn("ml-auto inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10.5px]", done ? "bg-success/12 text-success" : "bg-accent-soft text-accent-fg")}>
          {done ? <CheckIcon className="size-3" strokeWidth={3} /> : <LoaderIcon className="size-3 animate-spin" />}
          {done ? "resolved" : "running"}
        </span>
      </div>
      <ol className="relative space-y-1 p-3">
        <span aria-hidden className="absolute top-6 bottom-6 left-[27px] w-px bg-border" />
        {RUN.map((r, k) => {
          const state = k < i ? "done" : k === i ? "running" : "pending"
          return (
            <li key={r.label} className={cn("relative flex items-start gap-3 rounded-xl px-2 py-2 transition-colors duration-300", state === "running" && "bg-accent-soft")}>
              <span
                className={cn(
                  "relative z-10 grid size-7 shrink-0 place-items-center rounded-lg border transition-colors duration-300",
                  state === "done" ? "border-border bg-raised text-fg" : state === "running" ? "border-accent bg-accent text-on-accent" : "border-border bg-surface text-fg-subtle"
                )}
              >
                {state === "done" ? <CheckIcon className="size-3.5 text-success" strokeWidth={3} /> : <r.icon className="size-3.5" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className={cn("text-[13px] font-medium", state === "pending" ? "text-fg-subtle" : "text-fg")}>{r.label}</p>
                  {r.tool ? <span className="rounded-md bg-sunken px-1.5 py-px font-mono text-[10px] text-fg-muted">{r.tool}</span> : null}
                  {state === "done" ? <span className="ml-auto font-mono text-[10.5px] text-fg-subtle tabular-nums">{(r.ms / 1000).toFixed(2)}s</span> : null}
                </div>
                <AnimatePresence initial={false}>
                  {state !== "pending" ? (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden text-[12px] text-fg-muted">
                      {r.detail}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>
            </li>
          )
        })}
      </ol>
      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <p className="font-mono text-[11.5px] text-fg-muted tabular-nums">
          {done ? "Resolved in " : "Elapsed "}
          <NumberRoll value={Number((total / 1000).toFixed(1))} format={{ minimumFractionDigits: 1 }} />s · 0 humans needed
        </p>
        <Button size="xs" variant="outline" onClick={() => setRunId((x) => x + 1)} disabled={!done}>
          <PlayIcon /> Replay
        </Button>
      </div>
    </div>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const rise = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 14, filter: "blur(6px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay: d, ease: [0.2, 0, 0, 1] as const } })
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="light-spot absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-dots [--grid-size:22px] [mask-image:radial-gradient(ellipse_70%_60%_at_60%_30%,black_10%,transparent_70%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pt-16 pb-16 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8 lg:pt-24">
        <div>
          <motion.p {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1 pr-3 pl-1.5 font-mono text-[11.5px] text-fg-muted shadow-xs">
            <span className="rounded-full bg-accent px-2 py-0.5 text-[10.5px] font-semibold text-on-accent">v2</span>
            Agents now take actions, with approvals
          </motion.p>
          <motion.h1 {...rise(0.08)} className="mt-6 text-[2.8rem] leading-[1] font-medium tracking-[-0.05em] text-balance text-fg sm:text-6xl lg:text-[4.9rem] lg:leading-[0.95]">
            Agents that
            <br />
            <span className="text-lit">close the ticket.</span>
          </motion.h1>
          <motion.p {...rise(0.16)} className="mt-6 max-w-lg text-lg leading-[1.6] text-fg-muted">
            Relay reads the ticket, checks your systems, takes the action, refunds, rebookings, address changes, and replies. Inside the rules you set, with a human one click away.
          </motion.p>
          <motion.div {...rise(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg">
              Deploy your first agent <ArrowRightIcon />
            </Button>
            <Button size="lg" variant="outline">
              Book a demo
            </Button>
          </motion.div>
          <motion.dl {...rise(0.3)} className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            {[
              [68, "%", "resolved end to end"],
              [4, "s", "median resolution"],
              [0.12, "$", "per resolution"],
            ].map(([v, u, l]) => (
              <div key={l as string}>
                <dt className="text-2xl font-medium tracking-[-0.03em] text-fg tabular-nums">
                  {u === "$" ? "$" : null}
                  <NumberRoll value={v as number} format={u === "$" ? { minimumFractionDigits: 2 } : {}} />
                  {u !== "$" ? u : null}
                </dt>
                <dd className="text-[12px] text-fg-muted">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
        <motion.div initial={reduce ? false : { opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.2, 0, 0, 1] }} className="relative">
          <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-accent opacity-15 blur-[100px]" />
          <div style={{ transform: "translate3d(calc(var(--sx) * -6px), calc(var(--sy) * -6px), 0)" }}>
            <AgentConsole />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── guardrails ───────────────────────────────────────────────────────── */
function Guardrails() {
  const [limit, setLimit] = React.useState(100)
  const [approve, setApprove] = React.useState(true)
  const rules = [
    { k: "refund.max_amount", v: `$${limit}`, on: true },
    { k: "refund.require_approval_above", v: approve ? "$50" : "never", on: approve },
    { k: "tone", v: "warm, brief, customer's language", on: true },
    { k: "never", v: "promise delivery dates, discuss legal", on: true },
  ]
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">Guardrails</p>
          <h2 className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance text-fg sm:text-5xl">You write the rules. It never colours outside them.</h2>
          <p className="mt-4 max-w-md text-[1.0625rem] leading-[1.65] text-fg-muted">Limits, approvals and tone in plain settings, not prompts. Every action is logged with the rule that allowed it.</p>
          <div className="mt-8 max-w-sm space-y-5 rounded-2xl border border-border bg-surface p-5 shadow-raised">
            <div>
              <div className="flex items-center justify-between text-[13px]">
                <label htmlFor="lim" className="font-medium text-fg">Max refund without a human</label>
                <span className="font-mono text-fg tabular-nums">${limit}</span>
              </div>
              <input id="lim" type="range" min={0} max={500} step={10} value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-sunken accent-[var(--accent)]" />
            </div>
            <label className="flex items-center justify-between gap-3 text-[13px] font-medium text-fg">
              Ask me before refunds over $50
              <button type="button" role="switch" aria-checked={approve} onClick={() => setApprove((a) => !a)} className={cn("relative h-5 w-9 rounded-full transition-colors duration-200", approve ? "bg-accent" : "bg-border-strong")}>
                <span className={cn("absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-hairline", approve && "translate-x-4")} />
              </button>
            </label>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-ink font-mono text-[13px] text-on-ink shadow-ink">
          <div className="flex items-center justify-between border-b border-on-ink/10 px-5 py-3 text-[11.5px] opacity-70">
            <span>policy.yaml</span>
            <span>synced · just now</span>
          </div>
          <pre className="overflow-x-auto p-5 leading-7">
            {rules.map((r) => (
              <motion.div key={r.k + r.v} initial={{ backgroundColor: "color-mix(in oklch, var(--accent) 30%, transparent)" }} animate={{ backgroundColor: "transparent" }} transition={{ duration: 1.2 }} className="-mx-2 rounded px-2">
                <span className="opacity-50">{r.on ? "" : "# "}</span>
                <span className="text-accent">{r.k}</span>
                <span className="opacity-50">: </span>
                <span>{r.v}</span>
              </motion.div>
            ))}
          </pre>
        </div>
      </div>
    </section>
  )
}

function Inbox() {
  const rows = [
    ["Maya C.", "Refunded duplicate charge", "resolved", "4.2s"],
    ["Leo B.", "Changed delivery address", "resolved", "3.1s"],
    ["Aisha K.", "Refund $180 requested", "needs you", "–"],
    ["Tom L.", "Where is my order?", "resolved", "2.4s"],
  ]
  return (
    <ul className="w-full space-y-1.5">
      {rows.map(([n, t, s, d]) => (
        <li key={n} className="flex items-center gap-3 rounded-xl border border-border bg-raised px-3 py-2.5 text-[12.5px] shadow-raised">
          <span className="grid size-7 place-items-center rounded-full bg-sunken text-[10px] font-medium text-fg-muted">{n.slice(0, 2)}</span>
          <span className="min-w-0 flex-1 truncate text-fg">{t}</span>
          <span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-medium", s === "resolved" ? "bg-success/12 text-success" : "bg-accent-soft text-accent-fg")}>{s}</span>
          <span className="w-9 text-right font-mono text-[10.5px] text-fg-subtle">{d}</span>
        </li>
      ))}
    </ul>
  )
}

function Approve() {
  const [st, setSt] = React.useState<"ask" | "yes" | "no">("ask")
  return (
    <div className="w-full rounded-2xl border border-border bg-raised p-4 shadow-overlay">
      <div className="flex items-center gap-2 text-[12px] text-fg-muted">
        <HandIcon className="size-3.5 text-accent-fg" /> Relay wants to
      </div>
      <p className="mt-1.5 text-[14px] font-medium text-fg">Refund $180.00 to Aisha K.</p>
      <p className="text-[12px] text-fg-muted">Damaged on arrival, photo attached. Over your $50 limit.</p>
      <div className="mt-3 flex gap-2">
        {st === "ask" ? (
          <>
            <Button size="sm" className="flex-1" onClick={() => setSt("yes")}>Approve</Button>
            <Button size="sm" variant="outline" onClick={() => setSt("no")}>Decline</Button>
          </>
        ) : (
          <p className={cn("flex h-8 w-full animate-[rise-in_250ms_var(--ease-hairline)_both] items-center justify-center gap-1.5 rounded-lg text-[12.5px] font-medium", st === "yes" ? "bg-success/12 text-success" : "bg-sunken text-fg-muted")}>
            {st === "yes" ? <><CheckIcon className="size-3.5" strokeWidth={3} /> Refunded and replied</> : "Declined. Relay will explain kindly."}
          </p>
        )}
      </div>
    </div>
  )
}

export default function RelayTemplate() {
  return (
    <TemplateShell name="Relay" kind="AI agents" material="hairline" className="tpl-relay">
      <FloatingNav
        brand={<Brand />}
        links={[
          { label: "Product", href: "#product" },
          { label: "Guardrails", href: "#guardrails" },
          { label: "How it works", href: "#how" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ]}
        cta={{ label: "Deploy an agent" }}
      />
      <main>
        <Hero />
        <div id="product" className="scroll-mt-24">
          <BentoLive
            eyebrow="Product"
            title="The whole queue, not just the easy half."
            items={[
              { title: "An inbox that empties itself", body: "Relay resolves what it can and hands you the rest, already researched.", visual: <Inbox />, span: 4, tall: true },
              { title: "One click when it matters", body: "Anything over your limits comes to you with the context and a draft.", visual: <Approve />, span: 2, tall: true },
              { title: "Speaks every language", body: "Replies in the customer's language, in your brand's voice.", visual: <div className="w-full space-y-2 text-[12.5px]">{["Olá Maya, reembolsamos…", "Hola Leo, cambiamos…", "Hi Tom, it's on the way…"].map((t) => <p key={t} className="rounded-xl bg-sunken px-3 py-2 text-fg">{t}</p>)}</div>, span: 2 },
              { title: "Measured in money", body: "Resolution rate, time saved and refunds issued, per agent, per day.", visual: <div className="flex w-full items-end gap-1.5">{[42, 51, 48, 60, 58, 66, 68].map((h, k) => <span key={k} className={cn("flex-1 rounded-t-md", k === 6 ? "bg-accent" : "bg-accent/25")} style={{ height: h * 1.6 }} />)}</div>, span: 2 },
              { title: "Fast enough to feel human", body: "Median reply in 4 seconds, day or night, on every channel.", visual: <div className="flex items-center gap-3"><GaugeIcon className="size-10 text-accent-fg" /><p className="text-4xl font-medium tracking-[-0.04em] text-fg">4.0s</p></div>, span: 2 },
            ]}
          />
        </div>
        <div id="guardrails" className="scroll-mt-24">
          <Guardrails />
        </div>
        <div id="how" className="scroll-mt-24">
          <ScrollStory
            title="Live on your queue by Friday."
            steps={[
              { kicker: "01 · Connect", title: "Plug in your helpdesk and tools.", body: "Zendesk or Intercom, plus Stripe, Shopify and your own API. Scoped keys, read and write only where you allow.", visual: <Inbox /> },
              { kicker: "02 · Shadow", title: "It drafts, your team sends.", body: "For the first week Relay writes replies your agents approve. You see its accuracy before it acts alone.", visual: <Approve /> },
              { kicker: "03 · Autopilot", title: "Turn on actions, one policy at a time.", body: "Start with refunds under $20. Widen the rules as the numbers earn your trust.", visual: <div className="w-full max-w-sm"><AgentConsole /></div> },
            ]}
          />
        </div>
        <SocialProofWall
          eyebrow="Teams on Relay"
          title="Support teams that got their evenings back."
          logos={["Northwind", "Halcyon", "Oakridge", "Parallel", "Vantage", "Kestrel", "Umbra", "Meridian"]}
          quotes={[
            { quote: "Relay closes two thirds of our tickets before anyone logs in. The rest arrive researched.", name: "Priya R.", role: "Head of Support, Halcyon", metric: "68% auto-resolved" },
            { quote: "The approval flow is what sold our CFO. Nothing over the limit moves without us.", name: "Marcus W.", role: "COO, Parallel" },
            { quote: "Our first-response time went from 5 hours to 4 seconds.", name: "Elena S.", role: "CX Lead, Kestrel", metric: "5h → 4s" },
            { quote: "It replies in Portuguese better than we did.", name: "Daniel O.", role: "Founder, Umbra" },
            { quote: "We shadowed it for a week, checked every draft, then switched on refunds.", name: "Hana I.", role: "Support Ops, Meridian" },
            { quote: "The policy file is the best idea. Our rules finally live somewhere.", name: "Tom L.", role: "Support Lead, Oakridge" },
          ]}
        />
        <div id="pricing" className="scroll-mt-24">
          <PricingPlans
            title="Pay for resolved tickets. Not seats."
            unit="/ mo"
            per=""
            description="You are only charged when a ticket is resolved without a human. Drafts and escalations are free."
            yearlyBadge="-15%"
            plans={[
              { name: "Starter", blurb: "One agent, one channel.", monthly: 0, yearly: 0, cta: "Start free", features: ["100 resolutions / month", "Email channel", "Drafts and shadow mode", { label: "Actions in your tools", included: false }, { label: "Approvals", included: false }] },
              { name: "Growth", blurb: "For teams with a real queue.", monthly: 299, yearly: 254, cta: "Start 14-day trial", featured: true, features: ["2,500 resolutions included", "Email, chat, WhatsApp", "Actions and approvals", "Policy file and audit log", "Then $0.12 per resolution"] },
              { name: "Enterprise", blurb: "For regulated or high-volume teams.", monthly: 1490, yearly: 1266, cta: "Talk to us", features: ["Unlimited agents", "SSO, SCIM, data residency", "Custom tools and models", "Dedicated engineer", "SLA and security review"] },
            ]}
          />
        </div>
        <div id="faq" className="scroll-mt-24">
          <FaqSection
            items={[
              { q: "What can Relay actually do?", a: "Anything your tools allow through an API: refunds, cancellations, address changes, rebookings, order lookups, account updates. You choose which actions are on." },
              { q: "What if it gets something wrong?", a: "Every action is limited by your policy and reversible where your tools allow. Anything over a limit waits for a human, and every decision is logged with its reason." },
              { q: "Which helpdesks do you support?", a: "Zendesk, Intercom, Freshdesk, Gorgias and plain email out of the box, plus a webhook API for anything else." },
              { q: "Do you train on our data?", a: "No. Your tickets and data are used only to answer your customers and are never used to train shared models." },
            ]}
          />
        </div>
        <CtaBand
          title={
            <>
              Your queue, empty
              <br />
              <span className="text-lit">by Monday.</span>
            </>
          }
          description="Connect your helpdesk and watch Relay shadow your team for a week. Free."
          button="Deploy an agent"
          success="Check your inbox"
          note="Sample template by MiniDev. Relay is a fictional product."
        />
      </main>
      <TemplateFooter brand={<Brand />} note="AI agents that close the ticket. A MiniDev template; Relay is a fictional product." />
    </TemplateShell>
  )
}
