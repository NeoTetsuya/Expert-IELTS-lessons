/**
 * =========================================================================
 * UNIVERSAL DRAG-AND-DROP GAP-FILL & WORD BANK ENGINE
 * Course Presentations Architecture — Expert IELTS Masterclass
 * Enables drag & drop and tap-to-place word chips into all sentence blanks
 * Supports slash-separated variants (e.g., "beach / beaches" -> "beaches")
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

            // Re-bind on slide navigation
            document.addEventListener('deck:slide-change', () => this.bindAll());
            document.addEventListener('DOMContentLoaded', () => {
                const observer = new MutationObserver(() => this.bindAll());
                observer.observe(document.body, { childList: true, subtree: true });
            });
        }

        bindAll() {
            // Find any exercise container that has word bank chips and inputs
            document.querySelectorAll('.slide, .slide-card, .category-sorter, .exercise-container, .gap-fill-container').forEach(container => {
                this.setupContainer(container);
            });
        }

        getChipVariants(chip) {
            const rawText = (chip.dataset.word || chip.innerText || '').trim().toLowerCase();
            if (rawText.includes('/')) {
                return rawText.split('/').map(s => s.trim()).filter(Boolean);
            }
            if (rawText.includes('|')) {
                return rawText.split('|').map(s => s.trim()).filter(Boolean);
            }
            return [rawText];
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
                    const rawText = e.dataTransfer.getData('text/plain');
                    const chipId = e.dataTransfer.getData('chip-id');
                    if (rawText) {
                        const word = this.resolveBestWord(rawText, input);
                        this.fillInput(input, word, chipId, container, true);
                    }
                });

                // Click input to place selected chip or clear existing value
                input.addEventListener('click', () => {
                    if (this.selectedChip && container.contains(this.selectedChip)) {
                        const rawText = this.selectedChip.innerText.trim();
                        const word = this.resolveBestWord(rawText, input);
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

            // Initial sync
            this.syncBankChips(container);
        }

        resolveBestWord(rawText, input) {
            let candidates = [rawText.trim()];
            if (rawText.includes('/')) {
                candidates = rawText.split('/').map(s => s.trim()).filter(Boolean);
            } else if (rawText.includes('|')) {
                candidates = rawText.split('|').map(s => s.trim()).filter(Boolean);
            }

            if (candidates.length === 1) return candidates[0];

            if (input && input.dataset.ans) {
                const targetAnswers = input.dataset.ans.toLowerCase().split('|').map(a => a.trim());
                for (const c of candidates) {
                    if (targetAnswers.includes(c.toLowerCase())) {
                        return c;
                    }
                }
            }

            return candidates[0];
        }

        handleChipClick(chip, container) {
            if (chip.classList.contains('chip-used')) {
                // If chip is used, find the input that has one of its variants and clear it
                const variants = this.getChipVariants(chip);
                const inputs = container.querySelectorAll('.blank-input, .drag-gap');
                for (const input of inputs) {
                    const val = (input.value || '').trim().toLowerCase();
                    if (val && variants.includes(val)) {
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

            // Track how many times each filled value was used to handle duplicate words
            const usedCounts = {};
            filledValues.forEach(v => {
                usedCounts[v] = (usedCounts[v] || 0) + 1;
            });

            // Mark matching chips as used
            chips.forEach(chip => {
                const variants = this.getChipVariants(chip);
                let isUsed = false;

                for (const v of variants) {
                    if (usedCounts[v] && usedCounts[v] > 0) {
                        isUsed = true;
                        usedCounts[v]--;
                        break;
                    }
                }

                if (isUsed) {
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
