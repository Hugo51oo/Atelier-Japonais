"use strict";
// ═══ Utilitaires ═══════════════════════════════════════════════════
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a).slice(0, n);
const h = html => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const ICON = {
  play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
  back: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
};
const speakBtn = (text, label = "Écouter") => `<button class="icon-btn" data-say="${esc(text)}" aria-label="${esc(label)}">${ICON.play}</button>`;

// Comparaison tolérante du romaji : macrons, ou/oo, kunrei, ponctuation
function norm(s) {
  s = String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  s = s.replace(/[^a-z]/g, "");
  s = s.replace(/si/g, "shi").replace(/ti/g, "chi").replace(/tu/g, "tsu").replace(/zi/g, "ji").replace(/(^|[^sc])hu/g, "$1fu")
       .replace(/sya/g,"sha").replace(/syu/g,"shu").replace(/syo/g,"sho").replace(/tya/g,"cha").replace(/tyu/g,"chu").replace(/tyo/g,"cho")
       .replace(/wo/g, "o");
  s = s.replace(/ou/g, "o").replace(/oo/g, "o").replace(/uu/g, "u").replace(/aa/g, "a").replace(/ii/g, "i").replace(/ee/g, "e");
  s = s.replace(/nn/g, "n");
  return s;
}
const same = (input, answers) => [].concat(answers).some(a => norm(a) === norm(input) && norm(input) !== "");

// ═══ État & sauvegarde ════════════════════════════════════════════
const KEY = "atelier-japonais-v1";
const DEFAULT_STATE = () => ({ lessons:{}, kana:{}, kanji:{}, custom:[], prefs:{ showJp:true, slow:false, theme:"auto" }, updatedAt:0 });
let state = DEFAULT_STATE();
try { const raw = localStorage.getItem(KEY); if (raw) state = Object.assign(DEFAULT_STATE(), JSON.parse(raw)); } catch (e) {}

let db = null, dbTimer = null, dbBusy = false, dbDirty = false;
function save() {
  state.updatedAt = Date.now();
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  if (!db) return;
  dbDirty = true;
  clearTimeout(dbTimer);
  dbTimer = setTimeout(flushDb, 1200);
}
async function flushDb() {
  if (!db || dbBusy || !dbDirty) return;
  dbBusy = true; dbDirty = false;
  try { await db.doc("atelier/etat").set(JSON.parse(JSON.stringify(state))); }
  catch (e) { if (e && e.code === "unavailable") dbDirty = true; }
  dbBusy = false;
  if (dbDirty) dbTimer = setTimeout(flushDb, 1500);
}
(async () => {
  try {
    if (!window.claude || !window.claude.use) return;
    const d = await window.claude.use("db");
    if (!d) return;
    db = d;
    const snap = await db.doc("atelier/etat").get();
    if (snap.exists) {
      const remote = snap.data();
      if ((remote.updatedAt || 0) > (state.updatedAt || 0)) {
        state = Object.assign(DEFAULT_STATE(), JSON.parse(JSON.stringify(remote)));
        try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
        applyPrefs(); rebuildDico(); render();
        return;
      }
    }
    if (state.updatedAt) { dbDirty = true; flushDb(); }
  } catch (e) {}
})();

// ═══ Voix japonaise ═══════════════════════════════════════════════
const TTS = { ok: "speechSynthesis" in window, voice: null, checked: false };
function loadVoices() {
  if (!TTS.ok) return;
  const vs = speechSynthesis.getVoices();
  TTS.voice = vs.find(v => /^ja(-|_|$)/i.test(v.lang)) || null;
  if (vs.length) TTS.checked = true;
}
if (TTS.ok) { loadVoices(); speechSynthesis.onvoiceschanged = () => { loadVoices(); const n = $("#voice-notice"); if (n && TTS.voice) n.remove(); }; }
function speak(text, rate) {
  if (!TTS.ok || !text) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    if (TTS.voice) u.voice = TTS.voice;
    u.rate = rate || (state.prefs.slow ? 0.62 : 0.9);
    const lamp = $("#lamp");
    u.onstart = () => lamp && lamp.classList.add("on");
    u.onend = u.onerror = () => lamp && lamp.classList.remove("on");
    speechSynthesis.speak(u);
  } catch (e) {}
}
document.addEventListener("click", e => { const b = e.target.closest("[data-say]"); if (b) { e.preventDefault(); speak(b.dataset.say); } });

