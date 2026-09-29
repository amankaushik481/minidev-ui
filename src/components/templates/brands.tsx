"use client"
import * as React from "react"
import { BotIcon, BuildingIcon, StethoscopeIcon } from "lucide-react"

/* Brand definitions for every template (and MiniDev UI itself). The brand
   kit page renders any of these. Colours are read live from the tokens. */

export type Brand = {
  slug: string
  name: string
  kind: string
  tagline: string
  className: string
  material: "hairline" | "glass" | "metal" | "paper"
  mark: React.ReactNode
  wordmark: React.ReactNode
  display: { family: string; css: string; sample: string }
  text: { family: string; css: string }
  voice: { are: string[]; not: string[]; say: string; never: string }
  palette: { token: string; name: string; role: string }[]
}

const GEIST = "var(--font-geist-sans), ui-sans-serif, system-ui"
const MONO = "var(--font-geist-mono), ui-monospace, monospace"
const SERIF = `"Instrument Serif", "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif`

const base = (accentName: string, twoName: string) => [
  { token: "--accent", name: accentName, role: "Actions, links, focus. About 10% of any screen." },
  { token: "--accent-2", name: twoName, role: "Gradients and charts only, next to the accent." },
  { token: "--ink", name: "Ink", role: "Primary buttons, headlines on light." },
  { token: "--bg", name: "Canvas", role: "The page. About 60%." },
  { token: "--surface", name: "Surface", role: "Cards and fields. About 30%." },
  { token: "--fg-muted", name: "Graphite", role: "Body text and labels." },
]

/* The mark scales with whatever box it is placed in (container query units). */
const Tile = ({ children, round }: { children: React.ReactNode; round?: boolean }) => (
  <span style={{ containerType: "size" }} className={`grid size-full place-items-center bg-accent text-on-accent shadow-[inset_0_1px_0_oklch(1_0_0/0.25)] ${round ? "rounded-full" : "rounded-[22%]"}`}>
    <span style={{ fontSize: "52cqh", lineHeight: 1 }} className="grid size-full place-items-center font-semibold tracking-[-0.06em]">{children}</span>
  </span>
)

