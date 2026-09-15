"use client"
import * as React from "react"
import { PasswordInput } from "@/registry/ui/password-input"
import { NumberInput } from "@/registry/ui/number-input"
import { CurrencyInput } from "@/registry/ui/currency-input"
import { PhoneInput } from "@/registry/ui/phone-input"
import { CharacterCount } from "@/registry/ui/character-count"
import { CopyButton } from "@/registry/ui/copy-button"
import { CopyId } from "@/registry/ui/copy-id"
import { Rating } from "@/registry/ui/rating"
import { EditableHeading } from "@/registry/ui/editable-heading"
import { MentionInput } from "@/registry/ui/mention-input"
import { EmojiPicker } from "@/registry/ui/emoji-picker"
import { SlashCommandMenu } from "@/registry/ui/slash-command-menu"
import { RichTextToolbar } from "@/registry/ui/rich-text-toolbar"
import { Label } from "@/registry/ui/label"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  const [n, setN] = React.useState(3)
  const [mention, setMention] = React.useState("")
  return (
    <GalleryPage title="Editors & inputs">
      <GallerySection title="Specialized inputs">
        <div className="space-y-2 w-64"><Label htmlFor="pw">Password</Label><PasswordInput id="pw" aria-label="Password" /></div>
        <div className="space-y-2"><Label>Number</Label><NumberInput value={n} onChange={setN} aria-label="Number" /></div>
        <div className="space-y-2"><Label>Currency</Label><CurrencyInput aria-label="Amount" /></div>
        <div className="space-y-2 w-64"><Label>Phone</Label><PhoneInput aria-label="Phone" /></div>
        <CharacterCount value={12} max={140} />
      </GallerySection>
      <GallerySection title="Copy / rating / title">
        <CopyButton value="minidev-ui-kit" />
        <CopyId value="usr_8f2a91" />
        <Rating defaultValue={4} aria-label="Rating" />
        <EditableHeading defaultValue="Untitled doc" />
      </GallerySection>
      <GallerySection title="Composer tools">
        <RichTextToolbar />
        <MentionInput value={mention} onChange={setMention} suggestions={["aman", "mina", "lux"]} />
        <EmojiPicker />
        <SlashCommandMenu items={[{ id: "table", label: "table", hint: "Insert table" }, { id: "ai", label: "ai", hint: "Ask AI" }]} />
      </GallerySection>
    </GalleryPage>
  )
}
