import { CheckIcon, PlusIcon } from "lucide-react"
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/registry/ui/avatar"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Image with fallback",
    description: "The fallback shows while the image loads and stays if it fails, so initials are always there.",
    code: `<Avatar>
  <AvatarImage src="/icons/icon-96.png" alt="MiniDev" />
  <AvatarFallback>MD</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback>MC</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback>TO</AvatarFallback>
</Avatar>`,
    node: (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="/icons/icon-96.png" alt="MiniDev" />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>TO</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    title: "Sizes",
    description: "24, 32 and 40px; the fallback text and the badge scale with the size.",
    code: `<Avatar size="sm">
  <AvatarFallback>MC</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback>MC</AvatarFallback>
</Avatar>
<Avatar size="lg">
  <AvatarFallback>MC</AvatarFallback>
</Avatar>`,
    node: (
      <div className="flex items-center gap-3">
        <Avatar size="sm">
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    title: "With badge",
    description: "AvatarBadge is a presence dot in the corner; on the large size it can hold a tiny icon.",
    code: `<Avatar>
  <AvatarFallback>TO</AvatarFallback>
  <AvatarBadge aria-label="Online" />
</Avatar>
<Avatar>
  <AvatarFallback>PR</AvatarFallback>
  <AvatarBadge aria-label="Away" className="bg-warning" />
</Avatar>
<Avatar size="lg">
  <AvatarFallback>SL</AvatarFallback>
  <AvatarBadge aria-label="Verified" className="bg-success">
    <CheckIcon strokeWidth={3} />
  </AvatarBadge>
</Avatar>`,
    node: (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>TO</AvatarFallback>
          <AvatarBadge aria-label="Online" />
        </Avatar>
        <Avatar>
          <AvatarFallback>PR</AvatarFallback>
          <AvatarBadge aria-label="Away" className="bg-warning" />
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>SL</AvatarFallback>
          <AvatarBadge aria-label="Verified" className="bg-success">
            <CheckIcon strokeWidth={3} />
          </AvatarBadge>
        </Avatar>
      </div>
    ),
  },
  {
    title: "Stacked group",
    description: "AvatarGroup overlaps its avatars with a ring in the page colour; AvatarGroupCount closes the stack.",
    code: `<AvatarGroup>
  <Avatar>
    <AvatarFallback>MC</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>TO</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>PR</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>+4</AvatarGroupCount>
</AvatarGroup>
<AvatarGroup>
  <Avatar size="lg">
    <AvatarFallback>MC</AvatarFallback>
  </Avatar>
  <Avatar size="lg">
    <AvatarFallback>SL</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>
    <PlusIcon />
  </AvatarGroupCount>
</AvatarGroup>`,
    node: (
      <div className="flex flex-wrap items-center gap-8">
        <AvatarGroup>
          <Avatar>
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>TO</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+4</AvatarGroupCount>
        </AvatarGroup>
        <AvatarGroup>
          <Avatar size="lg">
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>SL</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>
            <PlusIcon />
          </AvatarGroupCount>
        </AvatarGroup>
      </div>
    ),
  },
]
