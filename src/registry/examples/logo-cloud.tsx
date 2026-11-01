import { ArrowRightIcon, HexagonIcon, OrbitIcon, WavesIcon } from "lucide-react"
import { LogoCloud } from "@/registry/ui/logo-cloud"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

const NAMES = [
  { name: "Northwind" },
  { name: "Halcyon" },
  { name: "Fathom" },
  { name: "Meridian" },
  { name: "Quill" },
]

export const examples: Example[] = [
  {
    title: "Names only",
    description: "mark is optional, so a plain list of customer names works when you do not have marks to show.",
    code: `const NAMES = [{ name: "Northwind" }, { name: "Halcyon" }, { name: "Fathom" }, { name: "Meridian" }, { name: "Quill" }]

<LogoCloud logos={NAMES} />`,
    node: <LogoCloud logos={NAMES} />,
  },
  {
    title: "With a heading",
    description: "A short, muted line above the row is the usual framing on a landing page.",
    code: `<div className="flex w-full flex-col items-center gap-5">
  <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Trusted by finance teams at</p>
  <LogoCloud />
</div>`,
    node: (
      <div className="flex w-full flex-col items-center gap-5">
        <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Trusted by finance teams at</p>
        <LogoCloud />
      </div>
    ),
  },
  {
    title: "Left aligned under a hero",
    description: "Override the centering with justify-start to line the logos up with left-aligned hero copy.",
    code: `<div className="flex w-full max-w-lg flex-col gap-6">
  <div>
    <h2 className="text-2xl font-medium tracking-[-0.03em] text-fg">Invoices that pay themselves</h2>
    <p className="mt-2 text-sm text-fg-muted">Lumen sends, reminds and reconciles so you can close the books every day.</p>
    <Button className="mt-4">Start free trial <ArrowRightIcon /></Button>
  </div>
  <LogoCloud
    className="justify-start gap-x-6"
    logos={[
      { name: "Northwind", mark: <HexagonIcon className="size-4" /> },
      { name: "Halcyon", mark: <WavesIcon className="size-4" /> },
      { name: "Meridian", mark: <OrbitIcon className="size-4" /> },
    ]}
  />
</div>`,
    node: (
      <div className="flex w-full max-w-lg flex-col gap-6">
        <div>
          <h2 className="text-2xl font-medium tracking-[-0.03em] text-fg">Invoices that pay themselves</h2>
          <p className="mt-2 text-sm text-fg-muted">Lumen sends, reminds and reconciles so you can close the books every day.</p>
          <Button className="mt-4">Start free trial <ArrowRightIcon /></Button>
        </div>
        <LogoCloud
          className="justify-start gap-x-6"
          logos={[
            { name: "Northwind", mark: <HexagonIcon className="size-4" /> },
            { name: "Halcyon", mark: <WavesIcon className="size-4" /> },
            { name: "Meridian", mark: <OrbitIcon className="size-4" /> },
          ]}
        />
      </div>
    ),
  },
]
