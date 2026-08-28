# Presentation Creation Guide: IELTS Course HTML Slide Decks

This guide provides the complete blueprint and boilerplate recipes for creating interactive, animation-rich, 16:9 HTML presentations for current and future modules across all course levels (`expert 5/`, `expert 6/`, `expert 7.5/`, etc.).

---

## 1. Directory Structure & File Naming Conventions

All course presentation files adhere to a standardized modular directory layout:

```
HTML presentations/
├── presentation-base.css          # Universal stylesheet (Stage, layout, cards, fonts, HUD)
├── presentation_creation_guide.md # This guide
├── reading_passages_and_questions_guide.md
├── js/                            # Universal modular JavaScript engine
│   ├── deck-engine.js             # Master bundle & auto-loader
│   ├── deck-core.js               # Stage scaling, slide lifecycle & nav
│   ├── deck-components.js         # Auto-hydrates vertical tabs, HUD, action buttons
│   ├── deck-theme-engine.js       # Dynamic theme presets & styling
│   ├── reading-highlighter.js     # Auto-reveals evidence, synonym pairing, smooth scroll
│   ├── reading-grounder.js        # Synonym badge formatting & hover highlights
│   ├── vocab-bank.js              # Click-to-fill chips & speech pronunciation
│   ├── essay-analyzer.js          # Cohesion & structure breakdown tools
│   ├── progress-tracker.js        # Session storage auto-save & score dashboard
│   ├── slide-navigator.js         # Slide Grid search overlay (Key: G)
│   ├── presentation-spotlight.js  # Focus screen mutes (Keys: B / W / S)
│   ├── flashcard-engine.js        # 3D interactive flip cards
│   ├── print-optimizer.js         # Multi-page handout PDF export (Ctrl+P)
│   ├── laser-pointer.js           # Glowing laser pointer cursor (Key: L)
│   ├── pen-annotation.js          # On-slide drawing & sketches (Keys: P / C)
│   ├── classroom-timer.js         # Interactive countdown timer with chime (Key: T)
│   └── presentation-tools.js      # Toolbar HUD coordinator & key dispatcher
├── expert 5/
│   ├── module-04.html
│   ├── module-05.html
│   ├── module-06.html
│   ├── module-07.html
│   └── module-08.html
├── expert 6/
│   ├── module-01.html
│   └── ...
└── expert 7.5/
    ├── module-01.html
    └── ...
```

### Naming Rules:
- **Module Files**: Always name files with clean zero-padded numbers: `module-01.html`, `module-02.html`, ..., `module-10.html`.
- **Links**: Every HTML file in subfolders links to `../presentation-base.css` and `../js/deck-engine.js`.

---

## 2. Minimal Starter HTML Template