// ═══ Préférences ══════════════════════════════════════════════════
function applyTheme(fade) {
  const t = state.prefs.theme || "auto";
  const root = document.documentElement;
  const paint = () => { if (t === "auto") delete root.dataset.app; else root.dataset.app = t; };
  $$("#themeSeg button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.th === t)));
  if (!fade || matchMedia("(prefers-reduced-motion: reduce)").matches) return paint();
  const veil = document.createElement("div");
  veil.className = "theme-veil";
  veil.style.background = getComputedStyle(root).getPropertyValue("--ink").trim() || "#000";
  document.body.append(veil);
  paint();
  requestAnimationFrame(() => requestAnimationFrame(() => veil.classList.add("out")));
  setTimeout(() => veil.remove(), 520);
}
$$("#themeSeg button").forEach(b => b.onclick = () => { state.prefs.theme = b.dataset.th; applyTheme(true); save(); });

function applyPrefs() {
  applyTheme(false);
  document.body.classList.toggle("hide-jp", !state.prefs.showJp);
  $("#pref-jp").checked = !!state.prefs.showJp;
  $("#pref-slow").checked = !!state.prefs.slow;
}
$("#pref-jp").onchange = e => { state.prefs.showJp = e.target.checked; applyPrefs(); save(); };
$("#pref-slow").onchange = e => { state.prefs.slow = e.target.checked; applyPrefs(); save(); speak("ゆっくり話します"); };
function voiceReadout() {
  const r = $("#voiceReadout");
  if (!TTS.ok) r.textContent = "Synthèse vocale indisponible dans ce navigateur : les exercices d'écoute afficheront la transcription.";
  else if (TTS.voice) r.textContent = "Voix japonaise : " + TTS.voice.name + ". La lampe s'allume pendant qu'elle parle.";
  else r.textContent = "Aucune voix japonaise détectée. Sur iPhone : Réglages › Accessibilité › Contenu énoncé › Voix › Japonais. Sur Mac : Réglages › Accessibilité › Contenu énoncé.";
}
const sheet = $("#sheet"), sheetBg = $("#sheetBg");
function openSheet(open) { sheet.classList.toggle("open", open); sheetBg.hidden = !open; if (open) { loadVoices(); voiceReadout(); $("#closeSettings").focus(); } }
$("#openSettings").onclick = () => openSheet(true);
$("#closeSettings").onclick = sheetBg.onclick = () => openSheet(false);
document.addEventListener("keydown", e => { if (e.key === "Escape" && sheet.classList.contains("open")) openSheet(false); });
$("#testVoice").onclick = () => speak("こんにちは。日本語工房へようこそ。");

// ═══ Dictionnaire (données) ═══════════════════════════════════════
const mkAll = rows => rows.flatMap(r => r.cells.filter(Boolean).map(([k, ro]) => ({ k, r: ro, row: r.id })));
const SCRIPTS = {
  hira: { id: "hira", jp: "ひらがな", fr: "Hiragana", rows: HIRA_ROWS, words: HIRA_WORDS, small: ["っ", "ゃ", "ゅ", "ょ"],
    intro: "L'écriture de base : les mots japonais, les particules et toutes les terminaisons de verbes passent par là. C'est le premier alphabet à lire couramment." },
  kata: { id: "kata", jp: "カタカナ", fr: "Katakana", rows: KANA_ROWS, words: KANA_WORDS, small: ["ー", "ッ", "ャ", "ュ", "ョ"],
    intro: "L'alphabet des mots venus d'ailleurs, des noms étrangers et des onomatopées. On les apprend par le son d'abord, rangée par rangée, puis on les trace." },
};
Object.values(SCRIPTS).forEach(sc => { sc.all = mkAll(sc.rows); });
const ALL_KANA = [...SCRIPTS.hira.all, ...SCRIPTS.kata.all];
const curScript = () => SCRIPTS[route.script === "hira" ? "hira" : "kata"];
let DICO = [];
function rebuildDico() {
  const seen = new Map();
  const add = (w, d, src, custom) => {
    const key = w.jp + "|" + norm(w.r);
    if (seen.has(key)) { const e = seen.get(key); if (!e.src.includes(src)) e.src += " · " + src; return; }
    seen.set(key, { ...w, d, src, custom: !!custom });
  };
  LESSONS.forEach((l, i) => l.vocab.forEach(([r, jp, k, fr]) => add({ r, jp, k, fr }, THEMES[l.theme].fr, "Leçon " + (i + 1))));
  KANA_WORDS.forEach(([jp, r, fr]) => add({ r, jp, k: jp, fr }, "Katakana", "Lecture katakana"));
  HIRA_WORDS.forEach(([jp, r, fr]) => add({ r, jp, k: jp, fr }, "Hiragana", "Lecture hiragana"));
  KANJI.forEach(([c, , , , ex]) => ex.forEach(([r, jp, k, fr]) => add({ r, jp, k, fr }, "Kanji", "Kanji " + c)));
  state.custom.forEach(w => add(w, w.d || "Mes ajouts", "Ajouté le " + (w.added || ""), true));
  DICO = [...seen.values()].map(w => (w.custom ? w : w)).sort((a, b) => norm(a.r).localeCompare(norm(b.r)));
}
rebuildDico();

// ═══ Navigation ═══════════════════════════════════════════════════
let route = { tab: "lecons" };
try { const t = localStorage.getItem(KEY + "-tab"); if (t) route.tab = t; } catch (e) {}
function go(r) { route = r; try { localStorage.setItem(KEY + "-tab", r.tab); } catch (e) {} render(); window.scrollTo({ top: 0 }); }
$$(".tab").forEach(b => b.onclick = () => go({ tab: b.dataset.tab, script: b.dataset.tab === "kana" ? (route.script || "kata") : undefined }));
const app = $("#app");
// Décalage progressif des entrées d'une liste ou d'une grille, pour le fondu en cascade.
function stagger(scope) {
  const root = scope || app;
  const groups = $$("[data-stagger]", root);
  if (root.matches && root.matches("[data-stagger]")) groups.push(root);
  groups.forEach(g => [...g.children].forEach((el, i) => el.style.setProperty("--i", Math.min(i, 26))));
}
function render() {
  if (currentTracer) { currentTracer.destroy(); currentTracer = null; }
  if (currentSheet) { currentSheet.destroy(); currentSheet = null; }
  $$(".tab").forEach(b => b.setAttribute("aria-selected", b.dataset.tab === route.tab ? "true" : "false"));
  app.innerHTML = "";
  ({ lecons: viewLessons, kana: viewKana, kanji: viewKanji, calli: viewCalli, dico: viewDico })[route.tab]();
  stagger();
}

// ═══ Leçons ═══════════════════════════════════════════════════════
const lessonDone = l => (state.lessons[l.id]?.best ?? 0) >= 80;
const kanaMastered = () => ALL_KANA.filter(x => kanaLevel(x.k) === 2).length;
function kanaLevel(k) { const s = state.kana[k]; if (!s) return 0; if (s.ok >= 4 && s.ok / s.n >= 0.8) return 2; return s.n ? 1 : 0; }

function voiceNotice() {
  if (!TTS.ok) return `<div class="notice" id="voice-notice">La synthèse vocale n'est pas disponible dans ce navigateur : les exercices d'écoute afficheront la transcription.</div>`;
  if (TTS.checked && !TTS.voice) return `<div class="notice" id="voice-notice">Aucune voix japonaise détectée sur cet appareil. Sur iPhone : Réglages › Accessibilité › Contenu énoncé › Voix › Japonais. Sur Mac : Réglages › Accessibilité › Contenu énoncé › Voix du système.</div>`;
  return "";
}

function viewLessons() {
  if (route.lesson) return viewLesson(LESSONS.find(l => l.id === route.lesson));
  const done = LESSONS.filter(lessonDone).length;
  const traced = Object.values(state.kanji).filter(v => v.clean).length;
  app.append(h(`<section>
    <div class="intro">
      <div>
        <div class="eyebrow">Parcours culturel</div>
        <h1>Apprendre le Japon par sa langue</h1>
        <p>Chaque leçon part d'un pan de la société japonaise — histoire, politique, société, arts — et en tire le vocabulaire, une règle de grammaire et une série d'exercices. L'oral passe d'abord par le romaji ; l'écriture japonaise l'accompagne toujours.</p>
      </div>
    </div>
    <div class="stats">
      <div class="stat"><b>${done}<small> / ${LESSONS.length}</small></b><span>leçons validées</span></div>
      <div class="stat"><b>${kanaMastered()}<small> / ${ALL_KANA.length}</small></b><span>kana maîtrisés</span></div>
      <div class="stat"><b>${traced}<small> / ${KANJI.length}</small></b><span>kanji tracés sans aide</span></div>
      <div class="stat"><b>${DICO.length}</b><span>mots au dico</span></div>
    </div>
    ${voiceNotice()}
    <div class="lessons" data-stagger style="margin-top:14px"></div>
  </section>`));
  const list = $(".lessons", app);
  LESSONS.forEach((l, i) => {
    const th = THEMES[l.theme], best = state.lessons[l.id]?.best;
    const b = h(`<button class="lcard">
      <span class="num">第${"一二三四五六七八九十"[i]}課</span>
      <span>
        <span class="tag"><span class="jp">${th.jp}</span>${th.fr}</span>
        <h2>${esc(l.title)}</h2>
        <span class="jpt">${l.jp}</span> <span class="rt">${esc(l.r)}</span>
        <span class="meter" aria-hidden="true"><i style="width:${best ?? 0}%"></i></span>
      </span>
      ${lessonDone(l) ? `<span class="hanko" title="Leçon validée (${best} %)">済</span>` : `<span class="hanko empty" title="${best != null ? "Meilleur score : " + best + " %" : "Pas encore faite"}">済</span>`}
    </button>`);
    b.onclick = () => go({ tab: "lecons", lesson: l.id, step: "culture" });
    list.append(b);
  });
  app.append(h(`<footer class="credit">Tracés des kanji et des kana : données <a href="https://kanjivg.tagaini.net" target="_blank" rel="noopener">KanjiVG</a> d'Ulrich Apel, licence CC BY-SA 3.0. Voix : synthèse vocale japonaise de ton appareil.</footer>`));
}

const STEPS = [["culture","文化","Culture"],["vocab","語彙","Vocabulaire"],["grammaire","文法","Grammaire"],["exercices","練習","Exercices"]];
function viewLesson(l) {
  const i = LESSONS.indexOf(l), th = THEMES[l.theme];
  app.append(h(`<div>
    <button class="back" id="bk">${ICON.back}Toutes les leçons</button>
    <div class="lhead">
      <div class="row"><span class="tag"><span class="jp">${th.jp}</span>${th.r} · ${th.fr}</span><span class="eyebrow">Leçon ${i + 1}</span></div>
      <h1>${esc(l.title)}</h1>
      <div><span class="jpt">${l.jp}</span> <span class="muted">${esc(l.r)}</span></div>
    </div>
    <nav class="steps">${STEPS.map(([id, jp, fr]) => `<button data-step="${id}" ${route.step === id ? 'aria-current="step"' : ""}><span class="jp">${jp}</span><small>${fr}</small></button>`).join("")}</nav>
    <div id="stepbody"></div>
  </div>`));
  $("#bk").onclick = () => go({ tab: "lecons" });
  $$(".steps button").forEach(b => b.onclick = () => go({ ...route, step: b.dataset.step }));
  const body = $("#stepbody");
  const nextBtn = (step, label) => `<div class="row" style="margin-top:22px"><button class="btn primary" data-next="${step}">${label} →</button></div>`;

  if (route.step === "culture") {
    body.append(h(`<div class="stack">
      <div class="prose">${l.culture.map(p => `<p>${p}</p>`).join("")}</div>
      <div><div class="eyebrow" style="margin-bottom:8px">Kanji croisés dans cette leçon — à tracer</div>
      <div class="kanji-strip">${l.kanji.map(k => `<button class="kbtn" data-kanji="${k}" title="Tracer ${k}">${k}</button>`).join("")}</div></div>
      ${nextBtn("vocab", "Vocabulaire")}
    </div>`));
  }
  if (route.step === "vocab") {
    body.append(h(`<div>
      <p class="muted" style="margin-top:0">${l.vocab.length} mots — tous ajoutés au dico. Touche le haut-parleur pour entendre la prononciation.</p>
      <div class="vlist" data-stagger>${l.vocab.map(([r, jp, k, fr]) => `<div class="vrow">
        <span class="romaji">${esc(r)}</span>
        <span class="w">${jp}${k !== jp ? `<small>${k}</small>` : ""}</span>
        <span class="fr">${esc(fr)}</span>
        ${speakBtn(k)}
      </div>`).join("")}</div>
      ${nextBtn("grammaire", "Grammaire")}
    </div>`));
  }
  if (route.step === "grammaire") {
    const g = l.grammar;
    body.append(h(`<div>
      <h2 style="margin-bottom:12px">${esc(g.title)}</h2>
      <div class="prose">${g.explain.map(p => `<p>${p}</p>`).join("")}</div>
      <div class="gtable-wrap"><table class="g"><thead><tr>${g.table.head.map(x => `<th>${esc(x)}</th>`).join("")}</tr></thead>
      <tbody>${g.table.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
      <h3 style="margin:8px 0 4px">Phrases de la leçon</h3>
      <div>${l.sentences.map(s => `<div class="sent">
        <span class="romaji">${esc(s.r)}</span>
        ${speakBtn(s.say || s.jp)}
        <span class="jpl">${s.jp}</span>
        <span class="frl">${esc(s.fr)}</span>
      </div>`).join("")}</div>
      ${nextBtn("exercices", "Exercices")}
    </div>`));
  }
  if (route.step === "exercices") runLessonExercises(l, body);
  $$("[data-next]", body).forEach(b => b.onclick = () => go({ ...route, step: b.dataset.next }));
  $$("[data-kanji]", body).forEach(b => b.onclick = () => go({ tab: "kanji", kanji: b.dataset.kanji }));
}

// ─── Moteur d'exercices ─────────────────────────────────────────────
function buildLessonQueue(l) {
  const V = l.vocab.map(([r, jp, k, fr]) => ({ r, jp, k, fr }));
  const S = l.sentences;
  const q = [];
  const frOpts = (w, pool) => shuffle([w.fr, ...pick(pool.filter(x => x.fr !== w.fr), 3).map(x => x.fr)]);
  pick(V, 2).forEach(w => q.push({ type: "wordToFr", w, opts: frOpts(w, V) }));
  pick(V, 2).forEach(w => q.push({ type: "listenWord", w, opts: frOpts(w, V) }));
  pick(V, 2).forEach(w => q.push({ type: "frToRomaji", w }));
  pick(V, 1).forEach(w => q.push({ type: "dictation", w }));
  pick(S, 3).forEach(s => q.push({ type: "reorder", s }));
  pick(S, 1).forEach(s => q.push({ type: "listenSentence", s, opts: shuffle([s.fr, ...pick(S.filter(x => x !== s), 3).map(x => x.fr)]) }));
  pick(l.conj, 3).forEach(c => q.push({ type: "conj", c }));
  pick(l.quiz, 2).forEach(z => q.push({ type: "quiz", z, opts: shuffle(z.o.map((t, i) => ({ t, ok: i === z.a }))) }));
  // on mélange en gardant une progression douce : vocab → phrases → culture
  const order = { wordToFr:0, listenWord:1, frToRomaji:2, dictation:2, listenSentence:3, reorder:3, conj:4, quiz:5 };
  return q.sort((a, b) => order[a.type] - order[b.type] || Math.random() - .5);
}

const KIND = {
  wordToFr: ["読む", "Sens du mot"], listenWord: ["聞く", "Écoute"], frToRomaji: ["書く", "Écrire en romaji"],
  dictation: ["聞く", "Dictée"], reorder: ["並べる", "Remettre dans l'ordre"], listenSentence: ["聞く", "Compréhension orale"],
  conj: ["活用", "Conjugaison"], quiz: ["文化", "Culture"],
};

function runLessonExercises(l, body) {
  const queue = buildLessonQueue(l);
  let idx = 0, score = 0;
  body.innerHTML = "";
  const box = h(`<div class="ex"></div>`);
  body.append(box);
  const next = () => { idx++; idx < queue.length ? show() : finish(); };
  function finish() {
    const pct = Math.round(score / queue.length * 100);
    const prev = state.lessons[l.id]?.best ?? 0;
    state.lessons[l.id] = { best: Math.max(prev, pct), last: pct, at: new Date().toISOString().slice(0, 10) };
    save();
    box.innerHTML = "";
    box.append(h(`<div class="card result">
      ${pct >= 80 ? `<div class="hanko">済</div>` : ""}
      <div class="score">${pct} %</div>
      <p class="muted">${score} bonne${score > 1 ? "s" : ""} réponse${score > 1 ? "s" : ""} sur ${queue.length}${pct >= 80 ? " — leçon validée." : " — il faut 80 % pour valider la leçon."}</p>
      <div class="row" style="justify-content:center;margin-top:8px">
        <button class="btn" id="again">Recommencer</button>
        <button class="btn primary" id="toList">${LESSONS.indexOf(l) < LESSONS.length - 1 && pct >= 80 ? "Leçon suivante" : "Retour aux leçons"}</button>
      </div>
    </div>`));
    $("#again").onclick = () => runLessonExercises(l, body);
    $("#toList").onclick = () => {
      const i = LESSONS.indexOf(l);
      if (pct >= 80 && i < LESSONS.length - 1) go({ tab: "lecons", lesson: LESSONS[i + 1].id, step: "culture" });
      else go({ tab: "lecons" });
    };
  }
  function show() {
    const it = queue[idx];
    box.innerHTML = "";
    box.append(h(`<div class="progress"><span>${idx + 1} / ${queue.length}</span><span class="meter"><i style="width:${idx / queue.length * 100}%"></i></span><span>${score} ✓</span></div>`));
    const [kj, kfr] = KIND[it.type];
    const card = h(`<div class="card"><div class="kind"><span class="tag"><span class="jp">${kj}</span>${kfr}</span></div></div>`);
    box.append(card);
    renderExercise(it, card, ok => { if (ok) score++; }, next);
  }
  show();
}

// Rendu d'un exercice. report(ok) est appelé une fois ; onNext passe à la suite.
function renderExercise(it, card, report, onNext) {
  let answered = false;
  const footer = h(`<div class="ex-actions"><span></span><button class="btn primary" hidden>Continuer →</button></div>`);
  const cont = footer.lastElementChild;
  cont.onclick = onNext;
  const settle = (ok, html) => {
    if (answered) return; answered = true; report(ok);
    const fb = h(`<div class="fb ${ok ? "ok" : "bad"}"><span class="t">${ok ? "Juste !" : "Pas tout à fait."}</span>${html || ""}</div>`);
    footer.isConnected ? card.insertBefore(fb, footer) : card.append(fb);
    cont.hidden = false; cont.focus();
  };
  const wordLine = w => `<span><b class="romaji">${esc(w.r)}</b> · <span class="jp">${w.jp}</span> — ${esc(w.fr)}</span>`;
  const sentLine = s => `<span><b class="romaji">${esc(s.r)}</b></span><span class="jp jpl">${s.jp}</span><span>${esc(s.fr)}</span>`;
  const mcq = (opts, isOk, fbHtml) => {
    const wrap = h(`<div class="opts" data-stagger></div>`);
    opts.forEach((o, i) => {
      const label = typeof o === "string" ? o : o.t;
      const b = h(`<button class="opt"><span class="key">${i + 1}</span><span>${esc(label)}</span></button>`);
      b.onclick = () => {
        if (answered) return;
        const ok = isOk(o);
        b.classList.add(ok ? "ok" : "bad");
        if (!ok) $$(".opt", wrap).forEach((x, j) => { if (isOk(opts[j])) x.classList.add("ok"); });
        $$(".opt", wrap).forEach(x => x.disabled = true);
        settle(ok, ok ? "" : fbHtml);
      };
      wrap.append(b);
    });
    stagger(wrap);
    return wrap;
  };
  const typed = (answers, fbHtml, placeholder = "Réponse en romaji") => {
    const line = h(`<form class="answer-line"><input type="text" id="ans-${Math.random().toString(36).slice(2, 7)}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${placeholder}"><button class="btn primary">Valider</button></form>`);
    const inp = line.querySelector("input");
    line.onsubmit = e => {
      e.preventDefault();
      if (answered) return;
      if (!inp.value.trim()) { inp.focus(); return; }
      const ok = same(inp.value, answers);
      inp.disabled = true; line.querySelector("button").disabled = true;
      settle(ok, (ok ? "" : `<span>Réponse attendue : </span>`) + fbHtml);
    };
    setTimeout(() => inp.focus({ preventScroll: true }), 30);
    return line;
  };
  const listenBlock = text => {
    const b = h(`<div class="row" style="gap:14px"><button class="listen-big" aria-label="Réécouter">${ICON.play}</button><button class="btn ghost" data-reveal>Voir la transcription</button></div>`);
    b.firstElementChild.onclick = () => speak(text);
    setTimeout(() => speak(text), 250);
    return b;
  };

  switch (it.type) {
    case "wordToFr": {
      card.append(h(`<div><div class="prompt romaji">${esc(it.w.r)}</div><div class="bigjp jp-opt">${it.w.jp}</div></div>`));
      card.append(mcq(it.opts, o => o === it.w.fr, wordLine(it.w)));
      break;
    }
    case "listenWord": {
      const lb = listenBlock(it.w.k);
      card.append(h(`<p class="muted" style="margin:0 0 12px">Écoute le mot et choisis sa traduction.</p>`), lb);
      lb.querySelector("[data-reveal]").onclick = e => { e.target.replaceWith(h(`<span><b class="romaji">${esc(it.w.r)}</b> · <span class="jp">${it.w.jp}</span></span>`)); };
      card.append(mcq(it.opts, o => o === it.w.fr, wordLine(it.w)));
      break;
    }
    case "frToRomaji": {
      card.append(h(`<div><p class="muted" style="margin:0">Comment dit-on…</p><div class="prompt">« ${esc(it.w.fr)} »</div></div>`));
      card.append(typed([it.w.r], wordLine(it.w)));
      break;
    }
    case "dictation": {
      const lb = listenBlock(it.w.k);
      lb.querySelector("[data-reveal]").remove();
      card.append(h(`<p class="muted" style="margin:0 0 12px">Écris en romaji le mot que tu entends.</p>`), lb);
      if (!TTS.ok) card.append(h(`<p class="bigjp">${it.w.jp} <small class="muted">(${it.w.k})</small></p>`));
      card.append(typed([it.w.r], wordLine(it.w)));
      break;
    }
    case "listenSentence": {
      const lb = listenBlock(it.s.say || it.s.jp);
      card.append(h(`<p class="muted" style="margin:0 0 12px">Écoute la phrase. Que veut-elle dire ?</p>`), lb);
      lb.querySelector("[data-reveal]").onclick = e => { e.target.replaceWith(h(`<span><b class="romaji">${esc(it.s.r)}</b></span>`)); };
      card.append(mcq(it.opts, o => o === it.s.fr, sentLine(it.s)));
      break;
    }
    case "reorder": {
      const s = it.s;
      card.append(h(`<div class="row" style="justify-content:space-between;flex-wrap:nowrap"><div><p class="muted" style="margin:0">Construis la phrase en romaji :</p><div class="prompt">« ${esc(s.fr)} »</div></div>${speakBtn(s.say || s.jp, "Écouter la phrase")}</div>`));
      const build = h(`<div class="build" aria-label="Ta phrase"></div>`);
      const bank = h(`<div class="bank"></div>`);
      let toks = shuffle(s.t.map((t, i) => ({ t, i })));
      if (toks.every((x, j) => x.i === j) && toks.length > 1) toks.reverse();
      const chosen = [];
      toks.forEach(x => {
        const b = h(`<button class="tok">${esc(x.t)}</button>`);
        b.onclick = () => {
          if (answered || b.classList.contains("used")) return;
          b.classList.add("used");
          const c = h(`<button class="tok">${esc(x.t)}</button>`);
          c.onclick = () => { if (answered) return; c.remove(); b.classList.remove("used"); chosen.splice(chosen.indexOf(x), 1); check.disabled = chosen.length !== s.t.length; };
          build.append(c); chosen.push(x);
          check.disabled = chosen.length !== s.t.length;
        };
        bank.append(b);
      });
      const check = h(`<button class="btn primary" disabled>Vérifier</button>`);
      check.onclick = () => {
        const ok = norm(chosen.map(x => x.t).join("")) === norm(s.t.join(""));
        check.disabled = true;
        settle(ok, sentLine(s));
        speak(s.say || s.jp);
      };
      card.append(build, bank, h(`<div class="row" style="margin-top:14px"></div>`));
      card.lastElementChild.append(check);
      break;
    }
    case "conj": {
      const c = it.c;
      card.append(h(`<div><div class="prompt romaji">${esc(c.q).replace("___", '<span style="color:var(--ember)">＿＿</span>')}</div><p class="muted" style="margin:4px 0 0">${esc(c.hint)}</p></div>`));
      card.append(typed(c.a, `<span><b class="romaji">${esc(c.a[0])}</b></span>`));
      break;
    }
    case "quiz": {
      card.append(h(`<div class="prompt">${esc(it.z.q)}</div>`));
      const good = it.opts.find(o => o.ok).t;
      card.append(mcq(it.opts, o => o.ok, `<span>${esc(good)}</span>`));
      break;
    }
  }
  card.append(footer);
  // raccourcis clavier 1-4 pour les QCM
  const onKey = e => {
    if (!card.isConnected) { document.removeEventListener("keydown", onKey); return; }
    if (e.target.matches("input")) return;
    const n = parseInt(e.key, 10);
    const opts = $$(".opt", card);
    if (n >= 1 && n <= opts.length && !answered) opts[n - 1].click();
    else if (e.key === "Enter" && answered && document.activeElement !== cont) { e.preventDefault(); cont.click(); }
  };
  document.addEventListener("keydown", onKey);
}

// ═══ Tracé (canvas + KanjiVG) ════════════════════════════════════
let currentTracer = null;
const svgNS = "http://www.w3.org/2000/svg";
const measureSvg = document.createElementNS(svgNS, "svg");
measureSvg.setAttribute("width", "0"); measureSvg.setAttribute("height", "0");
measureSvg.style.position = "absolute"; measureSvg.style.left = "-9999px";
document.body.append(measureSvg);
const strokeCache = new Map();
function strokeInfo(d) {
  if (strokeCache.has(d)) return strokeCache.get(d);
  const p = document.createElementNS(svgNS, "path");
  p.setAttribute("d", d); measureSvg.append(p);
  const len = p.getTotalLength(), pts = [];
  const N = 32;
  for (let i = 0; i < N; i++) { const q = p.getPointAtLength(len * i / (N - 1)); pts.push([q.x, q.y]); }
  p.remove();
  const info = { len, pts, path: new Path2D(d) };
  strokeCache.set(d, info);
  return info;
}
function resample(pts, N = 32) {
  if (pts.length < 2) return { pts: Array(N).fill(pts[0] || [0, 0]), len: 0 };
  const segs = [0];
  for (let i = 1; i < pts.length; i++) segs.push(segs[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = segs[segs.length - 1], out = [];
  let j = 1;
  for (let i = 0; i < N; i++) {
    const t = total * i / (N - 1);
    while (j < pts.length - 1 && segs[j] < t) j++;
    const s0 = segs[j - 1], s1 = segs[j], f = s1 > s0 ? (t - s0) / (s1 - s0) : 0;
    out.push([pts[j - 1][0] + (pts[j][0] - pts[j - 1][0]) * f, pts[j - 1][1] + (pts[j][1] - pts[j - 1][1]) * f]);
  }
  return { pts: out, len: total };
}
const meanDist = (a, b) => a.reduce((s, p, i) => s + Math.hypot(p[0] - b[i][0], p[1] - b[i][1]), 0) / a.length;
const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function Tracer(host, char, opts = {}) {
  const strokes = (STROKES[char] || []).map(strokeInfo);
  let guided = opts.guided ?? true;
  const el = h(`<div class="tracer">
    <canvas aria-label="Zone de tracé pour ${char}"></canvas>
    <div class="msg" aria-live="polite"></div>
    <div class="row">
      <div class="seg"><button data-m="guided">Avec modèle</button><button data-m="free">Sans modèle</button></div>
    </div>
    <div class="row">
      <button class="btn" data-a="demo">Voir l'ordre des traits</button>
      <button class="btn ghost" data-a="reset">Effacer</button>
    </div>
  </div>`);
  host.append(el);
  const cv = el.querySelector("canvas"), ctx = cv.getContext("2d"), msg = el.querySelector(".msg");
  let demoing = false, size = 300, done = 0, misses = 0, totalMisses = 0, live = null, hint = null, anim = 0, alive = true;
  const setMsg = (t, cls = "") => { msg.textContent = t; msg.className = "msg " + cls; };
  function fit() {
    const w = Math.min(cv.parentElement.clientWidth || 300, 340);
    size = w; const dpr = window.devicePixelRatio || 1;
    cv.width = w * dpr; cv.height = w * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  function draw(partial) {
    const col = { line: cssVar("--rule"), ghost: cssVar("--ghost"), ink: cssVar("--paper"), ai: cssVar("--filament"), shu: cssVar("--ember") };
    ctx.clearRect(0, 0, size, size);
    ctx.save(); ctx.strokeStyle = col.line; ctx.lineWidth = 1; ctx.setLineDash([4, 5]);
    ctx.beginPath(); ctx.moveTo(size / 2, 8); ctx.lineTo(size / 2, size - 8); ctx.moveTo(8, size / 2); ctx.lineTo(size - 8, size / 2); ctx.stroke();
    ctx.restore();
    const k = size / 109;
    ctx.save(); ctx.scale(k, k); ctx.lineCap = "round"; ctx.lineJoin = "round";
    if (guided) { ctx.strokeStyle = col.ghost; ctx.lineWidth = 5; strokes.forEach((s, i) => { if (i >= done) ctx.stroke(s.path); }); }
    ctx.strokeStyle = col.ink; ctx.lineWidth = 5;
    strokes.forEach((s, i) => { if (i < done) ctx.stroke(s.path); });
    if (guided && done < strokes.length && !partial) {
      const [x, y] = strokes[done].pts[0];
      ctx.fillStyle = col.shu; ctx.beginPath(); ctx.arc(x, y, 3.2, 0, 7); ctx.fill();
      ctx.font = "600 7px " + getComputedStyle(document.body).fontFamily; ctx.fillStyle = col.shu;
      ctx.fillText(String(done + 1), x + 4.5, y - 3.5);
    }
    if (hint) { ctx.strokeStyle = col.ai; ctx.lineWidth = 5; ctx.setLineDash([hint.len, hint.len]); ctx.lineDashOffset = hint.len * (1 - hint.t); ctx.stroke(hint.path); ctx.setLineDash([]); }
    if (partial) partial(ctx, col);
    ctx.restore();
    if (live && live.length > 1) {
      ctx.save(); ctx.strokeStyle = col.ai; ctx.lineWidth = 5 * k; ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath(); ctx.moveTo(live[0][0] * k, live[0][1] * k); live.forEach(p => ctx.lineTo(p[0] * k, p[1] * k)); ctx.stroke(); ctx.restore();
    }
  }
  function animateStroke(s, dur = 520) {
    return new Promise(res => {
      if (reduceMotion) { hint = { ...s, t: 1 }; draw(); setTimeout(() => { hint = null; res(); }, 350); return; }
      const t0 = performance.now();
      const step = now => {
        if (!alive) return res();
        const t = Math.min(1, (now - t0) / dur);
        hint = { ...s, t }; draw();
        if (t < 1) anim = requestAnimationFrame(step); else { setTimeout(() => { hint = null; draw(); res(); }, 160); }
      };
      anim = requestAnimationFrame(step);
    });
  }
  async function demo() {
    const keep = done; demoing = true; done = 0; draw();
    for (let i = 0; i < strokes.length && alive; i++) { await animateStroke(strokes[i], 480); done = i + 1; draw(); }
    await new Promise(r => setTimeout(r, 500));
    if (!alive) return;
    done = keep; demoing = false; draw();
  }
  function reset() { done = 0; misses = 0; totalMisses = 0; hint = null; setMsg(guided ? `${strokes.length} trait${strokes.length > 1 ? "s" : ""} — commence au point rouge.` : `${strokes.length} trait${strokes.length > 1 ? "s" : ""}, de mémoire.`); draw(); }
  function toLocal(e) { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * 109, (e.clientY - r.top) / r.height * 109]; }
  cv.addEventListener("pointerdown", e => { if (demoing || done >= strokes.length) return; cv.setPointerCapture(e.pointerId); live = [toLocal(e)]; e.preventDefault(); });
  cv.addEventListener("pointermove", e => { if (!live) return; const p = toLocal(e), last = live[live.length - 1]; if (Math.hypot(p[0] - last[0], p[1] - last[1]) > .8) { live.push(p); draw(); } });
  const up = () => {
    if (!live) return;
    const pts = live; live = null;
    const exp = strokes[done];
    const r = resample(pts);
    let ok = false, reversed = false;
    if (r.len && r.len > 2) {
      const dF = meanDist(r.pts, exp.pts), dR = meanDist(r.pts.slice().reverse(), exp.pts);
      const tol = exp.len < 25 ? 15 : 13.5;
      const ratio = r.len / exp.len;
      ok = dF < tol && ratio > 0.35 && ratio < 2.4;
      reversed = !ok && dR < tol && dR < dF;
    } else if (exp.len < 12) {
      ok = Math.hypot(pts[0][0] - exp.pts[16][0], pts[0][1] - exp.pts[16][1]) < 14;
    }
    if (ok) {
      done++; misses = 0; draw();
      if (done === strokes.length) {
        const clean = totalMisses === 0;
        setMsg(clean ? (guided ? "Parfait ! Essaie maintenant sans modèle." : "Parfait, tracé de mémoire sans erreur.") : `Terminé avec ${totalMisses} correction${totalMisses > 1 ? "s" : ""}.`, "ok");
        opts.onDone && opts.onDone({ clean, guided, misses: totalMisses });
      } else setMsg(`Trait ${done} / ${strokes.length} ✓`, "ok");
    } else {
      misses++; totalMisses++;
      cv.classList.remove("shake"); void cv.offsetWidth; cv.classList.add("shake");
      setMsg(reversed ? "Bon trait, mais dans le mauvais sens : de haut en bas, de gauche à droite." : `Ce n'est pas le trait ${done + 1}. ${misses >= 2 ? "Regarde le modèle." : "Réessaie."}`, "bad");
      draw();
      if (guided ? misses >= 2 : misses >= 3) animateStroke(exp);
    }
  };
  cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", () => { live = null; draw(); });
  el.querySelector('[data-a="demo"]').onclick = demo;
  el.querySelector('[data-a="reset"]').onclick = reset;
  const segBtns = $$(".seg button", el);
  const setMode = m => { guided = m === "guided"; segBtns.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.m === m))); reset(); };
  segBtns.forEach(b => b.onclick = () => setMode(b.dataset.m));
  const ro = new ResizeObserver(fit); ro.observe(el);
  setMode(guided ? "guided" : "free");
  fit();
  return { destroy() { alive = false; cancelAnimationFrame(anim); ro.disconnect(); } };
}

