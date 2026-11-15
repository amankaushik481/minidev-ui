"use client"
import { StickyNoteIcon } from "lucide-react"
import { MorphPanel } from "@/registry/ui/morph-panel"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Feedback with an async submit",
    description: "Return a promise from onSubmit (here a 900ms stand-in for your API call) to show \"Sending…\"; a rejected promise puts the form back so the user can retry.",
    code: `<MorphPanel label="Feedback" onSubmit={() => new Promise<void>((resolve) => setTimeout(resolve, 900))} />`,
    node: <MorphPanel label="Feedback" onSubmit={() => new Promise<void>((resolve) => setTimeout(resolve, 900))} />,
  },
  {
    title: "Your own panel",
    description: "Pass a render function; close() shuts the panel and returns focus to the trigger.",
    code: `<MorphPanel label="New note" icon={<StickyNoteIcon />} width={300}>
  {({ close }) => (
    <form
      className="space-y-3 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        close()
      }}
    >
      <Input autoFocus aria-label="Note" placeholder="Call Northwind about the renewal" />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={close}>
          Cancel
        </Button>
        <Button type="submit" size="sm">
          Save note
        </Button>
      </div>
    </form>
  )}
</MorphPanel>`,
    node: (
      <MorphPanel label="New note" icon={<StickyNoteIcon />} width={300}>
        {({ close }) => (
          <form
            className="space-y-3 p-4"
            onSubmit={(e) => {
              e.preventDefault()
              close()
            }}
          >
            <Input autoFocus aria-label="Note" placeholder="Call Northwind about the renewal" />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={close}>
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Save note
              </Button>
            </div>
          </form>
        )}
      </MorphPanel>
    ),
  },
]
