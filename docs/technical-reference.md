# TableTopLearning Technical Reference and AI Context

This document is the canonical technical overview of the repository. It is designed to be supplied to an AI assistant before asking it to analyse or change the app.

Last reviewed against the repository: July 2026.

## 1. System summary

TableTopLearning is a statically generated Astro website deployed to GitHub Pages. Astro compiles the files in `src/pages/` into HTML and bundles the imported global stylesheet into a hashed asset under `dist/_astro/`.

There is no runtime server. Everything deployed is HTML, CSS and a small amount of browser JavaScript.

```text
Astro source in src/
        |
        | npm run build
        v
Static files in dist/
        |
        | GitHub Actions Pages artifact
        v
https://zaktec.github.io/tabletoplearning/
```

## 2. Sources of truth

Read these files before making changes:

1. `AGENTS.md` — repository-specific implementation and verification rules.
2. `docs/branding.md` — mandatory public-facing brand, copy, colour and accessibility rules.
3. `docs/technical-reference.md` — architecture and current technical behaviour.
4. The affected source files — code is authoritative if documentation becomes stale.

Use the brand name exactly as **TableTopLearning** and prefer **learner** over **student** except in an authentic quotation.

## 3. Technology stack

| Area | Implementation |
| --- | --- |
| Framework | Astro 5 |
| Rendering | Static site generation |
| Language | Astro templates, TypeScript and browser JavaScript |
| Styling | One global plain-CSS stylesheet |
| Package manager | npm with `package-lock.json` |
| CI runtime | Node.js 22 |
| Hosting | GitHub Pages project site |
| Automation | GitHub Actions |
| Backend | None |
| Database | None |
| CMS | None |
| Authentication | Placeholder page only |
| Testing | Astro diagnostics and production build; no unit-test suite |

Dependencies are intentionally small. `astro` is the only runtime dependency. `@astrojs/check` and `typescript` are development dependencies.

## 4. Repository map

```text
.
├── .github/workflows/deploy.yml  # GitHub Pages CI/CD workflow
├── AGENTS.md                     # Instructions for coding agents
├── astro.config.mjs              # Astro site URL and project base path
├── package.json                  # npm scripts and dependencies
├── package-lock.json             # Reproducible dependency lock
├── README.md                     # Entry point for humans and AI tools
├── docs/
│   ├── branding.md               # Public-facing brand rules
│   ├── project-overview.md       # Product scope and audience
│   └── technical-reference.md    # This technical source of truth
└── src/
    ├── layouts/
    │   └── Layout.astro          # Shared document, header, nav and footer
    ├── pages/                    # File-based routes
    │   ├── courses/[slug].astro  # Statically generated course routes
    │   └── subjects/*/index.astro# Subject landing pages
    └── styles/global.css         # All shared styling and responsive rules
```

The root-level `index.html`, `pages/`, `css/`, `scripts/` and `images/` paths are legacy files from an older non-Astro version. They are tracked, but Astro does not import them and the deployment workflow does not publish them. Do not edit them when changing the live Astro site unless the project is intentionally migrating or removing the legacy implementation.

Generated directories such as `dist/`, `.astro/` and `node_modules/` are not application source.

## 5. Architecture

### File-based routing

Astro maps files under `src/pages/` to routes. Static pages import and render `src/layouts/Layout.astro`.

`src/pages/courses/[slug].astro` is the only dynamic route template. Its `getStaticPaths()` function declares every course slug at build time, so it still produces fully static HTML.

### Shared layout

`src/layouts/Layout.astro` owns:

- The HTML document shell and English language declaration
- Viewport and description metadata
- Page titles in the format `{page title} | TableTopLearning`
- Sticky site header and primary navigation
- Responsive navigation toggle
- Footer navigation and ZakTec Solutions credit
- Importing `src/styles/global.css`

The layout accepts one optional prop:

```ts
{
  title?: string; // defaults to "TableTopLearning"
}
```

### Browser-side behaviour

There are two small scripts and no client framework:

1. `Layout.astro` controls the mobile navigation menu. It updates `aria-expanded`, changes the accessible label, toggles `.is-open`, locks body scrolling and closes on link selection, Escape or desktop resize.
2. `index.astro` controls FAQ disclosures. It toggles the associated answer’s `hidden` state, `.is-open` and `aria-expanded`.

Both interactions rely on the markup, IDs, data attributes and CSS class names remaining aligned.

## 6. Route inventory

All production URLs are served beneath `/tabletoplearning/`.

### General pages

