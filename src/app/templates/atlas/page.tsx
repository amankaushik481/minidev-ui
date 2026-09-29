"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRightIcon, BuildingIcon, CheckIcon, DropletsIcon, KeyRoundIcon, WrenchIcon, ZapIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { TemplateFooter, TemplateShell } from "@/components/templates/template-bar"
import { FloatingNav } from "@/registry/blocks/floating-nav"
import { DeviceFrame } from "@/registry/blocks/device-frame"
import { BentoLive } from "@/registry/blocks/bento-live"
import { PricingPlans } from "@/registry/blocks/pricing-plans"
import { FaqSection } from "@/registry/blocks/faq-section"
import { CtaBand } from "@/registry/blocks/cta-band"
import { Button } from "@/registry/ui/button"
import { NumberRoll } from "@/registry/ui/number-roll"

const Brand = () => (
  <span className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em] text-fg">
    <span className="grid size-7 place-items-center rounded-lg bg-accent text-on-accent shadow-ink">
      <BuildingIcon className="size-4" />
    </span>
    Atlas
  </span>
)

type Prop = { id: string; name: string; area: string; x: number; y: number; units: number; occupied: number; rent: number; collected: number; issues: number }
const PROPS: Prop[] = [
  { id: "a", name: "The Linden", area: "Hackney", x: 62, y: 34, units: 24, occupied: 23, rent: 41800, collected: 39650, issues: 2 },
  { id: "b", name: "Mill Lane Lofts", area: "Shoreditch", x: 44, y: 52, units: 12, occupied: 12, rent: 26400, collected: 26400, issues: 0 },
  { id: "c", name: "Canal House", area: "Islington", x: 30, y: 30, units: 36, occupied: 33, rent: 61200, collected: 54100, issues: 4 },
  { id: "d", name: "Oak Court", area: "Bethnal Green", x: 74, y: 64, units: 8, occupied: 7, rent: 13600, collected: 11900, issues: 1 },
]

function Map({ sel, onSel }: { sel: string; onSel: (id: string) => void }) {
  return (
    <div className="relative h-full min-h-[300px] overflow-hidden bg-sunken">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
        <path d="M-5 70 C 20 60, 35 78, 55 62 S 85 40, 105 48" stroke="color-mix(in oklch, var(--info) 45%, transparent)" strokeWidth="5" fill="none" />
        {[12, 26, 40, 56, 70, 86].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x + 6} y2="100" stroke="var(--border-strong)" strokeWidth="0.6" />
        ))}
        {[14, 28, 44, 58, 76, 90].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y - 4} stroke="var(--border-strong)" strokeWidth="0.6" />
        ))}
        <rect x="16" y="64" width="16" height="14" rx="2" fill="color-mix(in oklch, var(--success) 18%, transparent)" />
      </svg>
      {PROPS.map((p) => {
        const on = p.id === sel
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSel(p.id)}
            aria-pressed={on}
            aria-label={p.name}
            className="group/pin absolute -translate-x-1/2 -translate-y-full outline-none"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <span className={cn("flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-medium whitespace-nowrap shadow-overlay transition-[background-color,color,transform] duration-200 ease-hairline group-hover/pin:-translate-y-0.5 group-focus-visible/pin:ring-2 group-focus-visible/pin:ring-accent", on ? "border-accent bg-accent text-on-accent" : "border-border bg-raised text-fg")}>
              <BuildingIcon className="size-3" />
              {p.name}
              {p.issues ? <span className={cn("grid size-4 place-items-center rounded-full text-[9.5px]", on ? "bg-on-accent/20" : "bg-warning/20 text-warning")}>{p.issues}</span> : null}
            </span>
            <span className={cn("mx-auto block h-2 w-px", on ? "bg-accent" : "bg-border-strong")} />
            {on ? <span className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 animate-[pulse-ring_1.6s_ease-out_infinite] rounded-full bg-accent" /> : null}
          </button>
        )
      })}
    </div>
  )
}

function Ring({ value }: { value: number }) {
  const r = 26
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 64 64" className="size-16 -rotate-90" aria-hidden>
      <circle cx="32" cy="32" r={r} fill="none" stroke="var(--sunken)" strokeWidth="6" />
      <motion.circle cx="32" cy="32" r={r} fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeDasharray={c} animate={{ strokeDashoffset: c * (1 - value) }} transition={{ type: "spring", bounce: 0.12, duration: 0.7 }} />
    </svg>
  )
}

