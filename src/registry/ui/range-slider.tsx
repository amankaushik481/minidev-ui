"use client"
import * as React from "react"
import { Slider } from "@/registry/ui/slider"
import { cn } from "@/lib/utils"

type RangeSliderProps = {
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
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
  min = 0,
  max = 100,
  step = 1,
  disabled,
  className,
  ...a11y
}: RangeSliderProps) {
  return (
    <Slider
      data-slot="range-slider"
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange as never}
      className={cn("w-56", className)}
      aria-label={a11y["aria-label"] ?? "Range"}
    />
  )
}
export { RangeSlider }
