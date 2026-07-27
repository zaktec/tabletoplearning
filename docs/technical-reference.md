# TableTopLearning Technical AI Document

## Document purpose

This is the canonical technical and AI handoff document for the active TableTopLearning web application. It is written for developers, code reviewers, automated tools and AI assistants that need to analyse, maintain or extend the repository safely.

Use this document for architecture, routes, data flow, integrations, implementation rules and development constraints. Use [project-overview.md](project-overview.md) for a non-technical product guide and [branding.md](branding.md) for visual and verbal brand rules.

Last reviewed against the repository: July 2026.

## 1. Application purpose and scope

TableTopLearning is a public course-discovery and marketing website for structured online learning with tutor support. It helps visitors:

- Explore subject areas and learning pathways.
- Understand how short modules build into larger learning pathways.
- Read course summaries.
- Compare Independent Learning, Tutor Guidance and Focused Support plans.
- Understand the proposed learning experience and tutor support.
- Read organisational, privacy and safeguarding information.
- Prepare a course or support enquiry in their own email application.

The deployed product is currently a static website. It is not yet a complete learning platform.

The following capabilities are not implemented:

- Registration, authentication or account recovery.
- Learner dashboards or saved progress.
- Hosted lessons, quizzes or course completion.
- Enrolment, checkout, subscriptions or payment processing.
- Tutor messaging, scheduling or live lesson delivery.
- A database, application API, CMS or administrative interface.
- Server-side contact-form processing.

Never describe a displayed concept as functional unless the repository contains the supporting implementation.

## 2. User roles and permissions

There is no role-based access-control system. The roles below describe audiences, not authenticated technical roles.

| Audience role | Current actions | Current boundaries |
| --- | --- | --- |
| Learner | Browse subjects, pathways, course pages, plans and FAQs; prepare an email enquiry | Cannot register, sign in, enrol, pay, access lessons or save progress |
| Parent or carer | Compare course information and support levels; read policy information; contact the team | Cannot manage a learner account or purchase a plan |
| General visitor | Read all public pages and follow public navigation | No personalised or private content exists |
| Content maintainer | Change Astro templates, page copy and in-source course records | No CMS or admin interface; changes require a code deployment |
| Developer or AI assistant | Maintain the static Astro implementation within repository rules | Must not invent backend capabilities or bypass branding, accessibility and verification rules |

The `/login/` route is an informational placeholder. It does not create a session or accept credentials.

## 3. System architecture

### 3.1 Architecture style

The application uses Astro static-site generation. Source files are compiled into HTML, CSS and small browser-side JavaScript bundles. GitHub Pages serves the generated files without a Node.js server at runtime.

```text
Astro source and inline content
            |
            | npm run build
            v
Static HTML, CSS and JavaScript in dist/
            |
            | GitHub Actions artifact
            v
GitHub Pages and custom domain
            |
            v
https://tabletoplearning.co.uk/
```

### 3.2 Runtime request flow

```text
Visitor requests a route
        |
        v
GitHub Pages returns a generated HTML file
        |
        +--> Browser loads /_astro/<hashed CSS or JS>
        |
        +--> Internal navigation requests another static route
        |
        +--> Small local scripts handle menu, FAQ or contact-email behaviour
```

No runtime request reaches an application server, database or private API.

### 3.3 Technology stack

| Area | Current implementation |
| --- | --- |
| Framework | Astro 5 |
| Rendering | Static site generation |
| Templates | `.astro` files |
| Script language | TypeScript-compatible browser JavaScript |
| Styling | Plain global CSS |
| Package manager | npm with `package-lock.json` |
| CI runtime | Node.js 22 |
| Hosting | GitHub Pages |
| Production domain | `https://tabletoplearning.co.uk` |
| Automation | GitHub Actions |
| Backend | None |
| Database | None |
| CMS | None |
| Authentication | None |
| Automated test suite | None |
| Required verification | Astro diagnostics and production build |

`astro` is the only runtime dependency. `@astrojs/check` and `typescript` are development dependencies.

## 4. Repository structure and sources of truth

