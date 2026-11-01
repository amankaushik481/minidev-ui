import { ArrowRightIcon } from "lucide-react"
import { BackgroundBoxes } from "@/registry/premium/background-boxes"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom content",
    description: "Children sit above the grid and the pointer still lights boxes through them.",
    code: `<BackgroundBoxes className="h-80">
  <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
    <p className="max-w-[18ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">Every deploy, on the record</p>
    <p className="max-w-sm text-sm text-fg-muted">Lumen keeps a signed log of who shipped what, and when.</p>
    <Button variant="outline">Open the deploy log <ArrowRightIcon /></Button>
  </div>
</BackgroundBoxes>`,
    node: (
      <BackgroundBoxes className="h-80">
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="max-w-[18ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">Every deploy, on the record</p>
          <p className="max-w-sm text-sm text-fg-muted">Lumen keeps a signed log of who shipped what, and when.</p>
          <Button variant="outline">Open the deploy log <ArrowRightIcon /></Button>
        </div>
      </BackgroundBoxes>
    ),
  },
  {
    title: "Dense and quick",
    description: "density 2 halves the box size; a short fade and more idle flickers per second read as a busy board.",
    code: `<BackgroundBoxes density={2} fade={0.6} idle={6} className="h-64" />`,
    node: <BackgroundBoxes density={2} fade={0.6} idle={6} className="h-64" />,
  },
  {
    title: "Flat, one colour",
    description: "A zero skew lays the grid flat, one colour keeps it quiet and idle 0 lights boxes only under the pointer.",
    code: `<BackgroundBoxes skew={[0, 0]} colors={["var(--accent)"]} idle={0} className="h-64" />`,
    node: <BackgroundBoxes skew={[0, 0]} colors={["var(--accent)"]} idle={0} className="h-64" />,
  },
]
