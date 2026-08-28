/**
 * DeckEngine Core Module
 * Handles 1920x1080 stage scaling, slide lifecycle, keyboard/touch navigation,
 * font scaling, and core exercise verification/reveal logic.
 */
class DeckEngine {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.stage = document.getElementById('deckStage');
        this.counter = document.getElementById('slideCounter');
        this.fontScale = 1.0;
        this.fontToastTimer = null;

        // Auto-detect skill mapping from slide data-skill attributes
        this.skillMap = {};
        this.buildSkillMap();

        this.setupStageScale();
        this.setupKeyboardNav();
        this.setupTouchNav();

        // Check if there's a hash in URL (e.g. #slide-4)
        const initialSlide = this.getSlideFromHash();
        this.showSlide(initialSlide >= 0 ? initialSlide : 0);
    }

    buildSkillMap() {
        this.slides.forEach((slide, idx) => {
            const skill = slide.dataset.skill;
            if (skill && skill !== 'title' && skill !== 'section') {
                if (!this.skillMap[skill]) {
                    this.skillMap[skill] = [];
                }
                this.skillMap[skill].push(idx);
            }
        });
    }

    getSlideFromHash() {
        const hash = window.location.hash;
        if (!hash) return -1;
        const match = hash.match(/#?(?:slide-)?(\d+)/i);
        if (match) {
            const slideNum = parseInt(match[1], 10);
            if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= this.slides.length) {
                return slideNum - 1;
            }
        }
        return -1;
    }

    setupStageScale() {
        this.aspectRatio = localStorage.getItem('deck_aspect_ratio') || '16:9';
        this.applyAspectRatio(this.aspectRatio, false);

        const scale = () => {
            if (!this.stage) return;
            const targetW = this.aspectRatio === '4:3' ? 1440 : 1920;
            const targetH = 1080;
            const factor = Math.min(window.innerWidth / targetW, window.innerHeight / targetH);
            const x = (window.innerWidth - targetW * factor) / 2;
            const y = (window.innerHeight - targetH * factor) / 2;
            this.stage.style.transform = `translate(${x}px, ${y}px) scale(${factor})`;
        };
        this.scaleStage = scale;
        scale();
        window.addEventListener('resize', scale);
    }

    toggleAspectRatio() {
        const nextRatio = this.aspectRatio === '16:9' ? '4:3' : '16:9';
        this.applyAspectRatio(nextRatio, true);
    }

    applyAspectRatio(ratio, showToast = true) {
        this.aspectRatio = ratio;
        document.documentElement.setAttribute('data-aspect', ratio);
        localStorage.setItem('deck_aspect_ratio', ratio);
        if (this.scaleStage) this.scaleStage();

        // Update Aspect Button in HUD if present
        const btn = document.getElementById('toolAspectBtn');
        if (btn) {
            const label = btn.querySelector('.tool-label');
            if (label) label.textContent = ratio;
            btn.title = `Aspect Ratio: ${ratio} (Shift+A)`;
        }

        if (showToast) {
            this.showToastNotification(`📐 Aspect Ratio: ${ratio} Mode`);
        }
    }

    showToastNotification(text) {
        const indicator = document.getElementById('fontIndicator');
        if (indicator) {
            indicator.textContent = text;
            indicator.classList.add('show');
            clearTimeout(this.fontToastTimer);
            this.fontToastTimer = setTimeout(() => {
                indicator.classList.remove('show');
            }, 1400);
        }
    }

    setupKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
                e.preventDefault();
                this.nextSlide();
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                this.prevSlide();
            } else if (e.key === 'Home') {
                e.preventDefault();
                this.showSlide(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                this.showSlide(this.slides.length - 1);
            } else if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                this.changeFontSize(1);
            } else if (e.key === '-' || e.key === '_') {
                e.preventDefault();
                this.changeFontSize(-1);
            } else if (e.key === '0') {
                e.preventDefault();
                this.resetFontSize();
            }
        });
    }

    setupTouchNav() {
        let startX = 0;
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? this.nextSlide() : this.prevSlide();
            }
        }, { passive: true });
    }

    showSlide(index) {
        if (index < 0 || index >= this.slides.length) return;
        this.slides.forEach((s, i) => {
            s.classList.toggle('active', i === index);
            s.classList.toggle('visible', i === index);
        });
        this.currentSlide = index;
        if (this.counter) {
            this.counter.textContent = `${index + 1} / ${this.slides.length}`;
        }
        if (window.DeckComponents) {
            DeckComponents.updateActiveTab();
        }
    }

    nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
            this.showSlide(this.currentSlide + 1);
        }
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
        }
    }

    jumpToSlide(index) {
        this.showSlide(index);
    }

    jumpToSkill(skillKey) {
        const targetIndices = this.skillMap[skillKey];
        if (!targetIndices || targetIndices.length === 0) return;

        if (targetIndices.length === 1) {
            this.showSlide(targetIndices[0]);
            return;
        }

        const nextIdx = targetIndices.find(idx => idx > this.currentSlide);
        if (nextIdx !== undefined) {
            this.showSlide(nextIdx);
        } else {
            this.showSlide(targetIndices[0]);
        }
    }

    changeFontSize(delta) {
        this.fontScale = parseFloat((this.fontScale + delta * 0.08).toFixed(2));
        this.fontScale = Math.min(Math.max(this.fontScale, 0.75), 1.5);
        this.applyFontScale();
    }

    resetFontSize() {
        this.fontScale = 1.0;
        this.applyFontScale();
    }

    applyFontScale() {
        document.documentElement.style.setProperty('--font-scale', this.fontScale);
        const indicator = document.getElementById('fontIndicator');
        if (indicator) {
            indicator.textContent = `Font Size: ${Math.round(this.fontScale * 100)}%`;
            indicator.classList.add('show');
            clearTimeout(this.fontToastTimer);
            this.fontToastTimer = setTimeout(() => {
                indicator.classList.remove('show');
            }, 1400);
        }
    }

    checkAnswers(container) {
        if (!container) container = document.querySelector('.slide.active');
        if (typeof container === 'string') container = document.getElementById(container);
        if (container instanceof HTMLElement && container.tagName === 'BUTTON') {
            container = container.closest('.question-pane') || container.closest('.slide') || container.closest('.notebook') || container;
        }
        if (!container) return;

        // Check blank inputs
        container.querySelectorAll('.blank-input').forEach(input => {
            if (input.dataset.ans) {
                const rawVal = input.value.trim().toLowerCase();
                const validAnswers = input.dataset.ans.toLowerCase().split('|').map(a => a.trim());
                const isMatch = rawVal !== '' && validAnswers.some(ans => rawVal === ans);
                input.classList.remove('correct', 'wrong', 'incorrect');
                input.classList.add(isMatch ? 'correct' : 'wrong');
            }
        });

        // Check select inputs
        container.querySelectorAll('.select-input').forEach(select => {
            if (select.dataset.ans) {
                const val = select.value.trim().toUpperCase();
                const ans = select.dataset.ans.trim().toUpperCase();
                select.classList.remove('correct', 'wrong', 'incorrect');
                if (val === '') {
                    select.classList.add('wrong');
                } else {
                    select.classList.add(val === ans ? 'correct' : 'wrong');
                }
            }
        });

        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
        document.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.add('active-syn'));
        document.querySelectorAll('mark.evidence').forEach(m => m.classList.add('highlighted'));
    }

    revealKeys(container) {
        if (!container) container = document.querySelector('.slide.active');
        if (typeof container === 'string') container = document.getElementById(container);
        if (container instanceof HTMLElement && container.tagName === 'BUTTON') {
            container = container.closest('.question-pane') || container.closest('.slide') || container.closest('.notebook') || container;
        }
        if (!container) return;

        container.querySelectorAll('.blank-input').forEach(input => {
            if (input.dataset.ans) {
                input.value = input.dataset.ans.split('|')[0];
                input.classList.remove('wrong', 'incorrect');
                input.classList.add('correct');
            }
        });

        container.querySelectorAll('.select-input').forEach(select => {
            if (select.dataset.ans) {
                select.value = select.dataset.ans;
                select.classList.remove('wrong', 'incorrect');
                select.classList.add('correct');
            }
        });

        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
        document.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.add('active-syn'));
        document.querySelectorAll('mark.evidence').forEach(m => m.classList.add('highlighted'));
    }

    revealAnswers(container) {
        this.revealKeys(container);
    }

    resetTask(container) {
        if (!container) container = document.querySelector('.slide.active');
        if (typeof container === 'string') container = document.getElementById(container);
        if (container instanceof HTMLElement && container.tagName === 'BUTTON') {
            container = container.closest('.question-pane') || container.closest('.slide') || container.closest('.notebook') || container;
        }
        if (!container) return;

        container.querySelectorAll('.blank-input, .select-input').forEach(input => {
            input.value = '';
            input.classList.remove('correct', 'wrong', 'incorrect');
        });

        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.remove('show'));
        document.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.remove('active-syn'));
        document.querySelectorAll('mark.evidence').forEach(m => m.classList.remove('highlighted'));
    }

    resetAnswers(container) {
        this.resetTask(container);
    }

    checkBlanks(containerId) {
        this.checkAnswers(containerId);
    }

    revealBlanks(containerId) {
        this.revealKeys(containerId);
    }

    resetBlanks(containerId) {
        this.resetTask(containerId);
    }

    checkSelects(containerId) {
        this.checkAnswers(containerId);
    }

    revealSelects(containerId) {
        this.revealKeys(containerId);
    }

    resetSelects(containerId) {
        this.resetTask(containerId);
    }

    toggleOptCard(card) {
        card.classList.toggle('selected');
    }

    checkMultiOpts(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const cards = container.querySelectorAll('.opt-card');
        cards.forEach(card => {
            const isCorrect = card.dataset.correct === 'true';
            const isSelected = card.classList.contains('selected');
            card.classList.remove('correct-opt', 'wrong-opt');
            if (isSelected) {
                card.classList.add(isCorrect ? 'correct-opt' : 'wrong-opt');
            } else if (isCorrect) {
                card.classList.add('correct-opt');
            }
        });
    }

    revealMultiOpts(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const cards = container.querySelectorAll('.opt-card');
        cards.forEach(card => {
            card.classList.remove('wrong-opt');
            if (card.dataset.correct === 'true') {
                card.classList.add('selected', 'correct-opt');
            } else {
                card.classList.remove('selected');
            }
        });
    }

    resetMultiOpts(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const cards = container.querySelectorAll('.opt-card');
        cards.forEach(card => {
            card.classList.remove('selected', 'correct-opt', 'wrong-opt');
        });
    }

    toggleExplanations(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const explanations = container.querySelectorAll('.item-explanation');
        explanations.forEach(exp => exp.classList.toggle('show'));
    }

    toggleSynonymExplanation(qKey, evId) {
        const evTarget = document.getElementById(evId);
        const synSpans = document.querySelectorAll(`[data-q="${qKey}"]`);
        const isCurrentlyActive = evTarget && evTarget.classList.contains('highlighted');

        document.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.remove('active-syn'));
        document.querySelectorAll('mark.evidence').forEach(m => m.classList.remove('highlighted'));

        if (!isCurrentlyActive) {
            if (evTarget) {
                evTarget.classList.add('highlighted');
                evTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            synSpans.forEach(s => s.classList.add('active-syn'));
        }
    }

    switchHighLineTab(tabNum) {
        const b1 = document.getElementById('stBtn1');
        const b2 = document.getElementById('stBtn2');
        const p1 = document.getElementById('stPane1');
        const p2 = document.getElementById('stPane2');
        if (b1) b1.classList.toggle('active', tabNum === 1);
        if (b2) b2.classList.toggle('active', tabNum === 2);
        if (p1) p1.style.display = tabNum === 1 ? 'block' : 'none';
        if (p2) p2.style.display = tabNum === 2 ? 'block' : 'none';
    }
}