function Portfolio() {
  const [sel, setSel] = React.useState("c")
  const p = PROPS.find((x) => x.id === sel)!
  const total = PROPS.reduce((a, x) => a + x.collected, 0)
  return (
    <div className="grid min-h-[460px] grid-cols-1 md:grid-cols-[1.4fr_1fr]">
      <Map sel={sel} onSel={setSel} />
      <div className="border-t border-border bg-bg p-5 md:border-t-0 md:border-l">
        <p className="text-[11.5px] text-fg-muted">Collected this month, all properties</p>
        <p className="text-[26px] font-semibold tracking-[-0.03em] text-fg">
          <NumberRoll value={total} format={{ style: "currency", currency: "GBP", maximumFractionDigits: 0 }} />
        </p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }} transition={{ duration: 0.25 }} className="mt-5 rounded-2xl border border-border bg-surface p-4 shadow-raised">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Ring value={p.occupied / p.units} />
                <span className="absolute inset-0 grid place-items-center text-[12px] font-semibold text-fg">{Math.round((p.occupied / p.units) * 100)}%</span>
              </div>
              <div>
                <p className="text-[15px] font-medium text-fg">{p.name}</p>
                <p className="text-[12px] text-fg-muted">
                  {p.area} · {p.occupied}/{p.units} units let
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-sunken p-3">
                <p className="text-[11px] text-fg-muted">Rent collected</p>
                <p className="text-[15px] font-semibold text-fg tabular-nums">£{p.collected.toLocaleString("en-GB")}</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg">
                  <motion.div className="h-full rounded-full bg-accent" animate={{ width: `${(p.collected / p.rent) * 100}%` }} transition={{ type: "spring", bounce: 0.12, duration: 0.7 }} />
                </div>
              </div>
              <div className="rounded-xl bg-sunken p-3">
                <p className="text-[11px] text-fg-muted">Open repairs</p>
                <p className={cn("text-[15px] font-semibold tabular-nums", p.issues ? "text-warning" : "text-success")}>{p.issues || "None"}</p>
                <p className="mt-1 text-[10.5px] text-fg-subtle">{p.issues ? "Oldest 2 days" : "All clear"}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <p className="mt-4 text-[11.5px] text-fg-subtle">Click a building on the map.</p>
      </div>
    </div>
  )
}

function TenantApp() {
  const [paid, setPaid] = React.useState(false)
  return (
    <div className="flex h-full flex-col px-4 pt-2 pb-8">
      <p className="text-[12px] text-fg-muted">Flat 4B · Canal House</p>
      <p className="text-[18px] font-semibold tracking-[-0.02em] text-fg">Hi Jordan</p>
      <div className={cn("mt-4 rounded-2xl p-4 shadow-ink transition-colors duration-300", paid ? "bg-success text-white" : "bg-ink text-on-ink")}>
        <p className="text-[11.5px] opacity-70">{paid ? "Paid, thank you" : "Rent due in 3 days"}</p>
        <p className="mt-1 text-[30px] font-semibold tracking-[-0.03em]">£1,700.00</p>
        <p className="text-[11.5px] opacity-70">{paid ? "Receipt sent to your email" : "1 October · direct debit off"}</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          [WrenchIcon, "Report a repair"],
          [KeyRoundIcon, "Guest access"],
          [DropletsIcon, "Utilities"],
          [ZapIcon, "Meter reading"],
        ].map(([Icon, l]) => {
          const I = Icon as typeof WrenchIcon
          return (
            <div key={l as string} className="rounded-xl border border-border bg-surface p-3 shadow-raised">
              <I className="size-4 text-accent-fg" />
              <p className="mt-2 text-[12px] font-medium text-fg">{l as string}</p>
            </div>
          )
        })}
      </div>
      <div className="mt-3 rounded-xl border border-border bg-surface p-3 text-[12px] shadow-raised">
        <p className="font-medium text-fg">Boiler service</p>
        <p className="text-fg-muted">Engineer booked Thu 10:00 to 12:00</p>
      </div>
      <button type="button" onClick={() => setPaid((x) => !x)} className={cn("mt-auto h-12 rounded-2xl text-[15px] font-semibold shadow-ink outline-none active:translate-y-px focus-visible:ring-2 focus-visible:ring-accent", paid ? "border border-border bg-surface text-fg" : "bg-accent text-on-accent")}>
        {paid ? "View receipt" : "Pay rent now"}
      </button>
    </div>
  )
}

