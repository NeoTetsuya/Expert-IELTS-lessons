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
│   ├── grammar-reference.js           # Interactive grammar handbook popup viewer
│   ├── reading-walkthrough.js         # Interactive embedded modal viewer for deep reading walkthroughs
│   ├── presentation-tools.js          # Toolbar HUD coordinator & key dispatcher
├── reading explanations - walkthrough/ # Standalone deep-dive IELTS reading question walkthrough masterclasses
│   ├── expert 5/
│   │   ├── module-4a-reading-question-walkthrough.html
│   │   └── ...
│   └── expert 6/
│       ├── module-1a-reading-question-walkthrough.html
│       └── ...
├── grammar exercises/             # Standalone interactive Grammar & Language Development practice pages
│   └── expert 6/
│       ├── module_1_language_development.html
│       ├── module_2_language_development.html
│       └── module_3_language_development.html
├── expert 5/
│   ├── module-04.html
│   └── ...
├── expert 6/
│   ├── module-01.html
│   ├── module-02.html
│   ├── module-03.html
│   └── ...
└── index.html                         # Master Course Hub & Launch Dashboard (course decks only)
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
  2. **Option Box (For Summary Completion with a Box)**: Include the **A–I / A–L option box chips** directly above the question card so students see the word bank.
  3. **Bottom Box (`slot="question-text"` & `slot="input-area"`)**: The single question card with interactive input (`<select>` or `<input>`), `💡 Evidence` button, and rich explanation breakdown (`slot="explanation"`).
  4. **Action Row**: `Check Answer`, `👉 Step Reveal (E)`, `Show Evidence / Highlights`, and `Reset`.
- **Universality**: Applies across all question types: Matching Headings, True/False/Not Given, Yes/No/Not Given, Multiple Choice, Sentence Completion, Summary Completion, Flowchart Completion, and Matching Information.

### E. Declarative Data Separation Architecture (`module-XX-data.js`)
- **Single Source of Truth**: Extract all passages, questions, word banks, box options, walkthroughs, grammar datasets, and charts into `module-XX-data.js`.
- **Clean Declarative HTML**: The `.html` file should contain `<slide-card template="..." data-bind="...">` elements without sprawling hardcoded duplicate markup.
- **100% Unabridged Passage Fidelity**: Passages in `-data.js` must contain **every paragraph (Intro, A through G)** word-for-word from the master markdown file. Never truncate, abbreviate, or omit paragraphs.
- **No Standalone Reading Questions**: Reading tasks must always be presented in Split-View (`template="reading-split"`), never as standalone gap-fill slides without the passage.

---

### G. Chart Persistence on ALL Writing Task 1 Slides
- **Context-Preserving Dual Pane**: For all Writing Task 1 exercises (data selection, comparative sentence gap-fills, linking phrases, planning, coherence criteria, and model answers), **the prompt and interactive chart MUST be visible on EVERY exercise slide**.
- **Implementation**: Use `template="writing-model"`. Place the chart container in `slot="prompt"` on the left (`<div class="ielts-chart-container" id="chart-xxx-sYY" data-chart-type="..." data-chart-config="..."></div>`), and the interactive exercise or model in `slot="essay"` and `slot="annotations"` on the right.
- **Unique Chart Element IDs**: Each slide instance must have a unique DOM ID (e.g. `chart-womens-earnings-s42`, `chart-womens-earnings-s43`, `chart-womens-earnings-s44`) registered in `DOMContentLoaded`.

---

### H. Universal Grammar Reference Integration
- On all Grammar Masterclass and Practice slides, integrate the **Grammar Reference Modal trigger**:
  ```html
  <button class="deck-btn grammar-ref-btn" data-grammar-ref="https://neotetsuya.github.io/Expert-IELTS/expert%206/module_3a_comparative_forms.html" style="background:linear-gradient(135deg, #f43f5e 0%, #e11d48 100%); color:#ffffff; font-weight:700; border:none; padding:8px 16px; border-radius:8px; display:inline-flex; align-items:center; gap:8px; cursor:pointer; font-size:15px; box-shadow: 0 4px 12px rgba(244,63,94,0.3);">
      📖 Open Comparative Forms Handbook
  </button>
  ```
- Handled automatically by `GrammarReferenceEngine` in `js/deck-bundle.js`.

---

