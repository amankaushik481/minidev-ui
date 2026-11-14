"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cn } from "@/lib/utils"

/**
 * An accessible checkbox built on Base UI: 16px box, 44px touch target, accent fill when checked, a dash when indeterminate.
 *
 * Use for independent on/off choices and multi-select lists; wrap several in CheckboxGroup. For a setting that applies immediately use Switch.
 * Controlled with `checked` + `onCheckedChange(checked: boolean)`, or uncontrolled with `defaultChecked`. Pass `name` and `value` to submit with a form.
 * Label it with a wrapping `<Label>` or `aria-label`; set `aria-invalid` to show the error state.
 *
 * @example
 * <Label className="flex items-center gap-2"><Checkbox name="terms" required /> I accept the terms</Label>
 * <Checkbox checked={all} indeterminate={some} onCheckedChange={toggleAll} aria-label="Select all rows" />
 */
function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-[4px] outline-none",
        "border border-border-strong bg-surface text-on-accent shadow-xs",
        "transition-[background-color,border-color,box-shadow] duration-[70ms] ease-hairline",
        "after:absolute after:-inset-3.5",
        "hover:border-fg-subtle",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "data-checked:border-accent data-checked:bg-accent data-checked:shadow-ink",
        "data-indeterminate:border-accent data-indeterminate:bg-accent",
        "aria-invalid:border-danger aria-invalid:ring-2 aria-invalid:ring-danger/25",
        "data-disabled:cursor-not-allowed data-disabled:opacity-45",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        keepMounted
        className="grid place-content-center text-current data-unchecked:not-data-indeterminate:opacity-0"
      >
        <svg viewBox="0 0 12 12" fill="none" aria-hidden className="size-3">
          <path d="M3 6h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="hidden in-data-indeterminate:block" />
          <path
            d="M2.5 6.2 5 8.6l4.6-5.2"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="in-data-indeterminate:hidden [stroke-dasharray:14] [stroke-dashoffset:14] transition-[stroke-dashoffset] duration-200 ease-hairline in-data-checked:[stroke-dashoffset:0]"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
