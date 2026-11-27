const ORD = ['DGA', 'DGD', 'IGD', 'AFX', 'DEN'];

// =========================================================
// กำหนดลิงก์รูปพื้นหลังของแต่ละหน้าได้ที่นี่ (ใส่ '' หากใช้ gradient เดิม)
// =========================================================
const SCENE_BG_IMAGES = {
  start: '',
  ch1: '',
  s11: 'https://i.pinimg.com/736x/03/19/77/03197751f5db924b27c1772f89427086.jpg',
  s12: '',
  s13: '',
  ch2: '',
  s21: '',
  s22: '',
  s23: '',
  ch3: '',
  gate: '',
  dist_DGA: 'https://i.pinimg.com/736x/67/56/bd/6756bd5a00b6130b3ff1025aed0101d7.jpg',
  dist_DGD: 'https://i.pinimg.com/736x/2b/36/56/2b36569299e90f872351155795570e21.jpg',
  dist_IGD: 'https://i.pinimg.com/736x/50/6a/bb/506abbf93a2000da0696a92d31c968e6.jpg',
  dist_AFX: 'https://i.pinimg.com/736x/d4/11/0a/d4110ae2446694eeca1ce52ac988f93d.jpg',
  dist_DEN: 'https://i.pinimg.com/736x/5d/a9/81/5da981eb16b9b010254c9f0502ac2076.jpg',
  ch4: '',
  s41: '',
  s42: '',
  ch5: '',
  s51: '',
  s52: '',
  card: '',
  end: '',
  end_DGA: 'https://i.pinimg.com/736x/67/56/bd/6756bd5a00b6130b3ff1025aed0101d7.jpg',
  end_DGD: 'https://i.pinimg.com/736x/2b/36/56/2b36569299e90f872351155795570e21.jpg',
  end_IGD: 'https://i.pinimg.com/736x/50/6a/bb/506abbf93a2000da0696a92d31c968e6.jpg',
  end_AFX: 'https://i.pinimg.com/736x/d4/11/0a/d4110ae2446694eeca1ce52ac988f93d.jpg',
  end_DEN: 'https://i.pinimg.com/736x/5d/a9/81/5da981eb16b9b010254c9f0502ac2076.jpg'
};

// =========================================================
// BACKGROUND MUSIC CONTROLLER (ใช้ไฟล์เสียงในเครื่อง audio/bgm.mp3)
// =========================================================
const BGM_URL = './bgm.mp3';
const BGM_VOLUME = 0.3;

const bgmAudio = new Audio(BGM_URL);
bgmAudio.loop = true;
bgmAudio.volume = BGM_VOLUME;
bgmAudio.preload = 'auto';

let isMusicPlaying = false;
let userMutedMusic = false;