| Route below the base | Source | Purpose |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Homepage, learning pathways, support plans and FAQ |
| `/about/` | `src/pages/about.astro` | Brand and organisation information |
| `/contact/` | `src/pages/contact.astro` | Contact email link |
| `/courses/` | `src/pages/courses.astro` | Small featured-course overview |
| `/login/` | `src/pages/login.astro` | Placeholder learner-login destination |
| `/privacy/` | `src/pages/privacy.astro` | Privacy enquiry information |
| `/safeguarding/` | `src/pages/safeguarding.astro` | Safeguarding contact information |

### Subject pages

Each route is implemented by `src/pages/subjects/<slug>/index.astro`:

- `/subjects/mathematics/`
- `/subjects/computer-science/`
- `/subjects/ai-machine-learning/`
- `/subjects/english/`
- `/subjects/biology/`
- `/subjects/physics/`
- `/subjects/chemistry/`
- `/subjects/languages/`

### Generated course pages

The following slugs are declared in `getStaticPaths()` and have entries in `courseData`:

- `/courses/mathematics/`
- `/courses/english/`
- `/courses/languages/`
- `/courses/biology/`
- `/courses/ai-machine-learning/`
- `/courses/computer-science/`
- `/courses/physics/`
- `/courses/chemistry/`
- `/courses/foundations-course/`
- `/courses/exam-prep-mastery/`
- `/courses/interactive-practice-lab/`
- `/courses/advanced-learning-track/`

If a slug is added to `courseData`, it must also be returned by `getStaticPaths()` or Astro will not generate its route. Conversely, every generated slug should have matching course data.

## 7. Content and data model

There is no central content layer yet.

- Homepage pathways, subject cards, Python stages, course features, plan details and FAQs are written directly in `src/pages/index.astro`.
- Each subject page contains a local `courses` array with `title`, `description` and `href` fields.
- Course detail content is stored in the `courseData` record in `src/pages/courses/[slug].astro`.
- Contact addresses and policy text are written directly in their page templates.

This means some concepts are duplicated. When changing a subject or course, check all of these locations:

1. Homepage subject card, pathway or course reference, when applicable
2. Corresponding subject page and its local course array
3. `courseData`
4. `getStaticPaths()`
5. Navigation or CTA links that point to the route

Do not assume the displayed pricing or account copy is backed by business logic. It is static presentation content.

## 8. GitHub Pages base-path handling

`astro.config.mjs` configures a GitHub Pages project site:

```js
export default defineConfig({
  site: 'https://zaktec.github.io',
  base: '/tabletoplearning',
});
```

The application is not hosted at `/`. A link such as `/about` would incorrectly point to `https://zaktec.github.io/about`.

Astro files that build internal URLs normalize the configured base to include a trailing slash:

