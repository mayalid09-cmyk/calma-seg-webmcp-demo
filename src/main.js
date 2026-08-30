import './style.css';
import { UI_TEXT, EXERCISES, SUPPORT_OPTIONS, SAFETY_LIMITS } from './content.js';

const state = {
  lang: 'en',
  selectedExerciseId: null,
  lastTool: null,
};

const el = {
  langSelect: document.getElementById('lang-select'),
  categorySelect: document.getElementById('category-select'),
  maxMinutes: document.getElementById('max-minutes'),
  exerciseList: document.getElementById('exercise-list'),
  selectedExercise: document.getElementById('selected-exercise'),
  selectedHeading: document.getElementById('selected-heading'),
  urgencySelect: document.getElementById('urgency-select'),
  supportForm: document.getElementById('support-form'),
  supportResult: document.getElementById('support-result'),
  safetyList: document.getElementById('safety-list'),
  agentActivity: document.getElementById('agent-activity'),
  webmcpStatus: document.getElementById('webmcp-status'),
};

function t() {
  return UI_TEXT[state.lang];
}

function applyStaticText() {
  const strings = t();
  document.documentElement.lang = state.lang;
  document.getElementById('demo-notice').textContent = strings.demoNotice;
  document.getElementById('app-name').textContent = strings.appName;
  document.getElementById('tagline').textContent = strings.tagline;
  document.getElementById('hero-desc').textContent = strings.heroDesc;
  document.getElementById('lang-label').textContent = strings.langLabel;
  document.getElementById('finder-heading').textContent = strings.finderHeading;
  document.getElementById('category-label').textContent = strings.categoryLabel;
  document.getElementById('max-minutes-label').textContent = strings.maxMinutesLabel;
  document.getElementById('selected-heading').textContent = strings.selectedHeading;
  document.getElementById('support-heading').textContent = strings.supportHeading;
  document.getElementById('urgency-label').textContent = strings.urgencyLabel;
  document.getElementById('support-button').textContent = strings.supportButton;
  document.getElementById('safety-heading').textContent = strings.safetyHeading;
  document.getElementById('agent-heading').textContent = strings.agentHeading;
  document.getElementById('status-heading').textContent = strings.statusHeading;
  document.querySelector('.site-footer p').textContent = strings.footer;

  const categoryOpts = el.categorySelect.options;
  categoryOpts[0].textContent = strings.categories.all;
  categoryOpts[1].textContent = strings.categories.grounding;
  categoryOpts[2].textContent = strings.categories.breathing;
  categoryOpts[3].textContent = strings.categories.focus;

  const urgencyOpts = el.urgencySelect.options;
  urgencyOpts[0].textContent = strings.urgencies.routine;
  urgencyOpts[1].textContent = strings.urgencies.soon;
  urgencyOpts[2].textContent = strings.urgencies.immediate;

  el.safetyList.innerHTML = '';
  for (const item of SAFETY_LIMITS[state.lang]) {
    const li = document.createElement('li');
    li.textContent = item;
    el.safetyList.appendChild(li);
  }
}

function renderExerciseList() {
  const category = el.categorySelect.value;
  const maxMinutes = Number(el.maxMinutes.value) || 10;
  const strings = t();
  const matches = EXERCISES.filter(
    (ex) => (category === 'all' || ex.category === category) && ex.minutes <= maxMinutes
  );

  el.exerciseList.innerHTML = '';
  for (const ex of matches) {
    const li = document.createElement('li');
    li.className = 'exercise-card';
    const h3 = document.createElement('h3');
    h3.textContent = ex.title[state.lang];
    const meta = document.createElement('p');
    meta.className = 'exercise-meta';
    meta.textContent = `${strings.categories[ex.category]} · ${ex.minutes} min`;
    const desc = document.createElement('p');
    desc.textContent = ex.description[state.lang];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = strings.viewButton;
    btn.addEventListener('click', () => {
      showExercise(ex.id, { source: 'human' });
    });
    li.append(h3, meta, desc, btn);
    el.exerciseList.appendChild(li);
  }
  return matches;
}