function Repairs() {
  const cols = [
    { t: "Reported", c: [["Leaking tap", "Linden 3A"], ["Broken buzzer", "Oak Court"]] },
    { t: "Booked", c: [["Boiler service", "Canal 4B"]] },
    { t: "Done", c: [["Window seal", "Mill 2C"]] },
  ]
  return (
    <div className="grid w-full grid-cols-3 gap-2">
      {cols.map((col) => (
        <div key={col.t} className="rounded-xl bg-sunken p-2">
          <p className="px-1 pb-1.5 text-[10.5px] font-medium text-fg-muted">{col.t}</p>
          <div className="space-y-1.5">
            {col.c.map(([a, b]) => (
              <div key={a} className="rounded-lg border border-border bg-raised p-2 shadow-raised">
                <p className="text-[11px] font-medium text-fg">{a}</p>
                <p className="text-[10px] text-fg-muted">{b}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AtlasTemplate() {
  const reduce = useReducedMotion()
  const rise = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 14, filter: "blur(6px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay: d, ease: [0.2, 0, 0, 1] as const } })
  return (
    <TemplateShell name="Atlas" kind="Property management" material="glass" className="tpl-atlas">
      <FloatingNav
        brand={<Brand />}
        links={[
          { label: "Owners", href: "#owners" },
          { label: "Tenants", href: "#tenants" },
          { label: "Repairs", href: "#product" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ]}
        cta={{ label: "Start free" }}
      />
      <main>
        <section className="relative isolate overflow-hidden">
          <div aria-hidden className="light-spot absolute inset-0 -z-10" />
          <div className="mx-auto max-w-7xl px-4 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
            <motion.p {...rise(0)} className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1 pr-3 pl-1.5 text-[12.5px] text-fg-muted shadow-xs">
              <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-on-accent">For landlords</span>
              From 1 flat to 1,000 units
            </motion.p>
            <motion.h1 {...rise(0.08)} className="mx-auto mt-6 max-w-4xl text-[2.8rem] leading-[1] font-medium tracking-[-0.05em] text-balance text-fg sm:text-6xl lg:text-[5.2rem] lg:leading-[0.95]">
              Every property,
              <br />
              <span className="text-lit">one calm screen.</span>
            </motion.h1>
            <motion.p {...rise(0.16)} className="mx-auto mt-6 max-w-2xl text-lg leading-[1.6] text-fg-muted">
              Rent, repairs, tenants and paperwork for your whole portfolio. Tenants pay in the app, contractors get booked automatically, and you see it all on one map.
            </motion.p>
            <motion.div {...rise(0.24)} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg">
                Add your first property <ArrowRightIcon />
              </Button>
              <Button size="lg" variant="outline">
                See a live portfolio
              </Button>
            </motion.div>
          </div>
          <motion.div id="owners" initial={reduce ? false : { opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.35, ease: [0.2, 0, 0, 1] }} className="mx-auto mt-16 max-w-6xl scroll-mt-24 px-4 pb-10 sm:px-6 lg:px-8">
            <DeviceFrame device="browser" url="app.atlas.homes/portfolio">
              <Portfolio />
            </DeviceFrame>
          </motion.div>
        </section>

        <section id="tenants" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">For tenants</p>
              <h2 className="mt-3 max-w-xl text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance text-fg sm:text-5xl">An app your tenants will actually open.</h2>
              <p className="mt-4 max-w-md text-[1.0625rem] leading-[1.65] text-fg-muted">Pay rent in one tap, report a repair with a photo, let the plumber in while at work. Fewer calls for you, faster fixes for them.</p>
              <dl className="mt-10 grid max-w-md grid-cols-2 gap-6">
                {[
                  [97, "%", "rent paid on time"],
                  [62, "%", "fewer tenant calls"],
                ].map(([v, u, l]) => (
                  <div key={l as string} className="rounded-2xl border border-border bg-surface p-5 shadow-raised">
                    <dt className="text-4xl font-medium tracking-[-0.04em] text-fg">
                      <NumberRoll value={v as number} />
                      {u}
                    </dt>
                    <dd className="mt-1 text-[13px] text-fg-muted">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div style={{ transform: "translate3d(calc(var(--sx) * -8px), calc(var(--sy) * -8px), 0)" }}>
              <DeviceFrame device="phone" time="08:12">
                <TenantApp />
              </DeviceFrame>
            </div>
          </div>
        </section>

        <div id="product" className="scroll-mt-24">
          <BentoLive
            eyebrow="Everything else"
            title="The admin, handled."
            items={[
              { title: "Repairs that book themselves", body: "Tenant reports, Atlas assigns your contractor and books a slot. You approve the quote.", visual: <Repairs />, span: 4 },
              { title: "Rent reconciled", body: "Bank feeds match every payment to a unit.", visual: <div className="w-full space-y-1.5 text-[12px]">{[["Canal 4B", "£1,700", true], ["Linden 3A", "£1,450", true], ["Oak 1", "£1,700", false]].map(([u, a, ok]) => <div key={u as string} className="flex items-center justify-between rounded-lg bg-sunken px-3 py-2"><span className="text-fg">{u as string}</span><span className={cn("flex items-center gap-1 font-medium tabular-nums", ok ? "text-success" : "text-warning")}>{ok ? <CheckIcon className="size-3" strokeWidth={3} /> : null}{a as string}</span></div>)}</div>, span: 2 },
              { title: "Compliance on a calendar", body: "Gas safety, EPCs and deposits, with reminders before anything lapses.", visual: <div className="w-full space-y-1.5 text-[12px]">{[["Gas safety · Linden", "in 12 days"], ["EPC · Oak Court", "in 3 months"], ["Deposit · Mill 2C", "protected"]].map(([a, b]) => <div key={a} className="flex justify-between rounded-lg border border-border bg-raised px-3 py-2 shadow-raised"><span className="text-fg">{a}</span><span className="text-fg-muted">{b}</span></div>)}</div>, span: 3 },
              { title: "Owner statements in one click", body: "Monthly statements for every owner, sent automatically as PDF.", visual: <div className="grid w-full grid-cols-3 gap-2">{["Sep", "Aug", "Jul"].map((m, k) => <div key={m} className="aspect-[3/4] rounded-lg border border-border bg-raised p-2 shadow-raised" style={{ transform: `rotate(${(k - 1) * 3}deg)` }}><p className="text-[10px] font-medium text-fg">{m} statement</p>{[70, 50, 60, 40].map((w, j) => <div key={j} className="mt-1.5 h-1 rounded bg-sunken" style={{ width: `${w}%` }} />)}</div>)}</div>, span: 3 },
            ]}
          />
        </div>
        <div id="pricing" className="scroll-mt-24">
          <PricingPlans
            title="Priced per unit. Cheaper than one late payment."
            unit="/ unit / mo"
            per="per unit"
            description="Every plan includes the tenant app. Switch or cancel any month."
            currency="GBP"
            plans={[
              { name: "Landlord", blurb: "Up to 5 units.", monthly: 0, yearly: 0, cta: "Start free", features: ["Rent tracking", "Tenant app", "Repair requests", { label: "Contractor booking", included: false }, { label: "Owner statements", included: false }] },
              { name: "Portfolio", blurb: "For growing landlords and small agents.", monthly: 3, yearly: 2, cta: "Try free for 30 days", featured: true, features: ["Per unit, per month", "Bank feed reconciliation", "Contractor booking", "Compliance calendar", "Owner statements"] },
              { name: "Agency", blurb: "For letting agents with 500+ units.", monthly: 2, yearly: 1, cta: "Talk to us", features: ["Volume pricing per unit", "Team roles", "Your branding in the app", "API and exports", "Migration done for you"] },
            ]}
          />
        </div>
        <div id="faq" className="scroll-mt-24">
          <FaqSection
            items={[
              { q: "How long does it take to move my portfolio over?", a: "Upload a spreadsheet of properties and tenants and you are live the same day. Agencies over 500 units get a free migration." },
              { q: "Do tenants have to download an app?", a: "No. They can pay and report repairs from a link in their email. Most do download it after the first repair goes well." },
              { q: "Can I use my own contractors?", a: "Yes. Add your usual plumber and electrician; Atlas books them first and only suggests others if they are unavailable." },
              { q: "Is my tenants' data safe?", a: "Data is encrypted, stored in the UK, and tenants only ever see their own home." },
            ]}
          />
        </div>
        <CtaBand
          title={
            <>
              Your portfolio,
              <br />
              <span className="text-lit">off your weekends.</span>
            </>
          }
          description="Add a property in two minutes. Free for up to 5 units, forever."
          button="Start free"
          success="Check your inbox"
          note="Sample template by MiniDev. Atlas is a fictional product."
        />
      </main>
      <TemplateFooter brand={<Brand />} note="Property management on one calm screen. A MiniDev template; Atlas is a fictional product." />
    </TemplateShell>
  )
}
