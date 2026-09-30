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
  speak: document.getElementById("speakBtn"),
  sound: document.getElementById("soundToggle"),
  celebration: document.getElementById("celebrationLayer")
};

const messages = {
  bm: {
    appTitle: "Jom Main Garis Nombor!",
    appSubtitle: "Lihat, tekan dan cari jawapan.",
    modeExplore: "Kenal Nombor", modeCompare: "Mana Lebih Besar?", modeRounding: "Nombor Terdekat", modePattern: "Cari Pola",
    controls: "Pilih nombor", yourTask: "Mari cuba!", newQuestion: "Cuba soalan lain",
    stepLook: "Lihat garis nombor", stepThink: "Pilih jawapan", stepAnswer: "Semak terus",
    speakAnswer: "Dengar jawapan", speakNumber: "Dengar nombor", soundOn: "Bunyi: Buka", soundOff: "Bunyi: Tutup",
    titleExplore: "Kenal nombor", titleCompare: "Mana lebih besar?", titleRounding: "Cari nombor terdekat", titlePattern: "Cari pola",
    promptExplore: "Tekan pada garis nombor untuk memilih nombor.",
    promptCompare: (a, b) => `Lihat ${a} dan ${b}. Yang mana lebih besar?`,
    promptRounding: (n, base) => `${n} lebih dekat kepada ${base === 10 ? "puluh" : base === 100 ? "ratus" : "ribu"} yang mana?`,
    promptPattern: "Nombor apa yang hilang?",
    range: "Julat nombor", number: "Nombor", stepSize: "Saiz langkah", firstNumber: "Nombor pertama", secondNumber: "Nombor kedua",
    roundingTo: "Bundar kepada", nearest10: "Puluh terdekat", nearest100: "Ratus terdekat", nearest1000: "Ribu terdekat",
    start: "Nombor mula", difference: "Perbezaan", direction: "Arah pola", increasing: "Menaik", decreasing: "Menurun",
    selected: "Nombor dipilih", clickHint: "Tekan garis atau butang + dan −.",
    compareHint: "Pilih ‘lebih besar’ atau ‘lebih kecil’.", roundHint: "Pilih jawapan yang paling dekat.", patternHint: "Taip nombor yang hilang.",
    check: "Semak", correct: "Betul!", tryAgain: "Cuba lagi. Lihat kedudukan nombor pada garis.",
    lessThan: "lebih kecil", greaterThan: "lebih besar", differentNumbers: "Pilih dua nombor yang berlainan.",
    compareCorrect: (a, relation, b) => `Betul! ${a} ${relation} daripada ${b}.`,
    roundCorrect: (n, answer) => `Betul! ${n} dibundarkan menjadi ${answer}.`,
    roundExplain: (low, high) => `Bandingkan jarak kepada ${low} dan ${high}.`,
    patternCorrect: (answer) => `Betul! Nombor yang hilang ialah ${answer}.`,
    enterAnswer: "Masukkan jawapan", samePlace: "Kedua-dua nombor berada pada kedudukan yang sama.",
    markerA: "Nombor A", markerB: "Nombor B", midpoint: "Titik tengah", missing: "Hilang"
  },
  zh: {
    appTitle: "一起玩数轴！", appSubtitle: "看一看、点一点、找答案。",
    modeExplore: "认识数字", modeCompare: "谁比较大？", modeRounding: "找最近的数", modePattern: "找规律",
    controls: "选择数字", yourTask: "来试一试！", newQuestion: "换一题",
    stepLook: "看数轴", stepThink: "选答案", stepAnswer: "马上检查",
    speakAnswer: "听答案", speakNumber: "听数字", soundOn: "声音：开", soundOff: "声音：关",
    titleExplore: "认识数字", titleCompare: "谁比较大？", titleRounding: "找最近的数", titlePattern: "找规律",
    promptExplore: "点击数轴，选择一个数字。", promptCompare: (a, b) => `看看 ${a} 和 ${b}，哪一个比较大？`,
    promptRounding: (n, base) => `${n} 比较靠近哪一个整${base === 10 ? "十" : base === 100 ? "百" : "千"}数？`,
    promptPattern: "少了哪一个数字？",
    range: "数字范围", number: "数字", stepSize: "每次移动", firstNumber: "第一个数", secondNumber: "第二个数",
    roundingTo: "取整单位", nearest10: "最接近的十", nearest100: "最接近的百", nearest1000: "最接近的千",
    start: "开始数字", difference: "相差", direction: "规律方向", increasing: "递增", decreasing: "递减",
    selected: "已选择", clickHint: "点击数轴，或使用 + 和 −。", compareHint: "选择“大过”或“小过”。",
    roundHint: "选择最靠近的答案。", patternHint: "输入缺少的数字。", check: "检查",
    correct: "答对了！", tryAgain: "再试一次，看看数字在数轴上的位置。",
    lessThan: "小过", greaterThan: "大过", differentNumbers: "请选择两个不同的数字。",
    compareCorrect: (a, relation, b) => `答对了！${a} ${relation} ${b}。`, roundCorrect: (n, answer) => `答对了！答案是 ${answer}。`,
    roundExplain: (low, high) => `比较它到 ${low} 和 ${high} 的距离。`, patternCorrect: (answer) => `答对了！缺少的数字是 ${answer}。`,
    enterAnswer: "输入答案", samePlace: "两个数字在相同的位置。", markerA: "数字 A", markerB: "数字 B", midpoint: "中点", missing: "缺少"
  },
  en: {
    appTitle: "Number Line Fun!", appSubtitle: "Look, tap, and find the answer.",
    modeExplore: "Know Numbers", modeCompare: "Which Is Bigger?", modeRounding: "Nearest Number", modePattern: "Find the Pattern",
    controls: "Choose numbers", yourTask: "Let's try!", newQuestion: "Try another one",
    stepLook: "Look at the line", stepThink: "Choose an answer", stepAnswer: "Check it",
    speakAnswer: "Hear the answer", speakNumber: "Hear the number", soundOn: "Sound: On", soundOff: "Sound: Off",
    titleExplore: "Know numbers", titleCompare: "Which is bigger?", titleRounding: "Find the nearest number", titlePattern: "Find the pattern",
    promptExplore: "Tap the number line to choose a number.", promptCompare: (a, b) => `Look at ${a} and ${b}. Which is bigger?`,
    promptRounding: (n, base) => `Which multiple of ${base} is ${n} closer to?`, promptPattern: "Which number is missing?",
    range: "Number range", number: "Number", stepSize: "Step size", firstNumber: "First number", secondNumber: "Second number",
    roundingTo: "Round to", nearest10: "Nearest 10", nearest100: "Nearest 100", nearest1000: "Nearest 1,000",
    start: "Starting number", difference: "Difference", direction: "Pattern direction", increasing: "Increasing", decreasing: "Decreasing",
    selected: "Selected number", clickHint: "Tap the line, or use + and −.", compareHint: "Choose ‘smaller’ or ‘bigger’.",
    roundHint: "Choose the nearest answer.", patternHint: "Type the missing number.", check: "Check",
    correct: "Correct!", tryAgain: "Try again. Look at the positions on the number line.",
    lessThan: "is smaller", greaterThan: "is bigger", differentNumbers: "Please choose two different numbers.",
    compareCorrect: (a, relation, b) => `Correct! ${a} ${relation} than ${b}.`, roundCorrect: (n, answer) => `Correct! The answer is ${answer}.`,
    roundExplain: (low, high) => `Compare its distance from ${low} and ${high}.`, patternCorrect: (answer) => `Correct! The missing number is ${answer}.`,
    enterAnswer: "Enter your answer", samePlace: "Both numbers are at the same position.", markerA: "Number A", markerB: "Number B", midpoint: "Midpoint", missing: "Missing"
  }
};