```text
.
├── .github/workflows/deploy.yml   GitHub Pages build and deployment
├── AGENTS.md                      Mandatory repository instructions
├── astro.config.mjs               Astro production-site configuration
├── package.json                   Commands and dependency declarations
├── package-lock.json              Reproducible npm dependency lock
├── README.md                      Repository entry point
├── docs/
│   ├── branding.md                Brand presentation rules
│   ├── project-overview.md        Human-friendly application guide
│   └── technical-reference.md     This technical document
└── src/
    ├── layouts/
    │   └── Layout.astro           Shared document, header and footer
    ├── pages/                     File-based routes and inline content
    │   ├── courses/[slug].astro   Generated course-detail route
    │   └── subjects/*/index.astro Subject landing pages
    └── styles/
        └── global.css             Shared tokens, components and breakpoints
```

Read sources in this order before making a change:

1. `AGENTS.md` for mandatory project rules.
2. `docs/branding.md` before any public-facing UI, styling, copy, email or brand change.
3. This document for architecture and implementation boundaries.
4. The affected source files, which remain authoritative if documentation is stale.

The root-level `index.html`, `pages/`, `css/`, `scripts/` and `images/` directories belong to an older non-Astro implementation. They are not imported or deployed by the active build. Do not edit them for normal live-site changes.

`dist/`, `.astro/` and `node_modules/` are generated or installed artifacts, not application source.

## 5. Routing and page inventory

Astro maps files under `src/pages/` to routes. All production routes are served from the custom-domain root.

### 5.1 General pages

| Route | Source | Responsibility |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Concise homepage overview, subject directory and links to detailed sections |
| `/about/` | `src/pages/about.astro` | Organisation and brand information |
| `/contact/` | `src/pages/contact.astro` | Full-width contact form that prepares a `mailto:` message |
| `/courses/` | `src/pages/courses.astro` | Featured course overview |
| `/modules/` | `src/pages/modules.astro` | Short-module examples and module learning process |
| `/learning-pathways/` | `src/pages/learning-pathways.astro` | Five initial pathways and example progressions |
| `/support/` | `src/pages/support.astro` | Tutor guidance, support plans, trust points and FAQs |
| `/login/` | `src/pages/login.astro` | Clear placeholder for future learner access |
| `/privacy/` | `src/pages/privacy.astro` | Privacy enquiry guidance |
| `/safeguarding/` | `src/pages/safeguarding.astro` | Safeguarding contact guidance |

### 5.2 Subject pages

Each subject route is implemented by `src/pages/subjects/<slug>/index.astro`:

- `/subjects/mathematics/`
- `/subjects/computing-ai/`
- `/subjects/computer-science/`
- `/subjects/ai-machine-learning/`
- `/subjects/english/`
- `/subjects/biology/`
- `/subjects/physics/`
- `/subjects/chemistry/`
- `/subjects/languages/`

The homepage is limited to six cards in this fixed order: Maths, Computing & AI, Science, English, Religion and Languages. Maths and Computing & AI are available; the remaining four are labelled “Coming soon”. Religion and Languages must remain separate and occupy the final two positions.

### 5.3 Generated course routes

`src/pages/courses/[slug].astro` contains `getStaticPaths()` and a `courseData` record. The current generated slugs are:

- `mathematics`
- `english`
- `languages`
- `biology`
- `ai-machine-learning`
- `computer-science`
- `physics`
- `chemistry`
- `foundations-course`
- `exam-prep-mastery`
- `interactive-practice-lab`
- `advanced-learning-track`

Every generated slug must have a matching `courseData` entry. Every course that should be reachable in production must be returned by `getStaticPaths()`.

## 6. Shared layout and browser behaviour

### 6.1 `Layout.astro`

All main pages render through `src/layouts/Layout.astro`. It owns:

- The HTML document and `lang="en"`.
- Character encoding and viewport metadata.
- The shared description metadata.
- Titles formatted as `{page title} | TableTopLearning`.
- The sticky header, brand lockup and primary navigation.
- Responsive navigation controls.
- Footer links and the Hai-BL Learning Platform credit.
- Importing `src/styles/global.css`.

The layout accepts:

```ts
{
  title?: string; // Defaults to "TableTopLearning"
  description?: string; // Defaults to the shared course-discovery description
}
```

### 6.2 Browser-side scripts

There is no client framework. Three small scripts provide progressive behaviour:

