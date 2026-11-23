/**
 * QuizStage — English Tutor MCQ Game Show App
 * Zero-room, zero-PIN instant screen-share MCQ presenter & quick editor.
 */

const STORAGE_KEY = 'quizstage_english_decks_v1';
const VOCAB_STORAGE_KEY = 'quizstage_vocab_pocket_v1';
const OPTION_LETTERS = ['A', 'B', 'C', 'D'];
const OPTION_SHAPES = ['▲', '◆', '●', '■'];
const CATEGORIES = [
  'Grammar',
  'Vocabulary',
  'Phrasal Verbs',
  'Pronunciation',
  'Idioms',
  'Reading',
  'Listening / TTS',
];

const CHEST_REWARDS_POOL = [
  {
    type: 'doublePoints',
    icon: '⚡',
    name: 'x2 Điểm Câu Sau',
    desc: 'Nhân đôi số điểm nhận được ở câu trả lời đúng tiếp theo!',
  },
  {
    type: 'shield',
    icon: '🛡️',
    name: 'Khiên Bảo Vệ',
    desc: 'Nếu câu sau lỡ chọn sai, Khiên sẽ đỡ 1 lần để chọn lại và giữ nguyên Streak!',
  },
  {
    type: 'bonus200',
    icon: '🌟',
    name: '+200 Stars Bonus',
    desc: 'Cộng nóng ngay 200 điểm thưởng vào tổng điểm hiện tại!',
  },
  {
    type: 'free5050',
    icon: '✂️',
    name: 'Free 50/50 + 100 Stars',
    desc: 'Tặng +100 điểm và nạp sẵn quyền 50/50 miễn phí cho câu sau!',
  },
];

function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function getDefaultDecks() {
  return [
    {
      id: 'deck_sample_b1',
      title: 'English Grammar & Vocab Challenge (B1)',
      settings: {
        revealMode: 'two-step',
        blindDefault: false,
        accent: 'en-US',
        timerSeconds: 0,
      },
      questions: [
        {
          id: uid('q'),
          category: 'Grammar',
          prompt: 'By the time we arrived at the cinema, the film _____ already.',
          image: '',
          options: ['started', 'had started', 'has started', 'was starting'],
          correctIndex: 1,
          explanation:
            'Công thức Past Perfect (Quá khứ hoàn thành): "By the time + S + V2/ed, S + had + V3/ed" diễn tả hành động xảy ra trước một mốc/hành động khác trong quá khứ.',
        },
        {
          id: uid('q'),
          category: 'Pronunciation',
          prompt: 'Choose the word whose __underlined__ part is pronounced differently:',
          image: '',
          options: ['watch__ed__', 'stopp__ed__', 'wash__ed__', 'play__ed__'],
          correctIndex: 3,
          explanation:
            'played /pleɪd/ có đuôi -ed đọc là /d/ (sau âm hữu thanh). Các từ watched, stopped, washed đọc là /t/ (sau âm vô thanh /tʃ/, /p/, /ʃ/).',
        },
        {
          id: uid('q'),
          category: 'Phrasal Verbs',
          prompt: 'We had to _____ the outdoor picnic because of the sudden heavy rain.',
          image: '',
          options: ['put off', 'turn on', 'take after', 'look up'],
          correctIndex: 0,
          explanation:
            'put off /pʊt ɒf/ (= postpone): hoãn lại. | turn on: bật lên | take after: giống ai đó (ngoại hình/tính cách) | look up: tra cứu.',
        },
        {
          id: uid('q'),
          category: 'Grammar',
          prompt: 'If I _____ enough money right now, I would buy a new laptop for my online classes.',
          image: '',
          options: ['have', 'will have', 'had', 'would have'],
          correctIndex: 2,
          explanation:
            'Câu điều kiện loại 2 (trái với hiện tại): "If + S + V2/ed (were), S + would + V-inf". Có "would buy" ở mệnh đề chính nên mệnh đề If chia Quá khứ đơn -> had.',
        },
        {
          id: uid('q'),
          category: 'Vocabulary',
          prompt: 'Although the exam was extremely challenging, Mai managed to stay _____ and finish on time.',
          image: '',
          options: ['nervous', 'calm', 'careless', 'confused'],
          correctIndex: 1,
          explanation:
            'calm /kɑːm/ (adj): bình tĩnh. Nhờ liên từ "Although" (mặc dù bài thi rất khó), vế sau mang nghĩa tích cực trái ngược -> stay calm (giữ bình tĩnh).',
        },
        {
          id: uid('q'),
          type: 'mcq',
          category: 'Idioms',
          prompt: 'Don’t worry about the presentation tomorrow — it will be **a piece of cake** for you!',
          image: '',
          options: [
            'a delicious dessert',
            'something very easy to do',
            'a difficult problem',
            'an expensive gift',
          ],
          correctIndex: 1,
          explanation:
            'Idiom "a piece of cake" /ə piːs əv keɪk/: việc gì đó cực kỳ dễ dàng, dễ như ăn bánh!',
        },
        {
          id: uid('q'),
          type: 'unscramble',
          category: 'Grammar',
          prompt: 'Sắp xếp các cụm từ sau thành câu hoàn chỉnh (Thì Hiện Tại Hoàn Thành):',
          image: '',
          options: ['', '', '', ''],
          correctIndex: 0,
          answerText: 'She / has lived / in Ho Chi Minh City / since 2020.',
          explanation:
            'Trật tự câu chuẩn: Chủ ngữ (She) + has lived + Nơi chốn (in Ho Chi Minh City) + Mốc thời gian (since 2020).',
        },
        {
          id: uid('q'),
          type: 'typein',
          category: 'Grammar',
          prompt: 'Chia động từ trong ngoặc: Look! The children _____ (play) football in the yard right now.',
          image: '',
          options: ['', '', '', ''],
          correctIndex: 0,
          answerText: "are playing / 're playing",
          explanation:
            'Có dấu hiệu "Look!" và "right now" -> thì Hiện tại tiếp diễn (S + am/is/are + V-ing). Chủ ngữ "The children" là số nhiều -> are playing.',
        },
      ],
    },
    {
      id: 'deck_sample_phrasal',
      title: 'IELTS & Daily Phrasal Verbs + Collocations',
      settings: {
        revealMode: 'two-step',
        blindDefault: true,
        accent: 'en-GB',
        timerSeconds: 20,
      },
      questions: [
        {
          id: uid('q'),
          category: 'Vocabulary',
          prompt: 'Before making a final decision, you should _____ all the pros and cons carefully.',
          image: '',
          options: ['make', 'weigh', 'do', 'take'],
          correctIndex: 1,
          explanation:
            'Collocation chuẩn: "weigh the pros and cons" /weɪ ðə prəʊz ənd kɒnz/ = cân nhắc kỹ mặt lợi và mặt hại.',
        },
        {
          id: uid('q'),
          category: 'Phrasal Verbs',
          prompt: 'I really _____ my elder sister because she always works hard and supports our family.',
          image: '',
          options: ['look up to', 'look down on', 'get away with', 'run out of'],
          correctIndex: 0,
          explanation:
            'look up to sb (= admire / respect): kính trọng, ngưỡng mộ ai đó. Trái nghĩa với "look down on" (coi thường).',
        },
        {
          id: uid('q'),
          category: 'Grammar',
          prompt: 'Not only _____ fluent English, but he also speaks French and Japanese.',
          image: '',
          options: [
            'he speaks',
            'does he speak',
            'speaks he',
            'he does speak',
          ],
          correctIndex: 1,
          explanation:
            'Đảo ngữ với "Not only... but also...": Đưa trợ động từ (do/does/did) lên trước chủ ngữ -> "Not only does he speak...".',
        },
        {
          id: uid('q'),
          category: 'Vocabulary',
          prompt: 'The museum is _____ located in the city centre, making it easy for tourists to visit.',
          image: '',
          options: ['conveniently', 'convenient', 'convenience', 'inconvenient'],
          correctIndex: 0,
          explanation:
            'Cần trạng từ (Adv) đứng trước phân từ/động từ "located" để bổ nghĩa -> conveniently /kənˈviːniəntli/ (một cách thuận tiện).',
        },
      ],
    },
  ];
}

/* ================= APPLICATION STATE ================= */
const state = {
  decks: [],
  activeDeckId: null,
  vocabList: [],
  activePopoverWord: '',
  chestState: null,
  game: null, // Active presenter session
  summaryFilter: 'all',
  pen: {
    active: false,
    drawing: false,
    color: '#ffeb3b',
    width: 4,
    alpha: 1,
    lastX: 0,
    lastY: 0,
  },
  confetti: {
    particles: [],
    rafId: null,
  },
};

/* ================= DOM REFERENCES ================= */
const $ = (id) => document.getElementById(id);

const els = {
  toastContainer: $('toastContainer'),
  editorView: $('editorView'),
  presenterView: $('presenterView'),
  summaryView: $('summaryView'),

  // Editor
  deckList: $('deckList'),
  deckTitleInput: $('deckTitleInput'),
  settingRevealMode: $('settingRevealMode'),
  settingBlindDefault: $('settingBlindDefault'),
  settingAccent: $('settingAccent'),
  settingTimerSeconds: $('settingTimerSeconds'),
  questionCountBadge: $('questionCountBadge'),
  questionEditorList: $('questionEditorList'),
  importJsonInput: $('importJsonInput'),

  // Smart Paste Modal
  smartPasteModal: $('smartPasteModal'),
  smartPasteTextarea: $('smartPasteTextarea'),
  smartParseCount: $('smartParseCount'),
  smartImportTarget: $('smartImportTarget'),
  aiTopicInput: $('aiTopicInput'),
  aiLevelSelect: $('aiLevelSelect'),
  aiCountSelect: $('aiCountSelect'),
  aiGeneratedPrompt: $('aiGeneratedPrompt'),

  // Presenter
  confettiCanvas: $('confettiCanvas'),
  annotationCanvas: $('annotationCanvas'),
  hudDeckTitle: $('hudDeckTitle'),
  hudProgressPill: $('hudProgressPill'),
  hudCategoryPill: $('hudCategoryPill'),
  hudRetryBadge: $('hudRetryBadge'),
  hudTimerBox: $('hudTimerBox'),
  hudTimerText: $('hudTimerText'),
  timerBarTrack: $('timerBarTrack'),
  timerBarFill: $('timerBarFill'),
  btnTimerToggle: $('btnTimerToggle'),
  hudStreakBox: $('hudStreakBox'),
  hudStreakText: $('hudStreakText'),
  hudScoreText: $('hudScoreText'),
  hudShieldBadge: $('hudShieldBadge'),
  hudDoubleBadge: $('hudDoubleBadge'),
  hudFree5050Badge: $('hudFree5050Badge'),
  hudVocabCount: $('hudVocabCount'),
  btnToggleVocabDrawer: $('btnToggleVocabDrawer'),
  vocabPopover: $('vocabPopover'),
  vocabPopoverWord: $('vocabPopoverWord'),
  vocabPopoverMeaning: $('vocabPopoverMeaning'),
  vocabDrawer: $('vocabDrawer'),
  vocabManualWord: $('vocabManualWord'),
  vocabManualMeaning: $('vocabManualMeaning'),
  vocabDrawerList: $('vocabDrawerList'),
  mysteryChestModal: $('mysteryChestModal'),
  chestStreakNum: $('chestStreakNum'),
  chestGrid: $('chestGrid'),
  chestResultBanner: $('chestResultBanner'),
  chestResultText: $('chestResultText'),
  btnAccentToggle: $('btnAccentToggle'),
  btnToggleBlind: $('btnToggleBlind'),
  btnFiftyFifty: $('btnFiftyFifty'),
  btnTogglePen: $('btnTogglePen'),
  btnFlagQuestion: $('btnFlagQuestion'),
  btnToggleBgm: $('btnToggleBgm'),
  btnToggleMute: $('btnToggleMute'),
  penToolbar: $('penToolbar'),
  stageStatusPill: $('stageStatusPill'),
  presenterQuestionText: $('presenterQuestionText'),
  presenterImageWrap: $('presenterImageWrap'),
  presenterImage: $('presenterImage'),
  blindCurtain: $('blindCurtain'),
  presenterOptionsGrid: $('presenterOptionsGrid'),
  presenterUnscrambleArea: $('presenterUnscrambleArea'),
  unscrambleTargetZone: $('unscrambleTargetZone'),
  unscrambleBankZone: $('unscrambleBankZone'),
  presenterTypeinArea: $('presenterTypeinArea'),
  typeinHintBox: $('typeinHintBox'),
  typeinInput: $('typeinInput'),
  explanationBox: $('explanationBox'),
  explanationVerdictIcon: $('explanationVerdictIcon'),
  explanationVerdictText: $('explanationVerdictText'),
  explanationBody: $('explanationBody'),
  btnPrevQuestion: $('btnPrevQuestion'),
  btnNextQuestion: $('btnNextQuestion'),
  btnPrimaryStageAction: $('btnPrimaryStageAction'),

  // Summary
  summaryTrophy: $('summaryTrophy'),
  summaryHeadline: $('summaryHeadline'),
  summaryDeckSubtitle: $('summaryDeckSubtitle'),
  kpiAccuracy: $('kpiAccuracy'),
  kpiFraction: $('kpiFraction'),
  kpiScore: $('kpiScore'),
  kpiBestStreak: $('kpiBestStreak'),
  kpiReviewCount: $('kpiReviewCount'),
  btnRetryMistakes: $('btnRetryMistakes'),
  summaryVocabCount: $('summaryVocabCount'),
  summaryVocabList: $('summaryVocabList'),
  summaryReviewList: $('summaryReviewList'),
};

