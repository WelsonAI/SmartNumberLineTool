"use strict";

const SVG_NS = "http://www.w3.org/2000/svg";
const LINE_LEFT = 82;
const LINE_RIGHT = 918;
const LINE_Y = 188;

const ui = {
  controls: document.getElementById("controlsHost"),
  modeTitle: document.getElementById("modeTitle"),
  prompt: document.getElementById("promptText"),
  display: document.getElementById("numberDisplay"),
  line: document.getElementById("numberLine"),
  lineLayer: document.getElementById("lineLayer"),
  answer: document.getElementById("answerArea"),
  feedback: document.getElementById("feedback"),
  newQuestion: document.getElementById("newQuestionBtn"),
  speak: document.getElementById("speakBtn")
};

const messages = {
  bm: {
    appTitle: "Garis Nombor Pintar",
    appSubtitle: "Teroka nombor dengan melihat, bergerak dan mencuba.",
    modeExplore: "Teroka", modeCompare: "Banding", modeRounding: "Bundar", modePattern: "Pola",
    controls: "Kawalan", yourTask: "Tugasan kamu", newQuestion: "Soalan baharu",
    stepLook: "Lihat kedudukan", stepThink: "Fikir hubungannya", stepAnswer: "Beri jawapan",
    titleExplore: "Teroka nombor", titleCompare: "Banding nombor", titleRounding: "Bundar nombor", titlePattern: "Pola nombor",
    promptExplore: "Pilih satu nombor pada garis nombor.",
    promptCompare: (a, b) => `Bandingkan ${a} dengan ${b}.`,
    promptRounding: (n, base) => `Bundarkan ${n} kepada ${base === 10 ? "puluh" : base === 100 ? "ratus" : "ribu"} terdekat.`,
    promptPattern: "Apakah nombor yang hilang dalam pola ini?",
    range: "Julat nombor", number: "Nombor", stepSize: "Saiz langkah", firstNumber: "Nombor pertama", secondNumber: "Nombor kedua",
    roundingTo: "Bundar kepada", nearest10: "Puluh terdekat", nearest100: "Ratus terdekat", nearest1000: "Ribu terdekat",
    start: "Nombor mula", difference: "Perbezaan", direction: "Arah pola", increasing: "Menaik", decreasing: "Menurun",
    selected: "Nombor dipilih", clickHint: "Klik atau sentuh garis nombor untuk memilih nombor.",
    compareHint: "Pilih simbol yang betul.", roundHint: "Pilih nombor bundar yang betul.", patternHint: "Taip nombor yang hilang.",
    check: "Semak", correct: "Betul!", tryAgain: "Cuba lagi. Lihat kedudukan nombor pada garis.",
    compareCorrect: (a, sign, b) => `Betul! ${a} ${sign} ${b}.`,
    roundCorrect: (n, answer) => `Betul! ${n} dibundarkan menjadi ${answer}.`,
    roundExplain: (low, high) => `Bandingkan jarak kepada ${low} dan ${high}.`,
    patternCorrect: (answer) => `Betul! Nombor yang hilang ialah ${answer}.`,
    enterAnswer: "Masukkan jawapan", samePlace: "Kedua-dua nombor berada pada kedudukan yang sama.",
    markerA: "Nombor A", markerB: "Nombor B", midpoint: "Titik tengah", missing: "Hilang"
  },
  zh: {
    appTitle: "智能数轴", appSubtitle: "通过观察、移动和尝试来探索数字。",
    modeExplore: "探索", modeCompare: "比较", modeRounding: "取整", modePattern: "规律",
    controls: "控制", yourTask: "你的任务", newQuestion: "新题目",
    stepLook: "观察位置", stepThink: "思考关系", stepAnswer: "作答",
    titleExplore: "探索数字", titleCompare: "比较数字", titleRounding: "数字取整", titlePattern: "数字规律",
    promptExplore: "在数轴上选择一个数字。", promptCompare: (a, b) => `比较 ${a} 和 ${b}。`,
    promptRounding: (n, base) => `把 ${n} 取整到最接近的${base === 10 ? "十" : base === 100 ? "百" : "千"}。`,
    promptPattern: "这个规律中缺少什么数字？",
    range: "数字范围", number: "数字", stepSize: "每次移动", firstNumber: "第一个数", secondNumber: "第二个数",
    roundingTo: "取整单位", nearest10: "最接近的十", nearest100: "最接近的百", nearest1000: "最接近的千",
    start: "开始数字", difference: "相差", direction: "规律方向", increasing: "递增", decreasing: "递减",
    selected: "已选择", clickHint: "点击或触摸数轴来选择数字。", compareHint: "选择正确的符号。",
    roundHint: "选择正确的整十、整百或整千数。", patternHint: "输入缺少的数字。", check: "检查",
    correct: "答对了！", tryAgain: "再试一次，看看数字在数轴上的位置。",
    compareCorrect: (a, sign, b) => `答对了！${a} ${sign} ${b}。`, roundCorrect: (n, answer) => `答对了！${n} 取整后是 ${answer}。`,
    roundExplain: (low, high) => `比较它到 ${low} 和 ${high} 的距离。`, patternCorrect: (answer) => `答对了！缺少的数字是 ${answer}。`,
    enterAnswer: "输入答案", samePlace: "两个数字在相同的位置。", markerA: "数字 A", markerB: "数字 B", midpoint: "中点", missing: "缺少"
  },
  en: {
    appTitle: "Smart Number Line", appSubtitle: "Explore numbers by looking, moving, and trying.",
    modeExplore: "Explore", modeCompare: "Compare", modeRounding: "Round", modePattern: "Pattern",
    controls: "Controls", yourTask: "Your task", newQuestion: "New question",
    stepLook: "Look at the position", stepThink: "Think about the relationship", stepAnswer: "Give your answer",
    titleExplore: "Explore numbers", titleCompare: "Compare numbers", titleRounding: "Round numbers", titlePattern: "Number patterns",
    promptExplore: "Choose a number on the number line.", promptCompare: (a, b) => `Compare ${a} with ${b}.`,
    promptRounding: (n, base) => `Round ${n} to the nearest ${base}.`, promptPattern: "What number is missing from this pattern?",
    range: "Number range", number: "Number", stepSize: "Step size", firstNumber: "First number", secondNumber: "Second number",
    roundingTo: "Round to", nearest10: "Nearest 10", nearest100: "Nearest 100", nearest1000: "Nearest 1,000",
    start: "Starting number", difference: "Difference", direction: "Pattern direction", increasing: "Increasing", decreasing: "Decreasing",
    selected: "Selected number", clickHint: "Click or touch the number line to choose a number.", compareHint: "Choose the correct symbol.",
    roundHint: "Choose the correct rounded number.", patternHint: "Type the missing number.", check: "Check",
    correct: "Correct!", tryAgain: "Try again. Look at the positions on the number line.",
    compareCorrect: (a, sign, b) => `Correct! ${a} ${sign} ${b}.`, roundCorrect: (n, answer) => `Correct! ${n} rounds to ${answer}.`,
    roundExplain: (low, high) => `Compare its distance from ${low} and ${high}.`, patternCorrect: (answer) => `Correct! The missing number is ${answer}.`,
    enterAnswer: "Enter your answer", samePlace: "Both numbers are at the same position.", markerA: "Number A", markerB: "Number B", midpoint: "Midpoint", missing: "Missing"
  }
};

