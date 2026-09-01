/**
 * DeckEngine Core Module
 * Handles 1920x1080 stage scaling, slide lifecycle, keyboard/touch navigation,
 * font scaling, and core exercise verification/reveal logic.
 */
class DeckEngine {
    constructor() {
        this.slides = Array.from(document.querySelectorAll('.slide'));
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
        this.setupSyncListeners();

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

    /**
     * Resolves a container argument to a concrete HTMLElement.
     * Accepts: null (→ active slide), string ID, button element, or any HTMLElement.
     */
    _resolveContainer(container) {
        if (!container) return document.querySelector('.slide.active');
        if (typeof container === 'string') return document.getElementById(container);
        if (container instanceof HTMLElement && container.tagName === 'BUTTON') {
            return container.closest('.question-pane') ||
                   container.closest('.slide') ||
                   container.closest('.notebook') ||
                   container;
        }
        return container;
    }

    /**
     * Normalizes an answer string: lowercases, trims, converts curly quotes/apostrophes.
     * Used for answer checking across all exercise types.
     */
    static normalizeStr(str) {
        if (!str) return '';
        return str.trim().toLowerCase()
            .replace(/[\u2018\u2019\u0060\u00B4]/g, "'")
            .replace(/[\u201C\u201D]/g, '"')
            .replace(/\s+/g, ' ');
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

    applyAspectRatio(ratio, showToast = true, broadcast = true) {
        this.aspectRatio = ratio;
        document.documentElement.setAttribute('data-aspect', ratio);
        localStorage.setItem('deck_aspect_ratio', ratio);
        if (this.scaleStage) this.scaleStage();

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('ASPECT_RATIO', { ratio });
        }

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
            if (document.documentElement.classList.contains('presenter-window') || (document.body && document.body.classList.contains('presenter-window'))) {
                return;
            }
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
            } else if (e.shiftKey && (e.key === 'r' || e.key === 'R')) {
                e.preventDefault();
                this.showSlide(0);
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

    showSlide(index, broadcast = true) {
        if (index < 0 || index >= this.slides.length) return;
        if (this.currentSlide === index && this.slides[index] && this.slides[index].classList.contains('active')) {
            return;
        }

        // Only toggle the two affected slides instead of iterating all
        const prevSlide = this.slides[this.currentSlide];
        const nextSlide = this.slides[index];
        if (prevSlide) {
            prevSlide.classList.remove('active', 'visible');
        }
        if (nextSlide) {
            nextSlide.classList.add('active', 'visible');
        }
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

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('NAVIGATE_SLIDE', { slideIndex: index });
        }

        window.dispatchEvent(new CustomEvent('slidechanged', {
            detail: { index, slide: this.slides[index], broadcast }
        }));

        // Update URL hash for bookmark/share support (without triggering scroll)
        const slideId = this.slides[index].id || `slide-${index + 1}`;
        history.replaceState(null, '', `#${slideId}`);
    }

    toggleBlackout(force = null) {
        if (window.presentationSpotlight) {
            if (force === true) {
                window.presentationSpotlight.isBlackout = false;
                window.presentationSpotlight.toggleBlackout();
            } else if (force === false) {
                window.presentationSpotlight.clearMute();
            } else {
                window.presentationSpotlight.toggleBlackout();
            }
        }
    }

    toggleWhiteout(force = null) {
        if (window.presentationSpotlight) {
            if (force === true) {
                window.presentationSpotlight.isWhiteout = false;
                window.presentationSpotlight.toggleWhiteout();
            } else if (force === false) {
                window.presentationSpotlight.clearMute();
            } else {
                window.presentationSpotlight.toggleWhiteout();
            }
        }
    }

    clearScreenCover() {
        if (window.presentationSpotlight) {
            window.presentationSpotlight.clearMute();
        }
    }

    /**
     * Universal Content Auto-Fitter & Spacer
     * Automatically scales up and spaces content when there is excess blank space,
     * or scales down when content overflows.
     */
    autoFitSlide(slide) {
        if (!slide) return;
        const notebook = slide.querySelector('.notebook, .title-notebook');
        const pageContent = slide.querySelector('.page-content, .title-notebook');
        if (!notebook || !pageContent) return;

        // Skip section divider and title slides which have fixed layouts
        if (slide.dataset.skill === 'title' || slide.dataset.skill === 'section' || slide.querySelector('.section-slide')) {
            return;
        }

        // Measure and optimize in animation frames
        requestAnimationFrame(() => {
            // ── Batch 1: Reset prior state (writes) ──────────────────────────────
            slide.style.removeProperty('--font-scale');
            slide.style.removeProperty('--line-height-auto');
            slide.classList.remove('slide-spacious');
            pageContent.style.removeProperty('transform');
            pageContent.style.removeProperty('transform-origin');
            pageContent.style.removeProperty('height');

            // ── Batch 2: Read layout (single reflow) ─────────────────────────────
            const availableHeight = notebook.clientHeight - 36;
            const scrollH = pageContent.scrollHeight;

            // ── Batch 3: Write computed values (no further reads) ─────────────────
            if (scrollH > availableHeight + 8) {
                // OVERFLOW: scale down gracefully to prevent clipping
                const fitRatio = Math.max(0.68, (availableHeight - 12) / scrollH);
                pageContent.style.transform = `scale(${fitRatio.toFixed(3)})`;
                pageContent.style.transformOrigin = 'top center';
                pageContent.style.height = `${(availableHeight / fitRatio).toFixed(1)}px`;
            } else if (scrollH < availableHeight * 0.78) {
                // UNDERFLOW: expand font + spacing to fill spare space
                const heightRatio = availableHeight / Math.max(1, scrollH);
                const autoFontScale = Math.min(1.28, Math.max(1.0, 1 + (heightRatio - 1) * 0.32));
                const autoLineHeight = Math.min(2.0, Math.max(1.65, 1.65 + (heightRatio - 1) * 0.28));
                slide.style.setProperty('--font-scale', (this.fontScale * autoFontScale).toFixed(2));
                slide.style.setProperty('--line-height-auto', autoLineHeight.toFixed(2));
                slide.classList.add('slide-spacious');
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
        this.showToastNotification(`Font Size: ${Math.round(this.fontScale * 100)}%`);
    }

    setupSyncListeners() {
        if (!window.presenterSyncEngine) {
            // Retry once after a tick — sync engine loads after DeckEngine in module order
            setTimeout(() => this.setupSyncListeners(), 50);
            return;
        }
        if (this._syncListenersBound) return;
        this._syncListenersBound = true;

        window.presenterSyncEngine.on('EXERCISE_ACTION', (data) => {
            if (!data) return;
            const target = data.containerId ? document.getElementById(data.containerId) : (this.slides[data.slideIndex] || document.querySelector('.slide.active'));
            if (!target) return;

            if (data.action === 'check') {
                this.checkAnswers(target, false);
            } else if (data.action === 'reveal') {
                this.revealKeys(target, false);
            } else if (data.action === 'reset') {
                this.resetTask(target, false);
            } else if (data.action === 'toggleOptCard' && typeof data.cardIndex === 'number') {
                const card = target.querySelectorAll('.opt-card')[data.cardIndex];
                if (card) this.toggleOptCard(card, false);
            } else if (data.action === 'toggleExplanations') {
                this.toggleExplanations(target, false);
            } else if (data.action === 'highlightAll' && window.readingHighlighter) {
                window.readingHighlighter.highlightAll(data.containerId, false);
            }

            // If in presenter window, refresh preview clone
            if (window.presenterViewUI && typeof window.presenterViewUI.updatePresenterSlideView === 'function') {
                window.presenterViewUI.updatePresenterSlideView();
            }
        });
    }

    checkAnswers(container, broadcast = true) {
        const rawContainerId = typeof container === 'string' ? container : (container?.id || null);
        container = this._resolveContainer(container);
        if (!container) return;

        const normalizeStr = DeckEngine.normalizeStr;

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
        const slideContext = container.closest('.slide') || document.querySelector('.slide.active') || container;
        slideContext.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.add('active-syn'));
        slideContext.querySelectorAll('mark.evidence').forEach(m => m.classList.add('highlighted'));

        // Check category sorter exercises
        if (window.categorySorter) {
            const catResult = window.categorySorter.checkAnswers(container);
            if (catResult.total > 0) {
                this.showToastNotification(`✅ ${catResult.correct} / ${catResult.total} categorized correctly`);
            }
        }

        // Check matching pairs exercises
        if (window.matchingPairsEngine) {
            const matchResult = window.matchingPairsEngine.checkAnswers(container);
            if (matchResult.total > 0) {
                this.showToastNotification(`✅ ${matchResult.correct} / ${matchResult.total} matched correctly`);
            }
        }

        // Check choice / TFNG pills
        if (window.choiceSelectorEngine) {
            const choiceResult = window.choiceSelectorEngine.checkAnswers(container);
            if (choiceResult.total > 0) {
                this.showToastNotification(`✅ ${choiceResult.correct} / ${choiceResult.total} choices correct`);
            }
        }

        // Check sentence scramble exercises
        if (window.sentenceScrambleEngine) {
            const scrambleResult = window.sentenceScrambleEngine.checkAnswers(container);
            if (scrambleResult.total > 0) {
                this.showToastNotification(`✅ ${scrambleResult.correct} / ${scrambleResult.total} sentences correct`);
            }
        }

        // Show score toast for standard inputs
        const allInputs = container.querySelectorAll('.blank-input[data-ans], .select-input[data-ans]');
        if (allInputs.length > 0) {
            const correctCount = container.querySelectorAll('.blank-input.correct, .select-input.correct').length;
            this.showToastNotification(`✅ ${correctCount} / ${allInputs.length} correct`);
        }

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EXERCISE_ACTION', {
                action: 'check',
                containerId: rawContainerId || container.id || null,
                slideIndex: this.currentSlide
            });
        }
    }

