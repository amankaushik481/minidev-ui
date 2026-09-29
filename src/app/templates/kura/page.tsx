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
import { SplitFlap } from "@/registry/ui/split-flap"

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

/* ── hero: the departure board for doctors ─────────────────────────────── */
type Row = { doc: string; clinic: string; wait: string; status: "IN CLINIC" | "ARRIVING" | "FULL TODAY" | "BACK 10:00"; fee: string }
const BOARDS: Record<string, Row[]> = {
  Dermatology: [
    { doc: "DR M QADRI", clinic: "RAJBAGH", wait: "12 MIN", status: "IN CLINIC", fee: "500" },
    { doc: "DR I SHAH", clinic: "LAL CHOWK", wait: "35 MIN", status: "ARRIVING", fee: "400" },
    { doc: "DR S BHAT", clinic: "HYDERPORA", wait: "-", status: "BACK 10:00", fee: "350" },
    { doc: "DR A WANI", clinic: "JAWAHAR NGR", wait: "-", status: "FULL TODAY", fee: "600" },
  ],
  Paediatrics: [
    { doc: "DR R MIR", clinic: "KARAN NAGAR", wait: "8 MIN", status: "IN CLINIC", fee: "450" },
    { doc: "DR F LONE", clinic: "BEMINA", wait: "20 MIN", status: "IN CLINIC", fee: "400" },
    { doc: "DR N DAR", clinic: "SONAWAR", wait: "40 MIN", status: "ARRIVING", fee: "500" },
    { doc: "DR Z KHAN", clinic: "NATIPORA", wait: "-", status: "FULL TODAY", fee: "350" },
  ],
  Dental: [
    { doc: "DR T SHAH", clinic: "DALGATE", wait: "5 MIN", status: "IN CLINIC", fee: "300" },
    { doc: "DR H QURESHI", clinic: "RAWALPORA", wait: "25 MIN", status: "IN CLINIC", fee: "350" },
    { doc: "DR B RATHER", clinic: "BATAMALOO", wait: "-", status: "BACK 10:00", fee: "250" },
    { doc: "DR O PARRAY", clinic: "SOURA", wait: "50 MIN", status: "ARRIVING", fee: "400" },
  ],
  ENT: [
    { doc: "DR Y MALIK", clinic: "RAJBAGH", wait: "15 MIN", status: "IN CLINIC", fee: "450" },
    { doc: "DR G NAQASH", clinic: "LAL CHOWK", wait: "-", status: "FULL TODAY", fee: "500" },
    { doc: "DR P KOUL", clinic: "HAZRATBAL", wait: "30 MIN", status: "ARRIVING", fee: "400" },
    { doc: "DR E ANDRABI", clinic: "PANTHA CHOWK", wait: "10 MIN", status: "IN CLINIC", fee: "550" },
  ],
}
const STATUS_TONE = { "IN CLINIC": "success", ARRIVING: "warning", "FULL TODAY": "danger", "BACK 10:00": "default" } as const

function Clock() {
  const [t, setT] = React.useState("16:04")
  React.useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }))
    f()
    const i = setInterval(f, 15000)
    return () => clearInterval(i)
  }, [])
  return <SplitFlap value={t} length={5} size="sm" tone="warning" />
}

