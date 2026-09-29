"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRightIcon, CalendarIcon, CheckIcon, ClockIcon, MapPinIcon, SearchIcon, StarIcon, StethoscopeIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { TemplateFooter, TemplateShell } from "@/components/templates/template-bar"
import { FloatingNav } from "@/registry/blocks/floating-nav"
import { DeviceFrame } from "@/registry/blocks/device-frame"
import { ScrollStory } from "@/registry/blocks/scroll-story"
import { SocialProofWall } from "@/registry/blocks/social-proof-wall"
import { FaqSection } from "@/registry/blocks/faq-section"
import { CtaBand } from "@/registry/blocks/cta-band"
import { Button } from "@/registry/ui/button"
import { NumberRoll } from "@/registry/ui/number-roll"

const Brand = () => (
  <span className="flex items-center gap-2 text-[16px] font-semibold tracking-[-0.02em] text-fg">
    <span className="grid size-7 place-items-center rounded-full bg-accent text-on-accent">
      <StethoscopeIcon className="size-3.5" />
    </span>
    <span className="font-serif-display text-[19px] font-normal">Kura</span>
  </span>
)

type Doc = { name: string; spec: string; clinic: string; area: string; fee: number; rating: number; reviews: number; status: "in" | "soon" | "off"; wait: number; slots: string[]; initials: string }
const DOCS: Doc[] = [
  { name: "Dr. Mehvish Qadri", spec: "Dermatologist", clinic: "Qadri Skin Clinic", area: "Rajbagh", fee: 500, rating: 4.9, reviews: 412, status: "in", wait: 12, slots: ["4:30", "4:45", "5:15", "6:00"], initials: "MQ" },
  { name: "Dr. Irfan Shah", spec: "Dermatologist", clinic: "Valley Care", area: "Lal Chowk", fee: 400, rating: 4.7, reviews: 238, status: "soon", wait: 35, slots: ["5:30", "6:15", "7:00"], initials: "IS" },
  { name: "Dr. Sana Bhat", spec: "Dermatologist", clinic: "Bhat Clinic", area: "Hyderpora", fee: 350, rating: 4.8, reviews: 305, status: "off", wait: 0, slots: ["Tomorrow 10:00", "10:30"], initials: "SB" },
]
const STATUS = {
  in: { label: "In clinic now", dot: "bg-success", text: "text-success" },
  soon: { label: "Arriving 5:00", dot: "bg-warning", text: "text-warning" },
  off: { label: "Back tomorrow", dot: "bg-fg-subtle", text: "text-fg-muted" },
} as const

