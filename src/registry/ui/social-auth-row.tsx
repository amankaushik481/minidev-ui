"use client"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * Two outline buttons, "Continue with GitHub" and "Continue with Google", side by side for OAuth sign-in.
 *
 * Put it at the top of an AuthCard, above an email form. SignUpForm already includes it.
 *
 * @example
 * <SocialAuthRow onGithub={() => signIn("github")} onGoogle={() => signIn("google")} />
 */
type SocialAuthRowProps = {
  /** Called by "Continue with GitHub". */
  onGithub?: () => void
  /** Called by "Continue with Google". */
  onGoogle?: () => void
  className?: string
}

function SocialAuthRow({ onGithub, onGoogle, className }: SocialAuthRowProps) {
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
export type { SocialAuthRowProps }
