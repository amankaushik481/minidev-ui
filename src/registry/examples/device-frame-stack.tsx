import { ArrowRightIcon } from "lucide-react"
import { DeviceFrameStack } from "@/registry/premium/device-frame-stack"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "In a hero",
    description: "Put the stack beside your headline; it fills its column and the frames fan out as the section scrolls in.",
    code: `<section className="grid w-full items-center gap-8 lg:grid-cols-2">
  <div className="space-y-4">
    <h2 className="text-3xl font-medium tracking-[-0.03em] text-fg">One ledger on every screen</h2>
    <p className="max-w-md text-sm leading-[1.55] text-fg-muted">Lumen keeps the web app, the phone app and the docs in step, so the number you see is the number everyone sees.</p>
    <div className="flex flex-wrap gap-2">
      <Button>Start free <ArrowRightIcon /></Button>
      <Button variant="outline">See the apps</Button>
    </div>
  </div>
  <DeviceFrameStack />
</section>`,
    node: (
      <section className="grid w-full items-center gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-medium tracking-[-0.03em] text-fg">One ledger on every screen</h2>
          <p className="max-w-md text-sm leading-[1.55] text-fg-muted">Lumen keeps the web app, the phone app and the docs in step, so the number you see is the number everyone sees.</p>
          <div className="flex flex-wrap gap-2">
            <Button>Start free <ArrowRightIcon /></Button>
            <Button variant="outline">See the apps</Button>
          </div>
        </div>
        <DeviceFrameStack />
      </section>
    ),
  },
  {
    title: "Compact",
    description: "Lower the height and cap the width with className for a card or a sidebar slot.",
    code: `<DeviceFrameStack className="h-52 max-w-sm sm:h-56" />`,
    node: <DeviceFrameStack className="h-52 max-w-sm sm:h-56" />,
  },
]
