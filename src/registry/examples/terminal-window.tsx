"use client"
import { TerminalWindow } from "@/registry/ui/terminal-window"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Install steps",
    description: "Children render in a pre, so spans can colour the prompt and the result.",
    code: `<TerminalWindow title="zsh" className="w-full max-w-lg">
  <span className="text-fg-muted">$ </span>npx shadcn@latest add https://ui.minidev.pro/r/terminal-window.json{"\\n"}
  <span className="text-success">✓ </span>Created 1 file{"\\n"}
  {"  components/ui/terminal-window.tsx"}
</TerminalWindow>`,
    node: (
      <TerminalWindow title="zsh" className="w-full max-w-lg">
        <span className="text-fg-muted">$ </span>npx shadcn@latest add https://ui.minidev.pro/r/terminal-window.json{"\n"}
        <span className="text-success">✓ </span>Created 1 file{"\n"}
        {"  components/ui/terminal-window.tsx"}
      </TerminalWindow>
    ),
  },
  {
    title: "Test output",
    description: "The title also names the output for screen readers, here \"npm test output\".",
    code: `<TerminalWindow title="npm test" className="w-full max-w-lg">
  <span className="text-success">PASS </span>invoices/format.test.ts{"\\n"}
  <span className="text-danger">FAIL </span>webhooks/retry.test.ts{"\\n"}
  {"  ● retries 3 times with backoff\\n\\n"}
  <span className="text-fg-muted">Tests: 1 failed, 41 passed, 42 total</span>
</TerminalWindow>`,
    node: (
      <TerminalWindow title="npm test" className="w-full max-w-lg">
        <span className="text-success">PASS </span>invoices/format.test.ts{"\n"}
        <span className="text-danger">FAIL </span>webhooks/retry.test.ts{"\n"}
        {"  ● retries 3 times with backoff\n\n"}
        <span className="text-fg-muted">Tests: 1 failed, 41 passed, 42 total</span>
      </TerminalWindow>
    ),
  },
]
