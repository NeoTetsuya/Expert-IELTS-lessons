/**
 * Universal IELTS Presentation Master Bundle
 * Auto-instantiates DeckEngine on window.deckEngine
 * Generated from modular files in /js/
 */

/* ==================== MODULE: deck-core.js ==================== */
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
        if (window.paragraphLoupe) {
            window.paragraphLoupe.clearFocus();
        }
        window.dispatchEvent(new CustomEvent('slidechanged', {
            detail: { index, slide: this.slides[index] }
        }));
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

        // Normalization helper (normalizes curly quotes, apostrophes, and spacing)
        const normalizeStr = (str) => {
            if (!str) return '';
            return str.trim().toLowerCase()
                .replace(/[\u2018\u2019\u0060\u00B4]/g, "'")
                .replace(/[\u201C\u201D]/g, '"')
                .replace(/\s+/g, ' ');
        };

        // Check blank inputs
        container.querySelectorAll('.blank-input').forEach(input => {
            if (input.dataset.ans) {
                const rawVal = normalizeStr(input.value);
                const validAnswers = input.dataset.ans.split('|').map(a => normalizeStr(a));
                const isMatch = rawVal !== '' && validAnswers.some(ans => rawVal === ans);
                input.classList.remove('correct', 'wrong', 'incorrect');
                input.classList.add(isMatch ? 'correct' : 'wrong');
            }
        });

        // Check select inputs
        container.querySelectorAll('.select-input').forEach(select => {
            if (select.dataset.ans) {
                const val = normalizeStr(select.value);
                const validAnswers = select.dataset.ans.split('|').map(a => normalizeStr(a));
                select.classList.remove('correct', 'wrong', 'incorrect');
                if (val === '') {
                    select.classList.add('wrong');
                } else {
                    const isMatch = validAnswers.some(ans => val === ans);
                    select.classList.add(isMatch ? 'correct' : 'wrong');
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
                if (window.DeckComponents?.autoResizeBlank) {
                    DeckComponents.autoResizeBlank(input);
                }
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
        if (window.vocabBank) {
            window.vocabBank.updateChipStates(container);
        }
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
            if (input.classList.contains('blank-input') && window.DeckComponents?.autoResizeBlank) {
                DeckComponents.autoResizeBlank(input);
            }
        });

        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.remove('show'));
        document.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.remove('active-syn'));
        document.querySelectorAll('mark.evidence').forEach(m => m.classList.remove('highlighted'));
        if (window.vocabBank) {
            window.vocabBank.updateChipStates(container);
        }
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
        if (!evId && qKey) evId = `ev-${qKey}`;
        if (!qKey && evId) qKey = evId.replace(/^ev-/, '');

        const evTarget = evId ? document.getElementById(evId) : null;
        const synSpans = qKey ? document.querySelectorAll(`[data-q="${qKey}"]`) : [];
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

        if (qKey) {
            const card = document.querySelector(`.q-card[data-q="${qKey}"]`);
            if (card) {
                const exp = card.querySelector('.item-explanation');
                if (exp) exp.classList.toggle('show', !isCurrentlyActive);
            }
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


/* ==================== MODULE: deck-components.js ==================== */
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
        this.hydrateBlanksAndInputs();
        this.bindAutoExpandBlanks();
    }

    /**
     * Dynamically auto-expands .blank-input width so full words are never clipped or truncated
     */
    static autoResizeBlank(input) {
        if (!input || !input.classList.contains('blank-input')) return;
        if (!input.dataset.defaultWidth) {
            input.dataset.defaultWidth = input.style.width || `${input.offsetWidth}px` || '80px';
        }

        const text = input.value || input.placeholder || '';
        if (!text) {
            input.style.width = input.dataset.defaultWidth;
            return;
        }

        if (!DeckComponents.measureCanvas) {
            DeckComponents.measureCanvas = document.createElement('canvas');
            DeckComponents.measureCtx = DeckComponents.measureCanvas.getContext('2d');
        }

        const style = window.getComputedStyle(input);
        const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        DeckComponents.measureCtx.font = font;

        const metrics = DeckComponents.measureCtx.measureText(text);
        const textWidth = Math.ceil(metrics.width);

        const paddingLeft = parseFloat(style.paddingLeft) || 14;
        const paddingRight = parseFloat(style.paddingRight) || 14;
        const requiredWidth = textWidth + paddingLeft + paddingRight + 14;

        const defaultWidth = parseFloat(input.dataset.defaultWidth) || 80;
        const newWidth = Math.max(defaultWidth, requiredWidth);

        input.style.width = `${newWidth}px`;
    }

    static bindAutoExpandBlanks() {
        document.addEventListener('input', (e) => {
            if (e.target && e.target.classList.contains('blank-input')) {
                DeckComponents.autoResizeBlank(e.target);
            }
        });

        document.querySelectorAll('.blank-input').forEach(input => {
            DeckComponents.autoResizeBlank(input);
        });
    }

    /**
     * Guarantees all exercise inputs start clean and never show answers immediately:
     * - Clears any initial value on .blank-input and provides subtle sequential number placeholders [1], [2], [3]...
     * - Resets all .select-input dropdowns to their first unselected option
     * - Ensures explanations and evidence highlights start completely hidden
     */
    static hydrateBlanksAndInputs() {
        document.querySelectorAll('.slide').forEach(slide => {
            const containers = slide.querySelectorAll('.card, .question-pane, .page-content, .notebook');
            const processedInputs = new Set();

            containers.forEach(container => {
                const blanks = Array.from(container.querySelectorAll('.blank-input'));
                let count = 0;
                blanks.forEach(input => {
                    if (processedInputs.has(input)) return;
                    processedInputs.add(input);

                    // Clear value so answers are never displayed upfront
                    input.value = '';
                    input.classList.remove('correct', 'wrong', 'incorrect');

                    // If no explicit placeholder exists, assign clean sequential number placeholder [1], [2], etc.
                    if (!input.placeholder || input.placeholder.trim() === '') {
                        count++;
                        input.placeholder = `[${count}]`;
                    }
                });
            });

            // Handle any standalone blanks
            let standaloneCount = 0;
            slide.querySelectorAll('.blank-input').forEach(input => {
                if (!processedInputs.has(input)) {
                    input.value = '';
                    input.classList.remove('correct', 'wrong', 'incorrect');
                    if (!input.placeholder || input.placeholder.trim() === '') {
                        standaloneCount++;
                        input.placeholder = `[${standaloneCount}]`;
                    }
                }
            });

            // Ensure selects start at initial option
            slide.querySelectorAll('.select-input').forEach(sel => {
                sel.selectedIndex = 0;
                sel.classList.remove('correct', 'wrong', 'incorrect');
            });

            // Ensure explanations start hidden
            slide.querySelectorAll('.item-explanation').forEach(exp => {
                exp.classList.remove('show');
            });

            // Ensure evidence marks start plain
            slide.querySelectorAll('mark.evidence').forEach(m => {
                m.classList.remove('highlighted', 'glow-pulse');
            });

            // Ensure synonym pairs start un-highlighted
            slide.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => {
                s.classList.remove('active-syn');
            });
        });
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
     * Auto-binds synonym buttons that specify data-q or data-ev
     */
    static hydrateSynonymButtons() {
        document.querySelectorAll('.syn-btn').forEach(btn => {
            const qKey = btn.dataset.q || btn.closest('.q-card')?.dataset.q || (btn.dataset.ev ? btn.dataset.ev.replace(/^ev-/, '') : null);
            const evId = btn.dataset.ev || (qKey ? `ev-${qKey}` : null);
            btn.onclick = (e) => {
                e.stopPropagation();
                window.deckEngine?.toggleSynonymExplanation(qKey, evId);
            };
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
    if (window.deckEngine && typeof window.deckEngine.checkAnswers === 'function') {
        window.deckEngine.checkAnswers(container);
    } else if (container) {
        container.querySelectorAll('.blank-input').forEach(input => {
            if (input.dataset.ans) {
                const val = input.value.trim().toLowerCase();
                const expected = input.dataset.ans.toLowerCase().split('|').map(s => s.trim());
                if (val && expected.includes(val)) {
                    input.classList.add('correct');
                    input.classList.remove('wrong', 'incorrect');
                } else {
                    input.classList.add('wrong');
                    input.classList.remove('correct');
                }
            }
        });
        container.querySelectorAll('.select-input').forEach(sel => {
            if (sel.dataset.ans) {
                const val = sel.value.trim().toUpperCase();
                const expected = sel.dataset.ans.trim().toUpperCase();
                if (val && val === expected) {
                    sel.classList.add('correct');
                    sel.classList.remove('wrong', 'incorrect');
                } else {
                    sel.classList.add('wrong');
                    sel.classList.remove('correct');
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
    if (window.deckEngine && typeof window.deckEngine.revealKeys === 'function') {
        window.deckEngine.revealKeys(container);
    } else if (window.deckEngine && typeof window.deckEngine.revealAnswers === 'function') {
        window.deckEngine.revealAnswers(container);
    } else if (container) {
        container.querySelectorAll('.blank-input').forEach(input => {
            if (input.dataset.ans) {
                input.value = input.dataset.ans.split('|')[0];
                input.classList.add('correct');
                input.classList.remove('wrong', 'incorrect');
            }
        });
        container.querySelectorAll('.select-input').forEach(sel => {
            if (sel.dataset.ans) {
                sel.value = sel.dataset.ans;
                sel.classList.add('correct');
                sel.classList.remove('wrong', 'incorrect');
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
    if (window.deckEngine && typeof window.deckEngine.resetTask === 'function') {
        window.deckEngine.resetTask(container);
    } else if (window.deckEngine && typeof window.deckEngine.resetAnswers === 'function') {
        window.deckEngine.resetAnswers(container);
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


/* ==================== MODULE: deck-theme-engine.js ==================== */
/**
 * ==========================================================================
 * DECK THEME ENGINE (Frontend Slides Aesthetics System)
 * Provides 6 pre-filled distinctive theme presets, typography pairings,
 * live theme switcher modal, and keyboard shortcuts (Shift+T to cycle).
 * ==========================================================================
 */

class DeckThemeEngine {
    constructor() {
        this.STORAGE_KEY = 'deck_theme_preset';
        this.themes = [
            {
                id: 'academic',
                name: 'Academic Editorial',
                displayFont: 'Playfair Display',
                bodyFont: 'DM Sans',
                icon: '🎓',
                desc: 'Classic authoritative editorial serif with modern sans-serif body.',
                previewBg: 'linear-gradient(135deg, #1e3a8a, #0b1120)'
            },
            {
                id: 'bold-signal',
                name: 'Bold Signal',
                displayFont: 'Space Grotesk',
                bodyFont: 'Plus Jakarta Sans',
                icon: '⚡',
                desc: 'High-contrast, bold brutalist typography with punchy coral accents.',
                previewBg: 'linear-gradient(135deg, #881337, #111827)'
            },
            {
                id: 'electric',
                name: 'Electric Studio',
                displayFont: 'Manrope',
                bodyFont: 'Outfit',
                icon: '💎',
                desc: 'Ultra-clean modern geometric tech feel with cobalt blue and cyan.',
                previewBg: 'linear-gradient(135deg, #1e1b4b, #030712)'
            },
            {
                id: 'botanical',
                name: 'Dark Botanical',
                displayFont: 'Cormorant Garamond',
                bodyFont: 'Plus Jakarta Sans',
                icon: '🌿',
                desc: 'Refined literary luxury with elegant serif headers and emerald green.',
                previewBg: 'linear-gradient(135deg, #064e3b, #061a14)'
            },
            {
                id: 'voltage',
                name: 'Creative Voltage',
                displayFont: 'Syne',
                bodyFont: 'Space Grotesk',
                icon: '🚀',
                desc: 'Avant-garde dynamic creative energy with electric purple accents.',
                previewBg: 'linear-gradient(135deg, #3b0764, #090514)'
            },
            {
                id: 'vintage',
                name: 'Vintage Editorial',
                displayFont: 'Bodoni Moda',
                bodyFont: 'DM Sans',
                icon: '📜',
                desc: 'Sophisticated literary masterclass with Bodoni high-contrast serifs.',
                previewBg: 'linear-gradient(135deg, #44403c, #1c1917)'
            }
        ];

        // Determine default or saved theme
        let saved = null;
        try {
            saved = localStorage.getItem(this.STORAGE_KEY);
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }
        const docDefault = document.documentElement.getAttribute('data-theme') || 
                           document.body.getAttribute('data-theme') || 'academic';
        this.currentTheme = saved || docDefault;

        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme, false);

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.injectUI());
        } else {
            this.injectUI();
        }

        // Shortcut: Shift + T to cycle themes
        document.addEventListener('keydown', (e) => {
            if (e.shiftKey && (e.key === 'T' || e.key === 't') && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
                this.cycleTheme();
            }
        });
    }

    applyTheme(themeId, showToast = true) {
        const theme = this.themes.find(t => t.id === themeId) || this.themes[0];
        this.currentTheme = theme.id;
        
        document.documentElement.setAttribute('data-theme', theme.id);
        document.body.setAttribute('data-theme', theme.id);
        try {
            localStorage.setItem(this.STORAGE_KEY, theme.id);
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }

        if (showToast) {
            this.showToast(`${theme.icon} Theme: ${theme.name} (${theme.displayFont} + ${theme.bodyFont})`);
        }

        // Update active state in modal if open
        document.querySelectorAll('.theme-card-option').forEach(card => {
            if (card.dataset.themeId === theme.id) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    cycleTheme() {
        const currentIndex = this.themes.findIndex(t => t.id === this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.applyTheme(this.themes[nextIndex].id, true);
    }

    showToast(message) {
        let toast = document.getElementById('themeToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'themeToast';
            toast.className = 'theme-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('visible');
        clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
            toast.classList.remove('visible');
        }, 2600);
    }

    injectUI() {
        if (document.getElementById('themePickerModal')) return;

        // Modal
        const modal = document.createElement('div');
        modal.id = 'themePickerModal';
        modal.className = 'theme-picker-modal';
        modal.style.display = 'none';

        const themeCards = this.themes.map(t => `
            <div class="theme-card-option ${t.id === this.currentTheme ? 'active' : ''}" 
                 data-theme-id="${t.id}" 
                 onclick="deckThemeEngine.applyTheme('${t.id}')">
                <div class="theme-preview-banner" style="background:${t.previewBg}">
                    <span class="theme-icon">${t.icon}</span>
                </div>
                <div class="theme-card-body">
                    <div class="theme-card-title">${t.name}</div>
                    <div class="theme-card-fonts">${t.displayFont} + ${t.bodyFont}</div>
                    <div class="theme-card-desc">${t.desc}</div>
                </div>
            </div>
        `).join('');

        modal.innerHTML = `
            <div class="theme-modal-backdrop" onclick="deckThemeEngine.closeModal()"></div>
            <div class="theme-modal-dialog">
                <div class="theme-modal-header">
                    <div>
                        <h2>🎨 Presentation Aesthetic Themes</h2>
                        <p>Select a typography and atmosphere pairing (Shortcut: <kbd>Shift + T</kbd> to cycle live).</p>
                    </div>
                    <button class="theme-modal-close" onclick="deckThemeEngine.closeModal()">×</button>
                </div>
                <div class="theme-grid">
                    ${themeCards}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    openModal() {
        const modal = document.getElementById('themePickerModal');
        if (modal) modal.style.display = 'flex';
    }

    closeModal() {
        const modal = document.getElementById('themePickerModal');
        if (modal) modal.style.display = 'none';
    }

    toggleModal() {
        const modal = document.getElementById('themePickerModal');
        if (modal && modal.style.display === 'flex') {
            this.closeModal();
        } else {
            this.openModal();
        }
    }
}

// Global instantiation
window.deckThemeEngine = new DeckThemeEngine();


/* ==================== MODULE: teacher-highlighter.js ==================== */
/**
 * ==========================================================================
 * TEACHER REAL TEXT HIGHLIGHTER ENGINE (TeacherHighlighter)
 * Interactive Text-Selection Highlighter for Classroom Presentations
 * - Directly highlights selected text in the slide with fluorescent marker tones
 * - Preserves original font styling and text legibility (no font re-coloring)
 * - Multi-color support: Fluorescent Yellow, Neon Green, Sky Cyan, Coral Pink
 * - Click any highlighted text to remove/unhighlight
 * - Keyboard shortcuts: 'H' (toggle mode), 'C' (clear all), 'Ctrl+Z' (undo)
 * ==========================================================================
 */

class TeacherHighlighter {
    constructor(deckEngine) {
        this.deckEngine = deckEngine;
        this.isActive = false;
        this.colors = [
            { name: 'Yellow', bg: 'rgba(254, 240, 138, 0.85)', hex: '#facc15', border: '#ca8a04', label: '🟡' },
            { name: 'Green',  bg: 'rgba(187, 247, 208, 0.85)', hex: '#4ade80', border: '#16a34a', label: '🟢' },
            { name: 'Cyan',   bg: 'rgba(186, 230, 253, 0.85)', hex: '#38bdf8', border: '#0284c7', label: '🔵' },
            { name: 'Pink',   bg: 'rgba(251, 207, 232, 0.85)', hex: '#f472b6', border: '#db2777', label: '🌸' }
        ];
        this.currentColorIndex = 0;
        this.history = []; // Array of arrays of created <mark> elements

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindEvents());
        } else {
            this.bindEvents();
        }
        this.injectStyles();
    }

    bindEvents() {
        // Highlight on mouseup when active and text is selected
        document.addEventListener('mouseup', (e) => {
            if (!this.isActive) return;
            // Avoid triggering when clicking inside HUD controls or modals
            if (e.target.closest('#presentationToolsHUD, .tool-modal, .highlighter-palette, .notes-header')) return;

            setTimeout(() => {
                const selection = window.getSelection();
                if (selection && !selection.isCollapsed && selection.toString().trim().length > 0) {
                    this.highlightSelection(this.colors[this.currentColorIndex]);
                }
            }, 10);
        });

        // Global shortcuts
        document.addEventListener('keydown', (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

            // 'H' key toggles highlighter mode
            if ((e.key === 'h' || e.key === 'H') && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                this.toggle();
            }

            // 'C' key clears highlights when mode is active
            if ((e.key === 'c' || e.key === 'C') && this.isActive && !e.ctrlKey) {
                e.preventDefault();
                this.clear();
            }

            // 'Ctrl + Z' undoes last highlight
            if (e.ctrlKey && (e.key === 'z' || e.key === 'Z') && this.isActive) {
                e.preventDefault();
                this.undo();
            }
        });
    }

    toggle() {
        this.isActive = !this.isActive;
        document.body.classList.toggle('highlighter-mode-active', this.isActive);

        const btn = document.getElementById('toolHighlightBtn');
        if (btn) btn.classList.toggle('active', this.isActive);

        const palette = document.getElementById('highlighterPalette');
        if (palette) palette.style.display = this.isActive ? 'flex' : 'none';

        if (this.isActive && window.deckEngine) {
            window.deckEngine.showToastNotification(`🖍️ Text Highlighter: ${this.colors[this.currentColorIndex].name} (Select text to highlight)`);
        }
    }

    setColor(index) {
        if (index >= 0 && index < this.colors.length) {
            this.currentColorIndex = index;
            document.querySelectorAll('.highlighter-color-btn').forEach((btn, i) => {
                btn.classList.toggle('active', i === index);
            });
            if (window.deckEngine) {
                window.deckEngine.showToastNotification(`🖍️ Color: ${this.colors[index].name}`);
            }
        }
    }

    highlightSelection(colorObj) {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const selectedText = selection.toString().trim();
        if (!selectedText) return;

        const commonAncestor = range.commonAncestorContainer;
        const rootElement = commonAncestor.nodeType === Node.ELEMENT_NODE ? commonAncestor : commonAncestor.parentNode;

        // Skip non-content UI
        if (rootElement.closest('.presentation-tools-hud, .tool-modal, .presenter-notes-drawer')) {
            return;
        }

        const treeWalker = document.createTreeWalker(
            rootElement,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                    try {
                        if (range.intersectsNode(node)) {
                            return NodeFilter.FILTER_ACCEPT;
                        }
                    } catch(err) {}
                    return NodeFilter.FILTER_REJECT;
                }
            }
        );

        const textNodes = [];
        let currentNode = treeWalker.nextNode();
        while (currentNode) {
            textNodes.push(currentNode);
            currentNode = treeWalker.nextNode();
        }

        if (textNodes.length === 0 && commonAncestor.nodeType === Node.TEXT_NODE) {
            textNodes.push(commonAncestor);
        }

        const createdMarks = [];

        textNodes.forEach(textNode => {
            const isStart = (textNode === range.startContainer);
            const isEnd = (textNode === range.endContainer);
            const startOffset = isStart ? range.startOffset : 0;
            const endOffset = isEnd ? range.endOffset : textNode.nodeValue.length;

            if (startOffset >= endOffset) return;

            const text = textNode.nodeValue;
            const targetText = text.substring(startOffset, endOffset);
            if (!targetText.trim()) return;

            const beforeText = text.substring(0, startOffset);
            const afterText = text.substring(endOffset);

            const mark = document.createElement('mark');
            mark.className = 'teacher-text-highlight';
            mark.dataset.colorName = colorObj.name;
            mark.style.backgroundColor = colorObj.bg;
            mark.style.borderColor = colorObj.border;
            mark.textContent = targetText;
            mark.title = 'Click to unhighlight';

            mark.addEventListener('click', (e) => {
                if (this.isActive) {
                    e.stopPropagation();
                    this.removeHighlight(mark);
                }
            });

            const parent = textNode.parentNode;
            if (!parent) return;

            const fragment = document.createDocumentFragment();
            if (beforeText) fragment.appendChild(document.createTextNode(beforeText));
            fragment.appendChild(mark);
            if (afterText) fragment.appendChild(document.createTextNode(afterText));

            parent.replaceChild(fragment, textNode);
            createdMarks.push(mark);
        });

        selection.removeAllRanges();

        if (createdMarks.length > 0) {
            this.history.push(createdMarks);
        }
    }

    removeHighlight(mark) {
        if (!mark || !mark.parentNode) return;
        const text = mark.textContent;
        const textNode = document.createTextNode(text);
        const parent = mark.parentNode;
        parent.replaceChild(textNode, mark);
        parent.normalize(); // Merges adjacent text nodes smoothly
    }

    undo() {
        if (this.history.length > 0) {
            const lastBatch = this.history.pop();
            lastBatch.forEach(mark => this.removeHighlight(mark));
            if (window.deckEngine) {
                window.deckEngine.showToastNotification('↩️ Undid highlight');
            }
        }
    }

    clear() {
        const activeSlide = document.querySelector('.slide.active') || document.body;
        const highlights = activeSlide.querySelectorAll('.teacher-text-highlight');
        highlights.forEach(mark => this.removeHighlight(mark));
        this.history = [];
        if (window.deckEngine) {
            window.deckEngine.showToastNotification('🗑️ Cleared highlights');
        }
    }

    injectStyles() {
        if (document.getElementById('teacherHighlighterStyles')) return;
        const style = document.createElement('style');
        style.id = 'teacherHighlighterStyles';
        style.textContent = `
            body.highlighter-mode-active {
                cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23facc15' stroke='%23000' stroke-width='1.5'%3E%3Cpath d='m9 11-6 6v3h3l6-6'/%3E%3Cpath d='m22 7-3-3a2.83 2.83 0 0 0-4 0l-4 4 7 7 4-4a2.83 2.83 0 0 0 0-4Z'/%3E%3C/svg%3E") 2 22, text !important;
            }
            body.highlighter-mode-active * {
                user-select: text !important;
            }
            mark.teacher-text-highlight {
                color: inherit !important;
                background-color: rgba(254, 240, 138, 0.85);
                border-bottom: 2px solid #ca8a04;
                border-radius: 3px;
                padding: 1px 3px;
                cursor: pointer;
                transition: background-color 0.2s ease, opacity 0.2s ease;
                box-decoration-break: clone;
                -webkit-box-decoration-break: clone;
            }
            mark.teacher-text-highlight:hover {
                filter: brightness(0.92);
                outline: 1px dashed rgba(0, 0, 0, 0.3);
            }
            .highlighter-palette {
                position: absolute;
                top: 52px;
                right: 70px;
                background: rgba(15, 23, 42, 0.94);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.16);
                border-radius: 24px;
                padding: 6px 12px;
                display: flex;
                align-items: center;
                gap: 8px;
                z-index: 100000;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
                animation: toolFadeIn 0.2s ease;
            }
            .highlighter-color-btn {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 2px solid transparent;
                cursor: pointer;
                transition: transform 0.15s ease, border-color 0.15s ease;
            }
            .highlighter-color-btn:hover { transform: scale(1.15); }
            .highlighter-color-btn.active {
                border-color: #ffffff;
                box-shadow: 0 0 8px currentColor;
                transform: scale(1.12);
            }
            .highlighter-divider {
                width: 1px;
                height: 18px;
                background: rgba(255, 255, 255, 0.2);
            }
            .highlighter-tool-btn {
                background: transparent;
                border: none;
                color: #cbd5e1;
                font-size: 12px;
                font-weight: 700;
                padding: 3px 6px;
                border-radius: 6px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            .highlighter-tool-btn:hover {
                background: rgba(255, 255, 255, 0.15);
                color: #fff;
            }
        `;
        document.head.appendChild(style);
    }
}

// Global instantiation
window.teacherHighlighter = new TeacherHighlighter();


/* ==================== MODULE: step-reveal.js ==================== */
/**
 * ==========================================================================
 * STEP-BY-STEP REVEAL ENGINE (StepRevealEngine)
 * Enables single-item question reveal for Socratic IELTS classroom teaching
 * - Supports ALL exercise types: Reading (.q-card), Grammar Cloze (.blank-input),
 *   Vocabulary (.select-input), and Multi-choice (.opt-card)
 * - Auto-scrolls reading passage to center on target evidence
 * - Keyboard shortcut: 'E' to step-reveal next unsolved question/input
 * ==========================================================================
 */

class StepRevealEngine {
    constructor(deckEngine) {
        this.deckEngine = deckEngine;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindEvents());
        } else {
            this.bindEvents();
        }

        // Shortcut 'E' to reveal next item on active slide
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'e' || e.key === 'E') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                e.preventDefault();
                this.revealNextOnActiveSlide();
            }
        });
    }

    bindEvents() {
        // 1. Add Step Reveal button to action rows across ALL exercise slides (same line as action buttons)
        document.querySelectorAll('.action-row').forEach(row => {
            if (row.querySelector('.btn-step-reveal')) return;
            const container = row.closest('.question-pane') || row.closest('.page-content') || row.closest('.notebook') || row.parentElement;
            
            // Check if there are any interactive elements on this slide/container
            const hasInteractives = container && (
                container.querySelector('.q-card') ||
                container.querySelector('.select-input') ||
                container.querySelector('.blank-input') ||
                container.querySelector('.opt-card')
            );

            if (hasInteractives) {
                const btn = document.createElement('button');
                btn.className = 'btn-action btn-step-reveal';
                btn.innerHTML = '👉 Step Reveal (E)';
                btn.title = 'Reveal questions one by one (Shortcut: E)';
                btn.onclick = () => this.revealNextInContainer(container);
                row.insertBefore(btn, row.children[1] || null);
            }
        });

        // 2. Allow clicking anywhere on a question card to reveal it without injecting disruptive UI buttons
        document.querySelectorAll('.q-card').forEach(card => {
            if (card.dataset.stepBound) return;
            card.dataset.stepBound = 'true';
            card.addEventListener('click', (e) => {
                if (window.getSelection && window.getSelection().toString().trim().length > 0) return;
                if (e.target.tagName !== 'SELECT' && e.target.tagName !== 'INPUT' && !e.target.closest('button') && !e.target.closest('a')) {
                    this.revealSingleCard(card);
                }
            });
        });

        this.injectStyles();
    }

    /**
     * Finds all unrevealed interactive units (cards, standalone inputs, opt-cards) in DOM order
     */
    getUnrevealedItems(container) {
        if (!container) return [];
        const units = [];
        const processedInputs = new Set();

        // 1. Check for question cards
        const qCards = Array.from(container.querySelectorAll('.q-card'));
        qCards.forEach(card => {
            const inputs = Array.from(card.querySelectorAll('.blank-input, .select-input'));
            const isUnsolved = inputs.length > 0
                ? inputs.some(inp => !inp.classList.contains('correct'))
                : !card.classList.contains('revealed');

            if (isUnsolved) {
                units.push({
                    type: 'card',
                    el: card
                });
            }
            inputs.forEach(inp => processedInputs.add(inp));
        });

        // 2. Check for standalone blank and select inputs not inside a .q-card
        const allInputs = Array.from(container.querySelectorAll('.blank-input, .select-input'));
        allInputs.forEach(input => {
            if (!processedInputs.has(input) && !input.classList.contains('correct') && input.dataset.ans) {
                units.push({
                    type: 'input',
                    el: input
                });
            }
        });

        // 3. Check for multi-option cards (.opt-card)
        const optCards = Array.from(container.querySelectorAll('.opt-card'));
        optCards.forEach(card => {
            if (card.dataset.correct === 'true' && !card.classList.contains('correct-opt') && !card.classList.contains('selected')) {
                units.push({
                    type: 'opt-card',
                    el: card
                });
            }
        });

        // Sort units by DOM document order
        units.sort((a, b) => {
            const pos = a.el.compareDocumentPosition(b.el);
            if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
            if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
            return 0;
        });

        return units;
    }

    revealSingleCard(card) {
        // Reveal blank inputs inside card
        card.querySelectorAll('.blank-input').forEach(input => {
            if (input.dataset.ans) {
                const acceptable = input.dataset.ans.split('|')[0];
                input.value = acceptable;
                input.classList.add('correct');
                input.classList.remove('wrong', 'incorrect');
                if (window.DeckComponents?.autoResizeBlank) {
                    DeckComponents.autoResizeBlank(input);
                }
            }
        });

        // Reveal select dropdowns inside card
        card.querySelectorAll('.select-input').forEach(sel => {
            if (sel.dataset.ans) {
                sel.value = sel.dataset.ans;
                sel.classList.add('correct');
                sel.classList.remove('wrong', 'incorrect');
            }
        });

        card.classList.add('revealed');

        // Show explanation box if exists
        const exp = card.querySelector('.item-explanation');
        if (exp) {
            exp.classList.add('show');
            exp.style.display = 'block';
        }

        // Auto-trigger evidence highlight in passage if linked
        const qId = card.dataset.q;
        const synBtn = card.querySelector('.syn-btn');
        const evId = synBtn ? synBtn.dataset.ev : (qId ? `ev-${qId}` : null);
        if (qId && window.readingHighlighter) {
            window.readingHighlighter.showEvidence(qId, evId);
        } else if (qId && window.deckEngine) {
            if (evId) window.deckEngine.toggleSynonymExplanation(qId, evId);
        }
    }

    revealSingleInput(input) {
        if (!input || !input.dataset.ans) return;

        if (input.classList.contains('blank-input')) {
            input.value = input.dataset.ans.split('|')[0];
            input.classList.add('correct');
            input.classList.remove('wrong', 'incorrect');
            if (window.DeckComponents?.autoResizeBlank) {
                DeckComponents.autoResizeBlank(input);
            }
        } else if (input.classList.contains('select-input')) {
            input.value = input.dataset.ans;
            input.classList.add('correct');
            input.classList.remove('wrong', 'incorrect');
        }

        // Reveal associated explanation in parent container/item if present
        const parent = input.closest('.card, .cloze-box, .exercise-box, .q-item, p, li, tr, div');
        if (parent) {
            const exp = parent.querySelector('.item-explanation');
            if (exp) {
                exp.classList.add('show');
                exp.style.display = 'block';
            }
        }
    }

    revealNextOnActiveSlide() {
        const activeSlide = document.querySelector('.slide.active');
        if (!activeSlide) return;
        this.revealNextInContainer(activeSlide);
    }

    revealNextInContainer(container) {
        if (!container) return;
        const unrevealedUnits = this.getUnrevealedItems(container);
        if (unrevealedUnits.length === 0) return;

        const nextUnit = unrevealedUnits[0];
        if (nextUnit.type === 'card') {
            this.revealSingleCard(nextUnit.el);
            nextUnit.el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else if (nextUnit.type === 'input') {
            this.revealSingleInput(nextUnit.el);
            nextUnit.el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else if (nextUnit.type === 'opt-card') {
            nextUnit.el.classList.add('selected', 'correct-opt');
            nextUnit.el.classList.remove('wrong-opt');
            nextUnit.el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    injectStyles() {
        if (document.getElementById('stepRevealStyles')) return;
        const style = document.createElement('style');
        style.id = 'stepRevealStyles';
        style.textContent = `
            .btn-step-reveal {
                background: rgba(5, 150, 105, 0.12) !important;
                border-color: rgba(5, 150, 105, 0.4) !important;
                color: var(--col-vocab, #059669) !important;
                font-weight: 700 !important;
            }
            .btn-step-reveal:hover {
                background: var(--col-vocab, #059669) !important;
                color: #ffffff !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Global instantiation
window.stepRevealEngine = new StepRevealEngine();


/* ==================== MODULE: student-picker.js ==================== */
/**
 * ==========================================================================
 * RANDOM STUDENT SELECTOR (StudentPicker)
 * Interactive Cold-Call / Random Selector for Classroom Engagement
 * - Animated roulette spin effect
 * - Customizable student names list or fast number mode (1 to N)
 * - Saved in localStorage for future class sessions
 * - Keyboard shortcut: 'R' (toggle)
 * ==========================================================================
 */

class StudentPicker {
    constructor() {
        this.STORAGE_KEY = 'ielts_class_roster';
        this.students = this.loadStudents();
        this.isSpinning = false;

        this.init();
    }

    loadStudents() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            try { return JSON.parse(saved); } catch(e) {}
        }
        return ['Alex', 'David', 'Emma', 'Grace', 'Henry', 'James', 'Lucas', 'Mia', 'Oliver', 'Sophie'];
    }

    saveStudents() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.students));
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.injectUI());
        } else {
            this.injectUI();
        }

        // Global shortcut 'R'
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'r' || e.key === 'R') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    injectUI() {
        if (document.getElementById('studentPickerModal')) return;

        const modal = document.createElement('div');
        modal.id = 'studentPickerModal';
        modal.className = 'student-picker-modal';
        modal.style.display = 'none';

        modal.innerHTML = `
            <div class="student-modal-backdrop" onclick="studentPicker.close()"></div>
            <div class="student-modal-dialog">
                <div class="student-modal-header">
                    <div>
                        <h2>🎲 Random Student Selector</h2>
                        <p>Engage students with fair cold-calling &amp; speaking turns.</p>
                    </div>
                    <button class="student-modal-close" onclick="studentPicker.close()">×</button>
                </div>

                <div class="picker-display-stage">
                    <div class="picker-result-name" id="pickerResultName">Click Spin to Pick!</div>
                </div>

                <div class="picker-controls-row">
                    <button class="btn-picker-spin" id="pickerSpinBtn" onclick="studentPicker.spin()">🎲 SPIN WHEEL</button>
                    <button class="btn-picker-edit" onclick="studentPicker.toggleRosterEditor()">✏️ Edit Roster</button>
                </div>

                <!-- Roster Editor Drawer -->
                <div class="roster-editor-box" id="rosterEditorBox" style="display:none;">
                    <label>Enter Student Names (comma or newline separated):</label>
                    <textarea id="rosterInput" rows="4">${this.students.join(', ')}</textarea>
                    <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:8px;">
                        <button class="btn-action" onclick="studentPicker.setQuickNumbers(15)">1–15 Numbers</button>
                        <button class="btn-action btn-primary" onclick="studentPicker.saveRosterFromInput()">Save Roster</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.injectStyles();
    }

    spin() {
        if (this.isSpinning || this.students.length === 0) return;
        this.isSpinning = true;

        const resultEl = document.getElementById('pickerResultName');
        const spinBtn = document.getElementById('pickerSpinBtn');
        if (spinBtn) spinBtn.disabled = true;

        let counter = 0;
        const totalCycles = 24 + Math.floor(Math.random() * 8);
        const interval = 60;

        const step = () => {
            const randomIndex = Math.floor(Math.random() * this.students.length);
            resultEl.textContent = this.students[randomIndex];
            resultEl.style.transform = `scale(${1 + (counter % 3) * 0.04})`;
            counter++;

            if (counter < totalCycles) {
                setTimeout(step, interval + counter * 6);
            } else {
                this.isSpinning = false;
                if (spinBtn) spinBtn.disabled = false;
                resultEl.style.transform = 'scale(1.15)';
                resultEl.style.color = '#38bdf8';
                this.playChime();
            }
        };

        step();
    }

    playChime() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            osc.start();
            osc.stop(ctx.currentTime + 0.45);
        } catch(e) {}
    }

    toggleRosterEditor() {
        const box = document.getElementById('rosterEditorBox');
        if (box) {
            box.style.display = box.style.display === 'none' ? 'block' : 'none';
        }
    }

    saveRosterFromInput() {
        const input = document.getElementById('rosterInput');
        if (!input) return;
        const names = input.value.split(/[,\n]+/).map(n => n.trim()).filter(n => n.length > 0);
        if (names.length > 0) {
            this.students = names;
            this.saveStudents();
            this.toggleRosterEditor();
        }
    }

    setQuickNumbers(count = 15) {
        const numbers = [];
        for (let i = 1; i <= count; i++) numbers.push(`Student #${i}`);
        this.students = numbers;
        this.saveStudents();
        const input = document.getElementById('rosterInput');
        if (input) input.value = numbers.join(', ');
        this.toggleRosterEditor();
    }

    open() {
        const modal = document.getElementById('studentPickerModal');
        if (modal) modal.style.display = 'flex';
    }

    close() {
        const modal = document.getElementById('studentPickerModal');
        if (modal) modal.style.display = 'none';
    }

    toggle() {
        const modal = document.getElementById('studentPickerModal');
        if (modal && modal.style.display === 'flex') {
            this.close();
        } else {
            this.open();
        }
    }

    injectStyles() {
        if (document.getElementById('studentPickerStyles')) return;
        const style = document.createElement('style');
        style.id = 'studentPickerStyles';
        style.textContent = `
            .student-picker-modal {
                position: fixed;
                inset: 0;
                z-index: 100000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .student-modal-backdrop {
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.78);
                backdrop-filter: blur(8px);
            }
            .student-modal-dialog {
                position: relative;
                z-index: 1;
                background: #0f172a;
                border: 1.5px solid rgba(255, 255, 255, 0.16);
                border-radius: 18px;
                width: 90%;
                max-width: 540px;
                padding: 28px;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
                color: #ffffff;
            }
            .student-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 20px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding-bottom: 12px;
            }
            .student-modal-header h2 { font-size: 20px; font-weight: 800; }
            .student-modal-header p { font-size: 13px; color: #94a3b8; }
            .student-modal-close {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 26px;
                cursor: pointer;
            }
            .student-modal-close:hover { color: #fff; }
            .picker-display-stage {
                background: rgba(255, 255, 255, 0.05);
                border: 2px dashed rgba(56, 189, 248, 0.35);
                border-radius: 14px;
                height: 120px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
            }
            .picker-result-name {
                font-size: 32px;
                font-weight: 900;
                color: #f8fafc;
                transition: transform 0.1s ease, color 0.2s ease;
                text-align: center;
            }
            .picker-controls-row {
                display: flex;
                gap: 10px;
            }
            .btn-picker-spin {
                flex: 1;
                background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
                color: #ffffff;
                font-size: 16px;
                font-weight: 800;
                padding: 14px 20px;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                box-shadow: 0 4px 18px rgba(37, 99, 235, 0.4);
                transition: all 0.2s ease;
            }
            .btn-picker-spin:hover { transform: translateY(-2px); filter: brightness(1.1); }
            .btn-picker-edit {
                background: rgba(255, 255, 255, 0.08);
                color: #cbd5e1;
                border: 1px solid rgba(255, 255, 255, 0.15);
                padding: 14px 18px;
                border-radius: 10px;
                cursor: pointer;
                font-weight: 700;
            }
            .btn-picker-edit:hover { background: rgba(255, 255, 255, 0.15); color: #fff; }
            .roster-editor-box {
                margin-top: 16px;
                padding-top: 16px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            .roster-editor-box label { font-size: 12px; font-weight: 700; color: #94a3b8; display: block; margin-bottom: 6px; }
            .roster-editor-box textarea {
                width: 100%;
                background: #1e293b;
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 8px;
                color: #f8fafc;
                padding: 8px 12px;
                font-family: inherit;
                font-size: 13.5px;
            }
        `;
        document.head.appendChild(style);
    }
}

// Global instantiation
window.studentPicker = new StudentPicker();


/* ==================== MODULE: paragraph-loupe.js ==================== */
/**
 * ==========================================================================
 * PARAGRAPH FOCUS LOUPE (ParagraphLoupe)
 * Isolates and magnifies individual reading paragraphs for projector clarity
 * - Click any paragraph tag [Paragraph X] to zoom in (140% scale)
 * - Dims neighboring paragraphs for laser-focused reading analysis
 * - Keyboard shortcut: 'Z' (cycles through paragraphs) / 'Escape' to reset
 * ==========================================================================
 */

class ParagraphLoupe {
    constructor() {
        this.activePara = null;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindTags());
        } else {
            this.bindTags();
        }

        // Global shortcut 'Z' to cycle focus on active slide
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'z' || e.key === 'Z') && !e.ctrlKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                e.preventDefault();
                this.cycleNextParagraph();
            }

            if (e.key === 'Escape' && this.activePara) {
                this.clearFocus();
            }
        });
    }

    bindTags() {
        document.querySelectorAll('.reading-pane p').forEach(p => {
            const tag = p.querySelector('.para-tag');
            if (tag) {
                tag.style.cursor = 'zoom-in';
                tag.title = 'Click to focus & magnify this paragraph (Shortcut: Z)';
                tag.onclick = (e) => {
                    e.stopPropagation();
                    this.toggleFocus(p);
                };
            }
        });

        this.injectStyles();
    }

    toggleFocus(paraEl) {
        if (this.activePara === paraEl) {
            this.clearFocus();
        } else {
            this.focusParagraph(paraEl);
        }
    }

    focusParagraph(paraEl) {
        this.clearFocus();
        this.activePara = paraEl;

        const pane = paraEl.closest('.reading-pane');
        if (pane) {
            pane.classList.add('loupe-active');
            paraEl.classList.add('loupe-focused');
            paraEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    clearFocus() {
        if (this.activePara) {
            const pane = this.activePara.closest('.reading-pane');
            if (pane) pane.classList.remove('loupe-active');
            this.activePara.classList.remove('loupe-focused');
            this.activePara = null;
        }
    }

    cycleNextParagraph() {
        const activeSlide = document.querySelector('.slide.active');
        if (!activeSlide) return;
        const paragraphs = Array.from(activeSlide.querySelectorAll('.reading-pane p'));
        if (paragraphs.length === 0) return;

        let nextIndex = 0;
        if (this.activePara) {
            const currentIndex = paragraphs.indexOf(this.activePara);
            nextIndex = (currentIndex + 1) % (paragraphs.length + 1);
        }

        if (nextIndex < paragraphs.length) {
            this.focusParagraph(paragraphs[nextIndex]);
        } else {
            this.clearFocus();
        }
    }

    injectStyles() {
        if (document.getElementById('paragraphLoupeStyles')) return;
        const style = document.createElement('style');
        style.id = 'paragraphLoupeStyles';
        style.textContent = `
            .reading-pane.loupe-active p {
                opacity: 0.28;
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            .reading-pane.loupe-active p.loupe-focused {
                opacity: 1 !important;
                transform: scale(1.04);
                transform-origin: left center;
                background: rgba(56, 189, 248, 0.08);
                border-left: 4px solid var(--col-reading, #2563eb);
                padding: 8px 12px;
                border-radius: 0 8px 8px 0;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            }
            .para-tag:hover {
                transform: scale(1.1);
                color: #ffffff;
                background: var(--col-reading, #2563eb) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Global instantiation
window.paragraphLoupe = new ParagraphLoupe();


/* ==================== MODULE: presenter-notes.js ==================== */
/**
 * ==========================================================================
 * TEACHER PRESENTER NOTES DRAWER (PresenterNotesEngine)
 * Collapsible side-drawer displaying pedagogical talking points,
 * pacing cues, and common IELTS student pitfalls for the active slide.
 * Keyboard shortcut: 'N' (toggle notes)
 * ==========================================================================
 */

class PresenterNotesEngine {
    constructor(deckEngine) {
        this.deckEngine = deckEngine;
        this.isOpen = false;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.injectUI());
        } else {
            this.injectUI();
        }

        // Shortcut 'N' toggles presenter notes
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'n' || e.key === 'N') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    injectUI() {
        if (document.getElementById('presenterNotesDrawer')) return;

        const drawer = document.createElement('aside');
        drawer.id = 'presenterNotesDrawer';
        drawer.className = 'presenter-notes-drawer';
        drawer.innerHTML = `
            <div class="notes-header">
                <div>
                    <h3>📝 Teacher Presenter Notes</h3>
                    <span class="notes-slide-tag" id="notesSlideTag">Slide 1</span>
                </div>
                <button class="notes-close-btn" onclick="presenterNotesEngine.toggle()">×</button>
            </div>
            <div class="notes-content" id="notesContent">
                <!-- Dynamically hydrated -->
            </div>
        `;
        document.body.appendChild(drawer);
        this.injectStyles();

        // Listen to slide changes to update notes
        window.addEventListener('slidechanged', () => this.updateNotesForCurrentSlide());
        this.updateNotesForCurrentSlide();
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const drawer = document.getElementById('presenterNotesDrawer');
        const btn = document.getElementById('toolNotesBtn');
        if (drawer) drawer.classList.toggle('open', this.isOpen);
        if (btn) btn.classList.toggle('active', this.isOpen);
        if (this.isOpen) this.updateNotesForCurrentSlide();
    }

    updateNotesForCurrentSlide() {
        const activeSlide = document.querySelector('.slide.active');
        const tagEl = document.getElementById('notesSlideTag');
        const contentEl = document.getElementById('notesContent');
        if (!activeSlide || !contentEl) return;

        const skill = activeSlide.dataset.skill || 'general';
        const slideNum = activeSlide.querySelector('.slide-number')?.textContent || 'General Overview';
        if (tagEl) tagEl.textContent = slideNum;

        // Extract custom slide notes or generate pedagogical guidance based on skill
        let customNote = activeSlide.querySelector('.teacher-note')?.innerHTML;
        if (!customNote) {
            customNote = this.getDefaultGuidance(skill, activeSlide);
        }

        contentEl.innerHTML = customNote;
    }

    getDefaultGuidance(skill, slide) {
        switch(skill) {
            case 'read':
                return `
                    <div class="note-section">
                        <h4>🎯 Objective &amp; Timing (10–12 min)</h4>
                        <p>Have students scan the passage for parallel expressions before answering questions.</p>
                    </div>
                    <div class="note-section warning">
                        <h4>⚠️ Common Student Traps</h4>
                        <p>Students often mistake <strong>NOT GIVEN</strong> for <strong>FALSE/NO</strong>. Remind them: if the text lacks direct confirmation or denial, it must be NOT GIVEN.</p>
                    </div>
                    <div class="note-section tip">
                        <h4>💡 Teacher Tip</h4>
                        <p>Use the <kbd>E</kbd> key for Step Reveal to discuss each question card Socratic-style.</p>
                    </div>
                `;
            case 'grammar':
                return `
                    <div class="note-section">
                        <h4>🎯 Objective &amp; Timing (8–10 min)</h4>
                        <p>Clarify tense markers and clause construction. Elicit example sentences from 2–3 students.</p>
                    </div>
                    <div class="note-section tip">
                        <h4>💡 Collocation Check</h4>
                        <p>Highlight prepositions and time adverbials (e.g. <em>since 2011</em> vs <em>in 2011</em>).</p>
                    </div>
                `;
            case 'write':
                return `
                    <div class="note-section">
                        <h4>🎯 Objective &amp; Timing (12–15 min)</h4>
                        <p>Analyze paragraph coherence, cohesive devices, and data comparison structures.</p>
                    </div>
                    <div class="note-section">
                        <h4>📊 Band 7.0+ Criteria</h4>
                        <p>Ensure students note the contrast transition words (<em>while, in contrast, whereas</em>) highlighted on screen.</p>
                    </div>
                `;
            case 'vocab':
                return `
                    <div class="note-section">
                        <h4>🎯 Objective &amp; Timing (6–8 min)</h4>
                        <p>Drill pronunciation using the Multi-Accent speech player. Test word formation suffixes.</p>
                    </div>
                `;
            default:
                return `
                    <div class="note-section">
                        <h4>🎯 Presentation Guidance</h4>
                        <p>Introduce the module syllabus and set the pacing expectations for today's masterclass.</p>
                    </div>
                `;
        }
    }

    injectStyles() {
        if (document.getElementById('presenterNotesStyles')) return;
        const style = document.createElement('style');
        style.id = 'presenterNotesStyles';
        style.textContent = `
            .presenter-notes-drawer {
                position: fixed;
                top: 0;
                right: 0;
                width: 360px;
                height: 100vh;
                background: #0f172a;
                border-left: 1.5px solid rgba(255, 255, 255, 0.16);
                box-shadow: -10px 0 35px rgba(0, 0, 0, 0.6);
                z-index: 99999;
                transform: translateX(100%);
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                display: flex;
                flex-direction: column;
                color: #f8fafc;
            }
            .presenter-notes-drawer.open {
                transform: translateX(0);
            }
            .notes-header {
                padding: 20px 24px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }
            .notes-header h3 { font-size: 16px; font-weight: 800; }
            .notes-slide-tag { font-family: var(--font-mono); font-size: 12px; color: #38bdf8; }
            .notes-close-btn {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 24px;
                cursor: pointer;
            }
            .notes-close-btn:hover { color: #ffffff; }
            .notes-content {
                flex: 1;
                padding: 24px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .note-section {
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 14px 16px;
            }
            .note-section h4 { font-size: 13.5px; font-weight: 800; margin-bottom: 6px; color: #38bdf8; }
            .note-section p { font-size: 13px; color: #cbd5e1; line-height: 1.55; }
            .note-section.warning { border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.08); }
            .note-section.warning h4 { color: #f87171; }
            .note-section.tip { border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.08); }
            .note-section.tip h4 { color: #34d399; }
        `;
        document.head.appendChild(style);
    }
}

// Global instantiation
window.presenterNotesEngine = new PresenterNotesEngine();


/* ==================== MODULE: reading-grounder.js ==================== */
/**
 * Reading Grounder & Synonym Engine (ReadingGrounder)
 * Handles automatic linking, synonym badge rendering, and evidence synchronization
 * between Reading Passages and Question Panes.
 */

class ReadingGrounder {
    static init() {
        this.renderSynonymBadges();
        this.bindEvidenceHover();
    }

    /**
     * Renders concise data-syn attributes into styled synonym cards:
     * Example: <div class="item-explanation" data-syn="green: 'perform brilliantly' ↔ 'are able to cope' | purple: 'under pressure' ↔ 'difficult situation'"></div>
     */
    static renderSynonymBadges() {
        document.querySelectorAll('[data-syn]').forEach(container => {
            const raw = container.dataset.syn;
            if (!raw) return;

            const pairs = raw.split('|').map(p => p.trim());
            const fragment = document.createDocumentFragment();

            pairs.forEach(pair => {
                const parts = pair.split(':');
                if (parts.length >= 2) {
                    const color = parts[0].trim().toLowerCase(); // green, purple, orange, blue
                    const text = parts.slice(1).join(':').trim();

                    const box = document.createElement('div');
                    box.className = 'syn-key-box';

                    const tag = document.createElement('span');
                    tag.className = `syn-tag ${color}`;
                    tag.textContent = color.charAt(0).toUpperCase() + color.slice(1) + ':';

                    const label = document.createElement('span');
                    label.innerHTML = text.replace(/'([^']+)'/g, '<em>"$1"</em>');

                    box.appendChild(tag);
                    box.appendChild(label);
                    fragment.appendChild(box);
                }
            });

            container.appendChild(fragment);
        });
    }

    /**
     * Highlights corresponding evidence when hovering over question cards
     */
    static bindEvidenceHover() {
        document.querySelectorAll('.q-card[data-q], [data-evidence-target]').forEach(card => {
            const qKey = card.dataset.q;
            if (!qKey) return;

            card.addEventListener('mouseenter', () => {
                document.querySelectorAll(`mark.evidence[id*="${qKey}"]`).forEach(m => m.classList.add('hover-focus'));
            });
            card.addEventListener('mouseleave', () => {
                document.querySelectorAll(`mark.evidence[id*="${qKey}"]`).forEach(m => m.classList.remove('hover-focus'));
            });
        });
    }
}

// Auto-run on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
    ReadingGrounder.init();
});


/* ==================== MODULE: reading-highlighter.js ==================== */
/**
 * Universal Reading Evidence & Synonym Highlighter (ReadingHighlighter)
 * 
 * Automatically manages all reading highlighting behaviors:
 * 1. Reveals evidence marks (<mark class="evidence">) and synonym pairs (.syn-pair-*) when checking or revealing answers.
 * 2. Clears highlights and explanations when resetting exercises.
 * 3. Smooth-scrolls the reading passage to center on the exact evidence when clicking synonym buttons.
 * 4. Adds glowing focus pulses when hovering over or selecting question items.
 * 5. Hooks transparently into DeckEngine's exercise methods.
 */

class ReadingHighlighter {
    constructor() {
        this.activeEvidenceId = null;
        this.init();
    }

    init() {
        this.bindSynonymClicks();
        this.bindQuestionHover();
        this.hookDeckEngine();
    }

    /**
     * Highlights all evidence and synonym pairs associated with an exercise container or current slide
     */
    highlightAll(containerId) {
        const slide = this.getSlideForContainer(containerId);
        if (!slide) return;

        // Highlight all evidence marks in this slide's reading pane
        slide.querySelectorAll('mark.evidence').forEach(mark => {
            mark.classList.add('highlighted');
        });

        // Activate all synonym pairs in both reading pane and question pane
        slide.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(span => {
            span.classList.add('active-syn');
        });

        // Show all item explanations
        const container = containerId ? document.getElementById(containerId) : slide;
        if (container) {
            container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
        }
    }

    /**
     * Clears all evidence highlights, synonym badges, and explanations in the slide
     */
    clearAll(containerId) {
        const slide = this.getSlideForContainer(containerId);
        if (!slide) return;

        slide.querySelectorAll('mark.evidence').forEach(mark => {
            mark.classList.remove('highlighted', 'glow-pulse');
        });

        slide.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(span => {
            span.classList.remove('active-syn');
        });

        const container = containerId ? document.getElementById(containerId) : slide;
        if (container) {
            container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.remove('show'));
        }

        this.activeEvidenceId = null;
    }

    /**
     * Toggles highlight and smooth-scrolls to specific evidence for question qKey
     */
    focusEvidence(qKey, evId) {
        if (!evId && qKey) {
            evId = `ev-${qKey}`;
        }

        let evTarget = evId ? document.getElementById(evId) : null;
        if (!evTarget && qKey) {
            evTarget = document.querySelector(`mark.evidence[data-q="${qKey}"], mark.evidence#ev-${qKey}, mark.evidence[data-ev="${evId}"]`);
        }
        if (!evTarget && evId) {
            evTarget = document.querySelector(`mark.evidence[data-ev="${evId}"]`);
        }

        const synSpans = document.querySelectorAll(`[data-q="${qKey}"]`);
        const isCurrentlyActive = evTarget && evTarget.classList.contains('highlighted') && this.activeEvidenceId === (evId || qKey);

        // Clear all previous single-question highlights
        document.querySelectorAll('mark.evidence').forEach(m => m.classList.remove('highlighted', 'glow-pulse'));
        document.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.remove('active-syn'));

        if (!isCurrentlyActive && evTarget) {
            evTarget.classList.add('highlighted', 'glow-pulse');
            synSpans.forEach(s => s.classList.add('active-syn'));
            this.activeEvidenceId = evId || qKey;

            // Smooth scroll into view inside the scrollable reading pane
            const readingPane = evTarget.closest('.reading-pane');
            if (readingPane) {
                const paneRect = readingPane.getBoundingClientRect();
                const targetRect = evTarget.getBoundingClientRect();
                const relativeTop = targetRect.top - paneRect.top + readingPane.scrollTop;
                const centerOffset = relativeTop - (paneRect.height / 2) + (targetRect.height / 2);

                readingPane.scrollTo({
                    top: Math.max(0, centerOffset),
                    behavior: 'smooth'
                });
            } else {
                evTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Remove pulse animation after 2.5s while keeping highlight
            setTimeout(() => {
                evTarget.classList.remove('glow-pulse');
            }, 2500);
        } else {
            this.activeEvidenceId = null;
        }
    }

    showEvidence(qKey, evId) {
        this.focusEvidence(qKey, evId);
    }

    /**
     * Auto-detects the slide element containing the specified container
     */
    getSlideForContainer(containerId) {
        if (containerId) {
            const el = document.getElementById(containerId);
            if (el) return el.closest('.slide') || document.querySelector('.slide.active');
        }
        return document.querySelector('.slide.active');
    }

    /**
     * Auto-binds click handlers on synonym buttons and question cards
     */
    bindSynonymClicks() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.syn-btn');
            if (btn) {
                const qCard = btn.closest('.q-card');
                const dataQ = btn.dataset.q || qCard?.dataset?.q || (btn.dataset.ev ? btn.dataset.ev.replace(/^ev-/, '') : null);
                const dataEv = btn.dataset.ev || (dataQ ? `ev-${dataQ}` : null);
                if (dataQ || dataEv) {
                    e.preventDefault();
                    this.focusEvidence(dataQ, dataEv);
                    if (qCard) {
                        const exp = qCard.querySelector('.item-explanation');
                        if (exp) exp.classList.toggle('show');
                    }
                }
                return;
            }

            // Clicking question card text focuses evidence
            const qCard = e.target.closest('.q-card[data-q]');
            if (qCard && !e.target.closest('select, input, button, a')) {
                const dataQ = qCard.dataset.q;
                if (dataQ) {
                    this.focusEvidence(dataQ);
                }
            }
        });
    }

    /**
     * Auto-binds question card hover for interactive previewing
     */
    bindQuestionHover() {
        document.querySelectorAll('.q-card[data-q]').forEach(card => {
            const qKey = card.dataset.q;
            card.addEventListener('mouseenter', () => {
                document.querySelectorAll(`mark.evidence[id*="${qKey}"]`).forEach(m => m.classList.add('hover-preview'));
            });
            card.addEventListener('mouseleave', () => {
                document.querySelectorAll(`mark.evidence[id*="${qKey}"]`).forEach(m => m.classList.remove('hover-preview'));
            });
        });
    }

    /**
     * Transparently hooks into DeckEngine's check/reveal/reset methods
     */
    hookDeckEngine() {
        if (typeof window.DeckEngine !== 'undefined') {
            const self = this;

            // Hook checkBlanks & checkSelects
            const origCheckBlanks = DeckEngine.prototype.checkBlanks;
            DeckEngine.prototype.checkBlanks = function (containerId) {
                origCheckBlanks.call(this, containerId);
                self.highlightAll(containerId);
            };

            const origCheckSelects = DeckEngine.prototype.checkSelects;
            DeckEngine.prototype.checkSelects = function (containerId) {
                origCheckSelects.call(this, containerId);
                self.highlightAll(containerId);
            };

            // Hook revealBlanks & revealSelects
            const origRevealBlanks = DeckEngine.prototype.revealBlanks;
            DeckEngine.prototype.revealBlanks = function (containerId) {
                origRevealBlanks.call(this, containerId);
                self.highlightAll(containerId);
            };

            const origRevealSelects = DeckEngine.prototype.revealSelects;
            DeckEngine.prototype.revealSelects = function (containerId) {
                origRevealSelects.call(this, containerId);
                self.highlightAll(containerId);
            };

            // Hook resetBlanks & resetSelects
            const origResetBlanks = DeckEngine.prototype.resetBlanks;
            DeckEngine.prototype.resetBlanks = function (containerId) {
                origResetBlanks.call(this, containerId);
                self.clearAll(containerId);
            };

            const origResetSelects = DeckEngine.prototype.resetSelects;
            DeckEngine.prototype.resetSelects = function (containerId) {
                origResetSelects.call(this, containerId);
                self.clearAll(containerId);
            };

            // Hook toggleSynonymExplanation
            DeckEngine.prototype.toggleSynonymExplanation = function (qKey, evId) {
                self.focusEvidence(qKey, evId);
            };
        }
    }
}

// Inject glow and preview CSS styles for evidence marks
(function () {
    const style = document.createElement('style');
    style.id = 'readingHighlighterStyles';
    style.textContent = `
        mark.evidence {
            transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        mark.evidence.highlighted {
            background: #fef08a !important;
            color: #854d0e !important;
            border-bottom: 2.5px solid #ca8a04 !important;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 600;
        }
        mark.evidence.glow-pulse {
            box-shadow: 0 0 0 4px rgba(234, 179, 8, 0.45);
            background: #fef9c3 !important;
        }
        mark.evidence.hover-preview {
            background: rgba(254, 240, 138, 0.5) !important;
            border-bottom: 2px dashed #ca8a04 !important;
        }
    `;
    document.head.appendChild(style);
})();

// Global auto-instantiation
let readingHighlighter;
window.addEventListener('DOMContentLoaded', () => {
    readingHighlighter = new ReadingHighlighter();
});


/* ==================== MODULE: vocab-bank.js ==================== */
/**
 * Universal Vocabulary & Word Bank Interactive Engine (VocabBank)
 * 
 * Supports:
 * 1. Click-to-fill: Clicking a word bank chip automatically places it into the active or next empty blank.
 * 2. Visual tracking: Chips get marked as used/struck-through when their word is filled into an input.
 * 3. Double-click to clear: Clicking a filled blank returns the word to the bank.
 * 4. IELTS Multi-Accent Pronunciation (British 🇬🇧 / Australian 🇦🇺 / American 🇺🇸).
 */

class VocabBank {
    constructor() {
        this.activeInput = null;
        let savedAccent = 'en-GB';
        try {
            savedAccent = localStorage.getItem('ielts_speech_accent') || 'en-GB';
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }
        this.currentAccent = savedAccent; // default British RP
        this.speechRate = 0.92;
        this.init();
    }

    init() {
        this.bindWordChips();
        this.bindBlankInputs();
        this.bindAudioPronunciation();
        this.injectAccentSelectorStyles();
    }

    /**
     * Binds click handlers to .word-chip / .vocab-chip elements
     */
    bindWordChips() {
        document.addEventListener('click', (e) => {
            const chip = e.target.closest('.word-chip, .vocab-chip, [data-word]');
            if (!chip) return;

            const word = chip.dataset.word || chip.textContent.trim();
            const container = chip.closest('.card, .q-card, .two-col, .page-content, .slide');
            if (!container) return;

            // Find target blank (either focused blank or next empty blank in container)
            let targetBlank = this.activeInput;
            const allBlanks = Array.from(container.querySelectorAll('.blank-input'));
            if (!targetBlank || !container.contains(targetBlank) || targetBlank.value.trim() !== '') {
                targetBlank = allBlanks.find(inp => inp.value.trim() === '') || allBlanks[0];
            }

            if (targetBlank) {
                targetBlank.value = word;
                targetBlank.dispatchEvent(new Event('input', { bubbles: true }));
                if (window.DeckComponents?.autoResizeBlank) {
                    DeckComponents.autoResizeBlank(targetBlank);
                }
                this.updateChipStates(container);

                // Advance focus to the next available blank
                const currentIndex = allBlanks.indexOf(targetBlank);
                const nextBlank = allBlanks.slice(currentIndex + 1).find(inp => inp.value.trim() === '');
                if (nextBlank) {
                    this.activeInput = nextBlank;
                    this.activeInput.focus();
                } else {
                    this.activeInput = null;
                }
            }
        });
    }

    /**
     * Tracks focused blank inputs and updates chip used status
     */
    bindBlankInputs() {
        document.addEventListener('focusin', (e) => {
            if (e.target.classList.contains('blank-input')) {
                this.activeInput = e.target;
            }
        });

        // Double click blank to clear it and restore chip to bank
        document.addEventListener('dblclick', (e) => {
            if (e.target.classList.contains('blank-input')) {
                e.target.value = '';
                e.target.dispatchEvent(new Event('input', { bubbles: true }));
                const container = e.target.closest('.card, .q-card, .two-col, .page-content, .slide');
                if (container) {
                    this.updateChipStates(container);
                }
            }
        });

        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('blank-input')) {
                const container = e.target.closest('.card, .q-card, .two-col, .page-content, .slide');
                if (container) {
                    this.updateChipStates(container);
                }
            }
        });
    }

    /**
     * Marks chips as used/disabled if their word is currently placed in a blank
     */
    updateChipStates(container) {
        if (!container) return;
        const filledWords = Array.from(container.querySelectorAll('.blank-input'))
            .map(input => input.value.trim().toLowerCase())
            .filter(Boolean);

        container.querySelectorAll('.word-chip, .vocab-chip, [data-word]').forEach(chip => {
            const word = (chip.dataset.word || chip.textContent).trim().toLowerCase();
            const countFilled = filledWords.filter(w => w === word).length;
            if (countFilled > 0) {
                chip.classList.add('chip-used');
            } else {
                chip.classList.remove('chip-used');
            }
        });
    }

    /**
     * IELTS Multi-Accent Speech Player
     */
    bindAudioPronunciation() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.pronounce-btn, .speak-btn, [data-speak]');
            if (!btn) return;

            const textToSpeak = btn.dataset.speak || btn.parentElement.textContent.replace(/🔊|🎧|🇬🇧|🇦🇺|🇺🇸/g, '').trim();
            this.speak(textToSpeak);
        });
    }

    speak(text, customLang = null) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = customLang || this.currentAccent;
        utterance.rate = this.speechRate;

        // Try selecting a natural sounding voice if available
        const voices = window.speechSynthesis.getVoices();
        const matchingVoice = voices.find(v => v.lang === utterance.lang || v.lang.startsWith(utterance.lang.split('-')[0]));
        if (matchingVoice) utterance.voice = matchingVoice;

        window.speechSynthesis.speak(utterance);
    }

    setAccent(accent) {
        this.currentAccent = accent;
        try {
            localStorage.setItem('ielts_speech_accent', accent);
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }
    }

    injectAccentSelectorStyles() {
        if (document.getElementById('vocabBankStyles')) return;
        const style = document.createElement('style');
        style.id = 'vocabBankStyles';
        style.textContent = `
            .word-chip, .vocab-chip {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 5px 12px;
                background: #ffffff;
                border: 1.5px solid var(--border-soft, #cbd5e1);
                border-radius: 6px;
                font-family: var(--font-body, sans-serif);
                font-size: calc(15px * var(--font-scale, 1));
                font-weight: 600;
                color: var(--text-dark, #0f172a);
                cursor: pointer;
                transition: all 0.2s ease;
                user-select: none;
                margin: 3px;
            }
            .word-chip:hover, .vocab-chip:hover {
                border-color: var(--col-vocab, #16a34a);
                background: #f0fdf4;
                transform: translateY(-1px);
            }
            .word-chip.chip-used, .vocab-chip.chip-used {
                opacity: 0.45;
                text-decoration: line-through;
                background: #f1f5f9;
                cursor: default;
                transform: none;
            }
        `;
        document.head.appendChild(style);
    }
}

// Global auto-instantiation
window.vocabBank = new VocabBank();


/* ==================== MODULE: essay-analyzer.js ==================== */
/**
 * Universal Essay Analyzer & Writing Model Tools (EssayAnalyzer)
 * 
 * Provides interactive teaching features for Task 1 & Task 2 model essays:
 * 1. Cohesive Device / Linking Word Highlighter: Highlights transition connectors on demand.
 * 2. Structure Breakdown Highlighter: Colors introduction, topic sentences, supporting data, and conclusion.
 * 3. Dynamic Word Count Counter.
 */

class EssayAnalyzer {
    constructor() {
        this.linkingWordsRegex = /\b(however|furthermore|moreover|in contrast|on the other hand|consequently|therefore|as a result|for instance|for example|in addition|although|despite|in conclusion|to sum up|due to|owing to|firstly|secondly|finally|overall|in particular)\b/gi;
        this.init();
    }

    init() {
        this.bindEssayTools();
    }

    /**
     * Toggles linking word highlights inside .essay-card / .essay-pane elements
     */
    toggleConnectors(essayElement) {
        if (!essayElement) return;
        const isHighlighted = essayElement.classList.contains('highlighted-connectors');

        if (isHighlighted) {
            essayElement.classList.remove('highlighted-connectors');
            essayElement.querySelectorAll('p, .essay-p, li').forEach(p => {
                if (p.dataset.origHtml) {
                    p.innerHTML = p.dataset.origHtml;
                    delete p.dataset.origHtml;
                }
            });
        } else {
            essayElement.classList.add('highlighted-connectors');
            this.highlightConnectorsInElement(essayElement);
        }
    }

    highlightConnectorsInElement(element) {
        const paragraphs = element.querySelectorAll('p, .essay-p, li');
        paragraphs.forEach(p => {
            if (!p.dataset.origHtml) {
                p.dataset.origHtml = p.innerHTML;
            }

            const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT, null, false);
            const textNodes = [];
            let node;
            while ((node = walker.nextNode())) {
                if (node.parentElement && !node.parentElement.classList.contains('connector-mark')) {
                    textNodes.push(node);
                }
            }

            textNodes.forEach(textNode => {
                const text = textNode.nodeValue;
                if (this.linkingWordsRegex.test(text)) {
                    this.linkingWordsRegex.lastIndex = 0;
                    const span = document.createElement('span');
                    span.innerHTML = text.replace(this.linkingWordsRegex, '<mark class="connector-mark">$1</mark>');
                    textNode.parentNode.replaceChild(span, textNode);
                }
            });
        });
    }

    /**
     * Binds control buttons with [data-essay-action="connectors|structure|count"]
     */
    bindEssayTools() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-essay-action]');
            if (!btn) return;

            const action = btn.dataset.essayAction;
            const targetId = btn.dataset.target;
            const essayEl = targetId ? document.getElementById(targetId) : btn.closest('.slide, .two-col')?.querySelector('.essay-card, .model-breakdown-card');

            if (action === 'connectors' && essayEl) {
                this.toggleConnectors(essayEl);
                btn.classList.toggle('active');
            }
        });
    }
}

