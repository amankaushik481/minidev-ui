"use client"
import { FileReference } from "@/registry/ui/file-reference"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Sources for an agent answer",
    description: "FileReference is not a link. Wrap it in one so each source opens the file at the cited lines.",
    code: `<div className="flex w-full max-w-sm flex-col gap-2">
  <p className="text-xs text-fg-muted">Answer based on 2 files</p>
  <a href="#billing" className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent">
    <FileReference name="billing.ts" path="src/lib/billing.ts" lines="42–68" />
  </a>
  <a href="#proration" className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent">
    <FileReference name="proration.test.ts" path="src/lib/__tests__/proration.test.ts" lines="L12" />
  </a>
</div>`,
    node: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <p className="text-xs text-fg-muted">Answer based on 2 files</p>
        <a href="#billing" className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <FileReference name="billing.ts" path="src/lib/billing.ts" lines="42–68" />
        </a>
        <a href="#proration" className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <FileReference name="proration.test.ts" path="src/lib/__tests__/proration.test.ts" lines="L12" />
        </a>
      </div>
    ),
  },
  {
    title: "Whole file",
    description: "Pass an empty lines string to hide the range; leaving it out shows the sample range.",
    code: `<FileReference className="w-full max-w-sm" name="schema.prisma" path="prisma/schema.prisma" lines="" />`,
    node: <FileReference className="w-full max-w-sm" name="schema.prisma" path="prisma/schema.prisma" lines="" />,
  },
]
