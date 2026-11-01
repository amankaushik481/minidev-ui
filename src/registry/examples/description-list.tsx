import { DescriptionList } from "@/registry/ui/description-list"
import { Badge } from "@/registry/ui/badge"
import type { Example } from "./types"

const INVOICE = [
  { label: "Invoice", value: <span className="font-mono text-xs">INV-2041</span> },
  { label: "Status", value: <Badge variant="accent">Open</Badge> },
  { label: "Customer", value: "Northwind Traders" },
  { label: "Amount", value: "$12,400.00" },
  { label: "Issued", value: "Sep 24, 2026" },
  { label: "Due", value: "Oct 24, 2026" },
]

const CONTACT = [
  { label: "Name", value: "Theo Okafor" },
  { label: "Role", value: "Accounts payable" },
  { label: "Email", value: "theo@northwind.io" },
  { label: "Phone", value: "+1 (415) 555-0142" },
]

const DEPLOY = [
  { label: "Service", value: "lumen-web" },
  { label: "Environment", value: "production" },
  { label: "Region", value: "eu-west-1" },
  { label: "Commit", value: <span className="font-mono text-xs">a3f9c12</span> },
  { label: "Deployed by", value: "Priya Raman" },
  { label: "Duration", value: "42s" },
]

export const examples: Example[] = [
  {
    title: "Invoice record",
    description: "Values take any node, so a mono span for ids and a Badge for status sit alongside plain text.",
    code: `const INVOICE = [
  { label: "Invoice", value: <span className="font-mono text-xs">INV-2041</span> },
  { label: "Status", value: <Badge variant="accent">Open</Badge> },
  { label: "Customer", value: "Northwind Traders" },
  { label: "Amount", value: "$12,400.00" },
  { label: "Issued", value: "Sep 24, 2026" },
  { label: "Due", value: "Oct 24, 2026" },
]

<DescriptionList items={INVOICE} />`,
    node: <DescriptionList items={INVOICE} />,
  },
  {
    title: "Single column",
    description: "Override the grid with className for a narrow side panel; tailwind-merge drops the default two column rule.",
    code: `const CONTACT = [
  { label: "Name", value: "Theo Okafor" },
  { label: "Role", value: "Accounts payable" },
  { label: "Email", value: "theo@northwind.io" },
  { label: "Phone", value: "+1 (415) 555-0142" },
]

<DescriptionList items={CONTACT} className="max-w-xs sm:grid-cols-1" />`,
    node: <DescriptionList items={CONTACT} className="max-w-xs sm:grid-cols-1" />,
  },
  {
    title: "Three columns",
    description: "Wider records can use three columns; widen the max width so each value still has room.",
    code: `const DEPLOY = [
  { label: "Service", value: "lumen-web" },
  { label: "Environment", value: "production" },
  { label: "Region", value: "eu-west-1" },
  { label: "Commit", value: <span className="font-mono text-xs">a3f9c12</span> },
  { label: "Deployed by", value: "Priya Raman" },
  { label: "Duration", value: "42s" },
]

<DescriptionList items={DEPLOY} className="max-w-3xl sm:grid-cols-3" />`,
    node: <DescriptionList items={DEPLOY} className="max-w-3xl sm:grid-cols-3" />,
  },
]
