"use client"
import { SquareIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

function StopGenerating({
  onClick,
  className,
}: {
  onClick?: () => void
  className?: string
}) {
  return (
    <Button
      data-slot="stop-generating"
      type="button"
      variant="outline"
      size="sm"
      className={cn(className)}
      onClick={onClick}
    >
      <SquareIcon className="size-3.5 fill-current" aria-hidden />
      Stop generating
    </Button>
  )
}
export { StopGenerating }
