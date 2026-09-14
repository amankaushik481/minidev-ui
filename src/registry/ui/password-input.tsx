"use client"
import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"
import { IconButton } from "@/registry/ui/icon-button"

type PasswordInputProps = Omit<React.ComponentProps<"input">, "type" | "size"> & {
  size?: "sm" | "default" | "lg"
}

function PasswordInput({ className, size = "default", id, disabled, ...props }: PasswordInputProps) {
  const [show, setShow] = React.useState(false)
  return (
    <div className="relative" data-slot="password-input">
      <input
        id={id}
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
