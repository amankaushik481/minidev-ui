"use client"
import * as React from "react"

export const TEMPLATES = [
  { slug: "lumen", name: "Lumen", kind: "AI SaaS", material: "Glass", blurb: "An AI analyst for finance teams. Live product in the hero, live bento, scroll story, pricing that rolls.", tags: ["SaaS", "AI", "Dashboard"] },
  { slug: "ponte", name: "Ponte", kind: "Fintech app", material: "Metal", blurb: "Money home in 12 seconds. A working transfer app in a phone, live rates, an honest fee calculator.", tags: ["Fintech", "Mobile", "Payments"] },
  { slug: "kura", name: "Kura", kind: "Healthcare marketplace", material: "Paper", blurb: "Book the right doctor today. Live clinic status, slot booking, and the clinic-side queue dashboard.", tags: ["Marketplace", "Health", "Booking"] },
  { slug: "relay", name: "Relay", kind: "AI agents", material: "Hairline", blurb: "Support agents that close the ticket. A live agent run that refunds a charge, a policy file you can edit, approvals.", tags: ["AI", "Agents", "B2B"] },
  { slug: "atlas", name: "Atlas", kind: "Property management", material: "Glass", blurb: "Every property on one map. Click a building for rent and repairs, a tenant app that pays rent in one tap.", tags: ["PropTech", "Portal", "Mobile"] },
  { slug: "forma", name: "Forma", kind: "Agency / studio", material: "Hairline", blurb: "A studio site with huge type, generative case-study covers, scrolling marquee type and a brief form that feels like a conversation.", tags: ["Agency", "Portfolio", "Services"] },
  { slug: "hale", name: "Hale", kind: "DTC product", material: "Paper", blurb: "A product page that sells: a bottle that turns with the light, colour and size pickers, and a swipe-to-close cart.", tags: ["E-commerce", "DTC", "Cart"] },
  { slug: "cadence", name: "Cadence", kind: "Coaching platform", material: "Hairline", blurb: "Your practice, fully booked. A real booking widget with packages and payments, courses and reminders.", tags: ["Creators", "Booking", "Courses"] },
]

export function LivePreview({ slug }: { slug: string }) {
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

