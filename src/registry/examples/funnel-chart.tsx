import { FunnelChart, type FunnelStage } from "@/registry/ui/funnel-chart"
import type { Example } from "./types"

const checkout: FunnelStage[] = [
  { label: "Viewed cart", value: 9240 },
  { label: "Started checkout", value: 5110 },
  { label: "Entered card", value: 3380 },
  { label: "Paid", value: 2975 },
]

const onboarding: FunnelStage[] = [
  { label: "Invited", value: 1840, compare: 1620 },
  { label: "Accepted", value: 1312, compare: 1104 },
  { label: "Bank linked", value: 804, compare: 640 },
  { label: "First invoice", value: 561, compare: 402 },
]

export const examples: Example[] = [
  {
    title: "Fixed stages",
    description: "Pass stages for a single funnel; the segmented control disappears and showCompare false hides the comparison legend.",
    code: `const checkout: FunnelStage[] = [
  { label: "Viewed cart", value: 9240 },
  { label: "Started checkout", value: 5110 },
  { label: "Entered card", value: 3380 },
  { label: "Paid", value: 2975 },
]

<FunnelChart stages={checkout} title="Checkout, this week" showCompare={false} />`,
    node: <FunnelChart stages={checkout} title="Checkout, this week" showCompare={false} />,
  },
  {
    title: "Vertical with comparison",
    description: "orientation vertical lists stages as rows, compare values draw the dashed outline, and format keeps full numbers instead of compact ones.",
    code: `const onboarding: FunnelStage[] = [
  { label: "Invited", value: 1840, compare: 1620 },
  { label: "Accepted", value: 1312, compare: 1104 },
  { label: "Bank linked", value: 804, compare: 640 },
  { label: "First invoice", value: 561, compare: 402 },
]

<FunnelChart
  stages={onboarding}
  orientation="vertical"
  title="Team onboarding"
  compareLabel="September"
  format={(n) => n.toLocaleString("en-US")}
  className="max-w-md"
/>`,
    node: (
      <FunnelChart
        stages={onboarding}
        orientation="vertical"
        title="Team onboarding"
        compareLabel="September"
        format={(n) => n.toLocaleString("en-US")}
        className="max-w-md"
      />
    ),
  },
]
