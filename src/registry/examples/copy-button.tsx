import { CopyButton } from "@/registry/ui/copy-button"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Next to a value",
    description: "Pass the exact text to copy; the label flips to Copied for a moment and the icon turns into a check.",
    code: `<div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 shadow-raised">
  <span className="font-mono text-sm text-fg">INV-2041</span>
  <CopyButton value="INV-2041" />
</div>`,
    node: (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 shadow-raised">
        <span className="font-mono text-sm text-fg">INV-2041</span>
        <CopyButton value="INV-2041" />
      </div>
    ),
  },
  {
    title: "Custom labels and variants",
    description: "label and copiedLabel change the text; variant and size come from Button.",
    code: `<CopyButton value="https://lumen.app/pay/INV-2041" label="Copy link" copiedLabel="Link copied" />
<CopyButton value="https://lumen.app/pay/INV-2041" label="Copy link" copiedLabel="Link copied" variant="ghost" />
<CopyButton value="https://lumen.app/pay/INV-2041" label="Copy payment link" copiedLabel="Copied" variant="default" size="default" />`,
    node: (
      <div className="flex flex-wrap items-center gap-2">
        <CopyButton value="https://lumen.app/pay/INV-2041" label="Copy link" copiedLabel="Link copied" />
        <CopyButton value="https://lumen.app/pay/INV-2041" label="Copy link" copiedLabel="Link copied" variant="ghost" />
        <CopyButton value="https://lumen.app/pay/INV-2041" label="Copy payment link" copiedLabel="Copied" variant="default" size="default" />
      </div>
    ),
  },
  {
    title: "API key field",
    description: "A read only input with the button beside it; keep the same value in both so what is copied is what is shown.",
    code: `<div className="flex w-80 flex-col gap-1.5">
  <Label htmlFor="api-key">Live API key</Label>
  <div className="flex items-center gap-2">
    <Input id="api-key" readOnly value="lm_live_4f9a2c7e1b8d" className="font-mono" />
    <CopyButton value="lm_live_4f9a2c7e1b8d" size="default" label="Copy" />
  </div>
</div>`,
    node: (
      <div className="flex w-80 flex-col gap-1.5">
        <Label htmlFor="api-key">Live API key</Label>
        <div className="flex items-center gap-2">
          <Input id="api-key" readOnly value="lm_live_4f9a2c7e1b8d" className="font-mono" />
          <CopyButton value="lm_live_4f9a2c7e1b8d" size="default" label="Copy" />
        </div>
      </div>
    ),
  },
]
