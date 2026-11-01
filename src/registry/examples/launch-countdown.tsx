import { AuroraBackground } from "@/registry/premium/aurora-background"
import { LaunchCountdown } from "@/registry/premium/launch-countdown"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom title and target",
    description: "title is the line above the digits; targetOffsetMs is how far ahead the launch is, here nine days.",
    code: `<LaunchCountdown title="Lumen 3.0 ships in" targetOffsetMs={1000 * 60 * 60 * 24 * 9} className="w-full" />`,
    node: <LaunchCountdown title="Lumen 3.0 ships in" targetOffsetMs={1000 * 60 * 60 * 24 * 9} className="w-full" />,
  },
  {
    title: "Short window",
    description: "Under an hour the days and hours sit at zero and the minutes and seconds carry the urgency.",
    code: `<LaunchCountdown title="Early access closes in" targetOffsetMs={1000 * 60 * 45} className="w-full max-w-xl" />`,
    node: <LaunchCountdown title="Early access closes in" targetOffsetMs={1000 * 60 * 45} className="w-full max-w-xl" />,
  },
  {
    title: "On an aurora",
    description: "Drop the border and background with className and place it inside AuroraBackground set to auto height.",
    code: `<AuroraBackground className="h-auto">
  <LaunchCountdown title="Northwind summit opens in" targetOffsetMs={1000 * 60 * 60 * 72} className="border-0 bg-transparent" />
</AuroraBackground>`,
    node: (
      <AuroraBackground className="h-auto">
        <LaunchCountdown title="Northwind summit opens in" targetOffsetMs={1000 * 60 * 60 * 72} className="border-0 bg-transparent" />
      </AuroraBackground>
    ),
  },
]