export const BRANDS: Record<string, Brand> = {
  minidev: {
    slug: "minidev",
    name: "MiniDev UI",
    kind: "Component library",
    tagline: "Every pixel, accounted for.",
    className: "",
    material: "hairline",
    mark: (
      <span className="grid size-full place-items-center rounded-[22%] bg-ink text-on-ink shadow-[inset_0_0_0_1px_oklch(1_0_0/0.16)]">
        <svg viewBox="0 0 24 24" className="size-[58%]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M4 18V6l8 8 8-8v12" />
          <circle cx="20" cy="6" r="1.8" fill="var(--accent)" stroke="none" />
        </svg>
      </span>
    ),
    wordmark: <span style={{ fontFamily: GEIST }} className="font-semibold tracking-[-0.04em]">MiniDev UI</span>,
    display: { family: "Geist", css: GEIST, sample: "Drawn in hairlines." },
    text: { family: "Geist Mono for data", css: MONO },
    voice: {
      are: ["Precise", "Calm", "Generous"],
      not: ["Hype", "Cute", "Vague"],
      say: "Copy the file. Own the code.",
      never: "Supercharge your workflow with next-gen AI magic.",
    },
    palette: base("Violet 283", "Orchid"),
  },
  lumen: {
    slug: "lumen",
    name: "Lumen",
    kind: "AI SaaS",
    tagline: "Answers from your data, before you ask.",
    className: "tpl-lumen",
    material: "glass",
    mark: <Tile>L</Tile>,
    wordmark: <span style={{ fontFamily: GEIST }} className="font-semibold tracking-[-0.04em]">Lumen</span>,
    display: { family: "Geist", css: GEIST, sample: "Know what changed." },
    text: { family: "Geist", css: GEIST },
    voice: { are: ["Clear", "Confident", "Numerate"], not: ["Jargon", "Alarmist", "Robotic"], say: "Churn rose 0.4% after the price change. Here is why.", never: "Unlock actionable insights at scale." },
    palette: base("Lumen violet", "Dusk pink"),
  },
  ponte: {
    slug: "ponte",
    name: "Ponte",
    kind: "Fintech app",
    tagline: "Money home in 12 seconds.",
    className: "tpl-ponte",
    material: "metal",
    mark: (
      <Tile>
        <svg viewBox="0 0 16 16" className="size-[60%]" aria-hidden>
          <path d="M2 11c2-4 4-6 6-6s4 2 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M2 11h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </Tile>
    ),
    wordmark: <span style={{ fontFamily: GEIST }} className="font-semibold tracking-[-0.04em]">Ponte</span>,
    display: { family: "Geist", css: GEIST, sample: "Money home." },
    text: { family: "Geist Mono for amounts", css: MONO },
    voice: { are: ["Warm", "Exact", "Bilingual"], not: ["Salesy", "Fine print", "Cold"], say: "Mãe got R$ 1.814,20. It took 11 seconds.", never: "Competitive rates on international remittances." },
    palette: base("Pix green", "Lagoon"),
  },
  kura: {
    slug: "kura",
    name: "Kura",
    kind: "Healthcare marketplace",
    tagline: "Know who's in before you leave home.",
    className: "tpl-kura",
    material: "paper",
    mark: (
      <Tile round>
        <StethoscopeIcon className="size-[52%]" />
      </Tile>
    ),
    wordmark: <span style={{ fontFamily: SERIF }} className="tracking-[-0.02em]">Kura</span>,
    display: { family: "Instrument Serif", css: SERIF, sample: "The right doctor, today." },
    text: { family: "Geist", css: GEIST },
    voice: { are: ["Kind", "Local", "Plain"], not: ["Clinical", "Scary", "Corporate"], say: "Dr Qadri is in. About 12 minutes wait.", never: "Leverage our healthcare ecosystem." },
    palette: base("Chinar teal", "Saffron"),
  },
  relay: {
    slug: "relay",
    name: "relay",
    kind: "AI agents",
    tagline: "Agents that close the ticket.",
    className: "tpl-relay",
    material: "hairline",
    mark: (
      <Tile>
        <BotIcon className="size-[55%]" />
      </Tile>
    ),
    wordmark: <span style={{ fontFamily: MONO }} className="font-semibold tracking-[-0.03em]">relay</span>,
    display: { family: "Geist", css: GEIST, sample: "Resolved in 4 seconds." },
    text: { family: "Geist Mono", css: MONO },
    voice: { are: ["Direct", "Accountable", "Technical"], not: ["Magic", "Vague", "Overpromising"], say: "Refunded $49. Rule: refund.max_amount.", never: "Our AI understands your customers like a human." },
    palette: base("Signal amber", "Gold"),
  },
  atlas: {
    slug: "atlas",
    name: "Atlas",
    kind: "Property management",
    tagline: "Every property, one calm screen.",
    className: "tpl-atlas",
    material: "glass",
    mark: (
      <Tile>
        <BuildingIcon className="size-[52%]" />
      </Tile>
    ),
    wordmark: <span style={{ fontFamily: GEIST }} className="font-semibold tracking-[-0.04em]">Atlas</span>,
    display: { family: "Geist", css: GEIST, sample: "Off your weekends." },
    text: { family: "Geist", css: GEIST },
    voice: { are: ["Calm", "Organised", "Practical"], not: ["Stressful", "Legalese", "Pushy"], say: "Rent is in. Two repairs booked for Thursday.", never: "Revolutionising the rental experience." },
    palette: base("Harbour blue", "Sea glass"),
  },
  cadence: {
    slug: "cadence",
    name: "Cadence",
    kind: "Coaching platform",
    tagline: "Your practice, fully booked.",
    className: "tpl-cadence",
    material: "hairline",
    mark: (
      <Tile round>
        <svg viewBox="0 0 16 16" className="size-[60%]" aria-hidden>
          <path d="M2 10c1.5-4 3-4 4 0s2.5 4 4 0 2.5-4 4 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </Tile>
    ),
    wordmark: <span style={{ fontFamily: GEIST }} className="font-semibold tracking-[-0.04em]">Cadence</span>,
    display: { family: "Geist", css: GEIST, sample: "Spend your week coaching." },
    text: { family: "Geist", css: GEIST },
    voice: { are: ["Encouraging", "Human", "Tidy"], not: ["Guru", "Pushy", "Fluffy"], say: "James booked six sessions. £600 paid.", never: "10x your coaching business overnight." },
    palette: base("Coral", "Apricot"),
  },
  forma: {
    slug: "forma",
    name: "Forma",
    kind: "Agency / studio",
    tagline: "We design and build products people love.",
    className: "tpl-forma",
    material: "hairline",
    mark: <Tile round>F</Tile>,
    wordmark: <span style={{ fontFamily: GEIST }} className="font-semibold tracking-[-0.05em]">Forma</span>,
    display: { family: "Geist", css: GEIST, sample: "Let's make it." },
    text: { family: "Geist", css: GEIST },
    voice: { are: ["Bold", "Senior", "Brief"], not: ["Agency-speak", "Humble-brag", "Long"], say: "Six weeks from brief to launch.", never: "We are a full-service digital transformation partner." },
    palette: base("Acid lime", "Pollen"),
  },
  hale: {
    slug: "hale",
    name: "hale.",
    kind: "DTC product",
    tagline: "The last bottle you'll buy.",
    className: "tpl-hale",
    material: "paper",
    mark: <Tile round>h.</Tile>,
    wordmark: <span style={{ fontFamily: GEIST }} className="font-semibold tracking-[-0.06em]">hale.</span>,
    display: { family: "Geist", css: GEIST, sample: "Ice at bedtime." },
    text: { family: "Geist", css: GEIST },
    voice: { are: ["Playful", "Honest", "Outdoorsy"], not: ["Preachy", "Techy", "Discount-y"], say: "Left it in a hot car. Ice at 6pm.", never: "Premium hydration solutions for modern lifestyles." },
    palette: base("Tide", "Sage"),
  },
}
