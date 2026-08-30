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

        // Also apply to preview clone in presenter view if present
        const previewClone = document.querySelector('.slide.preview-clone');
        if (previewClone) {
            previewClone.querySelectorAll('mark.evidence').forEach(m => m.classList.add('highlighted'));
            previewClone.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.add('active-syn'));
            previewClone.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
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
     * Clears all evidence highlights, synonym badges, and explanations in the slide
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

        // Also clear in preview clone
        const previewClone = document.querySelector('.slide.preview-clone');
        if (previewClone) {
            previewClone.querySelectorAll('mark.evidence').forEach(m => m.classList.remove('highlighted', 'glow-pulse'));
            previewClone.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.remove('active-syn'));
            previewClone.querySelectorAll('.item-explanation').forEach(exp => exp.classList.remove('show'));
        }

        const container = containerId ? document.getElementById(containerId) : slide;
        if (container) {
            container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.remove('show'));
        }

        this.activeEvidenceId = null;

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EVIDENCE_CLEAR', { containerId });
        }
    }

    /**
     * Toggles highlight and smooth-scrolls to specific evidence for question qKey
     */
    focusEvidence(qKey, evId, broadcast = true) {
        if (!evId && qKey) {
            evId = `ev-${qKey}`;
        }

        const allEvTargets = [];
        if (evId) {
            const byId = document.getElementById(evId);
            if (byId) allEvTargets.push(byId);
            document.querySelectorAll(`mark.evidence[data-ev="${evId}"], mark.evidence#${evId}`).forEach(el => {
                if (!allEvTargets.includes(el)) allEvTargets.push(el);
            });
        }
        if (qKey) {
            document.querySelectorAll(`mark.evidence[data-q="${qKey}"], mark.evidence#ev-${qKey}`).forEach(el => {
                if (!allEvTargets.includes(el)) allEvTargets.push(el);
            });
        }

        const synSpans = qKey ? Array.from(document.querySelectorAll(`[data-q="${qKey}"]`)) : [];
        const isCurrentlyActive = (allEvTargets.length > 0 && allEvTargets.some(t => t.classList.contains('highlighted')) && this.activeEvidenceId === (evId || qKey)) ||
                                  (synSpans.length > 0 && synSpans.every(s => s.classList.contains('active-syn')) && this.activeEvidenceId === qKey);

        if (!isCurrentlyActive) {
            allEvTargets.forEach(target => {
                target.classList.add('highlighted', 'glow-pulse');
            });
            synSpans.forEach(s => s.classList.add('active-syn'));
            this.activeEvidenceId = evId || qKey;

            // Smooth scroll into view inside the scrollable reading pane (for both main and preview)
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

                // Remove pulse animation after 2.5s while keeping highlight
                setTimeout(() => {
                    evTarget.classList.remove('glow-pulse');
                }, 2500);
            });
        } else {
            allEvTargets.forEach(target => {
                target.classList.remove('highlighted', 'glow-pulse');
            });
            synSpans.forEach(s => s.classList.remove('active-syn'));
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
     * Question hover preview disabled to prevent unintentional answer exposure
     */
    bindQuestionHover() {
        // Restricted to explicit button actions
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
