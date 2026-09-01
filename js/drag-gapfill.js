/**
 * =========================================================================
 * UNIVERSAL DRAG-AND-DROP GAP-FILL & WORD BANK ENGINE
 * Course Presentations Architecture — Expert IELTS Masterclass
 * Enables drag & drop and tap-to-place word chips into all sentence blanks
 * =========================================================================
 */

(function () {
    'use strict';

    class DragGapfillEngine {
        constructor() {
            this.selectedChip = null;
            this.init();
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.bindAll());
            } else {
                this.bindAll();
            }

            // Sync listener
            if (window.presenterSyncEngine) {
                window.presenterSyncEngine.on('GAP_FILL_ACTION', (data) => {
                    this.applyRemoteGapFill(data);
                });
            }
        }

        bindAll() {
            // Find any exercise container that has word bank chips and inputs
            document.querySelectorAll('.slide, .slide-card, .category-sorter, .exercise-container, .gap-fill-container').forEach(container => {
                this.setupContainer(container);
            });
        }

        setupContainer(container) {
            const chips = container.querySelectorAll('.box-chip, .drag-chip, .word-chip, .category-chip:not([data-category])');
            const inputs = container.querySelectorAll('.blank-input, .drag-gap');

            if (chips.length === 0 || inputs.length === 0) return;

            // Setup Chips
            chips.forEach((chip, idx) => {
                if (!chip.id) {
                    chip.id = `gap-chip-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 4)}`;
                }
                chip.setAttribute('draggable', 'true');
                chip.classList.add('interactive-gap-chip');

                chip.addEventListener('dragstart', (e) => {
                    if (chip.classList.contains('chip-used')) {
                        e.preventDefault();
                        return;
                    }
                    chip.classList.add('dragging');
                    e.dataTransfer.setData('text/plain', chip.innerText.trim());
                    e.dataTransfer.setData('chip-id', chip.id);
                    e.dataTransfer.effectAllowed = 'copyMove';
                });

                chip.addEventListener('dragend', () => {
                    chip.classList.remove('dragging');
                    container.querySelectorAll('.blank-input.drag-over, .drag-gap.drag-over').forEach(el => el.classList.remove('drag-over'));
                });

                chip.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.handleChipClick(chip, container);
                });
            });

            // Setup Inputs as Drop Targets
            inputs.forEach(input => {
                input.classList.add('gap-drop-target');

                input.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'copy';
                    input.classList.add('drag-over');
                });

                input.addEventListener('dragenter', (e) => {
                    e.preventDefault();
                    input.classList.add('drag-over');
                });

                input.addEventListener('dragleave', (e) => {
                    if (!input.contains(e.relatedTarget)) {
                        input.classList.remove('drag-over');
                    }
                });

                input.addEventListener('drop', (e) => {
                    e.preventDefault();
                    input.classList.remove('drag-over');
                    const text = e.dataTransfer.getData('text/plain');
                    const chipId = e.dataTransfer.getData('chip-id');
                    if (text) {
                        this.fillInput(input, text, chipId, container, true);
                    }
                });

                // Click input to place selected chip or clear existing value
                input.addEventListener('click', () => {
                    if (this.selectedChip && container.contains(this.selectedChip)) {
                        const word = this.selectedChip.innerText.trim();
                        this.fillInput(input, word, this.selectedChip.id, container, true);
                        this.clearSelection();
                    } else if (input.value && input.value.trim() !== '') {
                        // Click filled input to clear it and restore chip in bank
                        this.clearInput(input, container, true);
                    }
                });

                // Listen for manual typing to keep bank chip states in sync
                input.addEventListener('input', () => {
                    this.syncBankChips(container);
                    if (window.DeckComponents?.autoResizeBlank) {
                        DeckComponents.autoResizeBlank(input);
                    }
                });
            });
        }

        handleChipClick(chip, container) {
            if (chip.classList.contains('chip-used')) {
                // If chip is used, find the input that has this value and clear it
                const chipWord = chip.innerText.trim().toLowerCase();
                const inputs = container.querySelectorAll('.blank-input, .drag-gap');
                for (const input of inputs) {
                    if (input.value && input.value.trim().toLowerCase() === chipWord) {
                        this.clearInput(input, container, true);
                        break;
                    }
                }
                return;
            }

            if (this.selectedChip === chip) {
                this.clearSelection();
            } else {
                this.clearSelection();
                this.selectedChip = chip;
                chip.classList.add('selected-chip');
            }
        }

        clearSelection() {
            if (this.selectedChip) {
                this.selectedChip.classList.remove('selected-chip');
                this.selectedChip = null;
            }
        }

        fillInput(input, word, chipId, container, broadcast = true) {
            if (!input || !word) return;

            // If input already had a value, free up its previous word
            input.value = word;
            input.classList.remove('wrong', 'incorrect');

            if (window.DeckComponents?.autoResizeBlank) {
                DeckComponents.autoResizeBlank(input);
            }

            this.syncBankChips(container);

            if (broadcast && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('GAP_FILL_ACTION', {
                    action: 'fill',
                    inputId: input.id || null,
                    ans: input.dataset.ans || null,
                    word: word,
                    chipId: chipId || null,
                    containerId: container.id || null
                });
            }
        }

        clearInput(input, container, broadcast = true) {
            if (!input) return;
            const prevWord = input.value;
            input.value = '';
            input.classList.remove('correct', 'wrong', 'incorrect');

            if (window.DeckComponents?.autoResizeBlank) {
                DeckComponents.autoResizeBlank(input);
            }

            this.syncBankChips(container);

            if (broadcast && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('GAP_FILL_ACTION', {
                    action: 'clear',
                    inputId: input.id || null,
                    ans: input.dataset.ans || null,
                    prevWord: prevWord,
                    containerId: container.id || null
                });
            }
        }

        syncBankChips(container) {
            if (!container) return;
            const chips = Array.from(container.querySelectorAll('.interactive-gap-chip'));
            const inputs = Array.from(container.querySelectorAll('.blank-input, .drag-gap'));

            // Collect all current filled values
            const filledValues = inputs
                .map(inp => (inp.value || '').trim().toLowerCase())
                .filter(v => v.length > 0);

            // Mark matching chips as used
            chips.forEach(chip => {
                const chipWord = chip.innerText.trim().toLowerCase();
                const countUsed = filledValues.filter(v => v === chipWord || chipWord.includes(v)).length;
                if (countUsed > 0) {
                    chip.classList.add('chip-used');
                    chip.classList.remove('selected-chip');
                } else {
                    chip.classList.remove('chip-used');
                }
            });
        }

        applyRemoteGapFill(data) {
            if (!data) return;
            let container = data.containerId ? document.getElementById(data.containerId) : document.querySelector('.slide.active') || document;
            if (!container) return;

            let input = null;
            if (data.inputId) {
                input = document.getElementById(data.inputId);
            } else if (data.ans) {
                input = container.querySelector(`.blank-input[data-ans="${data.ans}"], .drag-gap[data-ans="${data.ans}"]`);
            }

            if (input) {
                if (data.action === 'fill' && data.word) {
                    this.fillInput(input, data.word, data.chipId, container, false);
                } else if (data.action === 'clear') {
                    this.clearInput(input, container, false);
                }
            }
        }

        updateAllBankChips(container) {
            this.syncBankChips(container);
        }
    }

    // Export singleton
    window.dragGapfillEngine = new DragGapfillEngine();
})();
