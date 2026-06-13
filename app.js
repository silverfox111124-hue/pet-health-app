"use strict";

const STORAGE_KEY = "pet-health-note-data-v2";
const OLD_STORAGE_KEY = "pet-health-note-data-v1";
const BACKGROUND_IMAGE_KEY = "pet-health-note-background-v1";

const DEFAULT_SETTINGS = {
  meal: true,
  snack: true,
  pee: true,
  poop: true,
  weight: true,
  nail: true,
  shampoo: false,
  brushing: false,
  ear: false,
  tooth: false,
  energy: true,
  appetite: true,
  water: true,
  vomit: false,
  cough: false,
  walk: false,
  skin: false,
  memo: true
};

const MEAL_TIME_CHOICES = ["朝", "昼", "夕方", "夜", "寝る前"];
const DIRECT_MEAL_TIME = "直接入力";
const SNACK_AMOUNT_CHOICES = ["なし", "少し", "いつも通り", "多め"];

const DEFAULT_APPEARANCE = {
  theme: "green",
  background: "green"
};

const THEME_OPTIONS = [
  { id: "pink", label: "ピンク", accent: "#c65b7b", accentDark: "#9d3f5c", soft: "#fae7ef" },
  { id: "rose", label: "ローズ", accent: "#b84a62", accentDark: "#8e364a", soft: "#fae5ea" },
  { id: "coral", label: "コーラル", accent: "#c96a55", accentDark: "#9f4e3e", soft: "#fae8e1" },
  { id: "orange", label: "オレンジ", accent: "#b86f2b", accentDark: "#8e531f", soft: "#f8ead8" },
  { id: "apricot", label: "あんず", accent: "#b98236", accentDark: "#8d6328", soft: "#f9edda" },
  { id: "blue", label: "水色", accent: "#357fa4", accentDark: "#25627f", soft: "#e5f2f8" },
  { id: "sky", label: "空色", accent: "#4d8fc1", accentDark: "#336d96", soft: "#e7f1fa" },
  { id: "navy", label: "紺", accent: "#4d658f", accentDark: "#394d70", soft: "#e8edf5" },
  { id: "indigo", label: "藍色", accent: "#5967ad", accentDark: "#424d86", soft: "#eaecf8" },
  { id: "green", label: "緑", accent: "#2f7f7b", accentDark: "#226663", soft: "#e6f2ec" },
  { id: "mint", label: "ミント", accent: "#3d9275", accentDark: "#2b7159", soft: "#e4f3ec" },
  { id: "leaf", label: "若葉", accent: "#6a8f3a", accentDark: "#506f2b", soft: "#edf4df" },
  { id: "olive", label: "オリーブ", accent: "#777f35", accentDark: "#5c6228", soft: "#f0f1dd" },
  { id: "yellow", label: "黄色", accent: "#9b7a20", accentDark: "#765c18", soft: "#fff3c7" },
  { id: "gold", label: "金色", accent: "#aa8427", accentDark: "#80631d", soft: "#f8efcf" },
  { id: "mustard", label: "からし", accent: "#9a7f2f", accentDark: "#746024", soft: "#f4edcf" },
  { id: "purple", label: "紫", accent: "#7a5aa6", accentDark: "#5d4282", soft: "#f0e8f7" },
  { id: "lavender", label: "ラベンダー", accent: "#8a6db2", accentDark: "#6a518d", soft: "#f0e9f8" },
  { id: "plum", label: "すもも", accent: "#9b5b91", accentDark: "#77446f", soft: "#f5e8f2" },
  { id: "brown", label: "ブラウン", accent: "#8a6a52", accentDark: "#684f3d", soft: "#f1e9e2" },
  { id: "mocha", label: "モカ", accent: "#7b6b5e", accentDark: "#5e5147", soft: "#eee9e4" },
  { id: "gray", label: "グレー", accent: "#68737d", accentDark: "#4f5962", soft: "#edf0f2" },
  { id: "charcoal", label: "チャコール", accent: "#5d6369", accentDark: "#464b50", soft: "#eceeef" },
  { id: "black", label: "黒", accent: "#4f4f4f", accentDark: "#373737", soft: "#ededed" },
  { id: "teal", label: "青緑", accent: "#287f8f", accentDark: "#1d6070", soft: "#e3f1f3" }
];