1. `Layout.astro` controls the mobile menu, `aria-expanded`, accessible labels, body scroll locking, link closing, Escape closing and desktop-resize cleanup.
2. `support.astro` controls FAQ disclosures by synchronising `hidden`, `.is-open` and `aria-expanded`.
3. `contact.astro` reads validated form fields and constructs a pre-addressed `mailto:` URL. It does not transmit or store the form data.

Markup IDs, `data-*` attributes, ARIA relationships and CSS state classes form part of each interaction contract. Change them together.

## 7. Content and data model

The application has no database or central content layer. Content is maintained in source:

- Homepage subject cards, SVG icons and high-level navigation live in `src/pages/index.astro`.
- Shared module and pathway records live in `src/data/learning.ts`.
- Detailed module, pathway and support content lives in `src/pages/modules.astro`, `src/pages/learning-pathways.astro` and `src/pages/support.astro`.
- `src/components/ModuleCard.astro` and `src/components/PathwayCard.astro` own the reusable card markup used by that data.
- `src/components/archive/homepage/` preserves the pre-module homepage snapshot and must not be imported into the active page.
- Each subject page contains a local `courses` array with `title`, `description` and `href`.
- Course-detail content lives in the `courseData` record in `src/pages/courses/[slug].astro`.
- General page copy and contact addresses live directly in their page templates.
- Shared navigation and footer labels live in `Layout.astro`.

### 7.1 Content change flow

```text
Maintainer edits Astro source
        |
        v
Astro check validates templates and TypeScript
        |
        v
Production build generates routes
        |
        v
GitHub Actions deploys the static artifact
```

### 7.2 Duplication rules

Subject and course concepts are duplicated. A subject or course change may require updates to:

1. Homepage cards or pathways.
2. The corresponding subject page.
3. The `courseData` record.
4. `getStaticPaths()`.
5. Catalogue, navigation or call-to-action links.
6. Availability labels and FAQ wording.

Search the repository before assuming one edit is sufficient.

## 8. Integrations and external boundaries

### 8.1 Active integrations

| Integration | Purpose | Data involved |
| --- | --- | --- |
| GitHub Actions | Install, build and deploy on pushes to `main` or manual runs | Repository source and generated static artifact |
| GitHub Pages | Host generated files | Public static files only |
| Custom domain | Serve the production site at `tabletoplearning.co.uk` | DNS and Pages configuration outside this repository |
| Visitor email application | Handle contact, privacy and safeguarding messages through `mailto:` | Data remains in the visitor’s email application until they send it |

### 8.2 Integrations that do not exist

There is no analytics platform, cookie-consent platform, CRM, email API, form-processing provider, payment gateway, authentication provider, database, CMS, scheduling service or learning-management integration.

Adding any of these changes privacy, security, operational and testing requirements. Do not add an external service or dependency without an explicit need and justification.

## 9. Production URL and asset handling

`astro.config.mjs` must remain compatible with the custom domain:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tabletoplearning.co.uk',
});
```

There is no project subpath. Internal links and generated assets must resolve from `/`.

Existing templates normalise `BASE_URL`:

```ts
const base = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/`;
```

Valid examples:

```astro
<a href={`${base}about`}>About</a>
<a href={`${base}learning-pathways`}>Learning Pathways</a>
<a href="/courses">Courses</a>
```

Imported CSS and Astro bundles are emitted under `/_astro/`. Do not reintroduce `/tabletoplearning/` or the previous GitHub project-site URL.

## 10. Styling and component conventions

All active styling is in `src/styles/global.css`. Reuse existing tokens and patterns before adding new rules.

Core colour tokens:

```css
--color-primary: #bd5500;
--color-primary-hover: #963f00;
--color-background: #fff8ec;
--color-surface: #ffffff;
--color-surface-soft: #fff3df;
--color-heading: #241a14;
--color-text: #594a40;
--color-text-muted: #78695e;
--color-border: #e8d9c7;
--color-focus: #7a3d00;
```

Common reusable patterns:

