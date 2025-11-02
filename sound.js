// Hệ thống âm thanh cho Quiz App
const SOUND_MAP = {
  'ui-confirm': 'assets/sounds/ui-confirm.mp3',
  'ui-open': 'assets/sounds/ui-open.mp3',
  'card-slide': 'assets/sounds/card-slide.mp3',
  'interactive-snap': 'assets/sounds/interactive-snap.mp3',
  'quiz-complete': 'assets/sounds/quiz-complete.mp3',
  'quiz-correct': 'assets/sounds/quiz-correct.mp3',
  'quiz-incorrect': 'assets/sounds/quiz-incorrect.mp3',
  'quiz-start': 'assets/sounds/quiz-start.mp3',
  'ui-click': 'assets/sounds/ui-click.mp3',
  'ui-oh_nooo': 'assets/sounds/ui-oh_nooo.mp3',
  'ui-yes': 'assets/sounds/ui-yes.mp3'
};

const cache = {};
let enabled = true;

// Load setting từ localStorage
function loadSetting() {
  const saved = localStorage.getItem('quizSoundEnabled');
  if (saved !== null) {
    enabled = saved === 'true';
  }
  return enabled;
}

// Save setting vào localStorage
function saveSetting() {
  localStorage.setItem('quizSoundEnabled', enabled.toString());
}

// Preload tất cả âm thanh
function preloadAll() {
  Object.entries(SOUND_MAP).forEach(([key, src]) => {
    try {
      const a = new Audio(src);
      a.preload = 'auto';
      cache[key] = a;
    } catch (e) {
      console.warn('Failed to preload', src, e);
    }
  });
}

// Phát âm thanh
function play(key, opts = {}) {
  if (!enabled) return;
  const a = cache[key];
  if (a) {
    // Clone để cho phép phát đồng thời nhiều âm thanh
    try {
      const inst = new Audio(a.src);
      if (typeof opts.volume === 'number') {
        inst.volume = Math.max(0, Math.min(1, opts.volume));
      }
      inst.play().catch(() => {});
    } catch (e) {
      console.warn('play failed', e);
    }
  } else if (SOUND_MAP[key]) {
    try {
      const inst = new Audio(SOUND_MAP[key]);
      if (typeof opts.volume === 'number') {
        inst.volume = Math.max(0, Math.min(1, opts.volume));
      }
      inst.play().catch(() => {});
    } catch (e) {
      console.warn('play fallback failed', e);
    }
  } else {
    console.warn('Unknown sound key', key);
  }
}

// Bật/tắt âm thanh
function setEnabled(v) {
  enabled = !!v;
  saveSetting();
}

// Lấy trạng thái hiện tại
function isEnabled() {
  return enabled;
}

// Toggle âm thanh
function toggle() {
  setEnabled(!enabled);
  return enabled;
}

// Load setting khi khởi động
loadSetting();

// API công khai
window.QuizSound = {
  preloadAll,
  play,
  setEnabled,
  isEnabled,
  toggle
};