// Inject styling for essay connector highlighting
(function() {
    const style = document.createElement('style');
    style.id = 'essayAnalyzerStyles';
    style.textContent = `
        mark.connector-mark {
            background: rgba(254, 240, 138, 0.88) !important;
            color: inherit !important;
            border-bottom: 2px solid #ca8a04;
            padding: 1px 4px;
            border-radius: 3px;
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
        }
    `;
    document.head.appendChild(style);
})();

// Global auto-instantiation
let essayAnalyzer;
window.addEventListener('DOMContentLoaded', () => {
    essayAnalyzer = new EssayAnalyzer();
});


/* ==================== MODULE: progress-tracker.js ==================== */
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
        this.restoreResponses();
        this.bindAutoSave();
        this.renderReviewDashboard();
    }

    /**
     * Auto-saves all inputs and selects when modified
     */
    bindAutoSave() {
        document.addEventListener('change', () => this.saveResponses());
        document.addEventListener('input', () => this.saveResponses());
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
let progressTracker;
window.addEventListener('DOMContentLoaded', () => {
    progressTracker = new ProgressTracker();
});


/* ==================== MODULE: slide-navigator.js ==================== */
/**
 * Universal Slide Grid Navigator & Quick-Jump Engine (SlideNavigator)
 * 
 * Provides an interactive slide thumbnail/grid view for teachers and students:
 * 1. Press 'G' (Grid) or click the Navigator icon in the toolbar to see all slides.
 * 2. Instant search filter to jump directly to any skill, topic, or slide title.
 * 3. Quick-key jumps (e.g. typing slide number).
 */

class SlideNavigator {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createNavigatorModal();
        this.bindKeyboardShortcuts();
    }

    createNavigatorModal() {
        const modal = document.createElement('div');
        modal.id = 'slideNavigatorModal';
        modal.className = 'slide-nav-modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="slide-nav-backdrop" onclick="slideNavigator.toggle()"></div>
            <div class="slide-nav-container">
                <div class="slide-nav-header">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span style="font-size:20px; font-weight:800;">📑 Slide Navigator</span>
                        <span id="navSlideTotal" style="font-size:13px; opacity:0.6; font-family:var(--font-mono, monospace);"></span>
                    </div>
                    <input type="text" id="slideSearchInput" class="slide-search-box" placeholder="🔍 Filter by title, skill (read, grammar, vocab, write)..." oninput="slideNavigator.filterSlides(this.value)" />
                    <button class="slide-nav-close" onclick="slideNavigator.toggle()">×</button>
                </div>
                <div class="slide-nav-grid" id="slideNavGrid"></div>
            </div>
        `;
        document.body.appendChild(modal);

        // Inject Styles
        const style = document.createElement('style');
        style.id = 'slideNavigatorStyles';
        style.textContent = `
            .slide-nav-modal {
                position: fixed;
                inset: 0;
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                user-select: none;
                animation: navFadeIn 0.2s ease;
            }
            .slide-nav-backdrop {
                position: absolute;
                inset: 0;
                background: rgba(10, 15, 29, 0.85);
                backdrop-filter: blur(8px);
            }
            .slide-nav-container {
                position: relative;
                width: 90vw;
                max-width: 1300px;
                height: 85vh;
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.16);
                border-radius: 16px;
                display: flex;
                flex-direction: column;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
                overflow: hidden;
                color: #ffffff;
            }
            .slide-nav-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 24px;
                background: rgba(255, 255, 255, 0.04);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                gap: 16px;
            }
            .slide-search-box {
                flex: 1;
                max-width: 480px;
                background: rgba(255, 255, 255, 0.08);
                border: 1.5px solid rgba(255, 255, 255, 0.16);
                padding: 8px 16px;
                border-radius: 8px;
                color: #ffffff;
                font-size: 14px;
                outline: none;
            }
            .slide-search-box:focus {
                border-color: #38bdf8;
                background: rgba(255, 255, 255, 0.14);
            }
            .slide-nav-close {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 26px;
                cursor: pointer;
                line-height: 1;
            }
            .slide-nav-close:hover { color: #fff; }
            .slide-nav-grid {
                flex: 1;
                overflow-y: auto;
                padding: 24px;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                gap: 18px;
            }
            .slide-nav-card {
                background: rgba(255, 255, 255, 0.05);
                border: 1.5px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 16px;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .slide-nav-card:hover {
                background: rgba(255, 255, 255, 0.12);
                border-color: #38bdf8;
                transform: translateY(-3px);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            }
            .slide-nav-card.active-card {
                border-color: #10b981;
                background: rgba(16, 185, 129, 0.15);
            }
            .slide-nav-card-top {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .slide-nav-num {
                font-family: var(--font-mono, monospace);
                font-size: 12px;
                font-weight: 700;
                color: #94a3b8;
            }
            .slide-nav-badge {
                font-size: 11px;
                font-weight: 700;
                padding: 2px 8px;
                border-radius: 4px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .slide-nav-title {
                font-size: 15px;
                font-weight: 700;
                color: #f8fafc;
                line-height: 1.35;
            }
            @keyframes navFadeIn {
                from { opacity: 0; transform: scale(0.97); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    renderGrid() {
        const grid = document.getElementById('slideNavGrid');
        const totalSpan = document.getElementById('navSlideTotal');
        if (!grid || !window.deckEngine) return;

        const slides = window.deckEngine.slides;
        if (totalSpan) totalSpan.textContent = `(${slides.length} Slides)`;

        grid.innerHTML = '';
        slides.forEach((slide, idx) => {
            const titleEl = slide.querySelector('.slide-title, .section-title, .title-main, h1, h2');
            const titleText = titleEl ? titleEl.textContent.trim().replace(/\s+/g, ' ') : `Slide ${idx + 1}`;
            const skill = slide.dataset.skill || 'general';

            const card = document.createElement('div');
            card.className = `slide-nav-card ${idx === window.deckEngine.currentSlide ? 'active-card' : ''}`;
            card.dataset.index = idx;
            card.dataset.search = `${titleText} ${skill} slide ${idx + 1}`.toLowerCase();
            card.onclick = () => {
                window.deckEngine.showSlide(idx);
                this.toggle(false);
            };

            const skillColors = {
                read: '#2563eb',
                grammar: '#ea580c',
                vocab: '#059669',
                write: '#7c3aed',
                review: '#0891b2',
                section: '#64748b',
                title: '#3b82f6'
            };
            const badgeBg = skillColors[skill] || '#475569';

            card.innerHTML = `
                <div class="slide-nav-card-top">
                    <span class="slide-nav-num">Slide ${idx + 1}</span>
                    <span class="slide-nav-badge" style="background:${badgeBg}; color:#fff;">${skill}</span>
                </div>
                <div class="slide-nav-title">${titleText}</div>
            `;
            grid.appendChild(card);
        });
    }

    filterSlides(query) {
        const q = query.trim().toLowerCase();
        document.querySelectorAll('.slide-nav-card').forEach(card => {
            const match = !q || card.dataset.search.includes(q);
            card.style.display = match ? 'flex' : 'none';
        });
    }

    toggle(forceState) {
        this.isOpen = typeof forceState === 'boolean' ? forceState : !this.isOpen;
        const modal = document.getElementById('slideNavigatorModal');
        if (modal) {
            modal.style.display = this.isOpen ? 'flex' : 'none';
            if (this.isOpen) {
                this.renderGrid();
                const searchInput = document.getElementById('slideSearchInput');
                if (searchInput) {
                    searchInput.value = '';
                    searchInput.focus();
                }
            }
        }
    }

    bindKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' && e.target.id !== 'slideSearchInput') return;
            if (e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

            const key = e.key.toLowerCase();
            if (key === 'g') {
                e.preventDefault();
                this.toggle();
            } else if (key === 'escape' && this.isOpen) {
                this.toggle(false);
            }
        });
    }
}

// Global auto-instantiation
let slideNavigator;
window.addEventListener('DOMContentLoaded', () => {
    slideNavigator = new SlideNavigator();
});


/* ==================== MODULE: presentation-spotlight.js ==================== */
/**
 * Universal Presentation Spotlight & Screen Mute (PresentationSpotlight)
 * 
 * Provides essential classroom focus controls:
 * 1. Screen Blackout: Press 'B' (or '.' in standard presenter remotes) to turn the screen pitch black to focus student attention on the teacher.
 * 2. Screen Whiteout: Press 'W' to turn the screen white (for whiteboard projection).
 * 3. Spotlight Mode: Press 'S' to dim the slide background and highlight only the active sentence/cursor area.
 */

class PresentationSpotlight {
    constructor() {
        this.isBlackout = false;
        this.isWhiteout = false;
        this.isSpotlight = false;
        this.init();
    }

    init() {
        this.createOverlays();
        this.bindShortcuts();
    }

    createOverlays() {
        const overlay = document.createElement('div');
        overlay.id = 'screenMuteOverlay';
        overlay.className = 'screen-mute-overlay';
        overlay.style.display = 'none';
        document.body.appendChild(overlay);

        const spotlight = document.createElement('div');
        spotlight.id = 'spotlightMask';
        spotlight.className = 'spotlight-mask';
        spotlight.style.display = 'none';
        document.body.appendChild(spotlight);

        window.addEventListener('mousemove', (e) => {
            if (this.isSpotlight) {
                spotlight.style.setProperty('--cursor-x', `${e.clientX}px`);
                spotlight.style.setProperty('--cursor-y', `${e.clientY}px`);
            }
        });

        // Inject Styles
        const style = document.createElement('style');
        style.id = 'spotlightStyles';
        style.textContent = `
            .screen-mute-overlay {
                position: fixed;
                inset: 0;
                z-index: 9999999;
                transition: opacity 0.25s ease;
                cursor: pointer;
            }
            .screen-mute-overlay.blackout {
                background: #000000;
            }
            .screen-mute-overlay.whiteout {
                background: #ffffff;
            }
            .spotlight-mask {
                position: fixed;
                inset: 0;
                z-index: 99998;
                pointer-events: none;
                background: radial-gradient(circle 180px at var(--cursor-x, 50%) var(--cursor-y, 50%), transparent 0%, rgba(0, 0, 0, 0.78) 100%);
                transition: background 0.05s ease-out;
            }
        `;
        document.head.appendChild(style);
    }

    toggleBlackout() {
        this.isBlackout = !this.isBlackout;
        this.isWhiteout = false;
        const overlay = document.getElementById('screenMuteOverlay');
        if (overlay) {
            overlay.className = 'screen-mute-overlay blackout';
            overlay.style.display = this.isBlackout ? 'block' : 'none';
        }
    }

    toggleWhiteout() {
        this.isWhiteout = !this.isWhiteout;
        this.isBlackout = false;
        const overlay = document.getElementById('screenMuteOverlay');
        if (overlay) {
            overlay.className = 'screen-mute-overlay whiteout';
            overlay.style.display = this.isWhiteout ? 'block' : 'none';
        }
    }

    toggleSpotlight() {
        this.isSpotlight = !this.isSpotlight;
        const mask = document.getElementById('spotlightMask');
        if (mask) {
            mask.style.display = this.isSpotlight ? 'block' : 'none';
        }
    }

    clearMute() {
        this.isBlackout = false;
        this.isWhiteout = false;
        const overlay = document.getElementById('screenMuteOverlay');
        if (overlay) overlay.style.display = 'none';
    }

    bindShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

            const key = e.key.toLowerCase();
            if (key === 'b' || key === '.') {
                e.preventDefault();
                this.toggleBlackout();
            } else if (key === 'w') {
                e.preventDefault();
                this.toggleWhiteout();
            } else if (key === 's') {
                e.preventDefault();
                this.toggleSpotlight();
            } else if (this.isBlackout || this.isWhiteout) {
                this.clearMute();
            }
        });

        document.getElementById('screenMuteOverlay')?.addEventListener('click', () => {
            this.clearMute();
        });
    }
}

