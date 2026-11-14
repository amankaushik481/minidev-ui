"use client"
import * as React from "react"
import { Slider, type SliderProps } from "@/registry/ui/slider"
import { cn } from "@/lib/utils"

/**
 * RangeSlider — a two-thumb slider for picking a low and high value. Both value bubbles show while either thumb is dragged.
 *
 * Use it for price, date or size ranges. For one value use Slider. Values are plain number
 * arrays `[low, high]`; `onValueCommitted` fires once on release, which is the place to query.
 *
 * @example
 * <RangeSlider defaultValue={[20, 80]} min={0} max={200} step={5} aria-label="Price" onValueCommitted={([lo, hi]) => setPrice({ lo, hi })} />
 */

type RangeSliderProps = Pick<SliderProps, "format" | "marks" | "showValue" | "name" | "minStepsBetweenValues" | "aria-labelledby"> & {
  /** Controlled `[low, high]`. */
  value?: number[]
  /** Starting `[low, high]` when uncontrolled. */
  defaultValue?: number[]
  /** Fires on every move with `[low, high]`. */
  onValueChange?: (value: number[]) => void
  /** Fires once when the user releases the thumb. */
  onValueCommitted?: (value: number[]) => void
  min?: number
  max?: number
  /** Snap interval. */
  step?: number
  disabled?: boolean
  className?: string
  /** Accessible name. Defaults to "Range" unless `aria-labelledby` is set. */
  "aria-label"?: string
}

function RangeSlider({
  value,
  defaultValue = [25, 75],
  onValueChange,
  onValueCommitted,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  className,
  "aria-label": ariaLabelProp,
  ...props
}: RangeSliderProps) {
  const ariaLabel = ariaLabelProp ?? (props["aria-labelledby"] ? undefined : "Range")
  return (
    <Slider
      data-slot="range-slider"
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange ? (v) => onValueChange([...(v as readonly number[])]) : undefined}
      onValueCommitted={onValueCommitted ? (v) => onValueCommitted([...(v as readonly number[])]) : undefined}
      className={cn("w-56", className)}
      aria-label={ariaLabel}
      {...props}
    />
  )
}

export { RangeSlider }
export type { RangeSliderProps }
