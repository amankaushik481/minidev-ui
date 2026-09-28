"use client"
import * as React from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

type Step = { title: string; body: string; label: string }

function StickyFeatureStory({
  steps = [
    { label: "01", title: "Compose free", body: "Ship product UI from the MIT kit — tables, AI, billing, shells." },
    { label: "02", title: "Invite the team", body: "Bring everyone in with one link. Roles and permissions are already set." },
    { label: "03", title: "Ship it", body: "Publish when you are ready. Roll back in one click if you are not." },
  ],
  className,
}: {
  steps?: Step[]
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const active = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 1, 2, 2])
  const [idx, setIdx] = React.useState(0)
  React.useEffect(() => {
    if (reduce) return
    return active.on("change", (v) => setIdx(Math.round(v)))
  }, [active, reduce])

  return (
    <div
      ref={ref}
      data-slot="sticky-feature-story"
      data-tier="premium"
      className={cn("relative", className)}
      style={{ height: reduce ? undefined : `${steps.length * 90}vh` }}
    >
      <div className={cn("grid gap-8 lg:grid-cols-2", reduce ? "" : "sticky top-16 h-[70vh] items-center")}>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              animate={reduce ? undefined : { x: i === idx ? 0 : -4 }}
              transition={{ duration: 0.35 }}
              className={cn(
                "border-l pl-4",
                i === idx ? "border-accent" : "border-border"
              )}
            >
              <p className={cn("text-xs font-medium tracking-[0.01em] uppercase", i === idx ? "text-fg" : "text-fg-muted")}>{s.label}</p>
              <h3 className={cn("mt-1 text-2xl font-medium tracking-[-0.018em]", i === idx ? "text-fg" : "text-fg-muted")}>{s.title}</h3>
              <p className="mt-2 text-sm leading-[1.55] text-fg-muted">{s.body}</p>
            </motion.div>
          ))}
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-sunken">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,var(--accent)_18%,transparent),transparent_55%)]" aria-hidden />
          <div className="absolute inset-4 rounded-xl border border-border bg-surface shadow-highlight">
            <div className="flex h-9 items-center gap-1.5 border-b border-border px-3">
              <span className="size-2 rounded-full bg-fg-subtle/40" />
              <span className="size-2 rounded-full bg-fg-subtle/40" />
              <span className="size-2 rounded-full bg-fg-subtle/40" />
            </div>
            <div className="space-y-3 p-4">
              <motion.div
                key={idx}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-3 w-2/3 rounded bg-fg/10"
              />
              <div className="h-3 w-1/2 rounded bg-fg/5" />
              <div className="mt-6 grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "aspect-square rounded-lg border border-border bg-sunken",
                      i === idx % 3 && "border-accent/40 bg-accent/10"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="absolute right-4 bottom-4 text-xs font-medium tabular-nums text-fg-muted">
            {String(idx + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  )
}
export { StickyFeatureStory }
