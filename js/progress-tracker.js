/**
 * Universal Exercise Progress & Score Tracker (ProgressTracker)
 * 
 * 1. Auto-saves student input/select responses in sessionStorage so progress is never lost.
 * 2. Auto-calculates overall score across all interactive exercises in the presentation.
 * 3. Injects live score summary badge on the final review slide.
 */

class ProgressTracker {
    constructor() {
        this.storageKey = `deck_progress_${window.location.pathname.split('/').pop()}`;
        this.init();
    }

    init() {
        // Restore after DeckComponents signals that all inputs have been hydrated/cleared.
        // This is safer than setTimeout(0) which may race with hydrateBlanksAndInputs.
        document.addEventListener('DeckComponents:hydrated',
            () => this.restoreResponses(), { once: true });
        // Fallback: if the event already fired before this tracker was created, restore after 150ms
        setTimeout(() => { if (!this._restored) this.restoreResponses(); }, 150);
        this.bindAutoSave();
        this.renderReviewDashboard();
    }

    /**
     * Auto-saves all inputs and selects when modified
     */
    bindAutoSave() {
        let saveTimeout = null;
        const debouncedSave = () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => this.saveResponses(), 400);
        };
        document.addEventListener('change', debouncedSave);
        document.addEventListener('input', debouncedSave);
    }

    saveResponses() {
        const state = {};
        document.querySelectorAll('.blank-input, .select-input').forEach((input, index) => {
            const id = input.id || `input_${index}`;
            state[id] = input.value;
        });
        sessionStorage.setItem(this.storageKey, JSON.stringify(state));
        this.renderReviewDashboard();
    }

    restoreResponses() {
        this._restored = true;
        const saved = sessionStorage.getItem(this.storageKey);
        if (!saved) return;
        try {
            const state = JSON.parse(saved);
            document.querySelectorAll('.blank-input, .select-input').forEach((input, index) => {
                const id = input.id || `input_${index}`;
                if (state[id] !== undefined) {
                    input.value = state[id];
                }
            });
        } catch (e) {}
    }

    /**
     * Calculates total questions and correct count across the presentation
     */
    calculateStats() {
        let total = 0;
        let correct = 0;

        document.querySelectorAll('.blank-input, .select-input').forEach(input => {
            total++;
            if (input.classList.contains('correct')) correct++;
        });

        document.querySelectorAll('.opt-card').forEach(card => {
            if (card.dataset.correct === 'true') {
                total++;
                if (card.classList.contains('correct-opt')) correct++;
            }
        });

        return {
            total,
            correct,
            percentage: total > 0 ? Math.round((correct / total) * 100) : 0
        };
    }

    /**
     * Renders a live score card on the review slide if present
     */
    renderReviewDashboard() {
        const reviewSlide = document.querySelector('.slide[data-skill="review"]');
        if (!reviewSlide) return;

        let dashboard = reviewSlide.querySelector('#moduleScoreWidget');
        if (!dashboard) {
            dashboard = document.createElement('div');
            dashboard.id = 'moduleScoreWidget';
            dashboard.className = 'card score-dashboard-card';
            
            const insertTarget = reviewSlide.querySelector('.col, .page-content');
            if (insertTarget) {
                insertTarget.appendChild(dashboard);
            }
        }

        const stats = this.calculateStats();
        dashboard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <div style="font-size:18px; font-weight:800; color:var(--col-review, #0f766e);">📊 Module Exercise Progress</div>
                    <div style="font-size:14.5px; color:var(--text-muted);">Total Checked Items: <strong>${stats.correct} / ${stats.total}</strong></div>
                </div>
                <div style="font-size:28px; font-weight:900; color:var(--col-review, #0f766e); font-family:var(--font-mono, monospace);">
                    ${stats.percentage}%
                </div>
            </div>
        `;
    }
}

// Global auto-instantiation
window.addEventListener('DOMContentLoaded', () => {
    window.progressTracker = new ProgressTracker();
});
