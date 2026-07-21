# TableTopLearning Project Instructions

## Branding requirements

Before changing any public-facing UI, styling, marketing copy, navigation, page content, email content or brand asset:

1. Read `docs/branding.md` in full before making changes.
2. Follow its naming, colour, typography, voice, accessibility and visual-style rules.
3. Use the brand name exactly as **TableTopLearning**.
4. Prefer **learner** over **student**, except when preserving an authentic quotation.
5. Reuse the existing CSS tokens and components before introducing new styles or patterns.
6. Keep the experience warm, professional, concise and easy to read on mobile.

If a user's latest explicit request conflicts with `docs/branding.md`, follow the user's request and clearly mention the conflict in the handoff.

## Architecture and scope

- Preserve the existing Astro architecture and static-site compatibility.
- Reuse existing layouts, components, routes and content structures.
- Do not add dependencies unless they are necessary and explicitly justified.
- Avoid rebuilding unrelated pages or deleting course data.
- Preserve accessibility, responsive behaviour and keyboard interaction.

## Verification

For public-facing changes, run the available type-check and production-build commands. Test affected responsive layouts and interactions when practical.

## When the branding guide is optional

Reading `docs/branding.md` is not required for backend-only work, infrastructure, build tooling, dependency maintenance or internal tests that cannot affect public-facing branding or copy.
