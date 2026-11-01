import { BrowserMockup } from "@/registry/premium/browser-mockup"
import { DocsMarketing } from "@/registry/premium/docs-marketing"
import { ScrollReveal } from "@/registry/premium/scroll-reveal"
import { Button } from "@/registry/ui/button"
import { Callout } from "@/registry/ui/callout"
import { CodeBlock } from "@/registry/ui/code-block"
import { SearchInput } from "@/registry/ui/search-input"
import { Toc } from "@/registry/ui/toc"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Your own docs landing",
    description: "The page is a hero with SearchInput and two Buttons, then a Toc beside ScrollReveal sections; swap in your product's copy and snippets.",
    code: `<div className="w-full space-y-10">
  <section className="rounded-2xl border border-border bg-sunken px-6 py-14 text-center">
    <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Lumen developer docs</p>
    <h1 className="mt-3 text-4xl font-medium tracking-[-0.026em] text-fg">Invoices as an API</h1>
    <p className="mx-auto mt-3 max-w-lg text-sm text-fg-muted">Create, send and reconcile invoices from your own stack in an afternoon.</p>
    <div className="mx-auto mt-6 max-w-md">
      <SearchInput aria-label="Search the docs" placeholder="Search endpoints, guides and webhooks" />
    </div>
    <div className="mt-6 flex justify-center gap-3">
      <Button>Quickstart</Button>
      <Button variant="outline">API reference</Button>
    </div>
  </section>
  <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
    <Toc
      items={[
        { id: "auth", title: "Authentication" },
        { id: "create", title: "Create an invoice", level: 2 },
        { id: "webhooks", title: "Webhooks", level: 2 },
      ]}
      activeId="create"
    />
    <div className="space-y-6">
      <ScrollReveal>
        <h2 id="create" className="text-2xl font-medium tracking-[-0.018em] text-fg">Create an invoice</h2>
        <p className="mt-2 text-sm text-fg-muted">One call creates the invoice, renders the PDF and schedules the reminders.</p>
        <div className="mt-4">
          <CodeBlock code="npm install @lumen/node" language="bash" />
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <Callout title="Sandbox first" tone="warning">Test keys start with sk_test and never send real email.</Callout>
      </ScrollReveal>
    </div>
  </div>
</div>`,
    node: (
      <div className="w-full space-y-10">
        <section className="rounded-2xl border border-border bg-sunken px-6 py-14 text-center">
          <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Lumen developer docs</p>
          <h1 className="mt-3 text-4xl font-medium tracking-[-0.026em] text-fg">Invoices as an API</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-fg-muted">Create, send and reconcile invoices from your own stack in an afternoon.</p>
          <div className="mx-auto mt-6 max-w-md">
            <SearchInput aria-label="Search the docs" placeholder="Search endpoints, guides and webhooks" />
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <Button>Quickstart</Button>
            <Button variant="outline">API reference</Button>
          </div>
        </section>
        <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
          <Toc
            items={[
              { id: "auth", title: "Authentication" },
              { id: "create", title: "Create an invoice", level: 2 },
              { id: "webhooks", title: "Webhooks", level: 2 },
            ]}
            activeId="create"
          />
          <div className="space-y-6">
            <ScrollReveal>
              <h2 id="create" className="text-2xl font-medium tracking-[-0.018em] text-fg">Create an invoice</h2>
              <p className="mt-2 text-sm text-fg-muted">One call creates the invoice, renders the PDF and schedules the reminders.</p>
              <div className="mt-4">
                <CodeBlock code="npm install @lumen/node" language="bash" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <Callout title="Sandbox first" tone="warning">Test keys start with sk_test and never send real email.</Callout>
            </ScrollReveal>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "In a browser frame",
    description: "Give the page some padding and wrap it in BrowserMockup to show the docs on a marketing page.",
    code: `<BrowserMockup url="https://docs.lumen.dev" phone={false}>
  <div className="p-6">
    <DocsMarketing />
  </div>
</BrowserMockup>`,
    node: (
      <BrowserMockup url="https://docs.lumen.dev" phone={false}>
        <div className="p-6">
          <DocsMarketing />
        </div>
      </BrowserMockup>
    ),
  },
]
