"use client"
import { SqlResultTable } from "@/registry/ui/sql-result-table"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Result with NULLs",
    description: "A real null renders as a dimmed NULL; the caption names the scroll region.",
    code: `<SqlResultTable
  className="w-full max-w-2xl"
  caption="accounts, 4 rows"
  columns={["id", "company", "plan", "churned_at"]}
  rows={[
    [1042, "Northwind Traders", "pro", null],
    [1043, "Summit Dental", "starter", "2026-09-30"],
    [1044, "Blue Harbor Co.", "pro", null],
    [1045, "Helix Biotech", "studio", null],
  ]}
/>`,
    node: (
      <SqlResultTable
        className="w-full max-w-2xl"
        caption="accounts, 4 rows"
        columns={["id", "company", "plan", "churned_at"]}
        rows={[
          [1042, "Northwind Traders", "pro", null],
          [1043, "Summit Dental", "starter", "2026-09-30"],
          [1044, "Blue Harbor Co.", "pro", null],
          [1045, "Helix Biotech", "studio", null],
        ]}
      />
    ),
  },
  {
    title: "Capped height",
    description: "max-h-48 makes long results scroll inside the frame; focus it to scroll with the keyboard.",
    code: `<SqlResultTable
  className="max-h-48 w-full max-w-2xl"
  caption="invoices, 8 rows"
  columns={["number", "amount_cents", "paid"]}
  rows={[
    ["LUM-0141", 120000, true],
    ["LUM-0142", 48000, true],
    ["LUM-0143", 230500, false],
    ["LUM-0144", 9900, true],
    ["LUM-0145", 184000, false],
    ["LUM-0146", 61200, true],
    ["LUM-0147", 184000, true],
    ["LUM-0148", 7500, false],
  ]}
/>`,
    node: (
      <SqlResultTable
        className="max-h-48 w-full max-w-2xl"
        caption="invoices, 8 rows"
        columns={["number", "amount_cents", "paid"]}
        rows={[
          ["LUM-0141", 120000, true],
          ["LUM-0142", 48000, true],
          ["LUM-0143", 230500, false],
          ["LUM-0144", 9900, true],
          ["LUM-0145", 184000, false],
          ["LUM-0146", 61200, true],
          ["LUM-0147", 184000, true],
          ["LUM-0148", 7500, false],
        ]}
      />
    ),
  },
]