// Global auto-instantiation
let presentationSpotlight;
window.addEventListener('DOMContentLoaded', () => {
    presentationSpotlight = new PresentationSpotlight();
});


/* ==================== MODULE: flashcard-engine.js ==================== */
/**
 * Universal Flashcard & 3D Flip Card Engine (FlashcardEngine)
 * 
 * Automatically enables interactive 3D flipping for any .flashcard element:
 * <div class="flashcard">
 *     <div class="card-front">Word / Concept</div>
 *     <div class="card-back">Definition & Collocations</div>
 * </div>
 */

class FlashcardEngine {
    constructor() {
        this.init();
    }

    init() {
        this.injectStyles();
        this.bindFlipHandlers();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.id = 'flashcardStyles';
        style.textContent = `
            .flashcard {
                perspective: 1000px;
                cursor: pointer;
                user-select: none;
                min-height: 140px;
            }
            .flashcard-inner {
                position: relative;
                width: 100%;
                height: 100%;
                text-align: center;
                transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                transform-style: preserve-3d;
            }
            .flashcard.flipped .flashcard-inner {
                transform: rotateY(180deg);
            }
            .card-front, .card-back {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
                border-radius: 12px;
                padding: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                box-shadow: 0 4px 12px rgba(0,0,0,0.06);
            }
            .card-front {
                background: #ffffff;
                border: 1.5px solid var(--border-soft, #cbd5e1);
                color: var(--text-dark, #0f172a);
            }
            .card-back {
                background: #f8fafc;
                border: 1.5px solid var(--col-vocab, #059669);
                color: var(--text-body, #1e293b);
                transform: rotateY(180deg);
            }
        `;
        document.head.appendChild(style);
    }

