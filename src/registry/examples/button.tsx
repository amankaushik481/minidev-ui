import { ArrowRightIcon, PlusIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Variants",
    description: "Default, outline, ghost and destructive share one height and focus ring.",
    code: `<Button>Save changes</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Skip</Button>
<Button variant="destructive">Delete</Button>`,
    node: (
      <div className="flex flex-wrap items-center gap-2">
        <Button>Save changes</Button>
        <Button variant="outline">Cancel</Button>
        <Button variant="ghost">Skip</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    ),
  },
  {
    title: "With icons",
    description: "Icons inherit the size; put the arrow after the label for forward actions.",
    code: `<Button><PlusIcon /> New invoice</Button>
<Button variant="outline">Continue <ArrowRightIcon /></Button>`,
    node: (
      <div className="flex flex-wrap items-center gap-2">
        <Button><PlusIcon /> New invoice</Button>
        <Button variant="outline">Continue <ArrowRightIcon /></Button>
      </div>
    ),
  },
]
