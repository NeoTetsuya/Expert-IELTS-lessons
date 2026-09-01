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

        let synSpans = qKey ? Array.from(document.querySelectorAll(`[data-q="${qKey}"], .syn-pair-1[data-q="${qKey}"], .syn-pair-2[data-q="${qKey}"], .syn-pair-3[data-q="${qKey}"]`)) : [];
        const currentSlide = document.querySelector('.slide.active') || document.body;
        if (synSpans.length === 0 && currentSlide) {
            synSpans = Array.from(currentSlide.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3'));
        }
        const isCurrentlyActive = (allEvTargets.length > 0 && allEvTargets.some(t => t.classList.contains('highlighted')) && this.activeEvidenceId === (evId || qKey)) ||
                                  (synSpans.length > 0 && synSpans.every(s => s.classList.contains('active-syn')) && (this.activeEvidenceId === (evId || qKey) || !evId));

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
                DeckEngine.prototype.showSlide = function (index, broadcast) {
                    origShowSlide.call(this, index, broadcast);
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