/* ================= UTILITIES ================= */
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  els.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.25s ease';
    setTimeout(() => toast.remove(), 260);
  }, 2800);
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Formats question text cleanly:
 * - Preserves blanks (3+ underscores _____) as glowing slots
 * - Optional filledText fills the blank upon answer reveal
 * - **bold** -> <strong>bold</strong>
 * - __underline__ -> <span class="q-underline">underline</span>
 */
function formatRichEnglishText(rawText, filledAnswer = null) {
  let text = String(rawText ?? '');
  const blanks = [];
  // Protect 3+ underscores as blank tokens before processing __underline__
  text = text.replace(/_{3,}/g, (match) => {
    const token = `@@BLANK_${blanks.length}@@`;
    blanks.push(match);
    return token;
  });

  let safe = escapeHtml(text);
  // Bold **...**
  safe = safe.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Underline __...__
  safe = safe.replace(/__([^_]+)__/g, '<span class="q-underline">$1</span>');
  // Newlines
  safe = safe.replace(/\n/g, '<br />');

  // Restore blanks
  safe = safe.replace(/@@BLANK_(\d+)@@/g, () => {
    if (filledAnswer !== null) {
      return `<span class="blank-slot filled">${escapeHtml(filledAnswer)}</span>`;
    }
    return '<span class="blank-slot">_____</span>';
  });

  return safe;
}

function stripFormattingForSpeech(rawText, filledAnswer = null) {
  let text = String(rawText ?? '');
  text = text.replace(/_{3,}/g, filledAnswer ? ` ${filledAnswer} ` : ' blank ');
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/__([^_]+)__/g, '$1');
  return text.replace(/\s+/g, ' ').trim();
}

function speakEnglish(text, accent = 'en-US') {
  if (!('speechSynthesis' in window)) {
    showToast('Trình duyệt không hỗ trợ đọc giọng nói TTS.', 'warn');
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = accent;
  utter.rate = 0.95;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    const exact = voices.find((v) => v.lang.toLowerCase() === accent.toLowerCase());
    const prefix = voices.find((v) => v.lang.toLowerCase().startsWith(accent.slice(0, 2).toLowerCase()));
    if (exact) utter.voice = exact;
    else if (prefix) utter.voice = prefix;
  }

  window.speechSynthesis.speak(utter);
}

/* ================= QUESTION TYPE HELPERS ================= */
function getQuestionType(q) {
  return q?.type || 'mcq';
}

function tokenizeUnscramble(answerText) {
  const raw = String(answerText || '').trim();
  if (!raw) return [];
  if (raw.includes('/')) {
    return raw
      .split('/')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return raw.split(/\s+/).filter(Boolean);
}

function shuffleTokensNotEqual(tokens) {
  const items = tokens.map((text, idx) => ({ id: idx, text }));
  if (items.length <= 1) return items;

  const original = tokens.join('|').toLowerCase();
  for (let attempt = 0; attempt < 8; attempt++) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    if (items.map((x) => x.text).join('|').toLowerCase() !== original) {
      break;
    }
  }
  return items;
}

function normalizeAnswerText(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,!?;:])/g, '$1')
    .trim();
}

function getPrimaryCorrectAnswerText(q) {
  const qType = getQuestionType(q);
  if (qType === 'unscramble') {
    return tokenizeUnscramble(q.answerText).join(' ');
  }
  if (qType === 'typein') {
    return String(q.answerText || '')
      .split('/')
      .map((s) => s.trim())
      .filter(Boolean)[0] || '';
  }
  return stripFormattingForSpeech(q.options?.[q.correctIndex] || '');
}

function isTypeinMatch(studentInput, answerText) {
  const cleanStudent = normalizeAnswerText(studentInput);
  if (!cleanStudent) return false;
  const variants = String(answerText || '')
    .split('/')
    .map((v) => normalizeAnswerText(v))
    .filter(Boolean);
  return variants.includes(cleanStudent);
}

function buildTypeinHint(answerText, level = 1) {
  const primary = String(answerText || '')
    .split('/')[0]
    ?.trim();
  if (!primary) return '';
  const chars = [...primary];
  const revealCount = level >= 2 ? Math.max(1, Math.ceil(chars.length / 2)) : 1;
  const masked = chars
    .map((ch, i) => {
      if (ch === ' ') return '   ';
      if (i < revealCount) return ch;
      return '_';
    })
    .join(' ');
  return `💡 Gợi ý (${primary.replace(/\s+/g, '').length} ký tự): ${masked}`;
}

/* ================= STORAGE ================= */
function loadDecks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        state.decks = parsed;
        state.activeDeckId = parsed[0].id;
        return;
      }
    }
  } catch (err) {
    console.warn('Could not load saved decks:', err);
  }
  state.decks = getDefaultDecks();
  state.activeDeckId = state.decks[0].id;
  saveDecks();
}

function saveDecks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.decks));
  } catch (err) {
    showToast('Bộ nhớ trình duyệt gần đầy (có thể do ảnh quá lớn).', 'warn');
  }
}

function getActiveDeck() {
  return state.decks.find((d) => d.id === state.activeDeckId) || state.decks[0];
}

function loadVocabList() {
  try {
    const raw = localStorage.getItem(VOCAB_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        state.vocabList = parsed;
        return;
      }
    }
  } catch (err) {
    console.warn('Could not load vocab list:', err);
  }
  state.vocabList = [];
}

function saveVocabList() {
  try {
    localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify(state.vocabList));
  } catch (err) {
    console.warn('Could not save vocab list:', err);
  }
}

function addVocabItem(wordRaw, meaningRaw = '') {
  const word = String(wordRaw || '').trim();
  const meaning = String(meaningRaw || '').trim();
  if (!word) return false;

  const existing = state.vocabList.find((v) => v.word.toLowerCase() === word.toLowerCase());
  if (existing) {
    if (meaning) existing.meaning = meaning;
    saveVocabList();
    renderVocabLists();
    showToast(`📒 Đã cập nhật từ "${word}" trong Giỏ từ vựng!`, 'success');
    return true;
  }

  state.vocabList.unshift({
    id: uid('voc'),
    word,
    meaning,
  });
  saveVocabList();
  renderVocabLists();
  showToast(`📒 Đã lưu "${word}" vào Giỏ từ vựng!`, 'success');
  return true;
}

function renderVocabLists() {
  if (els.hudVocabCount) {
    els.hudVocabCount.textContent = String(state.vocabList.length);
  }
  if (els.summaryVocabCount) {
    els.summaryVocabCount.textContent = String(state.vocabList.length);
  }

  const accent = state.game?.accent || getActiveDeck()?.settings?.accent || 'en-US';

  const buildItemCard = (item) => {
    const card = document.createElement('div');
    card.className = 'vocab-item';
    card.innerHTML = `
      <div class="vocab-item-top">
        <span class="vocab-word-title">${escapeHtml(item.word)}</span>
        <div class="vocab-item-actions">
          <button type="button" class="q-mini-btn" data-v-speak title="Phát âm">🔊</button>
          <button type="button" class="q-mini-btn danger" data-v-del title="Xóa từ">✕</button>
        </div>
      </div>
      <input
        type="text"
        class="vocab-meaning-input"
        value="${escapeHtml(item.meaning || '')}"
        placeholder="Nhập nghĩa tiếng Việt / phiên âm IPA..."
      />
    `;

    card.querySelector('[data-v-speak]').addEventListener('click', () => {
      speakEnglish(item.word, accent);
    });
    card.querySelector('[data-v-del]').addEventListener('click', () => {
      state.vocabList = state.vocabList.filter((v) => v.id !== item.id);
      saveVocabList();
      renderVocabLists();
    });
    card.querySelector('.vocab-meaning-input').addEventListener('input', (e) => {
      item.meaning = e.target.value;
      saveVocabList();
    });
    return card;
  };

  if (els.vocabDrawerList) {
    els.vocabDrawerList.innerHTML = '';
    if (state.vocabList.length === 0) {
      els.vocabDrawerList.innerHTML =
        '<p style="color:var(--text-muted);font-size:0.88rem;text-align:center;padding:24px 10px;">Chưa có từ nào được lưu. Hãy bôi đen hoặc double-click vào bất kỳ từ Tiếng Anh nào trên câu hỏi để lưu nhanh!</p>';
    } else {
      state.vocabList.forEach((item) => els.vocabDrawerList.appendChild(buildItemCard(item)));
    }
  }

  if (els.summaryVocabList) {
    els.summaryVocabList.innerHTML = '';
    if (state.vocabList.length === 0) {
      els.summaryVocabList.innerHTML =
        '<p style="color:var(--text-muted);font-size:0.9rem;">Chưa có từ vựng nào được đánh dấu trong buổi học này.</p>';
    } else {
      state.vocabList.forEach((item) => els.summaryVocabList.appendChild(buildItemCard(item)));
    }
  }
}

function copyVocabListToClipboard() {
  if (state.vocabList.length === 0) {
    showToast('Giỏ từ vựng hiện đang trống!', 'warn');
    return;
  }
  const lines = state.vocabList.map(
    (v, i) => `${i + 1}. ${v.word}${v.meaning ? ` — ${v.meaning}` : ''}`
  );
  const text = `📒 TỪ VỰNG MỚI BUỔI HỌC (${state.vocabList.length} từ):\n${lines.join('\n')}`;
  navigator.clipboard.writeText(text).then(
    () => showToast('📋 Đã copy danh sách từ vựng!', 'success'),
    () => showToast('Không thể truy cập clipboard tự động.', 'warn')
  );
}

/* ================= VIEW SWITCHING ================= */
function switchView(viewName) {
  [els.editorView, els.presenterView, els.summaryView].forEach((v) => v.classList.remove('active'));
  if (viewName === 'editor') els.editorView.classList.add('active');
  if (viewName === 'presenter') els.presenterView.classList.add('active');
  if (viewName === 'summary') els.summaryView.classList.add('active');
}

