import { TreeView, type TreeNode } from "@/registry/ui/tree-view"
import type { Example } from "./types"

const org: TreeNode[] = [
  {
    id: "ceo",
    label: "Priya Raman, CEO",
    children: [
      {
        id: "eng",
        label: "Engineering",
        children: [
          { id: "theo", label: "Theo Okafor, Platform" },
          { id: "maya", label: "Maya Chen, Web" },
          { id: "ada", label: "Ada Novak, Mobile" },
        ],
      },
      { id: "finance", label: "Finance", children: [{ id: "sam", label: "Sam Lowe, Billing" }] },
      { id: "design", label: "Design", children: [] },
    ],
  },
]

const environments: TreeNode[] = [
  { id: "production", label: "production" },
  { id: "staging", label: "staging" },
  { id: "preview", label: "preview" },
  { id: "local", label: "local" },
]

export const examples: Example[] = [
  {
    title: "Org chart",
    description: "Any nested data works; a node with an empty children array renders as a leaf.",
    code: `const org: TreeNode[] = [
  {
    id: "ceo",
    label: "Priya Raman, CEO",
    children: [
      {
        id: "eng",
        label: "Engineering",
        children: [
          { id: "theo", label: "Theo Okafor, Platform" },
          { id: "maya", label: "Maya Chen, Web" },
          { id: "ada", label: "Ada Novak, Mobile" },
        ],
      },
      { id: "finance", label: "Finance", children: [{ id: "sam", label: "Sam Lowe, Billing" }] },
      { id: "design", label: "Design", children: [] },
    ],
  },
]

<TreeView nodes={org} />`,
    node: <TreeView nodes={org} />,
  },
  {
    title: "Leaf nodes only",
    description: "Without children the chevrons stay hidden and the tree behaves like a plain list with the same hover and focus styles.",
    code: `const environments: TreeNode[] = [
  { id: "production", label: "production" },
  { id: "staging", label: "staging" },
  { id: "preview", label: "preview" },
  { id: "local", label: "local" },
]

<TreeView nodes={environments} className="max-w-48" />`,
    node: <TreeView nodes={environments} className="max-w-48" />,
  },
  {
    title: "Full width",
    description: "The tree caps itself at max-w-xs by default; override it with className to fill a sidebar or a panel.",
    code: `// org is the node list from the "Org chart" example.
<div className="w-full max-w-md rounded-xl border border-border bg-surface p-2">
  <TreeView nodes={org} className="max-w-none" />
</div>`,
    node: (
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-2">
        <TreeView nodes={org} className="max-w-none" />
      </div>
    ),
  },
]