// ═══ Katakana ════════════════════════════════════════════════════
let kanaSel = { hira: new Set(["a", "ka"]), kata: new Set(["a", "ka"]) };
try {
  const s = JSON.parse(localStorage.getItem(KEY + "-rows"));
  if (Array.isArray(s) && s.length) kanaSel.kata = new Set(s);
  else if (s && s.hira && s.kata) kanaSel = { hira: new Set(s.hira), kata: new Set(s.kata) };
} catch (e) {}
const sel = () => kanaSel[curScript().id];
const saveSel = () => { try { localStorage.setItem(KEY + "-rows", JSON.stringify({ hira: [...kanaSel.hira], kata: [...kanaSel.kata] })); } catch (e) {} };

function viewKana() {
  const mode = route.mode || "tableau";
  const sc = curScript();
  app.append(h(`<section>
    <div class="eyebrow">${sc.jp} · ${sc.fr.toLowerCase()}</div>
    <h1>Les ${sc.fr.toLowerCase()}</h1>
    <p class="muted prose" style="margin:6px 0 0">${sc.intro}</p>
    <div class="toolbar">
      <div class="seg">
        ${Object.values(SCRIPTS).map(x => `<button data-script="${x.id}" aria-pressed="${x.id === sc.id}"><span class="jp">${x.jp[0]}</span>${x.fr}</button>`).join("")}
      </div>
      <div class="seg">
        <button data-mode="tableau" aria-pressed="${mode === "tableau"}"><span class="jp">表</span>Tableau</button>
        <button data-mode="exercices" aria-pressed="${mode === "exercices"}"><span class="jp">練</span>Exercices</button>
        <button data-mode="trace" aria-pressed="${mode === "trace"}"><span class="jp">書</span>Tracé</button>
      </div>
    </div>
    <div id="kbody"></div>
  </section>`));
  $$("[data-script]").forEach(b => b.onclick = () => go({ tab: "kana", script: b.dataset.script, mode }));
  $$("[data-mode]").forEach(b => b.onclick = () => go({ tab: "kana", script: sc.id, mode: b.dataset.mode }));
  const body = $("#kbody");
  if (mode === "tableau") kanaTable(body);
  if (mode === "exercices") kanaExercises(body);
  if (mode === "trace") kanaTrace(body);
}

