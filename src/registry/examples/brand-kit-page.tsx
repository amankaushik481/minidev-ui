import { BrandKitPage } from "@/registry/premium/brand-kit-page"
import { BrowserMockup } from "@/registry/premium/browser-mockup"
import { CardTilt } from "@/registry/premium/card-tilt"
import { GridReveal } from "@/registry/premium/grid-reveal"
import { TextScramble } from "@/registry/premium/text-scramble"
import { TypographicMarquee } from "@/registry/premium/typographic-marquee"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Your own brand page",
    description: "The page is a stack of motion pieces; keep the ones you need and feed them your brand's words, colours and type.",
    code: `<div className="w-full space-y-12 bg-bg py-8">
  <TypographicMarquee phrases={["Lumen", "Indigo 540", "Geist Sans", "Hairline borders", "Tabular numbers", "No invented colours"]} />
  <div className="mx-auto grid max-w-5xl gap-6 px-6 lg:grid-cols-2">
    <CardTilt title="Indigo 540" body="One accent for every action. Success, warning and danger are the only other hues." />
    <CardTilt title="Geist Sans and Mono" body="Headlines tighten to -0.03em; every number is tabular so columns line up." />
  </div>
  <div className="mx-auto max-w-5xl space-y-8 px-6">
    <TextScramble text="LUMEN BRAND SYSTEM 2026" />
    <GridReveal items={["Logo", "Colour", "Type", "Spacing", "Motion", "Voice", "Icons", "Templates"]} />
  </div>
</div>`,
    node: (
      <div className="w-full space-y-12 bg-bg py-8">
        <TypographicMarquee phrases={["Lumen", "Indigo 540", "Geist Sans", "Hairline borders", "Tabular numbers", "No invented colours"]} />
        <div className="mx-auto grid max-w-5xl gap-6 px-6 lg:grid-cols-2">
          <CardTilt title="Indigo 540" body="One accent for every action. Success, warning and danger are the only other hues." />
          <CardTilt title="Geist Sans and Mono" body="Headlines tighten to -0.03em; every number is tabular so columns line up." />
        </div>
        <div className="mx-auto max-w-5xl space-y-8 px-6">
          <TextScramble text="LUMEN BRAND SYSTEM 2026" />
          <GridReveal items={["Logo", "Colour", "Type", "Spacing", "Motion", "Voice", "Icons", "Templates"]} />
        </div>
      </div>
    ),
  },
  {
    title: "In a browser frame",
    description: "Wrap the whole page in BrowserMockup to present the kit on a portfolio or case study page.",
    code: `<BrowserMockup url="https://lumen.dev/brand" phone={false}>
  <BrandKitPage />
</BrowserMockup>`,
    node: (
      <BrowserMockup url="https://lumen.dev/brand" phone={false}>
        <BrandKitPage />
      </BrowserMockup>
    ),
  },
]
