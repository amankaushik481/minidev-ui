"use client"
import * as React from "react"
import { MaskedInput } from "@/registry/ui/masked-input"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function ControlledDemo() {
  const [card, setCard] = React.useState({ masked: "", raw: "", complete: false })
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <MaskedInput
        mask="9999 9999 9999 9999"
        label="Card number"
        value={card.raw}
        onChange={setCard}
        autoComplete="cc-number"
        showRaw={false}
        hint="Try 4242 4242 4242 4242"
      />
      <Button className="self-start" disabled={!card.complete}>
        Pay INV-2041
      </Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Date with guide",
    description: "A string guide as long as the mask shows the characters still to come, in place of underscores.",
    code: `<MaskedInput mask="99/99/9999" label="Due date" guide="MM/DD/YYYY" hint="INV-2041 is due 30 days after issue." />`,
    node: (
      <div className="w-full max-w-sm">
        <MaskedInput mask="99/99/9999" label="Due date" guide="MM/DD/YYYY" hint="INV-2041 is due 30 days after issue." />
      </div>
    ),
  },
  {
    title: "Uppercase code",
    description: "The star slot takes a letter or a digit, and uppercase capitalises letters as they are typed.",
    code: `<MaskedInput mask="****-****" label="Promo code" guide="XXXX-XXXX" uppercase showRaw={false} hint="Letters and digits, case does not matter." />`,
    node: (
      <div className="w-full max-w-sm">
        <MaskedInput mask="****-****" label="Promo code" guide="XXXX-XXXX" uppercase showRaw={false} hint="Letters and digits, case does not matter." />
      </div>
    ),
  },
  {
    title: "Controlled value",
    description: "onChange gives the masked string, the raw characters and whether every slot is filled; pass the raw value back as value.",
    code: `function ControlledDemo() {
  const [card, setCard] = React.useState({ masked: "", raw: "", complete: false })
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <MaskedInput
        mask="9999 9999 9999 9999"
        label="Card number"
        value={card.raw}
        onChange={setCard}
        autoComplete="cc-number"
        showRaw={false}
        hint="Try 4242 4242 4242 4242"
      />
      <Button className="self-start" disabled={!card.complete}>
        Pay INV-2041
      </Button>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Invalid and disabled",
    description: "invalid turns the border and hint red and hides the completion check; disabled locks the field.",
    code: `<MaskedInput mask="99/99" label="Expiry" defaultValue="1329" invalid hint="That month does not exist." />
<MaskedInput mask="99-9999999" label="Tax ID" defaultValue="123456789" disabled hint="Locked after verification." />`,
    node: (
      <div className="flex w-full max-w-sm flex-col gap-5">
        <MaskedInput mask="99/99" label="Expiry" defaultValue="1329" invalid hint="That month does not exist." />
        <MaskedInput mask="99-9999999" label="Tax ID" defaultValue="123456789" disabled hint="Locked after verification." />
      </div>
    ),
  },
]
