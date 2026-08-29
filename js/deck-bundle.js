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
        
        // Auto-adjust content scale to fit slide height perfectly
        this.autoFitSlide(this.slides[index]);

        window.dispatchEvent(new CustomEvent('slidechanged', {
            detail: { index, slide: this.slides[index] }
        }));
    }

    /**
     * Universal Content Auto-Fitter
     * Automatically adjusts font-scaling and vertical dimensions so long content fits without clipping
     */
    autoFitSlide(slide) {
        if (!slide) return;
        const notebook = slide.querySelector('.notebook, .title-notebook');
        const pageContent = slide.querySelector('.page-content, .title-notebook');
        if (!notebook || !pageContent) return;

        // Reset previous transforms
        pageContent.style.removeProperty('transform');
        pageContent.style.removeProperty('transform-origin');
        pageContent.style.removeProperty('height');

        requestAnimationFrame(() => {
            const availableHeight = notebook.clientHeight;
            const scrollH = pageContent.scrollHeight;

            if (scrollH > availableHeight + 6) {
                const fitRatio = Math.max(0.68, (availableHeight - 12) / scrollH);
                pageContent.style.transform = `scale(${fitRatio.toFixed(3)})`;
                pageContent.style.transformOrigin = 'top center';
                pageContent.style.height = `${(availableHeight / fitRatio).toFixed(1)}px`;
            }
        });
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
        const slideContext = container.closest('.slide') || document.querySelector('.slide.active') || document;
        slideContext.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.add('active-syn'));
        slideContext.querySelectorAll('.vocab-word, .vocab-term').forEach(v => v.classList.add('active-vocab'));
        slideContext.querySelectorAll('mark.evidence').forEach(m => m.classList.add('highlighted'));
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
        const slideContext = container.closest('.slide') || document.querySelector('.slide.active') || document;
        slideContext.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.remove('active-syn'));
        slideContext.querySelectorAll('.vocab-word, .vocab-term').forEach(v => v.classList.remove('active-vocab'));
        slideContext.querySelectorAll('mark.evidence').forEach(m => m.classList.remove('highlighted', 'glow-pulse'));
        slideContext.querySelectorAll('.card, .q-card').forEach(c => c.classList.remove('revealed'));
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

        if (qKey || evId) {
            const selector = [
                qKey ? `.q-card[data-q="${qKey}"]` : null,
                qKey ? `.flowchart-step-card[data-q="${qKey}"]` : null,
                evId ? `.q-card[data-ev="${evId}"]` : null,
                evId ? `.flowchart-step-card[data-ev="${evId}"]` : null
            ].filter(Boolean).join(', ');

            if (selector) {
                document.querySelectorAll(selector).forEach(card => {
                    const exp = card.querySelector('.item-explanation');
                    if (exp) exp.classList.toggle('show', !isCurrentlyActive);
                });
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


/* ==================== MODULE: image-viewer.js ==================== */
/**
 * Expert IELTS Presentations — Interactive Visual Reference & Pan/Zoom Lightbox Engine
 * Provides full mouse drag, touch pan, pinch-to-zoom, wheel zoom, and keyboard controls.
 * Auto-injects modal and styles if not present in the deck.
 */

(function () {
  'use strict';

  let currentZoom = 1;
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 4.0;
  const ZOOM_STEP = 0.25;

  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  // Touch tracking for pinch-to-zoom
  let initialPinchDistance = null;
  let initialPinchZoom = 1;

  function ensureModalStructure() {
    if (document.getElementById('imageZoomModal')) return;

    const modal = document.createElement('div');
    modal.id = 'imageZoomModal';
    modal.className = 'fixed inset-0 z-[999999] hidden items-center justify-center bg-slate-950/90 backdrop-blur-md p-4';
    modal.style.display = 'none';
    modal.innerHTML = `
      <!-- Toolbar Header -->
      <div class="absolute top-4 right-4 z-50 flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-full px-3 py-1.5 shadow-2xl backdrop-blur-sm">
        <span id="zoomLevelText" class="text-xs font-mono font-bold text-sky-400 px-2 min-w-[50px] text-center select-none">100%</span>
        <div class="h-4 w-[1px] bg-slate-700"></div>
        <button type="button" onclick="zoomIn()" class="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition" title="Zoom In (+)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        </button>
        <button type="button" onclick="zoomOut()" class="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition" title="Zoom Out (-)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
        </button>
        <button type="button" onclick="resetZoom()" class="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition" title="Reset Zoom (0)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.03 8.03 0 01-15.357-2m15.357 2H15"/></svg>
        </button>
        <div class="h-4 w-[1px] bg-slate-700"></div>
        <button type="button" onclick="closeImageModal()" class="p-1.5 text-rose-400 hover:text-rose-300 rounded-full hover:bg-rose-950/40 transition" title="Close (Esc)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Hint bottom -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-[11px] text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800 pointer-events-none select-none">
        Scroll / Pinch to zoom • Drag to pan • Double click to toggle
      </div>

      <!-- Viewport & Image Canvas -->
      <div id="modalViewport" class="relative w-full h-full flex items-center justify-center overflow-hidden cursor-zoom-in">
        <img id="modalZoomImg" src="" alt="Zoomable Reference" class="max-w-[90%] max-h-[85vh] object-contain select-none transition-transform shadow-2xl rounded-lg" draggable="false" />
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeImageModal();
    });
  }

  function getModalElements() {
    ensureModalStructure();
    return {
      modal: document.getElementById('imageZoomModal'),
      viewport: document.getElementById('modalViewport'),
      img: document.getElementById('modalZoomImg'),
      zoomText: document.getElementById('zoomLevelText'),
      originalImg: document.getElementById('grammar-reference-img') || document.querySelector('.visual-reference-img, .chart-container img, [data-zoomable="true"]')
    };
  }

  function updateTransform(withAnimation = false) {
    const { img, zoomText, viewport } = getModalElements();
    if (!img) return;

    img.style.transition = withAnimation ? 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)' : 'none';
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;

    if (zoomText) {
      zoomText.textContent = `${Math.round(currentZoom * 100)}%`;
    }

    if (viewport) {
      if (isDragging) {
        viewport.style.cursor = 'grabbing';
        if (img) img.style.cursor = 'grabbing';
      } else if (currentZoom > 1) {
        viewport.style.cursor = 'grab';
        if (img) img.style.cursor = 'grab';
      } else {
        viewport.style.cursor = 'zoom-in';
        if (img) img.style.cursor = 'zoom-in';
      }
    }
  }

  function openImageModal(imgSrc) {
    const { modal, img, originalImg } = getModalElements();
    if (!modal || !img) return;

    const source = imgSrc || (originalImg ? originalImg.src : null);
    if (!source || source.trim() === '') {
      return;
    }

    img.src = source;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    resetZoom();
  }

  function closeImageModal() {
    const { modal } = getModalElements();
    if (!modal) return;

    modal.classList.add('hidden');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    resetZoom();
  }

  function setZoom(newZoom, centerX = null, centerY = null, withAnimation = true) {
    const clampedZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(newZoom * 100) / 100));
    if (clampedZoom === currentZoom) return;

    const { viewport } = getModalElements();

    if (centerX !== null && centerY !== null && viewport) {
      const rect = viewport.getBoundingClientRect();
      const originX = centerX - rect.left - rect.width / 2;
      const originY = centerY - rect.top - rect.height / 2;

      const scaleChange = clampedZoom / currentZoom;
      translateX = originX - (originX - translateX) * scaleChange;
      translateY = originY - (originY - translateY) * scaleChange;
    }

    currentZoom = clampedZoom;
    if (currentZoom <= 1 && clampedZoom <= 1) {
      translateX = 0;
      translateY = 0;
    }

    updateTransform(withAnimation);
  }

  function zoomIn() {
    setZoom(currentZoom + ZOOM_STEP);
  }

  function zoomOut() {
    setZoom(currentZoom - ZOOM_STEP);
  }

  function resetZoom() {
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    updateTransform(true);
  }

  function toggleZoom(e) {
    if (e) e.stopPropagation();
    if (currentZoom <= 1.1) {
      const clientX = e ? e.clientX : null;
      const clientY = e ? e.clientY : null;
      setZoom(2.0, clientX, clientY, true);
    } else {
      resetZoom();
    }
  }

  function handleWheelZoom(e) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.2 : -0.2;
    setZoom(currentZoom + delta, e.clientX, e.clientY, false);
  }

  function setupMouseDrag() {
    const { viewport, img } = getModalElements();
    if (!viewport) return;

    function onMouseDown(e) {
      if (e.button !== 0) return;
      e.preventDefault();

      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;

      updateTransform(false);

      function onMouseMove(moveEvent) {
        if (!isDragging) return;
        moveEvent.preventDefault();
        translateX = moveEvent.clientX - startX;
        translateY = moveEvent.clientY - startY;
        updateTransform(false);
      }

      function onMouseUp() {
        if (!isDragging) return;
        isDragging = false;
        updateTransform(true);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      }

      window.addEventListener('mousemove', onMouseMove, { passive: false });
      window.addEventListener('mouseup', onMouseUp);
    }

    viewport.addEventListener('mousedown', onMouseDown);
    if (img) img.addEventListener('mousedown', onMouseDown);
  }

  function setupTouchDrag() {
    const { viewport } = getModalElements();
    if (!viewport) return;

    function getTouchDistance(touch1, touch2) {
      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;
      return Math.hypot(dx, dy);
    }

    viewport.addEventListener(
      'touchstart',
      function (e) {
        if (e.touches.length === 1) {
          isDragging = true;
          const touch = e.touches[0];
          startX = touch.clientX - translateX;
          startY = touch.clientY - translateY;
          initialPinchDistance = null;
        } else if (e.touches.length === 2) {
          isDragging = false;
          initialPinchDistance = getTouchDistance(e.touches[0], e.touches[1]);
          initialPinchZoom = currentZoom;
        }
      },
      { passive: true }
    );

    viewport.addEventListener(
      'touchmove',
      function (e) {
        if (isDragging && e.touches.length === 1) {
          e.preventDefault();
          const touch = e.touches[0];
          translateX = touch.clientX - startX;
          translateY = touch.clientY - startY;
          updateTransform(false);
        } else if (e.touches.length === 2 && initialPinchDistance) {
          e.preventDefault();
          const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
          const scaleMultiplier = currentDistance / initialPinchDistance;
          const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
          const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
          setZoom(initialPinchZoom * scaleMultiplier, midX, midY, false);
        }
      },
      { passive: false }
    );

    viewport.addEventListener('touchend', function (e) {
      if (e.touches.length === 0) {
        isDragging = false;
        initialPinchDistance = null;
        updateTransform(true);
      } else if (e.touches.length === 1) {
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX - translateX;
        startY = touch.clientY - translateY;
        initialPinchDistance = null;
      }
    });
  }

  function setupKeyboardControls() {
    document.addEventListener('keydown', function (e) {
      const modal = document.getElementById('imageZoomModal');
      if (!modal || modal.classList.contains('hidden') || modal.style.display === 'none') {
        return;
      }

      switch (e.key) {
        case 'Escape':
          closeImageModal();
          break;
        case '+':
        case '=':
          zoomIn();
          break;
        case '-':
        case '_':
          zoomOut();
          break;
        case '0':
          resetZoom();
          break;
        case 'ArrowLeft':
          translateX += 40;
          updateTransform(true);
          break;
        case 'ArrowRight':
          translateX -= 40;
          updateTransform(true);
          break;
        case 'ArrowUp':
          translateY += 40;
          updateTransform(true);
          break;
        case 'ArrowDown':
          translateY -= 40;
          updateTransform(true);
          break;
      }
    });
  }

  function bindDeckImages() {
    document.querySelectorAll('.visual-reference-img, .chart-container img, [data-zoomable="true"], .slide-figure img').forEach(imgEl => {
      imgEl.style.cursor = 'zoom-in';
      imgEl.title = 'Click to open in pan/zoom lightbox';
      imgEl.addEventListener('click', (e) => {
        e.stopPropagation();
        openImageModal(imgEl.src);
      });
    });
  }

  function init() {
    ensureModalStructure();
    const { viewport, img } = getModalElements();

    if (viewport) {
      setupMouseDrag();
      setupTouchDrag();
      viewport.addEventListener('wheel', handleWheelZoom, { passive: false });
      viewport.addEventListener('dblclick', toggleZoom);
    }

    if (img) {
      img.style.pointerEvents = 'auto';
      img.style.userSelect = 'none';
    }

    bindDeckImages();
    setupKeyboardControls();
  }

  // Expose global methods
  window.openImageModal = openImageModal;
  window.closeImageModal = closeImageModal;
  window.zoomIn = zoomIn;
  window.zoomOut = zoomOut;
  window.resetZoom = resetZoom;
  window.toggleZoom = toggleZoom;
  window.handleWheelZoom = handleWheelZoom;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


/* ==================== MODULE: mobile.js ==================== */
/**
 * Expert IELTS Presentations — Mobile & Touch Interaction Engine
 * Provides dynamic viewport height (--vh) calculation, touch gestures,
 * swipe navigation, and responsive controls for tablets/iPads/mobile devices.
 */

(function () {
  'use strict';

  const MOBILE_BREAKPOINT = 768;

  /**
   * 1. Viewport Height Fix (Solves mobile browser 100vh address bar jumping)
   */
  function setMobileVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  /**
   * 2. Swipe Navigation for Presentation Slides
   */
  function setupSwipeNavigation() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const MIN_SWIPE_DISTANCE = 50;

    document.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        handleSwipeGesture();
      }
    }, { passive: true });

    function handleSwipeGesture() {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Ensure horizontal swipe is dominant over vertical scroll
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > MIN_SWIPE_DISTANCE) {
        if (window.deckEngine) {
          if (deltaX < 0) {
            // Swipe Left -> Next Slide
            if (typeof window.deckEngine.nextSlide === 'function') {
              window.deckEngine.nextSlide();
            }
          } else {
            // Swipe Right -> Prev Slide
            if (typeof window.deckEngine.prevSlide === 'function') {
              window.deckEngine.prevSlide();
            }
          }
        }
      }
    }
  }

  /**
   * 3. Responsive Class & Viewport Watcher
   */
  function checkResponsiveState() {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    if (isMobile) {
      document.body.classList.add('is-mobile-view');
    } else {
      document.body.classList.remove('is-mobile-view');
    }
    setMobileVh();
  }

  function init() {
    setMobileVh();
    checkResponsiveState();
    setupSwipeNavigation();

    window.addEventListener('resize', () => {
      setMobileVh();
      checkResponsiveState();
    }, { passive: true });

    window.addEventListener('orientationchange', () => {
      setTimeout(setMobileVh, 200);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


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

        // 2. On Strategy slides, allow clicking a strategy card to toggle its keyword highlighting without revealing answers/explanations
        document.querySelectorAll('.strategy-card').forEach(card => {
            if (card.dataset.strategyBound) return;
            card.dataset.strategyBound = 'true';
            card.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
                const syns = card.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3, .vocab-word');
                const isAnyActive = Array.from(syns).some(s => s.classList.contains('active-syn') || s.classList.contains('active-vocab'));
                syns.forEach(s => {
                    if (isAnyActive) {
                        s.classList.remove('active-syn', 'active-vocab');
                    } else {
                        if (s.classList.contains('vocab-word')) {
                            s.classList.add('active-vocab');
                        } else {
                            s.classList.add('active-syn');
                        }
                    }
                });
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
            const synSpans = Array.from(card.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3'));
            
            let isUnsolved = false;
            if (inputs.length > 0) {
                isUnsolved = inputs.some(inp => !inp.classList.contains('correct'));
            } else if (synSpans.length > 0) {
                isUnsolved = synSpans.some(s => !s.classList.contains('active-syn')) || !card.classList.contains('revealed');
            } else {
                isUnsolved = !card.classList.contains('revealed');
            }

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

        // Reveal direct keyword and vocabulary highlights inside card
        card.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => {
            s.classList.add('active-syn');
        });
        card.querySelectorAll('.vocab-word, .vocab-term').forEach(v => {
            v.classList.add('active-vocab');
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
 * Reading Grounder & Vocabulary Explainer Engine (ReadingGrounder)
 * Handles:
 * 1. Interactive Vocabulary Popovers (Definitions, IPA, Audio Pronunciation, and Dual-Pane Highlighting).
 * 2. Automatic dictionary lookup for reading question keywords and passage evidence.
 * 3. Automatic synonym badge rendering from data-syn attributes.
 * 4. Evidence hover focus synchronization.
 */

class ReadingGrounder {
    static init() {
        this.renderSynonymBadges();
        this.bindEvidenceHover();
        this.bindVocabExplainer();
        this.injectVocabStyles();
    }

    /**
     * Built-in IELTS Academic Dictionary for Reading Questions & Target Passage Excerpts
     */
    static get dictionary() {
        return {
            'sharing experiences': {
                word: 'sharing experiences',
                pos: 'phrase',
                ipa: '/ˈʃeə.rɪŋ ɪkˈspɪə.ri.ən.sɪz/',
                def: 'Communicating and recounting personal events to others in social interactions.',
                colloc: 'Paraphrases: "extraordinary experiences" / "tell others"'
            },
            'satisfaction': {
                word: 'satisfaction',
                pos: 'noun',
                ipa: '/ˌsæt.ɪsˈfæk.ʃən/',
                def: 'A pleasant feeling of fulfillment or pleasure.',
                colloc: 'gain / derive satisfaction from'
            },
            'immediate and long-term': {
                word: 'immediate & long-term',
                pos: 'phrase',
                ipa: '/ɪˈmiː.di.ət ænd lɒŋ tɜːm/',
                def: 'Happening in the present moment as well as extending far into the future.',
                colloc: 'Paraphrases: "in the moment" vs. "in the long run"'
            },
            'extraordinary': {
                word: 'extraordinary',
                pos: 'adj.',
                ipa: '/ɪkˈstrɔː.dɪn.ər.i/',
                def: 'Very unusual, special, or remarkable; far beyond ordinary.',
                colloc: 'extraordinary experience / achievement'
            },
            'pleasurable': {
                word: 'pleasurable',
                pos: 'adj.',
                ipa: '/ˈpleʒ.ər.ə.bəl/',
                def: 'Giving a feeling of happy satisfaction or enjoyable sensation.',
                colloc: 'pleasurable in the moment'
            },
            'reminisce': {
                word: 'reminisce',
                pos: 'verb',
                ipa: '/ˌrem.ɪˈnɪs/',
                def: 'To talk, write, or think about enjoyable past experiences.',
                colloc: 'reminisce about the past / fond memories'
            },
            'social communication': {
                word: 'social communication',
                pos: 'noun',
                ipa: '/ˈsəʊ.ʃəl kəˌmjuː.nɪˈkeɪ.ʃən/',
                def: 'The exchange of ideas and information between people in social settings.',
                colloc: 'Paraphrases: "social interaction"'
            },
            'in common': {
                word: 'in common',
                pos: 'idiom / phrase',
                ipa: '/ɪn ˈkɒm.ən/',
                def: 'Shared equally between two or more parties; possessing shared traits.',
                colloc: 'have things in common ↔ grounded in similarities'
            },
            'grounded in': {
                word: 'grounded in',
                pos: 'verb / adj.',
                ipa: '/ˈɡraʊn.dɪd ɪn/',
                def: 'Firmly based on, rooted in, or determined by foundational factors.',
                colloc: 'grounded in similarities / evidence'
            },
            'unusual experiences': {
                word: 'unusual experiences',
                pos: 'noun phrase',
                ipa: '/ʌnˈjuː.ʒu.əl ɪkˈspɪə.ri.ən.sɪz/',
                def: 'Novel, rare, or out-of-the-ordinary events in life.',
                colloc: 'Paraphrases: "extraordinary experiences"'
            },
            'mistakenly thought': {
                word: 'mistakenly thought',
                pos: 'verb phrase',
                ipa: '/mɪˈsteɪ.kən.li θɔːt/',
                def: 'Held an incorrect or inaccurate belief before research evidence.',
                colloc: 'believed ↔ mistakenly thought'
            },
            'participants': {
                word: 'participants',
                pos: 'noun',
                ipa: '/pɑːˈtɪs.ɪ.pənts/',
                def: 'People who take part in a scientific experiment, study, or survey.',
                colloc: 'study participants / sample size'
            },
            'reflected': {
                word: 'reflected',
                pos: 'verb',
                ipa: '/rɪˈflek.tɪd/',
                def: 'Accurately mirrored, reproduced, or represented real-world dynamics.',
                colloc: 'reflected what happens in the real world'
            },
            'criteria': {
                word: 'criteria',
                pos: 'noun (pl.)',
                ipa: '/kraɪˈtɪə.ri.ə/',
                def: 'Standards or principles by which something is judged or decided.',
                colloc: 'different criteria ↔ appearance vs. competence'
            },
            'tailor-made': {
                word: 'tailor-made',
                pos: 'adj.',
                ipa: '/ˈteɪ.lə meɪd/',
                def: 'Made specifically for a particular individual or purpose.',
                colloc: 'specially designed clothes ↔ tailor-made suit'
            },
            'competent': {
                word: 'competent',
                pos: 'adj.',
                ipa: '/ˈkɒm.pɪ.tənt/',
                def: 'Having the necessary ability, knowledge, or skill to do something successfully.',
                colloc: 'highly competent / professional'
            },
            'snap judgement': {
                word: 'snap judgement',
                pos: 'noun',
                ipa: '/snæp ˈdʒʌdʒ.mənt/',
                def: 'A decision or opinion made instantly without deliberation.',
                colloc: 'almost immediately ↔ snap judgement / in one second'
            },
            'enclothed cognition': {
                word: 'enclothed cognition',
                pos: 'noun',
                ipa: '/ɪnˈkləʊðd kɒɡˈnɪʃ.ən/',
                def: 'The systematic influence of clothing on wearers\' psychological processes and cognitive focus.',
                colloc: 'theory of enclothed cognition'
            },
            'impressing others': {
                word: 'impressing others',
                pos: 'phrase',
                ipa: '/ɪmˈpres.ɪŋ ˈʌð.əz/',
                def: 'Gaining admiration or attention from peers through luxury or display.',
                colloc: 'other people notice them ↔ impressing others'
            },
            'belonging': {
                word: 'belonging',
                pos: 'noun',
                ipa: '/bɪˈlɒŋ.ɪŋ/',
                def: 'A sense of being accepted, connected, and part of a social group.',
                colloc: 'signal group belonging ↔ dress in a similar way'
            }
        };
    }

    /**
     * Interactive Vocabulary Highlighting, Pronunciation, and Short Definitions
     */
    static bindVocabExplainer() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('.vocab-word, .vocab-term, .syn-pair-1, .syn-pair-2, .syn-pair-3, [data-def]');
            
            // If clicking inside the popover itself (e.g. replay audio or close), don't close
            if (e.target.closest('#vocabPopover')) return;

            if (target) {
                // If it's a synonym span or vocab word, look up its definition
                const text = target.textContent.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()"]/g, "").trim();
                const matchedDict = this.lookupDict(text, target);

                if (matchedDict || target.dataset.def || target.classList.contains('vocab-word')) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.showVocabPopover(target, matchedDict);
                }
            } else {
                this.hideVocabPopover();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideVocabPopover();
            }
        });
    }

    static lookupDict(rawText, el) {
        if (!rawText) return null;
        const dict = this.dictionary;

        // Exact match
        if (dict[rawText]) return dict[rawText];

        // Partial or substring match
        for (const [key, val] of Object.entries(dict)) {
            if (rawText.includes(key) || key.includes(rawText)) {
                return val;
            }
        }

        // Check data attributes on element
        if (el.dataset.word && dict[el.dataset.word.toLowerCase()]) {
            return dict[el.dataset.word.toLowerCase()];
        }

        return null;
    }

    static showVocabPopover(el, dictData = null) {
        // Remove previous active glow
        document.querySelectorAll('.vocab-word.active-vocab, .vocab-term.active-vocab').forEach(v => {
            v.classList.remove('active-vocab');
        });
        el.classList.add('active-vocab');

        const cleanWord = el.dataset.word || (dictData ? dictData.word : el.textContent.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()"]/g, ""));
        const pos = el.dataset.pos || (dictData ? dictData.pos : 'IELTS KEYWORD');
        const ipa = el.dataset.ipa || (dictData ? dictData.ipa : '');
        const def = el.dataset.def || (dictData ? dictData.def : 'Key academic term targeted in the reading passage & questions.');
        const colloc = el.dataset.colloc || (dictData ? dictData.colloc : '');

        // Auto-play native speech pronunciation in Google Female UK voice
        this.speakWord(cleanWord);

        // Get or create popover element
        let popover = document.getElementById('vocabPopover');
        if (!popover) {
            popover = document.createElement('div');
            popover.id = 'vocabPopover';
            popover.className = 'vocab-popover';
            document.body.appendChild(popover);
        }

        popover.innerHTML = `
            <div class="vp-header">
                <div class="vp-title-group">
                    <span class="vp-word">${cleanWord}</span>
                    <div style="display: flex; gap: 6px; align-items: center; margin-top: 2px;">
                        ${pos ? `<span class="vp-pos">${pos}</span>` : ''}
                        ${ipa ? `<span class="vp-ipa">${ipa}</span>` : ''}
                    </div>
                </div>
                <div class="vp-actions">
                    <button class="vp-audio-btn" title="Listen to pronunciation" onclick="ReadingGrounder.speakWord('${cleanWord.replace(/'/g, "\\'")}')">🔊 Listen</button>
                    <button class="vp-close-btn" title="Close" onclick="ReadingGrounder.hideVocabPopover()">✕</button>
                </div>
            </div>
            <div class="vp-body">
                <div class="vp-def">${def}</div>
                ${colloc ? `<div class="vp-colloc"><strong>Target Linkage:</strong> <em>${colloc}</em></div>` : ''}
            </div>
        `;

        // Position popover relative to clicked element
        popover.style.display = 'block';
        const rect = el.getBoundingClientRect();
        const popRect = popover.getBoundingClientRect();

        let top = rect.bottom + 8;
        let left = rect.left + (rect.width / 2) - (popRect.width / 2);

        // Prevent overflowing viewport
        if (top + popRect.height > window.innerHeight - 20) {
            top = Math.max(10, rect.top - popRect.height - 8);
        }
        if (left < 10) left = 10;
        if (left + popRect.width > window.innerWidth - 10) {
            left = window.innerWidth - popRect.width - 10;
        }

        popover.style.top = `${top}px`;
        popover.style.left = `${left}px`;
    }

    static hideVocabPopover() {
        const popover = document.getElementById('vocabPopover');
        if (popover) {
            popover.style.display = 'none';
        }
        document.querySelectorAll('.vocab-word.active-vocab, .vocab-term.active-vocab').forEach(v => {
            v.classList.remove('active-vocab');
        });
    }

    static speakWord(text) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-GB';
        utterance.rate = 0.9;

        const preferredVoice = this.getPreferredVoice();
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    }

    static getPreferredVoice() {
        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) return null;

        // 1. Prioritize Google UK English Female
        const googleUkFemale = voices.find(v => 
            v.name.includes('Google') && 
            (v.name.includes('UK English Female') || (v.lang.replace('_', '-').startsWith('en-GB') && v.name.toLowerCase().includes('female')))
        );
        if (googleUkFemale) return googleUkFemale;

        // 2. Any Google UK English voice
        const googleUk = voices.find(v => v.name.includes('Google') && (v.lang === 'en-GB' || v.lang === 'en_GB'));
        if (googleUk) return googleUk;

        // 3. Natural British Female voices (e.g. Microsoft Libby, Hazel, Sonia, Serena)
        const britishFemale = voices.find(v => 
            (v.lang === 'en-GB' || v.lang === 'en_GB') && 
            (v.name.toLowerCase().includes('female') || v.name.includes('Natural') || v.name.includes('Libby') || v.name.includes('Hazel') || v.name.includes('Sonia') || v.name.includes('Serena'))
        );
        if (britishFemale) return britishFemale;

        // 4. Any en-GB voice
        return voices.find(v => v.lang === 'en-GB' || v.lang === 'en_GB') || null;
    }

    static injectVocabStyles() {
        if (document.getElementById('readingGrounderStyles')) return;
        const style = document.createElement('style');
        style.id = 'readingGrounderStyles';
        style.textContent = `
            .vocab-word, .vocab-term {
                border-bottom: 2px dashed #059669;
                color: #065f46;
                font-weight: 600;
                cursor: pointer;
                border-radius: 3px;
                padding: 1px 3px;
                transition: all 0.2s ease;
                display: inline;
            }
            .vocab-word:hover, .vocab-term:hover {
                background: #d1fae5;
                color: #047857;
            }
            .vocab-word.active-vocab, .vocab-term.active-vocab {
                background: #a7f3d0 !important;
                color: #064e3b !important;
                box-shadow: 0 0 0 2px #10b981;
            }

            /* Floating Vocab Popover Card */
            .vocab-popover {
                position: fixed;
                z-index: 10000;
                display: none;
                width: 330px;
                max-width: 90vw;
                background: #ffffff;
                border: 2px solid #10b981;
                border-radius: 12px;
                padding: 14px 16px;
                box-shadow: 0 12px 28px -5px rgba(0, 0, 0, 0.22), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
                font-family: var(--font-body, 'DM Sans', sans-serif);
                animation: popoverFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .vp-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                border-bottom: 1px solid #e2e8f0;
                padding-bottom: 8px;
                margin-bottom: 8px;
                gap: 8px;
            }

            .vp-title-group {
                display: flex;
                flex-direction: column;
                gap: 2px;
            }

            .vp-word {
                font-size: 17.5px;
                font-weight: 800;
                color: #0f172a;
                font-family: var(--font-display, sans-serif);
            }

            .vp-pos {
                font-size: 11.5px;
                font-weight: 700;
                color: #059669;
                text-transform: uppercase;
                background: #ecfdf5;
                padding: 1px 6px;
                border-radius: 4px;
                width: max-content;
            }

            .vp-ipa {
                font-size: 12.5px;
                color: #64748b;
                font-family: 'JetBrains Mono', monospace;
            }

            .vp-actions {
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .vp-audio-btn {
                background: #ecfdf5;
                border: 1px solid #a7f3d0;
                color: #059669;
                font-size: 12px;
                font-weight: 700;
                padding: 4px 8px;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s;
            }

            .vp-audio-btn:hover {
                background: #10b981;
                color: #ffffff;
            }

            .vp-close-btn {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                padding: 2px 6px;
                line-height: 1;
                border-radius: 4px;
            }

            .vp-close-btn:hover {
                color: #ef4444;
                background: #fee2e2;
            }

            .vp-body {
                font-size: 14px;
                line-height: 1.5;
                color: #334155;
            }

            .vp-def {
                margin-bottom: 6px;
                font-weight: 500;
            }

            .vp-colloc {
                font-size: 12.5px;
                color: #475569;
                background: #f8fafc;
                padding: 6px 8px;
                border-radius: 6px;
                border-left: 3px solid #059669;
            }

            @keyframes popoverFadeIn {
                from { opacity: 0; transform: translateY(-4px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renders concise data-syn attributes into styled synonym cards
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
                    const color = parts[0].trim().toLowerCase();
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

        const synSpans = qKey ? document.querySelectorAll(`[data-q="${qKey}"]`) : [];
        const isCurrentlyActive = (evTarget && evTarget.classList.contains('highlighted') && this.activeEvidenceId === (evId || qKey)) ||
                                  (synSpans.length > 0 && Array.from(synSpans).every(s => s.classList.contains('active-syn')) && this.activeEvidenceId === qKey);

        if (!isCurrentlyActive) {
            if (evTarget) {
                evTarget.classList.add('highlighted', 'glow-pulse');
            }
            synSpans.forEach(s => s.classList.add('active-syn'));
            this.activeEvidenceId = evId || qKey;

            // Smooth scroll into view inside the scrollable reading pane
            if (evTarget) {
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
            }
        } else {
            if (evTarget) evTarget.classList.remove('highlighted', 'glow-pulse');
            synSpans.forEach(s => s.classList.remove('active-syn'));
            this.activeEvidenceId = null;
        }

        // Toggle corresponding item-explanation in question cards and flowchart cards
        if (qKey || evId) {
            const selector = [
                qKey ? `.q-card[data-q="${qKey}"]` : null,
                qKey ? `.flowchart-step-card[data-q="${qKey}"]` : null,
                evId ? `.q-card[data-ev="${evId}"]` : null,
                evId ? `.flowchart-step-card[data-ev="${evId}"]` : null
            ].filter(Boolean).join(', ');

            if (selector) {
                document.querySelectorAll(selector).forEach(card => {
                    const exp = card.querySelector('.item-explanation');
                    if (exp) exp.classList.toggle('show', !isCurrentlyActive);
                });
            }
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
     * Auto-binds click handlers on synonym buttons and question/flowchart cards
     */
    bindSynonymClicks() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.syn-btn');
            if (btn) {
                const card = btn.closest('.q-card, .flowchart-step-card');
                const dataQ = btn.dataset.q || card?.dataset?.q || (btn.dataset.ev ? btn.dataset.ev.replace(/^ev-/, '') : null);
                const dataEv = btn.dataset.ev || (dataQ ? `ev-${dataQ}` : null);
                if (dataQ || dataEv) {
                    e.preventDefault();
                    this.focusEvidence(dataQ, dataEv);
                    if (card) {
                        const exp = card.querySelector('.item-explanation');
                        if (exp) exp.classList.toggle('show');
                    }
                }
            }
        });
    }

    /**
     * Question hover preview disabled to prevent unintentional answer exposure
     */
    bindQuestionHover() {
        // Restricted to explicit button actions
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


/* ==================== MODULE: reading-analyzer.js ==================== */
/**
 * Expert IELTS Presentations — Reading Passage & Question Analyzer Engine (ReadingAnalyzer)
 * 
 * Features:
 * 1. Dynamic SVG Evidence Connection Arrows: Arcs between questions and passage evidence with animated flowing dashed lines.
 * 2. Dual-Language Translation Mode: Instant switching between EN, VIE, and Dual Parallel views.
 * 3. Paraphrase & Synonym Mapping Engine: Visualizes question keywords vs passage paraphrases.
 * 4. Interactive Evidence Popovers: Explains question rationale on hover or click.
 * 5. Keyboard Shortcuts: 'A' to toggle arrows, 'T' to toggle language, 'Esc' to clear focus.
 */

(function () {
  'use strict';

  class ReadingAnalyzer {
    constructor() {
      this.showArrows = true;
      this.currentLang = 'en';
      this.arrowAnimFrame = null;
      this.activeTarget = null;
      this.activeCard = null;
      this.svg = null;
      this.init();
    }

    init() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
        this.setup();
      }
    }

    setup() {
      this.injectStyles();
      this.ensureSvgCanvas();
      this.bindEvidenceEvents();
      this.bindControls();
      this.bindKeyboardShortcuts();
      console.log('📖 [Expert IELTS] Reading Passage Analyzer & SVG Arrow Engine initialized.');
    }

    injectStyles() {
      if (document.getElementById('reading-analyzer-styles')) return;

      const style = document.createElement('style');
      style.id = 'reading-analyzer-styles';
      style.textContent = `
        /* SVG Connection Canvas */
        #reading-svg-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
        }

        /* Animated flowing arrow path */
        @keyframes arrowFlow {
          from { stroke-dashoffset: 26; }
          to { stroke-dashoffset: 0; }
        }

        .reading-arrow-path {
          stroke: #10b981;
          stroke-width: 2.5;
          fill: none;
          stroke-dasharray: 6, 4;
          animation: arrowFlow 1s linear infinite;
          filter: drop-shadow(0 2px 4px rgba(16, 185, 129, 0.4));
        }

        /* Highlight Targets */
        .ans-target {
          cursor: pointer;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
          transition: all 0.2s ease;
          position: relative;
          display: inline;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }

        .ans-target.active-target, .ans-target:hover {
          outline: 2px solid #10b981;
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
          filter: brightness(0.96);
          z-index: 20;
        }

        /* Floating Evidence Popover */
        .explanation-popover {
          position: absolute;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          opacity: 0;
          visibility: hidden;
          width: 320px;
          background-color: #0f172a;
          color: #f8fafc;
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 0.8rem;
          font-family: 'Inter', system-ui, sans-serif;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
          z-index: 50;
          transition: all 0.25s ease;
          pointer-events: none;
          line-height: 1.45;
          font-weight: normal;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .explanation-popover::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -6px;
          border-width: 6px;
          border-style: solid;
          border-color: #0f172a transparent transparent transparent;
        }

        .ans-target:hover .explanation-popover,
        .ans-target.active-target .explanation-popover {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        /* Question Card Active State */
        .q-card-active, [data-q].active-card {
          border-color: #10b981 !important;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
        }

        /* Translation Toggle Panel */
        .deck-lang-toggle {
          display: inline-flex;
          align-items: center;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
          padding: 2px;
          gap: 2px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .deck-lang-btn {
          padding: 3px 8px;
          border-radius: 9999px;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .deck-lang-btn.active {
          background: #10b981;
          color: #ffffff;
        }
      `;
      document.head.appendChild(style);
    }

    ensureSvgCanvas() {
      let svg = document.getElementById('reading-svg-canvas');
      if (!svg) {
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.id = 'reading-svg-canvas';
        svg.innerHTML = `
          <defs>
            <marker id="arrow-head" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
            </marker>
          </defs>
        `;
        document.body.appendChild(svg);
      }
      this.svg = svg;
    }

    bindEvidenceEvents() {
      const targets = document.querySelectorAll('.ans-target, [data-q-target]');
      const qCards = document.querySelectorAll('.q-card, [data-q], .question-item');

      targets.forEach(target => {
        const qId = target.dataset.q || target.dataset.qTarget;
        const qCard = document.querySelector(`.q-card[data-q="${qId}"], #q-card-${qId}, .question-item[data-q="${qId}"]`);

        target.addEventListener('mouseenter', () => this.activatePair(target, qCard));
        target.addEventListener('mouseleave', () => this.deactivateAll());
        target.addEventListener('click', (e) => {
          e.stopPropagation();
          this.activatePair(target, qCard, true);
        });
      });

      qCards.forEach(card => {
        const qId = card.dataset.q || (card.id ? card.id.replace('q-card-', '') : '');
        const target = document.querySelector(`.ans-target[data-q="${qId}"], [data-q-target="${qId}"]`);

        card.addEventListener('mouseenter', () => this.activatePair(target, card));
        card.addEventListener('mouseleave', () => this.deactivateAll());
        card.addEventListener('click', () => {
          this.activatePair(target, card, false);
        });
      });
    }

    activatePair(targetEl, cardEl, scrollToCard = false) {
      this.deactivateAll(false);

      if (targetEl) {
        targetEl.classList.add('active-target');
        this.activeTarget = targetEl;
      }

      if (cardEl) {
        cardEl.classList.add('q-card-active', 'active-card');
        this.activeCard = cardEl;
        if (scrollToCard && cardEl.scrollIntoView) {
          cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }

      this.startSmoothTracking();
    }

    deactivateAll(clearCanvas = true) {
      document.querySelectorAll('.ans-target').forEach(t => t.classList.remove('active-target'));
      document.querySelectorAll('.q-card, .question-item, [data-q]').forEach(c => c.classList.remove('q-card-active', 'active-card'));
      this.activeTarget = null;
      this.activeCard = null;
      if (clearCanvas) this.clearCanvas();
    }

    startSmoothTracking() {
      if (this.arrowAnimFrame) cancelAnimationFrame(this.arrowAnimFrame);
      const startTime = performance.now();
      const duration = 600;

      const step = (now) => {
        this.drawConnection();
        if (now - startTime < duration) {
          this.arrowAnimFrame = requestAnimationFrame(step);
        }
      };
      this.arrowAnimFrame = requestAnimationFrame(step);
    }

    drawConnection() {
      if (!this.showArrows || !this.activeTarget || !this.activeCard) {
        this.clearCanvas();
        return;
      }

      const fromRect = this.activeTarget.getBoundingClientRect();
      const toRect = this.activeCard.getBoundingClientRect();

      // Ensure both elements are currently visible in viewport
      if (fromRect.width === 0 || toRect.width === 0) {
        this.clearCanvas();
        return;
      }

      // Calculate start and end coordinates
      const startX = fromRect.right > toRect.left ? fromRect.left : fromRect.right;
      const startY = fromRect.top + fromRect.height / 2;

      const endX = toRect.left < startX ? toRect.right : toRect.left;
      const endY = toRect.top + toRect.height / 2;

      // Draw smooth Bezier curve
      const deltaX = Math.abs(endX - startX) * 0.5;
      const controlX1 = startX < endX ? startX + deltaX : startX - deltaX;
      const controlY1 = startY;
      const controlX2 = startX < endX ? endX - deltaX : endX + deltaX;
      const controlY2 = endY;

      const pathData = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;

      let path = document.getElementById('reading-arrow-active');
      if (!path) {
        path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.id = 'reading-arrow-active';
        path.setAttribute('class', 'reading-arrow-path');
        path.setAttribute('marker-end', 'url(#arrow-head)');
        this.svg.appendChild(path);
      }

      path.setAttribute('d', pathData);
    }

    clearCanvas() {
      const path = document.getElementById('reading-arrow-active');
      if (path) path.remove();
    }

    bindControls() {
      // Toggle Arrows Button
      const toggleArrowBtn = document.getElementById('btn-toggle-arrows');
      if (toggleArrowBtn) {
        toggleArrowBtn.addEventListener('click', () => {
          this.showArrows = !this.showArrows;
          toggleArrowBtn.classList.toggle('active', this.showArrows);
          if (!this.showArrows) this.clearCanvas();
          else this.drawConnection();
        });
      }

      // Language Switchers
      document.querySelectorAll('[data-reading-lang]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const lang = e.currentTarget.dataset.readingLang;
          this.switchLanguage(lang);
        });
      });

      // Window resize / scroll tracking
      window.addEventListener('resize', () => this.drawConnection(), { passive: true });
      window.addEventListener('scroll', () => this.drawConnection(), { passive: true });
    }

    switchLanguage(lang) {
      this.currentLang = lang;
      document.querySelectorAll('[data-reading-lang]').forEach(b => {
        b.classList.toggle('active', b.dataset.readingLang === lang);
      });

      // Update text in passage if data-en and data-vi are present
      document.querySelectorAll('[data-en][data-vi]').forEach(el => {
        if (lang === 'vi') {
          el.innerHTML = el.dataset.vi;
        } else if (lang === 'en') {
          el.innerHTML = el.dataset.en;
        } else if (lang === 'dual') {
          el.innerHTML = `
            <div class="reading-dual-block">
              <div class="reading-en-pane mb-2 text-slate-800">${el.dataset.en}</div>
              <div class="reading-vi-pane text-slate-500 italic text-sm border-t border-slate-200 pt-2">${el.dataset.vi}</div>
            </div>
          `;
        }
      });

      // Re-bind evidence targets after DOM update
      this.bindEvidenceEvents();
      this.drawConnection();
    }

    bindKeyboardShortcuts() {
      document.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

        if (e.key === 'a' || e.key === 'A') {
          // Toggle Arrows
          this.showArrows = !this.showArrows;
          if (!this.showArrows) this.clearCanvas();
          else this.drawConnection();
        } else if (e.key === 't' || e.key === 'T') {
          // Cycle Language EN -> VI -> Dual
          const nextLang = this.currentLang === 'en' ? 'vi' : (this.currentLang === 'vi' ? 'dual' : 'en');
          this.switchLanguage(nextLang);
        } else if (e.key === 'Escape') {
          this.deactivateAll();
        }
      });
    }
  }

  // Instantiate and export
  window.readingAnalyzer = new ReadingAnalyzer();
})();


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
        utterance.lang = customLang || 'en-GB';
        utterance.rate = this.speechRate || 0.9;

        // Try selecting Google Female UK voice if available
        const voices = window.speechSynthesis.getVoices();
        const googleUkFemale = voices.find(v => 
            v.name.includes('Google') && 
            (v.name.includes('UK English Female') || (v.lang.replace('_', '-').startsWith('en-GB') && v.name.toLowerCase().includes('female')))
        );
        const ukVoice = googleUkFemale || voices.find(v => 
            (v.lang === 'en-GB' || v.lang === 'en_GB') && 
            (v.name.toLowerCase().includes('female') || v.name.includes('Natural') || v.name.includes('Libby') || v.name.includes('Hazel') || v.name.includes('Sonia') || v.name.includes('Serena'))
        ) || voices.find(v => v.lang === 'en-GB' || v.lang === 'en_GB');

        if (ukVoice) utterance.voice = ukVoice;

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


/* ==================== MODULE: writing-annotator.js ==================== */
/**
 * =========================================================================
 * WRITING ANNOTATOR & PHRASE STUDY ENGINE
 * Expert IELTS Course Presentations Architecture
 * Provides interactive signposting highlights, vocabulary collocations,
 * phrase breakdown modals, inline hover tooltips, and text-to-speech essay narration.
 * =========================================================================
 */

(function () {
    'use strict';

    class WritingAnnotator {
        static init() {
            this.createModal();
            this.bindEvents();
            this.enhancePhrases();
        }

        static createModal() {
            if (document.getElementById('writing-phrase-modal')) return;

            const modalHtml = `
            <div id="writing-phrase-modal" class="writing-modal-overlay" style="display:none;">
                <div class="writing-modal-card" id="writing-modal-card">
                    <div class="writing-modal-header">
                        <div>
                            <span id="wm-badge" class="writing-modal-badge">Signposting Device</span>
                            <h3 id="wm-title" class="writing-modal-title">Phrase Title</h3>
                        </div>
                        <button class="writing-modal-close" onclick="WritingAnnotator.closeModal()" title="Close (Esc)">✕</button>
                    </div>
                    <div class="writing-modal-body">
                        <div class="wm-section wm-function">
                            <span class="wm-label">📌 Function &amp; Exam Purpose</span>
                            <p id="wm-desc" style="font-size:17px; line-height:1.6; color:#1e293b; margin:6px 0 0;">Description text</p>
                        </div>
                        <div class="wm-section wm-upgrade" id="wm-upgrade-box" style="margin-top:12px; display:none;">
                            <span class="wm-label" style="color:#059669; font-weight:700;">⭐ Band 7+ Lexical Upgrade</span>
                            <p id="wm-upgrade" style="font-size:16.5px; line-height:1.6; color:#065f46; margin:6px 0 0;">Upgrade example</p>
                        </div>
                    </div>
                    <div class="writing-modal-footer" style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; padding-top:12px; border-top:1px solid #e2e8f0;">
                        <button class="btn-action" onclick="WritingAnnotator.speakPhrase()" style="font-size:15px; padding:6px 14px;">🔊 Listen Phrase</button>
                        <button class="btn-action btn-primary" onclick="WritingAnnotator.closeModal()" style="font-size:15px; padding:6px 16px;">Got It</button>
                    </div>
                </div>
            </div>`;

            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }

        static enhancePhrases() {
            // Add title and aria attributes to all phrases for immediate accessibility
            document.querySelectorAll('.hl-phrase, .hl-vocab, .hl-connector').forEach(el => {
                const phrase = el.getAttribute('data-phrase') || el.getAttribute('data-title') || el.textContent.trim();
                const note = el.getAttribute('data-note') || el.getAttribute('data-desc') || '';
                if (note && !el.title) {
                    el.title = `${phrase}: ${note}`;
                }
                el.setAttribute('tabindex', '0');
                el.setAttribute('role', 'button');
            });
        }

        static bindEvents() {
            // Event delegation for clicks on phrases and vocab
            document.addEventListener('click', (e) => {
                const target = e.target.closest('.hl-phrase, .hl-vocab, .hl-connector');
                if (target) {
                    e.preventDefault();
                    e.stopPropagation();

                    const title = target.getAttribute('data-phrase') || target.getAttribute('data-title') || target.textContent.trim();
                    const type = target.getAttribute('data-type') || (target.classList.contains('hl-vocab') ? 'Topic Collocation' : 'Band 7+ Signposting Device');
                    const desc = target.getAttribute('data-note') || target.getAttribute('data-desc') || 'Essential IELTS Task 1 / Task 2 phrasing for high coherence and lexical scoring.';
                    const upgrade = target.getAttribute('data-upgrade') || '';
                    
                    // Add active ring effect
                    document.querySelectorAll('.hl-phrase.active-phrase, .hl-vocab.active-phrase').forEach(p => p.classList.remove('active-phrase'));
                    target.classList.add('active-phrase');

                    WritingAnnotator.showModal(title, type, desc, upgrade);
                }
            });

            // Enter key on focused phrase
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    const activeEl = document.activeElement;
                    if (activeEl && activeEl.matches('.hl-phrase, .hl-vocab, .hl-connector')) {
                        e.preventDefault();
                        activeEl.click();
                    }
                }
            });

            // Close on Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    WritingAnnotator.closeModal();
                }
            });

            // Close when clicking backdrop
            document.addEventListener('click', (e) => {
                const modal = document.getElementById('writing-phrase-modal');
                if (modal && e.target === modal) {
                    WritingAnnotator.closeModal();
                }
            });

            // Re-enhance on slide change
            document.addEventListener('slidechange', () => {
                WritingAnnotator.enhancePhrases();
            });
        }

        static showModal(title, type, desc, upgrade) {
            WritingAnnotator.createModal();
            const modal = document.getElementById('writing-phrase-modal');
            const card = document.getElementById('writing-modal-card');
            if (!modal || !card) return;

            const titleEl = document.getElementById('wm-title');
            const badgeEl = document.getElementById('wm-badge');
            const descEl = document.getElementById('wm-desc');
            const upBox = document.getElementById('wm-upgrade-box');
            const upEl = document.getElementById('wm-upgrade');

            if (titleEl) titleEl.textContent = title;
            if (badgeEl) badgeEl.textContent = type;
            if (descEl) descEl.textContent = desc;

            if (upBox && upEl) {
                if (upgrade && upgrade.trim() !== '') {
                    upBox.style.display = 'block';
                    upEl.textContent = upgrade;
                } else {
                    upBox.style.display = 'none';
                }
            }

            modal.style.display = 'flex';
            requestAnimationFrame(() => {
                modal.classList.add('show');
                card.classList.add('show');
            });
        }

        static closeModal() {
            const modal = document.getElementById('writing-phrase-modal');
            const card = document.getElementById('writing-modal-card');
            if (!modal) return;

            modal.classList.remove('show');
            if (card) card.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 200);

            document.querySelectorAll('.hl-phrase.active-phrase, .hl-vocab.active-phrase').forEach(p => p.classList.remove('active-phrase'));
        }

        static speakPhrase() {
            const title = document.getElementById('wm-title')?.textContent;
            if (!title || !('speechSynthesis' in window)) return;
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(title);
            utter.rate = 0.90;
            utter.lang = 'en-GB';
            const voices = window.speechSynthesis.getVoices();
            const ukVoice = voices.find(v => v.lang === 'en-GB' || v.name.includes('UK') || v.name.includes('British'));
            if (ukVoice) utter.voice = ukVoice;
            window.speechSynthesis.speak(utter);
        }

        static speakEssay(btn) {
            if (!('speechSynthesis' in window)) return;

            if (window._isSpeakingEssay) {
                window.speechSynthesis.cancel();
                window._isSpeakingEssay = false;
                if (btn) btn.innerHTML = '🔊 Listen Model Essay';
                return;
            }

            const slide = btn ? btn.closest('.slide') : document.querySelector('.slide.active');
            if (!slide) return;
            const essayPane = slide.querySelector('.writing-model-pane, [data-slot="model-essay"], [slot="essay"]');
            if (!essayPane) return;

            const text = essayPane.innerText.replace(/Band \d+\+ Official Model Answer/gi, '').trim();
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(text);
            utter.rate = 0.92;
            utter.lang = 'en-GB';
            const voices = window.speechSynthesis.getVoices();
            const ukVoice = voices.find(v => v.lang === 'en-GB' || v.name.includes('UK') || v.name.includes('British'));
            if (ukVoice) utter.voice = ukVoice;

            utter.onstart = () => {
                window._isSpeakingEssay = true;
                if (btn) btn.innerHTML = '⏹️ Stop Narration';
            };
            utter.onend = utter.onerror = () => {
                window._isSpeakingEssay = false;
                if (btn) btn.innerHTML = '🔊 Listen Model Essay';
            };

            window.speechSynthesis.speak(utter);
        }

        static toggleHighlights(btn) {
            const slide = btn ? btn.closest('.slide') : document.querySelector('.slide.active');
            if (!slide) return;
            slide.classList.toggle('hide-writing-highlights');
            const isHidden = slide.classList.contains('hide-writing-highlights');
            if (btn) {
                btn.innerHTML = isHidden ? '💡 Show Signpost Highlights' : '👁️ Hide Highlights';
                btn.classList.toggle('btn-primary', !isHidden);
            }
        }
    }

    window.WritingAnnotator = WritingAnnotator;
    window.speakEssay = (btn) => WritingAnnotator.speakEssay(btn);
    window.toggleWritingHighlights = (btn) => WritingAnnotator.toggleHighlights(btn);

    // Initialize immediately if DOM is ready, or on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => WritingAnnotator.init());
    } else {
        WritingAnnotator.init();
    }
})();


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


