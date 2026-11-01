import { ArrowRightIcon } from "lucide-react"
import { TestimonialCarousel } from "@/registry/premium/testimonial-carousel"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom testimonials",
    description: "Each item has a quote, a name and a role; the carousel advances every 4.5 seconds and the dots and buttons jump between items.",
    code: `<TestimonialCarousel
  className="w-full max-w-2xl"
  items={[
    { quote: "Lumen cleared 212 invoices on launch day. We checked four by hand.", name: "Maya Chen", role: "Head of Finance, Northwind" },
    { quote: "Reminders go out in our voice and stop the moment the money lands.", name: "Theo Okafor", role: "Founder, Atlas Freight" },
    { quote: "Month end used to take a week. Now there is nothing left to close.", name: "Priya Raman", role: "Controller, Cadence Labs" },
  ]}
/>`,
    node: (
      <TestimonialCarousel
        className="w-full max-w-2xl"
        items={[
          { quote: "Lumen cleared 212 invoices on launch day. We checked four by hand.", name: "Maya Chen", role: "Head of Finance, Northwind" },
          { quote: "Reminders go out in our voice and stop the moment the money lands.", name: "Theo Okafor", role: "Founder, Atlas Freight" },
          { quote: "Month end used to take a week. Now there is nothing left to close.", name: "Priya Raman", role: "Controller, Cadence Labs" },
        ]}
      />
    ),
  },
  {
    title: "Narrow card",
    description: "In a sidebar width the quote wraps to more lines; keep the quotes short so the card height stays steady.",
    code: `<TestimonialCarousel
  className="w-full max-w-sm"
  items={[
    { quote: "Paid nine days sooner on average.", name: "Sam Lowe", role: "Forma Studio" },
    { quote: "Setup took one afternoon.", name: "Priya Raman", role: "Cadence Labs" },
  ]}
/>`,
    node: (
      <TestimonialCarousel
        className="w-full max-w-sm"
        items={[
          { quote: "Paid nine days sooner on average.", name: "Sam Lowe", role: "Forma Studio" },
          { quote: "Setup took one afternoon.", name: "Priya Raman", role: "Cadence Labs" },
        ]}
      />
    ),
  },
  {
    title: "Under a heading",
    description: "A section title with a link to all stories above the card completes a testimonial section.",
    code: `<section className="w-full max-w-2xl">
  <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
    <div>
      <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Customers</p>
      <h2 className="mt-1 text-2xl font-medium tracking-[-0.03em] text-fg">What finance teams say</h2>
    </div>
    <Button variant="link">Read all stories <ArrowRightIcon /></Button>
  </div>
  <TestimonialCarousel
    items={[
      { quote: "The board pack is waiting in my inbox on the first Monday.", name: "Priya Raman", role: "Controller, Cadence Labs" },
      { quote: "Nobody on the team writes a chasing email anymore.", name: "Sam Lowe", role: "Founder, Forma Studio" },
      { quote: "Our accountant sees the same live numbers we do.", name: "Maya Chen", role: "Head of Finance, Northwind" },
    ]}
  />
</section>`,
    node: (
      <section className="w-full max-w-2xl">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Customers</p>
            <h2 className="mt-1 text-2xl font-medium tracking-[-0.03em] text-fg">What finance teams say</h2>
          </div>
          <Button variant="link">Read all stories <ArrowRightIcon /></Button>
        </div>
        <TestimonialCarousel
          items={[
            { quote: "The board pack is waiting in my inbox on the first Monday.", name: "Priya Raman", role: "Controller, Cadence Labs" },
            { quote: "Nobody on the team writes a chasing email anymore.", name: "Sam Lowe", role: "Founder, Forma Studio" },
            { quote: "Our accountant sees the same live numbers we do.", name: "Maya Chen", role: "Head of Finance, Northwind" },
          ]}
        />
      </section>
    ),
  },
]