    revealKeys(container, broadcast = true) {
        const rawContainerId = typeof container === 'string' ? container : (container?.id || null);
        container = this._resolveContainer(container);
        if (!container) return;

        if (window.categorySorter) {
            window.categorySorter.revealKeys(container);
        }
        if (window.matchingPairsEngine) {
            window.matchingPairsEngine.revealKeys(container);
        }
        if (window.choiceSelectorEngine) {
            window.choiceSelectorEngine.revealKeys(container);
        }
        if (window.sentenceScrambleEngine) {
            window.sentenceScrambleEngine.revealKeys(container);
        }

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
                // Use first valid answer variant for pipe-separated alternatives
                const firstAnswer = select.dataset.ans.split('|')[0].trim();
                select.value = firstAnswer;
                select.classList.remove('wrong', 'incorrect');
                select.classList.add('correct');
            }
        });

        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.add('show'));
        const slideContext = container.closest('.slide') || document.querySelector('.slide.active') || container;
        slideContext.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.add('active-syn'));
        slideContext.querySelectorAll('.vocab-word, .vocab-term').forEach(v => v.classList.add('active-vocab'));
        slideContext.querySelectorAll('mark.evidence').forEach(m => m.classList.add('highlighted'));
        if (window.vocabBank) {
            window.vocabBank.updateChipStates(container);
        }
        if (window.dragGapfillEngine) {
            window.dragGapfillEngine.syncBankChips(container);
        }

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EXERCISE_ACTION', {
                action: 'reveal',
                containerId: rawContainerId || container.id || null,
                slideIndex: this.currentSlide
            });
        }
    }

    // ─────────────────────────────────────────────────────────────
    // Alias methods for backward-compatible template onclick="" calls
    // All delegate to the canonical checkAnswers/revealKeys/resetTask
    // ─────────────────────────────────────────────────────────────
    revealAnswers(container, broadcast = true) {
        this.revealKeys(container, broadcast);
    }

    resetTask(container, broadcast = true) {
        const rawContainerId = typeof container === 'string' ? container : (container?.id || null);
        container = this._resolveContainer(container);
        if (!container) return;

        if (window.categorySorter) {
            window.categorySorter.resetTask(container);
        }
        if (window.matchingPairsEngine) {
            window.matchingPairsEngine.resetTask(container);
        }
        if (window.choiceSelectorEngine) {
            window.choiceSelectorEngine.resetTask(container);
        }
        if (window.sentenceScrambleEngine) {
            window.sentenceScrambleEngine.resetTask(container);
        }

        container.querySelectorAll('.blank-input, .select-input').forEach(input => {
            input.value = '';
            input.classList.remove('correct', 'wrong', 'incorrect');
            if (input.classList.contains('blank-input') && window.DeckComponents?.autoResizeBlank) {
                DeckComponents.autoResizeBlank(input);
            }
        });

        if (window.dragGapfillEngine) {
            window.dragGapfillEngine.syncBankChips(container);
        }

        container.querySelectorAll('.item-explanation').forEach(exp => exp.classList.remove('show'));
        const slideContext = container.closest('.slide') || document.querySelector('.slide.active') || document;
        slideContext.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3').forEach(s => s.classList.remove('active-syn'));
        slideContext.querySelectorAll('.vocab-word, .vocab-term').forEach(v => v.classList.remove('active-vocab'));
        slideContext.querySelectorAll('mark.evidence').forEach(m => m.classList.remove('highlighted', 'glow-pulse'));
        slideContext.querySelectorAll('.card, .q-card').forEach(c => c.classList.remove('revealed'));
        if (window.vocabBank) {
            window.vocabBank.updateChipStates(container);
        }

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EXERCISE_ACTION', {
                action: 'reset',
                containerId: rawContainerId || container.id || null,
                slideIndex: this.currentSlide
            });
        }
    }

    resetAnswers(container, broadcast = true) {
        this.resetTask(container, broadcast);
    }

    checkBlanks(containerId, broadcast = true) {
        this.checkAnswers(containerId, broadcast);
    }

    revealBlanks(containerId, broadcast = true) {
        this.revealKeys(containerId, broadcast);
    }

    resetBlanks(containerId, broadcast = true) {
        this.resetTask(containerId, broadcast);
    }

    checkSelects(containerId, broadcast = true) {
        this.checkAnswers(containerId, broadcast);
    }

    revealSelects(containerId, broadcast = true) {
        this.revealKeys(containerId, broadcast);
    }

    resetSelects(containerId, broadcast = true) {
        this.resetTask(containerId, broadcast);
    }

    toggleOptCard(card, broadcast = true) {
        card.classList.toggle('selected');
        if (broadcast && window.presenterSyncEngine) {
            const slide = card.closest('.slide') || document.querySelector('.slide.active');
            const allCards = Array.from(slide ? slide.querySelectorAll('.opt-card') : []);
            const cardIndex = allCards.indexOf(card);
            window.presenterSyncEngine.emit('EXERCISE_ACTION', {
                action: 'toggleOptCard',
                slideIndex: this.currentSlide,
                cardIndex
            });
        }
    }

    checkMultiOpts(containerId, broadcast = true) {
        const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
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
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EXERCISE_ACTION', {
                action: 'check',
                containerId: container.id || null,
                slideIndex: this.currentSlide
            });
        }
    }

    revealMultiOpts(containerId, broadcast = true) {
        const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
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
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EXERCISE_ACTION', {
                action: 'reveal',
                containerId: container.id || null,
                slideIndex: this.currentSlide
            });
        }
    }

    resetMultiOpts(containerId, broadcast = true) {
        const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
        if (!container) return;
        const cards = container.querySelectorAll('.opt-card');
        cards.forEach(card => {
            card.classList.remove('selected', 'correct-opt', 'wrong-opt');
        });
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EXERCISE_ACTION', {
                action: 'reset',
                containerId: container.id || null,
                slideIndex: this.currentSlide
            });
        }
    }

    toggleExplanations(containerId, broadcast = true) {
        let container;
        if (containerId instanceof HTMLElement) {
            container = containerId.closest('.page-content') || containerId.closest('.slide') || document.querySelector('.slide.active');
        } else if (typeof containerId === 'string') {
            container = document.getElementById(containerId);
        } else {
            container = document.querySelector('.slide.active');
        }
        if (!container) return;
        const explanations = container.querySelectorAll('.item-explanation');
        explanations.forEach(exp => exp.classList.toggle('show'));

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EXERCISE_ACTION', {
                action: 'toggleExplanations',
                containerId: container.id || null,
                slideIndex: this.currentSlide
            });
        }
    }

    toggleSynonymExplanation(qKey, evId, broadcast = true) {
        if (window.readingHighlighter) {
            window.readingHighlighter.focusEvidence(qKey, evId, broadcast);
            return;
        }

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

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('EVIDENCE_FOCUS', {
                qKey,
                evId,
                active: !isCurrentlyActive
            });
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

    toggleAllHighlights(target) {
        const slide = target ? (target.closest('.slide') || target.closest('.page-content') || target.closest('.notebook')) : document.querySelector('.slide.active');
        if (!slide) return;
        const syns = slide.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3, .vocab-word');
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
        slide.querySelectorAll('.q-card').forEach(c => {
            if (isAnyActive) c.classList.remove('revealed');
            else c.classList.add('revealed');
        });
    }

    resetStrategySlide(target) {
        const slide = target ? (target.closest('.slide') || target.closest('.page-content') || target.closest('.notebook')) : document.querySelector('.slide.active');
        if (!slide) return;
        slide.querySelectorAll('.syn-pair-1, .syn-pair-2, .syn-pair-3, .vocab-word, .vocab-term').forEach(s => {
            s.classList.remove('active-syn', 'active-vocab');
        });
        slide.querySelectorAll('.q-card').forEach(c => c.classList.remove('revealed'));
    }

    toggleVocabHighlight(target) {
        const slide = target ? (target.closest('.slide') || target.closest('.page-content') || target.closest('.notebook')) : document.querySelector('.slide.active');
        if (!slide) return;
        const vocabs = slide.querySelectorAll('.vocab-word, .vocab-term, .word-chip, .vocab-chip');
        if (vocabs.length === 0) return;
        const isAnyActive = Array.from(vocabs).some(v => v.classList.contains('active-vocab'));
        
        vocabs.forEach(v => {
            if (isAnyActive) {
                v.classList.remove('active-vocab');
            } else {
                v.classList.add('active-vocab');
            }
        });

        if (window.toast) {
            window.toast.info(isAnyActive ? 'Vocabulary highlights hidden' : 'Vocabulary highlights revealed', {
                duration: 2000
            });
        }
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
window.toggleAllHighlights = (target) => (window.deckEngine ? window.deckEngine.toggleAllHighlights(target) : null);
window.toggleVocabHighlight = (target) => (window.deckEngine ? window.deckEngine.toggleVocabHighlight(target) : null);
window.resetStrategySlide = (target) => (window.deckEngine ? window.deckEngine.resetStrategySlide(target) : null);
window.switchHighLineTab = (tab) => (window.deckEngine ? window.deckEngine.switchHighLineTab(tab) : null);
window.jumpToSlide = (idx) => (window.deckEngine ? window.deckEngine.jumpToSlide(idx) : null);
window.jumpToSkill = (skill) => (window.deckEngine ? window.deckEngine.jumpToSkill(skill) : null);
window.normalizeAnswerStr = DeckEngine.normalizeStr;

window.addEventListener('DOMContentLoaded', () => {
    if (!window.deckEngine) {
        window.deckEngine = new DeckEngine();
    }
    if (window.DeckComponents) {
        DeckComponents.init();
    }
});
