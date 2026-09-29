"use client"
import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { Button } from "@/registry/ui/button"

const TEMPLATES = [
  { slug: "lumen", name: "Lumen", kind: "AI SaaS", material: "Glass", blurb: "An AI analyst for finance teams. Live product in the hero, live bento, scroll story, pricing that rolls.", tags: ["SaaS", "AI", "Dashboard"] },
  { slug: "ponte", name: "Ponte", kind: "Fintech app", material: "Metal", blurb: "Money home in 12 seconds. A working transfer app in a phone, live rates, an honest fee calculator.", tags: ["Fintech", "Mobile", "Payments"] },
  { slug: "kura", name: "Kura", kind: "Healthcare marketplace", material: "Paper", blurb: "Book the right doctor today. Live clinic status, slot booking, and the clinic-side queue dashboard.", tags: ["Marketplace", "Health", "Booking"] },
]

function LivePreview({ slug }: { slug: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(0.35)
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setScale(el.clientWidth / 1440))
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShow(true), { rootMargin: "200px" })
    io.observe(el)
    return () => { ro.disconnect(); io.disconnect() }
  }, [])
  return (
    <div ref={ref} className="relative aspect-[1440/900] overflow-hidden rounded-t-[22px] border-b border-border bg-sunken">
      {show ? (
        <iframe
          src={`/templates/${slug}`}
          title={`${slug} template preview`}
          tabIndex={-1}
          loading="lazy"
          className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
          style={{ width: 1440, height: 900, transform: `scale(${scale})` }}
        />
      ) : null}
      <div className="absolute inset-0" aria-hidden />
    </div>
  )
}

export default function TemplatesIndex() {
  const reduce = useReducedMotion()
  return (
    <div className="min-h-full bg-bg text-fg">
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden">
          <div aria-hidden className="light-spot absolute inset-0 -z-10" />
          <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 sm:pt-24 lg:px-8">
            <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }} className="max-w-3xl">
              <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">Templates</p>
              <h1 className="mt-3 text-5xl leading-[1] font-medium tracking-[-0.05em] text-balance sm:text-7xl">
                Whole products,
                <br />
                <span className="text-lit">not just pages.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-[1.6] text-fg-muted">
                Each template is a real product story with working UI inside it. Open one, click around, switch the material. When it looks like your idea, we build the real thing.
              </p>
            </motion.div>
          </div>
        </section>
        <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-24 sm:px-6 lg:grid-cols-3 lg:px-8">
          {TEMPLATES.map((t, i) => (
            <motion.article
              key={t.slug}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: [0.2, 0, 0, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-raised transition-[translate,box-shadow] duration-300 ease-hairline hover:-translate-y-1 hover:shadow-lg"
            >
              <LivePreview slug={t.slug} />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium tracking-[-0.02em]">{t.name}</h2>
                  <span className="rounded-full border border-border bg-sunken px-2.5 py-0.5 text-[11.5px] text-fg-muted">{t.material}</span>
                </div>
                <p className="mt-0.5 text-[13px] text-accent-fg">{t.kind}</p>
                <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-fg-muted">{t.blurb}</p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {t.tags.map((g) => (
                      <span key={g} className="rounded-md bg-sunken px-2 py-0.5 text-[11px] text-fg-muted">{g}</span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[13px] font-medium text-fg">
                    Open <ArrowUpRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
              <Link href={`/templates/${t.slug}`} className="absolute inset-0 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label={`Open the ${t.name} template`} />
            </motion.article>
          ))}
        </section>
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-surface p-8 shadow-raised sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl">Your idea is not on this list?</h2>
              <p className="mt-2 max-w-xl text-[15px] text-fg-muted">Tell us about it. We send back a clickable prototype of your product in 48 hours, free.</p>
            </div>
            <Button size="lg" render={<Link href="/studio#prototype" />}>
              Get my free prototype <ArrowRightIcon />
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
