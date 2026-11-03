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

/*
 * The template's first screen as a still (public/templates/previews, captured at
 * 1440x900 in both themes). It used to be a live iframe, which loaded each
 * template's whole app on the main thread; a 20 KB WebP looks the same.
 */
export function LivePreview({ slug }: { slug: string }) {
  const name = TEMPLATES.find((t) => t.slug === slug)?.name ?? slug
  const src = (theme: "light" | "dark", w: number) => `/templates/previews/${slug}-${theme}-${w}.webp`
  const set = (theme: "light" | "dark") => `${src(theme, 480)} 480w, ${src(theme, 960)} 960w`
  const sizes = "(min-width: 1024px) 400px, 92vw"
  return (
    <div className="relative aspect-[1440/900] overflow-hidden rounded-t-[22px] border-b border-border bg-sunken">
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP, nothing for the image optimizer to do */}
      <img
        src={src("light", 960)}
        srcSet={set("light")}
        sizes={sizes}
        alt={`${name} template, first screen`}
        width={1440}
        height={900}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover object-top dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP, nothing for the image optimizer to do */}
      <img
        src={src("dark", 960)}
        srcSet={set("dark")}
        sizes={sizes}
        alt={`${name} template, first screen`}
        width={1440}
        height={900}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 hidden size-full object-cover object-top dark:block"
      />
    </div>
  )
}
