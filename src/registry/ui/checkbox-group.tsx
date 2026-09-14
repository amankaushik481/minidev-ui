"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function CheckboxGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="checkbox-group"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}
export { CheckboxGroup }
