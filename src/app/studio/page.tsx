"use client"
import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRightIcon, CheckIcon, ClockIcon, CodeIcon, LayersIcon, RocketIcon, SparklesIcon, WrenchIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { Button } from "@/registry/ui/button"
import { FaqSection } from "@/registry/blocks/faq-section"
import { STUDIO_FAQ } from "@/content/pages"

/* Edit prices here. These are the numbers the studio page shows. */
const PACKAGES = [
  {
    name: "Launch page",
    price: "from $1,500",
    time: "1 to 2 weeks",
    icon: SparklesIcon,
    blurb: "A landing page at the level of the templates on this site, built on your brand, live on your domain.",
    items: ["Design and build in one", "Live product UI in the hero", "Copywriting help", "CMS or plain code, your pick"],
  },
  {
    name: "MVP in 30 days",
    price: "from $5,000",
    time: "4 weeks",
    icon: RocketIcon,
    featured: true,
    blurb: "Your product, working: web app, backend, logins, payments, admin. The version you can put in front of users and investors.",
    items: ["Free 48-hour prototype first", "Weekly demos you can click", "Code and hosting in your name", "30 days of free fixes after launch"],
  },
  {
    name: "Rescue and redesign",
    price: "from $2,500",
    time: "2 to 3 weeks",
    icon: WrenchIcon,
    blurb: "Built it with Lovable, Bolt or a freelancer and it is stuck, buggy or looks generic? We finish it and make it look designed.",
    items: ["Code review in 48 hours", "Fix what breaks at 80%", "New UI on this kit", "Handover your team can run"],
  },
]

const PROCESS = [
  { day: "Day 0", title: "You tell us the idea", body: "Five lines is enough. Who it is for, what it does, what makes it yours." },
  { day: "Day 2", title: "You click your prototype", body: "A real, clickable version of your product, free. Keep it even if you never hire us." },
  { day: "Week 1 to 4", title: "We build it for real", body: "Weekly demos, a shared channel, no surprises. You see progress every few days." },
  { day: "Launch", title: "It goes live", body: "On your domain, in your accounts, with 30 days of free fixes and an optional retainer." },
]

