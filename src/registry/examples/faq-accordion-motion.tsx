"use client"
import { FaqAccordionMotion } from "@/registry/premium/faq-accordion-motion"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Pricing FAQ, all closed",
    description: "defaultOpen={-1} starts with every answer closed; one opens at a time.",
    code: `<FaqAccordionMotion
  className="w-full max-w-xl"
  defaultOpen={-1}
  items={[
    { q: "What counts as a seat?", a: "Anyone who can log in. Accountants you invite as read-only reviewers are free." },
    { q: "Do you charge per invoice?", a: "No. Every plan includes unlimited invoices; only payment processing has a fee." },
    { q: "What happens when the trial ends?", a: "You move to Starter unless you pick a plan. Nothing is deleted." },
  ]}
/>`,
    node: (
      <FaqAccordionMotion
        className="w-full max-w-xl"
        defaultOpen={-1}
        items={[
          { q: "What counts as a seat?", a: "Anyone who can log in. Accountants you invite as read-only reviewers are free." },
          { q: "Do you charge per invoice?", a: "No. Every plan includes unlimited invoices; only payment processing has a fee." },
          { q: "What happens when the trial ends?", a: "You move to Starter unless you pick a plan. Nothing is deleted." },
        ]}
      />
    ),
  },
  {
    title: "Answers with links",
    description: "Answers take any React node, so one can point to the full policy.",
    code: `<FaqAccordionMotion
  className="w-full max-w-xl"
  items={[
    {
      q: "Where is my data stored?",
      a: (
        <>
          In the EU or the US, your choice at signup. See the{" "}
          <a href="#" className="font-medium text-accent-fg underline underline-offset-4">data residency page</a> for the regions.
        </>
      ),
    },
    { q: "Can I export everything?", a: "Yes. Settings, then Export, gives you a ZIP of CSV files within a few minutes." },
  ]}
/>`,
    node: (
      <FaqAccordionMotion
        className="w-full max-w-xl"
        items={[
          {
            q: "Where is my data stored?",
            a: (
              <>
                In the EU or the US, your choice at signup. See the{" "}
                <a href="#" className="font-medium text-accent-fg underline underline-offset-4">data residency page</a> for the regions.
              </>
            ),
          },
          { q: "Can I export everything?", a: "Yes. Settings, then Export, gives you a ZIP of CSV files within a few minutes." },
        ]}
      />
    ),
  },
]