/* ================= EDITOR RENDERING & ACTIONS ================= */
function renderEditor() {
  const deck = getActiveDeck();
  if (!deck) return;

  // Sidebar decks
  els.deckList.innerHTML = '';
  state.decks.forEach((d) => {
    const item = document.createElement('div');
    item.className = `deck-item ${d.id === deck.id ? 'active' : ''}`;
    item.innerHTML = `
      <div class="deck-item-title">${escapeHtml(d.title || 'Bộ đề chưa đặt tên')}</div>
      <div class="deck-item-meta">
        <span>${d.questions.length} câu hỏi</span>
        <span>${d.settings.accent === 'en-GB' ? '🇬🇧 UK' : '🇺🇸 US'}</span>
      </div>
    `;
    item.addEventListener('click', () => {
      state.activeDeckId = d.id;
      renderEditor();
    });
    els.deckList.appendChild(item);
  });

  // Header fields
  els.deckTitleInput.value = deck.title;
  els.settingRevealMode.value = deck.settings.revealMode || 'two-step';
  els.settingBlindDefault.checked = !!deck.settings.blindDefault;
  els.settingAccent.value = deck.settings.accent || 'en-US';
  els.settingTimerSeconds.value = String(deck.settings.timerSeconds || 0);
  els.questionCountBadge.textContent = `${deck.questions.length} câu hỏi`;

  // Questions list
  els.questionEditorList.innerHTML = '';
  if (deck.questions.length === 0) {
    els.questionEditorList.innerHTML = `
      <div class="q-card" style="text-align:center; padding: 34px 20px;">
        <p style="font-size:1.1rem; font-weight:800; margin-bottom:8px;">Chưa có câu hỏi nào trong bộ đề này ✨</p>
        <p style="color:var(--text-muted);">Bấm <strong>"+ Thêm câu hỏi mới"</strong> hoặc dùng <strong>"⚡ Smart Paste"</strong> để dán hàng loạt câu hỏi!</p>
      </div>
    `;
    return;
  }

  deck.questions.forEach((q, qIdx) => {
    const card = document.createElement('article');
    card.className = 'q-card';
    card.dataset.qIndex = String(qIdx);

    const qType = getQuestionType(q);
    const categoryOptions = CATEGORIES.map(
      (cat) => `<option value="${cat}" ${q.category === cat ? 'selected' : ''}>${cat}</option>`
    ).join('');

    const imageBlock = q.image
      ? `
        <div class="q-image-preview-box">
          <img src="${q.image}" alt="Ảnh câu hỏi" />
          <button class="q-img-remove" data-action="remove-img" title="Xóa ảnh" type="button">✕</button>
        </div>`
      : '';

    let answerEditorHtml = '';
    if (qType === 'mcq') {
      const optionsHtml = q.options
        .map((optText, oIdx) => {
          const isCorrect = q.correctIndex === oIdx;
          return `
            <div class="q-opt-row ${isCorrect ? 'is-correct' : ''}">
              <span class="q-opt-letter opt-color-${oIdx}">${OPTION_LETTERS[oIdx]}</span>
              <input
                type="text"
                class="q-opt-input"
                data-opt-index="${oIdx}"
                value="${escapeHtml(optText)}"
                placeholder="Đáp án ${OPTION_LETTERS[oIdx]}..."
              />
              <button
                type="button"
                class="q-correct-btn"
                data-action="set-correct"
                data-opt-index="${oIdx}"
                title="Đánh dấu là đáp án đúng"
              >${isCorrect ? '✓ Đúng' : 'Chọn'}</button>
            </div>
          `;
        })
        .join('');
      answerEditorHtml = `<div class="q-options-grid">${optionsHtml}</div>`;
    } else if (qType === 'unscramble') {
      const previewTokens = tokenizeUnscramble(q.answerText || '');
      const chipsHtml =
        previewTokens.length > 0
          ? previewTokens.map((t) => `<span class="q-token-chip">${escapeHtml(t)}</span>`).join('')
          : '<span style="color:var(--text-muted);font-size:0.8rem;">Nhập câu đúng ở trên để xem các thẻ từ được tách tự động...</span>';
      answerEditorHtml = `
        <div class="q-custom-answer-box">
          <label class="q-custom-label">🧩 Câu Tiếng Anh đúng (dùng dấu <code>/</code> để tách theo cụm từ, hoặc bỏ <code>/</code> để tách từng từ):</label>
          <input
            type="text"
            class="q-answer-text-input"
            data-field="answerText"
            value="${escapeHtml(q.answerText || '')}"
            placeholder="VD: She / has lived / in Ho Chi Minh City / since 2020."
          />
          <div class="q-tokens-preview">${chipsHtml}</div>
        </div>
      `;
    } else {
      answerEditorHtml = `
        <div class="q-custom-answer-box">
          <label class="q-custom-label">⌨️ Đáp án đúng (có thể nhập nhiều biến thể ngăn cách bằng dấu <code>/</code>, VD: <code>are playing / 're playing</code>):</label>
          <input
            type="text"
            class="q-answer-text-input"
            data-field="answerText"
            value="${escapeHtml(q.answerText || '')}"
            placeholder="VD: had started  hoặc  wasn't / was not"
          />
        </div>
      `;
    }

    const promptPlaceholder =
      qType === 'unscramble'
        ? 'Nhập yêu cầu hoặc gợi ý tiếng Việt (VD: Sắp xếp các từ sau thành câu hoàn chỉnh:)...'
        : qType === 'typein'
        ? 'Nhập câu có chỗ trống _____ hoặc động từ trong ngoặc (VD: She _____ (go) to school yesterday.)...'
        : 'Nhập câu hỏi Tiếng Anh (VD: She _____ to school yesterday.)...';

    const optCountControls =
      qType === 'mcq'
        ? `
          <div class="q-opt-count-toggle">
            <span>Số lựa chọn:</span>
            <button type="button" class="q-mini-btn" data-action="opt-minus" ${q.options.length <= 2 ? 'disabled' : ''}>-</button>
            <strong>${q.options.length}</strong>
            <button type="button" class="q-mini-btn" data-action="opt-plus" ${q.options.length >= 4 ? 'disabled' : ''}>+</button>
          </div>
        `
        : '';

    card.innerHTML = `
      <div class="q-card-header">
        <div class="q-card-left">
          <span class="q-num-badge">Câu ${qIdx + 1}</span>
          <select class="q-type-select" data-field="type">
            <option value="mcq" ${qType === 'mcq' ? 'selected' : ''}>🔘 Trắc nghiệm (MCQ)</option>
            <option value="unscramble" ${qType === 'unscramble' ? 'selected' : ''}>🧩 Sắp xếp câu</option>
            <option value="typein" ${qType === 'typein' ? 'selected' : ''}>⌨️ Điền từ / Chia ĐT</option>
          </select>
          <select class="q-tag-select" data-field="category">${categoryOptions}</select>
          <label class="q-mini-btn" title="Tải ảnh minh họa lên (hoặc Ctrl+V dán trực tiếp vào thẻ này)" style="cursor:pointer;">
            🖼️ Ảnh
            <input type="file" accept="image/*" hidden data-action="upload-img" />
          </label>
        </div>
        <div class="q-card-actions">
          <button type="button" class="q-mini-btn" data-action="move-up" ${qIdx === 0 ? 'disabled' : ''} title="Lên">↑</button>
          <button type="button" class="q-mini-btn" data-action="move-down" ${qIdx === deck.questions.length - 1 ? 'disabled' : ''} title="Xuống">↓</button>
          <button type="button" class="q-mini-btn" data-action="dup-q" title="Nhân bản câu hỏi">📋</button>
          <button type="button" class="q-mini-btn danger" data-action="del-q" title="Xóa câu hỏi">🗑️</button>
        </div>
      </div>

      <div class="q-prompt-row">
        <textarea
          class="q-prompt-input"
          data-field="prompt"
          placeholder="${promptPlaceholder}"
        >${escapeHtml(q.prompt)}</textarea>
        ${imageBlock}
      </div>

      ${answerEditorHtml}

      <div class="q-bottom-row">
        <input
          type="text"
          class="q-explain-input"
          data-field="explanation"
          value="${escapeHtml(q.explanation || '')}"
          placeholder="Giải thích / Công thức / Phiên âm IPA / Nghĩa tiếng Việt (hiện khi mở đáp án)..."
        />
        ${optCountControls}
      </div>
    `;

    // Event bindings inside card
    card.querySelector('[data-field="type"]').addEventListener('change', (e) => {
      q.type = e.target.value;
      if (q.type === 'mcq' && (!Array.isArray(q.options) || q.options.length < 2)) {
        q.options = ['', '', '', ''];
        q.correctIndex = 0;
      }
      if ((q.type === 'unscramble' || q.type === 'typein') && typeof q.answerText !== 'string') {
        q.answerText = '';
      }
      saveDecks();
      renderEditor();
    });

    card.querySelector('[data-field="category"]').addEventListener('change', (e) => {
      q.category = e.target.value;
      saveDecks();
    });

    card.querySelector('[data-field="prompt"]').addEventListener('input', (e) => {
      q.prompt = e.target.value;
      saveDecks();
    });

    card.querySelector('[data-field="explanation"]').addEventListener('input', (e) => {
      q.explanation = e.target.value;
      saveDecks();
    });

    const answerTextInput = card.querySelector('[data-field="answerText"]');
    if (answerTextInput) {
      answerTextInput.addEventListener('input', (e) => {
        q.answerText = e.target.value;
        saveDecks();
        const previewEl = card.querySelector('.q-tokens-preview');
        if (previewEl) {
          const tokens = tokenizeUnscramble(q.answerText);
          previewEl.innerHTML =
            tokens.length > 0
              ? tokens.map((t) => `<span class="q-token-chip">${escapeHtml(t)}</span>`).join('')
              : '<span style="color:var(--text-muted);font-size:0.8rem;">Nhập câu đúng ở trên để xem các thẻ từ được tách tự động...</span>';
        }
      });
    }

    card.querySelectorAll('.q-opt-input').forEach((inp) => {
      inp.addEventListener('input', (e) => {
        const idx = Number(e.target.dataset.optIndex);
        q.options[idx] = e.target.value;
        saveDecks();
      });
    });

    card.querySelectorAll('[data-action="set-correct"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        q.correctIndex = Number(btn.dataset.optIndex);
        saveDecks();
        renderEditor();
      });
    });

    const uploadInput = card.querySelector('[data-action="upload-img"]');
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) attachImageFileToQuestion(file, q);
    });

    // Ctrl+V paste image directly onto question card
    card.addEventListener('paste', (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) attachImageFileToQuestion(file, q);
          break;
        }
      }
    });

    card.querySelector('[data-action="remove-img"]')?.addEventListener('click', () => {
      q.image = '';
      saveDecks();
      renderEditor();
    });

    card.querySelector('[data-action="move-up"]').addEventListener('click', () => {
      if (qIdx === 0) return;
      [deck.questions[qIdx - 1], deck.questions[qIdx]] = [deck.questions[qIdx], deck.questions[qIdx - 1]];
      saveDecks();
      renderEditor();
    });

    card.querySelector('[data-action="move-down"]').addEventListener('click', () => {
      if (qIdx >= deck.questions.length - 1) return;
      [deck.questions[qIdx + 1], deck.questions[qIdx]] = [deck.questions[qIdx], deck.questions[qIdx + 1]];
      saveDecks();
      renderEditor();
    });

    card.querySelector('[data-action="dup-q"]').addEventListener('click', () => {
      const copy = { ...q, id: uid('q'), options: [...q.options] };
      deck.questions.splice(qIdx + 1, 0, copy);
      saveDecks();
      renderEditor();
      showToast('Đã nhân bản câu hỏi!', 'success');
    });

    card.querySelector('[data-action="del-q"]').addEventListener('click', () => {
      deck.questions.splice(qIdx, 1);
      saveDecks();
      renderEditor();
    });

    card.querySelector('[data-action="opt-minus"]')?.addEventListener('click', () => {
      if (q.options.length <= 2) return;
      q.options.pop();
      if (q.correctIndex >= q.options.length) {
        q.correctIndex = q.options.length - 1;
      }
      saveDecks();
      renderEditor();
    });

    card.querySelector('[data-action="opt-plus"]')?.addEventListener('click', () => {
      if (q.options.length >= 4) return;
      q.options.push('');
      saveDecks();
      renderEditor();
    });

    els.questionEditorList.appendChild(card);
  });
}

function attachImageFileToQuestion(file, question) {
  const reader = new FileReader();
  reader.onload = (ev) => {
    const img = new Image();
    img.onload = () => {
      const maxW = 860;
      const scale = img.width > maxW ? maxW / img.width : 1;
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      question.image = canvas.toDataURL('image/webp', 0.85);
      saveDecks();
      renderEditor();
      showToast('🖼️ Đã gắn ảnh vào câu hỏi!', 'success');
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function addNewQuestion(focusNew = true) {
  const deck = getActiveDeck();
  if (!deck) return;
  deck.questions.push({
    id: uid('q'),
    type: 'mcq',
    category: 'Grammar',
    prompt: '',
    image: '',
    options: ['', '', '', ''],
    correctIndex: 0,
    answerText: '',
    explanation: '',
  });
  saveDecks();
  renderEditor();
  if (focusNew) {
    const prompts = els.questionEditorList.querySelectorAll('.q-prompt-input');
    const last = prompts[prompts.length - 1];
    if (last) {
      last.focus();
      last.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

/* ================= SMART PASTE PARSER & AI PROMPT ================= */
function parseSmartPasteText(rawText) {
  const text = String(rawText || '').replace(/\r\n/g, '\n').trim();
  if (!text) return [];

  const lines = text.split('\n');
  const parsed = [];
  let current = null;
  let readingExplanation = false;

  const flushCurrent = () => {
    if (!current) return;
    const cleanPrompt = current.promptLines.join(' ').trim();
    if (current.type === 'unscramble' || current.type === 'typein') {
      if (cleanPrompt && current.answerText.trim()) {
        parsed.push({
          id: uid('q'),
          type: current.type,
          category: current.category || 'Grammar',
          prompt: cleanPrompt,
          image: '',
          options: ['', '', '', ''],
          correctIndex: 0,
          answerText: current.answerText.trim(),
          explanation: current.explanationLines.join(' ').trim(),
        });
      }
    } else if (cleanPrompt && current.options.length >= 2) {
      // Ensure max 4 options
      const options = current.options.slice(0, 4);
      let correctIndex = current.correctIndex;
      if (correctIndex < 0 || correctIndex >= options.length) correctIndex = 0;

      parsed.push({
        id: uid('q'),
        type: 'mcq',
        category: current.category || 'Grammar',
        prompt: cleanPrompt,
        image: '',
        options,
        correctIndex,
        answerText: '',
        explanation: current.explanationLines.join(' ').trim(),
      });
    }
    current = null;
    readingExplanation = false;
  };

  const startNewQuestion = (firstLine) => {
    flushCurrent();
    let line = firstLine.replace(/^(?:Câu|Question|Q)?\s*\d+\s*[\.\)\:\-]\s*/i, '').trim();
    let category = 'Grammar';
    let qType = 'mcq';

    while (true) {
      const tagMatch = line.match(/^\[([^\]]+)\]\s*(.*)$/);
      if (!tagMatch) break;
      const candidateTag = tagMatch[1].trim();
      const lower = candidateTag.toLowerCase();
      if (lower === 'unscramble' || lower === 'sắp xếp' || lower === 'word order') {
        qType = 'unscramble';
      } else if (lower === 'type-in' || lower === 'typein' || lower === 'fill' || lower === 'điền từ') {
        qType = 'typein';
      } else {
        const matchedCat = CATEGORIES.find((c) => c.toLowerCase() === lower);
        category = matchedCat || candidateTag;
      }
      line = tagMatch[2].trim();
    }

    current = {
      type: qType,
      category,
      promptLines: line ? [line] : [],
      options: [],
      correctIndex: -1,
      answerText: '',
      explanationLines: [],
    };
  };

  // Helper to split inline options like: "A. go   B. went   C. going   D. goes"
  const splitInlineOptions = (line) => {
    const regex = /(?:^|\s)(\*?[A-Da-d][\.\)\:])\s+/g;
    const matches = [...line.matchAll(regex)];
    if (matches.length <= 1) return null;
    const segments = [];
    for (let i = 0; i < matches.length; i++) {
      const start = matches[i].index + (matches[i][0].startsWith(' ') ? 1 : 0);
      const end = i + 1 < matches.length ? matches[i + 1].index : line.length;
      segments.push(line.slice(start, end).trim());
    }
    return segments;
  };

  const processSingleOptionLine = (optStr) => {
    if (!current) return false;
    const match = optStr.match(/^(\*?)\s*([A-Da-d])[\.\)\:]\s*(.+)$/);
    if (!match) return false;
    const leadingStar = match[1] === '*';
    const letter = match[2].toUpperCase();
    let body = match[3].trim();
    let trailingStar = false;
    if (body.endsWith('*') && !body.endsWith('**')) {
      trailingStar = true;
      body = body.slice(0, -1).trim();
    }
    const idx = OPTION_LETTERS.indexOf(letter);
    if (idx === -1) return false;

    while (current.options.length < idx) {
      current.options.push('');
    }
    current.options[idx] = body;
    if (leadingStar || trailingStar) {
      current.correctIndex = idx;
    }
    readingExplanation = false;
    return true;
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    if (!trimmed) {
      // Blank line ends explanation continuation if we already have options or custom answer
      if (current && (current.options.length >= 2 || current.answerText.trim())) {
        flushCurrent();
      }
      continue;
    }

    // Check Explanation line
    const expMatch = trimmed.match(/^(?:Giải thích|Giai thich|Explanation|Explain|Note|Lời giải)\s*[:\-]\s*(.+)$/i);
    if (expMatch && current) {
      current.explanationLines.push(expMatch[1].trim());
      readingExplanation = true;
      continue;
    }

    // Check Answer key line: "Đáp án: B" or for Unscramble/Type-in "Đáp án: went"
    const ansLineMatch = trimmed.match(/^(?:Đáp án|Dap an|ĐA|Answer|Ans|Key)\s*[:\-]\s*(.+)$/i);
    if (ansLineMatch && current) {
      const val = ansLineMatch[1].trim();
      if (current.type === 'unscramble' || current.type === 'typein') {
        current.answerText = val;
      } else if (/^[A-Da-d](?:[\.\)]|\s|$)/.test(val) && val.length <= 2) {
        const idx = OPTION_LETTERS.indexOf(val[0].toUpperCase());
        if (idx !== -1) current.correctIndex = idx;
      } else if (current.options.length === 0) {
        current.type = 'typein';
        current.answerText = val;
      }
      readingExplanation = false;
      continue;
    }

    // Check inline multiple options on one line
    const inlineParts = current ? splitInlineOptions(trimmed) : null;
    if (inlineParts && inlineParts.every((p) => /^\*?[A-Da-d][\.\)\:]/.test(p))) {
      inlineParts.forEach((p) => processSingleOptionLine(p));
      continue;
    }

    // Check single option line
    if (current && /^\*?\s*[A-Da-d][\.\)\:]\s+/.test(trimmed)) {
      processSingleOptionLine(trimmed);
      continue;
    }

    // Check numbered new question line
    const isNumberedQuestion = /^(?:Câu|Question|Q)?\s*\d+[\.\)\:\-]\s+/i.test(trimmed);
    if (isNumberedQuestion) {
      startNewQuestion(trimmed);
      continue;
    }

    // Continuation or unnumbered new question
    if (!current) {
      startNewQuestion(trimmed);
    } else if (readingExplanation) {
      current.explanationLines.push(trimmed);
    } else if (current.options.length === 0 && !current.answerText) {
      current.promptLines.push(trimmed);
    } else {
      // Already had options/answer & not blank line -> starts a new unnumbered question
      startNewQuestion(trimmed);
    }
  }

  flushCurrent();
  return parsed;
}

