import { CursorSpotlightPanel } from "@/registry/premium/cursor-spotlight-panel"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom copy",
    description: "title and body replace the sample text; the spotlight follows the pointer across the whole panel.",
    code: `<CursorSpotlightPanel
  title="Approvals from anywhere"
  body="Approve a bill from your phone in one tap, with the full trail behind it. Nothing moves until the right person says so."
  className="w-full max-w-xl"
/>`,
    node: (
      <CursorSpotlightPanel
        title="Approvals from anywhere"
        body="Approve a bill from your phone in one tap, with the full trail behind it. Nothing moves until the right person says so."
        className="w-full max-w-xl"
      />
    ),
  },
  {
    title: "Two panels",
    description: "Each panel tracks its own pointer, so a pair in a grid works as a feature row.",
    code: `<div className="grid w-full gap-4 sm:grid-cols-2">
  <CursorSpotlightPanel title="Reminders with manners" body="Three nudges, each one a little firmer. Customers pay nine days sooner on average." />
  <CursorSpotlightPanel title="Live cash view" body="Every account and currency rolled into one number you can trust at 9am." />
</div>`,
    node: (
      <div className="grid w-full gap-4 sm:grid-cols-2">
        <CursorSpotlightPanel title="Reminders with manners" body="Three nudges, each one a little firmer. Customers pay nine days sooner on average." />
        <CursorSpotlightPanel title="Live cash view" body="Every account and currency rolled into one number you can trust at 9am." />
      </div>
    ),
  },
]