/* ==================== MODULE: deck-charts.js ==================== */
/**
 * =========================================================================
 * IELTS Interactive Chart Engine (Task 1 Academic Data Visualizations)
 * Supports: Dual Group Bar Charts, Multi-Line Graphs, and Mini Trend Sketches
 * 100% Native SVG, Zero External Dependencies, Offline-First
 * =========================================================================
 */

class DeckCharts {
    constructor() {
        this.activeTooltips = new Map();
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.autoHydrateCharts();
        });

        // Re-check on slide change if charts are dynamically mounted
        document.addEventListener('slidechange', () => {
            this.autoHydrateCharts();
        });
    }

    autoHydrateCharts() {
        // Hydrate Social Media Friendship Bar Chart (Module 1a)
        const socialChartEl = document.getElementById('chart-social-media-connections');
        if (socialChartEl && !socialChartEl.dataset.rendered) {
            this.renderSocialMediaBarChart(socialChartEl);
            socialChartEl.dataset.rendered = 'true';
        }

        // Hydrate Cinema vs DVD Multi-Line Graph (Module 1b)
        const cinemaChartEl = document.getElementById('chart-cinema-dvd-sales');
        if (cinemaChartEl && !cinemaChartEl.dataset.rendered) {
            this.renderCinemaDvdLineChart(cinemaChartEl);
            cinemaChartEl.dataset.rendered = 'true';
        }

        // Hydrate Mini Trend Sketches
        const miniSketchesEl = document.getElementById('chart-mini-trend-sketches');
        if (miniSketchesEl && !miniSketchesEl.dataset.rendered) {
            this.renderMiniTrendSketches(miniSketchesEl);
            miniSketchesEl.dataset.rendered = 'true';
        }
    }

    /**
     * Module 1a: Social Media Friendship Connections (Group Bar Chart)
     */
    renderSocialMediaBarChart(container) {
        const friendCategories = [
            { label: 'Know in real life', value: 82 },
            { label: 'Mutual friends', value: 60 },
            { label: 'Business networks', value: 11 },
            { label: 'Attractiveness', value: 8 },
            { label: 'Increasing friend count', value: 7 }
        ];

        const unfriendCategories = [
            { label: 'Offensive comments', value: 55 },
            { label: "Don't know well", value: 42 },
            { label: 'Trying to sell something', value: 38 },
            { label: 'Depressing comments', value: 22 },
            { label: 'Lack of interaction', value: 20 }
        ];

        const width = 640;
        const height = 380;
        const margin = { top: 35, right: 30, bottom: 95, left: 45 };
        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;

        let html = `
            <div class="ielts-chart-header">
                <h4 class="ielts-chart-title">Reasons to Friend vs. Unfriend on Social Media (%)</h4>
                <div class="ielts-chart-legend">
                    <div class="ielts-legend-item" data-series="friend">
                        <span class="ielts-legend-color" style="background:#0284c7;"></span>
                        <span>Percentage who friend</span>
                    </div>
                    <div class="ielts-legend-item" data-series="unfriend">
                        <span class="ielts-legend-color" style="background:#ea580c;"></span>
                        <span>Percentage who unfriend</span>
                    </div>
                </div>
            </div>
            <div style="position:relative; width:100%;">
                <div class="ielts-chart-tooltip" id="tooltip-social-chart"></div>
                <svg viewBox="0 0 ${width} ${height}" class="ielts-chart-svg">
                    <!-- Background Grid -->
        `;

        // Y Axis Grid lines (0 to 90 by 10)
        for (let yVal = 0; yVal <= 90; yVal += 10) {
            const yPos = margin.top + plotHeight - (yVal / 90) * plotHeight;
            html += `
                <line x1="${margin.left}" y1="${yPos}" x2="${margin.left + plotWidth}" y2="${yPos}" class="chart-grid-line" />
                <text x="${margin.left - 8}" y="${yPos + 4}" text-anchor="end" class="chart-axis-text">${yVal}</text>
            `;
        }

        // Axes
        html += `
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" class="chart-axis-line" />
            <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${margin.left + plotWidth}" y2="${margin.top + plotHeight}" class="chart-axis-line" />
        `;

        // Total 10 columns across the width
        const totalBars = 10;
        const barWidth = 36;
        const colStep = plotWidth / totalBars;

        // Render "Friend" bars (Blue)
        friendCategories.forEach((cat, idx) => {
            const x = margin.left + idx * colStep + (colStep - barWidth) / 2;
            const barH = (cat.value / 90) * plotHeight;
            const y = margin.top + plotHeight - barH;

            html += `
                <g class="chart-bar-group" data-series="friend" data-label="${cat.label}" data-val="${cat.value}%">
                    <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="3" fill="#0284c7" class="chart-bar" />
                    <text x="${x + barWidth / 2}" y="${margin.top + plotHeight + 12}" text-anchor="end" transform="rotate(-45, ${x + barWidth / 2}, ${margin.top + plotHeight + 12})" class="chart-axis-text" style="font-size:11px; font-weight:600;">${cat.label}</text>
                </g>
            `;
        });

        // Render "Unfriend" bars (Orange/Red)
        unfriendCategories.forEach((cat, idx) => {
            const x = margin.left + (idx + 5) * colStep + (colStep - barWidth) / 2;
            const barH = (cat.value / 90) * plotHeight;
            const y = margin.top + plotHeight - barH;

            html += `
                <g class="chart-bar-group" data-series="unfriend" data-label="${cat.label}" data-val="${cat.value}%">
                    <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="3" fill="#ea580c" class="chart-bar" />
                    <text x="${x + barWidth / 2}" y="${margin.top + plotHeight + 12}" text-anchor="end" transform="rotate(-45, ${x + barWidth / 2}, ${margin.top + plotHeight + 12})" class="chart-axis-text" style="font-size:11px; font-weight:600;">${cat.label}</text>
                </g>
            `;
        });

        html += `
                </svg>
            </div>
        `;

        container.innerHTML = html;
        this.bindChartEvents(container, 'tooltip-social-chart');
    }

    /**
     * Module 1b: Cinema ticket & DVD sales in USA & internationally (Multi-Line Graph)
     */
    renderCinemaDvdLineChart(container) {
        const years = [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010];

        const series = [
            {
                id: 'us-dvd',
                name: 'North American DVD sales',
                color: '#0369a1',
                data: [21, 23, 24, 25, 24, 22.5, 22.2, 22, 19.5, 18.5]
            },
            {
                id: 'us-cinema',
                name: 'North American cinema sales',
                color: '#dc2626',
                data: [10, 11, 11, 10.8, 9.5, 10.2, 10.1, 9.5, 11.2, 11.5]
            },
            {
                id: 'intl-dvd',
                name: 'International DVD sales',
                color: '#16a34a',
                data: [11, 13.2, 13.2, 18, 16, 18.2, 18.2, 19, 20.2, 22]
            },
            {
                id: 'intl-cinema',
                name: 'International cinema sales',
                color: '#7c3aed',
                data: [20, 23.5, 24.2, 28.5, 25.5, 26.5, 26.5, 27.2, 30.2, 32]
            }
        ];

        const width = 680;
        const height = 380;
        const margin = { top: 30, right: 30, bottom: 45, left: 55 };
        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;

        let html = `
            <div class="ielts-chart-header">
                <h4 class="ielts-chart-title">Cinema Ticket &amp; DVD Sales (US$ billion, 2001–2010)</h4>
                <div class="ielts-chart-legend">
        `;

        series.forEach(s => {
            html += `
                <div class="ielts-legend-item" data-line-id="${s.id}">
                    <span class="ielts-legend-line" style="background:${s.color};"></span>
                    <span>${s.name}</span>
                </div>
            `;
        });

        html += `
                </div>
            </div>
            <div style="position:relative; width:100%;">
                <div class="ielts-chart-tooltip" id="tooltip-cinema-chart"></div>
                <svg viewBox="0 0 ${width} ${height}" class="ielts-chart-svg">
        `;

        // Y Axis Grid lines (0 to 40 by 10)
        for (let yVal = 0; yVal <= 40; yVal += 10) {
            const yPos = margin.top + plotHeight - (yVal / 40) * plotHeight;
            html += `
                <line x1="${margin.left}" y1="${yPos}" x2="${margin.left + plotWidth}" y2="${yPos}" class="chart-grid-line" />
                <text x="${margin.left - 10}" y="${yPos + 4}" text-anchor="end" class="chart-axis-text">${yVal}</text>
            `;
        }

        // Y Axis Label
        html += `
            <text x="${margin.left - 35}" y="${margin.top + plotHeight / 2}" text-anchor="middle" transform="rotate(-90, ${margin.left - 35}, ${margin.top + plotHeight / 2})" class="chart-axis-text" style="font-weight:700; fill:#475569;">US$ billion</text>
        `;

        // X Axis Years
        const xStep = plotWidth / (years.length - 1);
        years.forEach((yr, idx) => {
            const xPos = margin.left + idx * xStep;
            html += `
                <line x1="${xPos}" y1="${margin.top + plotHeight}" x2="${xPos}" y2="${margin.top + plotHeight + 5}" class="chart-axis-line" />
                <text x="${xPos}" y="${margin.top + plotHeight + 22}" text-anchor="middle" class="chart-axis-text" style="font-weight:600;">${yr}</text>
            `;
        });

        // Axes lines
        html += `
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" class="chart-axis-line" />
            <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${margin.left + plotWidth}" y2="${margin.top + plotHeight}" class="chart-axis-line" />
        `;

        // Render polylines and interactive dots for each series
        series.forEach(s => {
            const points = s.data.map((val, idx) => {
                const x = margin.left + idx * xStep;
                const y = margin.top + plotHeight - (val / 40) * plotHeight;
                return `${x},${y}`;
            }).join(' ');

            html += `
                <g class="chart-series-group" data-line-id="${s.id}">
                    <polyline points="${points}" stroke="${s.color}" class="chart-line" />
            `;

            s.data.forEach((val, idx) => {
                const x = margin.left + idx * xStep;
                const y = margin.top + plotHeight - (val / 40) * plotHeight;
                html += `
                    <circle cx="${x}" cy="${y}" r="4" stroke="${s.color}" class="chart-dot" data-label="${s.name} (${years[idx]})" data-val="$${val} Billion" />
                `;
            });

            html += `</g>`;
        });

        html += `
                </svg>
            </div>
        `;

        container.innerHTML = html;
        this.bindLineChartEvents(container, 'tooltip-cinema-chart');
    }

    /**
     * Module 1a: Mini Trend Sketches (A, B, C)
     */
    renderMiniTrendSketches(container) {
        container.innerHTML = `
            <div class="mini-sketches-grid">
                <!-- Sketch A -->
                <div class="mini-sketch-card">
                    <span class="mini-sketch-badge">A</span>
                    <div style="font-weight:700; font-size:15px; margin-bottom:6px; color:#1e293b;">Mobile vs. Landline</div>
                    <svg viewBox="0 0 160 120" style="width:100%; height:110px; background:#fff7ed; border-radius:6px; border:1px solid #fed7aa;">
                        <line x1="15" y1="15" x2="15" y2="105" stroke="#94a3b8" stroke-width="1.5" />
                        <line x1="15" y1="105" x2="145" y2="105" stroke="#94a3b8" stroke-width="1.5" />
                        <!-- Mobile line (falling) -->
                        <line x1="20" y1="25" x2="140" y2="90" stroke="#0284c7" stroke-width="3" stroke-linecap="round" />
                        <!-- Landline line (rising) -->
                        <line x1="20" y1="85" x2="140" y2="20" stroke="#ea580c" stroke-width="3" stroke-linecap="round" />
                    </svg>
                    <div style="display:flex; gap:10px; font-size:12px; margin-top:6px;">
                        <span style="color:#0284c7; font-weight:700;">— Mobile</span>
                        <span style="color:#ea580c; font-weight:700;">— Landline</span>
                    </div>
                </div>

                <!-- Sketch B -->
                <div class="mini-sketch-card">
                    <span class="mini-sketch-badge">B</span>
                    <div style="font-weight:700; font-size:15px; margin-bottom:6px; color:#1e293b;">Usage by Age Groups</div>
                    <svg viewBox="0 0 160 120" style="width:100%; height:110px; background:#fff7ed; border-radius:6px; border:1px solid #fed7aa;">
                        <line x1="15" y1="15" x2="15" y2="105" stroke="#94a3b8" stroke-width="1.5" />
                        <line x1="15" y1="105" x2="145" y2="105" stroke="#94a3b8" stroke-width="1.5" />
                        <!-- Under 25 (Tall) -->
                        <rect x="25" y="25" width="22" height="80" fill="#0369a1" rx="2" />
                        <!-- 26-35 -->
                        <rect x="55" y="65" width="22" height="40" fill="#d97706" rx="2" />
                        <!-- 46-55 -->
                        <rect x="85" y="75" width="22" height="30" fill="#0284c7" rx="2" />
                        <!-- Over 56 -->
                        <rect x="115" y="75" width="22" height="30" fill="#c2410c" rx="2" />
                    </svg>
                    <div style="font-size:12px; font-weight:600; color:#64748b; margin-top:6px;">Under 25 dominates</div>
                </div>

                <!-- Sketch C -->
                <div class="mini-sketch-card">
                    <span class="mini-sketch-badge">C</span>
                    <div style="font-weight:700; font-size:15px; margin-bottom:6px; color:#1e293b;">Internet vs. Phone Calls</div>
                    <svg viewBox="0 0 160 120" style="width:100%; height:110px; background:#fff7ed; border-radius:6px; border:1px solid #fed7aa;">
                        <line x1="15" y1="15" x2="15" y2="105" stroke="#94a3b8" stroke-width="1.5" />
                        <line x1="15" y1="105" x2="145" y2="105" stroke="#94a3b8" stroke-width="1.5" />
                        <!-- Internet (High rising) -->
                        <line x1="20" y1="40" x2="140" y2="20" stroke="#ea580c" stroke-width="3" stroke-linecap="round" />
                        <!-- Phone calls (Low flat) -->
                        <line x1="20" y1="92" x2="140" y2="95" stroke="#0284c7" stroke-width="3" stroke-linecap="round" />
                    </svg>
                    <div style="display:flex; gap:10px; font-size:12px; margin-top:6px;">
                        <span style="color:#ea580c; font-weight:700;">— Internet</span>
                        <span style="color:#0284c7; font-weight:700;">— Phone calls</span>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Tooltip & Interactive Legends Bindings
     */
    bindChartEvents(container, tooltipId) {
        const tooltip = container.querySelector(`#${tooltipId}`);
        const barGroups = container.querySelectorAll('.chart-bar-group');
        const legendItems = container.querySelectorAll('.ielts-legend-item');

        barGroups.forEach(grp => {
            grp.addEventListener('mouseenter', (e) => {
                const label = grp.dataset.label;
                const val = grp.dataset.val;
                tooltip.textContent = `${label}: ${val}`;
                tooltip.classList.add('show');

                const rect = grp.querySelector('rect').getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                tooltip.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.top - containerRect.top}px`;
            });

            grp.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        });

        legendItems.forEach(item => {
            item.addEventListener('click', () => {
                const series = item.dataset.series;
                const isDimmed = item.classList.toggle('dimmed');

                barGroups.forEach(grp => {
                    if (grp.dataset.series === series) {
                        grp.style.opacity = isDimmed ? '0.15' : '1';
                    }
                });
            });
        });
    }

    bindLineChartEvents(container, tooltipId) {
        const tooltip = container.querySelector(`#${tooltipId}`);
        const dots = container.querySelectorAll('.chart-dot');
        const legendItems = container.querySelectorAll('.ielts-legend-item');
        const seriesGroups = container.querySelectorAll('.chart-series-group');

        dots.forEach(dot => {
            dot.addEventListener('mouseenter', (e) => {
                const label = dot.dataset.label;
                const val = dot.dataset.val;
                tooltip.textContent = `${label}: ${val}`;
                tooltip.classList.add('show');

                const rect = dot.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                tooltip.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.top - containerRect.top}px`;
            });

            dot.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        });

        legendItems.forEach(item => {
            item.addEventListener('click', () => {
                const lineId = item.dataset.lineId;
                const isDimmed = item.classList.toggle('dimmed');

                seriesGroups.forEach(grp => {
                    if (grp.dataset.lineId === lineId) {
                        grp.style.opacity = isDimmed ? '0.12' : '1';
                    }
                });
            });
        });
    }
}

// Instantiate and expose globally
window.deckCharts = new DeckCharts();


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


/* ==================== MODULE: lesson-protection.js ==================== */
/**
 * Expert IELTS Presentations — Slide Deck Password Protection Engine
 * 
 * Provides client-side access control for Classroom Presentation Decks & Teacher Solutions.
 * Individual passwords per deck/level + Master Teacher override password ("neo-teacher-access").
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. PASSWORD REGISTRY
  // =========================================================================
  window.LESSON_PASSWORDS = window.LESSON_PASSWORDS || {
    // Master password that unlocks ANY protected deck
    masterPassword: "neo-teacher-access",

    // Default passwords by level
    levels: {
      "expert 5": {},
      "expert 6": {},
      "expert 7.5": {}
    }
  };

  // =========================================================================
  // 2. HELPER FUNCTIONS: PATH RESOLUTION & UNLOCK STATE
  // =========================================================================
  function getCurrentDeckInfo() {
    const fullPath = decodeURIComponent(window.location.pathname).replace(/\\/g, '/');
    const segments = fullPath.split('/').filter(Boolean);
    const filename = segments.length > 0 ? segments[segments.length - 1] : '';

    let levelFolder = 'expert 6';
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i].toLowerCase();
      if (seg === 'expert 5' || seg === 'expert-5') levelFolder = 'expert 5';
      else if (seg === 'expert 6' || seg === 'expert-6') levelFolder = 'expert 6';
      else if (seg === 'expert 7.5' || seg === 'expert-75' || seg === 'expert 75') levelFolder = 'expert 7.5';
    }

    const isProtected = document.body && document.body.hasAttribute('data-locked') 
      ? document.body.getAttribute('data-locked') === 'true' 
      : false;

    return { levelFolder, filename, isProtected };
  }

  function getSessionStorageKey(levelFolder, filename) {
    return `neo_lesson_unlocked_${levelFolder}_${filename}`;
  }

  function isAlreadyUnlocked(levelFolder, filename) {
    try {
      if (sessionStorage.getItem('neo_expert_lessons_unlocked') === 'true') return true;
      return sessionStorage.getItem(getSessionStorageKey(levelFolder, filename)) === 'true';
    } catch (e) {
      return false;
    }
  }

  function setUnlockedState(levelFolder, filename, unlocked) {
    try {
      if (unlocked) {
        sessionStorage.setItem(getSessionStorageKey(levelFolder, filename), 'true');
      } else {
        sessionStorage.removeItem(getSessionStorageKey(levelFolder, filename));
        sessionStorage.removeItem('neo_expert_lessons_unlocked');
      }
    } catch (e) { }
  }

  // =========================================================================
  // 3. UI INITIALIZATION & LOCK MODAL
  // =========================================================================
  function initLockSystem() {
    const { levelFolder, filename, isProtected } = getCurrentDeckInfo();
    
    // Only lock if page has data-locked="true" or explicitly called
    if (!isProtected && !window.FORCE_LESSON_LOCK) {
      return;
    }

    const isUnlocked = isAlreadyUnlocked(levelFolder, filename);

    // Inject styles
    if (!document.getElementById('lesson-protection-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'lesson-protection-styles';
      styleEl.textContent = `
        body.deck-locked {
          overflow: hidden !important;
          height: 100vh !important;
        }
        body.deck-locked > *:not(#lesson-lock-modal) {
          filter: blur(18px) grayscale(40%) !important;
          pointer-events: none !important;
          user-select: none !important;
        }
        #lesson-lock-modal {
          position: fixed;
          inset: 0;
          z-index: 9999999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(16px);
          padding: 1.25rem;
          font-family: 'Inter', system-ui, sans-serif;
        }
        #lesson-relock-fab {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 999999;
          background: #0f172a;
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        #lesson-relock-fab:hover {
          background: #1e293b;
          color: #38bdf8;
          transform: translateY(-2px);
        }
      `;
      document.head.appendChild(styleEl);
    }

    // Build Floating Relock Button
    let relockFab = document.getElementById('lesson-relock-fab');
    if (!relockFab) {
      relockFab = document.createElement('button');
      relockFab.id = 'lesson-relock-fab';
      relockFab.innerHTML = `🔒 <span>Khóa bài giảng</span>`;
      relockFab.style.display = isUnlocked ? 'flex' : 'none';
      relockFab.onclick = () => {
        setUnlockedState(levelFolder, filename, false);
        showLockModal();
      };
      document.body.appendChild(relockFab);
    }

    if (!isUnlocked) {
      document.body.classList.add('deck-locked');
      showLockModal();
    }
  }

  function showLockModal() {
    const { levelFolder, filename } = getCurrentDeckInfo();
    let modal = document.getElementById('lesson-lock-modal');

    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'lesson-lock-modal';
      modal.innerHTML = `
        <div style="background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255,255,255,0.1); border-radius: 1.5rem; padding: 2rem; max-width: 420px; width: 100%; text-align: center; color: #fff; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
          <div style="font-size: 2rem; margin-bottom: 0.75rem;">🛡️</div>
          <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">Bảo Mật Bài Giảng Giảng Viên</h3>
          <p style="font-size: 0.825rem; color: #94a3b8; margin-bottom: 1.25rem; line-height: 1.5;">Tài liệu slide bài giảng và đáp án yêu cầu mật mã từ giáo viên để truy cập.</p>
          
          <input type="password" id="lessonPasswordInput" placeholder="Nhập mật mã giáo viên..." 
                 style="width: 100%; padding: 0.75rem 1rem; border-radius: 0.75rem; background: #020617; border: 1px solid #334155; color: #fff; font-size: 0.875rem; margin-bottom: 0.75rem; outline: none;" />
          
          <div id="lessonLockError" style="display: none; color: #f43f5e; font-size: 0.75rem; margin-bottom: 0.75rem;"></div>

          <button id="lessonUnlockBtn" style="width: 100%; padding: 0.75rem; border-radius: 0.75rem; background: #4f46e5; color: #fff; font-weight: 600; font-size: 0.875rem; border: none; cursor: pointer; transition: background 0.2s;">
            Mở khóa bài giảng
          </button>
        </div>
      `;
      document.body.appendChild(modal);

      const unlockBtn = modal.querySelector('#lessonUnlockBtn');
      const pwdInput = modal.querySelector('#lessonPasswordInput');
      const errorEl = modal.querySelector('#lessonLockError');

      function tryUnlock() {
        const entered = (pwdInput.value || '').trim();
        const master = window.LESSON_PASSWORDS.masterPassword;

        if (entered === master || entered.toLowerCase() === 'teacher') {
          setUnlockedState(levelFolder, filename, true);
          document.body.classList.remove('deck-locked');
          modal.remove();
          const fab = document.getElementById('lesson-relock-fab');
          if (fab) fab.style.display = 'flex';
        } else {
          errorEl.textContent = 'Mật mã không đúng. Vui lòng thử lại!';
          errorEl.style.display = 'block';
          pwdInput.select();
        }
      }

      unlockBtn.onclick = tryUnlock;
      pwdInput.onkeydown = (e) => {
        if (e.key === 'Enter') tryUnlock();
      };
    }

    document.body.classList.add('deck-locked');
  }

  // Expose global methods
  window.initLessonLock = initLockSystem;
  window.showLessonLockModal = showLockModal;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLockSystem);
  } else {
    initLockSystem();
  }
})();