function updateAiPromptBox() {
  const topic = els.aiTopicInput.value.trim() || 'English Grammar & Vocabulary';
  const level = els.aiLevelSelect.value;
  const count = els.aiCountSelect.value;

  els.aiGeneratedPrompt.value = `Hãy tạo cho tôi ${count} câu hỏi luyện tập Tiếng Anh trình độ ${level} về chủ đề: "${topic}" (có thể kết hợp Trắc nghiệm, Sắp xếp câu, và Điền từ/Chia động từ).

Yêu cầu ĐỊNH DẠNG CHÍNH XÁC như sau để tôi dán vào công cụ dạy học:
1) Câu Trắc nghiệm (MCQ): bắt đầu bằng số thứ tự và tag [Grammar], [Vocabulary], [Phrasal Verbs], [Pronunciation], hoặc [Idioms], 4 đáp án A. B. C. D. và đánh dấu * trước đáp án đúng.
2) Câu Sắp xếp câu: gắn thêm tag [Unscramble], ghi dòng "Đáp án: ..." với các cụm từ ngăn cách bởi dấu / (VD: She / has lived / here / since 2020.).
3) Câu Điền từ / Chia động từ: gắn thêm tag [Type-in], dùng _____ cho chỗ trống, ghi dòng "Đáp án: ..." (nếu có nhiều cách viết đúng thì ngăn cách bởi /).
4) Dùng __từ__ để gạch chân, và ngay dưới mỗi câu có dòng "Giải thích: ..." viết ngắn gọn bằng tiếng Việt (kèm công thức/IPA). Không viết lời mở đầu hay kết luận thừa.

Ví dụ mẫu:
1. [Grammar] She _____ to London with her family last summer.
A. go
*B. went
C. has gone
D. going
Giải thích: Có dấu hiệu "last summer" -> dùng thì Quá khứ đơn (V2 của go là went /went/).

2. [Unscramble] [Grammar] Sắp xếp các cụm từ sau thành câu hoàn chỉnh:
Đáp án: They / haven't finished / their homework / yet.
Giải thích: Thì Hiện tại hoàn thành câu phủ định dùng "haven't + V3/ed" và "yet" ở cuối câu.

3. [Type-in] [Grammar] Chia động từ: Look! It _____ (rain) heavily outside.
Đáp án: is raining / 's raining
Giải thích: Có "Look!" -> thì Hiện tại tiếp diễn (is/am/are + V-ing).`;
}

function openSmartPasteModal(defaultTab = 'paste') {
  els.smartPasteModal.classList.remove('hidden');
  document.querySelectorAll('.modal-tab').forEach((t) => {
    t.classList.toggle('active', t.dataset.tab === defaultTab);
  });
  document.getElementById('tabPaste').classList.toggle('active', defaultTab === 'paste');
  document.getElementById('tabAi').classList.toggle('active', defaultTab === 'ai');
  updateAiPromptBox();
  updateSmartPasteCount();
}

function updateSmartPasteCount() {
  const parsed = parseSmartPasteText(els.smartPasteTextarea.value);
  els.smartParseCount.textContent = `Nhận diện: ${parsed.length} câu hỏi`;
}

/* ================= PRESENTER / GAME SHOW ENGINE ================= */
function startGame(questionsSubset = null, isRetryMode = false) {
  const deck = getActiveDeck();
  if (!deck) return;

  const sourceQuestions = questionsSubset || deck.questions;
  const validQuestions = sourceQuestions.filter((q) => {
    const t = getQuestionType(q);
    if (t === 'unscramble' || t === 'typein') {
      return (q.prompt.trim() || (q.answerText || '').trim()) && (q.answerText || '').trim();
    }
    return q.prompt.trim() && Array.isArray(q.options) && q.options.some((o) => o.trim());
  });

  if (validQuestions.length === 0) {
    showToast('Vui lòng thêm ít nhất 1 câu hỏi có nội dung và đáp án trước khi bắt đầu!', 'warn');
    return;
  }

  // Clear any old timer
  stopQuestionTimer();

  state.game = {
    deckTitle: deck.title || 'English QuizStage',
    settings: { ...deck.settings },
    accent: deck.settings.accent || 'en-US',
    isRetryMode,
    questions: validQuestions.map((q) => ({ ...q, type: getQuestionType(q), options: [...(q.options || [])] })),
    currentIndex: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    lockedIndex: null,
    chestPending: false,
    powerups: {
      shield: false,
      doublePoints: false,
      free5050: false,
    },
    timerRemaining: deck.settings.timerSeconds || 0,
    timerPaused: false,
    timerInterval: null,
    states: validQuestions.map((q) => {
      const qType = getQuestionType(q);
      const tokens = qType === 'unscramble' ? tokenizeUnscramble(q.answerText) : [];
      return {
        qType,
        selectedIndex: null,
        studentText: '',
        typedValue: '',
        tokens,
        bankTokens: qType === 'unscramble' ? shuffleTokensNotEqual(tokens) : [],
        pickedIds: [],
        hintLevel: 0,
        isCorrect: null,
        revealed: false,
        eliminated: [],
        flagged: false,
        blindActive: qType === 'mcq' ? !!deck.settings.blindDefault : false,
      };
    }),
  };

  setPenActive(false);
  clearAnnotationCanvas();
  switchView('presenter');
  resizeCanvases();
  initTimerForCurrentQuestion();
  renderPresenterStage();
  focusTypeinIfNeeded();
}

function getCurrentGameQuestion() {
  const g = state.game;
  return {
    q: g.questions[g.currentIndex],
    qState: g.states[g.currentIndex],
  };
}

function renderPresenterStage() {
  const g = state.game;
  if (!g) return;
  const { q, qState } = getCurrentGameQuestion();

  // HUD Top
  els.hudDeckTitle.textContent = g.deckTitle;
  els.hudProgressPill.textContent = `Câu ${g.currentIndex + 1} / ${g.questions.length}`;
  els.hudCategoryPill.textContent = q.category || 'English';
  els.hudRetryBadge.classList.toggle('hidden', !g.isRetryMode);

  els.hudScoreText.textContent = g.score.toLocaleString('en-US');
  els.hudStreakText.textContent = `${g.streak} Streak`;
  els.hudStreakBox.classList.toggle('on-fire', g.streak >= 3);

  els.hudShieldBadge.classList.toggle('hidden', !g.powerups.shield);
  els.hudDoubleBadge.classList.toggle('hidden', !g.powerups.doublePoints);
  els.hudFree5050Badge.classList.toggle('hidden', !g.powerups.free5050);
  els.hudVocabCount.textContent = String(state.vocabList.length);

  const qType = getQuestionType(q);
  els.btnAccentToggle.textContent = g.accent === 'en-GB' ? '🎙️ UK' : '🎙️ US';
  els.btnToggleBlind.disabled = qType !== 'mcq' || qState.revealed;
  els.btnToggleBlind.classList.toggle('active', qType === 'mcq' && qState.blindActive && !qState.revealed);
  els.btnToggleBlind.textContent = qState.blindActive && !qState.revealed ? '👁️ Hiện ĐA' : '👁️ Che ĐA';

  els.btnFlagQuestion.classList.toggle('active', qState.flagged);
  els.btnFlagQuestion.textContent = qState.flagged ? '🚩 Đã đánh dấu' : '🚩 Lưu ý';

  if (qType === 'mcq') {
    els.btnFiftyFifty.disabled =
      qState.revealed ||
      qState.blindActive ||
      qState.eliminated.length > 0 ||
      q.options.length <= 2;
  } else if (qType === 'unscramble') {
    els.btnFiftyFifty.disabled =
      qState.revealed || qState.pickedIds.length >= qState.tokens.length;
  } else {
    els.btnFiftyFifty.disabled = qState.revealed || qState.hintLevel >= 2;
  }

  els.btnToggleMute.textContent = window.soundEngine.muted ? '🔇' : '🔊';
  els.btnToggleBgm.classList.toggle('active', window.soundEngine.bgmEnabled);

  // Question Card & Text
  const filledAns = qState.revealed ? getPrimaryCorrectAnswerText(q) : null;
  els.presenterQuestionText.innerHTML = formatRichEnglishText(q.prompt, filledAns);
  els.presenterQuestionText.classList.toggle('compact-text', q.prompt.length > 130);

  if (q.image) {
    els.presenterImage.src = q.image;
    els.presenterImageWrap.classList.remove('hidden');
  } else {
    els.presenterImageWrap.classList.add('hidden');
  }

  // Status Pill
  els.stageStatusPill.className = 'stage-status-pill';
  if (qState.revealed) {
    if (qState.isCorrect) {
      els.stageStatusPill.textContent = '🎉 CHÍNH XÁC!';
      els.stageStatusPill.classList.add('correct');
    } else {
      els.stageStatusPill.textContent = '💡 ĐÁP ÁN ĐÚNG';
      els.stageStatusPill.classList.add('wrong');
    }
  } else if (qType === 'unscramble') {
    els.stageStatusPill.textContent = '🧩 SẮP XẾP TỪ THÀNH CÂU';
  } else if (qType === 'typein') {
    els.stageStatusPill.textContent = '⌨️ ĐIỀN TỪ / CHIA ĐỘNG TỪ';
  } else if (g.lockedIndex !== null) {
    els.stageStatusPill.textContent = `🔒 ĐÃ CHỐT PHƯƠNG ÁN ${OPTION_LETTERS[g.lockedIndex]}?`;
    els.stageStatusPill.classList.add('locked');
  } else if (qState.blindActive) {
    els.stageStatusPill.textContent = '🤔 SUY NGHĨ TRƯỚC';
  } else {
    els.stageStatusPill.textContent = 'CHỌN ĐÁP ÁN (1-4 / A-D)';
  }

  // Show appropriate Stage Body (MCQ vs Unscramble vs Type-in)
  const showCurtain = qType === 'mcq' && qState.blindActive && !qState.revealed;
  els.blindCurtain.classList.toggle('hidden', !showCurtain);
  els.presenterOptionsGrid.classList.toggle('hidden', qType !== 'mcq' || showCurtain);
  els.presenterUnscrambleArea.classList.toggle('hidden', qType !== 'unscramble');
  els.presenterTypeinArea.classList.toggle('hidden', qType !== 'typein');

  if (qType === 'mcq') {
    // Render Options Grid
    els.presenterOptionsGrid.className = `presenter-options-grid ${showCurtain ? 'hidden' : ''} cols-${q.options.length === 2 ? 2 : 4}`;
    els.presenterOptionsGrid.innerHTML = '';

    q.options.forEach((optText, idx) => {
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = `opt-tile color-${idx}`;

      let statusTag = '';
      if (qState.eliminated.includes(idx)) {
        tile.classList.add('eliminated');
      }

      if (qState.revealed) {
        tile.classList.add('disabled');
        if (idx === q.correctIndex) {
          tile.classList.add('correct');
          statusTag = '<span class="opt-status-tag">✓ ĐÁP ÁN ĐÚNG</span>';
        } else if (idx === qState.selectedIndex && !qState.isCorrect) {
          tile.classList.add('wrong');
          statusTag = '<span class="opt-status-tag">✗ HỌC SINH CHỌN</span>';
        } else {
          tile.classList.add('dimmed');
        }
      } else if (g.lockedIndex === idx) {
        tile.classList.add('locked');
        statusTag = '<span class="opt-status-tag">🔒 ĐÃ CHỐT?</span>';
      }

      tile.innerHTML = `
        ${statusTag}
        <div class="opt-shape-badge">
          <span class="opt-shape-icon">${OPTION_SHAPES[idx]}</span>
          <span class="opt-letter-code">${OPTION_LETTERS[idx]}</span>
        </div>
        <div class="opt-tile-text">${formatRichEnglishText(optText)}</div>
      `;

      tile.addEventListener('click', () => handleOptionSelect(idx));
      els.presenterOptionsGrid.appendChild(tile);
    });
  } else if (qType === 'unscramble') {
    renderUnscrambleStage(q, qState);
  } else {
    renderTypeinStage(q, qState);
  }

  // Explanation Drawer
  if (qState.revealed) {
    els.explanationBox.classList.remove('hidden');
    const verdictEl = els.explanationBox.querySelector('.explanation-verdict');
    verdictEl.className = `explanation-verdict ${qState.isCorrect ? 'is-correct' : 'is-wrong'}`;
    els.explanationVerdictIcon.textContent = qState.isCorrect ? '🎉' : '📌';
    const correctDisplay = getPrimaryCorrectAnswerText(q);
    els.explanationVerdictText.textContent = qState.isCorrect
      ? 'Tuyệt vời! Chính xác!'
      : qType === 'mcq'
      ? `Đáp án đúng là ${OPTION_LETTERS[q.correctIndex]}: "${correctDisplay}"`
      : `Đáp án đúng: "${correctDisplay}"`;

    els.explanationBody.innerHTML = q.explanation
      ? formatRichEnglishText(q.explanation)
      : '<span style="color:var(--text-muted)">Không có ghi chú thêm cho câu này. Gia sư có thể giảng trực tiếp hoặc dùng bút vẽ khoanh từ khóa!</span>';
  } else {
    els.explanationBox.classList.add('hidden');
  }

  // Footer Nav & Primary CTA
  els.btnPrevQuestion.disabled = g.currentIndex === 0;
  const isLast = g.currentIndex === g.questions.length - 1;
  els.btnNextQuestion.textContent = isLast ? 'Tổng kết 🏆' : 'Câu sau ▶';

  els.btnPrimaryStageAction.classList.remove('ready-next');
  if (showCurtain) {
    els.btnPrimaryStageAction.textContent = '👁️ Hiện các đáp án (Space)';
  } else if (!qState.revealed) {
    if (qType === 'unscramble') {
      els.btnPrimaryStageAction.textContent = '✨ Kiểm tra câu vừa ghép (Space)';
    } else if (qType === 'typein') {
      els.btnPrimaryStageAction.textContent = '✨ Kiểm tra đáp án (Enter)';
    } else if (g.settings.revealMode === 'two-step' && g.lockedIndex !== null) {
      els.btnPrimaryStageAction.textContent = `✨ Mở đáp án ${OPTION_LETTERS[g.lockedIndex]} (Space)`;
    } else {
      els.btnPrimaryStageAction.textContent = 'Chọn đáp án A / B / C / D trên màn hình';
    }
  } else {
    els.btnPrimaryStageAction.classList.add('ready-next');
    els.btnPrimaryStageAction.textContent = isLast
      ? '🏆 Xem Bảng Tổng Kết! (Space)'
      : 'Câu tiếp theo ▶ (Space)';
  }

  // Timer Management
  syncTimerUI();
}

