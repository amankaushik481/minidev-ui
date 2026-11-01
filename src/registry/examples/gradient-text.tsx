import { GradientText } from "@/registry/premium/gradient-text"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "As a heading",
    description: "as renders a real heading element, so the gradient line still works for SEO and screen readers.",
    code: `<GradientText as="h2">Invoices that close themselves</GradientText>`,
    node: <GradientText as="h2">Invoices that close themselves</GradientText>,
  },
  {
    title: "Custom colours and speed",
    description: "colors is the list of stops, tokens included; duration is seconds per drift, so a low value moves faster.",
    code: `<GradientText colors={["var(--success)", "var(--info)", "var(--success)"]} duration={4}>
  Paid in 140 currencies
</GradientText>`,
    node: (
      <GradientText colors={["var(--success)", "var(--info)", "var(--success)"]} duration={4}>
        Paid in 140 currencies
      </GradientText>
    ),
  },
  {
    title: "Inside a sentence",
    description: "Match the size of the surrounding text with className to light up only a few words of a headline.",
    code: `<p className="max-w-lg text-center text-3xl font-medium tracking-[-0.03em] text-fg">
  Lumen makes <GradientText className="text-3xl font-medium tracking-[-0.03em] sm:text-3xl">getting paid</GradientText> the easy part of running Northwind
</p>`,
    node: (
      <p className="max-w-lg text-center text-3xl font-medium tracking-[-0.03em] text-fg">
        Lumen makes <GradientText className="text-3xl font-medium tracking-[-0.03em] sm:text-3xl">getting paid</GradientText> the easy part of running Northwind
      </p>
    ),
  },
]
