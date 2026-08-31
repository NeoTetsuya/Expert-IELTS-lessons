# Universal Slide Deck Creation & Maintenance Protocol

When creating, updating, or maintaining IELTS HTML presentation decks (`expert 5/`, `expert 6/`, `expert 7.5/`, etc.):

## 1. Golden Commandments Before Any Modification
1. **Always Backup First**: Create a timestamped/versioned copy (`.bak`) of both `module-XX.html` and `module-XX-data.js`.
2. **Strict Markdown Scope**:
   - Keep ONLY content appearing in the source markdown file (`md files/.../m{X} content.md`).
   - Remove speaking if not in markdown; remove unrequested vocabulary or grammar drills.
3. **Chart Persistence on ALL Writing Task 1 Slides**:
   - For all Task 1 exercises (data selection, comparative sentences, linking phrases, error correction, and model answers), **display the interactive chart on the left of EVERY exercise slide**.
   - Use `template="writing-model"` with `slot="prompt"` containing the chart container and unique DOM ID.
4. **Universal Grammar Reference Integration & Handbook Links**:
   - On Grammar Masterclass and Practice slides, attach the modal trigger button or handbook link pointing to the live GitHub Pages site: `https://neotetsuya.github.io/Expert-IELTS/` with the correct relative path (e.g. `https://neotetsuya.github.io/Expert-IELTS/expert%206/module_2a_relative_clauses.html` or `../references/grammar_sources/expert_{level}/module_{X}.html` when local).
   - When creating or linking a Grammar Handbook, ensure the online link format `https://neotetsuya.github.io/Expert-IELTS/[expert level]/[module_file.html]` is accurately provided with the correct path.
5. **Strict 1-Question-Per-Slide Reading Walkthroughs**:
   - Every reading question MUST have its own dedicated walkthrough slide (`template="walkthrough"`) with verbatim paragraph excerpt, highlighted evidence (`mark.evidence`), synonym pairing (`.syn-pair-1`, `.syn-pair-2`), and explanation.
   - **Multi-Select / Feature Questions**: When questions are multi-select (e.g. *Questions 8–10: Choose THREE letters A–G*), **split each question into a separate slide** (Q8 on Slide A, Q9 on Slide B, Q10 on Slide C) rather than grouping them together.
6. **No LaTeX Math Syntax**:
   - Never output `$\rightarrow$` or `\times`. Always use Unicode `➔`, `→`, `×`, `÷`, `±`, `%`.
7. **Mandatory Module Review Slide**:
   - Every module MUST end with a `template="summary-checklist"` slide (`skill="review"`) summarizing Reading, Grammar, and Writing competencies.
8. **Tag Balancing & Integrity Check**:
   - Every `<slide-card>` must have a matching `</slide-card>` and must NOT be nested.
   - Run verification script: `node -e "const fs = require('fs'); const c = fs.readFileSync('path/to/module.html', 'utf8'); console.log('Open:', (c.match(/<slide-card/g)||[]).length, 'Close:', (c.match(/<\/slide-card>/g)||[]).length);"`
   - Verify that `slidesCount` in `-data.js` matches the HTML count exactly.
9. **Dedicated 'Before You Read' Slides**:
   - Never combine pre-reading warm-up questions on the same slide with reading passage analysis.
   - Always allocate a dedicated `template="exercise-grid"` slide for discussion and pre-taught bold vocabulary before transitioning to reading strategies and passages.
10. **Modern Section Divider Preset**:
   - Use `template="section-divider"` with `badge="..."`, `num="..."`, and `slot="content"` containing `<div class="section-topic">` elements with `.section-topic-dot`.
   - Never nest duplicate `.section-left` or `00` placeholder structures.
11. **No Duplicate List Numbering**:
   - Never place `<strong>1.</strong>` inside `<ol>` tags. Use flex column `<div>` containers for manual bold numbering.
12. **Native Task 1 Chart Integration (`DeckCharts`)**:
   - Provide full-width card containers without rigid fixed heights (`style="width:100%; background:#ffffff; border-radius:12px; padding:12px; border:1.5px solid var(--border-soft, rgba(0,0,0,0.08)); box-shadow:0 2px 8px rgba(0,0,0,0.03); margin-bottom:12px;"`).
   - Define datasets in `-data.js` with `xAxis` (or `xCategories`), `yAxisLabel`, `yUnit`, and color-mapped `series`.
13. **Dynamic Content Auto-Fit & Sizing**:
   - Lean into the built-in bidirectional `DeckEngine.autoFitSlide` engine; avoid manual negative margins or inline `!important` font hacks.
14. **Title Slide Roadmap & Syllabus Requirement**:
   - Always populate Slide 1 `<slide-card template="title">` with `<div slot="roadmap">` containing interactive `.title-skill-card` navigation elements.
15. **Dataset Script Loading Order & Schema Protocol**:
   - In the HTML footer, `<script src="module-XX-data.js"></script>` MUST be loaded **BEFORE** `template-engine.js` and `deck-bundle.js`.
   - In `-data.js`, summary passage property names must strictly be `summaryText` (not `summaryHTML` or arbitrary names) and must export global window aliases (`window.readingXa = ...`) for seamless template hydration.
16. **Walkthrough & Grammar Template Slot Standardization**:
   - `template="walkthrough"` strictly uses: `slot="passage-header"`, `slot="passage-text"`, `slot="question-text"`, `slot="input-area"`, and `slot="explanation"` (containing `<div class="syn-key-box">` elements). Never use `slot="answer-input"` or `slot="synonyms"`.
   - `template="grammar-masterclass"` strictly uses: `slot="rules"` (left col) and `slot="contrast-card"` (right col with modal trigger button). Do not invent `template="grammar-rule"`.
17. **Build Verification**:
   - Always run `node build-bundle.js` after modifications to ensure 0 build errors.




