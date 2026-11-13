const DATABASE = [
  "The Document Object Model is a cross-platform and language-independent interface that treats an HTML or XML document as a tree structure wherein each node is an object representing a part of the document.",
  "Programs must be written for people to read, and only incidentally for machines to execute. Clean architecture separates state management from presentation so every component remains predictable.",
  "First solve the problem, then write the code. Premature optimization is the root of all evil in software engineering, so focus on clear logic and maintainable data structures before chasing microseconds.",
  "JavaScript operates on a single-threaded event loop. Asynchronous callbacks and intervals are queued in the task queue and executed only when the call stack is completely clear."
];

// App Node Targets
const quoteDisplay = document.getElementById("quote-display");
const hiddenInput = document.getElementById("hidden-input");
const typingCard = document.getElementById("typing-card");
const timeLeftEl = document.getElementById("time-left");
const mistakesEl = document.getElementById("mistakes");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart-btn");

// Global Configuration States
let maxTimeAllowed = 60;
let timer = null;
let timeLeft = maxTimeAllowed;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

/**
 * Stage 1: Text splitting utility injecting individual evaluation <span>s
 */
function loadParagraph() {
  const choice = DATABASE[Math.floor(Math.random() * DATABASE.length)];
  quoteDisplay.innerHTML = "";

  choice.split("").forEach((char, index) => {
    const element = document.createElement("span");
    element.textContent = char;
    if (index === 0) {
      element.className = "active";
    }
    quoteDisplay.appendChild(element);
  });
}

/**
 * Stage 2: Inline Keystroke verification and audit checking
 */
function processInput() {
  const characters = quoteDisplay.querySelectorAll("span");
  const enteredChars = hiddenInput.value.split("");
  const keyTyped = enteredChars[charIndex];

  if (charIndex >= characters.length || timeLeft <= 0) return;

  // Initialize countdown sequence on first press
  if (!isTyping) {
    timer = setInterval(decrementTimer, 1000);
    isTyping = true;
  }

  // Handle backspace mechanics
  if (keyTyped === undefined) {
    if (charIndex > 0) {
      characters[charIndex].classList.remove("active");
      charIndex--;

      if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }

      characters[charIndex].classList.remove("correct", "incorrect");
      characters[charIndex].classList.add("active");
    }
  } 
  // Handle continuous forward progression
  else {
    if (keyTyped === characters[charIndex].textContent) {
      characters[charIndex].classList.add("correct");
    } else {
      mistakes++;
      characters[charIndex].classList.add("incorrect");
    }

    characters[charIndex].classList.remove("active");
    charIndex++;

    if (charIndex < characters.length) {
      characters[charIndex].classList.add("active");
    } else {
      clearInterval(timer);
      hiddenInput.disabled = true;
    }
  }

  calculateAssessmentStats();
}

/**
 * Step 3: Compute Net words-per-minute (normalized) and error accuracy percentages
 */
function calculateAssessmentStats() {
  mistakesEl.textContent = mistakes;

  // Percentage Evaluation
  if (charIndex > 0) {
    const accuracy = Math.round(((charIndex - mistakes) / charIndex) * 100);
    accuracyEl.textContent = Math.max(0, accuracy);
  } else {
    accuracyEl.textContent = 100;
  }

  // Time & WPM Normalized Calculation
  const minutes = (maxTimeAllowed - timeLeft) / 60;
  if (minutes > 0) {
    const netWords = (charIndex - mistakes) / 5;
    const computedWpm = Math.round(netWords / minutes);
    wpmEl.textContent = computedWpm > 0 && isFinite(computedWpm) ? computedWpm : 0;
  } else {
    wpmEl.textContent = 0;
  }
}

function decrementTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeLeftEl.textContent = timeLeft;
    calculateAssessmentStats();
  } else {
    clearInterval(timer);
    hiddenInput.disabled = true;
  }
}

/**
 * Assessment cleanup and reset functionality
 */
function resetAssessment() {
  clearInterval(timer);
  timer = null;
  timeLeft = maxTimeAllowed;
  charIndex = 0;
  mistakes = 0;
  isTyping = false;

  hiddenInput.disabled = false;
  hiddenInput.value = "";

  timeLeftEl.textContent = timeLeft;
  mistakesEl.textContent = 0;
  wpmEl.textContent = 0;
  accuracyEl.textContent = 100;

  loadParagraph();
  hiddenInput.focus();
}

// Global UI Settings Events Setup
function setupToggles() {
  // Time selectors
  document.getElementById("time-toggles").addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    document.querySelectorAll("#time-toggles button").forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    maxTimeAllowed = parseInt(e.target.dataset.value);
    resetAssessment();
  });

  // Caret customization selectors
  document.getElementById("caret-toggles").addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    document.querySelectorAll("#caret-toggles button").forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    
    // Switch dynamic display shape mapping
    quoteDisplay.className = quoteDisplay.className.replace(/\bcaret-\w+/g, "");
    quoteDisplay.classList.add(`caret-${e.target.dataset.value}`);
  });

  // Theme variation selectors
  document.getElementById("theme-toggles").addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    document.querySelectorAll("#theme-toggles button").forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    document.body.setAttribute("data-theme", e.target.dataset.value);
  });

  // Dynamic Scale adjust selectors
  document.getElementById("size-toggles").addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    document.querySelectorAll("#size-toggles button").forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    
    quoteDisplay.classList.remove("small-text", "medium-text", "large-text");
    quoteDisplay.classList.add(`${e.target.dataset.value}-text`);
  });
}

// User Action Hookups
hiddenInput.addEventListener("input", processInput);
typingCard.addEventListener("click", () => hiddenInput.focus());

document.addEventListener("keydown", (e) => {
  // Captures focus and ignores functional system input keys (Escape, Tab, Arrows, etc.)
  const isExcludedKey = e.key.length > 1 && e.key !== "Backspace" && e.key !== "Enter";
  if (!isExcludedKey && !e.ctrlKey && !e.metaKey && document.activeElement !== hiddenInput) {
    hiddenInput.focus();
  }
});

restartBtn.addEventListener("click", resetAssessment);

// Bootstrap
setupToggles();
resetAssessment();