"use client"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

function SocialAuthRow({
  onGithub,
  onGoogle,
  className,
}: {
  onGithub?: () => void
  onGoogle?: () => void
  className?: string
}) {
  return (
    <div data-slot="social-auth-row" className={cn("grid grid-cols-2 gap-2", className)}>
      <Button type="button" variant="outline" onClick={onGithub} className="w-full">
        Continue with GitHub
      </Button>
      <Button type="button" variant="outline" onClick={onGoogle} className="w-full">
        Continue with Google
      </Button>
    </div>
  )
}
export { SocialAuthRow }
