# Comprehensive Guide: Creating Reading Passages, Questions & Interactive Explanations

This guide details the complete pedagogical and technical standards for designing, authoring, and implementing **IELTS/EAP Reading Passages**, **Question Sets**, **Preparatory Strategy Slides**, and **Interactive Explanations with Synonym Grounding** across interactive HTML presentation decks and course materials.

---

## Table of Contents
1. [Pedagogical Architecture & The 5-Stage Reading Framework](#1-pedagogical-architecture--the-5-stage-reading-framework)
2. [Stage 1: Pre-Reading Question Keyword Deconstruction Slide](#2-stage-1-pre-reading-question-keyword-deconstruction-slide)
3. [Stage 2: Model Walkthrough Slide (1 Question & Dedicated Paragraph)](#3-stage-2-model-walkthrough-slide-1-question--dedicated-paragraph)
4. [Stage 3: Full Split-View Reading Passage & Exercise Slide](#4-stage-3-full-split-view-reading-passage--exercise-slide)
5. [Stage 4: Post-Reading Question-by-Question Answer Guidance Slides](#5-stage-4-post-reading-question-by-question-answer-guidance-slides)
6. [Stage 5: Standalone Reading Walkthrough Masterclasses & Instant Presentation Switch](#6-stage-5-standalone-reading-walkthrough-masterclasses--instant-presentation-switch)
7. [Interactive Vocabulary Definitions & Audio Pronunciation Popovers](#7-interactive-vocabulary-definitions--audio-pronunciation-popovers)
8. [Direct Sentence Color Coding Standards](#8-direct-sentence-color-coding-standards)
9. [Interactive Controls & JavaScript Action Rows](#9-interactive-controls--javascript-action-rows)
10. [Question Types & HTML Snippets](#10-question-types--html-snippets)
11. [Complete End-to-End Code Blueprint](#11-complete-end-to-end-code-blueprint)
12. [Authoring Checklist & Best Practices](#12-authoring-checklist--best-practices)

---

## 1. Pedagogical Architecture & The 5-Stage Reading Framework

In IELTS exam preparation, throwing students immediately into a full 800-word reading passage creates cognitive overload. Every reading task is structured into a **5-Stage Instructional Sequence**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              STAGE 1: PRE-READING KEYWORD DECONSTRUCTION                    │
│  - Focus solely on the questions before seeing the reading passage         │
│  - Identify Anchor Concepts (Green) vs. Qualifying Claims (Purple)         │
│  - Step-reveal keyword highlights via keyboard 'E' or 'Show Highlights'     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                 STAGE 2: 1-QUESTION MODEL WALKTHROUGH                       │
│  - Isolate Question 1 alongside its Dedicated Single Paragraph Excerpt      │
│  - Model the exact scanning path and paraphrase alignment                   │
│  - Interactive "💡 Evidence" jump and synchronized color matching           │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                 STAGE 3: FULL SPLIT-VIEW READING EXERCISE                   │
│  - Left Pane: Complete unabridged reading passage with evidence marks       │
│  - Right Pane: Full interactive question set (Dropdowns / Blanks / Cards)   │
│  - Interactive checking, evidence grounding, and rich explanations          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│          STAGE 4: POST-READING QUESTION-BY-QUESTION ANSWER GUIDANCE         │
│  - Detailed deep-dive review breaking down every question individually      │
│  - Isolated text evidence excerpts paired with color-grounded matches       │
│  - Paraphrase Bridge analysis and linguistic trap explanations              │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│    STAGE 5: STANDALONE READING WALKTHROUGH MASTERCLASSES & SWITCH BUTTON    │
│  - Dedicated standalone HTML walkthroughs in reading explanations folder    │
│  - 1-Click switch button directly on reading deck slides (🚀 Walkthrough)   │
│  - Embedded modal viewer with bilingual notes, options bank & fullscreen   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Stage 1: Pre-Reading Question Keyword Deconstruction Slide

### Purpose
Train students to analyze and deconstruct questions before scanning the text.

### Key Features
1. **Clean Initial State**: Sentences appear as clean, readable text without pre-spoiled answers or distracting wall-of-text tables.
2. **Direct Sentence Highlighting**: Keyword spans are placed directly within the question sentence text.
3. **Step-by-Step Reveal**: The teacher can press <kbd>E</kbd>, click `👉 Step Reveal (E)`, or click directly on any question card to reveal the keywords for that question.
4. **Action Row**: Contains `💡 Show Highlights` (reveals all keywords) and `Reset`.

### HTML Template

```html
<!-- STAGE 1: QUESTION KEYWORD DECONSTRUCTION SLIDE -->
<section class="slide" id="slide-read-strategy" data-skill="read">
    <div class="slide-inner">
        <div class="notebook">
            <div class="skill-stripe" style="background: var(--col-reading);"></div>
            <div class="page-content">
                <div class="slide-header">
                    <div class="slide-title-group">
                        <span class="skill-badge" style="background: var(--col-reading);">Reading Strategy • Pre-Reading</span>
                        <h2 class="slide-title">Matching Information: Question Keyword Deconstruction</h2>
                    </div>
                    <div class="slide-number">02 / 25</div>
                </div>

                <p class="slide-subtitle" style="font-size: 18px; color: var(--text-muted); margin-bottom: 12px;">
                    Click any sentence or press <kbd>E</kbd> to step-reveal the color-coded keywords: <strong style="color:#15803d;">Green = Subject Anchor</strong> vs. <strong style="color:#6b21a8;">Purple = Qualifying Claim</strong>.
                </p>

                <div class="two-col" style="flex: 1; min-height: 0; gap: 20px;">
                    <!-- Left Col: Question Cards with Step Reveal -->
                    <div style="display: flex; flex-direction: column; gap: 10px; flex: 1.2; overflow-y: auto;">
                        
                        <!-- Question Item 1 -->
                        <div class="card q-card" data-q="strat-q-1" style="border-left: 4px solid var(--col-reading); padding: 14px 18px; cursor: pointer;">
                            <div style="font-size: 16.5px; font-weight: 700; color: var(--text-dark); line-height: 1.55;">
                                1. <span class="syn-pair-1" data-q="strat-q-1">Sharing experiences</span> provides us with <span class="syn-pair-2" data-q="strat-q-1">immediate and long-term satisfaction</span>.
                            </div>
                        </div>

                        <!-- Question Item 2 -->
                        <div class="card q-card" data-q="strat-q-2" style="border-left: 4px solid var(--col-reading); padding: 14px 18px; cursor: pointer;">
                            <div style="font-size: 16.5px; font-weight: 700; color: var(--text-dark); line-height: 1.55;">
                                2. <span class="syn-pair-1" data-q="strat-q-2">Social communication</span> is based on things we have <span class="syn-pair-2" data-q="strat-q-2">in common</span>.
                            </div>
                        </div>

                    </div>

                    <!-- Right Col: Dual-Color Strategy Guide -->
                    <div style="display: flex; flex-direction: column; gap: 12px; flex: 0.8; overflow-y: auto;">
                        <div class="card" style="background: #ffffff; border-left: 4px solid var(--col-reading); padding: 18px 20px;">
                            <h3 style="font-family: var(--font-display); font-size: 19px; color: var(--col-reading); margin-bottom: 10px;">
                                🎯 Direct Sentence Color Code
                            </h3>
                            <div style="display: flex; flex-direction: column; gap: 12px; font-size: 15px; line-height: 1.6; color: var(--text-dark);">
                                <div style="background: #dcfce7; padding: 10px 14px; border-radius: 6px; border: 1px solid #86efac;">
                                    <strong style="color: #15803d;">🟢 Green (Anchor Concepts):</strong> Core topic nouns and verbs. Scan for these first to locate the paragraph.
                                </div>
                                <div style="background: #f3e8ff; padding: 10px 14px; border-radius: 6px; border: 1px solid #d8b4fe;">
                                    <strong style="color: #6b21a8;">🟣 Purple (Qualifying Claims):</strong> Adjectives, degree words, timeframes, and outcomes. Used to confirm or refute the answer.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Controls -->
                <div class="action-row" style="margin-top: 14px;">
                    <button class="btn-action btn-primary" onclick="revealAnswers(this)">💡 Show Highlights</button>
                    <button class="btn-action" onclick="resetAnswers(this)">Reset</button>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

## 3. Stage 2: Model Walkthrough Slide (1 Question & Dedicated Paragraph)

### Purpose
Demonstrate the step-by-step scanning and paraphrase matching procedure on a single question alongside only its relevant paragraph.

### Key Features
1. **Up-to-Down (Stacked) Centered Layout**: Content is structured in a vertically stacked container (`.walkthrough-container`) centered on the slide (`max-width: 1180px; margin: auto;`).
2. **Larger Font Sizes for High Legibility**:
   - Passage excerpt text: `22px` (`line-height: 1.75`)
   - Question text: `21px` (`line-height: 1.6`)
   - Dropdowns & Explanation: `17.5px`–`18px`
3. **Top Box (Passage Excerpt)**: Contains only the specific paragraph containing the answer (e.g. Paragraph [B]), with `<mark class="evidence" id="ev-..." data-q="...">` wrapping the matching green, purple, and gold vocabulary spans.
4. **Bottom Box (Interactive Question Card)**: Contains the single question card with `💡 Evidence` jump button, dropdown/input, and rich pedagogical explanation.
5. **Synchronized Evidence Highlighting**: Clicking `💡 Evidence` or `Show Evidence / Highlights` illuminates both the excerpt and question simultaneously.

### HTML Template

```html
<!-- 1-QUESTION MODEL WALKTHROUGH SLIDE (UP-TO-DOWN CENTERED LAYOUT) -->
<section class="slide" id="slide-read-model" data-skill="read">
    <div class="slide-inner">
        <div class="notebook">
            <div class="skill-stripe" style="background: var(--col-reading);"></div>
            <div class="page-content" style="display: flex; flex-direction: column; justify-content: space-between;">
                <div class="slide-header">
                    <div class="slide-title-group">
                        <span class="skill-badge" style="background: var(--col-reading);">Reading Strategy • Model Walkthrough</span>
                        <h2 class="slide-title">Model Walkthrough: Question 1 &amp; Paragraph [B]</h2>
                    </div>
                    <div class="slide-number">04 / 42</div>
                </div>

                <p class="slide-subtitle" style="font-size: 17.5px; color: var(--text-muted); margin-bottom: 6px;">
                    Compare the dedicated passage excerpt with the question below to evaluate your answer.
                </p>

                <!-- Centered Up-to-Down (Stacked) Walkthrough Container -->
                <div class="walkthrough-container" style="max-width: 1180px; width: 100%; margin: auto; display: flex; flex-direction: column; gap: 16px; justify-content: center; flex: 1; min-height: 0;">
                    <!-- TOP BOX: Dedicated Passage Excerpt -->
                    <div class="card" style="background: #ffffff; border: 2px solid #93c5fd; border-left: 6px solid var(--col-reading); border-radius: 12px; padding: 20px 28px; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
                        <div style="font-size: 14.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--col-reading); margin-bottom: 8px;">
                            📖 Passage Excerpt: [Paragraph B]
                        </div>
                        <p style="font-size: 22px; line-height: 1.75; margin-bottom: 0; color: #1e293b;">
                            <span class="para-tag">[Paragraph B]</span> <mark class="evidence" id="ev-wt-m2a-1" data-q="wt-m2a-1"><span class="syn-pair-1" data-q="wt-m2a-1">"<span class="vocab-word" data-word="extraordinary" data-def="Very unusual, special, or remarkable." data-ipa="/ɪkˈstrɔː.dɪn.ər.i/" data-pos="adj.">Extraordinary</span> experiences</span> are <span class="syn-pair-2" data-q="wt-m2a-1"><span class="vocab-word" data-word="pleasurable" data-def="Giving a feeling of happy satisfaction in the moment." data-ipa="/ˈpleʒ.ər.ə.bəl/" data-pos="adj.">pleasurable</span> in the moment but can leave us socially worse off in the long run,"</span></mark> says study author Gus Cooney.
                        </p>
                    </div>

                    <!-- BOTTOM BOX: Interactive Question Card -->
                    <div class="q-card" data-q="wt-m2a-1" style="background: #ffffff; border: 2px solid #cbd5e1; border-left: 6px solid var(--col-reading); border-radius: 12px; padding: 22px 28px; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
                            <span style="font-weight: 700; font-size: 21px; line-height: 1.6; color: #0f172a;">
                                1. <span class="syn-pair-1" data-q="wt-m2a-1">Sharing experiences</span> provides us with <span class="syn-pair-2" data-q="wt-m2a-1">immediate and long-term <span class="vocab-word" data-word="satisfaction" data-def="A pleasant feeling of fulfillment or pleasure." data-ipa="/ˌsæt.ɪsˈfæk.ʃən/" data-pos="noun">satisfaction</span></span>.
                            </span>
                            <button class="syn-btn" data-ev="ev-wt-m2a-1" data-q="wt-m2a-1" style="flex-shrink: 0; font-size: 14px; padding: 6px 14px;">💡 Evidence</button>
                        </div>

                        <div style="margin-top: 14px; display: flex; align-items: center; gap: 14px;">
                            <select class="select-input" data-ans="B" style="min-width: 200px; font-size: 17.5px; padding: 9px 16px; border-radius: 8px; font-weight: 600;">
                                <option value="">Select Answer...</option>
                                <option value="A">Sentence A</option>
                                <option value="B">Sentence B</option>
                                <option value="C">Sentence C</option>
                                <option value="D">Sentence D</option>
                            </select>
                        </div>

                        <div class="item-explanation" style="font-size: 18px; margin-top: 14px; padding: 14px 18px;">
                            <div class="syn-key-box" style="margin-top:0; font-size: 17.5px;">
                                <span class="syn-tag green" style="font-size: 14.5px;">Green Match:</span> <em>"Sharing experiences"</em> ↔ <em>"Extraordinary experiences"</em>
                            </div>
                            <div class="syn-key-box" style="font-size: 17.5px;">
                                <span class="syn-tag purple" style="font-size: 14.5px;">Purple Match:</span> <em>"immediate &amp; long-term satisfaction"</em> ↔ <em>"pleasurable in moment / worse off in long run"</em> (Sentence B)
                            </div>
                        </div>
                    </div>
                </div>

                <div class="action-row" style="margin-top: 12px;">
                    <button class="btn-action btn-primary" onclick="checkAnswers(this)">Check Answer</button>
                    <button class="btn-action" onclick="revealAnswers(this)">Show Evidence / Highlights</button>
                    <button class="btn-action" onclick="resetAnswers(this)">Reset</button>
                </div>
            </div>
        </div>
    </div>
</section>
```
                            <div class="item-explanation">
                                <div class="syn-key-box" style="margin-top: 0;">
                                    <span class="syn-tag green">Green Match:</span> <em>"Sharing experiences"</em> ↔ <em>"Extraordinary experiences"</em>
                                </div>
                                <div class="syn-key-box">
                                    <span class="syn-tag purple">Purple Match:</span> <em>"immediate &amp; long-term"</em> ↔ <em>"pleasurable in moment / long run"</em> (Sentence B)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Controls -->
                <div class="action-row" style="margin-top: 14px;">
                    <button class="btn-action btn-primary" onclick="checkAnswers(this)">Check Answer</button>
                    <button class="btn-action" onclick="revealAnswers(this)">Show Evidence / Highlights</button>
                    <button class="btn-action" onclick="resetAnswers(this)">Reset</button>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

## 4. Stage 3: Full Split-View Reading Passage & Exercise Slide

### Purpose
Provide independent / guided practice across the complete unabridged reading text with full interactive evaluation.

### Key Layout (50/50 Split View)
- **Left Column (`.reading-pane`)**: Unabridged text with paragraph badges (`<span class="para-tag">[A]</span>`), evidence tags (`<mark class="evidence">`), and synonym spans (`.syn-pair-1`, `.syn-pair-2`).
- **Right Column (`.question-pane`)**: Complete question list, input fields (`select-input` / `blank-input`), `💡 Evidence` buttons, and hidden `.item-explanation` boxes.

---

## 5. Stage 4: Post-Reading Question-by-Question Answer Guidance Slides

### Purpose
Review and deconstruct the answers question-by-question after students attempt the full exercise. Each question is presented alongside its isolated passage excerpt, exact paraphrase bridge, and trap analysis.

### HTML Structure
```html
<div class="card" style="border-left: 4px solid var(--col-reading); padding: 12px 18px; background: #ffffff;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <strong style="font-size: 16px; color: var(--col-reading);">Question 1 ➔ Sentence [B]</strong>
        <span class="syn-tag green">MATCH FOUND</span>
    </div>
    <div style="font-size: 14.5px; line-height: 1.5; color: var(--text-dark); margin-bottom: 4px;">
        <strong>Question:</strong> <span class="syn-pair-1 active-syn">Sharing experiences</span> provides us with <span class="syn-pair-2 active-syn">immediate and long-term satisfaction</span>.
    </div>
    <div style="font-size: 14px; line-height: 1.5; background: #f8fafc; border-left: 3px solid var(--col-reading); padding: 6px 10px; border-radius: 4px; margin-bottom: 4px;">
        <strong>Text [B]:</strong> <em>"<span class="syn-pair-1 active-syn">Extraordinary experiences</span> are <span class="syn-pair-2 active-syn">pleasurable in the moment but can leave us socially worse off in the long run</span>..."</em>
    </div>
    <div style="font-size: 13.5px; color: #475569;">
        🔍 <strong>Bridge:</strong> <em>"in the moment"</em> ↔ <em>immediate</em> &nbsp;|&nbsp; <em>"in the long run"</em> ↔ <em>long-term</em>.
    </div>
</div>
```

---

## 6. Stage 5: Standalone Reading Walkthrough Masterclasses & Instant Presentation Switch

### Purpose & Architecture
While in-deck walkthrough slides (`template="walkthrough"`) provide rapid pacing during slide presentations, teachers frequently need a **deep-dive masterclass view** containing bilingual Vietnamese explanations, full Option Banks, comprehensive Paraphrase Matrices, and Core Lexicon.

These standalone masterclasses are stored in:
`reading explanations - walkthrough/expert {level}/module-{num}{part}-reading-question-walkthrough.html`

### Key Features of Standalone Walkthrough Masterclasses
1. **Multiple Presentation Modes**:
   - **Slide Mode**: Focused single-question view with excerpt, clear prompt, and bilingual explanation.
   - **List Mode**: Displays all reading questions in a continuous scrollable canvas.
   - **Options Bank (A–G / A–L)**: Instant toggle showing all options with Vietnamese translations.
   - **Paraphrase Matrix**: Side-by-side table comparing question keywords with passage evidence.
   - **Core Vocabulary**: Academic word list with IPA, definition, and collocations.
2. **Pedagogical Paraphrase & Trap Deconstruction**:
   - Explicitly explains why correct answers work and identifies linguistic traps (distractors).
3. **No Index Clutter**:
   - Standalone walkthroughs are strictly **excluded from `index.html`** to keep the course dashboard clean and module-focused.

### Integration into Slide Decks
Teachers can switch to the deep walkthrough directly from the reading slide without having to browse file explorer:

```html
<!-- Method 1: On <slide-card> (Declarative HTML) -->
<slide-card template="reading-split" skill="read" data-bind="reading4a" 
            badge="Reading 4a • Matching Sentence Endings" title="Monitoring Fitness"
            walkthrough-url="../reading%20explanations%20-%20walkthrough/expert%205/module-4a-reading-question-walkthrough.html" 
            walkthrough-title="Module 4a: Monitoring Fitness — Deep Question Walkthrough">
</slide-card>

<!-- Method 2: In Module Dataset (module-XX-data.js) -->
reading4a: {
    walkthroughUrl: "../reading%20explanations%20-%20walkthrough/expert%205/module-4a-reading-question-walkthrough.html",
    walkthroughTitle: "Module 4a: Monitoring Fitness — Deep Question Walkthrough",
    passage: `...`,
    ...
}
```

### Automatic Action Row Button & In-Deck Modal Viewer
- When `walkthrough-url` or `walkthroughUrl` is detected, `TemplateEngine` automatically appends a **`🚀 Question Walkthrough`** button to the slide's `.action-row`.
- Clicking the button launches the `ReadingWalkthroughEngine` embedded modal overlay:
  - **Embedded Modal View**: Overlays active slide without losing presentation state.
  - **Fullscreen (⛶)**: Instantly maximizes for projector viewing.
  - **Open in New Tab (↗)**: Launches standalone page in separate window.
  - **Keyboard Dismiss**: Press <kbd>Esc</kbd> or click the close button `✕` to return to the slide.

---

## 7. Interactive Vocabulary Definitions & Audio Pronunciation Popovers

Wrap key academic vocabulary in `<span class="vocab-word">` with metadata attributes:

```html
<span class="vocab-word" 
      data-word="reminisce" 
      data-def="To talk or write about enjoyable past experiences." 
      data-ipa="/ˌrem.ɪˈnɪs/" 
      data-pos="verb" 
      data-colloc="reminisce about the past">
    reminisce
</span>
```

### Features Triggered on Click:
1. **Audio Pronunciation**: Plays multi-accent IELTS pronunciation via Web Speech API (`en-GB` / `en-US`).
2. **Floating Popover**: Displays word title, IPA phonetic transcription, part of speech badge, concise definition, and collocation context.
3. **Active Glow Highlighting**: Highlights the clicked word with `.active-vocab`.

---

## 8. Direct Sentence Color Coding Standards & Typography

Always use the standard dual-layer synonym styling across question stems and passage excerpts:

| Tag Class | Role | Visual Color | Tokens & Styling | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **`.syn-pair-1`** | **Anchor Concept / Target Match** | 🟢 **Emerald Green** | `background: #86efac !important;`<br>`color: #064e3b !important;`<br>`border-bottom: 3px solid #16a34a !important;`<br>`font-weight: 800; border-radius: 6px;` | Subject noun, actor, main topic keyword in both question and passage. |
| **`.syn-pair-2`** | **Qualifying Claim / Paraphrase Location** | 🟣 **Amethyst Purple** | `background: #d8b4fe !important;`<br>`color: #3b0764 !important;`<br>`border-bottom: 3px solid #9333ea !important;`<br>`font-weight: 800; border-radius: 6px;` | Scope, degree, condition, or matching action clue in passage. |
| **`.syn-pair-3`** | **Contrast / Distractor / Trap** | 🔵 **Sky Blue** | `background: #7dd3fc !important;`<br>`color: #082f49 !important;`<br>`border-bottom: 3px solid #0284c7 !important;`<br>`font-weight: 800; border-radius: 6px;` | Rebuttal, exception, or trap word. |
| **`mark.evidence`** | **Passage Sentence Context** | 🟡 **Soft Amber Tint** | `background: rgba(254, 240, 138, 0.35) !important;`<br>`border-bottom: 2.5px dashed #ca8a04 !important;` | Translucent sentence wash. Never use solid yellow to avoid masking green/purple keywords. |

### Walkthrough Typography Standards
To guarantee optimal readability on large displays and classroom projectors:
- **Passage Excerpt Text (`.walkthrough-container .card p`)**: **`26px`** (`line-height: 1.85`).
- **Question Stem Text (`.walkthrough-container .q-card span`)**: **`25px`** (`font-weight: 700`).
- **Option Box Chips (`.box-chip`)**: **`20px`** (`padding: 10px 18px`).
- **Select Dropdown (`.select-input`)**: **`21px`** (`min-width: 280px`).

### DOM Isolation & Vocabulary Scanner Safety
`ReadingGrounder.autoTagVocabWords()` automatically skips any text node inside `.syn-pair-1, .syn-pair-2, .syn-pair-3` and `.q-card`. Never inject nested `<span class="vocab-word">` tags inside synonym spans.

---

## 9. Interactive Controls & JavaScript Action Rows

Every interactive slide **must** have an `.action-row` at the bottom of the content container:

### For Stage 1 (Strategy Slides):
```html
<div class="action-row" style="margin-top: 14px;">
    <button class="btn-action btn-primary" onclick="revealAnswers(this)">💡 Show Highlights</button>
    <button class="btn-action" onclick="resetAnswers(this)">Reset</button>
</div>
```
*(The engine automatically injects `👉 Step Reveal (E)` because `.q-card` elements are present).*

### For Stage 2 (Model Walkthrough Slides) & Stage 3 (Full Exercise Slides):
```html
<div class="action-row" style="margin-top: 14px;">
    <button class="btn-action btn-primary" onclick="checkAnswers(this)">Check Answer</button>
    <button class="btn-action btn-step-reveal" onclick="stepReveal(this)">👉 Step Reveal (E)</button>
    <button class="btn-action" onclick="revealAnswers(this)">Show Evidence / Highlights</button>
    <button class="btn-action" onclick="resetAnswers(this)">Reset</button>
</div>
```

---

## 10. Question Types & Unified Template Engine Registry

The template engine contains a central, built-in **`ReadingQuestionRegistry`** (`window.IELTSQuestionTypes`) supporting all 15 official IELTS Academic Reading question types. Authors can either declare `type: "<type-id>"` on question objects in `-data.js`, or let the engine resolve the type automatically via heuristics:

### Official IELTS Question Types Supported:
1. **`multiple-choice`** (aliases: `mcq`, `single-choice`): Single selection A–D with unrevealed choice dropdown.
2. **`multiple-choice-multi`** (aliases: `mcq-multi`, `multi-select`): Choose TWO or THREE letters with checkbox limits.
3. **`tfng`** (aliases: `true-false-not-given`, `true_false`): Factual claims agreement (`TRUE`, `FALSE`, `NOT GIVEN`).
4. **`ynng`** (aliases: `yes-no-not-given`, `yes_no`): Author views/opinions agreement (`YES`, `NO`, `NOT GIVEN`).
5. **`matching-headings`** (aliases: `headings`, `paragraph-headings`): Roman numeral headings list (`i`, `ii`, `iii`...) with paragraph dropdowns.
6. **`matching-features`** (aliases: `features`, `categorization`): Match statements to people/groups/eras (supports letter reuse).
7. **`matching-information`** (aliases: `which-paragraph`, `paragraph-matching`): Match statements to Paragraphs A–G.
8. **`matching-sentence-endings`** (aliases: `sentence-endings`): Match sentence stems to endings list A–H.
9. **`sentence-completion`** (aliases: `gap-fill`): Word limit text blank (`NO MORE THAN TWO WORDS`).
10. **`summary-completion`** (aliases: `summary`): Continuous narrative summary with numbered gaps and optional Word Bank chips.
11. **`summary-box`** (aliases: `summary-completion-box`, `box-completion`): Option box chips (`.box-chip`) with letter dropdowns.
12. **`notes-completion`** (aliases: `notes`): Bulleted hierarchical notes with numbered blanks.
13. **`table-completion`** (aliases: `table`): Tabular matrix with numbered blanks.
14. **`flowchart-completion`** (aliases: `flowchart`, `flow-chart`): Sequential process cards connected by arrows.
15. **`short-answer`** (aliases: `short_answer`): Direct questions with concise phrase answers.
16. **`diagram-labelling`** (aliases: `diagram`, `map-labelling`): Technical diagrams or maps with numbered blanks.

### Usage in Curriculum Datasets:
```javascript
// Example in module-XX-data.js:
questions: [
    { num: 1, type: 'mcq', text: '...', ans: 'B', options: [...] },
    { num: 2, type: 'tfng', text: '...', ans: 'TRUE' },
    { num: 3, type: 'matching-headings', text: 'Paragraph A', ans: 'iii', headings: [...] },
    { num: 4, type: 'sentence-completion', text: '...', ans: 'evidence', width: 200 }
]
```
The template engine automatically generates the appropriate unrevealed inputs, option boxes, and strategy tags for both split-view slides (`template="reading-split"`) and walkthrough slides (`template="walkthrough"`).

---

## 11. Complete End-to-End Code Blueprint & Data Architecture

When creating a new reading module, follow the **Declarative Data Separation Architecture**:

### A. Master Curriculum Dataset (`module-XX-data.js`)

All text passages, word banks, options, questions, and walkthrough objects live in `module-XX-data.js` as the single source of truth:

```javascript
window.module3Data = {
    // 1. Reading Task 3a
    reading3a: {
        walkthroughUrl: "../reading%20explanations%20-%20walkthrough/expert%205/module-3a-reading-question-walkthrough.html",
        walkthroughTitle: "Module 3a: A Chinese Approach to Learning — Deep Question Walkthrough",
        wordBank: ["admitted", "behaved", "control group", "denied", "educated", "experiences", "imagination", "success", "instructors", "time"],
        passage: `
            <h3>A CHINESE APPROACH TO LEARNING</h3>
            <p><span class="para-tag">Intro</span> A recent experiment carried out by the BBC...</p>
            <p><span class="para-tag">Para A</span> <strong>The reasons behind the experiment were obvious.</strong> <mark class="evidence" id="ev-3a-1" data-q="3a-1"><span class="syn-pair-1" data-q="3a-1">Chinese students regularly come near the top</span></mark>...</p>
            <!-- ALL PARAGRAPHS (A through G) 100% UNABRIDGED -->
        `,
        summaryText: `
            The BBC introduced an experiment... <strong>1.</strong> <input type="text" class="blank-input" data-ans="success|triumph" placeholder="word..."> <button class="syn-btn" data-ev="ev-3a-1" onclick="deckEngine.toggleSynonymExplanation('3a-1', 'ev-3a-1')">💡</button>...
        `,
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph A (Exam Success)",
                badge: "Reading 3a Walkthrough • Q1",
                para: "Para A",
                header: "📖 Passage Excerpt (Paragraph A)",
                excerpt: `<span class="para-tag">[Para A]</span> <mark class="evidence" id="ev-wt-3a-1" data-q="wt-3a-1">"The reasons behind the experiment were obvious. <span class="syn-pair-1" data-q="wt-3a-1">Chinese students regularly come near the top</span>..."</mark>`,
                question: `1. The BBC introduced an experiment because of the exam <span class="syn-pair-2" data-q="wt-3a-1">[ 1 ]</span> of Chinese students.`,
                ans: "success|triumph",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Match:</span> <em>"Chinese students in exams"</em> ↔ <em>"triumph in Maths, Reading"</em>.</div>`
            },
            // Walkthroughs for Q2 through QN...
        ]
    },

    // 2. Summary Completion with a Box (Ex 4)
    reading3aEx4: {
        walkthroughUrl: "../reading%20explanations%20-%20walkthrough/expert%205/module-3a-ex4-reading-question-walkthrough.html",
        walkthroughTitle: "Module 3a Ex 4: Testing Obsession — Deep Question Walkthrough",
        passage: `...`,
        boxOptions: [
            { letter: "A", text: "unnecessary" }, { letter: "B", text: "technology" }, { letter: "C", text: "styles" },
            { letter: "D", text: "hours" }, { letter: "E", text: "interest" }, { letter: "F", text: "environment" },
            { letter: "G", text: "teachers" }, { letter: "H", text: "benefit" }, { letter: "I", text: "classmates" }
        ],
        summaryBox: `...`,
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph E (Testing Obsession)",
                badge: "Reading 3a Ex 4 Walkthrough • Q1",
                para: "Para E",
                header: "📖 Passage Excerpt (Paragraph E)",
                excerpt: `<span class="para-tag">[Para E]</span> <mark class="evidence" id="ev-wt-3a-ex4-1" data-q="wt-3a-ex4-1">"All of this suggests that an <span class="syn-pair-1" data-q="wt-3a-ex4-1">obsession with testing</span> does not exist..."</mark>`,
                question: `1. The author believes the British have an excessive <span class="syn-pair-1" data-q="wt-3a-ex4-1">[ 1 ]</span> in student results.`,
                ans: "E",
                boxOptions: [ /* Always include box options for box tasks */ ],
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Match:</span> <em>"excessive interest"</em> ↔ <em>"obsession with testing"</em>.</div>`
            }
        ]
    }
};
```

### B. Clean Declarative HTML Markup (`module-XX.html`)

```html
<!-- STAGE 1: Pre-reading Question Keyword Deconstruction Slide -->
<slide-card template="strategy" skill="read" title="Reading Strategy: Question Deconstruction (Q1–6)" subtitle="Analyze keywords and sentence structures before reading.">
    <div slot="sentences">
        <div class="card q-card strategy-card" data-q="strat-1">
            <p>1. In the <span class="syn-pair-1" data-q="strat-1">Florida study</span>, EI had a more <span class="gap-bracket">[ 1 ]</span> effect on...</p>
        </div>
        <!-- Questions 2 to N -->
    </div>
    <div slot="guide">
        <!-- Strategy Scanning Rules & Anchor Guide -->
    </div>
</slide-card>

<!-- STAGE 2: Full Split-View Reading Passage & Complete Question Set Slide -->
<slide-card template="reading-split" skill="read" data-bind="reading3a" badge="Reading 3a • Summary Completion (Ex 3)" title="A Chinese Approach to Learning"
            walkthrough-url="../reading%20explanations%20-%20walkthrough/expert%205/module-3a-reading-question-walkthrough.html"
            walkthrough-title="Module 3a: A Chinese Approach to Learning — Deep Question Walkthrough">
</slide-card>

<!-- STAGE 3: Dedicated 1-Question Walkthrough Slides (1 SLIDE PER QUESTION) -->
<slide-card template="walkthrough" skill="read" data-bind="reading3a.walkthroughs.0"
            walkthrough-url="../reading%20explanations%20-%20walkthrough/expert%205/module-3a-reading-question-walkthrough.html"
            walkthrough-title="Module 3a: A Chinese Approach to Learning — Deep Question Walkthrough">
</slide-card>
<slide-card template="walkthrough" skill="read" data-bind="reading3a.walkthroughs.1"></slide-card>
<slide-card template="walkthrough" skill="read" data-bind="reading3a.walkthroughs.2"></slide-card>
<slide-card template="walkthrough" skill="read" data-bind="reading3a.walkthroughs.3"></slide-card>
<slide-card template="walkthrough" skill="read" data-bind="reading3a.walkthroughs.4"></slide-card>
<slide-card template="walkthrough" skill="read" data-bind="reading3a.walkthroughs.5"></slide-card>
```

---

## 12. Critical Quality Rules & Authoring Checklist

Before finalizing any reading presentation, verify against this checklist:

1. [ ] **100% Unabridged Passage Fidelity**: Does the reading passage in `-data.js` contain **every single paragraph (Intro, A through G)** word-for-word from the master markdown curriculum? (Never summarize, truncate, or abbreviate passage text).
2. [ ] **No Standalone Question Slides Without Text**: Are reading summary completion / multiple choice / flow-chart tasks rendered in **Split-View** (`template="reading-split"`) with the passage on the left and questions on the right? (Never create passage-less gap-fill slides for reading tasks).
3. [ ] **1 Slide Per Question Walkthrough**: Does **every single reading question** have its own dedicated walkthrough slide (`template="walkthrough"`) with its isolated passage excerpt, question input, and green/purple evidence breakdown?
4. [ ] **Option Box Displayed in Box Walkthroughs**: For Summary Completion with a Box, does the walkthrough slide render the **A–I / A–L option box chips** directly above the question?
5. [ ] **Pre-Reading Strategy Slide**: Does every reading task have its dedicated Strategy Slide (`template="strategy"`) preceding the full text with bracket gaps `[ 1 ]` and direct `.syn-pair-1` / `.syn-pair-2` keyword anchors?
6. [ ] **Step Reveal & Evidence Cycling**: Does pressing <kbd>E</kbd> / <kbd>Shift+E</kbd> smoothly cycle forward and backward through reading evidence, and do number keys <kbd>1</kbd>–<kbd>9</kbd> jump directly to question anchors?
7. [ ] **Smooth Auto-Scroll & Spotlight Dimming**: Does clicking `💡 Evidence` on any question card, option card, or flowchart card smoothly center the reading pane on the target `<mark class="evidence">` and dim surrounding text?
8. [ ] **Clean Reset**: Does clicking `Reset` return all inputs, evidence marks, synonym pairs, and spotlight brightness to their pristine unrevealed state?
9. [ ] **Dedicated Academic Vocabulary Hub**: Does the module include a dedicated Vocabulary Hub slide (`template="vocab-grid"`) with 12–16 academic term cards, live Term Inspector, Oxford definitions, collocations, Band 7.5+ examples, and multi-accent pronunciation triggers?
10. [ ] **Dual-Screen Presenter Parity**: Are all answer reveals, resets, evidence highlights, and synonym matches fully functional and synchronized when clicking directly in both the Main View and the Presenter View Cockpit?
11. [ ] **Build Validation**: Has `npm run build` and `node -c module-XX-data.js` been executed with zero errors?
12. [ ] **Reading Walkthrough Masterclass Integration**: Is the reading exercise connected to its standalone question walkthrough (`walkthrough-url` attribute or `walkthroughUrl` dataset property) so the teacher can switch to the deep explanation modal with 1 click?
