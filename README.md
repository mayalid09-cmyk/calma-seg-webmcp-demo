# CALMA-SEG: Safe Support with WebMCP

A bilingual (English/Spanish) hackathon demonstration showing how a static
website can expose safe, prewritten psychoeducational content and general
human-support information to both people and browser agents, using the real
[WebMCP](https://github.com/webmachinelearning/webmcp) imperative API
(`document.modelContext.registerTool`).

**This is a hackathon prototype, not a clinical service.** It does not
diagnose, provide therapy, recommend medication, assess anyone's mental
state, or operate as an emergency service. All content is fixed, synthetic,
and non-personal.

This is a brand-new, independent project. It is not connected to, does not
import from, and does not read or write any existing production system,
database, or real personal data.

## What humans can do

- Choose a language (English or Spanish).
- Browse exercise cards filtered by category (grounding, breathing, focus)
  and maximum duration.
- Open an exercise to see its full steps, approximate duration, and a
  safety note in a visible panel.
- Choose an urgency level (routine, soon, immediate) to see general
  human-support guidance.
- Read the safety and privacy section describing what the demo can and
  cannot do.
- Watch the "Agent activity" panel to see the last WebMCP tool a browser
  agent invoked and a plain-language description of what it changed on the
  page.

## What agents can do through WebMCP

A browser agent that supports WebMCP can call four registered tools. Every
call produces a visible change on the page — nothing happens silently.

| Tool | Description | Inputs | Output | Visible effect |
|---|---|---|---|---|
| `list_wellbeing_exercises` | Lists exercises matching a category and maximum duration | `category` (`all`\|`grounding`\|`breathing`\|`focus`), `max_minutes` (1–10), `language` (`en`\|`es`) | Text list of exercise IDs, titles, categories, durations, descriptions | None (read-only lookup) |
| `show_wellbeing_exercise` | Shows one exercise's full instructions | `exercise_id` (one of the four fixed IDs), `language` (`en`\|`es`) | Text with title, duration, numbered steps, safety note | Updates the "Selected exercise" panel, moves focus to its heading, announces via `aria-live`, updates "Agent activity" |
| `find_human_support_options` | Shows general support options for a chosen urgency | `urgency` (`routine`\|`soon`\|`immediate`), `language` (`en`\|`es`) | Text list of general support suggestions | Updates the "Human support options" panel via `aria-live`, updates "Agent activity" |
| `explain_safety_limits` | Explains what the demo can and cannot do | `language` (`en`\|`es`) | Text list of safety/privacy limitations | Scrolls to and highlights the "Safety and privacy" section, updates "Agent activity" |

The four fixed exercise IDs are: `five_senses_grounding`, `paced_breathing`,
`orienting_pause`, `next_small_step`.

### Why WebMCP improves the experience compared with DOM interpretation

Without WebMCP, an agent has to guess at meaning by scraping and clicking
DOM elements: parsing button text, inferring what a dropdown means, and
hoping the page structure doesn't change. With WebMCP, the page declares its
capabilities directly — a name, a description, and a JSON Schema for
inputs — so an agent can call `show_wellbeing_exercise` with
`{ "exercise_id": "paced_breathing", "language": "es" }` and get a
predictable, typed, validated result instead of reverse-engineering markup.
The same tools also stay usable by a human through the ordinary interface,
so nothing is duplicated or hidden.

## Technology

- [Vite](https://vitejs.dev/) with vanilla JavaScript (ES modules)
- Semantic HTML5
- Plain, responsive CSS (no UI framework)
- No backend, no database, no authentication, no analytics, no cookies, no
  `localStorage`, no external AI API, no paid third-party service

## Local installation and development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is written to `dist/`.

## Netlify deployment

This is a static site. `netlify.toml` already configures:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

Connect the repository in Netlify, or run `netlify deploy` from the project
root after building.

## Enabling and testing WebMCP in a compatible browser

WebMCP's imperative API (`document.modelContext.registerTool`) is an
experimental web platform feature. At the time of writing it is available
behind a flag or origin trial in Chromium-based browsers that have shipped
the relevant proposal. See the official docs:

- <https://developer.chrome.com/docs/ai/webmcp/imperative-api>
- <https://developer.chrome.com/docs/ai/webmcp/best-practices>
- <https://github.com/webmachinelearning/webmcp>

To test manually:

1. Open the deployed site (or `npm run dev`) in a browser build that exposes
   `document.modelContext`.
2. Check the "WebMCP status" panel. It should list the four tool names once
   registration succeeds.
3. Use a WebMCP-aware agent/extension to invoke each tool (see example
   prompts below) and confirm the visible panels update.
4. In a browser without WebMCP support, confirm the status panel instead
   shows: "WebMCP is not available in this browser. The manual interface
   remains available." — and that every feature still works by hand.

### Example agent prompts

- "List grounding or breathing exercises that take 5 minutes or less, in
  English."
- "Show me the paced breathing exercise in Spanish."
- "I'd like general support options for a routine concern, in English."
- "What are the safety limits of this demo, in Spanish?"

## Privacy and safety

- No personal information is collected, transmitted, or stored anywhere.
- No backend, database, or third-party service receives any data.
- No hotline numbers or emergency contacts are invented; for `immediate`
  urgency, the demo states plainly that it cannot handle emergencies and
  points to local emergency services.
- All exercise and support content is fixed and synthetic, written for this
  project.

## Confirmation

This is a new hackathon demo built from scratch with synthetic, non-personal
content. It does not read from, write to, or reference any existing
production project, database, or account.

## Honest limitations

- WebMCP support in browsers is experimental and may not be available in
  the environment used to review this project. If so, the status panel will
  honestly report that WebMCP is unavailable, and the manual interface
  remains fully usable.
- This project has not been clinically validated and must not be treated as
  medical or mental-health guidance.
- The four exercises and support-option texts are illustrative examples,
  not an exhaustive or personalized set of resources.