function PrototypeForm() {
  const [sent, setSent] = React.useState(false)
  const [data, setData] = React.useState({ name: "", email: "", idea: "", budget: "$2,000 to $5,000", stage: "Starting something new" })
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setData((d) => ({ ...d, [k]: e.target.value }))
  const field = "w-full rounded-xl border border-border bg-surface px-3.5 py-3 text-[14.5px] text-fg shadow-xs outline-none placeholder:text-fg-subtle transition-[border-color,box-shadow] duration-[140ms] focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]"
  return (
    <div id="prototype" className="scroll-mt-24 relative overflow-hidden rounded-[28px] border border-border bg-raised p-6 shadow-overlay sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid min-h-[420px] place-items-center text-center">
            <div>
              <span className="mx-auto grid size-12 animate-[pop-in_320ms_var(--ease-hairline)_both] place-items-center rounded-full bg-success text-white shadow-ink">
                <CheckIcon className="size-5" strokeWidth={3} />
              </span>
              <p className="mt-4 text-xl font-medium tracking-[-0.02em] text-fg">Got it, {data.name.split(" ")[0] || "thanks"}.</p>
              <p className="mx-auto mt-2 max-w-sm text-[14.5px] text-fg-muted">Your email app opened with the details. Send it and your prototype arrives within 48 hours.</p>
              <Button variant="outline" className="mt-6" render={<a href={SITE.studio.call} target="_blank" rel="noreferrer" />}>
                Or book a 30 minute call
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -10 }}
            onSubmit={(e) => {
              e.preventDefault()
              const body = `Name: ${data.name}\nEmail: ${data.email}\nStage: ${data.stage}\nBudget: ${data.budget}\n\nIdea:\n${data.idea}`
              window.location.href = `mailto:${SITE.studio.email}?subject=${encodeURIComponent("Free prototype: " + data.idea.slice(0, 60))}&body=${encodeURIComponent(body)}`
              setSent(true)
            }}
            className="space-y-4"
          >
            <div>
              <p className="text-[13px] font-medium text-accent-fg">Free, no call needed</p>
              <h2 className="mt-1 text-2xl font-medium tracking-[-0.03em] text-fg">Get your prototype in 48 hours</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input required value={data.name} onChange={set("name")} placeholder="Your name" aria-label="Your name" className={field} />
              <input required type="email" value={data.email} onChange={set("email")} placeholder="you@company.com" aria-label="Email" className={field} />
            </div>
            <textarea required value={data.idea} onChange={set("idea")} rows={5} placeholder="What are you building? Who is it for, and what should it do first?" aria-label="Your idea" className={cn(field, "resize-none leading-[1.55]")} />
            <div className="grid gap-3 sm:grid-cols-2">
              <select value={data.stage} onChange={set("stage")} aria-label="Stage" className={field}>
                <option>Starting something new</option>
                <option>I have a live product</option>
                <option>I run a business with revenue</option>
                <option>My AI-built app is stuck</option>
              </select>
              <select value={data.budget} onChange={set("budget")} aria-label="Budget" className={field}>
                <option>$2,000 to $5,000</option>
                <option>$5,000 to $10,000</option>
                <option>$10,000 or more</option>
                <option>Not sure yet</option>
              </select>
            </div>
            <Button size="lg" type="submit" className="w-full">
              Send my idea <ArrowRightIcon />
            </Button>
            <p className="text-center text-[12px] text-fg-subtle">We reply within a day. Your idea stays yours; we sign an NDA if you want one.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function StudioPage() {
  const reduce = useReducedMotion()
  const rise = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 14, filter: "blur(6px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay: d, ease: [0.2, 0, 0, 1] as const } })
  return (
    <div className="min-h-full bg-bg text-fg">
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden">
          <div aria-hidden className="light-spot absolute inset-0 -z-10" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid [--grid-size:56px] [mask-image:radial-gradient(ellipse_60%_60%_at_30%_20%,black_10%,transparent_70%)]" />
          <div className="mx-auto grid max-w-7xl gap-14 px-4 pt-16 pb-24 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:pt-24">
            <div>
              <motion.p {...rise(0)} className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">MiniDev studio</motion.p>
              <motion.h1 {...rise(0.08)} className="mt-4 text-5xl leading-[0.98] font-medium tracking-[-0.05em] text-balance sm:text-7xl">
                We build the product
                <br />
                <span className="text-lit">behind the template.</span>
              </motion.h1>
              <motion.p {...rise(0.16)} className="mt-6 max-w-lg text-lg leading-[1.6] text-fg-muted">
                The same people who made this kit build MVPs, apps and websites for founders. Fixed price, weekly demos, your code. Start with a free prototype of your idea.
              </motion.p>
              <motion.dl {...rise(0.24)} className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6">
                {[
                  ["20+", "products shipped"],
                  ["5 yrs", "building for founders"],
                  ["30 days", "idea to launch"],
                ].map(([a, b]) => (
                  <div key={b}>
                    <dt className="text-3xl font-medium tracking-[-0.04em] text-fg">{a}</dt>
                    <dd className="mt-0.5 text-[12.5px] text-fg-muted">{b}</dd>
                  </div>
                ))}
              </motion.dl>
              <motion.div {...rise(0.3)} className="mt-8 flex flex-wrap items-center gap-3 text-[13px] text-fg-muted">
                <Link href="/templates" className="inline-flex items-center gap-1.5 font-medium text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg-subtle">
                  See what we build <ArrowRightIcon className="size-3.5" />
                </Link>
                <span className="text-fg-subtle">·</span>
                <a href={SITE.studio.call} target="_blank" rel="noreferrer" className="font-medium text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg-subtle">
                  Book a call instead
                </a>
              </motion.div>
            </div>
            <motion.div initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0, 0, 1] }}>
              <PrototypeForm />
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">Packages</p>
            <h2 className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance sm:text-5xl">Fixed scope. Fixed price. No hourly meter.</h2>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {PACKAGES.map((p) => (
              <article key={p.name} className={cn("relative flex flex-col rounded-3xl p-7", p.featured ? "bg-ink text-on-ink shadow-ink" : "border border-border bg-surface shadow-raised")}>
                {p.featured ? <span aria-hidden className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]" /> : null}
                <span className={cn("grid size-10 place-items-center rounded-xl", p.featured ? "bg-accent text-on-accent" : "bg-accent-soft text-accent-fg")}>
                  <p.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-medium tracking-[-0.02em]">{p.name}</h3>
                <p className={cn("mt-1 text-[14px] leading-[1.55]", p.featured ? "opacity-70" : "text-fg-muted")}>{p.blurb}</p>
                <p className="mt-6 text-3xl font-medium tracking-[-0.04em]">{p.price}</p>
                <p className={cn("mt-1 inline-flex items-center gap-1.5 text-[12.5px]", p.featured ? "opacity-60" : "text-fg-subtle")}>
                  <ClockIcon className="size-3.5" /> {p.time}
                </p>
                <ul className={cn("mt-6 flex-1 space-y-2.5 border-t pt-6 text-[14px]", p.featured ? "border-on-ink/15" : "border-border")}>
                  {p.items.map((it) => (
                    <li key={it} className="flex items-center gap-2.5">
                      <CheckIcon className={cn("size-4 shrink-0", p.featured ? "text-accent" : "text-accent-fg")} strokeWidth={2.5} />
                      {it}
                    </li>
                  ))}
                </ul>
                <Button size="lg" variant={p.featured ? "accent" : "outline"} className="mt-7 w-full" render={<a href="#prototype" />}>
                  Start with a free prototype
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">How it goes</p>
            <h2 className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance sm:text-5xl">You see it before you pay for it.</h2>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <li key={p.title} className="relative bg-surface p-7">
                <p className="font-mono text-[12px] text-accent-fg">{p.day}</p>
                <p className="mt-3 text-[17px] font-medium tracking-[-0.02em] text-fg">{p.title}</p>
                <p className="mt-2 text-[14px] leading-[1.6] text-fg-muted">{p.body}</p>
                <span aria-hidden className="absolute top-7 right-7 font-mono text-[40px] leading-none text-fg/[0.06]">{i + 1}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: LayersIcon, t: "Built on this kit", b: "Every product starts from the components on this site, so it looks designed on day one and stays consistent as it grows." },
              { icon: CodeIcon, t: "Your code, your accounts", b: "Repository, hosting and domains are in your name from the first commit. No lock-in, no hostage situations." },
              { icon: SparklesIcon, t: "AI-fast, human-checked", b: "We use AI to move quickly and senior engineers to make sure it holds up when real users arrive." },
            ].map((f) => (
              <div key={f.t} className="rounded-3xl border border-border bg-surface p-7 shadow-raised">
                <f.icon className="size-5 text-accent-fg" />
                <p className="mt-4 text-[16px] font-medium tracking-[-0.01em] text-fg">{f.t}</p>
                <p className="mt-2 text-[14px] leading-[1.6] text-fg-muted">{f.b}</p>
              </div>
            ))}
          </div>
        </section>

        <FaqSection
          title="Before you ask."
          description={
            <>
              Anything else? Book a <a className="font-medium text-fg underline decoration-border-strong underline-offset-4" href={SITE.studio.call} target="_blank" rel="noreferrer">30 minute call</a>.
            </>
          }
          items={STUDIO_FAQ}
        />
      </main>
      <SiteFooter />
    </div>
  )
}
