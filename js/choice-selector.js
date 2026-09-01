/**
 * =========================================================================
 * UNIVERSAL CHOICE & TFNG PILL SELECTOR ENGINE
 * Course Presentations Architecture — Expert IELTS Masterclass
 * Interactive True/False/Not Given, Yes/No/Not Given & Multiple Choice pills
 * =========================================================================
 */

(function () {
    'use strict';

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
            document.querySelectorAll('.choice-group, .tfng-group, .ynng-group, .mcq-options').forEach(group => {
                this.setupGroup(group);
            });
        }

        setupGroup(group) {
            if (group._choiceInitialized) return;
            group._choiceInitialized = true;

            const isMulti = group.hasAttribute('data-multi') || group.classList.contains('multi-select');
            const buttons = group.querySelectorAll('.choice-btn, .tfng-btn, .option-btn, [data-choice]');

            buttons.forEach((btn, idx) => {
                if (!btn.id) btn.id = `choice-btn-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 3)}`;

                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.selectButton(btn, group, isMulti, true);
                });
            });
        }

        selectButton(btn, group, isMulti, broadcast = true) {
            if (!isMulti) {
                group.querySelectorAll('.choice-btn, .tfng-btn, .option-btn, [data-choice]').forEach(b => {
                    if (b !== btn) {
                        b.classList.remove('selected', 'correct', 'wrong');
                    }
                });
                btn.classList.toggle('selected');
            } else {
                btn.classList.toggle('selected');
            }
            btn.classList.remove('correct', 'wrong');

            if (broadcast && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('CHOICE_SELECT_ACTION', {
                    btnId: btn.id,
                    groupId: group.id || null,
                    isSelected: btn.classList.contains('selected')
                });
            }
        }

        applyRemoteSelect(data) {
            if (!data || !data.btnId) return;
            const btn = document.getElementById(data.btnId);
            if (!btn) return;
            const group = btn.closest('.choice-group, .tfng-group, .ynng-group, .mcq-options');
            if (!group) return;

            const isMulti = group.hasAttribute('data-multi') || group.classList.contains('multi-select');
            if (!isMulti) {
                group.querySelectorAll('.choice-btn, .tfng-btn, .option-btn, [data-choice]').forEach(b => {
                    b.classList.remove('selected');
                });
            }
            if (data.isSelected) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        }

        checkAnswers(container) {
            const groups = container.querySelectorAll('.choice-group, .tfng-group, .ynng-group, .mcq-options');
            if (groups.length === 0) return { total: 0, correct: 0 };

            let total = 0;
            let correct = 0;

            groups.forEach(group => {
                const targetAns = (group.dataset.ans || group.getAttribute('data-ans') || '').trim().toLowerCase();
                if (!targetAns) return;

                total++;
                const validAnswers = targetAns.split('|').map(a => a.trim());
                const selectedBtns = group.querySelectorAll('.selected');
                const selectedVals = Array.from(selectedBtns).map(b => (b.dataset.choice || b.innerText || '').trim().toLowerCase());

                let isGroupCorrect = selectedVals.length > 0 && selectedVals.every(v => validAnswers.includes(v)) && selectedVals.length === validAnswers.length;

                selectedBtns.forEach(btn => {
                    const val = (btn.dataset.choice || btn.innerText || '').trim().toLowerCase();
                    btn.classList.remove('correct', 'wrong');
                    if (validAnswers.includes(val)) {
                        btn.classList.add('correct');
                    } else {
                        btn.classList.add('wrong');
                    }
                });

                if (isGroupCorrect) {
                    correct++;
                }
            });

            return { total, correct };
        }

        revealKeys(container) {
            const groups = container.querySelectorAll('.choice-group, .tfng-group, .ynng-group, .mcq-options');
            groups.forEach(group => {
                const targetAns = (group.dataset.ans || group.getAttribute('data-ans') || '').trim().toLowerCase();
                if (!targetAns) return;

                const validAnswers = targetAns.split('|').map(a => a.trim());
                group.querySelectorAll('.choice-btn, .tfng-btn, .option-btn, [data-choice]').forEach(btn => {
                    const val = (btn.dataset.choice || btn.innerText || '').trim().toLowerCase();
                    btn.classList.remove('selected', 'wrong');
                    if (validAnswers.includes(val)) {
                        btn.classList.add('selected', 'correct');
                    }
                });
            });
        }

        resetTask(container) {
            const groups = container.querySelectorAll('.choice-group, .tfng-group, .ynng-group, .mcq-options');
            groups.forEach(group => {
                group.querySelectorAll('.choice-btn, .tfng-btn, .option-btn, [data-choice]').forEach(btn => {
                    btn.classList.remove('selected', 'correct', 'wrong');
                });
            });
        }
    }

    // Export singleton
    window.choiceSelectorEngine = new ChoiceSelectorEngine();
})();
