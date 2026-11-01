import { FaqList } from "@/registry/ui/faq-list"
import type { Example } from "./types"

const SECURITY_FAQ = [
  { q: "Where is my data stored?", a: "In the region you pick when creating the workspace: eu-west-1, us-east-1 or ap-southeast-2. Data never leaves that region, including backups." },
  { q: "Do you support single sign-on?", a: "Yes. SAML and OIDC are available on the Scale plan, with just-in-time provisioning and SCIM for deprovisioning." },
  { q: "Who can see invoice attachments?", a: "Only members of your workspace with the Finance or Admin role, plus the customer the invoice is addressed to." },
  { q: "Can I export everything?", a: "Any admin can export invoices, customers and audit logs as CSV or JSON at any time from Settings, with no waiting period." },
]

const PRICING_FAQ = [
  { q: "What counts as a seat?", a: "Anyone who can sign in to the workspace. Customers viewing their own invoices in the portal are free." },
  { q: "Is there a limit on invoices?", a: "No. Every plan includes unlimited invoices, customers and reminders." },
  { q: "How do refunds work?", a: "Cancel within 30 days of your first payment for a full refund. After that, downgrades apply at the end of the billing period." },
]

export const examples: Example[] = [
  {
    title: "Custom questions",
    description: "Pass question and answer pairs as items; each row unfolds its own answer and several can stay open at once.",
    code: `const SECURITY_FAQ = [
  { q: "Where is my data stored?", a: "In the region you pick when creating the workspace: eu-west-1, us-east-1 or ap-southeast-2. Data never leaves that region, including backups." },
  { q: "Do you support single sign-on?", a: "Yes. SAML and OIDC are available on the Scale plan, with just-in-time provisioning and SCIM for deprovisioning." },
  { q: "Who can see invoice attachments?", a: "Only members of your workspace with the Finance or Admin role, plus the customer the invoice is addressed to." },
  { q: "Can I export everything?", a: "Any admin can export invoices, customers and audit logs as CSV or JSON at any time from Settings, with no waiting period." },
]

<FaqList items={SECURITY_FAQ} className="w-full" />`,
    node: <FaqList items={SECURITY_FAQ} className="w-full" />,
  },
  {
    title: "Beside a heading",
    description: "On a pricing page, put the heading and a support link in a narrow column and let the list take the rest.",
    code: `const PRICING_FAQ = [
  { q: "What counts as a seat?", a: "Anyone who can sign in to the workspace. Customers viewing their own invoices in the portal are free." },
  { q: "Is there a limit on invoices?", a: "No. Every plan includes unlimited invoices, customers and reminders." },
  { q: "How do refunds work?", a: "Cancel within 30 days of your first payment for a full refund. After that, downgrades apply at the end of the billing period." },
]

<section className="grid w-full gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
  <div>
    <h2 className="text-xl font-medium tracking-[-0.02em] text-fg">Pricing questions</h2>
    <p className="mt-2 text-sm text-fg-muted">
      Anything else? Write to <a href="#" className="text-accent-fg underline underline-offset-4">billing@lumen.app</a>.
    </p>
  </div>
  <FaqList items={PRICING_FAQ} className="max-w-none" />
</section>`,
    node: (
      <section className="grid w-full gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div>
          <h2 className="text-xl font-medium tracking-[-0.02em] text-fg">Pricing questions</h2>
          <p className="mt-2 text-sm text-fg-muted">
            Anything else? Write to <a href="#" className="text-accent-fg underline underline-offset-4">billing@lumen.app</a>.
          </p>
        </div>
        <FaqList items={PRICING_FAQ} className="max-w-none" />
      </section>
    ),
  },
]
