"use client"
import { CheckRunList } from "@/registry/ui/check-run-list"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Pull request checks",
    description: "detail adds a duration in tabular numbers. Every status is written as a word next to its icon.",
    code: `<CheckRunList
  className="w-full max-w-sm"
  label="Checks for #1287"
  runs={[
    { name: "build", status: "success", detail: "1m 04s" },
    { name: "lint", status: "success", detail: "22s" },
    { name: "test:unit", status: "failed", detail: "2m 51s" },
    { name: "test:e2e", status: "running" },
  ]}
/>`,
    node: (
      <CheckRunList
        className="w-full max-w-sm"
        label="Checks for #1287"
        runs={[
          { name: "build", status: "success", detail: "1m 04s" },
          { name: "lint", status: "success", detail: "22s" },
          { name: "test:unit", status: "failed", detail: "2m 51s" },
          { name: "test:e2e", status: "running" },
        ]}
      />
    ),
  },
  {
    title: "Queued and skipped",
    description: "Queued checks have not started; skipped ones will not run, for example docs-only changes.",
    code: `<CheckRunList
  className="w-full max-w-sm"
  runs={[
    { name: "build", status: "success", detail: "58s" },
    { name: "visual-diff", status: "queued" },
    { name: "deploy-preview", status: "skipped" },
  ]}
/>`,
    node: (
      <CheckRunList
        className="w-full max-w-sm"
        runs={[
          { name: "build", status: "success", detail: "58s" },
          { name: "visual-diff", status: "queued" },
          { name: "deploy-preview", status: "skipped" },
        ]}
      />
    ),
  },
]
