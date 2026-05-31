'use strict';

// ===== 音效 =====
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new AudioCtx();
  return audioCtx;
}

function playTone(freq, duration, type, volume) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

function sfxCorrect() {
  playTone(523, 0.08, 'sine', 0.15);
  setTimeout(() => playTone(659, 0.12, 'sine', 0.12), 60);
}

function sfxWrong() {
  playTone(180, 0.12, 'sawtooth', 0.06);
}

function sfxComplete() {
  [523, 587, 659, 784].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.2, 'sine', 0.12), i * 100);
  });
}

function sfxCount(n) {
  playTone(400 + n * 60, 0.15, 'sine', 0.1);
}

// ===== 莫兰迪色板 =====
const MORANDI = [
  '#A8B5A0', '#B5A0A8', '#A0A8B5', '#B5A890', '#A090B5',
  '#90B5A8', '#B5A098', '#98A8B5', '#B0A890', '#A8A0B0',
];

// ===== DOM =====
const $ = id => document.getElementById(id);
const el = {
  pageSetup: $('page-setup'),
  pageGame: $('page-game'),
  chipSize: $('chipSize'),
  chipMode: $('chipMode'),
  btnStart: $('btnStart'),
  btnBack: $('btnBack'),
  btnRestart: $('btnRestart'),
  grid: $('grid'),
  gridWrapper: document.querySelector('.grid-wrapper'),
  statTimer: $('statTimer'),
  statTarget: $('statTarget'),
  statProgress: $('statProgress'),
  modeBadge: $('modeBadge'),
  modalResult: $('modalResult'),
  modalTime: $('modalTime'),
  modalDetail: $('modalDetail'),
  modalRecord: $('modalRecord'),
  modalAgain: $('modalAgain'),
  modalHome: $('modalHome'),
  bestList: $('bestList'),
};

// ===== 状态 =====
const state = {
  size: 5,
  mode: 'asc',
  currentIndex: 0,
  total: 0,
  timer: 0,
  started: false,
  timerId: null,
  countingDown: false,
};

// ===== 工具 =====
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickColor() {
  return MORANDI[Math.floor(Math.random() * MORANDI.length)];
}

function vibrate(ms) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

// ===== 最佳记录 =====
function loadRecords() {
  try { return JSON.parse(localStorage.getItem('schulte_records') || '{}'); }
  catch { return {}; }
}

function saveRecord(size, mode, time) {
  const records = loadRecords();
  const key = size + 'x' + size + '_' + mode;
  const prev = records[key];
  const rounded = Math.round(time * 10) / 10;
  if (prev === undefined || rounded < prev) {
    records[key] = rounded;
    localStorage.setItem('schulte_records', JSON.stringify(records));
    return true;
  }
  return false;
}

function renderBest() {
  const records = loadRecords();
  const entries = Object.entries(records);
  el.bestList.innerHTML = '';
  if (entries.length === 0) {
    el.bestList.innerHTML = '<div class="best-empty">暂无记录</div>';
    return;
  }
  const labels = { asc: '顺序', desc: '倒序' };
  entries.sort((a, b) => a[1] - b[1]);
  for (const [key, time] of entries) {
    const [sz, mode] = key.split('_');
    const div = document.createElement('div');
    div.className = 'best-item';
    div.innerHTML = `<span class="best-label">${sz} · ${labels[mode] || mode}</span><span class="best-time">${time.toFixed(1)}s</span>`;
    el.bestList.appendChild(div);
  }
}

// ===== 页面切换 =====
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  page.classList.add('active');
}

// ===== 清除旧倒计时 =====
function clearCountdown() {
  const old = el.gridWrapper.querySelector('.countdown-overlay');
  if (old) old.remove();
}

// ===== 渲染网格（数字默认隐藏） =====
function renderGrid() {
  const size = state.size;
  const total = size * size;
  const nums = shuffle(Array.from({ length: total }, (_, i) => i + 1));
  const colors = nums.map(() => pickColor());
  const fontSizeMap = { 4: '28px', 5: '22px', 8: '16px' };

  clearCountdown();
  el.grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  el.grid.dataset.size = size;
  el.grid.innerHTML = '';

  nums.forEach((num) => {
    const cell = document.createElement('div');
    cell.className = 'cell hidden-num';
    cell.textContent = num;
    cell.dataset.num = num;
    cell.style.background = colors[num % colors.length];
    cell.style.fontSize = fontSizeMap[size] || '22px';
    cell.addEventListener('click', () => handleCellClick(cell, num));
    el.grid.appendChild(cell);
  });

  return nums;
}

