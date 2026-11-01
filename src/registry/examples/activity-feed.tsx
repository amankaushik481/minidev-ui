import { ActivityFeed } from "@/registry/ui/activity-feed"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

const DEPLOYS = [
  { id: "d1", user: "Theo Okafor", action: "deployed lumen-web 2.14 to production", time: "4m ago" },
  { id: "d2", user: "Priya Raman", action: "rolled back lumen-api to 1.9.2", time: "32m ago" },
  { id: "d3", user: "Sam Lowe", action: "opened PR #418, faster PDF export", time: "1h ago" },
  { id: "d4", user: "Maya Chen", action: "approved the staging promotion", time: "2h ago" },
]

export const examples: Example[] = [
  {
    title: "Custom items",
    description: "Each item is a user, an action phrase and a time label; the initials come from the user name.",
    code: `const DEPLOYS = [
  { id: "d1", user: "Theo Okafor", action: "deployed lumen-web 2.14 to production", time: "4m ago" },
  { id: "d2", user: "Priya Raman", action: "rolled back lumen-api to 1.9.2", time: "32m ago" },
  { id: "d3", user: "Sam Lowe", action: "opened PR #418, faster PDF export", time: "1h ago" },
  { id: "d4", user: "Maya Chen", action: "approved the staging promotion", time: "2h ago" },
]

<ActivityFeed items={DEPLOYS} />`,
    node: <ActivityFeed items={DEPLOYS} />,
  },
  {
    title: "With a heading",
    description: "Put a title and a link to the full log above the feed; the card border belongs to the feed itself.",
    code: `<section className="w-full max-w-md">
  <div className="mb-2 flex items-center justify-between">
    <h3 className="text-sm font-medium text-fg">Recent activity</h3>
    <Button variant="link" size="sm">View all</Button>
  </div>
  <ActivityFeed
    items={[
      { id: "b1", user: "Maya Chen", action: "paid INV-2041", time: "2m ago" },
      { id: "b2", user: "Priya Raman", action: "sent a reminder for INV-2038", time: "25m ago" },
      { id: "b3", user: "Theo Okafor", action: "updated Northwind's billing address", time: "1h ago" },
    ]}
  />
</section>`,
    node: (
      <section className="w-full max-w-md">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-fg">Recent activity</h3>
          <Button variant="link" size="sm">View all</Button>
        </div>
        <ActivityFeed
          items={[
            { id: "b1", user: "Maya Chen", action: "paid INV-2041", time: "2m ago" },
            { id: "b2", user: "Priya Raman", action: "sent a reminder for INV-2038", time: "25m ago" },
            { id: "b3", user: "Theo Okafor", action: "updated Northwind's billing address", time: "1h ago" },
          ]}
        />
      </section>
    ),
  },
]
