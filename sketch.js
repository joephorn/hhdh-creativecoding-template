const PARAM_REGISTRY = new Map();
const PARAM_VALUES = {};

function toNumber(value, fallback) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function formatValue(value) {
  if (Number.isFinite(value)) {
    return Number.isInteger(value) ? String(value) : value.toFixed(2);
  }
  if (value == null) return '';
  return String(value);
}

function ensureOutputElement(key, inputEl) {
  if (!key || !inputEl || typeof document === 'undefined') return null;
  const existing = document.getElementById(`${key}Out`);
  if (existing) return existing;

  const outputEl = document.createElement('output');
  outputEl.id = `${key}Out`;
  inputEl.insertAdjacentText('afterend', ' ');
  inputEl.insertAdjacentElement('afterend', outputEl);
  return outputEl;
}

function updateOutput(param, value) {
  if (!param.outputEl) return;
  const text = formatValue(value);
  param.outputEl.textContent = text;
  param.outputEl.value = text;
}

function updateGlobalParam(param, value) {
  if (typeof window === 'undefined') return;
  if (!param || !param.key) return;
  window[param.key] = value;
}

function syncParamFromElement(param) {
  const value = param.isNumeric
    ? toNumber(param.el.value, param.defaultValue)
    : String(param.el.value ?? param.defaultValue ?? '');
  PARAM_VALUES[param.key] = value;
  updateGlobalParam(param, value);
  updateOutput(param, value);
  requestRedraw();
}

function registerParams(root = document) {
  PARAM_REGISTRY.clear();

  const inputs = root.querySelectorAll('input[id]');
  inputs.forEach((el) => {
    const key = (el.id || '').trim();
    if (!key) return;

    const isNumeric = el.type === 'range' || el.type === 'number';
    const defaultValue = isNumeric ? toNumber(el.value, 0) : String(el.value || '');
    const min = toNumber(el.min, Number.NEGATIVE_INFINITY);
    const max = toNumber(el.max, Number.POSITIVE_INFINITY);
    const step = toNumber(el.step, 0);
    const outputEl = ensureOutputElement(key, el);
    const param = {
      key,
      el,
      defaultValue,
      min,
      max,
      step,
      isNumeric,
      outputEl,
    };

    PARAM_REGISTRY.set(key, param);

    el.addEventListener('input', () => syncParamFromElement(param));
    el.addEventListener('change', () => syncParamFromElement(param));
    syncParamFromElement(param);
  });

  if (typeof window !== 'undefined') {
    window.PARAMS = {
      registry: PARAM_REGISTRY,
      values: PARAM_VALUES,
      get: getParameters,
      set: setParamValue,
    };
  }
}

function clampToStep(value, param) {
  if (!Number.isFinite(param.step) || param.step <= 0) return value;
  if (!Number.isFinite(param.min)) return value;
  const steps = Math.round((value - param.min) / param.step);
  const snapped = param.min + steps * param.step;
  return Math.round(snapped * 1000) / 1000;
}

function setParamValue(key, value) {
  const param = PARAM_REGISTRY.get(key);
  if (!param) return;

  let next;
  if (param.isNumeric) {
    next = toNumber(value, param.defaultValue);
    if (Number.isFinite(param.min)) next = Math.max(param.min, next);
    if (Number.isFinite(param.max)) next = Math.min(param.max, next);
    next = clampToStep(next, param);
  } else {
    next = String(value ?? param.defaultValue ?? '');
  }

  param.el.value = String(next);
  syncParamFromElement(param);
}

function getParameters() {
  return { ...PARAM_VALUES };
}

function buildKeyframeCode() {
  const params = getParameters();
  return Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join(';');
}

function applyKeyframeCode(code) {
  if (!code) return false;
  const parts = String(code)
    .split(/[;,]\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (!parts.length) return false;

  parts.forEach((part) => {
    const [key, raw] = part.split('=');
    if (!key) return;
    const k = key.trim();
    const param = PARAM_REGISTRY.get(k);
    if (param && !param.isNumeric) {
      setParamValue(k, raw);
    } else {
      setParamValue(k, Number(raw));
    }
  });

  return true;
}

function randomValueForParam(param) {
  const min = Number.isFinite(param.min) ? param.min : 0;
  const max = Number.isFinite(param.max) ? param.max : 1;
  if (!Number.isFinite(param.step) || param.step <= 0) {
    return min + Math.random() * (max - min);
  }
  const steps = Math.round((max - min) / param.step);
  const idx = Math.floor(Math.random() * (steps + 1));
  return min + idx * param.step;
}

function randomize() {
  PARAM_REGISTRY.forEach((param) => {
    if (!param.isNumeric) return;
    const value = randomValueForParam(param);
    setParamValue(param.key, value);
  });
}

function resetDefaults() {
  PARAM_REGISTRY.forEach((param) => {
    setParamValue(param.key, param.defaultValue);
  });
}

function exportPNG() {
  if (typeof saveCanvas === 'function') {
    saveCanvas('export', 'png');
  }
}

function requestRedraw() {
  if (typeof redraw === 'function') redraw();
}

function setup() {
  const wrap = document.getElementById('canvasWrap');
  const canvas = createCanvas(720, 420);
  if (wrap && canvas) canvas.parent('canvasWrap');

  noLoop();
  registerParams();

  const resetButton = document.getElementById('reset');
  if (resetButton) resetButton.addEventListener('click', resetDefaults);

  const randomButton = document.getElementById('randomize');
  if (randomButton) randomButton.addEventListener('click', randomize);

  const exportButton = document.getElementById('exportPng');
  if (exportButton) exportButton.addEventListener('click', exportPNG);

  requestRedraw();
}

function draw() {
  background(bg);
  fill(fg);
  noStroke();
  
  ellipse(width / 2, height / 2, size, size);
}
