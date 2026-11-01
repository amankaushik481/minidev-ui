import { ArrowRightIcon } from "lucide-react"
import { FlickeringGrid } from "@/registry/premium/flickering-grid"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom content",
    description: "Children sit above the canvas; size the panel with className and the grid fills whatever is left.",
    code: `<FlickeringGrid className="h-80">
  <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
    <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Lumen infrastructure</p>
    <p className="max-w-[18ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">Built for the night the books close</p>
    <Button>Read the architecture <ArrowRightIcon /></Button>
  </div>
</FlickeringGrid>`,
    node: (
      <FlickeringGrid className="h-80">
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Lumen infrastructure</p>
          <p className="max-w-[18ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">Built for the night the books close</p>
          <Button>Read the architecture <ArrowRightIcon /></Button>
        </div>
      </FlickeringGrid>
    ),
  },
  {
    title: "Bigger squares, another colour",
    description: "squareSize and gap set the pitch of the grid; color takes any CSS colour, tokens included, and maxOpacity caps the brightness.",
    code: `<FlickeringGrid squareSize={8} gap={8} color="var(--success)" maxOpacity={0.5} className="h-64" />`,
    node: <FlickeringGrid squareSize={8} gap={8} color="var(--success)" maxOpacity={0.5} className="h-64" />,
  },
  {
    title: "Slow and edge to edge",
    description: "mask none drops the radial fade and a low flickerChance makes the squares change only now and then.",
    code: `<FlickeringGrid mask="none" flickerChance={0.12} className="h-56" />`,
    node: <FlickeringGrid mask="none" flickerChance={0.12} className="h-56" />,
  },
]