- Structure: `.section`, `.section-heading`, `.hero`, `.content-panel`.
- Navigation: `.topbar`, `.nav-shell`, `.nav-links`, `.footer`.
- Brand: `.brand`, `.brand-mark`, `.brand-text`.
- Actions: `.actions`, `.button`, `.primary`, `.secondary`.
- Cards: `.card`, `.subject-card`, `.module-card`, `.learning-pathway-card`, `.pricing-card`.
- Forms: `.contact-layout`, `.contact-form`, `.form-grid`, `.form-field`.
- Interactions: `.menu-toggle`, `.faq-item`, `.faq-question`, `.faq-answer`.

Primary responsive breakpoints are `900px` and `560px`. Preserve comfortable mobile spacing, one-column fallbacks and the toggle-controlled mobile menu.

Inline SVG is appropriate for simple interface icons. Decorative icons must use `aria-hidden="true"`. Do not add bitmap assets or dependencies when a small code-native icon is sufficient.

## 11. Accessibility requirements

Accessibility is a required implementation constraint.

- Use semantic headings in a logical order.
- Use links for navigation and buttons for actions.
- Associate every form control with a visible label.
- Preserve browser validation or provide an accessible equivalent.
- Maintain visible `:focus-visible` states.
- Keep touch targets at least 44px high where practical.
- Keep menu and FAQ `aria-expanded` states accurate.
- Preserve keyboard interaction and Escape handling.
- Hide purely decorative icons from assistive technology.
- Do not communicate availability or state through colour alone.
- Maintain sufficient colour contrast.
- Respect `prefers-reduced-motion`.
- Test desktop and narrow mobile layouts after public-facing changes.

## 12. Security and privacy requirements

The static architecture reduces server-side attack surface but does not remove privacy obligations.

- Never place secrets, private keys or service credentials in client-side code.
- Treat all browser input as untrusted if a backend is added later.
- Do not claim that the contact form sends or stores data; it only prepares an email.
- Do not collect fields that are unnecessary for the stated purpose.
- Do not add tracking, third-party embeds or external form handlers without approval and policy review.
- Do not expose private learner, parent or tutor information in source files.
- Authentication, payments and learner records require a secure backend and cannot be simulated with local storage.

## 13. Coding standards and development rules

### 13.1 General rules

- Preserve the existing Astro architecture and static-site compatibility.
- Work in `src/` for active application changes.
- Reuse `Layout.astro`, global classes and tokens.
- Use the brand name exactly as **TableTopLearning**.
- Prefer **learner** over **student**, except in an authentic quotation.
- Keep copy concise, accurate and free from unsupported promises.
- Avoid dependencies unless they are necessary and explicitly justified.
- Keep changes scoped; do not rebuild unrelated pages or remove course data.
- Preserve responsive behaviour, keyboard interaction and reduced motion.
- Keep URLs compatible with the custom-domain root.

### 13.2 Astro and TypeScript rules

- Keep frontmatter at the top of `.astro` files.
- Type component props and structured records when complexity warrants it.
- Use `getStaticPaths()` for build-time dynamic routes.
- Keep generated slugs and their content records synchronised.
- Prefer native HTML behaviour before adding JavaScript.
- Keep browser scripts small and page-specific.
- Query optional DOM elements safely and avoid global state.

### 13.3 CSS rules

- Use existing custom properties rather than hard-coded near-duplicate colours.
- Extend existing components before introducing a competing pattern.
- Use mobile-friendly grid fallbacks.
- Preserve focus, hover and reduced-motion styles.
- Avoid `!important` unless resolving a documented third-party constraint.
- Keep selectors understandable and avoid unnecessary specificity.

### 13.4 Content rules

- Verify course availability, pricing and service claims before changing them.
- Do not invent testimonials, outcomes, qualifications or guarantees.
- Label placeholders and coming-soon capabilities honestly.
- Follow [branding.md](branding.md) for tone, vocabulary and presentation.

## 14. Development commands and requirements

Prerequisites:

- Node.js compatible with the CI runtime; Node.js 22 is preferred.
- npm.
- A clean install from `package-lock.json`.

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the exact locked dependency graph |
| `npm run dev` | Start the Astro development server |
| `npm start` | Alias for the development server |
| `npx astro check` | Run Astro and TypeScript diagnostics |
| `npm run build` | Generate production files in `dist/` |
| `npm run preview` | Preview the generated production build |

Minimum verification for public-facing changes:

```bash
npx astro check
npm run build
```

