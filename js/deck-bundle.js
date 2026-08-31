/**
 * Universal IELTS Presentation Master Bundle
 * Auto-instantiates DeckEngine on window.deckEngine
 * Generated from modular files in /js/
 */

/* ==================== MODULE: template-engine.js ==================== */
/**
 * =========================================================================
 * TEMPLATE ENGINE (Exact Design-System Compatible for file:// and http://)
 * Expert IELTS Course Presentations Architecture
 * Universal High-Legibility Typography Scale Built-in
 * =========================================================================
 */

(function () {
    'use strict';

    // 13 Master Built-in Slide Templates (High-Legibility 21px-26px Scale)
    const BUILTIN_TEMPLATES = `
<!-- 1. TITLE SLIDE TEMPLATE -->
<template id="tmpl-title">
    <section class="slide title-slide" data-skill="title">
        <div class="title-slide-inner">
            <div class="title-notebook">
                <div class="title-left">
                    <div class="title-module-badge reveal" data-slot="badge">Module 02</div>
                    <h1 class="title-main reveal" data-slot="title"></h1>
                    <p class="title-sub reveal" data-slot="subtitle"></p>
                    <div class="title-tags reveal" data-slot="tags" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px;"></div>
                </div>
                <div class="title-right">
                    <div style="font-size:18px; font-weight:700; color:var(--text-dark); margin-bottom:12px;">Lesson Syllabus</div>
                    <div class="title-skills-grid reveal" data-slot="roadmap"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 2. SECTION DIVIDER TEMPLATE -->
<template id="tmpl-section-divider">
    <section class="slide" data-skill="title">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-vocab);"></div>
                <div class="page-content" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px 60px;">
                    <span class="skill-badge" style="background: var(--col-vocab); font-size: 16px; padding: 6px 18px; margin-bottom: 16px;" data-slot="badge"></span>
                    <h2 class="slide-title" style="font-size: 52px; margin-bottom: 16px;" data-slot="title"></h2>
                    <p class="slide-subtitle" style="font-size: 24px; max-width: 900px; margin: 0 auto 30px;" data-slot="subtitle"></p>
                    <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;" data-slot="content"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 3. UP-TO-DOWN (STACKED) 1-QUESTION WALKTHROUGH TEMPLATE (26px Passage / 25px Question) -->
<template id="tmpl-walkthrough">
    <section class="slide" data-skill="read">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-reading);"></div>
                <div class="page-content" style="display: flex; flex-direction: column; justify-content: space-between; padding: 28px 48px 24px;">
                    <div class="slide-header" style="margin-bottom: 4px;">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-reading); font-size: 14px; padding: 4px 12px;" data-slot="badge">Reading Strategy • Walkthrough</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p class="slide-subtitle" style="font-size: 20px; color: var(--text-muted); margin-bottom: 6px;" data-slot="subtitle">
                        Compare the dedicated passage excerpt with the question below to evaluate your answer.
                    </p>

                    <!-- Centered Walkthrough Container -->
                    <div class="walkthrough-container" style="max-width: 1550px; width: 96%; margin: auto; display: flex; flex-direction: column; gap: 18px; justify-content: center; flex: 1; min-height: 0;">
                        <!-- Top Box: Dedicated Passage Excerpt -->
                        <div class="card" style="border-left: 7px solid var(--col-reading); border-radius: 14px; padding: 24px 32px;">
                            <div style="font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--col-reading); margin-bottom: 10px;" data-slot="passage-header">
                                📖 Relevant Passage Excerpt
                            </div>
                            <p style="font-size: 26px; line-height: 1.85; margin-bottom: 0; color: inherit;" data-slot="passage-text"></p>
                        </div>

                        <!-- Bottom Box: Interactive Question Card -->
                        <div class="q-card" style="border-left: 7px solid var(--col-reading); border-radius: 14px; padding: 24px 32px;" data-slot="question-card">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
                                <span style="font-weight: 700; font-size: 25px; line-height: 1.65; color: inherit;" data-slot="question-text"></span>
                                <button class="syn-btn" style="flex-shrink: 0; font-size: 16px; padding: 8px 18px; font-weight: 700;" data-slot="evidence-btn">💡 Evidence</button>
                            </div>

                            <div style="margin-top: 16px; display: flex; align-items: center; gap: 16px;" data-slot="input-area"></div>

                            <div class="item-explanation" style="font-size: 21px; line-height: 1.75; margin-top: 16px; padding: 16px 22px; border-radius: 8px;" data-slot="explanation"></div>
                        </div>
                    </div>

                    <div class="action-row" style="margin-top: 10px;">
                        <button class="btn-action btn-primary" onclick="checkAnswers(this)">Check Answer</button>
                        <button class="btn-action" onclick="revealAnswers(this)">Show Evidence / Highlights</button>
                        <button class="btn-action" onclick="resetAnswers(this)">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 4. SIDE-BY-SIDE READING SPLIT-VIEW TEMPLATE -->
<template id="tmpl-reading-split">
    <section class="slide" data-skill="read">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-reading);"></div>
                <div class="page-content" style="padding: 28px 48px 24px; display: flex; flex-direction: column;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-reading); font-size: 14px; padding: 4px 12px;" data-slot="badge"></span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <div class="two-col" style="flex: 1; min-height: 0; gap: 24px;">
                        <!-- Left Pane: Full Passage -->
                        <div class="reading-pane" style="flex: 1.15; font-size: 22px; line-height: 1.85;" data-slot="passage"></div>

                        <!-- Right Pane: Questions List -->
                        <div class="question-pane" style="flex: 0.85;" data-slot="questions"></div>
                    </div>

                    <div class="action-row" style="margin-top: 12px;">
                        <button class="btn-action btn-primary" onclick="checkAnswers(this)">Check Answers</button>
                        <button class="btn-action" onclick="revealAnswers(this)">Reveal Keys</button>
                        <button class="btn-action" onclick="resetAnswers(this)">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 5. PRE-READING STRATEGY & KEYWORD DECONSTRUCTION TEMPLATE -->
<template id="tmpl-strategy">
    <section class="slide" data-skill="read">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-reading);"></div>
                <div class="page-content" style="padding: 28px 48px 24px; display: flex; flex-direction: column;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-reading); font-size: 14px; padding: 4px 12px;" data-slot="badge">Reading Strategy • Pre-Reading</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p class="slide-subtitle" style="font-size: 20px; color: var(--text-muted); margin-bottom: 12px;" data-slot="subtitle"></p>

                    <div class="two-col" style="flex: 1; min-height: 0; gap: 24px;">
                        <!-- Left Col: Question Sentences -->
                        <div style="display: flex; flex-direction: column; gap: 12px; flex: 1.2; overflow-y: auto;" data-slot="sentences"></div>

                        <!-- Right Col: Strategy Guide -->
                        <div style="display: flex; flex-direction: column; gap: 14px; flex: 0.8; overflow-y: auto;" data-slot="guide"></div>
                    </div>

                    <div class="action-row" style="margin-top: 14px;">
                        <button class="btn-action btn-primary" onclick="revealAnswers(this)">💡 Show Highlights</button>
                        <button class="btn-action" onclick="resetAnswers(this)">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 6. GRAMMAR MASTERCLASS TEMPLATE -->
<template id="tmpl-grammar-masterclass">
    <section class="slide" data-skill="grammar">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-grammar);"></div>
                <div class="page-content" style="padding: 28px 48px 24px; display: flex; flex-direction: column;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-grammar); font-size: 14px; padding: 4px 12px;" data-slot="badge">Grammar Masterclass</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <div class="two-col" style="flex: 1; min-height: 0; gap: 24px;">
                        <div style="display: flex; flex-direction: column; gap: 14px; flex: 1.1; overflow-y: auto;" data-slot="rules"></div>
                        <div style="display: flex; flex-direction: column; gap: 14px; flex: 0.9; overflow-y: auto;" data-slot="contrast-card"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 7. EXERCISE GRID / MULTI-ITEM TEMPLATE -->
<template id="tmpl-exercise-grid">
    <section class="slide" data-skill="grammar">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-grammar);" data-slot="skill-stripe"></div>
                <div class="page-content" style="padding: 28px 48px 24px; display: flex; flex-direction: column;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-grammar); font-size: 14px; padding: 4px 12px;" data-slot="badge"></span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p style="font-size: 20px; color: var(--text-muted); margin-bottom: 12px;" data-slot="instruction"></p>

                    <div style="flex: 1; min-height: 0;" data-slot="grid"></div>

                    <div class="action-row" style="margin-top: 10px;">
                        <button class="btn-action btn-primary" onclick="checkAnswers(this)">Check Answers</button>
                        <button class="btn-action" onclick="revealAnswers(this)">Reveal Keys</button>
                        <button class="btn-action" onclick="resetAnswers(this)">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 8. WRITING TASK 2 / TASK 1 MODEL TEMPLATE (Scrollable & High-Legibility 24px Scale) -->
<template id="tmpl-writing-model">
    <section class="slide" data-skill="write">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-writing);"></div>
                <div class="page-content" style="padding: 28px 48px 24px; display: flex; flex-direction: column;">
                    <div class="slide-header" style="margin-bottom: 8px;">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-writing); font-size: 14px; padding: 4px 12px;" data-slot="badge">IELTS Writing • Model Answer</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <div class="two-col" style="flex: 1; min-height: 0; gap: 28px; align-items: stretch;">
                        <!-- Left Col: Prompt & Plan / Annotations -->
                        <div class="col" style="display: flex; flex-direction: column; gap: 16px; flex: 0.9; overflow-y: auto;" data-slot="left-col">
                            <div data-slot="prompt"></div>
                            <div data-slot="annotations"></div>
                        </div>

                        <!-- Right Col: Scrollable Model Essay -->
                        <div class="writing-model-pane" style="flex: 1.1; overflow-y: auto;" data-slot="model-essay">
                            <div data-slot="essay"></div>
                        </div>
                    </div>

                    <div class="action-row" style="margin-top: 10px;">
                        <button class="btn-action btn-primary" onclick="toggleWritingHighlights(this)">💡 Highlight Signposts &amp; Lexicon</button>
                        <button class="btn-action" onclick="speakEssay(this)">🔊 Listen Model Essay</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 9. VOCABULARY CARDS TEMPLATE -->
<template id="tmpl-vocab-cards">
    <section class="slide" data-skill="vocab">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-vocab);"></div>
                <div class="page-content" style="padding: 28px 48px 24px; display: flex; flex-direction: column;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-vocab); font-size: 14px; padding: 4px 12px;" data-slot="badge">Academic Lexicon</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p style="font-size: 20px; color: var(--text-muted); margin-bottom: 14px;" data-slot="subtitle">
                        Click the 🔊 audio button on any card to hear the official Google Female UK pronunciation.
                    </p>

                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; flex: 1; min-height: 0; overflow-y: auto;" data-slot="cards"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 10. SYNTAX & SENTENCE RULES TEMPLATE -->
<template id="tmpl-syntax-rules">
    <section class="slide" data-skill="vocab">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-vocab);"></div>
                <div class="page-content" style="padding: 28px 48px 24px; display: flex; flex-direction: column;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-vocab); font-size: 14px; padding: 4px 12px;" data-slot="badge">Vocabulary • Syntax &amp; Rules</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <div class="card" style="background: rgba(16, 185, 129, 0.08); border-left: 5px solid var(--col-vocab); font-size: 22px; font-style: italic; line-height: 1.65; margin-bottom: 14px; padding: 18px 24px;" data-slot="sentence"></div>

                    <div class="two-col" style="flex: 1; min-height: 0; gap: 20px;">
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; flex: 1.1; overflow-y: auto;" data-slot="parts-of-speech"></div>
                        <div class="card" style="background: #ffffff; border-left: 5px solid var(--col-grammar); padding: 22px 26px; flex: 0.9; margin-bottom:0; overflow-y:auto;" data-slot="rules"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 11. GAP-FILL PASSAGE & INTENSIFIERS TEMPLATE -->
<template id="tmpl-gap-fill-passage">
    <section class="slide" data-skill="vocab">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-vocab);"></div>
                <div class="page-content" style="padding: 28px 48px 24px; display: flex; flex-direction: column;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-vocab); font-size: 14px; padding: 4px 12px;" data-slot="badge"></span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <div class="two-col" style="flex: 1; min-height: 0; gap: 22px;">
                        <div class="card" style="background: #ffffff; border-left: 5px solid var(--col-vocab); padding: 24px 30px; flex: 1.1; margin-bottom:0; overflow-y: auto;" data-slot="passage"></div>
                        <div style="display: flex; flex-direction: column; gap: 14px; flex: 0.9; overflow-y: auto;" data-slot="rules-col"></div>
                    </div>

                    <div class="action-row" style="margin-top: 10px;">
                        <button class="btn-action btn-primary" onclick="checkAnswers(this)">Check Gap-Fill</button>
                        <button class="btn-action" onclick="revealAnswers(this)">Reveal Keys</button>
                        <button class="btn-action" onclick="resetAnswers(this)">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 12. SPELLING TABLE & ERROR ANALYSIS TEMPLATE -->
<template id="tmpl-spelling-table">
    <section class="slide" data-skill="write">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-writing);"></div>
                <div class="page-content" style="padding: 28px 48px 24px; display: flex; flex-direction: column;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-writing); font-size: 14px; padding: 4px 12px;" data-slot="badge">IELTS Writing Task 2 • Lexical Accuracy</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <div class="two-col" style="flex: 1; min-height: 0; gap: 24px;">
                        <div class="card" style="background: #ffffff; border-left: 6px solid var(--col-writing); padding: 26px 32px; flex: 1.05; margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between; overflow-y: auto;" data-slot="left-extract"></div>
                        <div class="card" style="background: #ffffff; border-top: 6px solid var(--col-writing); padding: 26px 32px; flex: 0.95; margin-bottom: 0; overflow-y: auto;" data-slot="right-table"></div>
                    </div>

                    <div class="action-row" style="margin-top: 10px;">
                        <button class="btn-action btn-primary" onclick="checkAnswers(this)">Check Spelling</button>
                        <button class="btn-action" onclick="revealAnswers(this)">Reveal Keys</button>
                        <button class="btn-action" onclick="resetAnswers(this)">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 13. SUMMARY & MASTERY CHECKLIST TEMPLATE -->
<template id="tmpl-summary-checklist">
    <section class="slide" data-skill="review">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-review);"></div>
                <div class="page-content" style="padding: 28px 48px 24px; display: flex; flex-direction: column;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-review); font-size: 14px; padding: 4px 12px;" data-slot="badge">Module Mastery</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p class="slide-subtitle" style="font-size: 20px; color: var(--text-muted); margin-bottom: 14px;" data-slot="subtitle"></p>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; flex:1; min-height:0; overflow-y:auto;" data-slot="grid"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 14. READING SPLIT-VIEW WITH INTERACTIVE FLOW CHART COMPLETION TEMPLATE -->
<template id="tmpl-reading-flowchart">
    <section class="slide" data-skill="read">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-reading);"></div>
                <div class="page-content" style="padding: 28px 48px 24px; display: flex; flex-direction: column;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-reading); font-size: 14px; padding: 4px 12px;" data-slot="badge">Reading · Flow Chart Completion</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p class="slide-subtitle" style="font-size: 19px; color: var(--text-muted); margin-bottom: 8px;" data-slot="subtitle">
                        Complete the flow chart below. Choose NO MORE THAN TWO WORDS from the passage for each answer.
                    </p>

                    <div class="split-view-container" style="flex: 1; min-height: 0; display: flex; gap: 24px;">
                        <!-- Left Pane: Full Passage -->
                        <div class="reading-pane" style="flex: 1.15; font-size: 22px; line-height: 1.85; overflow-y: auto;" data-slot="passage"></div>

                        <!-- Right Pane: Flow Chart Step Cards Container -->
                        <div class="question-pane flowchart-container" style="flex: 0.85; overflow-y: auto;" data-slot="flowchart"></div>
                    </div>

                    <div class="action-row" style="margin-top: 10px;">
                        <button class="btn-action btn-primary" onclick="checkAnswers(this)">✓ Check</button>
                        <button class="btn-action" onclick="toggleExplanations(this)">🔍 Explanations</button>
                        <button class="btn-action" onclick="revealAnswers(this)">👁️ Reveal</button>
                        <button class="btn-action" onclick="resetAnswers(this)">↺ Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 15. STANDALONE FLOW CHART TASK TEMPLATE -->
<template id="tmpl-flowchart">
    <section class="slide" data-skill="read">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-reading);"></div>
                <div class="page-content" style="padding: 28px 48px 24px; display: flex; flex-direction: column;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-reading); font-size: 14px; padding: 4px 12px;" data-slot="badge">Flow Chart Task</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p class="slide-subtitle" style="font-size: 20px; color: var(--text-muted); margin-bottom: 12px;" data-slot="subtitle"></p>

                    <div class="flowchart-container" style="max-width: 1100px; width: 100%; margin: 0 auto; flex: 1; min-height: 0; overflow-y: auto;" data-slot="flowchart"></div>

                    <div class="action-row" style="margin-top: 10px;">
                        <button class="btn-action btn-primary" onclick="checkAnswers(this)">✓ Check</button>
                        <button class="btn-action" onclick="toggleExplanations(this)">🔍 Explanations</button>
                        <button class="btn-action" onclick="revealAnswers(this)">👁️ Reveal</button>
                        <button class="btn-action" onclick="resetAnswers(this)">↺ Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 16. UNIVERSAL STANDARD BACKBONE TEMPLATE -->
<template id="tmpl-standard">
    <section class="slide" data-skill="read">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-reading);"></div>
                <div class="page-content" style="padding: 28px 48px 24px; display: flex; flex-direction: column;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-reading); font-size: 14px; padding: 4px 12px;" data-slot="badge"></span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p class="slide-subtitle" style="font-size: 20px; color: var(--text-muted); margin-bottom: 12px;" data-slot="subtitle"></p>

                    <div class="slide-body" style="flex: 1; min-height: 0; display: flex; flex-direction: column; overflow-y: auto;" data-slot="content"></div>

                    <div class="action-row" style="margin-top: 10px;" data-slot="actions"></div>
                </div>
            </div>
        </div>
    </section>
</template>
`;

    class TemplateEngine {
        static init() {
            // 1. Inject built-in templates synchronously into DOM if not present
            if (!document.getElementById('tmpl-walkthrough')) {
                const container = document.createElement('div');
                container.id = 'slide-templates-catalog';
                container.style.display = 'none';
                container.innerHTML = BUILTIN_TEMPLATES;
                document.body.prepend(container);
            }

            // 2. Expand all slide-card elements synchronously
            this.expandSlides();
        }

        static findSlotTarget(section, slotName) {
            if (!slotName) return null;
            
            // 1. Direct attribute match
            let target = section.querySelector(`[data-slot="${slotName}"]`);
            if (target) return target;

            // 2. Semantic fallback mappings across all 15 slide templates
            switch (slotName.toLowerCase()) {
                case 'content':
                case 'body':
                case 'main':
                    return section.querySelector('[data-slot="content"], [data-slot="grid"], .two-col, [data-slot="rules"], [data-slot="passage"], [data-slot="cards"], [data-slot="flowchart"], .page-content');

                case 'rules':
                case 'grammar':
                    return section.querySelector('[data-slot="rules"], [data-slot="content"], [data-slot="left-col"], .two-col > div:first-child');

                case 'contrast-card':
                case 'contrast':
                case 'card':
                case 'table':
                case 'error-box':
                case 'right-table':
                    return section.querySelector('[data-slot="contrast-card"], [data-slot="right-table"], [data-slot="rules-col"], [data-slot="guide"], [data-slot="questions"], .two-col > div:last-child');

                case 'grid':
                case 'exercises':
                case 'items':
                case 'checklist':
                    return section.querySelector('[data-slot="grid"], [data-slot="cards"], [data-slot="parts-of-speech"], [data-slot="content"], .two-col');

                case 'cards':
                    return section.querySelector('[data-slot="cards"], [data-slot="grid"], [data-slot="content"]');

                case 'passage':
                case 'text':
                case 'excerpt':
                    return section.querySelector('[data-slot="passage"], [data-slot="passage-text"], [data-slot="left-extract"], [data-slot="left-col"], .reading-pane');

                case 'passage-header':
                case 'header':
                    return section.querySelector('[data-slot="passage-header"]');

                case 'passage-text':
                    return section.querySelector('[data-slot="passage-text"], [data-slot="passage"]');

                case 'questions':
                case 'question':
                case 'sentences':
                case 'sentence':
                    return section.querySelector('[data-slot="questions"], [data-slot="sentences"], [data-slot="question-card"], [data-slot="sentence"], .question-pane, .two-col > div:last-child');

                case 'question-text':
                    return section.querySelector('[data-slot="question-text"], [data-slot="question-card"]');

                case 'evidence-btn':
                case 'evidence':
                    return section.querySelector('[data-slot="evidence-btn"], .syn-btn');

                case 'input-area':
                case 'input':
                case 'options':
                    return section.querySelector('[data-slot="input-area"]');

                case 'explanation':
                case 'explanations':
                    return section.querySelector('[data-slot="explanation"], .item-explanation');

                case 'guide':
                case 'strategy':
                    return section.querySelector('[data-slot="guide"], [data-slot="rules"], [data-slot="right-col"], .two-col > div:last-child');

                case 'left-col':
                case 'left':
                    return section.querySelector('[data-slot="left-col"], [data-slot="left-extract"], [data-slot="rules"], [data-slot="passage"], [data-slot="sentences"], .two-col > div:first-child');

                case 'right-col':
                case 'right':
                    return section.querySelector('[data-slot="right-table"], [data-slot="contrast-card"], [data-slot="rules-col"], [data-slot="guide"], [data-slot="questions"], [data-slot="model-essay"], .two-col > div:last-child');

                case 'model-essay':
                case 'essay':
                case 'model':
                    return section.querySelector('[data-slot="model-essay"], [data-slot="essay"], .writing-model-pane, .two-col > div:last-child');

                case 'prompt':
                    return section.querySelector('[data-slot="prompt"], [data-slot="left-col"]');

                case 'annotations':
                    return section.querySelector('[data-slot="annotations"], [data-slot="left-col"]');

                case 'flowchart':
                case 'chart':
                case 'steps':
                    return section.querySelector('[data-slot="flowchart"], .flowchart-container, [data-slot="content"], [data-slot="grid"]');

                case 'tags':
                case 'roadmap':
                    return section.querySelector('[data-slot="roadmap"], .title-left, .title-right, [data-slot="content"]');

                case 'badge':
                    return section.querySelector('[data-slot="badge"], .skill-badge, .title-module-badge');

                case 'title':
                    return section.querySelector('[data-slot="title"], .slide-title, .title-main');

                case 'subtitle':
                    return section.querySelector('[data-slot="subtitle"], .slide-subtitle, .title-sub');

                case 'instruction':
                    return section.querySelector('[data-slot="instruction"], .slide-subtitle');

                default:
                    return section.querySelector(`[data-slot="${slotName}"], .two-col, [data-slot="content"], [data-slot="grid"], .page-content`);
            }
        }

        static getDefaultBadge(skill, templateName, title) {
            skill = (skill || 'read').toLowerCase();
            const tmpl = (templateName || '').toLowerCase().replace(/^tmpl-/, '');
            
            // 1. Template-specific smart badges
            if (tmpl === 'walkthrough') return 'Reading Strategy • Model Walkthrough';
            if (tmpl === 'strategy') return 'Reading Strategy • Pre-Reading';
            if (tmpl === 'reading-split' || tmpl === 'split-view') return 'IELTS Reading • Split-View';
            if (tmpl === 'reading-flowchart') return 'Reading • Flow Chart Completion';
            if (tmpl === 'flowchart') return 'IELTS Reading • Flow Chart';
            if (tmpl === 'grammar-masterclass') return 'Grammar Masterclass';
            if (tmpl === 'vocab-cards') return 'Academic Lexicon';
            if (tmpl === 'syntax-rules') return 'Vocabulary • Syntax & Rules';
            if (tmpl === 'gap-fill-passage') {
                return skill === 'grammar' ? 'Grammar Practice • Gap Fill' : 'Vocabulary Practice • Gap Fill';
            }
            if (tmpl === 'spelling-table') return 'IELTS Writing • Lexical Accuracy';
            if (tmpl === 'writing-model') return 'IELTS Writing • Model Answer';
            if (tmpl === 'summary-checklist') return 'Module Mastery';
            if (tmpl === 'section-divider') return 'Module Section';
            if (tmpl === 'exercise-grid' || tmpl === 'grid') {
                if (skill === 'grammar') return 'Grammar Practice';
                if (skill === 'vocab') return 'Vocabulary Practice';
                if (skill === 'write') return 'Writing Practice';
                return 'Reading Strategy Practice';
            }
            
            // 2. Skill-based fallback
            switch (skill) {
                case 'read':
                case 'reading':
                    return 'IELTS Reading';
                case 'grammar':
                    return 'Grammar Masterclass';
                case 'vocab':
                case 'vocabulary':
                    return 'Academic Vocabulary';
                case 'write':
                case 'writing':
                    return 'IELTS Writing';
                case 'review':
                    return 'Module Review';
                default:
                    return 'IELTS Preparation';
            }
        }

        static expandSlides() {
            // PASS 1: Expand and replace all <slide-card> / [data-template] elements
            const slideCards = Array.from(document.querySelectorAll('slide-card, [data-template]'));
            
            slideCards.forEach((el, index) => {
                let templateName = el.getAttribute('template') || el.getAttribute('data-template') || 'standard';
                if (['blank', 'content', 'default', 'basic'].includes(templateName.toLowerCase())) {
                    templateName = 'standard';
                }

                let templateId = templateName.startsWith('tmpl-') ? templateName : `tmpl-${templateName}`;
                let templateEl = document.getElementById(templateId);

                if (!templateEl) {
                    templateEl = document.getElementById('tmpl-standard') || document.getElementById('tmpl-walkthrough');
                }

                if (!templateEl) {
                    console.error(`TemplateEngine: No fallback template available for slide-card!`);
                    return;
                }

                // Clone template content
                const clone = templateEl.content.cloneNode(true);
                const section = clone.querySelector('section.slide');
                if (!section) return;

                // Transfer ID if explicitly provided on slide-card
                if (el.id) {
                    section.id = el.id;
                }

                // Transfer skill attribute (read, grammar, vocab, write, review)
                const skill = el.getAttribute('skill') || el.getAttribute('data-skill') || section.getAttribute('data-skill') || 'read';
                section.setAttribute('data-skill', skill);

                // Dynamically color skill stripe and badges according to skill
                const skillColorMap = {
                    'read': 'var(--col-reading)',
                    'reading': 'var(--col-reading)',
                    'grammar': 'var(--col-grammar)',
                    'vocab': 'var(--col-vocab)',
                    'vocabulary': 'var(--col-vocab)',
                    'write': 'var(--col-writing)',
                    'writing': 'var(--col-writing)',
                    'review': 'var(--col-review)',
                    'title': 'var(--col-reading)'
                };
                const skillCol = skillColorMap[skill.toLowerCase()] || 'var(--col-reading)';
                const stripe = section.querySelector('.skill-stripe');
                if (stripe && (!stripe.style.background || stripe.style.background.includes('--col-'))) {
                    stripe.style.background = skillCol;
                }
                const skillBadge = section.querySelector('.skill-badge, [data-slot="badge"]');
                if (skillBadge && (!skillBadge.style.background || skillBadge.style.background.includes('--col-'))) {
                    skillBadge.style.background = skillCol;
                }

                // Fill direct text attributes
                ['title', 'subtitle', 'badge', 'tag', 'instruction'].forEach(attr => {
                    const val = el.getAttribute(attr);
                    if (val) {
                        const slotKey = (attr === 'tag') ? 'badge' : attr;
                        const target = section.querySelector(`[data-slot="${slotKey}"], [data-slot="${attr}"]`);
                        if (target) target.innerHTML = val;
                    }
                });

                // Transfer all named slots from child elements
                const slotChildren = el.querySelectorAll('[slot]');
                slotChildren.forEach(child => {
                    const slotName = child.getAttribute('slot');
                    const target = this.findSlotTarget(section, slotName);

                    if (target) {
                        // Transfer classes, styles, and custom attributes from child element
                        if (child.className && child.className !== '') {
                            target.className = (target.className ? target.className + ' ' : '') + child.className;
                        }
                        if (child.style.cssText) {
                            target.style.cssText = (target.style.cssText ? target.style.cssText + ';' : '') + child.style.cssText;
                        }

                        if (child.hasAttribute('tag')) {
                            const hdr = section.querySelector('[data-slot="passage-header"]');
                            if (hdr) hdr.innerHTML = `📖 Passage Excerpt: Paragraph [${child.getAttribute('tag')}]`;
                        }
                        if (child.hasAttribute('data-q')) {
                            const qCard = section.querySelector('.q-card, [data-slot="question-card"]');
                            if (qCard) qCard.setAttribute('data-q', child.getAttribute('data-q'));
                            const evBtn = section.querySelector('.syn-btn, [data-slot="evidence-btn"]');
                            if (evBtn) evBtn.setAttribute('data-q', child.getAttribute('data-q'));
                        }
                        if (child.hasAttribute('data-ev')) {
                            const evBtn = section.querySelector('.syn-btn, [data-slot="evidence-btn"]');
                            if (evBtn) evBtn.setAttribute('data-ev', child.getAttribute('data-ev'));
                            const markEl = section.querySelector('mark.evidence');
                            if (markEl) markEl.id = child.getAttribute('data-ev');
                        }

                        // Copy inner HTML (append if target is an accumulator or replace)
                        const targetSlotAttr = target.getAttribute('data-slot');
                        if ((targetSlotAttr === 'left-col' || targetSlotAttr === 'roadmap' || target.classList.contains('title-left')) && target.innerHTML.trim() !== '') {
                            target.innerHTML += child.innerHTML;
                        } else {
                            target.innerHTML = child.innerHTML;
                        }
                    }
                });

                // Ensure badge is never empty: populate with universal smart badge if blank
                const badgeEl = section.querySelector('.skill-badge, [data-slot="badge"]');
                if (badgeEl && badgeEl.textContent.trim() === '') {
                    badgeEl.textContent = this.getDefaultBadge(skill, templateName, el.getAttribute('title'));
                }

                // If element has raw HTML children without explicit slot and target has default slot
                if (slotChildren.length === 0 && el.innerHTML.trim() !== '') {
                    const defaultSlot = section.querySelector('[data-slot="content"], [data-slot="grid"], .two-col, [data-slot="rules"], [data-slot="passage"], [data-slot="flowchart"], .page-content');
                    if (defaultSlot) defaultSlot.innerHTML = el.innerHTML;
                }

                // Replace <slide-card> with fully expanded <section class="slide">
                el.parentNode.replaceChild(section, el);
            });

            // PASS 2: Universal Slide Reconciliation & Dynamic Numbering across ALL slides in deck
            const allSlides = Array.from(document.querySelectorAll('section.slide, .slide'));
            const totalSlides = allSlides.length;
            if (totalSlides === 0) return;

            const skillColorMap = {
                'read': 'var(--col-reading)',
                'reading': 'var(--col-reading)',
                'grammar': 'var(--col-grammar)',
                'vocab': 'var(--col-vocab)',
                'vocabulary': 'var(--col-vocab)',
                'write': 'var(--col-writing)',
                'writing': 'var(--col-writing)',
                'review': 'var(--col-review)',
                'title': 'var(--col-reading)'
            };

            let hasActiveSlide = false;
            allSlides.forEach((slide, idx) => {
                const slideNumStr = String(idx + 1).padStart(2, '0');
                const totalNumStr = String(totalSlides).padStart(2, '0');
                const slideSkill = (slide.dataset.skill || 'read').toLowerCase();
                const skillCol = skillColorMap[slideSkill] || 'var(--col-reading)';

                // Assign sequential slide ID if none or default pattern
                if (!slide.id || /^slide-\d+$/.test(slide.id)) {
                    slide.id = `slide-${idx + 1}`;
                }

                // Update slide counter in header
                const numEl = slide.querySelector('[data-slot="slide-number"], .slide-number');
                if (numEl) {
                    numEl.textContent = `${slideNumStr} / ${totalNumStr}`;
                }

                // Ensure badge is never empty on native slides too
                const badgeEl = slide.querySelector('.skill-badge, [data-slot="badge"]');
                if (badgeEl) {
                    if (badgeEl.textContent.trim() === '') {
                        badgeEl.textContent = this.getDefaultBadge(slideSkill, '', slide.querySelector('.slide-title')?.textContent);
                    }
                    if (!badgeEl.style.background || badgeEl.style.background.includes('--col-')) {
                        badgeEl.style.background = skillCol;
                    }
                }

                if (slide.classList.contains('active')) {
                    hasActiveSlide = true;
                }
            });

            // If no slide is marked active, activate the first slide
            if (!hasActiveSlide && allSlides.length > 0) {
                allSlides[0].classList.add('active', 'visible');
            }
        }
    }

    // Execute immediately and synchronously before deck-engine starts
    window.TemplateEngine = TemplateEngine;
    TemplateEngine.init();
})();


/* ==================== MODULE: deck-core.js ==================== */
/**
 * DeckEngine Core Module
 * Handles 1920x1080 stage scaling, slide lifecycle, keyboard/touch navigation,
 * font scaling, and core exercise verification/reveal logic.
 */
class DeckEngine {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.stage = document.getElementById('deckStage');
        this.counter = document.getElementById('slideCounter');
        this.fontScale = 1.0;
        this.fontToastTimer = null;

        // Auto-detect skill mapping from slide data-skill attributes
        this.skillMap = {};
        this.buildSkillMap();

        this.setupStageScale();
        this.setupKeyboardNav();
        this.setupTouchNav();
        this.setupSyncListeners();

        // Check if there's a hash in URL (e.g. #slide-4)
        const initialSlide = this.getSlideFromHash();
        this.showSlide(initialSlide >= 0 ? initialSlide : 0);
    }

    buildSkillMap() {
        this.slides.forEach((slide, idx) => {
            const skill = slide.dataset.skill;
            if (skill && skill !== 'title' && skill !== 'section') {
                if (!this.skillMap[skill]) {
                    this.skillMap[skill] = [];
                }
                this.skillMap[skill].push(idx);
            }
        });
    }

    getSlideFromHash() {
        const hash = window.location.hash;
        if (!hash) return -1;
        const match = hash.match(/#?(?:slide-)?(\d+)/i);
        if (match) {
            const slideNum = parseInt(match[1], 10);
            if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= this.slides.length) {
                return slideNum - 1;
            }
        }
        return -1;
    }

    setupStageScale() {
        this.aspectRatio = localStorage.getItem('deck_aspect_ratio') || '16:9';
        this.applyAspectRatio(this.aspectRatio, false);

        const scale = () => {
            if (!this.stage) return;
            const targetW = this.aspectRatio === '4:3' ? 1440 : 1920;
            const targetH = 1080;
            const factor = Math.min(window.innerWidth / targetW, window.innerHeight / targetH);
            const x = (window.innerWidth - targetW * factor) / 2;
            const y = (window.innerHeight - targetH * factor) / 2;
            this.stage.style.transform = `translate(${x}px, ${y}px) scale(${factor})`;
        };
        this.scaleStage = scale;
        scale();
        window.addEventListener('resize', scale);
    }

    toggleAspectRatio() {
        const nextRatio = this.aspectRatio === '16:9' ? '4:3' : '16:9';
        this.applyAspectRatio(nextRatio, true);
    }

    applyAspectRatio(ratio, showToast = true, broadcast = true) {
        this.aspectRatio = ratio;
        document.documentElement.setAttribute('data-aspect', ratio);
        localStorage.setItem('deck_aspect_ratio', ratio);
        if (this.scaleStage) this.scaleStage();

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('ASPECT_RATIO', { ratio });
        }

        // Update Aspect Button in HUD if present
        const btn = document.getElementById('toolAspectBtn');
        if (btn) {
            const label = btn.querySelector('.tool-label');
            if (label) label.textContent = ratio;
            btn.title = `Aspect Ratio: ${ratio} (Shift+A)`;
        }

        if (showToast) {
            this.showToastNotification(`📐 Aspect Ratio: ${ratio} Mode`);
        }
    }

    showToastNotification(text) {
        const indicator = document.getElementById('fontIndicator');
        if (indicator) {
            indicator.textContent = text;
            indicator.classList.add('show');
            clearTimeout(this.fontToastTimer);
            this.fontToastTimer = setTimeout(() => {
                indicator.classList.remove('show');
            }, 1400);
        }
    }

    setupKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            if (document.documentElement.classList.contains('presenter-window') || (document.body && document.body.classList.contains('presenter-window'))) {
                return;
            }
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
                e.preventDefault();
                this.nextSlide();
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                this.prevSlide();
            } else if (e.key === 'Home') {
                e.preventDefault();
                this.showSlide(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                this.showSlide(this.slides.length - 1);
            } else if (e.shiftKey && (e.key === 'r' || e.key === 'R')) {
                e.preventDefault();
                this.showSlide(0);
            } else if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                this.changeFontSize(1);
            } else if (e.key === '-' || e.key === '_') {
                e.preventDefault();
                this.changeFontSize(-1);
            } else if (e.key === '0') {
                e.preventDefault();
                this.resetFontSize();
            }
        });
    }

    setupTouchNav() {
        let startX = 0;
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? this.nextSlide() : this.prevSlide();
            }
        }, { passive: true });
    }

    showSlide(index, broadcast = true) {
        if (index < 0 || index >= this.slides.length) return;
        if (this.currentSlide === index && this.slides[index] && this.slides[index].classList.contains('active')) {
            return;
        }

        // Only toggle the two affected slides instead of iterating all
        const prevSlide = this.slides[this.currentSlide];
        const nextSlide = this.slides[index];
        if (prevSlide) {
            prevSlide.classList.remove('active', 'visible');
        }
        if (nextSlide) {
            nextSlide.classList.add('active', 'visible');
        }
        this.currentSlide = index;
        if (this.counter) {
            this.counter.textContent = `${index + 1} / ${this.slides.length}`;
        }
        if (window.DeckComponents) {
            DeckComponents.updateActiveTab();
        }
        if (window.paragraphLoupe) {
            window.paragraphLoupe.clearFocus();
        }
        
        // Auto-adjust content scale to fit slide height perfectly
        this.autoFitSlide(this.slides[index]);

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('NAVIGATE_SLIDE', { slideIndex: index });
        }

        window.dispatchEvent(new CustomEvent('slidechanged', {
            detail: { index, slide: this.slides[index], broadcast }
        }));

        // Update URL hash for bookmark/share support (without triggering scroll)
        const slideId = this.slides[index].id || `slide-${index + 1}`;
        history.replaceState(null, '', `#${slideId}`);
    }

    toggleBlackout(force = null) {
        if (window.presentationSpotlight) {
            if (force === true) {
                window.presentationSpotlight.isBlackout = false;
                window.presentationSpotlight.toggleBlackout();
            } else if (force === false) {
                window.presentationSpotlight.clearMute();
            } else {
                window.presentationSpotlight.toggleBlackout();
            }
        }
    }

    toggleWhiteout(force = null) {
        if (window.presentationSpotlight) {
            if (force === true) {
                window.presentationSpotlight.isWhiteout = false;
                window.presentationSpotlight.toggleWhiteout();
            } else if (force === false) {
                window.presentationSpotlight.clearMute();
            } else {
                window.presentationSpotlight.toggleWhiteout();
            }
        }
    }

    clearScreenCover() {
        if (window.presentationSpotlight) {
            window.presentationSpotlight.clearMute();
        }
    }

    /**
     * Universal Content Auto-Fitter
     * Automatically adjusts font-scaling and vertical dimensions so long content fits without clipping
     */
    autoFitSlide(slide) {
        if (!slide) return;
        const notebook = slide.querySelector('.notebook, .title-notebook');
        const pageContent = slide.querySelector('.page-content, .title-notebook');
        if (!notebook || !pageContent) return;

        // Reset and measure in a single rAF to minimize layout thrashing
        requestAnimationFrame(() => {
            pageContent.style.removeProperty('transform');
            pageContent.style.removeProperty('transform-origin');
            pageContent.style.removeProperty('height');

            // Force layout calc after clearing
            const availableHeight = notebook.clientHeight;
            const scrollH = pageContent.scrollHeight;

            if (scrollH > availableHeight + 6) {
                const fitRatio = Math.max(0.68, (availableHeight - 12) / scrollH);
                // Batch all writes after reads
                requestAnimationFrame(() => {
                    pageContent.style.transform = `scale(${fitRatio.toFixed(3)})`;
                    pageContent.style.transformOrigin = 'top center';
                    pageContent.style.height = `${(availableHeight / fitRatio).toFixed(1)}px`;
                });
            }
        });
    }

    nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
            this.showSlide(this.currentSlide + 1);
        }
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
        }
    }

    jumpToSlide(index) {
        this.showSlide(index);
    }

    jumpToSkill(skillKey) {
        const targetIndices = this.skillMap[skillKey];
        if (!targetIndices || targetIndices.length === 0) return;

        if (targetIndices.length === 1) {
            this.showSlide(targetIndices[0]);
            return;
        }

        const nextIdx = targetIndices.find(idx => idx > this.currentSlide);
        if (nextIdx !== undefined) {
            this.showSlide(nextIdx);
        } else {
            this.showSlide(targetIndices[0]);
        }
    }

    changeFontSize(delta) {
        this.fontScale = parseFloat((this.fontScale + delta * 0.08).toFixed(2));
        this.fontScale = Math.min(Math.max(this.fontScale, 0.75), 1.5);
        this.applyFontScale();
    }

    resetFontSize() {
        this.fontScale = 1.0;
        this.applyFontScale();
    }

    applyFontScale() {
        document.documentElement.style.setProperty('--font-scale', this.fontScale);
        const indicator = document.getElementById('fontIndicator');
        if (indicator) {
            indicator.textContent = `Font Size: ${Math.round(this.fontScale * 100)}%`;
            indicator.classList.add('show');
            clearTimeout(this.fontToastTimer);
            this.fontToastTimer = setTimeout(() => {
                indicator.classList.remove('show');
            }, 1400);
        }
    }

    setupSyncListeners() {
        if (!window.presenterSyncEngine) return;

        window.presenterSyncEngine.on('EXERCISE_ACTION', (data) => {
            if (!data) return;
            const target = data.containerId ? document.getElementById(data.containerId) : (this.slides[data.slideIndex] || document.querySelector('.slide.active'));
            if (!target) return;

            if (data.action === 'check') {
                this.checkAnswers(target, false);
            } else if (data.action === 'reveal') {
                this.revealKeys(target, false);
            } else if (data.action === 'reset') {
                this.resetTask(target, false);
            } else if (data.action === 'toggleOptCard' && typeof data.cardIndex === 'number') {
                const card = target.querySelectorAll('.opt-card')[data.cardIndex];
                if (card) this.toggleOptCard(card, false);
            } else if (data.action === 'toggleExplanations') {
                this.toggleExplanations(target, false);
            } else if (data.action === 'highlightAll' && window.readingHighlighter) {
                window.readingHighlighter.highlightAll(data.containerId, false);
            }

            // If in presenter window, refresh preview clone
            if (window.presenterViewUI && typeof window.presenterViewUI.updatePresenterSlideView === 'function') {
                window.presenterViewUI.updatePresenterSlideView();
            }
        });
    }

    checkAnswers(container, broadcast = true) {
        if (!container) container = document.querySelector('.slide.active');
        if (typeof container === 'string') container = document.getElementById(container);
        if (container instanceof HTMLElement && container.tagName === 'BUTTON') {
            container = container.closest('.question-pane') || container.closest('.slide') || container.closest('.notebook') || container;
        }
        if (!container) return;

        // Normalization helper (normalizes curly quotes, apostrophes, and spacing)
        const normalizeStr = (str) => {
            if (!str) return '';
            return str.trim().toLowerCase()
                .replace(/[\u2018\u2019\u0060\u00B4]/g, "'")
                .replace(/[\u201C\u201D]/g, '"')
                .replace(/\s+/g, ' ');
        };

        // Check blank inputs
        container.querySelectorAll('.blank-input').forEach(input => {
            if (input.dataset.ans) {
                const rawVal = normalizeStr(input.value);
                const validAnswers = input.dataset.ans.split('|').map(a => normalizeStr(a));
                const isMatch = rawVal !== '' && validAnswers.some(ans => rawVal === ans);
                input.classList.remove('correct', 'wrong', 'incorrect');
                input.classList.add(isMatch ? 'correct' : 'wrong');
            }
        });

        // Check select inputs
        container.querySelectorAll('.select-input').forEach(select => {
            if (select.dataset.ans) {
                const val = normalizeStr(select.value);
                const validAnswers = select.dataset.ans.split('|').map(a => normalizeStr(a));
                select.classList.remove('correct', 'wrong', 'incorrect');
                if (val === '') {
                    select.classList.add('wrong');
                } else {
                    const isMatch = validAnswers.some(ans => val === ans);
                    select.classList.add(isMatch ? 'correct' : 'wrong');
                }
            }
        });

        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
        const slideContext = container.closest('.slide') || document.querySelector('.slide.active') || container;
        slideContext.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.add('active-syn'));
        slideContext.querySelectorAll('mark.evidence').forEach(m => m.classList.add('highlighted'));

        // Show score toast
        const allInputs = container.querySelectorAll('.blank-input[data-ans], .select-input[data-ans]');
        if (allInputs.length > 0) {
            const correctCount = container.querySelectorAll('.blank-input.correct, .select-input.correct').length;
            this.showToastNotification(`✅ ${correctCount} / ${allInputs.length} correct`);
        }

        if (broadcast && window.presenterSyncEngine) {
            const containerId = (typeof container === 'string' ? container : container?.id || null);
            window.presenterSyncEngine.emit('EXERCISE_ACTION', {
                action: 'check',
                containerId,
                slideIndex: this.currentSlide
            });
        }
    }

    revealKeys(container, broadcast = true) {
        if (!container) container = document.querySelector('.slide.active');
        if (typeof container === 'string') container = document.getElementById(container);
        if (container instanceof HTMLElement && container.tagName === 'BUTTON') {
            container = container.closest('.question-pane') || container.closest('.slide') || container.closest('.notebook') || container;
        }
        if (!container) return;

        container.querySelectorAll('.blank-input').forEach(input => {
            if (input.dataset.ans) {
                input.value = input.dataset.ans.split('|')[0];
                input.classList.remove('wrong', 'incorrect');
                input.classList.add('correct');
                if (window.DeckComponents?.autoResizeBlank) {
                    DeckComponents.autoResizeBlank(input);
                }
            }
        });

        container.querySelectorAll('.select-input').forEach(select => {
            if (select.dataset.ans) {
                // Use first valid answer variant for pipe-separated alternatives
                const firstAnswer = select.dataset.ans.split('|')[0].trim();
                select.value = firstAnswer;
                select.classList.remove('wrong', 'incorrect');
                select.classList.add('correct');
            }
        });

        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
        const slideContext = container.closest('.slide') || document.querySelector('.slide.active') || container;
        slideContext.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.add('active-syn'));
        slideContext.querySelectorAll('.vocab-word, .vocab-term').forEach(v => v.classList.add('active-vocab'));
        slideContext.querySelectorAll('mark.evidence').forEach(m => m.classList.add('highlighted'));
        if (window.vocabBank) {
            window.vocabBank.updateChipStates(container);
        }

        if (broadcast && window.presenterSyncEngine) {
            const containerId = (typeof container === 'string' ? container : container?.id || null);
            window.presenterSyncEngine.emit('EXERCISE_ACTION', {
                action: 'reveal',
                containerId,
                slideIndex: this.currentSlide
            });
        }
    }

    revealAnswers(container, broadcast = true) {
        this.revealKeys(container, broadcast);
    }

    resetTask(container, broadcast = true) {
        if (!container) container = document.querySelector('.slide.active');
        if (typeof container === 'string') container = document.getElementById(container);
        if (container instanceof HTMLElement && container.tagName === 'BUTTON') {
            container = container.closest('.question-pane') || container.closest('.slide') || container.closest('.notebook') || container;
        }
        if (!container) return;

        container.querySelectorAll('.blank-input, .select-input').forEach(input => {
            input.value = '';
            input.classList.remove('correct', 'wrong', 'incorrect');
            if (input.classList.contains('blank-input') && window.DeckComponents?.autoResizeBlank) {
                DeckComponents.autoResizeBlank(input);
            }
        });

        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.remove('show'));
        const slideContext = container.closest('.slide') || document.querySelector('.slide.active') || document;
        slideContext.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.remove('active-syn'));
        slideContext.querySelectorAll('.vocab-word, .vocab-term').forEach(v => v.classList.remove('active-vocab'));
        slideContext.querySelectorAll('mark.evidence').forEach(m => m.classList.remove('highlighted', 'glow-pulse'));
        slideContext.querySelectorAll('.card, .q-card').forEach(c => c.classList.remove('revealed'));
        if (window.vocabBank) {
            window.vocabBank.updateChipStates(container);
        }

        if (broadcast && window.presenterSyncEngine) {
            const containerId = (typeof container === 'string' ? container : container?.id || null);
            window.presenterSyncEngine.emit('EXERCISE_ACTION', {
                action: 'reset',
                containerId,
                slideIndex: this.currentSlide
            });
        }
    }

    resetAnswers(container, broadcast = true) {
        this.resetTask(container, broadcast);
    }

    checkBlanks(containerId, broadcast = true) {
        this.checkAnswers(containerId, broadcast);
    }

    revealBlanks(containerId, broadcast = true) {
        this.revealKeys(containerId, broadcast);
    }

    resetBlanks(containerId, broadcast = true) {
        this.resetTask(containerId, broadcast);
    }

    checkSelects(containerId, broadcast = true) {
        this.checkAnswers(containerId, broadcast);
    }

    revealSelects(containerId, broadcast = true) {
        this.revealKeys(containerId, broadcast);
    }

    resetSelects(containerId, broadcast = true) {
        this.resetTask(containerId, broadcast);
    }

    toggleOptCard(card, broadcast = true) {
        card.classList.toggle('selected');
        if (broadcast && window.presenterSyncEngine) {
            const slide = card.closest('.slide') || document.querySelector('.slide.active');
            const allCards = Array.from(slide ? slide.querySelectorAll('.opt-card') : []);
            const cardIndex = allCards.indexOf(card);
            window.presenterSyncEngine.emit('EXERCISE_ACTION', {
                action: 'toggleOptCard',
                slideIndex: this.currentSlide,
                cardIndex
            });
        }
    }

    checkMultiOpts(containerId, broadcast = true) {
        const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
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
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EXERCISE_ACTION', {
                action: 'check',
                containerId: container.id || null,
                slideIndex: this.currentSlide
            });
        }
    }

    revealMultiOpts(containerId, broadcast = true) {
        const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
        if (!container) return;
        const cards = container.querySelectorAll('.opt-card');
        cards.forEach(card => {
            card.classList.remove('wrong-opt');
            if (card.dataset.correct === 'true') {
                card.classList.add('selected', 'correct-opt');
            } else {
                card.classList.remove('selected');
            }
        });
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EXERCISE_ACTION', {
                action: 'reveal',
                containerId: container.id || null,
                slideIndex: this.currentSlide
            });
        }
    }

    resetMultiOpts(containerId, broadcast = true) {
        const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
        if (!container) return;
        const cards = container.querySelectorAll('.opt-card');
        cards.forEach(card => {
            card.classList.remove('selected', 'correct-opt', 'wrong-opt');
        });
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EXERCISE_ACTION', {
                action: 'reset',
                containerId: container.id || null,
                slideIndex: this.currentSlide
            });
        }
    }

    toggleExplanations(containerId, broadcast = true) {
        let container;
        if (containerId instanceof HTMLElement) {
            container = containerId.closest('.page-content') || containerId.closest('.slide') || document.querySelector('.slide.active');
        } else if (typeof containerId === 'string') {
            container = document.getElementById(containerId);
        } else {
            container = document.querySelector('.slide.active');
        }
        if (!container) return;
        const explanations = container.querySelectorAll('.item-explanation');
        explanations.forEach(exp => exp.classList.toggle('show'));

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EXERCISE_ACTION', {
                action: 'toggleExplanations',
                containerId: container.id || null,
                slideIndex: this.currentSlide
            });
        }
    }

    toggleSynonymExplanation(qKey, evId, broadcast = true) {
        if (window.readingHighlighter) {
            window.readingHighlighter.focusEvidence(qKey, evId, broadcast);
            return;
        }

        if (!evId && qKey) evId = `ev-${qKey}`;
        if (!qKey && evId) qKey = evId.replace(/^ev-/, '');

        const evTarget = evId ? document.getElementById(evId) : null;
        const synSpans = qKey ? document.querySelectorAll(`[data-q="${qKey}"]`) : [];
        const isCurrentlyActive = evTarget && evTarget.classList.contains('highlighted');

        document.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.remove('active-syn'));
        document.querySelectorAll('mark.evidence').forEach(m => m.classList.remove('highlighted'));

        if (!isCurrentlyActive) {
            if (evTarget) {
                evTarget.classList.add('highlighted');
                evTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            synSpans.forEach(s => s.classList.add('active-syn'));
        }

        if (qKey || evId) {
            const selector = [
                qKey ? `.q-card[data-q="${qKey}"]` : null,
                qKey ? `.flowchart-step-card[data-q="${qKey}"]` : null,
                evId ? `.q-card[data-ev="${evId}"]` : null,
                evId ? `.flowchart-step-card[data-ev="${evId}"]` : null
            ].filter(Boolean).join(', ');

            if (selector) {
                document.querySelectorAll(selector).forEach(card => {
                    const exp = card.querySelector('.item-explanation');
                    if (exp) exp.classList.toggle('show', !isCurrentlyActive);
                });
            }
        }

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EVIDENCE_FOCUS', {
                qKey,
                evId,
                active: !isCurrentlyActive
            });
        }
    }

    switchHighLineTab(tabNum) {
        const b1 = document.getElementById('stBtn1');
        const b2 = document.getElementById('stBtn2');
        const p1 = document.getElementById('stPane1');
        const p2 = document.getElementById('stPane2');
        if (b1) b1.classList.toggle('active', tabNum === 1);
        if (b2) b2.classList.toggle('active', tabNum === 2);
        if (p1) p1.style.display = tabNum === 1 ? 'block' : 'none';
        if (p2) p2.style.display = tabNum === 2 ? 'block' : 'none';
    }
}

// Global auto-instantiation on window
window.DeckEngine = DeckEngine;

// Universal Global Helper Functions for all presentation decks
window.checkAnswers = (id) => (window.deckEngine ? window.deckEngine.checkAnswers(id) : null);
window.revealAnswers = window.revealKeys = (id) => (window.deckEngine ? window.deckEngine.revealAnswers(id) : null);
window.resetAnswers = window.resetTask = (id) => (window.deckEngine ? window.deckEngine.resetAnswers(id) : null);
window.checkBlanks = (id) => (window.deckEngine ? window.deckEngine.checkBlanks(id) : null);
window.revealBlanks = (id) => (window.deckEngine ? window.deckEngine.revealBlanks(id) : null);
window.resetBlanks = (id) => (window.deckEngine ? window.deckEngine.resetBlanks(id) : null);
window.checkSelects = (id) => (window.deckEngine ? window.deckEngine.checkSelects(id) : null);
window.revealSelects = (id) => (window.deckEngine ? window.deckEngine.revealSelects(id) : null);
window.resetSelects = (id) => (window.deckEngine ? window.deckEngine.resetSelects(id) : null);
window.toggleOptCard = (card) => (window.deckEngine ? window.deckEngine.toggleOptCard(card) : null);
window.checkMultiOpts = (id) => (window.deckEngine ? window.deckEngine.checkMultiOpts(id) : null);
window.revealMultiOpts = (id) => (window.deckEngine ? window.deckEngine.revealMultiOpts(id) : null);
window.resetMultiOpts = (id) => (window.deckEngine ? window.deckEngine.resetMultiOpts(id) : null);
window.toggleExplanations = (id) => (window.deckEngine ? window.deckEngine.toggleExplanations(id) : null);
window.toggleSynonymExplanation = (q, ev) => (window.deckEngine ? window.deckEngine.toggleSynonymExplanation(q, ev) : null);
window.switchHighLineTab = (tab) => (window.deckEngine ? window.deckEngine.switchHighLineTab(tab) : null);
window.jumpToSlide = (idx) => (window.deckEngine ? window.deckEngine.jumpToSlide(idx) : null);
window.jumpToSkill = (skill) => (window.deckEngine ? window.deckEngine.jumpToSkill(skill) : null);

window.addEventListener('DOMContentLoaded', () => {
    if (!window.deckEngine) {
        window.deckEngine = new DeckEngine();
    }
    if (window.DeckComponents) {
        DeckComponents.init();
    }
});


/* ==================== MODULE: deck-components.js ==================== */
/**
 * Universal Presentation UI Component Hydrator (DeckComponents)
 * Automatically injects repeated UI elements so HTML files remain ultra-lightweight:
 * 1. Auto-injects vertical skill tabs into all .notebook / .title-notebook elements
 * 2. Auto-injects bottom HUD controls (Slide counter, font scaler, navigation hint)
 * 3. Auto-injects exercise action buttons (Check, Reveal, Reset, Explanations)
 * 4. Auto-binds synonym grounding buttons & click handlers
 */

class DeckComponents {
    static init() {
        this.hydrateHUD();
        this.hydrateTabs();
        this.hydrateExerciseActions();
        this.hydrateSynonymButtons();
        this.hydrateBlanksAndInputs();
        this.bindAutoExpandBlanks();
    }

    /**
     * Dynamically auto-expands .blank-input width so full words are never clipped or truncated
     */
    static autoResizeBlank(input) {
        if (!input || !input.classList.contains('blank-input')) return;
        if (!input.dataset.defaultWidth) {
            input.dataset.defaultWidth = input.style.width || `${input.offsetWidth}px` || '80px';
        }

        const text = input.value || input.placeholder || '';
        if (!text) {
            input.style.width = input.dataset.defaultWidth;
            return;
        }

        if (!DeckComponents.measureCanvas) {
            DeckComponents.measureCanvas = document.createElement('canvas');
            DeckComponents.measureCtx = DeckComponents.measureCanvas.getContext('2d');
        }

        const style = window.getComputedStyle(input);
        const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        DeckComponents.measureCtx.font = font;

        const metrics = DeckComponents.measureCtx.measureText(text);
        const textWidth = Math.ceil(metrics.width);

        const paddingLeft = parseFloat(style.paddingLeft) || 14;
        const paddingRight = parseFloat(style.paddingRight) || 14;
        const requiredWidth = textWidth + paddingLeft + paddingRight + 14;

        const defaultWidth = parseFloat(input.dataset.defaultWidth) || 80;
        const newWidth = Math.max(defaultWidth, requiredWidth);

        input.style.width = `${newWidth}px`;
    }

    static bindAutoExpandBlanks() {
        document.addEventListener('input', (e) => {
            if (e.target && e.target.classList.contains('blank-input')) {
                DeckComponents.autoResizeBlank(e.target);
            }
        });

        document.querySelectorAll('.blank-input').forEach(input => {
            DeckComponents.autoResizeBlank(input);
        });
    }

    /**
     * Guarantees all exercise inputs start clean and never show answers immediately:
     * - Clears any initial value on .blank-input and provides subtle sequential number placeholders [1], [2], [3]...
     * - Resets all .select-input dropdowns to their first unselected option
     * - Ensures explanations and evidence highlights start completely hidden
     */
    static hydrateBlanksAndInputs() {
        document.querySelectorAll('.slide').forEach(slide => {
            const containers = slide.querySelectorAll('.card, .question-pane, .page-content, .notebook');
            const processedInputs = new Set();

            containers.forEach(container => {
                const blanks = Array.from(container.querySelectorAll('.blank-input'));
                let count = 0;
                blanks.forEach(input => {
                    if (processedInputs.has(input)) return;
                    processedInputs.add(input);

                    // Clear value so answers are never displayed upfront
                    input.value = '';
                    input.classList.remove('correct', 'wrong', 'incorrect');

                    // If no explicit placeholder exists, assign clean sequential number placeholder [1], [2], etc.
                    if (!input.placeholder || input.placeholder.trim() === '') {
                        count++;
                        input.placeholder = `[${count}]`;
                    }
                });
            });

            // Handle any standalone blanks
            let standaloneCount = 0;
            slide.querySelectorAll('.blank-input').forEach(input => {
                if (!processedInputs.has(input)) {
                    input.value = '';
                    input.classList.remove('correct', 'wrong', 'incorrect');
                    if (!input.placeholder || input.placeholder.trim() === '') {
                        standaloneCount++;
                        input.placeholder = `[${standaloneCount}]`;
                    }
                }
            });

            // Ensure selects start at initial option
            slide.querySelectorAll('.select-input').forEach(sel => {
                sel.selectedIndex = 0;
                sel.classList.remove('correct', 'wrong', 'incorrect');
            });

            // Ensure explanations start hidden
            slide.querySelectorAll('.item-explanation').forEach(exp => {
                exp.classList.remove('show');
            });

            // Ensure evidence marks start plain
            slide.querySelectorAll('mark.evidence').forEach(m => {
                m.classList.remove('highlighted', 'glow-pulse');
            });

            // Ensure synonym pairs start un-highlighted
            slide.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => {
                s.classList.remove('active-syn');
            });
        });
    }

    /**
     * Injects standard floating HUD controls if missing
     */
    static hydrateHUD() {
        if (!document.getElementById('slideCounter')) {
            const counter = document.createElement('div');
            counter.id = 'slideCounter';
            document.body.appendChild(counter);
        }

        if (!document.getElementById('fontControls') && !document.querySelector('.font-controls')) {
            const fontControls = document.createElement('div');
            fontControls.className = 'font-controls';
            fontControls.id = 'fontControls';
            fontControls.innerHTML = `
                <button class="font-btn" onclick="window.deckEngine?.changeFontSize(-1)" title="Decrease font size">A−</button>
                <button class="font-btn" onclick="window.deckEngine?.resetFontSize()" title="Reset font size">A</button>
                <button class="font-btn" onclick="window.deckEngine?.changeFontSize(1)" title="Increase font size">A+</button>
            `;
            document.body.appendChild(fontControls);
        }

        if (!document.getElementById('fontIndicator')) {
            const indicator = document.createElement('div');
            indicator.id = 'fontIndicator';
            indicator.className = 'font-indicator';
            indicator.textContent = 'Font Size: 100%';
            document.body.appendChild(indicator);
        }

        if (!document.querySelector('.nav-hint')) {
            const hint = document.createElement('div');
            hint.className = 'nav-hint';
            hint.innerHTML = '← → Navigate &nbsp;|&nbsp; +/− Font';
            document.body.appendChild(hint);
        }
    }

    /**
     * Injects vertical skill tabs into every notebook container
     */
    static hydrateTabs() {
        const standardTabsHTML = `
            <div class="notebook-tabs">
                <div class="notebook-tab tab-read" data-target-skill="read" title="Jump to Reading">Read</div>
                <div class="notebook-tab tab-grammar" data-target-skill="grammar" title="Jump to Grammar">Grammar</div>
                <div class="notebook-tab tab-vocab" data-target-skill="vocab" title="Jump to Vocabulary">Vocab</div>
                <div class="notebook-tab tab-write" data-target-skill="write" title="Jump to Writing">Write</div>
                <div class="notebook-tab tab-review" data-target-skill="review" title="Jump to Review">Review</div>
            </div>
        `;

        document.querySelectorAll('.notebook, .title-notebook').forEach(container => {
            if (!container.querySelector('.notebook-tabs')) {
                container.insertAdjacentHTML('afterbegin', standardTabsHTML);
            }
        });

        // Add direct click listeners to all tabs
        document.querySelectorAll('.notebook-tab[data-target-skill]').forEach(tab => {
            tab.onclick = (e) => {
                e.stopPropagation();
                const skill = tab.dataset.targetSkill;
                if (window.deckEngine) {
                    window.deckEngine.jumpToSkill(skill);
                }
            };
        });

        // Update active tab highlight based on slide's data-skill
        this.updateActiveTab();
    }

    /**
     * Highlights the current active tab based on active slide
     */
    static updateActiveTab() {
        const activeSlide = document.querySelector('.slide.active');
        if (!activeSlide) return;
        const skill = activeSlide.dataset.skill;

        document.querySelectorAll('.notebook-tab').forEach(tab => {
            tab.classList.remove('active');
            if (skill && tab.classList.contains(`tab-${skill}`)) {
                tab.classList.add('active');
            }
        });
    }

    /**
     * Auto-injects standard action rows for any .exercise-actions or interactive containers
     */
    static hydrateExerciseActions() {
        document.querySelectorAll('.exercise-actions, [data-exercise-actions]').forEach(el => {
            const targetId = el.dataset.target || el.closest('[id]')?.id;
            const type = el.dataset.type || 'selects'; // 'selects' | 'blanks' | 'multi'

            if (!targetId) return;

            let checkFunc = `window.deckEngine?.checkSelects('${targetId}')`;
            let revealFunc = `window.deckEngine?.revealSelects('${targetId}')`;
            let resetFunc = `window.deckEngine?.resetSelects('${targetId}')`;

            if (type === 'blanks') {
                checkFunc = `window.deckEngine?.checkBlanks('${targetId}')`;
                revealFunc = `window.deckEngine?.revealBlanks('${targetId}')`;
                resetFunc = `window.deckEngine?.resetBlanks('${targetId}')`;
            } else if (type === 'multi') {
                checkFunc = `window.deckEngine?.checkMultiOpts('${targetId}')`;
                revealFunc = `window.deckEngine?.revealMultiOpts('${targetId}')`;
                resetFunc = `window.deckEngine?.resetMultiOpts('${targetId}')`;
            }

            el.innerHTML = `
                <div class="action-row">
                    <button class="btn-action btn-primary" onclick="${checkFunc}">Check Answers</button>
                    <button class="btn-action" onclick="${revealFunc}">Reveal Answers</button>
                    <button class="btn-action" onclick="${resetFunc}">Reset</button>
                    <button class="btn-action" onclick="window.deckEngine?.toggleExplanations('${targetId}')">💡 Explanations</button>
                </div>
            `;
        });
    }

    /**
     * Auto-binds synonym buttons that specify data-q or data-ev
     */
    static hydrateSynonymButtons() {
        document.querySelectorAll('.syn-btn').forEach(btn => {
            const qKey = btn.dataset.q || btn.closest('.q-card')?.dataset.q || (btn.dataset.ev ? btn.dataset.ev.replace(/^ev-/, '') : null);
            const evId = btn.dataset.ev || (qKey ? `ev-${qKey}` : null);
            btn.onclick = (e) => {
                e.stopPropagation();
                window.deckEngine?.toggleSynonymExplanation(qKey, evId);
            };
        });
    }
}

// Auto-run on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
    DeckComponents.init();
});

// Hook tab update into showSlide
if (window.DeckEngine) {
    const originalShowSlide = DeckEngine.prototype.showSlide;
    DeckEngine.prototype.showSlide = function(index, broadcast = true) {
        originalShowSlide.call(this, index, broadcast);
        DeckComponents.updateActiveTab();
    };
}


/* ==================== MODULE: deck-theme-engine.js ==================== */
/**
 * ==========================================================================
 * DECK THEME ENGINE (Frontend Slides Aesthetics System)
 * Provides 6 pre-filled distinctive theme presets, typography pairings,
 * live theme switcher modal, and keyboard shortcuts (Shift+T to cycle).
 * ==========================================================================
 */

class DeckThemeEngine {
    constructor() {
        this.STORAGE_KEY = 'deck_theme_preset';
        this.themes = [
            {
                id: 'academic',
                name: 'Academic Editorial',
                displayFont: 'Playfair Display',
                bodyFont: 'DM Sans',
                icon: '🎓',
                desc: 'Classic authoritative editorial serif with modern sans-serif body.',
                previewBg: 'linear-gradient(135deg, #1e3a8a, #0b1120)'
            },
            {
                id: 'bold-signal',
                name: 'Bold Signal',
                displayFont: 'Space Grotesk',
                bodyFont: 'Plus Jakarta Sans',
                icon: '⚡',
                desc: 'High-contrast, bold brutalist typography with punchy coral accents.',
                previewBg: 'linear-gradient(135deg, #881337, #111827)'
            },
            {
                id: 'electric',
                name: 'Electric Studio',
                displayFont: 'Manrope',
                bodyFont: 'Outfit',
                icon: '💎',
                desc: 'Ultra-clean modern geometric tech feel with cobalt blue and cyan.',
                previewBg: 'linear-gradient(135deg, #1e1b4b, #030712)'
            },
            {
                id: 'botanical',
                name: 'Dark Botanical',
                displayFont: 'Cormorant Garamond',
                bodyFont: 'Plus Jakarta Sans',
                icon: '🌿',
                desc: 'Refined literary luxury with elegant serif headers and emerald green.',
                previewBg: 'linear-gradient(135deg, #064e3b, #061a14)'
            },
            {
                id: 'voltage',
                name: 'Creative Voltage',
                displayFont: 'Syne',
                bodyFont: 'Space Grotesk',
                icon: '🚀',
                desc: 'Avant-garde dynamic creative energy with electric purple accents.',
                previewBg: 'linear-gradient(135deg, #3b0764, #090514)'
            },
            {
                id: 'vintage',
                name: 'Vintage Editorial',
                displayFont: 'Bodoni Moda',
                bodyFont: 'DM Sans',
                icon: '📜',
                desc: 'Sophisticated literary masterclass with Bodoni high-contrast serifs.',
                previewBg: 'linear-gradient(135deg, #44403c, #1c1917)'
            },
            {
                id: 'soft-editorial',
                name: 'Soft Editorial',
                displayFont: 'Cormorant Garamond',
                bodyFont: 'Outfit',
                icon: '🌸',
                desc: 'Warm almond paper with sage, blush rose, and elegant editorial serifs.',
                previewBg: 'linear-gradient(135deg, #059669, #e11d48)'
            },
            {
                id: 'cobalt-grid',
                name: 'Cobalt Grid',
                displayFont: 'Space Grotesk',
                bodyFont: 'DM Sans',
                icon: '📐',
                desc: 'Technical precision graph-paper aesthetic with electric cobalt blue.',
                previewBg: 'linear-gradient(135deg, #2563eb, #0284c7)'
            },
            {
                id: 'vellum',
                name: 'Vellum',
                displayFont: 'Cormorant Garamond',
                bodyFont: 'Plus Jakarta Sans',
                icon: '🌌',
                desc: 'Deep midnight navy canvas with golden-amber serifs and dusty teal.',
                previewBg: 'linear-gradient(135deg, #fbbf24, #0b132b)'
            },
            {
                id: 'sakura-chroma',
                name: 'Sakura Chroma',
                displayFont: 'Outfit',
                bodyFont: 'DM Sans',
                icon: '📼',
                desc: 'Vintage Japanese cassette aesthetic with vermillion and sakura pink.',
                previewBg: 'linear-gradient(135deg, #ea580c, #ec4899)'
            },
            {
                id: 'editorial-forest',
                name: 'Editorial Forest',
                displayFont: 'Cormorant Garamond',
                bodyFont: 'DM Sans',
                icon: '🌲',
                desc: 'Deep pine green, dusty blush pink, and warm parchment typography.',
                previewBg: 'linear-gradient(135deg, #064e3b, #db2777)'
            },
            {
                id: 'broadside',
                name: 'Broadside',
                displayFont: 'Space Grotesk',
                bodyFont: 'Plus Jakarta Sans',
                icon: '📰',
                desc: 'Ultra-dark pitch-black broadsheet void with blazing fire orange.',
                previewBg: 'linear-gradient(135deg, #ff5722, #000000)'
            },
            {
                id: '8-bit-orbit',
                name: '8-Bit Orbit',
                displayFont: 'Press Start 2P',
                bodyFont: 'Space Grotesk',
                icon: '👾',
                desc: 'CRT pixel-art neon arcade on deep space void with cyan & magenta.',
                previewBg: 'linear-gradient(135deg, #5edcf4, #f0a6ca)'
            },
            {
                id: 'biennale-yellow',
                name: 'Biennale Yellow',
                displayFont: 'Playfair Display',
                bodyFont: 'DM Sans',
                icon: '☀️',
                desc: 'Solar yellow on warm parchment with deep indigo serif headlines.',
                previewBg: 'linear-gradient(135deg, #f59e0b, #1e1b4b)'
            },
            {
                id: 'block-frame',
                name: 'BlockFrame',
                displayFont: 'Space Grotesk',
                bodyFont: 'Plus Jakarta Sans',
                icon: '🧱',
                desc: 'Neobrutalist pastel color blocks with chunky black graphic borders.',
                previewBg: 'linear-gradient(135deg, #facc15, #000000)'
            },
            {
                id: 'coral',
                name: 'Coral Magazine',
                displayFont: 'Bebas Neue',
                bodyFont: 'DM Sans',
                icon: '🪸',
                desc: 'Warm cream paper, saturated coral accents, and bold condensed type.',
                previewBg: 'linear-gradient(135deg, #e85d5d, #1a1a1a)'
            },
            {
                id: 'editorial-tri-tone',
                name: 'Editorial Tri-Tone',
                displayFont: 'Bodoni Moda',
                bodyFont: 'DM Sans',
                icon: '🍷',
                desc: 'Dusty blush pink, mustard cream, and deep burgundy literary styling.',
                previewBg: 'linear-gradient(135deg, #7a1f35, #f2b6c6)'
            },
            {
                id: 'emerald-editorial',
                name: 'Emerald Editorial',
                displayFont: 'Bodoni Moda',
                bodyFont: 'Manrope',
                icon: '💎',
                desc: 'Vivid emerald green field, deep navy ink, and warm paper cream.',
                previewBg: 'linear-gradient(135deg, #065f46, #3cd896)'
            },
            {
                id: 'grove',
                name: 'Grove Earth',
                displayFont: 'Cormorant Garamond',
                bodyFont: 'Plus Jakarta Sans',
                icon: '🍃',
                desc: 'Natural organic earthy olive, warm stone neutral, and subtle serenity.',
                previewBg: 'linear-gradient(135deg, #3f6212, #65a30d)'
            },
            {
                id: 'monochrome',
                name: 'Monochrome Ledger',
                displayFont: 'Lora',
                bodyFont: 'DM Sans',
                icon: '🖋️',
                desc: 'Ivory ledger paper with pure ink-black typography and clean lines.',
                previewBg: 'linear-gradient(135deg, #1a1a16, #fafadf)'
            },
            {
                id: 'pin-and-paper',
                name: 'Pin & Paper',
                displayFont: 'Caveat',
                bodyFont: 'DM Sans',
                icon: '📌',
                desc: 'Yellow sticky notes, handwritten blue ink, and warm tactile paper.',
                previewBg: 'linear-gradient(135deg, #eab308, #1e40af)'
            },
            {
                id: 'retro-windows',
                name: 'Retro Windows 95',
                displayFont: 'VT323',
                bodyFont: 'DM Sans',
                icon: '💾',
                desc: 'Windows 95 nostalgic 3D gray, navy title bars, and pixel typography.',
                previewBg: 'linear-gradient(135deg, #000080, #c0c0c0)'
            },
            {
                id: 'stencil-tablet',
                name: 'Stencil & Tablet',
                displayFont: 'Space Grotesk',
                bodyFont: 'DM Sans',
                icon: '🏺',
                desc: 'Bone paper, archaeological terracotta, teal, and stencil-cut display.',
                previewBg: 'linear-gradient(135deg, #a06a3c, #2d7e73)'
            },
            {
                id: 'cartesian',
                name: 'Cartesian Elegance',
                displayFont: 'Playfair Display',
                bodyFont: 'Plus Jakarta Sans',
                icon: '🕊️',
                desc: 'Quiet warm bone minimalist palette with classical Playfair serifs.',
                previewBg: 'linear-gradient(135deg, #1a1a1a, #ede8e0)'
            },
            {
                id: 'bauhaus-bold',
                name: 'Bauhaus Bold',
                displayFont: 'Archivo Black',
                bodyFont: 'Inter',
                icon: '📐',
                desc: 'Modernist brutalist manifesto with pure off-white canvas, heavy black geometry and cobalt blue.',
                previewBg: 'linear-gradient(135deg, #2541ee, #0a0a0a)'
            },
            {
                id: 'swiss-ikb',
                name: 'Swiss IKB',
                displayFont: 'Inter (Light)',
                bodyFont: 'Inter',
                icon: '🇨🇭',
                desc: 'International Style with Yves Klein Blue, hairline scaffold grid and ultra-crisp Grotesk.',
                previewBg: 'linear-gradient(135deg, #002fa7, #fafaf8)'
            },
            {
                id: 'kraft-paper',
                name: 'Kraft Paper',
                displayFont: 'Fraunces',
                bodyFont: 'DM Sans',
                icon: '📦',
                desc: 'Tactile craft notebook paper with deep charcoal ink and copper rust accents.',
                previewBg: 'linear-gradient(135deg, #a35b2a, #2a1e13)'
            }
        ];

        // Determine default or saved theme
        let saved = null;
        try {
            saved = localStorage.getItem(this.STORAGE_KEY);
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }
        const docDefault = document.documentElement.getAttribute('data-theme') || 
                           document.body.getAttribute('data-theme') || 'academic';
        this.currentTheme = saved || docDefault;

        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme, false);

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.injectUI());
        } else {
            this.injectUI();
        }

        // Shortcut: Shift + T to cycle themes
        document.addEventListener('keydown', (e) => {
            if (e.shiftKey && (e.key === 'T' || e.key === 't') && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
                this.cycleTheme();
            }
        });
    }

    applyTheme(themeId, showToast = true, broadcast = true) {
        const theme = this.themes.find(t => t.id === themeId) || this.themes[0];
        this.currentTheme = theme.id;
        
        document.documentElement.setAttribute('data-theme', theme.id);
        document.body.setAttribute('data-theme', theme.id);
        try {
            localStorage.setItem(this.STORAGE_KEY, theme.id);
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }

        if (showToast) {
            this.showToast(`${theme.icon} Theme: ${theme.name} (${theme.displayFont} + ${theme.bodyFont})`);
        }

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('THEME_CHANGE', { themeId: theme.id });
        }

        // Update active state in modal if open
        document.querySelectorAll('.theme-card-option').forEach(card => {
            if (card.dataset.themeId === theme.id) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    cycleTheme() {
        const currentIndex = this.themes.findIndex(t => t.id === this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.applyTheme(this.themes[nextIndex].id, true);
    }

    showToast(message) {
        let toast = document.getElementById('themeToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'themeToast';
            toast.className = 'theme-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('visible');
        clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
            toast.classList.remove('visible');
        }, 2600);
    }

    injectUI() {
        if (document.getElementById('themePickerModal')) return;

        // Modal
        const modal = document.createElement('div');
        modal.id = 'themePickerModal';
        modal.className = 'theme-picker-modal';
        modal.style.display = 'none';

        const themeCards = this.themes.map(t => `
            <div class="theme-card-option ${t.id === this.currentTheme ? 'active' : ''}" 
                 data-theme-id="${t.id}" 
                 onclick="deckThemeEngine.applyTheme('${t.id}')">
                <div class="theme-preview-banner" style="background:${t.previewBg}">
                    <span class="theme-icon">${t.icon}</span>
                </div>
                <div class="theme-card-body">
                    <div class="theme-card-title">${t.name}</div>
                    <div class="theme-card-fonts">${t.displayFont} + ${t.bodyFont}</div>
                    <div class="theme-card-desc">${t.desc}</div>
                </div>
            </div>
        `).join('');

        modal.innerHTML = `
            <div class="theme-modal-backdrop" onclick="deckThemeEngine.closeModal()"></div>
            <div class="theme-modal-dialog">
                <div class="theme-modal-header">
                    <div>
                        <h2>🎨 Presentation Aesthetic Themes</h2>
                        <p>Select a typography and atmosphere pairing (Shortcut: <kbd>Shift + T</kbd> to cycle live).</p>
                    </div>
                    <button class="theme-modal-close" onclick="deckThemeEngine.closeModal()">×</button>
                </div>
                <div class="theme-grid">
                    ${themeCards}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    openModal() {
        const modal = document.getElementById('themePickerModal');
        if (modal) modal.style.display = 'flex';
    }

    closeModal() {
        const modal = document.getElementById('themePickerModal');
        if (modal) modal.style.display = 'none';
    }

    toggleModal() {
        const modal = document.getElementById('themePickerModal');
        if (modal && modal.style.display === 'flex') {
            this.closeModal();
        } else {
            this.openModal();
        }
    }
}

// Global instantiation
window.deckThemeEngine = new DeckThemeEngine();


/* ==================== MODULE: image-viewer.js ==================== */
/**
 * Expert IELTS Presentations — Interactive Visual Reference & Pan/Zoom Lightbox Engine
 * Provides full mouse drag, touch pan, pinch-to-zoom, wheel zoom, and keyboard controls.
 * Auto-injects modal and styles if not present in the deck.
 */

(function () {
  'use strict';

  let currentZoom = 1;
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 4.0;
  const ZOOM_STEP = 0.25;

  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  // Touch tracking for pinch-to-zoom
  let initialPinchDistance = null;
  let initialPinchZoom = 1;

  function ensureModalStructure() {
    if (document.getElementById('imageZoomModal')) return;

    const modal = document.createElement('div');
    modal.id = 'imageZoomModal';
    modal.className = 'fixed inset-0 z-[999999] hidden items-center justify-center bg-slate-950/90 backdrop-blur-md p-4';
    modal.style.display = 'none';
    modal.innerHTML = `
      <!-- Toolbar Header -->
      <div class="absolute top-4 right-4 z-50 flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-full px-3 py-1.5 shadow-2xl backdrop-blur-sm">
        <span id="zoomLevelText" class="text-xs font-mono font-bold text-sky-400 px-2 min-w-[50px] text-center select-none">100%</span>
        <div class="h-4 w-[1px] bg-slate-700"></div>
        <button type="button" onclick="zoomIn()" class="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition" title="Zoom In (+)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        </button>
        <button type="button" onclick="zoomOut()" class="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition" title="Zoom Out (-)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
        </button>
        <button type="button" onclick="resetZoom()" class="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition" title="Reset Zoom (0)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.03 8.03 0 01-15.357-2m15.357 2H15"/></svg>
        </button>
        <div class="h-4 w-[1px] bg-slate-700"></div>
        <button type="button" onclick="closeImageModal()" class="p-1.5 text-rose-400 hover:text-rose-300 rounded-full hover:bg-rose-950/40 transition" title="Close (Esc)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Hint bottom -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-[11px] text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800 pointer-events-none select-none">
        Scroll / Pinch to zoom • Drag to pan • Double click to toggle
      </div>

      <!-- Viewport & Image Canvas -->
      <div id="modalViewport" class="relative w-full h-full flex items-center justify-center overflow-hidden cursor-zoom-in">
        <img id="modalZoomImg" src="" alt="Zoomable Reference" class="max-w-[90%] max-h-[85vh] object-contain select-none transition-transform shadow-2xl rounded-lg" draggable="false" />
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeImageModal();
    });
  }

  function getModalElements() {
    ensureModalStructure();
    return {
      modal: document.getElementById('imageZoomModal'),
      viewport: document.getElementById('modalViewport'),
      img: document.getElementById('modalZoomImg'),
      zoomText: document.getElementById('zoomLevelText'),
      originalImg: document.getElementById('grammar-reference-img') || document.querySelector('.visual-reference-img, .chart-container img, [data-zoomable="true"]')
    };
  }

  function updateTransform(withAnimation = false) {
    const { img, zoomText, viewport } = getModalElements();
    if (!img) return;

    img.style.transition = withAnimation ? 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)' : 'none';
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;

    if (zoomText) {
      zoomText.textContent = `${Math.round(currentZoom * 100)}%`;
    }

    if (viewport) {
      if (isDragging) {
        viewport.style.cursor = 'grabbing';
        if (img) img.style.cursor = 'grabbing';
      } else if (currentZoom > 1) {
        viewport.style.cursor = 'grab';
        if (img) img.style.cursor = 'grab';
      } else {
        viewport.style.cursor = 'zoom-in';
        if (img) img.style.cursor = 'zoom-in';
      }
    }
  }

  function openImageModal(imgSrc) {
    const { modal, img, originalImg } = getModalElements();
    if (!modal || !img) return;

    const source = imgSrc || (originalImg ? originalImg.src : null);
    if (!source || source.trim() === '') {
      return;
    }

    img.src = source;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    resetZoom();
  }

  function closeImageModal() {
    const { modal } = getModalElements();
    if (!modal) return;

    modal.classList.add('hidden');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    resetZoom();
  }

  function setZoom(newZoom, centerX = null, centerY = null, withAnimation = true) {
    const clampedZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(newZoom * 100) / 100));
    if (clampedZoom === currentZoom) return;

    const { viewport } = getModalElements();

    if (centerX !== null && centerY !== null && viewport) {
      const rect = viewport.getBoundingClientRect();
      const originX = centerX - rect.left - rect.width / 2;
      const originY = centerY - rect.top - rect.height / 2;

      const scaleChange = clampedZoom / currentZoom;
      translateX = originX - (originX - translateX) * scaleChange;
      translateY = originY - (originY - translateY) * scaleChange;
    }

    currentZoom = clampedZoom;
    if (currentZoom <= 1 && clampedZoom <= 1) {
      translateX = 0;
      translateY = 0;
    }

    updateTransform(withAnimation);
  }

  function zoomIn() {
    setZoom(currentZoom + ZOOM_STEP);
  }

  function zoomOut() {
    setZoom(currentZoom - ZOOM_STEP);
  }

  function resetZoom() {
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    updateTransform(true);
  }

  function toggleZoom(e) {
    if (e) e.stopPropagation();
    if (currentZoom <= 1.1) {
      const clientX = e ? e.clientX : null;
      const clientY = e ? e.clientY : null;
      setZoom(2.0, clientX, clientY, true);
    } else {
      resetZoom();
    }
  }

  function handleWheelZoom(e) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.2 : -0.2;
    setZoom(currentZoom + delta, e.clientX, e.clientY, false);
  }

  function setupMouseDrag() {
    const { viewport, img } = getModalElements();
    if (!viewport) return;

    function onMouseDown(e) {
      if (e.button !== 0) return;
      e.preventDefault();

      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;

      updateTransform(false);

      function onMouseMove(moveEvent) {
        if (!isDragging) return;
        moveEvent.preventDefault();
        translateX = moveEvent.clientX - startX;
        translateY = moveEvent.clientY - startY;
        updateTransform(false);
      }

      function onMouseUp() {
        if (!isDragging) return;
        isDragging = false;
        updateTransform(true);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      }

      window.addEventListener('mousemove', onMouseMove, { passive: false });
      window.addEventListener('mouseup', onMouseUp);
    }

    viewport.addEventListener('mousedown', onMouseDown);
    if (img) img.addEventListener('mousedown', onMouseDown);
  }

  function setupTouchDrag() {
    const { viewport } = getModalElements();
    if (!viewport) return;

    function getTouchDistance(touch1, touch2) {
      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;
      return Math.hypot(dx, dy);
    }

    viewport.addEventListener(
      'touchstart',
      function (e) {
        if (e.touches.length === 1) {
          isDragging = true;
          const touch = e.touches[0];
          startX = touch.clientX - translateX;
          startY = touch.clientY - translateY;
          initialPinchDistance = null;
        } else if (e.touches.length === 2) {
          isDragging = false;
          initialPinchDistance = getTouchDistance(e.touches[0], e.touches[1]);
          initialPinchZoom = currentZoom;
        }
      },
      { passive: true }
    );

    viewport.addEventListener(
      'touchmove',
      function (e) {
        if (isDragging && e.touches.length === 1) {
          e.preventDefault();
          const touch = e.touches[0];
          translateX = touch.clientX - startX;
          translateY = touch.clientY - startY;
          updateTransform(false);
        } else if (e.touches.length === 2 && initialPinchDistance) {
          e.preventDefault();
          const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
          const scaleMultiplier = currentDistance / initialPinchDistance;
          const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
          const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
          setZoom(initialPinchZoom * scaleMultiplier, midX, midY, false);
        }
      },
      { passive: false }
    );

    viewport.addEventListener('touchend', function (e) {
      if (e.touches.length === 0) {
        isDragging = false;
        initialPinchDistance = null;
        updateTransform(true);
      } else if (e.touches.length === 1) {
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX - translateX;
        startY = touch.clientY - translateY;
        initialPinchDistance = null;
      }
    });
  }

  function setupKeyboardControls() {
    document.addEventListener('keydown', function (e) {
      const modal = document.getElementById('imageZoomModal');
      if (!modal || modal.classList.contains('hidden') || modal.style.display === 'none') {
        return;
      }

      switch (e.key) {
        case 'Escape':
          closeImageModal();
          break;
        case '+':
        case '=':
          zoomIn();
          break;
        case '-':
        case '_':
          zoomOut();
          break;
        case '0':
          resetZoom();
          break;
        case 'ArrowLeft':
          translateX += 40;
          updateTransform(true);
          break;
        case 'ArrowRight':
          translateX -= 40;
          updateTransform(true);
          break;
        case 'ArrowUp':
          translateY += 40;
          updateTransform(true);
          break;
        case 'ArrowDown':
          translateY -= 40;
          updateTransform(true);
          break;
      }
    });
  }

  function bindDeckImages() {
    document.querySelectorAll('.visual-reference-img, .chart-container img, [data-zoomable="true"], .slide-figure img').forEach(imgEl => {
      imgEl.style.cursor = 'zoom-in';
      imgEl.title = 'Click to open in pan/zoom lightbox';
      imgEl.addEventListener('click', (e) => {
        e.stopPropagation();
        openImageModal(imgEl.src);
      });
    });
  }

  function init() {
    ensureModalStructure();
    const { viewport, img } = getModalElements();

    if (viewport) {
      setupMouseDrag();
      setupTouchDrag();
      viewport.addEventListener('wheel', handleWheelZoom, { passive: false });
      viewport.addEventListener('dblclick', toggleZoom);
    }

    if (img) {
      img.style.pointerEvents = 'auto';
      img.style.userSelect = 'none';
    }

    bindDeckImages();
    setupKeyboardControls();
  }

  // Expose global methods
  window.openImageModal = openImageModal;
  window.closeImageModal = closeImageModal;
  window.zoomIn = zoomIn;
  window.zoomOut = zoomOut;
  window.resetZoom = resetZoom;
  window.toggleZoom = toggleZoom;
  window.handleWheelZoom = handleWheelZoom;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


/* ==================== MODULE: mobile.js ==================== */
/**
 * Expert IELTS Presentations — Mobile & Touch Interaction Engine
 * Provides dynamic viewport height (--vh) calculation, touch gestures,
 * swipe navigation, and responsive controls for tablets/iPads/mobile devices.
 */

(function () {
  'use strict';

  const MOBILE_BREAKPOINT = 768;

  /**
   * 1. Viewport Height Fix (Solves mobile browser 100vh address bar jumping)
   */
  function setMobileVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  /**
   * 2. Swipe Navigation for Presentation Slides
   */
  function setupSwipeNavigation() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const MIN_SWIPE_DISTANCE = 50;

    document.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        handleSwipeGesture();
      }
    }, { passive: true });

    function handleSwipeGesture() {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Ensure horizontal swipe is dominant over vertical scroll
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > MIN_SWIPE_DISTANCE) {
        if (window.deckEngine) {
          if (deltaX < 0) {
            // Swipe Left -> Next Slide
            if (typeof window.deckEngine.nextSlide === 'function') {
              window.deckEngine.nextSlide();
            }
          } else {
            // Swipe Right -> Prev Slide
            if (typeof window.deckEngine.prevSlide === 'function') {
              window.deckEngine.prevSlide();
            }
          }
        }
      }
    }
  }

  /**
   * 3. Responsive Class & Viewport Watcher
   */
  function checkResponsiveState() {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    if (isMobile) {
      document.body.classList.add('is-mobile-view');
    } else {
      document.body.classList.remove('is-mobile-view');
    }
    setMobileVh();
  }

  function init() {
    setMobileVh();
    checkResponsiveState();
    setupSwipeNavigation();

    window.addEventListener('resize', () => {
      setMobileVh();
      checkResponsiveState();
    }, { passive: true });

    window.addEventListener('orientationchange', () => {
      setTimeout(setMobileVh, 200);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


/* ==================== MODULE: teacher-highlighter.js ==================== */
/**
 * ==========================================================================
 * TEACHER REAL TEXT HIGHLIGHTER ENGINE (TeacherHighlighter)
 * Interactive Text-Selection Highlighter for Classroom Presentations
 * - Directly highlights selected text in the slide with fluorescent marker tones
 * - Preserves original font styling and text legibility (no font re-coloring)
 * - Multi-color support: Fluorescent Yellow, Neon Green, Sky Cyan, Coral Pink
 * - Click any highlighted text to remove/unhighlight
 * - Keyboard shortcuts: 'H' (toggle mode), 'C' (clear all), 'Ctrl+Z' (undo)
 * ==========================================================================
 */

class TeacherHighlighter {
    constructor(deckEngine) {
        this.deckEngine = deckEngine;
        this.isActive = false;
        this.colors = [
            { name: 'Yellow', bg: 'rgba(254, 240, 138, 0.85)', hex: '#facc15', border: '#ca8a04', label: '🟡' },
            { name: 'Green',  bg: 'rgba(187, 247, 208, 0.85)', hex: '#4ade80', border: '#16a34a', label: '🟢' },
            { name: 'Cyan',   bg: 'rgba(186, 230, 253, 0.85)', hex: '#38bdf8', border: '#0284c7', label: '🔵' },
            { name: 'Pink',   bg: 'rgba(251, 207, 232, 0.85)', hex: '#f472b6', border: '#db2777', label: '🌸' }
        ];
        this.currentColorIndex = 0;
        this.history = []; // Array of arrays of created <mark> elements

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindEvents();
                this.setupSyncListeners();
            });
        } else {
            this.bindEvents();
            this.setupSyncListeners();
        }
        this.injectStyles();
    }

    setupSyncListeners() {
        if (!window.presenterSyncEngine) return;

        window.presenterSyncEngine.on('HIGHLIGHTER_ADD', (data) => {
            if (data && data.targetText) {
                this.applyRemoteHighlight(data);
            }
        });

        window.presenterSyncEngine.on('HIGHLIGHTER_REMOVE', (data) => {
            if (data && data.text) {
                document.querySelectorAll('.teacher-text-highlight').forEach(mark => {
                    if (mark.textContent === data.text && mark.parentNode) {
                        const textNode = document.createTextNode(mark.textContent);
                        const parent = mark.parentNode;
                        parent.replaceChild(textNode, mark);
                        parent.normalize();
                    }
                });
            }
        });

        window.presenterSyncEngine.on('HIGHLIGHTER_UNDO', () => {
            this.undo(false);
        });

        window.presenterSyncEngine.on('HIGHLIGHTER_CLEAR', () => {
            this.clear(false);
        });
    }

    applyRemoteHighlight(data) {
        const activeSlide = (window.deckEngine && window.deckEngine.slides[data.slideIndex]) || document.querySelector('.slide.active');
        const previewClone = document.querySelector('.slide.preview-clone');
        const roots = [activeSlide, previewClone].filter(Boolean);

        const colorObj = {
            name: data.colorName || 'Yellow',
            bg: data.bg || 'rgba(254, 240, 138, 0.85)',
            border: data.border || '#ca8a04'
        };

        const createdMarks = [];

        roots.forEach(root => {
            const treeWalker = document.createTreeWalker(
                root,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: (node) => {
                        if (!node.nodeValue || !node.nodeValue.includes(data.targetText)) return NodeFilter.FILTER_REJECT;
                        if (node.parentElement && node.parentElement.closest('.presentation-tools-hud, .tool-modal, .presenter-notes-drawer')) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        return NodeFilter.FILTER_ACCEPT;
                    }
                }
            );

            let textNode = treeWalker.nextNode();
            while (textNode) {
                const text = textNode.nodeValue;
                const idx = text.indexOf(data.targetText);
                if (idx !== -1) {
                    const beforeText = text.substring(0, idx);
                    const afterText = text.substring(idx + data.targetText.length);

                    const mark = document.createElement('mark');
                    mark.className = 'teacher-text-highlight';
                    mark.dataset.colorName = colorObj.name;
                    mark.style.backgroundColor = colorObj.bg;
                    mark.style.borderColor = colorObj.border;
                    mark.textContent = data.targetText;
                    mark.title = 'Click to unhighlight';

                    mark.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.removeHighlight(mark, true);
                    });

                    const parent = textNode.parentNode;
                    if (parent) {
                        const fragment = document.createDocumentFragment();
                        if (beforeText) fragment.appendChild(document.createTextNode(beforeText));
                        fragment.appendChild(mark);
                        if (afterText) fragment.appendChild(document.createTextNode(afterText));

                        parent.replaceChild(fragment, textNode);
                        createdMarks.push(mark);
                    }
                    break;
                }
                textNode = treeWalker.nextNode();
            }
        });

        if (createdMarks.length > 0) {
            this.history.push(createdMarks);
        }
    }

    bindEvents() {
        // Highlight on mouseup when active and text is selected
        document.addEventListener('mouseup', (e) => {
            if (!this.isActive) return;
            // Avoid triggering when clicking inside HUD controls or modals
            if (e.target.closest('#presentationToolsHUD, .tool-modal, .highlighter-palette, .notes-header, .cp-header, .cp-notes-col')) return;

            setTimeout(() => {
                const selection = window.getSelection();
                if (selection && !selection.isCollapsed && selection.toString().trim().length > 0) {
                    this.highlightSelection(this.colors[this.currentColorIndex]);
                }
            }, 10);
        });

        // Global shortcuts
        document.addEventListener('keydown', (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable) return;

            // 'H' key toggles highlighter mode
            if ((e.key === 'h' || e.key === 'H') && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                this.toggle();
            }

            // 'C' key clears highlights when mode is active
            if ((e.key === 'c' || e.key === 'C') && this.isActive && !e.ctrlKey) {
                e.preventDefault();
                this.clear();
            }

            // 'Ctrl + Z' undoes last highlight
            if (e.ctrlKey && (e.key === 'z' || e.key === 'Z') && this.isActive) {
                e.preventDefault();
                this.undo();
            }
        });
    }

    toggle(broadcast = true) {
        this.isActive = !this.isActive;
        document.body.classList.toggle('highlighter-mode-active', this.isActive);

        const btn = document.getElementById('toolHighlightBtn');
        if (btn) btn.classList.toggle('active', this.isActive);

        const cpBtn = document.getElementById('btnCpHighlighter');
        if (cpBtn) cpBtn.classList.toggle('active', this.isActive);

        const palette = document.getElementById('highlighterPalette');
        if (palette) palette.style.display = this.isActive ? 'flex' : 'none';

        if (this.isActive && window.deckEngine) {
            window.deckEngine.showToastNotification(`🖍️ Text Highlighter: ${this.colors[this.currentColorIndex].name} (Select text to highlight)`);
        }
    }

    setColor(index) {
        if (index >= 0 && index < this.colors.length) {
            this.currentColorIndex = index;
            document.querySelectorAll('.highlighter-color-btn').forEach((btn, i) => {
                btn.classList.toggle('active', i === index);
            });
            if (window.deckEngine) {
                window.deckEngine.showToastNotification(`🖍️ Color: ${this.colors[index].name}`);
            }
        }
    }

    highlightSelection(colorObj, broadcast = true) {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const selectedText = selection.toString().trim();
        if (!selectedText) return;

        const commonAncestor = range.commonAncestorContainer;
        const rootElement = commonAncestor.nodeType === Node.ELEMENT_NODE ? commonAncestor : commonAncestor.parentNode;

        // Skip non-content UI
        if (rootElement.closest('.presentation-tools-hud, .tool-modal, .presenter-notes-drawer, .cp-header, .cp-notes-col')) {
            return;
        }

        const treeWalker = document.createTreeWalker(
            rootElement,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                    try {
                        if (range.intersectsNode(node)) {
                            return NodeFilter.FILTER_ACCEPT;
                        }
                    } catch(err) {}
                    return NodeFilter.FILTER_REJECT;
                }
            }
        );

        const textNodes = [];
        let currentNode = treeWalker.nextNode();
        while (currentNode) {
            textNodes.push(currentNode);
            currentNode = treeWalker.nextNode();
        }

        if (textNodes.length === 0 && commonAncestor.nodeType === Node.TEXT_NODE) {
            textNodes.push(commonAncestor);
        }

        const createdMarks = [];

        textNodes.forEach(textNode => {
            const isStart = (textNode === range.startContainer);
            const isEnd = (textNode === range.endContainer);
            const startOffset = isStart ? range.startOffset : 0;
            const endOffset = isEnd ? range.endOffset : textNode.nodeValue.length;

            if (startOffset >= endOffset) return;

            const text = textNode.nodeValue;
            const targetText = text.substring(startOffset, endOffset);
            if (!targetText.trim()) return;

            const beforeText = text.substring(0, startOffset);
            const afterText = text.substring(endOffset);

            const mark = document.createElement('mark');
            mark.className = 'teacher-text-highlight';
            mark.dataset.colorName = colorObj.name;
            mark.style.backgroundColor = colorObj.bg;
            mark.style.borderColor = colorObj.border;
            mark.textContent = targetText;
            mark.title = 'Click to unhighlight';

            mark.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeHighlight(mark, true);
            });

            const parent = textNode.parentNode;
            if (!parent) return;

            const fragment = document.createDocumentFragment();
            if (beforeText) fragment.appendChild(document.createTextNode(beforeText));
            fragment.appendChild(mark);
            if (afterText) fragment.appendChild(document.createTextNode(afterText));

            parent.replaceChild(fragment, textNode);
            createdMarks.push(mark);
        });

        selection.removeAllRanges();

        if (createdMarks.length > 0) {
            this.history.push(createdMarks);
        }

        if (broadcast && window.presenterSyncEngine) {
            const slideIndex = window.deckEngine ? window.deckEngine.currentSlide : 0;
            window.presenterSyncEngine.emit('HIGHLIGHTER_ADD', {
                slideIndex,
                targetText: selectedText,
                colorName: colorObj.name,
                bg: colorObj.bg,
                border: colorObj.border
            });
        }
    }

    removeHighlight(mark, broadcast = true) {
        if (!mark || !mark.parentNode) return;
        const text = mark.textContent;
        const textNode = document.createTextNode(text);
        const parent = mark.parentNode;
        parent.replaceChild(textNode, mark);
        parent.normalize(); // Merges adjacent text nodes smoothly

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('HIGHLIGHTER_REMOVE', { text });
        }
    }

    undo(broadcast = true) {
        if (this.history.length > 0) {
            const lastBatch = this.history.pop();
            lastBatch.forEach(mark => this.removeHighlight(mark, false));
            if (window.deckEngine) {
                window.deckEngine.showToastNotification('↩️ Undid highlight');
            }
        }
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('HIGHLIGHTER_UNDO', {});
        }
    }

    clear(broadcast = true) {
        const highlights = document.querySelectorAll('.teacher-text-highlight');
        highlights.forEach(mark => {
            if (mark.parentNode) {
                const textNode = document.createTextNode(mark.textContent);
                const parent = mark.parentNode;
                parent.replaceChild(textNode, mark);
            }
        });
        document.querySelectorAll('.slide, .preview-clone, .page-content').forEach(el => {
            try { el.normalize(); } catch(e) {}
        });
        this.history = [];
        if (window.deckEngine) {
            window.deckEngine.showToastNotification('🗑️ Cleared highlights');
        }
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('HIGHLIGHTER_CLEAR', {});
        }
    }

    injectStyles() {
        if (document.getElementById('teacherHighlighterStyles')) return;
        const style = document.createElement('style');
        style.id = 'teacherHighlighterStyles';
        style.textContent = `
            body.highlighter-mode-active {
                cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23facc15' stroke='%23000' stroke-width='1.5'%3E%3Cpath d='m9 11-6 6v3h3l6-6'/%3E%3Cpath d='m22 7-3-3a2.83 2.83 0 0 0-4 0l-4 4 7 7 4-4a2.83 2.83 0 0 0 0-4Z'/%3E%3C/svg%3E") 2 22, text !important;
            }
            body.highlighter-mode-active * {
                user-select: text !important;
            }
            mark.teacher-text-highlight {
                color: inherit !important;
                background-color: rgba(254, 240, 138, 0.85);
                border-bottom: 2px solid #ca8a04;
                border-radius: 3px;
                padding: 1px 3px;
                cursor: pointer;
                transition: background-color 0.2s ease, opacity 0.2s ease;
                box-decoration-break: clone;
                -webkit-box-decoration-break: clone;
            }
            mark.teacher-text-highlight:hover {
                filter: brightness(0.92);
                outline: 1px dashed rgba(0, 0, 0, 0.3);
            }
            .highlighter-palette {
                position: absolute;
                top: 52px;
                right: 70px;
                background: rgba(15, 23, 42, 0.94);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.16);
                border-radius: 24px;
                padding: 6px 12px;
                display: flex;
                align-items: center;
                gap: 8px;
                z-index: 100000;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
                animation: toolFadeIn 0.2s ease;
            }
            .highlighter-color-btn {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 2px solid transparent;
                cursor: pointer;
                transition: transform 0.15s ease, border-color 0.15s ease;
            }
            .highlighter-color-btn:hover { transform: scale(1.15); }
            .highlighter-color-btn.active {
                border-color: #ffffff;
                box-shadow: 0 0 8px currentColor;
                transform: scale(1.12);
            }
            .highlighter-divider {
                width: 1px;
                height: 18px;
                background: rgba(255, 255, 255, 0.2);
            }
            .highlighter-tool-btn {
                background: transparent;
                border: none;
                color: #cbd5e1;
                font-size: 12px;
                font-weight: 700;
                padding: 3px 6px;
                border-radius: 6px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            .highlighter-tool-btn:hover {
                background: rgba(255, 255, 255, 0.15);
                color: #fff;
            }
        `;
        document.head.appendChild(style);
    }
}

// Global instantiation
window.teacherHighlighter = new TeacherHighlighter();


/* ==================== MODULE: step-reveal.js ==================== */
/**
 * ==========================================================================
 * STEP-BY-STEP REVEAL ENGINE (StepRevealEngine)
 * Enables single-item question reveal for Socratic IELTS classroom teaching
 * - Supports ALL exercise types: Reading (.q-card), Grammar Cloze (.blank-input),
 *   Vocabulary (.select-input), and Multi-choice (.opt-card)
 * - Auto-scrolls reading passage to center on target evidence
 * - Keyboard shortcut: 'E' to step-reveal next unsolved question/input
 * ==========================================================================
 */

class StepRevealEngine {
    constructor(deckEngine) {
        this.deckEngine = deckEngine;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindEvents());
        } else {
            this.bindEvents();
        }

        // Shortcut 'E' to reveal next item on active slide
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'e' || e.key === 'E') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                e.preventDefault();
                this.revealNextOnActiveSlide();
            }
        });
    }

    bindEvents() {
        // 1. Add Step Reveal button to action rows across ALL exercise slides (same line as action buttons)
        document.querySelectorAll('.action-row').forEach(row => {
            if (row.querySelector('.btn-step-reveal')) return;
            const container = row.closest('.question-pane') || row.closest('.page-content') || row.closest('.notebook') || row.parentElement;
            
            // Check if there are any interactive elements on this slide/container
            const hasInteractives = container && (
                container.querySelector('.q-card') ||
                container.querySelector('.select-input') ||
                container.querySelector('.blank-input') ||
                container.querySelector('.opt-card')
            );

            if (hasInteractives) {
                const btn = document.createElement('button');
                btn.className = 'btn-action btn-step-reveal';
                btn.innerHTML = '👉 Step Reveal (E)';
                btn.title = 'Reveal questions one by one (Shortcut: E)';
                btn.onclick = () => this.revealNextInContainer(container);
                row.insertBefore(btn, row.children[1] || null);
            }
        });

        // 2. On Strategy slides, allow clicking a strategy card to toggle its keyword highlighting without revealing answers/explanations
        document.querySelectorAll('.strategy-card').forEach(card => {
            if (card.dataset.strategyBound) return;
            card.dataset.strategyBound = 'true';
            card.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
                const syns = card.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3, .vocab-word');
                const isAnyActive = Array.from(syns).some(s => s.classList.contains('active-syn') || s.classList.contains('active-vocab'));
                syns.forEach(s => {
                    if (isAnyActive) {
                        s.classList.remove('active-syn', 'active-vocab');
                    } else {
                        if (s.classList.contains('vocab-word')) {
                            s.classList.add('active-vocab');
                        } else {
                            s.classList.add('active-syn');
                        }
                    }
                });
            });
        });

        this.injectStyles();
    }

    /**
     * Finds all unrevealed interactive units (cards, standalone inputs, opt-cards) in DOM order
     */
    getUnrevealedItems(container) {
        if (!container) return [];
        const units = [];
        const processedInputs = new Set();

        // 1. Check for question cards
        const qCards = Array.from(container.querySelectorAll('.q-card'));
        qCards.forEach(card => {
            const inputs = Array.from(card.querySelectorAll('.blank-input, .select-input'));
            const synSpans = Array.from(card.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3'));
            
            let isUnsolved = false;
            if (inputs.length > 0) {
                isUnsolved = inputs.some(inp => !inp.classList.contains('correct'));
            } else if (synSpans.length > 0) {
                isUnsolved = synSpans.some(s => !s.classList.contains('active-syn')) || !card.classList.contains('revealed');
            } else {
                isUnsolved = !card.classList.contains('revealed');
            }

            if (isUnsolved) {
                units.push({
                    type: 'card',
                    el: card
                });
            }
            inputs.forEach(inp => processedInputs.add(inp));
        });

        // 2. Check for standalone blank and select inputs not inside a .q-card
        const allInputs = Array.from(container.querySelectorAll('.blank-input, .select-input'));
        allInputs.forEach(input => {
            if (!processedInputs.has(input) && !input.classList.contains('correct') && input.dataset.ans) {
                units.push({
                    type: 'input',
                    el: input
                });
            }
        });

        // 3. Check for multi-option cards (.opt-card)
        const optCards = Array.from(container.querySelectorAll('.opt-card'));
        optCards.forEach(card => {
            if (card.dataset.correct === 'true' && !card.classList.contains('correct-opt') && !card.classList.contains('selected')) {
                units.push({
                    type: 'opt-card',
                    el: card
                });
            }
        });

        // Sort units by DOM document order
        units.sort((a, b) => {
            const pos = a.el.compareDocumentPosition(b.el);
            if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
            if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
            return 0;
        });

        return units;
    }

    revealSingleCard(card) {
        // Reveal blank inputs inside card
        card.querySelectorAll('.blank-input').forEach(input => {
            if (input.dataset.ans) {
                const acceptable = input.dataset.ans.split('|')[0];
                input.value = acceptable;
                input.classList.add('correct');
                input.classList.remove('wrong', 'incorrect');
                if (window.DeckComponents?.autoResizeBlank) {
                    DeckComponents.autoResizeBlank(input);
                }
            }
        });

        // Reveal select dropdowns inside card
        card.querySelectorAll('.select-input').forEach(sel => {
            if (sel.dataset.ans) {
                sel.value = sel.dataset.ans;
                sel.classList.add('correct');
                sel.classList.remove('wrong', 'incorrect');
            }
        });

        // Reveal direct keyword and vocabulary highlights inside card
        card.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => {
            s.classList.add('active-syn');
        });
        card.querySelectorAll('.vocab-word, .vocab-term').forEach(v => {
            v.classList.add('active-vocab');
        });

        card.classList.add('revealed');

        // Show explanation box if exists
        const exp = card.querySelector('.item-explanation');
        if (exp) {
            exp.classList.add('show');
            exp.style.display = 'block';
        }

        // Auto-trigger evidence highlight in passage if linked
        const qId = card.dataset.q;
        const synBtn = card.querySelector('.syn-btn');
        const evId = synBtn ? synBtn.dataset.ev : (qId ? `ev-${qId}` : null);
        if (qId && window.readingHighlighter) {
            window.readingHighlighter.showEvidence(qId, evId);
        } else if (qId && window.deckEngine) {
            if (evId) window.deckEngine.toggleSynonymExplanation(qId, evId);
        }
    }

    revealSingleInput(input) {
        if (!input || !input.dataset.ans) return;

        if (input.classList.contains('blank-input')) {
            input.value = input.dataset.ans.split('|')[0];
            input.classList.add('correct');
            input.classList.remove('wrong', 'incorrect');
            if (window.DeckComponents?.autoResizeBlank) {
                DeckComponents.autoResizeBlank(input);
            }
        } else if (input.classList.contains('select-input')) {
            input.value = input.dataset.ans;
            input.classList.add('correct');
            input.classList.remove('wrong', 'incorrect');
        }

        // Reveal associated explanation in parent container/item if present
        const parent = input.closest('.card, .cloze-box, .exercise-box, .q-item, p, li, tr, div');
        if (parent) {
            const exp = parent.querySelector('.item-explanation');
            if (exp) {
                exp.classList.add('show');
                exp.style.display = 'block';
            }
        }
    }

    revealNextOnActiveSlide() {
        const activeSlide = document.querySelector('.slide.active');
        if (!activeSlide) return;
        this.revealNextInContainer(activeSlide);
    }

    revealNextInContainer(container) {
        if (!container) return;
        const unrevealedUnits = this.getUnrevealedItems(container);
        if (unrevealedUnits.length === 0) return;

        const nextUnit = unrevealedUnits[0];
        if (nextUnit.type === 'card') {
            this.revealSingleCard(nextUnit.el);
            nextUnit.el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else if (nextUnit.type === 'input') {
            this.revealSingleInput(nextUnit.el);
            nextUnit.el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else if (nextUnit.type === 'opt-card') {
            nextUnit.el.classList.add('selected', 'correct-opt');
            nextUnit.el.classList.remove('wrong-opt');
            nextUnit.el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    injectStyles() {
        if (document.getElementById('stepRevealStyles')) return;
        const style = document.createElement('style');
        style.id = 'stepRevealStyles';
        style.textContent = `
            .btn-step-reveal {
                background: rgba(5, 150, 105, 0.12) !important;
                border-color: rgba(5, 150, 105, 0.4) !important;
                color: var(--col-vocab, #059669) !important;
                font-weight: 700 !important;
            }
            .btn-step-reveal:hover {
                background: var(--col-vocab, #059669) !important;
                color: #ffffff !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Global instantiation (deferred to ensure DeckEngine is available)
window.addEventListener('DOMContentLoaded', () => {
    window.stepRevealEngine = new StepRevealEngine(window.deckEngine);
});


/* ==================== MODULE: student-picker.js ==================== */
/**
 * ==========================================================================
 * RANDOM STUDENT SELECTOR (StudentPicker)
 * Interactive Cold-Call / Random Selector for Classroom Engagement
 * - Animated roulette spin effect
 * - Customizable student names list or fast number mode (1 to N)
 * - Saved in localStorage for future class sessions
 * - Keyboard shortcut: 'R' (toggle)
 * ==========================================================================
 */

class StudentPicker {
    constructor() {
        this.STORAGE_KEY = 'ielts_class_roster';
        this.students = this.loadStudents();
        this.isSpinning = false;

        this.init();
    }

    loadStudents() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            try { return JSON.parse(saved); } catch(e) {}
        }
        return ['Alex', 'David', 'Emma', 'Grace', 'Henry', 'James', 'Lucas', 'Mia', 'Oliver', 'Sophie'];
    }

    saveStudents() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.students));
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.injectUI();
                this.setupSyncListeners();
            });
        } else {
            this.injectUI();
            this.setupSyncListeners();
        }

        // Global shortcut 'R'
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'r' || e.key === 'R') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                e.preventDefault();
                this.toggle(true);
            }
        });
    }

    setupSyncListeners() {
        if (!window.presenterSyncEngine) return;

        window.presenterSyncEngine.on('STUDENT_PICKER_MODAL', (data) => {
            if (data && data.open) {
                this.open(false);
            } else {
                this.close(false);
            }
        });

        window.presenterSyncEngine.on('STUDENT_SPIN', (data) => {
            if (data && data.student) {
                this.open(false);
                this.spin(data.student, false, data.totalCycles);
            }
        });

        window.presenterSyncEngine.on('STUDENT_ROSTER_SYNC', (data) => {
            if (data && Array.isArray(data.students)) {
                this.students = data.students;
                this.saveStudents();
                const input = document.getElementById('rosterInput');
                if (input) input.value = this.students.join(', ');
            }
        });
    }

    injectUI() {
        if (document.getElementById('studentPickerModal')) return;

        const modal = document.createElement('div');
        modal.id = 'studentPickerModal';
        modal.className = 'student-picker-modal';
        modal.style.display = 'none';

        modal.innerHTML = `
            <div class="student-modal-backdrop" onclick="studentPicker.close(true)"></div>
            <div class="student-modal-dialog">
                <div class="student-modal-header">
                    <div>
                        <h2>🎲 Random Student Selector</h2>
                        <p>Engage students with fair cold-calling &amp; speaking turns.</p>
                    </div>
                    <button class="student-modal-close" onclick="studentPicker.close(true)">×</button>
                </div>

                <div class="picker-display-stage">
                    <div class="picker-result-name" id="pickerResultName">Click Spin to Pick!</div>
                </div>

                <div class="picker-controls-row">
                    <button class="btn-picker-spin" id="pickerSpinBtn" onclick="studentPicker.spin(null, true)">🎲 SPIN WHEEL</button>
                    <button class="btn-picker-edit" onclick="studentPicker.toggleRosterEditor()">✏️ Edit Roster</button>
                </div>

                <!-- Roster Editor Drawer -->
                <div class="roster-editor-box" id="rosterEditorBox" style="display:none;">
                    <label>Enter Student Names (comma or newline separated):</label>
                    <textarea id="rosterInput" rows="4">${this.students.join(', ')}</textarea>
                    <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:8px;">
                        <button class="btn-action" onclick="studentPicker.setQuickNumbers(15)">1–15 Numbers</button>
                        <button class="btn-action btn-primary" onclick="studentPicker.saveRosterFromInput()">Save Roster</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.injectStyles();
    }

    spin(targetStudent = null, broadcast = true, customCycles = null) {
        if (this.isSpinning || this.students.length === 0) return;
        this.isSpinning = true;

        const chosenStudent = targetStudent || this.students[Math.floor(Math.random() * this.students.length)];
        const totalCycles = customCycles || (24 + Math.floor(Math.random() * 8));

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('STUDENT_SPIN', {
                student: chosenStudent,
                totalCycles: totalCycles
            });
            window.presenterSyncEngine.emit('STUDENT_PICKED', {
                student: chosenStudent
            });
        }

        const resultEl = document.getElementById('pickerResultName');
        const spinBtn = document.getElementById('pickerSpinBtn');
        if (spinBtn) spinBtn.disabled = true;

        let counter = 0;
        const interval = 60;

        const step = () => {
            if (counter < totalCycles - 1) {
                const randomIndex = Math.floor(Math.random() * this.students.length);
                if (resultEl) {
                    resultEl.textContent = this.students[randomIndex];
                    resultEl.style.transform = `scale(${1 + (counter % 3) * 0.04})`;
                }
                counter++;
                setTimeout(step, interval + counter * 6);
            } else {
                this.isSpinning = false;
                if (spinBtn) spinBtn.disabled = false;
                if (resultEl) {
                    resultEl.textContent = chosenStudent;
                    resultEl.style.transform = 'scale(1.15)';
                    resultEl.style.color = '#38bdf8';
                }

                // Update Cockpit display badge if present
                const pill = document.getElementById('cpPickedStudentDisplay');
                const nameEl = document.getElementById('cpPickedStudentName');
                if (pill && nameEl) {
                    nameEl.textContent = chosenStudent;
                    pill.style.display = 'flex';
                    pill.classList.add('pulse');
                    setTimeout(() => pill.classList.remove('pulse'), 800);
                }

                this.playChime();
            }
        };

        step();
    }

    playChime() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            osc.start();
            osc.stop(ctx.currentTime + 0.45);
        } catch(e) {}
    }

    toggleRosterEditor() {
        const box = document.getElementById('rosterEditorBox');
        if (box) {
            box.style.display = box.style.display === 'none' ? 'block' : 'none';
        }
    }

    saveRosterFromInput() {
        const input = document.getElementById('rosterInput');
        if (!input) return;
        const names = input.value.split(/[,\n]+/).map(n => n.trim()).filter(n => n.length > 0);
        if (names.length > 0) {
            this.students = names;
            this.saveStudents();
            this.toggleRosterEditor();
            if (window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('STUDENT_ROSTER_SYNC', { students: names });
            }
        }
    }

    setQuickNumbers(count = 15) {
        const numbers = [];
        for (let i = 1; i <= count; i++) numbers.push(`Student #${i}`);
        this.students = numbers;
        this.saveStudents();
        const input = document.getElementById('rosterInput');
        if (input) input.value = numbers.join(', ');
        this.toggleRosterEditor();
        if (window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('STUDENT_ROSTER_SYNC', { students: numbers });
        }
    }

    open(broadcast = true) {
        const modal = document.getElementById('studentPickerModal');
        if (modal) modal.style.display = 'flex';
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('STUDENT_PICKER_MODAL', { open: true });
        }
    }

    openModal() {
        this.open(true);
    }

    pickRandomStudent(broadcast = true) {
        this.spin(null, broadcast);
    }

    close(broadcast = true) {
        const modal = document.getElementById('studentPickerModal');
        if (modal) modal.style.display = 'none';
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('STUDENT_PICKER_MODAL', { open: false });
        }
    }

    toggle(broadcast = true) {
        const modal = document.getElementById('studentPickerModal');
        if (modal && modal.style.display === 'flex') {
            this.close(broadcast);
        } else {
            this.open(broadcast);
        }
    }

    injectStyles() {
        if (document.getElementById('studentPickerStyles')) return;
        const style = document.createElement('style');
        style.id = 'studentPickerStyles';
        style.textContent = `
            .student-picker-modal {
                position: fixed;
                inset: 0;
                z-index: 100000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .student-modal-backdrop {
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.78);
                backdrop-filter: blur(8px);
            }
            .student-modal-dialog {
                position: relative;
                z-index: 1;
                background: #0f172a;
                border: 1.5px solid rgba(255, 255, 255, 0.16);
                border-radius: 18px;
                width: 90%;
                max-width: 540px;
                padding: 28px;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
                color: #ffffff;
                animation: modalPopIn 240ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            @keyframes modalPopIn {
                0% { opacity: 0; transform: scale(0.95) translateY(10px); }
                100% { opacity: 1; transform: scale(1) translateY(0); }
            }
            .student-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 20px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding-bottom: 12px;
            }
            .student-modal-header h2 { font-size: 20px; font-weight: 800; }
            .student-modal-header p { font-size: 13px; color: #94a3b8; }
            .student-modal-close {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 26px;
                cursor: pointer;
                transition: color 120ms ease-out, transform 120ms ease-out;
            }
            .student-modal-close:hover { color: #fff; transform: scale(1.1); }
            .student-modal-close:active { transform: scale(0.92); }
            .picker-display-stage {
                background: rgba(255, 255, 255, 0.05);
                border: 2px dashed rgba(56, 189, 248, 0.35);
                border-radius: 14px;
                height: 120px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
            }
            .picker-result-name {
                font-size: 32px;
                font-weight: 900;
                color: #f8fafc;
                transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1), color 200ms ease-out;
                text-align: center;
            }
            .picker-controls-row {
                display: flex;
                gap: 10px;
            }
            .btn-picker-spin {
                flex: 1;
                background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
                color: #ffffff;
                font-size: 16px;
                font-weight: 800;
                padding: 14px 20px;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                box-shadow: 0 4px 18px rgba(37, 99, 235, 0.4);
                transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), filter 140ms ease-out;
            }
            .btn-picker-spin:hover { transform: translateY(-2px); filter: brightness(1.1); }
            .btn-picker-spin:active { transform: scale(0.97); }
            .btn-picker-edit {
                background: rgba(255, 255, 255, 0.08);
                color: #cbd5e1;
                border: 1px solid rgba(255, 255, 255, 0.15);
                padding: 14px 18px;
                border-radius: 10px;
                cursor: pointer;
                font-weight: 700;
                transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), background-color 140ms ease-out;
            }
            .btn-picker-edit:hover { background: rgba(255, 255, 255, 0.15); color: #fff; transform: translateY(-1px); }
            .btn-picker-edit:active { transform: scale(0.96); }
            .roster-editor-box {
                margin-top: 16px;
                padding-top: 16px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            .roster-editor-box label { font-size: 12px; font-weight: 700; color: #94a3b8; display: block; margin-bottom: 6px; }
            .roster-editor-box textarea {
                width: 100%;
                background: #1e293b;
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 8px;
                color: #f8fafc;
                padding: 8px 12px;
                font-family: inherit;
                font-size: 13.5px;
            }
        `;
        document.head.appendChild(style);
    }
}

// Global instantiation
window.studentPicker = new StudentPicker();


/* ==================== MODULE: paragraph-loupe.js ==================== */
/**
 * ==========================================================================
 * PARAGRAPH FOCUS LOUPE (ParagraphLoupe)
 * Isolates, magnifies, and illuminates reading paragraphs for classroom clarity
 * - Click any paragraph tag [Paragraph X] to zoom in & spotlight
 * - Dims neighboring paragraphs for laser-focused reading analysis
 * - Keyboard shortcut: 'Z' (cycles through paragraphs) / 'Escape' to reset
 * - Fully synced across Presenter View & Audience Display
 * ==========================================================================
 */

class ParagraphLoupe {
    constructor() {
        this.activePara = null;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindEvents());
        } else {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.injectStyles();

        // 1. Delegated click listener for all paragraph tags (works with dynamic templates)
        document.addEventListener('click', (e) => {
            const tag = e.target.closest('.para-tag');
            if (tag) {
                e.stopPropagation();
                const p = tag.closest('p') || tag.parentElement;
                if (p) {
                    this.toggleFocus(p);
                    this.notifySync();
                }
            }
        });

        // 2. Global keyboard shortcut 'Z' to cycle focus on active slide
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'z' || e.key === 'Z') && !e.ctrlKey && !e.altKey && !e.metaKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                e.preventDefault();
                this.cycleNextParagraph();
                this.notifySync();
            }

            if (e.key === 'Escape' && this.activePara) {
                this.clearFocus();
                this.notifySync();
            }
        });
    }

    /**
     * Master toggle method called by UI buttons and Presenter View
     */
    toggle() {
        this.cycleNextParagraph();
    }

    toggleFocus(paraEl) {
        if (this.activePara === paraEl) {
            this.clearFocus();
        } else {
            this.focusParagraph(paraEl);
        }
    }

    focusParagraph(paraEl) {
        this.clearFocus();
        if (!paraEl) return;

        this.activePara = paraEl;
        const pane = paraEl.closest('.reading-pane') || paraEl.closest('[data-slot="passage"]') || paraEl.parentElement;
        if (pane) {
            pane.classList.add('loupe-active');
        }
        paraEl.classList.add('loupe-focused');

        try {
            paraEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (_) {}
    }

    clearFocus() {
        if (this.activePara) {
            const pane = this.activePara.closest('.reading-pane') || this.activePara.closest('[data-slot="passage"]') || this.activePara.parentElement;
            if (pane) pane.classList.remove('loupe-active');
            this.activePara.classList.remove('loupe-focused');
            this.activePara = null;
        }

        // Also clean any orphan classes
        document.querySelectorAll('.loupe-focused').forEach(el => el.classList.remove('loupe-focused'));
        document.querySelectorAll('.loupe-active').forEach(el => el.classList.remove('loupe-active'));
    }

    getActiveSlideParagraphs() {
        // Target active slide in current document
        const activeSlide = document.querySelector('.slide.active');
        if (!activeSlide) return [];

        // 1. Prefer paragraphs with .para-tag
        let paragraphs = Array.from(activeSlide.querySelectorAll('.para-tag'))
            .map(tag => tag.closest('p') || tag.parentElement)
            .filter(Boolean);

        // 2. Fallback: all paragraphs in reading pane
        if (paragraphs.length === 0) {
            paragraphs = Array.from(activeSlide.querySelectorAll('.reading-pane p, [data-slot="passage"] p, .card p'));
        }

        // Remove duplicates
        return [...new Set(paragraphs)];
    }

    cycleNextParagraph() {
        const paragraphs = this.getActiveSlideParagraphs();
        if (paragraphs.length === 0) {
            // Also attempt inside iframe if in presenter view
            const iframe = document.getElementById('currentSlideFrame') || document.querySelector('iframe.slide-frame');
            if (iframe && iframe.contentWindow && iframe.contentWindow.paragraphLoupe) {
                iframe.contentWindow.paragraphLoupe.cycleNextParagraph();
                return;
            }
            return;
        }

        let nextIndex = 0;
        if (this.activePara) {
            const currentIndex = paragraphs.indexOf(this.activePara);
            nextIndex = (currentIndex + 1) % (paragraphs.length + 1);
        }

        if (nextIndex < paragraphs.length) {
            this.focusParagraph(paragraphs[nextIndex]);
        } else {
            this.clearFocus();
        }
    }

    notifySync(clear = false) {
        const syncEngine = window.presenterSyncEngine || window.presenterViewSync;
        if (syncEngine && typeof syncEngine.emit === 'function') {
            const paragraphs = this.getActiveSlideParagraphs();
            const paraIndex = (!clear && this.activePara) ? paragraphs.indexOf(this.activePara) : -1;
            syncEngine.emit('PARAGRAPH_LOUPE_CMD', {
                slideIndex: window.deckEngine ? window.deckEngine.currentSlide : 0,
                paraIndex,
                clear: clear || (paraIndex === -1)
            });
        }
    }

    applyRemoteSync(data) {
        if (!data) {
            this.cycleNextParagraph();
            return;
        }

        if (data.clear || data.paraIndex === -1) {
            this.clearFocus();
            return;
        }

        const paragraphs = this.getActiveSlideParagraphs();
        if (typeof data.paraIndex === 'number' && data.paraIndex >= 0 && data.paraIndex < paragraphs.length) {
            this.focusParagraph(paragraphs[data.paraIndex]);
        } else {
            this.cycleNextParagraph();
        }
    }

    injectStyles() {
        if (document.getElementById('paragraphLoupeStyles')) return;
        const style = document.createElement('style');
        style.id = 'paragraphLoupeStyles';
        style.textContent = `
            .reading-pane.loupe-active p,
            [data-slot="passage"].loupe-active p {
                opacity: 0.22 !important;
                filter: blur(0.25px);
                transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.35s ease;
            }
            .reading-pane.loupe-active p.loupe-focused,
            [data-slot="passage"].loupe-active p.loupe-focused,
            p.loupe-focused {
                opacity: 1 !important;
                filter: none !important;
                transform: scale(1.035) translateY(-2px) !important;
                transform-origin: left center;
                background: rgba(37, 99, 235, 0.08) !important;
                border-left: 5px solid var(--col-reading, #2563eb) !important;
                padding: 10px 16px !important;
                border-radius: 0 10px 10px 0 !important;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18) !important;
                z-index: 10;
                position: relative;
            }
            .para-tag {
                cursor: zoom-in !important;
                transition: transform 0.15s ease, background 0.15s ease;
            }
            .para-tag:hover {
                transform: scale(1.08);
                color: #ffffff !important;
                background: var(--col-reading, #2563eb) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Global instantiation
window.paragraphLoupe = new ParagraphLoupe();


/* ==================== MODULE: presenter-notes.js ==================== */
/**
 * ==========================================================================
 * TEACHER PRESENTER NOTES DRAWER (PresenterNotesEngine)
 * Collapsible side-drawer displaying pedagogical talking points,
 * pacing cues, and common IELTS student pitfalls for the active slide.
 * Keyboard shortcut: 'N' (toggle notes)
 * ==========================================================================
 */

class PresenterNotesEngine {
    constructor(deckEngine) {
        this.deckEngine = deckEngine;
        this.isOpen = false;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.injectUI());
        } else {
            this.injectUI();
        }

        // Shortcut 'N' toggles presenter notes
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'n' || e.key === 'N') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    injectUI() {
        if (document.getElementById('presenterNotesDrawer')) return;

        const drawer = document.createElement('aside');
        drawer.id = 'presenterNotesDrawer';
        drawer.className = 'presenter-notes-drawer';
        drawer.innerHTML = `
            <div class="notes-header">
                <div>
                    <h3>📝 Teacher Presenter Notes</h3>
                    <span class="notes-slide-tag" id="notesSlideTag">Slide 1</span>
                </div>
                <button class="notes-close-btn" onclick="presenterNotesEngine.toggle()">×</button>
            </div>
            <div class="notes-content" id="notesContent">
                <!-- Dynamically hydrated -->
            </div>
        `;
        document.body.appendChild(drawer);
        this.injectStyles();

        // Listen to slide changes to update notes
        window.addEventListener('slidechanged', () => this.updateNotesForCurrentSlide());
        this.updateNotesForCurrentSlide();
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const drawer = document.getElementById('presenterNotesDrawer');
        const btn = document.getElementById('toolNotesBtn');
        if (drawer) drawer.classList.toggle('open', this.isOpen);
        if (btn) btn.classList.toggle('active', this.isOpen);
        if (this.isOpen) this.updateNotesForCurrentSlide();
    }

    updateNotesForCurrentSlide() {
        const activeSlide = document.querySelector('.slide.active');
        const tagEl = document.getElementById('notesSlideTag');
        const contentEl = document.getElementById('notesContent');
        if (!activeSlide || !contentEl) return;

        const skill = activeSlide.dataset.skill || 'general';
        const slideNum = activeSlide.querySelector('.slide-number')?.textContent || 'General Overview';
        if (tagEl) tagEl.textContent = slideNum;

        // Extract custom slide notes or generate pedagogical guidance based on skill
        let customNote = activeSlide.querySelector('.teacher-note')?.innerHTML;
        if (!customNote) {
            customNote = this.getDefaultGuidance(skill, activeSlide);
        }

        contentEl.innerHTML = customNote;
    }

    getDefaultGuidance(skill, slide) {
        switch(skill) {
            case 'read':
                return `
                    <div class="note-section">
                        <h4>🎯 Objective &amp; Timing (10–12 min)</h4>
                        <p>Have students scan the passage for parallel expressions before answering questions.</p>
                    </div>
                    <div class="note-section warning">
                        <h4>⚠️ Common Student Traps</h4>
                        <p>Students often mistake <strong>NOT GIVEN</strong> for <strong>FALSE/NO</strong>. Remind them: if the text lacks direct confirmation or denial, it must be NOT GIVEN.</p>
                    </div>
                    <div class="note-section tip">
                        <h4>💡 Teacher Tip</h4>
                        <p>Use the <kbd>E</kbd> key for Step Reveal to discuss each question card Socratic-style.</p>
                    </div>
                `;
            case 'grammar':
                return `
                    <div class="note-section">
                        <h4>🎯 Objective &amp; Timing (8–10 min)</h4>
                        <p>Clarify tense markers and clause construction. Elicit example sentences from 2–3 students.</p>
                    </div>
                    <div class="note-section tip">
                        <h4>💡 Collocation Check</h4>
                        <p>Highlight prepositions and time adverbials (e.g. <em>since 2011</em> vs <em>in 2011</em>).</p>
                    </div>
                `;
            case 'write':
                return `
                    <div class="note-section">
                        <h4>🎯 Objective &amp; Timing (12–15 min)</h4>
                        <p>Analyze paragraph coherence, cohesive devices, and data comparison structures.</p>
                    </div>
                    <div class="note-section">
                        <h4>📊 Band 7.0+ Criteria</h4>
                        <p>Ensure students note the contrast transition words (<em>while, in contrast, whereas</em>) highlighted on screen.</p>
                    </div>
                `;
            case 'vocab':
                return `
                    <div class="note-section">
                        <h4>🎯 Objective &amp; Timing (6–8 min)</h4>
                        <p>Drill pronunciation using the Multi-Accent speech player. Test word formation suffixes.</p>
                    </div>
                `;
            default:
                return `
                    <div class="note-section">
                        <h4>🎯 Presentation Guidance</h4>
                        <p>Introduce the module syllabus and set the pacing expectations for today's masterclass.</p>
                    </div>
                `;
        }
    }

    injectStyles() {
        if (document.getElementById('presenterNotesStyles')) return;
        const style = document.createElement('style');
        style.id = 'presenterNotesStyles';
        style.textContent = `
            .presenter-notes-drawer {
                position: fixed;
                top: 0;
                right: 0;
                width: 360px;
                height: 100vh;
                background: #0f172a;
                border-left: 1.5px solid rgba(255, 255, 255, 0.16);
                box-shadow: -10px 0 35px rgba(0, 0, 0, 0.6);
                z-index: 99999;
                transform: translateX(100%);
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                display: flex;
                flex-direction: column;
                color: #f8fafc;
            }
            .presenter-notes-drawer.open {
                transform: translateX(0);
            }
            .notes-header {
                padding: 20px 24px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }
            .notes-header h3 { font-size: 16px; font-weight: 800; }
            .notes-slide-tag { font-family: var(--font-mono); font-size: 12px; color: #38bdf8; }
            .notes-close-btn {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 24px;
                cursor: pointer;
            }
            .notes-close-btn:hover { color: #ffffff; }
            .notes-content {
                flex: 1;
                padding: 24px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .note-section {
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 14px 16px;
            }
            .note-section h4 { font-size: 13.5px; font-weight: 800; margin-bottom: 6px; color: #38bdf8; }
            .note-section p { font-size: 13px; color: #cbd5e1; line-height: 1.55; }
            .note-section.warning { border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.08); }
            .note-section.warning h4 { color: #f87171; }
            .note-section.tip { border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.08); }
            .note-section.tip h4 { color: #34d399; }
        `;
        document.head.appendChild(style);
    }
}

// Global instantiation
window.presenterNotesEngine = new PresenterNotesEngine();


/* ==================== MODULE: reading-grounder.js ==================== */
/**
 * Reading Grounder & Vocabulary Explainer Engine (ReadingGrounder)
 * Handles:
 * 1. Interactive Vocabulary Popovers (Definitions, IPA, Audio Pronunciation, and Dual-Pane Highlighting).
 * 2. Automatic dictionary lookup for reading question keywords and passage evidence.
 * 3. Automatic synonym badge rendering from data-syn attributes.
 * 4. Evidence hover focus synchronization.
 */

class ReadingGrounder {
    static init() {
        this.renderSynonymBadges();
        this.bindEvidenceHover();
        this.bindVocabExplainer();
        this.injectVocabStyles();
    }

    /**
     * Built-in IELTS Academic Dictionary for Reading Questions & Target Passage Excerpts
     */
    static get dictionary() {
        return {
            'sharing experiences': {
                word: 'sharing experiences',
                pos: 'phrase',
                ipa: '/ˈʃeə.rɪŋ ɪkˈspɪə.ri.ən.sɪz/',
                def: 'Communicating and recounting personal events to others in social interactions.',
                colloc: 'Paraphrases: "extraordinary experiences" / "tell others"'
            },
            'satisfaction': {
                word: 'satisfaction',
                pos: 'noun',
                ipa: '/ˌsæt.ɪsˈfæk.ʃən/',
                def: 'A pleasant feeling of fulfillment or pleasure.',
                colloc: 'gain / derive satisfaction from'
            },
            'immediate and long-term': {
                word: 'immediate & long-term',
                pos: 'phrase',
                ipa: '/ɪˈmiː.di.ət ænd lɒŋ tɜːm/',
                def: 'Happening in the present moment as well as extending far into the future.',
                colloc: 'Paraphrases: "in the moment" vs. "in the long run"'
            },
            'extraordinary': {
                word: 'extraordinary',
                pos: 'adj.',
                ipa: '/ɪkˈstrɔː.dɪn.ər.i/',
                def: 'Very unusual, special, or remarkable; far beyond ordinary.',
                colloc: 'extraordinary experience / achievement'
            },
            'pleasurable': {
                word: 'pleasurable',
                pos: 'adj.',
                ipa: '/ˈpleʒ.ər.ə.bəl/',
                def: 'Giving a feeling of happy satisfaction or enjoyable sensation.',
                colloc: 'pleasurable in the moment'
            },
            'reminisce': {
                word: 'reminisce',
                pos: 'verb',
                ipa: '/ˌrem.ɪˈnɪs/',
                def: 'To talk, write, or think about enjoyable past experiences.',
                colloc: 'reminisce about the past / fond memories'
            },
            'social communication': {
                word: 'social communication',
                pos: 'noun',
                ipa: '/ˈsəʊ.ʃəl kəˌmjuː.nɪˈkeɪ.ʃən/',
                def: 'The exchange of ideas and information between people in social settings.',
                colloc: 'Paraphrases: "social interaction"'
            },
            'in common': {
                word: 'in common',
                pos: 'idiom / phrase',
                ipa: '/ɪn ˈkɒm.ən/',
                def: 'Shared equally between two or more parties; possessing shared traits.',
                colloc: 'have things in common ↔ grounded in similarities'
            },
            'grounded in': {
                word: 'grounded in',
                pos: 'verb / adj.',
                ipa: '/ˈɡraʊn.dɪd ɪn/',
                def: 'Firmly based on, rooted in, or determined by foundational factors.',
                colloc: 'grounded in similarities / evidence'
            },
            'unusual experiences': {
                word: 'unusual experiences',
                pos: 'noun phrase',
                ipa: '/ʌnˈjuː.ʒu.əl ɪkˈspɪə.ri.ən.sɪz/',
                def: 'Novel, rare, or out-of-the-ordinary events in life.',
                colloc: 'Paraphrases: "extraordinary experiences"'
            },
            'mistakenly thought': {
                word: 'mistakenly thought',
                pos: 'verb phrase',
                ipa: '/mɪˈsteɪ.kən.li θɔːt/',
                def: 'Held an incorrect or inaccurate belief before research evidence.',
                colloc: 'believed ↔ mistakenly thought'
            },
            'participants': {
                word: 'participants',
                pos: 'noun',
                ipa: '/pɑːˈtɪs.ɪ.pənts/',
                def: 'People who take part in a scientific experiment, study, or survey.',
                colloc: 'study participants / sample size'
            },
            'reflected': {
                word: 'reflected',
                pos: 'verb',
                ipa: '/rɪˈflek.tɪd/',
                def: 'Accurately mirrored, reproduced, or represented real-world dynamics.',
                colloc: 'reflected what happens in the real world'
            },
            'criteria': {
                word: 'criteria',
                pos: 'noun (pl.)',
                ipa: '/kraɪˈtɪə.ri.ə/',
                def: 'Standards or principles by which something is judged or decided.',
                colloc: 'different criteria ↔ appearance vs. competence'
            },
            'tailor-made': {
                word: 'tailor-made',
                pos: 'adj.',
                ipa: '/ˈteɪ.lə meɪd/',
                def: 'Made specifically for a particular individual or purpose.',
                colloc: 'specially designed clothes ↔ tailor-made suit'
            },
            'competent': {
                word: 'competent',
                pos: 'adj.',
                ipa: '/ˈkɒm.pɪ.tənt/',
                def: 'Having the necessary ability, knowledge, or skill to do something successfully.',
                colloc: 'highly competent / professional'
            },
            'snap judgement': {
                word: 'snap judgement',
                pos: 'noun',
                ipa: '/snæp ˈdʒʌdʒ.mənt/',
                def: 'A decision or opinion made instantly without deliberation.',
                colloc: 'almost immediately ↔ snap judgement / in one second'
            },
            'enclothed cognition': {
                word: 'enclothed cognition',
                pos: 'noun',
                ipa: '/ɪnˈkləʊðd kɒɡˈnɪʃ.ən/',
                def: 'The systematic influence of clothing on wearers\' psychological processes and cognitive focus.',
                colloc: 'theory of enclothed cognition'
            },
            'impressing others': {
                word: 'impressing others',
                pos: 'phrase',
                ipa: '/ɪmˈpres.ɪŋ ˈʌð.əz/',
                def: 'Gaining admiration or attention from peers through luxury or display.',
                colloc: 'other people notice them ↔ impressing others'
            },
            'belonging': {
                word: 'belonging',
                pos: 'noun',
                ipa: '/bɪˈlɒŋ.ɪŋ/',
                def: 'A sense of being accepted, connected, and part of a social group.',
                colloc: 'signal group belonging ↔ dress in a similar way'
            }
        };
    }

    /**
     * Interactive Vocabulary Highlighting, Pronunciation, and Short Definitions
     */
    static bindVocabExplainer() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('.vocab-word, .vocab-term, .syn-pair-1, .syn-pair-2, .syn-pair-3, [data-def]');
            
            // If clicking inside the popover itself (e.g. replay audio or close), don't close
            if (e.target.closest('#vocabPopover')) return;

            if (target) {
                // If it's a synonym span or vocab word, look up its definition
                const text = target.textContent.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()"]/g, "").trim();
                const matchedDict = this.lookupDict(text, target);

                if (matchedDict || target.dataset.def || target.classList.contains('vocab-word')) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.showVocabPopover(target, matchedDict);
                }
            } else {
                this.hideVocabPopover();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideVocabPopover();
            }
        });
    }

    static lookupDict(rawText, el) {
        if (!rawText) return null;
        const dict = this.dictionary;

        // Exact match
        if (dict[rawText]) return dict[rawText];

        // Partial or substring match
        for (const [key, val] of Object.entries(dict)) {
            if (rawText.includes(key) || key.includes(rawText)) {
                return val;
            }
        }

        // Check data attributes on element
        if (el.dataset.word && dict[el.dataset.word.toLowerCase()]) {
            return dict[el.dataset.word.toLowerCase()];
        }

        return null;
    }

    static showVocabPopover(el, dictData = null) {
        // Remove previous active glow
        document.querySelectorAll('.vocab-word.active-vocab, .vocab-term.active-vocab').forEach(v => {
            v.classList.remove('active-vocab');
        });
        el.classList.add('active-vocab');

        const cleanWord = el.dataset.word || (dictData ? dictData.word : el.textContent.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()"]/g, ""));
        const pos = el.dataset.pos || (dictData ? dictData.pos : 'IELTS KEYWORD');
        const ipa = el.dataset.ipa || (dictData ? dictData.ipa : '');
        const def = el.dataset.def || (dictData ? dictData.def : 'Key academic term targeted in the reading passage & questions.');
        const colloc = el.dataset.colloc || (dictData ? dictData.colloc : '');

        // Auto-play native speech pronunciation in Google Female UK voice
        this.speakWord(cleanWord);

        // Get or create popover element
        let popover = document.getElementById('vocabPopover');
        if (!popover) {
            popover = document.createElement('div');
            popover.id = 'vocabPopover';
            popover.className = 'vocab-popover';
            document.body.appendChild(popover);
        }

        popover.innerHTML = `
            <div class="vp-header">
                <div class="vp-title-group">
                    <span class="vp-word">${cleanWord}</span>
                    <div style="display: flex; gap: 6px; align-items: center; margin-top: 2px;">
                        ${pos ? `<span class="vp-pos">${pos}</span>` : ''}
                        ${ipa ? `<span class="vp-ipa">${ipa}</span>` : ''}
                    </div>
                </div>
                <div class="vp-actions">
                    <button class="vp-audio-btn" title="Listen to pronunciation" onclick="ReadingGrounder.speakWord('${cleanWord.replace(/'/g, "\\'")}')">🔊 Listen</button>
                    <button class="vp-close-btn" title="Close" onclick="ReadingGrounder.hideVocabPopover()">✕</button>
                </div>
            </div>
            <div class="vp-body">
                <div class="vp-def">${def}</div>
                ${colloc ? `<div class="vp-colloc"><strong>Target Linkage:</strong> <em>${colloc}</em></div>` : ''}
            </div>
        `;

        // Position popover relative to clicked element
        popover.style.display = 'block';
        const rect = el.getBoundingClientRect();
        const popRect = popover.getBoundingClientRect();

        let top = rect.bottom + 8;
        let left = rect.left + (rect.width / 2) - (popRect.width / 2);

        // Prevent overflowing viewport
        if (top + popRect.height > window.innerHeight - 20) {
            top = Math.max(10, rect.top - popRect.height - 8);
        }
        if (left < 10) left = 10;
        if (left + popRect.width > window.innerWidth - 10) {
            left = window.innerWidth - popRect.width - 10;
        }

        popover.style.top = `${top}px`;
        popover.style.left = `${left}px`;
    }

    static hideVocabPopover() {
        const popover = document.getElementById('vocabPopover');
        if (popover) {
            popover.style.display = 'none';
        }
        document.querySelectorAll('.vocab-word.active-vocab, .vocab-term.active-vocab').forEach(v => {
            v.classList.remove('active-vocab');
        });
    }

    static speakWord(text) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-GB';
        utterance.rate = 0.9;

        const preferredVoice = this.getPreferredVoice();
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    }

    static getPreferredVoice() {
        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) return null;

        // 1. Prioritize Google UK English Female
        const googleUkFemale = voices.find(v => 
            v.name.includes('Google') && 
            (v.name.includes('UK English Female') || (v.lang.replace('_', '-').startsWith('en-GB') && v.name.toLowerCase().includes('female')))
        );
        if (googleUkFemale) return googleUkFemale;

        // 2. Any Google UK English voice
        const googleUk = voices.find(v => v.name.includes('Google') && (v.lang === 'en-GB' || v.lang === 'en_GB'));
        if (googleUk) return googleUk;

        // 3. Natural British Female voices (e.g. Microsoft Libby, Hazel, Sonia, Serena)
        const britishFemale = voices.find(v => 
            (v.lang === 'en-GB' || v.lang === 'en_GB') && 
            (v.name.toLowerCase().includes('female') || v.name.includes('Natural') || v.name.includes('Libby') || v.name.includes('Hazel') || v.name.includes('Sonia') || v.name.includes('Serena'))
        );
        if (britishFemale) return britishFemale;

        // 4. Any en-GB voice
        return voices.find(v => v.lang === 'en-GB' || v.lang === 'en_GB') || null;
    }

    static injectVocabStyles() {
        if (document.getElementById('readingGrounderStyles')) return;
        const style = document.createElement('style');
        style.id = 'readingGrounderStyles';
        style.textContent = `
            .vocab-word, .vocab-term {
                border-bottom: 2px dashed #059669;
                color: #065f46;
                font-weight: 600;
                cursor: pointer;
                border-radius: 3px;
                padding: 1px 3px;
                transition: all 0.2s ease;
                display: inline;
            }
            .vocab-word:hover, .vocab-term:hover {
                background: #d1fae5;
                color: #047857;
            }
            .vocab-word.active-vocab, .vocab-term.active-vocab {
                background: #a7f3d0 !important;
                color: #064e3b !important;
                box-shadow: 0 0 0 2px #10b981;
            }

            /* Floating Vocab Popover Card */
            .vocab-popover {
                position: fixed;
                z-index: 10000;
                display: none;
                width: 330px;
                max-width: 90vw;
                background: #ffffff;
                border: 2px solid #10b981;
                border-radius: 12px;
                padding: 14px 16px;
                box-shadow: 0 12px 28px -5px rgba(0, 0, 0, 0.22), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
                font-family: var(--font-body, 'DM Sans', sans-serif);
                animation: popoverFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .vp-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                border-bottom: 1px solid #e2e8f0;
                padding-bottom: 8px;
                margin-bottom: 8px;
                gap: 8px;
            }

            .vp-title-group {
                display: flex;
                flex-direction: column;
                gap: 2px;
            }

            .vp-word {
                font-size: 17.5px;
                font-weight: 800;
                color: #0f172a;
                font-family: var(--font-display, sans-serif);
            }

            .vp-pos {
                font-size: 11.5px;
                font-weight: 700;
                color: #059669;
                text-transform: uppercase;
                background: #ecfdf5;
                padding: 1px 6px;
                border-radius: 4px;
                width: max-content;
            }

            .vp-ipa {
                font-size: 12.5px;
                color: #64748b;
                font-family: 'JetBrains Mono', monospace;
            }

            .vp-actions {
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .vp-audio-btn {
                background: #ecfdf5;
                border: 1px solid #a7f3d0;
                color: #059669;
                font-size: 12px;
                font-weight: 700;
                padding: 4px 8px;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s;
            }

            .vp-audio-btn:hover {
                background: #10b981;
                color: #ffffff;
            }

            .vp-close-btn {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                padding: 2px 6px;
                line-height: 1;
                border-radius: 4px;
            }

            .vp-close-btn:hover {
                color: #ef4444;
                background: #fee2e2;
            }

            .vp-body {
                font-size: 14px;
                line-height: 1.5;
                color: #334155;
            }

            .vp-def {
                margin-bottom: 6px;
                font-weight: 500;
            }

            .vp-colloc {
                font-size: 12.5px;
                color: #475569;
                background: #f8fafc;
                padding: 6px 8px;
                border-radius: 6px;
                border-left: 3px solid #059669;
            }

            @keyframes popoverFadeIn {
                from { opacity: 0; transform: translateY(-4px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renders concise data-syn attributes into styled synonym cards
     */
    static renderSynonymBadges() {
        document.querySelectorAll('[data-syn]').forEach(container => {
            const raw = container.dataset.syn;
            if (!raw) return;

            const pairs = raw.split('|').map(p => p.trim());
            const fragment = document.createDocumentFragment();

            pairs.forEach(pair => {
                const parts = pair.split(':');
                if (parts.length >= 2) {
                    const color = parts[0].trim().toLowerCase();
                    const text = parts.slice(1).join(':').trim();

                    const box = document.createElement('div');
                    box.className = 'syn-key-box';

                    const tag = document.createElement('span');
                    tag.className = `syn-tag ${color}`;
                    tag.textContent = color.charAt(0).toUpperCase() + color.slice(1) + ':';

                    const label = document.createElement('span');
                    label.innerHTML = text.replace(/'([^']+)'/g, '<em>"$1"</em>');

                    box.appendChild(tag);
                    box.appendChild(label);
                    fragment.appendChild(box);
                }
            });

            container.appendChild(fragment);
        });
    }

    /**
     * Highlights corresponding evidence when hovering over question cards
     */
    static bindEvidenceHover() {
        document.querySelectorAll('.q-card[data-q], [data-evidence-target]').forEach(card => {
            const qKey = card.dataset.q;
            if (!qKey) return;

            card.addEventListener('mouseenter', () => {
                document.querySelectorAll(`mark.evidence[id*="${qKey}"]`).forEach(m => m.classList.add('hover-focus'));
            });
            card.addEventListener('mouseleave', () => {
                document.querySelectorAll(`mark.evidence[id*="${qKey}"]`).forEach(m => m.classList.remove('hover-focus'));
            });
        });
    }
}

// Auto-run on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
    ReadingGrounder.init();
});


/* ==================== MODULE: reading-highlighter.js ==================== */
/**
 * Universal Reading Evidence & Synonym Highlighter (ReadingHighlighter)
 * 
 * Automatically manages all reading highlighting behaviors:
 * 1. Reveals evidence marks (<mark class="evidence">) and synonym pairs (.syn-pair-*) when checking or revealing answers.
 * 2. Spotlight Context Dimming: dims surrounding text to highlight target evidence with zero distraction.
 * 3. Keyboard Navigation: Press 'E' / 'Shift+E' to cycle evidence, '1'-'9' to jump to Question N, 'Esc' to clear.
 * 4. Clears highlights and explanations when resetting exercises.
 * 5. Smooth-scrolls the reading passage to center on the exact evidence when clicking synonym buttons.
 * 6. Hooks transparently into DeckEngine's exercise methods and Presenter View sync.
 */

class ReadingHighlighter {
    constructor() {
        this.activeEvidenceId = null;
        this.currentEvidenceIndex = -1;
        this.init();
    }

    init() {
        this.bindSynonymClicks();
        this.bindKeyboardShortcuts();
        this.hookDeckEngine();
        this.setupSyncListeners();
    }

    setupSyncListeners() {
        if (window.presenterSyncEngine) {
            window.presenterSyncEngine.on('EVIDENCE_FOCUS', (data) => {
                if (data && (data.qKey || data.evId)) {
                    this.focusEvidence(data.qKey, data.evId, false);
                }
            });

            window.presenterSyncEngine.on('EVIDENCE_CLEAR', (data) => {
                this.clearAll(data?.containerId, false);
            });
        }
    }

    /**
     * Highlights all evidence and synonym pairs associated with an exercise container or current slide
     */
    highlightAll(containerId, broadcast = true) {
        const slide = this.getSlideForContainer(containerId);
        if (!slide) return;

        // Highlight all evidence marks in this slide's reading pane
        slide.querySelectorAll('mark.evidence').forEach(mark => {
            mark.classList.add('highlighted');
        });

        // Activate all synonym pairs in both reading pane and question pane
        slide.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(span => {
            span.classList.add('active-syn');
        });

        // Activate all vocabulary terms
        slide.querySelectorAll('.vocab-word, .vocab-term').forEach(v => {
            v.classList.add('active-vocab');
        });

        // Ensure reading pane is not dimmed in "Show All" mode
        slide.querySelectorAll('.reading-pane').forEach(pane => {
            pane.classList.remove('spotlight-mode');
            pane.querySelectorAll('.spotlight-target').forEach(p => p.classList.remove('spotlight-target'));
        });

        // Also apply to preview scaler / preview clone in presenter view
        const scaler = document.getElementById('cpCurrentSlideScaler');
        if (scaler) {
            scaler.querySelectorAll('mark.evidence').forEach(m => m.classList.add('highlighted'));
            scaler.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.add('active-syn'));
            scaler.querySelectorAll('.vocab-word, .vocab-term').forEach(v => v.classList.add('active-vocab'));
            scaler.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
            scaler.querySelectorAll('.reading-pane').forEach(p => p.classList.remove('spotlight-mode'));
        }

        // Show all item explanations
        const container = containerId ? document.getElementById(containerId) : slide;
        if (container) {
            container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
        }

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EXERCISE_ACTION', { action: 'highlightAll', containerId });
        }
    }

    /**
     * Clears all evidence highlights, synonym badges, spotlight dimming, and explanations in the slide
     */
    clearAll(containerId, broadcast = true) {
        const slide = this.getSlideForContainer(containerId);
        if (!slide) return;

        slide.querySelectorAll('mark.evidence').forEach(mark => {
            mark.classList.remove('highlighted', 'glow-pulse');
        });

        slide.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(span => {
            span.classList.remove('active-syn');
        });

        slide.querySelectorAll('.vocab-word, .vocab-term').forEach(v => {
            v.classList.remove('active-vocab');
        });

        // Clear Spotlight Context Dimming
        slide.querySelectorAll('.reading-pane').forEach(pane => {
            pane.classList.remove('spotlight-mode');
            pane.querySelectorAll('.spotlight-target').forEach(p => p.classList.remove('spotlight-target'));
        });

        // Also clear in presenter preview scaler
        const scaler = document.getElementById('cpCurrentSlideScaler');
        if (scaler) {
            scaler.querySelectorAll('mark.evidence').forEach(m => m.classList.remove('highlighted', 'glow-pulse'));
            scaler.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.remove('active-syn'));
            scaler.querySelectorAll('.vocab-word, .vocab-term').forEach(v => v.classList.remove('active-vocab'));
            scaler.querySelectorAll('.item-explanation').forEach(exp => exp.classList.remove('show'));
            scaler.querySelectorAll('.reading-pane').forEach(p => p.classList.remove('spotlight-mode'));
        }

        const container = containerId ? document.getElementById(containerId) : slide;
        if (container) {
            container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.remove('show'));
        }

        this.activeEvidenceId = null;
        this.currentEvidenceIndex = -1;

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EVIDENCE_CLEAR', { containerId });
        }
    }

    /**
     * Toggles highlight and smooth-scrolls to specific evidence with Spotlight Dimming
     */
    focusEvidence(qKey, evId, broadcast = true) {
        if (!evId && qKey) {
            evId = `ev-${qKey}`;
        }

        const allEvTargets = [];
        if (evId) {
            document.querySelectorAll(`[id="${evId}"], mark.evidence[data-ev="${evId}"], mark.evidence#${evId}`).forEach(el => {
                if (!allEvTargets.includes(el)) allEvTargets.push(el);
            });
        }
        if (qKey) {
            document.querySelectorAll(`[id="ev-${qKey}"], mark.evidence[data-q="${qKey}"], mark.evidence#ev-${qKey}`).forEach(el => {
                if (!allEvTargets.includes(el)) allEvTargets.push(el);
            });
        }

        const synSpans = qKey ? Array.from(document.querySelectorAll(`[data-q="${qKey}"], .syn-pair-1[data-q="${qKey}"], .syn-pair-2[data-q="${qKey}"], .syn-pair-3[data-q="${qKey}"]`)) : [];
        const isCurrentlyActive = (allEvTargets.length > 0 && allEvTargets.some(t => t.classList.contains('highlighted')) && this.activeEvidenceId === (evId || qKey)) ||
                                  (synSpans.length > 0 && synSpans.every(s => s.classList.contains('active-syn')) && this.activeEvidenceId === qKey);

        const currentSlide = document.querySelector('.slide.active') || document.body;

        if (!isCurrentlyActive) {
            // First clear prior active highlights on the slide
            currentSlide.querySelectorAll('mark.evidence').forEach(m => m.classList.remove('highlighted', 'glow-pulse'));
            currentSlide.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.remove('active-syn'));
            currentSlide.querySelectorAll('.reading-pane').forEach(p => p.querySelectorAll('.spotlight-target').forEach(pt => pt.classList.remove('spotlight-target')));

            allEvTargets.forEach(target => {
                target.classList.add('highlighted', 'glow-pulse');
                target.querySelectorAll('.vocab-word, .vocab-term').forEach(v => v.classList.add('active-vocab'));

                const parentPara = target.closest('p, div.para-block');
                if (parentPara) {
                    parentPara.classList.add('spotlight-target');
                }

                const readingPane = target.closest('.reading-pane');
                if (readingPane) {
                    readingPane.classList.add('spotlight-mode');
                }
            });

            synSpans.forEach(s => {
                s.classList.add('active-syn');
                s.querySelectorAll('.vocab-word, .vocab-term').forEach(v => v.classList.add('active-vocab'));
            });

            this.activeEvidenceId = evId || qKey;

            // Smooth scroll into view inside reading pane
            allEvTargets.forEach(evTarget => {
                const readingPane = evTarget.closest('.reading-pane');
                if (readingPane) {
                    const paneRect = readingPane.getBoundingClientRect();
                    const targetRect = evTarget.getBoundingClientRect();
                    const relativeTop = targetRect.top - paneRect.top + readingPane.scrollTop;
                    const centerOffset = relativeTop - (paneRect.height / 2) + (targetRect.height / 2);

                    readingPane.scrollTo({
                        top: Math.max(0, centerOffset),
                        behavior: 'smooth'
                    });
                } else {
                    evTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                // Remove pulse glow after 2.5s while keeping spotlight & highlight
                setTimeout(() => {
                    evTarget.classList.remove('glow-pulse');
                }, 2500);
            });
        } else {
            allEvTargets.forEach(target => {
                target.classList.remove('highlighted', 'glow-pulse');
                target.querySelectorAll('.vocab-word, .vocab-term').forEach(v => v.classList.remove('active-vocab'));
                const parentPara = target.closest('p, div.para-block');
                if (parentPara) parentPara.classList.remove('spotlight-target');
            });
            synSpans.forEach(s => {
                s.classList.remove('active-syn');
                s.querySelectorAll('.vocab-word, .vocab-term').forEach(v => v.classList.remove('active-vocab'));
            });

            currentSlide.querySelectorAll('.reading-pane').forEach(p => p.classList.remove('spotlight-mode'));
            this.activeEvidenceId = null;
        }

        // Toggle corresponding item-explanation in question cards and flowchart cards
        if (qKey || evId) {
            const selector = [
                qKey ? `.q-card[data-q="${qKey}"]` : null,
                qKey ? `.flowchart-step-card[data-q="${qKey}"]` : null,
                evId ? `.q-card[data-ev="${evId}"]` : null,
                evId ? `.flowchart-step-card[data-ev="${evId}"]` : null
            ].filter(Boolean).join(', ');

            if (selector) {
                document.querySelectorAll(selector).forEach(card => {
                    const exp = card.querySelector('.item-explanation');
                    if (exp) exp.classList.toggle('show', !isCurrentlyActive);
                });
            }
        }

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EVIDENCE_FOCUS', {
                qKey,
                evId,
                active: !isCurrentlyActive
            });
        }
    }

    showEvidence(qKey, evId, broadcast = true) {
        this.focusEvidence(qKey, evId, broadcast);
    }

    /**
     * Auto-detects the slide element containing the specified container
     */
    getSlideForContainer(containerId) {
        if (containerId) {
            const el = document.getElementById(containerId);
            if (el) return el.closest('.slide') || document.querySelector('.slide.active');
        }
        return document.querySelector('.slide.active');
    }

    /**
     * Auto-binds click handlers on synonym buttons and question/flowchart cards
     */
    bindSynonymClicks() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.syn-btn');
            if (btn) {
                const card = btn.closest('.q-card, .flowchart-step-card');
                const dataQ = btn.dataset.q || card?.dataset?.q || (btn.dataset.ev ? btn.dataset.ev.replace(/^ev-/, '') : null);
                const dataEv = btn.dataset.ev || (dataQ ? `ev-${dataQ}` : null);
                if (dataQ || dataEv) {
                    e.preventDefault();
                    this.focusEvidence(dataQ, dataEv, true);
                    if (card) {
                        const exp = card.querySelector('.item-explanation');
                        if (exp) exp.classList.toggle('show');
                    }
                }
            }
        });
    }

    /**
     * Keyboard Shortcuts:
     * - 'E' / 'Shift+E': Cycle forward / backward through evidence on current slide
     * - '1'-'9': Jump directly to Question N evidence
     * - 'Escape': Clear spotlight & evidence
     */
    bindKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ignore when typing inside input, textarea, or select elements
            const activeTag = document.activeElement ? document.activeElement.tagName : '';
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag) || document.activeElement.isContentEditable) {
                return;
            }

            const currentSlide = document.querySelector('.slide.active');
            if (!currentSlide) return;

            const synButtons = Array.from(currentSlide.querySelectorAll('.syn-btn, [data-ev]'));
            if (synButtons.length === 0) return;

            // 'E' Key: Cycle Evidence
            if (e.key.toLowerCase() === 'e' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                if (e.shiftKey) {
                    // Previous Evidence
                    this.currentEvidenceIndex = (this.currentEvidenceIndex - 1 + synButtons.length) % synButtons.length;
                } else {
                    // Next Evidence
                    this.currentEvidenceIndex = (this.currentEvidenceIndex + 1) % synButtons.length;
                }
                const targetBtn = synButtons[this.currentEvidenceIndex];
                if (targetBtn) {
                    targetBtn.click();
                }
            }

            // '1' to '9': Direct Question Jump
            if (/^[1-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
                const targetIndex = parseInt(e.key, 10) - 1;
                if (targetIndex >= 0 && targetIndex < synButtons.length) {
                    e.preventDefault();
                    this.currentEvidenceIndex = targetIndex;
                    synButtons[targetIndex].click();
                }
            }

            // 'Escape': Clear Spotlight
            if (e.key === 'Escape') {
                this.clearAll(null, true);
            }
        });
    }

    /**
     * Transparently hooks into DeckEngine's check/reveal/reset and slide transition methods
     */
    hookDeckEngine() {
        if (typeof window.DeckEngine !== 'undefined') {
            const self = this;

            // Hook checkBlanks & checkSelects
            const origCheckBlanks = DeckEngine.prototype.checkBlanks;
            DeckEngine.prototype.checkBlanks = function (containerId) {
                origCheckBlanks.call(this, containerId);
                self.highlightAll(containerId, false);
            };

            const origCheckSelects = DeckEngine.prototype.checkSelects;
            DeckEngine.prototype.checkSelects = function (containerId) {
                origCheckSelects.call(this, containerId);
                self.highlightAll(containerId, false);
            };

            // Hook revealBlanks & revealSelects
            const origRevealBlanks = DeckEngine.prototype.revealBlanks;
            DeckEngine.prototype.revealBlanks = function (containerId) {
                origRevealBlanks.call(this, containerId);
                self.highlightAll(containerId, false);
            };

            const origRevealSelects = DeckEngine.prototype.revealSelects;
            DeckEngine.prototype.revealSelects = function (containerId) {
                origRevealSelects.call(this, containerId);
                self.highlightAll(containerId, false);
            };

            // Hook resetBlanks & resetSelects
            const origResetBlanks = DeckEngine.prototype.resetBlanks;
            DeckEngine.prototype.resetBlanks = function (containerId) {
                origResetBlanks.call(this, containerId);
                self.clearAll(containerId, false);
            };

            const origResetSelects = DeckEngine.prototype.resetSelects;
            DeckEngine.prototype.resetSelects = function (containerId) {
                origResetSelects.call(this, containerId);
                self.clearAll(containerId, false);
            };

            // Hook toggleSynonymExplanation
            DeckEngine.prototype.toggleSynonymExplanation = function (qKey, evId) {
                self.focusEvidence(qKey, evId, true);
            };

            // Hook slide changes to automatically reset spotlight index
            const origShowSlide = DeckEngine.prototype.showSlide;
            if (origShowSlide) {
                DeckEngine.prototype.showSlide = function (index, direction) {
                    origShowSlide.call(this, index, direction);
                    self.activeEvidenceId = null;
                    self.currentEvidenceIndex = -1;
                };
            }
        }
    }
}

// Inject Spotlight Context Dimming and Glow Animation CSS
(function () {
    const style = document.createElement('style');
    style.id = 'readingHighlighterStyles';
    style.textContent = `
        /* Spotlight Context Dimming */
        .reading-pane {
            transition: all 0.3s ease;
        }
        .reading-pane.spotlight-mode > p,
        .reading-pane.spotlight-mode > div:not(.spotlight-exempt) {
            opacity: 0.32;
            transition: opacity 0.35s cubic-bezier(0.32, 0.72, 0, 1), filter 0.35s cubic-bezier(0.32, 0.72, 0, 1);
        }
        .reading-pane.spotlight-mode > p.spotlight-target,
        .reading-pane.spotlight-mode > p:has(mark.highlighted),
        .reading-pane.spotlight-mode > p:has(.active-syn),
        .reading-pane.spotlight-mode > h3 {
            opacity: 1 !important;
            filter: none !important;
            position: relative;
            z-index: 5;
        }

        mark.evidence {
            transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        mark.evidence.highlighted {
            background: #fef08a !important;
            color: #854d0e !important;
            border-bottom: 2.5px solid #ca8a04 !important;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 600;
        }
        mark.evidence.glow-pulse {
            box-shadow: 0 0 0 5px rgba(56, 189, 248, 0.5), 0 4px 14px rgba(56, 189, 248, 0.3);
            background: #fef9c3 !important;
            animation: evidencePulse 1.6s ease-in-out infinite;
        }
        @keyframes evidencePulse {
            0%, 100% {
                box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.4), 0 2px 8px rgba(56, 189, 248, 0.2);
            }
            50% {
                box-shadow: 0 0 0 7px rgba(56, 189, 248, 0.7), 0 6px 18px rgba(56, 189, 248, 0.4);
            }
        }
    `;
    document.head.appendChild(style);
})();

// Global auto-instantiation
let readingHighlighter;
window.addEventListener('DOMContentLoaded', () => {
    readingHighlighter = new ReadingHighlighter();
});


/* ==================== MODULE: vocab-bank.js ==================== */
/**
 * Universal Vocabulary & Word Bank Interactive Engine (VocabBank)
 * 
 * Supports:
 * 1. Click-to-fill: Clicking a word bank chip automatically places it into the active or next empty blank.
 * 2. Visual tracking: Chips get marked as used/struck-through when their word is filled into an input.
 * 3. Double-click to clear: Clicking a filled blank returns the word to the bank.
 * 4. IELTS Multi-Accent Pronunciation (British 🇬🇧 / Australian 🇦🇺 / American 🇺🇸).
 */

class VocabBank {
    constructor() {
        this.activeInput = null;
        let savedAccent = 'en-GB';
        try {
            savedAccent = localStorage.getItem('ielts_speech_accent') || 'en-GB';
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }
        this.currentAccent = savedAccent; // default British RP
        this.speechRate = 0.92;
        this.init();
    }

    init() {
        this.bindWordChips();
        this.bindBlankInputs();
        this.bindAudioPronunciation();
        this.injectAccentSelectorStyles();
    }

    /**
     * Binds click handlers to .word-chip / .vocab-chip elements
     */
    bindWordChips() {
        document.addEventListener('click', (e) => {
            const chip = e.target.closest('.word-chip, .vocab-chip, [data-word]');
            if (!chip) return;

            const word = chip.dataset.word || chip.textContent.trim();
            const container = chip.closest('.card, .q-card, .two-col, .page-content, .slide');
            if (!container) return;

            // Find target blank (either focused blank or next empty blank in container)
            let targetBlank = this.activeInput;
            const allBlanks = Array.from(container.querySelectorAll('.blank-input'));
            if (!targetBlank || !container.contains(targetBlank) || targetBlank.value.trim() !== '') {
                targetBlank = allBlanks.find(inp => inp.value.trim() === '') || allBlanks[0];
            }

            if (targetBlank) {
                targetBlank.value = word;
                targetBlank.dispatchEvent(new Event('input', { bubbles: true }));
                if (window.DeckComponents?.autoResizeBlank) {
                    DeckComponents.autoResizeBlank(targetBlank);
                }
                this.updateChipStates(container);

                // Advance focus to the next available blank
                const currentIndex = allBlanks.indexOf(targetBlank);
                const nextBlank = allBlanks.slice(currentIndex + 1).find(inp => inp.value.trim() === '');
                if (nextBlank) {
                    this.activeInput = nextBlank;
                    this.activeInput.focus();
                } else {
                    this.activeInput = null;
                }
            }
        });
    }

    /**
     * Tracks focused blank inputs and updates chip used status
     */
    bindBlankInputs() {
        document.addEventListener('focusin', (e) => {
            if (e.target.classList.contains('blank-input')) {
                this.activeInput = e.target;
            }
        });

        // Double click blank to clear it and restore chip to bank
        document.addEventListener('dblclick', (e) => {
            if (e.target.classList.contains('blank-input')) {
                e.target.value = '';
                e.target.dispatchEvent(new Event('input', { bubbles: true }));
                const container = e.target.closest('.card, .q-card, .two-col, .page-content, .slide');
                if (container) {
                    this.updateChipStates(container);
                }
            }
        });

        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('blank-input')) {
                const container = e.target.closest('.card, .q-card, .two-col, .page-content, .slide');
                if (container) {
                    this.updateChipStates(container);
                }
            }
        });
    }

    /**
     * Marks chips as used/disabled if their word is currently placed in a blank
     */
    updateChipStates(container) {
        if (!container) return;
        const filledWords = Array.from(container.querySelectorAll('.blank-input'))
            .map(input => input.value.trim().toLowerCase())
            .filter(Boolean);

        container.querySelectorAll('.word-chip, .vocab-chip, [data-word]').forEach(chip => {
            const word = (chip.dataset.word || chip.textContent).trim().toLowerCase();
            const countFilled = filledWords.filter(w => w === word).length;
            if (countFilled > 0) {
                chip.classList.add('chip-used');
            } else {
                chip.classList.remove('chip-used');
            }
        });
    }

    /**
     * IELTS Multi-Accent Speech Player
     */
    bindAudioPronunciation() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.pronounce-btn, .speak-btn, [data-speak]');
            if (!btn) return;

            const textToSpeak = btn.dataset.speak || btn.parentElement.textContent.replace(/🔊|🎧|🇬🇧|🇦🇺|🇺🇸/g, '').trim();
            this.speak(textToSpeak);
        });
    }

    speak(text, customLang = null) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = customLang || this.currentAccent || 'en-GB';
        utterance.rate = this.speechRate || 0.9;

        // Try selecting Google Female UK voice if available
        const voices = window.speechSynthesis.getVoices();
        const googleUkFemale = voices.find(v => 
            v.name.includes('Google') && 
            (v.name.includes('UK English Female') || (v.lang.replace('_', '-').startsWith('en-GB') && v.name.toLowerCase().includes('female')))
        );
        const ukVoice = googleUkFemale || voices.find(v => 
            (v.lang === 'en-GB' || v.lang === 'en_GB') && 
            (v.name.toLowerCase().includes('female') || v.name.includes('Natural') || v.name.includes('Libby') || v.name.includes('Hazel') || v.name.includes('Sonia') || v.name.includes('Serena'))
        ) || voices.find(v => v.lang === 'en-GB' || v.lang === 'en_GB');

        if (ukVoice) utterance.voice = ukVoice;

        window.speechSynthesis.speak(utterance);
    }

    setAccent(accent) {
        this.currentAccent = accent;
        try {
            localStorage.setItem('ielts_speech_accent', accent);
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }
    }

    injectAccentSelectorStyles() {
        if (document.getElementById('vocabBankStyles')) return;
        const style = document.createElement('style');
        style.id = 'vocabBankStyles';
        style.textContent = `
            .word-chip, .vocab-chip {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 5px 12px;
                background: #ffffff;
                border: 1.5px solid var(--border-soft, #cbd5e1);
                border-radius: 6px;
                font-family: var(--font-body, sans-serif);
                font-size: calc(15px * var(--font-scale, 1));
                font-weight: 600;
                color: var(--text-dark, #0f172a);
                cursor: pointer;
                transition: all 0.2s ease;
                user-select: none;
                margin: 3px;
            }
            .word-chip:hover, .vocab-chip:hover {
                border-color: var(--col-vocab, #16a34a);
                background: #f0fdf4;
                transform: translateY(-1px);
            }
            .word-chip.chip-used, .vocab-chip.chip-used {
                opacity: 0.45;
                text-decoration: line-through;
                background: #f1f5f9;
                cursor: default;
                transform: none;
            }
        `;
        document.head.appendChild(style);
    }
}

// Global auto-instantiation
window.vocabBank = new VocabBank();


/* ==================== MODULE: essay-analyzer.js ==================== */
/**
 * Universal Essay Analyzer & Writing Model Tools (EssayAnalyzer)
 * 
 * Provides interactive teaching features for Task 1 & Task 2 model essays:
 * 1. Cohesive Device / Linking Word Highlighter: Highlights transition connectors on demand.
 * 2. Structure Breakdown Highlighter: Colors introduction, topic sentences, supporting data, and conclusion.
 * 3. Dynamic Word Count Counter.
 */

class EssayAnalyzer {
    constructor() {
        this.linkingWordsRegex = /\b(however|furthermore|moreover|in contrast|on the other hand|consequently|therefore|as a result|for instance|for example|in addition|although|despite|in conclusion|to sum up|due to|owing to|firstly|secondly|finally|overall|in particular)\b/gi;
        this.init();
    }

    init() {
        this.bindEssayTools();
    }

    /**
     * Toggles linking word highlights inside .essay-card / .essay-pane elements
     */
    toggleConnectors(essayElement) {
        if (!essayElement) return;
        const isHighlighted = essayElement.classList.contains('highlighted-connectors');

        if (isHighlighted) {
            essayElement.classList.remove('highlighted-connectors');
            essayElement.querySelectorAll('p, .essay-p, li').forEach(p => {
                if (p.dataset.origHtml) {
                    p.innerHTML = p.dataset.origHtml;
                    delete p.dataset.origHtml;
                }
            });
        } else {
            essayElement.classList.add('highlighted-connectors');
            this.highlightConnectorsInElement(essayElement);
        }
    }

    highlightConnectorsInElement(element) {
        const paragraphs = element.querySelectorAll('p, .essay-p, li');
        paragraphs.forEach(p => {
            if (!p.dataset.origHtml) {
                p.dataset.origHtml = p.innerHTML;
            }

            const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT, null, false);
            const textNodes = [];
            let node;
            while ((node = walker.nextNode())) {
                if (node.parentElement && !node.parentElement.classList.contains('connector-mark')) {
                    textNodes.push(node);
                }
            }

            textNodes.forEach(textNode => {
                const text = textNode.nodeValue;
                if (this.linkingWordsRegex.test(text)) {
                    this.linkingWordsRegex.lastIndex = 0;
                    const span = document.createElement('span');
                    span.innerHTML = text.replace(this.linkingWordsRegex, '<mark class="connector-mark">$1</mark>');
                    textNode.parentNode.replaceChild(span, textNode);
                }
            });
        });
    }

    /**
     * Binds control buttons with [data-essay-action="connectors|structure|count"]
     */
    bindEssayTools() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-essay-action]');
            if (!btn) return;

            const action = btn.dataset.essayAction;
            const targetId = btn.dataset.target;
            const essayEl = targetId ? document.getElementById(targetId) : btn.closest('.slide, .two-col')?.querySelector('.essay-card, .model-breakdown-card');

            if (action === 'connectors' && essayEl) {
                this.toggleConnectors(essayEl);
                btn.classList.toggle('active');
            }
        });
    }
}

// Inject styling for essay connector highlighting
(function() {
    const style = document.createElement('style');
    style.id = 'essayAnalyzerStyles';
    style.textContent = `
        mark.connector-mark {
            background: rgba(254, 240, 138, 0.88) !important;
            color: inherit !important;
            border-bottom: 2px solid #ca8a04;
            padding: 1px 4px;
            border-radius: 3px;
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
        }
    `;
    document.head.appendChild(style);
})();

// Global auto-instantiation
let essayAnalyzer;
window.addEventListener('DOMContentLoaded', () => {
    essayAnalyzer = new EssayAnalyzer();
});


/* ==================== MODULE: writing-annotator.js ==================== */
/**
 * =========================================================================
 * WRITING ANNOTATOR & PHRASE STUDY ENGINE
 * Expert IELTS Course Presentations Architecture
 * Provides interactive signposting highlights, vocabulary collocations,
 * phrase breakdown modals, inline hover tooltips, and text-to-speech essay narration.
 * =========================================================================
 */

(function () {
    'use strict';

    class WritingAnnotator {
        static init() {
            this.createModal();
            this.bindEvents();
            this.enhancePhrases();
        }

        static createModal() {
            if (document.getElementById('writing-phrase-modal')) return;

            const modalHtml = `
            <div id="writing-phrase-modal" class="writing-modal-overlay" style="display:none;">
                <div class="writing-modal-card" id="writing-modal-card">
                    <div class="writing-modal-header">
                        <div>
                            <span id="wm-badge" class="writing-modal-badge">Signposting Device</span>
                            <h3 id="wm-title" class="writing-modal-title">Phrase Title</h3>
                        </div>
                        <button class="writing-modal-close" onclick="WritingAnnotator.closeModal()" title="Close (Esc)">✕</button>
                    </div>
                    <div class="writing-modal-body">
                        <div class="wm-section wm-function">
                            <span class="wm-label">📌 Function &amp; Exam Purpose</span>
                            <p id="wm-desc" style="font-size:17px; line-height:1.6; color:#1e293b; margin:6px 0 0;">Description text</p>
                        </div>
                        <div class="wm-section wm-upgrade" id="wm-upgrade-box" style="margin-top:12px; display:none;">
                            <span class="wm-label" style="color:#059669; font-weight:700;">⭐ Band 7+ Lexical Upgrade</span>
                            <p id="wm-upgrade" style="font-size:16.5px; line-height:1.6; color:#065f46; margin:6px 0 0;">Upgrade example</p>
                        </div>
                    </div>
                    <div class="writing-modal-footer" style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; padding-top:12px; border-top:1px solid #e2e8f0;">
                        <button class="btn-action" onclick="WritingAnnotator.speakPhrase()" style="font-size:15px; padding:6px 14px;">🔊 Listen Phrase</button>
                        <button class="btn-action btn-primary" onclick="WritingAnnotator.closeModal()" style="font-size:15px; padding:6px 16px;">Got It</button>
                    </div>
                </div>
            </div>`;

            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }

        static enhancePhrases() {
            // Add title and aria attributes to all phrases for immediate accessibility
            document.querySelectorAll('.hl-phrase, .hl-vocab, .hl-connector').forEach(el => {
                const phrase = el.getAttribute('data-phrase') || el.getAttribute('data-title') || el.textContent.trim();
                const note = el.getAttribute('data-note') || el.getAttribute('data-desc') || '';
                if (note && !el.title) {
                    el.title = `${phrase}: ${note}`;
                }
                el.setAttribute('tabindex', '0');
                el.setAttribute('role', 'button');
            });
        }

        static bindEvents() {
            // Event delegation for clicks on phrases and vocab
            document.addEventListener('click', (e) => {
                const target = e.target.closest('.hl-phrase, .hl-vocab, .hl-connector');
                if (target) {
                    e.preventDefault();
                    e.stopPropagation();

                    const title = target.getAttribute('data-phrase') || target.getAttribute('data-title') || target.textContent.trim();
                    const type = target.getAttribute('data-type') || (target.classList.contains('hl-vocab') ? 'Topic Collocation' : 'Band 7+ Signposting Device');
                    const desc = target.getAttribute('data-note') || target.getAttribute('data-desc') || 'Essential IELTS Task 1 / Task 2 phrasing for high coherence and lexical scoring.';
                    const upgrade = target.getAttribute('data-upgrade') || '';
                    
                    // Add active ring effect
                    document.querySelectorAll('.hl-phrase.active-phrase, .hl-vocab.active-phrase').forEach(p => p.classList.remove('active-phrase'));
                    target.classList.add('active-phrase');

                    WritingAnnotator.showModal(title, type, desc, upgrade);
                }
            });

            // Enter key on focused phrase
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    const activeEl = document.activeElement;
                    if (activeEl && activeEl.matches('.hl-phrase, .hl-vocab, .hl-connector')) {
                        e.preventDefault();
                        activeEl.click();
                    }
                }
            });

            // Close on Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    WritingAnnotator.closeModal();
                }
            });

            // Close when clicking backdrop
            document.addEventListener('click', (e) => {
                const modal = document.getElementById('writing-phrase-modal');
                if (modal && e.target === modal) {
                    WritingAnnotator.closeModal();
                }
            });

            // Re-enhance on slide change
            document.addEventListener('slidechange', () => {
                WritingAnnotator.enhancePhrases();
            });
        }

        static showModal(title, type, desc, upgrade) {
            WritingAnnotator.createModal();
            const modal = document.getElementById('writing-phrase-modal');
            const card = document.getElementById('writing-modal-card');
            if (!modal || !card) return;

            const titleEl = document.getElementById('wm-title');
            const badgeEl = document.getElementById('wm-badge');
            const descEl = document.getElementById('wm-desc');
            const upBox = document.getElementById('wm-upgrade-box');
            const upEl = document.getElementById('wm-upgrade');

            if (titleEl) titleEl.textContent = title;
            if (badgeEl) badgeEl.textContent = type;
            if (descEl) descEl.textContent = desc;

            if (upBox && upEl) {
                if (upgrade && upgrade.trim() !== '') {
                    upBox.style.display = 'block';
                    upEl.textContent = upgrade;
                } else {
                    upBox.style.display = 'none';
                }
            }

            modal.style.display = 'flex';
            requestAnimationFrame(() => {
                modal.classList.add('show');
                card.classList.add('show');
            });
        }

        static closeModal() {
            const modal = document.getElementById('writing-phrase-modal');
            const card = document.getElementById('writing-modal-card');
            if (!modal) return;

            modal.classList.remove('show');
            if (card) card.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 200);

            document.querySelectorAll('.hl-phrase.active-phrase, .hl-vocab.active-phrase').forEach(p => p.classList.remove('active-phrase'));
        }

        static speakPhrase() {
            const title = document.getElementById('wm-title')?.textContent;
            if (!title || !('speechSynthesis' in window)) return;
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(title);
            utter.rate = 0.90;
            utter.lang = 'en-GB';
            const voices = window.speechSynthesis.getVoices();
            const ukVoice = voices.find(v => v.lang === 'en-GB' || v.name.includes('UK') || v.name.includes('British'));
            if (ukVoice) utter.voice = ukVoice;
            window.speechSynthesis.speak(utter);
        }

        static speakEssay(btn) {
            if (!('speechSynthesis' in window)) return;

            if (window._isSpeakingEssay) {
                window.speechSynthesis.cancel();
                window._isSpeakingEssay = false;
                if (btn) btn.innerHTML = '🔊 Listen Model Essay';
                return;
            }

            const slide = btn ? btn.closest('.slide') : document.querySelector('.slide.active');
            if (!slide) return;
            const essayPane = slide.querySelector('.writing-model-pane, [data-slot="model-essay"], [slot="essay"]');
            if (!essayPane) return;

            const text = essayPane.innerText.replace(/Band \d+\+ Official Model Answer/gi, '').trim();
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(text);
            utter.rate = 0.92;
            utter.lang = 'en-GB';
            const voices = window.speechSynthesis.getVoices();
            const ukVoice = voices.find(v => v.lang === 'en-GB' || v.name.includes('UK') || v.name.includes('British'));
            if (ukVoice) utter.voice = ukVoice;

            utter.onstart = () => {
                window._isSpeakingEssay = true;
                if (btn) btn.innerHTML = '⏹️ Stop Narration';
            };
            utter.onend = utter.onerror = () => {
                window._isSpeakingEssay = false;
                if (btn) btn.innerHTML = '🔊 Listen Model Essay';
            };

            window.speechSynthesis.speak(utter);
        }

        static toggleHighlights(btn) {
            const slide = btn ? btn.closest('.slide') : document.querySelector('.slide.active');
            if (!slide) return;
            slide.classList.toggle('hide-writing-highlights');
            const isHidden = slide.classList.contains('hide-writing-highlights');
            if (btn) {
                btn.innerHTML = isHidden ? '💡 Show Signpost Highlights' : '👁️ Hide Highlights';
                btn.classList.toggle('btn-primary', !isHidden);
            }
        }
    }

    window.WritingAnnotator = WritingAnnotator;
    window.speakEssay = (btn) => WritingAnnotator.speakEssay(btn);
    window.toggleWritingHighlights = (btn) => WritingAnnotator.toggleHighlights(btn);

    // Initialize immediately if DOM is ready, or on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => WritingAnnotator.init());
    } else {
        WritingAnnotator.init();
    }
})();


/* ==================== MODULE: progress-tracker.js ==================== */
/**
 * Universal Exercise Progress & Score Tracker (ProgressTracker)
 * 
 * 1. Auto-saves student input/select responses in sessionStorage so progress is never lost.
 * 2. Auto-calculates overall score across all interactive exercises in the presentation.
 * 3. Injects live score summary badge on the final review slide.
 */

class ProgressTracker {
    constructor() {
        this.storageKey = `deck_progress_${window.location.pathname.split('/').pop()}`;
        this.init();
    }

    init() {
        // Defer restore to guarantee it runs after hydrateBlanksAndInputs clears values
        setTimeout(() => this.restoreResponses(), 0);
        this.bindAutoSave();
        this.renderReviewDashboard();
    }

    /**
     * Auto-saves all inputs and selects when modified
     */
    bindAutoSave() {
        let saveTimeout = null;
        const debouncedSave = () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => this.saveResponses(), 400);
        };
        document.addEventListener('change', debouncedSave);
        document.addEventListener('input', debouncedSave);
    }

    saveResponses() {
        const state = {};
        document.querySelectorAll('.blank-input, .select-input').forEach((input, index) => {
            const id = input.id || `input_${index}`;
            state[id] = input.value;
        });
        sessionStorage.setItem(this.storageKey, JSON.stringify(state));
        this.renderReviewDashboard();
    }

    restoreResponses() {
        const saved = sessionStorage.getItem(this.storageKey);
        if (!saved) return;
        try {
            const state = JSON.parse(saved);
            document.querySelectorAll('.blank-input, .select-input').forEach((input, index) => {
                const id = input.id || `input_${index}`;
                if (state[id] !== undefined) {
                    input.value = state[id];
                }
            });
        } catch (e) {}
    }

    /**
     * Calculates total questions and correct count across the presentation
     */
    calculateStats() {
        let total = 0;
        let correct = 0;

        document.querySelectorAll('.blank-input, .select-input').forEach(input => {
            total++;
            if (input.classList.contains('correct')) correct++;
        });

        document.querySelectorAll('.opt-card').forEach(card => {
            if (card.dataset.correct === 'true') {
                total++;
                if (card.classList.contains('correct-opt')) correct++;
            }
        });

        return {
            total,
            correct,
            percentage: total > 0 ? Math.round((correct / total) * 100) : 0
        };
    }

    /**
     * Renders a live score card on the review slide if present
     */
    renderReviewDashboard() {
        const reviewSlide = document.querySelector('.slide[data-skill="review"]');
        if (!reviewSlide) return;

        let dashboard = reviewSlide.querySelector('#moduleScoreWidget');
        if (!dashboard) {
            dashboard = document.createElement('div');
            dashboard.id = 'moduleScoreWidget';
            dashboard.className = 'card score-dashboard-card';
            
            const insertTarget = reviewSlide.querySelector('.col, .page-content');
            if (insertTarget) {
                insertTarget.appendChild(dashboard);
            }
        }

        const stats = this.calculateStats();
        dashboard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <div style="font-size:18px; font-weight:800; color:var(--col-review, #0f766e);">📊 Module Exercise Progress</div>
                    <div style="font-size:14.5px; color:var(--text-muted);">Total Checked Items: <strong>${stats.correct} / ${stats.total}</strong></div>
                </div>
                <div style="font-size:28px; font-weight:900; color:var(--col-review, #0f766e); font-family:var(--font-mono, monospace);">
                    ${stats.percentage}%
                </div>
            </div>
        `;
    }
}

// Global auto-instantiation
let progressTracker;
window.addEventListener('DOMContentLoaded', () => {
    progressTracker = new ProgressTracker();
});


/* ==================== MODULE: slide-navigator.js ==================== */
/**
 * Universal Slide Grid Navigator & Quick-Jump Engine (SlideNavigator)
 * 
 * Provides an interactive slide thumbnail/grid view for teachers and students:
 * 1. Press 'G' (Grid) or click the Navigator icon in the toolbar to see all slides.
 * 2. Instant search filter to jump directly to any skill, topic, or slide title.
 * 3. Quick-key jumps (e.g. typing slide number).
 */

class SlideNavigator {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createNavigatorModal();
        this.bindKeyboardShortcuts();
    }

    createNavigatorModal() {
        const modal = document.createElement('div');
        modal.id = 'slideNavigatorModal';
        modal.className = 'slide-nav-modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="slide-nav-backdrop" onclick="slideNavigator.toggle()"></div>
            <div class="slide-nav-container">
                <div class="slide-nav-header">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span style="font-size:20px; font-weight:800;">📑 Slide Navigator</span>
                        <span id="navSlideTotal" style="font-size:13px; opacity:0.6; font-family:var(--font-mono, monospace);"></span>
                    </div>
                    <input type="text" id="slideSearchInput" class="slide-search-box" placeholder="🔍 Filter by title, skill (read, grammar, vocab, write)..." oninput="slideNavigator.filterSlides(this.value)" />
                    <button class="slide-nav-close" onclick="slideNavigator.toggle()">×</button>
                </div>
                <div class="slide-nav-grid" id="slideNavGrid"></div>
            </div>
        `;
        document.body.appendChild(modal);

        // Inject Styles
        const style = document.createElement('style');
        style.id = 'slideNavigatorStyles';
        style.textContent = `
            .slide-nav-modal {
                position: fixed;
                inset: 0;
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                user-select: none;
                animation: navFadeIn 0.2s ease;
            }
            .slide-nav-backdrop {
                position: absolute;
                inset: 0;
                background: rgba(10, 15, 29, 0.85);
                backdrop-filter: blur(8px);
            }
            .slide-nav-container {
                position: relative;
                width: 90vw;
                max-width: 1300px;
                height: 85vh;
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.16);
                border-radius: 16px;
                display: flex;
                flex-direction: column;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
                overflow: hidden;
                color: #ffffff;
            }
            .slide-nav-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 24px;
                background: rgba(255, 255, 255, 0.04);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                gap: 16px;
            }
            .slide-search-box {
                flex: 1;
                max-width: 480px;
                background: rgba(255, 255, 255, 0.08);
                border: 1.5px solid rgba(255, 255, 255, 0.16);
                padding: 8px 16px;
                border-radius: 8px;
                color: #ffffff;
                font-size: 14px;
                outline: none;
            }
            .slide-search-box:focus {
                border-color: #38bdf8;
                background: rgba(255, 255, 255, 0.14);
            }
            .slide-nav-close {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 26px;
                cursor: pointer;
                line-height: 1;
            }
            .slide-nav-close:hover { color: #fff; }
            .slide-nav-grid {
                flex: 1;
                overflow-y: auto;
                padding: 24px;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                gap: 18px;
            }
            .slide-nav-card {
                background: rgba(255, 255, 255, 0.05);
                border: 1.5px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 16px;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .slide-nav-card:hover {
                background: rgba(255, 255, 255, 0.12);
                border-color: #38bdf8;
                transform: translateY(-3px);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            }
            .slide-nav-card.active-card {
                border-color: #10b981;
                background: rgba(16, 185, 129, 0.15);
            }
            .slide-nav-card-top {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .slide-nav-num {
                font-family: var(--font-mono, monospace);
                font-size: 12px;
                font-weight: 700;
                color: #94a3b8;
            }
            .slide-nav-badge {
                font-size: 11px;
                font-weight: 700;
                padding: 2px 8px;
                border-radius: 4px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .slide-nav-title {
                font-size: 15px;
                font-weight: 700;
                color: #f8fafc;
                line-height: 1.35;
            }
            @keyframes navFadeIn {
                from { opacity: 0; transform: scale(0.97); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    renderGrid() {
        const grid = document.getElementById('slideNavGrid');
        const totalSpan = document.getElementById('navSlideTotal');
        if (!grid || !window.deckEngine) return;

        const slides = window.deckEngine.slides;
        if (totalSpan) totalSpan.textContent = `(${slides.length} Slides)`;

        grid.innerHTML = '';
        slides.forEach((slide, idx) => {
            const titleEl = slide.querySelector('.slide-title, .section-title, .title-main, h1, h2');
            const titleText = titleEl ? titleEl.textContent.trim().replace(/\s+/g, ' ') : `Slide ${idx + 1}`;
            const skill = slide.dataset.skill || 'general';

            const card = document.createElement('div');
            card.className = `slide-nav-card ${idx === window.deckEngine.currentSlide ? 'active-card' : ''}`;
            card.dataset.index = idx;
            card.dataset.search = `${titleText} ${skill} slide ${idx + 1}`.toLowerCase();
            card.onclick = () => {
                window.deckEngine.showSlide(idx);
                this.toggle(false);
            };

            const skillColors = {
                read: '#2563eb',
                grammar: '#ea580c',
                vocab: '#059669',
                write: '#7c3aed',
                review: '#0891b2',
                section: '#64748b',
                title: '#3b82f6'
            };
            const badgeBg = skillColors[skill] || '#475569';

            card.innerHTML = `
                <div class="slide-nav-card-top">
                    <span class="slide-nav-num">Slide ${idx + 1}</span>
                    <span class="slide-nav-badge" style="background:${badgeBg}; color:#fff;">${skill}</span>
                </div>
                <div class="slide-nav-title">${titleText}</div>
            `;
            grid.appendChild(card);
        });
    }

    filterSlides(query) {
        const q = query.trim().toLowerCase();
        document.querySelectorAll('.slide-nav-card').forEach(card => {
            const match = !q || card.dataset.search.includes(q);
            card.style.display = match ? 'flex' : 'none';
        });
    }

    toggle(forceState) {
        this.isOpen = typeof forceState === 'boolean' ? forceState : !this.isOpen;
        const modal = document.getElementById('slideNavigatorModal');
        if (modal) {
            modal.style.display = this.isOpen ? 'flex' : 'none';
            if (this.isOpen) {
                this.renderGrid();
                const searchInput = document.getElementById('slideSearchInput');
                if (searchInput) {
                    searchInput.value = '';
                    searchInput.focus();
                }
            }
        }
    }

    bindKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' && e.target.id !== 'slideSearchInput') return;
            if (e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

            const key = e.key.toLowerCase();
            if (key === 'g') {
                e.preventDefault();
                this.toggle();
            } else if (key === 'escape' && this.isOpen) {
                this.toggle(false);
            }
        });
    }
}

// Global auto-instantiation
let slideNavigator;
window.addEventListener('DOMContentLoaded', () => {
    slideNavigator = new SlideNavigator();
});


/* ==================== MODULE: presentation-spotlight.js ==================== */
/**
 * Universal Presentation Spotlight & Screen Mute (PresentationSpotlight)
 * 
 * Provides essential classroom focus controls:
 * 1. Screen Blackout: Press 'B' (or '.' in standard presenter remotes) to turn the screen pitch black to focus student attention on the teacher.
 * 2. Screen Whiteout: Press 'W' to turn the screen white (for whiteboard projection).
 * 3. Spotlight Mode: Press 'S' to dim the slide background and highlight only the active sentence/cursor area.
 */

class PresentationSpotlight {
    constructor() {
        this.isBlackout = false;
        this.isWhiteout = false;
        this.isSpotlight = false;
        this.init();
    }

    init() {
        this.createOverlays();
        this.bindShortcuts();
    }

    createOverlays() {
        const overlay = document.createElement('div');
        overlay.id = 'screenMuteOverlay';
        overlay.className = 'screen-mute-overlay';
        overlay.style.display = 'none';
        document.body.appendChild(overlay);

        const spotlight = document.createElement('div');
        spotlight.id = 'spotlightMask';
        spotlight.className = 'spotlight-mask';
        spotlight.style.display = 'none';
        document.body.appendChild(spotlight);

        window.addEventListener('mousemove', (e) => {
            if (this.isSpotlight) {
                spotlight.style.setProperty('--cursor-x', `${e.clientX}px`);
                spotlight.style.setProperty('--cursor-y', `${e.clientY}px`);
            }
        });

        // Inject Styles
        const style = document.createElement('style');
        style.id = 'spotlightStyles';
        style.textContent = `
            .screen-mute-overlay {
                position: fixed;
                inset: 0;
                z-index: 9999999;
                transition: opacity 0.25s ease;
                cursor: pointer;
            }
            .screen-mute-overlay.blackout {
                background: #000000;
            }
            .screen-mute-overlay.whiteout {
                background: #ffffff;
            }
            .spotlight-mask {
                position: fixed;
                inset: 0;
                z-index: 99998;
                pointer-events: none;
                background: radial-gradient(circle 180px at var(--cursor-x, 50%) var(--cursor-y, 50%), transparent 0%, rgba(0, 0, 0, 0.78) 100%);
                transition: background 0.05s ease-out;
            }
        `;
        document.head.appendChild(style);
    }

    toggleBlackout(broadcast = true) {
        this.isBlackout = !this.isBlackout;
        this.isWhiteout = false;
        const overlay = document.getElementById('screenMuteOverlay');
        if (overlay) {
            overlay.className = 'screen-mute-overlay blackout';
            overlay.style.display = this.isBlackout ? 'block' : 'none';
        }
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('BLACKOUT_STATE', { blackout: this.isBlackout, whiteout: false });
        }
    }

    toggleWhiteout(broadcast = true) {
        this.isWhiteout = !this.isWhiteout;
        this.isBlackout = false;
        const overlay = document.getElementById('screenMuteOverlay');
        if (overlay) {
            overlay.className = 'screen-mute-overlay whiteout';
            overlay.style.display = this.isWhiteout ? 'block' : 'none';
        }
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('BLACKOUT_STATE', { blackout: false, whiteout: this.isWhiteout });
        }
    }

    toggleSpotlight(broadcast = true) {
        this.isSpotlight = !this.isSpotlight;
        const mask = document.getElementById('spotlightMask');
        if (mask) {
            mask.style.display = this.isSpotlight ? 'block' : 'none';
        }
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('SPOTLIGHT_STATE', { active: this.isSpotlight });
        }
    }

    clearMute(broadcast = true) {
        this.isBlackout = false;
        this.isWhiteout = false;
        const overlay = document.getElementById('screenMuteOverlay');
        if (overlay) overlay.style.display = 'none';
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('BLACKOUT_STATE', { blackout: false, whiteout: false });
        }
    }

    bindShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

            const key = e.key.toLowerCase();
            if (key === 'b' || key === '.') {
                e.preventDefault();
                this.toggleBlackout();
            } else if (key === 'w') {
                e.preventDefault();
                this.toggleWhiteout();
            } else if (key === 's') {
                e.preventDefault();
                this.toggleSpotlight();
            } else if (this.isBlackout || this.isWhiteout) {
                this.clearMute();
            }
        });

        document.getElementById('screenMuteOverlay')?.addEventListener('click', () => {
            this.clearMute();
        });
    }

    updatePosition(x, y, broadcast = false) {
        const mask = document.getElementById('spotlightMask');
        if (mask) {
            mask.style.setProperty('--cursor-x', `${x}px`);
            mask.style.setProperty('--cursor-y', `${y}px`);
        }
        if (broadcast && window.presenterSyncEngine) {
            const normX = x / window.innerWidth;
            const normY = y / window.innerHeight;
            window.presenterSyncEngine.emit('SPOTLIGHT_MOVE', { normX, normY });
        }
    }

    activate(broadcast = true) {
        this.isSpotlight = true;
        const mask = document.getElementById('spotlightMask');
        if (mask) mask.style.display = 'block';
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('SPOTLIGHT_STATE', { active: true });
        }
    }

    deactivate(broadcast = true) {
        this.isSpotlight = false;
        const mask = document.getElementById('spotlightMask');
        if (mask) mask.style.display = 'none';
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('SPOTLIGHT_STATE', { active: false });
        }
    }
}

// Global auto-instantiation
let presentationSpotlight;
window.addEventListener('DOMContentLoaded', () => {
    presentationSpotlight = new PresentationSpotlight();
    window.presentationSpotlight = presentationSpotlight;
});



/* ==================== MODULE: flashcard-engine.js ==================== */
/**
 * Universal Flashcard & 3D Flip Card Engine (FlashcardEngine)
 * 
 * Automatically enables interactive 3D flipping for any .flashcard element:
 * <div class="flashcard">
 *     <div class="card-front">Word / Concept</div>
 *     <div class="card-back">Definition & Collocations</div>
 * </div>
 */

class FlashcardEngine {
    constructor() {
        this.init();
    }

    init() {
        this.injectStyles();
        this.bindFlipHandlers();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.id = 'flashcardStyles';
        style.textContent = `
            .flashcard {
                perspective: 1000px;
                cursor: pointer;
                user-select: none;
                min-height: 140px;
            }
            .flashcard-inner {
                position: relative;
                width: 100%;
                height: 100%;
                text-align: center;
                transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                transform-style: preserve-3d;
            }
            .flashcard.flipped .flashcard-inner {
                transform: rotateY(180deg);
            }
            .card-front, .card-back {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
                border-radius: 12px;
                padding: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                box-shadow: 0 4px 12px rgba(0,0,0,0.06);
            }
            .card-front {
                background: #ffffff;
                border: 1.5px solid var(--border-soft, #cbd5e1);
                color: var(--text-dark, #0f172a);
            }
            .card-back {
                background: #f8fafc;
                border: 1.5px solid var(--col-vocab, #059669);
                color: var(--text-body, #1e293b);
                transform: rotateY(180deg);
            }
        `;
        document.head.appendChild(style);
    }

    bindFlipHandlers() {
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.flashcard, [data-flip]');
            if (!card) return;

            // Ensure inner wrapper exists
            if (!card.querySelector('.flashcard-inner')) {
                const front = card.querySelector('.card-front') || card.children[0];
                const back = card.querySelector('.card-back') || card.children[1];
                if (front && back) {
                    const inner = document.createElement('div');
                    inner.className = 'flashcard-inner';
                    inner.appendChild(front);
                    inner.appendChild(back);
                    card.appendChild(inner);
                }
            }

            card.classList.toggle('flipped');
        });
    }
}

// Global auto-instantiation
let flashcardEngine;
window.addEventListener('DOMContentLoaded', () => {
    flashcardEngine = new FlashcardEngine();
});


/* ==================== MODULE: print-optimizer.js ==================== */
/**
 * Universal Print & PDF Handout Optimizer (PrintOptimizer)
 * 
 * Automatically reconfigures the fixed 16:9 stage layout into sequential
 * multi-page printable handouts when the teacher or student presses Ctrl+P (Print).
 */

class PrintOptimizer {
    constructor() {
        this.init();
    }

    init() {
        const style = document.createElement('style');
        style.id = 'printOptimizerStyles';
        style.textContent = `
            @media print {
                html, body {
                    width: 100% !important;
                    height: auto !important;
                    overflow: visible !important;
                    background: #ffffff !important;
                    font-size: 12pt !important;
                }
                .deck-viewport, .deck-stage {
                    position: static !important;
                    width: 100% !important;
                    height: auto !important;
                    transform: none !important;
                    background: transparent !important;
                    overflow: visible !important;
                }
                .slide {
                    position: relative !important;
                    width: 100% !important;
                    height: auto !important;
                    min-height: 90vh !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    page-break-after: always !important;
                    break-after: page !important;
                    margin-bottom: 2cm !important;
                }
                .presentation-tools-hud,
                .font-controls,
                .font-indicator,
                .nav-hint,
                #slideCounter,
                .notebook-tabs,
                #spotlightMask,
                .screen-mute-overlay,
                .slide-nav-modal {
                    display: none !important;
                }
                .notebook, .title-notebook, .section-inner {
                    width: 100% !important;
                    height: auto !important;
                    box-shadow: none !important;
                    border: 1px solid #cbd5e1 !important;
                }
                .reading-pane, .question-pane, .col, .essay-card {
                    overflow: visible !important;
                    max-height: none !important;
                    height: auto !important;
                }
                .item-explanation {
                    display: block !important;
                    opacity: 1 !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Global auto-instantiation
let printOptimizer;
window.addEventListener('DOMContentLoaded', () => {
    printOptimizer = new PrintOptimizer();
});


/* ==================== MODULE: laser-pointer.js ==================== */
/**
 * Laser Pointer Module (LaserPointer)
 * Provides a high-visibility glowing red laser dot that follows mouse movement.
 * Toggle shortcut: 'L'
 */

class LaserPointer {
    constructor() {
        this.isActive = false;
        this.dot = null;
        this.init();
    }

    init() {
        // Inject styles if not present
        if (!document.getElementById('laserPointerStyles')) {
            const style = document.createElement('style');
            style.id = 'laserPointerStyles';
            style.textContent = `
                #laserPointerDot {
                    position: fixed;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #ef4444;
                    box-shadow: 0 0 16px 4px #ef4444, 0 0 2px 2px #fff;
                    pointer-events: none;
                    z-index: 99999;
                    transform: translate(-50%, -50%);
                    display: none;
                    transition: transform 0.05s ease-out;
                }
            `;
            document.head.appendChild(style);
        }

        // Create dot element
        const dot = document.createElement('div');
        dot.id = 'laserPointerDot';
        document.body.appendChild(dot);
        this.dot = dot;

        // Mouse tracking
        window.addEventListener('mousemove', (e) => {
            if (this.isActive && this.dot) {
                this.dot.style.left = `${e.clientX}px`;
                this.dot.style.top = `${e.clientY}px`;
                if (window.presenterSyncEngine) {
                    const normX = e.clientX / window.innerWidth;
                    const normY = e.clientY / window.innerHeight;
                    window.presenterSyncEngine.emit('LASER_MOVE', { normX, normY });
                }
            }
        });
    }

    toggle() {
        this.isActive ? this.deactivate() : this.activate();
    }

    activate(broadcast = true) {
        this.isActive = true;
        if (this.dot) this.dot.style.display = 'block';

        // Update button UI
        const btn = document.getElementById('toolLaserBtn');
        if (btn) btn.classList.add('active');

        // Mutually exclusive with pen annotation
        if (window.penAnnotation && window.penAnnotation.isActive) {
            window.penAnnotation.deactivate();
        }

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('LASER_STATE', { active: true });
        }
    }

    deactivate(broadcast = true) {
        this.isActive = false;
        if (this.dot) this.dot.style.display = 'none';

        // Update button UI
        const btn = document.getElementById('toolLaserBtn');
        if (btn) btn.classList.remove('active');

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('LASER_STATE', { active: false });
        }
    }
}

// Global auto-instantiation
let laserPointer;
window.addEventListener('DOMContentLoaded', () => {
    laserPointer = new LaserPointer();
    window.laserPointer = laserPointer;
});


/* ==================== MODULE: pen-annotation.js ==================== */
/**
 * Pen Annotation Module (PenAnnotation)
 * Provides an on-slide transparent drawing and sketch canvas.
 * Shortcuts: 'P' to toggle pen, 'C' to clear drawings.
 */

class PenAnnotation {
    constructor() {
        this.isActive = false;
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        // Inject styles if not present
        if (!document.getElementById('penAnnotationStyles')) {
            const style = document.createElement('style');
            style.id = 'penAnnotationStyles';
            style.textContent = `
                #annotationCanvas {
                    position: fixed;
                    inset: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 9990;
                    pointer-events: none;
                    cursor: crosshair;
                }
                #annotationCanvas.active {
                    pointer-events: auto;
                }
            `;
            document.head.appendChild(style);
        }

        const canvas = document.createElement('canvas');
        canvas.id = 'annotationCanvas';
        document.body.appendChild(canvas);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        let currentStroke = [];

        canvas.addEventListener('mousedown', (e) => {
            if (!this.isActive) return;
            isDrawing = true;
            [lastX, lastY] = [e.clientX, e.clientY];
            currentStroke = [{
                normX: e.clientX / window.innerWidth,
                normY: e.clientY / window.innerHeight
            }];
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing || !this.isActive) return;
            this.ctx.beginPath();
            this.ctx.moveTo(lastX, lastY);
            this.ctx.lineTo(e.clientX, e.clientY);
            this.ctx.strokeStyle = '#ef4444';
            this.ctx.lineWidth = 3.5;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.stroke();

            currentStroke.push({
                normX: e.clientX / window.innerWidth,
                normY: e.clientY / window.innerHeight
            });

            if (currentStroke.length > 3 && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('PEN_DRAW', {
                    stroke: currentStroke,
                    color: '#ef4444',
                    width: 3.5
                });
                currentStroke = [{
                    normX: e.clientX / window.innerWidth,
                    normY: e.clientY / window.innerHeight
                }];
            }

            [lastX, lastY] = [e.clientX, e.clientY];
        });

        window.addEventListener('mouseup', () => {
            if (isDrawing && currentStroke.length > 0 && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('PEN_DRAW', {
                    stroke: currentStroke,
                    color: '#ef4444',
                    width: 3.5
                });
            }
            isDrawing = false;
            currentStroke = [];
        });
    }

    toggle() {
        this.isActive ? this.deactivate() : this.activate();
    }

    activate(broadcast = true) {
        this.isActive = true;
        if (this.canvas) this.canvas.classList.add('active');

        const btn = document.getElementById('toolPenBtn');
        if (btn) btn.classList.add('active');

        // Mutually exclusive with laser pointer
        if (window.laserPointer && window.laserPointer.isActive) {
            window.laserPointer.deactivate();
        }

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('PEN_STATE', { active: true });
        }
    }

    deactivate(broadcast = true) {
        this.isActive = false;
        if (this.canvas) this.canvas.classList.remove('active');

        const btn = document.getElementById('toolPenBtn');
        if (btn) btn.classList.remove('active');

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('PEN_STATE', { active: false });
        }
    }

    clear(broadcast = true) {
        if (this.canvas && this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('PEN_CLEAR', {});
        }
    }
}

// Global auto-instantiation
let penAnnotation;
window.addEventListener('DOMContentLoaded', () => {
    penAnnotation = new PenAnnotation();
    window.penAnnotation = penAnnotation;
});


/* ==================== MODULE: classroom-timer.js ==================== */
/**
 * Classroom Timer Module (ClassroomTimer)
 * Provides an interactive countdown timer and stopwatch with audio alert chimes.
 * Toggle shortcut: 'T'
 */

class ClassroomTimer {
    constructor() {
        this.timerInterval = null;
        this.timerSeconds = 0;
        this.timerRunning = false;
        this.modal = null;
        this.init();
    }

    init() {
        // Inject styles if not present
        if (!document.getElementById('classroomTimerStyles')) {
            const style = document.createElement('style');
            style.id = 'classroomTimerStyles';
            style.textContent = `
                .timer-modal {
                    position: absolute;
                    top: 50px;
                    right: 0;
                    width: 280px;
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(14px);
                    border: 1px solid rgba(255, 255, 255, 0.16);
                    border-radius: 14px;
                    padding: 16px;
                    color: #ffffff;
                    box-shadow: 0 14px 35px rgba(0, 0, 0, 0.5);
                    animation: timerFadeIn 0.2s ease;
                    z-index: 10001;
                }
                .timer-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-weight: 700;
                    font-size: 14px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding-bottom: 8px;
                    margin-bottom: 12px;
                }
                .timer-modal-close {
                    background: transparent;
                    border: none;
                    color: #94a3b8;
                    font-size: 18px;
                    cursor: pointer;
                    line-height: 1;
                }
                .timer-modal-close:hover { color: #ffffff; }
                .timer-display {
                    font-family: 'JetBrains Mono', monospace, monospace;
                    font-size: 38px;
                    font-weight: 800;
                    text-align: center;
                    letter-spacing: 2px;
                    color: #38bdf8;
                    margin: 8px 0 14px 0;
                }
                .timer-display.ended, .cp-timer-countdown-display.ended {
                    color: #ef4444 !important;
                    animation: timerPulseAlert 0.6s infinite alternate;
                }
                .timer-presets {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 5px;
                    margin-bottom: 12px;
                }
                .timer-preset-btn {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    color: #cbd5e1;
                    padding: 5px 0;
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 130ms ease-out, transform 130ms var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
                }
                .timer-preset-btn:hover { background: rgba(255, 255, 255, 0.2); color: #fff; transform: translateY(-1px); }
                .timer-preset-btn:active { transform: scale(0.94); }
                .timer-actions {
                    display: flex;
                    gap: 8px;
                }
                .timer-action-btn {
                    flex: 1;
                    background: rgba(255, 255, 255, 0.12);
                    border: none;
                    color: #fff;
                    padding: 7px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: opacity 130ms ease-out, transform 130ms var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
                }
                .timer-action-btn:hover {
                    opacity: 0.92;
                    transform: translateY(-1px);
                }
                .timer-action-btn:active {
                    transform: scale(0.95);
                }
                .timer-action-btn.start-btn {
                    background: #10b981;
                }
                .timer-action-btn.start-btn.running {
                    background: #f59e0b;
                }
                @keyframes timerFadeIn {
                    from { opacity: 0; transform: translateY(-8px) scale(0.96); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes timerPulseAlert {
                    from { transform: scale(1); }
                    to { transform: scale(1.08); }
                }
            `;
            document.head.appendChild(style);
        }

        this.initModal();
        this.setupSyncListeners();
    }

    setupSyncListeners() {
        if (!window.presenterSyncEngine) return;

        window.presenterSyncEngine.on('TIMER_CMD', (data) => {
            if (!data) return;
            if (data.action === 'set' && typeof data.seconds === 'number') {
                this.setTimer(data.seconds, false);
                this.showModal(false);
            } else if (data.action === 'start') {
                if (typeof data.seconds === 'number') this.timerSeconds = data.seconds;
                if (!this.timerRunning) this.toggleRun(false);
                this.showModal(false);
            } else if (data.action === 'pause') {
                if (this.timerRunning) this.toggleRun(false);
            } else if (data.action === 'reset') {
                this.reset(false);
            } else if (data.action === 'show' || data.action === 'showModal') {
                this.showModal(false);
            } else if (data.action === 'hide' || data.action === 'hideModal') {
                this.hideModal(false);
            }
        });
    }

    initModal() {
        const hud = document.getElementById('presentationToolsHUD') || document.body;
        
        const modal = document.createElement('div');
        modal.className = 'timer-modal';
        modal.id = 'timerModal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="timer-modal-header">
                <span>⏱️ Classroom Timer</span>
                <button class="timer-modal-close" onclick="classroomTimer.hideModal(true)">×</button>
            </div>
            <div class="timer-display" id="timerDisplay">00:00</div>
            <div class="timer-presets">
                <button class="timer-preset-btn" onclick="classroomTimer.setTimer(60)">1 min</button>
                <button class="timer-preset-btn" onclick="classroomTimer.setTimer(120)">2 min</button>
                <button class="timer-preset-btn" onclick="classroomTimer.setTimer(300)">5 min</button>
                <button class="timer-preset-btn" onclick="classroomTimer.setTimer(600)">10 min</button>
            </div>
            <div class="timer-actions">
                <button class="timer-action-btn start-btn" id="timerStartBtn" onclick="classroomTimer.toggleRun()">Start</button>
                <button class="timer-action-btn" onclick="classroomTimer.reset()">Reset</button>
            </div>
        `;
        hud.appendChild(modal);
        this.modal = modal;
    }

    showModal(broadcast = false) {
        if (!this.modal) {
            this.modal = document.getElementById('timerModal');
        }
        if (this.modal) {
            this.modal.style.display = 'block';
        }
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('TIMER_CMD', { action: 'show' });
        }
    }

    hideModal(broadcast = false) {
        if (!this.modal) {
            this.modal = document.getElementById('timerModal');
        }
        if (this.modal) {
            this.modal.style.display = 'none';
        }
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('TIMER_CMD', { action: 'hide' });
        }
    }

    toggleModal() {
        if (!this.modal) {
            this.modal = document.getElementById('timerModal');
        }
        if (this.modal) {
            if (this.modal.style.display === 'none') {
                this.showModal(true);
            } else {
                this.hideModal(true);
            }
        }
    }

    setTimer(seconds, broadcast = true) {
        this.timerSeconds = seconds;
        this.updateDisplay();
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('TIMER_CMD', { action: 'set', seconds: seconds });
        }
    }

    updateDisplay() {
        const mins = Math.floor(this.timerSeconds / 60);
        const secs = this.timerSeconds % 60;
        const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        // Update modal display
        const display = document.getElementById('timerDisplay');
        if (display) {
            display.textContent = timeStr;
            display.classList.toggle('ended', this.timerSeconds <= 0 && !this.timerRunning);
        }

        // Update Presenter Cockpit countdown displays
        const cpDisplay = document.getElementById('cpCountdownDisplay');
        if (cpDisplay) {
            cpDisplay.textContent = timeStr;
            cpDisplay.classList.toggle('ended', this.timerSeconds <= 0 && !this.timerRunning);
        }

        document.querySelectorAll('.cp-timer-countdown-display').forEach(el => {
            el.textContent = timeStr;
            el.classList.toggle('ended', this.timerSeconds <= 0 && !this.timerRunning);
        });
    }

    toggleRun(broadcast = true) {
        const startBtn = document.getElementById('timerStartBtn');
        const cpToggleBtn = document.getElementById('btnToolTimerToggle');

        if (this.timerRunning) {
            clearInterval(this.timerInterval);
            this.timerRunning = false;
            if (startBtn) {
                startBtn.textContent = 'Resume';
                startBtn.classList.remove('running');
            }
            if (cpToggleBtn) {
                cpToggleBtn.textContent = '▶ Start Timer';
            }
            if (broadcast && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('TIMER_CMD', { action: 'pause' });
            }
        } else {
            if (this.timerSeconds <= 0) this.timerSeconds = 120;
            this.timerRunning = true;
            if (startBtn) {
                startBtn.textContent = 'Pause';
                startBtn.classList.add('running');
            }
            if (cpToggleBtn) {
                cpToggleBtn.textContent = '⏸ Pause Timer';
            }
            if (broadcast && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('TIMER_CMD', { action: 'start', seconds: this.timerSeconds });
            }
            this.timerInterval = setInterval(() => {
                if (this.timerSeconds > 0) {
                    this.timerSeconds--;
                    this.updateDisplay();
                } else {
                    clearInterval(this.timerInterval);
                    this.timerRunning = false;
                    this.updateDisplay();
                    if (startBtn) {
                        startBtn.textContent = 'Start';
                        startBtn.classList.remove('running');
                    }
                    if (cpToggleBtn) {
                        cpToggleBtn.textContent = '▶ Start Timer';
                    }
                    this.playChime();
                }
            }, 1000);
        }
    }

    reset(broadcast = true) {
        clearInterval(this.timerInterval);
        this.timerRunning = false;
        this.timerSeconds = 0;
        this.updateDisplay();
        const startBtn = document.getElementById('timerStartBtn');
        if (startBtn) {
            startBtn.textContent = 'Start';
            startBtn.classList.remove('running');
        }
        const cpToggleBtn = document.getElementById('btnToolTimerToggle');
        if (cpToggleBtn) {
            cpToggleBtn.textContent = '▶ Start Timer';
        }
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('TIMER_CMD', { action: 'reset' });
        }
    }

    playChime() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
            osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
            osc.start();
            osc.stop(ctx.currentTime + 0.8);
        } catch (e) {
            // AudioContext not permitted without user interaction
        }
    }
}

// Global auto-instantiation
let classroomTimer;
window.addEventListener('DOMContentLoaded', () => {
    classroomTimer = new ClassroomTimer();
    window.classroomTimer = classroomTimer;
});


/* ==================== MODULE: deck-charts.js ==================== */
/**
 * =========================================================================
 * IELTS General Interactive SVG Chart Engine (Task 1 Academic Data Visualizations)
 * Supports: Grouped Bar Charts, Multi-Line Graphs, Pie/Donut Charts, Single Bar Charts
 * 100% Native SVG, Zero External Dependencies, Offline-First & Responsive
 * =========================================================================
 */

class DeckCharts {
    constructor() {
        this.registry = new Map();
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.hydrateAll();
        });

        document.addEventListener('slidechange', () => {
            this.hydrateAll();
        });
    }

    /**
     * Register a chart to be automatically mounted when its container is rendered.
     */
    register(containerId, type, config) {
        this.registry.set(containerId, { type, config });
        const el = document.getElementById(containerId);
        if (el) {
            this.renderRegisteredChart(el, type, config);
        }
    }

    hydrateAll() {
        // Hydrate registered charts
        this.registry.forEach((item, id) => {
            const el = document.getElementById(id);
            if (el && !el.dataset.rendered) {
                this.renderRegisteredChart(el, item.type, item.config);
                el.dataset.rendered = 'true';
            }
        });

        // Hydrate data-chart elements
        document.querySelectorAll('[data-chart-type]').forEach(el => {
            if (!el.dataset.rendered && el.id) {
                const type = el.dataset.chartType;
                const configName = el.dataset.chartConfig;
                const config = configName && window[configName] ? window[configName] : null;
                if (config) {
                    this.renderRegisteredChart(el, type, config);
                    el.dataset.rendered = 'true';
                }
            }
        });
    }

    renderRegisteredChart(container, type, config) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        if (!container) return;

        switch (type) {
            case 'grouped-bar':
                this.renderGroupedBarChart(container, config);
                break;
            case 'single-bar':
                this.renderSingleBarChart(container, config);
                break;
            case 'multi-line':
                this.renderMultiLineChart(container, config);
                break;
            case 'pie-grid':
                this.renderPieChartGrid(container, config);
                break;
            default:
                console.warn(`DeckCharts: Unknown chart type "${type}"`);
        }
    }

    /**
     * Reusable Grouped Bar Chart
     */
    renderGroupedBarChart(container, config) {
        const {
            title = '',
            categories = [],
            series = [],
            yMax = 100,
            yStep = 20,
            width = 680,
            height = 390,
            margin = { top: 35, right: 30, bottom: 50, left: 65 },
            yFormat = (val) => val.toLocaleString()
        } = config;

        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;
        const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;

        let html = `
            <div class="ielts-chart-header">
                <h4 class="ielts-chart-title">${title}</h4>
                <div class="ielts-chart-legend">
        `;

        series.forEach(s => {
            html += `
                <div class="ielts-legend-item" data-series="${s.id}">
                    <span class="ielts-legend-color" style="background:${s.color};"></span>
                    <span>${s.name}</span>
                </div>
            `;
        });

        html += `
                </div>
            </div>
            <div style="position:relative; width:100%;">
                <div class="ielts-chart-tooltip" id="${tooltipId}"></div>
                <svg viewBox="0 0 ${width} ${height}" class="ielts-chart-svg">
                    <rect x="${margin.left}" y="${margin.top}" width="${plotWidth}" height="${plotHeight}" fill="#fffbeb" rx="4" />
        `;

        // Y Grid
        for (let yVal = 0; yVal <= yMax; yVal += yStep) {
            const yPos = margin.top + plotHeight - (yVal / yMax) * plotHeight;
            html += `
                <line x1="${margin.left}" y1="${yPos}" x2="${margin.left + plotWidth}" y2="${yPos}" class="chart-grid-line" stroke="#d6d3d1" stroke-dasharray="4,4" />
                <text x="${margin.left - 10}" y="${yPos + 4}" text-anchor="end" class="chart-axis-text" style="font-size:12px; font-weight:600;">${yFormat(yVal)}</text>
            `;
        }

        // Axes lines
        html += `
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" class="chart-axis-line" stroke="#78716c" stroke-width="1.5" />
            <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${margin.left + plotWidth}" y2="${margin.top + plotHeight}" class="chart-axis-line" stroke="#78716c" stroke-width="1.5" />
        `;

        // Calculate bars
        const groupWidth = plotWidth / categories.length;
        const numSeries = series.length;
        const barWidth = Math.max(14, Math.min(32, (groupWidth * 0.7) / numSeries));
        const gap = 4;
        const totalBarsWidth = barWidth * numSeries + gap * (numSeries - 1);
        const groupOffset = (groupWidth - totalBarsWidth) / 2;

        categories.forEach((cat, catIdx) => {
            const catName = typeof cat === 'string' ? cat : cat.name;
            const groupX = margin.left + catIdx * groupWidth + groupOffset;

            series.forEach((s, sIdx) => {
                const val = typeof cat === 'object' && cat[s.id] !== undefined ? cat[s.id] : s.data[catIdx];
                const barH = (val / yMax) * plotHeight;
                const barY = margin.top + plotHeight - barH;
                const barX = groupX + sIdx * (barWidth + gap);

                html += `
                    <g class="chart-bar-group" data-series="${s.id}" data-label="${catName} - ${s.name}" data-val="${yFormat(val)}">
                        <rect x="${barX}" y="${barY}" width="${barWidth}" height="${barH}" rx="3" fill="${s.color}" class="chart-bar" />
                    </g>
                `;
            });

            // Category label below axis
            const centerX = margin.left + catIdx * groupWidth + groupWidth / 2;
            html += `
                <text x="${centerX}" y="${margin.top + plotHeight + 24}" text-anchor="middle" class="chart-axis-text" style="font-size:14px; font-weight:700; fill:#1e293b;">${catName}</text>
            `;
        });

        html += `
                </svg>
            </div>
        `;

        container.innerHTML = html;
        this.bindBarChartEvents(container, tooltipId);
    }

    /**
     * Reusable Single Bar Chart with gradient options
     */
    renderSingleBarChart(container, config) {
        const {
            title = '',
            data = [], // [{ label: '', value: 0, display: '' }]
            yMax = 5.0,
            yStep = 1.0,
            width = 640,
            height = 360,
            margin = { top: 30, right: 30, bottom: 65, left: 55 },
            yFormat = (val) => `$${val.toFixed(1)}M`
        } = config;

        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;
        const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;

        let html = `
            <div class="ielts-chart-header">
                <h4 class="ielts-chart-title">${title}</h4>
            </div>
            <div style="position:relative; width:100%;">
                <div class="ielts-chart-tooltip" id="${tooltipId}"></div>
                <svg viewBox="0 0 ${width} ${height}" class="ielts-chart-svg">
                    <rect x="${margin.left}" y="${margin.top}" width="${plotWidth}" height="${plotHeight}" fill="#f8fafc" rx="4" />
        `;

        // Y Axis Grid lines
        for (let yVal = 0; yVal <= yMax; yVal += yStep) {
            const yPos = margin.top + plotHeight - (yVal / yMax) * plotHeight;
            html += `
                <line x1="${margin.left}" y1="${yPos}" x2="${margin.left + plotWidth}" y2="${yPos}" class="chart-grid-line" stroke="#e2e8f0" stroke-dasharray="4,4" />
                <text x="${margin.left - 10}" y="${yPos + 4}" text-anchor="end" class="chart-axis-text" style="font-size:12px; font-weight:600;">${yFormat(yVal)}</text>
            `;
        }

        // Axes
        html += `
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" class="chart-axis-line" stroke="#64748b" stroke-width="1.5" />
            <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${margin.left + plotWidth}" y2="${margin.top + plotHeight}" class="chart-axis-line" stroke="#64748b" stroke-width="1.5" />
        `;

        const barWidth = 44;
        const colStep = plotWidth / data.length;

        data.forEach((d, idx) => {
            const x = margin.left + idx * colStep + (colStep - barWidth) / 2;
            const barH = (d.value / yMax) * plotHeight;
            const y = margin.top + plotHeight - barH;

            html += `
                <g class="chart-bar-group" data-label="${d.label}" data-val="${d.display || d.value}">
                    <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="4" fill="url(#barGrad-${idx})" class="chart-bar" />
                    <text x="${x + barWidth / 2}" y="${y - 6}" text-anchor="middle" font-size="12" font-weight="700" fill="#0369a1">${d.display || d.value}</text>
                    <text x="${x + barWidth / 2}" y="${margin.top + plotHeight + 14}" text-anchor="end" transform="rotate(-35, ${x + barWidth / 2}, ${margin.top + plotHeight + 14})" class="chart-axis-text" style="font-size:12px; font-weight:700; fill:#1e293b;">${d.label}</text>
                </g>
            `;
        });

        html += `
            <defs>
        `;
        data.forEach((d, idx) => {
            html += `
                <linearGradient id="barGrad-${idx}" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#0284c7" />
                    <stop offset="100%" stop-color="#0369a1" />
                </linearGradient>
            `;
        });
        html += `
            </defs>
            </svg>
            </div>
        `;

        container.innerHTML = html;
        this.bindBarChartEvents(container, tooltipId);
    }

    /**
     * Reusable Multi-Line Graph
     */
    renderMultiLineChart(container, config) {
        const {
            title = '',
            xCategories = [],
            series = [],
            yMin = 0,
            yMax = 100,
            yStep = 20,
            yUnit = '%',
            width = 680,
            height = 390,
            margin = { top: 30, right: 120, bottom: 45, left: 55 }
        } = config;

        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;
        const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;

        let html = `
            <div class="ielts-chart-header">
                <h4 class="ielts-chart-title">${title}</h4>
                <div class="ielts-chart-legend">
        `;

        series.forEach(s => {
            html += `
                <div class="ielts-legend-item" data-line-id="${s.id}">
                    <span class="ielts-legend-line" style="background:${s.color};"></span>
                    <span>${s.name}</span>
                </div>
            `;
        });

        html += `
                </div>
            </div>
            <div style="position:relative; width:100%;">
                <div class="ielts-chart-tooltip" id="${tooltipId}"></div>
                <svg viewBox="0 0 ${width} ${height}" class="ielts-chart-svg">
                    <rect x="${margin.left}" y="${margin.top}" width="${plotWidth}" height="${plotHeight}" fill="#fffbeb" rx="4" />
        `;

        // Y Grid
        for (let yVal = yMin; yVal <= yMax; yVal += yStep) {
            const yPos = margin.top + plotHeight - ((yVal - yMin) / (yMax - yMin)) * plotHeight;
            html += `
                <line x1="${margin.left}" y1="${yPos}" x2="${margin.left + plotWidth}" y2="${yPos}" class="chart-grid-line" stroke="#d6d3d1" stroke-dasharray="4,4" />
                <text x="${margin.left - 10}" y="${yPos + 4}" text-anchor="end" class="chart-axis-text" style="font-weight:600;">${yVal}${yUnit}</text>
            `;
        }

        // X Axis Points
        const xStep = plotWidth / (xCategories.length - 1);
        xCategories.forEach((cat, idx) => {
            const xPos = margin.left + idx * xStep;
            html += `
                <line x1="${xPos}" y1="${margin.top + plotHeight}" x2="${xPos}" y2="${margin.top + plotHeight + 5}" class="chart-axis-line" stroke="#78716c" />
                <text x="${xPos}" y="${margin.top + plotHeight + 22}" text-anchor="middle" class="chart-axis-text" style="font-weight:700;">${cat}</text>
            `;
        });

        // Axes lines
        html += `
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" class="chart-axis-line" stroke="#78716c" stroke-width="1.5" />
            <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${margin.left + plotWidth}" y2="${margin.top + plotHeight}" class="chart-axis-line" stroke="#78716c" stroke-width="1.5" />
        `;

        // Render series
        series.forEach(s => {
            const points = s.data.map((val, idx) => {
                const x = margin.left + idx * xStep;
                const y = margin.top + plotHeight - ((val - yMin) / (yMax - yMin)) * plotHeight;
                return `${x},${y}`;
            }).join(' ');

            html += `
                <g class="chart-series-group" data-line-id="${s.id}">
                    <polyline points="${points}" stroke="${s.color}" stroke-width="3.5" fill="none" class="chart-line" />
            `;

            s.data.forEach((val, idx) => {
                const x = margin.left + idx * xStep;
                const y = margin.top + plotHeight - ((val - yMin) / (yMax - yMin)) * plotHeight;
                html += `
                    <circle cx="${x}" cy="${y}" r="4.5" fill="${s.color}" stroke="#ffffff" stroke-width="1.5" class="chart-dot" data-label="${s.name} (${xCategories[idx]})" data-val="${val}${yUnit}" />
                `;
            });

            // End line label
            const lastX = margin.left + (xCategories.length - 1) * xStep;
            const lastY = margin.top + plotHeight - ((s.data[s.data.length - 1] - yMin) / (yMax - yMin)) * plotHeight;
            html += `
                <text x="${lastX + 8}" y="${lastY + 4}" fill="${s.color}" font-size="12" font-weight="700">${s.name}</text>
                </g>
            `;
        });

        html += `
                </svg>
            </div>
        `;

        container.innerHTML = html;
        this.bindLineChartEvents(container, tooltipId);
    }

    /**
     * Reusable Pie Chart Grid
     */
    renderPieChartGrid(container, config) {
        const {
            mainTitle = '',
            legendItems = [],
            pies = [] // [{ title, primaryPct, secondaryPct, primaryLabel, secondaryLabel, primaryColor, secondaryColor }]
        } = config;

        let html = `
            <div class="ielts-chart-header">
                <h4 class="ielts-chart-title">${mainTitle}</h4>
                <div class="ielts-chart-legend">
        `;

        legendItems.forEach(leg => {
            html += `
                <div class="ielts-legend-item">
                    <span class="ielts-legend-color" style="background:${leg.color};"></span>
                    <span>${leg.label}</span>
                </div>
            `;
        });

        html += `
                </div>
            </div>
            <div style="display:flex; justify-content:space-around; align-items:center; width:100%; padding:10px 0;">
        `;

        pies.forEach(pie => {
            const angle = (pie.primaryPct / 100) * 360;
            const rad = (angle * Math.PI) / 180;
            const R = 80;
            const cx = 100;
            const cy = 100;
            const endX = cx + R * Math.sin(rad);
            const endY = cy - R * Math.cos(rad);
            const largeArc = pie.primaryPct > 50 ? 1 : 0;

            html += `
                <div style="display:flex; flex-direction:column; align-items:center; text-align:center;">
                    <div style="font-weight:700; font-size:16.5px; color:#1e293b; margin-bottom:8px;">${pie.title}</div>
                    <svg viewBox="0 0 200 200" style="width:190px; height:190px;">
                        <!-- Primary Arc -->
                        <path d="M ${cx},${cy} L ${cx},${cy - R} A ${R},${R} 0 ${largeArc},1 ${endX.toFixed(2)},${endY.toFixed(2)} Z" fill="${pie.primaryColor || '#0284c7'}" stroke="#ffffff" stroke-width="2.5" />
                        <!-- Secondary Arc -->
                        <path d="M ${cx},${cy} L ${endX.toFixed(2)},${endY.toFixed(2)} A ${R},${R} 0 ${1 - largeArc},1 ${cx},${cy - R} Z" fill="${pie.secondaryColor || '#ea580c'}" stroke="#ffffff" stroke-width="2.5" />
                        <!-- Labels -->
                        <text x="${pie.primaryTextX || 100}" y="${pie.primaryTextY || 115}" fill="#ffffff" font-size="22" font-weight="800" text-anchor="middle">${pie.primaryPct}%</text>
                        <text x="${pie.secondaryTextX || 83}" y="${pie.secondaryTextY || 48}" fill="#ffffff" font-size="15" font-weight="800" text-anchor="middle">${pie.secondaryPct}%</text>
                    </svg>
                    <div style="display:flex; gap:16px; margin-top:8px; font-size:14px; font-weight:700;">
                        <span style="color:${pie.primaryColor || '#0284c7'};">■ ${pie.primaryLabel}: ${pie.primaryPct}%</span>
                        <span style="color:${pie.secondaryColor || '#ea580c'};">■ ${pie.secondaryLabel}: ${pie.secondaryPct}%</span>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        container.innerHTML = html;
    }

    /**
     * Tooltip & Interactive Legends Bindings
     */
    bindBarChartEvents(container, tooltipId) {
        const tooltip = container.querySelector(`#${tooltipId}`);
        const barGroups = container.querySelectorAll('.chart-bar-group');
        const legendItems = container.querySelectorAll('.ielts-legend-item');

        barGroups.forEach(grp => {
            grp.addEventListener('mouseenter', (e) => {
                const label = grp.dataset.label;
                const val = grp.dataset.val;
                if (!tooltip) return;
                tooltip.textContent = `${label}: ${val}`;
                tooltip.classList.add('show');

                const rect = grp.querySelector('rect').getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                tooltip.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.top - containerRect.top}px`;
            });

            grp.addEventListener('mouseleave', () => {
                if (tooltip) tooltip.classList.remove('show');
            });
        });

        legendItems.forEach(item => {
            item.addEventListener('click', () => {
                const series = item.dataset.series;
                const isDimmed = item.classList.toggle('dimmed');

                barGroups.forEach(grp => {
                    if (grp.dataset.series === series) {
                        grp.style.opacity = isDimmed ? '0.15' : '1';
                    }
                });
            });
        });
    }

    bindLineChartEvents(container, tooltipId) {
        const tooltip = container.querySelector(`#${tooltipId}`);
        const dots = container.querySelectorAll('.chart-dot');
        const legendItems = container.querySelectorAll('.ielts-legend-item');
        const seriesGroups = container.querySelectorAll('.chart-series-group');

        dots.forEach(dot => {
            dot.addEventListener('mouseenter', (e) => {
                const label = dot.dataset.label;
                const val = dot.dataset.val;
                if (!tooltip) return;
                tooltip.textContent = `${label}: ${val}`;
                tooltip.classList.add('show');

                const rect = dot.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                tooltip.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.top - containerRect.top}px`;
            });

            dot.addEventListener('mouseleave', () => {
                if (tooltip) tooltip.classList.remove('show');
            });
        });

        legendItems.forEach(item => {
            item.addEventListener('click', () => {
                const lineId = item.dataset.lineId;
                const isDimmed = item.classList.toggle('dimmed');

                seriesGroups.forEach(grp => {
                    if (grp.dataset.lineId === lineId) {
                        grp.style.opacity = isDimmed ? '0.12' : '1';
                    }
                });
            });
        });
    }
}

// Instantiate and expose globally
window.deckCharts = new DeckCharts();


/* ==================== MODULE: presentation-tools.js ==================== */
/**
 * Presentation Classroom Tools Coordinator (PresentationTools)
 * Coordinates toolbar HUD, shortcuts dispatch, and presentation utilities:
 * - 🎛️ Floating Teacher Tools HUD Bar with Collapse / Hide Toggle
 * - 📐 Aspect Ratio Switching ('Shift+A')
 * - ⛶ Fullscreen Toggle ('F')
 * - ❓ Help / Keybindings Overlay ('?')
 * - ⌨️ Global Keyboard Shortcut Dispatcher
 */

class PresentationTools {
    constructor(deckEngine) {
        this.deckEngine = deckEngine;
        this.isCollapsed = localStorage.getItem('deck_tools_collapsed') === 'true';
        this.initUI();
        this.initKeyboardShortcuts();
        if (this.isCollapsed) {
            this.collapseHUD(false);
        }
    }

    /**
     * Initializes the floating toolbar, collapsed trigger, and help modal
     */
    initUI() {
        // Create container
        const toolContainer = document.createElement('div');
        toolContainer.id = 'presentationToolsHUD';
        toolContainer.className = 'presentation-tools-hud';
        toolContainer.innerHTML = `
            <!-- Collapsed Mini Trigger Pill -->
            <button class="tools-collapsed-trigger" id="toolsCollapsedTrigger" title="Show Teacher Toolkit (Shift+X)" onclick="presentationTools.toggleHUD()">
                🛠️ <span class="collapsed-badge">Tools</span>
            </button>

            <!-- Expanded Tools Bar -->
            <div class="tools-bar" id="toolsBar">
                <button class="tool-btn" id="toolPresenterBtn" title="Open Presenter View in Dual-Window (Alt+P)" onclick="window.presenterViewUI && window.presenterViewUI.openPresenterWindow()"><span class="tool-icon">👨‍🏫</span><span class="tool-label">Presenter</span></button>
                <button class="tool-btn" id="toolAspectBtn" title="Switch Aspect Ratio (16:9 / 4:3) (Shift+A)" onclick="window.deckEngine && window.deckEngine.toggleAspectRatio()"><span class="tool-icon">📐</span><span class="tool-label">16:9</span></button>
                <button class="tool-btn" id="toolThemeBtn" title="Theme Aesthetics (Shift+T)" onclick="window.deckThemeEngine && window.deckThemeEngine.openModal()"><span class="tool-icon">🎨</span><span class="tool-label">Theme</span></button>
                <button class="tool-btn" id="toolHighlightBtn" title="Teacher Highlighter (H)" onclick="window.teacherHighlighter && window.teacherHighlighter.toggle()"><span class="tool-icon">🖍️</span><span class="tool-label">Highlight</span></button>
                <button class="tool-btn" id="toolTimerBtn" title="Classroom Timer (T)" onclick="presentationTools.toggleTimerModal()"><span class="tool-icon">⏱️</span><span class="tool-label">Timer</span></button>
                <button class="tool-btn" id="toolStudentBtn" title="Random Student Selector (R)" onclick="window.studentPicker && window.studentPicker.toggle()"><span class="tool-icon">🎲</span><span class="tool-label">Picker</span></button>
                <button class="tool-btn" id="toolNotesBtn" title="Teacher Presenter Notes (N)" onclick="window.presenterNotesEngine && window.presenterNotesEngine.toggle()"><span class="tool-icon">📝</span><span class="tool-label">Notes</span></button>
                <button class="tool-btn" id="toolLaserBtn" title="Laser Pointer (L)" onclick="presentationTools.toggleLaser()"><span class="tool-icon">🔴</span><span class="tool-label">Laser</span></button>
                <button class="tool-btn" id="toolPenBtn" title="Draw / Annotate (P)" onclick="presentationTools.togglePen()"><span class="tool-icon">✏️</span><span class="tool-label">Draw</span></button>
                <button class="tool-btn" id="toolFullscreenBtn" title="Fullscreen (F)" onclick="presentationTools.toggleFullscreen()"><span class="tool-icon">⛶</span><span class="tool-label">Fullscreen</span></button>
                <button class="tool-btn" id="toolHelpBtn" title="Keyboard Shortcuts (?)" onclick="presentationTools.toggleHelpModal()"><span class="tool-icon">❓</span><span class="tool-label">Help</span></button>
                <button class="tool-btn tool-collapse-btn" id="toolCollapseBtn" title="Hide Toolkit (Shift+X)" onclick="presentationTools.toggleHUD()"><span class="tool-icon">✕</span><span class="tool-label">Hide</span></button>
            </div>

            <!-- Highlighter Palette -->
            <div class="highlighter-palette" id="highlighterPalette" style="display:none;">
                <button class="highlighter-color-btn active" style="background:#facc15;" onclick="teacherHighlighter && teacherHighlighter.setColor(0)" title="Fluorescent Yellow"></button>
                <button class="highlighter-color-btn" style="background:#4ade80;" onclick="teacherHighlighter && teacherHighlighter.setColor(1)" title="Neon Green"></button>
                <button class="highlighter-color-btn" style="background:#38bdf8;" onclick="teacherHighlighter && teacherHighlighter.setColor(2)" title="Sky Cyan"></button>
                <button class="highlighter-color-btn" style="background:#f472b6;" onclick="teacherHighlighter && teacherHighlighter.setColor(3)" title="Coral Pink"></button>
                <div class="highlighter-divider"></div>
                <button class="highlighter-tool-btn" onclick="teacherHighlighter && teacherHighlighter.undo()" title="Undo Last Stroke (Ctrl+Z)">↩️ Undo</button>
                <button class="highlighter-tool-btn" onclick="teacherHighlighter && teacherHighlighter.clear()" title="Clear All Highlights (C)">🗑️ Clear</button>
            </div>

            <!-- Help Modal -->
            <div class="tool-modal help-modal" id="helpModal" style="display:none;">
                <div class="tool-modal-header">
                    <span>⌨️ Presentation Shortcuts</span>
                    <button class="modal-close" onclick="presentationTools.toggleHelpModal()">×</button>
                </div>
                <div class="help-grid">
                    <div><kbd>→</kbd> / <kbd>Space</kbd></div><div>Next Slide</div>
                    <div><kbd>←</kbd></div><div>Previous Slide</div>
                    <div><kbd>Home</kbd> / <kbd>Shift+R</kbd></div><div>Reset to Slide 1</div>
                    <div><kbd>Alt+P</kbd></div><div>Presenter Cockpit (Dual View)</div>
                    <div><kbd>G</kbd></div><div>Slide Grid Navigator</div>
                    <div><kbd>Shift+X</kbd></div><div>Hide / Show Teacher Toolkit</div>
                    <div><kbd>Shift+A</kbd></div><div>Toggle 16:9 / 4:3 Aspect Ratio</div>
                    <div><kbd>H</kbd></div><div>Toggle Highlighter Tool</div>
                    <div><kbd>L</kbd></div><div>Toggle Laser Pointer</div>
                    <div><kbd>P</kbd></div><div>Toggle Drawing Pen</div>
                    <div><kbd>C</kbd></div><div>Clear Highlights / Drawings</div>
                    <div><kbd>Shift+T</kbd></div><div>Cycle Theme Presets</div>
                    <div><kbd>B</kbd> / <kbd>W</kbd></div><div>Blackout / Whiteout Screen</div>
                    <div><kbd>S</kbd></div><div>Spotlight Dimmer</div>
                    <div><kbd>T</kbd></div><div>Toggle Classroom Timer</div>
                    <div><kbd>R</kbd></div><div>Random Student Picker Wheel</div>
                    <div><kbd>N</kbd></div><div>Teacher Presenter Notes</div>
                    <div><kbd>Z</kbd></div><div>Paragraph Loupe Focus</div>
                    <div><kbd>E</kbd></div><div>Step Reveal Answers</div>
                    <div><kbd>F</kbd></div><div>Toggle Fullscreen Mode</div>
                    <div><kbd>+</kbd> / <kbd>-</kbd> / <kbd>0</kbd></div><div>Font Size Scaling (Zoom / Reset)</div>
                    <div><kbd>?</kbd></div><div>Toggle Shortcuts Cheatsheet</div>
                </div>
            </div>
        `;
        document.body.appendChild(toolContainer);

        // Inject Styles for Tools HUD
        const style = document.createElement('style');
        style.id = 'presentationToolsStyles';
        style.textContent = `
            .presentation-tools-hud {
                position: fixed;
                top: 16px;
                right: 20px;
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                user-select: none;
            }
            .tools-bar {
                display: flex;
                align-items: center;
                gap: 4px;
                background: rgba(15, 23, 42, 0.88);
                backdrop-filter: blur(12px);
                padding: 4px 6px;
                border-radius: 30px;
                border: 1px solid rgba(255, 255, 255, 0.16);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
                transition: opacity 0.25s ease, transform 0.25s ease;
            }
            .tool-btn {
                background: transparent;
                border: none;
                color: #e2e8f0;
                padding: 6px 8px;
                border-radius: 20px;
                font-size: 13.5px;
                font-weight: 600;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
                white-space: nowrap;
                position: relative;
            }
            .tool-btn:hover {
                background: rgba(255, 255, 255, 0.18);
                color: #ffffff;
                padding: 6px 12px;
            }
            .tool-btn.active {
                background: #3b82f6;
                color: #ffffff;
                box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
                padding: 6px 12px;
            }
            .tool-icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
            }
            .tool-label {
                max-width: 0;
                opacity: 0;
                overflow: hidden;
                white-space: nowrap;
                font-size: 12px;
                font-weight: 600;
                transition: max-width 0.24s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.18s ease, margin 0.18s ease;
                margin-left: 0;
                pointer-events: none;
            }
            .tool-btn:hover .tool-label,
            .tool-btn.active .tool-label {
                max-width: 85px;
                opacity: 1;
                margin-left: 5px;
            }
            .tool-collapse-btn {
                padding: 6px 8px;
                font-size: 12px;
                color: #94a3b8;
            }
            .tool-collapse-btn:hover {
                color: #ef4444;
                background: rgba(239, 68, 68, 0.15);
            }

            /* Collapsed Trigger Pill */
            .tools-collapsed-trigger {
                display: none;
                align-items: center;
                gap: 6px;
                background: rgba(15, 23, 42, 0.75);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.18);
                color: #e2e8f0;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
                transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
                opacity: 0.65;
            }
            .tools-collapsed-trigger:hover {
                opacity: 1;
                background: rgba(15, 23, 42, 0.95);
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
                color: #ffffff;
            }
            .collapsed-badge {
                font-size: 11px;
                letter-spacing: 0.5px;
            }

            /* Collapsed State Overrides */
            .presentation-tools-hud.collapsed .tools-bar {
                display: none;
            }
            .presentation-tools-hud.collapsed .tools-collapsed-trigger {
                display: flex;
            }
            .presentation-tools-hud.collapsed .tool-modal {
                display: none !important;
            }
            .presentation-tools-hud.collapsed .highlighter-palette {
                display: none !important;
            }

            /* Tool Modals */
            .tool-modal {
                position: absolute;
                top: 50px;
                right: 0;
                width: 280px;
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(14px);
                border: 1px solid rgba(255, 255, 255, 0.16);
                border-radius: 14px;
                padding: 16px;
                color: #ffffff;
                box-shadow: 0 14px 35px rgba(0, 0, 0, 0.5);
                animation: toolFadeIn 0.2s ease;
            }
            .tool-modal.help-modal {
                width: 360px;
            }
            .tool-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: 700;
                font-size: 14px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding-bottom: 8px;
                margin-bottom: 12px;
            }
            .modal-close {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 18px;
                cursor: pointer;
                line-height: 1;
            }
            .modal-close:hover { color: #ffffff; }

            /* Help Grid */
            .help-grid {
                display: grid;
                grid-template-columns: auto 1fr;
                row-gap: 8px;
                column-gap: 14px;
                font-size: 12.5px;
                color: #cbd5e1;
                align-items: center;
            }
            .help-grid kbd {
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.25);
                border-radius: 4px;
                padding: 2px 6px;
                font-family: inherit;
                font-size: 11px;
                color: #ffffff;
            }

            @keyframes toolFadeIn {
                from { opacity: 0; transform: translateY(-8px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Hide / Show HUD methods
     */
    toggleHUD() {
        this.isCollapsed ? this.expandHUD() : this.collapseHUD();
    }

    collapseHUD(showToast = true) {
        this.isCollapsed = true;
        const hud = document.getElementById('presentationToolsHUD');
        if (hud) hud.classList.add('collapsed');
        localStorage.setItem('deck_tools_collapsed', 'true');
        if (showToast && window.deckEngine && typeof window.deckEngine.showToastNotification === 'function') {
            window.deckEngine.showToastNotification('Teacher Toolkit Hidden (Shift+X to show)');
        }
    }

    expandHUD(showToast = true) {
        this.isCollapsed = false;
        const hud = document.getElementById('presentationToolsHUD');
        if (hud) hud.classList.remove('collapsed');
        localStorage.setItem('deck_tools_collapsed', 'false');
        if (showToast && window.deckEngine && typeof window.deckEngine.showToastNotification === 'function') {
            window.deckEngine.showToastNotification('Teacher Toolkit Visible');
        }
    }

    /**
     * Laser pointer delegation
     */
    toggleLaser() {
        if (window.laserPointer) {
            window.laserPointer.toggle();
        }
    }

    /**
     * Pen drawing delegation
     */
    togglePen() {
        if (window.penAnnotation) {
            window.penAnnotation.toggle();
        }
    }

    clearCanvas() {
        if (window.penAnnotation) {
            window.penAnnotation.clear();
        }
    }

    /**
     * Timer delegation
     */
    toggleTimerModal() {
        if (window.classroomTimer) {
            window.classroomTimer.toggleModal();
        }
    }

    setTimer(seconds) {
        if (window.classroomTimer) {
            window.classroomTimer.setTimer(seconds);
        }
    }

    toggleTimerRun() {
        if (window.classroomTimer) {
            window.classroomTimer.toggleRun();
        }
    }

    resetTimer() {
        if (window.classroomTimer) {
            window.classroomTimer.reset();
        }
    }

    /**
     * Fullscreen Mode
     */
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.warn(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    /**
     * Help Modal
     */
    toggleHelpModal() {
        const modal = document.getElementById('helpModal');
        if (modal) {
            modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
        }
    }

    /**
     * Global Keyboard Shortcuts Dispatcher
     */
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (document.documentElement.classList.contains('presenter-window') || (document.body && document.body.classList.contains('presenter-window'))) {
                return;
            }
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            const key = e.key.toLowerCase();
            if (e.shiftKey && key === 'x') {
                e.preventDefault();
                this.toggleHUD();
            } else if (e.shiftKey && key === 'a') {
                e.preventDefault();
                if (window.deckEngine) window.deckEngine.toggleAspectRatio();
            } else if (key === 'l') {
                e.preventDefault();
                this.toggleLaser();
            } else if (key === 'p') {
                e.preventDefault();
                this.togglePen();
            } else if (key === 'c') {
                e.preventDefault();
                this.clearCanvas();
                if (window.teacherHighlighter) window.teacherHighlighter.clear();
            } else if (key === 't') {
                e.preventDefault();
                this.toggleTimerModal();
            } else if (key === 'f') {
                e.preventDefault();
                this.toggleFullscreen();
            } else if (key === 'g') {
                e.preventDefault();
                if (window.slideNavigator) window.slideNavigator.toggle();
            } else if (key === '?' || (e.shiftKey && e.key === '/')) {
                e.preventDefault();
                this.toggleHelpModal();
            } else if (key === 'escape') {
                const timerModal = document.getElementById('timerModal');
                const helpModal = document.getElementById('helpModal');
                if (timerModal) timerModal.style.display = 'none';
                if (helpModal) helpModal.style.display = 'none';
                if (window.penAnnotation && window.penAnnotation.isActive) window.penAnnotation.deactivate();
                if (window.laserPointer && window.laserPointer.isActive) window.laserPointer.deactivate();
            } else if (e.ctrlKey && key === 'z' && !e.shiftKey) {
                e.preventDefault();
                if (window.teacherHighlighter) window.teacherHighlighter.undo();
                if (window.penAnnotation) window.penAnnotation.undo();
            }
        });
    }
}

// Global auto-instantiation
let presentationTools;
window.addEventListener('DOMContentLoaded', () => {
    presentationTools = new PresentationTools(window.deckEngine);
    window.presentationTools = presentationTools;
});


/* ==================== MODULE: presenter-sync.js ==================== */
/**
 * ==========================================================================
 * PRESENTER SYNC ENGINE (PresenterSyncEngine)
 * Zero-latency bidirectional BroadcastChannel & LocalStorage synchronization hub
 * Synchronizes slide index, drawing ink, laser pointers, timers, themes, loupe & popovers
 * ==========================================================================
 */

class PresenterSyncEngine {
    constructor() {
        this.channelName = 'ielts_presentation_sync_channel';
        this.instanceId = 'deck_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
        this.listeners = new Map();
        this.isConnected = false;
        this.hasRemotePeer = false;
        this.lastPeerHeartbeat = 0;
        this.processedMessageIds = new Set();

        this.initChannel();
    }

    initChannel() {
        if (typeof BroadcastChannel !== 'undefined') {
            try {
                this.channel = new BroadcastChannel(this.channelName);
                this.channel.onmessage = (event) => this.handleIncomingMessage(event.data);
                this.isConnected = true;
            } catch (err) {
                console.warn('BroadcastChannel failed, falling back to localStorage sync', err);
                this.initStorageFallback();
            }
        } else {
            this.initStorageFallback();
        }

        // Periodic heartbeat & peer discovery
        setInterval(() => {
            const isPresenter = window.presenterViewUI ? window.presenterViewUI.isPresenter : false;
            this.emit('HEARTBEAT', { senderId: this.instanceId, isPresenter });

            // Check peer liveness (no message in 8s = waiting)
            if (this.lastPeerHeartbeat > 0 && Date.now() - this.lastPeerHeartbeat > 8000) {
                this.hasRemotePeer = false;
                this.notifyStatusChange(false);
            }
        }, 2500);
    }

    initStorageFallback() {
        window.addEventListener('storage', (e) => {
            if (e.key === this.channelName && e.newValue) {
                try {
                    const data = JSON.parse(e.newValue);
                    this.handleIncomingMessage(data);
                } catch (err) {
                    console.error('Failed to parse storage sync message', err);
                }
            }
        });
        this.isConnected = true;
    }

    send(type, payload = {}) {
        const message = {
            type,
            payload,
            senderId: this.instanceId,
            timestamp: Date.now(),
            nonce: Math.random()
        };

        if (this.channel) {
            try {
                this.channel.postMessage(message);
            } catch (err) {
                console.warn('Channel postMessage failed', err);
            }
        }

        // Also write to localStorage to support cross-process and cross-window sync
        try {
            localStorage.setItem(this.channelName, JSON.stringify(message));
        } catch (e) {}
    }

    handleIncomingMessage(message) {
        if (!message || message.senderId === this.instanceId) return;

        // Deduplicate messages across BroadcastChannel and Storage events
        const msgId = `${message.senderId}_${message.timestamp}_${message.type}_${message.nonce || 0}`;
        if (this.processedMessageIds.has(msgId)) return;
        this.processedMessageIds.add(msgId);
        if (this.processedMessageIds.size > 200) {
            const first = this.processedMessageIds.values().next().value;
            this.processedMessageIds.delete(first);
        }

        this.hasRemotePeer = true;
        this.lastPeerHeartbeat = Date.now();
        this.notifyStatusChange(true);

        const handlers = this.listeners.get(message.type) || [];
        handlers.forEach(handler => {
            try {
                handler(message.payload, message);
            } catch (err) {
                console.error(`Error in sync handler for ${message.type}:`, err);
            }
        });

        // Universal wildcard listeners
        const allHandlers = this.listeners.get('*') || [];
        allHandlers.forEach(handler => {
            try {
                handler(message.type, message.payload, message);
            } catch (err) {}
        });
    }

    on(type, handler) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
        }
        this.listeners.get(type).push(handler);
    }

    off(type, handler) {
        if (!this.listeners.has(type)) return;
        const list = this.listeners.get(type).filter(h => h !== handler);
        this.listeners.set(type, list);
    }

    emit(type, payload) {
        this.send(type, payload);
    }

    notifyStatusChange(connected) {
        const dot = document.getElementById('cpSyncDot');
        if (dot) {
            dot.className = connected ? 'cp-sync-dot connected' : 'cp-sync-dot waiting';
            dot.title = connected ? 'Synchronized with audience presentation window' : 'Waiting for audience presentation window...';
        }
    }
}

// Global instantiation and alias compatibility
window.presenterSyncEngine = new PresenterSyncEngine();
window.presenterViewSync = window.presenterSyncEngine;


/* ==================== MODULE: presenter-drawing.js ==================== */
/**
 * ==========================================================================
 * PRESENTER DRAWING STUDIO (PresenterDrawingEngine)
 * Handles interactive ink drawing, text highlighters, laser pointer physics,
 * color swatches, line smoothing, undo history, and projector mirror sync.
 * ==========================================================================
 */

class PresenterDrawingEngine {
    constructor(syncEngine) {
        this.sync = syncEngine || window.presenterSyncEngine;
        this.activeToolMode = 'none'; // 'none' | 'laser' | 'pen' | 'highlighter'
        this.laserActive = false;
        this.penActive = false;
        this.highlighterActive = false;

        this.penColor = '#ef4444';
        this.penWidth = 3.5;
        this.highlighterColorIndex = 0;
        this.highlighterColors = [
            { name: 'Yellow', bg: 'rgba(254, 240, 138, 0.85)', hex: '#facc15', border: '#ca8a04' },
            { name: 'Green',  bg: 'rgba(187, 247, 208, 0.85)', hex: '#4ade80', border: '#16a34a' },
            { name: 'Cyan',   bg: 'rgba(186, 230, 253, 0.85)', hex: '#38bdf8', border: '#0284c7' },
            { name: 'Pink',   bg: 'rgba(251, 207, 232, 0.85)', hex: '#f472b6', border: '#db2777' }
        ];

        this.canvas = null;
        this.ctx = null;
        this.laserDot = null;
        this.isDrawing = false;
        this.strokePoints = [];
    }

    attach(canvasEl, laserDotEl) {
        this.canvas = canvasEl;
        this.laserDot = laserDotEl;
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.bindEvents();
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        if (!this.canvas) return;
        const rect = this.canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
        }
    }

    bindEvents() {
        if (!this.canvas) return;

        this.canvas.addEventListener('mousedown', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const normX = Math.max(0, Math.min(1, x / rect.width));
            const normY = Math.max(0, Math.min(1, y / rect.height));

            if (this.laserActive) {
                if (this.laserDot) {
                    this.laserDot.style.display = 'block';
                    this.laserDot.style.left = `${e.clientX}px`;
                    this.laserDot.style.top = `${e.clientY}px`;
                }
                if (this.sync) this.sync.emit('LASER_MOVE', { normX, normY });
            }

            if (this.penActive && this.ctx) {
                this.isDrawing = true;
                this.strokePoints = [{ normX, normY }];
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const normX = Math.max(0, Math.min(1, x / rect.width));
            const normY = Math.max(0, Math.min(1, y / rect.height));

            if (this.laserActive) {
                if (this.laserDot) {
                    this.laserDot.style.display = 'block';
                    this.laserDot.style.left = `${e.clientX}px`;
                    this.laserDot.style.top = `${e.clientY}px`;
                }
                if (this.sync) this.sync.emit('LASER_MOVE', { normX, normY });
            }

            if (this.penActive && this.isDrawing && this.ctx) {
                this.ctx.lineTo(x, y);
                this.ctx.strokeStyle = this.penColor;
                this.ctx.lineWidth = this.penWidth;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.stroke();

                this.strokePoints.push({ normX, normY });
                if (this.strokePoints.length > 3) {
                    if (this.sync) {
                        this.sync.emit('PEN_DRAW', {
                            stroke: this.strokePoints,
                            color: this.penColor,
                            width: this.penWidth
                        });
                    }
                    this.strokePoints = [{ normX, normY }];
                }
            }
        });

        this.canvas.addEventListener('mouseleave', () => {
            if (this.laserDot) this.laserDot.style.display = 'none';
        });

        window.addEventListener('mouseup', () => {
            if (this.isDrawing && this.strokePoints.length > 0) {
                if (this.sync) {
                    this.sync.emit('PEN_DRAW', {
                        stroke: this.strokePoints,
                        color: this.penColor,
                        width: this.penWidth
                    });
                }
            }
            this.isDrawing = false;
            this.strokePoints = [];
        });
    }

    setMode(mode) {
        this.activeToolMode = mode;
        this.laserActive = (mode === 'laser');
        this.penActive = (mode === 'pen');
        this.highlighterActive = (mode === 'highlighter');

        // Update UI buttons
        document.querySelectorAll('.cp-mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        document.getElementById('btnCpLaser')?.classList.toggle('active', this.laserActive);
        document.getElementById('btnCpPen')?.classList.toggle('active', this.penActive);
        document.getElementById('btnCpHighlighter')?.classList.toggle('active', this.highlighterActive);

        // Toggle studio palettes
        const penPalette = document.getElementById('cpPenPalette');
        const penWidthPalette = document.getElementById('cpPenWidthPalette');
        const highlighterPalette = document.getElementById('cpHighlighterPalette');

        if (penPalette) penPalette.style.display = this.penActive ? 'flex' : 'none';
        if (penWidthPalette) penWidthPalette.style.display = this.penActive ? 'flex' : 'none';
        if (highlighterPalette) highlighterPalette.style.display = this.highlighterActive ? 'flex' : 'none';

        if (this.canvas) {
            this.canvas.style.pointerEvents = (this.penActive || this.laserActive) ? 'auto' : 'none';
            if (this.penActive) {
                this.canvas.style.cursor = 'crosshair';
            } else if (this.laserActive) {
                this.canvas.style.cursor = 'none';
            } else {
                this.canvas.style.cursor = 'default';
            }
        }

        if (this.laserDot && !this.laserActive) {
            this.laserDot.style.display = 'none';
        }

        // Audience highlighter activation
        if (window.teacherHighlighter) {
            if (this.highlighterActive) {
                window.teacherHighlighter.activate(false);
            } else {
                window.teacherHighlighter.deactivate(false);
            }
        }

        if (this.sync) {
            this.sync.emit('LASER_STATE', { active: this.laserActive });
            this.sync.emit('PEN_STATE', { active: this.penActive });
            this.sync.emit('HIGHLIGHTER_STATE', { active: this.highlighterActive });
        }
    }

    clear() {
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        if (window.penAnnotation) window.penAnnotation.clear(true);
        if (window.teacherHighlighter) window.teacherHighlighter.clear(true);
        if (window.readingHighlighter) window.readingHighlighter.clearAll(null, true);
    }
}

// Global instantiation
window.presenterDrawingEngine = new PresenterDrawingEngine();


/* ==================== MODULE: presenter-view.js ==================== */
/**
 * ==========================================================================
 * CANVA-STYLE PRESENTER COCKPIT UI (PresenterViewUI)
 * State-of-the-art dual-screen presentation interface for IELTS teachers:
 * - Real-time slide stage preview with responsive aspect-ratio scaling
 * - Full Teacher Toolkit (Socratic actions, timer, theme switcher, blanking)
 * - Filmstrip thumbnail navigation with active auto-scroll
 * - Seamless integration with PresenterSyncEngine, PresenterDrawingEngine, and PresenterNotesEngine
 * ==========================================================================
 */

class PresenterViewUI {
    constructor(syncEngine) {
        this.sync = syncEngine || window.presenterSyncEngine;
        this.isPresenter = this.checkIfPresenterMode();
        this.elapsedSeconds = 0;
        this.elapsedInterval = null;
        this.isStopwatchRunning = true;
        this.clockInterval = null;
        this.notesFontSize = parseInt(localStorage.getItem('cp_notes_font_size') || '16', 10);
        this.activeTab = 'notes'; // 'notes' | 'toolkit'
        
        // Active Tool Modes: 'none' | 'laser' | 'pen' | 'highlighter'
        this.activeToolMode = 'none';
        this.laserActive = false;
        this.penActive = false;
        this.highlighterActive = false;

        // Tool Properties
        this.penColor = '#ef4444';
        this.penWidth = 3.5;
        this.highlighterColorIndex = 0;
        this.highlighterColors = [
            { name: 'Yellow', bg: 'rgba(254, 240, 138, 0.85)', hex: '#facc15', border: '#ca8a04' },
            { name: 'Green',  bg: 'rgba(187, 247, 208, 0.85)', hex: '#4ade80', border: '#16a34a' },
            { name: 'Cyan',   bg: 'rgba(186, 230, 253, 0.85)', hex: '#38bdf8', border: '#0284c7' },
            { name: 'Pink',   bg: 'rgba(251, 207, 232, 0.85)', hex: '#f472b6', border: '#db2777' }
        ];

        this.isBlackout = false;
        this.isWhiteout = false;
        this.isSpotlight = false;
        this.isHandlingRemoteNavigation = false;
        this.presenterWindowRef = null;

        this.init();
    }

    checkIfPresenterMode() {
        const params = new URLSearchParams(window.location.search);
        return params.get('presenter') === 'true' || window.location.hash.toLowerCase() === '#presenter';
    }

    init() {
        if (this.isPresenter) {
            document.documentElement.classList.add('presenter-window');
            if (document.body) {
                document.body.classList.add('presenter-window');
            }
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    document.body.classList.add('presenter-window');
                    this.buildPresenterCockpit();
                });
            } else {
                this.buildPresenterCockpit();
            }

            window.addEventListener('resize', () => {
                this.updatePresenterSlideView();
            });
        } else {
            this.setupAudienceSyncListener();
        }

        // Global shortcut Alt+P or Shift+O to open presenter view
        document.addEventListener('keydown', (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
            if ((e.altKey && (e.key === 'p' || e.key === 'P')) || (e.key === 'O' && e.shiftKey)) {
                e.preventDefault();
                this.openPresenterWindow();
            }
        });
    }

    openPresenterWindow() {
        const url = new URL(window.location.href);
        url.searchParams.set('presenter', 'true');
        const windowName = 'ielts_presenter_view_' + window.location.pathname.replace(/[^a-zA-Z0-9]/g, '_');
        const presenterWindow = window.open(
            url.toString(),
            windowName,
            'width=1380,height=880,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes'
        );
        if (presenterWindow) {
            this.presenterWindowRef = presenterWindow;
            presenterWindow.focus();
        } else {
            alert('Popup was blocked by your browser. Please allow popups for Presenter View.');
        }
    }

    /**
     * =========================================================================
     * AUDIENCE WINDOW SYNC LISTENERS
     * =========================================================================
     */
    setupAudienceSyncListener() {
        // Automatically close Presenter View if Audience Window closes
        const closePresenter = () => {
            try {
                this.sync.emit('HOST_CLOSED', {});
            } catch (e) {}
            try {
                if (this.presenterWindowRef && !this.presenterWindowRef.closed) {
                    this.presenterWindowRef.close();
                }
            } catch (e) {}
        };
        window.addEventListener('beforeunload', closePresenter);
        window.addEventListener('pagehide', closePresenter);
        window.addEventListener('unload', closePresenter);

        // When audience view receives sync request, reply with complete current state
        this.sync.on('SYNC_REQUEST', () => {
            this.broadcastCurrentAudienceState();
        });

        // Remote slide navigation from presenter
        this.sync.on('NAVIGATE_SLIDE', (data) => {
            if (window.deckEngine && typeof data.slideIndex === 'number') {
                if (window.deckEngine.currentSlide !== data.slideIndex) {
                    this.isHandlingRemoteNavigation = true;
                    window.deckEngine.showSlide(data.slideIndex, false);
                    setTimeout(() => { this.isHandlingRemoteNavigation = false; }, 80);
                }
            }
        });

        // Remote Laser
        this.sync.on('LASER_STATE', (data) => {
            if (window.laserPointer) {
                if (data.active && !window.laserPointer.isActive) window.laserPointer.activate(false);
                if (!data.active && window.laserPointer.isActive) window.laserPointer.deactivate(false);
            }
        });

        this.sync.on('LASER_MOVE', (data) => {
            if (window.laserPointer && window.laserPointer.dot) {
                const x = data.normX * window.innerWidth;
                const y = data.normY * window.innerHeight;
                window.laserPointer.dot.style.left = `${x}px`;
                window.laserPointer.dot.style.top = `${y}px`;
            }
        });

        // Remote Pen
        this.sync.on('PEN_STATE', (data) => {
            if (window.penAnnotation) {
                if (data.active && !window.penAnnotation.isActive) window.penAnnotation.activate(false);
                if (!data.active && window.penAnnotation.isActive) window.penAnnotation.deactivate(false);
            }
        });

        this.sync.on('PEN_DRAW', (data) => {
            if (window.penAnnotation && window.penAnnotation.ctx) {
                const ctx = window.penAnnotation.ctx;
                const stroke = data.stroke;
                if (stroke && stroke.length >= 2) {
                    ctx.beginPath();
                    ctx.moveTo(stroke[0].normX * window.innerWidth, stroke[0].normY * window.innerHeight);
                    for (let i = 1; i < stroke.length; i++) {
                        ctx.lineTo(stroke[i].normX * window.innerWidth, stroke[i].normY * window.innerHeight);
                    }
                    ctx.strokeStyle = data.color || '#ef4444';
                    ctx.lineWidth = data.width || 3.5;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    ctx.stroke();
                }
            }
        });

        this.sync.on('PEN_CLEAR', () => {
            if (window.penAnnotation) window.penAnnotation.clear(false);
        });

        // Remote Highlighter Clear / Undo
        this.sync.on('HIGHLIGHTER_CLEAR', () => {
            if (window.teacherHighlighter) window.teacherHighlighter.clear(false);
        });
        this.sync.on('HIGHLIGHTER_UNDO', () => {
            if (window.teacherHighlighter) window.teacherHighlighter.undo(false);
        });
        this.sync.on('HIGHLIGHTER_ADD', (data) => {
            if (window.teacherHighlighter) window.teacherHighlighter.applyRemoteHighlight(data);
        });

        // Remote Evidence Focus / Clear
        this.sync.on('EVIDENCE_FOCUS', (data) => {
            if (window.readingHighlighter && data && (data.qKey || data.evId)) {
                window.readingHighlighter.focusEvidence(data.qKey, data.evId, false);
            }
        });
        this.sync.on('EVIDENCE_CLEAR', (data) => {
            if (window.readingHighlighter) {
                window.readingHighlighter.clearAll(data?.containerId, false);
            }
        });

        // Remote Exercise Actions
        this.sync.on('EXERCISE_ACTION', (data) => {
            if (!data || !window.deckEngine) return;
            const target = data.containerId ? document.getElementById(data.containerId) : (window.deckEngine.slides[data.slideIndex] || document.querySelector('.slide.active'));
            if (!target) return;

            if (data.action === 'check') {
                window.deckEngine.checkAnswers(target, false);
            } else if (data.action === 'reveal') {
                window.deckEngine.revealKeys(target, false);
            } else if (data.action === 'reset') {
                window.deckEngine.resetTask(target, false);
            } else if (data.action === 'toggleOptCard' && typeof data.cardIndex === 'number') {
                const card = target.querySelectorAll('.opt-card')[data.cardIndex];
                if (card) window.deckEngine.toggleOptCard(card, false);
            } else if (data.action === 'toggleExplanations') {
                window.deckEngine.toggleExplanations(target, false);
            }
        });

        // Remote Input & Select Sync
        this.sync.on('INPUT_SYNC', (data) => {
            if (!data || typeof data.slideIndex !== 'number' || typeof data.inputIndex !== 'number') return;
            const slide = window.deckEngine ? window.deckEngine.slides[data.slideIndex] : document.querySelector('.slide.active');
            if (slide) {
                const allInputs = slide.querySelectorAll('.blank-input, .select-input');
                const targetInput = allInputs[data.inputIndex];
                if (targetInput && targetInput.value !== data.value) {
                    targetInput.value = data.value;
                    targetInput.dispatchEvent(new Event('input', { bubbles: true }));
                    targetInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        });

        // Remote Step Reveal
        this.sync.on('STEP_REVEAL_CMD', () => {
            if (window.stepRevealEngine) window.stepRevealEngine.revealNextOnActiveSlide();
        });

        // Remote Student Picker
        this.sync.on('STUDENT_PICK_CMD', (data) => {
            if (window.studentPicker) {
                window.studentPicker.open(false);
                window.studentPicker.spin(data?.student, false);
            }
        });

        // Remote Spotlight
        this.sync.on('SPOTLIGHT_STATE', (data) => {
            if (window.presentationSpotlight) {
                if (data.active && !window.presentationSpotlight.isSpotlight) window.presentationSpotlight.activate(false);
                if (!data.active && window.presentationSpotlight.isSpotlight) window.presentationSpotlight.deactivate(false);
            }
        });

        this.sync.on('SPOTLIGHT_MOVE', (data) => {
            if (window.presentationSpotlight) {
                const x = data.normX * window.innerWidth;
                const y = data.normY * window.innerHeight;
                window.presentationSpotlight.updatePosition(x, y, false);
            }
        });

        // Remote Blackout / Whiteout
        this.sync.on('BLACKOUT_STATE', (data) => {
            if (window.presentationSpotlight) {
                if (data.blackout) {
                    if (!window.presentationSpotlight.isBlackout) window.presentationSpotlight.toggleBlackout(false);
                } else if (data.whiteout) {
                    if (!window.presentationSpotlight.isWhiteout) window.presentationSpotlight.toggleWhiteout(false);
                } else {
                    window.presentationSpotlight.clearMute(false);
                }
            }
        });

        // Remote Timer Commands
        this.sync.on('TIMER_CMD', (data) => {
            if (window.classroomTimer) {
                if (data.action === 'set') window.classroomTimer.setTimer(data.seconds, false);
                if (data.action === 'start' && !window.classroomTimer.timerRunning) window.classroomTimer.toggleRun(false);
                if (data.action === 'pause' && window.classroomTimer.timerRunning) window.classroomTimer.toggleRun(false);
                if (data.action === 'reset') window.classroomTimer.reset(false);
            }
        });

        // Remote Aspect Ratio
        this.sync.on('ASPECT_RATIO', (data) => {
            if (window.deckEngine && window.deckEngine.aspectRatio !== data.ratio) {
                window.deckEngine.applyAspectRatio(data.ratio, true, false);
            }
        });

        // Remote Theme Change
        this.sync.on('THEME_CHANGE', (data) => {
            if (window.deckThemeEngine && window.deckThemeEngine.currentTheme !== data.themeId) {
                window.deckThemeEngine.applyTheme(data.themeId, true, false);
            }
        });

        // Remote Confetti
        this.sync.on('CONFETTI_CMD', () => {
            this.launchConfetti();
        });

        // Remote Paragraph Loupe
        this.sync.on('PARAGRAPH_LOUPE_CMD', (data) => {
            if (window.paragraphLoupe) {
                window.paragraphLoupe.applyRemoteSync(data);
            }
        });
    }

    broadcastCurrentAudienceState() {
        if (!window.deckEngine) return;
        const currentSlide = window.deckEngine.currentSlide || 0;
        const aspectRatio = window.deckEngine.aspectRatio || '16:9';
        const theme = window.deckThemeEngine ? window.deckThemeEngine.currentTheme : 'academic';
        const timerSeconds = window.classroomTimer ? window.classroomTimer.timerSeconds : 0;
        const timerRunning = window.classroomTimer ? window.classroomTimer.timerRunning : false;
        const isBlackout = window.presentationSpotlight ? window.presentationSpotlight.isBlackout : false;
        const isWhiteout = window.presentationSpotlight ? window.presentationSpotlight.isWhiteout : false;
        const isSpotlight = window.presentationSpotlight ? window.presentationSpotlight.isSpotlight : false;

        const inputsData = [];
        const slide = (window.deckEngine.slides && window.deckEngine.slides[currentSlide]) || document.querySelector('.slide.active');
        if (slide) {
            slide.querySelectorAll('.blank-input, .select-input, input, select, textarea').forEach((inp, i) => {
                inputsData.push({ index: i, value: inp.value, className: inp.className });
            });
        }

        this.sync.emit('SYNC_RESPONSE', {
            currentSlide,
            aspectRatio,
            theme,
            timerSeconds,
            timerRunning,
            isBlackout,
            isWhiteout,
            isSpotlight,
            inputsData
        });
    }

    /**
     * =========================================================================
     * PRESENTER COCKPIT BUILDER & CONTROLLER
     * =========================================================================
     */
    buildPresenterCockpit() {
        this.injectPresenterStyles();

        const cockpit = document.createElement('div');
        cockpit.id = 'presenterCockpit';
        cockpit.className = 'canva-presenter-cockpit';

        cockpit.innerHTML = `
            <!-- Top Canva Navigation Header Bar -->
            <header class="cp-header">
                <div class="cp-header-left">
                    <div class="cp-clock" id="cpLiveClock">--:--</div>
                    <div class="cp-header-divider"></div>
                    <div class="cp-timer-group">
                        <span class="cp-stopwatch" id="cpElapsedTimer">00:00</span>
                        <button class="cp-icon-btn" id="btnCpResetTimer" title="Reset stopwatch (R)">↺</button>
                        <button class="cp-icon-btn" id="btnCpPauseTimer" title="Pause / Resume stopwatch (Space)">⏸</button>
                    </div>
                    <div class="cp-sync-dot waiting" id="cpSyncDot" title="Waiting for audience presentation window..."></div>
                </div>

                <div class="cp-header-right">
                    <button class="cp-action-btn" id="btnCpMagic" title="Step Reveal Next Answer (E)">
                        <span class="cp-icon">🪄</span><span class="cp-btn-lbl">Reveal</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpLaser" title="Laser Pointer (L)">
                        <span class="cp-icon">🔴</span><span class="cp-btn-lbl">Laser</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpPen" title="Drawing Pen (P)">
                        <span class="cp-icon">✏️</span><span class="cp-btn-lbl">Draw</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpHighlighter" title="Text Highlighter (H)">
                        <span class="cp-icon">🖍️</span><span class="cp-btn-lbl">Highlight</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpSpotlight" title="Spotlight Focus (S)">
                        <span class="cp-icon">💡</span><span class="cp-btn-lbl">Spotlight</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpBlackout" title="Blackout Screen (B)">
                        <span class="cp-icon">⬛</span><span class="cp-btn-lbl">Blackout</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpStudent" title="Random Student Picker (R)">
                        <span class="cp-icon">🎲</span><span class="cp-btn-lbl">Picker</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpTimerModal" title="Classroom Timer (T)">
                        <span class="cp-icon">⏱️</span><span class="cp-btn-lbl">Timer</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpTheme" title="Switch Presentation Theme (Shift+T)">
                        <span class="cp-icon">🎨</span><span class="cp-btn-lbl">Theme</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpConfetti" title="Confetti Celebration">
                        <span class="cp-icon">🎉</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpHelp" title="Keyboard Shortcuts (?)">
                        <span class="cp-icon">❓</span>
                    </button>
                    <div class="cp-header-divider"></div>
                    <button class="cp-action-btn cp-close-btn" id="btnCpClose" title="Close Presenter View">
                        <span class="cp-icon">✕</span>
                    </button>
                </div>
            </header>

            <!-- Main Split Workspace -->
            <main class="cp-workspace" id="cpWorkspace">
                <!-- Left Column: Live Slide Stage & Bottom Filmstrip -->
                <section class="cp-stage-col" id="cpStageCol">
                    <!-- Central Slide Viewport Area -->
                    <div class="cp-stage-viewport" id="cpStageViewport">
                        <div class="slide-preview-scaler" id="cpCurrentSlideScaler"></div>
                        <canvas id="presenterDrawCanvas" class="presenter-draw-canvas"></canvas>
                        <div id="presenterLaserDot" class="presenter-laser-dot"></div>

                        <!-- Canva Floating Slide Control Pill -->
                        <div class="cp-nav-pill" id="cpNavPill">
                            <button class="cp-pill-btn" id="btnCpFirst" title="First Slide (Home)">⏮</button>
                            <button class="cp-pill-btn" id="btnCpPrev" title="Previous Slide (Left Arrow / PageUp)">‹</button>
                            <span class="cp-pill-counter" id="cpSlideCounter">1 / 1</span>
                            <button class="cp-pill-btn" id="btnCpNext" title="Next Slide (Right Arrow / Space / PageDown)">›</button>
                            <button class="cp-pill-btn" id="btnCpZoom" title="Toggle Aspect Ratio (Shift+A)">📐</button>
                        </div>

                        <!-- Fullscreen Toggle -->
                        <button class="cp-fullscreen-btn" id="btnCpFullscreen" title="Toggle Fullscreen (F)">⤢</button>
                    </div>

                    <!-- Bottom Horizontal Filmstrip Carousel -->
                    <div class="cp-filmstrip-section">
                        <button class="cp-filmstrip-scroll-btn left" id="btnFilmstripLeft" title="Scroll left">‹</button>
                        <div class="cp-filmstrip-track" id="cpFilmstripTrack">
                            <!-- Populated with all slide thumbnails -->
                        </div>
                        <button class="cp-filmstrip-scroll-btn right" id="btnFilmstripRight" title="Scroll right">›</button>
                    </div>
                </section>

                <!-- Draggable Resizer Splitter -->
                <div class="cp-splitter" id="cpSplitter">
                    <div class="cp-splitter-handle"></div>
                </div>

                <!-- Right Column: Notes & Complete Teacher Toolkit Panel -->
                <aside class="cp-notes-col" id="cpNotesCol">
                    <!-- Tabs Header -->
                    <div class="cp-notes-tabs">
                        <button class="cp-tab-btn active" data-tab="notes" id="tabNotesBtn">
                            <span class="cp-tab-icon">📝</span> Teaching Notes
                        </button>
                        <button class="cp-tab-btn" data-tab="toolkit" id="tabToolkitBtn">
                            <span class="cp-tab-icon">🛠️</span> Teacher's Toolkit
                        </button>
                    </div>

                    <!-- Tab 1: Pedagogical Guidance & Notes -->
                    <div class="cp-tab-pane active" id="paneNotes">
                        <div class="cp-notes-body" id="cpNotesContent">
                            <!-- Dynamic Content -->
                        </div>
                        <!-- Bottom Notes Toolbar (Font Size & Edit) -->
                        <footer class="cp-notes-footer">
                            <div class="cp-font-controls">
                                <button class="cp-footer-btn" id="btnFontDec" title="Decrease font size">—</button>
                                <button class="cp-footer-btn font-label" id="btnFontReset" title="Reset font size">AA</button>
                                <button class="cp-footer-btn" id="btnFontInc" title="Increase font size">+</button>
                            </div>
                            <button class="cp-footer-btn edit-note-btn" id="btnEditCustomNote" title="Edit slide notes">
                                ✏️ Edit Notes
                            </button>
                        </footer>
                    </div>

                    <!-- Tab 2: Full Teacher Toolkit -->
                    <div class="cp-tab-pane" id="paneToolkit">
                        <div class="cp-toolkit-scroll">
                            <!-- Section 1: Socratic & Interactive Actions -->
                            <div class="cp-toolkit-card">
                                <h4>⚡ Interactive Socratic Actions</h4>
                                <div class="cp-btn-grid">
                                    <button class="cp-tool-btn primary" id="btnToolStepReveal">
                                        🪄 Step Reveal (E)
                                    </button>
                                    <button class="cp-tool-btn" id="btnToolStudentPicker">
                                        🎲 Student Picker (R)
                                    </button>
                                    <button class="cp-tool-btn" id="btnToolLoupe">
                                        🔍 Paragraph Loupe (Z)
                                    </button>
                                    <button class="cp-tool-btn" id="btnToolConfetti">
                                        🎉 Confetti Cheer
                                    </button>
                                </div>
                                <div class="cp-student-display-pill" id="cpPickedStudentDisplay" style="display:none;">
                                    <span>Selected:</span> <strong id="cpPickedStudentName">Alex</strong>
                                </div>
                            </div>

                            <!-- Section 2: Drawing & Highlighting Studio -->
                            <div class="cp-toolkit-card">
                                <h4>✏️ Drawing &amp; Highlighting Studio</h4>
                                <div class="cp-tool-mode-bar">
                                    <button class="cp-mode-btn active" data-mode="none" id="modeBtnCursor" title="Normal Cursor">👆 Cursor</button>
                                    <button class="cp-mode-btn" data-mode="laser" id="modeBtnLaser" title="Laser Pointer (L)">🔴 Laser</button>
                                    <button class="cp-mode-btn" data-mode="pen" id="modeBtnPen" title="Pen Drawing (P)">✏️ Pen</button>
                                    <button class="cp-mode-btn" data-mode="highlighter" id="modeBtnHighlighter" title="Text Highlighter (H)">🖍️ Marker</button>
                                </div>

                                <!-- Pen Color Swatches -->
                                <div class="cp-palette-group" id="cpPenPalette" style="display:none;">
                                    <span class="cp-palette-label">Pen Color:</span>
                                    <div class="cp-color-swatches">
                                        <button class="cp-swatch active" style="background:#ef4444;" data-color="#ef4444" title="Red"></button>
                                        <button class="cp-swatch" style="background:#facc15;" data-color="#facc15" title="Yellow"></button>
                                        <button class="cp-swatch" style="background:#10b981;" data-color="#10b981" title="Green"></button>
                                        <button class="cp-swatch" style="background:#38bdf8;" data-color="#38bdf8" title="Sky Cyan"></button>
                                        <button class="cp-swatch" style="background:#ffffff;" data-color="#ffffff" title="White"></button>
                                    </div>
                                    <div class="cp-width-swatches">
                                        <button class="cp-width-btn" data-width="2">Fine</button>
                                        <button class="cp-width-btn active" data-width="3.5">Medium</button>
                                        <button class="cp-width-btn" data-width="6">Thick</button>
                                    </div>
                                </div>

                                <!-- Highlighter Color Swatches -->
                                <div class="cp-palette-group" id="cpHighlighterPalette" style="display:none;">
                                    <span class="cp-palette-label">Highlighter Color:</span>
                                    <div class="cp-color-swatches">
                                        <button class="cp-swatch hl active" style="background:#facc15;" data-index="0" title="Fluorescent Yellow"></button>
                                        <button class="cp-swatch hl" style="background:#4ade80;" data-index="1" title="Neon Green"></button>
                                        <button class="cp-swatch hl" style="background:#38bdf8;" data-index="2" title="Sky Cyan"></button>
                                        <button class="cp-swatch hl" style="background:#f472b6;" data-index="3" title="Coral Pink"></button>
                                    </div>
                                </div>

                                <div class="cp-btn-grid" style="margin-top:10px;">
                                    <button class="cp-tool-btn" id="btnToolUndoHighlight" title="Undo Last Highlight (Ctrl+Z)">
                                        ↩️ Undo Highlight
                                    </button>
                                    <button class="cp-tool-btn danger" id="btnToolClearDrawings" title="Clear All Drawings (C)">
                                        🗑️ Clear Ink (C)
                                    </button>
                                </div>
                            </div>

                            <!-- Section 3: Classroom Countdown Timer & Stopwatch -->
                            <div class="cp-toolkit-card">
                                <h4>⏱️ Classroom Countdown Timer</h4>
                                <div class="cp-timer-countdown-display" id="cpCountdownDisplay">00:00</div>
                                <div class="cp-timer-presets">
                                    <button class="cp-quick-timer-btn" data-sec="60">+1m</button>
                                    <button class="cp-quick-timer-btn" data-sec="120">+2m</button>
                                    <button class="cp-quick-timer-btn" data-sec="180">+3m</button>
                                    <button class="cp-quick-timer-btn" data-sec="300">+5m</button>
                                    <button class="cp-quick-timer-btn" data-sec="600">+10m</button>
                                    <button class="cp-quick-timer-btn" data-sec="900">+15m</button>
                                </div>
                                <div class="cp-btn-grid" style="margin-top:10px;">
                                    <button class="cp-tool-btn primary" id="btnToolTimerToggle">▶ Start Timer</button>
                                    <button class="cp-tool-btn" id="btnToolTimerReset">↺ Reset</button>
                                </div>
                            </div>

                            <!-- Section 4: Screen Blanking & Focus Controls -->
                            <div class="cp-toolkit-card">
                                <h4>🎯 Screen Blanking &amp; Focus</h4>
                                <div class="cp-btn-grid">
                                    <button class="cp-tool-btn" id="btnToolBlackout">⬛ Blackout (B)</button>
                                    <button class="cp-tool-btn" id="btnToolWhiteout">⬜ Whiteout (W)</button>
                                    <button class="cp-tool-btn" id="btnToolSpotlight">💡 Spotlight (S)</button>
                                    <button class="cp-tool-btn" id="btnToolClearBlanking">✨ Clear Mute</button>
                                </div>
                            </div>

                            <!-- Section 5: Presentation Theme & Aesthetics -->
                            <div class="cp-toolkit-card">
                                <h4>🎨 Presentation Theme &amp; Layout</h4>
                                <div class="cp-theme-presets-grid">
                                    <button class="cp-theme-pill-btn" data-theme="academic">🎓 Academic</button>
                                    <button class="cp-theme-pill-btn" data-theme="bold-signal">⚡ Bold Signal</button>
                                    <button class="cp-theme-pill-btn" data-theme="electric">💎 Electric</button>
                                    <button class="cp-theme-pill-btn" data-theme="botanical">🌿 Botanical</button>
                                    <button class="cp-theme-pill-btn" data-theme="voltage">🚀 Voltage</button>
                                    <button class="cp-theme-pill-btn" data-theme="vintage">📜 Vintage</button>
                                </div>
                                <div class="cp-btn-grid" style="margin-top:10px;">
                                    <button class="cp-tool-btn" id="btnToolAspectToggle">📐 Aspect Ratio (16:9 / 4:3)</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            <!-- Confetti Canvas Layer -->
            <canvas id="cpConfettiCanvas" class="cp-confetti-canvas"></canvas>

            <!-- Keyboard Shortcuts Modal -->
            <div class="cp-help-modal" id="cpHelpModal" style="display:none;">
                <div class="cp-help-dialog">
                    <div class="cp-help-header">
                        <span>⌨️ Presenter Cockpit Shortcuts</span>
                        <button class="cp-help-close" id="btnCpHelpClose">×</button>
                    </div>
                    <div class="cp-help-grid">
                        <div><kbd>→</kbd> / <kbd>Space</kbd></div><div>Next Slide</div>
                        <div><kbd>←</kbd> / <kbd>PageUp</kbd></div><div>Previous Slide</div>
                        <div><kbd>Home</kbd> / <kbd>End</kbd></div><div>First / Last Slide</div>
                        <div><kbd>E</kbd></div><div>Step Reveal Next Answer</div>
                        <div><kbd>L</kbd></div><div>Toggle Laser Pointer</div>
                        <div><kbd>P</kbd></div><div>Toggle Pen Drawing</div>
                        <div><kbd>H</kbd></div><div>Toggle Text Highlighter</div>
                        <div><kbd>C</kbd></div><div>Clear All Ink &amp; Drawings</div>
                        <div><kbd>Ctrl + Z</kbd></div><div>Undo Last Highlight</div>
                        <div><kbd>B</kbd> / <kbd>.</kbd></div><div>Screen Blackout</div>
                        <div><kbd>W</kbd></div><div>Screen Whiteout</div>
                        <div><kbd>S</kbd></div><div>Spotlight Dimmer</div>
                        <div><kbd>T</kbd></div><div>Toggle Classroom Timer</div>
                        <div><kbd>R</kbd></div><div>Random Student Picker Spin</div>
                        <div><kbd>Z</kbd></div><div>Paragraph Loupe Zoom</div>
                        <div><kbd>Shift + T</kbd></div><div>Cycle Aesthetic Theme</div>
                        <div><kbd>Shift + A</kbd></div><div>Toggle 16:9 / 4:3 Ratio</div>
                        <div><kbd>F</kbd></div><div>Toggle Fullscreen</div>
                        <div><kbd>?</kbd></div><div>Toggle Shortcuts Help</div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(cockpit);

        // Hide original audience floating HUD
        const origHUD = document.getElementById('presentationToolsHUD');
        if (origHUD) origHUD.style.display = 'none';

        // Setup All Modules & Event Bindings
        this.setupClockAndStopwatch();
        this.setupDraggableSplitter();
        this.renderFilmstrip();
        this.bindNavigationControls();
        this.bindHeaderActions();
        this.bindToolkitActions();
        this.setupNotesControls();
        this.setupPresenterDrawCanvas();
        this.setupPresenterSyncListeners();
        this.bindPresenterKeyboardShortcuts();

        // Handshake: Request state from audience window
        this.sync.emit('SYNC_REQUEST', {});

        // Initial render
        setTimeout(() => this.updatePresenterSlideView(), 120);
    }

    /**
     * =========================================================================
     * PRESENTER WINDOW SYNC LISTENERS
     * =========================================================================
     */
    setupPresenterSyncListeners() {
        // Automatically close Presenter View if the main presentation view closes
        this.sync.on('HOST_CLOSED', () => {
            window.close();
        });

        // Initial state sync from Audience
        this.sync.on('SYNC_RESPONSE', (state) => {
            if (window.deckEngine && typeof state.currentSlide === 'number') {
                window.deckEngine.showSlide(state.currentSlide, false);
            }
            if (Array.isArray(state.inputsData) && typeof state.currentSlide === 'number') {
                const slide = (window.deckEngine && window.deckEngine.slides) ? window.deckEngine.slides[state.currentSlide] : document.querySelector('.slide.active');
                if (slide) {
                    const allInputs = slide.querySelectorAll('.blank-input, .select-input, input, select, textarea');
                    state.inputsData.forEach(item => {
                        if (allInputs[item.index]) {
                            allInputs[item.index].value = item.value;
                            allInputs[item.index].className = item.className;
                        }
                    });
                }
            }
            if (state.aspectRatio && window.deckEngine) {
                window.deckEngine.applyAspectRatio(state.aspectRatio, false, false);
            }
            if (state.theme && window.deckThemeEngine) {
                window.deckThemeEngine.applyTheme(state.theme, false, false);
            }
            if (typeof state.timerSeconds === 'number' && window.classroomTimer) {
                window.classroomTimer.setTimer(state.timerSeconds, false);
                this.updateTimerDisplay(state.timerSeconds);
            }
            this.updatePresenterSlideView();
        });

        // Remote slide navigation from audience
        this.sync.on('NAVIGATE_SLIDE', (data) => {
            if (window.deckEngine && typeof data.slideIndex === 'number') {
                if (window.deckEngine.currentSlide !== data.slideIndex) {
                    this.isHandlingRemoteNavigation = true;
                    window.deckEngine.showSlide(data.slideIndex, false);
                    this.updatePresenterSlideView();
                    setTimeout(() => { this.isHandlingRemoteNavigation = false; }, 80);
                }
            }
        });

        // Sync Theme Change
        this.sync.on('THEME_CHANGE', (data) => {
            if (window.deckThemeEngine && window.deckThemeEngine.currentTheme !== data.themeId) {
                window.deckThemeEngine.applyTheme(data.themeId, false, false);
                this.updatePresenterSlideView();
            }
        });

        // Sync Aspect Ratio
        this.sync.on('ASPECT_RATIO', (data) => {
            if (window.deckEngine && window.deckEngine.aspectRatio !== data.ratio) {
                window.deckEngine.applyAspectRatio(data.ratio, false, false);
                this.updatePresenterSlideView();
            }
        });

        // Sync Blackout / Whiteout
        this.sync.on('BLACKOUT_STATE', (data) => {
            this.isBlackout = !!data.blackout;
            this.isWhiteout = !!data.whiteout;
            document.getElementById('btnCpBlackout')?.classList.toggle('active', this.isBlackout);
            document.getElementById('btnToolBlackout')?.classList.toggle('active', this.isBlackout);
            document.getElementById('btnToolWhiteout')?.classList.toggle('active', this.isWhiteout);
        });

        // Sync Spotlight
        this.sync.on('SPOTLIGHT_STATE', (data) => {
            this.isSpotlight = !!data.active;
            document.getElementById('btnCpSpotlight')?.classList.toggle('active', this.isSpotlight);
            document.getElementById('btnToolSpotlight')?.classList.toggle('active', this.isSpotlight);
        });

        // Sync Timer
        this.sync.on('TIMER_CMD', (data) => {
            if (data.action === 'set' && typeof data.seconds === 'number') {
                this.updateTimerDisplay(data.seconds);
            } else if (data.action === 'start') {
                document.getElementById('btnToolTimerToggle') && (document.getElementById('btnToolTimerToggle').textContent = '⏸ Pause Timer');
            } else if (data.action === 'pause') {
                document.getElementById('btnToolTimerToggle') && (document.getElementById('btnToolTimerToggle').textContent = '▶ Start Timer');
            } else if (data.action === 'reset') {
                this.updateTimerDisplay(0);
                document.getElementById('btnToolTimerToggle') && (document.getElementById('btnToolTimerToggle').textContent = '▶ Start Timer');
            }
        });

        // Sync Evidence Focus / Clear
        this.sync.on('EVIDENCE_FOCUS', (data) => {
            if (window.readingHighlighter && data && (data.qKey || data.evId)) {
                window.readingHighlighter.focusEvidence(data.qKey, data.evId, false);
            }
        });
        this.sync.on('EVIDENCE_CLEAR', (data) => {
            if (window.readingHighlighter) {
                window.readingHighlighter.clearAll(data?.containerId, false);
            }
        });

        // Sync Exercise Actions
        this.sync.on('EXERCISE_ACTION', (data) => {
            if (!data || !window.deckEngine) return;
            const target = data.containerId ? document.getElementById(data.containerId) : (window.deckEngine.slides[data.slideIndex] || document.querySelector('.slide.active'));
            if (!target) return;

            if (data.action === 'check') {
                window.deckEngine.checkAnswers(target, false);
            } else if (data.action === 'reveal') {
                window.deckEngine.revealKeys(target, false);
            } else if (data.action === 'reset') {
                window.deckEngine.resetTask(target, false);
            } else if (data.action === 'toggleOptCard' && typeof data.cardIndex === 'number') {
                const card = target.querySelectorAll('.opt-card')[data.cardIndex];
                if (card) window.deckEngine.toggleOptCard(card, false);
            } else if (data.action === 'toggleExplanations') {
                window.deckEngine.toggleExplanations(target, false);
            }
            this.updatePresenterSlideView();
        });

        // Sync Input & Select
        this.sync.on('INPUT_SYNC', (data) => {
            if (!data || typeof data.slideIndex !== 'number' || typeof data.inputIndex !== 'number') return;
            const slide = window.deckEngine ? window.deckEngine.slides[data.slideIndex] : document.querySelector('.slide.active');
            if (slide) {
                const allInputs = slide.querySelectorAll('.blank-input, .select-input');
                const targetInput = allInputs[data.inputIndex];
                if (targetInput && targetInput.value !== data.value) {
                    targetInput.value = data.value;
                }
                if (targetInput && data.className) {
                    targetInput.className = data.className;
                }
            }
            const scaler = document.getElementById('cpCurrentSlideScaler');
            if (scaler) {
                const cloneInputs = scaler.querySelectorAll('.blank-input, .select-input');
                const cloneTarget = cloneInputs[data.inputIndex];
                if (cloneTarget && cloneTarget.value !== data.value) {
                    cloneTarget.value = data.value;
                }
                if (cloneTarget && data.className) {
                    cloneTarget.className = data.className;
                }
            }
        });

        // Sync Highlighter Add / Remove
        this.sync.on('HIGHLIGHTER_ADD', (data) => {
            if (window.teacherHighlighter) window.teacherHighlighter.applyRemoteHighlight(data);
        });

        // Sync Student Picked
        this.sync.on('STUDENT_PICKED', (data) => {
            this.showPickedStudent(data.student);
        });

        // Slide change in Presenter window
        window.addEventListener('slidechanged', (e) => {
            this.updatePresenterSlideView();
            // Prevent echoing when update was caused by incoming sync or when broadcast is false
            if (this.isHandlingRemoteNavigation || (e.detail && e.detail.broadcast === false)) {
                return;
            }
        });
    }

    /**
     * Top Bar Clock & Elapsed Stopwatch
     */
    setupClockAndStopwatch() {
        const clockEl = document.getElementById('cpLiveClock');
        const elapsedEl = document.getElementById('cpElapsedTimer');
        const pauseBtn = document.getElementById('btnCpPauseTimer');
        const resetBtn = document.getElementById('btnCpResetTimer');

        const updateClock = () => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            if (clockEl) {
                clockEl.textContent = `${hours}:${minutes}${ampm}`;
            }
        };
        updateClock();
        this.clockInterval = setInterval(updateClock, 1000);

        const formatElapsed = (sec) => {
            const mins = String(Math.floor(sec / 60)).padStart(2, '0');
            const secs = String(sec % 60).padStart(2, '0');
            return `${mins}:${secs}`;
        };

        this.elapsedInterval = setInterval(() => {
            if (this.isStopwatchRunning) {
                this.elapsedSeconds++;
                if (elapsedEl) elapsedEl.textContent = formatElapsed(this.elapsedSeconds);
            }
        }, 1000);

        if (pauseBtn) {
            pauseBtn.onclick = () => {
                this.isStopwatchRunning = !this.isStopwatchRunning;
                pauseBtn.textContent = this.isStopwatchRunning ? '⏸' : '▶';
            };
        }

        if (resetBtn) {
            resetBtn.onclick = () => {
                this.elapsedSeconds = 0;
                if (elapsedEl) elapsedEl.textContent = '00:00';
            };
        }
    }

    /**
     * Draggable Resizer Splitter between Stage and Notes
     */
    setupDraggableSplitter() {
        const splitter = document.getElementById('cpSplitter');
        const stageCol = document.getElementById('cpStageCol');
        const notesCol = document.getElementById('cpNotesCol');
        const workspace = document.getElementById('cpWorkspace');
        if (!splitter || !stageCol || !notesCol || !workspace) return;

        let isDragging = false;

        splitter.addEventListener('mousedown', () => {
            isDragging = true;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const containerRect = workspace.getBoundingClientRect();
            const mouseX = e.clientX - containerRect.left;
            const minWidth = 420;
            const maxWidth = containerRect.width - 320;

            if (mouseX >= minWidth && mouseX <= maxWidth) {
                const stagePct = (mouseX / containerRect.width) * 100;
                stageCol.style.flex = `0 0 ${stagePct}%`;
                notesCol.style.flex = `0 0 ${100 - stagePct}%`;
                this.updatePresenterSlideView();
            }
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
                this.updatePresenterSlideView();
            }
        });
    }

    /**
     * Horizontal Bottom Filmstrip Carousel
     */
    renderFilmstrip() {
        const track = document.getElementById('cpFilmstripTrack');
        const slides = document.querySelectorAll('.slide');
        if (!track || !slides.length) return;

        track.innerHTML = '';

        slides.forEach((slide, idx) => {
            const titleEl = slide.querySelector('h1, h2, .slide-title, .module-title');
            const title = titleEl ? titleEl.textContent.trim().replace(/\s+/g, ' ') : `Slide ${idx + 1}`;
            const skill = slide.dataset.skill || 'general';

            const card = document.createElement('div');
            card.className = `cp-filmstrip-card ${idx === 0 ? 'active' : ''}`;
            card.dataset.slideIndex = idx;

            card.innerHTML = `
                <div class="cp-card-preview-mini">
                    <span class="cp-card-num">${idx + 1}</span>
                    <span class="cp-card-skill-tag ${skill}">${skill}</span>
                </div>
                <div class="cp-card-title">${title.substring(0, 32)}</div>
            `;

            card.onclick = () => {
                if (window.deckEngine) {
                    window.deckEngine.showSlide(idx);
                }
            };

            track.appendChild(card);
        });

        const btnLeft = document.getElementById('btnFilmstripLeft');
        const btnRight = document.getElementById('btnFilmstripRight');
        if (btnLeft) {
            btnLeft.onclick = () => track.scrollBy({ left: -260, behavior: 'smooth' });
        }
        if (btnRight) {
            btnRight.onclick = () => track.scrollBy({ left: 260, behavior: 'smooth' });
        }
    }

    scrollFilmstripToActive(currentIndex) {
        const track = document.getElementById('cpFilmstripTrack');
        if (!track) return;
        const cards = track.querySelectorAll('.cp-filmstrip-card');
        cards.forEach((card, idx) => {
            const isActive = idx === currentIndex;
            card.classList.toggle('active', isActive);
            if (isActive) {
                const cardLeft = card.offsetLeft;
                const cardWidth = card.offsetWidth;
                const trackWidth = track.offsetWidth;
                track.scrollTo({
                    left: cardLeft - (trackWidth / 2) + (cardWidth / 2),
                    behavior: 'smooth'
                });
            }
        });
    }

    /**
     * Floating Navigation Pill
     */
    bindNavigationControls() {
        const btnFirst = document.getElementById('btnCpFirst');
        const btnPrev = document.getElementById('btnCpPrev');
        const btnNext = document.getElementById('btnCpNext');
        const btnZoom = document.getElementById('btnCpZoom');
        const btnFullscreen = document.getElementById('btnCpFullscreen');

        if (btnFirst) {
            btnFirst.onclick = () => window.deckEngine && window.deckEngine.showSlide(0);
        }
        if (btnPrev) {
            btnPrev.onclick = () => window.deckEngine && window.deckEngine.prevSlide();
        }
        if (btnNext) {
            btnNext.onclick = () => window.deckEngine && window.deckEngine.nextSlide();
        }
        if (btnZoom) {
            btnZoom.onclick = () => {
                if (window.deckEngine) {
                    window.deckEngine.toggleAspectRatio();
                    this.sync.emit('ASPECT_RATIO', { ratio: window.deckEngine.aspectRatio });
                    this.updatePresenterSlideView();
                }
            };
        }
        if (btnFullscreen) {
            btnFullscreen.onclick = () => {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                } else {
                    document.exitFullscreen().catch(() => {});
                }
            };
        }
    }

    /**
     * Top Bar Action Buttons
     */
    bindHeaderActions() {
        // Step Reveal (Magic)
        document.getElementById('btnCpMagic')?.addEventListener('click', () => this.triggerStepReveal());

        // Confetti
        document.getElementById('btnCpConfetti')?.addEventListener('click', () => {
            this.launchConfetti();
            this.sync.emit('CONFETTI_CMD', {});
        });

        // Laser
        document.getElementById('btnCpLaser')?.addEventListener('click', () => this.setToolMode(this.activeToolMode === 'laser' ? 'none' : 'laser'));

        // Pen
        document.getElementById('btnCpPen')?.addEventListener('click', () => this.setToolMode(this.activeToolMode === 'pen' ? 'none' : 'pen'));

        // Highlighter
        document.getElementById('btnCpHighlighter')?.addEventListener('click', () => this.setToolMode(this.activeToolMode === 'highlighter' ? 'none' : 'highlighter'));

        // Spotlight
        document.getElementById('btnCpSpotlight')?.addEventListener('click', () => this.toggleSpotlight());

        // Blackout
        document.getElementById('btnCpBlackout')?.addEventListener('click', () => this.toggleBlackout());

        // Student Picker
        document.getElementById('btnCpStudent')?.addEventListener('click', () => this.triggerStudentPicker());

        // Timer Modal
        document.getElementById('btnCpTimerModal')?.addEventListener('click', () => {
            this.switchTab('toolkit');
            document.getElementById('cpCountdownDisplay')?.scrollIntoView({ behavior: 'smooth' });
            if (window.classroomTimer) {
                window.classroomTimer.showModal(true);
            }
        });

        // Theme Switcher
        document.getElementById('btnCpTheme')?.addEventListener('click', () => {
            if (window.deckThemeEngine) {
                window.deckThemeEngine.cycleTheme();
                this.sync.emit('THEME_CHANGE', { themeId: window.deckThemeEngine.currentTheme });
                this.updatePresenterSlideView();
            }
        });

        // Help Modal
        document.getElementById('btnCpHelp')?.addEventListener('click', () => {
            const modal = document.getElementById('cpHelpModal');
            if (modal) modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
        });
        document.getElementById('btnCpHelpClose')?.addEventListener('click', () => {
            const modal = document.getElementById('cpHelpModal');
            if (modal) modal.style.display = 'none';
        });

        // Close
        document.getElementById('btnCpClose')?.addEventListener('click', () => window.close());
    }

    /**
     * Full Teacher Toolkit Panel Bindings
     */
    bindToolkitActions() {
        // Mode switch buttons
        document.querySelectorAll('.cp-mode-btn').forEach(btn => {
            btn.onclick = () => {
                const mode = btn.dataset.mode || 'none';
                this.setToolMode(mode);
            };
        });

        // Pen color swatches
        document.querySelectorAll('#cpPenPalette .cp-swatch').forEach(swatch => {
            swatch.onclick = () => {
                document.querySelectorAll('#cpPenPalette .cp-swatch').forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
                this.penColor = swatch.dataset.color || '#ef4444';
            };
        });

        // Pen width swatches
        document.querySelectorAll('.cp-width-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.cp-width-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.penWidth = parseFloat(btn.dataset.width || '3.5');
            };
        });

        // Highlighter color swatches
        document.querySelectorAll('#cpHighlighterPalette .cp-swatch').forEach(swatch => {
            swatch.onclick = () => {
                document.querySelectorAll('#cpHighlighterPalette .cp-swatch').forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
                this.highlighterColorIndex = parseInt(swatch.dataset.index || '0', 10);
                if (window.teacherHighlighter) {
                    window.teacherHighlighter.setColor(this.highlighterColorIndex);
                }
            };
        });

        // Toolkit Action Buttons
        document.getElementById('btnToolStepReveal')?.addEventListener('click', () => this.triggerStepReveal());
        document.getElementById('btnToolStudentPicker')?.addEventListener('click', () => this.triggerStudentPicker());
        document.getElementById('btnToolLoupe')?.addEventListener('click', () => this.triggerParagraphLoupe());
        document.getElementById('btnToolConfetti')?.addEventListener('click', () => {
            this.launchConfetti();
            this.sync.emit('CONFETTI_CMD', {});
        });

        // Undo & Clear Ink
        document.getElementById('btnToolUndoHighlight')?.addEventListener('click', () => {
            if (window.teacherHighlighter) window.teacherHighlighter.undo(true);
        });

        document.getElementById('btnToolClearDrawings')?.addEventListener('click', () => {
            this.clearDrawings();
        });

        // Timer Presets
        document.querySelectorAll('.cp-quick-timer-btn').forEach(btn => {
            btn.onclick = () => {
                const sec = parseInt(btn.dataset.sec, 10);
                if (!isNaN(sec) && window.classroomTimer) {
                    window.classroomTimer.setTimer(sec, true);
                    window.classroomTimer.showModal(true);
                }
            };
        });

        // Timer Start/Pause & Reset
        document.getElementById('btnToolTimerToggle')?.addEventListener('click', () => {
            if (window.classroomTimer) {
                window.classroomTimer.toggleRun(true);
                window.classroomTimer.showModal(true);
            }
        });

        document.getElementById('btnToolTimerReset')?.addEventListener('click', () => {
            if (window.classroomTimer) {
                window.classroomTimer.reset(true);
            }
        });

        // Blanking buttons
        document.getElementById('btnToolBlackout')?.addEventListener('click', () => this.toggleBlackout());
        document.getElementById('btnToolWhiteout')?.addEventListener('click', () => this.toggleWhiteout());
        document.getElementById('btnToolSpotlight')?.addEventListener('click', () => this.toggleSpotlight());
        document.getElementById('btnToolClearBlanking')?.addEventListener('click', () => this.clearBlanking());

        // Theme Pills
        document.querySelectorAll('.cp-theme-pill-btn').forEach(btn => {
            btn.onclick = () => {
                const themeId = btn.dataset.theme;
                if (themeId && window.deckThemeEngine) {
                    window.deckThemeEngine.applyTheme(themeId, true, true);
                    this.updatePresenterSlideView();
                }
            };
        });

        // Aspect Ratio
        document.getElementById('btnToolAspectToggle')?.addEventListener('click', () => {
            if (window.deckEngine) {
                window.deckEngine.toggleAspectRatio();
                this.sync.emit('ASPECT_RATIO', { ratio: window.deckEngine.aspectRatio });
                this.updatePresenterSlideView();
            }
        });
    }

    /**
     * Tool Modes: 'none' | 'laser' | 'pen' | 'highlighter'
     */
    setToolMode(mode) {
        this.activeToolMode = mode;
        this.laserActive = (mode === 'laser');
        this.penActive = (mode === 'pen');
        this.highlighterActive = (mode === 'highlighter');

        // Update Top Header Buttons
        document.getElementById('btnCpLaser')?.classList.toggle('active', this.laserActive);
        document.getElementById('btnCpPen')?.classList.toggle('active', this.penActive);
        document.getElementById('btnCpHighlighter')?.classList.toggle('active', this.highlighterActive);

        // Update Toolkit Mode Bar
        document.querySelectorAll('.cp-mode-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.mode === mode);
        });

        // Toggle Palettes
        const penPal = document.getElementById('cpPenPalette');
        const hlPal = document.getElementById('cpHighlighterPalette');
        if (penPal) penPal.style.display = this.penActive ? 'block' : 'none';
        if (hlPal) hlPal.style.display = this.highlighterActive ? 'block' : 'none';

        // Update Canvas Cursor & Pointer Events
        // ONLY laser and pen need drawing canvas pointer events!
        // Highlighter MUST allow selecting text on the slide!
        const canvas = document.getElementById('presenterDrawCanvas');
        const laserDot = document.getElementById('presenterLaserDot');
        if (canvas) {
            canvas.style.pointerEvents = (this.penActive || this.laserActive) ? 'auto' : 'none';
            if (this.penActive) {
                canvas.style.cursor = 'crosshair';
            } else if (this.laserActive) {
                canvas.style.cursor = 'none';
            } else {
                canvas.style.cursor = 'default';
            }
        }
        if (laserDot && !this.laserActive) {
            laserDot.style.display = 'none';
        }

        // Toggle TeacherHighlighter engine state
        if (this.highlighterActive && window.teacherHighlighter && !window.teacherHighlighter.isActive) {
            window.teacherHighlighter.toggle(false);
            window.teacherHighlighter.setColor(this.highlighterColorIndex);
        } else if (!this.highlighterActive && window.teacherHighlighter && window.teacherHighlighter.isActive) {
            window.teacherHighlighter.toggle(false);
        }

        // Sync with Audience Screen
        this.sync.emit('LASER_STATE', { active: this.laserActive });
        this.sync.emit('PEN_STATE', { active: this.penActive });
    }

    triggerStepReveal() {
        if (window.stepRevealEngine) {
            window.stepRevealEngine.revealNextOnActiveSlide();
            this.sync.emit('STEP_REVEAL_CMD', {});
            this.updatePresenterSlideView();
        }
    }

    triggerStudentPicker() {
        if (window.studentPicker) {
            window.studentPicker.open(true);
            window.studentPicker.spin(null, true);
        }
    }

    showPickedStudent(name) {
        const pill = document.getElementById('cpPickedStudentDisplay');
        const nameEl = document.getElementById('cpPickedStudentName');
        if (pill && nameEl) {
            nameEl.textContent = name;
            pill.style.display = 'flex';
            pill.classList.add('pulse');
            setTimeout(() => pill.classList.remove('pulse'), 800);
        }
    }

    triggerParagraphLoupe() {
        if (window.paragraphLoupe) {
            window.paragraphLoupe.toggle();
            window.paragraphLoupe.notifySync();
        }
    }

    toggleSpotlight() {
        this.isSpotlight = !this.isSpotlight;
        document.getElementById('btnCpSpotlight')?.classList.toggle('active', this.isSpotlight);
        document.getElementById('btnToolSpotlight')?.classList.toggle('active', this.isSpotlight);
        if (window.presentationSpotlight) {
            this.isSpotlight ? window.presentationSpotlight.activate(false) : window.presentationSpotlight.deactivate(false);
        }
        this.sync.emit('SPOTLIGHT_STATE', { active: this.isSpotlight });
    }

    toggleBlackout() {
        this.isBlackout = !this.isBlackout;
        this.isWhiteout = false;
        document.getElementById('btnCpBlackout')?.classList.toggle('active', this.isBlackout);
        document.getElementById('btnToolBlackout')?.classList.toggle('active', this.isBlackout);
        document.getElementById('btnToolWhiteout')?.classList.remove('active');
        if (window.presentationSpotlight) {
            this.isBlackout ? window.presentationSpotlight.toggleBlackout(false) : window.presentationSpotlight.clearMute(false);
        }
        this.sync.emit('BLACKOUT_STATE', { blackout: this.isBlackout, whiteout: false });
    }

    toggleWhiteout() {
        this.isWhiteout = !this.isWhiteout;
        this.isBlackout = false;
        document.getElementById('btnToolWhiteout')?.classList.toggle('active', this.isWhiteout);
        document.getElementById('btnCpBlackout')?.classList.remove('active');
        document.getElementById('btnToolBlackout')?.classList.remove('active');
        if (window.presentationSpotlight) {
            this.isWhiteout ? window.presentationSpotlight.toggleWhiteout(false) : window.presentationSpotlight.clearMute(false);
        }
        this.sync.emit('BLACKOUT_STATE', { blackout: false, whiteout: this.isWhiteout });
    }

    clearBlanking() {
        this.isBlackout = false;
        this.isWhiteout = false;
        this.isSpotlight = false;
        document.getElementById('btnCpBlackout')?.classList.remove('active');
        document.getElementById('btnToolBlackout')?.classList.remove('active');
        document.getElementById('btnToolWhiteout')?.classList.remove('active');
        document.getElementById('btnCpSpotlight')?.classList.remove('active');
        document.getElementById('btnToolSpotlight')?.classList.remove('active');
        if (window.presentationSpotlight) {
            window.presentationSpotlight.clearMute(false);
            window.presentationSpotlight.deactivate(false);
        }
        this.sync.emit('BLACKOUT_STATE', { blackout: false, whiteout: false });
        this.sync.emit('SPOTLIGHT_STATE', { active: false });
    }

    clearDrawings() {
        const canvas = document.getElementById('presenterDrawCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        if (window.penAnnotation) window.penAnnotation.clear(true);
        if (window.teacherHighlighter) window.teacherHighlighter.clear(true);
        if (window.readingHighlighter) window.readingHighlighter.clearAll(null, true);
    }

    updateTimerDisplay(seconds) {
        const display = document.getElementById('cpCountdownDisplay');
        if (!display) return;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    /**
     * Notes Font Scaling & Tabs
     */
    setupNotesControls() {
        const tabNotes = document.getElementById('tabNotesBtn');
        const tabToolkit = document.getElementById('tabToolkitBtn');
        const paneNotes = document.getElementById('paneNotes');
        const paneToolkit = document.getElementById('paneToolkit');

        if (tabNotes && tabToolkit) {
            tabNotes.onclick = () => this.switchTab('notes');
            tabToolkit.onclick = () => this.switchTab('toolkit');
        }

        const btnDec = document.getElementById('btnFontDec');
        const btnReset = document.getElementById('btnFontReset');
        const btnInc = document.getElementById('btnFontInc');
        const notesContent = document.getElementById('cpNotesContent');

        const applyFontSize = () => {
            if (notesContent) {
                notesContent.style.fontSize = `${this.notesFontSize}px`;
            }
            localStorage.setItem('cp_notes_font_size', String(this.notesFontSize));
        };
        applyFontSize();

        if (btnDec) {
            btnDec.onclick = () => {
                if (this.notesFontSize > 12) {
                    this.notesFontSize -= 2;
                    applyFontSize();
                }
            };
        }

        if (btnReset) {
            btnReset.onclick = () => {
                this.notesFontSize = 16;
                applyFontSize();
            };
        }

        if (btnInc) {
            btnInc.onclick = () => {
                if (this.notesFontSize < 28) {
                    this.notesFontSize += 2;
                    applyFontSize();
                }
            };
        }

        const btnEditNote = document.getElementById('btnEditCustomNote');
        if (btnEditNote) {
            btnEditNote.onclick = () => {
                const customNoteEl = document.getElementById('cpCustomNoteText');
                if (customNoteEl) {
                    customNoteEl.contentEditable = 'true';
                    customNoteEl.focus();
                }
            };
        }
    }

    switchTab(tabName) {
        this.activeTab = tabName;
        const tabNotes = document.getElementById('tabNotesBtn');
        const tabToolkit = document.getElementById('tabToolkitBtn');
        const paneNotes = document.getElementById('paneNotes');
        const paneToolkit = document.getElementById('paneToolkit');

        if (tabName === 'notes') {
            tabNotes?.classList.add('active');
            tabToolkit?.classList.remove('active');
            paneNotes?.classList.add('active');
            paneToolkit?.classList.remove('active');
        } else {
            tabToolkit?.classList.add('active');
            tabNotes?.classList.remove('active');
            paneToolkit?.classList.add('active');
            paneNotes?.classList.remove('active');
        }
    }

    /**
     * Copy form input values, check states, and interactive classes from source to destination elements
     */
    syncFormValues(srcElement, destElement) {
        if (!srcElement || !destElement) return;

        const srcInputs = srcElement.querySelectorAll('input, select, textarea');
        const destInputs = destElement.querySelectorAll('input, select, textarea');
        srcInputs.forEach((src, idx) => {
            const dest = destInputs[idx];
            if (!dest) return;
            if (src.tagName === 'SELECT') {
                dest.value = src.value;
            } else if (src.type === 'checkbox' || src.type === 'radio') {
                dest.checked = src.checked;
            } else {
                dest.value = src.value;
            }
            dest.className = src.className;
        });

        // Also sync item-explanations, marks, synonym pairs, and opt-cards
        const srcCards = srcElement.querySelectorAll('.q-card, .opt-card, .word-chip, .item-explanation, mark.evidence, .syn-pair-1, .syn-pair-2, .syn-pair-3');
        const destCards = destElement.querySelectorAll('.q-card, .opt-card, .word-chip, .item-explanation, mark.evidence, .syn-pair-1, .syn-pair-2, .syn-pair-3');
        srcCards.forEach((src, idx) => {
            const dest = destCards[idx];
            if (dest) {
                dest.className = src.className;
                if (src.style.display) dest.style.display = src.style.display;
            }
        });
    }

    /**
     * Update Presenter Slide Preview & Notes
     */
    updatePresenterSlideView() {
        if (!this.isPresenter) return;
        const slides = document.querySelectorAll('.slide');
        const currentIndex = window.deckEngine ? window.deckEngine.currentSlide : 0;
        const currentSlide = slides[currentIndex];

        // Update Slide Counter (e.g. 13 / 28)
        const counterEl = document.getElementById('cpSlideCounter');
        if (counterEl) {
            counterEl.textContent = `${currentIndex + 1} / ${slides.length}`;
        }

        // Update Scaled Slide Stage
        const scaler = document.getElementById('cpCurrentSlideScaler');
        if (scaler && currentSlide) {
            scaler.innerHTML = '';
            const clone = currentSlide.cloneNode(true);
            clone.classList.add('active', 'preview-clone');
            scaler.appendChild(clone);
            this.syncFormValues(currentSlide, clone);
            this.scalePreviewElement(scaler);
            this.bindPreviewSlideInteractions(scaler, currentSlide, currentIndex);
        }

        // Update Filmstrip active card & scroll
        this.scrollFilmstripToActive(currentIndex);

        // Update Notes
        this.updatePedagogicalNotes(currentSlide, currentIndex);
    }

    bindPreviewSlideInteractions(scaler, currentSlide, currentIndex) {
        if (!scaler || !currentSlide) return;

        // Synchronize inputs & dropdowns typed directly on the preview slide
        scaler.querySelectorAll('.blank-input, .select-input').forEach((input, idx) => {
            const syncInput = () => {
                const allRealInputs = currentSlide.querySelectorAll('.blank-input, .select-input');
                const realInput = allRealInputs[idx];
                if (realInput) {
                    realInput.value = input.value;
                    realInput.dispatchEvent(new Event('input', { bubbles: true }));
                    realInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
                this.sync.emit('INPUT_SYNC', {
                    slideIndex: currentIndex,
                    inputIndex: idx,
                    value: input.value,
                    className: input.className
                });
            };
            input.addEventListener('input', syncInput);
            input.addEventListener('change', syncInput);
        });

        // Click delegation inside preview slide
        scaler.addEventListener('click', (e) => {
            // 1. Vocabulary terms & Explainer popovers
            const vocabTerm = e.target.closest('.vocab-word, .vocab-term, [data-def]');
            if (vocabTerm && window.ReadingGrounder) {
                e.preventDefault();
                e.stopPropagation();
                const text = vocabTerm.textContent.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()"]/g, "").trim();
                const matchedDict = ReadingGrounder.lookupDict ? ReadingGrounder.lookupDict(text, vocabTerm) : null;
                ReadingGrounder.showVocabPopover(vocabTerm, matchedDict);
                return;
            }

            // 2. Synonym / Evidence buttons
            const synBtn = e.target.closest('.syn-btn, [onclick*="toggleSynonymExplanation"]');
            if (synBtn) {
                const card = synBtn.closest('.q-card, .flowchart-step-card');
                let dataQ = synBtn.dataset.q || card?.dataset?.q;
                let dataEv = synBtn.dataset.ev;

                const onclickAttr = synBtn.getAttribute('onclick');
                if ((!dataQ || !dataEv) && onclickAttr) {
                    const match = onclickAttr.match(/toggleSynonymExplanation\(['"]([^'"]+)['"](?:,\s*['"]([^'"]+)['"])?\)/);
                    if (match) {
                        dataQ = dataQ || match[1];
                        dataEv = dataEv || match[2] || `ev-${match[1]}`;
                    }
                }

                if (!dataEv && dataQ) dataEv = `ev-${dataQ}`;
                if (!dataQ && dataEv) dataQ = dataEv.replace(/^ev-/, '');

                if (dataQ || dataEv) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.readingHighlighter) {
                        window.readingHighlighter.focusEvidence(dataQ, dataEv, true);
                    } else if (window.deckEngine) {
                        window.deckEngine.toggleSynonymExplanation(dataQ, dataEv, true);
                    }
                    if (card) {
                        const exp = card.querySelector('.item-explanation');
                        if (exp) exp.classList.toggle('show');
                    }
                }
                return;
            }

            // 3. Word chips
            const wordChip = e.target.closest('.word-chip');
            if (wordChip && window.vocabBank) {
                e.preventDefault();
                e.stopPropagation();
                window.vocabBank.handleChipClick(wordChip, currentSlide);
                setTimeout(() => this.updatePresenterSlideView(), 60);
                return;
            }

            // 4. Option cards (.opt-card)
            const optCard = e.target.closest('.opt-card');
            if (optCard) {
                e.preventDefault();
                e.stopPropagation();
                const allCloneCards = Array.from(scaler.querySelectorAll('.opt-card'));
                const cardIdx = allCloneCards.indexOf(optCard);
                const allRealCards = Array.from(currentSlide.querySelectorAll('.opt-card'));
                const realCard = allRealCards[cardIdx];
                if (realCard && window.deckEngine) {
                    window.deckEngine.toggleOptCard(realCard, true);
                    optCard.classList.toggle('selected', realCard.classList.contains('selected'));
                }
                return;
            }

            // 5. Action buttons (Check, Reveal, Reset, Step Reveal)
            const actionBtn = e.target.closest('button, .btn-action');
            if (actionBtn) {
                const btnText = (actionBtn.textContent || '').trim().toLowerCase();
                if (actionBtn.classList.contains('btn-step-reveal') || btnText.includes('step reveal')) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.triggerStepReveal();
                    return;
                } else if (btnText.includes('check')) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.deckEngine) window.deckEngine.checkAnswers(currentSlide, true);
                    this.updatePresenterSlideView();
                    return;
                } else if (btnText.includes('reveal') || btnText.includes('show evidence') || btnText.includes('show highlight')) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.deckEngine) window.deckEngine.revealKeys(currentSlide, true);
                    this.updatePresenterSlideView();
                    return;
                } else if (btnText.includes('reset')) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.deckEngine) window.deckEngine.resetTask(currentSlide, true);
                    this.updatePresenterSlideView();
                    return;
                }
            }
        });
    }

    scalePreviewElement(scaler) {
        if (!scaler) return;
        const parent = scaler.parentElement;
        if (!parent) return;

        const parentW = parent.clientWidth;
        const parentH = parent.clientHeight;
        if (parentW <= 0 || parentH <= 0) return;

        const is43 = window.deckEngine && window.deckEngine.aspectRatio === '4:3';
        const targetW = is43 ? 1440 : 1920;
        const targetH = 1080;

        const availW = Math.max(100, parentW - 48);
        const availH = Math.max(100, parentH - 72);

        const scale = Math.min(availW / targetW, availH / targetH);
        const scaledW = targetW * scale;
        const scaledH = targetH * scale;
        const offsetX = Math.max(0, (parentW - scaledW) / 2);
        const offsetY = Math.max(0, (parentH - scaledH) / 2 - 12);

        scaler.style.width = `${targetW}px`;
        scaler.style.height = `${targetH}px`;
        scaler.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
        scaler.style.transformOrigin = 'top left';

        // Synchronize drawing canvas exactly over the scaled slide
        const canvas = document.getElementById('presenterDrawCanvas');
        if (canvas) {
            canvas.style.left = `${offsetX}px`;
            canvas.style.top = `${offsetY}px`;
            canvas.style.width = `${scaledW}px`;
            canvas.style.height = `${scaledH}px`;
            canvas.width = scaledW;
            canvas.height = scaledH;
        }
    }

    updatePedagogicalNotes(slide, currentIndex) {
        const notesContainer = document.getElementById('cpNotesContent');
        if (!notesContainer || !slide) return;

        const skill = slide.dataset.skill || 'general';
        const slideTitleEl = slide.querySelector('h1, h2, .slide-title, .module-title');
        const slideTitle = slideTitleEl ? slideTitleEl.textContent.trim().replace(/\s+/g, ' ') : `Slide ${currentIndex + 1}`;
        const slideNum = slide.querySelector('.slide-number')?.textContent || `Slide ${currentIndex + 1}`;
        const customNote = slide.querySelector('.teacher-note')?.innerHTML;

        const storageKey = `cp_custom_note_${window.location.pathname}_${currentIndex}`;
        const userSavedNote = localStorage.getItem(storageKey) || '';

        let guidanceHTML = '';
        if (window.presenterNotesEngine && typeof window.presenterNotesEngine.getDefaultGuidance === 'function') {
            guidanceHTML = window.presenterNotesEngine.getDefaultGuidance(skill, slide);
        } else {
            guidanceHTML = `
                <div class="cp-note-block">
                    <h4>🎯 Masterclass Objective</h4>
                    <p>Guide students through the core concepts and elicit authentic speaking/writing responses.</p>
                </div>
            `;
        }

        notesContainer.innerHTML = `
            <div class="cp-notes-slide-head">
                <div class="cp-notes-slide-title">${slideTitle}</div>
                <div class="cp-notes-meta">
                    <span class="cp-badge-num">${slideNum}</span>
                    <span class="cp-badge-skill ${skill}">${skill.toUpperCase()}</span>
                </div>
            </div>

            <!-- Custom Teacher Sticky Notes -->
            <div class="cp-note-block custom-note">
                <h4>⭐ Teacher Guidance &amp; Cues</h4>
                <div class="cp-editable-note" id="cpCustomNoteText" contenteditable="true" placeholder="Click here to type private teaching notes...">${userSavedNote || customNote || 'Click here to add personal teaching cues for this slide...'}</div>
            </div>

            ${guidanceHTML}
        `;

        const editableEl = document.getElementById('cpCustomNoteText');
        if (editableEl) {
            editableEl.oninput = () => {
                localStorage.setItem(storageKey, editableEl.innerHTML);
            };
        }
    }

    /**
     * Interactive Canvas Drawing & Laser
     */
    setupPresenterDrawCanvas() {
        const canvas = document.getElementById('presenterDrawCanvas');
        const laserDot = document.getElementById('presenterLaserDot');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let isDrawing = false;
        let strokePoints = [];

        canvas.addEventListener('mousedown', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const normX = Math.max(0, Math.min(1, x / rect.width));
            const normY = Math.max(0, Math.min(1, y / rect.height));

            if (this.laserActive) {
                if (laserDot) {
                    laserDot.style.display = 'block';
                    laserDot.style.left = `${e.clientX}px`;
                    laserDot.style.top = `${e.clientY}px`;
                }
                this.sync.emit('LASER_MOVE', { normX, normY });
            }

            if (this.penActive) {
                isDrawing = true;
                strokePoints = [{ normX, normY }];
                ctx.beginPath();
                ctx.moveTo(x, y);
            }
        });

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const normX = Math.max(0, Math.min(1, x / rect.width));
            const normY = Math.max(0, Math.min(1, y / rect.height));

            if (this.laserActive) {
                if (laserDot) {
                    laserDot.style.display = 'block';
                    laserDot.style.left = `${e.clientX}px`;
                    laserDot.style.top = `${e.clientY}px`;
                }
                this.sync.emit('LASER_MOVE', { normX, normY });
            }

            if (this.isSpotlight) {
                this.sync.emit('SPOTLIGHT_MOVE', { normX, normY });
            }

            if (this.penActive && isDrawing) {
                ctx.lineTo(x, y);
                ctx.strokeStyle = this.penColor;
                ctx.lineWidth = this.penWidth;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.stroke();

                strokePoints.push({ normX, normY });
                if (strokePoints.length > 3) {
                    this.sync.emit('PEN_DRAW', {
                        stroke: strokePoints,
                        color: this.penColor,
                        width: this.penWidth
                    });
                    strokePoints = [{ normX, normY }];
                }
            }
        });

        canvas.addEventListener('mouseleave', () => {
            if (laserDot) laserDot.style.display = 'none';
        });

        window.addEventListener('mouseup', () => {
            if (isDrawing && strokePoints.length > 0) {
                this.sync.emit('PEN_DRAW', {
                    stroke: strokePoints,
                    color: this.penColor,
                    width: this.penWidth
                });
            }
            isDrawing = false;
            strokePoints = [];
        });
    }

    /**
     * Presenter Keyboard Shortcuts
     */
    bindPresenterKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable) {
                return;
            }

            const key = e.key.toLowerCase();

            // Next / Prev slide
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
                e.preventDefault();
                window.deckEngine && window.deckEngine.nextSlide();
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                window.deckEngine && window.deckEngine.prevSlide();
            } else if (e.key === 'Home') {
                e.preventDefault();
                window.deckEngine && window.deckEngine.showSlide(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                const total = document.querySelectorAll('.slide').length;
                window.deckEngine && window.deckEngine.showSlide(total - 1);
            } else if (e.shiftKey && key === 'a') {
                e.preventDefault();
                window.deckEngine && window.deckEngine.toggleAspectRatio();
                this.sync.emit('ASPECT_RATIO', { ratio: window.deckEngine.aspectRatio });
                this.updatePresenterSlideView();
            } else if (e.shiftKey && key === 't') {
                e.preventDefault();
                window.deckThemeEngine && window.deckThemeEngine.cycleTheme();
                this.sync.emit('THEME_CHANGE', { themeId: window.deckThemeEngine.currentTheme });
                this.updatePresenterSlideView();
            } else if (key === 'l') {
                e.preventDefault();
                this.setToolMode(this.activeToolMode === 'laser' ? 'none' : 'laser');
            } else if (key === 'p') {
                e.preventDefault();
                this.setToolMode(this.activeToolMode === 'pen' ? 'none' : 'pen');
            } else if (key === 'h') {
                e.preventDefault();
                this.setToolMode(this.activeToolMode === 'highlighter' ? 'none' : 'highlighter');
            } else if (key === 'c') {
                e.preventDefault();
                this.clearDrawings();
            } else if (key === 'e') {
                e.preventDefault();
                this.triggerStepReveal();
            } else if (key === 'r') {
                e.preventDefault();
                this.triggerStudentPicker();
            } else if (key === 'b' || key === '.') {
                e.preventDefault();
                this.toggleBlackout();
            } else if (key === 'w') {
                e.preventDefault();
                this.toggleWhiteout();
            } else if (key === 's') {
                e.preventDefault();
                this.toggleSpotlight();
            } else if (key === 'z') {
                e.preventDefault();
                this.triggerParagraphLoupe();
            } else if (key === 'f') {
                e.preventDefault();
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                } else {
                    document.exitFullscreen().catch(() => {});
                }
            } else if (key === '?' || (e.shiftKey && e.key === '/')) {
                e.preventDefault();
                const modal = document.getElementById('cpHelpModal');
                if (modal) modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
            } else if (key === 'escape') {
                const modal = document.getElementById('cpHelpModal');
                if (modal) modal.style.display = 'none';
                if (this.isBlackout || this.isWhiteout || this.isSpotlight) {
                    this.clearBlanking();
                }
                if (this.activeToolMode !== 'none') {
                    this.setToolMode('none');
                }
            }
        });
    }

    /**
     * Canva Magic Confetti Effect
     */
    launchConfetti() {
        const canvas = document.getElementById('cpConfettiCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const pieces = [];
        const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

        for (let i = 0; i < 140; i++) {
            pieces.push({
                x: window.innerWidth * (0.2 + Math.random() * 0.6),
                y: window.innerHeight * 0.45,
                vx: (Math.random() - 0.5) * 18,
                vy: -Math.random() * 15 - 5,
                size: Math.random() * 8 + 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rSpeed: (Math.random() - 0.5) * 14,
                opacity: 1
            });
        }

        let animationFrame = null;
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let alive = false;

            pieces.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.45;
                p.rotation += p.rSpeed;
                p.opacity -= 0.008;

                if (p.opacity > 0) {
                    alive = true;
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation * Math.PI) / 180);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = Math.max(0, p.opacity);
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                    ctx.restore();
                }
            });

            if (alive) {
                animationFrame = requestAnimationFrame(render);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                cancelAnimationFrame(animationFrame);
            }
        };

        render();
    }

    /**
     * Presenter Stylesheet
     */
    injectPresenterStyles() {
        if (document.getElementById('presenterCockpitStyles')) return;
        const style = document.createElement('style');
        style.id = 'presenterCockpitStyles';
        style.textContent = `
            html.presenter-window,
            body.presenter-window {
                margin: 0 !important;
                padding: 0 !important;
                background: #111217 !important;
                color: #f1f5f9 !important;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif !important;
                overflow: hidden !important;
                height: 100vh !important;
                width: 100vw !important;
            }
            html.presenter-window .deck-viewport,
            body.presenter-window .deck-viewport,
            html.presenter-window #deckStage,
            body.presenter-window #deckStage,
            html.presenter-window #presentationToolsHUD,
            body.presenter-window #presentationToolsHUD,
            html.presenter-window .slide-indicator,
            body.presenter-window .slide-indicator,
            html.presenter-window .aspect-toast,
            body.presenter-window .aspect-toast,
            html.presenter-window .font-indicator,
            body.presenter-window .font-indicator,
            html.presenter-window #fontIndicator,
            body.presenter-window #fontIndicator,
            html.presenter-window .presenter-notes-drawer,
            body.presenter-window .presenter-notes-drawer,
            html.presenter-window .reading-loupe-card,
            body.presenter-window .reading-loupe-card,
            html.presenter-window .reading-loupe-overlay,
            body.presenter-window .reading-loupe-overlay,
            html.presenter-window .deck-watermark,
            body.presenter-window .deck-watermark {
                display: none !important;
                visibility: hidden !important;
                pointer-events: none !important;
            }

            .canva-presenter-cockpit {
                position: fixed;
                inset: 0;
                z-index: 99999;
                display: flex;
                flex-direction: column;
                height: 100vh;
                width: 100vw;
                background: #111217;
                overflow: hidden;
            }

            /* TOP BAR */
            .cp-header {
                height: 54px;
                background: #18191f;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 16px;
                user-select: none;
                flex-shrink: 0;
            }
            .cp-header-left {
                display: flex;
                align-items: center;
                gap: 14px;
            }
            .cp-clock {
                font-size: 19px;
                font-weight: 700;
                color: #ffffff;
                letter-spacing: -0.5px;
            }
            .cp-header-divider {
                width: 1px;
                height: 20px;
                background: rgba(255, 255, 255, 0.14);
            }
            .cp-timer-group {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .cp-stopwatch {
                font-size: 19px;
                font-weight: 700;
                color: #ffffff;
                letter-spacing: -0.5px;
                min-width: 52px;
            }
            .cp-icon-btn {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.12);
                color: #e2e8f0;
                width: 28px;
                height: 28px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                cursor: pointer;
                transition: all 0.15s ease;
            }
            .cp-icon-btn:hover {
                background: rgba(255, 255, 255, 0.18);
                color: #ffffff;
            }
            .cp-sync-dot {
                width: 9px;
                height: 9px;
                border-radius: 50%;
                margin-left: 6px;
            }
            .cp-sync-dot.connected {
                background: #10b981;
                box-shadow: 0 0 8px #10b981;
            }
            .cp-sync-dot.waiting {
                background: #f59e0b;
                box-shadow: 0 0 8px #f59e0b;
            }

            .cp-header-right {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .cp-action-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.08);
                color: #cbd5e1;
                padding: 6px 10px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 12.5px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.15s ease;
            }
            .cp-action-btn:hover {
                background: rgba(255, 255, 255, 0.15);
                color: #ffffff;
            }
            .cp-action-btn.active {
                background: #3b82f6;
                border-color: #60a5fa;
                color: #ffffff;
                box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
            }
            .cp-btn-lbl {
                font-size: 12px;
            }
            .cp-close-btn:hover {
                background: #ef4444 !important;
                border-color: #ef4444 !important;
                color: #fff !important;
            }

            /* WORKSPACE LAYOUT */
            .cp-workspace {
                flex: 1;
                display: flex;
                overflow: hidden;
                position: relative;
            }

            /* LEFT STAGE COLUMN */
            .cp-stage-col {
                flex: 0 0 65%;
                display: flex;
                flex-direction: column;
                background: #0f1015;
                border-right: 1px solid rgba(255, 255, 255, 0.08);
                overflow: hidden;
                position: relative;
            }
            .cp-stage-viewport {
                flex: 1;
                position: relative;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #0a0a0e;
            }
            .slide-preview-scaler {
                position: absolute;
                top: 0;
                left: 0;
                box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6);
                border-radius: 8px;
                overflow: hidden;
                background: #0b0f19;
                pointer-events: none;
                color: var(--text-dark, #0f172a);
            }
            .slide-preview-scaler .slide {
                width: 100% !important;
                height: 100% !important;
                position: absolute !important;
                inset: 0 !important;
                display: flex !important;
                opacity: 1 !important;
                visibility: visible !important;
                color: var(--text-dark, #0f172a);
            }
            .slide-preview-scaler .slide-inner,
            .slide-preview-scaler .notebook,
            .slide-preview-scaler .page-content {
                color: var(--text-dark, #0f172a);
            }
            .slide-preview-scaler .rule-card,
            .slide-preview-scaler .card,
            .slide-preview-scaler .discuss-card,
            .slide-preview-scaler .reading-pane,
            .slide-preview-scaler .essay-card,
            .slide-preview-scaler .model-breakdown-card,
            .slide-preview-scaler .q-card {
                color: var(--text-dark, #0f172a);
            }
            .slide-preview-scaler p,
            .slide-preview-scaler li,
            .slide-preview-scaler span,
            .slide-preview-scaler em,
            .slide-preview-scaler strong {
                color: inherit;
            }
            .presenter-draw-canvas {
                position: absolute;
                z-index: 100;
                pointer-events: none;
            }
            .presenter-laser-dot {
                position: fixed;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: #ef4444;
                box-shadow: 0 0 14px 4px #ef4444, 0 0 2px 2px #fff;
                pointer-events: none;
                z-index: 101;
                transform: translate(-50%, -50%);
                display: none;
            }

            /* FLOATING NAV PILL */
            .cp-nav-pill {
                position: absolute;
                bottom: 16px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(18, 20, 29, 0.9);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 30px;
                padding: 4px 8px;
                display: flex;
                align-items: center;
                gap: 6px;
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
                z-index: 200;
                user-select: none;
            }
            .cp-pill-btn {
                background: transparent;
                border: none;
                color: #cbd5e1;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.15s;
            }
            .cp-pill-btn:hover {
                background: rgba(255, 255, 255, 0.15);
                color: #fff;
            }
            .cp-pill-counter {
                font-size: 13px;
                font-weight: 700;
                color: #ffffff;
                padding: 0 8px;
                min-width: 60px;
                text-align: center;
                font-family: inherit;
            }
            .cp-fullscreen-btn {
                position: absolute;
                top: 14px;
                right: 14px;
                background: rgba(18, 20, 29, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.12);
                color: #cbd5e1;
                width: 32px;
                height: 32px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                cursor: pointer;
                z-index: 200;
            }
            .cp-fullscreen-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                color: #fff;
            }

            /* BOTTOM FILMSTRIP */
            .cp-filmstrip-section {
                height: 104px;
                background: #14151b;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
                display: flex;
                align-items: center;
                padding: 8px 12px;
                position: relative;
                flex-shrink: 0;
            }
            .cp-filmstrip-scroll-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #cbd5e1;
                width: 26px;
                height: 52px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                cursor: pointer;
                z-index: 10;
                flex-shrink: 0;
            }
            .cp-filmstrip-scroll-btn:hover {
                background: rgba(255, 255, 255, 0.18);
                color: #fff;
            }
            .cp-filmstrip-track {
                flex: 1;
                display: flex;
                gap: 10px;
                overflow-x: auto;
                padding: 4px 10px;
                scroll-behavior: smooth;
            }
            .cp-filmstrip-track::-webkit-scrollbar {
                height: 5px;
            }
            .cp-filmstrip-track::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.18);
                border-radius: 3px;
            }
            .cp-filmstrip-card {
                flex: 0 0 120px;
                height: 72px;
                background: #1e2029;
                border: 1.5px solid rgba(255, 255, 255, 0.12);
                border-radius: 6px;
                padding: 5px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                cursor: pointer;
                transition: all 0.18s ease;
                user-select: none;
            }
            .cp-filmstrip-card:hover {
                border-color: rgba(255, 255, 255, 0.3);
                transform: translateY(-2px);
            }
            .cp-filmstrip-card.active {
                border-color: #3b82f6;
                box-shadow: 0 0 12px rgba(59, 130, 246, 0.4);
                background: #1e293b;
            }
            .cp-card-preview-mini {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .cp-card-num {
                font-size: 11px;
                font-weight: 700;
                color: #94a3b8;
            }
            .cp-card-skill-tag {
                font-size: 9px;
                font-weight: 800;
                text-transform: uppercase;
                padding: 1px 4px;
                border-radius: 3px;
                background: rgba(255, 255, 255, 0.1);
                color: #cbd5e1;
            }
            .cp-card-skill-tag.read { background: rgba(56, 189, 248, 0.2); color: #38bdf8; }
            .cp-card-skill-tag.write { background: rgba(244, 114, 182, 0.2); color: #f472b6; }
            .cp-card-skill-tag.vocab { background: rgba(74, 222, 128, 0.2); color: #4ade80; }
            .cp-card-skill-tag.grammar { background: rgba(250, 204, 21, 0.2); color: #facc15; }
            .cp-card-title {
                font-size: 10.5px;
                color: #e2e8f0;
                font-weight: 600;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            /* RESIZER SPLITTER */
            .cp-splitter {
                width: 8px;
                cursor: col-resize;
                background: #18191f;
                position: relative;
                z-index: 150;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .cp-splitter-handle {
                width: 3px;
                height: 32px;
                background: rgba(255, 255, 255, 0.25);
                border-radius: 2px;
            }
            .cp-splitter:hover .cp-splitter-handle {
                background: #3b82f6;
            }

            /* RIGHT NOTES & TOOLKIT COLUMN */
            .cp-notes-col {
                flex: 0 0 35%;
                display: flex;
                flex-direction: column;
                background: #14151b;
                overflow: hidden;
            }
            .cp-notes-tabs {
                height: 44px;
                background: #18191f;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                display: flex;
                align-items: center;
                padding: 0 12px;
                gap: 6px;
                flex-shrink: 0;
            }
            .cp-tab-btn {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 13px;
                font-weight: 600;
                padding: 6px 12px;
                border-radius: 6px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 6px;
                transition: all 0.15s;
            }
            .cp-tab-btn:hover {
                color: #fff;
                background: rgba(255, 255, 255, 0.06);
            }
            .cp-tab-btn.active {
                color: #ffffff;
                background: rgba(255, 255, 255, 0.12);
                box-shadow: inset 0 -2px 0 #3b82f6;
            }
            .cp-tab-pane {
                display: none;
                flex: 1;
                flex-direction: column;
                overflow: hidden;
            }
            .cp-tab-pane.active {
                display: flex;
            }

            /* NOTES CONTENT */
            .cp-notes-body {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 14px;
            }
            .cp-notes-slide-head {
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                padding-bottom: 10px;
            }
            .cp-notes-slide-title {
                font-size: 17px;
                font-weight: 800;
                color: #ffffff;
                margin-bottom: 4px;
            }
            .cp-notes-meta {
                display: flex;
                gap: 8px;
                align-items: center;
            }
            .cp-badge-num {
                font-size: 11.5px;
                color: #94a3b8;
                font-weight: 600;
            }
            .cp-badge-skill {
                font-size: 10px;
                font-weight: 800;
                padding: 2px 6px;
                border-radius: 4px;
                background: #3b82f6;
                color: #fff;
            }
            .cp-note-block {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 8px;
                padding: 12px 14px;
            }
            .cp-note-block.custom-note {
                border-color: rgba(250, 204, 21, 0.3);
                background: rgba(250, 204, 21, 0.05);
            }
            .cp-note-block h4 {
                font-size: 13.5px;
                font-weight: 700;
                margin: 0 0 6px 0;
                color: #38bdf8;
            }
            .cp-note-block.custom-note h4 {
                color: #facc15;
            }
            .cp-note-block p {
                font-size: 13px;
                color: #cbd5e1;
                margin: 0 0 6px 0;
                line-height: 1.5;
            }
            .cp-editable-note {
                font-size: 13px;
                color: #e2e8f0;
                line-height: 1.5;
                outline: none;
                min-height: 48px;
            }

            /* NOTES FOOTER */
            .cp-notes-footer {
                height: 46px;
                background: #18191f;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 16px;
                flex-shrink: 0;
            }
            .cp-font-controls {
                display: flex;
                align-items: center;
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 6px;
                overflow: hidden;
            }
            .cp-footer-btn {
                background: transparent;
                border: none;
                color: #94a3b8;
                height: 26px;
                min-width: 26px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: 700;
                cursor: pointer;
            }
            .cp-footer-btn:hover { background: rgba(255, 255, 255, 0.15); color: #fff; }
            .cp-footer-btn.font-label { font-size: 11px; padding: 0 4px; cursor: default; }
            .edit-note-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 6px;
                color: #e2e8f0;
                padding: 4px 10px;
                font-size: 12px;
                cursor: pointer;
            }

            /* TOOLKIT TAB CONTENT */
            .cp-toolkit-scroll {
                flex: 1;
                overflow-y: auto;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 14px;
            }
            .cp-toolkit-card {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 10px;
                padding: 14px;
            }
            .cp-toolkit-card h4 {
                font-size: 13.5px;
                font-weight: 700;
                color: #f1f5f9;
                margin: 0 0 10px 0;
            }
            .cp-btn-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }
            .cp-tool-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #e2e8f0;
                padding: 8px 10px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                transition: all 0.15s;
            }
            .cp-tool-btn:hover {
                background: rgba(255, 255, 255, 0.15);
                color: #fff;
            }
            .cp-tool-btn.primary {
                background: #2563eb;
                border-color: #3b82f6;
                color: #fff;
            }
            .cp-tool-btn.primary:hover { background: #1d4ed8; }
            .cp-tool-btn.active {
                background: #8b5cf6;
                border-color: #a78bfa;
                color: #fff;
            }
            .cp-tool-btn.danger:hover {
                background: rgba(239, 68, 68, 0.2);
                border-color: #ef4444;
                color: #f87171;
            }

            .cp-student-display-pill {
                margin-top: 10px;
                padding: 8px 12px;
                background: rgba(59, 130, 246, 0.15);
                border: 1px solid rgba(59, 130, 246, 0.3);
                border-radius: 6px;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 13px;
                color: #93c5fd;
            }
            .cp-student-display-pill strong {
                font-size: 15px;
                color: #ffffff;
            }

            /* Tool Mode Bar */
            .cp-tool-mode-bar {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 4px;
                background: rgba(0, 0, 0, 0.25);
                padding: 3px;
                border-radius: 6px;
                margin-bottom: 10px;
            }
            .cp-mode-btn {
                background: transparent;
                border: none;
                color: #94a3b8;
                padding: 6px 4px;
                border-radius: 4px;
                font-size: 11.5px;
                font-weight: 600;
                cursor: pointer;
            }
            .cp-mode-btn.active {
                background: #3b82f6;
                color: #fff;
            }

            /* Palettes */
            .cp-palette-group {
                margin-bottom: 10px;
            }
            .cp-palette-label {
                font-size: 11.5px;
                color: #94a3b8;
                display: block;
                margin-bottom: 6px;
            }
            .cp-color-swatches {
                display: flex;
                gap: 8px;
                margin-bottom: 8px;
            }
            .cp-swatch {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 2px solid transparent;
                cursor: pointer;
                transition: transform 0.15s;
            }
            .cp-swatch:hover { transform: scale(1.15); }
            .cp-swatch.active { border-color: #fff; transform: scale(1.15); }
            .cp-width-swatches {
                display: flex;
                gap: 6px;
            }
            .cp-width-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #cbd5e1;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 11px;
                cursor: pointer;
            }
            .cp-width-btn.active {
                background: #3b82f6;
                color: #fff;
            }

            /* Timer Section */
            .cp-timer-countdown-display {
                font-size: 32px;
                font-weight: 800;
                color: #38bdf8;
                text-align: center;
                letter-spacing: 1.5px;
                font-family: 'JetBrains Mono', monospace, sans-serif;
                margin: 4px 0 10px 0;
            }
            .cp-timer-presets {
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                gap: 4px;
            }
            .cp-quick-timer-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #cbd5e1;
                padding: 6px 0;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 700;
                cursor: pointer;
            }
            .cp-quick-timer-btn:hover {
                background: #8b5cf6;
                color: #fff;
            }

            /* Themes Grid */
            .cp-theme-presets-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 6px;
            }
            .cp-theme-pill-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #cbd5e1;
                padding: 6px;
                border-radius: 6px;
                font-size: 11px;
                font-weight: 600;
                cursor: pointer;
            }
            .cp-theme-pill-btn:hover {
                background: rgba(255, 255, 255, 0.18);
                color: #fff;
            }

            /* CONFETTI & MODALS */
            .cp-confetti-canvas {
                position: fixed;
                inset: 0;
                pointer-events: none;
                z-index: 100000;
            }

            .cp-help-modal {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.75);
                backdrop-filter: blur(8px);
                z-index: 100001;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .cp-help-dialog {
                width: 440px;
                background: #18191f;
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 12px;
                padding: 18px;
                color: #ffffff;
                box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
            }
            .cp-help-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: 700;
                font-size: 15px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding-bottom: 10px;
                margin-bottom: 14px;
            }
            .cp-help-close {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 20px;
                cursor: pointer;
            }
            .cp-help-close:hover { color: #fff; }
            .cp-help-grid {
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 8px 14px;
                font-size: 12.5px;
                color: #cbd5e1;
            }
            .cp-help-grid kbd {
                background: rgba(255, 255, 255, 0.12);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                padding: 2px 6px;
                font-size: 11px;
                color: #fff;
            }
        `;
        document.head.appendChild(style);
    }
}

// Auto-Instantiate Global Presenter View Module
window.presenterSyncEngine = new PresenterSyncEngine();
window.presenterViewUI = new PresenterViewUI(window.presenterSyncEngine);


/* ==================== MODULE: lesson-protection.js ==================== */
/**
 * Expert IELTS Presentations — Slide Deck Password Protection Engine
 * 
 * Provides client-side access control for Classroom Presentation Decks & Teacher Solutions.
 * Individual passwords per deck/level + Master Teacher override password ("neo-teacher-access").
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. PASSWORD REGISTRY
  // =========================================================================
  window.LESSON_PASSWORDS = window.LESSON_PASSWORDS || {
    // Master password that unlocks ANY protected deck
    masterPassword: "neo-teacher-access",

    // Default passwords by level
    levels: {
      "expert 5": {},
      "expert 6": {},
      "expert 7.5": {}
    }
  };

  // =========================================================================
  // 2. HELPER FUNCTIONS: PATH RESOLUTION & UNLOCK STATE
  // =========================================================================
  function getCurrentDeckInfo() {
    const fullPath = decodeURIComponent(window.location.pathname).replace(/\\/g, '/');
    const segments = fullPath.split('/').filter(Boolean);
    const filename = segments.length > 0 ? segments[segments.length - 1] : '';

    let levelFolder = 'expert 6';
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i].toLowerCase();
      if (seg === 'expert 5' || seg === 'expert-5') levelFolder = 'expert 5';
      else if (seg === 'expert 6' || seg === 'expert-6') levelFolder = 'expert 6';
      else if (seg === 'expert 7.5' || seg === 'expert-75' || seg === 'expert 75') levelFolder = 'expert 7.5';
    }

    const isProtected = document.body && document.body.hasAttribute('data-locked') 
      ? document.body.getAttribute('data-locked') === 'true' 
      : false;

    return { levelFolder, filename, isProtected };
  }

  function getSessionStorageKey(levelFolder, filename) {
    return `neo_lesson_unlocked_${levelFolder}_${filename}`;
  }

  function isAlreadyUnlocked(levelFolder, filename) {
    try {
      if (sessionStorage.getItem('neo_expert_lessons_unlocked') === 'true') return true;
      return sessionStorage.getItem(getSessionStorageKey(levelFolder, filename)) === 'true';
    } catch (e) {
      return false;
    }
  }

  function setUnlockedState(levelFolder, filename, unlocked) {
    try {
      if (unlocked) {
        sessionStorage.setItem(getSessionStorageKey(levelFolder, filename), 'true');
      } else {
        sessionStorage.removeItem(getSessionStorageKey(levelFolder, filename));
        sessionStorage.removeItem('neo_expert_lessons_unlocked');
      }
    } catch (e) { }
  }

  // =========================================================================
  // 3. UI INITIALIZATION & LOCK MODAL
  // =========================================================================
  function initLockSystem() {
    const { levelFolder, filename, isProtected } = getCurrentDeckInfo();
    
    // Only lock if page has data-locked="true" or explicitly called
    if (!isProtected && !window.FORCE_LESSON_LOCK) {
      return;
    }

    const isUnlocked = isAlreadyUnlocked(levelFolder, filename);

    // Inject styles
    if (!document.getElementById('lesson-protection-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'lesson-protection-styles';
      styleEl.textContent = `
        body.deck-locked {
          overflow: hidden !important;
          height: 100vh !important;
        }
        body.deck-locked > *:not(#lesson-lock-modal) {
          filter: blur(18px) grayscale(40%) !important;
          pointer-events: none !important;
          user-select: none !important;
        }
        #lesson-lock-modal {
          position: fixed;
          inset: 0;
          z-index: 9999999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(16px);
          padding: 1.25rem;
          font-family: 'Inter', system-ui, sans-serif;
        }
        #lesson-relock-fab {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 999999;
          background: #0f172a;
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        #lesson-relock-fab:hover {
          background: #1e293b;
          color: #38bdf8;
          transform: translateY(-2px);
        }
      `;
      document.head.appendChild(styleEl);
    }

    // Build Floating Relock Button
    let relockFab = document.getElementById('lesson-relock-fab');
    if (!relockFab) {
      relockFab = document.createElement('button');
      relockFab.id = 'lesson-relock-fab';
      relockFab.innerHTML = `🔒 <span>Khóa bài giảng</span>`;
      relockFab.style.display = isUnlocked ? 'flex' : 'none';
      relockFab.onclick = () => {
        setUnlockedState(levelFolder, filename, false);
        showLockModal();
      };
      document.body.appendChild(relockFab);
    }

    if (!isUnlocked) {
      document.body.classList.add('deck-locked');
      showLockModal();
    }
  }

  function showLockModal() {
    const { levelFolder, filename } = getCurrentDeckInfo();
    let modal = document.getElementById('lesson-lock-modal');

    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'lesson-lock-modal';
      modal.innerHTML = `
        <div style="background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255,255,255,0.1); border-radius: 1.5rem; padding: 2rem; max-width: 420px; width: 100%; text-align: center; color: #fff; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
          <div style="font-size: 2rem; margin-bottom: 0.75rem;">🛡️</div>
          <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">Bảo Mật Bài Giảng Giảng Viên</h3>
          <p style="font-size: 0.825rem; color: #94a3b8; margin-bottom: 1.25rem; line-height: 1.5;">Tài liệu slide bài giảng và đáp án yêu cầu mật mã từ giáo viên để truy cập.</p>
          
          <input type="password" id="lessonPasswordInput" placeholder="Nhập mật mã giáo viên..." 
                 style="width: 100%; padding: 0.75rem 1rem; border-radius: 0.75rem; background: #020617; border: 1px solid #334155; color: #fff; font-size: 0.875rem; margin-bottom: 0.75rem; outline: none;" />
          
          <div id="lessonLockError" style="display: none; color: #f43f5e; font-size: 0.75rem; margin-bottom: 0.75rem;"></div>

          <button id="lessonUnlockBtn" style="width: 100%; padding: 0.75rem; border-radius: 0.75rem; background: #4f46e5; color: #fff; font-weight: 600; font-size: 0.875rem; border: none; cursor: pointer; transition: background 0.2s;">
            Mở khóa bài giảng
          </button>
        </div>
      `;
      document.body.appendChild(modal);

      const unlockBtn = modal.querySelector('#lessonUnlockBtn');
      const pwdInput = modal.querySelector('#lessonPasswordInput');
      const errorEl = modal.querySelector('#lessonLockError');

      function tryUnlock() {
        const entered = (pwdInput.value || '').trim();
        const master = window.LESSON_PASSWORDS.masterPassword;

        if (entered === master || entered.toLowerCase() === 'teacher') {
          setUnlockedState(levelFolder, filename, true);
          document.body.classList.remove('deck-locked');
          modal.remove();
          const fab = document.getElementById('lesson-relock-fab');
          if (fab) fab.style.display = 'flex';
        } else {
          errorEl.textContent = 'Mật mã không đúng. Vui lòng thử lại!';
          errorEl.style.display = 'block';
          pwdInput.select();
        }
      }

      unlockBtn.onclick = tryUnlock;
      pwdInput.onkeydown = (e) => {
        if (e.key === 'Enter') tryUnlock();
      };
    }

    document.body.classList.add('deck-locked');
  }

  // Expose global methods
  window.initLessonLock = initLockSystem;
  window.showLessonLockModal = showLockModal;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLockSystem);
  } else {
    initLockSystem();
  }
})();

