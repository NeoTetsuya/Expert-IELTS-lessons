---
name: ielts-exercise-builder
description: >-
  Specialized skill for creating, formatting, and scripting interactive IELTS
  exercises in the Expert-IELTS-lessons repository. Covers declarative
  <slide-card> exercise blueprints for Drag Gap-Fill, Category Sorter,
  Matching Pairs, Sentence Scramble, Multiple Choice, and Dropdown Selectors,
  as well as standard Action Row controls (checkAnswers, revealAnswers,
  resetAnswers), [data-ans] attributes, and auto-grading mechanics. Use whenever
  building or troubleshooting interactive slides.
---

# IELTS Interactive Exercise Builder Guide

This guide provides declarative copy-paste blueprints and scripting rules for all interactive exercise types in the Expert IELTS presentation suite.

---

## 1. Universal Exercise Invariants

Every interactive exercise slide in this repository MUST obey these 4 rules:

1. **Standard Action Row**:
   ```html
   <div slot="actions">
       <button class="btn-action btn-primary" onclick="checkAnswers(this)">Check Answers</button>
       <button class="btn-action" onclick="revealAnswers(this)">Reveal Keys</button>
       <button class="btn-action" onclick="resetAnswers(this)">Reset</button>
   </div>
   ```
2. **`[data-ans]` Attribute on Every Input**:
   - `<select class="select-input" data-ans="B">`
   - `<input type="text" class="blank-input" data-ans="consumption">`
   - The engine automatically compares case-insensitively and normalizes curly quotes (`" "`, `' '`).
3. **Explaining Answers**:
   - Each item can include an `.item-explanation` element that reveals automatically upon answering correctly or pressing "Reveal Keys".
4. **Theme Shield Protection**:
   - Never hardcode fixed dark/light inline colors on text. Use CSS variables like `var(--text-dark)`, `var(--col-reading)`, etc.

---

## 2. Interactive Template Blueprints

### Blueprint A: Drag-and-Drop Gap-Fill (`template="drag-gapfill"`)
```html
<slide-card template="drag-gapfill" skill="vocab" title="Vocabulary Mastery: Academic Collocations" subtitle="Drag the correct word chip into each blank, or click chips sequentially.">
    <div slot="chips">
        <span class="word-chip" data-word="consecutive">consecutive</span>
        <span class="word-chip" data-word="substantial">substantial</span>
        <span class="word-chip" data-word="predominantly">predominantly</span>
    </div>

    <div slot="content">
        <div class="card" style="padding: 24px; font-size: 21px; line-height: 1.8;">
            <p>1. The economy experienced growth for five <span class="gap-slot" data-ans="consecutive"></span> quarters.</p>
            <p>2. There was a <span class="gap-slot" data-ans="substantial"></span> increase in student enrollment.</p>
            <p>3. The audience was composed <span class="gap-slot" data-ans="predominantly"></span> of university faculty.</p>
        </div>
    </div>

    <div slot="actions">
        <button class="btn-action btn-primary" onclick="checkAnswers(this)">Check Answers</button>
        <button class="btn-action" onclick="revealAnswers(this)">Reveal Keys</button>
        <button class="btn-action" onclick="resetAnswers(this)">Reset</button>
    </div>
</slide-card>
```

---

### Blueprint B: Category Sorter (`template="category-sorter"`)
```html
<slide-card template="category-sorter" skill="grammar" title="Cohesive Devices: Contrast vs. Concession" subtitle="Classify each transition device into the correct grammatical category.">
    <div slot="pool">
        <span class="sort-chip" data-cat="contrast">In contrast</span>
        <span class="sort-chip" data-cat="concession">Although</span>
        <span class="sort-chip" data-cat="contrast">Conversely</span>
        <span class="sort-chip" data-cat="concession">Despite</span>
    </div>

    <div slot="categories">
        <div class="category-bucket" data-category="contrast">
            <div class="bucket-header">Direct Contrast</div>
            <div class="bucket-zone"></div>
        </div>
        <div class="category-bucket" data-category="concession">
            <div class="bucket-header">Concession &amp; Counter-argument</div>
            <div class="bucket-zone"></div>
        </div>
    </div>

    <div slot="actions">
        <button class="btn-action btn-primary" onclick="checkCategorySort(this)">Check Answers</button>
        <button class="btn-action" onclick="revealCategorySort(this)">Reveal Keys</button>
        <button class="btn-action" onclick="resetCategorySort(this)">Reset</button>
    </div>
</slide-card>
```

---

### Blueprint C: Matching Pairs (`template="matching-pairs"`)
```html
<slide-card template="matching-pairs" skill="read" title="Academic Synonyms Matching" subtitle="Match each formal academic phrase on the left with its contextual meaning.">
    <div slot="pairs">
        <div class="matching-container" data-exercise="vocab-match">
            <div class="matching-col left-col">
                <div class="match-item" data-id="1">1. Pragmatic approach</div>
                <div class="match-item" data-id="2">2. Unprecedented rate</div>
                <div class="match-item" data-id="3">3. Mitigate risks</div>
            </div>
            <div class="matching-col right-col">
                <div class="match-target" data-match="2">Never experienced before</div>
                <div class="match-target" data-match="3">Reduce potential danger</div>
                <div class="match-target" data-match="1">Practical, realistic method</div>
            </div>
        </div>
    </div>

    <div slot="actions">
        <button class="btn-action btn-primary" onclick="checkMatching(this)">Check Answers</button>
        <button class="btn-action" onclick="revealMatching(this)">Reveal Keys</button>
        <button class="btn-action" onclick="resetMatching(this)">Reset</button>
    </div>
</slide-card>
```

---

### Blueprint D: Choice Selector / Multiple Choice (`template="choice-selector"`)
```html
<slide-card template="choice-selector" skill="read" title="Reading Multiple Choice Practice" subtitle="Select the single best answer based on paragraph [C].">
    <div slot="question">
        <div class="card" style="padding: 22px; font-size: 21px; margin-bottom: 20px;">
            According to the author, what was the primary obstacle faced by early researchers?
        </div>
    </div>

    <div slot="options">
        <div class="choice-group" data-correct="B">
            <div class="choice-option" data-val="A"><strong>A.</strong> Inadequate funding from private sponsors</div>
            <div class="choice-option" data-val="B"><strong>B.</strong> Technical limitations in atmospheric measurement</div>
            <div class="choice-option" data-val="C"><strong>C.</strong> Reluctance among international peer scientists</div>
            <div class="choice-option" data-val="D"><strong>D.</strong> Strict governmental privacy regulations</div>
        </div>
    </div>

    <div slot="actions">
        <button class="btn-action btn-primary" onclick="checkChoiceSelection(this)">Check Answer</button>
        <button class="btn-action" onclick="revealChoiceSelection(this)">Reveal Answer</button>
        <button class="btn-action" onclick="resetChoiceSelection(this)">Reset</button>
    </div>
</slide-card>
```

---

## 3. Keyboard Shortcut Integration
- Users and teachers can press <kbd>E</kbd> at any time during presentation mode to step-reveal the answers on the active slide.
- Pressing <kbd>Shift + T</kbd> cycles theme presets live without resetting the student's answered states.