function Ticket({ row, token, onClose }: { row: Row; token: number; onClose: () => void }) {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0, rotate: -2 }}
      animate={{ y: 0, opacity: 1, rotate: -1.2 }}
      exit={{ y: -30, opacity: 0 }}
      transition={{ type: "spring", bounce: 0.25, duration: 0.7 }}
      className="relative mx-auto -mt-2 w-[300px] origin-top"
    >
      <div className="relative rounded-b-lg bg-[oklch(0.985_0.012_88)] px-5 pt-5 pb-4 text-[oklch(0.22_0.02_60)] shadow-[0_24px_40px_-18px_oklch(0.3_0.04_60/0.5),0_2px_4px_oklch(0.3_0.04_60/0.15)] [background-image:var(--grain-soft)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] opacity-60">KURA TOKEN</p>
            <p className="font-serif-display text-[54px] leading-[0.9]">{String(token).padStart(2, "0")}</p>
          </div>
          <svg viewBox="0 0 21 21" className="size-16" aria-label="QR code" role="img">
            {Array.from({ length: 21 * 21 }).map((_, i) => {
              const x = i % 21
              const y = Math.floor(i / 21)
              const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)
              const ring = finder && (x % 14 === 0 || x % 14 === 6 || y % 14 === 0 || y % 14 === 6 || (x % 14 >= 2 && x % 14 <= 4 && y % 14 >= 2 && y % 14 <= 4))
              const on = finder ? ring : ((x * 7 + y * 13 + x * y + token) % 5) < 2
              return on ? <rect key={i} x={x} y={y} width="1" height="1" fill="currentColor" /> : null
            })}
          </svg>
        </div>
        <div className="mt-3 border-t border-dashed border-current/30 pt-3 font-mono text-[11px] leading-5">
          <p className="flex justify-between"><span className="opacity-60">DOCTOR</span><span>{row.doc}</span></p>
          <p className="flex justify-between"><span className="opacity-60">CLINIC</span><span>{row.clinic}</span></p>
          <p className="flex justify-between"><span className="opacity-60">EST. WAIT</span><span>{row.wait === "-" ? "TOMORROW" : row.wait}</span></p>
          <p className="flex justify-between"><span className="opacity-60">PAY AT DESK</span><span>₹{row.fee}</span></p>
        </div>
        <p className="mt-3 text-[11.5px] leading-snug opacity-70">We will text you when you are 2nd in line. Leave home then.</p>
        <button type="button" onClick={onClose} className="mt-3 w-full rounded-md border border-current/25 py-1.5 font-mono text-[10.5px] tracking-[0.12em] opacity-70 hover:opacity-100">CANCEL TOKEN</button>
        {/* perforation */}
        <span aria-hidden className="absolute inset-x-0 -bottom-2 h-2 bg-[radial-gradient(circle_at_6px_0,transparent_5px,oklch(0.985_0.012_88)_5.5px)] bg-[length:12px_8px]" />
      </div>
    </motion.div>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const [spec, setSpec] = React.useState<keyof typeof BOARDS>("Dermatology")
  const [rows, setRows] = React.useState(BOARDS.Dermatology)
  const [sel, setSel] = React.useState<number | null>(null)
  const [token, setToken] = React.useState(14)
  React.useEffect(() => {
    setRows(BOARDS[spec])
    setSel(null)
  }, [spec])
  // Waits drift so the board keeps flipping, like the real thing.
  React.useEffect(() => {
    const t = setInterval(() => {
      setRows((rs) =>
        rs.map((r) => {
          if (!r.wait.endsWith("MIN")) return r
          const m = Math.max(3, parseInt(r.wait) + (Math.random() > 0.5 ? 1 : -1))
          return { ...r, wait: `${m} MIN` }
        })
      )
    }, 3500)
    return () => clearInterval(t)
  }, [])
  const rise = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 16, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.9, delay: d, ease: [0.2, 0, 0, 1] as const } })
  const row = sel !== null ? rows[sel] : null
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="light-spot absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        {/* masthead */}
        <motion.div {...rise(0)} className="flex items-center justify-between border-y-2 border-fg py-2 font-mono text-[11px] tracking-[0.16em] text-fg uppercase">
          <span>Srinagar edition</span>
          <span className="hidden sm:inline">1,240 doctors · 212 clinics · live</span>
          <span className="flex items-center gap-2">Updated <Clock /></span>
        </motion.div>
        <motion.h1 {...rise(0.08)} className="font-serif-display mt-10 text-[3.2rem] leading-[0.92] tracking-[-0.035em] text-balance text-fg sm:text-7xl lg:mt-14 lg:text-[7.4rem]">
          Know who&apos;s in <em className="text-accent-fg">before</em>
          <br className="hidden lg:block" /> you leave home.
        </motion.h1>

        <motion.div initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.25, ease: [0.2, 0, 0, 1] }} className="relative mt-12">
          {/* the board */}
          <div className="relative rounded-[22px] bg-[oklch(0.13_0.006_260)] p-3 shadow-[var(--o12x)_var(--o12y)_40px_-10px_oklch(0.2_0.03_60/0.5),var(--o28x)_var(--o28y)_80px_-24px_oklch(0.2_0.03_60/0.55),inset_0_1px_0_oklch(1_0_0/0.08)] sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-4">
              <div className="flex items-center gap-3">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[oklch(0.82_0.16_150)] opacity-60" />
                  <span className="relative size-2 rounded-full bg-[oklch(0.82_0.16_150)]" />
                </span>
                <span className="font-mono text-[11px] tracking-[0.2em] text-white/60">NOW SEEING · SRINAGAR</span>
              </div>
              <div role="tablist" aria-label="Speciality" className="flex flex-wrap gap-1.5">
                {(Object.keys(BOARDS) as (keyof typeof BOARDS)[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="tab"
                    aria-selected={s === spec}
                    onClick={() => setSpec(s)}
                    className={cn("rounded-md px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] uppercase outline-none transition-colors duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent", s === spec ? "bg-[oklch(0.86_0.15_85)] text-black" : "bg-white/6 text-white/60 hover:bg-white/10 hover:text-white")}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] border-separate border-spacing-y-2">
                <thead>
                  <tr className="font-mono text-[10.5px] tracking-[0.18em] text-white/40">
                    <th className="px-2 text-left font-normal">DOCTOR</th>
                    <th className="px-2 text-left font-normal">CLINIC</th>
                    <th className="px-2 text-left font-normal">WAIT</th>
                    <th className="px-2 text-left font-normal">FEE</th>
                    <th className="px-2 text-left font-normal">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr
                      key={i}
                      tabIndex={0}
                      onClick={() => { if (r.status !== "FULL TODAY") { setSel(i); setToken((t) => t + 1) } }}
                      onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && r.status !== "FULL TODAY") { e.preventDefault(); setSel(i); setToken((t) => t + 1) } }}
                      aria-label={`${r.doc}, ${r.clinic}, ${r.status}`}
                      className={cn("cursor-pointer outline-none [&>td]:py-1.5 [&>td:first-child]:rounded-l-xl [&>td:last-child]:rounded-r-xl", sel === i ? "[&>td]:bg-white/10" : "hover:[&>td]:bg-white/5 focus-visible:[&>td]:bg-white/5", r.status === "FULL TODAY" && "cursor-not-allowed")}
                    >
                      <td className="px-2"><SplitFlap value={r.doc} length={12} stagger={22} /></td>
                      <td className="px-2"><SplitFlap value={r.clinic} length={12} stagger={22} /></td>
                      <td className="px-2"><SplitFlap value={r.wait} length={6} tone="warning" stagger={30} /></td>
                      <td className="px-2"><SplitFlap value={r.fee} length={3} stagger={30} /></td>
                      <td className="px-2"><SplitFlap value={r.status} length={10} tone={STATUS_TONE[r.status]} stagger={22} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* print slot */}
            <div className="mx-auto mt-3 flex h-3 max-w-[340px] items-center justify-center rounded-full bg-black shadow-[inset_0_2px_3px_oklch(0_0_0/0.9)] lg:mr-6 lg:ml-auto" aria-hidden />
          </div>

          <div className="grid gap-10 pt-10 pb-20 lg:grid-cols-[1fr_340px] lg:gap-16">
            <div>
              <motion.p {...rise(0.16)} className="max-w-lg text-xl leading-[1.55] text-fg-muted">
                Every clinic in Srinagar on one live board. See the real wait, take a token from your phone, and walk in when it is your turn.{" "}
                <span className="text-fg">Tap a row to try it.</span>
              </motion.p>
              <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="xl" variant="accent">
                  Get my token <ArrowRightIcon />
                </Button>
                <span className="text-[13px] text-fg-muted">Free for patients. No calls, no queues.</span>
              </motion.div>
              <motion.dl {...rise(0.3)} className="mt-12 grid max-w-lg grid-cols-3 border-t border-fg/15 pt-6">
                {[
                  ["38", "minutes saved a visit"],
                  ["½", "the no-shows"],
                  ["4.8", "patient rating"],
                ].map(([a, b]) => (
                  <div key={b}>
                    <dt className="font-serif-display text-5xl text-fg">{a}</dt>
                    <dd className="mt-1 text-[12.5px] text-fg-muted">{b}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>
            <div className="relative -mt-10 min-h-24 lg:-mt-12">
              <AnimatePresence>{row ? <Ticket key={token} row={row} token={token} onClose={() => setSel(null)} /> : null}</AnimatePresence>
              {!row ? (
                <p className="mt-14 text-center font-mono text-[11px] tracking-[0.16em] text-fg-subtle">YOUR TOKEN PRINTS HERE</p>
              ) : null}
            </div>
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