function kanaTable(body) {
  const sc = curScript();
  const cell = c => c ? `<button class="kcell" data-k="${c[0]}" data-r="${c[1]}"><span class="dot l${kanaLevel(c[0])}"></span><span class="g">${c[0]}</span><span class="r">${c[1]}</span></button>` : `<div class="kcell empty"></div>`;
  const grid = rows => `<div class="kgrid-wrap"><div class="kgrid" data-stagger>${rows.map(r => r.cells.map(cell).join("")).join("")}</div></div>`;
  body.append(h(`<div class="two">
    <div>
      <div class="kgroup-title"><h3>Gojūon</h3><span class="muted">les 46 sons de base</span></div>
      ${grid(sc.rows.filter(r => !r.dak))}
      <div class="kgroup-title"><h3>Dakuten · handakuten</h3><span class="muted">゛ et ゜ changent la consonne</span></div>
      ${grid(sc.rows.filter(r => r.dak))}
      <p class="muted" style="font-size:13px;margin-top:14px">Pastille pleine : maîtrisé (au moins 4 bonnes réponses et 80 % de réussite). Pastille claire : en cours. Pour allonger une voyelle, on ajoute ー (コーヒー, kōhī) ; un petit ッ double la consonne suivante (サッカー, sakkā).</p>
    </div>
    <div id="kdetail" class="kdetail"></div>
  </div>`));
  const detail = $("#kdetail");
  const showDetail = (k, r, scroll) => {
    if (currentTracer) { currentTracer.destroy(); currentTracer = null; }
    const words = sc.words.filter(w => w[0].includes(k)).slice(0, 3);
    const s = state.kana[k];
    detail.innerHTML = "";
    detail.append(h(`<div class="stack">
      <div class="kjhead"><div class="g">${k}</div><div class="stack" style="gap:6px"><div class="prompt romaji" style="margin:0">${r}</div>${speakBtn(k)}<span class="muted" style="font-size:13px">${s ? `${s.ok} / ${s.n} bonnes réponses` : "Pas encore travaillé"}</span></div></div>
      ${words.length ? `<div class="stack" style="gap:4px">${words.map(w => `<div class="row" style="gap:8px"><span class="jp" style="font-size:19px">${w[0]}</span><b class="romaji">${w[1]}</b><span class="muted">${w[2]}</span></div>`).join("")}</div>` : ""}
      <div id="ktr"></div>
    </div>`));
    currentTracer = Tracer($("#ktr"), k, { guided: true });
    if (scroll) detail.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };
  $$(".kcell[data-k]", body).forEach(b => b.onclick = () => { speak(b.dataset.k); showDetail(b.dataset.k, b.dataset.r, true); });
  showDetail(sc.all[0].k, sc.all[0].r);
}

