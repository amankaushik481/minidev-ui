"use client"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"
import { Label } from "@/registry/ui/label"
import { cn } from "@/lib/utils"
function RolePicker({ className }: { className?: string }) {
  return (
    <RadioGroup defaultValue="member" data-slot="role-picker" className={cn("gap-2", className)}>
      {[
        ["owner", "Owner"],
        ["admin", "Admin"],
        ["member", "Member"],
      ].map(([value, label]) => (
        <div key={value} className="flex items-center gap-2">
          <RadioGroupItem value={value} id={`role-${value}`} />
          <Label htmlFor={`role-${value}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
export { RolePicker }