function renderUnscrambleStage(q, qState) {
  els.unscrambleTargetZone.innerHTML = '';
  if (qState.pickedIds.length === 0) {
    els.unscrambleTargetZone.innerHTML =
      '<span class="unscramble-placeholder">Bấm các thẻ từ bên dưới để ghép thành câu hoàn chỉnh...</span>';
  } else {
    qState.pickedIds.forEach((tokId, pos) => {
      const tok = qState.bankTokens.find((t) => t.id === tokId);
      if (!tok) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'word-tile tile-placed';
      if (qState.revealed) {
        btn.disabled = true;
        const expected = qState.tokens[pos] || '';
        const matchesPos = normalizeAnswerText(tok.text) === normalizeAnswerText(expected);
        btn.classList.remove('tile-placed');
        btn.classList.add(matchesPos ? 'tile-correct' : 'tile-wrong');
      }
      btn.textContent = tok.text;
      if (!qState.revealed) {
        btn.title = 'Bấm để trả từ về khay';
        btn.addEventListener('click', () => {
          qState.pickedIds.splice(pos, 1);
          window.soundEngine.playClick();
          renderPresenterStage();
        });
      }
      els.unscrambleTargetZone.appendChild(btn);
    });
  }

  els.unscrambleBankZone.innerHTML = '';
  qState.bankTokens.forEach((tok, bankIdx) => {
    const used = qState.pickedIds.includes(tok.id);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `word-tile ${used ? 'tile-used' : ''}`;
    btn.disabled = used || qState.revealed;
    btn.innerHTML = `<span class="word-tile-num">${bankIdx + 1}</span><span>${escapeHtml(tok.text)}</span>`;
    btn.addEventListener('click', () => {
      if (qState.revealed || used) return;
      qState.pickedIds.push(tok.id);
      window.soundEngine.playClick();
      renderPresenterStage();
    });
    els.unscrambleBankZone.appendChild(btn);
  });
}

function renderTypeinStage(q, qState) {
  els.typeinInput.value = qState.typedValue || '';
  els.typeinInput.disabled = qState.revealed;
  els.typeinInput.classList.remove('is-correct', 'is-wrong');
  if (qState.revealed) {
    els.typeinInput.classList.add(qState.isCorrect ? 'is-correct' : 'is-wrong');
  }

  if (qState.hintLevel > 0 && !qState.revealed) {
    els.typeinHintBox.textContent = buildTypeinHint(q.answerText, qState.hintLevel);
    els.typeinHintBox.classList.remove('hidden');
  } else {
    els.typeinHintBox.classList.add('hidden');
  }
}

function handleOptionSelect(optionIdx) {
  const g = state.game;
  if (!g) return;
  const { q, qState } = getCurrentGameQuestion();
  if (qState.revealed || qState.blindActive || qState.eliminated.includes(optionIdx)) return;

  if (g.settings.revealMode === 'instant') {
    revealAnswer(optionIdx);
    return;
  }

  // Two-step lock-in flow
  if (g.lockedIndex === optionIdx) {
    // Clicking the already-locked option a second time can optionally reveal or keep locked;
    // let's make clicking the same option again reveal it? Better: keep locked until Reveal/Space, OR double-click?
    // Actually tutors love clicking once to lock, asking "Are you sure?", then pressing Space or Reveal button!
    // What if tutor wants to switch choice? Clicking another option switches lock!
    window.soundEngine.playClick();
    return;
  }

  g.lockedIndex = optionIdx;
  window.soundEngine.playLockIn();
  renderPresenterStage();
}

function finalizeReveal(isCorrect, qState) {
  const g = state.game;
  if (!g) return;
  qState.revealed = true;
  qState.isCorrect = isCorrect;
  g.lockedIndex = null;

  if (isCorrect) {
    g.streak += 1;
    if (g.streak > g.bestStreak) g.bestStreak = g.streak;
    const streakBonus = Math.min(g.streak - 1, 5) * 50;
    let earned = 100 + streakBonus;
    if (g.powerups.doublePoints) {
      earned *= 2;
      g.powerups.doublePoints = false;
      showToast(`⚡ x2 Điểm kích hoạt! +${earned} điểm thưởng!`, 'success');
    }
    g.score += earned;
    window.soundEngine.playCorrect(g.streak);
    launchConfetti(g.streak >= 3 ? 95 : 55);

    if (g.streak > 0 && g.streak % 3 === 0) {
      g.chestPending = true;
      const achievedStreak = g.streak;
      setTimeout(() => {
        if (state.game === g && g.chestPending && els.presenterView.classList.contains('active')) {
          openMysteryChest(achievedStreak);
        }
      }, 650);
    }
  } else {
    g.streak = 0;
    window.soundEngine.playWrong();
  }

  renderPresenterStage();
}

function revealAnswer(explicitIndex = null) {
  const g = state.game;
  if (!g) return;
  const { q, qState } = getCurrentGameQuestion();
  if (qState.revealed) return;

  const chosen = explicitIndex !== null ? explicitIndex : g.lockedIndex;
  if (chosen === null || chosen === undefined) {
    showToast('Hãy chọn một đáp án (1-4 / A-D) trước khi mở kết quả!', 'warn');
    return;
  }

  stopQuestionTimer();

  // Shield Power-up: Protects against a wrong selection once and lets student retry!
  if (chosen !== q.correctIndex && g.powerups.shield) {
    g.powerups.shield = false;
    if (!qState.eliminated.includes(chosen)) {
      qState.eliminated.push(chosen);
    }
    g.lockedIndex = null;
    window.soundEngine.playShieldBlock();
    showToast('🛡️ Khiên Bảo Vệ đã đỡ 1 lần sai! Học sinh được chọn lại nhé!', 'success');
    renderPresenterStage();
    initTimerForCurrentQuestion();
    return;
  }

  qState.selectedIndex = chosen;
  finalizeReveal(chosen === q.correctIndex, qState);
}

function evaluateCustomQuestionAnswer() {
  const g = state.game;
  if (!g) return;
  const { q, qState } = getCurrentGameQuestion();
  if (qState.revealed) return;

  const qType = getQuestionType(q);
  let studentText = '';
  let isCorrect = false;

  if (qType === 'unscramble') {
    if (qState.pickedIds.length === 0) {
      showToast('Hãy chọn các thẻ từ để ghép câu trước khi kiểm tra!', 'warn');
      return;
    }
    studentText = qState.pickedIds
      .map((id) => qState.bankTokens.find((t) => t.id === id)?.text || '')
      .join(' ')
      .trim();
    const targetText = qState.tokens.join(' ');
    isCorrect = normalizeAnswerText(studentText) === normalizeAnswerText(targetText);
  } else {
    studentText = els.typeinInput.value.trim();
    qState.typedValue = studentText;
    if (!studentText) {
      showToast('Hãy gõ đáp án của học sinh vào ô trước khi kiểm tra!', 'warn');
      els.typeinInput.focus();
      return;
    }
    isCorrect = isTypeinMatch(studentText, q.answerText);
  }

  stopQuestionTimer();

  if (!isCorrect && g.powerups.shield) {
    g.powerups.shield = false;
    window.soundEngine.playShieldBlock();
    showToast('🛡️ Khiên Bảo Vệ đã đỡ 1 lần sai! Hãy chỉnh sửa lại đáp án nhé!', 'success');
    renderPresenterStage();
    initTimerForCurrentQuestion();
    return;
  }

  qState.studentText = studentText;
  finalizeReveal(isCorrect, qState);
}

/* ================= MYSTERY CHEST & POWER-UPS ================= */
function openMysteryChest(streak) {
  const g = state.game;
  if (!g) return;
  g.chestPending = false;

  const shuffled = [...CHEST_REWARDS_POOL];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const rewards = shuffled.slice(0, 3);

  state.chestState = {
    streak,
    rewards,
    openedIndex: null,
  };

  els.chestStreakNum.textContent = String(streak);
  els.chestResultBanner.classList.add('hidden');
  renderMysteryChests();
  els.mysteryChestModal.classList.remove('hidden');
  window.soundEngine.playChestAppear();
}

function renderMysteryChests() {
  const cs = state.chestState;
  if (!cs) return;
  els.chestGrid.innerHTML = '';

  cs.rewards.forEach((reward, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chest-card';

    if (cs.openedIndex === null) {
      btn.innerHTML = `
        <div class="chest-icon">🎁</div>
        <div class="chest-label">Hộp Bí Ẩn #${idx + 1}</div>
        <span class="chest-key-hint">Phím ${idx + 1}</span>
      `;
      btn.addEventListener('click', () => pickMysteryChest(idx));
    } else {
      btn.disabled = true;
      const isWinner = cs.openedIndex === idx;
      btn.classList.add(isWinner ? 'opened-winner' : 'opened-other');
      btn.innerHTML = `
        <div class="chest-reward-icon">${reward.icon}</div>
        <div class="chest-reward-name">${escapeHtml(reward.name)}</div>
        <div class="chest-reward-desc">${escapeHtml(reward.desc)}</div>
      `;
    }

    els.chestGrid.appendChild(btn);
  });
}

function pickMysteryChest(idx) {
  const cs = state.chestState;
  const g = state.game;
  if (!cs || !g || cs.openedIndex !== null) return;

  cs.openedIndex = idx;
  const reward = cs.rewards[idx];

  if (reward.type === 'doublePoints') {
    g.powerups.doublePoints = true;
  } else if (reward.type === 'shield') {
    g.powerups.shield = true;
  } else if (reward.type === 'bonus200') {
    g.score += 200;
  } else if (reward.type === 'free5050') {
    g.score += 100;
    g.powerups.free5050 = true;
  }

  window.soundEngine.playPowerUp();
  launchConfetti(85);
  renderMysteryChests();

  els.chestResultText.textContent = `🎉 Nhận được: ${reward.icon} ${reward.name}!`;
  els.chestResultBanner.classList.remove('hidden');
  renderPresenterStage();
}

function closeMysteryChest() {
  els.mysteryChestModal.classList.add('hidden');
  state.chestState = null;
}