function rowPicker(onChange) {
  const el = h(`<div class="stack" style="gap:8px">
    <div class="row" style="justify-content:space-between"><span class="eyebrow">Rangées travaillées</span>
      <span class="row" style="gap:4px"><button class="btn ghost" data-all>Base</button><button class="btn ghost" data-dak>Toutes</button></span></div>
    <div class="rowpick">${curScript().rows.map(r => `<button data-row="${r.id}" aria-pressed="${sel().has(r.id)}" title="${r.cells.filter(Boolean).map(c => c[1]).join(" ")}">${r.label}</button>`).join("")}</div>
  </div>`);
  const sync = () => { $$("[data-row]", el).forEach(b => b.setAttribute("aria-pressed", String(sel().has(b.dataset.row)))); saveSel(); onChange(); };
  $$("[data-row]", el).forEach(b => b.onclick = () => { const id = b.dataset.row; if (sel().has(id) && sel().size > 1) sel().delete(id); else sel().add(id); sync(); });
  el.querySelector("[data-all]").onclick = () => { kanaSel[curScript().id] = new Set(curScript().rows.filter(r => !r.dak).map(r => r.id)); sync(); };
  el.querySelector("[data-dak]").onclick = () => { kanaSel[curScript().id] = new Set(curScript().rows.map(r => r.id)); sync(); };
  return el;
}
const selectedKana = () => curScript().all.filter(x => sel().has(x.row));

function kanaExercises(body) {
  let kmode = route.kmode || "ecoute";
  const sc = curScript();
  const modes = [["ecoute","聞",`Son → ${sc.fr.toLowerCase()}`],["lecture","読",`${sc.fr} → son`],["saisie","打","Écrire le son"],["mots","語","Lire des mots"]];
  const wrap = h(`<div class="stack"></div>`);
  body.append(wrap);
  const picker = rowPicker(() => start());
  const modeSeg = h(`<div class="seg">${modes.map(([id, jp, fr]) => `<button data-km="${id}" aria-pressed="${kmode === id}"><span class="jp">${jp}</span>${fr}</button>`).join("")}</div>`);
  const stage = h(`<div class="ex" style="margin-top:6px;width:100%"></div>`);
  wrap.append(picker, modeSeg, stage);
  $$("[data-km]", modeSeg).forEach(b => b.onclick = () => { kmode = b.dataset.km; route.kmode = kmode; $$("[data-km]", modeSeg).forEach(x => x.setAttribute("aria-pressed", String(x === b))); start(); });

  function weightedPick(pool, n) {
    // on privilégie les kana les moins sûrs
    const w = pool.map(x => { const s = state.kana[x.k]; const acc = s ? s.ok / s.n : 0; return { x, score: Math.random() * (1.6 - acc) + (s ? 0 : .4) }; });
    return w.sort((a, b) => b.score - a.score).slice(0, n).map(o => o.x);
  }
  const record = (k, ok) => { const s = state.kana[k] || { ok: 0, n: 0 }; s.n++; if (ok) s.ok++; state.kana[k] = s; save(); };

  function start() {
    if (currentTracer) { currentTracer.destroy(); currentTracer = null; }
    const pool = selectedKana();
    let items;
    if (kmode === "mots") {
      const allowed = new Set(pool.map(x => x.k).concat(sc.small));
      let words = sc.words.filter(w => [...w[0]].every(c => allowed.has(c)));
      const partial = words.length < 4;
      if (partial) words = sc.words.slice().sort((a, b) => [...b[0]].filter(c => allowed.has(c)).length / b[0].length - [...a[0]].filter(c => allowed.has(c)).length / a[0].length).slice(0, 10);
      items = pick(words, Math.min(8, words.length)).map(w => ({ type: "mot", w }));
      if (partial) stage.dataset.partial = "1"; else delete stage.dataset.partial;
    } else {
      const n = Math.min(12, Math.max(pool.length, 8));
      const chosen = [];
      while (chosen.length < n) chosen.push(...weightedPick(pool, Math.min(pool.length, n - chosen.length)));
      items = chosen.map(x => ({ type: kmode, x }));
    }
    let idx = 0, score = 0;
    const show = () => {
      if (idx >= items.length) {
        stage.innerHTML = "";
        stage.append(h(`<div class="card result"><div class="score">${score} / ${items.length}</div><p class="muted">${score === items.length ? "Sans faute." : "Les kana ratés reviendront plus souvent."}</p><div class="row" style="justify-content:center"><button class="btn primary" id="kagain">Nouvelle série</button></div></div>`));
        $("#kagain").onclick = start;
        return;
      }
      const it = items[idx];
      stage.innerHTML = "";
      stage.append(h(`<div class="progress"><span>${idx + 1} / ${items.length}</span><span class="meter"><i style="width:${idx / items.length * 100}%"></i></span><span>${score} ✓</span></div>`));
      if (stage.dataset.partial && idx === 0) stage.append(h(`<div class="notice" style="margin-bottom:12px">Peu de mots utilisent seulement ces rangées : ceux-ci contiennent aussi quelques autres caractères.</div>`));
      const card = h(`<div class="card"></div>`);
      stage.append(card);
      const report = ok => { if (ok) score++; if (it.x) record(it.x.k, ok); };
      const nextFn = () => { idx++; show(); };
      kanaItem(it, card, pool, report, nextFn);
    };
    show();
  }
  start();
}

