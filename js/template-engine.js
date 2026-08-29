/**
 * =========================================================================
 * TEMPLATE ENGINE (Exact Design-System Compatible for file:// and http://)
 * Expert IELTS Course Presentations Architecture
 * =========================================================================
 */

(function () {
    'use strict';

    // 13 Master Built-in Slide Templates
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

<!-- 3. UP-TO-DOWN (STACKED) 1-QUESTION WALKTHROUGH TEMPLATE (LARGE FONTS) -->
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

                    <p class="slide-subtitle" style="font-size: 19px; color: var(--text-muted); margin-bottom: 6px;" data-slot="subtitle">
                        Compare the dedicated passage excerpt with the question below to evaluate your answer.
                    </p>

                    <!-- Centered Walkthrough Container -->
                    <div class="walkthrough-container" style="max-width: 1550px; width: 96%; margin: auto; display: flex; flex-direction: column; gap: 18px; justify-content: center; flex: 1; min-height: 0;">
                        <!-- Top Box: Dedicated Passage Excerpt -->
                        <div class="card" style="background: #ffffff; border: 2px solid #93c5fd; border-left: 7px solid var(--col-reading); border-radius: 14px; padding: 24px 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">
                            <div style="font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--col-reading); margin-bottom: 10px;" data-slot="passage-header">
                                📖 Relevant Passage Excerpt
                            </div>
                            <p style="font-size: 26px; line-height: 1.8; margin-bottom: 0; color: #0f172a;" data-slot="passage-text"></p>
                        </div>

                        <!-- Bottom Box: Interactive Question Card -->
                        <div class="q-card" style="background: #ffffff; border: 2px solid #cbd5e1; border-left: 7px solid var(--col-reading); border-radius: 14px; padding: 24px 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.03);" data-slot="question-card">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
                                <span style="font-weight: 700; font-size: 25px; line-height: 1.65; color: #0f172a;" data-slot="question-text"></span>
                                <button class="syn-btn" style="flex-shrink: 0; font-size: 16px; padding: 8px 18px; font-weight: 700;" data-slot="evidence-btn">💡 Evidence</button>
                            </div>

                            <div style="margin-top: 16px; display: flex; align-items: center; gap: 16px;" data-slot="input-area"></div>

                            <div class="item-explanation" style="font-size: 21px; line-height: 1.7; margin-top: 16px; padding: 16px 22px; border-radius: 8px;" data-slot="explanation"></div>
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
                <div class="page-content" style="padding: 28px 48px 24px;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-reading); font-size: 14px; padding: 4px 12px;" data-slot="badge"></span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <div class="two-col" style="flex: 1; min-height: 0; gap: 24px;">
                        <!-- Left Pane: Full Passage -->
                        <div class="reading-pane" style="flex: 1.15;" data-slot="passage"></div>

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
                <div class="page-content" style="padding: 28px 48px 24px;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-reading); font-size: 14px; padding: 4px 12px;" data-slot="badge">Reading Strategy • Pre-Reading</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p class="slide-subtitle" style="font-size: 19px; color: var(--text-muted); margin-bottom: 12px;" data-slot="subtitle"></p>

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
                <div class="page-content" style="padding: 28px 48px 24px;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-grammar); font-size: 14px; padding: 4px 12px;" data-slot="badge">Grammar Masterclass</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <div class="two-col" style="flex: 1; min-height: 0; gap: 24px;" data-slot="content"></div>
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
                <div class="page-content" style="padding: 28px 48px 24px;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-grammar); font-size: 14px; padding: 4px 12px;" data-slot="badge"></span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p style="font-size: 19px; color: var(--text-muted); margin-bottom: 12px;" data-slot="instruction"></p>

                    <div data-slot="grid"></div>

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

<!-- 8. WRITING TASK 2 MODEL TEMPLATE -->
<template id="tmpl-writing-model">
    <section class="slide" data-skill="write">
        <div class="slide-inner">
            <div class="notebook">
                <div class="skill-stripe" style="background: var(--col-writing);"></div>
                <div class="page-content" style="padding: 28px 48px 24px;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-writing); font-size: 14px; padding: 4px 12px;" data-slot="badge">IELTS Writing Task 2 • Model Answer</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <div class="two-col" style="flex: 1; min-height: 0; gap: 24px;">
                        <!-- Left Col: Prompt & Plan -->
                        <div style="display: flex; flex-direction: column; gap: 14px; flex: 0.95; overflow-y: auto;" data-slot="left-col"></div>

                        <!-- Right Col: Band 6+ Model Essay -->
                        <div class="card" style="background: #ffffff; border-left: 6px solid var(--col-writing); padding: 22px 28px; flex: 1.05; margin-bottom: 0; overflow-y: auto;" data-slot="model-essay"></div>
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
                <div class="page-content" style="padding: 28px 48px 24px;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-vocab); font-size: 14px; padding: 4px 12px;" data-slot="badge">Academic Lexicon</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p style="font-size: 19px; color: var(--text-muted); margin-bottom: 14px;" data-slot="subtitle">
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
                <div class="page-content" style="padding: 28px 48px 24px;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-vocab); font-size: 14px; padding: 4px 12px;" data-slot="badge">Vocabulary • Syntax &amp; Rules</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <div class="card" style="background: rgba(16, 185, 129, 0.08); border-left: 5px solid var(--col-vocab); font-size: 21px; font-style: italic; line-height: 1.6; margin-bottom: 12px; padding: 16px 22px;" data-slot="sentence"></div>

                    <div class="two-col" style="flex: 1; min-height: 0; gap: 18px;">
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; flex: 1.1; overflow-y: auto;" data-slot="parts-of-speech"></div>
                        <div class="card" style="background: #ffffff; border-left: 5px solid var(--col-grammar); padding: 16px 20px; flex: 0.9; margin-bottom:0; overflow-y:auto;" data-slot="rules"></div>
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
                <div class="page-content" style="padding: 28px 48px 24px;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-vocab); font-size: 14px; padding: 4px 12px;" data-slot="badge"></span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <div class="two-col" style="flex: 1; min-height: 0; gap: 18px;">
                        <div class="card" style="background: #ffffff; border-left: 5px solid var(--col-vocab); padding: 18px 22px; flex: 1.1; margin-bottom:0; overflow-y: auto;" data-slot="passage"></div>
                        <div style="display: flex; flex-direction: column; gap: 12px; flex: 0.9; overflow-y: auto;" data-slot="rules-col"></div>
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
                <div class="page-content" style="padding: 28px 48px 24px;">
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
                <div class="page-content" style="padding: 28px 48px 24px;">
                    <div class="slide-header">
                        <div class="slide-title-group">
                            <span class="skill-badge" style="background: var(--col-review); font-size: 14px; padding: 4px 12px;" data-slot="badge">Module Mastery</span>
                            <h2 class="slide-title" style="font-size: 32px;" data-slot="title"></h2>
                        </div>
                        <div class="slide-number" style="font-size: 20px; font-weight: 700;" data-slot="slide-number">00 / 00</div>
                    </div>

                    <p class="slide-subtitle" style="font-size: 19px; color: var(--text-muted); margin-bottom: 14px;" data-slot="subtitle"></p>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; flex:1; min-height:0; overflow-y:auto;" data-slot="grid"></div>
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

        static expandSlides() {
            const slideElements = document.querySelectorAll('slide-card, [data-template]');
            const totalSlides = slideElements.length;
            if (totalSlides === 0) return;

            slideElements.forEach((el, index) => {
                const templateName = el.getAttribute('template') || el.getAttribute('data-template');
                const templateId = templateName.startsWith('tmpl-') ? templateName : `tmpl-${templateName}`;
                const templateEl = document.getElementById(templateId);

                if (!templateEl) {
                    console.error(`TemplateEngine: Template #${templateId} not found for slide ${index + 1}!`);
                    return;
                }

                // Clone template content
                const clone = templateEl.content.cloneNode(true);
                const section = clone.querySelector('section.slide');

                // Assign slide ID and index
                const slideNumStr = String(index + 1).padStart(2, '0');
                const totalNumStr = String(totalSlides).padStart(2, '0');
                const slideId = el.getAttribute('id') || `slide-${index + 1}`;
                section.id = slideId;

                // Transfer skill attribute (read, grammar, vocab, write, review)
                const skill = el.getAttribute('skill') || el.getAttribute('data-skill') || section.getAttribute('data-skill') || 'read';
                section.setAttribute('data-skill', skill);

                // Add active and visible class to first slide
                if (index === 0) {
                    section.classList.add('active', 'visible');
                }

                // Update dynamic slide number in header
                const numEl = section.querySelector('[data-slot="slide-number"], .slide-number');
                if (numEl) {
                    numEl.textContent = `${slideNumStr} / ${totalNumStr}`;
                }

                // Fill direct text attributes
                ['title', 'subtitle', 'badge', 'instruction'].forEach(attr => {
                    const val = el.getAttribute(attr);
                    if (val) {
                        const target = section.querySelector(`[data-slot="${attr}"]`);
                        if (target) target.innerHTML = val;
                    }
                });

                // Transfer all named slots from child elements
                const slotChildren = el.querySelectorAll('[slot]');
                slotChildren.forEach(child => {
                    const slotName = child.getAttribute('slot');
                    const target = section.querySelector(`[data-slot="${slotName}"]`);
                    if (target) {
                        // Transfer attributes from slot child if present
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

                        // Copy inner HTML
                        target.innerHTML = child.innerHTML;
                    }
                });

                // If element has raw HTML children without explicit slot and target has default slot
                if (slotChildren.length === 0 && el.innerHTML.trim() !== '') {
                    const defaultSlot = section.querySelector('[data-slot="content"], [data-slot="grid"]');
                    if (defaultSlot) defaultSlot.innerHTML = el.innerHTML;
                }

                // Replace <slide-card> with fully expanded <section class="slide">
                el.parentNode.replaceChild(section, el);
            });
        }
    }

    // Execute immediately and synchronously before deck-engine starts
    window.TemplateEngine = TemplateEngine;
    TemplateEngine.init();
})();