function renderSelectedExercise() {
  const strings = t();
  if (!state.selectedExerciseId) {
    el.selectedExercise.innerHTML = `<p id="selected-empty">${strings.selectedEmpty}</p>`;
    return;
  }
  const ex = EXERCISES.find((e) => e.id === state.selectedExerciseId);
  if (!ex) return;

  el.selectedExercise.innerHTML = '';
  const title = document.createElement('h3');
  title.textContent = ex.title[state.lang];
  const meta = document.createElement('p');
  meta.className = 'exercise-meta';
  meta.textContent = `${strings.durationLabel}: ${ex.minutes} min`;
  const stepsHeading = document.createElement('p');
  stepsHeading.innerHTML = `<strong>${strings.stepsHeading}</strong>`;
  const stepsList = document.createElement('ol');
  stepsList.className = 'steps';
  for (const step of ex.steps[state.lang]) {
    const li = document.createElement('li');
    li.textContent = step;
    stepsList.appendChild(li);
  }
  const safetyNote = document.createElement('p');
  safetyNote.className = 'safety-note';
  safetyNote.textContent = `${strings.safetyNoteLabel}: ${ex.safetyNote[state.lang]}`;

  el.selectedExercise.append(title, meta, stepsHeading, stepsList, safetyNote);
}

function showExercise(exerciseId, { source }) {
  const ex = EXERCISES.find((e) => e.id === exerciseId);
  if (!ex) return null;
  state.selectedExerciseId = exerciseId;
  renderSelectedExercise();
  el.selectedHeading.focus();
  if (source === 'agent') {
    recordAgentActivity(
      'show_wellbeing_exercise',
      state.lang === 'es'
        ? `Se mostró el ejercicio "${ex.title[state.lang]}" en el panel visible.`
        : `Displayed the "${ex.title[state.lang]}" exercise in the visible panel.`
    );
  }
  return ex;
}

function renderSupportResult(urgency, { source }) {
  const strings = t();
  const options = SUPPORT_OPTIONS[urgency][state.lang];
  el.supportResult.innerHTML = '';
  const heading = document.createElement('p');
  heading.innerHTML = `<strong>${strings.urgencies[urgency]}</strong>`;
  const list = document.createElement('ul');
  for (const opt of options) {
    const li = document.createElement('li');
    li.textContent = opt;
    list.appendChild(li);
  }
  el.supportResult.append(heading, list);

  if (source === 'agent') {
    recordAgentActivity(
      'find_human_support_options',
      state.lang === 'es'
        ? `Se mostraron opciones de apoyo humano para urgencia "${strings.urgencies[urgency]}".`
        : `Displayed human support options for "${strings.urgencies[urgency]}" urgency.`
    );
  }
}

function recordAgentActivity(toolName, summary) {
  state.lastTool = { toolName, summary };
  const strings = t();
  el.agentActivity.innerHTML = '';
  const dl = document.createElement('dl');
  const dt1 = document.createElement('dt');
  dt1.textContent = strings.lastTool;
  const dd1 = document.createElement('dd');
  dd1.textContent = toolName;
  const dt2 = document.createElement('dt');
  dt2.textContent = strings.plainSummary;
  const dd2 = document.createElement('dd');
  dd2.textContent = summary;
  dl.append(dt1, dd1, dt2, dd2);
  el.agentActivity.appendChild(dl);
}

function renderWebmcpStatus(statusKind, toolNames = []) {
  const strings = t();
  el.webmcpStatus.innerHTML = '';
  if (statusKind === 'unavailable') {
    const p = document.createElement('p');
    p.className = 'status-warn';
    p.textContent = strings.statusUnavailable;
    el.webmcpStatus.appendChild(p);
  } else if (statusKind === 'error') {
    const p = document.createElement('p');
    p.className = 'status-warn';
    p.textContent = strings.statusError;
    el.webmcpStatus.appendChild(p);
  } else if (statusKind === 'connected') {
    const p = document.createElement('p');
    p.className = 'status-ok';
    p.textContent = strings.statusSuccessIntro;
    const ul = document.createElement('ul');
    for (const name of toolNames) {
      const li = document.createElement('li');
      li.textContent = name;
      ul.appendChild(li);
    }
    el.webmcpStatus.append(p, ul);
  }
}