function kanaItem(it, card, pool, report, onNext) {
  let answered = false;
  const footer = h(`<div class="ex-actions"><span></span><button class="btn primary" hidden>Continuer →</button></div>`);
  const cont = footer.lastElementChild; cont.onclick = onNext;
  const settle = (ok, html) => {
    if (answered) return; answered = true; report(ok);
    card.insertBefore(h(`<div class="fb ${ok ? "ok" : "bad"}"><span class="t">${ok ? "Juste !" : "Pas tout à fait."}</span>${html}</div>`), footer);
    cont.hidden = false; cont.focus();
  };
  const distract = (x, key) => {
    const others = pool.filter(o => o[key] !== x[key]);
    const extra = curScript().all.filter(o => o[key] !== x[key] && !others.includes(o));
    const uniq = [];
    for (const o of shuffle(others).concat(shuffle(extra))) { if (!uniq.some(u => u[key] === o[key])) uniq.push(o); if (uniq.length === 3) break; }
    return shuffle([x, ...uniq]);
  };
  const x = it.x;
  if (it.type === "ecoute") {
    card.append(h(`<div class="kind"><span class="tag"><span class="jp">聞</span>Écoute</span></div>`));
    const lb = h(`<div class="row" style="gap:14px"><button class="listen-big" aria-label="Réécouter">${ICON.play}</button><span class="muted">Quel caractère entends-tu ?</span></div>`);
    lb.firstElementChild.onclick = () => speak(x.k);
    card.append(lb);
    if (!TTS.ok) card.append(h(`<p class="prompt romaji">${x.r}</p>`));
    setTimeout(() => speak(x.k), 200);
    const opts = h(`<div class="opts kana" data-stagger></div>`);
    distract(x, "k").forEach(o => {
      const b = h(`<button class="opt">${o.k}</button>`);
      b.onclick = () => { if (answered) return; const ok = o.k === x.k; b.classList.add(ok ? "ok" : "bad"); $$(".opt", opts).forEach(e => { e.disabled = true; if (e.textContent === x.k) e.classList.add("ok"); }); settle(ok, `<span><span class="jp" style="font-size:22px">${x.k}</span> = <b>${x.r}</b></span>`); };
      opts.append(b);
    });
    card.append(opts); stagger(card);
  } else if (it.type === "lecture") {
    card.append(h(`<div class="kind"><span class="tag"><span class="jp">読</span>Lecture</span></div>`));
    card.append(h(`<div style="text-align:center"><div class="jp" style="font-size:88px;line-height:1.1">${x.k}</div></div>`));
    const opts = h(`<div class="opts" data-stagger style="grid-template-columns:repeat(2,1fr)"></div>`);
    distract(x, "r").forEach(o => {
      const b = h(`<button class="opt" style="justify-content:center;font-weight:700;font-size:18px">${o.r}</button>`);
      b.onclick = () => { if (answered) return; const ok = o.r === x.r; b.classList.add(ok ? "ok" : "bad"); $$(".opt", opts).forEach(e => { e.disabled = true; if (e.textContent === x.r) e.classList.add("ok"); }); speak(x.k); settle(ok, `<span><span class="jp" style="font-size:22px">${x.k}</span> = <b>${x.r}</b></span>`); };
      opts.append(b);
    });
    card.append(opts); stagger(card);
  } else if (it.type === "saisie") {
    card.append(h(`<div class="kind"><span class="tag"><span class="jp">打</span>Écrire le son</span></div>`));
    card.append(h(`<div style="text-align:center"><div class="jp" style="font-size:88px;line-height:1.1">${x.k}</div></div>`));
    const f = h(`<form class="answer-line"><input type="text" id="kana-in" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Son en romaji"><button class="btn primary">Valider</button></form>`);
    const inp = f.querySelector("input");
    f.onsubmit = e => { e.preventDefault(); if (answered || !inp.value.trim()) return; const alts = { "ヲ": ["o", "wo"], "ヂ": ["ji", "di"], "ヅ": ["zu", "du"], "ン": ["n", "nn"] }[x.k] || [x.r]; const ok = same(inp.value, alts); inp.disabled = true; speak(x.k); settle(ok, `<span><span class="jp" style="font-size:22px">${x.k}</span> = <b>${x.r}</b></span>`); };
    card.append(f);
    setTimeout(() => inp.focus({ preventScroll: true }), 30);
  } else if (it.type === "mot") {
    const w = it.w;
    card.append(h(`<div class="kind"><span class="tag"><span class="jp">語</span>Lire un mot</span></div>`));
    card.append(h(`<div style="text-align:center"><div class="jp" style="font-size:52px;line-height:1.2">${w[0]}</div></div>`));
    const f = h(`<form class="answer-line"><input type="text" id="word-in" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Lecture en romaji"><button class="btn primary">Valider</button></form>`);
    const inp = f.querySelector("input");
    f.onsubmit = e => { e.preventDefault(); if (answered || !inp.value.trim()) return; const ok = same(inp.value, [w[1]]); inp.disabled = true; speak(w[0]); settle(ok, `<span><span class="jp" style="font-size:20px">${w[0]}</span> · <b>${w[1]}</b> — ${esc(w[2])}</span>`); };
    card.append(f);
    setTimeout(() => inp.focus({ preventScroll: true }), 30);
  }
  card.append(footer);
  const onKey = e => {
    if (!card.isConnected) { document.removeEventListener("keydown", onKey); return; }
    if (e.target.matches("input")) return;
    const n = parseInt(e.key, 10), opts = $$(".opt", card);
    if (n >= 1 && n <= opts.length && !answered) opts[n - 1].click();
    else if (e.key === "Enter" && answered && document.activeElement !== cont) { e.preventDefault(); cont.click(); }
  };
  document.addEventListener("keydown", onKey);
}

function kanaTrace(body) {
  const wrap = h(`<div class="stack"></div>`);
  body.append(wrap);
  const stage = h(`<div class="two"></div>`);
  wrap.append(rowPicker(() => nextKana()), stage);
  let cur = null;
  function nextKana() {
    if (currentTracer) { currentTracer.destroy(); currentTracer = null; }
    const pool = selectedKana().filter(x => STROKES[x.k] && x !== cur);
    cur = pool[Math.random() * pool.length | 0] || curScript().all[0];
    stage.innerHTML = "";
    const left = h(`<div></div>`);
    const right = h(`<div class="stack">
      <div class="kjhead"><div class="g">${cur.k}</div><div class="stack" style="gap:6px"><div class="prompt romaji" style="margin:0">${cur.r}</div>${speakBtn(cur.k)}</div></div>
      <p class="muted" style="margin:0">Trace le caractère dans la case. Chaque trait est vérifié : position, forme et sens.</p>
      <div><button class="btn primary" id="knext">Caractère suivant →</button></div>
    </div>`);
    stage.append(left, right);
    currentTracer = Tracer(left, cur.k, { guided: true });
    $("#knext").onclick = nextKana;
    speak(cur.k);
  }
  nextKana();
}

// ═══ Kanji ═══════════════════════════════════════════════════════
function viewKanji() {
  if (route.kanji) return viewKanjiDetail(route.kanji);
  const lessonOf = c => LESSONS.findIndex(l => l.kanji.includes(c));
  app.append(h(`<section>
    <div class="eyebrow">漢字 · kanji</div>
    <h1>Les kanji, un par un</h1>
    <p class="muted prose" style="margin:6px 0 0">Quelques caractères choisis dans les leçons, pour apprendre leur sens, leurs lectures et leur tracé. Le sceau 済 apparaît quand un kanji a été tracé de mémoire sans erreur.</p>
    <div class="kjgrid" data-stagger style="margin-top:20px">${KANJI.map(([c, m]) => {
      const s = state.kanji[c];
      const li = lessonOf(c);
      return `<button class="kj" data-c="${c}" title="${li >= 0 ? "Leçon " + (li + 1) : "Kanji de base"}"><span class="idx">${String(KANJI.findIndex(k => k[0] === c) + 1).padStart(2, "0")}</span>${s?.clean ? '<span class="mk">済</span>' : ""}<span class="g">${c}</span><span class="m">${esc(m)}</span></button>`;
    }).join("")}</div>
  </section>`));
  $$(".kj").forEach(b => b.onclick = () => go({ tab: "kanji", kanji: b.dataset.c }));
}

function viewKanjiDetail(c) {
  const i = KANJI.findIndex(k => k[0] === c);
  const [ch, m, on, kun, ex] = KANJI[i];
  const lessons = LESSONS.map((l, j) => l.kanji.includes(ch) ? j + 1 : 0).filter(Boolean);
  const s = state.kanji[ch] || {};
  const prev = KANJI[(i - 1 + KANJI.length) % KANJI.length][0], next = KANJI[(i + 1) % KANJI.length][0];
  app.append(h(`<section>
    <div class="row" style="justify-content:space-between">
      <button class="back" id="bk">${ICON.back}Tous les kanji</button>
      <span class="row" style="gap:6px"><button class="btn ghost" id="kp" aria-label="Kanji précédent">← <span class="jp">${prev}</span></button><button class="btn ghost" id="kn" aria-label="Kanji suivant"><span class="jp">${next}</span> →</button></span>
    </div>
    <div class="two" style="margin-top:14px">
      <div id="tr"></div>
      <div class="stack">
        <div class="kjhead"><div class="g">${ch}</div>
          <div class="stack" style="gap:6px">
            <h2>${esc(m)}</h2>
            <span class="muted">${(STROKES[ch] || []).length} traits${lessons.length ? " · leçon " + lessons.join(", ") : ""}</span>
            ${s.clean ? `<span class="row" style="gap:8px"><span class="hanko" style="width:28px;height:28px;font-size:13px">済</span><span class="muted" style="font-size:13px">Tracé de mémoire</span></span>` : ""}
          </div>
        </div>
        <dl class="read"><dt>On'yomi</dt><dd>${esc(on)} <span class="muted" style="font-weight:400">lecture d'origine chinoise</span></dd><dt>Kun'yomi</dt><dd>${kun === "—" ? '<span class="muted" style="font-weight:400">pas de lecture japonaise courante</span>' : esc(kun) + ' <span class="muted" style="font-weight:400">lecture japonaise</span>'}</dd></dl>
        <div class="vlist">${ex.map(([r, jp, k, fr]) => `<div class="vrow"><span class="romaji">${esc(r)}</span><span class="w">${jp}${k !== jp ? `<small>${k}</small>` : ""}</span><span class="fr">${esc(fr)}</span>${speakBtn(k)}</div>`).join("")}</div>
      </div>
    </div>
  </section>`));
  $("#bk").onclick = () => go({ tab: "kanji" });
  $("#kp").onclick = () => go({ tab: "kanji", kanji: prev });
  $("#kn").onclick = () => go({ tab: "kanji", kanji: next });
  currentTracer = Tracer($("#tr"), ch, {
    guided: !s.guidedOk,
    onDone: r => {
      const cur = state.kanji[ch] || {};
      if (r.clean && r.guided) cur.guidedOk = true;
      if (r.clean && !r.guided) cur.clean = true;
      cur.n = (cur.n || 0) + 1;
      state.kanji[ch] = cur; save();
    }
  });
}

