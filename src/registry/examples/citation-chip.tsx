"use client"
import { CitationChip } from "@/registry/ui/citation-chip"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { SourceCard } from "@/registry/ui/source-card"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Inline links",
    description: "With href each chip opens the source in a new tab. Number the chips in the order the sources first appear.",
    code: `<p className="max-w-md text-sm leading-[1.7] text-fg">
  Refunds go back to the original card and usually settle in 5 to 10 business days{" "}
  <CitationChip index={1} href="https://docs.acme.example/refunds">Refund policy</CitationChip>. Partial refunds are allowed
  up to the amount captured{" "}
  <CitationChip index={2} href="https://docs.acme.example/api/refunds">Refunds API</CitationChip>.
</p>`,
    node: (
      <p className="max-w-md text-sm leading-[1.7] text-fg">
        Refunds go back to the original card and usually settle in 5 to 10 business days{" "}
        <CitationChip index={1} href="https://docs.acme.example/refunds">Refund policy</CitationChip>. Partial refunds are allowed
        up to the amount captured{" "}
        <CitationChip index={2} href="https://docs.acme.example/api/refunds">Refunds API</CitationChip>.
      </p>
    ),
  },
  {
    title: "Source preview in a popover",
    description: "The button version works as a popover trigger, so the reader can check the quote without leaving the answer.",
    code: `<p className="max-w-md text-sm leading-[1.7] text-fg">
  Annual plans can be cancelled within 30 days for a full refund{" "}
  <Popover>
    <PopoverTrigger render={<CitationChip index={1}>Billing terms</CitationChip>} />
    <PopoverContent className="w-80 p-0">
      <SourceCard
        title="Billing terms"
        url="acme.example/legal/billing#refunds"
        snippet="Annual subscriptions cancelled within 30 days of purchase are refunded in full."
        badge="Policy"
        className="border-0 shadow-none"
      />
    </PopoverContent>
  </Popover>
  .
</p>`,
    node: (
      <p className="max-w-md text-sm leading-[1.7] text-fg">
        Annual plans can be cancelled within 30 days for a full refund{" "}
        <Popover>
          <PopoverTrigger render={<CitationChip index={1}>Billing terms</CitationChip>} />
          <PopoverContent className="w-80 p-0">
            <SourceCard
              title="Billing terms"
              url="acme.example/legal/billing#refunds"
              snippet="Annual subscriptions cancelled within 30 days of purchase are refunded in full."
              badge="Policy"
              className="border-0 shadow-none"
            />
          </PopoverContent>
        </Popover>
        .
      </p>
    ),
  },
]
