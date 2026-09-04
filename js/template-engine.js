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
        <div class="section-slide">
            <div class="section-inner">
                <div class="section-left" style="background: linear-gradient(135deg, #155e75, #0d9488);">
                    <div class="section-module-tag reveal" data-slot="badge">Module Section</div>
                    <div class="section-number reveal" data-slot="num">00</div>
                    <div class="section-sublabel reveal" data-slot="sublabel">IELTS Preparation</div>
                </div>
                <div class="section-right">
                    <div class="section-title reveal" data-slot="title"></div>
                    <p class="section-desc reveal" data-slot="subtitle"></p>
                    <div class="section-topics reveal" data-slot="content"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 2b. STRATEGY / PRE-READING TEMPLATE -->
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

                    <p class="slide-subtitle" style="font-size: 20px; color: var(--text-muted); margin-bottom: 10px;" data-slot="subtitle"></p>

                    <div class="two-col" style="flex: 1; min-height: 0; display: flex; gap: 24px;">
                        <div style="flex: 1.2; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;" data-slot="sentences"></div>
                        <div style="flex: 0.8; overflow-y: auto;" data-slot="guide"></div>
                    </div>

                    <div class="action-row" style="margin-top: 10px;">
                        <button class="btn-action btn-primary" onclick="toggleAllHighlights(this)">Show Highlights</button>
                        <button class="btn-action btn-step-reveal" onclick="stepReveal(this)">👉 Step Reveal (E)</button>
                        <button class="btn-action" onclick="resetStrategySlide(this)">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 3. UP-TO-DOWN (STACKED) 1-QUESTION WALKTHROUGH TEMPLATE -->
<template id="tmpl-walkthrough">
    <section class="slide" data-skill="read">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-reading);"></div>
                <div class="page-content" style="display: flex; flex-direction: column; gap: 12px; padding: 24px 44px 20px; height: 100%; box-sizing: border-box;">
                    <div class="slide-header" style="margin-bottom: 0;">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-reading); font-size: 13px; padding: 3px 10px;" data-slot="badge">Reading Strategy • Walkthrough</span>
                            <h2 class="slide-title" style="font-size: 26px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 18px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p class="slide-subtitle" style="font-size: 16px; color: var(--text-muted); margin-bottom: 2px;" data-slot="subtitle">
                        Compare the dedicated passage excerpt with the question below to evaluate your answer.
                    </p>

                    <!-- Centered Walkthrough Container -->
                    <div class="walkthrough-container" style="max-width: 1550px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; flex: 1; justify-content: flex-start; min-height: 0;">
                        <!-- Top Box: Dedicated Passage Excerpt -->
                        <div class="card" style="border-left: 6px solid var(--col-reading); border-radius: 12px; padding: 16px 24px;">
                            <div style="font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--col-reading); margin-bottom: 4px;" data-slot="passage-header">
                                📖 Relevant Passage Excerpt
                            </div>
                            <p style="font-size: 21.5px; line-height: 1.65; margin-bottom: 0; color: var(--text-dark);" data-slot="passage-text"></p>
                        </div>

                        <!-- Bottom Box: Interactive Question Card -->
                        <div class="q-card" style="border-left: 6px solid var(--col-reading); border-radius: 12px; padding: 16px 24px;" data-slot="question-card">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
                                <span style="font-weight: 700; font-size: 21.5px; line-height: 1.6; color: var(--text-dark);" data-slot="question-text"></span>
                                <button class="syn-btn" style="flex-shrink: 0; font-size: 14px; padding: 6px 14px; font-weight: 700;" data-slot="evidence-btn">💡 Evidence</button>
                            </div>

                            <div style="margin-top: 10px; display: flex; align-items: center; gap: 14px;" data-slot="input-area"></div>

                            <div class="item-explanation" style="font-size: 19px; line-height: 1.6; margin-top: 8px; padding: 12px 18px; border-radius: 8px;" data-slot="explanation"></div>
                        </div>
                    </div>

                    <div class="action-row" style="margin-top: auto; padding-top: 4px;">
                        <button class="btn-action btn-primary" onclick="checkAnswers(this)">Check Answer</button>
                        <button class="btn-action btn-step-reveal" onclick="stepReveal(this)">👉 Step Reveal (E)</button>
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
<template id="tmpl-keyword-strategy">
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

                    <div class="action-row" style="margin-top: 10px;"></div>
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

<!-- 9. VOCABULARY HUB & LEXICON INSPECTOR TEMPLATE -->
<template id="tmpl-vocab-cards">
    <section class="slide" data-skill="vocab">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-vocab);"></div>
                <div class="page-content" style="padding: 26px 44px 20px; display: flex; flex-direction: column;">
                    <div class="slide-header" style="margin-bottom: 4px;">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-vocab); font-size: 14px; padding: 4px 12px;" data-slot="badge">Academic Lexicon</span>
                            <h2 class="slide-title" style="font-size: 30px;" data-slot="title">Academic Lexicon &amp; Collocations Hub</h2>
                        </div>
                        <div class="slide-number" style="font-size: 18px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p class="slide-subtitle" style="font-size: 17px; color: var(--text-muted); margin-bottom: 10px;" data-slot="subtitle">
                        Click on any term card to inspect definitions, phonetic transcriptions, and high-scoring IELTS collocations.
                    </p>

                    <div class="two-col" style="flex: 1; min-height: 0; gap: 20px; display: flex;">
                        <!-- Left Col: Word Cards Grid -->
                        <div class="vocab-hub-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; flex: 1.05; overflow-y: auto; align-content: start;" data-slot="cards"></div>
                        
                        <!-- Right Col: Live Term Inspector Pane -->
                        <div class="vocab-inspector-pane" style="flex: 0.95; overflow-y: auto;" data-slot="inspector"></div>
                    </div>

                    <div class="action-row" style="margin-top: 8px;">
                        <button class="btn-action btn-step-reveal" onclick="stepReveal(this)">👉 Step Reveal (E)</button>
                        <button class="btn-action" onclick="window.vocabBank?.speak(document.querySelector('.slide.active .insp-word')?.textContent || '')">🔊 Pronounce Active</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- 9b. VOCABULARY GRID TEMPLATE ALIAS -->
<template id="tmpl-vocab-grid">
    <section class="slide" data-skill="vocab">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-vocab);"></div>
                <div class="page-content" style="padding: 26px 44px 20px; display: flex; flex-direction: column;">
                    <div class="slide-header" style="margin-bottom: 4px;">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-vocab); font-size: 14px; padding: 4px 12px;" data-slot="badge">Academic Lexicon</span>
                            <h2 class="slide-title" style="font-size: 30px;" data-slot="title">Academic Lexicon &amp; Collocations Hub</h2>
                        </div>
                        <div class="slide-number" style="font-size: 18px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p class="slide-subtitle" style="font-size: 17px; color: var(--text-muted); margin-bottom: 10px;" data-slot="subtitle">
                        Click on any term card to inspect definitions, phonetic transcriptions, and high-scoring IELTS collocations.
                    </p>

                    <div class="two-col" style="flex: 1; min-height: 0; gap: 20px; display: flex;">
                        <!-- Left Col: Word Cards Grid -->
                        <div class="vocab-hub-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; flex: 1.05; overflow-y: auto; align-content: start;" data-slot="cards"></div>
                        
                        <!-- Right Col: Live Term Inspector Pane -->
                        <div class="vocab-inspector-pane" style="flex: 0.95; overflow-y: auto;" data-slot="inspector"></div>
                    </div>

                    <div class="action-row" style="margin-top: 8px;">
                        <button class="btn-action btn-step-reveal" onclick="stepReveal(this)">👉 Step Reveal (E)</button>
                        <button class="btn-action" onclick="window.vocabBank?.speak(document.querySelector('.slide.active .insp-word')?.textContent || '')">🔊 Pronounce Active</button>
                    </div>
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