/* ================= VOCAB POPOVER & DRAWER ================= */
function showVocabPopover(rawSelection, rect) {
  const cleaned = String(rawSelection || '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^[.,!?;:"'()\[\]]+|[.,!?;:"'()\[\]]+$/g, '');

  if (cleaned.length < 2 || cleaned.length > 75) return;

  state.activePopoverWord = cleaned;
  els.vocabPopoverWord.textContent = cleaned;
  els.vocabPopoverMeaning.value = '';
  els.vocabPopover.classList.remove('hidden');

  const popWidth = 320;
  const left = Math.min(Math.max(12, rect.left), window.innerWidth - popWidth - 12);
  const preferTop = rect.bottom + 10;
  const top =
    preferTop + 105 > window.innerHeight ? Math.max(12, rect.top - 108) : preferTop;

  els.vocabPopover.style.left = `${left}px`;
  els.vocabPopover.style.top = `${top}px`;
}

function hideVocabPopover() {
  els.vocabPopover?.classList.add('hidden');
  state.activePopoverWord = '';
}

function triggerPrimaryStageAction() {
  const g = state.game;
  if (!g) return;
  const { q, qState } = getCurrentGameQuestion();
  const qType = getQuestionType(q);

  if (qType === 'mcq' && qState.blindActive && !qState.revealed) {
    toggleBlindForCurrent();
    return;
  }

  if (!qState.revealed) {
    if (qType === 'unscramble' || qType === 'typein') {
      evaluateCustomQuestionAnswer();
      return;
    }
    if (g.lockedIndex !== null) {
      revealAnswer();
    } else {
      showToast('Học sinh chọn đáp án A/B/C/D trước nhé!', 'info');
    }
    return;
  }

  goNextQuestion();
}

function goNextQuestion() {
  const g = state.game;
  if (!g) return;
  g.chestPending = false;
  stopQuestionTimer();
  clearAnnotationCanvas();
  window.speechSynthesis?.cancel();

  if (g.currentIndex < g.questions.length - 1) {
    g.currentIndex += 1;
    g.lockedIndex = null;
    initTimerForCurrentQuestion();
    renderPresenterStage();
    focusTypeinIfNeeded();
  } else {
    openSummaryView();
  }
}

function goPrevQuestion() {
  const g = state.game;
  if (!g || g.currentIndex === 0) return;
  stopQuestionTimer();
  clearAnnotationCanvas();
  window.speechSynthesis?.cancel();
  g.currentIndex -= 1;
  g.lockedIndex = null;
  initTimerForCurrentQuestion();
  renderPresenterStage();
  focusTypeinIfNeeded();
}

function focusTypeinIfNeeded() {
  if (!state.game) return;
  const { q, qState } = getCurrentGameQuestion();
  if (getQuestionType(q) === 'typein' && !qState.revealed) {
    setTimeout(() => els.typeinInput?.focus(), 40);
  }
}

function toggleBlindForCurrent() {
  const g = state.game;
  if (!g) return;
  const { qState } = getCurrentGameQuestion();
  if (qState.revealed) return;

  qState.blindActive = !qState.blindActive;
  if (!qState.blindActive) {
    window.soundEngine.playRevealOptions();
    initTimerForCurrentQuestion();
  } else {
    stopQuestionTimer();
  }
  renderPresenterStage();
}

function triggerFiftyFifty() {
  const g = state.game;
  if (!g) return;
  const { q, qState } = getCurrentGameQuestion();
  const qType = getQuestionType(q);
  if (qState.revealed) return;

  if (qType === 'unscramble') {
    if (qState.pickedIds.length >= qState.tokens.length) return;
    // Help by auto-placing the next 2 correct tokens in order
    qState.pickedIds = [];
    const helpCount = Math.min(2, qState.tokens.length);
    for (let i = 0; i < helpCount; i++) {
      const targetToken = qState.tokens[i];
      const matchTok = qState.bankTokens.find(
        (bt) => bt.text === targetToken && !qState.pickedIds.includes(bt.id)
      );
      if (matchTok) qState.pickedIds.push(matchTok.id);
    }
    if (g.powerups.free5050) {
      g.powerups.free5050 = false;
      g.score += 50;
    }
    window.soundEngine.playFiftyFifty();
    renderPresenterStage();
    showToast('✂️ Đã gợi ý xếp sẵn 2 cụm từ đầu tiên!', 'success');
    return;
  }

  if (qType === 'typein') {
    if (qState.hintLevel >= 2) return;
    qState.hintLevel = 2;
    if (g.powerups.free5050) {
      g.powerups.free5050 = false;
      g.score += 50;
    }
    window.soundEngine.playFiftyFifty();
    renderPresenterStage();
    return;
  }

  if (qState.blindActive || q.options.length <= 2) return;

  const wrongIndices = q.options
    .map((_, idx) => idx)
    .filter((idx) => idx !== q.correctIndex && !qState.eliminated.includes(idx));

  if (wrongIndices.length <= 1 && qState.eliminated.length > 0) return;

  // Shuffle wrong indices
  for (let i = wrongIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [wrongIndices[i], wrongIndices[j]] = [wrongIndices[j], wrongIndices[i]];
  }

  const removeCount = wrongIndices.length >= 3 ? 2 : 1;
  qState.eliminated.push(...wrongIndices.slice(0, removeCount));
  if (qState.eliminated.includes(g.lockedIndex)) {
    g.lockedIndex = null;
  }

  if (g.powerups.free5050) {
    g.powerups.free5050 = false;
    g.score += 50;
    showToast('✂️ Đã kích hoạt Free 50/50 (+50 điểm thưởng)!', 'success');
  }

  window.soundEngine.playFiftyFifty();
  renderPresenterStage();
}

function toggleFlagCurrent() {
  const g = state.game;
  if (!g) return;
  const { qState } = getCurrentGameQuestion();
  qState.flagged = !qState.flagged;
  window.soundEngine.playClick();
  renderPresenterStage();
}

/* ================= QUESTION TIMER ================= */
function initTimerForCurrentQuestion() {
  const g = state.game;
  if (!g) return;
  stopQuestionTimer();

  const { qState } = getCurrentGameQuestion();
  const baseSec = Number(g.settings.timerSeconds || 0);
  if (baseSec <= 0 || qState.revealed || qState.blindActive) {
    g.timerRemaining = 0;
    syncTimerUI();
    return;
  }

  g.timerRemaining = baseSec;
  g.timerPaused = false;
  startTimerInterval();
  syncTimerUI();
}

function startTimerInterval() {
  const g = state.game;
  if (!g) return;
  stopQuestionTimer();

  g.timerInterval = setInterval(() => {
    if (!state.game || g.timerPaused) return;
    g.timerRemaining -= 1;

    if (g.timerRemaining > 0 && g.timerRemaining <= 5) {
      window.soundEngine.playTick(true);
    }

    if (g.timerRemaining <= 0) {
      g.timerRemaining = 0;
      stopQuestionTimer();
      window.soundEngine.playTimeUp();
      showToast('⏰ Hết giờ! Gia sư có thể chốt đáp án hoặc bấm +15s.', 'warn');
    }
    syncTimerUI();
  }, 1000);
}

function stopQuestionTimer() {
  if (state.game?.timerInterval) {
    clearInterval(state.game.timerInterval);
    state.game.timerInterval = null;
  }
}

function syncTimerUI() {
  const g = state.game;
  if (!g) return;
  const baseSec = Number(g.settings.timerSeconds || 0);
  const { qState } = getCurrentGameQuestion();
  const showTimer = baseSec > 0 && !qState.revealed && !qState.blindActive;

  els.hudTimerBox.classList.toggle('hidden', !showTimer);
  els.timerBarTrack.classList.toggle('hidden', !showTimer);

  if (!showTimer) return;

  els.hudTimerText.textContent = `${g.timerRemaining}s`;
  els.hudTimerBox.classList.toggle('urgent', g.timerRemaining <= 5 && g.timerRemaining > 0);
  els.btnTimerToggle.textContent = g.timerPaused ? '▶' : '⏸';

  const maxBase = Math.max(baseSec, g.timerRemaining);
  const pct = Math.max(0, Math.min(100, (g.timerRemaining / maxBase) * 100));
  els.timerBarFill.style.width = `${pct}%`;
}

/* ================= LIVE ANNOTATION PEN ================= */
function resizeCanvases() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  els.confettiCanvas.width = w;
  els.confettiCanvas.height = h;
  els.annotationCanvas.width = w;
  els.annotationCanvas.height = h;
}

function setPenActive(active) {
  state.pen.active = !!active;
  els.annotationCanvas.classList.toggle('drawing-active', state.pen.active);
  els.penToolbar.classList.toggle('hidden', !state.pen.active);
  els.btnTogglePen.classList.toggle('active', state.pen.active);
  if (state.pen.active) {
    const hud = document.querySelector('.presenter-hud');
    const topOffset = hud ? hud.offsetHeight + 10 : 68;
    els.penToolbar.style.top = `${topOffset}px`;
  }
}

function clearAnnotationCanvas() {
  const ctx = els.annotationCanvas.getContext('2d');
  ctx.clearRect(0, 0, els.annotationCanvas.width, els.annotationCanvas.height);
}

function setupAnnotationListeners() {
  const canvas = els.annotationCanvas;
  const ctx = canvas.getContext('2d');

  const getPos = (e) => ({ x: e.clientX, y: e.clientY });

  canvas.addEventListener('pointerdown', (e) => {
    if (!state.pen.active) return;
    state.pen.drawing = true;
    canvas.setPointerCapture(e.pointerId);
    const pos = getPos(e);
    state.pen.lastX = pos.x;
    state.pen.lastY = pos.y;
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!state.pen.active || !state.pen.drawing) return;
    const pos = getPos(e);
    ctx.save();
    ctx.globalAlpha = state.pen.alpha;
    ctx.strokeStyle = state.pen.color;
    ctx.lineWidth = state.pen.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(state.pen.lastX, state.pen.lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.restore();
    state.pen.lastX = pos.x;
    state.pen.lastY = pos.y;
  });

  const endDraw = () => {
    state.pen.drawing = false;
  };
  canvas.addEventListener('pointerup', endDraw);
  canvas.addEventListener('pointercancel', endDraw);

  document.querySelectorAll('.pen-color').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pen-color').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.pen.color = btn.dataset.color;
      state.pen.width = Number(btn.dataset.width);
      state.pen.alpha = Number(btn.dataset.alpha);
    });
  });

  $('btnClearCanvas').addEventListener('click', clearAnnotationCanvas);
  $('btnDonePen').addEventListener('click', () => setPenActive(false));
}

/* ================= CONFETTI ENGINE ================= */
function launchConfetti(count = 70) {
  const colors = ['#ffd43b', '#00d27a', '#00e5ff', '#ff4d6d', '#a678ff', '#ffffff'];
  const w = els.confettiCanvas.width;
  const h = els.confettiCanvas.height;

  for (let i = 0; i < count; i++) {
    state.confetti.particles.push({
      x: w * (0.2 + Math.random() * 0.6),
      y: h * 0.35 + (Math.random() * 60 - 30),
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 12 - 4,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.25,
      life: 1,
    });
  }

  if (!state.confetti.rafId) {
    animateConfetti();
  }
}

function animateConfetti() {
  const ctx = els.confettiCanvas.getContext('2d');
  const w = els.confettiCanvas.width;
  const h = els.confettiCanvas.height;
  ctx.clearRect(0, 0, w, h);

  state.confetti.particles = state.confetti.particles.filter((p) => p.life > 0.02 && p.y < h + 40);

  for (const p of state.confetti.particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.36; // gravity
    p.vx *= 0.99;
    p.rot += p.vRot;
    p.life -= 0.011;

    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.65);
    ctx.restore();
  }

  if (state.confetti.particles.length > 0) {
    state.confetti.rafId = requestAnimationFrame(animateConfetti);
  } else {
    state.confetti.rafId = null;
    ctx.clearRect(0, 0, w, h);
  }
}

/* ================= SUMMARY VIEW ================= */
function openSummaryView() {
  const g = state.game;
  if (!g) return;
  stopQuestionTimer();
  setPenActive(false);

  const total = g.questions.length;
  const correctCount = g.states.filter((s) => s.isCorrect === true).length;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const reviewItems = g.questions.filter((_, i) => g.states[i].isCorrect !== true || g.states[i].flagged);

  if (accuracy >= 80) {
    els.summaryTrophy.textContent = '🏆';
    els.summaryHeadline.textContent = 'Xuất Sắc! Master Level!';
  } else if (accuracy >= 50) {
    els.summaryTrophy.textContent = '🌟';
    els.summaryHeadline.textContent = 'Làm Tốt Lắm!';
  } else {
    els.summaryTrophy.textContent = '💪';
    els.summaryHeadline.textContent = 'Cùng Ôn Lại Nhé!';
  }

  els.summaryDeckSubtitle.textContent = g.deckTitle;
  els.kpiAccuracy.textContent = `${accuracy}%`;
  els.kpiFraction.textContent = `${correctCount} / ${total} câu đúng`;
  els.kpiScore.textContent = `⭐ ${g.score.toLocaleString('en-US')}`;
  els.kpiBestStreak.textContent = `🔥 ${g.bestStreak}`;
  els.kpiReviewCount.textContent = `🚩 ${reviewItems.length}`;

  els.btnRetryMistakes.disabled = reviewItems.length === 0;
  els.btnRetryMistakes.textContent =
    reviewItems.length > 0
      ? `🔄 Làm lại câu sai & đánh dấu (${reviewItems.length} câu)`
      : '✅ Không có câu sai để ôn lại!';

  state.summaryFilter = 'all';
  document.querySelectorAll('.filter-chip').forEach((c) => c.classList.toggle('active', c.dataset.filter === 'all'));

  renderVocabLists();
  renderSummaryReviewList();
  switchView('summary');

  if (accuracy >= 60) {
    window.soundEngine.playVictory();
    launchConfetti(110);
  }
}

