"use client"
import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { TemplateFooter, TemplateShell } from "@/components/templates/template-bar"
import { FloatingNav } from "@/registry/blocks/floating-nav"
import { FaqSection } from "@/registry/blocks/faq-section"
import { Button } from "@/registry/ui/button"

const Brand = () => (
  <span className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.03em] text-fg">
    <span className="grid size-7 place-items-center rounded-full bg-accent text-[13px] font-bold text-on-accent">F</span>
    Forma
  </span>
)

type Work = { client: string; title: string; tags: string[]; year: string; hue: number; shape: "orb" | "grid" | "wave" | "stack" }
const WORK: Work[] = [
  { client: "Halcyon Bank", title: "A bank app people open for fun", tags: ["Product", "Brand"], year: "2026", hue: 150, shape: "orb" },
  { client: "Oakridge Health", title: "Booking for 400 clinics", tags: ["Platform", "Web"], year: "2026", hue: 200, shape: "grid" },
  { client: "Parallel AI", title: "Launching an agent to 40k devs", tags: ["Launch", "Site"], year: "2025", hue: 290, shape: "wave" },
  { client: "Umbra Coffee", title: "DTC store that tripled AOV", tags: ["Commerce", "Brand"], year: "2025", hue: 40, shape: "stack" },
]