    bindFlipHandlers() {
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.flashcard, [data-flip]');
            if (!card) return;

            // Ensure inner wrapper exists
            if (!card.querySelector('.flashcard-inner')) {
                const front = card.querySelector('.card-front') || card.children[0];
                const back = card.querySelector('.card-back') || card.children[1];
                if (front && back) {
                    const inner = document.createElement('div');
                    inner.className = 'flashcard-inner';
                    inner.appendChild(front);
                    inner.appendChild(back);
                    card.appendChild(inner);
                }
            }

            card.classList.toggle('flipped');
        });
    }
}

// Global auto-instantiation
let flashcardEngine;
window.addEventListener('DOMContentLoaded', () => {
    flashcardEngine = new FlashcardEngine();
});


/* ==================== MODULE: print-optimizer.js ==================== */
/**
 * Universal Print & PDF Handout Optimizer (PrintOptimizer)
 * 
 * Automatically reconfigures the fixed 16:9 stage layout into sequential
 * multi-page printable handouts when the teacher or student presses Ctrl+P (Print).
 */

class PrintOptimizer {
    constructor() {
        this.init();
    }

    init() {
        const style = document.createElement('style');
        style.id = 'printOptimizerStyles';
        style.textContent = `
            @media print {
                html, body {
                    width: 100% !important;
                    height: auto !important;
                    overflow: visible !important;
                    background: #ffffff !important;
                    font-size: 12pt !important;
                }
                .deck-viewport, .deck-stage {
                    position: static !important;
                    width: 100% !important;
                    height: auto !important;
                    transform: none !important;
                    background: transparent !important;
                    overflow: visible !important;
                }
                .slide {
                    position: relative !important;
                    width: 100% !important;
                    height: auto !important;
                    min-height: 90vh !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    page-break-after: always !important;
                    break-after: page !important;
                    margin-bottom: 2cm !important;
                }
                .presentation-tools-hud,
                .font-controls,
                .font-indicator,
                .nav-hint,
                #slideCounter,
                .notebook-tabs,
                #spotlightMask,
                .screen-mute-overlay,
                .slide-nav-modal {
                    display: none !important;
                }
                .notebook, .title-notebook, .section-inner {
                    width: 100% !important;
                    height: auto !important;
                    box-shadow: none !important;
                    border: 1px solid #cbd5e1 !important;
                }
                .reading-pane, .question-pane, .col, .essay-card {
                    overflow: visible !important;
                    max-height: none !important;
                    height: auto !important;
                }
                .item-explanation {
                    display: block !important;
                    opacity: 1 !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Global auto-instantiation
let printOptimizer;
window.addEventListener('DOMContentLoaded', () => {
    printOptimizer = new PrintOptimizer();
});


/* ==================== MODULE: laser-pointer.js ==================== */
/**
 * Laser Pointer Module (LaserPointer)
 * Provides a high-visibility glowing red laser dot that follows mouse movement.
 * Toggle shortcut: 'L'
 */

class LaserPointer {
    constructor() {
        this.isActive = false;
        this.dot = null;
        this.init();
    }

    init() {
        // Inject styles if not present
        if (!document.getElementById('laserPointerStyles')) {
            const style = document.createElement('style');
            style.id = 'laserPointerStyles';
            style.textContent = `
                #laserPointerDot {
                    position: fixed;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #ef4444;
                    box-shadow: 0 0 16px 4px #ef4444, 0 0 2px 2px #fff;
                    pointer-events: none;
                    z-index: 99999;
                    transform: translate(-50%, -50%);
                    display: none;
                    transition: transform 0.05s ease-out;
                }
            `;
            document.head.appendChild(style);
        }

        // Create dot element
        const dot = document.createElement('div');
        dot.id = 'laserPointerDot';
        document.body.appendChild(dot);
        this.dot = dot;

        // Mouse tracking
        window.addEventListener('mousemove', (e) => {
            if (this.isActive && this.dot) {
                this.dot.style.left = `${e.clientX}px`;
                this.dot.style.top = `${e.clientY}px`;
            }
        });
    }

    toggle() {
        this.isActive ? this.deactivate() : this.activate();
    }

    activate() {
        this.isActive = true;
        if (this.dot) this.dot.style.display = 'block';

        // Update button UI
        const btn = document.getElementById('toolLaserBtn');
        if (btn) btn.classList.add('active');

        // Mutually exclusive with pen annotation
        if (window.penAnnotation && window.penAnnotation.isActive) {
            window.penAnnotation.deactivate();
        }
    }

    deactivate() {
        this.isActive = false;
        if (this.dot) this.dot.style.display = 'none';

        // Update button UI
        const btn = document.getElementById('toolLaserBtn');
        if (btn) btn.classList.remove('active');
    }
}

// Global auto-instantiation
let laserPointer;
window.addEventListener('DOMContentLoaded', () => {
    laserPointer = new LaserPointer();
    window.laserPointer = laserPointer;
});


/* ==================== MODULE: pen-annotation.js ==================== */
/**
 * Pen Annotation Module (PenAnnotation)
 * Provides an on-slide transparent drawing and sketch canvas.
 * Shortcuts: 'P' to toggle pen, 'C' to clear drawings.
 */

class PenAnnotation {
    constructor() {
        this.isActive = false;
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        // Inject styles if not present
        if (!document.getElementById('penAnnotationStyles')) {
            const style = document.createElement('style');
            style.id = 'penAnnotationStyles';
            style.textContent = `
                #annotationCanvas {
                    position: fixed;
                    inset: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 9990;
                    pointer-events: none;
                    cursor: crosshair;
                }
                #annotationCanvas.active {
                    pointer-events: auto;
                }
            `;
            document.head.appendChild(style);
        }

        const canvas = document.createElement('canvas');
        canvas.id = 'annotationCanvas';
        document.body.appendChild(canvas);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        canvas.addEventListener('mousedown', (e) => {
            if (!this.isActive) return;
            isDrawing = true;
            [lastX, lastY] = [e.clientX, e.clientY];
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing || !this.isActive) return;
            this.ctx.beginPath();
            this.ctx.moveTo(lastX, lastY);
            this.ctx.lineTo(e.clientX, e.clientY);
            this.ctx.strokeStyle = '#ef4444';
            this.ctx.lineWidth = 3.5;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.stroke();
            [lastX, lastY] = [e.clientX, e.clientY];
        });

        window.addEventListener('mouseup', () => { isDrawing = false; });
    }

    toggle() {
        this.isActive ? this.deactivate() : this.activate();
    }

    activate() {
        this.isActive = true;
        if (this.canvas) this.canvas.classList.add('active');

        const btn = document.getElementById('toolPenBtn');
        if (btn) btn.classList.add('active');

        // Mutually exclusive with laser pointer
        if (window.laserPointer && window.laserPointer.isActive) {
            window.laserPointer.deactivate();
        }
    }

    deactivate() {
        this.isActive = false;
        if (this.canvas) this.canvas.classList.remove('active');

        const btn = document.getElementById('toolPenBtn');
        if (btn) btn.classList.remove('active');
    }

    clear() {
        if (this.canvas && this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

// Global auto-instantiation
let penAnnotation;
window.addEventListener('DOMContentLoaded', () => {
    penAnnotation = new PenAnnotation();
    window.penAnnotation = penAnnotation;
});


/* ==================== MODULE: classroom-timer.js ==================== */
/**
 * Classroom Timer Module (ClassroomTimer)
 * Provides an interactive countdown timer and stopwatch with audio alert chimes.
 * Toggle shortcut: 'T'
 */

class ClassroomTimer {
    constructor() {
        this.timerInterval = null;
        this.timerSeconds = 0;
        this.timerRunning = false;
        this.modal = null;
        this.init();
    }

    init() {
        // Inject styles if not present
        if (!document.getElementById('classroomTimerStyles')) {
            const style = document.createElement('style');
            style.id = 'classroomTimerStyles';
            style.textContent = `
                .timer-modal {
                    position: absolute;
                    top: 50px;
                    right: 0;
                    width: 280px;
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(14px);
                    border: 1px solid rgba(255, 255, 255, 0.16);
                    border-radius: 14px;
                    padding: 16px;
                    color: #ffffff;
                    box-shadow: 0 14px 35px rgba(0, 0, 0, 0.5);
                    animation: timerFadeIn 0.2s ease;
                    z-index: 10001;
                }
                .timer-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-weight: 700;
                    font-size: 14px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding-bottom: 8px;
                    margin-bottom: 12px;
                }
                .timer-modal-close {
                    background: transparent;
                    border: none;
                    color: #94a3b8;
                    font-size: 18px;
                    cursor: pointer;
                    line-height: 1;
                }
                .timer-modal-close:hover { color: #ffffff; }
                .timer-display {
                    font-family: 'JetBrains Mono', monospace, monospace;
                    font-size: 38px;
                    font-weight: 800;
                    text-align: center;
                    letter-spacing: 2px;
                    color: #38bdf8;
                    margin: 8px 0 14px 0;
                }
                .timer-display.ended {
                    color: #ef4444;
                    animation: timerPulseAlert 0.6s infinite alternate;
                }
                .timer-presets {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 5px;
                    margin-bottom: 12px;
                }
                .timer-preset-btn {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    color: #cbd5e1;
                    padding: 5px 0;
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.15s;
                }
                .timer-preset-btn:hover { background: rgba(255, 255, 255, 0.2); color: #fff; }
                .timer-actions {
                    display: flex;
                    gap: 8px;
                }
                .timer-action-btn {
                    flex: 1;
                    background: rgba(255, 255, 255, 0.12);
                    border: none;
                    color: #fff;
                    padding: 7px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                }
                .timer-action-btn.start-btn {
                    background: #10b981;
                }
                .timer-action-btn.start-btn.running {
                    background: #f59e0b;
                }
                @keyframes timerFadeIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes timerPulseAlert {
                    from { transform: scale(1); }
                    to { transform: scale(1.08); }
                }
            `;
            document.head.appendChild(style);
        }

        this.initModal();
    }

    initModal() {
        const hud = document.getElementById('presentationToolsHUD') || document.body;
        
        const modal = document.createElement('div');
        modal.className = 'timer-modal';
        modal.id = 'timerModal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="timer-modal-header">
                <span>⏱️ Classroom Timer</span>
                <button class="timer-modal-close" onclick="classroomTimer.toggleModal()">×</button>
            </div>
            <div class="timer-display" id="timerDisplay">00:00</div>
            <div class="timer-presets">
                <button class="timer-preset-btn" onclick="classroomTimer.setTimer(60)">1 min</button>
                <button class="timer-preset-btn" onclick="classroomTimer.setTimer(120)">2 min</button>
                <button class="timer-preset-btn" onclick="classroomTimer.setTimer(300)">5 min</button>
                <button class="timer-preset-btn" onclick="classroomTimer.setTimer(600)">10 min</button>
            </div>
            <div class="timer-actions">
                <button class="timer-action-btn start-btn" id="timerStartBtn" onclick="classroomTimer.toggleRun()">Start</button>
                <button class="timer-action-btn" onclick="classroomTimer.reset()">Reset</button>
            </div>
        `;
        hud.appendChild(modal);
        this.modal = modal;
    }

    toggleModal() {
        if (!this.modal) {
            this.modal = document.getElementById('timerModal');
        }
        if (this.modal) {
            this.modal.style.display = this.modal.style.display === 'none' ? 'block' : 'none';
        }
    }

    setTimer(seconds) {
        this.timerSeconds = seconds;
        this.updateDisplay();
    }

    updateDisplay() {
        const display = document.getElementById('timerDisplay');
        if (!display) return;
        const mins = Math.floor(this.timerSeconds / 60);
        const secs = this.timerSeconds % 60;
        display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        display.classList.remove('ended');
    }

    toggleRun() {
        const startBtn = document.getElementById('timerStartBtn');
        if (this.timerRunning) {
            clearInterval(this.timerInterval);
            this.timerRunning = false;
            if (startBtn) {
                startBtn.textContent = 'Resume';
                startBtn.classList.remove('running');
            }
        } else {
            if (this.timerSeconds <= 0) this.timerSeconds = 120;
            this.timerRunning = true;
            if (startBtn) {
                startBtn.textContent = 'Pause';
                startBtn.classList.add('running');
            }
            this.timerInterval = setInterval(() => {
                if (this.timerSeconds > 0) {
                    this.timerSeconds--;
                    this.updateDisplay();
                } else {
                    clearInterval(this.timerInterval);
                    this.timerRunning = false;
                    const display = document.getElementById('timerDisplay');
                    if (display) display.classList.add('ended');
                    if (startBtn) {
                        startBtn.textContent = 'Start';
                        startBtn.classList.remove('running');
                    }
                    this.playChime();
                }
            }, 1000);
        }
    }

    reset() {
        clearInterval(this.timerInterval);
        this.timerRunning = false;
        this.timerSeconds = 0;
        this.updateDisplay();
        const startBtn = document.getElementById('timerStartBtn');
        if (startBtn) {
            startBtn.textContent = 'Start';
            startBtn.classList.remove('running');
        }
    }

    playChime() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
            osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
            osc.start();
            osc.stop(ctx.currentTime + 0.8);
        } catch (e) {
            // AudioContext not permitted without user interaction
        }
    }
}

