import { BeforeAfterWipe } from "@/registry/premium/before-after-wipe"
import { FaqAccordionMotion } from "@/registry/premium/faq-accordion-motion"
import { HeroClientPitch } from "@/registry/premium/hero-client-pitch"
import { MagneticCta } from "@/registry/premium/magnetic-cta"
import { MetricTickerBoard } from "@/registry/premium/metric-ticker-board"
import { TestimonialCarousel } from "@/registry/premium/testimonial-carousel"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Short pitch",
    description: "The kit is a stack of sections; keep the hero, the numbers, the FAQ and one call to action for a first meeting.",
    code: `<div className="w-full space-y-12">
  <HeroClientPitch />
  <MetricTickerBoard />
  <FaqAccordionMotion />
  <div className="flex justify-center">
    <MagneticCta size="lg">Book a walkthrough</MagneticCta>
  </div>
</div>`,
    node: (
      <div className="w-full space-y-12">
        <HeroClientPitch />
        <MetricTickerBoard />
        <FaqAccordionMotion />
        <div className="flex justify-center">
          <MagneticCta size="lg">Book a walkthrough</MagneticCta>
        </div>
      </div>
    ),
  },
  {
    title: "Proof and close",
    description: "For a follow-up, lead with the before and after, your customers' words and the signature button.",
    code: `<div className="w-full space-y-12">
  <BeforeAfterWipe beforeLabel="Spreadsheets" afterLabel="Lumen" />
  <TestimonialCarousel
    items={[
      { quote: "We closed the quarter in four days instead of three weeks.", name: "Maya Chen", role: "CFO, Northwind" },
      { quote: "Reminders alone cut our overdue invoices by a third.", name: "Theo Okafor", role: "Controller, Northwind" },
      { quote: "The audit trail made our first external audit painless.", name: "Priya Raman", role: "Finance lead, Lumen" },
    ]}
  />
  <div className="flex justify-center">
    <MagneticCta size="lg">Start with Lumen</MagneticCta>
  </div>
</div>`,
    node: (
      <div className="w-full space-y-12">
        <BeforeAfterWipe beforeLabel="Spreadsheets" afterLabel="Lumen" />
        <TestimonialCarousel
          items={[
            { quote: "We closed the quarter in four days instead of three weeks.", name: "Maya Chen", role: "CFO, Northwind" },
            { quote: "Reminders alone cut our overdue invoices by a third.", name: "Theo Okafor", role: "Controller, Northwind" },
            { quote: "The audit trail made our first external audit painless.", name: "Priya Raman", role: "Finance lead, Lumen" },
          ]}
        />
        <div className="flex justify-center">
          <MagneticCta size="lg">Start with Lumen</MagneticCta>
        </div>
      </div>
    ),
  },
]
