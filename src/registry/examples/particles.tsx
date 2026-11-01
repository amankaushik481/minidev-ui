import { Particles } from "@/registry/premium/particles"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Attract mode",
    description: "mode=\"attract\" pulls particles toward the pointer instead of parting around it; radius sets how far the pull reaches.",
    code: `<Particles mode="attract" radius={180} quantity={160} className="h-72">
  <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
    <p className="text-2xl font-medium tracking-[-0.03em] text-fg">Move the pointer</p>
    <p className="text-sm text-fg-muted">The field gathers toward it and settles when it leaves.</p>
  </div>
</Particles>`,
    node: (
      <Particles mode="attract" radius={180} quantity={160} className="h-72">
        <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
          <p className="text-2xl font-medium tracking-[-0.03em] text-fg">Move the pointer</p>
          <p className="text-sm text-fg-muted">The field gathers toward it and settles when it leaves.</p>
        </div>
      </Particles>
    ),
  },
  {
    title: "Dense and still",
    description: "drift={0} holds the field in place so only the pointer moves it; a small size and the ink colour read as a starfield.",
    code: `<Particles quantity={260} size={1.5} drift={0} color="var(--fg)" className="h-64">
  <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
    <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-fg-muted">Coming soon</span>
    <p className="text-2xl font-medium tracking-[-0.03em] text-fg">Lumen Capital</p>
    <p className="max-w-xs text-sm text-fg-muted">Working capital against the invoices you have already sent.</p>
  </div>
</Particles>`,
    node: (
      <Particles quantity={260} size={1.5} drift={0} color="var(--fg)" className="h-64">
        <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
          <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-fg-muted">Coming soon</span>
          <p className="text-2xl font-medium tracking-[-0.03em] text-fg">Lumen Capital</p>
          <p className="max-w-xs text-sm text-fg-muted">Working capital against the invoices you have already sent.</p>
        </div>
      </Particles>
    ),
  },
  {
    title: "Email capture",
    description: "Children sit above the canvas and keep the pointer, so a form works as usual; the second accent colours the dots.",
    code: `<Particles color="var(--accent-2)" quantity={80} size={2.5} className="h-80">
  <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
    <p className="max-w-[20ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">Get the Lumen 3.0 launch notes</p>
    <form className="flex w-full max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
      <Input type="email" placeholder="maya@northwind.com" aria-label="Email" />
      <Button type="submit">Notify me</Button>
    </form>
  </div>
</Particles>`,
    node: (
      <Particles color="var(--accent-2)" quantity={80} size={2.5} className="h-80">
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="max-w-[20ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">Get the Lumen 3.0 launch notes</p>
          <form className="flex w-full max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="maya@northwind.com" aria-label="Email" />
            <Button type="submit">Notify me</Button>
          </form>
        </div>
      </Particles>
    ),
  },
]