```ts
const base = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/`;
```

Use it like this:

```astro
<a href={`${base}about`}>About</a>
<a href={`${base}#learning-pathways`}>Learning Pathways</a>
```

For a same-page anchor on the homepage, `href="#learning-pathways"` is also valid. Do not add hard-coded root-relative internal links or assets.

Astro automatically emits imported CSS under the base path, for example `/tabletoplearning/_astro/<hashed-file>.css`.

## 9. Styling system

All active site styles live in `src/styles/global.css`. There is no CSS framework and no component-scoped styling.

The shared design tokens are:

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

Important reusable classes include:

- Layout: `.topbar`, `.nav-shell`, `.nav-links`, `.footer`
- Brand: `.brand`, `.brand-mark`, `.brand-text`
- Content: `.section`, `.section-heading`, `.hero`, `.hero-content`
- Actions: `.actions`, `.button`, `.primary`, `.secondary`
- Cards: `.card`, `.subject-card`, `.step-card`, `.testimonial-card`, `.pricing-card`
- Interactive UI: `.menu-toggle`, `.faq-item`, `.faq-question`, `.faq-answer`

Responsive behaviour is primarily defined at `900px` and `560px` breakpoints. At widths of `900px` or below, the primary navigation becomes a toggle-controlled overlay and multi-column layouts collapse. The smallest layout stacks actions and subject cards vertically.

The stylesheet includes visible keyboard focus and reduced-motion handling. Preserve these behaviours when changing controls or animation.

## 10. Accessibility contract

The current implementation deliberately includes:

- Semantic links and buttons
- A labelled primary navigation landmark
- A menu button connected with `aria-controls`
- Accurate `aria-expanded` state for the menu and FAQs
- Escape-key menu closing and focus restoration
- Decorative icons hidden with `aria-hidden="true"`
- Minimum touch-target sizing
- Visible `:focus-visible` outlines
- Sufficient brand-token contrast
- `prefers-reduced-motion` overrides

When adding an interactive element, use a real button for an action and a real link for navigation. Do not make a non-interactive element clickable with JavaScript alone.

## 11. Commands

| Command | Purpose |
| --- | --- |
| `npm ci` | Install exactly what is recorded in `package-lock.json` |
| `npm run dev` | Start the Astro development server |
| `npm start` | Alias for the development server |
| `npx astro check` | Run Astro and TypeScript diagnostics |
| `npm run build` | Generate the production site in `dist/` |
| `npm run preview` | Preview the production build locally |

For public-facing changes, run at least:

```bash
npx astro check
npm run build
```

When paths or navigation change, inspect the generated HTML or test the production build beneath the configured `/tabletoplearning/` base.

## 12. Deployment

`.github/workflows/deploy.yml` is the only deployment workflow. It runs on pushes to `main` and can also be started manually.

The workflow:

1. Checks out the repository.
2. Sets up Node.js 22 with npm caching.
3. Configures GitHub Pages.
4. Runs `npm ci`.
5. Runs `npm run build`.
6. Uploads `dist/` as the Pages artifact.
7. Deploys it with `actions/deploy-pages`.

Required workflow permissions are `contents: read`, `pages: write` and `id-token: write`. The deployment target is the `github-pages` environment.

The repository’s Pages source must be configured to use GitHub Actions. A successful local build does not by itself confirm that repository Pages settings or GitHub Actions permissions are correct.

## 13. Current limitations and technical debt

- The login page is informational; it contains no form and performs no authentication.
- There is no enrolment or payment path behind the pricing cards.
- There is no persistence, API, database or server-side runtime.
- Subject and course content is duplicated across templates.
- `/courses/` contains two generic featured cards and is not a complete catalogue index.
- “Coming soon” subject pages still link to generic course detail pages.
- Contact and policy workflows depend on the visitor’s email client through `mailto:` links.
- No automated unit, integration, end-to-end or accessibility test suite exists.
- Global CSS and inline page data will become harder to maintain as the catalogue grows.
- Legacy non-Astro files remain in the repository and can confuse tooling.

An AI assistant must describe these as current limitations, not as implemented capabilities.

## 14. Safe extension patterns

### Add a normal static page

1. Create `src/pages/<route>.astro`.
2. Import and use `Layout`.
3. Reuse existing global classes and tokens.
4. Add navigation only if the page belongs in global navigation.
5. Use the normalized base for cross-page internal links.
6. Run Astro check and build.

### Add a subject

1. Add or update its homepage pathway or course reference when it should be promoted there.
2. Create `src/pages/subjects/<slug>/index.astro` using an existing subject page as the template.
3. Add corresponding course data and generated paths when applicable.
4. Ensure status labels accurately reflect availability.
5. Test every emitted link beneath the project base.

### Add a course slug

1. Add a matching key to `courseData`.
2. Add the same slug to `getStaticPaths()`.
3. Link to it from the relevant subject page or catalogue.
4. Build and confirm `dist/courses/<slug>/index.html` exists.

### Introduce backend functionality

Authentication, payments, forms, progress tracking or a CMS are architectural changes. GitHub Pages cannot run a traditional application server. Such work requires an external API/backend or a hosting-platform change, security and privacy design, secret management, error handling and new testing. Do not simulate these features in the UI and describe them as functional.

## 15. AI handoff checklist

Before an AI changes this project, it should be told to:

- Work only in the active Astro implementation under `src/` unless explicitly asked otherwise.
- Read `AGENTS.md` and `docs/branding.md` before public-facing changes.
- Preserve static-site compatibility and the GitHub Pages base path.
- Reuse the shared layout, CSS tokens and existing class patterns.
- Keep course route declarations and course data synchronized.
- Avoid inventing backend capabilities, outcomes, testimonials or legal promises.
- Preserve keyboard, responsive and reduced-motion behaviour.
- Avoid new dependencies unless they are necessary and justified.
- Run `npx astro check` and `npm run build` after relevant changes.

Suggested context prompt:

> This repository is the static Astro 5 website for TableTopLearning. Read `AGENTS.md`, `docs/technical-reference.md` and `docs/branding.md` before making changes. Treat `src/` as the active application, preserve the `/tabletoplearning/` GitHub Pages base path, and do not assume authentication, payments, a database, a CMS or course-delivery features exist.
