"use client"
import * as React from "react"
import { Slider, type SliderProps } from "@/registry/ui/slider"
import { cn } from "@/lib/utils"

/** Two-thumb slider. Both value bubbles show while either thumb is dragged. */

type RangeSliderProps = Pick<SliderProps, "format" | "marks" | "showValue" | "name" | "minStepsBetweenValues" | "aria-labelledby"> & {
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  /** Fires once when the user releases the thumb. */
  onValueCommitted?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
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