function bindEvents() {
  el.langSelect.addEventListener('change', () => {
    state.lang = el.langSelect.value;
    applyStaticText();
    renderExerciseList();
    renderSelectedExercise();
    el.supportResult.innerHTML = `<p id="support-empty">${t().supportEmpty}</p>`;
    if (webmcpState.status) renderWebmcpStatus(webmcpState.status, webmcpState.toolNames);
  });

  el.categorySelect.addEventListener('change', renderExerciseList);
  el.maxMinutes.addEventListener('input', renderExerciseList);

  el.supportForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderSupportResult(el.urgencySelect.value, { source: 'human' });
  });
}

const webmcpState = { status: null, toolNames: [] };

// ---- WebMCP tool registration ----

function textResult(text) {
  return { content: [{ type: 'text', text }] };
}

function errorResult(text) {
  return { content: [{ type: 'text', text }], isError: true };
}

function registerWebMcpTools() {
  if (!('modelContext' in document) || typeof document.modelContext?.registerTool !== 'function') {
    webmcpState.status = 'unavailable';
    renderWebmcpStatus('unavailable');
    return;
  }

  const registeredNames = [];

  try {
    document.modelContext.registerTool({
      name: 'list_wellbeing_exercises',
      description:
        'List available general psychoeducational exercises filtered by category, maximum duration in minutes, and language. Returns non-clinical exercise metadata only.',
      inputSchema: {
        type: 'object',
        properties: {
          category: { type: 'string', enum: ['all', 'grounding', 'breathing', 'focus'] },
          max_minutes: { type: 'integer', minimum: 1, maximum: 10 },
          language: { type: 'string', enum: ['en', 'es'] },
        },
        required: ['category', 'max_minutes', 'language'],
      },
      async execute({ category, max_minutes, language }) {
        if (!['all', 'grounding', 'breathing', 'focus'].includes(category)) {
          return errorResult('Invalid category. Use one of: all, grounding, breathing, focus.');
        }
        if (!Number.isInteger(max_minutes) || max_minutes < 1 || max_minutes > 10) {
          return errorResult('Invalid max_minutes. Use an integer between 1 and 10.');
        }
        if (!['en', 'es'].includes(language)) {
          return errorResult('Invalid language. Use "en" or "es".');
        }
        state.lang = language;
        el.langSelect.value = language;
        el.categorySelect.value = category;
        el.maxMinutes.value = String(max_minutes);
        applyStaticText();
        const matches = renderExerciseList();
        if (matches.length === 0) {
          recordAgentActivity(
            'list_wellbeing_exercises',
            language === 'es'
              ? 'Se buscaron ejercicios y no se encontraron coincidencias con esos criterios.'
              : 'Searched for exercises and found no matches for those criteria.'
          );
          return textResult(
            language === 'es'
              ? 'No hay ejercicios que coincidan con esos criterios.'
              : 'No exercises match those criteria.'
          );
        }
        recordAgentActivity(
          'list_wellbeing_exercises',
          language === 'es'
            ? `Se actualizó la lista de ejercicios visibles (${matches.length} resultado(s)).`
            : `Updated the visible exercise list (${matches.length} result(s)).`
        );
        const lines = matches.map(
          (ex) =>
            `${ex.id} — ${ex.title[language]} (${ex.category}, ~${ex.minutes} min): ${ex.description[language]}`
        );
        return textResult(lines.join('\n'));
      },
    });
    registeredNames.push('list_wellbeing_exercises');

    document.modelContext.registerTool({
      name: 'show_wellbeing_exercise',
      description:
        'Display one selected psychoeducational exercise in the visible human interface and return its full instructions. Does not claim to treat any disorder or guarantee any outcome.',
      inputSchema: {
        type: 'object',
        properties: {
          exercise_id: {
            type: 'string',
            enum: EXERCISES.map((ex) => ex.id),
          },
          language: { type: 'string', enum: ['en', 'es'] },
        },
        required: ['exercise_id', 'language'],
      },
      async execute({ exercise_id, language }) {
        const validIds = EXERCISES.map((ex) => ex.id);
        if (!validIds.includes(exercise_id)) {
          return errorResult(`Invalid exercise_id. Use one of: ${validIds.join(', ')}.`);
        }
        if (!['en', 'es'].includes(language)) {
          return errorResult('Invalid language. Use "en" or "es".');
        }
        state.lang = language;
        el.langSelect.value = language;
        applyStaticText();
        renderExerciseList();
        const ex = showExercise(exercise_id, { source: 'agent' });
        if (!ex) {
          return errorResult('Exercise could not be found.');
        }
        const lines = [
          `${ex.title[language]} (${ex.minutes} min)`,
          ...ex.steps[language].map((s, i) => `${i + 1}. ${s}`),
          `${language === 'es' ? 'Nota de seguridad' : 'Safety note'}: ${ex.safetyNote[language]}`,
        ];
        return textResult(lines.join('\n'));
      },
    });
    registeredNames.push('show_wellbeing_exercise');

    document.modelContext.registerTool({
      name: 'find_human_support_options',
      description:
        'Show general human-support options based only on an urgency level explicitly chosen by the person. Does not infer urgency, contact anyone, or provide emergency response.',
      inputSchema: {
        type: 'object',
        properties: {
          urgency: { type: 'string', enum: ['routine', 'soon', 'immediate'] },
          language: { type: 'string', enum: ['en', 'es'] },
        },
        required: ['urgency', 'language'],
      },
      async execute({ urgency, language }) {
        if (!['routine', 'soon', 'immediate'].includes(urgency)) {
          return errorResult('Invalid urgency. Use one of: routine, soon, immediate.');
        }
        if (!['en', 'es'].includes(language)) {
          return errorResult('Invalid language. Use "en" or "es".');
        }
        state.lang = language;
        el.langSelect.value = language;
        applyStaticText();
        el.urgencySelect.value = urgency;
        renderSupportResult(urgency, { source: 'agent' });
        const options = SUPPORT_OPTIONS[urgency][language];
        return textResult(options.join('\n'));
      },
    });
    registeredNames.push('find_human_support_options');

    document.modelContext.registerTool({
      name: 'explain_safety_limits',
      description:
        'Explain what this demo can and cannot do: no diagnosis, no therapy, no medical advice, no emergency response, no personal data collection, no institutional connections.',
      inputSchema: {
        type: 'object',
        properties: {
          language: { type: 'string', enum: ['en', 'es'] },
        },
        required: ['language'],
      },
      async execute({ language }) {
        if (!['en', 'es'].includes(language)) {
          return errorResult('Invalid language. Use "en" or "es".');
        }
        state.lang = language;
        el.langSelect.value = language;
        applyStaticText();
        recordAgentActivity(
          'explain_safety_limits',
          language === 'es'
            ? 'Se mostró la sección de seguridad y privacidad.'
            : 'Displayed the safety and privacy section.'
        );
        document.getElementById('safety-heading').scrollIntoView({ block: 'nearest' });
        return textResult(SAFETY_LIMITS[language].join('\n'));
      },
    });
    registeredNames.push('explain_safety_limits');

    webmcpState.status = 'connected';
    webmcpState.toolNames = registeredNames;
    renderWebmcpStatus('connected', registeredNames);
  } catch (err) {
    webmcpState.status = 'error';
    renderWebmcpStatus('error');
  }
}

// ---- init ----
applyStaticText();
renderExerciseList();
renderSelectedExercise();
bindEvents();
registerWebMcpTools();
