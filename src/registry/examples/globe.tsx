import { Button } from "@/registry/ui/button"
import { Globe } from "@/registry/premium/globe"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom markers",
    description: "Markers take latitude and longitude with a label; consecutive ones are joined by arcs.",
    code: `<Globe
  markers={[
    { lat: 40.71, lng: -74.01, label: "New York" },
    { lat: 52.52, lng: 13.41, label: "Berlin" },
    { lat: 19.08, lng: 72.88, label: "Mumbai" },
    { lat: 35.68, lng: 139.69, label: "Tokyo" },
  ]}
>
  <div className="flex flex-col items-start gap-3 p-6 @lg:w-1/2 @lg:p-10">
    <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Northwind offices</p>
    <p className="max-w-[18ch] text-2xl font-medium tracking-[-0.03em] text-fg">Four offices, one ledger</p>
    <Button variant="outline" size="sm">Find your region</Button>
  </div>
</Globe>`,
    node: (
      <Globe
        markers={[
          { lat: 40.71, lng: -74.01, label: "New York" },
          { lat: 52.52, lng: 13.41, label: "Berlin" },
          { lat: 19.08, lng: 72.88, label: "Mumbai" },
          { lat: 35.68, lng: 139.69, label: "Tokyo" },
        ]}
      >
        <div className="flex flex-col items-start gap-3 p-6 @lg:w-1/2 @lg:p-10">
          <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Northwind offices</p>
          <p className="max-w-[18ch] text-2xl font-medium tracking-[-0.03em] text-fg">Four offices, one ledger</p>
          <Button variant="outline" size="sm">Find your region</Button>
        </div>
      </Globe>
    ),
  },
  {
    title: "Centred without arcs",
    description: "align center puts the globe behind the copy; arcs false leaves the markers on their own.",
    code: `<Globe align="center" arcs={false} speed={10} />`,
    node: <Globe align="center" arcs={false} speed={10} />,
  },
  {
    title: "Colours and a still globe",
    description: "color and accent take any CSS colour, tokens included; speed 0 holds still until dragged.",
    code: `<Globe speed={0} color="var(--accent)" accent="var(--success)" align="left" className="h-72" />`,
    node: <Globe speed={0} color="var(--accent)" accent="var(--success)" align="left" className="h-72" />,
  },
]