const FIELD_GROUPS = [
  {
    id: "meal",
    title: "食事",
    settingKeys: ["meal"],
    fields: [
      { key: "mealCount", label: "食事の回数", type: "number", min: 0, step: 1, suffix: "回" },
      { key: "mealTimes", label: "食事の時間", type: "meal-times" },
      { key: "mealAmount", label: "食べた量", type: "select", options: ["", "いつも通り", "少なめ", "多め", "食べない"] }
    ]
  },
  {
    id: "snack",
    title: "おやつ",
    settingKeys: ["snack"],
    fields: [
      { key: "snackCount", label: "おやつの回数", type: "number", min: 0, step: 1, suffix: "回" },
      { key: "snackAmount", label: "おやつの量", type: "snack-amount" }
    ]
  },
  {
    id: "pee",
    title: "おしっこ",
    settingKeys: ["pee"],
    fields: [
      { key: "peeCount", label: "おしっこの回数", type: "number", min: 0, step: 1, suffix: "回" }
    ]
  },
  {
    id: "poop",
    title: "うんち",
    settingKeys: ["poop"],
    fields: [
      { key: "poopCount", label: "うんちの回数", type: "number", min: 0, step: 1, suffix: "回" },
      { key: "poopColor", label: "うんちの色", type: "select", options: ["", "いつも通り", "茶色", "黒っぽい", "赤っぽい", "白っぽい", "その他"] },
      { key: "poopHardness", label: "うんちの硬さ", type: "select", options: ["", "いつも通り", "やわらかい", "硬い", "下痢気味"] },
      { key: "poopShape", label: "うんちの形", type: "select", options: ["", "いつも通り", "ころころ", "細い", "形がない", "その他"] }
    ]
  },
  {
    id: "weight",
    title: "体重",
    settingKeys: ["weight"],
    fields: [
      { key: "weight", label: "体重", type: "number", min: 0, step: 0.01, suffix: "kg" },
      { key: "weightDate", label: "測定日", type: "date" }
    ]
  },
  {
    id: "care",
    title: "お世話",
    settingKeys: ["nail", "shampoo", "brushing", "ear", "tooth"],
    fields: [
      { key: "nailDate", label: "爪を切った日", type: "date", settingKey: "nail" },
      { key: "shampooDate", label: "シャンプーした日", type: "date", settingKey: "shampoo" },
      { key: "brushingDate", label: "ブラッシングした日", type: "date", settingKey: "brushing" },
      { key: "earDate", label: "耳掃除した日", type: "date", settingKey: "ear" },
      { key: "toothDate", label: "歯みがきした日", type: "date", settingKey: "tooth" }
    ]
  },
  {
    id: "condition",
    title: "体調メモ",
    settingKeys: ["energy", "appetite", "water", "vomit", "cough", "walk", "skin", "memo"],
    fields: [
      { key: "energy", label: "元気", type: "select", options: ["", "いつも通り", "少し元気がない", "元気がない"] },
      { key: "appetite", label: "食欲", type: "select", options: ["", "いつも通り", "少なめ", "多め", "食べない"] },
      { key: "water", label: "水を飲む量", type: "select", options: ["", "いつも通り", "少なめ", "多め"] },
      { key: "vomit", label: "嘔吐", type: "select", settingKey: "vomit", options: ["", "なし", "あり"] },
      { key: "cough", label: "咳・くしゃみ", type: "select", settingKey: "cough", options: ["", "なし", "あり"] },
      { key: "walk", label: "歩き方", type: "select", settingKey: "walk", options: ["", "いつも通り", "少し気になる", "気になる"] },
      { key: "skin", label: "皮膚・毛並み", type: "select", settingKey: "skin", options: ["", "いつも通り", "少し気になる", "気になる"] },
      { key: "memo", label: "自由メモ", type: "textarea", settingKey: "memo", placeholder: "気になることを短く書けます" }
    ]
  }
];

const SETTING_LABELS = [
  ["meal", "食事"],
  ["snack", "おやつ"],
  ["pee", "おしっこ"],
  ["poop", "うんち"],
  ["weight", "体重"],
  ["nail", "爪切り"],
  ["shampoo", "シャンプー"],
  ["brushing", "ブラッシング"],
  ["ear", "耳掃除"],
  ["tooth", "歯みがき"],
  ["energy", "元気"],
  ["appetite", "食欲"],
  ["water", "水を飲む量"],
  ["vomit", "嘔吐"],
  ["cough", "咳・くしゃみ"],
  ["walk", "歩き方"],
  ["skin", "皮膚・毛並み"],
  ["memo", "自由メモ"]
];

let state = loadState();
let currentScreen = "home";
let editingId = null;
let flashMessage = "";

function emptyState() {
  return {
    pet: { name: "", kind: "", birthday: "", memo: "" },
    appearance: { ...DEFAULT_APPEARANCE },
    settings: { ...DEFAULT_SETTINGS },
    records: []
  };
}

function loadState() {
  const fallback = emptyState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(OLD_STORAGE_KEY);
    if (!raw) return fallback;
    const saved = JSON.parse(raw);
    return {
      pet: { ...fallback.pet, ...(saved.pet || {}) },
      appearance: { ...DEFAULT_APPEARANCE, ...(saved.appearance || {}) },
      settings: { ...DEFAULT_SETTINGS, ...(saved.settings || {}) },
      records: Array.isArray(saved.records) ? saved.records : []
    };
  } catch (error) {
    console.log("pet-note: load failed", error);
    return fallback;
  }
}

