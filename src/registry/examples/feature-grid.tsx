import { KeyRoundIcon, ServerIcon, ShieldCheckIcon } from "lucide-react"
import { FeatureGrid } from "@/registry/ui/feature-grid"
import type { Example } from "./types"

const SECURITY = [
  { title: "Single sign-on", description: "SAML and OIDC with just-in-time provisioning, so new hires at Northwind get the right role on day one.", icon: <KeyRoundIcon className="size-5" /> },
  { title: "Regional hosting", description: "Pick eu-west-1, us-east-1 or ap-southeast-2 when you create the workspace. Data and backups stay there.", icon: <ServerIcon className="size-5" /> },
  { title: "SOC 2 Type II", description: "Audited every year. Download the latest report and pen test summary from the trust page.", icon: <ShieldCheckIcon className="size-5" /> },
]

const PLAIN = [
  { title: "Recurring invoices", description: "Set the schedule once and Lumen sends, reminds and reconciles every month." },
  { title: "Customer portal", description: "Customers see their open balance, download PDFs and pay by card or bank transfer." },
  { title: "Approval flows", description: "Route invoices over a threshold to a second approver before they go out." },
  { title: "Accountant access", description: "Invite your accountant with read-only access to every ledger and export." },
]

export const examples: Example[] = [
  {
    title: "Three features with icons",
    description: "Icons are optional nodes, so size them with a class and they pick up the accent color.",
    code: `const SECURITY = [
  { title: "Single sign-on", description: "SAML and OIDC with just-in-time provisioning, so new hires at Northwind get the right role on day one.", icon: <KeyRoundIcon className="size-5" /> },
  { title: "Regional hosting", description: "Pick eu-west-1, us-east-1 or ap-southeast-2 when you create the workspace. Data and backups stay there.", icon: <ServerIcon className="size-5" /> },
  { title: "SOC 2 Type II", description: "Audited every year. Download the latest report and pen test summary from the trust page.", icon: <ShieldCheckIcon className="size-5" /> },
]

<FeatureGrid features={SECURITY} className="w-full" />`,
    node: <FeatureGrid features={SECURITY} className="w-full" />,
  },
  {
    title: "Two columns without icons",
    description: "Leave icon out for text-only cards and override the large breakpoint to keep two columns on wide screens.",
    code: `const PLAIN = [
  { title: "Recurring invoices", description: "Set the schedule once and Lumen sends, reminds and reconciles every month." },
  { title: "Customer portal", description: "Customers see their open balance, download PDFs and pay by card or bank transfer." },
  { title: "Approval flows", description: "Route invoices over a threshold to a second approver before they go out." },
  { title: "Accountant access", description: "Invite your accountant with read-only access to every ledger and export." },
]

<FeatureGrid features={PLAIN} className="w-full max-w-2xl lg:grid-cols-2" />`,
    node: <FeatureGrid features={PLAIN} className="w-full max-w-2xl lg:grid-cols-2" />,
  },
]