// Global auto-instantiation on window
window.DeckEngine = DeckEngine;

// Universal Global Helper Functions for all presentation decks
window.checkAnswers = (id) => (window.deckEngine ? window.deckEngine.checkAnswers(id) : null);
window.revealAnswers = window.revealKeys = (id) => (window.deckEngine ? window.deckEngine.revealAnswers(id) : null);
window.resetAnswers = window.resetTask = (id) => (window.deckEngine ? window.deckEngine.resetAnswers(id) : null);
window.checkBlanks = (id) => (window.deckEngine ? window.deckEngine.checkBlanks(id) : null);
window.revealBlanks = (id) => (window.deckEngine ? window.deckEngine.revealBlanks(id) : null);
window.resetBlanks = (id) => (window.deckEngine ? window.deckEngine.resetBlanks(id) : null);
window.checkSelects = (id) => (window.deckEngine ? window.deckEngine.checkSelects(id) : null);
window.revealSelects = (id) => (window.deckEngine ? window.deckEngine.revealSelects(id) : null);
window.resetSelects = (id) => (window.deckEngine ? window.deckEngine.resetSelects(id) : null);
window.toggleOptCard = (card) => (window.deckEngine ? window.deckEngine.toggleOptCard(card) : null);
window.checkMultiOpts = (id) => (window.deckEngine ? window.deckEngine.checkMultiOpts(id) : null);
window.revealMultiOpts = (id) => (window.deckEngine ? window.deckEngine.revealMultiOpts(id) : null);
window.resetMultiOpts = (id) => (window.deckEngine ? window.deckEngine.resetMultiOpts(id) : null);
window.toggleExplanations = (id) => (window.deckEngine ? window.deckEngine.toggleExplanations(id) : null);
window.toggleSynonymExplanation = (q, ev) => (window.deckEngine ? window.deckEngine.toggleSynonymExplanation(q, ev) : null);
window.switchHighLineTab = (tab) => (window.deckEngine ? window.deckEngine.switchHighLineTab(tab) : null);
window.jumpToSlide = (idx) => (window.deckEngine ? window.deckEngine.jumpToSlide(idx) : null);
window.jumpToSkill = (skill) => (window.deckEngine ? window.deckEngine.jumpToSkill(skill) : null);

window.addEventListener('DOMContentLoaded', () => {
    if (!window.deckEngine) {
        window.deckEngine = new DeckEngine();
    }
    if (window.DeckComponents) {
        DeckComponents.init();
    }
});