### I. Universal Reading Walkthrough Masterclass Integration
- For all Reading Split-View exercises (`tmpl-reading-split`) and Walkthrough slides (`tmpl-walkthrough`), link the corresponding standalone **Reading Question Walkthrough Masterclass**:
  ```html
  <!-- Declarative Slide-Card Syntax -->
  <slide-card template="reading-split" skill="read" data-bind="reading4a" 
              badge="Reading 4a • Matching Sentence Endings" title="Monitoring Fitness"
              walkthrough-url="../reading%20explanations%20-%20walkthrough/expert%205/module-4a-reading-question-walkthrough.html" 
              walkthrough-title="Module 4a: Monitoring Fitness — Deep Question Walkthrough">
  </slide-card>
  ```
- Alternatively, declare it in the module dataset (`module-XX-data.js`):
  ```javascript
  reading4a: {
      walkthroughUrl: "../reading%20explanations%20-%20walkthrough/expert%205/module-4a-reading-question-walkthrough.html",
      walkthroughTitle: "Module 4a: Monitoring Fitness — Deep Question Walkthrough",
      passage: `...`,
      questions: [...]
  }
  ```
- **Automatic Button Generation**: `TemplateEngine` automatically appends a high-impact **`🚀 Question Walkthrough`** button to the slide's `.action-row`.
- **Pedagogical Benefits**:
  - **Zero Tab Switching**: Clicking the button pops open an interactive modal viewer directly over the slide via `ReadingWalkthroughEngine`.
  - **Rich Teaching Tools**: Each standalone walkthrough includes Vietnamese deep-dive explanations, question selector chips, List Mode, Option Bank (A–G), Paraphrase Matrix, and Core Lexicon.
  - **Full Control**: Includes Fullscreen (`⛶`), Open in New Tab (`↗`), and quick dismiss with <kbd>Esc</kbd>.
  - **Hub Cleanliness**: Walkthrough masterclasses reside in `reading explanations - walkthrough/` and are strictly **excluded from `index.html`** (which remains dedicated to main course presentation decks).

---

### J. Standalone Grammar & Language Development Exercises Integration
- For all Grammar Masterclass (`tmpl-grammar-masterclass`), Gap-Fill Practice (`tmpl-gap-fill-passage`), Exercise Grid (`tmpl-exercise-grid`), or Grammar Summary slides, link the corresponding standalone **Grammar & Language Development Practice Page**:
  ```html
  <!-- Declarative Slide-Card Syntax -->
  <slide-card template="grammar-masterclass" skill="grammar" 
              title="Grammar 1a: Present Simple vs. Present Continuous (Ex 1b)"
              grammar-url="../grammar%20exercises/expert%206/module_1_language_development.html" 
              grammar-title="Module 1: Language Development - Present Tenses">
  </slide-card>
  ```
- Alternatively, declare it in the module dataset (`module-XX-data.js`):
  ```javascript
  grammar1a: {
      grammarUrl: "../grammar%20exercises/expert%206/module_1_language_development.html",
      grammarTitle: "Module 1: Language Development - Present Tenses",
      ...
  }
  ```
- **Automatic Button Generation**: `TemplateEngine` automatically appends a dedicated purple-accented **`📝 Grammar Exercises`** button to the slide's `.action-row`. If the template has no action row, one is automatically created and attached.
- **Pedagogical Benefits**:
  - **Embedded Modal Viewer**: Click opens the complete interactive practice application over the slide via `GrammarReferenceEngine` with dynamic badge (`📝 Grammar Practice`).
  - **Instant Expansion**: Includes Fullscreen toggle (`⛶`), Open in New Tab (`↗`), and quick dismiss with <kbd>Esc</kbd>.
  - **Hub Cleanliness**: Standalone grammar exercise pages reside in `grammar exercises/` and are strictly **excluded from `index.html`** (keeping the master hub focused on course presentations).

---

### K. Strict Markdown Scope & Curriculum Boundary
- **Zero Extraneous Material**: Keep ONLY content appearing in the source markdown file (`md files/e6/m{X} content.md`).
- **No Unrequested Speaking**: If the markdown file does not have a speaking section, do NOT generate speaking slides.
- **No Phantom Modules**: Never include vocabulary or grammar topics not specified in the master markdown document.

---

### L. Unicode Typography Standard (No LaTeX Math Syntax)
- In slide texts and data annotations, **never write LaTeX math symbols** like `$\rightarrow$` or `$\times$`.
- Always use clean Unicode glyphs: `➔` or `→`, `×`, `÷`, `±`, `%`, `°`.

---

