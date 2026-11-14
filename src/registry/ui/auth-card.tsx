"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A centred card frame for sign in, sign up and password reset forms: title, description, body and footer.
 *
 * It is layout only; put your `FormField`s and `Button`s inside. Use `footer` for the switch link
 * ("No account? Sign up"). Prefer `Card` for anything that is not an auth screen. The card is a
 * section named by its title.
 *
 * @example
 * <AuthCard title="Sign in to Lumen" description="Use your work email." footer={<a href="/signup">Create an account</a>}>
 *   <FormField id="email" label="Email"><Input id="email" type="email" autoComplete="email" /></FormField>
 *   <Button type="submit" className="w-full">Continue</Button>
 * </AuthCard>
 */
type AuthCardProps = {
  /** Heading (an `h2`) and the section's accessible name. */
  title?: React.ReactNode
  /** One line under the title. */
  description?: React.ReactNode
  /** Below a divider, centred: usually the sign in / sign up switch. */
  footer?: React.ReactNode
  /** The form fields and buttons. */
  children?: React.ReactNode
  className?: string
}

function AuthCard({ title = "Sign in", description, footer, children, className }: AuthCardProps) {
  const headingId = React.useId()
  return (
    <section
      data-slot="auth-card"
      aria-labelledby={headingId}
      className={cn(
        "mx-auto w-full max-w-sm space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-highlight",
        className
      )}
    >
      <div>
        <h2 id={headingId} className="text-lg font-medium tracking-[-0.014em] text-balance text-fg">{title}</h2>
        {description ? <p className="mt-1 text-sm text-pretty text-fg-muted">{description}</p> : null}
      </div>
      <div className="space-y-3">{children}</div>
      {footer ? (
        <div className="border-t border-border pt-4 text-center text-sm text-fg-muted [&_a]:font-medium [&_a]:text-accent-fg [&_a]:underline-offset-4 [&_a:hover]:underline">
          {footer}
        </div>
      ) : null}
    </section>
  )
}
export { AuthCard }
export type { AuthCardProps }
