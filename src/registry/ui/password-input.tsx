"use client"
import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"
import { IconButton } from "@/registry/ui/icon-button"

/**
 * PasswordInput — a password field with an eye button that shows or hides what was typed.
 *
 * Accepts every native input prop (name, autoComplete, required, value, onChange…).
 * The toggle is a real button labelled "Show password" / "Hide password" that
 * controls the field via aria-controls. Use autoComplete="current-password" on
 * sign-in and "new-password" on sign-up; for a strength meter use PasswordStrength.
 *
 * @example
 * <label htmlFor="pw">Password</label>
 * <PasswordInput id="pw" name="password" autoComplete="current-password" required />
 */
type PasswordInputProps = Omit<React.ComponentProps<"input">, "type" | "size"> & {
  /** Field height: "sm" 32px, "default" 36px, "lg" 44px. */
  size?: "sm" | "default" | "lg"
}

function PasswordInput({ className, size = "default", id, disabled, ...props }: PasswordInputProps) {
  const [show, setShow] = React.useState(false)
  const auto = React.useId()
  const fieldId = id ?? auto
  return (
    <div className="relative" data-slot="password-input">
      <input
        id={fieldId}
        type={show ? "text" : "password"}
        disabled={disabled}
        className={cn(inputVariants({ size }), "pr-10", className)}
        {...props}
      />
      <IconButton
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={show ? "Hide password" : "Show password"}
        aria-controls={fieldId}
        disabled={disabled}
        className="absolute top-1/2 right-1 -translate-y-1/2"
        onClick={() => setShow((s) => !s)}
      >
        {show ? <EyeOffIcon /> : <EyeIcon />}
      </IconButton>
    </div>
  )
}
export { PasswordInput }
export type { PasswordInputProps }
