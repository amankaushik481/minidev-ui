"use client"
import * as React from "react"
import { LockIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/*
 * DeviceFrame: a phone or a browser window around live UI. The frame is
 * built from the kit's own surfaces, so it picks up the material and the
 * light like everything else: a lit bezel edge, a glass screen sheen.
 */

type DeviceFrameProps = {
  device?: "phone" | "browser"
  /** Browser only. */
  url?: string
  /** Phone status bar time. */
  time?: string
  children?: React.ReactNode
  className?: string
  screenClassName?: string
}

function PhoneFrame({ time = "9:41", children, className, screenClassName }: DeviceFrameProps) {
  return (
    <div
      data-slot="device-frame"
      data-device="phone"
      className={cn(
        "relative mx-auto w-[300px] rounded-[52px] bg-[oklch(0.17_0.006_260)] p-[11px] shadow-lg",
        "shadow-[inset_calc(var(--sx)*-1.5px)_calc(var(--sy)*-1.5px)_0_0_oklch(1_0_0/0.35),inset_0_0_0_1px_oklch(1_0_0/0.08),var(--o12x)_var(--o12y)_40px_-8px_oklch(0_0_0/0.35),var(--o28x)_var(--o28y)_80px_-20px_oklch(0_0_0/0.45)]",
        className
      )}
    >
      {/* side buttons */}
      <span aria-hidden className="absolute top-[120px] -left-[3px] h-14 w-[3px] rounded-l bg-[oklch(0.17_0.006_260)]" />
      <span aria-hidden className="absolute top-[190px] -left-[3px] h-14 w-[3px] rounded-l bg-[oklch(0.17_0.006_260)]" />
      <span aria-hidden className="absolute top-[150px] -right-[3px] h-20 w-[3px] rounded-r bg-[oklch(0.17_0.006_260)]" />
      <div className={cn("relative h-[610px] overflow-hidden rounded-[42px] bg-bg text-fg", screenClassName)}>
        <div className="relative z-20 flex h-11 items-center justify-between px-7 text-[13px] font-semibold tabular-nums">
          <span>{time}</span>
          <span aria-hidden className="absolute top-2.5 left-1/2 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1" aria-hidden>
            <span className="flex items-end gap-[2px]">
              {[4, 6, 8, 10].map((h) => (
                <span key={h} className="w-[3px] rounded-sm bg-current" style={{ height: h }} />
              ))}
            </span>
            <span className="ml-1 h-[11px] w-[22px] rounded-[3px] border border-current/60 p-[1.5px]">
              <span className="block h-full w-[70%] rounded-[1px] bg-current" />
            </span>
          </span>
        </div>
        <div className="absolute inset-0 top-11 overflow-hidden">{children}</div>
        {/* screen glass sheen, follows the light */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] bg-[linear-gradient(var(--la),transparent_55%,oklch(1_0_0/0.07)_75%,transparent_90%)]"
        />
        <span aria-hidden className="absolute bottom-2 left-1/2 z-30 h-[5px] w-32 -translate-x-1/2 rounded-full bg-fg/80" />
      </div>
    </div>
  )
}

function BrowserFrame({ url = "app.lumen.io", children, className, screenClassName }: DeviceFrameProps) {
  return (
    <div data-slot="device-frame" data-device="browser" className={cn("overflow-hidden rounded-2xl border border-border bg-surface shadow-overlay", className)}>
      <div className="flex h-11 items-center gap-3 border-b border-border bg-sunken/60 px-4">
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-3 rounded-full border border-border-strong bg-bg" />
          ))}
        </span>
        <div className="mx-auto flex h-7 w-full max-w-sm items-center justify-center gap-1.5 rounded-lg border border-border bg-bg px-3 font-mono text-[11.5px] text-fg-muted">
          <LockIcon className="size-3" />
          {url}
        </div>
        <span className="w-12" aria-hidden />
      </div>
      <div className={cn("relative bg-bg", screenClassName)}>{children}</div>
    </div>
  )
}

function DeviceFrame(props: DeviceFrameProps) {
  const content = props.children ?? (
    <div className="grid h-full min-h-72 place-items-center p-8 text-center">
      <div>
        <p className="text-sm font-medium text-fg">Your app goes here</p>
        <p className="mt-1 text-xs text-fg-muted">Pass any UI as children.</p>
      </div>
    </div>
  )
  return props.device === "browser" ? <BrowserFrame {...props}>{content}</BrowserFrame> : <PhoneFrame {...props}>{content}</PhoneFrame>
}

export { DeviceFrame }
export type { DeviceFrameProps }
