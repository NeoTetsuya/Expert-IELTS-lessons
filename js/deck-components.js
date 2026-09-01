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
        // Signal that all inputs are hydrated — ProgressTracker can now safely restore saved state
        document.dispatchEvent(new CustomEvent('DeckComponents:hydrated'));
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
            const type = el.dataset.type || 'blanks'; // 'blanks' | 'selects' | 'multi'

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