// Global auto-instantiation
let classroomTimer;
window.addEventListener('DOMContentLoaded', () => {
    classroomTimer = new ClassroomTimer();
    window.classroomTimer = classroomTimer;
});


/* ==================== MODULE: presentation-tools.js ==================== */
/**
 * Presentation Classroom Tools Coordinator (PresentationTools)
 * Coordinates toolbar HUD, shortcuts dispatch, and presentation utilities:
 * - 🎛️ Floating Teacher Tools HUD Bar with Collapse / Hide Toggle
 * - 📐 Aspect Ratio Switching ('Shift+A')
 * - ⛶ Fullscreen Toggle ('F')
 * - ❓ Help / Keybindings Overlay ('?')
 * - ⌨️ Global Keyboard Shortcut Dispatcher
 */

class PresentationTools {
    constructor(deckEngine) {
        this.deckEngine = deckEngine;
        this.isCollapsed = localStorage.getItem('deck_tools_collapsed') === 'true';
        this.initUI();
        this.initKeyboardShortcuts();
        if (this.isCollapsed) {
            this.collapseHUD(false);
        }
    }

    /**
     * Initializes the floating toolbar, collapsed trigger, and help modal
     */
    initUI() {
        // Create container
        const toolContainer = document.createElement('div');
        toolContainer.id = 'presentationToolsHUD';
        toolContainer.className = 'presentation-tools-hud';
        toolContainer.innerHTML = `
            <!-- Collapsed Mini Trigger Pill -->
            <button class="tools-collapsed-trigger" id="toolsCollapsedTrigger" title="Show Teacher Toolkit (Shift+X)" onclick="presentationTools.toggleHUD()">
                🛠️ <span class="collapsed-badge">Tools</span>
            </button>

            <!-- Expanded Tools Bar -->
            <div class="tools-bar" id="toolsBar">
                <button class="tool-btn" id="toolAspectBtn" title="Switch Aspect Ratio (16:9 / 4:3) (Shift+A)" onclick="window.deckEngine && window.deckEngine.toggleAspectRatio()"><span class="tool-icon">📐</span><span class="tool-label">16:9</span></button>
                <button class="tool-btn" id="toolThemeBtn" title="Theme Aesthetics (Shift+T)" onclick="window.deckThemeEngine && window.deckThemeEngine.openModal()"><span class="tool-icon">🎨</span><span class="tool-label">Theme</span></button>
                <button class="tool-btn" id="toolHighlightBtn" title="Teacher Highlighter (H)" onclick="window.teacherHighlighter && window.teacherHighlighter.toggle()"><span class="tool-icon">🖍️</span><span class="tool-label">Highlight</span></button>
                <button class="tool-btn" id="toolTimerBtn" title="Classroom Timer (T)" onclick="presentationTools.toggleTimerModal()"><span class="tool-icon">⏱️</span><span class="tool-label">Timer</span></button>
                <button class="tool-btn" id="toolStudentBtn" title="Random Student Selector (R)" onclick="window.studentPicker && window.studentPicker.toggle()"><span class="tool-icon">🎲</span><span class="tool-label">Picker</span></button>
                <button class="tool-btn" id="toolNotesBtn" title="Teacher Presenter Notes (N)" onclick="window.presenterNotesEngine && window.presenterNotesEngine.toggle()"><span class="tool-icon">📝</span><span class="tool-label">Notes</span></button>
                <button class="tool-btn" id="toolLaserBtn" title="Laser Pointer (L)" onclick="presentationTools.toggleLaser()"><span class="tool-icon">🔴</span><span class="tool-label">Laser</span></button>
                <button class="tool-btn" id="toolPenBtn" title="Draw / Annotate (P)" onclick="presentationTools.togglePen()"><span class="tool-icon">✏️</span><span class="tool-label">Draw</span></button>
                <button class="tool-btn" id="toolFullscreenBtn" title="Fullscreen (F)" onclick="presentationTools.toggleFullscreen()"><span class="tool-icon">⛶</span><span class="tool-label">Fullscreen</span></button>
                <button class="tool-btn" id="toolHelpBtn" title="Keyboard Shortcuts (?)" onclick="presentationTools.toggleHelpModal()"><span class="tool-icon">❓</span><span class="tool-label">Help</span></button>
                <button class="tool-btn tool-collapse-btn" id="toolCollapseBtn" title="Hide Toolkit (Shift+X)" onclick="presentationTools.toggleHUD()"><span class="tool-icon">✕</span><span class="tool-label">Hide</span></button>
            </div>

            <!-- Highlighter Palette -->
            <div class="highlighter-palette" id="highlighterPalette" style="display:none;">
                <button class="highlighter-color-btn active" style="background:#facc15;" onclick="teacherHighlighter && teacherHighlighter.setColor(0)" title="Fluorescent Yellow"></button>
                <button class="highlighter-color-btn" style="background:#4ade80;" onclick="teacherHighlighter && teacherHighlighter.setColor(1)" title="Neon Green"></button>
                <button class="highlighter-color-btn" style="background:#38bdf8;" onclick="teacherHighlighter && teacherHighlighter.setColor(2)" title="Sky Cyan"></button>
                <button class="highlighter-color-btn" style="background:#f472b6;" onclick="teacherHighlighter && teacherHighlighter.setColor(3)" title="Coral Pink"></button>
                <div class="highlighter-divider"></div>
                <button class="highlighter-tool-btn" onclick="teacherHighlighter && teacherHighlighter.undo()" title="Undo Last Stroke (Ctrl+Z)">↩️ Undo</button>
                <button class="highlighter-tool-btn" onclick="teacherHighlighter && teacherHighlighter.clear()" title="Clear All Highlights (C)">🗑️ Clear</button>
            </div>

            <!-- Help Modal -->
            <div class="tool-modal help-modal" id="helpModal" style="display:none;">
                <div class="tool-modal-header">
                    <span>⌨️ Presentation Shortcuts</span>
                    <button class="modal-close" onclick="presentationTools.toggleHelpModal()">×</button>
                </div>
                <div class="help-grid">
                    <div><kbd>→</kbd> / <kbd>Space</kbd></div><div>Next Slide</div>
                    <div><kbd>←</kbd></div><div>Previous Slide</div>
                    <div><kbd>G</kbd></div><div>Slide Grid Navigator</div>
                    <div><kbd>Shift+X</kbd></div><div>Hide / Show Teacher Toolkit</div>
                    <div><kbd>Shift+A</kbd></div><div>Toggle 16:9 / 4:3 Aspect Ratio</div>
                    <div><kbd>H</kbd></div><div>Toggle Highlighter Tool</div>
                    <div><kbd>L</kbd></div><div>Toggle Laser Pointer</div>
                    <div><kbd>P</kbd></div><div>Toggle Drawing Pen</div>
                    <div><kbd>C</kbd></div><div>Clear Highlights / Drawings</div>
                    <div><kbd>Shift+T</kbd></div><div>Cycle Theme Presets</div>
                    <div><kbd>B</kbd> / <kbd>W</kbd></div><div>Blackout / Whiteout Screen</div>
                    <div><kbd>S</kbd></div><div>Spotlight Dimmer</div>
                    <div><kbd>T</kbd></div><div>Toggle Classroom Timer</div>
                    <div><kbd>R</kbd></div><div>Student Picker Wheel</div>
                    <div><kbd>N</kbd></div><div>Teacher Presenter Notes</div>
                    <div><kbd>Z</kbd></div><div>Paragraph Loupe</div>
                    <div><kbd>E</kbd></div><div>Step Reveal Answers</div>
                    <div><kbd>F</kbd></div><div>Toggle Fullscreen Mode</div>
                    <div><kbd>?</kbd></div><div>Toggle Shortcuts Cheatsheet</div>
                </div>
            </div>
        `;
        document.body.appendChild(toolContainer);

        // Inject Styles for Tools HUD
        const style = document.createElement('style');
        style.id = 'presentationToolsStyles';
        style.textContent = `
            .presentation-tools-hud {
                position: fixed;
                top: 16px;
                right: 20px;
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                user-select: none;
            }
            .tools-bar {
                display: flex;
                align-items: center;
                gap: 4px;
                background: rgba(15, 23, 42, 0.88);
                backdrop-filter: blur(12px);
                padding: 4px 6px;
                border-radius: 30px;
                border: 1px solid rgba(255, 255, 255, 0.16);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
                transition: opacity 0.25s ease, transform 0.25s ease;
            }
            .tool-btn {
                background: transparent;
                border: none;
                color: #e2e8f0;
                padding: 6px 8px;
                border-radius: 20px;
                font-size: 13.5px;
                font-weight: 600;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
                white-space: nowrap;
                position: relative;
            }
            .tool-btn:hover {
                background: rgba(255, 255, 255, 0.18);
                color: #ffffff;
                padding: 6px 12px;
            }
            .tool-btn.active {
                background: #3b82f6;
                color: #ffffff;
                box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
                padding: 6px 12px;
            }
            .tool-icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
            }
            .tool-label {
                max-width: 0;
                opacity: 0;
                overflow: hidden;
                white-space: nowrap;
                font-size: 12px;
                font-weight: 600;
                transition: max-width 0.24s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.18s ease, margin 0.18s ease;
                margin-left: 0;
                pointer-events: none;
            }
            .tool-btn:hover .tool-label,
            .tool-btn.active .tool-label {
                max-width: 85px;
                opacity: 1;
                margin-left: 5px;
            }
            .tool-collapse-btn {
                padding: 6px 8px;
                font-size: 12px;
                color: #94a3b8;
            }
            .tool-collapse-btn:hover {
                color: #ef4444;
                background: rgba(239, 68, 68, 0.15);
            }

            /* Collapsed Trigger Pill */
            .tools-collapsed-trigger {
                display: none;
                align-items: center;
                gap: 6px;
                background: rgba(15, 23, 42, 0.75);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.18);
                color: #e2e8f0;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
                transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
                opacity: 0.65;
            }
            .tools-collapsed-trigger:hover {
                opacity: 1;
                background: rgba(15, 23, 42, 0.95);
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
                color: #ffffff;
            }
            .collapsed-badge {
                font-size: 11px;
                letter-spacing: 0.5px;
            }

            /* Collapsed State Overrides */
            .presentation-tools-hud.collapsed .tools-bar {
                display: none;
            }
            .presentation-tools-hud.collapsed .tools-collapsed-trigger {
                display: flex;
            }
            .presentation-tools-hud.collapsed .tool-modal {
                display: none !important;
            }
            .presentation-tools-hud.collapsed .highlighter-palette {
                display: none !important;
            }

            /* Tool Modals */
            .tool-modal {
                position: absolute;
                top: 50px;
                right: 0;
                width: 280px;
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(14px);
                border: 1px solid rgba(255, 255, 255, 0.16);
                border-radius: 14px;
                padding: 16px;
                color: #ffffff;
                box-shadow: 0 14px 35px rgba(0, 0, 0, 0.5);
                animation: toolFadeIn 0.2s ease;
            }
            .tool-modal.help-modal {
                width: 360px;
            }
            .tool-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: 700;
                font-size: 14px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding-bottom: 8px;
                margin-bottom: 12px;
            }
            .modal-close {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 18px;
                cursor: pointer;
                line-height: 1;
            }
            .modal-close:hover { color: #ffffff; }

            /* Help Grid */
            .help-grid {
                display: grid;
                grid-template-columns: auto 1fr;
                row-gap: 8px;
                column-gap: 14px;
                font-size: 12.5px;
                color: #cbd5e1;
                align-items: center;
            }
            .help-grid kbd {
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.25);
                border-radius: 4px;
                padding: 2px 6px;
                font-family: inherit;
                font-size: 11px;
                color: #ffffff;
            }

            @keyframes toolFadeIn {
                from { opacity: 0; transform: translateY(-8px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Hide / Show HUD methods
     */
    toggleHUD() {
        this.isCollapsed ? this.expandHUD() : this.collapseHUD();
    }

    collapseHUD(showToast = true) {
        this.isCollapsed = true;
        const hud = document.getElementById('presentationToolsHUD');
        if (hud) hud.classList.add('collapsed');
        localStorage.setItem('deck_tools_collapsed', 'true');
        if (showToast && window.deckEngine && typeof window.deckEngine.showToastNotification === 'function') {
            window.deckEngine.showToastNotification('Teacher Toolkit Hidden (Shift+X to show)');
        }
    }

    expandHUD(showToast = true) {
        this.isCollapsed = false;
        const hud = document.getElementById('presentationToolsHUD');
        if (hud) hud.classList.remove('collapsed');
        localStorage.setItem('deck_tools_collapsed', 'false');
        if (showToast && window.deckEngine && typeof window.deckEngine.showToastNotification === 'function') {
            window.deckEngine.showToastNotification('Teacher Toolkit Visible');
        }
    }

    /**
     * Laser pointer delegation
     */
    toggleLaser() {
        if (window.laserPointer) {
            window.laserPointer.toggle();
        }
    }

    /**
     * Pen drawing delegation
     */
    togglePen() {
        if (window.penAnnotation) {
            window.penAnnotation.toggle();
        }
    }

    clearCanvas() {
        if (window.penAnnotation) {
            window.penAnnotation.clear();
        }
    }

    /**
     * Timer delegation
     */
    toggleTimerModal() {
        if (window.classroomTimer) {
            window.classroomTimer.toggleModal();
        }
    }

    setTimer(seconds) {
        if (window.classroomTimer) {
            window.classroomTimer.setTimer(seconds);
        }
    }

    toggleTimerRun() {
        if (window.classroomTimer) {
            window.classroomTimer.toggleRun();
        }
    }

    resetTimer() {
        if (window.classroomTimer) {
            window.classroomTimer.reset();
        }
    }

    /**
     * Fullscreen Mode
     */
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.warn(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    /**
     * Help Modal
     */
    toggleHelpModal() {
        const modal = document.getElementById('helpModal');
        if (modal) {
            modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
        }
    }

    /**
     * Global Keyboard Shortcuts Dispatcher
     */
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            const key = e.key.toLowerCase();
            if (e.shiftKey && key === 'x') {
                e.preventDefault();
                this.toggleHUD();
            } else if (e.shiftKey && key === 'a') {
                e.preventDefault();
                if (window.deckEngine) window.deckEngine.toggleAspectRatio();
            } else if (key === 'l') {
                e.preventDefault();
                this.toggleLaser();
            } else if (key === 'p') {
                e.preventDefault();
                this.togglePen();
            } else if (key === 'c') {
                e.preventDefault();
                this.clearCanvas();
                if (window.teacherHighlighter) window.teacherHighlighter.clear();
            } else if (key === 't') {
                e.preventDefault();
                this.toggleTimerModal();
            } else if (key === 'f') {
                e.preventDefault();
                this.toggleFullscreen();
            } else if (key === '?' || (e.shiftKey && e.key === '/')) {
                e.preventDefault();
                this.toggleHelpModal();
            } else if (key === 'escape') {
                const timerModal = document.getElementById('timerModal');
                const helpModal = document.getElementById('helpModal');
                if (timerModal) timerModal.style.display = 'none';
                if (helpModal) helpModal.style.display = 'none';
                if (window.penAnnotation && window.penAnnotation.isActive) window.penAnnotation.deactivate();
                if (window.laserPointer && window.laserPointer.isActive) window.laserPointer.deactivate();
            }
        });
    }
}

// Global auto-instantiation
let presentationTools;
window.addEventListener('DOMContentLoaded', () => {
    presentationTools = new PresentationTools(window.deckEngine);
    window.presentationTools = presentationTools;
});

