"use client"
import { ArrowRightIcon } from "lucide-react"
import { LightField } from "@/registry/premium/light-field"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Hero backdrop",
    description: "LightField fills its parent: put it in a sized, relative box and layer the content above with z-10.",
    code: `<div className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-border bg-sunken">
  <LightField className="absolute inset-0" />
  <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
    <p className="max-w-[18ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">Forecasts that update as you sell</p>
    <Button>
      Try Northwind Plan <ArrowRightIcon />
    </Button>
  </div>
</div>`,
    node: (
      <div className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-border bg-sunken">
        <LightField className="absolute inset-0" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="max-w-[18ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">Forecasts that update as you sell</p>
          <Button>
            Try Northwind Plan <ArrowRightIcon />
          </Button>
        </div>
      </div>
    ),
  },
  {
    title: "Calmer palette for a sign-in panel",
    description: "Each theme takes three RGB triples (0 to 1): base, partner and highlight. A lower fps suits a small, quiet panel.",
    code: `<div className="relative h-[280px] w-full max-w-md overflow-hidden rounded-2xl border border-border bg-sunken">
  <LightField
    className="absolute inset-0"
    fps={24}
    palette={{
      light: { c1: [0.6, 0.8, 0.95], c2: [0.75, 0.9, 0.85], c3: [0.9, 0.85, 1.0] },
      dark: { c1: [0.1, 0.3, 0.55], c2: [0.05, 0.4, 0.4], c3: [0.35, 0.25, 0.6] },
    }}
  />
  <p className="relative z-10 p-6 text-sm font-medium text-fg">Sign in to Acme Ledger</p>
</div>`,
    node: (
      <div className="relative h-[280px] w-full max-w-md overflow-hidden rounded-2xl border border-border bg-sunken">
        <LightField
          className="absolute inset-0"
          fps={24}
          palette={{
            light: { c1: [0.6, 0.8, 0.95], c2: [0.75, 0.9, 0.85], c3: [0.9, 0.85, 1.0] },
            dark: { c1: [0.1, 0.3, 0.55], c2: [0.05, 0.4, 0.4], c3: [0.35, 0.25, 0.6] },
          }}
        />
        <p className="relative z-10 p-6 text-sm font-medium text-fg">Sign in to Acme Ledger</p>
      </div>
    ),
  },
]
