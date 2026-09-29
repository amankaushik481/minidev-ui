"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRightIcon, BellIcon, BookOpenIcon, CheckIcon, CreditCardIcon, LinkIcon, PlayCircleIcon, VideoIcon } from "lucide-react"
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
  <span className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em] text-fg">
    <span className="grid size-7 place-items-center rounded-full bg-accent text-on-accent shadow-ink">
      <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
        <path d="M2 10c1.5-4 3-4 4 0s2.5 4 4 0 2.5-4 4 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
    Cadence
  </span>
)

const DAYS = ["Mon 6", "Tue 7", "Wed 8", "Thu 9", "Fri 10"]
const SLOTS: Record<string, string[]> = {
  "Mon 6": ["9:00", "11:30", "16:00"],
  "Tue 7": ["10:00", "13:00"],
  "Wed 8": ["8:30", "12:00", "15:30", "18:00"],
  "Thu 9": ["9:30"],
  "Fri 10": ["11:00", "14:30"],
}
const TYPES = [
  { id: "intro", name: "Discovery call", len: "20 min", price: 0 },
  { id: "session", name: "Coaching session", len: "60 min", price: 120 },
  { id: "pack", name: "6-session package", len: "6 × 60 min", price: 600 },
]

function Booking() {
  const [type, setType] = React.useState("session")
  const [day, setDay] = React.useState("Wed 8")
  const [slot, setSlot] = React.useState<string | null>("12:00")
  const [done, setDone] = React.useState(false)
  const t = TYPES.find((x) => x.id === type)!
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-overlay">
      <div className="flex items-center gap-3 border-b border-border p-5">
        <span className="grid size-12 place-items-center rounded-full bg-accent-soft text-[15px] font-semibold text-accent-fg">NR</span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-medium text-fg">Nadia Rahman</p>
          <p className="text-[12.5px] text-fg-muted">Leadership coach · 9 years · ICF PCC</p>
        </div>
        <span className="hidden items-center gap-1 rounded-full bg-sunken px-2.5 py-1 text-[11px] text-fg-muted sm:inline-flex">
          <VideoIcon className="size-3" /> Online
        </span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="grid min-h-[330px] place-items-center p-6 text-center">
            <div>
              <span className="mx-auto grid size-12 animate-[pop-in_320ms_var(--ease-hairline)_both] place-items-center rounded-full bg-success text-white shadow-ink">
                <CheckIcon className="size-5" strokeWidth={3} />
              </span>
              <p className="mt-4 text-lg font-medium text-fg">You are booked with Nadia</p>
              <p className="mt-1 text-[13.5px] text-fg-muted">
                {t.name}, {day} at {slot}. Calendar invite and video link sent.
              </p>
              <Button size="sm" variant="outline" className="mt-5" onClick={() => setDone(false)}>
                Book another
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" exit={{ opacity: 0 }} className="space-y-5 p-5">
            <div className="grid gap-2 sm:grid-cols-3">
              {TYPES.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => setType(x.id)}
                  aria-pressed={x.id === type}
                  className={cn("rounded-xl border p-3 text-left outline-none transition-[border-color,box-shadow] duration-[140ms] focus-visible:ring-2 focus-visible:ring-accent", x.id === type ? "border-accent shadow-[0_0_0_3px_var(--accent-soft)]" : "border-border hover:border-border-strong")}
                >
                  <p className="text-[12.5px] font-medium text-fg">{x.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-fg-muted">
                    {x.len} · {x.price ? `£${x.price}` : "Free"}
                  </p>
                </button>
              ))}
            </div>
            <div>
              <p className="text-[12px] font-medium text-fg-muted">October</p>
              <div className="mt-2 grid grid-cols-5 gap-1.5">
                {DAYS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => { setDay(d); setSlot(null) }}
                    aria-pressed={d === day}
                    className={cn("rounded-xl py-2 text-center text-[12px] outline-none transition-colors duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent", d === day ? "bg-ink font-medium text-on-ink shadow-ink" : "bg-sunken text-fg hover:bg-accent-soft")}
                  >
                    <span className="block opacity-70">{d.split(" ")[0]}</span>
                    <span className="block text-[15px] font-semibold">{d.split(" ")[1]}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex min-h-9 flex-wrap gap-1.5">
              {SLOTS[day].map((s, k) => (
                <motion.button
                  key={day + s}
                  type="button"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: k * 0.04 }}
                  onClick={() => setSlot(s)}
                  aria-pressed={slot === s}
                  className={cn("h-9 rounded-lg border px-3.5 text-[13px] font-medium tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-accent", slot === s ? "border-accent bg-accent text-on-accent" : "border-border bg-bg text-fg hover:border-accent-line")}
                >
                  {s}
                </motion.button>
              ))}
            </div>
            <Button size="lg" className="w-full" disabled={!slot} onClick={() => setDone(true)}>
              {slot ? `Book ${day} at ${slot}${t.price ? ` · £${t.price}` : ""}` : "Pick a time"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Practice() {
  const [rev, setRev] = React.useState(8640)
  React.useEffect(() => {
    const t = setInterval(() => setRev((x) => x + 120), 4200)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="rounded-2xl border border-border bg-raised p-4 shadow-overlay">
      <p className="text-[11.5px] text-fg-muted">Your practice, October</p>
      <p className="text-[26px] font-semibold tracking-[-0.03em] text-fg">
        <NumberRoll value={rev} trend format={{ style: "currency", currency: "GBP", maximumFractionDigits: 0 }} />
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2 text-[11.5px]">
        <p className="rounded-lg bg-sunken px-2.5 py-1.5 text-fg">
          <b>42</b> <span className="text-fg-muted">sessions</span>
        </p>
        <p className="rounded-lg bg-sunken px-2.5 py-1.5 text-fg">
          <b>0</b> <span className="text-fg-muted">no-shows</span>
        </p>
      </div>
    </div>
  )
}

export default function CadenceTemplate() {
  const reduce = useReducedMotion()
  const rise = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 14, filter: "blur(6px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay: d, ease: [0.2, 0, 0, 1] as const } })
  return (
    <TemplateShell name="Cadence" kind="Coaching platform" material="hairline" className="tpl-cadence">
      <FloatingNav
        brand={<Brand />}
        links={[
          { label: "Booking", href: "#product" },
          { label: "Courses", href: "#product" },
          { label: "How it works", href: "#how" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ]}
        cta={{ label: "Start free" }}
      />
      <main>
        <section className="relative isolate overflow-hidden">
          <div aria-hidden className="light-spot absolute inset-0 -z-10" />
          <div aria-hidden className="absolute top-20 right-[-10%] -z-10 size-[560px] rounded-full bg-accent opacity-[0.08] blur-[90px]" />
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pt-16 pb-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:pt-24">
            <div>
              <motion.p {...rise(0)} className="text-[13px] font-medium text-accent-fg">For coaches, therapists and teachers</motion.p>
              <motion.h1 {...rise(0.08)} className="mt-4 text-[3rem] leading-[0.98] font-medium tracking-[-0.05em] text-balance text-fg sm:text-6xl lg:text-[5.3rem] lg:leading-[0.93]">
                Your practice,
                <br />
                <span className="relative inline-block">
                  <span className="text-lit">fully booked.</span>
                  <svg aria-hidden viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-3 left-0 h-4 w-full text-accent">
                    <path d="M4 14 C 60 4, 120 4, 180 10 S 270 16, 296 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" className="[--len:1] animate-[hairline-draw_900ms_var(--ease-hairline)_700ms_forwards] motion-reduce:[stroke-dashoffset:0]" />
                  </svg>
                </span>
              </motion.h1>
              <motion.p {...rise(0.16)} className="mt-8 max-w-lg text-lg leading-[1.6] text-fg-muted">
                One link where clients book, pay and join the call. Courses, packages, reminders and notes, so you spend your week coaching, not chasing.
              </motion.p>
              <motion.div {...rise(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="lg">
                  Get your booking page <ArrowRightIcon />
                </Button>
                <Button size="lg" variant="outline">
                  See Nadia&apos;s page
                </Button>
              </motion.div>
              <motion.p {...rise(0.3)} className="mt-5 flex items-center gap-2 text-[12.5px] text-fg-subtle">
                <LinkIcon className="size-3.5" /> cadence.so/nadia · free for your first 10 clients
              </motion.p>
            </div>
            <motion.div initial={reduce ? false : { opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.2, 0, 0, 1] }} className="relative">
              <div style={{ transform: "translate3d(calc(var(--sx) * -6px), calc(var(--sy) * -6px), 0)" }}>
                <Booking />
              </div>
              <div className="absolute -top-10 -left-6 hidden w-56 animate-[rise-in_600ms_var(--ease-hairline)_1.3s_both] sm:block lg:-left-16">
                <Practice />
              </div>
              <div className="absolute -right-3 -bottom-6 hidden animate-[rise-in_600ms_var(--ease-hairline)_1.6s_both] items-center gap-2 rounded-2xl border border-border bg-raised px-3 py-2.5 shadow-overlay sm:flex">
                <BellIcon className="size-4 text-accent-fg" />
                <p className="text-[12px] text-fg">
                  <b>James</b> booked 6 sessions · <span className="text-success">£600 paid</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <div id="product" className="scroll-mt-24">
          <BentoLive
            eyebrow="Everything in one link"
            title="The business side of your practice, done."
            items={[
              { title: "Payments before the session", body: "Card, Apple Pay or bank transfer. Packages and payment plans built in.", visual: <div className="w-full space-y-2">{[["James O.", "6-session package", "£600"], ["Mira K.", "Coaching session", "£120"], ["Tom B.", "Payment plan 2/3", "£200"]].map(([a, b, c]) => <div key={a} className="flex items-center gap-3 rounded-xl border border-border bg-raised px-3 py-2.5 shadow-raised"><CreditCardIcon className="size-4 text-accent-fg" /><span className="min-w-0 flex-1 text-[12.5px]"><b className="font-medium text-fg">{a}</b> <span className="text-fg-muted">{b}</span></span><span className="text-[13px] font-semibold text-success tabular-nums">{c}</span></div>)}</div>, span: 3 },
              { title: "Courses that sell while you sleep", body: "Record once, sell forever. Drip lessons, quizzes, certificates.", visual: <div className="w-full rounded-2xl border border-border bg-raised p-4 shadow-raised"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-accent text-on-accent"><PlayCircleIcon className="size-5" /></span><div><p className="text-[13px] font-medium text-fg">Lead without burning out</p><p className="text-[11.5px] text-fg-muted">8 lessons · 214 students</p></div></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sunken"><div className="h-full w-[62%] rounded-full bg-accent" /></div><p className="mt-1.5 text-[11px] text-fg-muted">Average completion 62%</p></div>, span: 3 },
              { title: "No more no-shows", body: "Reminders by email and WhatsApp, with one-tap reschedule.", visual: <div className="w-full space-y-1.5 text-[12px]">{["24h before · email", "2h before · WhatsApp", "Missed? Reschedule link"].map((l) => <p key={l} className="flex items-center gap-2 rounded-lg bg-sunken px-3 py-2 text-fg"><BellIcon className="size-3.5 text-accent-fg" />{l}</p>)}</div>, span: 2 },
              { title: "Notes and homework", body: "Private notes, shared action items, a client portal for both.", visual: <div className="w-full space-y-1.5 text-[12px]">{[["Practise the 2-minute check-in", true], ["Draft the team charter", true], ["Book the offsite", false]].map(([l, d]) => <p key={l as string} className="flex items-center gap-2 text-fg"><span className={cn("grid size-4 place-items-center rounded border", d ? "border-accent bg-accent text-on-accent" : "border-border-strong")}>{d ? <CheckIcon className="size-3" strokeWidth={3} /> : null}</span>{l as string}</p>)}</div>, span: 2 },
              { title: "Your calendar, respected", body: "Syncs with Google and Outlook, buffers between calls, no-meeting days.", visual: <div className="grid w-full grid-cols-5 gap-1">{Array.from({ length: 15 }).map((_, k) => <span key={k} className={cn("h-6 rounded", [1, 4, 7, 8, 12].includes(k) ? "bg-accent" : k % 5 === 4 ? "bg-hatch bg-sunken" : "bg-sunken")} />)}</div>, span: 2 },
            ]}
          />
        </div>
        <div id="how" className="scroll-mt-24">
          <ScrollStory
            title="Set up before your next client call."
            steps={[
              { kicker: "01 · Share", title: "Get your link.", body: "Add your sessions, prices and availability. Your booking page is live at cadence.so/you in ten minutes.", visual: <div className="w-full max-w-sm rounded-2xl border border-border bg-raised p-4 shadow-overlay"><p className="flex items-center gap-2 font-mono text-[13px] text-fg"><LinkIcon className="size-4 text-accent-fg" /> cadence.so/nadia</p><p className="mt-2 text-[12px] text-fg-muted">3 session types · 14 slots this week</p></div> },
              { kicker: "02 · Book", title: "Clients book and pay in one go.", body: "No back-and-forth emails. They pick a time, pay, and get the video link automatically.", visual: <div className="w-full max-w-sm"><Practice /></div> },
              { kicker: "03 · Grow", title: "Turn sessions into courses.", body: "Package what you teach most into a course and sell it to people who are not ready for one-to-one yet.", visual: <div className="flex items-center gap-3 rounded-2xl border border-border bg-raised p-4 shadow-overlay"><BookOpenIcon className="size-6 text-accent-fg" /><div><p className="text-[14px] font-medium text-fg">214 students</p><p className="text-[12px] text-fg-muted">£9,630 from one course</p></div></div> },
            ]}
          />
        </div>
        <SocialProofWall
          eyebrow="Coaches on Cadence"
          title="Less admin. More coaching."
          logos={["Clearpath Coaching", "Northstar Therapy", "Bloom Yoga", "Lumen Leadership", "Studio Kin", "Open Door Tutors", "Ember Wellness"]}
          quotes={[
            { quote: "I used to spend Sunday nights sending invoices. Now clients pay when they book.", name: "Nadia R.", role: "Leadership coach", metric: "4 hours back a week" },
            { quote: "No-shows went from three a week to almost none after the WhatsApp reminders.", name: "Owen P.", role: "Therapist" },
            { quote: "My course makes more than my one-to-one sessions now.", name: "Lena M.", role: "Career coach", metric: "£9.6k from one course" },
            { quote: "Clients say it feels like booking with a proper clinic, not a freelancer.", name: "Sam T.", role: "Nutrition coach" },
            { quote: "Setup took less time than my intro call.", name: "Priya D.", role: "Yoga teacher" },
            { quote: "The client portal keeps the homework in one place. Sessions start where the last one ended.", name: "Ben A.", role: "Executive coach" },
          ]}
        />
        <div id="pricing" className="scroll-mt-24">
          <PricingPlans
            title="Grows with your client list."
            description="No commission on sessions. Card fees are the standard processor rate."
            currency="GBP"
            unit="/ mo"
            per=""
            plans={[
              { name: "Solo", blurb: "Up to 10 active clients.", monthly: 0, yearly: 0, cta: "Start free", features: ["Booking page", "Payments", "Email reminders", { label: "Courses", included: false }, { label: "WhatsApp reminders", included: false }] },
              { name: "Practice", blurb: "For full-time coaches.", monthly: 29, yearly: 24, cta: "Try free for 14 days", featured: true, features: ["Unlimited clients", "Packages and payment plans", "WhatsApp reminders", "Client portal and notes", "1 course"] },
              { name: "Studio", blurb: "For teams and schools.", monthly: 79, yearly: 66, cta: "Talk to us", features: ["Up to 10 coaches", "Unlimited courses", "Your own domain", "Team scheduling", "Priority support"] },
            ]}
          />
        </div>
        <div id="faq" className="scroll-mt-24">
          <FaqSection
            items={[
              { q: "Do you take a cut of my sessions?", a: "No. You pay the plan and the standard card fee, nothing on top." },
              { q: "Can clients pay in instalments?", a: "Yes. Set a package price and let clients split it into two to six payments, collected automatically." },
              { q: "Does it work for group sessions?", a: "Yes. Set a capacity and clients book seats; the video link and reminders go to everyone." },
              { q: "Can I bring my existing clients?", a: "Import them from a spreadsheet and send each one their portal link in one go." },
            ]}
          />
        </div>
        <CtaBand
          title={
            <>
              Spend your week
              <br />
              <span className="text-lit">coaching.</span>
            </>
          }
          description="Your booking page is ten minutes away. Free for your first 10 clients."
          button="Get my page"
          success="Check your inbox"
          note="Sample template by MiniDev. Cadence and the coaches are fictional."
        />
      </main>
      <TemplateFooter brand={<Brand />} note="Booking, payments and courses for coaches. A MiniDev template; Cadence is a fictional product." />
    </TemplateShell>
  )
}