/* ── hero: search + live board ─────────────────────────────────────────── */
function DoctorCard({ d, picked, onPick }: { d: Doc; picked: string | null; onPick: (s: string) => void }) {
  const s = STATUS[d.status]
  const [wait, setWait] = React.useState(d.wait)
  React.useEffect(() => {
    if (d.status !== "in") return
    const t = setInterval(() => setWait((w) => Math.max(4, w + (Math.random() > 0.5 ? 1 : -1))), 3000)
    return () => clearInterval(t)
  }, [d.status])
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-raised">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-[13px] font-semibold text-accent-fg">{d.initials}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[14.5px] font-medium text-fg">{d.name}</p>
            <p className="shrink-0 text-[14px] font-semibold text-fg tabular-nums">₹{d.fee}</p>
          </div>
          <p className="truncate text-[12.5px] text-fg-muted">
            {d.clinic} · {d.area}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]">
            <span className={cn("inline-flex items-center gap-1.5 font-medium", s.text)}>
              <span className="relative flex size-2">
                {d.status === "in" ? <span className={cn("absolute inset-0 animate-ping rounded-full opacity-60", s.dot)} /> : null}
                <span className={cn("relative size-2 rounded-full", s.dot)} />
              </span>
              {s.label}
            </span>
            {d.status === "in" ? (
              <span className="inline-flex items-center gap-1 text-fg-muted">
                <ClockIcon className="size-3" /> <NumberRoll value={wait} /> min wait
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1 text-fg-muted">
              <StarIcon className="size-3 fill-current text-warning" /> {d.rating} ({d.reviews})
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {d.slots.map((t) => {
          const on = picked === `${d.name}-${t}`
          return (
            <button
              key={t}
              type="button"
              onClick={() => onPick(`${d.name}-${t}`)}
              aria-pressed={on}
              className={cn(
                "h-8 rounded-lg border px-3 text-[12.5px] font-medium tabular-nums outline-none transition-colors duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent",
                on ? "border-accent bg-accent text-on-accent shadow-ink" : "border-border bg-bg text-fg hover:border-accent-line hover:bg-accent-soft"
              )}
            >
              {t}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const [picked, setPicked] = React.useState<string | null>(null)
  const [booked, setBooked] = React.useState(false)
  const rise = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 14, filter: "blur(6px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay: d, ease: [0.2, 0, 0, 1] as const } })
  const [doc, time] = picked ? picked.split("-") : []
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="light-spot absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-7xl gap-14 px-4 pt-16 pb-16 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8 lg:pt-24">
        <div className="lg:pt-6">
          <motion.p {...rise(0)} className="text-[13px] font-medium text-accent-fg">1,240 doctors across Srinagar, live</motion.p>
          <motion.h1 {...rise(0.08)} className="font-serif-display mt-4 text-[3.2rem] leading-[1] tracking-[-0.03em] text-balance text-fg sm:text-7xl lg:text-[5.6rem]">
            The right doctor,
            <br />
            <em className="text-lit not-italic sm:italic">today.</em>
          </motion.h1>
          <motion.p {...rise(0.16)} className="mt-6 max-w-md text-lg leading-[1.6] text-fg-muted">
            See who is actually in clinic, how long the wait is, and what it costs. Book a slot in two taps. No calls, no three-hour queues.
          </motion.p>
          <motion.form {...rise(0.24)} onSubmit={(e) => e.preventDefault()} className="mt-9 flex max-w-lg flex-col gap-1.5 rounded-2xl border border-border bg-raised p-1.5 shadow-raised sm:flex-row sm:items-center">
            <label className="flex h-11 flex-1 items-center gap-2.5 px-3 text-[14px]">
              <SearchIcon className="size-4 shrink-0 text-fg-subtle" />
              <input defaultValue="Dermatologist" aria-label="Specialty" className="min-w-0 flex-1 bg-transparent text-fg outline-none" />
            </label>
            <span className="hidden h-6 w-px bg-border sm:block" />
            <label className="flex h-11 flex-1 items-center gap-2.5 px-3 text-[14px]">
              <MapPinIcon className="size-4 shrink-0 text-fg-subtle" />
              <input defaultValue="Srinagar" aria-label="Area" className="min-w-0 flex-1 bg-transparent text-fg outline-none" />
            </label>
            <Button size="lg" variant="accent" type="submit">
              Find
            </Button>
          </motion.form>
          <motion.div {...rise(0.3)} className="mt-6 flex flex-wrap gap-2">
            {["Paediatrician", "Dentist", "Gynaecologist", "ENT", "Physio"].map((s) => (
              <span key={s} className="rounded-full border border-border bg-surface px-3 py-1.5 text-[12.5px] text-fg-muted">
                {s}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div initial={reduce ? false : { opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.2, 0, 0, 1] }} className="relative">
          <div className="rounded-[28px] border border-border bg-bg/60 p-3 shadow-lg sm:p-4">
            <div className="flex items-center justify-between px-1 pb-3">
              <p className="text-[13px] font-medium text-fg">Dermatologists near Rajbagh</p>
              <p className="text-[12px] text-fg-muted">Sorted by wait</p>
            </div>
            <div className="space-y-2.5">
              {DOCS.map((d) => (
                <DoctorCard key={d.name} d={d} picked={picked} onPick={(s) => { setPicked(s); setBooked(false) }} />
              ))}
            </div>
            <AnimatePresence>
              {picked ? (
                <motion.div
                  initial={{ opacity: 0, y: 12, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 8, height: 0 }}
                  transition={{ type: "spring", bounce: 0.16, duration: 0.5 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 flex items-center gap-3 rounded-2xl bg-ink p-3 pl-4 text-on-ink shadow-ink">
                    <CalendarIcon className="size-4 shrink-0 opacity-70" />
                    <p className="min-w-0 flex-1 truncate text-[13px]">
                      {booked ? "Booked. We'll text you 30 minutes before." : `${doc?.replace("Dr. ", "Dr ")}, ${time} today`}
                    </p>
                    <button
                      type="button"
                      onClick={() => setBooked(true)}
                      disabled={booked}
                      className={cn("inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl px-3.5 text-[13px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-accent", booked ? "bg-success text-white" : "bg-accent text-on-accent")}
                    >
                      {booked ? <CheckIcon className="size-4" strokeWidth={3} /> : null}
                      {booked ? "Confirmed" : "Book · ₹0 now"}
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── numbers band ───────────────────────────────────────────────────────── */
function Numbers() {
  const items = [
    { v: 1240, l: "doctors listed", f: {} },
    { v: 38, l: "minutes saved per visit", f: {} },
    { v: 212, l: "clinics on Kura", f: {} },
    { v: 4.8, l: "average rating", f: { minimumFractionDigits: 1 } },
  ]
  return (
    <section className="border-y border-border bg-surface/50">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map((it) => (
          <div key={it.l} className="py-10 lg:px-6">
            <dt className="text-[13px] text-fg-muted">{it.l}</dt>
            <dd className="font-serif-display mt-1 text-5xl tracking-[-0.03em] text-fg">
              <NumberRoll value={it.v} format={it.f as Intl.NumberFormatOptions} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* ── for clinics: the dashboard ────────────────────────────────────────── */
function ClinicDashboard() {
  const [queue, setQueue] = React.useState([
    { n: "Aamir Lone", t: "4:30", s: "In room" },
    { n: "Rukhsana Mir", t: "4:45", s: "Waiting" },
    { n: "Faisal Dar", t: "5:00", s: "Waiting" },
    { n: "Nazia Wani", t: "5:15", s: "On the way" },
  ])
  const next = () => setQueue((q) => (q.length > 1 ? [{ ...q[1], s: "In room" }, ...q.slice(2), { n: "Walk-in", t: "5:30", s: "Waiting" }] : q))
  return (
    <div className="grid min-h-[420px] grid-cols-1 sm:grid-cols-[180px_1fr]">
      <aside className="hidden border-r border-border bg-surface p-3 sm:block">
        <p className="px-2 text-[13px] font-semibold text-fg">Qadri Skin Clinic</p>
        <nav className="mt-4 space-y-0.5 text-[12.5px]">
          {["Today", "Patients", "Doctors", "Payments", "Settings"].map((l, i) => (
            <p key={l} className={cn("rounded-lg px-2 py-1.5", i === 0 ? "bg-sunken font-medium text-fg" : "text-fg-muted")}>
              {l}
            </p>
          ))}
        </nav>
      </aside>
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2.5">
          {[
            ["Booked today", "34"],
            ["Avg wait", "12m"],
            ["No-shows", "1"],
          ].map(([a, b]) => (
            <div key={a} className="rounded-xl border border-border bg-surface p-3 shadow-raised">
              <p className="text-[11px] text-fg-muted">{a}</p>
              <p className="mt-0.5 text-xl font-semibold text-fg tabular-nums">{b}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[13px] font-medium text-fg">Live queue</p>
          <Button size="xs" onClick={next}>
            Call next patient
          </Button>
        </div>
        <ul className="mt-2.5 space-y-1.5">
          <AnimatePresence initial={false}>
            {queue.map((p) => (
              <motion.li
                layout
                key={p.n + p.t}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", bounce: 0.16, duration: 0.45 }}
                className={cn("flex items-center gap-3 rounded-xl border px-3 py-2.5 text-[13px]", p.s === "In room" ? "border-accent-line bg-accent-soft" : "border-border bg-surface")}
              >
                <span className="font-mono text-[11.5px] text-fg-muted tabular-nums">{p.t}</span>
                <span className="flex-1 font-medium text-fg">{p.n}</span>
                <span className={cn("text-[12px]", p.s === "In room" ? "font-medium text-accent-fg" : "text-fg-muted")}>{p.s}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  )
}

function ForClinics() {
  return (
    <section id="clinics" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <p className="text-[13px] font-medium text-accent-fg">For clinics</p>
          <h2 className="font-serif-display mt-3 text-5xl leading-[1.02] tracking-[-0.03em] text-balance text-fg">A calm front desk, even on Mondays.</h2>
          <p className="mt-4 max-w-md text-[1.0625rem] leading-[1.65] text-fg-muted">Your queue, bookings and payments in one screen. Patients see the real wait, so the waiting room stays half empty.</p>
          <ul className="mt-7 space-y-3">
            {["Live queue patients can see from home", "Automatic SMS 30 minutes before", "Payments and records, no paper"].map((l) => (
              <li key={l} className="flex items-center gap-2.5 text-[14.5px] text-fg">
                <span className="grid size-5 place-items-center rounded-full bg-accent-soft text-accent-fg">
                  <CheckIcon className="size-3" strokeWidth={3} />
                </span>
                {l}
              </li>
            ))}
          </ul>
          <Button size="lg" className="mt-8">
            List your clinic free <ArrowRightIcon />
          </Button>
        </div>
        <DeviceFrame device="browser" url="clinic.kura.health/today">
          <ClinicDashboard />
        </DeviceFrame>
      </div>
    </section>
  )
}

function PatientPhone() {
  return (
    <div className="flex h-full flex-col px-4 pt-3 pb-8">
      <p className="text-[12px] text-fg-muted">Your visit</p>
      <p className="font-serif-display text-[22px] leading-7 text-fg">Dr. Mehvish Qadri</p>
      <p className="text-[12px] text-fg-muted">Today, 4:30 · Rajbagh</p>
      <div className="mt-5 rounded-2xl bg-ink p-4 text-on-ink shadow-ink">
        <p className="text-[11.5px] opacity-60">You are</p>
        <p className="text-[34px] leading-10 font-semibold">2nd in line</p>
        <p className="text-[12px] opacity-70">Leave home in about 10 minutes</p>
      </div>
      <div className="mt-3 space-y-2">
        {[
          ["Checked in", "4:12"],
          ["Doctor in clinic", "4:05"],
          ["Reminder sent", "4:00"],
        ].map(([a, b]) => (
          <div key={a} className="flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2.5 text-[12.5px] shadow-raised">
            <span className="flex items-center gap-2 text-fg">
              <CheckIcon className="size-3.5 text-success" strokeWidth={3} />
              {a}
            </span>
            <span className="font-mono text-[11px] text-fg-muted">{b}</span>
          </div>
        ))}
      </div>
      <button type="button" className="mt-auto h-12 rounded-2xl border border-border bg-surface text-[14px] font-medium text-fg shadow-key">
        Get directions
      </button>
    </div>
  )
}

export default function KuraTemplate() {
  return (
    <TemplateShell name="Kura" kind="Healthcare marketplace" material="paper" className="tpl-kura">
      <FloatingNav
        brand={<Brand />}
        links={[
          { label: "Find a doctor", href: "#" },
          { label: "How it works", href: "#how" },
          { label: "For clinics", href: "#clinics" },
          { label: "Stories", href: "#stories" },
          { label: "FAQ", href: "#faq" },
        ]}
        cta={{ label: "Book a visit" }}
        secondary={{ label: "Clinic login", href: "#" }}
      />
      <main>
        <Hero />
        <Numbers />
        <div id="how" className="scroll-mt-24">
          <ScrollStory
            eyebrow="How it works"
            title="From search to seen, without the waiting room."
            steps={[
              { kicker: "01 · Compare", title: "See fees, ratings and who is in.", body: "Every clinic updates its status live, so you know the doctor is actually there before you leave home.", visual: <div className="w-full max-w-sm"><DoctorCard d={DOCS[0]} picked={null} onPick={() => {}} /></div> },
              { kicker: "02 · Book", title: "Pick a slot. Pay at the clinic.", body: "Two taps and you are in the queue. Nothing to pay upfront, and you can cancel any time before your slot.", visual: <div className="w-full max-w-sm rounded-2xl bg-ink p-5 text-on-ink shadow-ink"><p className="text-[12px] opacity-60">Booked</p><p className="mt-1 text-2xl font-semibold">Today, 4:30</p><p className="mt-1 text-[13px] opacity-70">Qadri Skin Clinic · ₹500 at the desk</p></div> },
              { kicker: "03 · Arrive", title: "Leave home when it is your turn.", body: "Your phone tells you your place in line and when to leave. Most patients wait less than 15 minutes.", visual: <DeviceFrame device="phone" time="16:18" className="origin-center scale-[0.72]"><PatientPhone /></DeviceFrame> },
            ]}
          />
        </div>
        <ForClinics />
        <div id="stories" className="scroll-mt-24">
          <SocialProofWall
            eyebrow="Stories"
            title="Fewer queues. Happier clinics."
            logos={["Qadri Skin", "Valley Care", "Bhat Clinic", "Dal Dental", "Chinar Kids", "Zabarwan Physio", "Lakeview ENT", "Hari Parbat Eye"]}
            quotes={[
              { quote: "I used to take half a day off for a 10 minute appointment. Now I leave work when Kura tells me to.", name: "Aamir L.", role: "Patient, Rajbagh", metric: "Waited 9 minutes" },
              { quote: "Our waiting room used to have 40 people standing. Now it has six sitting.", name: "Dr. Mehvish Q.", role: "Dermatologist" },
              { quote: "No-shows dropped by half once patients got the reminder text.", name: "Front desk", role: "Valley Care", metric: "50% fewer no-shows" },
              { quote: "I could compare three paediatricians' fees at night and book for the morning.", name: "Rukhsana M.", role: "Parent, Hyderpora" },
              { quote: "Setting up our clinic took one afternoon with their team on WhatsApp.", name: "Dr. Irfan S.", role: "Valley Care" },
              { quote: "My mother sees her place in the queue on her phone. She does not have to call anyone.", name: "Faisal D.", role: "Patient's son" },
            ]}
          />
        </div>
        <div id="faq" className="scroll-mt-24">
          <FaqSection
            description="Questions from patients and clinics. Anything else, message us on WhatsApp."
            items={[
              { q: "Is Kura free for patients?", a: "Yes. You pay the doctor's normal fee at the clinic. Booking is free." },
              { q: "How do you know the doctor is in?", a: "The clinic's front desk marks arrival in the Kura app, and the status updates live for everyone." },
              { q: "What does it cost a clinic?", a: "Listing is free. Clinics that want the queue screen, SMS reminders and payments pay a small monthly fee." },
              { q: "Are my records private?", a: "Your records belong to you. Only the clinics you visit can see them, and only with your permission." },
            ]}
          />
        </div>
        <CtaBand
          title={
            <>
              Skip the queue
              <br />
              <span className="text-lit">on your next visit.</span>
            </>
          }
          description="Get the app link by email. Booking is always free."
          placeholder="you@email.com"
          button="Send me the app"
          success="Link sent"
          note="Sample template by MiniDev. Kura, the doctors and clinics are fictional."
        />
      </main>
      <TemplateFooter brand={<Brand />} note="Book the right doctor, today. A MiniDev template; Kura is a fictional product." />
    </TemplateShell>
  )
}

