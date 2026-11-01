import { AspectRatio } from "@/registry/ui/aspect-ratio"
import { Carousel } from "@/registry/ui/carousel"
import type { Example } from "./types"

const STORIES = [
  { quote: "Lumen cut our month end close from four days to one.", name: "Maya Chen", role: "Finance lead, Northwind" },
  { quote: "Invoices go out the same hour the work is approved.", name: "Theo Okafor", role: "Operations, Helix Biotech" },
  { quote: "The reminders alone recovered $18k in late payments.", name: "Priya Raman", role: "Founder, Juniper Studio" },
  { quote: "Set up took an afternoon, including the bank sync.", name: "Sam Lowe", role: "CTO, Meridian Freight" },
]

const RELEASES = [
  { version: "v2.4", title: "Bank sync", tint: 14 },
  { version: "v2.3", title: "Reminders", tint: 10 },
  { version: "v2.2", title: "Customer portal", tint: 18 },
  { version: "v2.1", title: "Multi currency", tint: 8 },
  { version: "v2.0", title: "New dashboard", tint: 22 },
]

export const examples: Example[] = [
  {
    title: "Customer stories",
    description: "Each child becomes a snap aligned slide; arrows and the arrow keys scroll by most of the visible width.",
    code: `const STORIES = [
  { quote: "Lumen cut our month end close from four days to one.", name: "Maya Chen", role: "Finance lead, Northwind" },
  { quote: "Invoices go out the same hour the work is approved.", name: "Theo Okafor", role: "Operations, Helix Biotech" },
  { quote: "The reminders alone recovered $18k in late payments.", name: "Priya Raman", role: "Founder, Juniper Studio" },
  { quote: "Set up took an afternoon, including the bank sync.", name: "Sam Lowe", role: "CTO, Meridian Freight" },
]

<Carousel label="Customer stories" className="w-full max-w-2xl">
  {STORIES.map((s) => (
    <figure key={s.name} className="flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-4 shadow-raised">
      <blockquote className="text-sm leading-[1.55] text-fg">“{s.quote}”</blockquote>
      <figcaption className="mt-4 text-xs text-fg-muted">
        <span className="font-medium text-fg">{s.name}</span> · {s.role}
      </figcaption>
    </figure>
  ))}
</Carousel>`,
    node: (
      <Carousel label="Customer stories" className="w-full max-w-2xl">
        {STORIES.map((s) => (
          <figure key={s.name} className="flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-4 shadow-raised">
            <blockquote className="text-sm leading-[1.55] text-fg">“{s.quote}”</blockquote>
            <figcaption className="mt-4 text-xs text-fg-muted">
              <span className="font-medium text-fg">{s.name}</span> · {s.role}
            </figcaption>
          </figure>
        ))}
      </Carousel>
    ),
  },
  {
    title: "Media tiles",
    description: "Fixed ratio tiles with a caption under each; swap the tinted background for an image.",
    code: `const RELEASES = [
  { version: "v2.4", title: "Bank sync", tint: 14 },
  { version: "v2.3", title: "Reminders", tint: 10 },
  { version: "v2.2", title: "Customer portal", tint: 18 },
  { version: "v2.1", title: "Multi currency", tint: 8 },
  { version: "v2.0", title: "New dashboard", tint: 22 },
]

<Carousel label="Release highlights" className="w-full max-w-2xl">
  {RELEASES.map((r) => (
    <div key={r.version}>
      <AspectRatio
        ratio={4 / 3}
        className="grid place-items-center rounded-xl border border-border"
        style={{ background: "color-mix(in oklch, var(--accent) " + r.tint + "%, var(--surface))" }}
      >
        <span className="font-mono text-xs text-fg-muted">{r.version}</span>
      </AspectRatio>
      <p className="mt-2 text-sm font-medium text-fg">{r.title}</p>
    </div>
  ))}
</Carousel>`,
    node: (
      <Carousel label="Release highlights" className="w-full max-w-2xl">
        {RELEASES.map((r) => (
          <div key={r.version}>
            <AspectRatio
              ratio={4 / 3}
              className="grid place-items-center rounded-xl border border-border"
              style={{ background: "color-mix(in oklch, var(--accent) " + r.tint + "%, var(--surface))" }}
            >
              <span className="font-mono text-xs text-fg-muted">{r.version}</span>
            </AspectRatio>
            <p className="mt-2 text-sm font-medium text-fg">{r.title}</p>
          </div>
        ))}
      </Carousel>
    ),
  },
]