const state = {
  lang: "bm",
  mode: "explore",
  spokenAnswer: "",
  soundEnabled: readSoundPreference(),
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

function readSoundPreference() {
  try { return localStorage.getItem("number-line-sound") !== "off"; }
  catch { return true; }
}

function saveSoundPreference() {
  try { localStorage.setItem("number-line-sound", state.soundEnabled ? "on" : "off"); }
  catch { /* Sound still works when storage is unavailable. */ }
}

function updateSoundToggle() {
  if (!ui.sound) return;
  ui.sound.setAttribute("aria-pressed", String(state.soundEnabled));
  ui.sound.innerHTML = `<span aria-hidden="true">${state.soundEnabled ? "🔊" : "🔇"}</span><span>${t(state.soundEnabled ? "soundOn" : "soundOff")}</span>`;
}

let soundContext = null;
function getSoundContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!soundContext) soundContext = new AudioContextClass();
  if (soundContext.state === "suspended") soundContext.resume().catch(() => {});
  return soundContext;
}

function playNote(context, frequency, start, duration, volume, type = "sine") {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(.001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + .01);
  gain.gain.exponentialRampToValueAtTime(.001, start + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + .02);
}

function playUiSound(type, value = 0) {
  if (!state.soundEnabled) return;
  const context = getSoundContext();
  if (!context) return;
  const now = context.currentTime;
  if (type === "click") playNote(context, 520, now, .055, .045, "sine");
  if (type === "move") playNote(context, 390 + (Math.abs(value) % 8) * 35, now, .075, .065, "sine");
  if (type === "new") {
    playNote(context, 390, now, .09, .07, "sine");
    playNote(context, 520, now + .07, .11, .075, "sine");
  }
  if (type === "correct") {
    [[523, 0], [659, .09], [784, .18]].forEach(([frequency, offset]) => playNote(context, frequency, now + offset, .16, .095, "sine"));
  }
  if (type === "wrong") {
    playNote(context, 230, now, .12, .06, "triangle");
    playNote(context, 185, now + .1, .16, .055, "triangle");
  }
}

