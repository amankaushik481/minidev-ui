"use client"
import * as React from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { ArrowRightIcon, CalendarClockIcon, CreditCardIcon, LockIcon, ShieldCheckIcon, UsersIcon, WalletIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { TemplateFooter, TemplateShell } from "@/components/templates/template-bar"
import { PonteApp, useLiveRate } from "@/components/templates/ponte-app"
import { FloatingNav } from "@/registry/blocks/floating-nav"
import { DeviceFrame } from "@/registry/blocks/device-frame"
import { BentoLive } from "@/registry/blocks/bento-live"
import { ScrollStory } from "@/registry/blocks/scroll-story"
import { PricingPlans } from "@/registry/blocks/pricing-plans"
import { FaqSection } from "@/registry/blocks/faq-section"
import { CtaBand } from "@/registry/blocks/cta-band"
import { Button } from "@/registry/ui/button"
import { NumberRoll } from "@/registry/ui/number-roll"

const Brand = () => (
  <span className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em] text-fg">
    <span className="grid size-7 place-items-center rounded-lg bg-accent text-on-accent shadow-ink">
      <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
        <path d="M2 11c2-4 4-6 6-6s4 2 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M2 11h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
    Ponte
  </span>
)

/* ── hero ─────────────────────────────────────────────────────────────── */
function Hero() {
  const reduce = useReducedMotion()
  const rise = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 14, filter: "blur(6px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay: d, ease: [0.2, 0, 0, 1] as const } })
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="light-spot absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid [--grid-size:56px] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,black_10%,transparent_70%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pt-16 pb-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:pt-24">
        <div>
          <motion.p {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1 pr-3 pl-1.5 text-[12.5px] text-fg-muted shadow-xs">
            <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-on-accent">New</span>
            UK to Brazil in seconds, not days
          </motion.p>
          <motion.h1 {...rise(0.08)} className="mt-6 text-[2.9rem] leading-[1] font-medium tracking-[-0.05em] text-balance text-fg sm:text-6xl lg:text-[5.4rem] lg:leading-[0.94]">
            Money home
            <br />
            <span className="text-lit">in 12 seconds.</span>
          </motion.h1>
          <motion.p {...rise(0.16)} className="mt-6 max-w-lg text-lg leading-[1.6] text-fg-muted">
            Send pounds, euros or dollars to any Brazilian bank or Pix key at the real exchange rate. One flat fee, shown before you pay, tracked to the second.
          </motion.p>
          <motion.div {...rise(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg">
              Open a free account <ArrowRightIcon />
            </Button>
            <Button size="lg" variant="outline">
              See today&apos;s rates
            </Button>
          </motion.div>
          <motion.ul {...rise(0.3)} className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              ["11.4s", "median delivery"],
              ["£0.99", "flat fee"],
              ["0%", "rate markup"],
            ].map(([a, b]) => (
              <li key={b}>
                <p className="text-2xl font-medium tracking-[-0.03em] text-fg tabular-nums">{a}</p>
                <p className="text-[12.5px] text-fg-muted">{b}</p>
              </li>
            ))}
          </motion.ul>
        </div>
        <motion.div initial={reduce ? false : { opacity: 0, y: 50, rotate: 4 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1.1, delay: 0.3, ease: [0.2, 0, 0, 1] }} className="relative">
          <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 size-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-25 blur-[100px]" />
          <div style={{ transform: "translate3d(calc(var(--sx) * -8px), calc(var(--sy) * -8px), 0)" }}>
            <DeviceFrame device="phone" time="18:24">
              <PonteApp />
            </DeviceFrame>
          </div>
          <div className="absolute top-24 -left-2 hidden animate-[rise-in_600ms_var(--ease-hairline)_1.4s_both] rounded-2xl border border-border bg-raised p-3 shadow-overlay sm:block lg:-left-10">
            <p className="text-[11px] text-fg-muted">Mãe received</p>
            <p className="text-[15px] font-semibold text-fg tabular-nums">R$ 1.814,20</p>
            <p className="mt-0.5 text-[10.5px] text-success">Pix · 11.4s</p>
          </div>
          <div className="absolute right-0 bottom-28 hidden animate-[rise-in_600ms_var(--ease-hairline)_1.7s_both] items-center gap-2 rounded-2xl border border-border bg-raised px-3 py-2.5 shadow-overlay sm:flex lg:-right-6">
            <ShieldCheckIcon className="size-4 text-accent-fg" />
            <p className="text-[12px] font-medium text-fg">Protected end to end</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── live rates strip ─────────────────────────────────────────────────── */
const PAIRS: [string, string, number][] = [
  ["GBP", "BRL", 7.2841],
  ["EUR", "BRL", 6.1932],
  ["USD", "BRL", 5.4418],
  ["GBP", "EUR", 1.1762],
  ["EUR", "USD", 1.1381],
  ["GBP", "USD", 1.3386],
]
function RateChip({ from, to, base }: { from: string; to: string; base: number }) {
  const r = useLiveRate(base, base * 0.0006)
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-raised">
      <span className="font-mono text-[12px] text-fg-muted">
        {from} → {to}
      </span>
      <span className="text-[17px] font-semibold tracking-[-0.02em] text-fg">
        <NumberRoll value={r} trend format={{ minimumFractionDigits: 4, maximumFractionDigits: 4 }} />
      </span>
    </div>
  )
}
function Rates() {
  return (
    <section id="rates" className="scroll-mt-24 py-10">
      <div className="group/m relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-[marquee_50s_linear_infinite] gap-3 group-hover/m:[animation-play-state:paused] motion-reduce:animate-none">
          {[...PAIRS, ...PAIRS].map(([a, b, r], i) => (
            <RateChip key={i} from={a} to={b} base={r} />
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-[12px] text-fg-subtle">Mid-market rates, updated every few seconds. Hover to pause.</p>
    </section>
  )
}

/* ── compare ──────────────────────────────────────────────────────────── */
function Compare() {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [send, setSend] = React.useState(1000)
  const mid = 7.2841
  const rows = [
    { name: "Ponte", fee: 0.99, markup: 0, us: true },
    { name: "Typical transfer app", fee: 2.49, markup: 0.012 },
    { name: "High street bank", fee: 15, markup: 0.034 },
  ].map((r) => ({ ...r, get: Math.max(0, (send - r.fee) * mid * (1 - r.markup)) }))
  const max = rows[0].get || 1
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div>
          <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">The honest maths</p>
          <h2 className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance text-fg sm:text-5xl">Your family gets more. Every time.</h2>
          <p className="mt-4 max-w-md text-[1.0625rem] leading-[1.65] text-fg-muted">Banks hide their cut in the exchange rate. We show one fee and use the rate you see on Google. Drag to try your amount.</p>
          <div className="mt-8 max-w-sm">
            <div className="flex items-baseline justify-between">
              <label htmlFor="cmp" className="text-[13px] font-medium text-fg">You send</label>
              <span className="text-2xl font-medium tracking-[-0.03em] text-fg">
                <NumberRoll value={send} format={{ style: "currency", currency: "GBP", maximumFractionDigits: 0 }} />
              </span>
            </div>
            <input id="cmp" type="range" min={100} max={5000} step={50} value={send} onChange={(e) => setSend(Number(e.target.value))} className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-sunken accent-[var(--accent)]" />
          </div>
        </div>
        <div ref={ref} className="space-y-3">
          {rows.map((r, i) => (
            <div key={r.name} className={cn("rounded-2xl border p-5", r.us ? "border-accent-line bg-surface shadow-raised" : "border-border bg-surface/60")}>
              <div className="flex items-center justify-between gap-4">
                <p className={cn("text-[14px] font-medium", r.us ? "text-fg" : "text-fg-muted")}>{r.name}</p>
                <p className={cn("text-xl font-semibold tracking-[-0.02em] tabular-nums", r.us ? "text-accent-fg" : "text-fg")}>
                  R$ <NumberRoll value={Math.round(r.get)} />
                </p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-sunken">
                <motion.div className={cn("h-full rounded-full", r.us ? "bg-accent" : "bg-fg-subtle/50")} initial={{ width: 0 }} animate={{ width: inView ? `${(r.get / max) * 100}%` : 0 }} transition={{ type: "spring", bounce: 0.12, duration: 0.9, delay: i * 0.1 }} />
              </div>
              <p className="mt-2 text-[12px] text-fg-subtle">
                Fee £{r.fee.toFixed(2)} · rate markup {(r.markup * 100).toFixed(1)}%{!r.us ? ` · they lose R$ ${Math.round(rows[0].get - r.get).toLocaleString("pt-BR")}` : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── bento visuals ────────────────────────────────────────────────────── */
function CardVisual() {
  return (
    <div className="mx-auto w-full max-w-xs [perspective:900px]">
      <div className="relative aspect-[1.586] rotate-x-[12deg] -rotate-y-[14deg] overflow-hidden rounded-2xl bg-ink p-5 text-on-ink shadow-ink transition-transform duration-500 ease-hairline hover:rotate-0">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_var(--lx)_var(--ly),oklch(1_0_0/0.25),transparent_45%)] bg-fixed" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold">Ponte</span>
            <span className="h-6 w-8 rounded-md bg-[linear-gradient(135deg,oklch(0.85_0.08_85),oklch(0.65_0.08_70))]" />
          </div>
          <div>
            <p className="font-mono text-[13px] tracking-[0.12em] opacity-80">•••• •••• •••• 4821</p>
            <p className="mt-1 text-[11px] opacity-60">ANA RIBEIRO · 09/29</p>
          </div>
        </div>
      </div>
    </div>
  )
}
function Balances() {
  const rows: [string, number, string][] = [
    ["GBP", 2480.2, "Pound"],
    ["BRL", 1814.2, "Real"],
    ["EUR", 312.5, "Euro"],
  ]
  return (
    <ul className="w-full space-y-2">
      {rows.map(([c, v, n]) => (
        <li key={c} className="flex items-center justify-between rounded-xl border border-border bg-raised px-3.5 py-3 shadow-raised">
          <span className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-accent-soft font-mono text-[10.5px] font-semibold text-accent-fg">{c}</span>
            <span className="text-[13px] text-fg-muted">{n}</span>
          </span>
          <span className="text-[15px] font-semibold text-fg tabular-nums">{v.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</span>
        </li>
      ))}
    </ul>
  )
}
function Iconic({ icon: Icon, lines }: { icon: typeof LockIcon; lines: string[] }) {
  return (
    <div className="w-full">
      <span className="grid size-12 place-items-center rounded-2xl bg-ink text-on-ink shadow-ink">
        <Icon className="size-5" />
      </span>
      <ul className="mt-5 space-y-2">
        {lines.map((l) => (
          <li key={l} className="flex items-center gap-2 text-[13px] text-fg">
            <span className="size-1.5 rounded-full bg-accent" />
            {l}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PonteTemplate() {
  return (
    <TemplateShell name="Ponte" kind="Fintech app" material="metal" className="tpl-ponte">
      <FloatingNav
        brand={<Brand />}
        links={[
          { label: "Send", href: "#how" },
          { label: "Rates", href: "#rates" },
          { label: "Card", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ]}
        cta={{ label: "Open account" }}
      />
      <main>
        <Hero />
        <Rates />
        <Compare />
        <div id="features" className="scroll-mt-24">
          <BentoLive
            eyebrow="One account"
            title="Hold, spend and send in three currencies."
            items={[
              { title: "A card that spends like a local", body: "Pay in reais in Brazil and pounds at home. No foreign card fees.", visual: <CardVisual />, span: 4, tall: true },
              { title: "Balances in GBP, BRL, EUR", body: "Convert when the rate suits you, not when the bank does.", visual: <Balances />, span: 2, tall: true },
              { title: "Schedule the monthly transfer", body: "Set it once. We send on payday at the best rate of the day.", visual: <Iconic icon={CalendarClockIcon} lines={["Every 25th", "Best rate that day", "Pause any time"]} />, span: 2 },
              { title: "Family on one account", body: "Add up to 5 recipients who get Pix in seconds.", visual: <Iconic icon={UsersIcon} lines={["Mãe · Itaú", "Pedro · Nubank", "Clara · Pix key"]} />, span: 2 },
              { title: "Safe by default", body: "Face ID for every transfer, instant card freeze, 24/7 support.", visual: <Iconic icon={LockIcon} lines={["Biometric approval", "Instant freeze", "Human support, 24/7"]} />, span: 2 },
            ]}
          />
        </div>
        <div id="how" className="scroll-mt-24">
          <ScrollStory
            title="From your phone to their Pix."
            steps={[
              { kicker: "01 · Choose", title: "Pick who and how much.", body: "Any Brazilian bank account or Pix key. The rate and fee are locked the moment you confirm.", visual: <Iconic icon={WalletIcon} lines={["£250.00 to Mãe", "Rate locked: 7.2841", "Fee: £0.99"]} /> },
              { kicker: "02 · Confirm", title: "Approve with your face.", body: "One tap and Face ID. Your money moves on regulated rails with our partner banks.", visual: <Iconic icon={ShieldCheckIcon} lines={["Face ID approved", "Screened in 0.3s", "Sent to partner"]} /> },
              { kicker: "03 · Arrive", title: "They get it before you put the phone down.", body: "Pix delivers in seconds, even on Sundays. You both get a notification with the receipt.", visual: <Iconic icon={CreditCardIcon} lines={["Delivered in 11.4s", "Receipt sent to both", "R$ 1.814,20 in Itaú"]} /> },
            ]}
          />
        </div>
        <div id="pricing" className="scroll-mt-24">
          <PricingPlans
            title="One flat fee. No surprises."
            description="Every plan uses the real mid-market rate. You only choose how often you send."
            currency="GBP"
            unit="/ mo"
            per=""
            yearlyBadge="2 months free"
            plans={[
              { name: "Personal", blurb: "For sending home now and then.", monthly: 0, yearly: 0, cta: "Open free account", features: ["£0.99 per transfer", "Mid-market rate", "Pix in seconds", { label: "Scheduled transfers", included: false }, { label: "Multi-currency card", included: false }] },
              { name: "Plus", blurb: "For the monthly transfer home.", monthly: 4, yearly: 3, cta: "Try Plus free", featured: true, features: ["Free transfers up to £2,000", "Scheduled transfers", "Multi-currency card", "5 family recipients", "Priority support"] },
              { name: "Business", blurb: "For payroll and suppliers in Brazil.", monthly: 19, yearly: 16, cta: "Talk to us", features: ["Bulk payouts by CSV", "API access", "Team roles", "Dedicated manager", "Invoices in BRL"] },
            ]}
          />
        </div>
        <div id="faq" className="scroll-mt-24">
          <FaqSection
            description="Our team answers in English and Portuguese, 24 hours a day."
            items={[
              { q: "How can it arrive in 12 seconds?", a: "We send through Pix, Brazil's instant payment system, from a local partner bank. Your side is instant too, so the only wait is the screening, which takes a fraction of a second." },
              { q: "What rate do I get?", a: "The mid-market rate, the one you see on Google, with no markup. The fee is shown separately before you pay." },
              { q: "Is my money safe?", a: "Funds are held with regulated partner banks and kept separate from company money. Every transfer needs your biometric approval." },
              { q: "Can my family send money back?", a: "Yes. The app works both ways, BRL to GBP or EUR, with the same flat fee." },
              { q: "Is there a sending limit?", a: "Up to £10,000 per transfer and £50,000 a month on Personal. Business limits are set with your account manager." },
            ]}
          />
        </div>
        <CtaBand
          title={
            <>
              Send your first transfer
              <br />
              <span className="text-lit">with no fee.</span>
            </>
          }
          description="Open an account in two minutes. Your first transfer home is on us."
          button="Get the app link"
          success="Link sent"
          note="Sample template by MiniDev. Ponte is a fictional product."
        />
      </main>
      <TemplateFooter brand={<Brand />} note="Money home in seconds. A MiniDev template; Ponte is fictional and not a regulated service." />
    </TemplateShell>
  )
}
