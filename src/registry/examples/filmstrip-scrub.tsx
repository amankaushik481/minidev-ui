import { FilmstripScrub } from "@/registry/premium/filmstrip-scrub"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Fewer frames",
    description: "frames sets how many thumbnails and range steps there are; six fit without scrolling.",
    code: `<FilmstripScrub frames={6} className="w-full max-w-lg" />`,
    node: <FilmstripScrub frames={6} className="w-full max-w-lg" />,
  },
  {
    title: "Long strip",
    description: "With more frames than fit, the strip scrolls sideways while the slider still reaches every frame.",
    code: `<FilmstripScrub frames={24} className="w-full max-w-xl" />`,
    node: <FilmstripScrub frames={24} className="w-full max-w-xl" />,
  },
  {
    title: "In a panel",
    description: "Give it a heading and a border to use it as a review tool, for example stepping through a deploy preview.",
    code: `<div className="w-full max-w-2xl rounded-2xl border border-border bg-surface p-5 shadow-raised">
  <div className="mb-4 flex items-center justify-between gap-3">
    <div>
      <p className="text-sm font-medium text-fg">Deploy 4f2a9c, checkout flow</p>
      <p className="text-xs text-fg-muted">Recorded by Theo Okafor, 12 frames at 2 fps</p>
    </div>
    <span className="rounded-full border border-border bg-bg px-2 py-0.5 text-[11px] font-medium text-fg-muted">Preview</span>
  </div>
  <FilmstripScrub frames={12} />
</div>`,
    node: (
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-surface p-5 shadow-raised">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-fg">Deploy 4f2a9c, checkout flow</p>
            <p className="text-xs text-fg-muted">Recorded by Theo Okafor, 12 frames at 2 fps</p>
          </div>
          <span className="rounded-full border border-border bg-bg px-2 py-0.5 text-[11px] font-medium text-fg-muted">Preview</span>
        </div>
        <FilmstripScrub frames={12} />
      </div>
    ),
  },
]
