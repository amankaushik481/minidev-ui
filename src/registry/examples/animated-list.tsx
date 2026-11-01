import { ArrowRightIcon, CircleCheckIcon, GitPullRequestIcon, RocketIcon, TriangleAlertIcon } from "lucide-react"
import { AnimatedList } from "@/registry/premium/animated-list"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

const DEPLOY_EVENTS = [
  { icon: RocketIcon, title: "Deploy started", detail: "lumen-web 2.14 → production by Theo Okafor", time: "now" },
  { icon: CircleCheckIcon, title: "Checks passed", detail: "412 tests, 0 failures in 1m 48s", time: "2m" },
  { icon: GitPullRequestIcon, title: "PR #418 merged", detail: "Faster PDF export by Sam Lowe", time: "6m" },
  { icon: TriangleAlertIcon, title: "Rollback", detail: "lumen-api 1.9.3 → 1.9.2 after error spike", time: "14m" },
]

export const examples: Example[] = [
  {
    title: "Custom items",
    description: "Items cycle in order and wrap around; each takes a lucide icon, a title, a detail line and a time label.",
    code: `const DEPLOY_EVENTS = [
  { icon: RocketIcon, title: "Deploy started", detail: "lumen-web 2.14 → production by Theo Okafor", time: "now" },
  { icon: CircleCheckIcon, title: "Checks passed", detail: "412 tests, 0 failures in 1m 48s", time: "2m" },
  { icon: GitPullRequestIcon, title: "PR #418 merged", detail: "Faster PDF export by Sam Lowe", time: "6m" },
  { icon: TriangleAlertIcon, title: "Rollback", detail: "lumen-api 1.9.3 → 1.9.2 after error spike", time: "14m" },
]

<AnimatedList items={DEPLOY_EVENTS} />`,
    node: <AnimatedList items={DEPLOY_EVENTS} />,
  },
  {
    title: "Faster with more rows",
    description: "interval is the gap between arrivals in milliseconds and max is how many stay on screen before the oldest leaves.",
    code: `<AnimatedList interval={1100} max={6} />`,
    node: <AnimatedList interval={1100} max={6} />,
  },
  {
    title: "Beside marketing copy",
    description: "Pair the feed with a headline in a two column section; the list pauses when it scrolls out of view.",
    code: `<section className="grid w-full items-center gap-8 md:grid-cols-2">
  <div>
    <h2 className="text-2xl font-medium tracking-[-0.03em] text-fg">Know the moment money moves</h2>
    <p className="mt-3 text-sm leading-[1.6] text-fg-muted">
      Payments, signups and deploys show up in Lumen as they happen, so Northwind's finance team stopped refreshing dashboards.
    </p>
    <Button variant="outline" className="mt-5">See the live demo <ArrowRightIcon /></Button>
  </div>
  <AnimatedList max={3} className="mx-auto" />
</section>`,
    node: (
      <section className="grid w-full items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-medium tracking-[-0.03em] text-fg">Know the moment money moves</h2>
          <p className="mt-3 text-sm leading-[1.6] text-fg-muted">
            Payments, signups and deploys show up in Lumen as they happen, so Northwind's finance team stopped refreshing dashboards.
          </p>
          <Button variant="outline" className="mt-5">See the live demo <ArrowRightIcon /></Button>
        </div>
        <AnimatedList max={3} className="mx-auto" />
      </section>
    ),
  },
]
