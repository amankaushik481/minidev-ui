"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CheckIcon, MinusIcon, PlusIcon, ShoppingBagIcon, StarIcon, ThermometerIcon, TruckIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { TemplateFooter, TemplateShell } from "@/components/templates/template-bar"
import { FloatingNav } from "@/registry/blocks/floating-nav"
import { SocialProofWall } from "@/registry/blocks/social-proof-wall"
import { FaqSection } from "@/registry/blocks/faq-section"
import { CtaBand } from "@/registry/blocks/cta-band"
import { Button } from "@/registry/ui/button"
import { NumberRoll } from "@/registry/ui/number-roll"

const COLORS = [
  { id: "tide", name: "Tide", body: "oklch(0.62 0.1 215)", deep: "oklch(0.42 0.09 225)" },
  { id: "sage", name: "Sage", body: "oklch(0.7 0.07 150)", deep: "oklch(0.48 0.06 155)" },
  { id: "clay", name: "Clay", body: "oklch(0.66 0.11 45)", deep: "oklch(0.46 0.09 40)" },
  { id: "ink", name: "Ink", body: "oklch(0.32 0.02 260)", deep: "oklch(0.18 0.02 260)" },
]
const SIZES = [
  { id: "500", label: "500 ml", price: 38 },
  { id: "750", label: "750 ml", price: 44 },
  { id: "1l", label: "1 litre", price: 52 },
]

const Brand = () => <span className="text-[19px] font-semibold tracking-[-0.05em] text-fg">hale.</span>

