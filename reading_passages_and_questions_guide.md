# Comprehensive Guide: Creating Reading Passages, Questions & Interactive Explanations

This guide details the complete pedagogical and technical standards for designing, authoring, and implementing **IELTS/EAP Reading Passages**, **Question Sets**, and **Interactive Explanations with Synonym Grounding** across both Markdown course notes and interactive HTML presentation decks.

---

## Table of Contents
1. [Pedagogical Architecture](#1-pedagogical-architecture)
2. [Content Design Standards (Markdown)](#2-content-design-standards-markdown)
   - [Reading Passage Structure](#reading-passage-structure)
   - [Question Types & Formatting](#question-types--formatting)
   - [Writing Pedagogically Rich Explanations](#writing-pedagogically-rich-explanations)
3. [Interactive HTML Implementation](#3-interactive-html-implementation)
   - [Slide Container & Split-View Layout](#slide-container--split-view-layout)
   - [Passage Pane & Evidence Highlighting](#passage-pane--evidence-highlighting)
   - [Question Pane & Interactive Input Types](#question-pane--interactive-input-types)
   - [Explanation Boxes & Synonym Tagging](#explanation-boxes--synonym-tagging)
   - [Action Controls Bar](#action-controls-bar)
4. [JavaScript Engine Logic (`deckEngine`)](#4-javascript-engine-logic-deckengine)
5. [CSS Stylesheet Reference](#5-css-stylesheet-reference)
6. [Complete End-to-End Example](#6-complete-end-to-end-example)
7. [Authoring Checklist & Best Practices](#7-authoring-checklist--best-practices)

---

## 1. Pedagogical Architecture

Every reading lesson is built around three core pillars:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        1. AUTHENTIC / ADAPTED TEXT                     │
│  - Academic register, IELTS-aligned topic                              │
│  - Clear paragraph labeling ([Paragraph A], [Paragraph B], etc.)       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        2. TARGETED QUESTION TASKS                      │
│  - Matching Headings / Info / Sentence Endings                         │
│  - Gap-fill / Flowcharts / Summaries / Multiple Choice                 │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               3. DUAL-LAYER GROUNDING & EXPLANATIONS                   │
│  Layer A: Instant Synonym & Text Evidence Highlighting                 │
│  Layer B: Structured Pedagogical Explanations (Quotes + Trap Analysis) │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Content Design Standards (Markdown)

When drafting reading content in Markdown (e.g., `module-lessons.md`), follow this clear hierarchical format.

### Reading Passage Structure

```markdown
### 1. Reading: [Skill Name / Strategy]

#### Reading Passage: "[Passage Title]"
*[Optional subtitle or guiding question]*

##### [Paragraph A]
[Paragraph text with clear topic sentence and supporting evidence...]

##### [Paragraph B]
[Paragraph text...]

*(Note: [Define key low-frequency technical terms if necessary])*
```

---

### Question Types & Formatting

#### A. Matching Sentence Endings / Matching Information
```markdown
#### Reading Exercise: Matching Sentence Endings
Match the sentence beginnings (1–5) with the correct endings (A–G):

##### Sentence Beginnings:
1. **Sports scientists approve of fitness apps because...** $\rightarrow$ **D** *(it shows that the user wishes to develop better fitness practices)*
2. **People have reported that when their apps stop working...** $\rightarrow$ **F** *(they lose the motivation to be active)*

##### Extra Endings (Distractors):
* **B** *(people become very attached to their electronic devices)*
* **G** *(they won't help you achieve your goals)*
```

#### B. Flowchart / Summary Completion (Gap-Fill)
```markdown
#### Reading Exercise: Flowchart Completion
Complete the flowchart below. Choose **NO MORE THAN TWO WORDS** from the passage for each answer:

* **1879**: Cadburys moved their **chocolate** (1) manufacturing business to outside the city.
* **From 1890**: Building of workers' houses, all with big **gardens** (2).
* **1900**: Trust set up to change the village into a proper **community** (3).
```

#### C. Multiple Choice / Heading Matching
```markdown
#### Reading Exercise: Multiple Choice
1. **What is the main danger of relying solely on calorie counters?**
   * A. They are too expensive.
   * **B. They do not account for how different food types are metabolized.** *(Correct)*
   * C. They discourage physical exercise.
   * D. They require frequent software updates.
```

---

### Writing Pedagogically Rich Explanations

Each question explanation **must** contain three elements:
1. **The Answer Key & Location**: Exact Paragraph + Sentence reference.
2. **Keyword & Synonym Alignment (Bilingual / Paraphrase Bridge)**: Direct mapping between Question wording and Text wording.
3. **Reasoning / Distractor Trap Explanation**: Why this answer works and why tempting alternatives fail.

```markdown
#### Explanation Format Template:
* **Question 1 Answer**: **D**
  * **Location**: Paragraph B (Lines 3–5)
  * **Text Evidence**: *"Sports scientists recognise that deciding to use a fitness tracker or app is good because it means a person is curious about health and keen to improve their habits."*
  * **Synonym Mapping**:
    * Question: *"approve of the decision"* $\leftrightarrow$ Text: *"recognise that deciding to use... is good"*
    * Question: *"wishes to develop better practices"* $\leftrightarrow$ Text: *"keen to improve their habits"*
  * **Why Other Options Fail**: Option A refers to Paragraph D, not the scientists' initial approval in Paragraph B.
```

---

## 3. Interactive HTML Implementation

The presentation interface utilizes a 50/50 **Split-View** container layout:
- **Left Column**: The reading passage with paragraph badges and hidden evidence marks.
- **Right Column**: Interactive question cards, input controls, synonym jump buttons, and collapsible explanation panels.

```
┌───────────────────────────────────────┬───────────────────────────────────────┐
│ LEFT: .reading-pane                   │ RIGHT: .question-pane                 │
│                                       │                                       │
│ [Paragraph A]                         │ Question 1: [ Select ▾ ] [💡 Synonyms] │
│ Text text text...                     │                                       │
│                                       │ ┌───────────────────────────────────┐ │
│ [Paragraph B]                         │ │ 💡 Green Match:  "Q phrase" ↔ ... │ │
│ ... <mark id="ev-1">Evidence</mark>   │ │ 💡 Purple Match: "A phrase" ↔ ... │ │
│                                       │ └───────────────────────────────────┘ │
│                                       │ [ ✓ Check ] [ 🔍 Explanations ] [ ↺ ] │
└───────────────────────────────────────┴───────────────────────────────────────┘
```

---

### Slide Container & Split-View Layout

```html
<section class="slide" id="slide-4" data-skill="read">
    <div class="slide-inner">
        <div class="notebook">
            <div class="skill-stripe" style="background: var(--col-reading);"></div>
            
            <!-- Navigation Tabs -->
            <div class="notebook-tabs">
                <div class="notebook-tab tab-read active" onclick="deckEngine.jumpToSkill('read')">Read</div>
                <div class="notebook-tab tab-grammar" onclick="deckEngine.jumpToSkill('grammar')">Grammar</div>
                <div class="notebook-tab tab-vocab" onclick="deckEngine.jumpToSkill('vocab')">Vocab</div>
                <div class="notebook-tab tab-write" onclick="deckEngine.jumpToSkill('write')">Write</div>
                <div class="notebook-tab tab-review" onclick="deckEngine.jumpToSkill('review')">Review</div>
            </div>

            <div class="page-content">
                <div class="slide-header">
                    <span class="skill-badge" style="background: var(--col-reading);">Reading Practice</span>
                    <span class="slide-number">04 / 16</span>
                </div>
                <h2 class="slide-title">"Monitoring Fitness" — Matching Sentence Endings</h2>
                <p class="slide-subtitle">Read the passage and match sentence beginnings 1–5 to endings A–G.</p>

                <!-- SPLIT CONTAINER -->
                <div class="split-view-container">
                    <!-- LEFT PANE: Reading Passage -->
                    <div class="reading-pane" id="readingPassage4a">
                        <!-- Passage content with marks -->
                    </div>

                    <!-- RIGHT PANE: Questions & Explanations -->
                    <div class="question-pane" id="matchTask4a">
                        <!-- Questions and action buttons -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

### Passage Pane & Evidence Highlighting

Enclose evidence in `<mark class="evidence" id="ev-[module]-[qNum]">` tags.  
Tag specific synonym keywords with `<span class="syn-pair-1" data-q="[qId]">` and `<span class="syn-pair-2" data-q="[qId]">`.

```html
<div class="reading-pane" id="readingPassage4a">
    <h3>Monitoring Fitness</h3>
    
    <p><span class="para-tag">[Paragraph A]</span> Technology has become an important aspect of life...</p>
    
    <p><span class="para-tag">[Paragraph B]</span> 
        <mark class="evidence" id="ev-4a-1">
            <span class="syn-pair-1" data-q="4a-1">Sports scientists recognise that deciding to use a fitness tracker or app is good</span> 
            because it means a person is curious about health and 
            <span class="syn-pair-2" data-q="4a-1">keen to improve their habits</span>.
        </mark>
        If the attractive design of a device encourages an interest in keeping fit, its impact is clearly positive.
    </p>

    <p><span class="para-tag">[Paragraph C]</span> 
        <mark class="evidence" id="ev-4a-2">
            Unfortunately, however, many walkers have added that 
            <span class="syn-pair-1" data-q="4a-2">when their devices broke</span> and they no longer knew how many steps they had taken, 
            <span class="syn-pair-2" data-q="4a-2">there seemed little point in heading out for that walk</span>.
        </mark>
    </p>
</div>
```

---

### Question Pane & Interactive Input Types

#### 1. Dropdown Select Input (`.select-input`)
Ideal for Matching Endings, Headings, or Multiple-Choice letters.

```html
<div class="q-card">
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
        <span><strong>1.</strong> Sports scientists <span class="syn-pair-1" data-q="4a-1">approve of the decision</span> to use fitness apps because...</span>
        <button class="syn-btn" onclick="deckEngine.toggleSynonymExplanation('4a-1', 'ev-4a-1')">💡 Synonyms</button>
    </div>
    
    <div>
        <select class="select-input" data-ans="D">
            <option value="">-- Select Ending --</option>
            <option value="A">A: they give an unrealistic impression</option>
            <option value="B">B: people become attached to devices</option>
            <option value="C">C: pay more attention to appearance</option>
            <option value="D">D: user wishes to develop better practices</option>
            <option value="E">E: someone wants to lose weight</option>
            <option value="F">F: they lose motivation to be active</option>
        </select>
    </div>

    <!-- Collapsible Explanation -->
    <div class="item-explanation">
        <div class="syn-key-box">
            <span class="syn-tag green">Green Match:</span> 
            <em>"approve of decision to use"</em> ↔ <em>"recognise that deciding to use... is good"</em>
        </div>
        <div class="syn-key-box">
            <span class="syn-tag purple">Purple Match:</span> 
            <em>"wishes to develop better practices" (D)</em> ↔ <em>"keen to improve their habits"</em>
        </div>
    </div>
</div>
```

---

#### 2. Text Blank / Gap-Fill Input (`.blank-input`)
Ideal for Summary Completion, Flowchart Completion, and Short Answer questions.

```html
<div class="flowchart-step-card">
    <span class="step-date-tag">1879</span>
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
        <div>
            Cadburys moved their 
            <input type="text" class="blank-input" id="bv1" data-ans="chocolate" placeholder="[1]..." style="width:125px;"> 
            manufacturing business outside the city.
        </div>
        <button class="syn-btn" onclick="deckEngine.toggleSynonymExplanation('7a-1', 'ev-7a-1')">💡 Synonyms</button>
    </div>

    <div class="item-explanation">
        <div class="syn-key-box">
            <span class="syn-tag green">Green Match:</span> 
            <em>"manufacturing business"</em> ↔ <em>"chocolate factory"</em>
        </div>
        <div class="syn-key-box">
            <span class="syn-tag purple">Purple Match:</span> 
            <em>"to outside the city"</em> ↔ <em>"left the city centre for a location south"</em>
        </div>
    </div>
</div>
```
*(Support multiple valid variants using pipe `|` in `data-ans="sports facilities|sports pitches"`).*

---

#### 3. Interactive Option Cards (`.opt-card`)
Ideal for Single or Multiple Selection MCQs.

```html
<div class="opt-grid">
    <div class="opt-card" data-correct="false" onclick="deckEngine.toggleOptCard(this)">
        <strong>A.</strong> Calorie tracking devices cause users to over-exercise.
    </div>
    <div class="opt-card" data-correct="true" onclick="deckEngine.toggleOptCard(this)">
        <strong>B.</strong> Digital metrics fail to give a comprehensive picture of overall health.
    </div>
    <div class="opt-card" data-correct="false" onclick="deckEngine.toggleOptCard(this)">
        <strong>C.</strong> Psychological awareness has no impact on weight management.
    </div>
</div>
```

---

### Explanation Boxes & Synonym Tagging

Use distinct colored synonym tags for visual clarity:
- **Green (`.syn-tag.green`)**: Question keyword to passage text match.
- **Purple (`.syn-tag.purple`)**: Answer key / Option paraphrase to passage text match.
- **Orange (`.syn-tag.orange`)**: Distractor trap, condition, or contrast marker.

```html
<div class="item-explanation">
    <!-- Synonym Key Box 1 -->
    <div class="syn-key-box">
        <span class="syn-tag green">Green Match:</span> 
        <em>"stop working"</em> ↔ <em>"when their devices broke"</em>
    </div>

    <!-- Synonym Key Box 2 -->
    <div class="syn-key-box">
        <span class="syn-tag purple">Purple Match:</span> 
        <em>"lose motivation to be active" (Option F)</em> ↔ <em>"there seemed little point in heading out for that walk"</em>
    </div>

    <!-- Optional Detail Box -->
    <div style="margin-top:6px; font-size:0.9em; color:var(--text-muted);">
        💡 <strong>Grammar Clue:</strong> The past conjunction <em>"when"</em> introduces the trigger event in Paragraph C.
    </div>
</div>
```

---

### Action Controls Bar

Place standard action buttons at the bottom of the `.question-pane`:

```html
<div class="action-row">
    <!-- For select-based tasks -->
    <button class="btn-action btn-primary" onclick="deckEngine.checkSelects('matchTask4a')">✓ Check</button>
    <button class="btn-action" onclick="deckEngine.toggleExplanations('matchTask4a')">🔍 Explanations</button>
    <button class="btn-action" onclick="deckEngine.revealSelects('matchTask4a')">👁️ Reveal</button>
    <button class="btn-action" onclick="deckEngine.resetSelects('matchTask4a')">↺ Reset</button>
</div>
```
*(For text input tasks, use `deckEngine.checkBlanks`, `deckEngine.revealBlanks`, `deckEngine.resetBlanks`).*

---

## 4. JavaScript Engine Logic (`deckEngine`)

Add these methods to your `deckEngine` object to power verification, highlight jumping, and reveal mechanics:

```javascript
const deckEngine = {
    // 1. Toggle Single Synonym Pair & Auto-scroll to Evidence
    toggleSynonymExplanation(qKey, evId) {
        const evTarget = document.getElementById(evId);
        const synSpans = document.querySelectorAll(`[data-q="${qKey}"]`);
        const isCurrentlyActive = evTarget && evTarget.classList.contains('highlighted');

        // Clear all active highlights
        document.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.remove('active-syn'));
        document.querySelectorAll('mark.evidence').forEach(m => m.classList.remove('highlighted'));

        // If not already active, activate and smooth scroll
        if (!isCurrentlyActive) {
            if (evTarget) {
                evTarget.classList.add('highlighted');
                evTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            synSpans.forEach(s => s.classList.add('active-syn'));
        }
    },

    // 2. Toggle Visibility of All Explanations in Container
    toggleExplanations(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const explanations = container.querySelectorAll('.item-explanation');
        explanations.forEach(exp => exp.classList.toggle('show'));
    },

    // 3. Check Select Dropdowns
    checkSelects(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const selects = container.querySelectorAll('.select-input');
        selects.forEach(select => {
            const val = select.value.trim().toUpperCase();
            const ans = select.dataset.ans.trim().toUpperCase();
            select.classList.remove('correct', 'wrong');
            select.classList.add(val === ans ? 'correct' : 'wrong');
        });
        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
        document.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.add('active-syn'));
        document.querySelectorAll('mark.evidence').forEach(m => m.classList.add('highlighted'));
    },

    // 4. Reveal Select Dropdowns
    revealSelects(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const selects = container.querySelectorAll('.select-input');
        selects.forEach(select => {
            select.value = select.dataset.ans;
            select.classList.remove('wrong');
            select.classList.add('correct');
        });
        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
        document.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.add('active-syn'));
        document.querySelectorAll('mark.evidence').forEach(m => m.classList.add('highlighted'));
    },

    // 5. Reset Select Dropdowns
    resetSelects(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const selects = container.querySelectorAll('.select-input');
        selects.forEach(select => {
            select.value = '';
            select.classList.remove('correct', 'wrong');
        });
        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.remove('show'));
        document.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.remove('active-syn'));
        document.querySelectorAll('mark.evidence').forEach(m => m.classList.remove('highlighted'));
    },

    // 6. Check Text Gap-Fills
    checkBlanks(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const inputs = container.querySelectorAll('.blank-input');
        inputs.forEach(input => {
            const userVal = input.value.trim().toLowerCase();
            const allowedAnswers = input.dataset.ans.toLowerCase().split('|').map(a => a.trim());
            const isCorrect = allowedAnswers.includes(userVal);
            input.classList.remove('correct', 'wrong');
            input.classList.add(isCorrect ? 'correct' : 'wrong');
        });
        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
        document.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.add('active-syn'));
        document.querySelectorAll('mark.evidence').forEach(m => m.classList.add('highlighted'));
    },

    // 7. Reveal Text Gap-Fills
    revealBlanks(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const inputs = container.querySelectorAll('.blank-input');
        inputs.forEach(input => {
            input.value = input.dataset.ans.split('|')[0];
            input.classList.remove('wrong');
            input.classList.add('correct');
        });
        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
        document.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.add('active-syn'));
        document.querySelectorAll('mark.evidence').forEach(m => m.classList.add('highlighted'));
    },

    // 8. Reset Text Gap-Fills
    resetBlanks(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const inputs = container.querySelectorAll('.blank-input');
        inputs.forEach(input => {
            input.value = '';
            input.classList.remove('correct', 'wrong');
        });
        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.remove('show'));
        document.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.remove('active-syn'));
        document.querySelectorAll('mark.evidence').forEach(m => m.classList.remove('highlighted'));
    },

    // 9. Option Card Selection & Checking
    toggleOptCard(card) {
        card.classList.toggle('selected');
    },

    checkMultiOpts(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const cards = container.querySelectorAll('.opt-card');
        cards.forEach(card => {
            const isCorrect = card.dataset.correct === 'true';
            const isSelected = card.classList.contains('selected');
            card.classList.remove('correct-opt', 'wrong-opt');
            if (isSelected) {
                card.classList.add(isCorrect ? 'correct-opt' : 'wrong-opt');
            } else if (isCorrect) {
                card.classList.add('correct-opt');
            }
        });
        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
    }
};
```

---

## 5. CSS Stylesheet Reference

Include these essential CSS styles to achieve the look and feel:

```css
/* --- Split-View Container --- */
.split-view-container {
    display: flex;
    gap: 20px;
    height: calc(100vh - 220px);
    margin-top: 14px;
}

.reading-pane {
    flex: 1.1;
    background: #ffffff;
    border: 1.5px solid #cbd5e1;
    border-radius: 12px;
    padding: 22px 26px;
    overflow-y: auto;
    font-size: 16.5px;
    line-height: 1.75;
    color: #1e293b;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}

.reading-pane h3 {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 14px;
    color: #0f172a;
}

.para-tag {
    display: inline-block;
    font-weight: 700;
    color: #2563eb;
    margin-right: 6px;
    font-size: 0.9em;
}

.question-pane {
    flex: 0.9;
    background: #f8fafc;
    border: 1.5px solid #cbd5e1;
    border-radius: 12px;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

/* --- Evidence & Synonym Highlighting --- */
mark.evidence {
    background: transparent;
    color: inherit;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 4px;
    padding: 2px 4px;
}

mark.evidence.highlighted {
    background: #fef08a !important;
    box-shadow: 0 0 0 3px #fef08a;
}

.syn-pair-1, .syn-pair-2, .syn-pair-3 {
    transition: all 0.25s ease;
    border-radius: 3px;
    padding: 1px 3px;
}

.syn-pair-1.active-syn {
    background: #bbf7d0 !important; /* Green */
    color: #14532d !important;
    font-weight: 600;
}

.syn-pair-2.active-syn {
    background: #e9d5ff !important; /* Purple */
    color: #581c87 !important;
    font-weight: 600;
}

.syn-pair-3.active-syn {
    background: #fed7aa !important; /* Orange */
    color: #7c2d12 !important;
    font-weight: 600;
}

/* --- Question Cards & Inputs --- */
.q-card, .flowchart-step-card {
    background: #ffffff;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 15.5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.select-input, .blank-input {
    font-family: inherit;
    font-size: 15px;
    padding: 6px 12px;
    border: 1.5px solid #cbd5e1;
    border-radius: 6px;
    background: #ffffff;
    transition: border-color 0.2s;
}

.select-input:focus, .blank-input:focus {
    outline: none;
    border-color: #2563eb;
}

.select-input.correct, .blank-input.correct {
    border-color: #16a34a !important;
    background: #f0fdf4 !important;
    color: #15803d !important;
}

.select-input.wrong, .blank-input.wrong {
    border-color: #dc2626 !important;
    background: #fef2f2 !important;
    color: #b91c1c !important;
}

/* --- Buttons & Synonym Keys --- */
.syn-btn {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    color: #2563eb;
    padding: 3px 10px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
}

.syn-btn:hover {
    background: #eff6ff;
    border-color: #2563eb;
}

.item-explanation {
    display: none;
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 10px 14px;
    margin-top: 6px;
    font-size: 14px;
    animation: fadeIn 0.3s ease;
}

.item-explanation.show {
    display: block;
}

.syn-key-box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    background: #ffffff;
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    margin-top: 4px;
    font-size: 13.5px;
}

.syn-tag {
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    text-transform: uppercase;
}

.syn-tag.green { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
.syn-tag.purple { background: #f3e8ff; color: #6b21a8; border: 1px solid #d8b4fe; }
.syn-tag.orange { background: #ffedd5; color: #9a3412; border: 1px solid #fed7aa; }

/* --- Action Controls Row --- */
.action-row {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    flex-wrap: wrap;
}

.btn-action {
    padding: 8px 16px;
    border-radius: 8px;
    border: 1.5px solid #cbd5e1;
    background: #ffffff;
    color: #1e293b;
    font-size: 14.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-action:hover {
    background: #f8fafc;
    border-color: #94a3b8;
}

.btn-action.btn-primary {
    background: #2563eb;
    color: #ffffff;
    border-color: #2563eb;
}

.btn-action.btn-primary:hover {
    background: #1d4ed8;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
}
```

---

## 6. Complete End-to-End Example

Here is a complete slide snippet ready to drop into any module presentation:

```html
<!-- SLIDE: READING PASSAGE WITH SYNONYM GROUNDING -->
<section class="slide" id="slide-read-demo" data-skill="read">
    <div class="slide-inner">
        <div class="notebook">
            <div class="skill-stripe" style="background: var(--col-reading, #0284c7);"></div>

            <div class="page-content">
                <div class="slide-header">
                    <span class="skill-badge" style="background: #0284c7; color:#fff;">Reading Skills</span>
                    <span class="slide-number">04 / 16</span>
                </div>
                <h2 class="slide-title">Bournville Village: Community Planning</h2>
                <p class="slide-subtitle">Read the history of Bournville and complete the chronological timeline.</p>

                <div class="split-view-container">
                    <!-- Left: Reading Passage -->
                    <div class="reading-pane" id="bournvilleText">
                        <h3>The Story of Bournville</h3>
                        
                        <p><span class="para-tag">Para A</span> In 1879, George and Richard Cadbury moved their rapidly expanding cocoa manufacturing business out of central Birmingham to the countryside to build a modern chocolate factory.</p>
                        
                        <p><span class="para-tag">Para B</span> 
                            <mark class="evidence" id="ev-bv-1">
                                From 1890 onwards, George Cadbury began building a village for his factory workers, ensuring each home had a <span class="syn-pair-1" data-q="bv-1">large</span> <span class="syn-pair-2" data-q="bv-1">garden</span> for recreation and growing vegetables.
                            </mark>
                        </p>
                    </div>

                    <!-- Right: Question Task -->
                    <div class="question-pane" id="bournvilleTimeline">
                        <div class="flowchart-step-card">
                            <span class="step-date-tag" style="background:#e0f2fe; color:#0369a1; padding:2px 8px; border-radius:4px; font-weight:700; font-size:12px; width:max-content;">From 1890</span>
                            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
                                <div>
                                    Building of workers' houses, all with big 
                                    <input type="text" class="blank-input" id="bv_input_1" data-ans="gardens|garden" placeholder="[1]..." style="width:130px;">.
                                </div>
                                <button class="syn-btn" onclick="deckEngine.toggleSynonymExplanation('bv-1', 'ev-bv-1')">💡 Synonyms</button>
                            </div>

                            <div class="item-explanation">
                                <div class="syn-key-box">
                                    <span class="syn-tag green">Green Match:</span> 
                                    <em>"big"</em> ↔ <em>"large"</em>
                                </div>
                                <div class="syn-key-box">
                                    <span class="syn-tag purple">Purple Match:</span> 
                                    <em>"gardens"</em> ↔ <em>"garden for recreation"</em>
                                </div>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="action-row">
                            <button class="btn-action btn-primary" onclick="deckEngine.checkBlanks('bournvilleTimeline')">✓ Check</button>
                            <button class="btn-action" onclick="deckEngine.toggleExplanations('bournvilleTimeline')">🔍 Explanations</button>
                            <button class="btn-action" onclick="deckEngine.revealBlanks('bournvilleTimeline')">👁️ Reveal</button>
                            <button class="btn-action" onclick="deckEngine.resetBlanks('bournvilleTimeline')">↺ Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

## 7. Authoring Checklist & Best Practices

Before deploying any new reading passage and question slide, verify against this checklist:

1. [ ] **Paragraph Badging**: Are paragraphs cleanly labeled with `<span class="para-tag">[Paragraph X]</span>`?
2. [ ] **Evidence Pairing**: Does every question have a corresponding `<mark class="evidence" id="ev-...">` in the text?
3. [ ] **Unique Keys**: Are `data-q="..."` attributes unique and strictly matching between the question button and the passage text spans?
4. [ ] **Synonym Clarity**: Are there at least two distinct color-coded synonym tags (e.g., Green for Question match, Purple for Answer match)?
5. [ ] **Flexible Blank Matching**: Are gap-fill inputs configured with pipe separators (`data-ans="ans1|ans2"`) for acceptable variants and plurals?
6. [ ] **Distractor Grounding**: If multiple options are tempting, does the explanation clarify why incorrect options fail?
7. [ ] **Smooth Auto-Scroll**: Does clicking `💡 Synonyms` center the evidence smoothly in the left reading pane?
8. [ ] **Clean Reset**: Does the Reset button clear all inputs, hide explanation panels, and remove highlight styles?