<!-- 17. CATEGORY SORTING DRAG & DROP TEMPLATE -->
<template id="tmpl-category-sort">
    <section class="slide" data-skill="vocab">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-vocab);" data-slot="skill-stripe"></div>
                <div class="page-content" style="padding: 28px 48px 24px; display: flex; flex-direction: column;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-vocab); font-size: 14px; padding: 4px 12px;" data-slot="badge">Vocabulary • Category Sorting</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p style="font-size: 20px; color: var(--text-muted); margin-bottom: 12px;" data-slot="instruction">Drag words or click to place them into the correct category.</p>

                    <div class="category-sorter" style="flex: 1; min-height: 0;" data-slot="sorter">
                        <div data-slot="wordbank"></div>
                        <div data-slot="table"></div>
                        <div data-slot="grid"></div>
                    </div>

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

<!-- 18. DRAG-AND-DROP GAP-FILL TEMPLATE -->
<template id="tmpl-drag-gapfill">
    <section class="slide" data-skill="vocab">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-vocab);" data-slot="skill-stripe"></div>
                <div class="page-content" style="padding: 28px 48px 24px; display: flex; flex-direction: column;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-vocab); font-size: 14px; padding: 4px 12px;" data-slot="badge">Vocabulary • Word Bank Practice</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p style="font-size: 20px; color: var(--text-muted); margin-bottom: 12px;" data-slot="instruction">Drag words from the bank or click to fill the blanks.</p>

                    <div style="flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 14px;" data-slot="content">
                        <div data-slot="wordbank"></div>
                        <div data-slot="sentences"></div>
                        <div data-slot="grid"></div>
                    </div>

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
`;


    // =========================================================================
    // IELTS READING QUESTION TYPE REGISTRY & REUSABLE COMPONENT ENGINE
    // Complete Taxonomy for all 15 Official IELTS Academic Reading Question Types
    // =========================================================================
    const IELTS_READING_QUESTION_TYPES = {
        'multiple-choice': {
            id: 'multiple-choice',
            aliases: ['mcq', 'multiple_choice', 'single-choice'],
            name: 'Multiple Choice (Single Answer)',
            category: 'selection',
            defaultRubric: 'Choose the correct letter, A, B, C or D.',
            defaultStrategy: 'Locate keywords from the stem, eliminate distractors, and confirm paraphrase match.',
            renderInput: (q, context) => {
                const options = q.options || (context && context.options) || [];
                const ans = q.ans || '';
                if (q.useCards || (context && context.useCards)) {
                    const optsHtml = options.map(opt => {
                        const letter = (typeof opt === 'object' && opt.letter) ? opt.letter : (typeof opt === 'string' && opt.length > 2 && opt[1] === '.') ? opt[0] : opt;
                        const text = (typeof opt === 'object' && opt.text) ? opt.text : (typeof opt === 'string' && opt.length > 3 && opt[1] === '.') ? opt.slice(2).trim() : opt;
                        return `
                            <div class="mcq-card-option choice-btn" data-choice="${letter}">
                                <span class="mcq-letter-chip">${letter}</span>
                                <span class="mcq-option-text">${text}</span>
                            </div>
                        `;
                    }).join('');
                    return `<div class="mcq-options-container choice-group" data-ans="${ans}">${optsHtml}</div>`;
                }
                const optsHtml = options.map(opt => {
                    if (typeof opt === 'object' && opt.letter) {
                        return `<option value="${opt.letter}">${opt.letter}: ${opt.text}</option>`;
                    }
                    return `<option value="${opt}">${opt}</option>`;
                }).join('');
                return `
                    <select class="select-input" data-ans="${ans}" style="width:100%; max-width:680px; min-width:280px; font-weight:700; font-size:18px; padding:8px 16px; border-radius:8px;">
                        <option value="">-- Select Answer --</option>
                        ${optsHtml}
                    </select>
                `;
            }
        },
        'multiple-choice-multi': {
            id: 'multiple-choice-multi',
            aliases: ['mcq-multi', 'multiple-choice-multiple', 'multi-select'],
            name: 'Multiple Choice (Multiple Answers)',
            category: 'selection',
            defaultRubric: 'Choose the correct letters from the options below.',
            defaultStrategy: 'Scan the passage for each option and select all confirmed claims.',
            renderInput: (q, context) => {
                const options = q.options || (context && context.options) || [];
                const ans = q.ans || '';
                const optsHtml = options.map(opt => {
                    const letter = typeof opt === 'object' ? opt.letter : opt;
                    const text = typeof opt === 'object' ? opt.text : opt;
                    return `
                        <label class="multi-choice-label" style="display:flex; align-items:center; gap:10px; font-size:17.5px; cursor:pointer; padding:6px 12px; border-radius:8px; border:1px solid #e2e8f0; background:#ffffff; transition:all 140ms ease-out;">
                            <input type="checkbox" class="checkbox-input" value="${letter}" data-ans-part="${ans}" style="width:18px; height:18px; accent-color:var(--col-reading, #2563eb); cursor:pointer;">
                            <span><strong>${letter}:</strong> ${text}</span>
                        </label>
                    `;
                }).join('');
                return `<div class="multi-choice-group" data-ans="${ans}" style="display:flex; flex-direction:column; gap:8px;">${optsHtml}</div>`;
            }
        },
        'tfng': {
            id: 'tfng',
            aliases: ['true-false-not-given', 'true_false', 't-f-ng'],
            name: 'Identifying Information (True / False / Not Given)',
            category: 'selection',
            defaultRubric: 'Do the following statements agree with the information given in the reading passage? Write TRUE, FALSE or NOT GIVEN.',
            defaultStrategy: 'TRUE = agrees with the text. FALSE = directly contradicts the text. NOT GIVEN = the text neither agrees nor disagrees.',
            renderInput: (q) => {
                const ans = q.ans || '';
                if (q.useSelect) {
                    return `
                        <select class="select-input" data-ans="${ans}" style="min-width:200px; font-weight:700; font-size:18px; padding:8px 16px; border-radius:8px;">
                            <option value="">-- Select Answer --</option>
                            <option value="TRUE">TRUE</option>
                            <option value="FALSE">FALSE</option>
                            <option value="NOT GIVEN">NOT GIVEN</option>
                        </select>
                    `;
                }
                return `
                    <div class="tfng-group" data-ans="${ans}">
                        <button type="button" class="tfng-btn" data-choice="TRUE">TRUE</button>
                        <button type="button" class="tfng-btn" data-choice="FALSE">FALSE</button>
                        <button type="button" class="tfng-btn" data-choice="NOT GIVEN">NOT GIVEN</button>
                    </div>
                `;
            }
        },
        'ynng': {
            id: 'ynng',
            aliases: ['yes-no-not-given', 'yes_no', 'y-n-ng'],
            name: 'Identifying Views / Claims (Yes / No / Not Given)',
            category: 'selection',
            defaultRubric: 'Do the following statements agree with the views/claims of the writer? Write YES, NO or NOT GIVEN.',
            defaultStrategy: "YES = matches writer's opinion. NO = contradicts writer's opinion. NOT GIVEN = writer does not state an opinion.",
            renderInput: (q) => {
                const ans = q.ans || '';
                if (q.useSelect) {
                    return `
                        <select class="select-input" data-ans="${ans}" style="min-width:200px; font-weight:700; font-size:18px; padding:8px 16px; border-radius:8px;">
                            <option value="">-- Select Answer --</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                            <option value="NOT GIVEN">NOT GIVEN</option>
                        </select>
                    `;
                }
                return `
                    <div class="ynng-group choice-group" data-ans="${ans}">
                        <button type="button" class="choice-btn" data-choice="YES">YES</button>
                        <button type="button" class="choice-btn" data-choice="NO">NO</button>
                        <button type="button" class="choice-btn" data-choice="NOT GIVEN">NOT GIVEN</button>
                    </div>
                `;
            }
        },
        'matching-headings': {
            id: 'matching-headings',
            aliases: ['headings', 'matching_headings', 'paragraph-headings'],
            name: 'Matching Headings',
            category: 'selection',
            defaultRubric: 'Choose the correct heading for each paragraph from the list of headings below.',
            defaultStrategy: 'Read the opening and closing sentences of each paragraph to synthesize the core purpose before choosing.',
            renderInput: (q, context) => {
                const headings = q.headings || (context && context.headings) || [];
                const ans = q.ans || '';
                const optsHtml = headings.map(h => `<option value="${h.roman}">${h.roman}. ${h.text}</option>`).join('');
                return `
                    <select class="select-input" data-ans="${ans}" style="width:100%; min-width:280px; font-weight:700; font-size:18px; padding:8px 16px; border-radius:8px;">
                        <option value="">-- Select Heading --</option>
                        ${optsHtml}
                    </select>
                `;
            }
        },
        'matching-features': {
            id: 'matching-features',
            aliases: ['features', 'matching_features', 'categorization'],
            name: 'Matching Features / Categories',
            category: 'selection',
            defaultRubric: 'Match each statement with the correct group or person. Write the correct letter, A–D.',
            defaultStrategy: 'Scan the text for each proper noun / category, read around all mentions, then match the claims.',
            renderInput: (q, context) => {
                const options = q.options || (context && context.options) || [];
                const ans = q.ans || '';
                const optsHtml = options.map(opt => {
                    if (typeof opt === 'object' && opt.letter) {
                        return `<option value="${opt.letter}">${opt.letter}: ${opt.text}</option>`;
                    }
                    return `<option value="${opt}">${opt}</option>`;
                }).join('');
                return `
                    <select class="select-input" data-ans="${ans}" style="width:100%; max-width:680px; min-width:280px; font-weight:700; font-size:18px; padding:8px 16px; border-radius:8px;">
                        <option value="">-- Select Feature --</option>
                        ${optsHtml}
                    </select>
                `;
            }
        },
        'matching-information': {
            id: 'matching-information',
            aliases: ['which-paragraph', 'matching_information', 'paragraph-matching'],
            name: 'Matching Information to Paragraphs',
            category: 'selection',
            defaultRubric: 'Which paragraph contains the following information? Write the correct letter, A–G.',
            defaultStrategy: 'Identify whether the question asks for a reason, example, description, or comparison.',
            renderInput: (q) => {
                const ans = q.ans || '';
                const paras = ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D', 'Paragraph E', 'Paragraph F', 'Paragraph G', 'Paragraph H'];
                const optsHtml = paras.map(p => `<option value="${p}">${p}</option>`).join('');
                return `
                    <select class="select-input" data-ans="${ans}" style="min-width:220px; font-weight:700; font-size:18px; padding:8px 16px; border-radius:8px;">
                        <option value="">-- Select Paragraph --</option>
                        ${optsHtml}
                    </select>
                `;
            }
        },
        'matching-sentence-endings': {
            id: 'matching-sentence-endings',
            aliases: ['sentence-endings', 'matching_sentence_endings'],
            name: 'Matching Sentence Endings',
            category: 'selection',
            defaultRubric: 'Complete each sentence with the correct ending, A–G, below.',
            defaultStrategy: 'Check grammatical compatibility and scan for parallel ideas in the text.',
            renderInput: (q, context) => {
                const options = q.options || (context && context.options) || [];
                const ans = q.ans || '';
                const optsHtml = options.map(opt => {
                    if (typeof opt === 'object' && opt.letter) {
                        return `<option value="${opt.letter}">${opt.letter}: ${opt.text}</option>`;
                    }
                    return `<option value="${opt}">${opt}</option>`;
                }).join('');
                return `
                    <select class="select-input" data-ans="${ans}" style="width:100%; max-width:680px; min-width:300px; font-weight:700; font-size:18px; padding:8px 16px; border-radius:8px;">
                        <option value="">-- Select Ending --</option>
                        ${optsHtml}
                    </select>
                `;
            }
        },
        'summary-box': {
            id: 'summary-box',
            aliases: ['summary-completion-box', 'box-completion'],
            name: 'Summary Completion (with a Box)',
            category: 'selection',
            defaultRubric: 'Complete the summary using the list of words/phrases, A–I, below.',
            defaultStrategy: 'Identify the required part of speech for each blank, then match synonyms from the box.',
            renderInput: (q, context) => {
                const boxOptions = q.boxOptions || (context && context.boxOptions) || [];
                const ans = q.ans || '';
                const boxHtml = boxOptions.map(opt => `<span class="box-chip" style="background:#ffffff; border:1.5px solid #cbd5e1; padding:6px 14px; border-radius:8px; font-weight:700; font-size:18px; color:var(--text-dark);"><strong>${opt.letter}.</strong> ${opt.text}</span>`).join('');
                const optsHtml = boxOptions.map(opt => `<option value="${opt.letter}">${opt.letter} (${opt.text})</option>`).join('');
                return `
                    <div style="display:flex; flex-direction:column; gap:14px; width:100%;">
                        ${boxOptions.length ? `
                        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; background:#eff6ff; padding:12px 18px; border-radius:10px; border:1.5px solid #bfdbfe;">
                            <span style="font-size:16px; font-weight:800; text-transform:uppercase; color:var(--col-reading); margin-right:4px;">📦 Option Box:</span>
                            ${boxHtml}
                        </div>` : ''}
                        <div style="display:flex; align-items:center; gap:14px; margin-top:4px;">
                            <span style="font-weight:700; font-size:18px; color:var(--text-dark);">Your Choice:</span>
                            <select class="select-input" data-ans="${ans}" style="min-width:280px; font-weight:700; font-size:18px; padding:8px 16px; border-radius:8px;">
                                <option value="">Select option...</option>
                                ${optsHtml}
                            </select>
                        </div>
                    </div>
                `;
            }
        },
        'sentence-completion': {
            id: 'sentence-completion',
            aliases: ['gap-fill', 'sentence_completion'],
            name: 'Sentence Completion',
            category: 'completion',
            defaultRubric: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
            defaultStrategy: 'Predict the grammatical category of the missing word and extract exact words from the passage without changing forms.',
            renderInput: (q) => {
                const ans = q.ans || '';
                const width = (q.width || 230) + 'px';
                return `<input type="text" class="blank-input" data-ans="${ans}" placeholder="Type answer..." style="width:${width}; font-weight:700; font-size:18px; padding:8px 14px; border-radius:8px;">`;
            }
        },
        'summary-completion': {
            id: 'summary-completion',
            aliases: ['summary', 'summary_completion'],
            name: 'Summary Completion (from Text)',
            category: 'completion',
            defaultRubric: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
            defaultStrategy: 'Locate the section of the text summarized, track parallel sentence structures, and extract exact words.',
            renderInput: (q, context) => {
                const wb = q.wordBank || (context && context.wordBank);
                const ans = q.ans || '';
                if (wb && Array.isArray(wb) && wb.length) {
                    const chipsHtml = wb.map(w => `<span class="word-chip" data-word="${w}" style="font-size:18px; font-weight:700; padding:6px 14px;">${w}</span>`).join('');
                    return `
                        <div style="display:flex; flex-direction:column; gap:14px; width:100%;">
                            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; background:#f8fafc; padding:12px 18px; border-radius:10px; border:1.5px solid #cbd5e1;">
                                <span style="font-size:16px; font-weight:800; text-transform:uppercase; color:var(--col-reading); margin-right:4px;">📦 Word Bank:</span>
                                ${chipsHtml}
                            </div>
                            <div style="display:flex; align-items:center; gap:14px; margin-top:4px;">
                                <span style="font-weight:700; font-size:18px; color:var(--text-dark);">Your Choice:</span>
                                <input type="text" class="blank-input" data-ans="${ans}" placeholder="Type answer..." style="width:230px; font-weight:700; font-size:18px; padding:8px 14px; border-radius:8px;">
                            </div>
                        </div>
                    `;
                }
                return `<input type="text" class="blank-input" data-ans="${ans}" placeholder="Type answer..." style="width:230px; font-weight:700; font-size:18px; padding:8px 14px; border-radius:8px;">`;
            }
        },
        'notes-completion': {
            id: 'notes-completion',
            aliases: ['notes', 'notes_completion'],
            name: 'Notes Completion',
            category: 'completion',
            defaultRubric: 'Complete the notes below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
            defaultStrategy: 'Use headings and bullet structure to navigate through the text chronologically.',
            renderInput: (q) => {
                const ans = q.ans || '';
                return `<input type="text" class="blank-input" data-ans="${ans}" placeholder="Type answer..." style="width:230px; font-weight:700; font-size:18px; padding:8px 14px; border-radius:8px;">`;
            }
        },
        'table-completion': {
            id: 'table-completion',
            aliases: ['table', 'table_completion'],
            name: 'Table Completion',
            category: 'completion',
            defaultRubric: 'Complete the table below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
            defaultStrategy: 'Read table headers horizontally and vertically to pinpoint the exact intersections in the text.',
            renderInput: (q) => {
                const ans = q.ans || '';
                return `<input type="text" class="blank-input" data-ans="${ans}" placeholder="Type answer..." style="width:200px; font-weight:700; font-size:18px; padding:8px 14px; border-radius:8px;">`;
            }
        },
        'flowchart-completion': {
            id: 'flowchart-completion',
            aliases: ['flowchart', 'flow-chart', 'flowchart_completion'],
            name: 'Flow-chart Completion',
            category: 'completion',
            defaultRubric: 'Complete the flow-chart below. Choose ONE WORD ONLY from the passage for each answer.',
            defaultStrategy: 'Follow sequence words (first, then, next, subsequently) to track process steps.',
            renderInput: (q) => {
                const ans = q.ans || '';
                return `<input type="text" class="blank-input" data-ans="${ans}" placeholder="Type answer..." style="width:220px; font-weight:700; font-size:18px; padding:8px 14px; border-radius:8px;">`;
            }
        },
        'short-answer': {
            id: 'short-answer',
            aliases: ['short_answer', 'short-answer-questions'],
            name: 'Short-Answer Questions',
            category: 'completion',
            defaultRubric: 'Answer the questions below. Choose NO MORE THAN THREE WORDS AND/OR A NUMBER from the passage.',
            defaultStrategy: 'Locate the question word (What, Which, Who, Where) and extract the exact factual entity.',
            renderInput: (q) => {
                const ans = q.ans || '';
                return `<input type="text" class="blank-input" data-ans="${ans}" placeholder="Type answer..." style="width:240px; font-weight:700; font-size:18px; padding:8px 14px; border-radius:8px;">`;
            }
        },
        'diagram-labelling': {
            id: 'diagram-labelling',
            aliases: ['diagram', 'diagram_labelling', 'map-labelling'],
            name: 'Diagram / Label Completion',
            category: 'completion',
            defaultRubric: 'Label the diagram below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
            defaultStrategy: 'Study spatial relationships and directional markers (above, below, adjacent, internally).',
            renderInput: (q) => {
                const ans = q.ans || '';
                return `<input type="text" class="blank-input" data-ans="${ans}" placeholder="Type answer..." style="width:220px; font-weight:700; font-size:18px; padding:8px 14px; border-radius:8px;">`;
            }
        }
    };

    class ReadingQuestionRegistry {
        static get(typeOrAlias) {
            if (!typeOrAlias) return null;
            const key = String(typeOrAlias).toLowerCase().trim();
            if (IELTS_READING_QUESTION_TYPES[key]) {
                return IELTS_READING_QUESTION_TYPES[key];
            }
            for (const id in IELTS_READING_QUESTION_TYPES) {
                const def = IELTS_READING_QUESTION_TYPES[id];
                if (def.aliases && def.aliases.includes(key)) {
                    return def;
                }
            }
            return null;
        }

        static resolve(q, context = {}) {
            // 1. Explicit question type declaration
            if (q && q.type) {
                const match = this.get(q.type);
                if (match) return match;
            }
            if (context && context.type) {
                const match = this.get(context.type);
                if (match) return match;
            }

            // 2. Intelligent heuristics for backwards-compatibility
            if (q && (q.boxOptions || (context && context.boxOptions))) {
                return IELTS_READING_QUESTION_TYPES['summary-box'];
            }
            if (q && (q.headings || (context && context.headings))) {
                return IELTS_READING_QUESTION_TYPES['matching-headings'];
            }
            if (q && q.ans) {
                const a = String(q.ans).trim().toUpperCase();
                if ((a === 'YES' || a === 'NO' || a === 'NOT GIVEN') && !q.options) {
                    if (q.isTF || (context && context.isTF)) {
                        return IELTS_READING_QUESTION_TYPES['tfng'];
                    }
                    return IELTS_READING_QUESTION_TYPES['ynng'];
                }
                if (a === 'TRUE' || a === 'FALSE') {
                    return IELTS_READING_QUESTION_TYPES['tfng'];
                }
                if (a.startsWith('PARAGRAPH')) {
                    return IELTS_READING_QUESTION_TYPES['matching-information'];
                }
            }
            if (q && q.options && Array.isArray(q.options)) {
                if (context && context.isFeatures) {
                    return IELTS_READING_QUESTION_TYPES['matching-features'];
                }
                return IELTS_READING_QUESTION_TYPES['multiple-choice'];
            }
            if (context && context.wordBank) {
                return IELTS_READING_QUESTION_TYPES['summary-completion'];
            }

            // Default to sentence completion
            return IELTS_READING_QUESTION_TYPES['sentence-completion'];
        }

        static renderInput(q, context = {}) {
            const handler = this.resolve(q, context);
            return handler.renderInput(q, context);
        }
    }

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

        static resolveDataPath(path) {
            if (!path) return null;
            const parts = path.split('.');
            
            // Check direct window property first (e.g. "module4Data.reading4a")
            if (parts[0] in window && window[parts[0]] !== undefined) {
                let current = window[parts[0]];
                for (let i = 1; i < parts.length; i++) {
                    if (current && typeof current === 'object' && parts[i] in current) {
                        current = current[parts[i]];
                    } else {
                        return null;
                    }
                }
                return current;
            }

            // Scan all window.module*Data keys dynamically (no hardcoded limit)
            const candidateDatasets = [];
            if (window.moduleData) candidateDatasets.push(window.moduleData);
            for (const k in window) {
                if (k !== 'moduleData' && /^module\d*Data$/i.test(k) && window[k] && typeof window[k] === 'object') {
                    candidateDatasets.push(window[k]);
                }
            }

            for (const dataset of candidateDatasets) {
                let current = dataset;
                let found = true;
                for (const part of parts) {
                    if (current && typeof current === 'object' && part in current) {
                        current = current[part];
                    } else {
                        found = false;
                        break;
                    }
                }
                if (found && current !== undefined) {
                    return current;
                }
            }

            return null;
        }

        static hydrateSlideFromData(section, el, data, skillCol) {
            if (!data || typeof data !== 'object') return;

            // Direct properties
            if (data.title) {
                const t = section.querySelector('[data-slot="title"], .slide-title, .title-main');
                if (t) t.innerHTML = data.title;
            }
            if (data.subtitle) {
                const s = section.querySelector('[data-slot="subtitle"], .slide-subtitle, .title-sub');
                if (s) s.innerHTML = data.subtitle;
            }
            if (data.badge || data.moduleNum) {
                const b = section.querySelector('[data-slot="badge"], .skill-badge, .title-module-badge');
                if (b) b.textContent = data.badge || `Module ${data.moduleNum}`;
            }
            if (data.instruction) {
                const inst = section.querySelector('[data-slot="instruction"], .slide-subtitle');
                if (inst) inst.textContent = data.instruction;
            }

            // Title slide specific: tags & roadmap
            if (data.tags && Array.isArray(data.tags)) {
                const tagsContainer = section.querySelector('[data-slot="tags"]');
                if (tagsContainer) {
                    tagsContainer.innerHTML = data.tags.map(t => `<span class="skill-chip" style="background:${t.bg}; color:#fff; font-size:15px; font-weight:700; padding:6px 14px; border-radius:20px;">${t.text}</span>`).join('');
                }
            }
            if (data.roadmap && Array.isArray(data.roadmap)) {
                const rmContainer = section.querySelector('[data-slot="roadmap"]');
                if (rmContainer) {
                    rmContainer.innerHTML = data.roadmap.map(item => `
                        <div class="roadmap-card" style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid ${skillCol}; border-radius:10px; padding:14px 18px; margin-bottom:12px; box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                            <div style="font-size:17.5px; font-weight:800; color:var(--text-dark); margin-bottom:4px;">${item.num ? `Section ${item.num}: ` : ''}${item.title}</div>
                            <div style="font-size:15px; color:#475569; line-height:1.5;">${item.desc}</div>
                        </div>
                    `).join('');
                }
            }

            // Walkthrough specific: excerpt, header, question, inputArea/wordBank, explanation
            if (data.excerpt || data.passageText) {
                const pText = section.querySelector('[data-slot="passage-text"]') || section.querySelector('[data-slot="passage"]');
                if (pText) pText.innerHTML = data.excerpt || data.passageText;
            }
            if (data.header || data.passageHeader) {
                const pHdr = section.querySelector('[data-slot="passage-header"]');
                if (pHdr) pHdr.innerHTML = data.header || data.passageHeader;
            }
            if (data.question || data.questionText) {
                const qText = section.querySelector('[data-slot="question-text"]') || section.querySelector('[data-slot="question-card"]');
                if (qText) qText.innerHTML = data.question || data.questionText;
            }
            let qKey = data.qKey || data.dataQ;
            if (!qKey && data.excerpt) {
                const match = data.excerpt.match(/data-q="([^"]+)"/);
                if (match) qKey = match[1];
            }
            if (!qKey && data.qNum) {
                qKey = `wt-${data.qNum}`;
            }

            if (qKey) {
                const qCard = section.querySelector('.q-card, [data-slot="question-card"]');
                if (qCard) qCard.setAttribute('data-q', qKey);
                const evBtn = section.querySelector('.syn-btn, [data-slot="evidence-btn"]');
                if (evBtn) {
                    evBtn.setAttribute('data-q', qKey);
                    if (data.evId) evBtn.setAttribute('data-ev', data.evId);
                    else evBtn.setAttribute('data-ev', `ev-${qKey}`);
                }
            }
            if (data.ans || data.inputAns) {
                const inputContainer = section.querySelector('[data-slot="input-area"]');
                if (inputContainer) {
                    inputContainer.innerHTML = ReadingQuestionRegistry.renderInput(data, data);
                }
            }
            if (data.explanation) {
                const expl = section.querySelector('[data-slot="explanation"], .item-explanation');
                if (expl) expl.innerHTML = data.explanation;
            }

            // Split reading specific: passage, wordBank, summaryText, questions
            if (data.passage) {
                const passEl = section.querySelector('[data-slot="passage"], .reading-pane');
                if (passEl) passEl.innerHTML = data.passage;
            }
            if (data.summaryText || (data.questions && Array.isArray(data.questions)) || data.summaryBox) {
                const qPane = section.querySelector('[data-slot="questions"], .question-pane');
                if (qPane) {
                    let html = '';
                    if (data.summaryText) {
                        const wbChips = (data.wordBank && Array.isArray(data.wordBank))
                            ? data.wordBank.map(w => `<span class="word-chip" data-word="${w}">${w}</span>`).join('')
                            : '';
                        html += `
                            ${wbChips ? `
                            <div class="card word-bank-card" style="border-left:5px solid var(--col-reading); margin-bottom:12px;">
                                <div class="word-bank-header" style="font-size:15px; font-weight:800; text-transform:uppercase; color:var(--col-reading); margin-bottom:8px;">📦 Word Bank (Use words exactly as shown)</div>
                                <div class="vocab-chips-container word-chips-container" style="display:flex; flex-wrap:wrap; gap:6px;">
                                    ${wbChips}
                                </div>
                            </div>` : ''}
                            <div class="card summary-box-card" style="padding:18px 22px; font-size:19.5px; line-height:2.1; border-radius:10px;">
                                ${data.summaryText}
                            </div>
                        `;
                    }
                    if (data.headings && Array.isArray(data.headings)) {
                        const headingsListHtml = data.headings.map(h => `
                            <div class="heading-item-row" style="font-size:18px; line-height:1.55; color:#0f172a;">
                                <span class="roman-pill">${h.roman}</span> <span>${h.text}</span>
                            </div>
                        `).join('');
                        html += `
                            <div class="card headings-card" style="background:#ffffff; border:1.5px solid #cbd5e1; border-left:6px solid var(--col-reading); padding:16px 20px; margin-bottom:14px; box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                                <div style="font-size:17px; font-weight:800; text-transform:uppercase; letter-spacing:0.04em; color:var(--col-reading); margin-bottom:10px;">📋 List of Headings</div>
                                <div style="display:flex; flex-direction:column; gap:4px;">
                                    ${headingsListHtml}
                                </div>
                            </div>
                        `;
                    }
                    if (data.questions && Array.isArray(data.questions)) {
                        const slideBadge = (el ? el.getAttribute('badge') : null) || data.badge || '';
                        const headingTitle = data.headingTitle || (slideBadge ? `📋 ${slideBadge.split('•')[1]?.trim() || slideBadge}` : '📋 Questions');
                        html += `<div style="font-size:16px; font-weight:800; text-transform:uppercase; color:var(--col-reading); margin-bottom:10px;">${headingTitle}</div>`;
                        html += data.questions.map(q => {
                            const inputHtml = ReadingQuestionRegistry.renderInput(q, data);
                            return `
                                <div class="q-card" data-q="${q.qNum || q.num || ''}" ${q.evId ? `data-ev="${q.evId}"` : ''} style="background:#ffffff; border:1px solid #cbd5e1; border-radius:10px; padding:12px 16px; margin-bottom:10px;">
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                                        <strong style="font-size:18px;">${q.text}</strong>
                                        ${q.evId ? `<button class="syn-btn" data-ev="${q.evId}" onclick="deckEngine.toggleSynonymExplanation('${q.qNum || q.num || ''}', '${q.evId}')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence">💡 Evidence</button>` : ''}
                                    </div>
                                    ${inputHtml}
                                </div>
                            `;
                        }).join('');
                    }
                    if (data.completionQuestions && Array.isArray(data.completionQuestions)) {
                        html += `<div style="font-size:16px; font-weight:800; text-transform:uppercase; color:var(--col-reading); margin-top:14px; margin-bottom:10px;">📋 Sentence Completion (ONE WORD ONLY)</div>`;
                        html += data.completionQuestions.map(q => `
                            <div class="q-card" data-q="${q.qNum}" ${q.evId ? `data-ev="${q.evId}"` : ''} style="background:#ffffff; border:1px solid #cbd5e1; border-radius:10px; padding:12px 16px; margin-bottom:10px; font-size:18px; line-height:1.7;">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                                    <div>${q.text}</div>
                                    ${q.evId ? `<button class="syn-btn" data-ev="${q.evId}" onclick="deckEngine.toggleSynonymExplanation('${q.qNum}', '${q.evId}')" style="padding:2px 8px; font-size:13px; margin-left:8px;" title="Highlight Evidence">💡 Evidence</button>` : ''}
                                </div>
                            </div>
                        `).join('');
                    }
                    if (data.summaryBox) {
                        html += data.summaryBox;
                    }
                    qPane.innerHTML = html;
                }
            }

            // Reading Walkthrough Masterclass Button Hydration
            const wtUrl = data.walkthroughUrl || data.walkthrough || (el ? (el.getAttribute('walkthrough-url') || el.getAttribute('data-walkthrough-ref')) : null);
            const wtTitle = data.walkthroughTitle || (el ? (el.getAttribute('walkthrough-title') || el.getAttribute('title')) : null) || 'Reading Question Walkthrough Masterclass';
            if (wtUrl) {
                const actionRow = section.querySelector('.action-row');
                if (actionRow && !actionRow.querySelector('.reading-walkthrough-trigger-btn')) {
                    const wtBtn = document.createElement('button');
                    wtBtn.className = 'btn-action reading-walkthrough-trigger-btn';
                    wtBtn.setAttribute('data-walkthrough-ref', wtUrl);
                    wtBtn.setAttribute('data-walkthrough-title', wtTitle);
                    wtBtn.innerHTML = `🚀 Question Walkthrough`;
                    actionRow.appendChild(wtBtn);
                }
            }

            // Grammar Exercise Button Hydration
            const gUrl = data.grammarUrl || (el ? (el.getAttribute('grammar-url') || el.getAttribute('data-grammar-ref')) : null);
            const gTitle = data.grammarTitle || (el ? (el.getAttribute('grammar-title') || el.getAttribute('title')) : null) || 'Grammar Practice Exercises';
            if (gUrl) {
                let actionRow = section.querySelector('.action-row');
                if (!actionRow) {
                    actionRow = document.createElement('div');
                    actionRow.className = 'action-row';
                    actionRow.style.marginTop = '10px';
                    const pageContent = section.querySelector('.page-content');
                    if (pageContent) pageContent.appendChild(actionRow);
                }
                if (actionRow && !actionRow.querySelector('.grammar-exercise-trigger-btn')) {
                    const gBtn = document.createElement('button');
                    gBtn.className = 'btn-action grammar-exercise-trigger-btn';
                    gBtn.setAttribute('data-grammar-ref', gUrl);
                    gBtn.setAttribute('data-grammar-title', gTitle);
                    gBtn.innerHTML = `📝 Grammar Exercises`;
                    actionRow.appendChild(gBtn);
                }
            }

            // Vocabulary Hub / Cards Template Hydration
            if (data.words && Array.isArray(data.words)) {
                const vocabCardsContainer = section.querySelector('[data-slot="cards"], .vocab-hub-grid');
                const inspectorContainer = section.querySelector('[data-slot="inspector"], .vocab-inspector-pane');

                if (vocabCardsContainer) {
                    vocabCardsContainer.innerHTML = data.words.map((w, idx) => `
                        <div class="card vocab-term-card ${idx === 0 ? 'selected' : ''}" 
                             data-word="${w.word}" 
                             data-ipa="${w.ipa || ''}" 
                             data-pos="${w.pos || ''}" 
                             data-cefr="${w.cefr || 'B2'}"
                             data-def="${(w.def || '').replace(/"/g, '&quot;')}" 
                             data-colloc="${(w.colloc || '').replace(/"/g, '&quot;')}" 
                             data-example="${(w.example || '').replace(/"/g, '&quot;')}"
                             data-context="${(w.context || '').replace(/"/g, '&quot;')}"
                             style="cursor: pointer; padding: 12px 16px; border-radius: 12px; border: 1.5px solid ${idx === 0 ? 'var(--col-vocab, #059669)' : '#cbd5e1'}; background: ${idx === 0 ? '#ecfdf5' : '#ffffff'}; transition: all 0.2s ease; display: flex; justify-content: space-between; align-items: center; gap: 10px;">
                            <div style="display: flex; flex-direction: column; gap: 2px;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <strong style="font-size: 19px; color: var(--text-dark);">${w.word}</strong>
                                    <span style="background: rgba(5, 150, 105, 0.12); color: var(--col-vocab, #059669); font-size: 12.5px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">${w.pos || 'term'}</span>
                                    ${w.cefr ? `<span style="background: #e0e7ff; color: #4338ca; font-size: 11.5px; font-weight: 800; padding: 2px 5px; border-radius: 4px;">${w.cefr}</span>` : ''}
                                </div>
                                <span style="font-family: var(--font-mono, monospace); font-size: 14.5px; color: var(--text-muted);">${w.ipa || ''}</span>
                            </div>
                            <button class="pronounce-btn" data-speak="${w.word}" style="background: transparent; border: none; font-size: 19px; cursor: pointer; padding: 4px; border-radius: 6px;" title="Listen Pronunciation">🔊</button>
                        </div>
                    `).join('');
                }

                if (inspectorContainer && data.words.length > 0) {
                    const first = data.words[0];
                    inspectorContainer.innerHTML = `
                        <div class="card vocab-inspector-card" style="background: #ffffff; border: 2px solid var(--col-vocab, #059669); border-radius: 14px; padding: 20px 24px; box-shadow: 0 4px 16px rgba(5, 150, 105, 0.08); display: flex; flex-direction: column; gap: 12px; height: 100%; box-sizing: border-box;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 10px;">
                                <div>
                                    <h3 class="insp-word" style="font-size: 30px; font-weight: 800; color: var(--col-vocab, #059669); margin: 0;">${first.word}</h3>
                                    <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                                        <span class="insp-ipa" style="font-family: var(--font-mono, monospace); font-size: 17px; color: var(--text-muted); font-weight: 600;">${first.ipa || ''}</span>
                                        <span class="insp-pos" style="background: #d1fae5; color: #065f46; font-size: 13px; font-weight: 800; padding: 2px 7px; border-radius: 4px;">${first.pos || ''}</span>
                                        <span class="insp-cefr" style="background: #e0e7ff; color: #3730a3; font-size: 12.5px; font-weight: 800; padding: 2px 7px; border-radius: 4px;">${first.cefr || 'B2'}</span>
                                    </div>
                                </div>
                                <div style="display: flex; gap: 6px;">
                                    <button class="btn-action pronounce-btn" data-speak="${first.word}" data-lang="en-GB" style="padding: 5px 9px; font-size: 13.5px; font-weight: 700;" title="Listen UK">🇬🇧 UK</button>
                                    <button class="btn-action pronounce-btn" data-speak="${first.word}" data-lang="en-US" style="padding: 5px 9px; font-size: 13.5px; font-weight: 700;" title="Listen US">🇺🇸 US</button>
                                    <button class="btn-action pronounce-btn" data-speak="${first.word}" data-lang="en-AU" style="padding: 5px 9px; font-size: 13.5px; font-weight: 700;" title="Listen AU">🇦🇺 AU</button>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 10px; font-size: 17.5px; line-height: 1.6; overflow-y: auto;">
                                <div>
                                    <strong style="color: #059669; display: block; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">📖 Definition:</strong>
                                    <span class="insp-def" style="color: #1e293b;">${first.def || ''}</span>
                                </div>
                                <div style="background: #f8fafc; border-left: 4px solid var(--col-vocab, #059669); padding: 10px 14px; border-radius: 6px;">
                                    <strong style="display: block; font-size: 13.5px; text-transform: uppercase; letter-spacing: 0.05em; color: #059669; margin-bottom: 2px;">🔗 High-Scoring Collocations:</strong>
                                    <span class="insp-colloc" style="font-weight: 700; color: #0f172a;">${first.colloc || ''}</span>
                                </div>
                                <div>
                                    <strong style="color: #64748b; display: block; font-size: 13.5px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">🎯 IELTS Band 7.5+ Example:</strong>
                                    <span class="insp-example" style="font-style: italic; color: #334155;">"${first.example || ''}"</span>
                                </div>
                                ${first.context ? `
                                <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 8px 12px; border-radius: 6px; font-size: 15.5px;">
                                    <strong style="color: #1d4ed8; font-size: 12.5px; text-transform: uppercase;">Passage Context:</strong>
                                    <div class="insp-context" style="color: #1e3a8a; margin-top: 2px;">${first.context}</div>
                                </div>` : ''}
                            </div>
                        </div>
                    `;
                }
            }
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

                case 'wordbank':
                case 'bank':
                case 'chips':
                    return section.querySelector('[data-slot="wordbank"], .category-bank-card, .category-chip-pool, [data-slot="content"], [data-slot="grid"]');

                case 'sorter':
                case 'category-sorter':
                    return section.querySelector('[data-slot="sorter"], .category-sorter, [data-slot="content"], [data-slot="grid"]');

                case 'table':
                case 'contrast-card':
                case 'contrast':
                case 'card':
                case 'error-box':
                case 'right-table':
                    return section.querySelector('[data-slot="table"], [data-slot="contrast-card"], [data-slot="right-table"], [data-slot="rules-col"], [data-slot="guide"], [data-slot="questions"], .two-col > div:last-child');

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

                case 'num':
                case 'section-num':
                case 'modulenum':
                    return section.querySelector('[data-slot="num"], .section-number');

                case 'sublabel':
                    return section.querySelector('[data-slot="sublabel"], .section-sublabel');

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
            if (tmpl === 'keyword-strategy') return 'Reading Strategy • Keyword Deconstruction';
            if (tmpl === 'reading-split' || tmpl === 'split-view') return 'IELTS Reading • Split-View';
            if (tmpl === 'reading-flowchart') return 'Reading • Flow Chart Completion';
            if (tmpl === 'flowchart') return 'IELTS Reading • Flow Chart';
            if (tmpl === 'grammar-masterclass') return 'Grammar Masterclass';
            if (tmpl === 'vocab-cards') return 'Academic Lexicon';
            if (tmpl === 'syntax-rules') return 'Vocabulary • Syntax & Rules';
            if (tmpl === 'gap-fill-passage') {
                if (skill === 'read' || skill === 'reading') return 'Reading • Summary Completion';
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
                const skillBadge = section.querySelector('.skill-badge');
                if (skillBadge && (!skillBadge.style.background || skillBadge.style.background.includes('--col-'))) {
                    skillBadge.style.background = skillCol;
                }

                // Dynamic Data Binding: Hydrate from external data module if data-bind is provided
                const bindPath = el.getAttribute('data-bind') || el.getAttribute('data-data-key');
                if (bindPath) {
                    const dataObj = this.resolveDataPath(bindPath);
                    if (dataObj) {
                        this.hydrateSlideFromData(section, el, dataObj, skillCol);
                    }
                }

                // Fill direct text attributes (overrides data-bind if explicitly present on tag)
                ['title', 'subtitle', 'badge', 'tag', 'instruction'].forEach(attr => {
                    const val = el.getAttribute(attr);
                    if (val) {
                        const slotKey = (attr === 'tag') ? 'badge' : attr;
                        const target = section.querySelector(`[data-slot="${slotKey}"], [data-slot="${attr}"]`);
                        if (target) target.innerHTML = val;
                    }
                });

                // Section-divider specific enhancements
                const numEl = section.querySelector('[data-slot="num"], .section-number');
                if (numEl) {
                    const numSlot = el.querySelector('[slot="num"]');
                    const explicitNum = el.getAttribute('num') || el.getAttribute('data-num') || (numSlot ? numSlot.textContent.trim() : '');
                    if (explicitNum) {
                        numEl.innerHTML = explicitNum;
                    } else {
                        const badgeSlot = el.querySelector('[slot="badge"]');
                        const badgeVal = el.getAttribute('badge') || (badgeSlot ? badgeSlot.textContent.trim() : '') || '';
                        const match = badgeVal.match(/(\d+[a-z]?)/i);
                        if (match) numEl.innerHTML = match[1].toLowerCase();
                    }
                }
                const leftCol = section.querySelector('.section-left');
                if (leftCol) {
                    const leftBgAttr = el.getAttribute('left-bg') || el.getAttribute('data-left-bg');
                    if (leftBgAttr) {
                        leftCol.style.background = leftBgAttr;
                    } else {
                        const skillGradients = {
                            'read': 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                            'reading': 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                            'grammar': 'linear-gradient(135deg, #c2410c, #ea580c)',
                            'vocab': 'linear-gradient(135deg, #047857, #059669)',
                            'vocabulary': 'linear-gradient(135deg, #047857, #059669)',
                            'write': 'linear-gradient(135deg, #6d28d9, #7c3aed)',
                            'writing': 'linear-gradient(135deg, #6d28d9, #7c3aed)',
                            'review': 'linear-gradient(135deg, #b45309, #d97706)',
                            'title': 'linear-gradient(135deg, #14532d, #15803d)'
                        };
                        if (skillGradients[skill.toLowerCase()]) {
                            leftCol.style.background = skillGradients[skill.toLowerCase()];
                        }
                    }
                }

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
                        if ((targetSlotAttr === 'roadmap' || target.classList.contains('title-left')) && target.innerHTML.trim() !== '') {
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

                // Reading Walkthrough Masterclass attribute support
                const slideWtUrl = el.getAttribute('walkthrough-url') || el.getAttribute('data-walkthrough-ref');
                if (slideWtUrl) {
                    const slideWtTitle = el.getAttribute('walkthrough-title') || el.getAttribute('title') || 'Reading Question Walkthrough Masterclass';
                    const actionRow = section.querySelector('.action-row');
                    if (actionRow && !actionRow.querySelector('.reading-walkthrough-trigger-btn')) {
                        const wtBtn = document.createElement('button');
                        wtBtn.className = 'btn-action reading-walkthrough-trigger-btn';
                        wtBtn.setAttribute('data-walkthrough-ref', slideWtUrl);
                        wtBtn.setAttribute('data-walkthrough-title', slideWtTitle);
                        wtBtn.innerHTML = `🚀 Question Walkthrough`;
                        actionRow.appendChild(wtBtn);
                    }
                }

                // Grammar Exercise attribute support
                const slideGUrl = el.getAttribute('grammar-url') || el.getAttribute('data-grammar-ref');
                if (slideGUrl) {
                    const slideGTitle = el.getAttribute('grammar-title') || el.getAttribute('title') || 'Grammar Practice Exercises';
                    let actionRow = section.querySelector('.action-row');
                    if (!actionRow) {
                        actionRow = document.createElement('div');
                        actionRow.className = 'action-row';
                        actionRow.style.marginTop = '10px';
                        const pageContent = section.querySelector('.page-content');
                        if (pageContent) pageContent.appendChild(actionRow);
                    }
                    if (actionRow && !actionRow.querySelector('.grammar-exercise-trigger-btn')) {
                        const gBtn = document.createElement('button');
                        gBtn.className = 'btn-action grammar-exercise-trigger-btn';
                        gBtn.setAttribute('data-grammar-ref', slideGUrl);
                        gBtn.setAttribute('data-grammar-title', slideGTitle);
                        gBtn.innerHTML = `📝 Grammar Exercises`;
                        actionRow.appendChild(gBtn);
                    }
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

            // PASS 3: Font-scale injection (deferred to avoid startup jank on large decks)
            const applyFontScaleInline = () => {
                allSlides.forEach(slide => {
                    slide.querySelectorAll('*[style*="font-size"]').forEach(el => {
                        const styleStr = el.getAttribute('style');
                        if (styleStr && styleStr.includes('font-size') && !styleStr.includes('--font-scale')) {
                            const updated = styleStr.replace(/font-size\s*:\s*([0-9.]+)px/gi, (match, p1) => {
                                return `font-size: calc(${p1}px * var(--font-scale, 1))`;
                            });
                            el.setAttribute('style', updated);
                        }
                    });
                });
            };

            if (typeof window.requestIdleCallback === 'function') {
                window.requestIdleCallback(applyFontScaleInline, { timeout: 1000 });
            } else {
                setTimeout(applyFontScaleInline, 0);
            }

            // If no slide is marked active, activate the first slide
            if (!hasActiveSlide && allSlides.length > 0) {
                allSlides[0].classList.add('active', 'visible');
            }

            // Rebind StepRevealEngine if available
            if (window.stepRevealEngine && typeof window.stepRevealEngine.bindEvents === 'function') {
                window.stepRevealEngine.bindEvents();
            }
        }
    }

    // Expose IELTS Question Types and Registry
    TemplateEngine.IELTSQuestionTypes = IELTS_READING_QUESTION_TYPES;
    TemplateEngine.ReadingQuestionRegistry = ReadingQuestionRegistry;
    TemplateEngine.getQuestionType = (t) => ReadingQuestionRegistry.get(t);
    TemplateEngine.resolveQuestionType = (q, ctx) => ReadingQuestionRegistry.resolve(q, ctx);
    TemplateEngine.renderReadingInput = (q, ctx) => ReadingQuestionRegistry.renderInput(q, ctx);

    window.IELTSQuestionTypes = IELTS_READING_QUESTION_TYPES;
    window.ReadingQuestionRegistry = ReadingQuestionRegistry;

    // Execute immediately and synchronously before deck-engine starts
    window.TemplateEngine = TemplateEngine;
    TemplateEngine.init();
})();
