import { HyperText } from "@/registry/premium/hyper-text"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom text and speed",
    description: "text is what settles; duration is the milliseconds the whole line takes, so a longer value scrambles for longer.",
    code: `<HyperText text="INV-2041 paid in full" duration={1800} />`,
    node: <HyperText text="INV-2041 paid in full" duration={1800} />,
  },
  {
    title: "Digits only, on hover",
    description: "characters is the pool the glyphs cycle through; trigger hover leaves it still until the pointer arrives.",
    code: `<HyperText text="$128,400.00" characters="0123456789" trigger="hover" className="text-4xl sm:text-5xl" />`,
    node: <HyperText text="$128,400.00" characters="0123456789" trigger="hover" className="text-4xl sm:text-5xl" />,
  },
  {
    title: "Small, in a status pill",
    description: "Size it down with className and run it once on mount for a status line that decodes as the page loads.",
    code: `<div className="flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2 shadow-xs">
  <span className="size-2 rounded-full bg-success" aria-hidden />
  <HyperText text="ALL LUMEN SYSTEMS OPERATIONAL" trigger="mount" duration={900} className="text-xs sm:text-xs tracking-[0.08em] text-fg-muted" />
</div>`,
    node: (
      <div className="flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2 shadow-xs">
        <span className="size-2 rounded-full bg-success" aria-hidden />
        <HyperText text="ALL LUMEN SYSTEMS OPERATIONAL" trigger="mount" duration={900} className="text-xs sm:text-xs tracking-[0.08em] text-fg-muted" />
      </div>
    ),
  },
]
