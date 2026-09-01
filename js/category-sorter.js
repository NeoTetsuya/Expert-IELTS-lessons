/**
 * =========================================================================
 * CATEGORY SORTER ENGINE (Universal Drag & Drop / Tap-to-Place Sorting)
 * Course Presentations Architecture — Expert IELTS Masterclass
 * =========================================================================
 */

(function () {
    'use strict';

    class CategorySorterEngine {
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

            // Listen for sync events from Presenter View
            if (window.presenterSyncEngine) {
                window.presenterSyncEngine.on('CATEGORY_MOVE', (data) => {
                    this.applyRemoteMove(data);
                });
            }
        }

        bindAll() {
            document.querySelectorAll('.category-sorter').forEach(sorter => {
                this.setupSorter(sorter);
            });
        }

        setupSorter(sorter) {
            if (sorter._catInitialized) return;
            sorter._catInitialized = true;

            const pool = sorter.querySelector('.category-chip-pool');
            const dropZones = sorter.querySelectorAll('.category-drop-zone');
            const chips = sorter.querySelectorAll('.category-chip');

            // Store initial home pool for each chip
            chips.forEach((chip, idx) => {
                if (!chip.id) {
                    chip.id = `cat-chip-${Date.now()}-${idx}`;
                }
                chip._homePool = pool;

                // Drag Start & End
                chip.setAttribute('draggable', 'true');
                chip.addEventListener('dragstart', (e) => {
                    chip.classList.add('dragging');
                    e.dataTransfer.setData('text/plain', chip.id);
                    e.dataTransfer.effectAllowed = 'move';
                });

                chip.addEventListener('dragend', () => {
                    chip.classList.remove('dragging');
                    sorter.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
                });

                // Click / Tap-to-place
                chip.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.handleChipClick(chip, sorter);
                });
            });

            // Pool Drop Zone (to return chips)
            if (pool) {
                this.setupDropZone(pool, sorter, true);
            }

            // Category Drop Zones
            dropZones.forEach(zone => {
                this.setupDropZone(zone, sorter, false);
            });
        }

        setupDropZone(zone, sorter, isPool) {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragenter', (e) => {
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
                if (chip && sorter.contains(chip)) {
                    this.moveChip(chip, zone, true);
                }
            });

            // Click zone to place selected chip
            zone.addEventListener('click', () => {
                if (this.selectedChip && sorter.contains(this.selectedChip)) {
                    this.moveChip(this.selectedChip, zone, true);
                    this.clearSelection();
                }
            });
        }

        handleChipClick(chip, sorter) {
            const parentZone = chip.parentElement;
            const isInsidePool = parentZone.classList.contains('category-chip-pool');

            if (!isInsidePool) {
                // If clicked while inside a category zone, return it back to the home pool
                const homePool = chip._homePool || sorter.querySelector('.category-chip-pool');
                if (homePool) {
                    this.moveChip(chip, homePool, true);
                    this.clearSelection();
                }
            } else {
                // If inside pool, toggle selection for tap-to-place
                if (this.selectedChip === chip) {
                    this.clearSelection();
                } else {
                    this.clearSelection();
                    this.selectedChip = chip;
                    chip.classList.add('selected-chip');
                }
            }
        }

        clearSelection() {
            if (this.selectedChip) {
                this.selectedChip.classList.remove('selected-chip');
                this.selectedChip = null;
            }
        }

        moveChip(chip, targetZone, broadcast = true) {
            if (!chip || !targetZone) return;

            // Reset evaluation classes upon moving
            chip.classList.remove('correct', 'wrong', 'unplaced');

            targetZone.appendChild(chip);

            if (broadcast && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('CATEGORY_MOVE', {
                    chipId: chip.id,
                    targetZoneId: targetZone.id || null,
                    targetCategory: targetZone.dataset.category || null,
                    isPool: targetZone.classList.contains('category-chip-pool')
                });
            }
        }

        applyRemoteMove(data) {
            if (!data || !data.chipId) return;
            const chip = document.getElementById(data.chipId);
            if (!chip) return;

            const sorter = chip.closest('.category-sorter');
            if (!sorter) return;

            if (data.isPool) {
                const pool = sorter.querySelector('.category-chip-pool');
                if (pool) this.moveChip(chip, pool, false);
            } else if (data.targetCategory) {
                const targetZone = sorter.querySelector(`.category-drop-zone[data-category="${data.targetCategory}"]`);
                if (targetZone) this.moveChip(chip, targetZone, false);
            }
        }

        checkAnswers(container) {
            const sorters = container.querySelectorAll('.category-sorter');
            if (sorters.length === 0) return { total: 0, correct: 0 };

            let totalChips = 0;
            let correctChips = 0;

            sorters.forEach(sorter => {
                const pool = sorter.querySelector('.category-chip-pool');
                const dropZones = sorter.querySelectorAll('.category-drop-zone');

                // Check chips in drop zones
                dropZones.forEach(zone => {
                    const zoneCategory = (zone.dataset.category || '').toLowerCase().trim();
                    const chips = zone.querySelectorAll('.category-chip');

                    chips.forEach(chip => {
                        totalChips++;
                        const chipCategory = (chip.dataset.category || '').toLowerCase().trim();
                        const validCategories = chipCategory.split('|').map(c => c.trim());

                        chip.classList.remove('correct', 'wrong', 'unplaced');
                        if (validCategories.includes(zoneCategory)) {
                            chip.classList.add('correct');
                            correctChips++;
                        } else {
                            chip.classList.add('wrong');
                        }
                    });
                });

                // Unplaced chips in pool
                if (pool) {
                    pool.querySelectorAll('.category-chip').forEach(chip => {
                        totalChips++;
                        chip.classList.remove('correct', 'wrong');
                        chip.classList.add('unplaced');
                    });
                }
            });

            return { total: totalChips, correct: correctChips };
        }

        revealKeys(container) {
            const sorters = container.querySelectorAll('.category-sorter');
            sorters.forEach(sorter => {
                const chips = sorter.querySelectorAll('.category-chip');
                chips.forEach(chip => {
                    const chipCategory = (chip.dataset.category || '').split('|')[0].trim();
                    const targetZone = sorter.querySelector(`.category-drop-zone[data-category="${chipCategory}"]`);
                    if (targetZone) {
                        this.moveChip(chip, targetZone, false);
                        chip.classList.remove('wrong', 'unplaced');
                        chip.classList.add('correct');
                    }
                });
            });
            this.clearSelection();
        }

        resetTask(container) {
            const sorters = container.querySelectorAll('.category-sorter');
            sorters.forEach(sorter => {
                const pool = sorter.querySelector('.category-chip-pool');
                if (pool) {
                    sorter.querySelectorAll('.category-chip').forEach(chip => {
                        chip.classList.remove('correct', 'wrong', 'unplaced', 'selected-chip');
                        pool.appendChild(chip);
                    });
                }
            });
            this.clearSelection();
        }
    }

    // Export singleton instance
    window.categorySorter = new CategorySorterEngine();
})();
