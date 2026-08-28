/**
 * Universal Reading Evidence & Synonym Highlighter (ReadingHighlighter)
 * 
 * Automatically manages all reading highlighting behaviors:
 * 1. Reveals evidence marks (<mark class="evidence">) and synonym pairs (.syn-pair-*) when checking or revealing answers.
 * 2. Clears highlights and explanations when resetting exercises.
 * 3. Smooth-scrolls the reading passage to center on the exact evidence when clicking synonym buttons.
 * 4. Adds glowing focus pulses when hovering over or selecting question items.
 * 5. Hooks transparently into DeckEngine's exercise methods.
 */

class ReadingHighlighter {
    constructor() {
        this.activeEvidenceId = null;
        this.init();
    }

    init() {
        this.bindSynonymClicks();
        this.bindQuestionHover();
        this.hookDeckEngine();
    }

    /**
     * Highlights all evidence and synonym pairs associated with an exercise container or current slide
     */
    highlightAll(containerId) {
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

        // Show all item explanations
        const container = containerId ? document.getElementById(containerId) : slide;
        if (container) {
            container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
        }
    }

    /**
     * Clears all evidence highlights, synonym badges, and explanations in the slide
     */
    clearAll(containerId) {
        const slide = this.getSlideForContainer(containerId);
        if (!slide) return;

        slide.querySelectorAll('mark.evidence').forEach(mark => {
            mark.classList.remove('highlighted', 'glow-pulse');
        });

        slide.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(span => {
            span.classList.remove('active-syn');
        });

        const container = containerId ? document.getElementById(containerId) : slide;
        if (container) {
            container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.remove('show'));
        }

        this.activeEvidenceId = null;
    }

    /**
     * Toggles highlight and smooth-scrolls to specific evidence for question qKey
     */
    focusEvidence(qKey, evId) {
        if (!evId && qKey) {
            evId = `ev-${qKey}`;
        }

        let evTarget = evId ? document.getElementById(evId) : null;
        if (!evTarget && qKey) {
            evTarget = document.querySelector(`mark.evidence[data-q="${qKey}"], mark.evidence#ev-${qKey}, mark.evidence[data-ev="${evId}"]`);
        }
        if (!evTarget && evId) {
            evTarget = document.querySelector(`mark.evidence[data-ev="${evId}"]`);
        }

        const synSpans = document.querySelectorAll(`[data-q="${qKey}"]`);
        const isCurrentlyActive = evTarget && evTarget.classList.contains('highlighted') && this.activeEvidenceId === (evId || qKey);

        // Clear all previous single-question highlights
        document.querySelectorAll('mark.evidence').forEach(m => m.classList.remove('highlighted', 'glow-pulse'));
        document.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.remove('active-syn'));

        if (!isCurrentlyActive && evTarget) {
            evTarget.classList.add('highlighted', 'glow-pulse');
            synSpans.forEach(s => s.classList.add('active-syn'));
            this.activeEvidenceId = evId || qKey;

            // Smooth scroll into view inside the scrollable reading pane
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

            // Remove pulse animation after 2.5s while keeping highlight
            setTimeout(() => {
                evTarget.classList.remove('glow-pulse');
            }, 2500);
        } else {
            this.activeEvidenceId = null;
        }
    }

    showEvidence(qKey, evId) {
        this.focusEvidence(qKey, evId);
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
     * Auto-binds click handlers on synonym buttons and question cards
     */
    bindSynonymClicks() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.syn-btn');
            if (btn) {
                const dataQ = btn.dataset.q;
                const dataEv = btn.dataset.ev;
                if (dataQ) {
                    e.preventDefault();
                    this.focusEvidence(dataQ, dataEv);
                    const qCard = btn.closest('.q-card');
                    if (qCard) {
                        const exp = qCard.querySelector('.item-explanation');
                        if (exp) exp.classList.toggle('show');
                    }
                }
                return;
            }

            // Clicking question card text focuses evidence
            const qCard = e.target.closest('.q-card[data-q]');
            if (qCard && !e.target.closest('select, input, button')) {
                const dataQ = qCard.dataset.q;
                if (dataQ) {
                    this.focusEvidence(dataQ);
                }
            }
        });
    }

    /**
     * Auto-binds question card hover for interactive previewing
     */
    bindQuestionHover() {
        document.querySelectorAll('.q-card[data-q]').forEach(card => {
            const qKey = card.dataset.q;
            card.addEventListener('mouseenter', () => {
                document.querySelectorAll(`mark.evidence[id*="${qKey}"]`).forEach(m => m.classList.add('hover-preview'));
            });
            card.addEventListener('mouseleave', () => {
                document.querySelectorAll(`mark.evidence[id*="${qKey}"]`).forEach(m => m.classList.remove('hover-preview'));
            });
        });
    }

    /**
     * Transparently hooks into DeckEngine's check/reveal/reset methods
     */
    hookDeckEngine() {
        if (typeof window.DeckEngine !== 'undefined') {
            const self = this;

            // Hook checkBlanks & checkSelects
            const origCheckBlanks = DeckEngine.prototype.checkBlanks;
            DeckEngine.prototype.checkBlanks = function (containerId) {
                origCheckBlanks.call(this, containerId);
                self.highlightAll(containerId);
            };

            const origCheckSelects = DeckEngine.prototype.checkSelects;
            DeckEngine.prototype.checkSelects = function (containerId) {
                origCheckSelects.call(this, containerId);
                self.highlightAll(containerId);
            };

            // Hook revealBlanks & revealSelects
            const origRevealBlanks = DeckEngine.prototype.revealBlanks;
            DeckEngine.prototype.revealBlanks = function (containerId) {
                origRevealBlanks.call(this, containerId);
                self.highlightAll(containerId);
            };

            const origRevealSelects = DeckEngine.prototype.revealSelects;
            DeckEngine.prototype.revealSelects = function (containerId) {
                origRevealSelects.call(this, containerId);
                self.highlightAll(containerId);
            };

            // Hook resetBlanks & resetSelects
            const origResetBlanks = DeckEngine.prototype.resetBlanks;
            DeckEngine.prototype.resetBlanks = function (containerId) {
                origResetBlanks.call(this, containerId);
                self.clearAll(containerId);
            };

            const origResetSelects = DeckEngine.prototype.resetSelects;
            DeckEngine.prototype.resetSelects = function (containerId) {
                origResetSelects.call(this, containerId);
                self.clearAll(containerId);
            };

            // Hook toggleSynonymExplanation
            DeckEngine.prototype.toggleSynonymExplanation = function (qKey, evId) {
                self.focusEvidence(qKey, evId);
            };
        }
    }
}

// Inject glow and preview CSS styles for evidence marks
(function () {
    const style = document.createElement('style');
    style.id = 'readingHighlighterStyles';
    style.textContent = `
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
            box-shadow: 0 0 0 4px rgba(234, 179, 8, 0.45);
            background: #fef9c3 !important;
        }
        mark.evidence.hover-preview {
            background: rgba(254, 240, 138, 0.5) !important;
            border-bottom: 2px dashed #ca8a04 !important;
        }
    `;
    document.head.appendChild(style);
})();

// Global auto-instantiation
let readingHighlighter;
window.addEventListener('DOMContentLoaded', () => {
    readingHighlighter = new ReadingHighlighter();
});
