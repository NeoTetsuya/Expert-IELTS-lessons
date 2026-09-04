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
                container.querySelector('.opt-card') ||
                container.querySelector('.choice-group') ||
                container.querySelector('.tfng-group') ||
                container.querySelector('.ynng-group') ||
                container.querySelector('.mcq-options-container')
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

        // 2. On Strategy slides, allow clicking a strategy card to toggle its keyword highlighting and target reveal
        document.querySelectorAll('.strategy-card').forEach(card => {
            if (card.dataset.strategyBound) return;
            card.dataset.strategyBound = 'true';
            card.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
                const syns = card.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3, .vocab-word');
                const isAnyActive = card.classList.contains('revealed') || Array.from(syns).some(s => s.classList.contains('active-syn') || s.classList.contains('active-vocab'));
                if (isAnyActive) {
                    card.classList.remove('revealed');
                    syns.forEach(s => s.classList.remove('active-syn', 'active-vocab'));
                } else {
                    card.classList.add('revealed');
                    syns.forEach(s => {
                        if (s.classList.contains('vocab-word')) {
                            s.classList.add('active-vocab');
                        } else {
                            s.classList.add('active-syn');
                        }
                    });
                }
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

        // 1. Check for question cards / strategy cards
        const qCards = Array.from(container.querySelectorAll('.q-card, .strategy-card'));
        qCards.forEach(card => {
            const inputs = Array.from(card.querySelectorAll('.blank-input, .select-input'));
            const choiceGroups = Array.from(card.querySelectorAll('.choice-group, .tfng-group, .ynng-group, .mcq-options, .mcq-options-container'));
            const synSpans = Array.from(card.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3, .vocab-word, .vocab-term'));
            
            let isUnsolved = false;
            if (inputs.length > 0) {
                isUnsolved = inputs.some(inp => !inp.classList.contains('correct'));
            } else if (choiceGroups.length > 0) {
                isUnsolved = choiceGroups.some(g => !g.querySelector('.selected.correct'));
            } else if (synSpans.length > 0) {
                isUnsolved = !card.classList.contains('revealed') && synSpans.some(s => !s.classList.contains('active-syn') && !s.classList.contains('active-vocab'));
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

        // 3. Check for standalone choice / TFNG groups not inside a .q-card
        const allChoiceGroups = Array.from(container.querySelectorAll('.choice-group, .tfng-group, .ynng-group, .mcq-options, .mcq-options-container'));
        allChoiceGroups.forEach(group => {
            if (!group.closest('.q-card, .strategy-card') && group.dataset.state !== 'revealed' && !group.querySelector('.selected.correct')) {
                units.push({
                    type: 'choice-group',
                    el: group
                });
            }
        });

        // 4. Check for multi-option cards (.opt-card)
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
        if (!card) return;

        const parentSlide = card.closest('.slide') || document.querySelector('.slide.active');

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

        // Reveal choice / TFNG buttons inside card
        card.querySelectorAll('.choice-group, .tfng-group, .ynng-group, .mcq-options, .mcq-options-container').forEach(group => {
            const targetAns = (group.dataset.ans || group.getAttribute('data-ans') || '').trim().toLowerCase();
            if (targetAns) {
                group.dataset.state = 'revealed';
                const validAnswers = targetAns.split('|').map(a => a.trim().toLowerCase());
                group.querySelectorAll('.choice-btn, .tfng-btn, .option-btn, .mcq-card-option, [data-choice]').forEach(btn => {
                    const val = (btn.dataset.choice || btn.innerText || '').trim().toLowerCase();
                    btn.classList.remove('selected', 'wrong');
                    if (validAnswers.includes(val)) {
                        btn.classList.add('selected', 'correct');
                        btn.dataset.state = 'correct';
                    } else {
                        btn.dataset.state = 'idle';
                    }
                });
            }
        });

        // Reveal direct keyword and vocabulary highlights inside card
        card.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => {
            s.classList.add('active-syn');
        });
        card.querySelectorAll('.vocab-word, .vocab-term').forEach(v => {
            v.classList.add('active-vocab');
        });

        // Also activate corresponding synonyms in passage & smooth center evidence (Evidence Grounding)
        if (parentSlide) {
            const qId = card.dataset.q;
            if (qId) {
                parentSlide.querySelectorAll(`[data-q="${qId}"].syn-pair-1, [data-q="${qId}"].syn-pair-2, [data-q="${qId}"].syn-pair-3, .syn-pair-1[data-q="${qId}"], .syn-pair-2[data-q="${qId}"]`).forEach(s => s.classList.add('active-syn'));
                parentSlide.querySelectorAll(`mark.evidence[data-q="${qId}"], mark.evidence#ev-${qId}`).forEach(m => m.classList.add('highlighted'));

                // Smoothly scroll reading passage to center target evidence
                const targetEvidence = parentSlide.querySelector(`mark.evidence[data-q="${qId}"], mark.evidence#ev-${qId}, [data-q="${qId}"].syn-pair-1`);
                if (targetEvidence) {
                    targetEvidence.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
            // For single-question walkthroughs, activate all slide synonyms
            if (parentSlide.querySelector('.walkthrough-container')) {
                parentSlide.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.add('active-syn'));
            }
        }

        card.classList.add('revealed');

        // Show explanation box if exists
        const exp = card.querySelector('.item-explanation');
        if (exp) {
            exp.classList.add('show');
            const wtContainer = card.closest('.walkthrough-container');
            if (wtContainer) {
                setTimeout(() => {
                    exp.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 50);
            }
        }

        // Auto-trigger evidence highlight in passage if in reading split question-pane
        if (!card.classList.contains('strategy-card')) {
            const qId = card.dataset.q;
            const synBtn = card.querySelector('.syn-btn');
            const evId = synBtn ? synBtn.dataset.ev : (qId ? `ev-${qId}` : null);
            if (qId && window.readingHighlighter) {
                window.readingHighlighter.showEvidence(qId, evId);
            }
        }
    }

    revealSingleChoiceGroup(group) {
        if (!group) return;
        const targetAns = (group.dataset.ans || group.getAttribute('data-ans') || '').trim().toLowerCase();
        if (!targetAns) return;

        group.dataset.state = 'revealed';
        const validAnswers = targetAns.split('|').map(a => a.trim().toLowerCase());

        group.querySelectorAll('.choice-btn, .tfng-btn, .option-btn, .mcq-card-option, [data-choice]').forEach(btn => {
            const val = (btn.dataset.choice || btn.innerText || '').trim().toLowerCase();
            btn.classList.remove('selected', 'wrong');
            if (validAnswers.includes(val)) {
                btn.classList.add('selected', 'correct');
                btn.dataset.state = 'correct';
            } else {
                btn.dataset.state = 'idle';
            }
        });

        const parent = group.closest('.card, .q-card, .q-item, .exercise-box, div');
        if (parent) {
            const exp = parent.querySelector('.item-explanation');
            if (exp) exp.classList.add('show');
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
            }
        }
    }

    revealNextOnActiveSlide(broadcast = true) {
        const activeSlide = document.querySelector('.slide.active');
        if (!activeSlide) return;
        this.revealNextInContainer(activeSlide, broadcast);
    }

    revealNextInContainer(container, broadcast = true) {
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
        } else if (nextUnit.type === 'choice-group') {
            this.revealSingleChoiceGroup(nextUnit.el);
            nextUnit.el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else if (nextUnit.type === 'opt-card') {
            nextUnit.el.classList.add('selected', 'correct-opt');
            nextUnit.el.classList.remove('wrong-opt');
            nextUnit.el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('STEP_REVEAL_CMD', {});
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

// Global instantiation & global helpers
function initStepReveal() {
    if (!window.stepRevealEngine) {
        window.stepRevealEngine = new StepRevealEngine(window.deckEngine);
    } else {
        window.stepRevealEngine.bindEvents();
    }
}

window.stepReveal = function(btn) {
    if (!window.stepRevealEngine) {
        window.stepRevealEngine = new StepRevealEngine(window.deckEngine);
    }
    const container = btn ? (btn.closest('.slide') || btn.closest('.question-pane') || btn.closest('.page-content') || btn.closest('.notebook') || document.querySelector('.slide.active')) : document.querySelector('.slide.active');
    window.stepRevealEngine.revealNextInContainer(container || document.querySelector('.slide.active'));
};

window.addEventListener('DOMContentLoaded', () => {
    initStepReveal();
});
