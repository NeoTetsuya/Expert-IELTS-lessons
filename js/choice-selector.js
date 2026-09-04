/**
 * =========================================================================
 * UNIVERSAL CHOICE & TFNG PILL SELECTOR ENGINE (State Machine Edition)
 * Course Presentations Architecture — Expert IELTS Masterclass
 * Interactive True/False/Not Given, Yes/No/Not Given & Multiple Choice pills
 * 
 * Powered by:
 * - `state-machine`: Strict lifecycle (idle -> selected -> validating -> correct/wrong -> revealed)
 * - `error-handling-ux`: Self-healing recovery on choice switch, blame-free retry
 * - `feedback-patterns`: Evidence synchronization and sub-100ms response
 * =========================================================================
 */

(function () {
    'use strict';

    const GROUP_SELECTOR = '.choice-group, .tfng-group, .ynng-group, .mcq-options, .mcq-options-container';
    const BUTTON_SELECTOR = '.choice-btn, .tfng-btn, .option-btn, .mcq-card-option, [data-choice]';

    class ChoiceSelectorEngine {
        constructor() {
            this.init();
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.bindAll());
            } else {
                this.bindAll();
            }

            if (window.presenterSyncEngine) {
                window.presenterSyncEngine.on('CHOICE_SELECT_ACTION', (data) => {
                    this.applyRemoteSelect(data);
                });
            }

            document.addEventListener('deck:slide-change', () => this.bindAll());
            document.addEventListener('DOMContentLoaded', () => {
                const observer = new MutationObserver(() => this.bindAll());
                observer.observe(document.body, { childList: true, subtree: true });
            });
        }

        bindAll() {
            document.querySelectorAll(GROUP_SELECTOR).forEach(group => {
                this.setupGroup(group);
            });
        }

        setupGroup(group) {
            if (group._choiceInitialized) return;
            group._choiceInitialized = true;

            if (!group.dataset.state) {
                group.dataset.state = 'idle';
            }

            const isMulti = group.hasAttribute('data-multi') || group.classList.contains('multi-select');
            const buttons = group.querySelectorAll(BUTTON_SELECTOR);

            buttons.forEach((btn, idx) => {
                if (!btn.id) btn.id = `choice-btn-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 3)}`;
                if (!btn.dataset.state) btn.dataset.state = 'idle';

                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.selectButton(btn, group, isMulti, true);
                });
            });
        }

        /**
         * State Machine Transition: SELECT
         * Guard: If group is already revealed, prevent accidental manipulation
         */
        selectButton(btn, group, isMulti, broadcast = true) {
            // Guard: When revealed, lock answers unless reset
            if (group.dataset.state === 'revealed') {
                return;
            }

            if (!isMulti) {
                // Single-select mode: de-select siblings
                group.querySelectorAll(BUTTON_SELECTOR).forEach(b => {
                    if (b !== btn) {
                        b.classList.remove('selected', 'correct', 'wrong');
                        b.dataset.state = 'idle';
                    }
                });
                btn.classList.toggle('selected');
            } else {
                // Multi-select mode
                btn.classList.toggle('selected');
            }

            // Self-healing error recovery (error-handling-ux skill):
            // Selecting an option immediately clears any stale 'wrong' or error state
            btn.classList.remove('correct', 'wrong');
            const isSelected = btn.classList.contains('selected');
            btn.dataset.state = isSelected ? 'selected' : 'idle';

            // Update group state
            const hasAnySelected = group.querySelectorAll('.selected').length > 0;
            group.dataset.state = hasAnySelected ? 'selected' : 'idle';

            // Dispatch local event for multi-layer feedback / evidence grounding
            group.dispatchEvent(new CustomEvent('choice:select', {
                bubbles: true,
                detail: {
                    btnId: btn.id,
                    value: (btn.dataset.choice || btn.innerText || '').trim(),
                    isSelected,
                    group
                }
            }));

            if (broadcast && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('CHOICE_SELECT_ACTION', {
                    btnId: btn.id,
                    groupId: group.id || null,
                    isSelected
                });
            }
        }

        applyRemoteSelect(data) {
            if (!data || !data.btnId) return;
            const btn = document.getElementById(data.btnId);
            if (!btn) return;
            const group = btn.closest(GROUP_SELECTOR);
            if (!group) return;

            const isMulti = group.hasAttribute('data-multi') || group.classList.contains('multi-select');
            if (!isMulti) {
                group.querySelectorAll(BUTTON_SELECTOR).forEach(b => {
                    b.classList.remove('selected', 'correct', 'wrong');
                    b.dataset.state = 'idle';
                });
            }
            if (data.isSelected) {
                btn.classList.add('selected');
                btn.dataset.state = 'selected';
                group.dataset.state = 'selected';
            } else {
                btn.classList.remove('selected');
                btn.dataset.state = 'idle';
            }
        }

        /**
         * State Machine Transition: CHECK
         * Evaluates student selection against answer key
         */
        checkAnswers(container) {
            const groups = container.querySelectorAll(GROUP_SELECTOR);
            if (groups.length === 0) return { total: 0, correct: 0 };

            let total = 0;
            let correct = 0;

            groups.forEach(group => {
                const targetAns = (group.dataset.ans || group.getAttribute('data-ans') || '').trim().toLowerCase();
                if (!targetAns) return;

                total++;
                const validAnswers = targetAns.split('|').map(a => a.trim().toLowerCase());
                const selectedBtns = group.querySelectorAll('.selected');
                const selectedVals = Array.from(selectedBtns).map(b => (b.dataset.choice || b.innerText || '').trim().toLowerCase());

                let isGroupCorrect = selectedVals.length > 0 &&
                    selectedVals.every(v => validAnswers.includes(v)) &&
                    selectedVals.length === validAnswers.length;

                selectedBtns.forEach(btn => {
                    const val = (btn.dataset.choice || btn.innerText || '').trim().toLowerCase();
                    btn.classList.remove('correct', 'wrong');
                    if (validAnswers.includes(val)) {
                        btn.classList.add('correct');
                        btn.dataset.state = 'correct';
                    } else {
                        btn.classList.add('wrong');
                        btn.dataset.state = 'wrong';
                    }
                });

                if (isGroupCorrect) {
                    correct++;
                    group.dataset.state = 'correct';
                } else if (selectedBtns.length > 0) {
                    group.dataset.state = 'wrong';
                }
            });

            return { total, correct };
        }

        /**
         * State Machine Transition: REVEAL
         * Reveals canonical keys and transitions group to locked 'revealed' state
         */
        revealKeys(container) {
            const groups = container.querySelectorAll(GROUP_SELECTOR);
            groups.forEach(group => {
                const targetAns = (group.dataset.ans || group.getAttribute('data-ans') || '').trim().toLowerCase();
                if (!targetAns) return;

                group.dataset.state = 'revealed';
                const validAnswers = targetAns.split('|').map(a => a.trim().toLowerCase());

                group.querySelectorAll(BUTTON_SELECTOR).forEach(btn => {
                    const val = (btn.dataset.choice || btn.innerText || '').trim().toLowerCase();
                    btn.classList.remove('selected', 'wrong');
                    if (validAnswers.includes(val)) {
                        btn.classList.add('selected', 'correct');
                        btn.dataset.state = 'correct';
                    } else {
                        btn.dataset.state = 'idle';
                    }
                });

                // Evidence synchronization trigger (feedback-patterns skill)
                group.dispatchEvent(new CustomEvent('choice:revealed', {
                    bubbles: true,
                    detail: { group, targetAns }
                }));
            });
        }

        /**
         * State Machine Transition: RESET
         * Restores clean idle state
         */
        resetTask(container) {
            const groups = container.querySelectorAll(GROUP_SELECTOR);
            groups.forEach(group => {
                group.dataset.state = 'idle';
                group.querySelectorAll(BUTTON_SELECTOR).forEach(btn => {
                    btn.classList.remove('selected', 'correct', 'wrong');
                    btn.dataset.state = 'idle';
                });
            });
        }
    }

    // Export singleton
    window.choiceSelectorEngine = new ChoiceSelectorEngine();
})();