Copy this minimal boilerplate to create any new presentation file (e.g. `expert 6/module-01.html`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module 01: [Topic Title] | IELTS Preparation</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=JetBrains+Mono:wght@400..700&display=swap" rel="stylesheet">
    
    <!-- Universal Stylesheet -->
    <link rel="stylesheet" href="../presentation-base.css">

    <!-- Module-Specific Color Theme Overrides -->
    <style>
        :root {
            --col-reading: #2563eb;
            --col-grammar: #ea580c;
            --col-vocab:   #059669;
            --col-writing: #7c3aed;
            --col-review:  #0891b2;
            
            --stage-bg: #0b1120;
            --viewport-bg: radial-gradient(circle at 80% 20%, #1e293b 0%, #0b1120 70%);
        }
    </style>
</head>
<body>
    <div class="deck-viewport">
        <main class="deck-stage" id="deckStage">
            
            <!-- SLIDES GO HERE -->

        </main>
    </div>

    <!-- Universal Presentation Master Engine -->
    <script src="../js/deck-engine.js"></script>
</body>
</html>
```

> [!NOTE]
> **No boilerplate scripts or tab markup needed in the HTML!** [`js/deck-engine.js`](file:///d:/Teaching/HTML%20presentations/js/deck-engine.js) automatically injects the vertical skill tabs, slide counters, font scalers, teacher toolbar, and interactive handlers.

---

## 3. Slide Recipes & Markup Components

### A. Title Slide (`data-skill="title"`)

```html
<section class="slide title-slide" data-skill="title">
    <div class="title-slide-inner">
        <div class="title-notebook">
            <div class="title-left">
                <div class="title-module-badge">Module 01</div>
                <h1 class="title-main">Education <span class="title-amp">&amp;</span> Learning</h1>
                <p class="title-sub">IELTS Academic Preparation Masterclass<br>Higher Education, Language Acquisition, Complex Sentences &amp; Task 2 Essay Structure</p>
            </div>
            <div class="title-right">
                <div style="font-size:18px; font-weight:700; color:var(--text-dark); margin-bottom:12px;">Lesson Syllabus</div>
                <div class="title-skills-grid">
                    <div class="title-skill-card">
                        <div class="title-skill-name" style="color:var(--col-reading)">📖 Reading</div>
                        <div class="title-skill-desc">Skimming &amp; Matching Headings</div>
                    </div>
                    <div class="title-skill-card">
                        <div class="title-skill-name" style="color:var(--col-grammar)">📐 Grammar</div>
                        <div class="title-skill-desc">Complex Sentences &amp; Subordinators</div>
                    </div>
                    <div class="title-skill-card">
                        <div class="title-skill-name" style="color:var(--col-vocab)">🗂️ Vocabulary</div>
                        <div class="title-skill-desc">Academic Collocations &amp; Word Forms</div>
                    </div>
                    <div class="title-skill-card">
                        <div class="title-skill-name" style="color:var(--col-writing)">✍️ Writing</div>
                        <div class="title-skill-desc">Task 2 Agree/Disagree Essay Framework</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

### B. Section Divider Slide (`data-skill="section"`)

```html
<section class="slide" data-skill="section">
    <div class="section-slide">
        <div class="section-inner">
            <div class="section-left" style="background: linear-gradient(135deg, var(--col-reading) 0%, #1e3a8a 100%);">
                <div class="section-module-tag">Module 01 · Part A</div>
                <div class="section-number">1a</div>
                <div class="section-sublabel">Higher Education</div>
            </div>
            <div class="section-right">
                <h2 class="section-title">Academic Journeys</h2>
                <p class="section-desc">Developing core skimming strategies, collocations, and relative clauses.</p>
                <div class="section-topics">
                    <div class="section-topic"><span class="section-topic-dot" style="background:var(--col-reading)"></span> Reading: University Systems &amp; Online Learning</div>
                    <div class="section-topic"><span class="section-topic-dot" style="background:var(--col-grammar)"></span> Grammar: Defining &amp; Non-defining Relative Clauses</div>
                    <div class="section-topic"><span class="section-topic-dot" style="background:var(--col-vocab)"></span> Vocabulary: Academic Lexicon &amp; Prefixes</div>
                    <div class="section-topic"><span class="section-topic-dot" style="background:var(--col-writing)"></span> Writing Task 1: Academic Enrollment Bar Charts</div>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

### C. Split-View Reading Slide (`data-skill="read"`)

Always places the full reading text on the left and interactive questions on the right on a single screen:

```html
<section class="slide" data-skill="read">
    <div class="slide-inner">
        <div class="notebook">
            <div class="skill-stripe" style="background:var(--col-reading)"></div>
            <div class="page-content">
                <div class="slide-header">
                    <span class="skill-badge" style="background:var(--col-reading)">1a Reading</span>
                    <span class="slide-number">1a · MCQ</span>
                </div>
                <h2 class="slide-title">"The Future of Universities" — Multiple Choice (Q1–5)</h2>
                <p class="slide-subtitle">Read the text and choose the correct option A, B, C or D.</p>

                <div class="split-view-container">
                    <!-- LEFT: Reading Passage with Paragraph Tags and Evidence Highlighting -->
                    <div class="reading-pane" id="readingPassage1a">
                        <h3>The Future of Universities in the Digital Era</h3>

                        <p><span class="para-tag">[Paragraph A]</span>
                            <mark class="evidence" id="ev-1a-1">Higher education institutions around the world are undergoing profound transformations. <span class="syn-pair-1" data-q="1a-1">Digital platforms have expanded access</span> to premier coursework, enabling students across continents to <span class="syn-pair-2" data-q="1a-1">participate in advanced seminars</span> without geographical barriers.</mark>
                        </p>

                        <p><span class="para-tag">[Paragraph B]</span>
                            <mark class="evidence" id="ev-1a-2">However, educators emphasize that <span class="syn-pair-1" data-q="1a-2">face-to-face collaborative inquiry</span> remains crucial for cultivating critical thinking. Traditional campus life fosters spontaneous peer debates that <span class="syn-pair-2" data-q="1a-2">virtual classrooms cannot fully replicate</span>.</mark>
                        </p>
                    </div>

                    <!-- RIGHT: Question Pane -->
                    <div class="question-pane" id="mcqTask1a">
                        <div style="font-size:16px; font-weight:700; color:var(--text-dark);">Choose the correct letter A, B, C or D:</div>

                        <!-- Question 1 -->
                        <div class="q-card" data-q="1a-1">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span><strong>1.</strong> What is the main advantage of digital platforms mentioned in paragraph A?</span>
                                <button class="syn-btn" data-q="1a-1" data-ev="ev-1a-1">💡 Synonyms</button>
                            </div>
                            <select class="select-input" data-ans="B">
                                <option value="">--</option>
                                <option value="A">A: They reduce university tuition fees drastically</option>
                                <option value="B">B: They remove distance limitations for students</option>
                                <option value="C">C: They replace professors with automated tutors</option>
                                <option value="D">D: They shorten degree durations</option>
                            </select>
                            <div class="item-explanation">
                                <div class="syn-key-box"><span class="syn-tag green">Green:</span> <em>"expanded access across continents"</em> ↔ <em>"remove distance limitations"</em></div>
                                <div class="syn-key-box"><span class="syn-tag purple">Purple:</span> <em>"without geographical barriers"</em> ↔ <em>"for students"</em></div>
                            </div>
                        </div>

                        <!-- Question 2 -->
                        <div class="q-card" data-q="1a-2">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span><strong>2.</strong> According to paragraph B, traditional campus learning is vital because:</span>
                                <button class="syn-btn" data-q="1a-2" data-ev="ev-1a-2">💡 Synonyms</button>
                            </div>
                            <select class="select-input" data-ans="C">
                                <option value="">--</option>
                                <option value="A">A: It guarantees employment immediately</option>
                                <option value="B">B: It is preferred by university administrators</option>
                                <option value="C">C: It provides spontaneous peer interaction</option>
                                <option value="D">D: It requires less academic workload</option>
                            </select>
                            <div class="item-explanation">
                                <div class="syn-key-box"><span class="syn-tag green">Green:</span> <em>"spontaneous peer debates"</em> ↔ <em>"peer interaction"</em></div>
                            </div>
                        </div>

                        <!-- Action Buttons Row (Handled Automatically) -->
                        <div class="action-row">
                            <button class="btn-action btn-primary" onclick="deckEngine.checkSelects('mcqTask1a')">Check Answers</button>
                            <button class="btn-action" onclick="deckEngine.revealSelects('mcqTask1a')">Reveal Answers</button>
                            <button class="btn-action" onclick="deckEngine.resetSelects('mcqTask1a')">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

### D. Interactive Vocabulary & Word-Bank Slide (`data-skill="vocab"`)

Supports **click-to-fill chips**, auto strike-through, and speech synthesis pronunciation:

```html
<section class="slide" data-skill="vocab">
    <div class="slide-inner">
        <div class="notebook">
            <div class="skill-stripe" style="background:var(--col-vocab)"></div>
            <div class="page-content">
                <div class="slide-header">
                    <span class="skill-badge" style="background:var(--col-vocab)">1a Vocabulary</span>
                    <span class="slide-number">1a · Cloze</span>
                </div>
                <h2 class="slide-title">Higher Education Lexicon &amp; Collocations</h2>
                <p class="slide-subtitle">Click words from the word bank below to fill the blanks in the passage.</p>

                <!-- Click-to-fill Word Bank -->
                <div class="card" style="padding:14px 20px; margin-bottom:16px;">
                    <div style="font-weight:700; font-size:14px; color:var(--text-muted); margin-bottom:6px;">WORD BANK (Click word to insert):</div>
                    <div style="display:flex; flex-wrap:wrap; gap:8px;">
                        <span class="word-chip" data-word="curriculum">curriculum</span>
                        <span class="word-chip" data-word="dissertation">dissertation</span>
                        <span class="word-chip" data-word="faculty">faculty</span>
                        <span class="word-chip" data-word="tuition">tuition</span>
                        <span class="word-chip" data-word="scholarship">scholarship</span>
                    </div>
                </div>

                <!-- Exercise Sentence Container -->
                <div class="card" id="vocabExercise1a" style="line-height:2.1; font-size:20px;">
                    <p>1. Postgraduate students are required to submit an original <input type="text" class="blank-input" data-ans="dissertation" style="width:170px;"> before graduation.</p>
                    <p>2. The university updated its academic <input type="text" class="blank-input" data-ans="curriculum" style="width:150px;"> to include data analytics.</p>
                    <p>3. Outstanding applicants were awarded an international <input type="text" class="blank-input" data-ans="scholarship" style="width:160px;"> covering all living expenses.</p>

                    <div class="action-row" style="margin-top:20px;">
                        <button class="btn-action btn-primary" onclick="deckEngine.checkBlanks('vocabExercise1a')">Check Answers</button>
                        <button class="btn-action" onclick="deckEngine.revealBlanks('vocabExercise1a')">Reveal Answers</button>
                        <button class="btn-action" onclick="deckEngine.resetBlanks('vocabExercise1a')">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

### E. Writing Task 1 / Task 2 Model Essay Slide (`data-skill="write"`)

Includes connector highlighting and structural breakdown tags:

```html
<section class="slide" data-skill="write">
    <div class="slide-inner">
        <div class="notebook">
            <div class="skill-stripe" style="background:var(--col-writing)"></div>
            <div class="page-content">
                <div class="slide-header">
                    <span class="skill-badge" style="background:var(--col-writing)">1a Writing</span>
                    <span class="slide-number">1a · Model Essay</span>
                </div>
                <h2 class="slide-title">Task 2 Opinion Essay: Model Breakdown (Band 8.5)</h2>
                
                <div style="margin-bottom:12px;">
                    <button class="btn-action" data-essay-action="connectors" data-target="modelEssay1">✨ Highlight Linking Words</button>
                </div>

                <div class="two-col" id="modelEssay1">
                    <div class="col">
                        <div class="model-breakdown-card">
                            <span class="model-tag tag-intro">Introduction &amp; Thesis</span>
                            <p class="essay-p">It is often argued that universities should focus purely on graduate employability rather than broad theoretical knowledge. While career preparation is undeniably vital, I firmly believe that higher education institutions must maintain a balanced approach encompassing fundamental research and analytical problem-solving skills.</p>
                        </div>

                        <div class="model-breakdown-card">
                            <span class="model-tag tag-body">Body Paragraph 1 (Practical Skills)</span>
                            <p class="essay-p">On the one hand, equipping undergraduates with industry-ready competencies reduces youth unemployment. For instance, technical programs in engineering and software development directly fulfill severe labor shortages, thereby boosting national economic productivity.</p>
                        </div>
                    </div>

                    <div class="col">
                        <div class="model-breakdown-card">
                            <span class="model-tag tag-body">Body Paragraph 2 (Theoretical Depth)</span>
                            <p class="essay-p">On the other hand, focusing exclusively on vocational skills overlooks the importance of theoretical innovation. Groundbreaking discoveries in medicine and environmental science originate from abstract inquiry; furthermore, individuals with robust analytical training adapt far more effectively when job market demands evolve.</p>
                        </div>

                        <div class="model-breakdown-card">
                            <span class="model-tag tag-overview">Conclusion</span>
                            <p class="essay-p">In conclusion, although vocational preparation is a primary expectation of modern degrees, universities should simultaneously cultivate holistic intellectual curiosity to produce adaptable future leaders.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

### F. Review & Progress Slide (`data-skill="review"`)

```html
<section class="slide" data-skill="review">
    <div class="slide-inner">
        <div class="notebook">
            <div class="skill-stripe" style="background:var(--col-review)"></div>
            <div class="page-content">
                <div class="slide-header">
                    <span class="skill-badge" style="background:var(--col-review)">Review</span>
                    <span class="slide-number">Summary</span>
                </div>
                <h2 class="slide-title">Module 01 Review &amp; Completion</h2>
                <p class="slide-subtitle">Summary of key competencies mastered in this module.</p>

                <div class="two-col">
                    <div class="col">
                        <div class="card">
                            <h3 style="font-size:20px; font-weight:800; color:var(--col-reading); margin-bottom:8px;">Reading &amp; Grammar Milestones</h3>
                            <ul style="padding-left:22px; line-height:1.9;">
                                <li>Identified main arguments and paraphrased synonyms in academic texts.</li>
                                <li>Mastered complex sentence structures with defining relative clauses.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <h3 style="font-size:20px; font-weight:800; color:var(--col-writing); margin-bottom:8px;">Writing &amp; Lexicon Milestones</h3>
                            <ul style="padding-left:22px; line-height:1.9;">
                                <li>Applied Band 8+ linking devices and cohesive transition markers.</li>
                                <li>Drafted four-paragraph opinion essays with well-developed support.</li>
                            </ul>
                        </div>
                        <!-- Live Module Score widget is injected here automatically -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

## 4. Key Attributes & Interactive Evaluators Reference

| Attribute | Elements | Purpose | Example |
| :--- | :--- | :--- | :--- |
| `data-skill` | `<section class="slide">` | Determines category tab highlight & vertical navigation (`read`, `grammar`, `vocab`, `write`, `review`, `title`, `section`). | `<section class="slide" data-skill="read">` |
| `data-ans` | `<input>`, `<select>` | Specifies correct answers (case-insensitive, pipe-separated for alternatives). | `data-ans="dissertation\|thesis"` |
| `data-correct` | `.opt-card` | Marks correct multiple-choice option card. | `<div class="opt-card" data-correct="true">` |
| `data-q` | `<span>`, `<button>`, `.q-card` | Question key linking question text to evidence. | `data-q="1a-1"` |
| `data-ev` | `<button>`, `.syn-btn` | ID of the target evidence sentence `<mark id="...">`. | `data-ev="ev-1a-1"` |
| `data-word` | `.word-chip` | Word value placed into focused blank input on click. | `<span class="word-chip" data-word="tuition">` |
| `data-essay-action` | `<button>` | Writing tool action (`connectors`, `structure`). | `<button data-essay-action="connectors">` |

---

## 5. Teacher Keybindings & Classroom HUD Cheatsheet

| Key / Tool | Action | Description |
| :---: | :---: | :--- |
| <kbd>→</kbd> / <kbd>Space</kbd> / <kbd>PageDown</kbd> | **Next Slide** | Move to next slide. |
| <kbd>←</kbd> / <kbd>PageUp</kbd> | **Previous Slide** | Move to previous slide. |
| <kbd>G</kbd> | **Slide Grid Navigator** | Opens fullscreen slide browser with live text search. |
| <kbd>T</kbd> | **Classroom Timer** | Interactive countdown timer (1m, 2m, 5m, 10m) with alert chime. |
| <kbd>L</kbd> | **Laser Pointer** | Glowing presentation laser pointer. |
| <kbd>P</kbd> / <kbd>C</kbd> | **Annotation Pen / Clear** | Draw sketches or underline passages live on screen. |
| <kbd>B</kbd> / <kbd>W</kbd> | **Blackout / Whiteout** | Pitch black or white screen to focus attention on the teacher. |
| <kbd>S</kbd> | **Spotlight Dimmer** | Circular dimmer mask focusing strictly on the mouse cursor/active item. |
| <kbd>+</kbd> / <kbd>−</kbd> / <kbd>0</kbd> | **Font Zoom** | Dynamic text scaling (75% to 150%) and reset. |
| <kbd>F</kbd> | **Fullscreen** | Toggles native fullscreen presentation mode. |
| <kbd>Ctrl+P</kbd> | **Print / PDF Handout** | Formats slides into clean multi-page printable student handouts. |
| <kbd>?</kbd> / <kbd>H</kbd> | **Shortcuts Cheatsheet** | Shows keyboard shortcuts popup overlay. |

---

## 6. Checklist for Creating a New Presentation

1. [ ] Create a new file following the naming convention (e.g. `expert 6/module-01.html`).
2. [ ] Paste the [Minimal Starter HTML Template](#2-minimal-starter-html-template).
3. [ ] Set the module title and customize the color theme variables (`--col-reading`, etc.) in `:root`.
4. [ ] Build the slides using the standard recipes:
   - Slide 1: **Title Slide** (`data-skill="title"`)
   - Slide 2: **Part A Section Divider** (`data-skill="section"`)
   - Slides 3–10: **Reading, Grammar, Vocab, Writing** (`data-skill="read"`, etc.)
   - Slide 11: **Part B Section Divider** (`data-skill="section"`)
   - Slides 12–17: **Part B Skills**
   - Final Slide: **Review & Summary** (`data-skill="review"`)
5. [ ] Check all `<input>` and `<select>` elements for valid `data-ans="..."` attributes.
6. [ ] Check reading evidence marks (`<mark class="evidence" id="ev-...">`) and synonym pairs (`<span class="syn-pair-1" data-q="...">`).
7. [ ] Open in browser and verify navigation, timer (<kbd>T</kbd>), navigator grid (<kbd>G</kbd>), and answer evaluation.
8. [ ] Run `npm run update-index` (or `node scripts/update-index.js`) to automatically register the new deck in `index.html`!
