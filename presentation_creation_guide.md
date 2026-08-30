# Presentation Creation Guide: IELTS Course HTML Slide Decks

This guide provides the complete, authoritative blueprint and boilerplate recipes for creating interactive, animation-rich, 16:9 / 4:3 HTML presentations across all course levels (`expert 5/`, `expert 6/`, `expert 7.5/`, etc.).

---

## 1. Directory Structure & File Naming Conventions

All course presentations adhere to a standardized modular directory layout:

```
HTML presentations/
├── presentation-base.css              # Universal master stylesheet (Stage, layout, cards, typography, HUD)
├── templates/
│   └── slide-templates.html           # Universal HTML5 Slide Template Catalog (13 Standardized Layouts)
├── templates-catalog.html             # Live visual template blueprint gallery for teachers
├── presentation_creation_guide.md     # This comprehensive creation guide
├── reading_passages_and_questions_guide.md # Deep-dive guide for reading & evidence grounding
├── js/                                # Universal modular JavaScript engine
│   ├── template-engine.js             # Declarative slide-card expander & dynamic slide counter
│   ├── deck-engine.js                 # Master bundle entry point & auto-loader
│   ├── deck-bundle.js                 # Recompiled high-performance distribution bundle
│   ├── deck-core.js                   # Stage scaling, slide lifecycle, keyboard nav & validation
│   ├── deck-components.js             # Auto-hydrates vertical skill tabs, counters, HUD, syn buttons
│   ├── deck-theme-engine.js           # Dynamic theme switcher & CSS token manager
│   ├── reading-highlighter.js         # Auto-reveals evidence, dual-color synonym pairing, smooth scroll
│   ├── reading-grounder.js            # Synonym badge formatting & hover preview
│   ├── step-reveal.js                 # Single-item Socratic reveal engine ('E' key & action row button)
│   ├── vocab-bank.js                  # Click-to-fill chips & speech pronunciation
│   ├── essay-analyzer.js              # Cohesion & structural analysis breakdown tools
│   ├── classroom-timer.js             # Interactive countdown timer with alert chime (Key: T)
│   ├── student-picker.js              # Random student name selector wheel (Key: R)
│   ├── paragraph-loupe.js             # Reading paragraph zoom magnifier with multi-screen sync (Key: Z)
│   ├── presenter-sync.js              # Zero-latency BroadcastChannel & LocalStorage dual-screen sync hub
│   ├── presenter-drawing.js           # Interactive canvas drawing studio, laser pointer & highlighters
│   ├── presenter-notes.js             # Teacher presenter notes panel & pedagogical cues (Key: N)
│   ├── presenter-view.js              # Canva-style Presenter Cockpit UI & Filmstrip carousel (Alt+P)
│   ├── slide-navigator.js             # Slide Grid search overlay (Key: G)
│   ├── presentation-spotlight.js      # Focus spotlight mask (Key: S) & Mutes (Keys: B / W)
│   ├── teacher-highlighter.js         # Multi-color live marker (Key: H)
│   ├── laser-pointer.js               # Glowing laser pointer cursor (Key: L)
│   ├── pen-annotation.js              # Live drawing pen & clear (Keys: P / C)
│   └── presentation-tools.js          # Toolbar HUD coordinator & key dispatcher
├── expert 5/
│   ├── module-04.html
│   └── ...
├── expert 6/
│   ├── module-02.html
│   └── ...
└── index.html                         # Master Course Hub & Launch Dashboard
```

### Core Naming Rules:
- **Module Files**: Use zero-padded lowercase names: `module-01.html`, `module-02.html`, ..., `module-10.html`.
- **Resource Linking**: Subfolder presentations link to `../presentation-base.css` and `../js/deck-engine.js` (or `../js/deck-bundle.js`).

---

## 2. Design Aesthetics & Visual Excellence

