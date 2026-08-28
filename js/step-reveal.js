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
        // 1. Allow clicking directly on question cards or single reveal button
        document.querySelectorAll('.q-card').forEach(card => {
            if (card.dataset.stepBound) return;
            card.dataset.stepBound = 'true';

            // Add a subtle individual reveal icon if not present
            const header = card.querySelector('div') || card;
            const singleRevealBtn = document.createElement('button');
            singleRevealBtn.className = 'btn-single-reveal';
            singleRevealBtn.innerHTML = '👁️ Reveal';
            singleRevealBtn.title = 'Reveal only this answer (Shortcut: click card or press E)';
            singleRevealBtn.onclick = (ev) => {
                ev.stopPropagation();
                this.revealSingleCard(card);
            };

            const synBtn = card.querySelector('.syn-btn');
            if (synBtn) {
                synBtn.parentNode.insertBefore(singleRevealBtn, synBtn);
            } else {
                header.appendChild(singleRevealBtn);
            }
        });

        // 2. Add Step Reveal button to action rows across ALL exercise slides
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
                btn.title = 'Reveal questions one by one for classroom discussion';
                btn.onclick = () => this.revealNextInContainer(container);
                row.insertBefore(btn, row.children[1] || null);
            }
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
            const isUnsolved = inputs.length > 0
                ? inputs.some(inp => !inp.classList.contains('correct'))
                : !card.classList.contains('revealed');

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

        card.classList.add('revealed');

        // Show explanation box if exists
        const exp = card.querySelector('.item-explanation');
        if (exp) {
            exp.classList.add('show');
            exp.style.display = 'block';
        }

        // Auto-trigger evidence highlight in passage if linked
        const qId = card.dataset.q;
        if (qId && window.readingHighlighter) {
            window.readingHighlighter.showEvidence(qId);
        } else if (qId && window.deckEngine) {
            const synBtn = card.querySelector('.syn-btn');
            const evId = synBtn ? synBtn.dataset.ev : `ev-${qId}`;
            if (evId) window.deckEngine.toggleSynonymExplanation(qId, evId);
        }
    }

    revealSingleInput(input) {
        if (!input || !input.dataset.ans) return;

        if (input.classList.contains('blank-input')) {
            input.value = input.dataset.ans.split('|')[0];
            input.classList.add('correct');
            input.classList.remove('wrong', 'incorrect');
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
            .btn-single-reveal {
                background: rgba(37, 99, 235, 0.12);
                border: 1px solid rgba(37, 99, 235, 0.35);
                color: var(--col-reading, #2563eb);
                font-size: 11.5px;
                font-weight: 700;
                padding: 3px 8px;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.18s ease;
                margin-left: 6px;
            }
            .btn-single-reveal:hover {
                background: var(--col-reading, #2563eb);
                color: #ffffff;
            }
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

// Global instantiation
window.stepRevealEngine = new StepRevealEngine();