function Cover({ w }: { w: Work }) {
  const c1 = `oklch(0.7 0.16 ${w.hue})`
  const c2 = `oklch(0.45 0.14 ${(w.hue + 40) % 360})`
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl" style={{ background: `linear-gradient(140deg, ${c2}, oklch(0.18 0.03 ${w.hue}))` }}>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(600px_circle_at_var(--lx)_var(--ly),oklch(1_0_0/0.18),transparent_45%)] bg-fixed" />
      {w.shape === "orb" ? (
        <div className="absolute top-1/2 left-1/2 size-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-700 ease-hairline group-hover:scale-110" style={{ background: `radial-gradient(circle at 30% 30%, white, ${c1} 40%, ${c2})`, boxShadow: `0 30px 80px -20px ${c1}` }} />
      ) : w.shape === "grid" ? (
        <div className="absolute inset-[16%] grid grid-cols-4 gap-2 transition-transform duration-700 ease-hairline group-hover:rotate-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="rounded-lg" style={{ background: i % 5 === 0 ? c1 : "oklch(1 0 0 / 0.12)" }} />
          ))}
        </div>
      ) : w.shape === "wave" ? (
        <svg viewBox="0 0 400 300" className="absolute inset-0 size-full transition-transform duration-700 ease-hairline group-hover:scale-105" aria-hidden>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M-20 ${120 + i * 22} C 80 ${60 + i * 22}, 180 ${200 + i * 18}, 420 ${110 + i * 24}`} fill="none" stroke={i === 2 ? c1 : "oklch(1 0 0 / 0.25)"} strokeWidth={i === 2 ? 4 : 1.2} />
          ))}
        </svg>
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          {[0, 1, 2].map((i) => (
            <span key={i} className="absolute h-[34%] w-[40%] rounded-2xl border border-white/20 transition-transform duration-700 ease-hairline" style={{ background: i === 2 ? c1 : "oklch(1 0 0 / 0.08)", transform: `translate(${(i - 1) * 14}%, ${(i - 1) * -12}%) rotate(${(i - 1) * 6}deg)` }} />
          ))}
        </div>
      )}
      <span className="absolute top-4 left-4 rounded-full bg-black/30 px-3 py-1 text-[11.5px] font-medium text-white backdrop-blur">{w.client}</span>
    </div>
  )
}

function BigType() {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
  const x2 = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"])
  const words = ["Products", "Brands", "Launches", "Apps", "Websites"]
  return (
    <div ref={ref} className="overflow-hidden py-16" aria-hidden>
      <motion.p style={{ x: x1 }} className="text-[16vw] leading-[0.9] font-medium tracking-[-0.06em] whitespace-nowrap text-fg">
        {words.join(" · ")}
      </motion.p>
      <motion.p style={{ x: x2 }} className="text-[16vw] leading-[0.9] font-medium tracking-[-0.06em] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_var(--border-strong)]">
        {[...words].reverse().join(" · ")}
      </motion.p>
    </div>
  )
}

function Services() {
  const [open, setOpen] = React.useState(0)
  const items = [
    { t: "Product design", b: "Research, flows and UI for web and mobile, prototyped until it feels obvious.", d: ["Discovery sprints", "UX and UI", "Design systems", "Prototypes"] },
    { t: "Engineering", b: "React, Next.js, React Native and the backend to match. We ship what we design.", d: ["Web apps", "Mobile apps", "APIs and data", "AI features"] },
    { t: "Brand and launch", b: "Identity, website and launch assets built as one story, on one deadline.", d: ["Identity", "Marketing site", "Launch video", "Pitch deck"] },
  ]
  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">Services</p>
          <h2 className="mt-3 text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-balance text-fg sm:text-6xl">One team, idea to launch.</h2>
        </div>
        <ul className="border-t border-border">
          {items.map((it, i) => (
            <li key={it.t} className="border-b border-border">
              <button type="button" onClick={() => setOpen(i)} aria-expanded={open === i} className="group flex w-full items-baseline gap-6 py-6 text-left outline-none">
                <span className="font-mono text-[12px] text-fg-subtle">0{i + 1}</span>
                <span className={cn("flex-1 text-3xl font-medium tracking-[-0.04em] transition-colors duration-200 sm:text-5xl", open === i ? "text-fg" : "text-fg-subtle group-hover:text-fg-muted")}>{it.t}</span>
                <ArrowUpRightIcon className={cn("size-6 transition-transform duration-300 ease-hairline", open === i ? "rotate-45 text-accent-fg" : "text-fg-subtle")} />
              </button>
              <div className={cn("grid transition-[grid-template-rows] duration-400 ease-hairline", open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <div className="overflow-hidden">
                  <div className="grid gap-6 pb-8 pl-12 sm:grid-cols-2">
                    <p className="text-[15px] leading-[1.65] text-fg-muted">{it.b}</p>
                    <ul className="flex flex-wrap content-start gap-2">
                      {it.d.map((d) => (
                        <li key={d} className="rounded-full border border-border px-3 py-1 text-[13px] text-fg">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Contact() {
  const [budget, setBudget] = React.useState("$10–25k")
  const [kind, setKind] = React.useState<string[]>(["Product"])
  const [sent, setSent] = React.useState(false)
  const chip = (on: boolean) => cn("h-10 rounded-full border px-4 text-[14px] outline-none transition-colors duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent", on ? "border-ink bg-ink text-on-ink" : "border-border text-fg hover:border-border-strong")
  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <div className="rounded-[36px] border border-border bg-surface p-8 shadow-raised sm:p-14">
        {sent ? (
          <div className="py-16 text-center">
            <p className="text-5xl font-medium tracking-[-0.05em] text-fg sm:text-7xl">Talk soon.</p>
            <p className="mt-4 text-[15px] text-fg-muted">We reply within one working day with a few questions and a time to talk.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
            <h2 className="text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-balance text-fg sm:text-7xl">
              Got a project?
              <br />
              <span className="text-lit">Let&apos;s make it.</span>
            </h2>
            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <div className="space-y-8">
                <fieldset>
                  <legend className="text-[13px] font-medium text-fg-muted">I need</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Product", "Website", "Brand", "Mobile app", "AI feature"].map((k) => (
                      <button key={k} type="button" aria-pressed={kind.includes(k)} onClick={() => setKind((x) => (x.includes(k) ? x.filter((y) => y !== k) : [...x, k]))} className={chip(kind.includes(k))}>
                        {k}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-[13px] font-medium text-fg-muted">Budget</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["< $10k", "$10–25k", "$25–50k", "$50k+"].map((b) => (
                      <button key={b} type="button" aria-pressed={budget === b} onClick={() => setBudget(b)} className={chip(budget === b)}>
                        {b}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
              <div className="space-y-4">
                {[
                  ["Your name", "text"],
                  ["Email", "email"],
                ].map(([l, t]) => (
                  <input key={l} required type={t} placeholder={l} aria-label={l} className="h-14 w-full border-b border-border bg-transparent text-xl text-fg outline-none placeholder:text-fg-subtle focus:border-accent" />
                ))}
                <textarea rows={2} placeholder="Tell us about it" aria-label="Project" className="w-full resize-none border-b border-border bg-transparent py-3 text-xl text-fg outline-none placeholder:text-fg-subtle focus:border-accent" />
                <Button size="xl" type="submit" className="mt-4">
                  Send brief <ArrowRightIcon />
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

export default function FormaTemplate() {
  const reduce = useReducedMotion()
  const rise = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 20, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.9, delay: d, ease: [0.2, 0, 0, 1] as const } })
  return (
    <TemplateShell name="Forma" kind="Agency / studio" material="hairline" className="tpl-forma">
      <FloatingNav
        brand={<Brand />}
        links={[
          { label: "Work", href: "#work" },
          { label: "Services", href: "#services" },
          { label: "Studio", href: "#studio" },
          { label: "FAQ", href: "#faq" },
        ]}
        cta={{ label: "Start a project", href: "#contact" }}
        secondary={null}
      />
      <main>
        <section className="relative isolate overflow-hidden">
          <div aria-hidden className="light-spot absolute inset-0 -z-10" />
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 sm:pt-28 lg:px-8">
            <motion.p {...rise(0)} className="flex items-center gap-2 text-[13px] text-fg-muted">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative size-2 rounded-full bg-accent" />
              </span>
              Booking projects for November
            </motion.p>
            <motion.h1 {...rise(0.08)} className="mt-6 text-[3.4rem] leading-[0.92] font-medium tracking-[-0.06em] text-fg sm:text-8xl lg:text-[9rem]">
              We design
              <br />
              and build <span className="text-lit">products</span>
              <br />
              people love.
            </motion.h1>
            <motion.div {...rise(0.18)} className="mt-10 flex flex-col items-start justify-between gap-8 border-t border-border pt-8 sm:flex-row sm:items-end">
              <p className="max-w-md text-lg leading-[1.6] text-fg-muted">A small senior team for founders and product leaders. Strategy, design and engineering under one roof, shipped in weeks.</p>
              <div className="flex gap-3">
                <Button size="lg" render={<a href="#contact" />}>
                  Start a project <ArrowRightIcon />
                </Button>
                <Button size="lg" variant="outline" render={<a href="#work" />}>
                  See work
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-x-6 gap-y-14 md:grid-cols-2">
            {WORK.map((w, i) => (
              <motion.a
                key={w.client}
                href="#"
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
                className={cn("group block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-accent", i % 2 === 1 && "md:mt-24")}
              >
                <Cover w={w} />
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xl font-medium tracking-[-0.03em] text-fg">{w.title}</p>
                    <p className="mt-1 text-[13px] text-fg-muted">
                      {w.tags.join(" · ")} · {w.year}
                    </p>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border transition-[background-color,color,transform] duration-300 ease-hairline group-hover:rotate-45 group-hover:bg-accent group-hover:text-on-accent">
                    <ArrowUpRightIcon className="size-4" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        <BigType />
        <Services />

        <section id="studio" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["47", "products launched"],
              ["6 wk", "average to launch"],
              ["$310M", "raised by clients after"],
              ["9", "people, all senior"],
            ].map(([a, b]) => (
              <div key={b} className="bg-surface p-8">
                <p className="text-5xl font-medium tracking-[-0.05em] text-fg">{a}</p>
                <p className="mt-2 text-[14px] text-fg-muted">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <div id="faq" className="scroll-mt-24">
          <FaqSection
            title="Working with us."
            description="Short version: small team, fixed scope, weekly demos, you own everything."
            items={[
              { q: "How do projects start?", a: "A one-week paid discovery sprint with a clickable prototype at the end. If we are not the right fit, you keep everything." },
              { q: "Do you work with early-stage startups?", a: "Yes, about half our clients are pre-seed to Series A. We are used to moving fast on a tight budget." },
              { q: "Can you work with our in-house team?", a: "Often. We can own a product end to end, or slot into your team's rituals and tools." },
              { q: "What does it cost?", a: "Most launches land between $25k and $80k. We quote a fixed price after discovery, never hourly." },
            ]}
          />
        </div>
        <Contact />
      </main>
      <TemplateFooter brand={<Brand />} note="A design and engineering studio. A MiniDev template; Forma and its clients are fictional." />
    </TemplateShell>
  )
}