### M. Mandatory Module Review & Mastery Checklist Slide
- Every single course module **must conclude with a dedicated Review Checklist slide**:
  ```html
  <slide-card template="summary-checklist" skill="review" title="Module XX Mastery &amp; Exam Checklist" subtitle="Review core test strategies and linguistic competencies mastered across Module XX.">
      <div slot="grid">
          <div class="card" style="border-left:6px solid var(--col-reading); padding:24px 28px; border-radius:14px;">
              <div style="font-size:22px; font-weight:800; color:var(--col-reading); margin-bottom:12px;">📖 Reading Competencies</div>
              ...
          </div>
          <div class="card" style="border-left:6px solid var(--col-writing); padding:24px 28px; border-radius:14px;">
              <div style="font-size:22px; font-weight:800; color:var(--col-writing); margin-bottom:12px;">✍️ Grammar &amp; Task 1 Data Analytics</div>
              ...
          </div>
      </div>
  </slide-card>
  ```

---

### N. Tag Balancing & Verification Protocol
- Every `<slide-card>` MUST have a matching `</slide-card>` and MUST NOT be nested.
- Always execute the verification command before finalizing:
  ```bash
  node -e "const fs = require('fs'); const c = fs.readFileSync('expert 6/module-XX.html', 'utf8'); console.log('Open:', (c.match(/<slide-card/g)||[]).length, 'Close:', (c.match(/<\/slide-card>/g)||[]).length);"
  ```
- Total slide count in `-data.js` (`slidesCount`) must match the actual number of `<slide-card>` tags in the `.html` file.

---

### O. Standard Template Slot Directory

| Template ID | Primary Slots | Fallback Aliases | Description |
| :--- | :--- | :--- | :--- |
| `tmpl-title` | `badge`, `title`, `subtitle`, `tags`, `roadmap` | `content` | Title slide with module info, tags, and clickable syllabus cards. |
| `tmpl-section-divider` | `badge`, `num`, `sublabel`, `title`, `subtitle`, `content` | `left-col`, `content` | Modern split section divider: Left gradient panel with giant section number (`4a`, `5a`) + Right panel with curriculum topics. |
| `tmpl-strategy` | `sentences`, `guide` | `two-col` | Pre-reading question keyword deconstruction with step reveal. |
| `tmpl-reading-split` | `passage`, `questions` / `summaryBox` | `content` | Left unabridged reading passage + right questions & option boxes. |
| `tmpl-walkthrough` | `passage-header`, `passage-text`, `question-text`, `input-area`, `explanation` | — | Focused 1-question deep dive with verbatim excerpt and option box. |
| `tmpl-grammar-masterclass` | `rules`, `contrast-card` | `content` | Left rule cards + right common error contrast box & grammar reference modal button. |
| `tmpl-writing-model` | `prompt`, `essay`, `annotations` | `left-col`, `model-essay` | Left prompt & persistent chart + right scrollable model essay or interactive exercises. |
| `tmpl-reading-flowchart` | `passage`, `flowchart` | `questions` | Left reading pane + right interactive flowchart step cards. |
| `tmpl-gap-fill-passage` | `passage`, `rules-col` | `content` | Interactive cloze passage + right grammatical/lexical rules column. |
| `tmpl-exercise-grid` | `grid` | `content` | Multi-card interactive exercise layout for sentence transformations & drills. |
| `tmpl-summary-checklist` | `subtitle`, `grid` | `content` | Module Mastery review checklist with competency cards. |

---

### O. Modern Section Divider Preset (`tmpl-section-divider`)

The Section Divider preset features a high-impact split-screen architecture:
- **Left Column (~35% width)**: Features a dynamic skill gradient, `.section-module-tag`, giant serif `.section-number` (e.g., `4a`, `5b`), and italic `.section-sublabel` (`IELTS Preparation`).
- **Right Column (~65% width)**: Displays the styled `.section-title`, `.section-desc`, and `.section-topics` with colored agenda dots.

#### Standard Declarative Authoring:
```html
<!-- Section Divider Preset Example -->
<slide-card template="section-divider" skill="read" badge="Module 5a" num="5a">
    <span slot="title">Journeys<br><span style="font-style:italic; color:#b45309;">&amp; Global Travel</span></span>
    <span slot="subtitle">Reading Detailed Information · -ing vs Infinitives · Travel Lexicon · Line Graph Models</span>
    <div slot="content">
        <div class="section-topic">
            <div class="section-topic-dot" style="background:#b91c1c"></div>
            <span>1. Reading: "A different way to see the world" (Mark Beaumont Cycling)</span>
        </div>
        <div class="section-topic">
            <div class="section-topic-dot" style="background:#b91c1c"></div>
            <span>2. Language Development: -ing Forms and Infinitives (with/without to)</span>
        </div>
        <div class="section-topic">
            <div class="section-topic-dot" style="background:#15803d"></div>
            <span>3. Vocabulary: Travel, Transport, Compound Nouns &amp; Phrasal Verbs</span>
        </div>
        <div class="section-topic">
            <div class="section-topic-dot" style="background:#b91c1c"></div>
            <span>4. Writing Task 1: Describing Line Graphs (Global Tourism Income 1960–2010)</span>
        </div>
    </div>
</slide-card>
```

