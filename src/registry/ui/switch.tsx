"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "@/lib/utils"

/**
 * Switch — hairline track, raised thumb. The thumb travels on a spring;
 * the track only changes color. 44px hit area via ::after.
 */
function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 outline-none",
        "bg-border-strong shadow-[inset_0_1px_2px_0_oklch(0_0_0/0.08)]",
        "transition-[background-color,box-shadow] duration-[140ms] ease-hairline",
        "after:absolute after:-inset-x-2 after:-inset-y-3",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-4 data-[size=sm]:w-7",
        "data-checked:bg-accent",
        "hover:data-unchecked:bg-fg-subtle/40",
        "aria-invalid:ring-2 aria-invalid:ring-danger/40",
        "data-disabled:cursor-not-allowed data-disabled:opacity-45",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-white",
          "shadow-[0_1px_2px_0_oklch(0_0_0/0.18),0_0_0_0.5px_oklch(0_0_0/0.06)]",
          "transition-transform duration-200 ease-spring",
          "group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3",
          "group-data-[size=default]/switch:data-checked:translate-x-4 group-data-[size=sm]/switch:data-checked:translate-x-3",
          "data-unchecked:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
