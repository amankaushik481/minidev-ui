import { AvatarGroup } from "@/registry/ui/avatar-group"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Sizes",
    description: "sm, md and lg; the overlap and the summary text scale with the avatars.",
    code: `<AvatarGroup size="sm" />
<AvatarGroup />
<AvatarGroup size="lg" />`,
    node: (
      <div className="flex flex-col items-start gap-5">
        <AvatarGroup size="sm" />
        <AvatarGroup />
        <AvatarGroup size="lg" />
      </div>
    ),
  },
  {
    title: "Custom people and max",
    description: "Pass your own list; past max the rest collapse into a +N chip that opens a popover.",
    code: `<AvatarGroup
  label="Invoice approvers"
  max={3}
  people={[
    { name: "Maya Chen", role: "Head of Finance" },
    { name: "Theo Okafor", role: "Engineering lead" },
    { name: "Priya Raman", role: "Product designer" },
    { name: "Sam Lowe", role: "Controller" },
    { name: "Lucas Moreau", role: "Revenue ops" },
    { name: "Amara Nwosu", role: "Customer success" },
  ]}
/>`,
    node: (
      <AvatarGroup
        label="Invoice approvers"
        max={3}
        people={[
          { name: "Maya Chen", role: "Head of Finance" },
          { name: "Theo Okafor", role: "Engineering lead" },
          { name: "Priya Raman", role: "Product designer" },
          { name: "Sam Lowe", role: "Controller" },
          { name: "Lucas Moreau", role: "Revenue ops" },
          { name: "Amara Nwosu", role: "Customer success" },
        ]}
      />
    ),
  },
  {
    title: "Without summary",
    description: "Turn the names line off for table cells and list rows where space is tight.",
    code: `<ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface">
  <li className="flex items-center justify-between px-3 py-2.5">
    <span className="text-sm text-fg">Lumen billing</span>
    <AvatarGroup size="sm" summary={false} label="Billing" people={[{ name: "Maya Chen" }, { name: "Sam Lowe" }]} />
  </li>
  <li className="flex items-center justify-between px-3 py-2.5">
    <span className="text-sm text-fg">Northwind rollout</span>
    <AvatarGroup size="sm" summary={false} label="Rollout" people={[{ name: "Theo Okafor" }, { name: "Priya Raman" }, { name: "Kenji Sato" }]} />
  </li>
  <li className="flex items-center justify-between px-3 py-2.5">
    <span className="text-sm text-fg">Bank sync</span>
    <AvatarGroup size="sm" summary={false} label="Bank sync" people={[{ name: "Jonah Weiss" }]} />
  </li>
</ul>`,
    node: (
      <ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface">
        <li className="flex items-center justify-between px-3 py-2.5">
          <span className="text-sm text-fg">Lumen billing</span>
          <AvatarGroup size="sm" summary={false} label="Billing" people={[{ name: "Maya Chen" }, { name: "Sam Lowe" }]} />
        </li>
        <li className="flex items-center justify-between px-3 py-2.5">
          <span className="text-sm text-fg">Northwind rollout</span>
          <AvatarGroup size="sm" summary={false} label="Rollout" people={[{ name: "Theo Okafor" }, { name: "Priya Raman" }, { name: "Kenji Sato" }]} />
        </li>
        <li className="flex items-center justify-between px-3 py-2.5">
          <span className="text-sm text-fg">Bank sync</span>
          <AvatarGroup size="sm" summary={false} label="Bank sync" people={[{ name: "Jonah Weiss" }]} />
        </li>
      </ul>
    ),
  },
]
