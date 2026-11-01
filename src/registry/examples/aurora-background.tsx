import { ArrowRightIcon } from "lucide-react"
import { AuroraBackground } from "@/registry/premium/aurora-background"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom content",
    description: "Children sit above the light and keep the pointer; size the panel with className.",
    code: `<AuroraBackground className="h-80">
  <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
    <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Northwind annual report</p>
    <p className="max-w-[20ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">A year of closing the books on time</p>
    <div className="flex flex-wrap justify-center gap-2">
      <Button>Read the report <ArrowRightIcon /></Button>
      <Button variant="outline">Download PDF</Button>
    </div>
  </div>
</AuroraBackground>`,
    node: (
      <AuroraBackground className="h-80">
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Northwind annual report</p>
          <p className="max-w-[20ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">A year of closing the books on time</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button>Read the report <ArrowRightIcon /></Button>
            <Button variant="outline">Download PDF</Button>
          </div>
        </div>
      </AuroraBackground>
    ),
  },
  {
    title: "Colours and intensity",
    description: "colors takes any CSS colours, tokens included; intensity above 1 pushes the light harder.",
    code: `<AuroraBackground colors={["var(--success)", "var(--info)", "var(--accent)"]} intensity={1.3} className="h-64" />`,
    node: <AuroraBackground colors={["var(--success)", "var(--info)", "var(--accent)"]} intensity={1.3} className="h-64" />,
  },
  {
    title: "Slow and sharp",
    description: "speed 0.5 halves the sway and a low blur keeps the edges of the bands visible.",
    code: `<AuroraBackground speed={0.5} blur={10} className="h-64" />`,
    node: <AuroraBackground speed={0.5} blur={10} className="h-64" />,
  },
]
