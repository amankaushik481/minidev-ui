import { MarqueeQuotes } from "@/registry/premium/marquee-quotes"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom quotes",
    description: "Pass items with a quote and a name; the second row runs the same list in reverse.",
    code: `<MarqueeQuotes
  className="w-full max-w-3xl"
  items={[
    { quote: "Lumen cleared 212 invoices on launch day. We checked four by hand.", name: "Maya Chen, Northwind" },
    { quote: "Reminders go out in our voice and stop the moment money lands.", name: "Theo Okafor, Atlas Freight" },
    { quote: "Month end used to take a week. Now there is nothing left to close.", name: "Priya Raman, Cadence Labs" },
    { quote: "Our accountant sees the same live numbers we do.", name: "Sam Lowe, Forma Studio" },
  ]}
/>`,
    node: (
      <MarqueeQuotes
        className="w-full max-w-3xl"
        items={[
          { quote: "Lumen cleared 212 invoices on launch day. We checked four by hand.", name: "Maya Chen, Northwind" },
          { quote: "Reminders go out in our voice and stop the moment money lands.", name: "Theo Okafor, Atlas Freight" },
          { quote: "Month end used to take a week. Now there is nothing left to close.", name: "Priya Raman, Cadence Labs" },
          { quote: "Our accountant sees the same live numbers we do.", name: "Sam Lowe, Forma Studio" },
        ]}
      />
    ),
  },
  {
    title: "Faded edges",
    description: "A mask on the wrapper fades both ends of the rows, so cards appear and leave softly instead of being clipped.",
    code: `<MarqueeQuotes className="w-full max-w-3xl [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]" />`,
    node: <MarqueeQuotes className="w-full max-w-3xl [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]" />,
  },
  {
    title: "Under a heading",
    description: "A short eyebrow and title above the rows turns the strip into a complete social proof section.",
    code: `<section className="w-full max-w-3xl space-y-6">
  <div className="text-center">
    <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Customers</p>
    <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-fg">Finance teams that stopped chasing</h2>
  </div>
  <MarqueeQuotes
    items={[
      { quote: "Paid nine days sooner on average since we switched.", name: "Maya Chen, Northwind" },
      { quote: "Setup took an afternoon. We closed the quarter in four days.", name: "Theo Okafor, Atlas Freight" },
      { quote: "The board pack is waiting in my inbox on the first Monday.", name: "Priya Raman, Cadence Labs" },
      { quote: "Nobody on the team writes a chasing email anymore.", name: "Sam Lowe, Forma Studio" },
    ]}
  />
</section>`,
    node: (
      <section className="w-full max-w-3xl space-y-6">
        <div className="text-center">
          <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Customers</p>
          <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-fg">Finance teams that stopped chasing</h2>
        </div>
        <MarqueeQuotes
          items={[
            { quote: "Paid nine days sooner on average since we switched.", name: "Maya Chen, Northwind" },
            { quote: "Setup took an afternoon. We closed the quarter in four days.", name: "Theo Okafor, Atlas Freight" },
            { quote: "The board pack is waiting in my inbox on the first Monday.", name: "Priya Raman, Cadence Labs" },
            { quote: "Nobody on the team writes a chasing email anymore.", name: "Sam Lowe, Forma Studio" },
          ]}
        />
      </section>
    ),
  },
]
