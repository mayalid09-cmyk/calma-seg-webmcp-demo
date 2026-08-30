# WebMCP manual testing checklist — CALMA-SEG

Use this checklist against a local build (`npm run dev`) or the deployed
Netlify URL. Repeat in both English and Spanish where relevant.

## 1. Tool discovery

- [ ] Open the page in a browser with `document.modelContext` available.
- [ ] Confirm the "WebMCP status" panel shows "WebMCP connected" and lists
      exactly four tool names: `list_wellbeing_exercises`,
      `show_wellbeing_exercise`, `find_human_support_options`,
      `explain_safety_limits`.
- [ ] Confirm the status text never reads "connected" before registration
      actually succeeds (check by throttling/erroring registration if
      possible).

## 2. Valid tool calls

- [ ] `list_wellbeing_exercises` with `category: "breathing"`,
      `max_minutes: 5`, `language: "en"` returns `paced_breathing` only.
- [ ] `list_wellbeing_exercises` with `category: "all"`, `max_minutes: 10`,
      `language: "es"` returns all four exercises with Spanish titles.
- [ ] `show_wellbeing_exercise` with `exercise_id: "five_senses_grounding"`,
      `language: "en"` returns the five steps and updates the "Selected
      exercise" panel.
- [ ] `show_wellbeing_exercise` with `exercise_id: "paced_breathing"`,
      `language: "es"` returns Spanish steps including the discomfort/
      dizziness stop instruction.
- [ ] `find_human_support_options` with `urgency: "routine"`,
      `language: "en"` returns three general suggestions and updates the
      support panel.
- [ ] `find_human_support_options` with `urgency: "immediate"`,
      `language: "es"` clearly states the demo cannot handle emergencies
      and to contact local emergency services.
- [ ] `explain_safety_limits` with `language: "en"` returns the seven
      safety bullet points and scrolls to that section.

## 3. Invalid inputs

- [ ] `list_wellbeing_exercises` with `category: "nope"` returns a safe
      error message, no crash.
- [ ] `list_wellbeing_exercises` with `max_minutes: 99` returns a safe
      error message.
- [ ] `show_wellbeing_exercise` with `exercise_id: "does_not_exist"`
      returns a safe error message.
- [ ] `find_human_support_options` with `urgency: "urgent!!"` returns a
      safe error message.
- [ ] Any tool called with an unsupported `language` value returns a safe
      error message.
- [ ] No error message exposes stack traces, file paths, or secrets.

## 4. Visible UI updates

- [ ] Every successful tool call produces a visible, on-page change (panel
      content, focus movement, or scroll).
- [ ] The "Agent activity" panel updates after each agent-triggered call
      with the tool name and a plain-language summary.
- [ ] `aria-live` regions announce updates (verify with a screen reader or
      by inspecting the DOM for `aria-live` attributes receiving new text).

## 5. Browser fallback

- [ ] In a browser without `document.modelContext`, the status panel shows:
      "WebMCP is not available in this browser. The manual interface
      remains available."
- [ ] All manual controls (language selector, exercise finder, "View
      exercise" buttons, support form) still work fully in that browser.

## 6. Keyboard navigation

- [ ] Tab through the entire page in order; every interactive control is
      reachable and shows a visible focus ring.
- [ ] The skip link works and jumps to `#main`.
- [ ] Selecting an exercise moves focus to the exercise heading.
- [ ] Forms can be submitted with Enter.

## 7. Mobile and desktop layouts

- [ ] At ~390×844 (mobile), content stacks in a single column, no
      horizontal scrolling, text remains legible.
- [ ] At ~1440×900 (desktop), exercise cards lay out in a responsive grid,
      hero section shows language selector alongside the title.

## 8. Console errors

- [ ] No errors or warnings in the browser console during normal use.
- [ ] No errors during WebMCP tool registration or invocation (successful
      or handled-invalid cases).

## 9. Netlify live URL

- [ ] Deployed Netlify URL loads correctly over HTTPS.
- [ ] All above checks pass against the deployed URL, not just localhost.