---

### O. Dedicated 'Before You Read' Lead-in Preset

Never combine pre-reading warm-up questions with the reading passage. Always allocate a dedicated `template="exercise-grid"` slide using `.discuss-card` components:

```html
<!-- Dedicated Before You Read Preset -->
<slide-card template="exercise-grid" skill="read" title="Reading 1a Lead-in: Before You Read &amp; Smart Phone Photography (Ex 1 &amp; 2)" instruction="Discuss photography reliability, images, and camera-generated artefacts.">
    <div slot="grid" style="display:grid; grid-template-columns:1.05fr 0.95fr; gap:24px;">
        <!-- Left Column: Interactive Discussion Cards -->
        <div>
            <h3 style="font-size:22px; font-weight:700; color:var(--text-dark); margin-bottom:14px;">💬 Warm-Up Discussion (Ex 1)</h3>
            <div class="discuss-card">
                <div class="discuss-num" style="background:var(--col-reading);">1</div>
                <div class="discuss-text">What is your favourite <strong>image</strong> on your smart phone? Where did you find or take it?</div>
            </div>
            <div class="discuss-card">
                <div class="discuss-num" style="background:var(--col-reading);">2</div>
                <div class="discuss-text">Do you think people and objects in photographs appear the same as in real life? Why or why not?</div>
            </div>
            <div class="discuss-card">
                <div class="discuss-num" style="background:var(--col-reading);">3</div>
                <div class="discuss-text">Are photographs a more reliable record of reality than written descriptions?</div>
            </div>
        </div>

        <!-- Right Column: Pre-taught Vocabulary & Context Exploration -->
        <div>
            <h3 style="font-size:22px; font-weight:700; color:var(--text-dark); margin-bottom:14px;">📸 Vocabulary &amp; Article Preview (Ex 2)</h3>
            <div class="card" style="padding:18px 22px; border-left:4px solid var(--col-reading); margin-bottom:12px; font-size:18px; line-height:1.65;">
                <strong>• Image (noun):</strong><br>
                A picture produced by a camera, on a screen, or drawn on a surface.
            </div>
            <div class="card" style="padding:18px 22px; border-left:4px solid var(--col-vocab); font-size:18px; line-height:1.65; background:#f8fafc;">
                <strong>• Photographic Artefact:</strong><br>
                Visual anomalies (orbs, mists, reflections) created purely by camera mechanics rather than supernatural phenomena.
            </div>
    </div>
</slide-card>

---

### P. Reusable IELTS Reading Question Type Registry (15 Standard Types)

The template engine incorporates a built-in **`ReadingQuestionRegistry`** (`window.IELTSQuestionTypes`) covering all 15 official IELTS Academic Reading question types. Authors specify `type: "<type-id>"` on question items in `-data.js`, and the engine automatically generates unrevealed inputs (e.g., `-- Select Answer --`), option boxes, heading lists, and text blanks without spoiling keys:

| Type ID | Aliases | Interactive Input Control | Default IELTS Rubric |
| :--- | :--- | :--- | :--- |
| `multiple-choice` | `mcq`, `single-choice` | `<select>` with options A–D | "Choose the correct letter, A, B, C or D." |
| `multiple-choice-multi` | `mcq-multi`, `multi-select` | Checkbox group with selection limit | "Choose the correct letters from the options below." |
| `tfng` | `true-false-not-given` | `<select>` (`TRUE`, `FALSE`, `NOT GIVEN`) | Factual claims verification. |
| `ynng` | `yes-no-not-given` | `<select>` (`YES`, `NO`, `NOT GIVEN`) | Writer's views / claims verification. |
| `matching-headings` | `headings`, `paragraph-headings`| Roman numeral list (`i–x`) + `<select>` | "Choose the correct heading from the list below." |
| `matching-features` | `features`, `categorization` | `<select>` of researchers/groups A–D | "Match each statement with the correct group." |
| `matching-information`| `which-paragraph` | `<select>` of Paragraphs A–G | "Which paragraph contains the following information?" |
| `matching-sentence-endings` | `sentence-endings` | `<select>` of endings list A–H | "Complete each sentence with the correct ending." |
| `sentence-completion` | `gap-fill` | Blank text input (`.blank-input`) | "Choose NO MORE THAN TWO WORDS." |
| `summary-completion` | `summary` | Continuous gap-fill + optional Word Bank | "Complete the summary below." |
| `summary-box` | `summary-completion-box` | Visual `.box-chip` container + `<select>` | "Complete the summary using the list of words." |
| `notes-completion` | `notes` | Bulleted notes gap-fill | "Complete the notes below." |
| `table-completion` | `table` | Tabular matrix gap-fill | "Complete the table below." |
| `flowchart-completion`| `flowchart` | Sequential step cards linked with arrows | "Complete the flow-chart below." |
| `short-answer` | `short_answer` | Direct question gap-fill | "Choose NO MORE THAN THREE WORDS." |
| `diagram-labelling` | `diagram`, `map-labelling` | Technical diagram label gap-fill | "Label the diagram below." |

---

### Q. Dynamic Content Auto-Resizer & Blank Space Optimizer

The presentation engine features an automatic **bidirectional content scaler and spacer** (`DeckEngine.autoFitSlide`) that ensures slides never feel empty, cramped, or clipped:

1. **Underflow Detection (Spare Blank Space)**:
   - When active content takes up less than `78%` of the notebook's available height, the engine dynamically activates `.slide-spacious`.
   - **Font Scaling**: Automatically scales `--font-scale` up to **+28%** (1.00 ➔ 1.28).
   - **Line Spacing**: Dynamically opens line height up to **1.85 – 2.0** (`--line-height-auto`).
   - **Card Geometry**: Increases card padding from `16px 20px` to `22px 28px` and expands inter-card gaps so content fills the page harmoniously.

2. **Overflow Protection (Dense Content)**:
   - When content exceeds the slide viewport, the engine scales the page down cleanly using `transform: scale(...)` without clipping or horizontal overflow.

---

### Q. Native IELTS Task 1 Chart Integration (`DeckCharts`)

All Task 1 data analytics use zero-dependency, lightweight, responsive SVG charts:

#### 1. HTML Container Structure:
```html
<div class="ielts-chart-container" 
     id="chart-unique-id" 
     data-chart-type="multi-line" 
     style="width:100%; background:#ffffff; border-radius:12px; padding:12px; border:1.5px solid var(--border-soft, rgba(0,0,0,0.08)); box-shadow:0 2px 8px rgba(0,0,0,0.03); margin-bottom:12px;">
