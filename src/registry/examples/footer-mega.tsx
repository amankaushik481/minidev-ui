import { FooterMega } from "@/registry/ui/footer-mega"
import type { Example } from "./types"

const NORTHWIND_COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "New arrivals", href: "#" },
      { label: "Workwear", href: "#" },
      { label: "Gift cards", href: "#" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Order status", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Contact us", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", href: "#" },
      { label: "Stores", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
]

export const examples: Example[] = [
  {
    title: "Custom brand and columns",
    description: "brand and tagline fill the wide first column; each column is a title with a list of label and href pairs.",
    code: `const NORTHWIND_COLUMNS = [
  { title: "Shop", links: [{ label: "New arrivals", href: "#" }, { label: "Workwear", href: "#" }, { label: "Gift cards", href: "#" }] },
  { title: "Help", links: [{ label: "Order status", href: "#" }, { label: "Returns", href: "#" }, { label: "Contact us", href: "#" }] },
  { title: "Company", links: [{ label: "Our story", href: "#" }, { label: "Stores", href: "#" }, { label: "Careers", href: "#" }] },
]

<FooterMega brand="Northwind" tagline="Workwear made to last, shipped from Portland since 1994." columns={NORTHWIND_COLUMNS} />`,
    node: <FooterMega brand="Northwind" tagline="Workwear made to last, shipped from Portland since 1994." columns={NORTHWIND_COLUMNS} />,
  },
  {
    title: "With a legal bar",
    description: "Render the copyright and policy links in your own strip under the footer so the columns stay about navigation.",
    code: `<div className="w-full">
  <FooterMega
    columns={[
      { title: "Product", links: [{ label: "Invoicing", href: "#" }, { label: "Payments", href: "#" }, { label: "Pricing", href: "#" }] },
      { title: "Resources", links: [{ label: "Documentation", href: "#" }, { label: "Changelog", href: "#" }, { label: "Status", href: "#" }] },
    ]}
  />
  <div className="border-t border-border bg-surface">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-4 text-xs text-fg-muted">
      <span>© 2026 Lumen Software Ltd.</span>
      <nav className="flex gap-4">
        <a href="#" className="hover:text-fg">Privacy</a>
        <a href="#" className="hover:text-fg">Terms</a>
        <a href="#" className="hover:text-fg">Cookies</a>
      </nav>
    </div>
  </div>
</div>`,
    node: (
      <div className="w-full">
        <FooterMega
          columns={[
            { title: "Product", links: [{ label: "Invoicing", href: "#" }, { label: "Payments", href: "#" }, { label: "Pricing", href: "#" }] },
            { title: "Resources", links: [{ label: "Documentation", href: "#" }, { label: "Changelog", href: "#" }, { label: "Status", href: "#" }] },
          ]}
        />
        <div className="border-t border-border bg-surface">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-4 text-xs text-fg-muted">
            <span>© 2026 Lumen Software Ltd.</span>
            <nav className="flex gap-4">
              <a href="#" className="hover:text-fg">Privacy</a>
              <a href="#" className="hover:text-fg">Terms</a>
              <a href="#" className="hover:text-fg">Cookies</a>
            </nav>
          </div>
        </div>
      </div>
    ),
  },
]