Also inspect affected interactions and responsive layouts when practical.

## 15. Deployment

`.github/workflows/deploy.yml` contains the only deployment workflow.

Triggers:

- Push to `main`.
- Manual `workflow_dispatch`.

Build job:

1. Check out the repository.
2. Set up Node.js 22 with npm caching.
3. Configure GitHub Pages.
4. Run `npm ci`.
5. Run `npm run build`.
6. Upload `dist/` as the Pages artifact.

Deploy job:

1. Wait for the build job.
2. Deploy the artifact to the `github-pages` environment.
3. Publish the deployment URL.

Required permissions are `contents: read`, `pages: write` and `id-token: write`.

Repository Pages settings, custom-domain DNS and certificate state are external operational dependencies. A local build cannot verify them.

## 16. Testing and acceptance checklist

There is no unit, integration or end-to-end test suite. Use proportionate manual verification.

For every relevant change:

- Run `npx astro check`.
- Run `npm run build`.
- Confirm expected routes exist in `dist/`.
- Check for broken internal links or legacy deployment paths.
- Test the affected page at desktop and mobile widths.
- Test keyboard focus and controls.
- Confirm menu and FAQ ARIA states if those components changed.
- Confirm form labels, required states and validation if forms changed.
- Confirm no unapproved external requests or dependencies were introduced.
- Review copy against the brand guide.

## 17. Safe extension patterns

### Add a static page

1. Create `src/pages/<route>.astro`.
2. Import and render `Layout`.
3. Use a specific page title.
4. Reuse existing content and interface classes.
5. Add navigation only when the route belongs in global navigation.
6. Check, build and test the route.

### Add a subject

1. Add or update its homepage card and availability label.
2. Create `src/pages/subjects/<slug>/index.astro`.
3. Add matching course data and generated paths where appropriate.
4. Update related FAQs or pathway copy if necessary.
5. Test every link to the subject and its courses.

### Add a course route

1. Add a `courseData` entry.
2. Return the same slug from `getStaticPaths()`.
3. Link it from the relevant subject or catalogue page.
4. Build and confirm `dist/courses/<slug>/index.html`.

### Add real form processing

1. Choose an approved backend or form provider.
2. Define required fields, retention and access.
3. Add spam protection and server-side validation.
4. Store credentials outside client code.
5. Update privacy wording.
6. Provide success and failure states.
7. Add automated and manual tests.

### Add authentication, payments or progress

Treat these as architecture projects. They require backend services, security design, privacy review, session handling, error recovery, monitoring and expanded testing. Do not implement a visual simulation and call it functional.

## 18. Known limitations and technical debt

- Login is a placeholder.
- The contact form depends on the visitor having an email application.
- Pricing has no checkout or billing integration.
- Course content is duplicated across templates.
- Course availability and generated generic course pages are not fully aligned.
- The courses overview is not a complete searchable catalogue.
- No CMS or admin workflow exists.
- No analytics or operational monitoring exists.
- No automated test suite exists.
- Global CSS and inline data will become harder to maintain as the application grows.
- Legacy non-Astro files remain in the repository.

## 19. AI development protocol

Before changing the repository, an AI assistant must:

1. Read `AGENTS.md`.
2. Read this document.
3. Read `docs/branding.md` for public-facing work.
4. Inspect the relevant source and current working-tree state.
5. Preserve unrelated user changes.
6. Make the smallest complete change that satisfies the request.
7. Verify in proportion to risk.
8. Report actual behavior and any remaining limitation accurately.

AI assistants must not:

- Infer that placeholder features are implemented.
- Add external services, dependencies or broad architecture changes without need.
- Rewrite legacy files instead of the active Astro application.
- Reintroduce the previous GitHub Pages base path.
- Invent product claims, learner outcomes or legal assurances.
- Sacrifice accessibility or mobile behavior for visual convenience.

Suggested handoff prompt:

> This repository contains the static Astro 5 website for TableTopLearning. Read `AGENTS.md`, `docs/technical-reference.md` and `docs/branding.md` before making changes. Treat `src/` as the active application, preserve deployment at the `tabletoplearning.co.uk` domain root, reuse existing patterns, and do not assume authentication, payments, a database, a CMS or hosted course delivery exists.
