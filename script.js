/* ==========================================================================
   typecraft — DOM-Based Character Span Engine, RNG Passage Pool & Telemetry
   ========================================================================== */

(() => {
  "use strict";

  // --------------------------------------------------------------------------
  // 1. Curated Corpus (Large Multi-Topic Sentence Pool for RNG Selection)
  // --------------------------------------------------------------------------
  const PASSAGE_CORPUS = {
    standard: [
      { topic: "craft", text: "Good craftsmanship hides the hours of patient revision behind a surface that feels effortless at first glance." },
      { topic: "observation", text: "Morning light spilled across the wooden desk, catching tiny motes of dust drifting lazily above a cold cup of tea." },
      { topic: "psychology", text: "Consistent daily habits quietly compound over months until skills that once felt impossible become second nature." },
      { topic: "architecture", text: "Old stone bridges endure not because they resist the river, but because their arches turn weight into quiet strength." },
      { topic: "literature", text: "A sharp sentence can carry an entire room inside twenty words, leaving the reader with the scent of rain on warm pavement." },
      { topic: "travel", text: "Night trains have their own rhythm, rattling softly through sleeping towns while strangers share thermos coffee by the window." },
      { topic: "music", text: "Every great improvisation relies on years of scales practiced slowly in empty rooms long before the stage lights turn on." },
      { topic: "nature", text: "Before the storm arrived, the wind dropped completely and every leaf in the orchard hung still as painted glass." },
      { topic: "history", text: "Maps drawn by coastal sailors often left the interior blank, filled only with rumors of high plateaus and salt lakes." },
      { topic: "design", text: "Clarity rarely comes from adding another decorative layer; most of the time it appears the moment you remove what distracts." },
      { topic: "cinema", text: "A lingering silence between two characters often tells the audience far more than an entire page of clever dialogue." },
      { topic: "cooking", text: "Toasting whole spices in a dry pan for thirty seconds wakes up aromas that preground jars lost months ago." },
      { topic: "philosophy", text: "Attention is the scarcest currency we own, yet we spend it casually on whichever bell rings loudest in the hallway." },
      { topic: "craft", text: "Mechanical keyboards turn an ordinary afternoon of writing into a crisp, tactile conversation between thought and motion." },
      { topic: "astronomy", text: "Looking up on a clear desert night means staring directly into light that left distant stars before cities ever existed." },
      { topic: "cities", text: "Late at night, the avenue smells faintly of damp concrete, warm bread from the corner bakery, and cooling engine blocks." },
      { topic: "learning", text: "Making small mistakes quickly teaches your hands more in ten minutes than passively reading advice for an entire week." },
      { topic: "ocean", text: "Far past the harbor breakwater, deep swells roll without breaking, carrying energy from storms a thousand miles away." },
      { topic: "art", text: "Sketchbooks should never look pristine; smudges, crossed-out margins, and crooked lines are proof of genuine curiosity." },
      { topic: "time", text: "Weeks vanish strangely fast when every day follows the same routine, yet a single unfamiliar weekend stretches like a summer." },
      { topic: "weather", text: "Autumn arrived overnight, trading humid afternoons for crisp blue skies and shadows that grew twice as long by four." },
      { topic: "reading", text: "Re-reading a favorite novel ten years later feels like meeting an old friend and realizing how much both of you have changed." },
      { topic: "focus", text: "Deep concentration feels slow for the first five minutes, right until the surrounding noise fades behind a quiet curtain." },
      { topic: "workshop", text: "Sharp chisels and clean workbenches are less about tidiness and more about respecting the grain of the timber." },
      { topic: "stories", text: "Every family keeps a handful of legends that grow slightly taller each winter when told around the kitchen table." },
      { topic: "sound", text: "Rain drumming against a tin roof creates a steady wall of white noise that makes even busy thoughts slow down." },
      { topic: "sports", text: "Endurance athletes rarely win in the final sprint; they win by staying calm when everyone else starts to panic." },
      { topic: "gardens", text: "Planting a fruit tree is an optimistic contract with the future, paid out in shade and blossoms years down the road." },
      { topic: "language", text: "Translating poetry is like carrying water in cupped hands: you inevitably lose a few drops while saving the spirit." },
      { topic: "winter", text: "Fresh snow muffles traffic and footsteps alike, turning a crowded neighborhood into an unexpectedly quiet amphitheater." }
    ],
    technical: [
      { topic: "systems", text: "Measure latency at the ninety-ninth percentile before optimizing averages, because tail spikes are what users actually feel." },
      { topic: "frontend", text: "Keeping DOM updates batched inside a single animation frame prevents layout thrashing and keeps scrolling buttery smooth." },
      { topic: "databases", text: "A well-chosen composite index can turn a sluggish full table scan into a sub-millisecond lookup under heavy production load." },
      { topic: "algorithms", text: "Binary search looks trivial on a whiteboard until an off-by-one boundary turns an edge case into an infinite loop." },
      { topic: "security", text: "Never trust client-side validation alone; treat every incoming request payload as untrusted input at the API boundary." },
      { topic: "networking", text: "Packet loss forces TCP congestion control to back off sharply, turning a fast link sluggish long before bandwidth saturates." },
      { topic: "architecture", text: "Simple modular monoliths are far easier to refactor than premature microservices tangled across brittle network boundaries." },
      { topic: "debugging", text: "Writing down a clear hypothesis before opening the debugger saves hours of aimless print statements and guesswork." },
      { topic: "compilers", text: "Lexers turn raw character streams into tokens, while parsers verify structure and build an abstract syntax tree." },
      { topic: "concurrency", text: "Race conditions hide reliably during local tests and only surface when two requests collide at three in the morning." },
      { topic: "tooling", text: "Fast automated tests act like guardrails on a mountain road, letting teams refactor legacy modules with real confidence." },
      { topic: "graphics", text: "Fragment shaders evaluate color math independently for millions of pixels in parallel on every single display refresh." },
      { topic: "caching", text: "There are only two hard problems in computer science: cache invalidation, naming things, and off-by-one indexing errors." },
      { topic: "linux", text: "Piping small single-purpose command line tools together lets you inspect gigabytes of logs without writing a script." },
      { topic: "physics", text: "Signal propagation inside copper traces travels near two-thirds the speed of light, making board geometry critical." },
      { topic: "git", text: "Atomic commits with descriptive messages turn version history into living documentation when tracking down regressions." },
      { topic: "memory", text: "Cache locality often matters more than big-O complexity when iterating sequentially over contiguous arrays in memory." },
      { topic: "apis", text: "Idempotent endpoints let clients retry timed-out requests safely without duplicating charges or corrupting state." },
      { topic: "telemetry", text: "Structured logs paired with trace identifiers connect frontend errors directly to the exact backend span that failed." },
      { topic: "cryptography", text: "Cryptographic hashes map arbitrary inputs to fixed digests where flipping a single bit changes half the output bits." },
      { topic: "storage", text: "Append-only write-ahead logs guarantee crash recovery before data pages are flushed lazily to non-volatile blocks." },
      { topic: "ui-eng", text: "Accessible keyboard navigation and visible focus rings make web applications faster for power users and screen readers alike." }
    ],
    lowercase: [
      { topic: "flow", text: "steady breathing and relaxed wrists keep your fingers light across the home row as words begin to flow naturally" },
      { topic: "flow", text: "focus on clean accuracy first because speed arrives quietly once your hands stop hesitating between common letter pairs" },
      { topic: "flow", text: "small rhythms matter more than frantic bursts when building endurance across longer sixty and one hundred twenty second runs" },
      { topic: "flow", text: "rain tapped softly on the glass while the cursor blinked patiently at the start of another clean blank line" },
      { topic: "flow", text: "quiet mornings offer the best space to think clearly before messages and meetings scatter your attention" },
      { topic: "flow", text: "warm amber lamps cast gentle shadows across worn notebooks stacked neatly beside a simple mechanical keyboard" },
      { topic: "flow", text: "practice rarely looks dramatic from the outside yet every clean keystroke sharpens timing and muscle memory" },
      { topic: "flow", text: "let each word finish cleanly before glancing ahead to the next phrase waiting along the line" },
      { topic: "flow", text: "calm posture keeps your shoulders loose so long writing sessions feel effortless instead of tense" },
      { topic: "flow", text: "clouds drifted slowly past the ridge turning the whole valley silver for a few quiet minutes before dusk" },
      { topic: "flow", text: "every craft rewards patience whether you are shaping timber tuning strings or finding flow on forty keys" },
      { topic: "flow", text: "fresh coffee steam curled upward in the cool air as the first sparrows started singing outside the window" },
      { topic: "flow", text: "simple tools without clutter leave room for steady thought and uninterrupted momentum from start to finish" },
      { topic: "flow", text: "smooth transitions between vowels and consonants come from reading whole syllables rather than isolated letters" },
      { topic: "flow", text: "distant thunder rolled beyond the hills long after the afternoon heat broke into a cool evening breeze" },
      { topic: "flow", text: "good habits stick best when the workspace feels inviting and zero friction stands between you and starting" },
      { topic: "flow", text: "stars appeared one by one above the pine trees as campfire embers settled into a steady orange glow" },
      { topic: "flow", text: "keep your eyes one word ahead of your fingertips and trust muscle memory to handle familiar shapes" },
      { topic: "flow", text: "midnight streets feel strangely peaceful with yellow streetlights reflecting softly across puddles after rain" },
      { topic: "flow", text: "consistent rhythm beats raw haste every single time you step up to measure your real typing pace" }
    ]
  };

  // --------------------------------------------------------------------------
  // 2. Application State & Preferences
  // --------------------------------------------------------------------------
  const STORAGE_KEY = "typecraft_prefs_v1";
  const PB_STORAGE_KEY = "typecraft_pbs_v1";

  const state = {
    theme: "carbon",
    duration: 30,
    mode: "standard",
    caret: "line",
    size: "md",
    sound: false,

    // Runtime test state
    status: "idle", // 'idle' | 'running' | 'finished'
    timeLeft: 30,
    timerId: null,
    startTime: null,

    // DOM span engine tracking
    charNodes: [],
    charTargets: [],
    typedHistory: [], // per-index: null | 'correct' | 'incorrect'
    cursorIndex: 0,
    totalKeystrokes: 0,
    correctKeystrokes: 0,
    mistakeCount: 0,
    correctedCount: 0,
    currentStreak: 0,
    bestStreak: 0,
    wpmSamples: [], // sampled every second for chart & consistency

    // RNG non-repeating shuffle queues per mode
    rngQueues: {
      standard: [],
      technical: [],
      lowercase: []
    },
    currentTopics: []
  };

  // --------------------------------------------------------------------------
  // 3. DOM References
  // --------------------------------------------------------------------------
  const el = {
    root: document.documentElement,
    appShell: document.getElementById("appShell"),
    brandHome: document.getElementById("brandHome"),
    typingStage: document.getElementById("typingStage"),
    hiddenInput: document.getElementById("hiddenInput"),
    blurOverlay: document.getElementById("blurOverlay"),
    passageViewport: document.getElementById("passageViewport"),
    passageContent: document.getElementById("passageContent"),
    resultsPanel: document.getElementById("resultsPanel"),
    restartBtn: document.getElementById("restartBtn"),
    nextPassageBtn: document.getElementById("nextPassageBtn"),
    soundToggle: document.getElementById("soundToggle"),
    capsLockWarning: document.getElementById("capsLockWarning"),
    sentenceTopic: document.getElementById("sentenceTopic"),
    timerProgress: document.getElementById("timerProgress"),
    corpusCountHint: document.getElementById("corpusCountHint"),

    // Live Telemetry
    liveWpm: document.getElementById("liveWpm"),
    liveRawWpm: document.getElementById("liveRawWpm"),
    liveAcc: document.getElementById("liveAcc"),
    liveChars: document.getElementById("liveChars"),
    liveTime: document.getElementById("liveTime"),
    pbBadge: document.getElementById("pbBadge"),
    liveMistakes: document.getElementById("liveMistakes"),
    liveStreak: document.getElementById("liveStreak"),

    // Results
    resultsHeadline: document.getElementById("resultsHeadline"),
    resultsBadges: document.getElementById("resultsBadges"),
    resFinalWpm: document.getElementById("resFinalWpm"),
    resRawWpm: document.getElementById("resRawWpm"),
    resFinalAcc: document.getElementById("resFinalAcc"),
    resConsistency: document.getElementById("resConsistency"),
    resPeakWpm: document.getElementById("resPeakWpm"),
    wpmChart: document.getElementById("wpmChart"),
    resCharsBreakdown: document.getElementById("resCharsBreakdown"),
    resMistakes: document.getElementById("resMistakes"),
    resBestStreak: document.getElementById("resBestStreak"),
    resConfigSummary: document.getElementById("resConfigSummary"),
    resPersonalBest: document.getElementById("resPersonalBest")
  };

  // --------------------------------------------------------------------------
  // 4. Web Audio Mechanical Click Synthesizer (Zero External Assets)
  // --------------------------------------------------------------------------
  let audioCtx = null;

  function playKeySound(type = "hit") {
    if (!state.sound) return;
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      if (type === "error") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(75, now + 0.055);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      } else if (type === "back") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.035);
        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      } else {
        osc.type = "triangle";
        const pitch = 440 + Math.random() * 65;
        osc.frequency.setValueAtTime(pitch, now);
        osc.frequency.exponentialRampToValueAtTime(135, now + 0.028);
        gain.gain.setValueAtTime(0.055, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.032);
      }

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.065);
    } catch (_) {
      // Ignore audio errors gracefully
    }
  }

  // --------------------------------------------------------------------------
  // 5. Storage Helpers & Personal Best Management
  // --------------------------------------------------------------------------
  function loadPrefs() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed.theme) state.theme = parsed.theme;
      if ([15, 30, 60, 120].includes(parsed.duration)) state.duration = parsed.duration;
      if (PASSAGE_CORPUS[parsed.mode]) state.mode = parsed.mode;
      if (["line", "block", "underline"].includes(parsed.caret)) state.caret = parsed.caret;
      if (["sm", "md", "lg"].includes(parsed.size)) state.size = parsed.size;
      if (typeof parsed.sound === "boolean") state.sound = parsed.sound;
    } catch (_) {}
  }

  function savePrefs() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          theme: state.theme,
          duration: state.duration,
          mode: state.mode,
          caret: state.caret,
          size: state.size,
          sound: state.sound
        })
      );
    } catch (_) {}
  }

  function getPBKey() {
    return `${state.mode}_${state.duration}`;
  }

  function loadPBs() {
    try {
      const raw = localStorage.getItem(PB_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (_) {
      return {};
    }
  }

  function getCurrentPB() {
    const pbs = loadPBs();
    return pbs[getPBKey()] || 0;
  }

  function updatePBIfBeaten(wpm) {
    const pbs = loadPBs();
    const key = getPBKey();
    const prev = pbs[key] || 0;
    if (wpm > prev) {
      pbs[key] = wpm;
      try {
        localStorage.setItem(PB_STORAGE_KEY, JSON.stringify(pbs));
      } catch (_) {}
      return { isNewPB: true, best: wpm, prev };
    }
    return { isNewPB: false, best: prev, prev };
  }

  // --------------------------------------------------------------------------
  // 6. Fisher-Yates RNG Passage Selector
  // --------------------------------------------------------------------------
  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function drawRandomSentence(mode) {
    if (!state.rngQueues[mode] || state.rngQueues[mode].length === 0) {
      state.rngQueues[mode] = shuffleArray(PASSAGE_CORPUS[mode]);
    }
    return state.rngQueues[mode].pop();
  }

  function buildInitialPassageText() {
    // Load enough randomly drawn sentences based on duration so fast typists never run dry
    const targetMinChars = state.duration >= 60 ? 520 : 320;
    let combined = "";
    const topics = new Set();

    while (combined.length < targetMinChars) {
      const item = drawRandomSentence(state.mode);
      topics.add(item.topic);
      combined += (combined ? " " : "") + item.text;
    }

    state.currentTopics = Array.from(topics);
    el.sentenceTopic.textContent = `topics: ${state.currentTopics.slice(0, 3).join(", ")}`;
    return combined;
  }

  // --------------------------------------------------------------------------
  // 7. DOM-Based Character Span Engine
  // --------------------------------------------------------------------------
  function appendTextToDOM(text, prependSpace = false) {
    const fullText = prependSpace ? " " + text : text;
    const words = fullText.split(" ");

    words.forEach((word, wIdx) => {
      // If prependSpace made words[0] === "", still emit leading space cleanly
      if (word.length > 0) {
        const wordSpan = document.createElement("span");
        wordSpan.className = "word";

        for (let i = 0; i < word.length; i++) {
          const ch = word[i];
          const charSpan = document.createElement("span");
          charSpan.className = "char";
          charSpan.textContent = ch;
          wordSpan.appendChild(charSpan);

          state.charNodes.push(charSpan);
          state.charTargets.push(ch);
          state.typedHistory.push(null);
        }
        el.passageContent.appendChild(wordSpan);
      }

      // Add space span between words (and after leading empty split)
      if (wIdx < words.length - 1) {
        const spaceSpan = document.createElement("span");
        spaceSpan.className = "char space-char";
        spaceSpan.textContent = " ";
        el.passageContent.appendChild(spaceSpan);

        state.charNodes.push(spaceSpan);
        state.charTargets.push(" ");
        state.typedHistory.push(null);
      }
    });
  }

  function renderFreshPassage() {
    el.passageContent.innerHTML = "";
    el.passageContent.style.transform = "translateY(0px)";
    state.charNodes = [];
    state.charTargets = [];
    state.typedHistory = [];
    state.cursorIndex = 0;

    const initialPassage = buildInitialPassageText();
    appendTextToDOM(initialPassage, false);

    if (state.charNodes.length > 0) {
      state.charNodes[0].classList.add("active");
    }
  }

  function ensureEnoughUpcomingCharacters() {
    const remaining = state.charNodes.length - state.cursorIndex;
    if (remaining < 110) {
      const nextItem = drawRandomSentence(state.mode);
      appendTextToDOM(nextItem.text, true);
    }
  }

  function syncViewportScroll() {
    const activeNode = state.charNodes[state.cursorIndex];
    if (!activeNode) return;

    const contentRect = el.passageContent.getBoundingClientRect();
    const activeRect = activeNode.getBoundingClientRect();
    const computedLineHeight = parseFloat(getComputedStyle(el.passageContent).lineHeight) || 40;

    // Distance from top of passageContent to the current line
    const offsetTop = activeRect.top - contentRect.top;
    // Keep cursor cleanly on the 2nd line once user advances past line 2
    const targetScroll = Math.max(0, offsetTop - computedLineHeight * 1.05);
    // Snap scroll to line-height increments for crisp vertical scrolling
    const snapped = Math.floor(targetScroll / computedLineHeight) * computedLineHeight;
    el.passageContent.style.transform = `translateY(-${snapped}px)`;
  }

  // --------------------------------------------------------------------------
  // 8. Telemetry Calculations & Live Ribbon Updates
  // --------------------------------------------------------------------------
  function computeMetrics() {
    const elapsedSeconds =
      state.status === "idle"
        ? 0
        : state.startTime
        ? Math.max(0.5, (Date.now() - state.startTime) / 1000)
        : 0;

    const elapsedMinutes = elapsedSeconds / 60;

    // Count currently valid correct chars on screen
    let activeCorrectChars = 0;
    for (let i = 0; i < state.cursorIndex; i++) {
      if (state.typedHistory[i] === "correct") {
        activeCorrectChars++;
      }
    }

    const netWpm = elapsedMinutes > 0 ? Math.max(0, Math.round(activeCorrectChars / 5 / elapsedMinutes)) : 0;
    const rawWpm = elapsedMinutes > 0 ? Math.max(0, Math.round(state.totalKeystrokes / 5 / elapsedMinutes)) : 0;
    const accuracy =
      state.totalKeystrokes > 0
        ? Math.max(0, Math.min(100, Math.round((state.correctKeystrokes / state.totalKeystrokes) * 100)))
        : 100;

    return { netWpm, rawWpm, accuracy, activeCorrectChars, elapsedSeconds };
  }

  function updateLiveTelemetryUI() {
    const { netWpm, rawWpm, accuracy } = computeMetrics();

    el.liveWpm.textContent = netWpm;
    el.liveRawWpm.textContent = `raw ${rawWpm}`;
    el.liveAcc.textContent = `${accuracy}%`;
    el.liveChars.textContent = `${state.correctKeystrokes} / ${state.totalKeystrokes} keys`;
    el.liveTime.textContent = `${state.timeLeft}s`;
    el.liveMistakes.textContent = state.mistakeCount;
    el.liveStreak.textContent = `streak ${state.currentStreak}`;
    el.pbBadge.textContent = `best ${getCurrentPB()} wpm`;

    if (state.timeLeft <= 5 && state.status === "running") {
      el.liveTime.classList.add("warn");
    } else {
      el.liveTime.classList.remove("warn");
    }

    if (state.mistakeCount > 0) {
      el.liveMistakes.classList.add("warn");
    } else {
      el.liveMistakes.classList.remove("warn");
    }

    const ratio = Math.max(0, state.timeLeft / state.duration);
    el.timerProgress.style.transform = `scaleX(${ratio})`;
  }

  // --------------------------------------------------------------------------
  // 9. Timer & Test Lifecycle
  // --------------------------------------------------------------------------
  function startTestTimer() {
    if (state.status !== "idle") return;
    state.status = "running";
    state.startTime = Date.now();
    state.wpmSamples = [];
    el.appShell.classList.add("is-typing");
    el.typingStage.classList.remove("is-idle");

    state.timerId = window.setInterval(() => {
      state.timeLeft -= 1;
      const { netWpm } = computeMetrics();
      state.wpmSamples.push(netWpm);

      updateLiveTelemetryUI();

      if (state.timeLeft <= 0) {
        finishTest();
      }
    }, 1000);
  }

  function finishTest() {
    if (state.status === "finished") return;
    state.status = "finished";
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }

    state.timeLeft = 0;
    el.appShell.classList.remove("is-typing");
    el.typingStage.classList.add("is-idle");
    updateLiveTelemetryUI();

    const { netWpm, rawWpm, accuracy } = computeMetrics();
    const pbResult = updatePBIfBeaten(netWpm);

    // Consistency calculation (coefficient of variation inverted on WPM samples)
    const samples = state.wpmSamples.length > 0 ? state.wpmSamples : [netWpm];
    const mean = samples.reduce((a, b) => a + b, 0) / samples.length;
    const variance = samples.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / samples.length;
    const stdDev = Math.sqrt(variance);
    const consistency = mean > 0 ? Math.max(0, Math.min(100, Math.round(100 - (stdDev / mean) * 100))) : 100;
    const peakWpm = Math.max(netWpm, ...samples);

    // Character breakdown
    let finalCorrect = 0;
    let finalIncorrect = 0;
    for (let i = 0; i < state.cursorIndex; i++) {
      if (state.typedHistory[i] === "correct") finalCorrect++;
      else if (state.typedHistory[i] === "incorrect") finalIncorrect++;
    }

    // Populate Results Panel
    el.resFinalWpm.textContent = netWpm;
    el.resRawWpm.textContent = `raw wpm: ${rawWpm}`;
    el.resFinalAcc.textContent = `${accuracy}%`;
    el.resConsistency.textContent = `consistency: ${consistency}%`;
    el.resPeakWpm.textContent = `peak: ${peakWpm} wpm`;
    el.resCharsBreakdown.textContent = `${finalCorrect} / ${finalIncorrect} / ${state.correctedCount}`;
    el.resMistakes.textContent = state.mistakeCount;
    el.resBestStreak.textContent = `${state.bestStreak} chars`;
    el.resConfigSummary.textContent = `${state.duration}s • ${state.mode}`;
    el.resPersonalBest.textContent = `${pbResult.best} wpm`;

    // Badges & Headline
    el.resultsBadges.innerHTML = "";
    if (pbResult.isNewPB && netWpm > 0) {
      addResultBadge("NEW PERSONAL BEST");
      el.resultsHeadline.textContent = "New High Score!";
    } else if (accuracy >= 98 && netWpm >= 60) {
      addResultBadge("PRECISION MASTER");
      el.resultsHeadline.textContent = "Sharp Execution";
    } else {
      el.resultsHeadline.textContent = "Session Summary";
    }
    if (state.mistakeCount === 0 && state.totalKeystrokes > 10) {
      addResultBadge("FLAWLESS RUN");
    }

    renderWpmChart(samples);

    // Lock typing stage and reveal summary
    el.typingStage.classList.add("hidden");
    el.resultsPanel.classList.remove("hidden");
    el.nextPassageBtn.classList.remove("hidden");
    el.pbBadge.textContent = `best ${pbResult.best} wpm`;
  }

  function addResultBadge(text) {
    const badge = document.createElement("span");
    badge.className = "res-badge";
    badge.textContent = text;
    el.resultsBadges.appendChild(badge);
  }

  function renderWpmChart(samples) {
    const svg = el.wpmChart;
    svg.innerHTML = "";
    const width = 420;
    const height = 110;
    const padX = 8;
    const padY = 12;

    const data = samples.length === 1 ? [samples[0], samples[0]] : samples;
    const maxVal = Math.max(20, ...data);
    const minVal = 0;

    // Subtle horizontal guide lines
    for (let i = 0; i <= 2; i++) {
      const y = padY + ((height - padY * 2) * i) / 2;
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", padX);
      line.setAttribute("x2", width - padX);
      line.setAttribute("y1", y);
      line.setAttribute("y2", y);
      line.setAttribute("stroke", "var(--border)");
      line.setAttribute("stroke-dasharray", "3 4");
      line.setAttribute("stroke-width", "1");
      svg.appendChild(line);
    }

    const points = data.map((val, idx) => {
      const x = padX + (idx / (data.length - 1)) * (width - padX * 2);
      const y = height - padY - ((val - minVal) / (maxVal - minVal)) * (height - padY * 2);
      return [x, y];
    });

    const polylinePts = points.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

    // Area fill under curve
    const areaPts = `${padX},${height - padY} ${polylinePts} ${width - padX},${height - padY}`;
    const area = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    area.setAttribute("points", areaPts);
    area.setAttribute("fill", "var(--accent-soft)");
    svg.appendChild(area);

    // Line path
    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute("points", polylinePts);
    polyline.setAttribute("fill", "none");
    polyline.setAttribute("stroke", "var(--accent)");
    polyline.setAttribute("stroke-width", "2.4");
    polyline.setAttribute("stroke-linecap", "round");
    polyline.setAttribute("stroke-linejoin", "round");
    svg.appendChild(polyline);

    // Endpoint dot
    const last = points[points.length - 1];
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", last[0]);
    dot.setAttribute("cy", last[1]);
    dot.setAttribute("r", "4");
    dot.setAttribute("fill", "var(--accent)");
    svg.appendChild(dot);
  }

  function resetTest() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }

    state.status = "idle";
    state.timeLeft = state.duration;
    state.startTime = null;
    state.totalKeystrokes = 0;
    state.correctKeystrokes = 0;
    state.mistakeCount = 0;
    state.correctedCount = 0;
    state.currentStreak = 0;
    state.bestStreak = 0;
    state.wpmSamples = [];

    el.appShell.classList.remove("is-typing");
    el.resultsPanel.classList.add("hidden");
    el.typingStage.classList.remove("hidden");
    el.typingStage.classList.add("is-idle");
    el.nextPassageBtn.classList.add("hidden");

    renderFreshPassage();
    updateLiveTelemetryUI();
    focusTypingArena();
  }

  // --------------------------------------------------------------------------
  // 10. Keystroke Processing
  // --------------------------------------------------------------------------
  function processCharacter(char) {
    if (state.status === "finished") return;
    if (state.status === "idle") {
      startTestTimer();
    }

    ensureEnoughUpcomingCharacters();

    const idx = state.cursorIndex;
    if (idx >= state.charNodes.length) return;

    const targetChar = state.charTargets[idx];
    const currentNode = state.charNodes[idx];

    state.totalKeystrokes += 1;
    currentNode.classList.remove("active");

    if (char === targetChar) {
      currentNode.classList.add("correct");
      state.typedHistory[idx] = "correct";
      state.correctKeystrokes += 1;
      state.currentStreak += 1;
      if (state.currentStreak > state.bestStreak) {
        state.bestStreak = state.currentStreak;
      }
      playKeySound("hit");
    } else {
      currentNode.classList.add("incorrect");
      state.typedHistory[idx] = "incorrect";
      state.mistakeCount += 1;
      state.currentStreak = 0;
      playKeySound("error");
    }

    state.cursorIndex += 1;
    if (state.cursorIndex < state.charNodes.length) {
      state.charNodes[state.cursorIndex].classList.add("active");
    }

    syncViewportScroll();
    updateLiveTelemetryUI();
  }

  function processBackspace(ctrlPressed = false) {
    if (state.status === "finished" || state.cursorIndex === 0) return;

    const steps = ctrlPressed ? computeWordJumpLength() : 1;

    for (let s = 0; s < steps; s++) {
      if (state.cursorIndex === 0) break;

      const curNode = state.charNodes[state.cursorIndex];
      if (curNode) curNode.classList.remove("active");

      state.cursorIndex -= 1;
      const prevNode = state.charNodes[state.cursorIndex];
      if (state.typedHistory[state.cursorIndex] === "incorrect") {
        state.correctedCount += 1;
      }
      state.typedHistory[state.cursorIndex] = null;
      prevNode.classList.remove("correct", "incorrect");
      prevNode.classList.add("active");
    }

    playKeySound("back");
    syncViewportScroll();
    updateLiveTelemetryUI();
  }

  function computeWordJumpLength() {
    let i = state.cursorIndex - 1;
    let count = 0;
    while (i >= 0 && state.charTargets[i] === " ") {
      count++;
      i--;
    }
    while (i >= 0 && state.charTargets[i] !== " ") {
      count++;
      i--;
    }
    return Math.max(1, count);
  }

  // --------------------------------------------------------------------------
  // 11. Focus & Keyboard Event Handling
  // --------------------------------------------------------------------------
  function focusTypingArena() {
    if (state.status === "finished") return;
    el.typingStage.classList.remove("is-blurred");
    el.hiddenInput.focus({ preventScroll: true });
  }

  function handleCapsLock(event) {
    if (typeof event.getModifierState === "function") {
      const caps = event.getModifierState("CapsLock");
      el.capsLockWarning.classList.toggle("hidden", !caps);
    }
  }

  window.addEventListener("keydown", (event) => {
    handleCapsLock(event);

    // Quick restart via Tab or Escape from anywhere
    if (event.key === "Tab" || event.key === "Escape") {
      event.preventDefault();
      resetTest();
      return;
    }

    if (state.status === "finished") return;

    // Avoid capturing modifier shortcuts like Ctrl+R, Ctrl+C, Cmd+V
    if (event.metaKey || event.altKey) return;
    if (event.ctrlKey && event.key !== "Backspace") return;

    // If blurred and user presses a printable key, wake & focus immediately
    if (el.typingStage.classList.contains("is-blurred")) {
      focusTypingArena();
    }

    if (event.key === "Backspace") {
      event.preventDefault();
      processBackspace(event.ctrlKey);
      return;
    }

    if (event.key === " ") {
      event.preventDefault();
      processCharacter(" ");
      return;
    }

    // Single printable character
    if (event.key.length === 1) {
      event.preventDefault();
      processCharacter(event.key);
    }
  });

  window.addEventListener("keyup", handleCapsLock);

  // Mobile / virtual keyboard fallback via hidden input
  el.hiddenInput.addEventListener("input", (event) => {
    if (state.status === "finished") {
      el.hiddenInput.value = "";
      return;
    }
    const val = el.hiddenInput.value;
    if (val) {
      for (const ch of val) {
        processCharacter(ch);
      }
      el.hiddenInput.value = "";
    }
  });

  el.typingStage.addEventListener("click", focusTypingArena);
  el.blurOverlay.addEventListener("click", focusTypingArena);

  el.hiddenInput.addEventListener("blur", () => {
    if (state.status !== "finished") {
      el.typingStage.classList.add("is-blurred");
    }
  });

  el.hiddenInput.addEventListener("focus", () => {
    el.typingStage.classList.remove("is-blurred");
  });

  // --------------------------------------------------------------------------
  // 12. Customization Bar Bindings
  // --------------------------------------------------------------------------
  function applyCustomizationToDOM() {
    el.root.setAttribute("data-theme", state.theme);
    el.root.setAttribute("data-caret", state.caret);
    el.root.setAttribute("data-size", state.size);

    document.querySelectorAll("[data-time]").forEach((btn) => {
      btn.classList.toggle("active", Number(btn.dataset.time) === state.duration);
    });

    document.querySelectorAll("[data-mode]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mode === state.mode);
    });

    document.querySelectorAll("[data-caret-opt]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.caretOpt === state.caret);
    });

    document.querySelectorAll("[data-size-opt]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.sizeOpt === state.size);
    });

    document.querySelectorAll("[data-theme-opt]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.themeOpt === state.theme);
    });

    el.soundToggle.classList.toggle("active", state.sound);
    el.soundToggle.setAttribute("aria-pressed", String(state.sound));
  }

  document.querySelectorAll("[data-time]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.duration = Number(btn.dataset.time);
      savePrefs();
      applyCustomizationToDOM();
      resetTest();
    });
  });

  document.querySelectorAll("[data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.mode = btn.dataset.mode;
      savePrefs();
      applyCustomizationToDOM();
      resetTest();
    });
  });

  document.querySelectorAll("[data-caret-opt]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.caret = btn.dataset.caretOpt;
      savePrefs();
      applyCustomizationToDOM();
      focusTypingArena();
    });
  });

  document.querySelectorAll("[data-size-opt]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.size = btn.dataset.sizeOpt;
      savePrefs();
      applyCustomizationToDOM();
      requestAnimationFrame(syncViewportScroll);
      focusTypingArena();
    });
  });

  document.querySelectorAll("[data-theme-opt]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.theme = btn.dataset.themeOpt;
      savePrefs();
      applyCustomizationToDOM();
      focusTypingArena();
    });
  });

  el.soundToggle.addEventListener("click", () => {
    state.sound = !state.sound;
    savePrefs();
    applyCustomizationToDOM();
    if (state.sound) playKeySound("hit");
    focusTypingArena();
  });

  el.restartBtn.addEventListener("click", resetTest);
  el.nextPassageBtn.addEventListener("click", resetTest);
  el.brandHome.addEventListener("click", resetTest);

  // --------------------------------------------------------------------------
  // 13. Initialization
  // --------------------------------------------------------------------------
  function init() {
    loadPrefs();
    const totalCount =
      PASSAGE_CORPUS.standard.length +
      PASSAGE_CORPUS.technical.length +
      PASSAGE_CORPUS.lowercase.length;
    el.corpusCountHint.textContent = `${totalCount} curated passages • rng shuffle`;

    applyCustomizationToDOM();
    resetTest();
  }

  init();
})();