### Core Aesthetic Principles
1. **Responsive 1920×1080 Stage Scaling**: Presentations maintain an exact 16:9 aspect ratio (with optional 4:3 mode via <kbd>Shift+A</kbd>) and scale dynamically with CSS `transform: translate(...) scale(...)` to fit any screen resolution without letterboxing artifacts.
2. **Curated Color Tokens**: Avoid plain primary colors. Use tailored HSL/Hex palette tokens per skill:
   - **Reading (`--col-reading`)**: Royal Azure `#2563eb` / `#0284c7`
   - **Grammar (`--col-grammar`)**: Coral Rose `#f43f5e` / Amber Rust `#ea580c`
   - **Vocabulary (`--col-vocab`)**: Emerald `#059669` / Jade `#10b981`
   - **Writing (`--col-writing`)**: Violet `#7c3aed` / Indigo `#6366f1`
   - **Speaking / Review (`--col-review`)**: Cyan `#0891b2` / Teal `#0d9488`
3. **Content-Only Font Scaling (`--font-scale`)**:
   - Zooming in/out via <kbd>+</kbd> / <kbd>−</kbd> scales **body content only** (`.card`, `.reading-pane`, `.question-pane`, `.vocab-bank`), keeping slide headers, titles, counters, and HUD icons crisp and stably positioned.
4. **Clean Action Row Layout**:
   - Action controls (`Check Answers`, `👉 Step Reveal (E)`, `Reveal Keys`, `Reset`) must always stay on a **single, clean horizontal row** without wrapping.
   - Never inject intrusive single-reveal buttons inside individual question cards.

---

## 3. Minimal Starter HTML Template

```html
<!DOCTYPE html>
<html lang="en" data-theme="bold-signal">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expert IELTS 6 — Module 02: Feelings &amp; Expression</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@400..700&family=JetBrains+Mono:wght@400..700&display=swap" rel="stylesheet">
    
    <!-- Master Stylesheet -->
    <link rel="stylesheet" href="../presentation-base.css">

    <!-- Module Palette Overrides -->
    <style>
        :root {
            --col-reading: #2563eb;
            --col-grammar: #f43f5e;
            --col-vocab:   #059669;
            --col-writing: #7c3aed;
            --col-review:  #0891b2;
            
            --stage-bg: #111827;
            --viewport-bg: radial-gradient(circle at 80% 20%, #881337 0%, #111827 70%);
        }
    </style>
</head>
<body>
    <div class="deck-viewport">
        <main class="deck-stage" id="deckStage">
            
            <!-- SLIDES GO HERE -->

        </main>
    </div>

    <!-- Universal Presentation Engine -->
    <script src="../js/deck-engine.js"></script>
</body>
</html>
```