const HERO_SVGS = {
  DGA: `<svg class="hero-art-svg" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g-dga" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1A1813"/><stop offset="100%" stop-color="#3D2B1F"/></linearGradient></defs><rect width="300" height="400" fill="url(#g-dga)"/><circle cx="150" cy="180" r="100" fill="#E5B822" opacity="0.15"/><path d="M150 70 L180 120 L230 110 L195 155 L225 200 L170 190 L150 240 L130 190 L75 200 L105 155 L70 110 L120 120 Z" fill="#E5B822" opacity="0.85"/><circle cx="150" cy="155" r="28" fill="#F7D96F"/><text x="150" y="165" font-family="'Oswald', sans-serif" font-size="32" font-weight="bold" fill="#1A1813" text-anchor="middle">♔</text><path d="M40 310 Q 110 270, 150 320 T 260 290" stroke="#E5F24C" stroke-width="8" stroke-linecap="round" fill="none"/><path d="M60 340 Q 150 310, 240 350" stroke="#D9A76A" stroke-width="6" stroke-linecap="round" fill="none"/><text x="150" y="380" font-family="'Oswald', sans-serif" font-size="20" fill="#E5B822" letter-spacing="4" text-anchor="middle">BLESSING KING</text></svg>`,
  DGD: `<svg class="hero-art-svg" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g-dgd" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1C1412"/><stop offset="100%" stop-color="#3E1A10"/></linearGradient></defs><rect width="300" height="400" fill="url(#g-dgd)"/><polygon points="170,40 80,210 145,210 115,360 220,170 155,170" fill="#F26419"/><polygon points="165,55 95,200 150,200 125,330 205,180 160,180" fill="#F7E07E"/><rect x="30" y="30" width="240" height="340" fill="none" stroke="#F26419" stroke-width="2" stroke-dasharray="8 6"/><text x="150" y="375" font-family="'Oswald', sans-serif" font-size="20" fill="#F26419" letter-spacing="4" text-anchor="middle">JACK SPARK</text></svg>`,
  IGD: `<svg class="hero-art-svg" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g-igd" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0A1628"/><stop offset="100%" stop-color="#102542"/></linearGradient></defs><rect width="300" height="400" fill="url(#g-igd)"/><path d="M0 200 L300 200 M0 250 L300 250 M0 300 L300 300 M0 350 L300 350" stroke="#1E88E5" stroke-width="1" opacity="0.2"/><path d="M150 70 Q 220 170, 150 230 Q 80 170, 150 70 Z" fill="#1E88E5"/><polygon points="150,220 135,255 165,255" fill="#1E88E5"/><circle cx="150" cy="140" r="25" fill="#0A1628"/><text x="150" y="150" font-family="'Oswald', sans-serif" font-size="28" font-weight="bold" fill="#4FC3F7" text-anchor="middle">♠</text><rect x="70" y="270" width="160" height="60" rx="12" fill="#102542" stroke="#4FC3F7" stroke-width="3"/><circle cx="110" cy="300" r="10" fill="#1E88E5"/><circle cx="190" cy="290" r="6" fill="#E91E63"/><circle cx="205" cy="305" r="6" fill="#F7D96F"/><text x="150" y="380" font-family="'Oswald', sans-serif" font-size="20" fill="#4FC3F7" letter-spacing="4" text-anchor="middle">ACERUNNER</text></svg>`,
  AFX: `<svg class="hero-art-svg" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g-afx" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#240A15"/><stop offset="100%" stop-color="#4A1128"/></linearGradient></defs><rect width="300" height="400" fill="url(#g-afx)"/><path d="M80 180 L105 100 L150 150 L195 100 L220 180 Z" fill="#E91E63"/><circle cx="105" cy="95" r="8" fill="#F8BBD0"/><circle cx="150" cy="85" r="10" fill="#F8BBD0"/><circle cx="195" cy="95" r="8" fill="#F8BBD0"/><circle cx="150" cy="210" r="60" fill="none" stroke="#E57373" stroke-width="4" stroke-dasharray="12 8"/><circle cx="150" cy="210" r="40" fill="none" stroke="#E91E63" stroke-width="3"/><text x="150" y="222" font-family="'Oswald', sans-serif" font-size="34" fill="#FFF" text-anchor="middle">♕</text><path d="M40 330 Q 150 280, 260 330" stroke="#F8BBD0" stroke-width="5" fill="none"/><text x="150" y="375" font-family="'Oswald', sans-serif" font-size="20" fill="#E91E63" letter-spacing="4" text-anchor="middle">LITTLE QUEEN</text></svg>`,
  DEN: `<svg class="hero-art-svg" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g-den" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#092016"/><stop offset="100%" stop-color="#143D2B"/></linearGradient></defs><rect width="300" height="400" fill="url(#g-den)"/><path d="M60 140 Q 150 70, 240 140 Q 250 230, 150 270 Q 50 230, 60 140 Z" fill="#1DB979" opacity="0.9"/><path d="M85 150 Q 115 130, 130 160 Q 100 175, 85 150 Z" fill="#092016"/><path d="M215 150 Q 185 130, 170 160 Q 200 175, 215 150 Z" fill="#092016"/><path d="M110 200 Q 150 240, 190 200" stroke="#092016" stroke-width="5" fill="none" stroke-linecap="round"/><polygon points="150,40 165,85 210,85 172,110 188,155 150,128 112,155 128,110 90,85 135,85" fill="#7CB342"/><text x="150" y="375" font-family="'Oswald', sans-serif" font-size="19" fill="#26D094" letter-spacing="3" text-anchor="middle">MASCARADE JOKER</text></svg>`
};

