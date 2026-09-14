"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { inputVariants } from "@/registry/ui/input"

function NewsletterSignup({
  onSubmit,
  className,
}: {
  onSubmit?: (email: string) => void
  className?: string
}) {
  const [email, setEmail] = React.useState("")
  return (
    <form
      data-slot="newsletter-signup"
      className={cn("flex w-full max-w-md flex-col gap-2 sm:flex-row", className)}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(email)
      }}
    >
      <input
        type="email"
        required
        aria-label="Email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={cn(inputVariants({ size: "default" }), "flex-1")}
      />
      <Button type="submit">Subscribe</Button>
    </form>
  )
}
export { NewsletterSignup }
