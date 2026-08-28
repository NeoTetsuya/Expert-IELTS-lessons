/**
 * ==========================================================================
 * STEP-BY-STEP REVEAL ENGINE (StepRevealEngine)
 * Enables single-item question reveal for Socratic IELTS classroom teaching
 * - Click any question card to reveal just that question & explanation
 * - Auto-scrolls reading passage to center on target evidence
 * - Keyboard shortcut: 'E' to step-reveal next unsolved question
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

        // Shortcut 'E' to reveal next question on active slide
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'e' || e.key === 'E') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                e.preventDefault();
                this.revealNextOnActiveSlide();
            }
        });
    }

    bindEvents() {
        // Allow clicking directly on question cards or badges to toggle single reveal
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

        // Add Step Reveal button to action rows
        document.querySelectorAll('.action-row').forEach(row => {
            if (row.querySelector('.btn-step-reveal')) return;
            const btn = document.createElement('button');
            btn.className = 'btn-action btn-step-reveal';
            btn.innerHTML = '👉 Step Reveal (E)';
            btn.title = 'Reveal questions one by one for classroom discussion';
            btn.onclick = () => this.revealNextInContainer(row.parentElement);
            row.insertBefore(btn, row.children[1] || null);
        });

        this.injectStyles();
    }

    revealSingleCard(card) {
        // Reveal blank inputs
        card.querySelectorAll('.blank-input').forEach(input => {
            if (input.dataset.ans) {
                const acceptable = input.dataset.ans.split('|')[0];
                input.value = acceptable;
                input.classList.add('correct');
                input.classList.remove('incorrect');
            }
        });

        // Reveal select dropdowns
        card.querySelectorAll('.select-input').forEach(sel => {
            if (sel.dataset.ans) {
                sel.value = sel.dataset.ans;
                sel.classList.add('correct');
                sel.classList.remove('incorrect');
            }
        });

        // Show explanation box if exists
        const exp = card.querySelector('.item-explanation');
        if (exp) exp.style.display = 'block';

        // Auto-trigger evidence highlight in passage if linked
        const qId = card.dataset.q;
        if (qId && window.readingHighlighter) {
            window.readingHighlighter.showEvidence(qId);
        }
    }

    revealNextOnActiveSlide() {
        const activeSlide = document.querySelector('.slide.active');
        if (!activeSlide) return;
        this.revealNextInContainer(activeSlide);
    }

    revealNextInContainer(container) {
        if (!container) return;
        const cards = Array.from(container.querySelectorAll('.q-card'));
        const unrevealed = cards.find(card => {
            const blank = card.querySelector('.blank-input');
            const select = card.querySelector('.select-input');
            if (blank && !blank.classList.contains('correct')) return true;
            if (select && !select.classList.contains('correct')) return true;
            return false;
        });

        if (unrevealed) {
            this.revealSingleCard(unrevealed);
            unrevealed.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
