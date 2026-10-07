# Working on this project

Read `docs/PROJECT_BRIEF.md`, `docs/CODEX_HANDOFF.md`, and `docs/QA.md` before changing the project.

## Product intent

This is a Vietnamese interactive philosophy learning project for a lecturer presentation, worth 30% of the user's MLN111 grade. Treat it as a complete learning product. Preserve the existing Atlas dataset while improving the UI and the Human Journey.

## Stack and ownership

- React with JavaScript, Vite, Motion, React Flow and Lucide. Keep the existing stack unless the user requests a change.
- No backend is currently required. Do not add accounts, API secrets, a database, or telemetry without a concrete requested need.
- The app should work offline once installed, with local media assets. External reading links are optional.
- This export is a separate local React project. Do not modify or deploy the older private Sites app as an incidental part of local work.
- Keep GitHub repositories and deployments private. Do not push, publish or change sharing unless the user authorizes that action.

## Implementation

- Put teaching data in `src/data/journey.js`, Atlas data in `src/data/atlas.js`, and visual/UI behavior in components.
- Preserve the 46 existing Atlas milestones and 68 edges unless a specific academic correction is needed and explained.
- Keep date ranges approximate and distinguish lifespans from periods of intellectual development.
- Preserve filtering by interval overlap and reset filters when opening a related hidden milestone.
- Use proper buttons and labels; support click alternatives for dragging, narrow viewports and reduced motion.
- Persist only local learning data. Validate saved data before using it; render notes as plain React text.
- Keep image attribution and license links with any downloaded historical image. Do not invent archival photos.
- New content must be source-backed and checked against the class textbook when it becomes available.

## Academic distinctions

- Human nature involves the unity of natural and social aspects.
- A totality of social relations is not an arithmetic sum or a deterministic personality formula. Show human agency as well as social influence.
- Technology is one historical condition, not the sole cause of development. Societal contexts can coexist.
- Stress and fatigue alone do not establish Marxist alienation.
- Labour alienation has dimensions relating to product, activity, species-being/human capacities and other people. Situate them within ownership and production relations.
- Emancipation is a social process involving conditions and relations, not just personal optimism or clicking locks.
- Explain the relationship of masses and leaders without treating either as isolated from historical conditions.
- Nietzsche is a nineteenth-century thinker with later influence, not a twentieth-century contemporary of Sartre.
- Personal value choices are reflections, not scored personality or moral judgments.

## Validation

Run `npm test` and `npm run build` after changes. Run appropriate Playwright tests for changed interactions. Inspect real desktop/mobile screenshots after layout changes. Report actual test evidence and any remaining limitations. Do not claim lecturer-ready academic validation without checking the supplied textbook and rubric.
