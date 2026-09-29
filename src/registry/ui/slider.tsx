"use client"
import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { cn } from "@/lib/utils"

/**
 * Slider - hairline rail, keycap thumb and a value bubble while you drag or tab to it.
 * Base UI for pointer, keyboard and form behaviour. Hairline rail with
 * an accent fill, a raised keycap thumb whose ring grows on hover, drag and
 * focus, and an ink value bubble that settles in above the thumb while you
 * drag or tab to it. Optional marks sit under the rail.
 * RTL needs Base UI's <DirectionProvider direction="rtl">, not only dir="rtl",
 * or dragging and arrow keys run backwards.
 */

const THUMB = 16

type Mark = number | { value: number; label?: React.ReactNode }

type SliderProps = Omit<SliderPrimitive.Root.Props, "format"> & {
  /** Formats the value in the bubble and for screen readers. */
  format?: Intl.NumberFormatOptions | ((value: number) => string)
  /** Ticks under the rail. Pass `{ value, label }` to caption them. */
  marks?: Mark[]
  /** Show the value above the thumb while dragging or focused. */
  showValue?: boolean
}

const toArray = (v: number | readonly number[] | undefined) =>
  v === undefined ? undefined : Array.isArray(v) ? [...v] : [v as number]

/* With edge alignment the thumb centre travels from THUMB/2 to 100% - THUMB/2. */
const along = (p: number) => `calc(${THUMB / 2}px + (100% - ${THUMB}px) * ${p})`

function Slider({
  className,
  defaultValue,
  value,
  onValueChange,
  min = 0,
  max = 100,
  format,
  locale,
  marks,
  showValue = true,
  orientation = "horizontal",
  "aria-label": ariaLabelProp,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: SliderProps) {
  const [inner, setInner] = React.useState<number[]>(() => toArray(defaultValue) ?? [min])
  const values = toArray(value) ?? inner
  const uid = React.useId()
  const ariaLabel = ariaLabelProp ?? (ariaLabelledBy ? undefined : "Value")
  const suffix = (i: number) => (values.length === 2 ? (i === 0 ? "minimum" : "maximum") : values.length > 2 ? `thumb ${i + 1}` : null)

  const fmt = React.useMemo(() => {
    if (typeof format === "function") return format
    const nf = new Intl.NumberFormat(locale as Intl.LocalesArgument, format)
    return (n: number) => nf.format(n)
  }, [format, locale])

  const pct = (v: number) => (max === min ? 0 : (Math.min(max, Math.max(min, v)) - min) / (max - min))
  const lo = values.length > 1 ? Math.min(...values) : min
  const hi = Math.max(...values)
  const labelled = marks?.some((m) => typeof m === "object" && m.label != null)

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn("group/slider data-horizontal:w-full data-vertical:h-full", className)}
      defaultValue={defaultValue}
      value={value}
      onValueChange={(next, details) => {
        if (value === undefined) setInner(toArray(next) ?? [min])
        onValueChange?.(next, details)
      }}
      min={min}
      max={max}
      format={typeof format === "object" ? format : undefined}
      locale={locale}
      orientation={orientation}
      thumbAlignment="edge"
      aria-labelledby={ariaLabelledBy}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full cursor-pointer touch-none items-center py-1 select-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col data-vertical:px-1 data-vertical:py-0">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-full bg-sunken shadow-[inset_0_0_0_1px_var(--border)] select-none data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="rounded-full bg-accent select-none group-aria-invalid/slider:bg-danger group-data-invalid/slider:bg-danger data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {values.map((v, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            index={index}
            getAriaLabel={ariaLabel ? () => (suffix(index) ? `${ariaLabel}, ${suffix(index)}` : ariaLabel) : undefined}
            aria-labelledby={!ariaLabel && suffix(index) ? `${ariaLabelledBy} ${uid}-t${index}` : undefined}
            getAriaValueText={typeof format === "function" ? (_s, n) => format(n) : undefined}
            className={cn(
              "group/thumb relative block size-4 shrink-0 cursor-grab rounded-full border border-border-strong bg-raised shadow-key select-none",
              "after:absolute after:-inset-3.5 after:rounded-full",
              "transition-[box-shadow,border-color] duration-[140ms] ease-hairline",
              "not-data-disabled:hover:ring-4 not-data-disabled:hover:ring-fg/[0.06]",
              "data-dragging:cursor-grabbing data-dragging:border-accent-line data-dragging:ring-4 data-dragging:ring-accent-soft",
              "has-[:focus-visible]:border-accent has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent-line",
              "data-disabled:cursor-not-allowed"
            )}
          >
            {!ariaLabel && suffix(index) ? (
              <span id={`${uid}-t${index}`} className="sr-only">
                {suffix(index)}
              </span>
            ) : null}
            {showValue ? (
              <span
                aria-hidden
                data-slot="slider-value"
                className={cn(
                  "pointer-events-none absolute z-10 hidden rounded-md bg-ink px-1.5 py-0.5 text-xs font-medium whitespace-nowrap text-on-ink tabular-nums shadow-overlay",
                  "animate-[glyph-in_180ms_var(--ease-hairline)_both]",
                  "bottom-full left-1/2 mb-2 -translate-x-1/2",
                  "group-data-vertical/thumb:bottom-auto group-data-vertical/thumb:left-full group-data-vertical/thumb:top-1/2 group-data-vertical/thumb:mb-0 group-data-vertical/thumb:ml-3 group-data-vertical/thumb:translate-x-0 group-data-vertical/thumb:-translate-y-1/2",
                  "group-data-dragging/thumb:block group-has-[:focus-visible]/thumb:block"
                )}
              >
                {fmt(v)}
              </span>
            ) : null}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Control>
      {marks?.length && orientation === "horizontal" ? (
        <div aria-hidden data-slot="slider-marks" className={cn("relative mt-1", labelled ? "h-6" : "h-1.5")}>
          {marks.map((m) => {
            const mv = typeof m === "number" ? m : m.value
            const label = typeof m === "number" ? null : m.label
            const inRange = mv >= lo && mv <= hi
            return (
              <span key={mv} className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-1 rtl:translate-x-1/2" style={{ insetInlineStart: along(pct(mv)) }}>
                <span className={cn("h-1.5 w-px rounded-full transition-colors duration-[70ms]", inRange ? "bg-accent" : "bg-border-strong")} />
                {label != null ? (
                  <span className={cn("text-2xs whitespace-nowrap tabular-nums transition-colors duration-[70ms]", inRange ? "text-fg-muted" : "text-fg-subtle")}>{label}</span>
                ) : null}
              </span>
            )
          })}
        </div>
      ) : null}
    </SliderPrimitive.Root>
  )
}

export { Slider }
export type { SliderProps }
