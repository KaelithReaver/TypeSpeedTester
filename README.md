TypeMetrics — Interactive Typing Speed & Accuracy Tester
A zero-dependency, real-time DOM typing assessment engine built strictly with vanilla HTML5, CSS3, and JavaScript. Inspired by modern minimalist interfaces and customizable typing platforms, TypeMetrics evaluates keystroke accuracy and Words Per Minute (WPM) in real time.
Live Demo & Repository
Live Deployment (Vercel):(https://typespeedtest-six.vercel.app/)
---
Core Engineering Architecture
1. Dual-Layer DOM Interface (`<span>` Splitting)
Standard HTML `<input>` elements cannot color individual characters independently. TypeMetrics uses a dual-layer architecture:
Visual Layer (`#quote-display`): The target quote string is split into an array of single characters via `.split('')`. Each character is wrapped in its own `<span>` element and injected into the DOM so individual letters can be styled with `.correct`, `.incorrect`, and `.active` classes.
Capture Layer (`#hidden-input`): An invisible input field captures user keystrokes and routes focus seamlessly whenever the user clicks the typing card or begins typing anywhere on the page.
2. Real-Time Keystroke Auditing (`input` Event)
Every keystroke triggers the `input` event listener on `#hidden-input`:
Forward Auditing: Compares the character at the current pointer (`charIndex`) against `spans[charIndex].textContent`. Matching characters receive `.correct` (green), while mismatches increment the mistake counter and receive `.incorrect` (red with highlight).
Backspace Handling: Detects character deletion when the input at `charIndex` is `undefined`, steps the pointer backward, decrements the mistake counter if the erased character was previously marked `.incorrect`, and restores the `.active` blinking caret.
3. First-Key Timer & Safe Interval Teardown
A boolean flag (`isTyping`) ensures the countdown timer (`setInterval`) starts strictly on the very first keypress rather than page load.
Clicking Restart Assessment or changing the timer duration invokes `clearInterval(timer)` before resetting state variables, preventing overlapping or runaway intervals.
---
Telemetry & Mathematical Formulas
In international typing assessments, a standard "word" is normalized to $5$ characters (including spaces and punctuation) so quotes with longer vocabulary do not unfairly penalize speed.
Time Elapsed (in Minutes)
$$\text{Time Elapsed (min)} = \frac{\text{Max Time} - \text{Time Remaining}}{60}$$
Net Words Per Minute (Net WPM)
$$\text{Net WPM} = \text{round}\left( \frac{\frac{\text{Characters Typed} - \text{Mistakes}}{5}}{\text{Time Elapsed (min)}} \right)$$
(Guard condition: Clamped to $0$ if the calculation evaluates to a negative number or non-finite value).
Accuracy Percentage
$$\text{Accuracy (%)} = \text{round}\left( \frac{\text{Characters Typed} - \text{Mistakes}}{\text{Characters Typed}} \times 100 \right)$$
(Guard condition: Defaults to $100%$ when $0$ characters have been typed).
---
Key Features
Live Telemetry Cards: Real-time updates for Time Remaining, Mistakes, Net WPM, and Accuracy % on every keystroke and every $1000\text{ ms}$ clock tick.
Configurable Test Duration: Switch between $15\text{s}$, $30\text{s}$, $60\text{s}$, and $120\text{s}$ modes.
Custom Caret Styles: Toggle between vertical `line`, `block`, and `underline` blinking carets.
5 Built-In Color Themes: Switch instantaneously between Carbon, Cyber, Forest, Sakura, and Retro palettes via CSS custom properties.
Typography Scaling: Adjust quote display size between Small (`S`), Medium (`M`), and Large (`L`).
---
Strict 3-File Project Structure
```text
typing-tester/
├── index.html   # Semantic HTML5 markup (zero inline styles or onclick attributes)
├── style.css    # Theme variables, responsive grid, and blinking caret animations
└── script.js    # Span injection, input auditing, WPM math, and timer lifecycle
```
---
Local Setup & Vercel Deployment
Run Locally: Clone this repository and double-click `index.html` in any modern web browser. Zero build tools or `npm install` steps required.
Deploy on Vercel:
Push this folder to a public GitHub repository.
Import the repository into vercel.com with Framework Preset set to `Other`.
Click Deploy to generate your live HTTPS production link.
