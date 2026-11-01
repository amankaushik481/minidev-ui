import { ArrowRightIcon } from "lucide-react"
import { LampEffect } from "@/registry/premium/lamp-effect"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom content",
    description: "Children replace the sample copy; keep them in the lower half so the light has room to fall on them.",
    code: `<LampEffect>
  <div className="flex h-full flex-col items-center justify-end gap-4 px-6 pb-10 text-center">
    <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Northwind annual report</p>
    <p className="max-w-[20ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">A year with every invoice accounted for</p>
    <Button variant="outline">Read the report <ArrowRightIcon /></Button>
  </div>
</LampEffect>`,
    node: (
      <LampEffect>
        <div className="flex h-full flex-col items-center justify-end gap-4 px-6 pb-10 text-center">
          <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Northwind annual report</p>
          <p className="max-w-[20ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">A year with every invoice accounted for</p>
          <Button variant="outline">Read the report <ArrowRightIcon /></Button>
        </div>
      </LampEffect>
    ),
  },
  {
    title: "Colour, width and glow",
    description: "color takes any CSS colour, tokens included; width is the lamp line in pixels and glow scales the spill from 0 to 2.",
    code: `<LampEffect color="var(--success)" width={560} glow={1.6} className="h-72" />`,
    node: <LampEffect color="var(--success)" width={560} glow={1.6} className="h-72" />,
  },
  {
    title: "Follows the theme",
    description: "dark false lets the panel take the page theme, so the lamp sits on a light surface in light mode.",
    code: `<LampEffect dark={false} width={320} glow={0.8} className="h-72" />`,
    node: <LampEffect dark={false} width={320} glow={0.8} className="h-72" />,
  },
]
