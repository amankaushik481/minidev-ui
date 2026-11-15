"use client"
import { MergeBox } from "@/registry/ui/merge-box"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Ready to merge",
    description: "canMerge defaults to true; actionLabel and message describe your own merge policy.",
    code: `<MergeBox
  className="w-full max-w-md"
  actionLabel="Squash and merge"
  message="5 of 5 required checks passed. Approved by Theo Okafor."
/>`,
    node: (
      <MergeBox
        className="w-full max-w-md"
        actionLabel="Squash and merge"
        message="5 of 5 required checks passed. Approved by Theo Okafor."
      />
    ),
  },
  {
    title: "Waiting on checks",
    description: "With canMerge false the callout turns to a warning and the button is disabled.",
    code: `<MergeBox
  className="w-full max-w-md"
  canMerge={false}
  message="2 of 5 checks still running: e2e and typecheck."
/>`,
    node: (
      <MergeBox
        className="w-full max-w-md"
        canMerge={false}
        message="2 of 5 checks still running: e2e and typecheck."
      />
    ),
  },
]