/* A bottle drawn in CSS that turns toward the light. */
function Bottle({ color, size }: { color: (typeof COLORS)[number]; size: string }) {
  const h = size === "500" ? 0.86 : size === "750" ? 0.94 : 1
  return (
    <div className="relative mx-auto h-[460px] w-[190px] [perspective:900px]" aria-label={`${color.name} bottle`} role="img">
      <div className="absolute inset-0" style={{ transform: "rotateY(calc(var(--sx) * 14deg))" }}>
      <motion.div
        className="absolute inset-x-0 bottom-0 origin-bottom"
        animate={{ scaleY: h }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        style={{ height: "100%" }}
      >
        {/* cap */}
        <div className="mx-auto h-[56px] w-[92px] rounded-t-[22px] rounded-b-md" style={{ background: `linear-gradient(90deg, oklch(0.2 0.01 260), oklch(0.42 0.01 260) 40%, oklch(0.22 0.01 260))` }} />
        <div className="mx-auto h-3 w-[104px] rounded-sm bg-[oklch(0.8_0.005_260)]" />
        {/* body */}
        <motion.div
          className="relative mx-auto mt-1 h-[calc(100%-80px)] w-full overflow-hidden rounded-[38px]"
          animate={{ background: `linear-gradient(90deg, ${color.deep} 0%, ${color.body} 35%, ${color.body} 55%, ${color.deep} 100%)` }}
          transition={{ duration: 0.5 }}
          style={{ boxShadow: `var(--o28x) var(--o28y) 60px -20px ${color.deep}` }}
        >
          <div aria-hidden className="absolute inset-y-0 w-10 opacity-60 mix-blend-screen" style={{ left: "calc(22% - var(--sx) * 14%)", background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.75), transparent)" }} />
          <p className="absolute bottom-10 left-0 w-full text-center text-[22px] font-semibold tracking-[-0.05em] text-white/85">hale.</p>
        </motion.div>
      </motion.div>
      </div>
      <div aria-hidden className="absolute -bottom-4 left-1/2 h-6 w-[80%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-md" />
    </div>
  )
}

type Line = { key: string; color: string; size: string; qty: number; price: number }

function Cart({ open, onClose, lines, setLines }: { open: boolean; onClose: () => void; lines: Line[]; setLines: React.Dispatch<React.SetStateAction<Line[]>> }) {
  const reduce = useReducedMotion()
  const sub = lines.reduce((a, l) => a + l.qty * l.price, 0)
  const free = Math.max(0, 60 - sub)
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div key="scrim" className="fixed inset-0 z-[80] bg-scrim backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside
            key="cart"
            role="dialog"
            aria-label="Your bag"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.05, right: 0.6 }}
            onDragEnd={(_, i) => (i.offset.x > 120 || i.velocity.x > 500) && onClose()}
            className="fixed top-0 right-0 bottom-0 z-[90] flex w-full max-w-md flex-col border-l border-border bg-raised shadow-overlay"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <p className="text-[17px] font-medium text-fg">Your bag</p>
              <button type="button" onClick={onClose} aria-label="Close bag" className="grid size-9 place-items-center rounded-full text-fg-muted outline-none hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent">
                <XIcon className="size-4" />
              </button>
            </div>
            <div className="border-b border-border px-6 py-4">
              <p className="text-[13px] text-fg">{free > 0 ? <>£{free} away from free delivery</> : <span className="text-success">Free delivery unlocked</span>}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sunken">
                <motion.div className="h-full rounded-full bg-accent" animate={{ width: `${Math.min(100, (sub / 60) * 100)}%` }} transition={{ type: "spring", bounce: 0.12, duration: 0.6 }} />
              </div>
            </div>
            <ul className="flex-1 space-y-3 overflow-y-auto p-6">
              <AnimatePresence initial={false}>
                {lines.map((l) => {
                  const c = COLORS.find((x) => x.id === l.color)!
                  return (
                    <motion.li key={l.key} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-3 shadow-raised">
                      <span className="h-16 w-10 rounded-xl" style={{ background: `linear-gradient(90deg, ${c.deep}, ${c.body}, ${c.deep})` }} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-medium text-fg">Hale bottle</p>
                        <p className="text-[12.5px] text-fg-muted">
                          {c.name} · {SIZES.find((s) => s.id === l.size)!.label}
                        </p>
                        <div className="mt-2 inline-flex items-center rounded-full border border-border">
                          <button type="button" aria-label="Fewer" className="grid size-7 place-items-center text-fg-muted hover:text-fg" onClick={() => setLines((x) => x.map((y) => (y.key === l.key ? { ...y, qty: y.qty - 1 } : y)).filter((y) => y.qty > 0))}>
                            <MinusIcon className="size-3" />
                          </button>
                          <span className="w-5 text-center text-[13px] tabular-nums">{l.qty}</span>
                          <button type="button" aria-label="More" className="grid size-7 place-items-center text-fg-muted hover:text-fg" onClick={() => setLines((x) => x.map((y) => (y.key === l.key ? { ...y, qty: y.qty + 1 } : y)))}>
                            <PlusIcon className="size-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[14px] font-medium text-fg tabular-nums">£{l.qty * l.price}</p>
                    </motion.li>
                  )
                })}
              </AnimatePresence>
              {lines.length === 0 ? <p className="py-16 text-center text-[14px] text-fg-muted">Your bag is empty.</p> : null}
            </ul>
            <div className="border-t border-border p-6">
              <div className="flex items-center justify-between text-[15px]">
                <span className="text-fg-muted">Subtotal</span>
                <span className="text-xl font-semibold text-fg">
                  <NumberRoll value={sub} format={{ style: "currency", currency: "GBP", maximumFractionDigits: 0 }} />
                </span>
              </div>
              <Button size="xl" className="mt-4 w-full" disabled={!lines.length}>
                Checkout
              </Button>
              <p className="mt-3 text-center text-[12px] text-fg-subtle">Swipe right to close · 60-day returns</p>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}