const state = {
  lang: "bm",
  mode: "explore",
  explore: { range: 100, value: 37, step: 1 },
  compare: { a: 38, b: 64 },
  rounding: { value: 237, base: 10 },
  pattern: { start: 120, step: 5, direction: 1, missingIndex: 3 }
};

function t(key, ...args) {
  const value = messages[state.lang][key];
  return typeof value === "function" ? value(...args) : value;
}

function formatNumber(value) {
  const locale = state.lang === "zh" ? "zh-CN" : state.lang === "en" ? "en-US" : "ms-MY";
  return Number(value).toLocaleString(locale);
}

function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function svgElement(name, attributes = {}, text = "") {
  const element = document.createElementNS(SVG_NS, name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  if (text !== "") element.textContent = text;
  return element;
}

function clearFeedback(message) {
  ui.feedback.className = "feedback";
  ui.feedback.textContent = message;
}

function showFeedback(message, success) {
  ui.feedback.className = `feedback ${success ? "success" : "error"}`;
  ui.feedback.textContent = message;
}

function setStaticTranslations() {
  document.documentElement.lang = state.lang === "zh" ? "zh-Hans" : state.lang === "en" ? "en" : "ms";
  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll(".language-btn").forEach(button => {
    const active = button.dataset.lang === state.lang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function numberToEnglish(n) {
  const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  if (n < 20) return ones[n];
  if (n < 100) return `${tens[Math.floor(n / 10)]}${n % 10 ? `-${ones[n % 10]}` : ""}`;
  if (n < 1000) return `${ones[Math.floor(n / 100)]} hundred${n % 100 ? ` ${numberToEnglish(n % 100)}` : ""}`;
  if (n < 10000) return `${numberToEnglish(Math.floor(n / 1000))} thousand${n % 1000 ? ` ${numberToEnglish(n % 1000)}` : ""}`;
  return n === 10000 ? "ten thousand" : String(n);
}

function numberToMalay(n) {
  const ones = ["sifar", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "lapan", "sembilan"];
  if (n < 10) return ones[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${ones[n - 10]} belas`;
  if (n < 100) return `${ones[Math.floor(n / 10)]} puluh${n % 10 ? ` ${ones[n % 10]}` : ""}`;
  if (n < 200) return `seratus${n % 100 ? ` ${numberToMalay(n % 100)}` : ""}`;
  if (n < 1000) return `${ones[Math.floor(n / 100)]} ratus${n % 100 ? ` ${numberToMalay(n % 100)}` : ""}`;
  if (n < 2000) return `seribu${n % 1000 ? ` ${numberToMalay(n % 1000)}` : ""}`;
  if (n < 10000) return `${ones[Math.floor(n / 1000)]} ribu${n % 1000 ? ` ${numberToMalay(n % 1000)}` : ""}`;
  return n === 10000 ? "sepuluh ribu" : String(n);
}

function numberToChinese(n) {
  if (n === 0) return "零";
  if (n === 10000) return "一万";
  const digits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const units = ["", "十", "百", "千"];
  const chars = String(n).split("").map(Number);
  let output = "";
  let zeroPending = false;
  chars.forEach((digit, index) => {
    const place = chars.length - index - 1;
    if (digit === 0) {
      if (output && chars.slice(index + 1).some(value => value !== 0)) zeroPending = true;
      return;
    }
    if (zeroPending) { output += "零"; zeroPending = false; }
    if (!(digit === 1 && place === 1 && output === "")) output += digits[digit];
    output += units[place];
  });
  return output;
}

function numberWords(n) {
  return state.lang === "zh" ? numberToChinese(n) : state.lang === "en" ? numberToEnglish(n) : numberToMalay(n);
}

function niceStep(span) {
  if (span <= 0) return 1;
  const rough = span / 8;
  const power = 10 ** Math.floor(Math.log10(rough));
  const normalized = rough / power;
  const factor = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return factor * power;
}

function niceBounds(values) {
  const smallest = Math.min(...values);
  const largest = Math.max(...values);
  const span = Math.max(1, largest - smallest);
  const step = niceStep(span);
  let min = Math.floor((smallest - step) / step) * step;
  let max = Math.ceil((largest + step) / step) * step;
  min = Math.max(0, min);
  if (max === min) max = min + step * 2;
  return { min, max, step };
}

function xFor(value, min, max) {
  return LINE_LEFT + ((value - min) / (max - min)) * (LINE_RIGHT - LINE_LEFT);
}

function drawAxis(min, max, tickStep, midpoint = null) {
  ui.lineLayer.replaceChildren();
  ui.lineLayer.append(
    svgElement("line", { x1: LINE_LEFT, y1: LINE_Y, x2: LINE_RIGHT, y2: LINE_Y, class: "axis" }),
    svgElement("path", { d: `M ${LINE_LEFT} ${LINE_Y} l 18 -11 v 22 z`, class: "axis-arrow" }),
    svgElement("path", { d: `M ${LINE_RIGHT} ${LINE_Y} l -18 -11 v 22 z`, class: "axis-arrow" })
  );

  if (midpoint !== null) {
    const middleX = xFor(midpoint, min, max);
    ui.lineLayer.append(
      svgElement("line", { x1: middleX, y1: 78, x2: middleX, y2: 245, class: "midpoint-line" }),
      svgElement("text", { x: middleX, y: 270, class: "minor-label" }, `${t("midpoint")} ${formatNumber(midpoint)}`)
    );
  }

  const count = Math.round((max - min) / tickStep);
  for (let i = 0; i <= count; i += 1) {
    const value = min + tickStep * i;
    const x = xFor(value, min, max);
    const major = i === 0 || i === count || i % Math.max(1, Math.round(count / 5)) === 0;
    ui.lineLayer.append(svgElement("line", {
      x1: x, x2: x, y1: major ? LINE_Y - 19 : LINE_Y - 12, y2: major ? LINE_Y + 19 : LINE_Y + 12,
      class: major ? "tick major" : "tick"
    }));
    if (major || count <= 10) {
      ui.lineLayer.append(svgElement("text", { x, y: 232, class: major ? "tick-label" : "minor-label" }, formatNumber(value)));
    }
  }
}

function drawMarker(value, min, max, options = {}) {
  const x = xFor(value, min, max);
  const y = options.y || 128;
  const color = options.color || "#176b58";
  ui.lineLayer.append(
    svgElement("line", { x1: x, y1: y + 24, x2: x, y2: LINE_Y - 8, class: "marker-line", stroke: color }),
    svgElement("circle", { cx: x, cy: y, r: 22, class: options.question ? "question-marker" : "marker-circle", fill: color }),
    svgElement("text", { x, y: y + 7, fill: options.question ? "#173b35" : "#ffffff", "font-size": 22, "font-weight": 900, "text-anchor": "middle" }, options.question ? "?" : options.symbol || "●"),
    svgElement("text", { x, y: y - 35, class: "marker-label" }, options.label || formatNumber(value))
  );
  if (options.caption) ui.lineLayer.append(svgElement("text", { x, y: y - 61, class: "marker-caption" }, options.caption));
}

function controlsForExplore() {
  return `
    <div class="field">
      <label for="rangeInput">${t("range")}</label>
      <select id="rangeInput">
        <option value="100" ${state.explore.range === 100 ? "selected" : ""}>0–100</option>
        <option value="1000" ${state.explore.range === 1000 ? "selected" : ""}>0–1,000</option>
        <option value="10000" ${state.explore.range === 10000 ? "selected" : ""}>0–10,000</option>
      </select>
    </div>
    <div class="field">
      <label for="exploreValue">${t("number")}</label>
      <input id="exploreValue" type="number" min="0" max="${state.explore.range}" value="${state.explore.value}">
    </div>
    <div class="field">
      <label for="stepInput">${t("stepSize")}</label>
      <div class="stepper">
        <button type="button" id="stepDown" aria-label="Decrease">−</button>
        <select id="stepInput">
          ${[1, 5, 10, 100].map(step => `<option value="${step}" ${state.explore.step === step ? "selected" : ""}>${formatNumber(step)}</option>`).join("")}
        </select>
        <button type="button" id="stepUp" aria-label="Increase">+</button>
      </div>
    </div>`;
}

function controlsForCompare() {
  return `
    <div class="field-row">
      <div class="field"><label for="compareA">${t("firstNumber")}</label><input id="compareA" type="number" min="0" max="10000" value="${state.compare.a}"></div>
      <div class="field"><label for="compareB">${t("secondNumber")}</label><input id="compareB" type="number" min="0" max="10000" value="${state.compare.b}"></div>
    </div>`;
}

function controlsForRounding() {
  return `
    <div class="field"><label for="roundValue">${t("number")}</label><input id="roundValue" type="number" min="0" max="9999" value="${state.rounding.value}"></div>
    <div class="field"><label for="roundBase">${t("roundingTo")}</label>
      <select id="roundBase">
        <option value="10" ${state.rounding.base === 10 ? "selected" : ""}>${t("nearest10")}</option>
        <option value="100" ${state.rounding.base === 100 ? "selected" : ""}>${t("nearest100")}</option>
        <option value="1000" ${state.rounding.base === 1000 ? "selected" : ""}>${t("nearest1000")}</option>
      </select>
    </div>`;
}

function controlsForPattern() {
  return `
    <div class="field-row">
      <div class="field"><label for="patternStart">${t("start")}</label><input id="patternStart" type="number" min="0" max="10000" value="${state.pattern.start}"></div>
      <div class="field"><label for="patternStep">${t("difference")}</label><input id="patternStep" type="number" min="1" max="1000" value="${state.pattern.step}"></div>
    </div>
    <div class="field"><label for="patternDirection">${t("direction")}</label>
      <select id="patternDirection"><option value="1" ${state.pattern.direction === 1 ? "selected" : ""}>${t("increasing")}</option><option value="-1" ${state.pattern.direction === -1 ? "selected" : ""}>${t("decreasing")}</option></select>
    </div>`;
}

function bindControls() {
  if (state.mode === "explore") {
    const rangeInput = document.getElementById("rangeInput");
    const valueInput = document.getElementById("exploreValue");
    const stepInput = document.getElementById("stepInput");
    rangeInput.addEventListener("change", () => {
      state.explore.range = Number(rangeInput.value);
      state.explore.value = clamp(state.explore.value, 0, state.explore.range);
      renderMode();
    });
    valueInput.addEventListener("input", () => {
      if (valueInput.value === "") return;
      state.explore.value = clamp(Math.round(Number(valueInput.value)), 0, state.explore.range);
      renderActivity();
    });
    stepInput.addEventListener("change", () => { state.explore.step = Number(stepInput.value); });
    document.getElementById("stepDown").addEventListener("click", () => {
      state.explore.value = clamp(state.explore.value - state.explore.step, 0, state.explore.range);
      valueInput.value = state.explore.value;
      renderActivity();
    });
    document.getElementById("stepUp").addEventListener("click", () => {
      state.explore.value = clamp(state.explore.value + state.explore.step, 0, state.explore.range);
      valueInput.value = state.explore.value;
      renderActivity();
    });
  }

  if (state.mode === "compare") {
    ["A", "B"].forEach(letter => {
      const input = document.getElementById(`compare${letter}`);
      input.addEventListener("input", () => {
        if (input.value === "") return;
        state.compare[letter.toLowerCase()] = clamp(Math.round(Number(input.value)), 0, 10000);
        renderActivity();
      });
    });
  }

  if (state.mode === "rounding") {
    const valueInput = document.getElementById("roundValue");
    const baseInput = document.getElementById("roundBase");
    valueInput.addEventListener("input", () => {
      if (valueInput.value === "") return;
      state.rounding.value = clamp(Math.round(Number(valueInput.value)), 0, 9999);
      renderActivity();
    });
    baseInput.addEventListener("change", () => { state.rounding.base = Number(baseInput.value); renderActivity(); });
  }

  if (state.mode === "pattern") {
    const startInput = document.getElementById("patternStart");
    const stepInput = document.getElementById("patternStep");
    const directionInput = document.getElementById("patternDirection");
    const update = () => {
      if (startInput.value !== "") state.pattern.start = clamp(Math.round(Number(startInput.value)), 0, 10000);
      if (stepInput.value !== "") state.pattern.step = clamp(Math.round(Number(stepInput.value)), 1, 1000);
      state.pattern.direction = Number(directionInput.value);
      if (state.pattern.direction < 0 && state.pattern.start < state.pattern.step * 4) {
        state.pattern.start = state.pattern.step * 4;
        startInput.value = state.pattern.start;
      }
      renderActivity();
    };
    startInput.addEventListener("input", update);
    stepInput.addEventListener("input", update);
    directionInput.addEventListener("change", update);
  }
}

function renderMode() {
  const titleKeys = { explore: "titleExplore", compare: "titleCompare", rounding: "titleRounding", pattern: "titlePattern" };
  const controls = { explore: controlsForExplore, compare: controlsForCompare, rounding: controlsForRounding, pattern: controlsForPattern };
  ui.modeTitle.textContent = t(titleKeys[state.mode]);
  ui.controls.innerHTML = controls[state.mode]();
  ui.line.classList.toggle("explore-line", state.mode === "explore");
  bindControls();
  renderActivity();
}

function renderExplore() {
  const { range, value } = state.explore;
  ui.prompt.textContent = t("promptExplore");
  ui.display.innerHTML = `<span class="big-number">${formatNumber(value)}</span><span class="number-words">${numberWords(value)}</span>`;
  drawAxis(0, range, range / 10);
  drawMarker(value, 0, range, { label: formatNumber(value) });
  ui.answer.innerHTML = "";
  clearFeedback(t("clickHint"));
}

function renderCompare() {
  const { a, b } = state.compare;
  const bounds = niceBounds([a, b]);
  ui.prompt.textContent = t("promptCompare", formatNumber(a), formatNumber(b));
  ui.display.innerHTML = `<span class="big-number">${formatNumber(a)} &nbsp; ? &nbsp; ${formatNumber(b)}</span>`;
  drawAxis(bounds.min, bounds.max, bounds.step);
  const same = a === b;
  drawMarker(a, bounds.min, bounds.max, { color: "#176b58", label: formatNumber(a), caption: t("markerA"), y: same ? 105 : 128, symbol: "A" });
  drawMarker(b, bounds.min, bounds.max, { color: "#3579b9", label: formatNumber(b), caption: t("markerB"), y: same ? 270 : 128, symbol: "B" });
  ui.answer.innerHTML = ["<", "=", ">"].map(sign => `<button class="choice-btn" type="button" data-answer="${sign}">${sign}</button>`).join("");
  ui.answer.querySelectorAll("[data-answer]").forEach(button => button.addEventListener("click", () => checkCompare(button.dataset.answer)));
  clearFeedback(same ? t("samePlace") : t("compareHint"));
}

function checkCompare(answer) {
  const { a, b } = state.compare;
  const correct = a < b ? "<" : a > b ? ">" : "=";
  showFeedback(answer === correct ? t("compareCorrect", formatNumber(a), correct, formatNumber(b)) : t("tryAgain"), answer === correct);
}

function roundingDetails() {
  const { value, base } = state.rounding;
  if (value % base === 0) return { lower: Math.max(0, value - base), upper: value + base, midpoint: null, correct: value, exact: true };
  const lower = Math.floor(value / base) * base;
  const upper = lower + base;
  return { lower, upper, midpoint: lower + base / 2, correct: Math.round(value / base) * base, exact: false };
}

function renderRounding() {
  const { value, base } = state.rounding;
  const details = roundingDetails();
  ui.prompt.textContent = t("promptRounding", formatNumber(value), base);
  ui.display.innerHTML = `<span class="big-number">${formatNumber(value)} → ?</span>`;
  const tickStep = details.exact ? base / 5 : base / 10;
  drawAxis(details.lower, details.upper, tickStep, details.midpoint);
  drawMarker(value, details.lower, details.upper, { color: "#d48512", label: formatNumber(value), symbol: "●" });
  const choices = details.exact ? [details.lower, value, details.upper] : [details.lower, details.upper];
  ui.answer.innerHTML = choices.map(choice => `<button class="choice-btn" type="button" data-answer="${choice}">${formatNumber(choice)}</button>`).join("");
  ui.answer.querySelectorAll("[data-answer]").forEach(button => button.addEventListener("click", () => checkRounding(Number(button.dataset.answer))));
  clearFeedback(t("roundHint"));
}

function checkRounding(answer) {
  const details = roundingDetails();
  const correct = answer === details.correct;
  const message = correct
    ? t("roundCorrect", formatNumber(state.rounding.value), formatNumber(details.correct))
    : `${t("tryAgain")} ${t("roundExplain", formatNumber(details.lower), formatNumber(details.upper))}`;
  showFeedback(message, correct);
}

function patternValues() {
  const { start, step, direction } = state.pattern;
  return Array.from({ length: 5 }, (_, index) => start + step * direction * index);
}

function renderPattern() {
  const values = patternValues();
  const answer = values[state.pattern.missingIndex];
  const bounds = niceBounds(values);
  ui.prompt.textContent = t("promptPattern");
  ui.display.innerHTML = values.map((value, index) => `<span class="choice-btn">${index === state.pattern.missingIndex ? "?" : formatNumber(value)}</span>`).join("");
  drawAxis(bounds.min, bounds.max, bounds.step);
  values.forEach((value, index) => {
    drawMarker(value, bounds.min, bounds.max, {
      color: index === state.pattern.missingIndex ? "#ffd568" : "#176b58",
      label: index === state.pattern.missingIndex ? t("missing") : formatNumber(value),
      question: index === state.pattern.missingIndex,
      y: index % 2 === 0 ? 124 : 112
    });
  });
  ui.answer.innerHTML = `<input class="answer-input" id="patternAnswer" type="number" aria-label="${t("enterAnswer")}" placeholder="${t("enterAnswer")}"><button class="primary-btn" id="checkPattern" type="button">${t("check")}</button>`;
  const answerInput = document.getElementById("patternAnswer");
  const check = () => {
    if (answerInput.value === "") return;
    const correct = Number(answerInput.value) === answer;
    showFeedback(correct ? t("patternCorrect", formatNumber(answer)) : t("tryAgain"), correct);
  };
  document.getElementById("checkPattern").addEventListener("click", check);
  answerInput.addEventListener("keydown", event => { if (event.key === "Enter") check(); });
  clearFeedback(t("patternHint"));
}

function renderActivity() {
  ({ explore: renderExplore, compare: renderCompare, rounding: renderRounding, pattern: renderPattern })[state.mode]();
}

function makeNewQuestion() {
  if (state.mode === "explore") {
    state.explore.value = randomInt(0, state.explore.range);
  } else if (state.mode === "compare") {
    const limit = [100, 1000, 10000][randomInt(0, 2)];
    state.compare.a = randomInt(0, limit);
    state.compare.b = Math.random() < .15 ? state.compare.a : randomInt(0, limit);
  } else if (state.mode === "rounding") {
    const base = [10, 100, 1000][randomInt(0, 2)];
    const maximum = base === 1000 ? 9999 : base * 20;
    let value = randomInt(base, maximum);
    if (value % base === 0) value = Math.min(maximum, value + randomInt(1, Math.max(1, base - 1)));
    state.rounding = { value, base };
  } else {
    const step = [1, 2, 5, 10, 25, 50, 100][randomInt(0, 6)];
    const direction = Math.random() < .5 ? 1 : -1;
    const start = direction === 1 ? randomInt(0, Math.max(20, 1000 - step * 4)) : randomInt(step * 4, Math.max(step * 4, 1000));
    state.pattern = { start, step, direction, missingIndex: randomInt(1, 3) };
  }
  renderMode();
}

document.querySelectorAll(".mode-tab").forEach(button => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    document.querySelectorAll(".mode-tab").forEach(tab => {
      const active = tab === button;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    renderMode();
  });
});

document.querySelectorAll(".language-btn").forEach(button => {
  button.addEventListener("click", () => {
    state.lang = button.dataset.lang;
    setStaticTranslations();
    renderMode();
  });
});

ui.line.addEventListener("pointerdown", event => {
  if (state.mode !== "explore") return;
  const rectangle = ui.line.getBoundingClientRect();
  const viewX = ((event.clientX - rectangle.left) / rectangle.width) * 1000;
  const ratio = clamp((viewX - LINE_LEFT) / (LINE_RIGHT - LINE_LEFT), 0, 1);
  state.explore.value = clamp(Math.round((ratio * state.explore.range) / state.explore.step) * state.explore.step, 0, state.explore.range);
  const input = document.getElementById("exploreValue");
  if (input) input.value = state.explore.value;
  renderActivity();
});

ui.newQuestion.addEventListener("click", makeNewQuestion);
ui.speak.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(`${ui.prompt.textContent} ${ui.display.textContent}`);
  utterance.lang = state.lang === "zh" ? "zh-CN" : state.lang === "en" ? "en-US" : "ms-MY";
  window.speechSynthesis.speak(utterance);
});

setStaticTranslations();
renderMode();