let GAME_DATA = null;
const sc = { DGA: 0, DGD: 0, IGD: 0, AFX: 0, DEN: 0 };
let q = [], a52 = null, first = [], qi = 0, total = 0, nick = '';
let heroAnimId = null;
let manaSurgeTimer = null;
let bgSeq = 0;

const m = document.getElementById('m');
const bar = document.getElementById('bar');
const bgLayer = document.getElementById('bg-layer');

function syncMusicButtonUI() {
  const btn = document.getElementById('bgmToggle');
  if (!btn) return;
  const labelEl = btn.querySelector('.music-label');
  btn.classList.toggle('is-playing', isMusicPlaying);
  btn.setAttribute('aria-pressed', String(isMusicPlaying));
  if (labelEl) {
    labelEl.textContent = isMusicPlaying ? 'BGM: ON' : 'BGM: OFF';
  }
}

function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'modal-toast';
  t.innerText = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

bgmAudio.addEventListener('error', () => {
  const code = bgmAudio.error ? bgmAudio.error.code : 'unknown';
  isMusicPlaying = false;
  syncMusicButtonUI();
  showToast(`โหลดไฟล์เพลงไม่ได้ (code: ${code}) ตรวจสอบไฟล์ ${BGM_URL} ครับ`);
});

async function playBgm() {
  if (!BGM_URL || !BGM_URL.trim()) {
    showToast('ยังไม่ได้ใส่ลิงก์ไฟล์เพลงใน BGM_URL');
    return false;
  }
  const targetSrc = BGM_URL.trim();
  if (bgmAudio.getAttribute('src') !== targetSrc) {
    bgmAudio.src = targetSrc;
    bgmAudio.load();
  }
  try {
    await bgmAudio.play();
    isMusicPlaying = true;
    userMutedMusic = false;
    syncMusicButtonUI();
    return true;
  } catch (err) {
    isMusicPlaying = false;
    syncMusicButtonUI();
    return false;
  }
}

function pauseBgm(byUser = true) {
  bgmAudio.pause();
  isMusicPlaying = false;
  if (byUser) userMutedMusic = true;
  syncMusicButtonUI();
}

async function toggleBgm() {
  if (isMusicPlaying) {
    pauseBgm(true);
  } else {
    await playBgm();
  }
}

function unlockBgmOnFirstInteraction() {
  if (userMutedMusic || isMusicPlaying || !BGM_URL || !BGM_URL.trim()) return;
  playBgm();
}

const bgmBtnInit = document.getElementById('bgmToggle');
if (bgmBtnInit) {
  bgmBtnInit.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleBgm();
  });
}
document.addEventListener('pointerdown', unlockBgmOnFirstInteraction, { once: true });
syncMusicButtonUI();

function setBg(key, fallbackKey = '') {
  document.body.setAttribute('data-bg', key);

  const customUrl =
    SCENE_BG_IMAGES[key] ||
    (fallbackKey && SCENE_BG_IMAGES[fallbackKey]) ||
    SCENE_BG_IMAGES.default ||
    (GAME_DATA && GAME_DATA.backgrounds && (GAME_DATA.backgrounds[key] || (fallbackKey && GAME_DATA.backgrounds[fallbackKey]))) ||
    (GAME_DATA && GAME_DATA.defaultBg) ||
    '';

  const currentSeq = ++bgSeq;

  if (customUrl && typeof customUrl === 'string' && customUrl.trim() !== '') {
    const cleanUrl = customUrl.trim();
    const tester = new Image();
    tester.onload = () => {
      if (currentSeq !== bgSeq) return;
      bgLayer.style.backgroundImage = '';
      bgLayer.style.setProperty('--page-bg-img', `url("${cleanUrl}")`);
      bgLayer.style.opacity = '1';
    };
    tester.onerror = () => {
      if (currentSeq !== bgSeq) return;
      bgLayer.style.setProperty('--page-bg-img', 'none');
      bgLayer.style.backgroundImage = '';
      bgLayer.style.opacity = '1';
    };
    tester.src = cleanUrl;
  } else {
    bgLayer.style.setProperty('--page-bg-img', 'none');
    bgLayer.style.backgroundImage = '';
    bgLayer.style.opacity = '1';
  }
}