export default function HaleTemplate() {
  const reduce = useReducedMotion()
  const [color, setColor] = React.useState(COLORS[0])
  const [size, setSize] = React.useState(SIZES[1])
  const [lines, setLines] = React.useState<Line[]>([])
  const [open, setOpen] = React.useState(false)
  const count = lines.reduce((a, l) => a + l.qty, 0)
  const add = () => {
    const key = `${color.id}-${size.id}`
    setLines((x) => (x.some((l) => l.key === key) ? x.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l)) : [...x, { key, color: color.id, size: size.id, qty: 1, price: size.price }]))
    setOpen(true)
  }
  const rise = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 14, filter: "blur(6px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay: d, ease: [0.2, 0, 0, 1] as const } })
  return (
    <TemplateShell name="Hale" kind="DTC product" material="paper" className="tpl-hale">
      <FloatingNav
        brand={<Brand />}
        links={[
          { label: "Shop", href: "#shop" },
          { label: "Why Hale", href: "#why" },
          { label: "Reviews", href: "#reviews" },
          { label: "FAQ", href: "#faq" },
        ]}
        secondary={null}
        cta={{ label: count ? `Bag (${count})` : "Bag", onClick: () => setOpen(true) }}
      />
      <main>
        <section id="shop" className="relative isolate scroll-mt-24 overflow-hidden">
          <div aria-hidden className="light-spot absolute inset-0 -z-10" />
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:pt-20">
            <motion.div initial={reduce ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.2, 0, 0, 1] }} className="relative order-1 lg:order-none">
              <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[90px] transition-colors duration-700" style={{ background: color.body }} />
              <Bottle color={color} size={size.id} />
              {[
                { t: "24h cold", i: ThermometerIcon, pos: "top-16 left-[8%]" },
                { t: "Leakproof", i: CheckIcon, pos: "top-44 right-[6%]" },
                { t: "340 g", i: StarIcon, pos: "bottom-24 left-[10%]" },
              ].map((c, k) => (
                <span key={c.t} className={cn("absolute hidden animate-[rise-in_600ms_var(--ease-hairline)_both] items-center gap-1.5 rounded-full border border-border bg-raised px-3 py-1.5 text-[12px] font-medium text-fg shadow-overlay sm:inline-flex", c.pos)} style={{ animationDelay: `${900 + k * 150}ms` }}>
                  <c.i className="size-3.5 text-accent-fg" /> {c.t}
                </span>
              ))}
            </motion.div>
            <div>
              <motion.p {...rise(0)} className="flex items-center gap-1.5 text-[13px] text-fg-muted">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} className="size-3.5 fill-current text-warning" />
                ))}
                <span className="ml-1">4.9 from 3,120 reviews</span>
              </motion.p>
              <motion.h1 {...rise(0.08)} className="mt-4 text-[3rem] leading-[0.98] font-medium tracking-[-0.05em] text-balance text-fg sm:text-7xl">
                The last bottle
                <br />
                <span className="text-lit">you&apos;ll buy.</span>
              </motion.h1>
              <motion.p {...rise(0.16)} className="mt-5 max-w-md text-lg leading-[1.6] text-fg-muted">
                Cold for 24 hours, hot for 12, one-hand lid, dishwasher safe. Made from 90% recycled steel and guaranteed for life.
              </motion.p>
              <motion.div {...rise(0.22)} className="mt-8 space-y-6">
                <div>
                  <p className="text-[13px] text-fg-muted">
                    Colour · <span className="font-medium text-fg">{color.name}</span>
                  </p>
                  <div className="mt-2.5 flex gap-2.5">
                    {COLORS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setColor(c)}
                        aria-label={c.name}
                        aria-pressed={c.id === color.id}
                        className={cn("size-9 rounded-full outline-none transition-[box-shadow,transform] duration-200 ease-hairline hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent", c.id === color.id ? "ring-2 ring-fg ring-offset-2 ring-offset-bg" : "ring-1 ring-border")}
                        style={{ background: `linear-gradient(135deg, ${c.body}, ${c.deep})` }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[13px] text-fg-muted">Size</p>
                  <div className="mt-2.5 grid max-w-sm grid-cols-3 gap-2">
                    {SIZES.map((s) => (
                      <button key={s.id} type="button" onClick={() => setSize(s)} aria-pressed={s.id === size.id} className={cn("rounded-xl border px-3 py-2.5 text-left outline-none transition-[border-color,box-shadow] duration-[140ms] focus-visible:ring-2 focus-visible:ring-accent", s.id === size.id ? "border-ink shadow-[0_0_0_1px_var(--ink)]" : "border-border hover:border-border-strong")}>
                        <span className="block text-[13.5px] font-medium text-fg">{s.label}</span>
                        <span className="block text-[12px] text-fg-muted">£{s.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex max-w-sm items-center gap-3">
                  <Button size="xl" className="flex-1" onClick={add}>
                    <ShoppingBagIcon /> Add to bag ·{" "}
                    <NumberRoll value={size.price} format={{ style: "currency", currency: "GBP", maximumFractionDigits: 0 }} />
                  </Button>
                </div>
                <p className="flex items-center gap-2 text-[12.5px] text-fg-muted">
                  <TruckIcon className="size-4" /> Free delivery over £60 · order by 3pm, ships today
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="why" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { k: "24h", t: "Ice still clinking at bedtime", b: "Double-wall vacuum steel, tested at 30°C in a hot car." },
              { k: "0", t: "Leaks. We checked 10,000 times", b: "A one-hand lid with a seal that clicks when it is closed." },
              { k: "∞", t: "Guaranteed for life", b: "Dent it, crack it, lose the lid. We replace it, free." },
            ].map((f) => (
              <div key={f.t} className="rounded-3xl border border-border bg-surface p-8 shadow-raised">
                <p className="text-6xl font-medium tracking-[-0.06em] text-accent-fg">{f.k}</p>
                <p className="mt-6 text-lg font-medium tracking-[-0.02em] text-fg">{f.t}</p>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-fg-muted">{f.b}</p>
              </div>
            ))}
          </div>
        </section>

        <div id="reviews" className="scroll-mt-24">
          <SocialProofWall
            eyebrow="Reviews"
            title="3,120 people with cold water."
            logos={["As seen in Field Notes", "Gear Weekly", "The Outdoor Edit", "Daily Carry", "Commute Club"]}
            quotes={[
              { quote: "Left it in the car all day in July. Ice cubes at 6pm.", name: "Sophie K.", role: "Verified buyer · Tide 750", metric: "5 stars" },
              { quote: "The lid is the best part. One hand, on the bike, no drips.", name: "Marco L.", role: "Verified buyer · Ink 500" },
              { quote: "Bought four for the family. The colours are even better in person.", name: "Aisha R.", role: "Verified buyer · Sage 1 litre", metric: "5 stars" },
              { quote: "I dented mine on a hike and they sent a new one in two days.", name: "Jon P.", role: "Verified buyer · Clay 750" },
              { quote: "Fits the car cup holder, which apparently is rare.", name: "Emma T.", role: "Verified buyer · Tide 500" },
              { quote: "No metallic taste at all, even with coffee.", name: "Ravi S.", role: "Verified buyer · Ink 750" },
            ]}
          />
        </div>
        <div id="faq" className="scroll-mt-24">
          <FaqSection
            items={[
              { q: "Is it dishwasher safe?", a: "Yes, the whole bottle and lid, top rack or bottom." },
              { q: "What is the lifetime guarantee?", a: "If anything breaks, including dents and lost lids, we replace it free. Just send a photo." },
              { q: "How long does delivery take?", a: "Next day in the UK for orders before 3pm. Free over £60." },
              { q: "Can I return it?", a: "Within 60 days, used or not, for a full refund." },
            ]}
          />
        </div>
        <CtaBand
          title={
            <>
              Your first bottle,
              <br />
              <span className="text-lit">10% off.</span>
            </>
          }
          description="Join 40,000 people who get new colours before anyone else."
          button="Get 10% off"
          success="Code sent"
          note="Sample template by MiniDev. Hale is a fictional brand; reviews are sample content."
        />
      </main>
      <TemplateFooter brand={<Brand />} note="The last bottle you'll buy. A MiniDev template; Hale is a fictional brand." />
      <Cart open={open} onClose={() => setOpen(false)} lines={lines} setLines={setLines} />
    </TemplateShell>
  )
}
