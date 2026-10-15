import type { Guide } from "../types"

const guide: Guide = {
  slug: "free-nextjs-saas-templates",
  title: "Free Next.js SaaS templates and starter kits worth using",
  description:
    "Eight free Next.js SaaS starters compared: the official SaaS Starter, next-forge, BoxyHQ, ixartz, the Stripe starter, create-t3-app, next-enterprise and more.",
  date: "2026-10-15",
  keywords: [
    "free nextjs saas template",
    "nextjs saas starter kit",
    "nextjs boilerplate stripe",
    "open source saas boilerplate",
    "nextjs starter template 2026",
  ],
  related: ["billing-page", "settings-page", "sign-in-page", "dashboard-home"],
  body: [
    {
      type: "p",
      text: "The free Next.js SaaS template to start with in 2026 is the Next.js SaaS Starter from the Next.js team: Postgres, Drizzle, Stripe and shadcn/ui with authentication, teams and roles under MIT. If you need a monorepo, enterprise SSO, translations, a typed foundation without billing or a hardened engineering setup, next-forge, BoxyHQ, the ixartz boilerplate, the Stripe starter by mickasmt, create-t3-app and next-enterprise each cover one of those, and MiniDev UI supplies the product screens none of them ship.",
    },
    {
      type: "callout",
      tone: "note",
      text: "Facts were checked on October 15, 2026 in each repository's README and license, and where the GitHub API answered, its last push date. Starter kits age fast, so open the repository and check the commit history yourself before you build on one. MiniDev UI is on this list and this guide is written by its team; it is not a starter kit and we say so.",
    },
    { type: "h2", text: "How we chose", id: "how-we-chose" },
    {
      type: "list",
      items: [
        "**Free and open source.** Every item has a permissive license (MIT or Apache 2.0) and a public repository you can clone today.",
        "**Not archived.** We checked the two best known older templates, Vercel's Next.js Subscription Payments and shadcn's Taxonomy, and both are archived with warnings not to use them in production, so they are out.",
        "**Current Next.js.** Each targets a recent major version or scaffolds one, and we note where a README is still pinned to an older release.",
        "**Honest about scope.** A boilerplate with billing, a monorepo template and a typed scaffold are different tools, and we say which is which.",
      ],
    },
    { type: "h2", text: "At a glance", id: "at-a-glance" },
    {
      type: "table",
      head: ["Template", "Auth", "Database", "Billing", "License"],
      rows: [
        ["Next.js SaaS Starter", "Email and password, JWT cookies", "Postgres with Drizzle", "Stripe Checkout and Customer Portal", "MIT"],
        ["next-forge", "Clerk", "Type safe ORM with migrations", "Stripe", "MIT"],
        ["BoxyHQ SaaS Starter Kit", "NextAuth.js, SAML SSO", "Postgres with Prisma", "Stripe", "Apache 2.0"],
        ["SaaS Boilerplate (ixartz)", "Clerk", "Drizzle: Postgres, SQLite or MySQL", "Stripe in Pro only", "MIT"],
        ["Next SaaS Stripe Starter", "Auth.js v5", "Neon with Prisma", "Stripe", "MIT"],
        ["create-t3-app", "NextAuth.js, optional", "Prisma or Drizzle, optional", "None", "MIT"],
        ["next-enterprise", "None", "None", "None", "MIT"],
        ["MiniDev UI", "Screens only", "None", "Screens only", "MIT"],
      ],
    },
    { type: "h2", text: "1. Next.js SaaS Starter", id: "nextjs-saas-starter" },
    {
      type: "p",
      text: "The [Next.js SaaS Starter](https://github.com/nextjs/saas-starter) lives in the Next.js GitHub organisation and replaced Vercel's older subscription payments template, which was archived in January 2025 and points here. Its README lists a marketing landing page with an animated terminal, a pricing page connected to Stripe Checkout, dashboard pages with CRUD on users and teams, basic RBAC with Owner and Member roles, subscription management through the Stripe Customer Portal, email and password authentication with JWTs in cookies, middleware to protect routes and Server Actions, and an activity log. The stack is Next.js, Postgres, Drizzle, Stripe and shadcn/ui.",
    },
    {
      type: "p",
      text: "**Who it suits:** a first SaaS, or a reference for how the Next.js team wires auth, teams and Stripe without extra services. **License and price:** MIT, free. **Limitation:** authentication is email and password only, implemented in the repo rather than through a provider, so social login, magic links and two factor are yours to add.",
    },
    { type: "h2", text: "2. next-forge", id: "next-forge" },
    {
      type: "p",
      text: "[next-forge](https://github.com/vercel/next-forge) is a production grade Turborepo template for Next.js apps, now under the Vercel organisation. It sets up a monorepo with shared packages and integrates a long list of services: Clerk for auth, Stripe for payments, Resend and React Email for email, Sentry and BetterStack for observability, PostHog and Google Analytics, Arcjet for security, Mintlify for docs and a type safe ORM with migrations, all on Tailwind CSS. It had about 7,700 stars when we checked.",
    },
    {
      type: "p",
      text: "**Who it suits:** teams that want a monorepo with shared packages from day one and are comfortable with a dozen SaaS dependencies. **License and price:** MIT, free, though most of the integrated services have their own pricing once you pass their free tiers. **Limitation:** the GitHub API reported its last push as May 28, 2026 when we checked, several months before this guide, so review recent activity and the open issues before you adopt it, and expect to create a dozen accounts and keys before the first run.",
    },
    { type: "h2", text: "3. BoxyHQ SaaS Starter Kit", id: "boxyhq-saas-starter-kit" },
    {
      type: "p",
      text: "The [BoxyHQ SaaS Starter Kit](https://github.com/boxyhq/saas-starter-kit) is an enterprise SaaS starter: Next.js, Tailwind CSS, PostgreSQL with Prisma, TypeScript and NextAuth.js, plus the parts B2B buyers ask for, namely SAML SSO and directory sync through SAML Jackson, webhooks through Svix, audit logs through Retraced, Stripe payments, Playwright end to end tests and Docker Compose. The repository had over 2,200 commits when we checked.",
    },
    {
      type: "p",
      text: "**Who it suits:** B2B products that will sell to companies with SSO and compliance requirements. **License and price:** Apache 2.0, free. **Limitation:** it is heavy. SSO, directory sync, webhooks and audit logs are real infrastructure to run and understand, and a consumer or small business product will carry them without using them.",
    },
    { type: "h2", text: "4. SaaS Boilerplate by ixartz", id: "ixartz-saas-boilerplate" },
    {
      type: "p",
      text: "[SaaS Boilerplate](https://github.com/ixartz/SaaS-Boilerplate) is built with Next.js, Tailwind CSS, shadcn/ui and TypeScript, with Clerk handling authentication, Drizzle ORM for PostgreSQL, SQLite or MySQL, and internationalisation through next-intl and Crowdin. The GitHub API reported a push on September 2, 2026 and about 7,400 stars when we checked.",
    },
    {
      type: "p",
      text: "**Who it suits:** multilingual products and teams that want Clerk's hosted auth rather than rolling their own. **License and price:** MIT, free. **Limitation:** the README's comparison table marks Stripe integration as unavailable in the free version and part of the paid Pro version, so billing is the piece you build or buy.",
    },
    { type: "h2", text: "5. Next SaaS Stripe Starter", id: "next-saas-stripe-starter" },
    {
      type: "p",
      text: "[Next SaaS Stripe Starter](https://github.com/mickasmt/next-saas-stripe-starter) by mickasmt is an open source SaaS starter with user roles and an admin panel, built on Next.js 14, Prisma, Neon, Auth.js v5, Resend, React Email, shadcn/ui, Stripe and Server Actions. It is MIT.",
    },
    {
      type: "p",
      text: "**Who it suits:** a solo developer who wants roles, an admin area and Stripe wired in one repo with a familiar shadcn/ui look. **License and price:** MIT, free. **Limitation:** the README is written for Next.js 14, so starting from it in 2026 means an upgrade across Next.js, Auth.js and Prisma before you add features.",
    },
    { type: "h2", text: "6. create-t3-app", id: "create-t3-app" },
    {
      type: "p",
      text: "[create-t3-app](https://github.com/t3-oss/create-t3-app) is an interactive CLI to start a full stack, typesafe Next.js app. The T3 Stack is Next.js, TypeScript, Tailwind CSS, tRPC, Prisma or Drizzle and NextAuth.js, and every piece is optional, so the generated project is exactly what you tick. It is MIT.",
    },
    {
      type: "p",
      text: "**Who it suits:** developers who want a typed foundation and would rather add billing and teams their own way than inherit someone else's. **License and price:** MIT, free. **Limitation:** it is not a SaaS template. There is no billing, no teams, no marketing page and no dashboard, by design.",
    },
    { type: "h2", text: "7. next-enterprise", id: "next-enterprise" },
    {
      type: "p",
      text: "[next-enterprise](https://github.com/Blazity/next-enterprise) by Blazity is an enterprise grade Next.js boilerplate: Next.js 15 with the App Directory, Tailwind CSS v4, strict TypeScript with ts-reset, ESLint 9 and Prettier, Vitest, React Testing Library and Playwright, GitHub Actions with bundle size and performance tracking, Storybook, Radix UI, CVA, OpenTelemetry, health checks, Renovate, Semantic Release and Terraform options for AWS. It is MIT.",
    },
    {
      type: "p",
      text: "**Who it suits:** teams whose first problem is engineering quality (tests, CI, observability, releases) rather than product features. **License and price:** MIT, free. **Limitation:** it is a foundation only. There is no authentication, database, billing or product screen, so pair it with one of the kits above or build those yourself.",
    },
    { type: "h2", text: "8. MiniDev UI blocks and templates", id: "minidev-ui" },
    {
      type: "p",
      text: "[MiniDev UI](https://ui.minidev.pro) is not a starter kit, and it belongs here because most starters above stop at the same place: a dashboard shell and a pricing page. MiniDev UI is a shadcn-compatible registry of over 500 items whose blocks are the screens a SaaS needs next, such as the [billing page](/docs/billing-page) with invoices and payment methods, [settings](/docs/settings-page), [sign in](/docs/sign-in-page), [dashboard home](/docs/dashboard-home), [onboarding flow](/docs/onboarding-flow), [admin console](/docs/admin-console), [users table](/docs/users-table-page), [notification center](/docs/notification-center) and [pricing plans](/docs/pricing-plans). Each installs into any of the kits above with one command, `npx shadcn@latest add @minidev/billing-page`, and the [templates](/templates) section shows eight complete landing pages as live demos.",
    },
    {
      type: "p",
      text: "**Who it suits:** anyone who picked a starter from this list and now needs the product screens that come after it to look like one product. **License and price:** MIT, free, no paid tier. **Limitation:** it provides no authentication, database or payments logic, only the React screens with typed props for you to wire to your data, and its landing page templates are live demos rather than downloadable Next.js apps.",
    },
    { type: "component", name: "billing-page" },
    { type: "h2", text: "How to choose", id: "how-to-choose" },
    {
      type: "p",
      text: "Match the kit to the first hard requirement. If it is **billing on day one**, the Next.js SaaS Starter or the Stripe starter already have Checkout and the Customer Portal wired. If it is **enterprise sales**, BoxyHQ is the only free kit with SAML SSO, directory sync and audit logs built in. If it is **several languages**, the ixartz boilerplate ships i18n and you add billing. If it is **a monorepo with every service connected**, next-forge, once you have confirmed it is being maintained at the pace you need. If you want **a clean typed base** and will add the SaaS parts yourself, create-t3-app or next-enterprise. In every case, the screens after the dashboard shell are where kits run out, which is what MiniDev UI and our [SaaS dashboard](/guides/nextjs-saas-dashboard), [billing page](/guides/nextjs-billing-page-stripe) and [settings page](/guides/saas-settings-page) guides are for.",
    },
    {
      type: "list",
      items: [
        "**Read the license of every integrated service.** The kits are MIT or Apache 2.0, but Clerk, Stripe, Neon, Resend and the observability tools have their own pricing once you grow.",
        "**Check the last commit before you clone.** A kit that has not moved in a year will cost you a week of upgrades on day one; we have noted the dates we could verify above.",
        "**Delete what you do not use.** Every extra service in a boilerplate is a key to rotate and a bill to watch.",
        "**Avoid archived templates.** Next.js Subscription Payments and Taxonomy are archived and their READMEs say not to use them in production.",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: "Paid boilerplates exist and some are good, but the difference is rarely the code. It is support and updates. If a free kit above covers your requirements, spend the money on design and the first ten customers instead.",
    },
  ],
  faq: [
    {
      q: "What is the best free Next.js SaaS boilerplate?",
      a: "For most people, the Next.js SaaS Starter from the Next.js team: it has auth, teams, roles, Stripe billing and a dashboard under MIT with no third party auth service to pay for. Pick BoxyHQ instead if you need SAML SSO, or next-forge if you want a Turborepo monorepo with every service connected.",
    },
    {
      q: "Do free Next.js SaaS templates include Stripe billing?",
      a: "Some do. The Next.js SaaS Starter, next-forge, BoxyHQ and the Next SaaS Stripe Starter include Stripe. The ixartz SaaS Boilerplate keeps Stripe for its paid Pro version, and create-t3-app and next-enterprise have no billing at all.",
    },
    {
      q: "Can I use MiniDev UI with any of these starters?",
      a: "Yes. MiniDev UI is a shadcn-compatible registry, so any starter that uses, or can be set up with, the shadcn CLI and Tailwind CSS v4 can install its blocks one file at a time. It supplies the screens; the starter supplies auth, data and payments.",
    },
  ],
}

export default guide
