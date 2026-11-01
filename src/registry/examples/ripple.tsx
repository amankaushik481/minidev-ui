import { Ripple } from "@/registry/premium/ripple"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Tighter rings",
    description: "More rings with less spacing and a shorter duration read as a quick, busy pulse; click anywhere to add a burst.",
    code: `<Ripple count={10} spacing={28} size={72} duration={3} className="h-72">
  <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
    <p className="text-2xl font-medium tracking-[-0.03em] text-fg">Syncing 3 bank accounts</p>
    <p className="text-sm text-fg-muted">Tap anywhere to send a ping.</p>
  </div>
</Ripple>`,
    node: (
      <Ripple count={10} spacing={28} size={72} duration={3} className="h-72">
        <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
          <p className="text-2xl font-medium tracking-[-0.03em] text-fg">Syncing 3 bank accounts</p>
          <p className="text-sm text-fg-muted">Tap anywhere to send a ping.</p>
        </div>
      </Ripple>
    ),
  },
  {
    title: "Off centre",
    description: "origin places the rings in percent of the panel, so the content can sit to one side.",
    code: `<Ripple origin={{ x: 82, y: 40 }} count={6} spacing={56} size={160} className="h-72">
  <div className="flex h-full max-w-md flex-col justify-center gap-3 px-8">
    <span className="w-fit rounded-full border border-accent-line bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-fg">Webhooks</span>
    <p className="text-3xl font-medium tracking-[-0.035em] text-fg">Every event, delivered</p>
    <p className="text-sm text-fg-muted">Lumen retries failed deliveries for 24 hours and signs every payload.</p>
  </div>
</Ripple>`,
    node: (
      <Ripple origin={{ x: 82, y: 40 }} count={6} spacing={56} size={160} className="h-72">
        <div className="flex h-full max-w-md flex-col justify-center gap-3 px-8">
          <span className="w-fit rounded-full border border-accent-line bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-fg">Webhooks</span>
          <p className="text-3xl font-medium tracking-[-0.035em] text-fg">Every event, delivered</p>
          <p className="text-sm text-fg-muted">Lumen retries failed deliveries for 24 hours and signs every payload.</p>
        </div>
      </Ripple>
    ),
  },
  {
    title: "Not interactive",
    description: "interactive={false} turns off the click burst; a slow duration suits a calm presence or status panel.",
    code: `<Ripple interactive={false} duration={6} count={5} className="h-64">
  <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
    <Avatar size="lg"><AvatarFallback>MC</AvatarFallback></Avatar>
    <p className="text-sm font-medium text-fg">Maya Chen is sharing her screen</p>
    <Button size="sm" variant="outline">Join the call</Button>
  </div>
</Ripple>`,
    node: (
      <Ripple interactive={false} duration={6} count={5} className="h-64">
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
          <Avatar size="lg"><AvatarFallback>MC</AvatarFallback></Avatar>
          <p className="text-sm font-medium text-fg">Maya Chen is sharing her screen</p>
          <Button size="sm" variant="outline">Join the call</Button>
        </div>
      </Ripple>
    ),
  },
]