</div>
```

#### 2. Dataset Schema in `-data.js`:
```javascript
charts: {
    tourismIncome: {
        title: "Income from Tourism by Region (1960–2010)",
        xAxis: ["1960", "1970", "1980", "1990", "2000", "2005", "2010"], // or xCategories
        yAxisLabel: "Billion US Dollars", // Automatically formats values as $XXB
        series: [
            { name: "Europe", data: [40, 110, 240, 220, 360, 440, 480], color: "#2563eb" },
            { name: "Asia and Pacific", data: [10, 30, 80, 110, 190, 290, 380], color: "#16a34a" },
            { name: "Americas", data: [25, 60, 140, 160, 230, 250, 280], color: "#ea580c" },
            { name: "Africa", data: [5, 10, 15, 12, 18, 22, 25], color: "#7c3aed" }
        ]
    }
}
```

#### 3. Chart Mounting in Module Footer:
```javascript
deckCharts.register('chart-unique-id', 'multi-line', module5Data.charts.tourismIncome);
---

### R. Title Slide Syllabus & Dataset Architecture Rules

To guarantee that the **Lesson Syllabus** and **Split-View Reading Passages** render correctly without blank areas:

#### 1. Title Slide Syllabus Requirement (`slot="roadmap"`):
Always populate `slot="roadmap"` with structured skill cards on Slide 1:
```html
<slide-card template="title" skill="title">
    <span slot="badge">Module 06</span>
    <span slot="title">Buying <span class="title-amp">&amp;</span> Selling</span>
    <span slot="subtitle">IELTS Academic Preparation Masterclass<br>Food Systems, Word-of-Mouth Marketing, be going to, Linking Words &amp; Opinion Essays</span>
    <div slot="roadmap">
        <div class="title-skill-card" style="cursor:pointer;" onclick="deckEngine.jumpToSkill('read')">
            <div class="title-skill-name" style="color:var(--col-reading)">📖 Reading 6a</div>
            <div class="title-skill-desc">The Future of Food &amp; Summary Completion</div>
        </div>
        <div class="title-skill-card" style="cursor:pointer;" onclick="deckEngine.jumpToSkill('grammar')">
            <div class="title-skill-name" style="color:var(--col-grammar)">📚 Grammar 6a</div>
            <div class="title-skill-desc">be going to Intentions &amp; Predictions</div>
        </div>
        <div class="title-skill-card" style="cursor:pointer;" onclick="deckEngine.jumpToSkill('write')">
            <div class="title-skill-name" style="color:var(--col-writing)">✍️ Writing 6a</div>
            <div class="title-skill-desc">Paragraph Coherence &amp; Local Food Diets</div>
        </div>
        <div class="title-skill-card" style="cursor:pointer;" onclick="deckEngine.jumpToSkill('vocab')">
            <div class="title-skill-name" style="color:var(--col-vocab)">🛍️ Vocabulary 6b</div>
            <div class="title-skill-desc">Types of Shops, Nouns &amp; Prepositions</div>
        </div>
        <div class="title-skill-card" style="cursor:pointer;" onclick="deckEngine.jumpToSkill('read')">
            <div class="title-skill-name" style="color:var(--col-reading)">📖 Reading 6b</div>
            <div class="title-skill-desc">Word-of-Mouth Marketing Word Bank</div>
        </div>
        <div class="title-skill-card" style="cursor:pointer;" onclick="deckEngine.jumpToSkill('write')">
            <div class="title-skill-name" style="color:var(--col-writing)">✍️ Writing 6b</div>
            <div class="title-skill-desc">Sentence Linking &amp; Consumerism Essay</div>
        </div>
    </div>
</slide-card>
```

