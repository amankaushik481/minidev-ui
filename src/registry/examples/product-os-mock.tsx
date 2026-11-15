"use client"
import { ProductOsMock } from "@/registry/premium/product-os-mock"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Hero visual beside the pitch",
    description: "Use it as the right half of a split hero; a longer interval gives visitors time to read each view before it changes.",
    code: `<section className="grid w-full items-center gap-8 lg:grid-cols-2">
  <div className="space-y-4">
    <h2 className="text-3xl font-medium tracking-[-0.026em] text-fg">Your whole close in one window</h2>
    <p className="text-sm text-fg-muted">Inbox, pipeline and automations side by side, so nothing waits on a tab switch.</p>
    <Button>Start free</Button>
  </div>
  <ProductOsMock interval={4000} />
</section>`,
    node: (
      <section className="grid w-full items-center gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-medium tracking-[-0.026em] text-fg">Your whole close in one window</h2>
          <p className="text-sm text-fg-muted">Inbox, pipeline and automations side by side, so nothing waits on a tab switch.</p>
          <Button>Start free</Button>
        </div>
        <ProductOsMock interval={4000} />
      </section>
    ),
  },
]
