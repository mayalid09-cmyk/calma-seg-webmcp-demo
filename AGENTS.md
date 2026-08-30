# AGENTS.md

## Architecture

CALMA-SEG is a static, single-page site built with Vite and vanilla
JavaScript (ES modules) — no framework, no backend, no database.

- `index.html` — page shell: hero, notice bar, all section landmarks, and
  form controls. Text content is placeholder in the markup; `src/main.js`
  overwrites it per selected language on load.
- `src/content.js` — all bilingual, synthetic, non-personal data: UI
  strings (`UI_TEXT`), the four exercises (`EXERCISES`), support-option
  text (`SUPPORT_OPTIONS`), and safety-limits text (`SAFETY_LIMITS`). This
  is the only place content should be added or edited.
- `src/main.js` — rendering logic (DOM updates driven by `state`), form
  event handlers, and WebMCP tool registration via
  `document.modelContext.registerTool`.
- `src/style.css` — all styling; no CSS framework.

## Key decisions

- WebMCP tools and the manual UI call the *same* underlying render
  functions (`showExercise`, `renderSupportResult`) so agent-triggered and
  human-triggered actions always produce identical visible results. Never
  add an agent-only code path that bypasses the visible UI.
- Feature detection for WebMCP happens once at startup in
  `registerWebMcpTools()`. It must never claim "connected" status unless
  `registerTool` calls actually succeed, and must fail gracefully (see the
  `unavailable` / `error` states in `webmcpState`).
- All four tools validate their inputs and return `{ content: [...], isError: true }`
  on invalid input rather than throwing — errors must never leak internals.
- Content is deliberately fixed and non-clinical: no diagnosis, no
  treatment claims, no invented hotline numbers, no urgency inference. Any
  new content must preserve this framing per `SAFETY_LIMITS`.

## Conventions

- Bilingual strings always live in `src/content.js` keyed by `en`/`es` —
  never hardcode language-specific text in `main.js`.
- No `localStorage`, cookies, analytics, or network calls of any kind.
- Keep everything reachable and operable without WebMCP; WebMCP is an
  additive discovery layer, not a requirement.

## Running locally

```bash
npm install
npm run dev
```