#### 2. Dataset Script Loading Order:
The module dataset (`module-XX-data.js`) **MUST** be loaded **BEFORE** the template engine and bundle scripts at the bottom of the HTML file:
```html
<!-- 1. Curriculum Dataset First -->
<script src="module-06-data.js"></script>

<!-- 2. Master Engine & Bundles -->
<script src="../js/template-engine.js"></script>
<script src="../js/deck-bundle.js"></script>
```

#### 3. Reading Dataset Keys in `-data.js`:
In reading datasets, the property name for summary passages must strictly be `summaryText` (with optional `wordBank: [...]` array):
```javascript
reading6a: {
    title: "The Future of Food?",
    passage: `...`,
    summaryText: `Both companies and 1. <input type="text" class="blank-input" data-ans="governments"> ...`
}

// Ensure global window alias exists for template engine resolution:
window.reading6a = window.module6Data.reading6a;
```

---

### S. Reading Walkthrough & Multi-Question Splitting Rules

To ensure optimal pedagogic clarity, zero UI clipping, and consistency across all presentation modules:

#### 1. Strict 1-Question-Per-Slide Rule (Feature / Multi-Select Splitting):
- **Never group multiple questions onto a single slide.**
- For multi-select or feature selection questions (e.g. *Questions 8–10: Choose THREE letters A–G*), **split each question into its own dedicated `template="walkthrough"` slide**:
  - **Slide A (Question 8 - Feature 1 of 3)**: Verbatim paragraph excerpt with highlighted evidence (`mark.evidence`), single question prompt, single dropdown selector, and dedicated synonym match card.
  - **Slide B (Question 9 - Feature 2 of 3)**: Targeted paragraph excerpt with highlighted evidence, single question prompt, single dropdown selector, and dedicated synonym match card.
  - **Slide C (Question 10 - Feature 3 of 3)**: Targeted paragraph excerpt with highlighted evidence, single question prompt, single dropdown selector, and dedicated synonym match card.

#### 2. Walkthrough Template Slot Standard (`template="walkthrough"`):
- All walkthrough slides must adhere to these exact slot names:
```html
<slide-card template="walkthrough" skill="read" question-num="Question 8 (Feature 1 of 3)" word-count="CHOOSE A–G" strategy="Scan Paragraph 8 for park activities and match against options A–G.">
    <span slot="passage-header">Paragraph 8 • Open Air Dining &amp; Picnics</span>
    <div slot="passage-text">
        There are playgrounds for children, as well as places to sit and relax or 
        <mark class="evidence" id="ev-walk-7b-8">
            <span class="syn-pair-1" data-q="walk-7b-8">share a picnic</span>.
        </mark>
    </div>
    <div slot="question-text">
        Which feature (1 of 3) does the passage mention as an activity the community can enjoy?
    </div>
    <div slot="input-area">
        <select class="select-input" data-ans="C" style="font-weight:700; width:340px;">
            <option value="">Select Feature...</option>
            <option value="A">A movie screenings</option>
            <option value="B">B special dog walking areas</option>
            <option value="C">C places for open air eating</option>
            <option value="D">D children's art clubs</option>
            <option value="E">E gardening activities</option>
            <option value="F">F spaces for informal work meetings</option>
            <option value="G">G organised fitness activities</option>
        </select>
    </div>
    <div slot="explanation">
        <div class="syn-key-box"><span class="syn-tag green">Option C Match:</span> <em>"places for open air eating"</em> ↔ <em>"places to sit and relax or share a picnic"</em></div>
    </div>
</slide-card>
```
- **Prohibited Slots**: Never use `slot="answer-input"` or `slot="synonyms"`. All synonym/paraphrase tags must live inside `<div slot="explanation">` using `<div class="syn-key-box">` elements.

