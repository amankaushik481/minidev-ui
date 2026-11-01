import { AgencyPortfolio } from "@/registry/premium/agency-portfolio"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Full width",
    description: "The page is a nav, a hero, a project grid and a footer; give it the full width of its container so the grid gets three columns.",
    code: `<AgencyPortfolio className="w-full" />`,
    node: <AgencyPortfolio className="w-full" />,
  },
  {
    title: "Scaled thumbnail",
    description: "For a template gallery, render the page at double width inside a clipped frame and scale it to half, so the whole top of the page reads as a preview.",
    code: `<div className="h-64 w-full max-w-md overflow-hidden rounded-2xl border border-border shadow-raised">
  <div className="pointer-events-none w-[200%] origin-top-left scale-50" aria-hidden>
    <AgencyPortfolio />
  </div>
</div>`,
    node: (
      <div className="h-64 w-full max-w-md overflow-hidden rounded-2xl border border-border shadow-raised">
        <div className="pointer-events-none w-[200%] origin-top-left scale-50" aria-hidden>
          <AgencyPortfolio />
        </div>
      </div>
    ),
  },
]