function applyAppearance() {
  const theme = THEME_OPTIONS.find((item) => item.id === state.appearance.theme) || THEME_OPTIONS[2];
  const background = THEME_OPTIONS.find((item) => item.id === state.appearance.background) || THEME_OPTIONS[2];
  document.documentElement.style.setProperty("--accent", theme.accent);
  document.documentElement.style.setProperty("--accent-dark", theme.accentDark);
  document.documentElement.style.setProperty("--soft-green", theme.soft);
  document.documentElement.style.setProperty("--app-bg", background.soft);
  document.documentElement.style.setProperty("--app-bg-strong", background.accent);

  const savedBackground = getSavedBackground();
  if (savedBackground) {
    console.log("pet-note: applying background photo");
    document.body.classList.add("has-background-photo");
    document.body.style.backgroundImage = `linear-gradient(rgba(255, 250, 243, 0.38), rgba(255, 250, 243, 0.72)), url("${savedBackground}")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "scroll";
  } else {
    console.log("pet-note: no background photo");
    document.body.classList.remove("has-background-photo");
    document.body.style.backgroundImage = `linear-gradient(180deg, ${background.soft} 0%, #fffaf3 100%)`;
    document.body.style.backgroundSize = "auto";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "scroll";
  }
}

function getSavedBackground() {
  try {
    return localStorage.getItem(BACKGROUND_IMAGE_KEY) || "";
  } catch (error) {
    console.log("pet-note: background load failed", error);
    return "";
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    console.log("pet-note: saved", { records: state.records.length });
    return true;
  } catch (error) {
    console.log("pet-note: save failed", error);
    showMessage("保存できませんでした。空き容量を少し増やしてから、もう一度お試しください。", "error");
    return false;
  }
}

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `record-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function today() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(value) {
  if (!value) return "";
  const parts = value.split("-");
  if (parts.length !== 3) return value;
  return `${Number(parts[1])}月${Number(parts[2])}日`;
}

function byDateDesc(a, b) {
  return (b.date || "").localeCompare(a.date || "");
}

function visibleFields(group) {
  return group.fields.filter((field) => state.settings[field.settingKey || group.id] !== false);
}

function isGroupVisible(group) {
  return group.settingKeys.some((key) => state.settings[key] !== false) && visibleFields(group).length > 0;
}

function render(screen = currentScreen, options = {}) {
  applyAppearance();
  currentScreen = screen;
  editingId = Object.prototype.hasOwnProperty.call(options, "editingId") ? options.editingId : editingId;
  const app = document.querySelector("#app");
  app.innerHTML = `${messageHtml()}${screens[screen]()}`;
  bindScreen(screen);
  window.scrollTo(0, 0);
}

function showMessage(message, type = "success") {
  flashMessage = `<div class="message ${type === "error" ? "message-error" : ""}" role="status">${escapeHtml(message)}</div>`;
  const holder = document.querySelector("#message-area");
  if (holder) holder.innerHTML = flashMessage;
}

function messageHtml() {
  const html = `<div id="message-area">${flashMessage}</div>`;
  flashMessage = "";
  return html;
}

function topbar(title) {
  return `
    <div class="topbar">
      <button class="back-button" data-go="home" type="button">戻る</button>
      <h1>${title}</h1>
    </div>
  `;
}

const screens = {
  home() {
    return `
      <main>
        <h1 class="home-title">ペット体調ノート</h1>
        <p class="home-subtitle">毎日の様子を短く残して、病院で落ち着いて見せられるようにします。</p>
        <div class="notice">診断や治療の判断はしません。気になることは動物病院に相談してください。</div>
        <div class="home-actions" style="margin-top:18px">
          ${homeButton("record", "今日の記録をする")}
          ${homeButton("list", "記録を見る")}
          ${homeButton("weight", "体重グラフを見る")}
          ${homeButton("hospital", "病院で見せる")}
          ${homeButton("settings", "設定")}
        </div>
      </main>
    `;
  },
  record() {
    const record = editingId ? state.records.find((item) => item.id === editingId) : null;
    const data = record || { date: today(), weightDate: today() };
    return `
      ${topbar(editingId ? "記録を直す" : "今日の記録")}
      <main>
        <form id="record-form" class="stack" novalidate>
          <section class="section">
            ${inputField({ key: "date", label: "記録する日", type: "date" }, data)}
          </section>
          ${FIELD_GROUPS.filter(isGroupVisible).map((group) => recordGroup(group, data)).join("")}
          <button class="primary-button" id="record-save-button" type="button">${editingId ? "直した内容を保存する" : "記録を保存する"}</button>
        </form>
      </main>
    `;
  },
  list() {
    const records = [...state.records].sort(byDateDesc);
    return `
      ${topbar("記録を見る")}
      <main class="stack">
        ${records.length === 0 ? `<div class="empty">まだ記録がありません。</div>` : `
          <button class="secondary-button" data-go="deleteRecords" type="button">記録を選んで消す</button>
          ${records.map(recordCard).join("")}
        `}
      </main>
    `;
  },
  deleteRecords() {
    const records = [...state.records].sort(byDateDesc);
    return `
      ${topbar("記録を消す")}
      <main class="stack">
        <div class="notice">心配な場合は、先にバックアップを保存してください。消した記録は元に戻せません。</div>
        ${records.length === 0 ? `<div class="empty">消せる記録はありません。</div>` : `
          <button class="danger-button" id="delete-selected-records" type="button">選んだ記録を消す</button>
          ${records.map(deleteRecordCard).join("")}
        `}
      </main>
    `;
  },
  weight() {
    const weights = weightPoints();
    return `
      ${topbar("体重グラフ")}
      <main class="stack">
        ${weights.length < 2 ? `<div class="empty">体重を2回以上記録するとグラフが表示されます。</div>` : safeWeightChart(weights)}
        ${weights.map((item) => `<div class="summary-item"><strong>${formatDate(item.date)}</strong>${item.weight} kg</div>`).join("")}
      </main>
    `;
  },
  hospital() {
    return `
      ${topbar("病院で見せる")}
      <main class="stack">
        <div class="notice">この画面は記録を見せるためのものです。診断や治療の判断は動物病院に相談してください。</div>
        ${hospitalSummary()}
      </main>
    `;
  },
  settings() {
    return `
      ${topbar("設定")}
      <main class="stack">
        <section class="section">
          <h2>ペット基本情報</h2>
          <form id="pet-form" novalidate>
            ${inputField({ key: "name", label: "名前", type: "text", placeholder: "例：ポチ" }, state.pet)}
            ${inputField({ key: "kind", label: "種類", type: "text", placeholder: "例：犬 / 猫 / うさぎ" }, state.pet)}
            ${inputField({ key: "birthday", label: "誕生日・年齢", type: "text", placeholder: "例：2020年生まれ / 6歳" }, state.pet)}
            ${inputField({ key: "memo", label: "病院に伝えたい基本メモ", type: "textarea", placeholder: "持病、苦手なこと、薬など" }, state.pet)}
            <button class="primary-button" id="pet-save-button" type="button">基本情報を保存する</button>
          </form>
        </section>
        <section class="section">
          <h2>記録に出す項目</h2>
          ${SETTING_LABELS.map(([key, label]) => toggleRow(key, label)).join("")}
        </section>
        <section class="section stack">
          <h2>色を変える</h2>
          <p class="screen-lead">好きな色を選んでください。</p>
          <h3 class="setting-subtitle">ボタンや見出しの色</h3>
          <div class="theme-grid">
            ${THEME_OPTIONS.map((theme) => colorButton(theme, "theme")).join("")}
          </div>
          <h3 class="setting-subtitle">背景の色</h3>
          <div class="theme-grid">
            ${THEME_OPTIONS.map((theme) => colorButton(theme, "background")).join("")}
          </div>
        </section>
        <section class="section stack">
          <h2>背景写真</h2>
          <p class="screen-lead">写真はこのスマホだけに保存されます。バックアップには入りません。</p>
          <button class="secondary-button" id="background-choose" type="button">背景写真を選ぶ</button>
          <button class="secondary-button" id="background-clear" type="button">背景写真を消す</button>
        </section>
        <section class="section stack">
          <h2>バックアップ</h2>
          <p class="screen-lead">機種変更や念のための保管に使えます。</p>
          <button class="secondary-button" id="backup-save" type="button">バックアップを保存する</button>
          <button class="secondary-button" id="backup-restore" type="button">バックアップから復元する</button>
        </section>
        <section class="section danger-zone">
          <h2>記録の削除</h2>
          <p class="screen-lead">心配な場合は、先にバックアップを保存してください。</p>
          <button class="secondary-button" data-go="deleteRecords" type="button">記録を選んで消す</button>
          <button class="quiet-danger-button" id="delete-all-records" type="button">記録をすべて消す</button>
        </section>
      </main>
    `;
  }
};

function homeButton(target, label) {
  return `<button class="big-button" data-go="${target}" type="button"><span>${label}</span><span>›</span></button>`;
}

function recordGroup(group, data) {
  return `
    <section class="section">
      <h2>${group.title}</h2>
      ${visibleFields(group).map((field) => inputField(field, data)).join("")}
    </section>
  `;
}

function inputField(field, data) {
  const value = data[field.key] || "";
  if (field.type === "meal-times") {
    return mealTimesField(data);
  }

  if (field.type === "snack-amount") {
    return snackAmountField(data);
  }

  if (field.type === "textarea") {
    return `
      <label class="field">
        <span>${field.label}</span>
        <textarea name="${field.key}" placeholder="${field.placeholder || ""}">${escapeHtml(value)}</textarea>
      </label>
    `;
  }

  if (field.type === "select") {
    return `
      <label class="field">
        <span>${field.label}</span>
        <select name="${field.key}">
          ${field.options.map((option) => `<option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${option || "選んでください"}</option>`).join("")}
        </select>
      </label>
    `;
  }

  return `
    <label class="field">
      <span>${field.label}${field.suffix ? `（${field.suffix}）` : ""}</span>
      <input name="${field.key}" type="${field.type}" value="${escapeHtml(value)}" placeholder="${field.placeholder || ""}" ${field.min !== undefined ? `min="${field.min}"` : ""} ${field.step ? `step="${field.step}"` : ""}>
    </label>
  `;
}

function snackAmountField(data) {
  const amount = data.snackAmount || "";
  const isPreset = SNACK_AMOUNT_CHOICES.includes(amount);
  const selectedKind = isPreset || !amount ? amount : DIRECT_MEAL_TIME;
  const customValue = isPreset ? "" : amount;
  return `
    <div class="field">
      <label for="snack-amount-kind">おやつの量</label>
      <select id="snack-amount-kind" name="snackAmountKind">
        <option value="" ${selectedKind === "" ? "selected" : ""}>選んでください</option>
        ${SNACK_AMOUNT_CHOICES.map((choice) => `<option value="${choice}" ${selectedKind === choice ? "selected" : ""}>${choice}</option>`).join("")}
        <option value="${DIRECT_MEAL_TIME}" ${selectedKind === DIRECT_MEAL_TIME ? "selected" : ""}>直接入力</option>
      </select>
      <input id="snack-amount-custom" class="${selectedKind === DIRECT_MEAL_TIME ? "" : "is-hidden"}" name="snackAmountCustom" type="text" value="${escapeHtml(customValue)}" placeholder="例：ビスケット2枚、ささみ1本">
    </div>
  `;
}

function mealTimesField(data) {
  const rows = mealTimesFromRecord(data);
  return `
    <div class="field">
      <span>食事の時間</span>
      <div id="meal-time-list" class="meal-time-list">
        ${rows.map((value) => mealTimeRow(value)).join("")}
      </div>
      <button class="secondary-button meal-add-button" id="add-meal-time" type="button">＋ 食事時間を追加</button>
      <div class="field-help">例：7:30、18:30、寝る前</div>
    </div>
  `;
}

function mealTimeRow(value = "") {
  const isPreset = MEAL_TIME_CHOICES.includes(value);
  const selectedKind = isPreset || !value ? value : DIRECT_MEAL_TIME;
  const customValue = isPreset ? "" : value;
  return `
    <div class="meal-time-row">
      <select name="mealTimeKind" class="meal-time-kind" aria-label="食事の時間">
        <option value="" ${selectedKind === "" ? "selected" : ""}>選んでください</option>
        ${MEAL_TIME_CHOICES.map((choice) => `<option value="${choice}" ${selectedKind === choice ? "selected" : ""}>${choice}</option>`).join("")}
        <option value="${DIRECT_MEAL_TIME}" ${selectedKind === DIRECT_MEAL_TIME ? "selected" : ""}>直接入力</option>
      </select>
      <input name="mealTimeCustom" class="meal-time-custom ${selectedKind === DIRECT_MEAL_TIME ? "" : "is-hidden"}" type="text" value="${escapeHtml(customValue)}" placeholder="例：7:30、18:30、寝る前">
      <button class="small-button meal-remove-button" type="button">この時間を消す</button>
    </div>
  `;
}

function mealTimesFromRecord(record) {
  if (Array.isArray(record.mealTimes)) {
    const values = record.mealTimes.map((value) => String(value).trim()).filter(Boolean);
    return values.length ? values : [""];
  }
  if (record.mealTime) {
    const values = String(record.mealTime)
      .split(/[、,，]/)
      .map((value) => value.trim())
      .filter(Boolean);
    return values.length ? values : [String(record.mealTime).trim()];
  }
  return [""];
}

function mealTimeText(record) {
  return mealTimesFromRecord(record).filter(Boolean).join("、");
}

function toggleRow(key, label) {
  return `
    <div class="toggle-row">
      <span>${label}</span>
      <label class="switch" aria-label="${label}">
        <input type="checkbox" data-setting="${key}" ${state.settings[key] ? "checked" : ""}>
        <span class="slider"></span>
      </label>
    </div>
  `;
}

function colorButton(theme, kind) {
  const selected = state.appearance[kind] === theme.id;
  return `
    <button class="theme-button ${selected ? "is-selected" : ""}" data-color-kind="${kind}" data-color-id="${theme.id}" type="button" aria-pressed="${selected}">
      <span class="theme-swatch" style="background:${theme.accent}"></span>
      <span>${theme.label}</span>
    </button>
  `;
}

function recordCard(record) {
  const lines = recordLines(record).slice(0, 6);
  return `
    <article class="record-card">
      <h2>${formatDate(record.date)}の記録</h2>
      ${lines.length ? `<p>${lines.join("<br>")}</p>` : `<p>記録内容は空です。</p>`}
      <div class="card-actions">
        <button class="secondary-button" data-edit="${record.id}" type="button">編集</button>
        <button class="danger-button" data-delete-day="${record.date}" type="button">この日の記録を消す</button>
      </div>
    </article>
  `;
}

function deleteRecordCard(record) {
  const lines = recordLines(record);
  return `
    <article class="record-card delete-card">
      <label class="delete-check-row">
        <input type="checkbox" class="delete-record-check" value="${escapeHtml(record.date)}">
        <span>${formatDate(record.date)}を選ぶ</span>
      </label>
      <h2>${formatDate(record.date)}の記録</h2>
      ${lines.length ? `<p>${lines.join("<br>")}</p>` : `<p>記録内容は空です。</p>`}
      <button class="danger-button" data-delete-day="${record.date}" type="button">この日の記録を消す</button>
    </article>
  `;
}

function recordLines(record) {
  const lines = [];
  if (record.mealCount) lines.push(`食事：${record.mealCount}回`);
  const mealTimes = mealTimeText(record);
  if (mealTimes) lines.push(`食事時間：${mealTimes}`);
  if (record.mealAmount) lines.push(`食べた量：${record.mealAmount}`);
  if (record.snackCount) lines.push(`おやつ：${record.snackCount}回`);
  if (record.snackAmount) lines.push(`量：${record.snackAmount}`);
  if (record.peeCount) lines.push(`おしっこ：${record.peeCount}回`);
  if (record.poopCount) lines.push(`うんち：${record.poopCount}回`);
  if (record.weight) lines.push(`体重：${record.weight} kg`);
  if (record.energy) lines.push(`元気：${record.energy}`);
  if (record.appetite) lines.push(`食欲：${record.appetite}`);
  if (record.water) lines.push(`水：${record.water}`);
  if (record.vomit) lines.push(`嘔吐：${record.vomit}`);
  if (record.cough) lines.push(`咳・くしゃみ：${record.cough}`);
  if (record.walk) lines.push(`歩き方：${record.walk}`);
  if (record.skin) lines.push(`皮膚・毛並み：${record.skin}`);
  if (record.memo) lines.push(`メモ：${escapeHtml(record.memo)}`);
  return lines;
}

function bindScreen(screen) {
  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      editingId = null;
      render(button.dataset.go);
    });
  });

  if (screen === "record") bindRecordForm();
  if (screen === "list") bindListActions();
  if (screen === "deleteRecords") bindDeleteRecords();
  if (screen === "settings") bindSettings();
}

function bindRecordForm() {
  const form = document.querySelector("#record-form");
  const button = document.querySelector("#record-save-button");
  bindMealTimeControls();
  bindSnackAmountControl();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    saveRecordFromForm(form);
  });
  button.addEventListener("click", (event) => {
    event.preventDefault();
    saveRecordFromForm(form);
  });
}

function bindSnackAmountControl() {
  const select = document.querySelector("#snack-amount-kind");
  const custom = document.querySelector("#snack-amount-custom");
  if (!select || !custom) return;

  select.addEventListener("change", () => {
    const isDirect = select.value === DIRECT_MEAL_TIME;
    custom.classList.toggle("is-hidden", !isDirect);
    if (isDirect) custom.focus();
  });
}

function bindMealTimeControls() {
  const list = document.querySelector("#meal-time-list");
  const addButton = document.querySelector("#add-meal-time");
  if (!list || !addButton) return;

  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    list.insertAdjacentHTML("beforeend", mealTimeRow(""));
    bindMealTimeRow(list.lastElementChild);
  });

  list.querySelectorAll(".meal-time-row").forEach(bindMealTimeRow);
}

function bindMealTimeRow(row) {
  const select = row.querySelector(".meal-time-kind");
  const custom = row.querySelector(".meal-time-custom");
  const remove = row.querySelector(".meal-remove-button");

  select.addEventListener("change", () => {
    const isDirect = select.value === DIRECT_MEAL_TIME;
    custom.classList.toggle("is-hidden", !isDirect);
    if (isDirect) custom.focus();
  });

  remove.addEventListener("click", (event) => {
    event.preventDefault();
    const list = document.querySelector("#meal-time-list");
    if (list.querySelectorAll(".meal-time-row").length <= 1) {
      select.value = "";
      custom.value = "";
      custom.classList.add("is-hidden");
      return;
    }
    row.remove();
  });
}

function saveRecordFromForm(form) {
  console.log("pet-note: save button tapped");
  const formData = new FormData(form);
  const record = { id: editingId || createId(), updatedAt: new Date().toISOString() };
  for (const pair of formData.entries()) {
    if (pair[0] === "mealTimeKind" || pair[0] === "mealTimeCustom") continue;
    if (pair[0] === "snackAmountKind" || pair[0] === "snackAmountCustom") continue;
    record[pair[0]] = String(pair[1]).trim();
  }
  const mealTimes = collectMealTimes(form);
  record.mealTimes = mealTimes;
  record.mealTime = mealTimes.join("、");
  record.snackAmount = collectSnackAmount(formData);
  if (!record.date) record.date = today();
  if (!record.weightDate) record.weightDate = record.date;

  const nextRecords = state.records.filter((item) => item.id !== record.id);
  nextRecords.push(record);
  const previousRecords = state.records;
  state.records = nextRecords;

  if (!saveState()) {
    state.records = previousRecords;
    return;
  }

  editingId = null;
  flashMessage = `<div class="message" role="status">記録しました ✓</div>`;
  render("list");
}

function collectSnackAmount(formData) {
  const kind = String(formData.get("snackAmountKind") || "").trim();
  const custom = String(formData.get("snackAmountCustom") || "").trim();
  if (kind === DIRECT_MEAL_TIME) return custom;
  return kind;
}

function collectMealTimes(form) {
  return Array.from(form.querySelectorAll(".meal-time-row"))
    .map((row) => {
      const kind = row.querySelector(".meal-time-kind").value.trim();
      const custom = row.querySelector(".meal-time-custom").value.trim();
      if (kind === DIRECT_MEAL_TIME) return custom;
      return kind;
    })
    .filter(Boolean);
}

function bindListActions() {
  document.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      render("record", { editingId: button.dataset.edit });
    });
  });

  document.querySelectorAll("[data-delete-day]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      deleteRecordsByDates([button.dataset.deleteDay], "この日の記録を消しました", "この日の記録を消します。本当によいですか？元に戻せません。");
      render("list");
    });
  });
}

function bindDeleteRecords() {
  document.querySelectorAll("[data-delete-day]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      deleteRecordsByDates([button.dataset.deleteDay], "この日の記録を消しました", "この日の記録を消します。本当によいですか？元に戻せません。");
      render("deleteRecords");
    });
  });

  const selectedButton = document.querySelector("#delete-selected-records");
  if (selectedButton) {
    selectedButton.addEventListener("click", (event) => {
      event.preventDefault();
      const dates = Array.from(document.querySelectorAll(".delete-record-check:checked")).map((input) => input.value);
      if (dates.length === 0) {
        showMessage("消したい記録にチェックを付けてください。", "error");
        return;
      }
      deleteRecordsByDates(dates, "選んだ記録を消しました", "選んだ記録を消します。本当によいですか？元に戻せません。");
      render("deleteRecords");
    });
  }
}

function deleteRecordsByDates(dates, successMessage, confirmMessage) {
  const uniqueDates = [...new Set(dates.filter(Boolean))];
  if (uniqueDates.length === 0) return false;
  if (!confirm(`${confirmMessage}\n\n心配な場合は、先にバックアップを保存してください。`)) return false;

  const previousRecords = state.records;
  state.records = state.records.filter((item) => !uniqueDates.includes(item.date));
  if (!saveState()) {
    state.records = previousRecords;
    return false;
  }

  flashMessage = `<div class="message" role="status">${successMessage}</div>`;
  return true;
}

function deleteAllRecords() {
  if (state.records.length === 0) {
    showMessage("消せる記録はありません。", "error");
    return;
  }
  if (!confirm("記録をすべて消します。本当によいですか？元に戻せません。\n\n心配な場合は、先にバックアップを保存してください。")) return;
  if (!confirm("もう一度確認します。本当にすべての記録を消しますか？")) return;

  const previousRecords = state.records;
  state.records = [];
  if (!saveState()) {
    state.records = previousRecords;
    return;
  }
  flashMessage = `<div class="message" role="status">すべての記録を消しました</div>`;
  render("settings");
}

function bindSettings() {
  const petForm = document.querySelector("#pet-form");
  document.querySelector("#pet-save-button").addEventListener("click", (event) => {
    event.preventDefault();
    const formData = new FormData(petForm);
    const nextPet = {};
    for (const pair of formData.entries()) nextPet[pair[0]] = String(pair[1]).trim();
    const previousPet = state.pet;
    state.pet = nextPet;
    if (!saveState()) {
      state.pet = previousPet;
      return;
    }
    showMessage("保存しました ✓");
  });

  petForm.addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector("#pet-save-button").click();
  });

  document.querySelectorAll("[data-setting]").forEach((input) => {
    input.addEventListener("change", () => {
      const previous = state.settings[input.dataset.setting];
      state.settings[input.dataset.setting] = input.checked;
      if (!saveState()) {
        state.settings[input.dataset.setting] = previous;
        input.checked = previous;
      }
    });
  });

  document.querySelectorAll("[data-color-kind]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const kind = button.dataset.colorKind;
      const previousColor = state.appearance[kind];
      state.appearance[kind] = button.dataset.colorId;
      if (!saveState()) {
        state.appearance[kind] = previousColor;
        return;
      }
      applyAppearance();
      showMessage(kind === "background" ? "背景の色を変更しました ✓" : "色を変更しました ✓");
      render("settings");
    });
  });

  document.querySelector("#background-choose").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#background-file").click();
  });

  document.querySelector("#background-clear").addEventListener("click", (event) => {
    event.preventDefault();
    clearBackgroundPhoto();
  });

  document.querySelector("#backup-save").addEventListener("click", saveBackup);
  document.querySelector("#backup-restore").addEventListener("click", () => {
    document.querySelector("#restore-file").click();
  });

  const deleteAllButton = document.querySelector("#delete-all-records");
  if (deleteAllButton) {
    deleteAllButton.addEventListener("click", (event) => {
      event.preventDefault();
      deleteAllRecords();
    });
  }
}

document.querySelector("#restore-file").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const restored = JSON.parse(text);
    if (!Array.isArray(restored.records) || !restored.settings) throw new Error("bad file");
    const previousState = state;
    state = {
      pet: { name: "", kind: "", birthday: "", memo: "", ...(restored.pet || {}) },
      appearance: { ...DEFAULT_APPEARANCE, ...(restored.appearance || {}) },
      settings: { ...DEFAULT_SETTINGS, ...restored.settings },
      records: restored.records
    };
    if (!saveState()) {
      state = previousState;
      return;
    }
    flashMessage = `<div class="message" role="status">復元しました ✓</div>`;
    render("settings");
  } catch (error) {
    console.log("pet-note: restore failed", error);
    showMessage("復元できませんでした。保存したバックアップを選んでください。", "error");
  } finally {
    event.target.value = "";
  }
});

document.querySelector("#background-file").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    console.log("pet-note: background selected", { type: file.type, size: file.size });
    const imageData = await shrinkImage(file);
    console.log("pet-note: background resized", { length: imageData.length });
    localStorage.setItem(BACKGROUND_IMAGE_KEY, imageData);
    console.log("pet-note: background saved");
    applyAppearance();
    showMessage("背景写真を設定しました ✓");
  } catch (error) {
    console.log("pet-note: background save failed", error);
    showMessage("背景写真を設定できませんでした。別の写真でもう一度お試しください。", "error");
  } finally {
    event.target.value = "";
  }
});

function clearBackgroundPhoto() {
  try {
    localStorage.removeItem(BACKGROUND_IMAGE_KEY);
    applyAppearance();
    showMessage("背景写真を消しました ✓");
  } catch (error) {
    console.log("pet-note: background clear failed", error);
    showMessage("背景写真を消せませんでした。もう一度お試しください。", "error");
  }
}

function shrinkImage(file) {
  return new Promise((resolve, reject) => {
    if (!file.type || !file.type.startsWith("image/")) {
      reject(new Error("not image"));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read failed"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("image failed"));
      image.onload = () => {
        console.log("pet-note: background image loaded", { width: image.width, height: image.height });
        const maxSize = 1000;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.68));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function saveBackup() {
  try {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pet-note-backup-${today()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showMessage("バックアップを保存しました ✓");
  } catch (error) {
    console.log("pet-note: backup failed", error);
    showMessage("バックアップを保存できませんでした。もう一度お試しください。", "error");
  }
}

function weightPoints() {
  return state.records
    .filter((record) => record.weight && !Number.isNaN(Number(record.weight)))
    .map((record) => ({ date: record.weightDate || record.date, weight: Number(record.weight) }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function safeWeightChart(points) {
  try {
    return `<div class="chart-wrap">${weightChart(points)}</div>`;
  } catch (error) {
    console.log("pet-note: chart failed", error);
    return `<div class="empty">グラフを表示できませんでした。記録一覧で体重を確認できます。</div>`;
  }
}

function weightChart(points) {
  const width = Math.max(320, points.length * 84);
  const height = 250;
  const pad = 38;
  const weights = points.map((point) => point.weight);
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const range = max - min || 1;
  const coords = points.map((point, index) => {
    const x = pad + (index * (width - pad * 2)) / (points.length - 1);
    const y = height - pad - ((point.weight - min) / range) * (height - pad * 2);
    return { ...point, x, y };
  });
  const path = coords.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

  return `
    <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="体重グラフ">
      <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${height - pad}" stroke="#d9c9b8"></line>
      <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" stroke="#d9c9b8"></line>
      <text class="chart-label" x="${pad}" y="22">${max} kg</text>
      <text class="chart-label" x="${pad}" y="${height - 8}">${min} kg</text>
      <path class="chart-line" d="${path}"></path>
      ${coords.map((point) => `
        <circle class="chart-dot" cx="${point.x}" cy="${point.y}" r="5"></circle>
        <text class="chart-label" x="${point.x - 18}" y="${height - 12}">${formatDate(point.date)}</text>
        <text class="chart-label" x="${point.x - 16}" y="${point.y - 10}">${point.weight}</text>
      `).join("")}
    </svg>
  `;
}

function hospitalSummary() {
  const recent7 = recordsSince(7);
  const recent30Weights = weightPoints().filter((point) => daysAgo(point.date) <= 30);
  const memos = recent7.filter((record) => record.memo).map((record) => `${formatDate(record.date)}：${record.memo}`);
  const care = careLines();

  return `
    <section class="section">
      <h2>ペット基本情報</h2>
      <div class="summary-grid">
        ${summaryItem("名前", state.pet.name || "未入力")}
        ${summaryItem("種類", state.pet.kind || "未入力")}
        ${summaryItem("誕生日・年齢", state.pet.birthday || "未入力")}
        ${summaryItem("基本メモ", state.pet.memo || "未入力")}
      </div>
    </section>
    <section class="section">
      <h2>最近7日間の記録</h2>
      ${recent7.length ? recent7.map((record) => summaryItem(`${formatDate(record.date)}の記録`, recordLines(record).join(" / ") || "記録内容は空です")).join("") : `<div class="empty">最近7日間の記録はありません。</div>`}
    </section>
    <section class="section">
      <h2>最近30日間の体重推移</h2>
      ${recent30Weights.length >= 2 ? safeWeightChart(recent30Weights) : `<div class="empty">体重の記録が少ないです。</div>`}
    </section>
    <section class="section">
      <h2>食事の変化</h2>
      ${changeSummary(recent7, ["mealCount", "mealTime", "mealAmount", "snackCount", "snackAmount", "appetite"], ["食事回数", "食事時間", "食べた量", "おやつ", "量", "食欲"])}
    </section>
    <section class="section">
      <h2>排泄の変化</h2>
      ${changeSummary(recent7, ["peeCount", "poopCount", "poopColor", "poopHardness", "poopShape"], ["おしっこ", "うんち", "色", "硬さ", "形"])}
    </section>
    <section class="section">
      <h2>気になるメモ</h2>
      ${memos.length ? memos.map((text) => summaryItem("メモ", text)).join("") : `<div class="empty">自由メモはありません。</div>`}
    </section>
    <section class="section">
      <h2>お世話日</h2>
      ${care.length ? care.map((text) => summaryItem("お世話", text)).join("") : `<div class="empty">お世話日の記録はありません。</div>`}
    </section>
  `;
}

function summaryItem(title, body) {
  return `<div class="summary-item"><strong>${escapeHtml(title)}</strong>${escapeHtml(body)}</div>`;
}

function recordsSince(days) {
  return [...state.records].filter((record) => daysAgo(record.date) <= days).sort(byDateDesc);
}

function daysAgo(dateText) {
  const base = new Date(today());
  const date = new Date(dateText);
  if (Number.isNaN(date.getTime())) return 99999;
  return Math.floor((base - date) / 86400000);
}

function changeSummary(records, keys, labels) {
  const rows = records
    .map((record) => {
      const values = keys
        .map((key, index) => {
          const value = key === "mealTime" ? mealTimeText(record) : record[key];
          return value ? `${labels[index]}：${value}` : "";
        })
        .filter(Boolean)
        .join(" / ");
      return values ? `${formatDate(record.date)}　${values}` : "";
    })
    .filter(Boolean);
  return rows.length ? rows.map((row) => summaryItem("記録", row)).join("") : `<div class="empty">表示できる記録はありません。</div>`;
}

function careLines() {
  const labels = {
    nailDate: "爪切り",
    shampooDate: "シャンプー",
    brushingDate: "ブラッシング",
    earDate: "耳掃除",
    toothDate: "歯みがき"
  };
  return state.records
    .flatMap((record) => Object.entries(labels).map(([key, label]) => record[key] ? `${label}：${formatDate(record[key])}` : ""))
    .filter(Boolean)
    .slice(-20)
    .reverse();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js").catch((error) => {
    console.log("pet-note: service worker skipped", error);
  });
}

render("home");
