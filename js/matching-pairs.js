/**
 * =========================================================================
 * UNIVERSAL MATCHING PAIRS ENGINE
 * Course Presentations Architecture — Expert IELTS Masterclass
 * Connects left-column items (words, headings, causes) with right-column items
 * Supports both Click-to-Match and Drag-and-Drop pairing with Presenter Sync
 * =========================================================================
 */

(function () {
    'use strict';

    class MatchingPairsEngine {
        constructor() {
            this.activeLeftItem = null;
            this.colorPalette = [
                { bg: '#dcfce7', border: '#16a34a', text: '#15803d', darkBg: 'rgba(22, 163, 74, 0.25)', darkText: '#86efac' },
                { bg: '#e0e7ff', border: '#4f46e5', text: '#3730a3', darkBg: 'rgba(79, 70, 229, 0.25)', darkText: '#c7d2fe' },
                { bg: '#fef3c7', border: '#d97706', text: '#92400e', darkBg: 'rgba(217, 119, 6, 0.25)', darkText: '#fde68a' },
                { bg: '#fce7f3', border: '#db2777', text: '#9d174d', darkBg: 'rgba(219, 39, 119, 0.25)', darkText: '#fbcfe8' },
                { bg: '#ccfbf1', border: '#0d9488', text: '#115e59', darkBg: 'rgba(13, 148, 136, 0.25)', darkText: '#99f6e4' },
                { bg: '#ffedd5', border: '#ea580c', text: '#9a3412', darkBg: 'rgba(234, 88, 12, 0.25)', darkText: '#fed7aa' },
                { bg: '#f3e8ff', border: '#9333ea', text: '#6b21a8', darkBg: 'rgba(147, 51, 234, 0.25)', darkText: '#e9d5ff' },
                { bg: '#e0f2fe', border: '#0284c7', text: '#075985', darkBg: 'rgba(2, 132, 199, 0.25)', darkText: '#bae6fd' }
            ];
            this.init();
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.bindAll());
            } else {
                this.bindAll();
            }

            if (window.presenterSyncEngine) {
                window.presenterSyncEngine.on('MATCH_PAIR_ACTION', (data) => {
                    this.applyRemoteMatch(data);
                });
            }

            document.addEventListener('deck:slide-change', () => this.bindAll());
            document.addEventListener('DOMContentLoaded', () => {
                const observer = new MutationObserver(() => this.bindAll());
                observer.observe(document.body, { childList: true, subtree: true });
            });
        }

        bindAll() {
            document.querySelectorAll('.matching-pairs-exercise, .match-exercise').forEach(container => {
                this.setupExercise(container);
            });
        }

        setupExercise(container) {
            if (container._matchInitialized) return;
            container._matchInitialized = true;

            const leftItems = container.querySelectorAll('.match-left-item, [data-match-left]');
            const rightItems = container.querySelectorAll('.match-right-item, [data-match-right]');

            leftItems.forEach((leftEl, idx) => {
                if (!leftEl.id) leftEl.id = `match-l-${Date.now()}-${idx}`;
                leftEl.setAttribute('draggable', 'true');

                leftEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.handleLeftClick(leftEl, container);
                });

                leftEl.addEventListener('dragstart', (e) => {
                    leftEl.classList.add('dragging');
                    e.dataTransfer.setData('text/plain', leftEl.id);
                    e.dataTransfer.effectAllowed = 'link';
                });

                leftEl.addEventListener('dragend', () => {
                    leftEl.classList.remove('dragging');
                    container.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
                });
            });

            rightItems.forEach((rightEl, idx) => {
                if (!rightEl.id) rightEl.id = `match-r-${Date.now()}-${idx}`;

                rightEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.handleRightClick(rightEl, container);
                });

                rightEl.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    rightEl.classList.add('drag-over');
                });

                rightEl.addEventListener('dragleave', (e) => {
                    if (!rightEl.contains(e.relatedTarget)) {
                        rightEl.classList.remove('drag-over');
                    }
                });

                rightEl.addEventListener('drop', (e) => {
                    e.preventDefault();
                    rightEl.classList.remove('drag-over');
                    const leftId = e.dataTransfer.getData('text/plain');
                    const leftEl = document.getElementById(leftId);
                    if (leftEl && container.contains(leftEl)) {
                        this.pairItems(leftEl, rightEl, container, true);
                    }
                });
            });
        }

        handleLeftClick(leftEl, container) {
            if (leftEl._pairedWith) {
                // Clicking an already paired left item breaks its connection
                this.unpair(leftEl, leftEl._pairedWith, container, true);
                return;
            }

            if (this.activeLeftItem === leftEl) {
                this.clearActiveSelection();
            } else {
                this.clearActiveSelection();
                this.activeLeftItem = leftEl;
                leftEl.classList.add('active-match-select');
            }
        }

        handleRightClick(rightEl, container) {
            if (this.activeLeftItem && container.contains(this.activeLeftItem)) {
                this.pairItems(this.activeLeftItem, rightEl, container, true);
                this.clearActiveSelection();
            } else if (rightEl._pairedWith) {
                // Clicking an already paired right item breaks connection
                this.unpair(rightEl._pairedWith, rightEl, container, true);
            }
        }

        clearActiveSelection() {
            if (this.activeLeftItem) {
                this.activeLeftItem.classList.remove('active-match-select');
                this.activeLeftItem = null;
            }
        }

        pairItems(leftEl, rightEl, container, broadcast = true) {
            if (!leftEl || !rightEl) return;

            // If either was already paired with something else, break prior pairing first
            if (leftEl._pairedWith) this.unpair(leftEl, leftEl._pairedWith, container, false);
            if (rightEl._pairedWith) this.unpair(rightEl._pairedWith, rightEl, container, false);

            const pairIndex = (container._pairCount || 0) % this.colorPalette.length;
            container._pairCount = (container._pairCount || 0) + 1;
            const color = this.colorPalette[pairIndex];

            leftEl._pairedWith = rightEl;
            rightEl._pairedWith = leftEl;
            leftEl._pairColor = color;
            rightEl._pairColor = color;

            leftEl.classList.add('is-paired');
            rightEl.classList.add('is-paired');
            leftEl.style.borderColor = color.border;
            rightEl.style.borderColor = color.border;

            // Badge indicator
            this.setPairBadge(leftEl, pairIndex + 1, color);
            this.setPairBadge(rightEl, pairIndex + 1, color);

            if (broadcast && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('MATCH_PAIR_ACTION', {
                    action: 'pair',
                    leftId: leftEl.id,
                    rightId: rightEl.id,
                    containerId: container.id || null
                });
            }
        }

        setPairBadge(el, num, color) {
            let badge = el.querySelector('.match-pair-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'match-pair-badge';
                el.prepend(badge);
            }
            badge.textContent = `Pair ${num}`;
            badge.style.backgroundColor = color.border;
            badge.style.color = '#ffffff';
        }

        unpair(leftEl, rightEl, container, broadcast = true) {
            if (leftEl) {
                leftEl._pairedWith = null;
                leftEl.classList.remove('is-paired', 'correct', 'wrong');
                leftEl.style.borderColor = '';
                const b = leftEl.querySelector('.match-pair-badge');
                if (b) b.remove();
            }
            if (rightEl) {
                rightEl._pairedWith = null;
                rightEl.classList.remove('is-paired', 'correct', 'wrong');
                rightEl.style.borderColor = '';
                const b = rightEl.querySelector('.match-pair-badge');
                if (b) b.remove();
            }

            if (broadcast && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('MATCH_PAIR_ACTION', {
                    action: 'unpair',
                    leftId: leftEl?.id || null,
                    rightId: rightEl?.id || null,
                    containerId: container.id || null
                });
            }
        }

        applyRemoteMatch(data) {
            if (!data) return;
            const container = data.containerId ? document.getElementById(data.containerId) : document.querySelector('.slide.active') || document;
            if (!container) return;

            const leftEl = document.getElementById(data.leftId);
            const rightEl = document.getElementById(data.rightId);

            if (data.action === 'pair' && leftEl && rightEl) {
                this.pairItems(leftEl, rightEl, container, false);
            } else if (data.action === 'unpair') {
                this.unpair(leftEl, rightEl, container, false);
            }
        }

        checkAnswers(container) {
            const exercises = container.querySelectorAll('.matching-pairs-exercise, .match-exercise');
            if (exercises.length === 0) return { total: 0, correct: 0 };

            let total = 0;
            let correct = 0;

            exercises.forEach(ex => {
                const leftItems = ex.querySelectorAll('.match-left-item, [data-match-left]');
                leftItems.forEach(left => {
                    total++;
                    const expectedMatch = (left.dataset.matchLeft || left.dataset.ans || '').trim().toLowerCase();
                    const pairedRight = left._pairedWith;

                    left.classList.remove('correct', 'wrong');
                    if (pairedRight) pairedRight.classList.remove('correct', 'wrong');

                    if (pairedRight) {
                        const rightVal = (pairedRight.dataset.matchRight || pairedRight.dataset.key || pairedRight.innerText || '').trim().toLowerCase();
                        if (expectedMatch && (rightVal === expectedMatch || expectedMatch.includes(rightVal))) {
                            left.classList.add('correct');
                            pairedRight.classList.add('correct');
                            correct++;
                        } else {
                            left.classList.add('wrong');
                            pairedRight.classList.add('wrong');
                        }
                    } else {
                        left.classList.add('wrong');
                    }
                });
            });

            return { total, correct };
        }

        revealKeys(container) {
            const exercises = container.querySelectorAll('.matching-pairs-exercise, .match-exercise');
            exercises.forEach(ex => {
                const leftItems = ex.querySelectorAll('.match-left-item, [data-match-left]');
                const rightItems = ex.querySelectorAll('.match-right-item, [data-match-right]');

                leftItems.forEach(left => {
                    const expectedMatch = (left.dataset.matchLeft || left.dataset.ans || '').trim().toLowerCase();
                    for (const right of rightItems) {
                        const rightVal = (right.dataset.matchRight || right.dataset.key || right.innerText || '').trim().toLowerCase();
                        if (expectedMatch && (rightVal === expectedMatch || expectedMatch.includes(rightVal))) {
                            this.pairItems(left, right, ex, false);
                            left.classList.add('correct');
                            right.classList.add('correct');
                            break;
                        }
                    }
                });
            });
            this.clearActiveSelection();
        }

        resetTask(container) {
            const exercises = container.querySelectorAll('.matching-pairs-exercise, .match-exercise');
            exercises.forEach(ex => {
                ex._pairCount = 0;
                ex.querySelectorAll('.match-left-item, .match-right-item, [data-match-left], [data-match-right]').forEach(el => {
                    el._pairedWith = null;
                    el.classList.remove('is-paired', 'correct', 'wrong', 'active-match-select');
                    el.style.borderColor = '';
                    const b = el.querySelector('.match-pair-badge');
                    if (b) b.remove();
                });
            });
            this.clearActiveSelection();
        }
    }

    // Export singleton
    window.matchingPairsEngine = new MatchingPairsEngine();
})();