> [!NOTE]
> [`js/deck-engine.js`](file:///d:/Teaching/HTML%20presentations/js/deck-engine.js) automatically injects the vertical skill navigation tabs, slide counter (`01 / 18`), teacher toolkit HUD, step-reveal hooks, and interactive evaluation listeners.

---

> [!IMPORTANT]
> ### 🛑 MANDATORY RULE: OMIT SPEAKING SKILLS ACROSS ALL DECKS
> **Never create Speaking slides or Speaking exercises in any HTML presentation in this repository.**
> The presentations in this repository focus exclusively on **Reading**, **Grammar**, **Vocabulary**, and **Writing (Task 2 & Spelling)**. Speaking skills are intentionally taught in separate formats and must ALWAYS be omitted when building or updating course presentations.

---

## 4. Standard Slide Module Blueprint & The 4-Stage Reading Framework

Every reading task in an IELTS module deck uses a **4-Stage Instructional Sequence**:
1. **Stage 1 (Pre-reading Keyword Analysis)**: Question keyword deconstruction with direct **🟢 Green (Anchor)** and **🟣 Purple (Qualifier/Claim)** sentence highlighting and step-reveal (<kbd>E</kbd>).
2. **Stage 2 (Full Split-View Reading)**: Full unabridged reading text and complete interactive question set.
3. **Stage 3 (1-Question-Per-Slide Walkthroughs)**: Dedicated interactive exercise slides for each question alongside its isolated passage excerpt, unrevealed by default, with **Google Female UK Voice (`en-GB`)** audio pronunciation and definitions.
4. **Stage 4 (Grammar, Lexicon & Writing Mastery)**: Deep-dive academic grammar, vocabulary, spelling traps, and essay structure.

| Slide Range | Slide Type | `data-skill` | Description |
| :---: | :--- | :--- | :--- |
| **01** | **Title & Course Roadmap** | `title` | Module badge, main title, subtitle, and 3-skill syllabus cards (Reading, Grammar/Vocab, Writing). |
| **02** | **Part A Reading Strategy (Stage 1)** | `read` | Pre-reading question keyword deconstruction with direct green/purple sentence highlighting. |
| **03** | **Part A Full Reading Task (Stage 2)** | `read` | 50/50 Split-view passage with dual-color synonym grounding & interactive questions. |
| **04–07** | **Part A 1-Question Walkthroughs (Stage 3)** | `read` | Individual interactive exercise slides (1 question per slide) + dedicated paragraph excerpts. |
| **08** | **Part A Secondary Reading Strategy** | `read` | Keyword deconstruction for Part A secondary task (e.g. YES/NO/NOT GIVEN). |
| **09** | **Part A Full Secondary Reading Task** | `read` | Full split-view critical response passage & questions. |
| **10–15** | **Part A Secondary 1-Q Walkthroughs** | `read` | Dedicated 1-question interactive slides for Questions 1 to 6. |
| **16–18** | **Part A Grammar Mastery** | `grammar` | Rules summary, academic transformations, and cloze practice. |
| **19** | **Part A Writing Focus** | `write` | Opinion essay thesis & body paragraph balance. |
| **20** | **Part B Section Divider** | `section` | Two-column transition banner introducing Part B topic & skills. |
| **21** | **Part B Reading Strategy** | `read` | Keyword deconstruction for Part B reading task (e.g. Matching Information). |
| **22** | **Part B Full Reading Task** | `read` | Full split-view passage & questions. |
| **23–28** | **Part B 1-Question Walkthroughs** | `read` | Dedicated 1-question interactive slides for Questions 1 to 6. |
| **29** | **Part B Secondary Reading Strategy** | `read` | Keyword deconstruction for Questions 7 to 12. |
| **30** | **Part B Full Secondary Reading Task** | `read` | Full split-view passage & Y/N/NG questions. |
| **31–36** | **Part B Secondary 1-Q Walkthroughs** | `read` | Dedicated 1-question interactive slides for Questions 7 to 12. |
| **37–39** | **Part B Vocabulary In Use** | `vocab` | Syntactic breakdown, parts of speech, and intensifier collocations. |
| **40–41** | **Part B Writing & Spelling Mastery** | `write` | Common spelling traps, essay outline, and prompt deconstruction. |
| **42** | **Summary & Exam Competencies** | `review` | Complete achievement checklist and key exam takeaways. *(NO speaking slides)* |

---

## 5. Slide Recipes & Code Templates

### A. The 3-Stage Reading Sequence (`data-skill="read"`)
Refer to the dedicated [reading_passages_and_questions_guide.md](file:///d:/Teaching/HTML%20presentations/reading_passages_and_questions_guide.md) for full blueprints:
- **Stage 1 (Strategy Slide)**: Question cards with direct `.syn-pair-1` (Green) and `.syn-pair-2` (Purple) sentence spans and `<button onclick="revealAnswers(this)">💡 Show Highlights</button>`.
- **Stage 2 (Model Walkthrough Slide)**: Left reading pane with dedicated single paragraph `<mark class="evidence">` and right pane with 1 Question card and `💡 Evidence` button.
- **Stage 3 (Full Split-View Slide)**: 50/50 Split-view container with full text and complete interactive exercise.

```html
<section class="slide" id="slide-2" data-skill="read">
    <div class="slide-inner">
        <div class="notebook">
            <div class="skill-stripe" style="background: var(--col-reading);"></div>
            <div class="page-content">
                <div class="slide-header">
                    <div class="slide-title-group">
                        <span class="skill-badge" style="background: var(--col-reading);">Reading Practice</span>
                        <h2 class="slide-title">Paraphrase &amp; Synonym Grounding</h2>
                    </div>
                    <div class="slide-number">02 / 17</div>
                </div>

                <div class="two-col" style="flex: 1; min-height: 0;">
                    <!-- LEFT PANE: Reading Passage -->
                    <div class="reading-pane">
                        <h3 style="font-family: var(--font-display); font-size: 20px; margin-bottom: 12px; color: var(--col-reading);">
                            "Feeling Good" — Social Costs of Extraordinary Experiences
                        </h3>
                        <p><span class="para-tag">[A]</span> We love to <mark class="evidence" id="ev-kw-3"><span class="syn-pair-1" data-q="kw-3">reminisce and tell others</span> about our <span class="syn-pair-2" data-q="kw-3">extraordinary experiences</span></mark> – but new research suggests this may come at a social cost.</p>
                        
                        <p><span class="para-tag">[B]</span> <mark class="evidence" id="ev-kw-1"><span class="syn-pair-1" data-q="kw-1">"Extraordinary experiences</span> are <span class="syn-pair-2" data-q="kw-1">pleasurable in the moment but leave us socially worse off in the long run,"</span></mark> says study author Gus Cooney.</p>
                    </div>

                    <!-- RIGHT PANE: Questions -->
                    <div class="question-pane" style="display: flex; flex-direction: column;">
                        <h3 style="font-family: var(--font-display); font-size: 19px; margin-bottom: 6px; color: var(--col-reading);">
                            Exercise: Sentence Matching
                        </h3>
                        
                        <div style="display: flex; flex-direction: column; gap: 10px; flex: 1; overflow-y: auto;">
                            <!-- Question Card 1 -->
                            <div class="q-card" data-q="kw-1">
                                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
                                    <span style="font-weight: 700; font-size: 15px;">1. <span class="syn-pair-1" data-q="kw-1">Sharing experiences</span> provides us with <span class="syn-pair-2" data-q="kw-1">immediate and long-term satisfaction</span>.</span>
                                    <button class="syn-btn" data-ev="ev-kw-1">💡 Evidence</button>
                                </div>
                                <div style="margin-top: 8px;">
                                    <select class="select-input" data-ans="B" style="width: 140px;">
                                        <option value="">Sentence...</option>
                                        <option value="A">Sentence A</option>
                                        <option value="B">Sentence B</option>
                                    </select>
                                </div>
                                <div class="item-explanation">
                                    <div class="syn-key-box">
                                        <span class="syn-tag green">Green Match:</span> <em>"Sharing experiences"</em> ↔ <em>"Extraordinary experiences"</em>
                                    </div>
                                    <div class="syn-key-box">
                                        <span class="syn-tag purple">Purple Match:</span> <em>"immediate &amp; long-term"</em> ↔ <em>"pleasurable in moment / long run"</em> (Sentence B)
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Action Row -->
                        <div class="action-row" style="margin-top: 8px;">
                            <button class="btn-action btn-primary" onclick="checkAnswers(this)">Check Answers</button>
                            <button class="btn-action" onclick="revealAnswers(this)">Reveal Keys</button>
                            <button class="btn-action" onclick="resetAnswers(this)">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

### B. Grammar Presentation & Academic Paragraph Rewriting (`data-skill="grammar"`)

Contrasting an informal student draft with a connected academic model using defining relative clauses:

```html
<section class="slide" id="slide-5" data-skill="grammar">
    <div class="slide-inner">
        <div class="notebook">
            <div class="skill-stripe" style="background: var(--col-grammar);"></div>
            <div class="page-content">
                <div class="slide-header">
                    <div class="slide-title-group">
                        <span class="skill-badge" style="background: var(--col-grammar);">Grammar in Context</span>
                        <h2 class="slide-title">Academic Paragraph Rewriting (Ex 4b)</h2>
                    </div>
                    <div class="slide-number">05 / 17</div>
                </div>

                <div class="two-col" style="flex: 1; min-height: 0; gap: 20px;">
                    <!-- Left: Informal Draft -->
                    <div class="card" style="flex: 1; border-top: 4px solid var(--text-muted); background: #fdf2f2;">
                        <h3 style="font-size: 18px; font-weight: 800; color: #991b1b; margin-bottom: 10px;">❌ Informal / Choppy Draft</h3>
                        <p style="font-size: 15px; line-height: 1.8;">
                            There was an experiment. It took place last year. It showed something interesting. People had extraordinary experiences. They felt bad. They talked to people. The other people had ordinary experiences.
                        </p>
                    </div>

                    <!-- Right: Academic Model -->
                    <div class="card" style="flex: 1.2; border-top: 4px solid var(--col-grammar); background: #fff;">
                        <h3 style="font-size: 18px; font-weight: 800; color: var(--col-grammar); margin-bottom: 10px;">✨ Connected Academic Model</h3>
                        <p style="font-size: 15px; line-height: 1.8;">
                            An experiment <strong style="color:var(--col-grammar);">which</strong> took place last year showed that people <strong style="color:var(--col-grammar);">who</strong> had extraordinary experiences felt bad <strong style="color:var(--col-grammar);">when</strong> talking to people <strong style="color:var(--col-grammar);">who</strong> had only ordinary experiences.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

### C. Interactive Vocabulary with Click-to-Fill Word Chips (`data-skill="vocab"`)

```html
<section class="slide" id="slide-6" data-skill="vocab">
    <div class="slide-inner">
        <div class="notebook">
            <div class="skill-stripe" style="background: var(--col-vocab);"></div>
            <div class="page-content">
                <div class="slide-header">
                    <div class="slide-title-group">
                        <span class="skill-badge" style="background: var(--col-vocab);">Vocabulary</span>
                        <h2 class="slide-title">Academic Lexicon: Intensifiers &amp; Collocations</h2>
                    </div>
                    <div class="slide-number">06 / 17</div>
                </div>

                <!-- Word Bank Chips -->
                <div class="card" style="padding: 12px 18px; margin-bottom: 14px;">
                    <div style="font-weight: 700; font-size: 13.5px; color: var(--text-muted); margin-bottom: 6px;">WORD BANK (Click chip to insert into focused blank):</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        <span class="word-chip" data-word="bitterly">bitterly</span>
                        <span class="word-chip" data-word="deeply">deeply</span>
                        <span class="word-chip" data-word="highly">highly</span>
                        <span class="word-chip" data-word="perfectly">perfectly</span>
                    </div>
                </div>

                <!-- Sentence Container -->
                <div class="card" style="font-size: 16px; line-height: 2.1;">
                    <p>1. Participants were <input type="text" class="blank-input" data-ans="bitterly" style="width:130px;"> disappointed by the outcome.</p>
                    <p>2. Gus Cooney was <input type="text" class="blank-input" data-ans="deeply" style="width:130px;"> interested in social interactions.</p>
                    
                    <div class="action-row" style="margin-top: 16px;">
                        <button class="btn-action btn-primary" onclick="checkAnswers(this)">Check Answers</button>
                        <button class="btn-action" onclick="revealAnswers(this)">Reveal Keys</button>
                        <button class="btn-action" onclick="resetAnswers(this)">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

### D. IELTS Speaking Masterclass (`data-skill="review"`)

```html
<section class="slide" id="slide-16" data-skill="review">
    <div class="slide-inner">
        <div class="notebook">
            <div class="skill-stripe" style="background: var(--col-review);"></div>
            <div class="page-content">
                <div class="slide-header">
                    <div class="slide-title-group">
                        <span class="skill-badge" style="background: var(--col-review);">IELTS Speaking Masterclass</span>
                        <h2 class="slide-title">Parts 1, 2 &amp; 3: Feelings, Memories &amp; Appearance</h2>
                    </div>
                    <div class="slide-number">16 / 17</div>
                </div>

                <div class="two-col" style="flex: 1; min-height: 0; gap: 16px;">
                    <!-- Left: Part 1 & Part 3 -->
                    <div style="display: flex; flex-direction: column; gap: 12px; flex: 1;">
                        <div class="card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--col-review); margin-bottom: 6px;">Part 1: Quick-Fire Interview</h4>
                            <p style="font-size: 14.5px; line-height: 1.6;"><strong>Q:</strong> Do you prefer buying clothes alone or with friends?<br>
                            <em>"To be completely honest, I lean towards shopping by myself..."</em></p>
                        </div>

                        <div class="card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--col-grammar); margin-bottom: 6px;">Part 3: Abstract Discussion</h4>
                            <p style="font-size: 14.5px; line-height: 1.6;"><strong>Q:</strong> Why do people place so much value on physical appearance?<br>
                            <em>"Psychologically, this stems from the halo effect..."</em></p>
                        </div>
                    </div>

                    <!-- Right: Part 2 Cue Card & Band 8 Model -->
                    <div class="card" style="flex: 1.1; border-top: 4px solid var(--col-review); padding: 18px; overflow-y: auto;">
                        <div class="cue-card-box" style="background: #f0fdf4; border: 1.5px dashed #22c55e; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
                            <strong style="color: #15803d; font-size: 15px;">Describe an extraordinary experience you had:</strong>
                            <ul style="font-size: 13.5px; margin-top: 6px; padding-left: 18px; line-height: 1.5;">
                                <li>Where and when it happened</li>
                                <li>Who you were with</li>
                                <li>Explain why this experience was so memorable</li>
                            </ul>
                        </div>
                        <div style="font-size: 14.5px; line-height: 1.7; color: var(--text-dark);">
                            <strong style="color: var(--col-review);">Band 8.0 Response:</strong><br>
                            <em>"I’d like to talk about night kayaking in a bioluminescent bay in Puerto Rico. As we paddled through the mangrove channels, the water literally lit up with neon-blue flashes..."</em>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

## 6. Logic Engine Reference & Interactive Attributes

| Attribute | Elements | Purpose | Example |
| :--- | :--- | :--- | :--- |
| `data-skill` | `<section class="slide">` | Categories tab highlight & vertical navigation (`read`, `grammar`, `vocab`, `write`, `review`, `title`, `section`). | `<section class="slide" data-skill="read">` |
| `data-ans` | `<input>`, `<select>` | Correct answers (case-insensitive, pipe-separated `\|` for acceptable alternatives). | `data-ans="bitterly\|deeply"` |
| `data-correct` | `.opt-card` | Marks correct multiple-choice card (`true` / `false`). | `<div class="opt-card" data-correct="true">` |
| `data-q` | `<span>`, `<button>`, `.q-card` | Question key linking question stem to evidence spans. | `data-q="kw-1"` |
| `data-ev` | `<button>`, `.syn-btn` | ID of the target evidence sentence `<mark id="...">`. | `data-ev="ev-kw-1"` |
| `data-word` | `.word-chip` | Word value placed into focused blank input on click. | `<span class="word-chip" data-word="bitterly">` |

### Smart Input Normalization
`deckEngine.checkAnswers` automatically normalizes:
- **Curly / Smart Quotes & Apostrophes**: `’`, `‘`, `` ` `` $\rightarrow$ `'`
- **Smart Double Quotes**: `“`, `”` $\rightarrow$ `"`
- **Multiple Whitespaces**: Collapsed to single space

---

## 7. Teacher Keybindings & Classroom HUD Cheatsheet

| Key / Tool | Action | Description |
| :---: | :---: | :--- |
| <kbd>→</kbd> / <kbd>Space</kbd> / <kbd>PageDown</kbd> | **Next Slide** | Move to next slide. |
| <kbd>←</kbd> / <kbd>PageUp</kbd> | **Previous Slide** | Move to previous slide. |
| <kbd>E</kbd> | **Step Reveal** | Socratic single-item answer reveal. |
| <kbd>G</kbd> | **Slide Grid Navigator** | Fullscreen visual slide browser with live search. |
| <kbd>T</kbd> | **Classroom Timer** | Interactive countdown timer (1m, 2m, 5m, 10m) with alert chime. |
| <kbd>R</kbd> | **Student Picker** | Random student selector wheel. |
| <kbd>N</kbd> | **Presenter Notes** | Side drawer with teacher guidance notes. |
| <kbd>Z</kbd> | **Paragraph Loupe** | Magnifier zoom on reading text paragraphs. |
| <kbd>H</kbd> | **Teacher Highlighter** | Multi-color live marker (Yellow, Green, Cyan, Coral). |
| <kbd>L</kbd> | **Laser Pointer** | Glowing presentation laser pointer. |
| <kbd>P</kbd> / <kbd>C</kbd> | **Annotation Pen / Clear** | Live whiteboard drawing on slides. |
| <kbd>B</kbd> / <kbd>W</kbd> | **Blackout / Whiteout** | Screen mute to focus attention on the teacher. |
| <kbd>S</kbd> | **Spotlight Dimmer** | Circular dimmer mask focusing on mouse cursor. |
| <kbd>Shift+A</kbd> | **Aspect Ratio Switcher** | Toggle between 16:9 and 4:3 presentation modes. |
| <kbd>Shift+T</kbd> | **Theme Switcher** | Cycle color themes (*Bold Signal, Dark Slate, Emerald, Crimson*). |
| <kbd>Shift+X</kbd> | **Toolkit HUD Toggle** | Collapse / expand floating teacher toolkit. |
| <kbd>+</kbd> / <kbd>−</kbd> / <kbd>0</kbd> | **Font Scale** | Dynamic content-only font scaling (75% to 150%) and reset. |
| <kbd>F</kbd> | **Fullscreen** | Toggle native browser fullscreen mode. |
| <kbd>?</kbd> | **Shortcuts Cheatsheet** | Opens keyboard shortcuts help modal. |

---

## 8. Quality Assurance & Deployment Checklist

Before finalizing any new presentation deck, complete this verification checklist:

1. [ ] **Title Slide**: Contains clean module badges, main title, subtitle, and clickable 4-skill syllabus cards.
2. [ ] **Split-View Reading**: Paragraphs tagged with `<span class="para-tag">[Paragraph X]</span>`.
3. [ ] **Dual-Color Synonym Pairing**:
   - Question keywords wrapped in `<span class="syn-pair-1" data-q="...">` (Green).
   - Answer paraphrases wrapped in `<span class="syn-pair-2" data-q="...">` (Purple).
   - Evidence marks `<mark class="evidence" id="ev-...">` contain matching spans.
4. [ ] **Action Rows**: Fixed on a single horizontal row (`Check Answers`, `👉 Step Reveal (E)`, `Reveal Keys`, `Reset`).
5. [ ] **Smart Validation**: All `<input class="blank-input">` and `<select class="select-input">` have accurate `data-ans="..."` attributes.
6. [ ] **Speaking Masterclass & Rewriting**: Includes Part 2 cue cards and academic rewriting models where appropriate.
7. [ ] **Module Summary Slide**: Contains the core competency checklist.
8. [ ] **Rebuild & Index Sync**: Rebuild the master bundle (`node build-bundle.js`) and update the master index (`npm run update-index`).

---

## 9. Authoring Rules for 100% Complete Syllabus Integration

When building HTML presentations from course markdown documents (`md files/`):

### A. Full Content Guarantee (No Missing Exercises)
- **Zero Omissions**: Include **every single exercise, vocabulary drill, grammar rule, sentence completion item, and model answer** from the source markdown document.
- **No Empty Placeholders**: Every slide must have its template slots properly populated with full exercises, rules, or explanations.

### B. List of Headings UI Standard
- In Matching Headings reading slides, **never cram all headings into a single continuous paragraph**.
- Always render the **List of Headings as a dedicated card** with:
  1. Font size of **`18.5px`–`19px`** with generous line height (`1.55`).
  2. **One line per heading**.
  3. Fixed-width monospace Roman numerals (`<strong style="font-family:var(--font-mono); width:32px; display:inline-block;">i.</strong>`) styled with `var(--col-reading)`.

```html
<div class="card" style="background:#ffffff; border:1.5px solid #cbd5e1; border-left:6px solid var(--col-reading); padding:16px 20px; margin-bottom:12px; box-shadow:0 2px 8px rgba(0,0,0,0.03);">
    <div style="font-size:18px; font-weight:800; text-transform:uppercase; letter-spacing:0.04em; color:var(--col-reading); margin-bottom:10px;">📋 List of Headings</div>
    <div style="display:flex; flex-direction:column; gap:8px; font-size:18.5px; line-height:1.55; color:#0f172a;">
        <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:32px; display:inline-block;">i.</strong> Sharing half-understood ideas</div>
        <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:32px; display:inline-block;">ii.</strong> An old situation that’s now more intense</div>
    </div>
</div>
```

### D. Strict 1-Question-Per-Slide Reading Walkthrough Requirement
- **Individual Question Isolation**: **Every single reading question MUST have its own dedicated walkthrough slide** (`template="walkthrough"`).
- **Zero Question Grouping**: **Never combine multiple questions (e.g. Q7–Q10, Q1–Q5) into a single walkthrough slide.**
- **Components of Every Walkthrough Slide**:
  1. **Top Box (`slot="passage-text"`)**: The exact isolated paragraph/sentence containing the evidence, wrapped in `<mark class="evidence">` with dual-color synonym tags.
  2. **Bottom Box (`slot="question-text"` & `slot="input-area"`)**: The single question card with interactive input (`<select>` or `<input>`), `💡 Evidence` button, and rich explanation breakdown (`slot="explanation"`).
  3. **Action Row**: `Check Answer`, `👉 Step Reveal (E)`, `Show Evidence / Highlights`, and `Reset`.
- **Universality**: Applies across all question types: Matching Headings, True/False/Not Given, Yes/No/Not Given, Multiple Choice, Sentence Completion, Summary Completion, Flowchart Completion, and Matching Information.

---

### E. Standard Template Slot Directory

| Template ID | Primary Slots | Fallback Aliases | Description |
| :--- | :--- | :--- | :--- |
| `tmpl-grammar-masterclass` | `rules`, `contrast-card` | `content` | Left rule cards + right common error contrast box. |
| `tmpl-writing-model` | `prompt`, `essay`, `annotations` | `left-col`, `model-essay` | Left prompt & tips + right scrollable model essay with phrase popovers. |
| `tmpl-reading-flowchart` | `passage`, `flowchart` | `questions` | Left reading pane + right interactive flowchart step cards. |
| `tmpl-gap-fill-passage` | `passage`, `rules-col` | `content` | Interactive cloze passage + right grammatical/lexical rules column. |
| `tmpl-walkthrough` | `passage-header`, `passage-text`, `question-text`, `input-area`, `explanation` | — | Focused 1-question deep dive with verbatim excerpt. |
