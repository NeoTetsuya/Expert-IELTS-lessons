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
                        <div class="card" style="background: #ffffff; border: 2px solid #93c5fd; border-left: 7px solid var(--col-reading); border-radius: 14px; padding: 24px 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">
                            <div style="font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--col-reading); margin-bottom: 10px;" data-slot="passage-header">
                                📖 Relevant Passage Excerpt
                            </div>
                            <p style="font-size: 26px; line-height: 1.85; margin-bottom: 0; color: #0f172a;" data-slot="passage-text"></p>
                        </div>

                        <!-- Bottom Box: Interactive Question Card -->
                        <div class="q-card" style="background: #ffffff; border: 2px solid #cbd5e1; border-left: 7px solid var(--col-reading); border-radius: 14px; padding: 24px 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.03);" data-slot="question-card">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
                                <span style="font-weight: 700; font-size: 25px; line-height: 1.65; color: #0f172a;" data-slot="question-text"></span>
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
