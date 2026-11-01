import { BrowserMockup } from "@/registry/premium/browser-mockup"
import { CursorSpotlightPanel } from "@/registry/premium/cursor-spotlight-panel"
import { FlipStatBoard } from "@/registry/premium/flip-stat-board"
import { GradientText } from "@/registry/premium/gradient-text"
import { InvestorUpdate } from "@/registry/premium/investor-update"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Your own update",
    description: "The article is a header with a gradient headline, a FlipStatBoard, a shipped list and a CursorSpotlightPanel for the ask; fill it with your quarter.",
    code: `<article className="mx-auto w-full max-w-3xl space-y-12 px-6 py-12">
  <header className="space-y-4 border-b border-border pb-8">
    <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Lumen investor update · Q3 2026</p>
    <GradientText as="h2" className="font-medium tracking-[-0.03em]">Four thousand companies now close their books on Lumen.</GradientText>
    <p className="text-base leading-[1.55] text-fg-muted">Net revenue retention held above 120 percent, reminders became our most used feature and Northwind signed a three year agreement.</p>
  </header>
  <FlipStatBoard
    stats={[
      { value: 4200, label: "Companies" },
      { value: 124, label: "Net revenue retention, percent" },
      { value: 31, label: "Months of runway" },
    ]}
  />
  <section className="space-y-3">
    <h2 className="text-xl font-medium tracking-[-0.014em] text-fg">What shipped</h2>
    <ul className="space-y-2 text-sm leading-[1.55] text-fg-muted">
      <li className="border-l border-accent/40 pl-3">Automatic reminders, now on by default for every new account</li>
      <li className="border-l border-accent/40 pl-3">Multi-currency statements settled in the currency each customer pays in</li>
      <li className="border-l border-accent/40 pl-3">Approvals from the phone app, used by 38 percent of finance leads</li>
    </ul>
  </section>
  <CursorSpotlightPanel
    title="The ask"
    body="Introductions to CFOs at companies with 50 to 500 staff, and one hire: a head of partnerships who has sold through accountants before."
  />
</article>`,
    node: (
      <article className="mx-auto w-full max-w-3xl space-y-12 px-6 py-12">
        <header className="space-y-4 border-b border-border pb-8">
          <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Lumen investor update · Q3 2026</p>
          <GradientText as="h2" className="font-medium tracking-[-0.03em]">Four thousand companies now close their books on Lumen.</GradientText>
          <p className="text-base leading-[1.55] text-fg-muted">Net revenue retention held above 120 percent, reminders became our most used feature and Northwind signed a three year agreement.</p>
        </header>
        <FlipStatBoard
          stats={[
            { value: 4200, label: "Companies" },
            { value: 124, label: "Net revenue retention, percent" },
            { value: 31, label: "Months of runway" },
          ]}
        />
        <section className="space-y-3">
          <h2 className="text-xl font-medium tracking-[-0.014em] text-fg">What shipped</h2>
          <ul className="space-y-2 text-sm leading-[1.55] text-fg-muted">
            <li className="border-l border-accent/40 pl-3">Automatic reminders, now on by default for every new account</li>
            <li className="border-l border-accent/40 pl-3">Multi-currency statements settled in the currency each customer pays in</li>
            <li className="border-l border-accent/40 pl-3">Approvals from the phone app, used by 38 percent of finance leads</li>
          </ul>
        </section>
        <CursorSpotlightPanel
          title="The ask"
          body="Introductions to CFOs at companies with 50 to 500 staff, and one hire: a head of partnerships who has sold through accountants before."
        />
      </article>
    ),
  },
  {
    title: "In a browser frame",
    description: "Wrap the update in BrowserMockup to preview it as the page investors will open.",
    code: `<BrowserMockup url="https://lumen.dev/investors/q3-2026" phone={false}>
  <InvestorUpdate />
</BrowserMockup>`,
    node: (
      <BrowserMockup url="https://lumen.dev/investors/q3-2026" phone={false}>
        <InvestorUpdate />
      </BrowserMockup>
    ),
  },
]
