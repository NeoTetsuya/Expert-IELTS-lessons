/**
 * =========================================================================
 * UNIVERSAL SENTENCE SCRAMBLE & CLAUSE REORDERING ENGINE
 * Course Presentations Architecture — Expert IELTS Masterclass
 * Interactive sentence unscramble, syntax ordering, and clause sequencing
 * =========================================================================
 */

(function () {
    'use strict';

    class SentenceScrambleEngine {
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

            if (window.presenterSyncEngine) {
                window.presenterSyncEngine.on('SCRAMBLE_MOVE_ACTION', (data) => {
                    this.applyRemoteMove(data);
                });
            }

            document.addEventListener('deck:slide-change', () => this.bindAll());
            document.addEventListener('DOMContentLoaded', () => {
                const observer = new MutationObserver(() => this.bindAll());
                observer.observe(document.body, { childList: true, subtree: true });
            });
        }

        bindAll() {
            document.querySelectorAll('.sentence-scramble, .syntax-reorder').forEach(container => {
                this.setupExercise(container);
            });
        }

        setupExercise(container) {
            if (container._scrambleInitialized) return;
            container._scrambleInitialized = true;

            const pool = container.querySelector('.scramble-pool');
            const targetLine = container.querySelector('.scramble-target-line');
            const chips = container.querySelectorAll('.scramble-chip');

            chips.forEach((chip, idx) => {
                if (!chip.id) chip.id = `scramble-chip-${Date.now()}-${idx}`;
                chip._homePool = pool;
                chip.setAttribute('draggable', 'true');

                chip.addEventListener('dragstart', (e) => {
                    chip.classList.add('dragging');
                    e.dataTransfer.setData('text/plain', chip.id);
                    e.dataTransfer.effectAllowed = 'move';
                });

                chip.addEventListener('dragend', () => {
                    chip.classList.remove('dragging');
                    container.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
                });

                chip.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.handleChipClick(chip, container);
                });
            });

            if (pool) this.setupDropZone(pool, container, true);
            if (targetLine) this.setupDropZone(targetLine, container, false);
        }

        setupDropZone(zone, container, isPool) {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', (e) => {
                if (!zone.contains(e.relatedTarget)) {
                    zone.classList.remove('drag-over');
                }
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                const chipId = e.dataTransfer.getData('text/plain');
                const chip = document.getElementById(chipId);
                if (chip && container.contains(chip)) {
                    this.moveChip(chip, zone, container, true);
                }
            });

            zone.addEventListener('click', () => {
                if (this.selectedChip && container.contains(this.selectedChip)) {
                    this.moveChip(this.selectedChip, zone, container, true);
                    this.clearSelection();
                }
            });
        }

        handleChipClick(chip, container) {
            const parent = chip.parentElement;
            const isInsidePool = parent.classList.contains('scramble-pool');

            if (!isInsidePool) {
                // If in target line, clicking returns it to pool
                const pool = chip._homePool || container.querySelector('.scramble-pool');
                if (pool) this.moveChip(chip, pool, container, true);
            } else {
                // If in pool, clicking moves it into target line
                const targetLine = container.querySelector('.scramble-target-line');
                if (targetLine) this.moveChip(chip, targetLine, container, true);
            }
        }

        moveChip(chip, targetZone, container, broadcast = true) {
            if (!chip || !targetZone) return;
            chip.classList.remove('correct', 'wrong');
            targetZone.appendChild(chip);

            if (broadcast && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('SCRAMBLE_MOVE_ACTION', {
                    chipId: chip.id,
                    isPool: targetZone.classList.contains('scramble-pool'),
                    containerId: container.id || null
                });
            }
        }

        applyRemoteMove(data) {
            if (!data || !data.chipId) return;
            const chip = document.getElementById(data.chipId);
            if (!chip) return;
            const container = chip.closest('.sentence-scramble, .syntax-reorder');
            if (!container) return;

            const targetZone = data.isPool
                ? container.querySelector('.scramble-pool')
                : container.querySelector('.scramble-target-line');

            if (targetZone) this.moveChip(chip, targetZone, container, false);
        }

        clearSelection() {
            if (this.selectedChip) {
                this.selectedChip.classList.remove('selected-chip');
                this.selectedChip = null;
            }
        }

        checkAnswers(container) {
            const exercises = container.querySelectorAll('.sentence-scramble, .syntax-reorder');
            if (exercises.length === 0) return { total: 0, correct: 0 };

            let total = 0;
            let correct = 0;

            exercises.forEach(ex => {
                const targetLine = ex.querySelector('.scramble-target-line');
                const targetAns = (ex.dataset.ans || ex.getAttribute('data-ans') || '').trim().toLowerCase();
                if (!targetLine || !targetAns) return;

                total++;
                const placedChips = targetLine.querySelectorAll('.scramble-chip');
                const placedText = Array.from(placedChips).map(c => c.innerText.trim()).join(' ').toLowerCase();

                targetLine.classList.remove('correct', 'wrong');
                if (placedText === targetAns) {
                    targetLine.classList.add('correct');
                    placedChips.forEach(c => c.classList.add('correct'));
                    correct++;
                } else {
                    targetLine.classList.add('wrong');
                    placedChips.forEach(c => c.classList.add('wrong'));
                }
            });

            return { total, correct };
        }

        revealKeys(container) {
            const exercises = container.querySelectorAll('.sentence-scramble, .syntax-reorder');
            exercises.forEach(ex => {
                const targetLine = ex.querySelector('.scramble-target-line');
                const targetAns = (ex.dataset.ans || ex.getAttribute('data-ans') || '').trim();
                if (!targetLine || !targetAns) return;

                const words = targetAns.split(' ');
                const allChips = Array.from(ex.querySelectorAll('.scramble-chip'));

                words.forEach(word => {
                    const matchIdx = allChips.findIndex(c => c.innerText.trim().toLowerCase() === word.toLowerCase() && c.parentElement !== targetLine);
                    if (matchIdx !== -1) {
                        const chip = allChips.splice(matchIdx, 1)[0];
                        targetLine.appendChild(chip);
                        chip.classList.add('correct');
                    }
                });
                targetLine.classList.add('correct');
            });
        }

        resetTask(container) {
            const exercises = container.querySelectorAll('.sentence-scramble, .syntax-reorder');
            exercises.forEach(ex => {
                const pool = ex.querySelector('.scramble-pool');
                const targetLine = ex.querySelector('.scramble-target-line');
                if (pool && targetLine) {
                    targetLine.querySelectorAll('.scramble-chip').forEach(chip => {
                        chip.classList.remove('correct', 'wrong');
                        pool.appendChild(chip);
                    });
                    targetLine.classList.remove('correct', 'wrong');
                }
            });
        }
    }

    // Export singleton
    window.sentenceScrambleEngine = new SentenceScrambleEngine();
})();
