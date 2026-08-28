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
            const type = el.dataset.type || 'selects'; // 'selects' | 'blanks' | 'multi'

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
     * Auto-binds synonym buttons that specify data-q and data-ev
     */
    static hydrateSynonymButtons() {
        document.querySelectorAll('.syn-btn[data-q]').forEach(btn => {
            const qKey = btn.dataset.q;
            const evId = btn.dataset.ev || `ev-${qKey}`;
            btn.onclick = () => window.deckEngine?.toggleSynonymExplanation(qKey, evId);
        });
    }
}

// Auto-run on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
    DeckComponents.init();
});

// Universal Global Helper Functions for Exercise Buttons
window.checkAnswers = function(btnOrContainerId) {
    let container = null;
    if (typeof btnOrContainerId === 'string') {
        container = document.getElementById(btnOrContainerId);
    } else if (btnOrContainerId instanceof Element) {
        container = btnOrContainerId.closest('.page-content') || btnOrContainerId.closest('.slide') || document.querySelector('.slide.active');
    } else {
        container = document.querySelector('.slide.active');
    }
    if (window.deckEngine) {
        window.deckEngine.checkAnswers(container);
    } else if (container) {
        container.querySelectorAll('.blank-input, .select-input').forEach(input => {
            const ans = (input.dataset.ans || '').toLowerCase().trim();
            const val = (input.value || '').toLowerCase().trim();
            if (ans && val) {
                const acceptable = ans.split('|').map(a => a.trim());
                if (acceptable.includes(val)) {
                    input.classList.add('correct');
                    input.classList.remove('wrong', 'incorrect');
                } else {
                    input.classList.add('wrong');
                    input.classList.remove('correct');
                }
            }
        });
        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
    }
};

window.revealAnswers = window.revealKeys = function(btnOrContainerId) {
    let container = null;
    if (typeof btnOrContainerId === 'string') {
        container = document.getElementById(btnOrContainerId);
    } else if (btnOrContainerId instanceof Element) {
        container = btnOrContainerId.closest('.page-content') || btnOrContainerId.closest('.slide') || document.querySelector('.slide.active');
    } else {
        container = document.querySelector('.slide.active');
    }
    if (window.deckEngine) {
        window.deckEngine.revealKeys(container);
    } else if (container) {
        container.querySelectorAll('.blank-input, .select-input').forEach(input => {
            if (input.dataset.ans) {
                input.value = input.dataset.ans.split('|')[0];
                input.classList.add('correct');
                input.classList.remove('wrong', 'incorrect');
            }
        });
        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
    }
};

window.resetAnswers = window.resetTask = function(btnOrContainerId) {
    let container = null;
    if (typeof btnOrContainerId === 'string') {
        container = document.getElementById(btnOrContainerId);
    } else if (btnOrContainerId instanceof Element) {
        container = btnOrContainerId.closest('.page-content') || btnOrContainerId.closest('.slide') || document.querySelector('.slide.active');
    } else {
        container = document.querySelector('.slide.active');
    }
    if (window.deckEngine) {
        window.deckEngine.resetTask(container);
    } else if (container) {
        container.querySelectorAll('.blank-input, .select-input').forEach(input => {
            input.value = '';
            input.classList.remove('correct', 'wrong', 'incorrect');
        });
        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.remove('show'));
    }
};

// Hook tab update into showSlide
if (window.DeckEngine) {
    const originalShowSlide = DeckEngine.prototype.showSlide;
    DeckEngine.prototype.showSlide = function(index) {
        originalShowSlide.call(this, index);
        DeckComponents.updateActiveTab();
    };
}
