"use client"
import * as React from "react"
import { useInView } from "motion/react"
import { cn } from "@/lib/utils"
import { MagneticCta } from "@/registry/premium/magnetic-cta"

/**
 * A hero with a headline over a row of thin accent bars that rise and fall like a live audio waveform, and a magnetic call to action.
 * The bars breathe with compositor-only CSS transforms, each at its own pace,
 * pause while off screen, and hold still for reduced motion. The waveform is
 * decorative and hidden from screen readers.
 *
 * Use it for audio, voice, AI-call or "live" products. Reach for WavyBackground
 * for soft rolling waves behind any hero, and the free AudioPlayer when the
 * waveform must reflect real audio.
 *
 * @example
 * <WaveformHero title="Every call, transcribed" description="Lumen listens to supplier calls and logs every promise to pay." cta="Try it free" />
 */
type WaveformHeroProps = {
  title?: string
  description?: string
  /** Label of the call to action. Pass null to hide it. */
  cta?: React.ReactNode
  /** Number of bars. */
  bars?: number
  className?: string
}

function WaveformHero({
  title = "Sound without the noise",
  description = "A kinetic waveform drawn in hairline bars. It holds still for anyone who prefers reduced motion.",
  cta = "Start free",
  bars = 48,
  className,
}: WaveformHeroProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "80px" })
  const heights = React.useMemo(() => Array.from({ length: Math.max(1, bars) }, (_, i) => 20 + Math.abs(Math.sin(i * 0.45)) * 70), [bars])
  return (
    <section data-slot="waveform-hero" data-tier="premium" className={cn("overflow-hidden rounded-2xl border border-border bg-bg px-4 py-12 sm:px-6 sm:py-16", className)}>
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-[clamp(1.75rem,3.5vw+1rem,3rem)] font-medium tracking-[-0.028em] text-balance text-fg">{title}</h2>
        <p className="mt-3 max-w-md text-sm leading-[1.55] text-pretty text-fg-muted">{description}</p>
        <div ref={ref} aria-hidden className="mt-8 flex h-20 w-full max-w-full items-end justify-center gap-0.5 overflow-hidden sm:mt-10 sm:h-24 sm:gap-1">
          {heights.map((h, i) => (
            <div
              key={i}
              data-slot="waveform-hero-bar"
              className="w-1.5 shrink-0 origin-bottom rounded-full bg-accent [animation:waveform-hero-bar_var(--d)_ease-in-out_var(--delay)_infinite_alternate] motion-reduce:[animation:none]"
              style={
                {
                  height: `${h}%`,
                  "--d": `${(1.6 + (i % 5) * 0.1).toFixed(2)}s`,
                  "--delay": `${(i * 0.02).toFixed(2)}s`,
                  animationPlayState: inView ? "running" : "paused",
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        {cta ? (
          <div className="mt-8">
            <MagneticCta>{cta}</MagneticCta>
          </div>
        ) : null}
      </div>
      <style>{`@keyframes waveform-hero-bar{0%{transform:scaleY(.55)}50%{transform:scaleY(1)}100%{transform:scaleY(.7)}}`}</style>
    </section>
  )
}
export { WaveformHero }
export type { WaveformHeroProps }
