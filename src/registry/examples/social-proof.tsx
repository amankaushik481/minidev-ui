"use client"
import { SocialProof } from "@/registry/ui/social-proof"
import { NewsletterSignup } from "@/registry/ui/newsletter-signup"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Private beta",
    description: "Write a number you can back up; with no src each avatar shows the person's initials.",
    code: `<SocialProof
  countLabel="Used by 40 teams in our private beta"
  people={[{ name: "Maya Chen" }, { name: "Theo Okafor" }, { name: "Priya Raman" }]}
/>`,
    node: (
      <SocialProof
        countLabel="Used by 40 teams in our private beta"
        people={[{ name: "Maya Chen" }, { name: "Theo Okafor" }, { name: "Priya Raman" }]}
      />
    ),
  },
  {
    title: "Under a signup form",
    description: "Placed right under the field, the trust line answers \"who else uses this?\" at the moment of signing up.",
    code: `<div className="flex w-full max-w-md flex-col gap-3">
  <NewsletterSignup buttonLabel="Join the beta" />
  <SocialProof
    countLabel="Join 312 finance leads already reading"
    people={[{ name: "Sam Lowe" }, { name: "Ada Novak" }, { name: "Elena Sorrentino" }, { name: "Hana Ito" }]}
  />
</div>`,
    node: (
      <div className="flex w-full max-w-md flex-col gap-3">
        <NewsletterSignup buttonLabel="Join the beta" />
        <SocialProof
          countLabel="Join 312 finance leads already reading"
          people={[{ name: "Sam Lowe" }, { name: "Ada Novak" }, { name: "Elena Sorrentino" }, { name: "Hana Ito" }]}
        />
      </div>
    ),
  },
]