const shuffle = a => {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const ranked = () => ORD.map((c, i) => [c, sc[c], i]).sort((x, y) =>
  y[1] - x[1] || (y[0] === a52 ? 1 : 0) - (x[0] === a52 ? 1 : 0) || x[2] - y[2]
);

function triggerCardMagicEffect(targetEl) {
  if (!targetEl) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const whiteHex = '#FFFFFF';
  const rect = targetEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  targetEl.classList.add('is-casting');
  targetEl.style.setProperty('--magic-color', whiteHex);

  const layer = document.createElement('div');
  layer.className = 'magic-burst-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.style.setProperty('--magic-color', whiteHex);

  const core = document.createElement('div');
  core.className = 'magic-flare-core';
  core.style.left = `${cx}px`;
  core.style.top = `${cy}px`;
  layer.appendChild(core);

  const cross = document.createElement('div');
  cross.className = 'magic-cross-beam';
  cross.style.left = `${cx}px`;
  cross.style.top = `${cy}px`;
  cross.style.width = '340px';
  cross.style.height = '340px';
  cross.innerHTML = `
    <svg viewBox="0 0 340 340" width="340" height="340" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="170" x2="320" y2="170" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="170" y1="20" x2="170" y2="320" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="75" y1="75" x2="265" y2="265" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.75"/>
      <line x1="265" y1="75" x2="75" y2="265" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.75"/>
      <circle cx="170" cy="170" r="7" fill="#FFFFFF"/>
    </svg>
  `;
  layer.appendChild(cross);

  for (let r = 0; r < 2; r++) {
    const ribbon = document.createElement('div');
    ribbon.className = 'magic-swirl-ribbon';
    ribbon.style.left = `${cx}px`;
    ribbon.style.top = `${cy}px`;
    ribbon.style.animationDelay = `${r * 0.08}s`;
    if (r === 1) {
      ribbon.style.width = '210px';
      ribbon.style.height = '210px';
      ribbon.style.borderRadius = '63% 37% 41% 59% / 55% 62% 38% 45%';
    }
    layer.appendChild(ribbon);
  }

  const moteCount = 18;
  for (let i = 0; i < moteCount; i++) {
    const angle = (Math.PI * 2 * i) / moteCount + (Math.random() - 0.5) * 0.25;
    const dist = 75 + Math.random() * 125;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    const mote = document.createElement('span');
    mote.className = 'magic-spark-mote';
    mote.style.left = `${cx}px`;
    mote.style.top = `${cy}px`;
    mote.style.setProperty('--tx', `${tx.toFixed(1)}px`);
    mote.style.setProperty('--ty', `${ty.toFixed(1)}px`);
    mote.style.setProperty('--dur', `${(0.55 + Math.random() * 0.35).toFixed(2)}s`);
    mote.style.animationDelay = `${(Math.random() * 0.08).toFixed(2)}s`;
    layer.appendChild(mote);
  }

  document.body.appendChild(layer);
  setTimeout(() => {
    layer.remove();
    targetEl.classList.remove('is-casting');
  }, 880);
}

function go(html) {
  m.innerHTML = html;
  scrollTo(0, 0);
  m.classList.remove('out');
  const h = m.querySelector('h1,h2');
  if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
}

function prog() {
  const pct = Math.min(100, (qi / total) * 100) + '%';
  bar.style.width = pct;
  bar.classList.remove('mana-surge');
  void bar.offsetWidth;
  bar.classList.add('mana-surge');
  if (manaSurgeTimer) clearTimeout(manaSurgeTimer);
  manaSurgeTimer = setTimeout(() => {
    bar.classList.remove('mana-surge');
  }, 650);
}

function next() {
  const s = q[qi++];
  prog();
  if (!s) return;
  m.classList.add('out');
  setTimeout(() => render(s), matchMedia('(prefers-reduced-motion:reduce)').matches ? 0 : 340);
}

function cardFrame(label, innerHtml) {
  return `<div class="tarot-shell">
    <div class="card-deck-head">
      <span>${label}</span>
      <span class="card-suits" aria-hidden="true">♠ ♥ ♦ ♣</span>
    </div>
    ${innerHtml}
  </div>`;
}

function render(s) {
  if (s.k === 'ch') {
    const chData = GAME_DATA.chapters[s.n];
    setBg(`ch${s.n}`);
    go(cardFrame(`CHAPTER CARD · 0${s.n}`, `
      <div style="text-align:center;max-width:580px;margin:6px auto">
        <div class="big-ch" aria-hidden="true">0${s.n}</div>
        <span class="tag">CHAPTER 0${s.n}</span>
        <h2>${chData[0]}</h2>
        <p>${chData[1]}</p>
        <button class="btn" id="go" style="margin-top:8px">เปิดไพ่ด่านถัดไป</button>
      </div>
    `));
    document.getElementById('go').onclick = () => { if (s.n === 3) planDistricts(); next(); };
  }
  else if (s.k === 'scene') scene(s);
  else if (s.k === 'dist') dist(s);
  else if (s.k === 'card') card();
  else if (s.k === 'end') end();
}

function renderCardButton(attrName, attrVal, text, index) {
  const num = String(index + 1).padStart(2, '0');
  return `<button class="opt choice-card" ${attrName}="${attrVal}">
    <span class="cc-head">CARD ${num}</span>
    <span class="cc-body">${text}</span>
    <span class="cc-foot" aria-hidden="true">✦</span>
  </button>`;
}

function scene(s) {
  setBg(s.id);
  const d = GAME_DATA.scenes[s.id];
  const opts = shuffle(ORD.map((c, i) => [c, d[2][i]]));
  go(cardFrame(`STAGE CARD · ${d[0]}`, `
    <div class="scene-header">
      <span class="tag">${d[0]}</span>
      <h2>${d[1]}</h2>
    </div>
    <div class="opts card-fan">${opts.map((o, i) => renderCardButton('data-c', o[0], o[1], i)).join('')}</div>
  `));
  pick((c, btn) => {
    sc[c]++;
    if (s.id === 's52') a52 = c;
    triggerCardMagicEffect(btn);
    setTimeout(next, 520);
  });
}

function dist(s) {
  setBg(`dist_${s.c}`);
  const d = GAME_DATA.districts[s.c];
  const opts = shuffle(d[2]);
  go(cardFrame(`SECRET DISTRICT · ${d[0]}`, `
    <div class="scene-header">
      <span class="tag">${d[0]}</span>
      <h2>${d[1]}</h2>
    </div>
    <div class="opts card-fan">${opts.map((o, i) => renderCardButton('data-j', o[1], o[0], i)).join('')}</div>
  `));
  m.querySelectorAll('.opt').forEach(b => b.onclick = () => {
    b.classList.add('sel');
    first.push(b.dataset.j);
    m.querySelectorAll('.opt').forEach(x => x.disabled = true);
    triggerCardMagicEffect(b);
    setTimeout(next, 520);
  });
}

function pick(f) {
  m.querySelectorAll('.opt').forEach(b => b.onclick = () => {
    b.classList.add('sel');
    m.querySelectorAll('.opt').forEach(x => x.disabled = true);
    setTimeout(() => f(b.dataset.c, b), 240);
  });
}

function planDistricts() {
  const r = ranked(), ds = [{ k: 'dist', c: r[0][0] }];
  if (r[0][1] - r[1][1] <= 1) ds.push({ k: 'dist', c: r[1][0] });
  q.splice(qi, 0, ...ds);
  total += ds.length;
}

function card() {
  setBg('card');
  const formFields = GAME_DATA.form;
  go(cardFrame('PASS CARD · บัตรผ่านเข้าสู่เทศกาล', `
    <span class="tag">FINAL GATE · บัตรผ่าน</span>
    <h2>ลงนามก่อนขึ้นเวที</h2>
    <p>กรอกข้อมูลบัตรผ่านเท่าที่สะดวก ข้อไหนไม่อยากตอบสามารถข้ามได้</p>
    <form class="card-form" id="f">${formFields.map((f, i) => f[1] ? (f[2] ? `<fieldset><legend>${f[0]}</legend>${f[1].map(o => `<label style="display:inline-block;margin:4px 14px 4px 0;font-weight:300"><input type="checkbox" style="display:inline;width:auto;margin:0 6px 0 0">${o}</label>`).join('')}</fieldset>` : `<label>${f[0]}<select><option value="">ข้าม</option>${f[1].map(o => `<option>${o}</option>`).join('')}</select></label>`) : `<label>${f[0]}<input type="text" ${i === 0 ? 'id="nickInput" placeholder="ระบุชื่อเล่นของเธอ..."' : ''}></label>`).join('')}
    <button class="btn" type="submit">เปิดการ์ดฮีโร่ของเธอ</button></form>
  `));
  document.getElementById('f').onsubmit = e => {
    e.preventDefault();
    const el = document.getElementById('nickInput');
    if (el && el.value.trim()) nick = el.value.trim();
    next();
  };
}

function jobsFor(c) {
  if (!GAME_DATA || !GAME_DATA.hero[c]) return [];
  const p = new Set(first);
  const jobList = GAME_DATA.jobs ? GAME_DATA.jobs[c] : (GAME_DATA.hero[c].jobs || []);
  const mine = jobList.filter(j => p.has(j));
  return [...mine.map(j => [j, 1]), ...jobList.filter(j => !mine.includes(j)).map(j => [j, 0])];
}

function initHero3DParallax() {
  const cardEl = document.getElementById('hero3dCard');
  const shadowEl = document.getElementById('hero3dShadow');
  const glareEl = document.getElementById('heroHoloGlare');
  if (!cardEl || !shadowEl || !glareEl) return;

  if (heroAnimId) cancelAnimationFrame(heroAnimId);

  let isInteracting = false;
  let targetRotX = 0;
  let targetRotY = 0;
  let targetScale = 1;
  let currentRotX = 0;
  let currentRotY = 0;
  let currentScale = 1;
  let startTime = performance.now();

  const updatePointer = (clientX, clientY, maxTilt) => {
    const rect = cardEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = Math.max(-1, Math.min(1, (clientX - centerX) / (rect.width * 0.72)));
    const normY = Math.max(-1, Math.min(1, (clientY - centerY) / (rect.height * 0.72)));

    targetRotX = -normY * maxTilt;
    targetRotY = normX * maxTilt;
    targetScale = 1.03;

    const glareX = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const glareY = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    glareEl.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.88) 0%, rgba(255,215,0,0.34) 26%, rgba(59,130,246,0.24) 55%, rgba(0,0,0,0) 80%)`;
    glareEl.style.opacity = '0.9';
  };

  const onWindowMouseMove = (e) => {
    if (!document.getElementById('hero3dCard')) {
      window.removeEventListener('mousemove', onWindowMouseMove);
      return;
    }
    const rect = cardEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    if (dist < 320) {
      isInteracting = true;
      updatePointer(e.clientX, e.clientY, 26);
    } else if (isInteracting) {
      isInteracting = false;
      targetScale = 1;
      glareEl.style.opacity = '0';
    }
  };
  window.addEventListener('mousemove', onWindowMouseMove);

  cardEl.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      isInteracting = true;
      updatePointer(e.touches[0].clientX, e.touches[0].clientY, 24);
    }
  }, { passive: true });

  cardEl.addEventListener('touchend', () => {
    isInteracting = false;
    targetScale = 1;
    glareEl.style.opacity = '0';
  });

  function animate3D(now) {
    if (!document.getElementById('hero3dCard')) return;
    const elapsed = (now - startTime) / 1000;

    if (!isInteracting) {
      targetRotX = Math.sin(elapsed * 1.6) * 6;
      targetRotY = Math.cos(elapsed * 1.2) * 8;
      targetScale = 1;
      const autoGlareX = 50 + Math.cos(elapsed * 1.2) * 26;
      const autoGlareY = 50 + Math.sin(elapsed * 1.6) * 26;
      glareEl.style.background = `radial-gradient(circle at ${autoGlareX}% ${autoGlareY}%, rgba(255,255,255,0.55) 0%, rgba(255,215,0,0.2) 30%, rgba(0,0,0,0) 75%)`;
      glareEl.style.opacity = '0.5';
    }

    const floatY = Math.sin(elapsed * 2.0) * 4;
    currentRotX += (targetRotX - currentRotX) * 0.14;
    currentRotY += (targetRotY - currentRotY) * 0.14;
    currentScale += (targetScale - currentScale) * 0.12;

    cardEl.style.transform = `translateY(${floatY.toFixed(2)}px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) scale(${currentScale.toFixed(3)})`;

    const shadowX = -currentRotY * 1.3;
    const shadowScale = Math.max(0.75, 1 - Math.abs(currentRotX) * 0.004 - floatY * 0.006);
    shadowEl.style.transform = `translateX(calc(-50% + ${shadowX}px)) scale(${shadowScale.toFixed(3)})`;
    shadowEl.style.opacity = isInteracting ? '0.9' : '0.6';

    heroAnimId = requestAnimationFrame(animate3D);
  }
  heroAnimId = requestAnimationFrame(animate3D);
}

function end() {
  try {
    const r = ranked();
    const c = r[0][0];
    const h = GAME_DATA.hero[c];
    const mainColor = h.color || '#38bdf8';
    const svgArt = HERO_SVGS[c];
    const swatches = h.swatches || [mainColor, '#ffffff', '#0f172a'];

    setBg(`end_${c}`, 'end');
    document.documentElement.style.setProperty('--accent', mainColor);
    document.body.classList.add('inv');
    bar.style.width = '100%';

    go(cardFrame(`DESTINY CARD UNLOCKED · ${c}`, `
      <div style="--hc:${mainColor}">
        <div class="hero-showcase-top">
          <span class="tag" style="border-color:${mainColor};color:${mainColor};margin-bottom:18px">THE PALETTE OF REBELLION · ${nick ? `ฮีโร่ของ ${nick}` : 'DESTINY CARD'}</span>
          <div class="hero-3d-stage">
            <div class="hero-3d-ambient"></div>
            <div id="hero3dShadow" class="hero-3d-shadow"></div>
            <div id="hero3dCard" class="hero-3d-card">
              <div class="hero-layer hero-layer-bg" style="background-image:url('${h.img}');background-color:#18181b"></div>
              <div class="hero-layer hero-layer-mid">
                <img src="${h.img}" alt="การ์ดฮีโร่ ${h.card} (${c})" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                <div style="display:none;width:100%;height:100%">${svgArt}</div>
              </div>
              <div class="hero-layer hero-layer-edge"></div>
              <div class="hero-layer hero-layer-top">
                <div id="heroHoloGlare" class="hero-holo-glare"></div>
                <div class="hero-particle" style="top:14%;left:16%;animation-delay:0s"></div>
                <div class="hero-particle" style="top:72%;left:82%;animation-delay:1.1s"></div>
                <div class="hero-particle" style="top:42%;left:86%;animation-delay:2.2s"></div>
                <div class="hero-particle" style="top:84%;left:20%;animation-delay:0.7s"></div>
              </div>
            </div>
          </div>
          <div class="hero-3d-hint">✦ เลื่อนเมาส์หรือแตะบนการ์ดเพื่อหมุนดูมิติ 3D</div>
        </div>

        <div class="playing-card-details">
          <div class="card-top">
            <div class="card-rank">${h.rank} · ${c}</div>
            <div class="card-score">พลังสร้างสรรค์ ${sc[c]} / 11</div>
          </div>
          <div class="hero-title">${h.card}</div>
          <div class="hero-sub">${h.role}</div>
          <p>${h.desc}</p>
          <div class="swatches" title="Color Palette ประจำตัวละคร">${swatches.map(hex => `<span style="background:${hex}"></span>`).join('')}</div>
          <div class="dept-box">สาขาที่ใช่สำหรับเธอ: <strong>${h.dept}</strong> · School of Digital Media (SDM)</div>
          <ul class="jobs">${jobsFor(c).map(j => `<li class="${j[1] ? 'f' : ''}">${j[0]}</li>`).join('')}</ul>
        </div>

        <div class="result-footer-cta">
          <h2 class="disp" style="margin-top:8px">JOIN THE REBELLION</h2>
          <p>สมัครสมาชิกเพื่อรับข่าวกิจกรรมของ SDM และข้อมูลทุนการศึกษาก่อนใคร</p>
          <button class="btn" id="btnJoin" style="background:${mainColor};border-color:${mainColor};color:#fff">สมัครสมาชิกรับข้อมูลทุน SDM</button>
          <button class="btn ghost" onclick="location.reload()">เล่นอีกครั้ง</button>
        </div>
      </div>
    `));

    initHero3DParallax();

    document.getElementById('btnJoin').onclick = () => {
      showToast(`ยินดีต้อนรับ ${nick || 'นักปฏิวัติ'} เข้าสู่คอมมูนิตี้ SDM!`);
    };
  } catch (err) {
    console.error('End screen error:', err);
    m.classList.remove('out');
  }
}

function start() {
  q = [
    { k: 'ch', n: 1 }, ...['s11', 's12', 's13'].map(id => ({ k: 'scene', id })),
    { k: 'ch', n: 2 }, ...['s21', 's22', 's23'].map(id => ({ k: 'scene', id })),
    { k: 'ch', n: 3 }, { k: 'scene', id: 'gate' },
    { k: 'ch', n: 4 }, { k: 'scene', id: 's41' }, { k: 'scene', id: 's42' },
    { k: 'ch', n: 5 }, { k: 'scene', id: 's51' }, { k: 'scene', id: 's52' },
    { k: 'card' }, { k: 'end' }
  ];
  total = q.length;
  qi = 0;
  next();
}

function renderIntro() {
  setBg('start');
  go(cardFrame('PROLOGUE CARD · THE PALETTE OF REBELLION', `
    <div style="text-align:center;max-width:580px;margin:4px auto">
      <span class="tag">THE PALETTE OF REBELLION</span>
      <h1>IMAGINE CITY</h1>
      <h2>คืนสุดท้ายก่อนสีจะหายไป</h2>
      <div class="palette-strip" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
      <p>สีสันของ Imagine City กำลังจะหายไปทั้งเมือง เหลือเวลาถึงคืนนี้เท่านั้น หากมีใครขึ้นเวทีในเทศกาล Imagine Design Event แล้วปลุกความสุขให้ผู้คนได้ สีทั้งหมดจะกลับคืนมา</p>
      <p>เธอตื่นขึ้นกลางจัตุรัสพร้อมดวงไฟนำทางที่รอให้เธอเลือกเส้นทางด้วยตัวเอง</p>
      <button class="btn" id="st" style="margin-top:8px">เริ่มจั่วไพ่ปฏิวัติสีสัน</button>
    </div>
  `));
  document.getElementById('st').onclick = () => {
    unlockBgmOnFirstInteraction();
    start();
  };
}

fetch('Data/scenes.json')
  .then(res => {
    if (!res.ok) throw new Error('ไม่สามารถโหลดไฟล์ Data/scenes.json ได้');
    return res.json();
  })
  .then(data => {
    GAME_DATA = data;
    renderIntro();
  })
  .catch(err => {
    console.error(err);
    go(cardFrame('SYSTEM NOTICE', `
      <h2>ไม่สามารถโหลดข้อมูลเกมได้</h2>
      <p>กรุณาเปิดเว็บไซต์ผ่าน Live Server หรือ GitHub Pages และตรวจสอบไฟล์ <code>Data/scenes.json</code></p>
    `));
  });