#### 3. Grammar Masterclass Template Standard (`template="grammar-masterclass"`):
- Use `template="grammar-masterclass"` (never `grammar-rule`):
```html
<slide-card template="grammar-masterclass" skill="grammar" title="Grammar 7a Masterclass: The Zero Conditional" subtitle="Master real conditions, general truths, habitual actions and clause punctuation."
            grammar-url="../grammar%20exercises/expert%206/module_1_language_development.html"
            grammar-title="Module 1: Language Development - Present Tenses">
    <div slot="rules">
        <div class="rule-card">
            <div style="font-size:20px; font-weight:800; color:var(--col-grammar); margin-bottom:6px;">1. Structure &amp; General Truths</div>
            <div style="font-size:17px; line-height:1.65;">
                <strong>If / When + present simple, present simple</strong><br>
                Describes situations that always happen as a natural or logical result:<br>
                • <em>"If people live in a small community, they generally feel safer."</em>
            </div>
        </div>
    </div>
    <div slot="contrast-card">
        <div style="font-size:20px; font-weight:800; color:var(--col-grammar); margin-bottom:8px;">⚠️ Negative Conditions (*Unless*)</div>
        <div style="font-size:16.5px; line-height:1.65; color:var(--text-dark); background:rgba(217,119,6,0.08); padding:12px 16px; border-radius:8px; margin-bottom:12px;">
            <strong>Unless = If ... not:</strong><br>
            • <em>"Communities don't work well <strong>unless</strong> they have a central point."</em>
        </div>
        <button class="deck-btn grammar-ref-btn" data-grammar-ref="https://neotetsuya.github.io/Expert-IELTS/expert%205/module_7_conditionals.html">📖 Open Zero Conditional Grammar Handbook</button>
    </div>
</slide-card>
```

---

## 12. Dedicated Academic Vocabulary Hub Architecture (`template="vocab-grid"`)

Every lesson module must include a dedicated **Academic Vocabulary & Collocations Hub** slide (`template="vocab-grid"` or `template="vocab-cards"`) to systematically teach high-yield academic lexicon, collocations, and pronunciation.

### 2-Column Socratic Layout Blueprint
1. **Left Grid (Word Cards)**:
   - 12–16 interactive academic term cards per module.
   - Each card displays: **Term Name**, **Part of Speech Badge** (`adj.`, `noun`, `verb`), **CEFR Level** (`B2`, `C1`), **IPA Phonetic Transcription**, and a direct `🔊` pronunciation trigger.
2. **Right Pane (Live Term Inspector)**:
   - Synchronizes automatically whenever a term card is clicked or step-revealed.
   - Displays:
     - Large Term Header + Phonetics + **3-Accent Speech Triggers** (🇬🇧 UK, 🇺🇸 US, 🇦🇺 AU).
     - **📖 Oxford Academic Definition**.
     - **🔗 High-Scoring IELTS Collocations** (e.g. `extraordinary feat`, `deliberate strategy`).
     - **🎯 IELTS Band 7.5+ Model Example Sentence**.
     - **Passage Context Quote** directly referencing the reading text.

### Data Binding Specification
In `module-XX-data.js`:
```javascript
window.moduleData = {
    // ...
    vocabulary: {
        title: "Module X: Academic Lexicon &amp; Collocations Hub",
        badge: "Vocabulary X • Academic Lexicon",
        subtitle: "Click on any academic term to inspect pronunciation, definitions, and high-scoring IELTS collocations.",
        words: [
            {
                word: "extraordinary",
                ipa: "/ɪkˈstrɔː.dɪn.ər.i/",
                pos: "adj.",
                cefr: "C1",
                def: "Very unusual, remarkable, special, or far beyond what is ordinary.",
                colloc: "extraordinary cyclist • extraordinary achievement • extraordinary journey",
                example: "Mark Beaumont is an extraordinary cyclist who has completed remarkable round-the-world journeys.",
                context: "Para A: 'An extraordinary cyclist, Mark Beaumont, has completed a number of amazing long-distance trips.'"
            },
            // 12-16 words...
        ]
    }
};
```