function renderSummaryReviewList() {
  const g = state.game;
  if (!g) return;
  els.summaryReviewList.innerHTML = '';

  g.questions.forEach((q, i) => {
    const s = g.states[i];
    const needsReview = s.isCorrect !== true || s.flagged;
    if (state.summaryFilter === 'review' && !needsReview) return;

    const item = document.createElement('div');
    item.className = `review-item ${s.isCorrect === false ? 'is-wrong' : ''} ${s.flagged ? 'is-flagged' : ''}`;

    const badge =
      s.isCorrect === true
        ? '<span class="review-status-badge ok">✓ Đúng</span>'
        : s.isCorrect === false
        ? '<span class="review-status-badge bad">✗ Chưa đúng</span>'
        : '<span class="review-status-badge bad">⏭ Chưa trả lời</span>';

    const flagTag = s.flagged ? ' <span class="review-status-badge" style="background:rgba(255,212,59,0.2);color:var(--gold);">🚩 Đã đánh dấu</span>' : '';

    const qType = getQuestionType(q);
    const primaryCorrect = getPrimaryCorrectAnswerText(q);
    const chosenText =
      qType === 'mcq'
        ? s.selectedIndex !== null
          ? `${OPTION_LETTERS[s.selectedIndex]}. ${stripFormattingForSpeech(q.options[s.selectedIndex])}`
          : 'Chưa chọn'
        : s.studentText || 'Chưa trả lời';
    const correctText =
      qType === 'mcq'
        ? `${OPTION_LETTERS[q.correctIndex]}. ${primaryCorrect}`
        : primaryCorrect;

    item.innerHTML = `
      <div class="review-item-top">
        <div><strong>Câu ${i + 1}</strong> <span style="color:var(--cyan);font-size:0.84rem;">[${escapeHtml(q.category || 'English')}]</span></div>
        <div>${badge}${flagTag}</div>
      </div>
      <div class="review-q-text">${formatRichEnglishText(q.prompt, primaryCorrect)}</div>
      <div class="review-answers-row">
        <span>Học sinh chọn: <strong style="color:${s.isCorrect ? 'var(--success)' : '#ff8ca0'}">${escapeHtml(chosenText)}</strong></span>
        <span>Đáp án đúng: <strong style="color:var(--success)">${escapeHtml(correctText)}</strong></span>
        <button type="button" class="btn-speak-mini" data-speak-idx="${i}">🔊 Nghe câu</button>
      </div>
      ${q.explanation ? `<div class="review-explain">💡 ${formatRichEnglishText(q.explanation)}</div>` : ''}
    `;

    item.querySelector(`[data-speak-idx="${i}"]`).addEventListener('click', () => {
      const speechStr =
        qType === 'unscramble'
          ? primaryCorrect
          : stripFormattingForSpeech(q.prompt, primaryCorrect);
      speakEnglish(speechStr, g.accent);
    });

    els.summaryReviewList.appendChild(item);
  });

  if (els.summaryReviewList.children.length === 0) {
    els.summaryReviewList.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:18px;">Tuyệt vời! Không có câu nào sai hoặc cần đánh dấu.</p>';
  }
}

function copyLessonReport() {
  const g = state.game;
  if (!g) return;
  const total = g.questions.length;
  const correctCount = g.states.filter((s) => s.isCorrect === true).length;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  const reviewLines = [];
  g.questions.forEach((q, i) => {
    const s = g.states[i];
    if (s.isCorrect !== true || s.flagged) {
      const qClean = stripFormattingForSpeech(q.prompt);
      const qType = getQuestionType(q);
      const primaryCorrect = getPrimaryCorrectAnswerText(q);
      const ansClean =
        qType === 'mcq' ? `${OPTION_LETTERS[q.correctIndex]}. ${primaryCorrect}` : primaryCorrect;
      reviewLines.push(
        `- Câu ${i + 1}: ${qClean}\n  -> Đáp án đúng: ${ansClean}${q.explanation ? `\n  -> Ghi chú: ${q.explanation}` : ''}`
      );
    }
  });

  const vocabLines = state.vocabList.map(
    (v, i) => `${i + 1}. ${v.word}${v.meaning ? ` — ${v.meaning}` : ''}`
  );

  const report = [
    `📊 BÁO CÁO KẾT QUẢ LUYỆN TẬP TIẾNG ANH`,
    `📚 Chủ đề: ${g.deckTitle}`,
    `✅ Kết quả: ${correctCount}/${total} câu đúng (${accuracy}%)`,
    `🔥 Chuỗi đúng cao nhất: ${g.bestStreak} câu liên tiếp`,
    reviewLines.length > 0
      ? `\n📌 CÁC CÂU CẦN ÔN LẠI (${reviewLines.length} câu):\n${reviewLines.join('\n')}`
      : `\n🌟 Xuất sắc! Học sinh làm đúng toàn bộ các câu hỏi trong buổi học!`,
    vocabLines.length > 0
      ? `\n📒 TỪ VỰNG MỚI CẦN NHỚ (${vocabLines.length} từ):\n${vocabLines.join('\n')}`
      : '',
  ]
    .filter(Boolean)
    .join('\n');

  navigator.clipboard.writeText(report).then(
    () => showToast('📋 Đã copy báo cáo! Dán ngay vào Zalo / Messenger nhé.', 'success'),
    () => showToast('Không thể truy cập clipboard tự động.', 'warn')
  );
}