// ===== 倒计时 =====
function startCountdown(nums) {
  state.countingDown = true;
  state.started = false;
  state.timer = 0;
  state.currentIndex = 0;
  state.total = nums.length;
  if (state.timerId) { clearInterval(state.timerId); state.timerId = null; }

  el.statTimer.textContent = '0.0s';
  el.statTarget.innerHTML = state.mode === 'asc' ? '→ <b>1</b>' : `→ <b>${nums.length}</b>`;
  el.statProgress.textContent = `0/${nums.length}`;
  showPage(el.pageGame);

  clearCountdown();

  const overlay = document.createElement('div');
  overlay.className = 'countdown-overlay';
  const numDisplay = document.createElement('div');
  numDisplay.className = 'countdown-num';
  overlay.appendChild(numDisplay);
  el.gridWrapper.appendChild(overlay);

  let count = 3;

  function tick() {
    if (count > 0) {
      numDisplay.textContent = count;
      numDisplay.className = 'countdown-num';
      void numDisplay.offsetWidth;
      numDisplay.style.animation = 'none';
      void numDisplay.offsetWidth;
      numDisplay.style.animation = '';
      sfxCount(count);
      vibrate(10);
      count--;
      setTimeout(tick, 750);
    } else {
      numDisplay.textContent = '开始';
      numDisplay.className = 'countdown-num go';
      sfxCount(0);
      setTimeout(() => {
        overlay.remove();
        document.querySelectorAll('.cell').forEach(c => c.classList.remove('hidden-num'));
        state.countingDown = false;
      }, 500);
    }
  }

  tick();
}

// ===== 开始游戏 =====
function startGame() {
  const nums = renderGrid();
  state.numbers = nums;
  startCountdown(nums);
}

// ===== 点击处理 =====
function handleCellClick(cell, num) {
  if (cell.dataset.done === 'true') return;
  if (state.countingDown) return;

  if (!state.started) {
    state.started = true;
    state.timerId = setInterval(() => {
      state.timer += 0.1;
      el.statTimer.textContent = state.timer.toFixed(1) + 's';
    }, 100);
  }

  const expected = state.mode === 'asc'
    ? state.currentIndex + 1
    : state.total - state.currentIndex;

  if (num !== expected) {
    cell.classList.remove('wrong-shake');
    void cell.offsetWidth;
    cell.classList.add('wrong-shake');
    vibrate(20);
    sfxWrong();
    return;
  }

  cell.dataset.done = 'true';
  cell.classList.remove('correct-flash');
  void cell.offsetWidth;
  cell.classList.add('correct-flash');
  vibrate(8);
  sfxCorrect();

  state.currentIndex++;
  el.statProgress.textContent = `${state.currentIndex}/${state.total}`;

  if (state.currentIndex >= state.total) {
    finishGame();
    return;
  }

  const next = state.mode === 'asc'
    ? state.currentIndex + 1
    : state.total - state.currentIndex;
  el.statTarget.innerHTML = `→ <b>${next}</b>`;
}

// ===== 完成 =====
function finishGame() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }

  sfxComplete();

  const finalTime = state.timer;
  const isRecord = saveRecord(state.size, state.mode, finalTime);

  el.modalTime.textContent = finalTime.toFixed(1) + 's';
  el.modalDetail.textContent = `${state.size}×${state.size} · ${state.mode === 'asc' ? '顺序' : '倒序'}`;
  el.modalRecord.textContent = isRecord ? '🏆 新纪录！' : '';
  el.modalRecord.className = 'modal-record' + (isRecord ? ' is-record' : '');
  el.modalResult.classList.add('open');

  if (isRecord) renderBest();
}

// ===== 事件绑定 =====

el.chipSize.addEventListener('click', e => {
  const btn = e.target.closest('.chip');
  if (!btn) return;
  el.chipSize.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  state.size = parseInt(btn.dataset.size);
});

el.chipMode.addEventListener('click', e => {
  const btn = e.target.closest('.chip');
  if (!btn) return;
  el.chipMode.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  state.mode = btn.dataset.mode;
});

el.btnStart.addEventListener('click', startGame);

el.btnBack.addEventListener('click', () => {
  if (state.timerId) { clearInterval(state.timerId); state.timerId = null; }
  state.started = false;
  state.countingDown = false;
  clearCountdown();
  showPage(el.pageSetup);
  renderBest();
});

el.btnRestart.addEventListener('click', startGame);

el.modalAgain.addEventListener('click', () => {
  el.modalResult.classList.remove('open');
  startGame();
});
el.modalHome.addEventListener('click', () => {
  el.modalResult.classList.remove('open');
  showPage(el.pageSetup);
  renderBest();
});

el.modalResult.addEventListener('click', e => {
  if (e.target === el.modalResult) el.modalResult.classList.remove('open');
});

// ===== 初始化 =====
renderBest();