// ═══ Dico ════════════════════════════════════════════════════════
const DOMAINS = ["Société", "Histoire", "Politique", "Arts", "Hiragana", "Katakana", "Kanji", "Vie quotidienne", "Mes ajouts"];
let dq = "", dd = "", dform = false;
function viewDico() {
  if (route.flash) return viewFlash();
  app.append(h(`<section>
    <div class="eyebrow">辞書 · jisho</div>
    <h1>Le dico</h1>
    <p class="muted prose" style="margin:6px 0 0">Tous les mots croisés dans l'atelier, avec leur écriture et leur lecture. Ajoute ceux que tu rencontres ailleurs : ils rejoignent les révisions.</p>
    <div class="dtools">
      <input type="text" id="dq" placeholder="Chercher en romaji, en français ou en japonais" value="${esc(dq)}" autocomplete="off">
      <div class="row"><select id="dd" aria-label="Domaine"><option value="">Tous les domaines</option>${DOMAINS.map(d => `<option ${dd === d ? "selected" : ""}>${d}</option>`).join("")}</select>
      <button class="btn primary" id="dadd">Ajouter un mot</button></div>
    </div>
    <div id="dformHost"></div>
    <div class="row" style="justify-content:space-between;margin:4px 0 10px"><span class="count" id="dcount"></span><button class="btn" id="dflash"><span class="jp">復</span>Réviser ces mots</button></div>
    <div class="panel" id="dlist"></div>
  </section>`));
  const list = $("#dlist"), count = $("#dcount");
  const filtered = () => {
    const q = dq.trim().toLowerCase(), nq = norm(dq);
    return DICO.filter(w => (!dd || (dd === "Mes ajouts" ? w.custom : w.d === dd)) &&
      (!q || w.fr.toLowerCase().includes(q) || w.jp.includes(dq.trim()) || (w.k || "").includes(dq.trim()) || (nq && norm(w.r).includes(nq))));
  };
  const paint = () => {
    const f = filtered();
    count.textContent = `${f.length} mot${f.length > 1 ? "s" : ""}`;
    $("#dflash").disabled = f.length < 2;
    list.setAttribute("data-stagger", "");
    list.innerHTML = f.length ? f.slice(0, 400).map(w => `<div class="drow">
      <b class="romaji">${esc(w.r)}</b>
      <span class="w">${esc(w.jp)}${w.k && w.k !== w.jp ? `<small>${esc(w.k)}</small>` : ""}</span>
      <span class="fr">${esc(w.fr)}</span>
      <span class="tag" title="${esc(w.src)}">${esc(w.d)}</span>
      <span class="row" style="gap:4px;flex-wrap:nowrap">${speakBtn(w.k || w.jp)}${w.custom ? `<button class="del" data-del="${esc(w.id)}" aria-label="Supprimer ${esc(w.r)}">Suppr.</button>` : ""}</span>
    </div>`).join("") : `<div style="padding:18px 14px" class="muted">Aucun mot ne correspond. Tu peux l'ajouter avec « + Ajouter un mot ».</div>`;
    stagger(list);
    $$("[data-del]", list).forEach(b => b.onclick = () => {
      state.custom = state.custom.filter(w => w.id !== b.dataset.del); save(); rebuildDico(); paint();
    });
  };
  $("#dq").oninput = e => { dq = e.target.value; paint(); };
  $("#dd").onchange = e => { dd = e.target.value; paint(); };
  $("#dflash").onclick = () => go({ tab: "dico", flash: pick(filtered(), 15).map(w => w.jp + "|" + w.r) });
  const formHost = $("#dformHost");
  const openForm = () => {
    formHost.innerHTML = "";
    const f = h(`<form class="panel dform">
      <label class="f">Romaji *<input type="text" id="nf-r" required placeholder="ex. kaisha" autocomplete="off" autocapitalize="off"></label>
      <label class="f">Écriture japonaise *<input type="text" id="nf-jp" required placeholder="ex. 会社" autocomplete="off"></label>
      <label class="f">Lecture en kana<input type="text" id="nf-k" placeholder="ex. かいしゃ (améliore la voix)" autocomplete="off"></label>
      <label class="f">Français *<input type="text" id="nf-fr" required placeholder="ex. entreprise" autocomplete="off"></label>
      <label class="f">Domaine<select id="nf-d">${DOMAINS.filter(d => d !== "Mes ajouts").map(d => `<option ${d === "Vie quotidienne" ? "selected" : ""}>${d}</option>`).join("")}</select></label>
      <div class="actions"><button type="button" class="btn ghost" id="nf-cancel">Annuler</button><button class="btn primary">Enregistrer le mot</button></div>
    </form>`);
    f.onsubmit = e => {
      e.preventDefault();
      const w = { id: "c" + Date.now().toString(36), r: $("#nf-r").value.trim(), jp: $("#nf-jp").value.trim(), k: $("#nf-k").value.trim() || $("#nf-jp").value.trim(), fr: $("#nf-fr").value.trim(), d: $("#nf-d").value, added: new Date().toLocaleDateString("fr-FR") };
      if (!w.r || !w.jp || !w.fr) return;
      state.custom.push(w); save(); rebuildDico();
      dq = ""; $("#dq").value = "";
      formHost.innerHTML = "";
      formHost.append(h(`<div class="notice" style="margin-bottom:12px">« ${esc(w.r)} · ${esc(w.jp)} » ajouté au dico.</div>`));
      paint();
    };
    f.querySelector("#nf-cancel").onclick = () => { formHost.innerHTML = ""; };
    formHost.append(f);
    $("#nf-r").focus();
  };
  $("#dadd").onclick = openForm;
  paint();
}

function viewFlash() {
  const keys = route.flash;
  const words = keys.map(k => DICO.find(w => w.jp + "|" + w.r === k)).filter(Boolean);
  let i = 0, known = 0;
  app.append(h(`<section class="flash">
    <div class="row" style="justify-content:space-between"><button class="back" id="bk">${ICON.back}Retour au dico</button><span class="count" id="fc"></span></div>
    <div id="fstage" style="margin-top:16px"></div>
  </section>`));
  $("#bk").onclick = () => go({ tab: "dico" });
  const stage = $("#fstage");
  const show = () => {
    stage.innerHTML = "";
    if (i >= words.length) {
      stage.append(h(`<div class="card result"><div class="score">${known} / ${words.length}</div><p class="muted">mots connus du premier coup</p><div class="row" style="justify-content:center"><button class="btn primary" id="fagain">Autre série</button></div></div>`));
      $("#fagain").onclick = () => go({ tab: "dico", flash: pick(DICO, 15).map(w => w.jp + "|" + w.r) });
      return;
    }
    const w = words[i];
    $("#fc").textContent = `${i + 1} / ${words.length}`;
    const c = h(`<div class="card">
      <span class="tag">${esc(w.d)}</span>
      <div class="prompt romaji" style="font-size:28px">${esc(w.r)}</div>
      <div class="bigjp">${esc(w.jp)}</div>
      <div id="rev" class="stack" style="align-items:center;gap:10px;margin-top:10px"><button class="btn primary" id="flip">Voir le sens</button></div>
    </div>`);
    stage.append(c);
    speak(w.k || w.jp);
    $("#flip").onclick = () => {
      $("#rev").innerHTML = `<div style="font-size:18px">${esc(w.fr)}</div>${w.k && w.k !== w.jp ? `<div class="muted jp">${esc(w.k)}</div>` : ""}<div class="row"><button class="btn" id="fno">À revoir</button><button class="btn primary" id="fyes">Je savais</button></div>`;
      $("#fno").onclick = () => { i++; show(); };
      $("#fyes").onclick = () => { known++; i++; show(); };
    };
  };
  show();
}

// ═══ Calligraphie — la feuille ═══════════════════════════════════
// Une feuille d'entraînement à la façon des cahiers quadrillés japonais :
// on écrit à main levée, le pinceau s'épaissit quand la main ralentit.
const CALLI = { set: "eight", model: "filigrane", trait: "moyen", cols: 4, rows: 3 };
try { Object.assign(CALLI, JSON.parse(localStorage.getItem(KEY + "-calli") || "{}")); } catch (e) {}
const saveCalli = () => { try { localStorage.setItem(KEY + "-calli", JSON.stringify(CALLI)); } catch (e) {} };