/* ================= EVENT LISTENERS ================= */
function bindEvents() {
  // Editor Header & Sidebar
  els.deckTitleInput.addEventListener('input', (e) => {
    const deck = getActiveDeck();
    if (!deck) return;
    deck.title = e.target.value;
    saveDecks();
    // Update sidebar label without full re-render losing focus
    const activeItem = els.deckList.querySelector('.deck-item.active .deck-item-title');
    if (activeItem) activeItem.textContent = deck.title || 'Bộ đề chưa đặt tên';
  });

  els.settingRevealMode.addEventListener('change', (e) => {
    const deck = getActiveDeck();
    if (deck) {
      deck.settings.revealMode = e.target.value;
      saveDecks();
    }
  });

  els.settingBlindDefault.addEventListener('change', (e) => {
    const deck = getActiveDeck();
    if (deck) {
      deck.settings.blindDefault = e.target.checked;
      saveDecks();
    }
  });

  els.settingAccent.addEventListener('change', (e) => {
    const deck = getActiveDeck();
    if (deck) {
      deck.settings.accent = e.target.value;
      saveDecks();
      renderEditor();
    }
  });

  els.settingTimerSeconds.addEventListener('change', (e) => {
    const deck = getActiveDeck();
    if (deck) {
      deck.settings.timerSeconds = Number(e.target.value);
      saveDecks();
    }
  });

  $('btnNewDeck').addEventListener('click', () => {
    const newDeck = {
      id: uid('deck'),
      title: `Bộ đề Tiếng Anh #${state.decks.length + 1}`,
      settings: { revealMode: 'two-step', blindDefault: false, accent: 'en-US', timerSeconds: 0 },
      questions: [
        {
          id: uid('q'),
          category: 'Grammar',
          prompt: '',
          image: '',
          options: ['', '', '', ''],
          correctIndex: 0,
          explanation: '',
        },
      ],
    };
    state.decks.unshift(newDeck);
    state.activeDeckId = newDeck.id;
    saveDecks();
    renderEditor();
    els.deckTitleInput.focus();
    els.deckTitleInput.select();
  });

  $('btnDuplicateDeck').addEventListener('click', () => {
    const deck = getActiveDeck();
    if (!deck) return;
    const copy = JSON.parse(JSON.stringify(deck));
    copy.id = uid('deck');
    copy.title = `${deck.title} (Bản sao)`;
    copy.questions.forEach((q) => (q.id = uid('q')));
    state.decks.unshift(copy);
    state.activeDeckId = copy.id;
    saveDecks();
    renderEditor();
    showToast('📋 Đã nhân bản bộ đề!', 'success');
  });

  $('btnDeleteDeck').addEventListener('click', () => {
    const deck = getActiveDeck();
    if (!deck) return;
    if (state.decks.length <= 1) {
      showToast('Cần giữ lại ít nhất 1 bộ đề.', 'warn');
      return;
    }
    if (!confirm(`Xóa bộ đề "${deck.title}"?`)) return;
    state.decks = state.decks.filter((d) => d.id !== deck.id);
    state.activeDeckId = state.decks[0].id;
    saveDecks();
    renderEditor();
  });

  $('btnRestoreSamples').addEventListener('click', () => {
    const samples = getDefaultDecks();
    samples.forEach((s) => {
      s.id = uid('deck');
      state.decks.push(s);
    });
    state.activeDeckId = samples[0].id;
    saveDecks();
    renderEditor();
    showToast('✨ Đã thêm lại 2 bộ đề mẫu Tiếng Anh!', 'success');
  });

  $('btnAddQuestionTop').addEventListener('click', () => addNewQuestion(true));
  $('btnAddQuestionBottom').addEventListener('click', () => addNewQuestion(true));

  $('btnStartGameTop').addEventListener('click', () => startGame());
  $('btnStartGameInline').addEventListener('click', () => startGame());

  // Backup All Decks button inside LocalStorage Warning Banner
  $('btnBackupAllDecks').addEventListener('click', () => {
    const dateTag = new Date().toISOString().slice(0, 10);
    const payload = {
      exportedAt: new Date().toISOString(),
      decks: state.decks,
      vocabList: state.vocabList,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quizstage-backup-${dateTag}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`💾 Đã sao lưu ${state.decks.length} bộ đề & ${state.vocabList.length} từ vựng!`, 'success');
  });

  // Export / Import JSON
  $('btnExportJson').addEventListener('click', () => {
    const deck = getActiveDeck();
    if (!deck) return;
    const blob = new Blob([JSON.stringify(deck, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(deck.title || 'quizstage-deck').replace(/[^a-zA-Z0-9\u00C0-\u1EF9\-_ ]+/g, '').trim()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('📤 Đã xuất file JSON!', 'success');
  });

  els.importJsonInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        const importedDecks = Array.isArray(data)
          ? data
          : Array.isArray(data?.decks)
          ? data.decks
          : [data];
        let count = 0;
        importedDecks.forEach((d) => {
          if (d && Array.isArray(d.questions)) {
            d.id = uid('deck');
            d.settings = d.settings || { revealMode: 'two-step', blindDefault: false, accent: 'en-US', timerSeconds: 0 };
            state.decks.unshift(d);
            state.activeDeckId = d.id;
            count++;
          }
        });
        if (Array.isArray(data?.vocabList)) {
          data.vocabList.forEach((v) => {
            if (v?.word && !state.vocabList.some((x) => x.word.toLowerCase() === v.word.toLowerCase())) {
              state.vocabList.push({ id: uid('voc'), word: v.word, meaning: v.meaning || '' });
            }
          });
          saveVocabList();
          renderVocabLists();
        }
        if (count > 0) {
          saveDecks();
          renderEditor();
          showToast(`📥 Đã nhập thành công ${count} bộ đề!`, 'success');
        } else {
          showToast('File JSON không đúng định dạng QuizStage.', 'warn');
        }
      } catch {
        showToast('Lỗi đọc file JSON!', 'warn');
      }
      els.importJsonInput.value = '';
    };
    reader.readAsText(file);
  });

  // Smart Paste & AI Modal
  $('btnOpenSmartPaste').addEventListener('click', () => openSmartPasteModal('paste'));
  $('btnSmartPasteInline').addEventListener('click', () => openSmartPasteModal('paste'));
  $('btnCloseSmartModal').addEventListener('click', () => els.smartPasteModal.classList.add('hidden'));
  els.smartPasteModal.addEventListener('click', (e) => {
    if (e.target === els.smartPasteModal) els.smartPasteModal.classList.add('hidden');
  });

  document.querySelectorAll('.modal-tab').forEach((tab) => {
    tab.addEventListener('click', () => openSmartPasteModal(tab.dataset.tab));
  });

  els.smartPasteTextarea.addEventListener('input', updateSmartPasteCount);

  $('btnFillSamplePaste').addEventListener('click', () => {
    els.smartPasteTextarea.value = `1. [Grammar] She _____ in Ho Chi Minh City since 2020.
A. lives
*B. has lived
C. lived
D. is living
Giải thích: Có "since 2020" -> dùng thì Hiện tại hoàn thành (S + has/have + V3/ed).

2. [Pronunciation] Choose the word whose __underlined__ part differs in pronunciation:
A. book__s__
B. cat__s__
*C. bag__s__
D. stop__s__
Giải thích: "bags" /bæɡz/ có tận cùng là /ɡ/ (hữu thanh) nên -s đọc là /z/; các từ còn lại đọc là /s/.

3. [Phrasal Verbs] Could you please _____ the music? I'm trying to study for my IELTS test.
A. turn up
B. put on
*C. turn down
D. take off
Giải thích: turn down = vặn nhỏ âm lượng xuống.`;
    updateSmartPasteCount();
  });

  $('btnApplySmartPaste').addEventListener('click', () => {
    const parsed = parseSmartPasteText(els.smartPasteTextarea.value);
    if (parsed.length === 0) {
      showToast('Chưa nhận diện được câu hỏi hợp lệ. Hãy kiểm tra định dạng A. B. C. D.', 'warn');
      return;
    }

    const mode = els.smartImportTarget.value;
    if (mode === 'new') {
      const newDeck = {
        id: uid('deck'),
        title: `Bộ đề Smart Paste (${parsed.length} câu)`,
        settings: { revealMode: 'two-step', blindDefault: false, accent: 'en-US', timerSeconds: 0 },
        questions: parsed,
      };
      state.decks.unshift(newDeck);
      state.activeDeckId = newDeck.id;
    } else {
      const deck = getActiveDeck();
      // If deck only has 1 empty starter question, replace it
      if (
        deck.questions.length === 1 &&
        !deck.questions[0].prompt.trim() &&
        deck.questions[0].options.every((o) => !o.trim())
      ) {
        deck.questions = parsed;
      } else {
        deck.questions.push(...parsed);
      }
    }

    saveDecks();
    renderEditor();
    els.smartPasteModal.classList.add('hidden');
    els.smartPasteTextarea.value = '';
    showToast(`⚡ Đã nhập thành công ${parsed.length} câu hỏi!`, 'success');
  });

  [els.aiTopicInput, els.aiLevelSelect, els.aiCountSelect].forEach((el) => {
    el.addEventListener('input', updateAiPromptBox);
    el.addEventListener('change', updateAiPromptBox);
  });

  $('btnCopyAiPrompt').addEventListener('click', () => {
    navigator.clipboard.writeText(els.aiGeneratedPrompt.value).then(
      () => showToast('📋 Đã copy AI Prompt! Dán vào ChatGPT hoặc Gemini ngay.', 'success'),
      () => showToast('Hãy bôi đen và copy thủ công nhé.', 'warn')
    );
  });

  // Presenter HUD & Stage Controls
  $('btnExitPresenter').addEventListener('click', () => {
    stopQuestionTimer();
    window.soundEngine.setBgm(false);
    window.speechSynthesis?.cancel();
    setPenActive(false);
    hideVocabPopover();
    els.vocabDrawer.classList.add('hidden');
    closeMysteryChest();
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    state.game = null;
    switchView('editor');
    renderEditor();
  });

  // Vocab Pocket Popover, Drawer & Save Answer
  $('btnSaveAnswerVocab').addEventListener('click', () => {
    if (!state.game) return;
    const { q } = getCurrentGameQuestion();
    const ans = getPrimaryCorrectAnswerText(q);
    addVocabItem(ans, '');
  });

  // Unscramble & Type-in Stage Controls
  $('btnUnscrambleUndo').addEventListener('click', () => {
    if (!state.game) return;
    const { qState } = getCurrentGameQuestion();
    if (qState.revealed || qState.pickedIds.length === 0) return;
    qState.pickedIds.pop();
    window.soundEngine.playClick();
    renderPresenterStage();
  });

  $('btnUnscrambleReset').addEventListener('click', () => {
    if (!state.game) return;
    const { qState } = getCurrentGameQuestion();
    if (qState.revealed || qState.pickedIds.length === 0) return;
    qState.pickedIds = [];
    window.soundEngine.playClick();
    renderPresenterStage();
  });

  els.typeinInput.addEventListener('input', (e) => {
    if (!state.game) return;
    const { qState } = getCurrentGameQuestion();
    qState.typedValue = e.target.value;
  });

  els.typeinInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && state.game) {
      e.preventDefault();
      triggerPrimaryStageAction();
    }
  });

  $('btnTypeinHint').addEventListener('click', () => {
    if (!state.game) return;
    const { qState } = getCurrentGameQuestion();
    if (qState.revealed) return;
    qState.hintLevel = qState.hintLevel >= 2 ? 2 : qState.hintLevel + 1;
    window.soundEngine.playClick();
    renderPresenterStage();
    els.typeinInput.focus();
  });

  els.btnToggleVocabDrawer.addEventListener('click', () => {
    els.vocabDrawer.classList.toggle('hidden');
    renderVocabLists();
  });

  $('btnCloseVocabDrawer').addEventListener('click', () => {
    els.vocabDrawer.classList.add('hidden');
  });

  $('btnAddManualVocab').addEventListener('click', () => {
    if (addVocabItem(els.vocabManualWord.value, els.vocabManualMeaning.value)) {
      els.vocabManualWord.value = '';
      els.vocabManualMeaning.value = '';
      els.vocabManualWord.focus();
    }
  });

  els.vocabManualMeaning.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      $('btnAddManualVocab').click();
    }
  });

  $('btnCopyVocabOnly').addEventListener('click', copyVocabListToClipboard);
  $('btnSummaryCopyVocab').addEventListener('click', copyVocabListToClipboard);

  $('btnClearVocabList').addEventListener('click', () => {
    if (state.vocabList.length === 0) return;
    if (!confirm('Xóa toàn bộ từ vựng trong Giỏ buổi học?')) return;
    state.vocabList = [];
    saveVocabList();
    renderVocabLists();
  });

  $('btnSpeakVocabPopover').addEventListener('click', () => {
    if (!state.activePopoverWord) return;
    const accent = state.game?.accent || 'en-US';
    speakEnglish(state.activePopoverWord, accent);
  });

  $('btnSaveVocabPopover').addEventListener('click', () => {
    if (addVocabItem(state.activePopoverWord, els.vocabPopoverMeaning.value)) {
      hideVocabPopover();
      window.getSelection()?.removeAllRanges();
    }
  });

  els.vocabPopoverMeaning.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      $('btnSaveVocabPopover').click();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      hideVocabPopover();
    }
  });

  $('btnCloseVocabPopover').addEventListener('click', hideVocabPopover);

  const handleStageTextSelection = () => {
    if (!els.presenterView.classList.contains('active') || state.pen.active) return;
    setTimeout(() => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
      const text = sel.toString().trim();
      if (text.length < 2 || text.length > 75) return;
      const anchorNode = sel.anchorNode;
      if (
        !els.presenterQuestionText.contains(anchorNode) &&
        !els.explanationBody.contains(anchorNode)
      ) {
        return;
      }
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      if (rect && (rect.width > 0 || rect.height > 0)) {
        showVocabPopover(text, rect);
      }
    }, 15);
  };

  els.presenterQuestionText.addEventListener('mouseup', handleStageTextSelection);
  els.presenterQuestionText.addEventListener('dblclick', handleStageTextSelection);
  els.explanationBody.addEventListener('mouseup', handleStageTextSelection);
  els.explanationBody.addEventListener('dblclick', handleStageTextSelection);

  document.addEventListener('mousedown', (e) => {
    if (
      !els.vocabPopover.classList.contains('hidden') &&
      !els.vocabPopover.contains(e.target) &&
      !els.presenterQuestionText.contains(e.target) &&
      !els.explanationBody.contains(e.target)
    ) {
      hideVocabPopover();
    }
  });

  $('btnCloseChestModal').addEventListener('click', closeMysteryChest);

  $('btnReadQuestion').addEventListener('click', () => {
    if (!state.game) return;
    const { q, qState } = getCurrentGameQuestion();
    const qType = getQuestionType(q);
    if (qType === 'unscramble') {
      const textToRead = qState.revealed
        ? getPrimaryCorrectAnswerText(q)
        : stripFormattingForSpeech(q.prompt);
      speakEnglish(textToRead, state.game.accent);
      return;
    }
    const filled = qState.revealed ? getPrimaryCorrectAnswerText(q) : null;
    speakEnglish(stripFormattingForSpeech(q.prompt, filled), state.game.accent);
  });

  $('btnCardSpeak').addEventListener('click', () => {
    if (!state.game) return;
    $('btnReadQuestion').click();
  });

  $('btnSpeakAnswer').addEventListener('click', () => {
    if (!state.game) return;
    const { q } = getCurrentGameQuestion();
    speakEnglish(getPrimaryCorrectAnswerText(q), state.game.accent);
  });

  els.btnAccentToggle.addEventListener('click', () => {
    if (!state.game) return;
    state.game.accent = state.game.accent === 'en-US' ? 'en-GB' : 'en-US';
    renderPresenterStage();
    showToast(`🗣️ Đã đổi giọng đọc: ${state.game.accent === 'en-GB' ? 'UK English 🇬🇧' : 'US English 🇺🇸'}`);
  });

  els.btnToggleBlind.addEventListener('click', toggleBlindForCurrent);
  $('btnRevealOptionsNow').addEventListener('click', toggleBlindForCurrent);
  els.btnFiftyFifty.addEventListener('click', triggerFiftyFifty);
  els.btnTogglePen.addEventListener('click', () => setPenActive(!state.pen.active));
  els.btnFlagQuestion.addEventListener('click', toggleFlagCurrent);

  els.btnToggleMute.addEventListener('click', () => {
    window.soundEngine.toggleMute();
    renderPresenterStage();
  });

  els.btnToggleBgm.addEventListener('click', () => {
    const active = window.soundEngine.toggleBgm();
    if (active && window.soundEngine.muted) {
      window.soundEngine.setMuted(false);
    }
    renderPresenterStage();
  });

  $('btnFullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  els.btnTimerToggle.addEventListener('click', () => {
    if (!state.game) return;
    state.game.timerPaused = !state.game.timerPaused;
    if (!state.game.timerPaused && state.game.timerRemaining > 0 && !state.game.timerInterval) {
      startTimerInterval();
    }
    syncTimerUI();
  });

  $('btnTimerAdd').addEventListener('click', () => {
    if (!state.game) return;
    state.game.timerRemaining += 15;
    if (!state.game.timerInterval && !state.game.timerPaused) {
      startTimerInterval();
    }
    syncTimerUI();
  });

  els.btnPrevQuestion.addEventListener('click', goPrevQuestion);
  els.btnNextQuestion.addEventListener('click', goNextQuestion);
  els.btnPrimaryStageAction.addEventListener('click', triggerPrimaryStageAction);

  // Summary Controls
  $('btnRetryMistakes').addEventListener('click', () => {
    const g = state.game;
    if (!g) return;
    const subset = g.questions.filter((_, i) => g.states[i].isCorrect !== true || g.states[i].flagged);
    if (subset.length > 0) {
      startGame(subset, true);
    }
  });

  $('btnReplayAll').addEventListener('click', () => {
    startGame(null, false);
  });

  $('btnCopyReport').addEventListener('click', copyLessonReport);

  $('btnBackToEditor').addEventListener('click', () => {
    window.soundEngine.setBgm(false);
    state.game = null;
    switchView('editor');
    renderEditor();
  });

  document.querySelectorAll('.filter-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      state.summaryFilter = chip.dataset.filter;
      document.querySelectorAll('.filter-chip').forEach((c) => c.classList.toggle('active', c === chip));
      renderSummaryReviewList();
    });
  });

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // Editor shortcut: Ctrl+Enter adds new question
    if (els.editorView.classList.contains('active') && els.smartPasteModal.classList.contains('hidden')) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        addNewQuestion(true);
      }
      return;
    }

    // Close modal on Escape
    if (!els.smartPasteModal.classList.contains('hidden')) {
      if (e.key === 'Escape') els.smartPasteModal.classList.add('hidden');
      return;
    }

    // Presenter shortcuts
    if (els.presenterView.classList.contains('active') && state.game) {
      // Mystery Chest Modal intercepts 1/2/3/Space/Enter/Escape
      if (!els.mysteryChestModal.classList.contains('hidden') && state.chestState) {
        if (['1', '2', '3'].includes(e.key) && state.chestState.openedIndex === null) {
          e.preventDefault();
          pickMysteryChest(Number(e.key) - 1);
          return;
        }
        if ((e.code === 'Space' || e.key === 'Enter' || e.key === 'Escape') && state.chestState.openedIndex !== null) {
          e.preventDefault();
          closeMysteryChest();
          return;
        }
        return;
      }

      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        return;
      }

      const key = e.key.toLowerCase();
      const { q, qState } = getCurrentGameQuestion();
      const qType = getQuestionType(q);

      if (qType === 'unscramble' && !qState.revealed) {
        if (/^[1-9]$/.test(key)) {
          const bankIdx = Number(key) - 1;
          const tok = qState.bankTokens[bankIdx];
          if (tok && !qState.pickedIds.includes(tok.id)) {
            e.preventDefault();
            qState.pickedIds.push(tok.id);
            window.soundEngine.playClick();
            renderPresenterStage();
          }
          return;
        }
        if (e.key === 'Backspace' && qState.pickedIds.length > 0) {
          e.preventDefault();
          qState.pickedIds.pop();
          window.soundEngine.playClick();
          renderPresenterStage();
          return;
        }
      }

      if (qType === 'mcq' && ['1', '2', '3', '4'].includes(key)) {
        const idx = Number(key) - 1;
        if (idx < q.options.length) {
          e.preventDefault();
          handleOptionSelect(idx);
        }
        return;
      }

      if (qType === 'mcq' && ['a', 'b', 'c', 'd'].includes(key) && !e.ctrlKey && !e.metaKey) {
        const idx = ['a', 'b', 'c', 'd'].indexOf(key);
        if (idx < q.options.length) {
          e.preventDefault();
          handleOptionSelect(idx);
        }
        return;
      }

      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        triggerPrimaryStageAction();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNextQuestion();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrevQuestion();
      } else if (key === 'h') {
        e.preventDefault();
        toggleBlindForCurrent();
      } else if (key === '5') {
        e.preventDefault();
        triggerFiftyFifty();
      } else if (key === 'r') {
        e.preventDefault();
        $('btnReadQuestion').click();
      } else if (key === 'p') {
        e.preventDefault();
        setPenActive(!state.pen.active);
      } else if (key === 'b') {
        e.preventDefault();
        toggleFlagCurrent();
      } else if (key === 'v') {
        e.preventDefault();
        els.btnToggleVocabDrawer.click();
      } else if (key === 'm') {
        e.preventDefault();
        els.btnToggleBgm.click();
      } else if (key === 'f') {
        e.preventDefault();
        $('btnFullscreen').click();
      } else if (e.key === 'Escape') {
        if (!els.vocabPopover.classList.contains('hidden')) {
          hideVocabPopover();
        } else if (!els.vocabDrawer.classList.contains('hidden')) {
          els.vocabDrawer.classList.add('hidden');
        } else if (state.pen.active) {
          setPenActive(false);
        } else {
          $('btnExitPresenter').click();
        }
      }
    }
  });

  window.addEventListener('resize', () => {
    if (els.presenterView.classList.contains('active')) {
      resizeCanvases();
    }
  });
}

/* ================= INIT ================= */
function init() {
  loadDecks();
  loadVocabList();
  setupAnnotationListeners();
  bindEvents();
  renderEditor();
  renderVocabLists();
  // Pre-warm speech voices list
  window.speechSynthesis?.getVoices?.();
}

init();
