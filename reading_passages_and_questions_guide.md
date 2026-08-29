# Comprehensive Guide: Creating Reading Passages, Questions & Interactive Explanations

This guide details the complete pedagogical and technical standards for designing, authoring, and implementing **IELTS/EAP Reading Passages**, **Question Sets**, **Preparatory Strategy Slides**, and **Interactive Explanations with Synonym Grounding** across interactive HTML presentation decks and course materials.

---

## Table of Contents
1. [Pedagogical Architecture & The 4-Stage Reading Framework](#1-pedagogical-architecture--the-4-stage-reading-framework)
2. [Stage 1: Pre-Reading Question Keyword Deconstruction Slide](#2-stage-1-pre-reading-question-keyword-deconstruction-slide)
3. [Stage 2: Model Walkthrough Slide (1 Question & Dedicated Paragraph)](#3-stage-2-model-walkthrough-slide-1-question--dedicated-paragraph)
4. [Stage 3: Full Split-View Reading Passage & Exercise Slide](#4-stage-3-full-split-view-reading-passage--exercise-slide)
5. [Stage 4: Post-Reading Question-by-Question Answer Guidance Slides](#5-stage-4-post-reading-question-by-question-answer-guidance-slides)
6. [Interactive Vocabulary Definitions & Audio Pronunciation Popovers](#6-interactive-vocabulary-definitions--audio-pronunciation-popovers)
7. [Direct Sentence Color Coding Standards](#7-direct-sentence-color-coding-standards)
8. [Interactive Controls & JavaScript Action Rows](#8-interactive-controls--javascript-action-rows)
9. [Question Types & HTML Snippets](#9-question-types--html-snippets)
10. [Complete End-to-End Code Blueprint](#10-complete-end-to-end-code-blueprint)
11. [Authoring Checklist & Best Practices](#11-authoring-checklist--best-practices)

---

## 1. Pedagogical Architecture & The 4-Stage Reading Framework

In IELTS exam preparation, throwing students immediately into a full 800-word reading passage creates cognitive overload. Every reading task is structured into a **4-Stage Instructional Sequence**:

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
1. **Left Pane (Passage Excerpt)**: Contains only the specific paragraph containing the answer (e.g. Paragraph [B]), with `<mark class="evidence" id="ev-..." data-q="...">` wrapping the matching green and purple spans.
2. **Right Pane (Question 1 Walkthrough)**: Contains the single Question 1 card with `💡 Evidence` jump button, dropdown/input, and rich pedagogical explanation.
3. **Synchronized Evidence Highlighting**: Clicking `💡 Evidence` or `Show Evidence / Highlights` illuminates both the excerpt and question simultaneously with smooth scrolling.

### HTML Template

```html
<!-- STAGE 2: 1-QUESTION MODEL WALKTHROUGH SLIDE -->
<section class="slide" id="slide-read-model" data-skill="read">
    <div class="slide-inner">
        <div class="notebook">
            <div class="skill-stripe" style="background: var(--col-reading);"></div>
            <div class="page-content">
                <div class="slide-header">
                    <div class="slide-title-group">
                        <span class="skill-badge" style="background: var(--col-reading);">Reading Strategy • Model Walkthrough</span>
                        <h2 class="slide-title">Model Walkthrough: Question 1 &amp; Paragraph [B]</h2>
                    </div>
                    <div class="slide-number">03 / 25</div>
                </div>

                <p class="slide-subtitle" style="font-size: 18px; color: var(--text-muted); margin-bottom: 12px;">
                    Demonstration: Compare the direct color highlighting in Question 1 with Paragraph B.
                </p>

                <div class="two-col" style="flex: 1; min-height: 0; gap: 20px;">
                    <!-- Left Col: Dedicated Paragraph Excerpt -->
                    <div class="reading-pane" style="flex: 1.1;">
                        <h3 style="font-family: var(--font-display); font-size: 19px; margin-bottom: 10px; color: var(--col-reading);">
                            Passage Excerpt: Paragraph [B]
                        </h3>

                        <div style="background: #ffffff; border: 2px solid #93c5fd; border-radius: 10px; padding: 18px 22px; margin-bottom: 14px;">
                            <p style="font-size: 20px; line-height: 1.7; margin-bottom: 0;">
                                <span class="para-tag">[B]</span> <mark class="evidence" id="ev-model-1" data-q="model-1"><span class="syn-pair-1" data-q="model-1">"Extraordinary experiences</span> are <span class="syn-pair-2" data-q="model-1">pleasurable in the moment but can leave us socially worse off in the long run,"</span></mark> says study author Gus Cooney.
                            </p>
                        </div>

                        <div class="card" style="background: rgba(37, 99, 235, 0.05); border-left: 4px solid var(--col-reading); padding: 16px 20px;">
                            <div style="font-size: 16px; font-weight: 800; color: var(--col-reading); margin-bottom: 6px;">
                                🔍 Color-to-Color Grounding
                            </div>
                            <p style="font-size: 15px; line-height: 1.6; color: var(--text-dark); margin-bottom: 0;">
                                • <strong>Green ↔ Green:</strong> <em>"Sharing experiences"</em> matches <em>"Extraordinary experiences"</em>.<br>
                                • <strong>Purple ↔ Purple:</strong> <em>"immediate and long-term"</em> matches <em>"pleasurable in the moment / in the long run"</em>.
                            </p>
                        </div>
                    </div>

                    <!-- Right Col: Single Question 1 Card -->
                    <div class="question-pane" style="flex: 0.9; display: flex; flex-direction: column;">
                        <h3 style="font-family: var(--font-display); font-size: 19px; margin-bottom: 8px; color: var(--col-reading);">
                            Question 1 Deconstruction
                        </h3>

                        <div class="q-card" data-q="model-1">
                            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                                <span style="font-weight: 700; font-size: 16.5px; line-height: 1.55;">
                                    1. <span class="syn-pair-1" data-q="model-1">Sharing experiences</span> provides us with <span class="syn-pair-2" data-q="model-1">immediate and long-term satisfaction</span>.
                                </span>
                                <button class="syn-btn" data-ev="ev-model-1" data-q="model-1">💡 Evidence</button>
                            </div>
                            <div style="margin-top: 10px;">
                                <select class="select-input" data-ans="B" style="width: 150px; font-size: 16px;">
                                    <option value="">Sentence...</option>
                                    <option value="A">Sentence A</option>
                                    <option value="B">Sentence B</option>
                                    <option value="C">Sentence C</option>
                                    <option value="D">Sentence D</option>
                                </select>
                            </div>
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

## 6. Interactive Vocabulary Definitions & Audio Pronunciation Popovers

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

## 7. Direct Sentence Color Coding Standards

Always use the standard dual-layer synonym styling:

| Tag Class | Role | Visual Color | Hex / HSL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **`syn-pair-1`** | **Anchor Concept** | 🟢 **Green** | `#bbf7d0` bg / `#15803d` text | Subject noun, actor, main topic. Used to scan and locate paragraph. |
| **`syn-pair-2`** | **Qualifying Claim** | 🟣 **Purple** | `#e9d5ff` bg / `#6b21a8` text | Scope, degree, condition, timeframe. Used to test truth value / match. |
| **`syn-pair-3`** | **Contrast / Distractor** | 🟠 **Orange** | `#fed7aa` bg / `#9a3412` text | Rebuttal, exception, or trap word. |

### CSS Definition (from `presentation-base.css`)

```css
.syn-pair-1.active-syn {
    background: #bbf7d0 !important;
    color: #14532d !important;
    font-weight: 600;
    border-radius: 3px;
    padding: 1px 4px;
}

.syn-pair-2.active-syn {
    background: #e9d5ff !important;
    color: #581c87 !important;
    font-weight: 600;
    border-radius: 3px;
    padding: 1px 4px;
}
```

---

## 6. Interactive Controls & JavaScript Action Rows

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
    <button class="btn-action btn-primary" onclick="checkAnswers(this)">Check Answers</button>
    <button class="btn-action" onclick="revealAnswers(this)">Reveal Keys</button>
    <button class="btn-action" onclick="resetAnswers(this)">Reset</button>
</div>
```

---

## 7. Question Types & HTML Snippets

### A. Dropdown Select (`.select-input`)
Ideal for Matching Information (Paragraph A–F), Sentence Endings, and YES/NO/NOT GIVEN.

```html
<select class="select-input" data-ans="C" style="width: 140px;">
    <option value="">Select...</option>
    <option value="A">Paragraph A</option>
    <option value="B">Paragraph B</option>
    <option value="C">Paragraph C</option>
    <option value="D">Paragraph D</option>
</select>
```

### B. Text Blank / Gap-Fill (`.blank-input`)
Ideal for Summary Completion, Flowchart Completion, and Short Answer questions.

```html
<input type="text" class="blank-input" data-ans="chocolate|cocoa" placeholder="[1]..." style="width: 130px;">
```
*(Supports multiple valid variants separated by pipe `|`).*

---

## 8. Complete End-to-End Code Blueprint

When creating a new reading module, insert all 3 stages consecutively:

```
Slide N   : [STAGE 1] Pre-reading Question Keyword Deconstruction Slide
Slide N+1 : [STAGE 2] 1-Question Model Walkthrough Slide (with dedicated paragraph excerpt)
Slide N+2 : [STAGE 3] Full Split-View Reading Passage & Complete Question Set Slide
```

---

## 9. Authoring Checklist & Best Practices

Before finalizing any reading presentation, verify against this checklist:

1. [ ] **3-Stage Sequence**: Does every reading task have its dedicated Strategy Slide (Stage 1) and Model Walkthrough (Stage 2) preceding the full text (Stage 3)?
2. [ ] **Direct Sentence Colors**: Are keywords wrapped in `.syn-pair-1` (Anchor) and `.syn-pair-2` (Qualifier) directly on the sentence text without separate spoiler boxes?
3. [ ] **Action Row Present**: Does every strategy and exercise slide contain a clean `.action-row` with `Show Highlights / Check Answers` and `Reset`?
4. [ ] **Step Reveal Shortcut**: Does pressing <kbd>E</kbd> or clicking question cards step-reveal highlights one-by-one?
5. [ ] **Smooth Auto-Scroll**: Does clicking `💡 Evidence` on the model or full exercise slide smoothly center the reading pane on the target `<mark class="evidence">`?
6. [ ] **Clean Reset**: Does clicking `Reset` return all inputs and highlights to their pristine unrevealed state?