let currentSheet = null;
function viewCalli() {
  if (currentSheet) { currentSheet.destroy(); currentSheet = null; }
  const set = CALLI_SETS.find(x => x.id === CALLI.set) || CALLI_SETS[0];
  app.append(h(`<section>
    <div class="eyebrow">書道 · shodō</div>
    <h1>La feuille</h1>
    <p class="muted prose" style="margin:6px 0 0">Ici rien n'est corrigé : on écrit à main levée, au doigt ou au stylet. Le tracé s'épaissit quand la main ralentit et s'affine quand elle file, comme un pinceau qui se relève.</p>

    <div class="calli-tools no-print">
      <label class="f">Série
        <select id="cset">${CALLI_SETS.map(x => `<option value="${x.id}" ${x.id === set.id ? "selected" : ""}>${x.fr} — ${x.jp}</option>`).join("")}</select>
      </label>
      <div class="stack" style="gap:6px">
        <span class="eyebrow">Modèle</span>
        <div class="seg" style="margin:0">
          <button data-mdl="filigrane" aria-pressed="${CALLI.model === "filigrane"}">Filigrane</button>
          <button data-mdl="premiere" aria-pressed="${CALLI.model === "premiere"}">1<sup>re</sup> case</button>
          <button data-mdl="aucun" aria-pressed="${CALLI.model === "aucun"}">Aucun</button>
        </div>
      </div>
      <div class="stack" style="gap:6px">
        <span class="eyebrow">Pinceau</span>
        <div class="seg" style="margin:0">
          <button data-trait="fin" aria-pressed="${CALLI.trait === "fin"}">Fin</button>
          <button data-trait="moyen" aria-pressed="${CALLI.trait === "moyen"}">Moyen</button>
          <button data-trait="large" aria-pressed="${CALLI.trait === "large"}">Large</button>
        </div>
      </div>
    </div>

    <div id="sheetHost"></div>

    <div class="row no-print" style="margin-top:12px">
      <button class="btn" id="cundo"><span class="jp">戻</span>Annuler le trait</button>
      <button class="btn" id="cdemo"><span class="jp">順</span>Voir le geste</button>
      <button class="btn ghost" id="cclear">Effacer la feuille</button>
      <span style="flex:1"></span>
      <button class="btn" id="csave"><span class="jp">保</span>Enregistrer l'image</button>
      <button class="btn" id="cprint"><span class="jp">刷</span>Imprimer</button>
    </div>

    <h3 class="no-print">Les huit gestes de 永</h3>
    <p class="muted no-print" style="margin-top:0">Le caractère <b class="jp" style="color:var(--paper)">永</b> — « éternité » — ne compte que cinq traits, mais la tradition y lit huit gestes : c'est la gamme du pinceau, apprise avant tout le reste.</p>
    <div class="eight no-print">${EIGHT.map(e => `<div class="eight-row"><span class="n">${e.n}</span><span class="jp g">${e.jp}</span><span class="r">${e.r}</span><span class="d"><b>${esc(e.fr)}</b> — ${esc(e.note)}</span></div>`).join("")}</div>
  </section>`));

  currentSheet = Sheet($("#sheetHost"), set);
  $("#cset").onchange = e => { CALLI.set = e.target.value; saveCalli(); go({ tab: "calli" }); };
  $$("[data-mdl]").forEach(b => b.onclick = () => { CALLI.model = b.dataset.mdl; saveCalli(); $$("[data-mdl]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); currentSheet.redraw(); });
  $$("[data-trait]").forEach(b => b.onclick = () => { CALLI.trait = b.dataset.trait; saveCalli(); $$("[data-trait]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); });
  $("#cundo").onclick = () => currentSheet.undo();
  $("#cclear").onclick = () => currentSheet.clear();
  $("#cdemo").onclick = () => currentSheet.demo();
  $("#csave").onclick = () => currentSheet.save();
  $("#cprint").onclick = () => window.print();
}

function Sheet(host, set) {
  const el = h(`<div class="feuille-wrap"><canvas class="feuille" aria-label="Feuille d'entraînement"></canvas><div class="msg muted" aria-live="polite"></div></div>`);
  host.append(el);
  const cv = el.querySelector("canvas"), ctx = cv.getContext("2d");
  const msg = el.querySelector(".msg");
  const cols = () => (el.clientWidth < 480 ? 3 : 4);
  let W = 600, H = 450, cell = 150, dpr = 1, strokes = [], live = null, anim = 0, alive = true, demoing = false;
  const charAt = i => set.chars[i % set.chars.length];
  const cellsCount = () => cols() * CALLI.rows;
  const BASE = { fin: 0.055, moyen: 0.085, large: 0.125 };

  function fit() {
    const c = cols();
    const w = el.clientWidth || 600;
    cell = Math.floor(w / c);
    W = cell * c; H = cell * CALLI.rows;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = W * dpr; cv.height = H * dpr;
    cv.style.width = W + "px"; cv.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    redraw();
  }
  function cellBox(i) {
    const c = cols();
    return { x: (i % c) * cell, y: Math.floor(i / c) * cell, s: cell };
  }
  function drawModel(i, alpha) {
    const ch = charAt(i), paths = STROKES[ch];
    if (!paths) return;
    const b = cellBox(i), k = b.s * 0.82 / 109, off = b.s * 0.09;
    ctx.save();
    ctx.translate(b.x + off, b.y + off); ctx.scale(k, k);
    ctx.strokeStyle = `rgba(26,18,11,${alpha})`; ctx.lineWidth = 6; ctx.lineCap = "round"; ctx.lineJoin = "round";
    paths.forEach(d => ctx.stroke(strokeInfo(d).path));
    ctx.restore();
  }
  function redraw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = cssVar("--tape-bg") || "#F4EADF";
    ctx.fillRect(0, 0, W, H);
    // quadrillage : cadre plein, croix pointillée dans chaque case
    const c = cols();
    for (let i = 0; i < cellsCount(); i++) {
      const b = cellBox(i);
      ctx.save();
      ctx.strokeStyle = "rgba(160,60,30,.22)"; ctx.lineWidth = 1;
      ctx.strokeRect(b.x + .5, b.y + .5, b.s - 1, b.s - 1);
      ctx.setLineDash([5, 6]);
      ctx.beginPath();
      ctx.moveTo(b.x + b.s / 2, b.y + 4); ctx.lineTo(b.x + b.s / 2, b.y + b.s - 4);
      ctx.moveTo(b.x + 4, b.y + b.s / 2); ctx.lineTo(b.x + b.s - 4, b.y + b.s / 2);
      ctx.stroke();
      ctx.restore();
      if (CALLI.model === "filigrane") drawModel(i, .13);
      if (CALLI.model === "premiere" && i % set.chars.length === i && i < set.chars.length) drawModel(i, .5);
    }
    strokes.forEach(inkStroke);
    if (live) inkStroke(live);
  }
  // Trait d'encre à largeur variable : on remplit un ruban entre les points.
  function inkStroke(st) {
    const pts = st.pts;
    if (pts.length < 2) {
      if (pts.length === 1) { ctx.fillStyle = st.color; ctx.beginPath(); ctx.arc(pts[0].x, pts[0].y, pts[0].w / 2, 0, 7); ctx.fill(); }
      return;
    }
    ctx.save();
    ctx.fillStyle = st.color;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i];
      const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len, ny = dx / len;
      ctx.beginPath();
      ctx.moveTo(a.x + nx * a.w / 2, a.y + ny * a.w / 2);
      ctx.lineTo(b.x + nx * b.w / 2, b.y + ny * b.w / 2);
      ctx.lineTo(b.x - nx * b.w / 2, b.y - ny * b.w / 2);
      ctx.lineTo(a.x - nx * a.w / 2, a.y - ny * a.w / 2);
      ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.arc(b.x, b.y, b.w / 2, 0, 7); ctx.fill();
    }
    ctx.restore();
  }
  const local = e => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height }; };
  let lastT = 0, lastW = 0;
  function widthFor(p, prev, e) {
    const base = BASE[CALLI.trait] * cell;
    const now = performance.now();
    const dt = Math.max(now - lastT, 8); lastT = now;
    const v = prev ? Math.hypot(p.x - prev.x, p.y - prev.y) / dt : 0; // px/ms
    let w = base * Math.max(0.32, Math.min(1.35, 1.18 - v * 0.45));
    if (e && e.pointerType === "pen" && e.pressure > 0) w = base * (0.35 + 1.15 * e.pressure);
    lastW = lastW ? lastW * 0.62 + w * 0.38 : w;
    return lastW;
  }
  cv.addEventListener("pointerdown", e => {
    if (demoing) return;
    cv.setPointerCapture(e.pointerId);
    e.preventDefault();
    lastT = performance.now(); lastW = 0;
    const p = local(e);
    live = { color: cssVar("--tape-ink") || "#1A120B", pts: [{ ...p, w: BASE[CALLI.trait] * cell * 0.55 }] };
    msg.textContent = "";
  });
  cv.addEventListener("pointermove", e => {
    if (!live) return;
    const p = local(e), prev = live.pts[live.pts.length - 1];
    if (Math.hypot(p.x - prev.x, p.y - prev.y) < 1.2) return;
    live.pts.push({ ...p, w: widthFor(p, prev, e) });
    redraw();
  });
  const end = () => {
    if (!live) return;
    const pts = live.pts;
    for (let i = 0; i < Math.min(3, pts.length); i++) pts[pts.length - 1 - i].w *= 0.55 + i * 0.15; // la pointe se relève
    strokes.push(live); live = null; redraw();
  };
  cv.addEventListener("pointerup", end);
  cv.addEventListener("pointercancel", () => { live = null; redraw(); });

  function demo() {
    if (demoing) return;
    demoing = true;
    const ch = charAt(0), paths = (STROKES[ch] || []).map(strokeInfo);
    const b = cellBox(0), k = b.s * 0.82 / 109, off = b.s * 0.09;
    msg.textContent = `Ordre des traits de ${ch} — regarde la première case.`;
    let i = 0;
    const step = () => {
      if (!alive || i >= paths.length) { demoing = false; msg.textContent = "À toi."; redraw(); return; }
      const s = paths[i], t0 = performance.now(), dur = 600;
      const frame = now => {
        if (!alive) return;
        const t = Math.min(1, (now - t0) / dur);
        redraw();
        ctx.save();
        ctx.translate(b.x + off, b.y + off); ctx.scale(k, k);
        ctx.strokeStyle = cssVar("--ember") || "#F07316"; ctx.lineWidth = 7; ctx.lineCap = "round"; ctx.lineJoin = "round";
        for (let j = 0; j < i; j++) ctx.stroke(paths[j].path);
        ctx.setLineDash([s.len, s.len]); ctx.lineDashOffset = s.len * (1 - t);
        ctx.stroke(s.path); ctx.restore();
        if (t < 1) anim = requestAnimationFrame(frame); else { i++; setTimeout(step, 120); }
      };
      anim = requestAnimationFrame(frame);
    };
    step();
  }
  async function save() {
    const name = `feuille-${set.id}.png`;
    const url = cv.toDataURL("image/png");
    try {
      const dl = window.claude && window.claude.use ? await window.claude.use("downloads") : null;
      if (dl) { await dl.save({ filename: name, data: url }); msg.textContent = "Feuille enregistrée."; return; }
    } catch (e) {}
    const a = document.createElement("a");
    a.href = url; a.download = name; document.body.append(a); a.click(); a.remove();
    msg.textContent = "Feuille enregistrée (dossier Téléchargements).";
  }

  const ro = new ResizeObserver(fit); ro.observe(el);
  fit();
  msg.textContent = `${set.fr} — ${cellsCount()} cases.`;
  return {
    redraw, demo, save,
    undo() { strokes.pop(); redraw(); },
    clear() { strokes = []; redraw(); msg.textContent = "Feuille propre."; },
    destroy() { alive = false; cancelAnimationFrame(anim); ro.disconnect(); },
  };
}

// ═══ Démarrage ═══════════════════════════════════════════════════
applyPrefs();
render();
setTimeout(() => { loadVoices(); TTS.checked = true; if (route.tab === "lecons" && !route.lesson && !$("#voice-notice") && (!TTS.ok || !TTS.voice)) { const n = h(voiceNotice() || "<span></span>"); const l = $(".lessons"); if (l && n.id) l.before(n); } }, 1800);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (currentTracer) window.dispatchEvent(new Event("resize")); });

