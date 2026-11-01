import { BrowserMockup } from "@/registry/premium/browser-mockup"
import { CareersPage } from "@/registry/premium/careers-page"
import { Button } from "@/registry/ui/button"
import { FooterMega } from "@/registry/ui/footer-mega"
import { NavMarketing } from "@/registry/ui/nav-marketing"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "In a browser frame",
    description: "Drop the page inside BrowserMockup to show the template on a landing or pitch page.",
    code: `<BrowserMockup url="https://lumen.dev/careers" phone={false}>
  <CareersPage />
</BrowserMockup>`,
    node: (
      <BrowserMockup url="https://lumen.dev/careers" phone={false}>
        <CareersPage />
      </BrowserMockup>
    ),
  },
  {
    title: "Your own roles",
    description: "The page is NavMarketing, a list of role rows with a Button each and FooterMega; rebuild it with your openings.",
    code: `<div className="w-full bg-bg">
  <NavMarketing brand="Lumen" links={[{ label: "Product", href: "#" }, { label: "Customers", href: "#" }, { label: "Careers", href: "#" }]} />
  <div className="mx-auto max-w-3xl px-6 py-16">
    <h1 className="text-4xl font-medium tracking-[-0.026em] text-fg">Help 4,000 companies close their books</h1>
    <p className="mt-3 text-sm text-fg-muted">Remote first, one on-site week a quarter, salaries published on every listing.</p>
    <ul className="mt-10 space-y-3">
      {[
        { title: "Senior Backend Engineer", loc: "Remote, EU", type: "Full-time" },
        { title: "Product Designer", loc: "London", type: "Full-time" },
        { title: "Account Executive", loc: "New York", type: "Full-time" },
        { title: "Support Engineer", loc: "Remote", type: "Contract" },
      ].map((r) => (
        <li key={r.title} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3">
          <div>
            <p className="text-sm font-medium text-fg">{r.title}</p>
            <p className="text-xs text-fg-muted">{r.loc} · {r.type}</p>
          </div>
          <Button size="sm" variant="outline">Apply</Button>
        </li>
      ))}
    </ul>
  </div>
  <FooterMega />
</div>`,
    node: (
      <div className="w-full bg-bg">
        <NavMarketing brand="Lumen" links={[{ label: "Product", href: "#" }, { label: "Customers", href: "#" }, { label: "Careers", href: "#" }]} />
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-4xl font-medium tracking-[-0.026em] text-fg">Help 4,000 companies close their books</h1>
          <p className="mt-3 text-sm text-fg-muted">Remote first, one on-site week a quarter, salaries published on every listing.</p>
          <ul className="mt-10 space-y-3">
            {[
              { title: "Senior Backend Engineer", loc: "Remote, EU", type: "Full-time" },
              { title: "Product Designer", loc: "London", type: "Full-time" },
              { title: "Account Executive", loc: "New York", type: "Full-time" },
              { title: "Support Engineer", loc: "Remote", type: "Contract" },
            ].map((r) => (
              <li key={r.title} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-fg">{r.title}</p>
                  <p className="text-xs text-fg-muted">{r.loc} · {r.type}</p>
                </div>
                <Button size="sm" variant="outline">Apply</Button>
              </li>
            ))}
          </ul>
        </div>
        <FooterMega />
      </div>
    ),
  },
]
