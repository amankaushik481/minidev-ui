import { Label } from "@/registry/ui/label"
import { Checkbox } from "@/registry/ui/checkbox"
import { Input } from "@/registry/ui/input"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "With a checkbox",
    description: "Put the control first and point htmlFor at its id; clicking the text toggles the box.",
    code: `<div className="flex items-center gap-2">
  <Checkbox id="send-copy" defaultChecked />
  <Label htmlFor="send-copy">Send me a copy of every invoice</Label>
</div>`,
    node: (
      <div className="flex items-center gap-2">
        <Checkbox id="send-copy" defaultChecked />
        <Label htmlFor="send-copy">Send me a copy of every invoice</Label>
      </div>
    ),
  },
  {
    title: "Above an input",
    description: "Stack the label over the field with a small gap; for a description or error message reach for FormField instead.",
    code: `<div className="flex w-full max-w-xs flex-col gap-1.5">
  <Label htmlFor="po-number">Purchase order</Label>
  <Input id="po-number" placeholder="PO-7781" />
</div>`,
    node: (
      <div className="flex w-full max-w-xs flex-col gap-1.5">
        <Label htmlFor="po-number">Purchase order</Label>
        <Input id="po-number" placeholder="PO-7781" />
      </div>
    ),
  },
  {
    title: "Disabled control",
    description: "Put group and data-disabled on the wrapper of a disabled control; the label dims to match and stops taking clicks.",
    code: `<div className="group flex items-center gap-2" data-disabled="true">
  <Checkbox id="sso-only" disabled defaultChecked />
  <Label htmlFor="sso-only">Require single sign-on (managed by Northwind IT)</Label>
</div>`,
    node: (
      <div className="group flex items-center gap-2" data-disabled="true">
        <Checkbox id="sso-only" disabled defaultChecked />
        <Label htmlFor="sso-only">Require single sign-on (managed by Northwind IT)</Label>
      </div>
    ),
  },
]
