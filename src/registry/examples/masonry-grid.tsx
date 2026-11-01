import { AspectRatio } from "@/registry/ui/aspect-ratio"
import { MasonryGrid } from "@/registry/ui/masonry-grid"
import type { Example } from "./types"

const NOTES = [
  { author: "Maya Chen", text: "Northwind wants net 45 on the next renewal. Fine if the volume commit stays." },
  { author: "Theo Okafor", text: "Bank sync matched 212 of 219 transfers this week. The 7 misses were missing references." },
  { author: "Priya Raman", text: "Pricing page copy is drafted. Needs a pass on the enterprise tier wording, the current version promises SSO on every plan which is not true, and a decision on whether we show annual prices first." },
  { author: "Sam Lowe", text: "Deploy window moved to 17:00 Thursdays." },
  { author: "Maya Chen", text: "Helix Biotech asked for a PO field on invoices. Two other customers asked for the same thing in September, so it should move up the list." },
  { author: "Theo Okafor", text: "INV-2033 reminder sent." },
]

const TILES = [
  { id: 1, ratio: 1, tint: 10 },
  { id: 2, ratio: 3 / 4, tint: 18 },
  { id: 3, ratio: 4 / 3, tint: 6 },
  { id: 4, ratio: 1, tint: 14 },
  { id: 5, ratio: 2 / 3, tint: 22 },
  { id: 6, ratio: 4 / 3, tint: 8 },
  { id: 7, ratio: 3 / 4, tint: 12 },
  { id: 8, ratio: 1, tint: 20 },
]

export const examples: Example[] = [
  {
    title: "Note cards",
    description: "Cards of different lengths pack into columns while keeping source order, so tabbing through them still reads left to right.",
    code: `const NOTES = [
  { author: "Maya Chen", text: "Northwind wants net 45 on the next renewal. Fine if the volume commit stays." },
  { author: "Theo Okafor", text: "Bank sync matched 212 of 219 transfers this week. The 7 misses were missing references." },
  { author: "Priya Raman", text: "Pricing page copy is drafted. Needs a pass on the enterprise tier wording, the current version promises SSO on every plan which is not true, and a decision on whether we show annual prices first." },
  { author: "Sam Lowe", text: "Deploy window moved to 17:00 Thursdays." },
  { author: "Maya Chen", text: "Helix Biotech asked for a PO field on invoices. Two other customers asked for the same thing in September, so it should move up the list." },
  { author: "Theo Okafor", text: "INV-2033 reminder sent." },
]

<MasonryGrid minColumnWidth={200} gap={16} className="max-w-2xl">
  {NOTES.map((n, i) => (
    <div key={i} className="rounded-xl border border-border bg-surface p-4 shadow-raised">
      <p className="text-sm leading-[1.55] text-fg">{n.text}</p>
      <p className="mt-3 text-xs text-fg-muted">{n.author}</p>
    </div>
  ))}
</MasonryGrid>`,
    node: (
      <MasonryGrid minColumnWidth={200} gap={16} className="max-w-2xl">
        {NOTES.map((n, i) => (
          <div key={i} className="rounded-xl border border-border bg-surface p-4 shadow-raised">
            <p className="text-sm leading-[1.55] text-fg">{n.text}</p>
            <p className="mt-3 text-xs text-fg-muted">{n.author}</p>
          </div>
        ))}
      </MasonryGrid>
    ),
  },
  {
    title: "Compact media tiles",
    description: "Narrow columns and a small gap for a photo wall; each tile keeps its own aspect ratio.",
    code: `const TILES = [
  { id: 1, ratio: 1, tint: 10 },
  { id: 2, ratio: 3 / 4, tint: 18 },
  { id: 3, ratio: 4 / 3, tint: 6 },
  { id: 4, ratio: 1, tint: 14 },
  { id: 5, ratio: 2 / 3, tint: 22 },
  { id: 6, ratio: 4 / 3, tint: 8 },
  { id: 7, ratio: 3 / 4, tint: 12 },
  { id: 8, ratio: 1, tint: 20 },
]

<MasonryGrid minColumnWidth={120} gap={8} className="max-w-xl">
  {TILES.map((t) => (
    <AspectRatio
      key={t.id}
      ratio={t.ratio}
      className="grid place-items-center rounded-lg border border-border text-xs text-fg-subtle"
      style={{ background: "color-mix(in oklch, var(--accent) " + t.tint + "%, var(--surface))" }}
    >
      {t.id}
    </AspectRatio>
  ))}
</MasonryGrid>`,
    node: (
      <MasonryGrid minColumnWidth={120} gap={8} className="max-w-xl">
        {TILES.map((t) => (
          <AspectRatio
            key={t.id}
            ratio={t.ratio}
            className="grid place-items-center rounded-lg border border-border text-xs text-fg-subtle"
            style={{ background: "color-mix(in oklch, var(--accent) " + t.tint + "%, var(--surface))" }}
          >
            {t.id}
          </AspectRatio>
        ))}
      </MasonryGrid>
    ),
  },
]