function celebrate() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  ui.celebration.replaceChildren();
  const colors = ["#ffca4f", "#35a58c", "#3579b9", "#f06f61", "#8d63c7"];
  for (let index = 0; index < 20; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    const angle = (Math.PI * 2 * index) / 20 + Math.random() * .25;
    const distance = 110 + Math.random() * 180;
    piece.style.setProperty("--confetti-x", `${Math.cos(angle) * distance}px`);
    piece.style.setProperty("--confetti-y", `${Math.sin(angle) * distance}px`);
    piece.style.setProperty("--confetti-r", `${randomInt(-300, 300)}deg`);
    piece.style.setProperty("--confetti-color", colors[index % colors.length]);
    piece.style.animationDelay = `${Math.random() * 70}ms`;
    ui.celebration.append(piece);
  }
  window.setTimeout(() => ui.celebration.replaceChildren(), 900);
}

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
  playUiSound(success ? "correct" : "wrong");
  if (success) celebrate();
}

function setSpokenAnswer(text) {
  state.spokenAnswer = text;
  ui.speak.disabled = !text;
  const label = ui.speak.querySelector("span:last-child");
  if (label) label.textContent = t(state.mode === "explore" ? "speakNumber" : "speakAnswer");
}

function spokenComparison(a, relation, b) {
  const left = numberWords(a);
  const right = numberWords(b);
  if (state.lang === "zh") return `${left}${relation}${right}`;
  if (state.lang === "en") return `${left} ${relation} than ${right}`;
  return `${left} ${relation} daripada ${right}`;
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
  updateSoundToggle();
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
  const group = svgElement("g", { class: "marker-group" });
  group.append(
    svgElement("line", { x1: x, y1: y + 24, x2: x, y2: LINE_Y - 8, class: "marker-line", stroke: color }),
    svgElement("circle", { cx: x, cy: y, r: 22, class: options.question ? "question-marker" : "marker-circle", fill: color }),
    svgElement("text", { x, y: y + 7, fill: options.question ? "#173b35" : "#ffffff", "font-size": 22, "font-weight": 900, "text-anchor": "middle" }, options.question ? "?" : options.symbol || "●"),
    svgElement("text", { x, y: y - 35, class: "marker-label" }, options.label || formatNumber(value))
  );
  if (options.caption) group.append(svgElement("text", { x, y: y - 61, class: "marker-caption" }, options.caption));
  ui.lineLayer.append(group);
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
      playUiSound("move", state.explore.value);
      renderActivity();
    });
    stepInput.addEventListener("change", () => { state.explore.step = Number(stepInput.value); });
    document.getElementById("stepDown").addEventListener("click", () => {
      state.explore.value = clamp(state.explore.value - state.explore.step, 0, state.explore.range);
      valueInput.value = state.explore.value;
      playUiSound("move", state.explore.value);
      renderActivity();
    });
    document.getElementById("stepUp").addEventListener("click", () => {
      state.explore.value = clamp(state.explore.value + state.explore.step, 0, state.explore.range);
      valueInput.value = state.explore.value;
      playUiSound("move", state.explore.value);
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
  setSpokenAnswer(numberWords(value));
  clearFeedback(t("clickHint"));
}

function renderCompare() {
  const { a, b } = state.compare;
  const bounds = niceBounds([a, b]);
  ui.prompt.textContent = t("promptCompare", formatNumber(a), formatNumber(b));
  const joinWord = state.lang === "zh" ? "和" : state.lang === "en" ? "and" : "dan";
  ui.display.innerHTML = `<span class="big-number">${formatNumber(a)}</span><span class="number-words">${joinWord}</span><span class="big-number">${formatNumber(b)}</span>`;
  drawAxis(bounds.min, bounds.max, bounds.step);
  const same = a === b;
  drawMarker(a, bounds.min, bounds.max, { color: "#176b58", label: formatNumber(a), y: same ? 105 : 128 });
  drawMarker(b, bounds.min, bounds.max, { color: "#3579b9", label: formatNumber(b), y: same ? 270 : 128 });
  setSpokenAnswer("");
  if (same) {
    ui.answer.innerHTML = "";
    clearFeedback(t("differentNumbers"));
    return;
  }
  ui.answer.innerHTML = [
    { value: "<", label: t("lessThan") },
    { value: ">", label: t("greaterThan") }
  ].map(choice => `<button class="choice-btn word-choice" type="button" data-answer="${choice.value}">${choice.label}</button>`).join("");
  ui.answer.querySelectorAll("[data-answer]").forEach(button => button.addEventListener("click", () => checkCompare(button.dataset.answer)));
  clearFeedback(t("compareHint"));
}

function checkCompare(answer) {
  const { a, b } = state.compare;
  const correctAnswer = a < b ? "<" : ">";
  const relation = correctAnswer === "<" ? t("lessThan") : t("greaterThan");
  const isCorrect = answer === correctAnswer;
  showFeedback(isCorrect ? t("compareCorrect", formatNumber(a), relation, formatNumber(b)) : t("tryAgain"), isCorrect);
  setSpokenAnswer(isCorrect ? spokenComparison(a, relation, b) : "");
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
  setSpokenAnswer("");
  clearFeedback(t("roundHint"));
}

function checkRounding(answer) {
  const details = roundingDetails();
  const correct = answer === details.correct;
  const message = correct
    ? t("roundCorrect", formatNumber(state.rounding.value), formatNumber(details.correct))
    : `${t("tryAgain")} ${t("roundExplain", formatNumber(details.lower), formatNumber(details.upper))}`;
  showFeedback(message, correct);
  setSpokenAnswer(correct ? numberWords(details.correct) : "");
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
    setSpokenAnswer(correct ? numberWords(answer) : "");
  };
  document.getElementById("checkPattern").addEventListener("click", check);
  answerInput.addEventListener("keydown", event => { if (event.key === "Enter") check(); });
  setSpokenAnswer("");
  clearFeedback(t("patternHint"));
}