In `module-XX.html`:
```html
<slide-card template="vocab-grid" skill="vocab" data-bind="vocabulary" badge="Vocabulary 5 • Academic Lexicon" title="Module 5 Academic Lexicon &amp; Collocations Hub"></slide-card>
```

---

## 13. Dual-View Synchronization & Presenter View Parity Protocol

All interactive exercises and highlights must behave with **100% deterministic symmetry** between the **Main Audience View** and the **Presenter View Cockpit** (`Alt+P`):

1. **Unified Reveal Engine**:
   - `window.revealAnswers(this)` directly invokes `deckEngine.revealKeys(container)` and `readingHighlighter.highlightAll(containerId)`.
   - Activating answers immediately applies `.active-syn` to `.syn-pair-1` (🟢 Solid Green) and `.syn-pair-2` (🟣 Solid Purple) on both passage marks and question cards.
2. **In-Place Presenter View Updates**:
   - The Presenter Cockpit live preview scaler (`#cpCurrentSlideScaler`) updates in-place via form synchronization (`syncFormValues`) rather than DOM destruction. This completely prevents screen resizing, letterbox shifts, or viewport flickering.
3. **Multi-Screen Sync Events**:
   - `EXERCISE_ACTION`: Syncs checks, reveals, and resets across windows.
   - `VOCAB_INSPECT`: Syncs term inspection and audio triggers.
   - `STEP_REVEAL_CMD`: Syncs Socratic <kbd>E</kbd> reveals across screens.
   - `EVIDENCE_FOCUS`: Syncs reading passage spotlighting and auto-scrolling.

4. **Distribution Compilation**:
   - Whenever JavaScript or CSS modules are modified, compile the production bundles:
   ```bash
   npm run build
   ```

---

## 14. Universal Reading Highlighter & Synonym Protocol (`js/reading-highlighter.js`)

All IELTS reading passage evidence, question cards, and vocabulary items operate under the **ReadingHighlighter Protocol** to ensure 100% uniformity across walkthroughs, split-views, and flow-chart completions.

### 1. Tri-Color Semantic Synonym Scheme
- **🟢 `.syn-pair-1` (Emerald Green — `#86efac`)**: Anchor concepts, subject nouns, and primary keywords in both question prompt and text.
- **🟣 `.syn-pair-2` (Amethyst Purple — `#d8b4fe`)**: Paraphrase locations, qualifying claims, degrees, or conditions matching the question statement.
- **🔵 `.syn-pair-3` (Sky Blue — `#7dd3fc`)**: Distractors, rebuttals, or trap assertions.

### 2. Universal Evidence ID & Binding Conventions
- In Reading Passages:
  ```html
  <mark class="evidence" id="ev-3a-1" data-q="3a-1">
      <span class="syn-pair-1" data-q="3a-1">extraordinary experiences</span> are 
      <span class="syn-pair-2" data-q="3a-1">pleasurable in the moment</span>...
  </mark>
  ```
- In Question Cards / Flow Chart Cards:
  ```html
  <div class="q-card" data-q="3a-1" data-ev="ev-3a-1">
      <span class="syn-pair-1" data-q="3a-1">Sharing experiences</span> provides 
      <span class="syn-pair-2" data-q="3a-1">immediate and long-term satisfaction</span>.
      <button class="syn-btn" data-q="3a-1" data-ev="ev-3a-1">💡 Evidence</button>
      <div class="item-explanation">...</div>
  </div>
  ```

### 3. Dynamic Interactive Behaviors
1. **Spotlight Context Dimming**: Surrounding paragraphs fade to 32% opacity, focusing student attention directly on the target paragraph and evidence sentence.
2. **Smooth Vertical Centering**: The `.reading-pane` automatically calculates the target evidence offset and scrolls it smoothly into the vertical center.
3. **Keyboard Controls**:
   - <kbd>E</kbd> / <kbd>Shift+E</kbd>: Cycle through evidence forward / backward.
   - <kbd>1</kbd>–<kbd>9</kbd>: Jump directly to Question N evidence.
   - <kbd>Esc</kbd>: Clear spotlight dimming and active highlights.
4. **Dual-Screen Scaler Parity**: All active highlight and synonym states mirror instantly to `#cpCurrentSlideScaler` in the Presenter Cockpit window.