function renderActivity() {
  ({ explore: renderExplore, compare: renderCompare, rounding: renderRounding, pattern: renderPattern })[state.mode]();
}

function makeNewQuestion() {
  playUiSound("new");
  if (state.mode === "explore") {
    state.explore.value = randomInt(0, state.explore.range);
  } else if (state.mode === "compare") {
    const limit = [100, 1000, 10000][randomInt(0, 2)];
    state.compare.a = randomInt(0, limit);
    do { state.compare.b = randomInt(0, limit); } while (state.compare.b === state.compare.a);
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
  playUiSound("move", state.explore.value);
  renderActivity();
});

ui.newQuestion.addEventListener("click", makeNewQuestion);
ui.sound.addEventListener("click", () => {
  state.soundEnabled = !state.soundEnabled;
  saveSoundPreference();
  updateSoundToggle();
  if (state.soundEnabled) playUiSound("click");
});

document.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;
  const excludedIds = ["soundToggle", "newQuestionBtn", "stepDown", "stepUp", "speakBtn", "checkPattern"];
  if (excludedIds.includes(button.id) || button.hasAttribute("data-answer")) return;
  playUiSound("click");
});

document.addEventListener("change", event => {
  if (event.target.matches("select")) playUiSound("click");
});

let speechVoices = [];
function refreshSpeechVoices() {
  speechVoices = "speechSynthesis" in window ? window.speechSynthesis.getVoices() : [];
}

function chooseSpeechVoice() {
  if (!speechVoices.length) refreshSpeechVoices();
  if (state.lang === "en") {
    const englishVoices = speechVoices.filter(voice => voice.lang.toLowerCase().startsWith("en"));
    const preferredFemaleNames = ["jenny", "aria", "zira", "samantha", "ava", "emma", "libby", "hazel", "susan", "female"];
    for (const name of preferredFemaleNames) {
      const match = englishVoices.find(voice => voice.name.toLowerCase().includes(name));
      if (match) return match;
    }
    return englishVoices[0] || null;
  }
  const languageCode = state.lang === "zh" ? "zh" : "ms";
  return speechVoices.find(voice => voice.lang.toLowerCase().startsWith(languageCode)) || null;
}

refreshSpeechVoices();
if ("speechSynthesis" in window) window.speechSynthesis.addEventListener("voiceschanged", refreshSpeechVoices);
ui.speak.addEventListener("click", () => {
  if (!("speechSynthesis" in window) || !state.spokenAnswer) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(state.spokenAnswer);
  const voice = chooseSpeechVoice();
  if (voice) utterance.voice = voice;
  utterance.lang = voice?.lang || (state.lang === "zh" ? "zh-CN" : state.lang === "en" ? "en-US" : "ms-MY");
  utterance.rate = .9;
  utterance.pitch = state.lang === "en" ? 1.05 : 1;
  window.speechSynthesis.speak(utterance);
});

setStaticTranslations();
renderMode();
