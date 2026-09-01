/**
 * ==========================================================================
 * CANVA-STYLE PRESENTER COCKPIT UI (PresenterViewUI)
 * State-of-the-art dual-screen presentation interface for IELTS teachers:
 * - Real-time slide stage preview with responsive aspect-ratio scaling
 * - Full Teacher Toolkit (Socratic actions, timer, theme switcher, blanking)
 * - Filmstrip thumbnail navigation with active auto-scroll
 * - Seamless integration with PresenterSyncEngine, PresenterDrawingEngine, and PresenterNotesEngine
 * ==========================================================================
 */

class PresenterViewUI {
    constructor(syncEngine) {
        this.sync = syncEngine || window.presenterSyncEngine;
        this.isPresenter = this.checkIfPresenterMode();
        this.elapsedSeconds = 0;
        this.elapsedInterval = null;
        this.isStopwatchRunning = true;
        this.clockInterval = null;
        this.notesFontSize = parseInt(localStorage.getItem('cp_notes_font_size') || '16', 10);
        this.activeTab = 'notes'; // 'notes' | 'toolkit'
        
        // Active Tool Modes: 'none' | 'laser' | 'pen' | 'highlighter'
        this.activeToolMode = 'none';
        this.laserActive = false;
        this.penActive = false;
        this.highlighterActive = false;

        // Tool Properties
        this.penColor = '#ef4444';
        this.penWidth = 3.5;
        this.highlighterColorIndex = 0;
        this.highlighterColors = [
            { name: 'Yellow', bg: 'rgba(254, 240, 138, 0.85)', hex: '#facc15', border: '#ca8a04' },
            { name: 'Green',  bg: 'rgba(187, 247, 208, 0.85)', hex: '#4ade80', border: '#16a34a' },
            { name: 'Cyan',   bg: 'rgba(186, 230, 253, 0.85)', hex: '#38bdf8', border: '#0284c7' },
            { name: 'Pink',   bg: 'rgba(251, 207, 232, 0.85)', hex: '#f472b6', border: '#db2777' }
        ];

        this.isBlackout = false;
        this.isWhiteout = false;
        this.isSpotlight = false;
        this.isHandlingRemoteNavigation = false;
        this.presenterWindowRef = null;

        this.init();
    }

    checkIfPresenterMode() {
        const params = new URLSearchParams(window.location.search);
        return params.get('presenter') === 'true' || window.location.hash.toLowerCase() === '#presenter';
    }

    init() {
        if (this.isPresenter) {
            document.documentElement.classList.add('presenter-window');
            if (document.body) {
                document.body.classList.add('presenter-window');
            }
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    document.body.classList.add('presenter-window');
                    this.buildPresenterCockpit();
                });
            } else {
                this.buildPresenterCockpit();
            }

            window.addEventListener('resize', () => {
                this.updatePresenterSlideView();
            });
        } else {
            this.setupAudienceSyncListener();
        }

        // Global shortcut Alt+P or Shift+O to open presenter view
        document.addEventListener('keydown', (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
            if ((e.altKey && (e.key === 'p' || e.key === 'P')) || (e.key === 'O' && e.shiftKey)) {
                e.preventDefault();
                this.openPresenterWindow();
            }
        });
    }

    openPresenterWindow() {
        const url = new URL(window.location.href);
        url.searchParams.set('presenter', 'true');
        const windowName = 'ielts_presenter_view_' + window.location.pathname.replace(/[^a-zA-Z0-9]/g, '_');
        const presenterWindow = window.open(
            url.toString(),
            windowName,
            'width=1380,height=880,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes'
        );
        if (presenterWindow) {
            this.presenterWindowRef = presenterWindow;
            presenterWindow.focus();
        } else {
            alert('Popup was blocked by your browser. Please allow popups for Presenter View.');
        }
    }

    /**
     * =========================================================================
     * AUDIENCE WINDOW SYNC LISTENERS
     * =========================================================================
     */
    setupAudienceSyncListener() {
        // Automatically close Presenter View if Audience Window closes
        const closePresenter = () => {
            try {
                this.sync.emit('HOST_CLOSED', {});
            } catch (e) {}
            try {
                if (this.presenterWindowRef && !this.presenterWindowRef.closed) {
                    this.presenterWindowRef.close();
                }
            } catch (e) {}
        };
        window.addEventListener('beforeunload', closePresenter);
        window.addEventListener('pagehide', closePresenter);
        window.addEventListener('unload', closePresenter);

        // When audience view receives sync request, reply with complete current state
        this.sync.on('SYNC_REQUEST', () => {
            this.broadcastCurrentAudienceState();
        });

        // Remote slide navigation from presenter
        this.sync.on('NAVIGATE_SLIDE', (data) => {
            if (window.deckEngine && typeof data.slideIndex === 'number') {
                if (window.deckEngine.currentSlide !== data.slideIndex) {
                    this.isHandlingRemoteNavigation = true;
                    window.deckEngine.showSlide(data.slideIndex, false);
                    setTimeout(() => { this.isHandlingRemoteNavigation = false; }, 80);
                }
            }
        });

        // Remote Laser
        this.sync.on('LASER_STATE', (data) => {
            if (window.laserPointer) {
                if (data.active && !window.laserPointer.isActive) window.laserPointer.activate(false);
                if (!data.active && window.laserPointer.isActive) window.laserPointer.deactivate(false);
            }
        });

        this.sync.on('LASER_MOVE', (data) => {
            if (window.laserPointer && window.laserPointer.dot) {
                const x = data.normX * window.innerWidth;
                const y = data.normY * window.innerHeight;
                window.laserPointer.dot.style.left = `${x}px`;
                window.laserPointer.dot.style.top = `${y}px`;
            }
        });

        // Remote Pen
        this.sync.on('PEN_STATE', (data) => {
            if (window.penAnnotation) {
                if (data.active && !window.penAnnotation.isActive) window.penAnnotation.activate(false);
                if (!data.active && window.penAnnotation.isActive) window.penAnnotation.deactivate(false);
            }
        });

        this.sync.on('PEN_DRAW', (data) => {
            if (window.penAnnotation && window.penAnnotation.ctx) {
                const ctx = window.penAnnotation.ctx;
                const stroke = data.stroke;
                if (stroke && stroke.length >= 2) {
                    ctx.beginPath();
                    ctx.moveTo(stroke[0].normX * window.innerWidth, stroke[0].normY * window.innerHeight);
                    for (let i = 1; i < stroke.length; i++) {
                        ctx.lineTo(stroke[i].normX * window.innerWidth, stroke[i].normY * window.innerHeight);
                    }
                    ctx.strokeStyle = data.color || '#ef4444';
                    ctx.lineWidth = data.width || 3.5;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    ctx.stroke();
                }
            }
        });

        this.sync.on('PEN_CLEAR', () => {
            if (window.penAnnotation) window.penAnnotation.clear(false);
        });

        // Remote Highlighter Sync
        this.sync.on('HIGHLIGHTER_STATE', (data) => {
            if (window.teacherHighlighter && typeof data.active === 'boolean') {
                if (window.teacherHighlighter.isActive !== data.active) {
                    window.teacherHighlighter.toggle(false);
                }
                if (typeof data.colorIndex === 'number') {
                    window.teacherHighlighter.setColor(data.colorIndex, false);
                }
            }
        });
        this.sync.on('HIGHLIGHTER_COLOR', (data) => {
            if (window.teacherHighlighter && typeof data.colorIndex === 'number') {
                window.teacherHighlighter.setColor(data.colorIndex, false);
            }
        });
        this.sync.on('HIGHLIGHTER_CLEAR', () => {
            if (window.teacherHighlighter) window.teacherHighlighter.clear(false);
        });
        this.sync.on('HIGHLIGHTER_UNDO', (data) => {
            if (window.teacherHighlighter) window.teacherHighlighter.undo(false);
        });
        this.sync.on('HIGHLIGHTER_ADD', (data) => {
            if (window.teacherHighlighter) window.teacherHighlighter.applyRemoteHighlight(data);
        });

        // Remote Evidence Focus / Clear
        this.sync.on('EVIDENCE_FOCUS', (data) => {
            if (window.readingHighlighter && data && (data.qKey || data.evId)) {
                window.readingHighlighter.focusEvidence(data.qKey, data.evId, false);
            }
        });
        this.sync.on('EVIDENCE_CLEAR', (data) => {
            if (window.readingHighlighter) {
                window.readingHighlighter.clearAll(data?.containerId, false);
            }
        });

        // Remote Exercise Actions
        this.sync.on('EXERCISE_ACTION', (data) => {
            if (!data || !window.deckEngine) return;
            const target = data.containerId ? document.getElementById(data.containerId) : (window.deckEngine.slides[data.slideIndex] || document.querySelector('.slide.active'));
            if (!target) return;

            if (data.action === 'check') {
                window.deckEngine.checkAnswers(target, false);
            } else if (data.action === 'reveal') {
                window.deckEngine.revealKeys(target, false);
            } else if (data.action === 'reset') {
                window.deckEngine.resetTask(target, false);
            } else if (data.action === 'toggleOptCard' && typeof data.cardIndex === 'number') {
                const card = target.querySelectorAll('.opt-card')[data.cardIndex];
                if (card) window.deckEngine.toggleOptCard(card, false);
            } else if (data.action === 'toggleExplanations') {
                window.deckEngine.toggleExplanations(target, false);
            }
        });

        // Remote Input & Select Sync
        this.sync.on('INPUT_SYNC', (data) => {
            if (!data || typeof data.slideIndex !== 'number' || typeof data.inputIndex !== 'number') return;
            const slide = window.deckEngine ? window.deckEngine.slides[data.slideIndex] : document.querySelector('.slide.active');
            if (slide) {
                const allInputs = slide.querySelectorAll('.blank-input, .select-input');
                const targetInput = allInputs[data.inputIndex];
                if (targetInput && targetInput.value !== data.value) {
                    targetInput.value = data.value;
                    targetInput.dispatchEvent(new Event('input', { bubbles: true }));
                    targetInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        });

        // Remote Step Reveal
        this.sync.on('STEP_REVEAL_CMD', () => {
            if (window.stepRevealEngine) window.stepRevealEngine.revealNextOnActiveSlide();
        });

        // Remote Student Picker
        this.sync.on('STUDENT_PICK_CMD', (data) => {
            if (window.studentPicker) {
                window.studentPicker.open(false);
                window.studentPicker.spin(data?.student, false);
            }
        });

        // Remote Spotlight
        this.sync.on('SPOTLIGHT_STATE', (data) => {
            if (window.presentationSpotlight) {
                if (data.active && !window.presentationSpotlight.isSpotlight) window.presentationSpotlight.activate(false);
                if (!data.active && window.presentationSpotlight.isSpotlight) window.presentationSpotlight.deactivate(false);
            }
        });

        this.sync.on('SPOTLIGHT_MOVE', (data) => {
            if (window.presentationSpotlight) {
                const x = data.normX * window.innerWidth;
                const y = data.normY * window.innerHeight;
                window.presentationSpotlight.updatePosition(x, y, false);
            }
        });

        // Remote Blackout / Whiteout
        this.sync.on('BLACKOUT_STATE', (data) => {
            if (window.presentationSpotlight) {
                if (data.blackout) {
                    if (!window.presentationSpotlight.isBlackout) window.presentationSpotlight.toggleBlackout(false);
                } else if (data.whiteout) {
                    if (!window.presentationSpotlight.isWhiteout) window.presentationSpotlight.toggleWhiteout(false);
                } else {
                    window.presentationSpotlight.clearMute(false);
                }
            }
        });

        // Remote Timer Commands
        this.sync.on('TIMER_CMD', (data) => {
            if (window.classroomTimer) {
                if (data.action === 'set') window.classroomTimer.setTimer(data.seconds, false);
                if (data.action === 'start' && !window.classroomTimer.timerRunning) window.classroomTimer.toggleRun(false);
                if (data.action === 'pause' && window.classroomTimer.timerRunning) window.classroomTimer.toggleRun(false);
                if (data.action === 'reset') window.classroomTimer.reset(false);
            }
        });

        // Remote Aspect Ratio
        this.sync.on('ASPECT_RATIO', (data) => {
            if (window.deckEngine && window.deckEngine.aspectRatio !== data.ratio) {
                window.deckEngine.applyAspectRatio(data.ratio, true, false);
            }
        });

        // Remote Theme Change
        this.sync.on('THEME_CHANGE', (data) => {
            if (window.deckThemeEngine && window.deckThemeEngine.currentTheme !== data.themeId) {
                window.deckThemeEngine.applyTheme(data.themeId, true, false);
            }
        });

        // Remote Confetti
        this.sync.on('CONFETTI_CMD', () => {
            this.launchConfetti();
        });

        // Remote Paragraph Loupe
        this.sync.on('PARAGRAPH_LOUPE_CMD', (data) => {
            if (window.paragraphLoupe) {
                window.paragraphLoupe.applyRemoteSync(data);
            }
        });
    }

    broadcastCurrentAudienceState() {
        if (!window.deckEngine) return;
        const currentSlide = window.deckEngine.currentSlide || 0;
        const aspectRatio = window.deckEngine.aspectRatio || '16:9';
        const theme = window.deckThemeEngine ? window.deckThemeEngine.currentTheme : 'academic';
        const timerSeconds = window.classroomTimer ? window.classroomTimer.timerSeconds : 0;
        const timerRunning = window.classroomTimer ? window.classroomTimer.timerRunning : false;
        const isBlackout = window.presentationSpotlight ? window.presentationSpotlight.isBlackout : false;
        const isWhiteout = window.presentationSpotlight ? window.presentationSpotlight.isWhiteout : false;
        const isSpotlight = window.presentationSpotlight ? window.presentationSpotlight.isSpotlight : false;

        const inputsData = [];
        const slide = (window.deckEngine.slides && window.deckEngine.slides[currentSlide]) || document.querySelector('.slide.active');
        if (slide) {
            slide.querySelectorAll('.blank-input, .select-input, input, select, textarea').forEach((inp, i) => {
                inputsData.push({ index: i, value: inp.value, className: inp.className });
            });
        }

        this.sync.emit('SYNC_RESPONSE', {
            currentSlide,
            aspectRatio,
            theme,
            timerSeconds,
            timerRunning,
            isBlackout,
            isWhiteout,
            isSpotlight,
            inputsData
        });
    }

    /**
     * =========================================================================
     * PRESENTER COCKPIT BUILDER & CONTROLLER
     * =========================================================================
     */
    buildPresenterCockpit() {
        this.injectPresenterStyles();

        const cockpit = document.createElement('div');
        cockpit.id = 'presenterCockpit';
        cockpit.className = 'canva-presenter-cockpit';

        cockpit.innerHTML = PRESENTER_COCKPIT_HTML;

        document.body.appendChild(cockpit);

        // Hide original audience floating HUD
        const origHUD = document.getElementById('presentationToolsHUD');
        if (origHUD) origHUD.style.display = 'none';

        // Setup All Modules & Event Bindings
        this.setupClockAndStopwatch();
        this.setupDraggableSplitter();
        this.renderFilmstrip();
        this.bindNavigationControls();
        this.bindHeaderActions();
        this.bindToolkitActions();
        this.setupNotesControls();
        this.setupPresenterDrawCanvas();
        this.setupPresenterSyncListeners();
        this.bindPresenterKeyboardShortcuts();

        // Handshake: Request state from audience window
        this.sync.emit('SYNC_REQUEST', {});

        // Initial render
        setTimeout(() => this.updatePresenterSlideView(), 120);
    }

    /**
     * =========================================================================
     * PRESENTER WINDOW SYNC LISTENERS
     * =========================================================================
     */
    setupPresenterSyncListeners() {
        // Automatically close Presenter View if the main presentation view closes
        this.sync.on('HOST_CLOSED', () => {
            window.close();
        });

        // Initial state sync from Audience
        this.sync.on('SYNC_RESPONSE', (state) => {
            if (window.deckEngine && typeof state.currentSlide === 'number') {
                window.deckEngine.showSlide(state.currentSlide, false);
            }
            if (Array.isArray(state.inputsData) && typeof state.currentSlide === 'number') {
                const slide = (window.deckEngine && window.deckEngine.slides) ? window.deckEngine.slides[state.currentSlide] : document.querySelector('.slide.active');
                if (slide) {
                    const allInputs = slide.querySelectorAll('.blank-input, .select-input, input, select, textarea');
                    state.inputsData.forEach(item => {
                        if (allInputs[item.index]) {
                            allInputs[item.index].value = item.value;
                            allInputs[item.index].className = item.className;
                        }
                    });
                }
            }
            if (state.aspectRatio && window.deckEngine) {
                window.deckEngine.applyAspectRatio(state.aspectRatio, false, false);
            }
            if (state.theme && window.deckThemeEngine) {
                window.deckThemeEngine.applyTheme(state.theme, false, false);
            }
            if (typeof state.timerSeconds === 'number' && window.classroomTimer) {
                window.classroomTimer.setTimer(state.timerSeconds, false);
                this.updateTimerDisplay(state.timerSeconds);
            }
            this.updatePresenterSlideView();
        });

        // Remote slide navigation from audience
        this.sync.on('NAVIGATE_SLIDE', (data) => {
            if (window.deckEngine && typeof data.slideIndex === 'number') {
                if (window.deckEngine.currentSlide !== data.slideIndex) {
                    this.isHandlingRemoteNavigation = true;
                    window.deckEngine.showSlide(data.slideIndex, false);
                    this.updatePresenterSlideView();
                    setTimeout(() => { this.isHandlingRemoteNavigation = false; }, 80);
                }
            }
        });

        // Sync Theme Change
        this.sync.on('THEME_CHANGE', (data) => {
            if (window.deckThemeEngine && window.deckThemeEngine.currentTheme !== data.themeId) {
                window.deckThemeEngine.applyTheme(data.themeId, false, false);
                this.updatePresenterSlideView();
            }
        });

        // Sync Aspect Ratio
        this.sync.on('ASPECT_RATIO', (data) => {
            if (window.deckEngine && window.deckEngine.aspectRatio !== data.ratio) {
                window.deckEngine.applyAspectRatio(data.ratio, false, false);
                this.updatePresenterSlideView();
            }
        });

        // Sync Blackout / Whiteout
        this.sync.on('BLACKOUT_STATE', (data) => {
            this.isBlackout = !!data.blackout;
            this.isWhiteout = !!data.whiteout;
            document.getElementById('btnCpBlackout')?.classList.toggle('active', this.isBlackout);
            document.getElementById('btnToolBlackout')?.classList.toggle('active', this.isBlackout);
            document.getElementById('btnToolWhiteout')?.classList.toggle('active', this.isWhiteout);
        });

        // Sync Spotlight
        this.sync.on('SPOTLIGHT_STATE', (data) => {
            this.isSpotlight = !!data.active;
            document.getElementById('btnCpSpotlight')?.classList.toggle('active', this.isSpotlight);
            document.getElementById('btnToolSpotlight')?.classList.toggle('active', this.isSpotlight);
        });

        // Sync Timer
        this.sync.on('TIMER_CMD', (data) => {
            if (data.action === 'set' && typeof data.seconds === 'number') {
                this.updateTimerDisplay(data.seconds);
            } else if (data.action === 'start') {
                document.getElementById('btnToolTimerToggle') && (document.getElementById('btnToolTimerToggle').textContent = '⏸ Pause Timer');
            } else if (data.action === 'pause') {
                document.getElementById('btnToolTimerToggle') && (document.getElementById('btnToolTimerToggle').textContent = '▶ Start Timer');
            } else if (data.action === 'reset') {
                this.updateTimerDisplay(0);
                document.getElementById('btnToolTimerToggle') && (document.getElementById('btnToolTimerToggle').textContent = '▶ Start Timer');
            }
        });

        // Sync Step Reveal
        this.sync.on('STEP_REVEAL_CMD', () => {
            if (window.stepRevealEngine) {
                window.stepRevealEngine.revealNextOnActiveSlide(false);
                const target = window.deckEngine ? window.deckEngine.slides[window.deckEngine.currentSlide] : document.querySelector('.slide.active');
                const scaler = document.getElementById('cpCurrentSlideScaler');
                if (scaler && target) this.syncFormValues(target, scaler);
            }
        });

        // Sync Evidence Focus / Clear
        this.sync.on('EVIDENCE_FOCUS', (data) => {
            if (window.readingHighlighter && data && (data.qKey || data.evId)) {
                window.readingHighlighter.focusEvidence(data.qKey, data.evId, false);
                const target = window.deckEngine ? window.deckEngine.slides[window.deckEngine.currentSlide] : document.querySelector('.slide.active');
                const scaler = document.getElementById('cpCurrentSlideScaler');
                if (scaler && target) this.syncFormValues(target, scaler);
            }
        });
        this.sync.on('EVIDENCE_CLEAR', (data) => {
            if (window.readingHighlighter) {
                window.readingHighlighter.clearAll(data?.containerId, false);
                const target = window.deckEngine ? window.deckEngine.slides[window.deckEngine.currentSlide] : document.querySelector('.slide.active');
                const scaler = document.getElementById('cpCurrentSlideScaler');
                if (scaler && target) this.syncFormValues(target, scaler);
            }
        });

        // Sync Exercise Actions
        this.sync.on('EXERCISE_ACTION', (data) => {
            if (!data || !window.deckEngine) return;
            const target = data.containerId ? document.getElementById(data.containerId) : (window.deckEngine.slides[data.slideIndex] || document.querySelector('.slide.active'));
            if (!target) return;

            if (data.action === 'check') {
                window.deckEngine.checkAnswers(target, false);
            } else if (data.action === 'reveal') {
                window.deckEngine.revealAnswers(target, false);
            } else if (data.action === 'reset') {
                window.deckEngine.resetTask(target, false);
            } else if (data.action === 'toggleOptCard' && typeof data.cardIndex === 'number') {
                const card = target.querySelectorAll('.opt-card')[data.cardIndex];
                if (card) window.deckEngine.toggleOptCard(card, false);
            } else if (data.action === 'toggleExplanations') {
                window.deckEngine.toggleExplanations(target, false);
            }
            const scaler = document.getElementById('cpCurrentSlideScaler');
            if (scaler) this.syncFormValues(target, scaler);
        });

        // Sync Input & Select
        this.sync.on('INPUT_SYNC', (data) => {
            if (!data || typeof data.slideIndex !== 'number' || typeof data.inputIndex !== 'number') return;
            const slide = window.deckEngine ? window.deckEngine.slides[data.slideIndex] : document.querySelector('.slide.active');
            if (slide) {
                const allInputs = slide.querySelectorAll('.blank-input, .select-input');
                const targetInput = allInputs[data.inputIndex];
                if (targetInput && targetInput.value !== data.value) {
                    targetInput.value = data.value;
                }
                if (targetInput && data.className) {
                    targetInput.className = data.className;
                }
            }
            const scaler = document.getElementById('cpCurrentSlideScaler');
            if (scaler) {
                const cloneInputs = scaler.querySelectorAll('.blank-input, .select-input');
                const cloneTarget = cloneInputs[data.inputIndex];
                if (cloneTarget && cloneTarget.value !== data.value) {
                    cloneTarget.value = data.value;
                }
                if (cloneTarget && data.className) {
                    cloneTarget.className = data.className;
                }
            }
        });

        // Sync Tool States from Audience Window
        this.sync.on('HIGHLIGHTER_STATE', (data) => {
            if (typeof data.active === 'boolean') {
                this.highlighterActive = data.active;
                this.activeToolMode = data.active ? 'highlighter' : 'none';
                document.getElementById('btnCpHighlighter')?.classList.toggle('active', data.active);
                document.querySelectorAll('.cp-mode-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.mode === (data.active ? 'highlighter' : 'none'));
                });
                const hlPal = document.getElementById('cpHighlighterPalette');
                if (hlPal) hlPal.style.display = data.active ? 'block' : 'none';
            }
        });

        this.sync.on('HIGHLIGHTER_COLOR', (data) => {
            if (typeof data.colorIndex === 'number') {
                this.highlighterColorIndex = data.colorIndex;
                document.querySelectorAll('.cp-swatch.hl').forEach((swatch, idx) => {
                    swatch.classList.toggle('active', idx === data.colorIndex);
                });
            }
        });

        this.sync.on('LASER_STATE', (data) => {
            if (typeof data.active === 'boolean') {
                this.laserActive = data.active;
                this.activeToolMode = data.active ? 'laser' : 'none';
                document.getElementById('btnCpLaser')?.classList.toggle('active', data.active);
                document.querySelectorAll('.cp-mode-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.mode === (data.active ? 'laser' : 'none'));
                });
                const canvas = document.getElementById('presenterDrawCanvas');
                if (canvas) {
                    canvas.style.pointerEvents = data.active ? 'auto' : 'none';
                    canvas.style.cursor = data.active ? 'none' : 'default';
                }
            }
        });

        this.sync.on('PEN_STATE', (data) => {
            if (typeof data.active === 'boolean') {
                this.penActive = data.active;
                this.activeToolMode = data.active ? 'pen' : 'none';
                document.getElementById('btnCpPen')?.classList.toggle('active', data.active);
                document.querySelectorAll('.cp-mode-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.mode === (data.active ? 'pen' : 'none'));
                });
                const penPal = document.getElementById('cpPenPalette');
                if (penPal) penPal.style.display = data.active ? 'block' : 'none';
                const canvas = document.getElementById('presenterDrawCanvas');
                if (canvas) {
                    canvas.style.pointerEvents = data.active ? 'auto' : 'none';
                    canvas.style.cursor = data.active ? 'crosshair' : 'default';
                }
            }
        });

        // Sync Highlighter Add / Remove
        this.sync.on('HIGHLIGHTER_ADD', (data) => {
            if (window.teacherHighlighter) window.teacherHighlighter.applyRemoteHighlight(data);
        });

        // Sync Student Picked
        this.sync.on('STUDENT_PICKED', (data) => {
            this.showPickedStudent(data.student);
        });

        // Slide change in Presenter window
        window.addEventListener('slidechanged', (e) => {
            this.updatePresenterSlideView();
            // Prevent echoing when update was caused by incoming sync or when broadcast is false
            if (this.isHandlingRemoteNavigation || (e.detail && e.detail.broadcast === false)) {
                return;
            }
        });
    }

    /**
     * Top Bar Clock & Elapsed Stopwatch
     */
    setupClockAndStopwatch() {
        const clockEl = document.getElementById('cpLiveClock');
        const elapsedEl = document.getElementById('cpElapsedTimer');
        const pauseBtn = document.getElementById('btnCpPauseTimer');
        const resetBtn = document.getElementById('btnCpResetTimer');

        const updateClock = () => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            if (clockEl) {
                clockEl.textContent = `${hours}:${minutes}${ampm}`;
            }
        };
        updateClock();
        this.clockInterval = setInterval(updateClock, 1000);

        const formatElapsed = (sec) => {
            const mins = String(Math.floor(sec / 60)).padStart(2, '0');
            const secs = String(sec % 60).padStart(2, '0');
            return `${mins}:${secs}`;
        };

        this.elapsedInterval = setInterval(() => {
            if (this.isStopwatchRunning) {
                this.elapsedSeconds++;
                if (elapsedEl) elapsedEl.textContent = formatElapsed(this.elapsedSeconds);
            }
        }, 1000);

        if (pauseBtn) {
            pauseBtn.onclick = () => {
                this.isStopwatchRunning = !this.isStopwatchRunning;
                pauseBtn.textContent = this.isStopwatchRunning ? '⏸' : '▶';
            };
        }

        if (resetBtn) {
            resetBtn.onclick = () => {
                this.elapsedSeconds = 0;
                if (elapsedEl) elapsedEl.textContent = '00:00';
            };
        }
    }

    /**
     * Draggable Resizer Splitter between Stage and Notes
     */
    setupDraggableSplitter() {
        const splitter = document.getElementById('cpSplitter');
        const stageCol = document.getElementById('cpStageCol');
        const notesCol = document.getElementById('cpNotesCol');
        const workspace = document.getElementById('cpWorkspace');
        if (!splitter || !stageCol || !notesCol || !workspace) return;

        let isDragging = false;

        splitter.addEventListener('mousedown', () => {
            isDragging = true;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const containerRect = workspace.getBoundingClientRect();
            const mouseX = e.clientX - containerRect.left;
            const minWidth = 420;
            const maxWidth = containerRect.width - 320;

            if (mouseX >= minWidth && mouseX <= maxWidth) {
                const stagePct = (mouseX / containerRect.width) * 100;
                stageCol.style.flex = `0 0 ${stagePct}%`;
                notesCol.style.flex = `0 0 ${100 - stagePct}%`;
                this.updatePresenterSlideView();
            }
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
                this.updatePresenterSlideView();
            }
        });
    }

    /**
     * Horizontal Bottom Filmstrip Carousel
     */
    renderFilmstrip() {
        const track = document.getElementById('cpFilmstripTrack');
        const slides = document.querySelectorAll('.slide');
        if (!track || !slides.length) return;

        track.innerHTML = '';

        slides.forEach((slide, idx) => {
            const titleEl = slide.querySelector('h1, h2, .slide-title, .module-title');
            const title = titleEl ? titleEl.textContent.trim().replace(/\s+/g, ' ') : `Slide ${idx + 1}`;
            const skill = slide.dataset.skill || 'general';

            const card = document.createElement('div');
            card.className = `cp-filmstrip-card ${idx === 0 ? 'active' : ''}`;
            card.dataset.slideIndex = idx;

            card.innerHTML = `
                <div class="cp-card-preview-mini">
                    <span class="cp-card-num">${idx + 1}</span>
                    <span class="cp-card-skill-tag ${skill}">${skill}</span>
                </div>
                <div class="cp-card-title">${title.substring(0, 32)}</div>
            `;

            card.onclick = () => {
                if (window.deckEngine) {
                    window.deckEngine.showSlide(idx);
                }
            };

            track.appendChild(card);
        });

        const btnLeft = document.getElementById('btnFilmstripLeft');
        const btnRight = document.getElementById('btnFilmstripRight');
        if (btnLeft) {
            btnLeft.onclick = () => track.scrollBy({ left: -260, behavior: 'smooth' });
        }
        if (btnRight) {
            btnRight.onclick = () => track.scrollBy({ left: 260, behavior: 'smooth' });
        }
    }

    scrollFilmstripToActive(currentIndex) {
        const track = document.getElementById('cpFilmstripTrack');
        if (!track) return;
        const cards = track.querySelectorAll('.cp-filmstrip-card');
        cards.forEach((card, idx) => {
            const isActive = idx === currentIndex;
            card.classList.toggle('active', isActive);
            if (isActive) {
                const cardLeft = card.offsetLeft;
                const cardWidth = card.offsetWidth;
                const trackWidth = track.offsetWidth;
                track.scrollTo({
                    left: cardLeft - (trackWidth / 2) + (cardWidth / 2),
                    behavior: 'smooth'
                });
            }
        });
    }

    /**
     * Floating Navigation Pill
     */
    bindNavigationControls() {
        const btnFirst = document.getElementById('btnCpFirst');
        const btnPrev = document.getElementById('btnCpPrev');
        const btnNext = document.getElementById('btnCpNext');
        const btnZoom = document.getElementById('btnCpZoom');
        const btnFullscreen = document.getElementById('btnCpFullscreen');

        const btnToggleFilmstrip = document.getElementById('btnCpToggleFilmstrip');

        if (btnFirst) {
            btnFirst.onclick = () => window.deckEngine && window.deckEngine.showSlide(0);
        }
        if (btnPrev) {
            btnPrev.onclick = () => window.deckEngine && window.deckEngine.prevSlide();
        }
        if (btnNext) {
            btnNext.onclick = () => window.deckEngine && window.deckEngine.nextSlide();
        }
        if (btnToggleFilmstrip) {
            btnToggleFilmstrip.onclick = () => {
                const fs = document.getElementById('cpFilmstripSection');
                if (fs) {
                    fs.classList.toggle('collapsed');
                    btnToggleFilmstrip.classList.toggle('active', !fs.classList.contains('collapsed'));
                    setTimeout(() => this.updatePresenterSlideView(), 60);
                }
            };
        }
        if (btnZoom) {
            btnZoom.onclick = () => {
                if (window.deckEngine) {
                    window.deckEngine.toggleAspectRatio();
                    this.sync.emit('ASPECT_RATIO', { ratio: window.deckEngine.aspectRatio });
                    this.updatePresenterSlideView();
                }
            };
        }
        if (btnFullscreen) {
            btnFullscreen.onclick = (e) => {
                if (e.shiftKey) {
                    if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen().catch(() => {});
                    } else {
                        document.exitFullscreen().catch(() => {});
                    }
                    return;
                }
                const stageCol = document.getElementById('cpStageCol');
                const notesCol = document.getElementById('cpNotesCol');
                if (stageCol && notesCol) {
                    const isExpanded = stageCol.classList.toggle('expanded');
                    if (isExpanded) {
                        stageCol.style.flex = '1 0 100%';
                        notesCol.style.flex = '0 0 0%';
                        notesCol.style.display = 'none';
                        btnFullscreen.innerHTML = '⛶';
                        btnFullscreen.title = 'Restore Notes Column';
                    } else {
                        stageCol.style.flex = '0 0 70%';
                        notesCol.style.flex = '0 0 30%';
                        notesCol.style.display = 'flex';
                        btnFullscreen.innerHTML = '⤢';
                        btnFullscreen.title = 'Maximize Stage Preview';
                    }
                    setTimeout(() => this.updatePresenterSlideView(), 60);
                }
            };
        }
    }

    /**
     * Top Bar Action Buttons
     */
    bindHeaderActions() {
        // Step Reveal (Magic)
        document.getElementById('btnCpMagic')?.addEventListener('click', () => this.triggerStepReveal());

        // Confetti
        document.getElementById('btnCpConfetti')?.addEventListener('click', () => {
            this.launchConfetti();
            this.sync.emit('CONFETTI_CMD', {});
        });

        // Laser
        document.getElementById('btnCpLaser')?.addEventListener('click', () => this.setToolMode(this.activeToolMode === 'laser' ? 'none' : 'laser'));

        // Pen
        document.getElementById('btnCpPen')?.addEventListener('click', () => this.setToolMode(this.activeToolMode === 'pen' ? 'none' : 'pen'));

        // Highlighter
        document.getElementById('btnCpHighlighter')?.addEventListener('click', () => this.setToolMode(this.activeToolMode === 'highlighter' ? 'none' : 'highlighter'));

        // Spotlight
        document.getElementById('btnCpSpotlight')?.addEventListener('click', () => this.toggleSpotlight());

        // Blackout
        document.getElementById('btnCpBlackout')?.addEventListener('click', () => this.toggleBlackout());

        // Student Picker
        document.getElementById('btnCpStudent')?.addEventListener('click', () => this.triggerStudentPicker());

        // Timer Modal
        document.getElementById('btnCpTimerModal')?.addEventListener('click', () => {
            this.switchTab('toolkit');
            document.getElementById('cpCountdownDisplay')?.scrollIntoView({ behavior: 'smooth' });
            if (window.classroomTimer) {
                window.classroomTimer.showModal(true);
            }
        });

        // Theme Switcher
        document.getElementById('btnCpTheme')?.addEventListener('click', () => {
            if (window.deckThemeEngine) {
                window.deckThemeEngine.cycleTheme();
                this.sync.emit('THEME_CHANGE', { themeId: window.deckThemeEngine.currentTheme });
                this.updatePresenterSlideView();
            }
        });

        // Help Modal
        document.getElementById('btnCpHelp')?.addEventListener('click', () => {
            const modal = document.getElementById('cpHelpModal');
            if (modal) modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
        });
        document.getElementById('btnCpHelpClose')?.addEventListener('click', () => {
            const modal = document.getElementById('cpHelpModal');
            if (modal) modal.style.display = 'none';
        });

        // Close
        document.getElementById('btnCpClose')?.addEventListener('click', () => window.close());
    }

    /**
     * Full Teacher Toolkit Panel Bindings
     */
    bindToolkitActions() {
        // Mode switch buttons
        document.querySelectorAll('.cp-mode-btn').forEach(btn => {
            btn.onclick = () => {
                const mode = btn.dataset.mode || 'none';
                this.setToolMode(mode);
            };
        });

        // Pen color swatches
        document.querySelectorAll('#cpPenPalette .cp-swatch').forEach(swatch => {
            swatch.onclick = () => {
                document.querySelectorAll('#cpPenPalette .cp-swatch').forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
                this.penColor = swatch.dataset.color || '#ef4444';
            };
        });

        // Pen width swatches
        document.querySelectorAll('.cp-width-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.cp-width-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.penWidth = parseFloat(btn.dataset.width || '3.5');
            };
        });

        // Highlighter color swatches
        document.querySelectorAll('#cpHighlighterPalette .cp-swatch').forEach(swatch => {
            swatch.onclick = () => {
                document.querySelectorAll('#cpHighlighterPalette .cp-swatch').forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
                this.highlighterColorIndex = parseInt(swatch.dataset.index || '0', 10);
                if (window.teacherHighlighter) {
                    window.teacherHighlighter.setColor(this.highlighterColorIndex);
                }
            };
        });

        // Toolkit Action Buttons
        document.getElementById('btnToolStepReveal')?.addEventListener('click', () => this.triggerStepReveal());
        document.getElementById('btnToolStudentPicker')?.addEventListener('click', () => this.triggerStudentPicker());
        document.getElementById('btnToolLoupe')?.addEventListener('click', () => this.triggerParagraphLoupe());
        document.getElementById('btnToolConfetti')?.addEventListener('click', () => {
            this.launchConfetti();
            this.sync.emit('CONFETTI_CMD', {});
        });

        // Undo & Clear Ink
        document.getElementById('btnToolUndoHighlight')?.addEventListener('click', () => {
            if (window.teacherHighlighter) window.teacherHighlighter.undo(true);
        });

        document.getElementById('btnToolClearDrawings')?.addEventListener('click', () => {
            this.clearDrawings();
        });

        // Timer Presets
        document.querySelectorAll('.cp-quick-timer-btn').forEach(btn => {
            btn.onclick = () => {
                const sec = parseInt(btn.dataset.sec, 10);
                if (!isNaN(sec) && window.classroomTimer) {
                    window.classroomTimer.setTimer(sec, true);
                    window.classroomTimer.showModal(true);
                }
            };
        });

        // Timer Start/Pause & Reset
        document.getElementById('btnToolTimerToggle')?.addEventListener('click', () => {
            if (window.classroomTimer) {
                window.classroomTimer.toggleRun(true);
                window.classroomTimer.showModal(true);
            }
        });

        document.getElementById('btnToolTimerReset')?.addEventListener('click', () => {
            if (window.classroomTimer) {
                window.classroomTimer.reset(true);
            }
        });

        // Blanking buttons
        document.getElementById('btnToolBlackout')?.addEventListener('click', () => this.toggleBlackout());
        document.getElementById('btnToolWhiteout')?.addEventListener('click', () => this.toggleWhiteout());
        document.getElementById('btnToolSpotlight')?.addEventListener('click', () => this.toggleSpotlight());
        document.getElementById('btnToolClearBlanking')?.addEventListener('click', () => this.clearBlanking());

        // Theme Pills
        document.querySelectorAll('.cp-theme-pill-btn').forEach(btn => {
            btn.onclick = () => {
                const themeId = btn.dataset.theme;
                if (themeId && window.deckThemeEngine) {
                    window.deckThemeEngine.applyTheme(themeId, true, true);
                    this.updatePresenterSlideView();
                }
            };
        });

        // Aspect Ratio
        document.getElementById('btnToolAspectToggle')?.addEventListener('click', () => {
            if (window.deckEngine) {
                window.deckEngine.toggleAspectRatio();
                this.sync.emit('ASPECT_RATIO', { ratio: window.deckEngine.aspectRatio });
                this.updatePresenterSlideView();
            }
        });
    }

    /**
     * Tool Modes: 'none' | 'laser' | 'pen' | 'highlighter'
     */
    setToolMode(mode) {
        this.activeToolMode = mode;
        this.laserActive = (mode === 'laser');
        this.penActive = (mode === 'pen');
        this.highlighterActive = (mode === 'highlighter');

        // Update Top Header Buttons
        document.getElementById('btnCpLaser')?.classList.toggle('active', this.laserActive);
        document.getElementById('btnCpPen')?.classList.toggle('active', this.penActive);
        document.getElementById('btnCpHighlighter')?.classList.toggle('active', this.highlighterActive);

        // Update Toolkit Mode Bar
        document.querySelectorAll('.cp-mode-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.mode === mode);
        });

        // Toggle Palettes
        const penPal = document.getElementById('cpPenPalette');
        const hlPal = document.getElementById('cpHighlighterPalette');
        if (penPal) penPal.style.display = this.penActive ? 'block' : 'none';
        if (hlPal) hlPal.style.display = this.highlighterActive ? 'block' : 'none';

        // Update Canvas Cursor & Pointer Events
        // ONLY laser and pen need drawing canvas pointer events!
        // Highlighter MUST allow selecting text on the slide!
        const canvas = document.getElementById('presenterDrawCanvas');
        const laserDot = document.getElementById('presenterLaserDot');
        if (canvas) {
            canvas.style.pointerEvents = (this.penActive || this.laserActive) ? 'auto' : 'none';
            if (this.penActive) {
                canvas.style.cursor = 'crosshair';
            } else if (this.laserActive) {
                canvas.style.cursor = 'none';
            } else {
                canvas.style.cursor = 'default';
            }
        }
        if (laserDot && !this.laserActive) {
            laserDot.style.display = 'none';
        }

        // Toggle TeacherHighlighter engine state
        if (this.highlighterActive && window.teacherHighlighter && !window.teacherHighlighter.isActive) {
            window.teacherHighlighter.toggle(true);
            window.teacherHighlighter.setColor(this.highlighterColorIndex, true);
        } else if (!this.highlighterActive && window.teacherHighlighter && window.teacherHighlighter.isActive) {
            window.teacherHighlighter.toggle(true);
        }

        // Sync with Audience Screen
        this.sync.emit('LASER_STATE', { active: this.laserActive });
        this.sync.emit('PEN_STATE', { active: this.penActive });
        this.sync.emit('HIGHLIGHTER_STATE', { active: this.highlighterActive, colorIndex: this.highlighterColorIndex });
    }

    triggerStepReveal() {
        if (window.stepRevealEngine) {
            window.stepRevealEngine.revealNextOnActiveSlide();
            this.sync.emit('STEP_REVEAL_CMD', {});
            this.updatePresenterSlideView();
        }
    }

    triggerStudentPicker() {
        if (window.studentPicker) {
            window.studentPicker.open(true);
            window.studentPicker.spin(null, true);
        }
    }

    showPickedStudent(name) {
        const pill = document.getElementById('cpPickedStudentDisplay');
        const nameEl = document.getElementById('cpPickedStudentName');
        if (pill && nameEl) {
            nameEl.textContent = name;
            pill.style.display = 'flex';
            pill.classList.add('pulse');
            setTimeout(() => pill.classList.remove('pulse'), 800);
        }
    }

    triggerParagraphLoupe() {
        if (window.paragraphLoupe) {
            window.paragraphLoupe.toggle();
            window.paragraphLoupe.notifySync();
        }
    }

    toggleSpotlight() {
        this.isSpotlight = !this.isSpotlight;
        document.getElementById('btnCpSpotlight')?.classList.toggle('active', this.isSpotlight);
        document.getElementById('btnToolSpotlight')?.classList.toggle('active', this.isSpotlight);
        if (window.presentationSpotlight) {
            this.isSpotlight ? window.presentationSpotlight.activate(false) : window.presentationSpotlight.deactivate(false);
        }
        this.sync.emit('SPOTLIGHT_STATE', { active: this.isSpotlight });
    }

    toggleBlackout() {
        this.isBlackout = !this.isBlackout;
        this.isWhiteout = false;
        document.getElementById('btnCpBlackout')?.classList.toggle('active', this.isBlackout);
        document.getElementById('btnToolBlackout')?.classList.toggle('active', this.isBlackout);
        document.getElementById('btnToolWhiteout')?.classList.remove('active');
        if (window.presentationSpotlight) {
            this.isBlackout ? window.presentationSpotlight.toggleBlackout(false) : window.presentationSpotlight.clearMute(false);
        }
        this.sync.emit('BLACKOUT_STATE', { blackout: this.isBlackout, whiteout: false });
    }

    toggleWhiteout() {
        this.isWhiteout = !this.isWhiteout;
        this.isBlackout = false;
        document.getElementById('btnToolWhiteout')?.classList.toggle('active', this.isWhiteout);
        document.getElementById('btnCpBlackout')?.classList.remove('active');
        document.getElementById('btnToolBlackout')?.classList.remove('active');
        if (window.presentationSpotlight) {
            this.isWhiteout ? window.presentationSpotlight.toggleWhiteout(false) : window.presentationSpotlight.clearMute(false);
        }
        this.sync.emit('BLACKOUT_STATE', { blackout: false, whiteout: this.isWhiteout });
    }

    clearBlanking() {
        this.isBlackout = false;
        this.isWhiteout = false;
        this.isSpotlight = false;
        document.getElementById('btnCpBlackout')?.classList.remove('active');
        document.getElementById('btnToolBlackout')?.classList.remove('active');
        document.getElementById('btnToolWhiteout')?.classList.remove('active');
        document.getElementById('btnCpSpotlight')?.classList.remove('active');
        document.getElementById('btnToolSpotlight')?.classList.remove('active');
        if (window.presentationSpotlight) {
            window.presentationSpotlight.clearMute(false);
            window.presentationSpotlight.deactivate(false);
        }
        this.sync.emit('BLACKOUT_STATE', { blackout: false, whiteout: false });
        this.sync.emit('SPOTLIGHT_STATE', { active: false });
    }

    clearDrawings() {
        const canvas = document.getElementById('presenterDrawCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        if (window.penAnnotation) window.penAnnotation.clear(true);
        if (window.teacherHighlighter) window.teacherHighlighter.clear(true);
        if (window.readingHighlighter) window.readingHighlighter.clearAll(null, true);
    }

    updateTimerDisplay(seconds) {
        const display = document.getElementById('cpCountdownDisplay');
        if (!display) return;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    /**
     * Notes Font Scaling & Tabs
     */
    setupNotesControls() {
        const tabNotes = document.getElementById('tabNotesBtn');
        const tabToolkit = document.getElementById('tabToolkitBtn');
        const paneNotes = document.getElementById('paneNotes');
        const paneToolkit = document.getElementById('paneToolkit');

        if (tabNotes && tabToolkit) {
            tabNotes.onclick = () => this.switchTab('notes');
            tabToolkit.onclick = () => this.switchTab('toolkit');
        }

        const btnDec = document.getElementById('btnFontDec');
        const btnReset = document.getElementById('btnFontReset');
        const btnInc = document.getElementById('btnFontInc');
        const notesContent = document.getElementById('cpNotesContent');

        const applyFontSize = () => {
            if (notesContent) {
                notesContent.style.fontSize = `${this.notesFontSize}px`;
            }
            localStorage.setItem('cp_notes_font_size', String(this.notesFontSize));
        };
        applyFontSize();

        if (btnDec) {
            btnDec.onclick = () => {
                if (this.notesFontSize > 12) {
                    this.notesFontSize -= 2;
                    applyFontSize();
                }
            };
        }

        if (btnReset) {
            btnReset.onclick = () => {
                this.notesFontSize = 16;
                applyFontSize();
            };
        }

        if (btnInc) {
            btnInc.onclick = () => {
                if (this.notesFontSize < 28) {
                    this.notesFontSize += 2;
                    applyFontSize();
                }
            };
        }

        const btnEditNote = document.getElementById('btnEditCustomNote');
        if (btnEditNote) {
            btnEditNote.onclick = () => {
                const customNoteEl = document.getElementById('cpCustomNoteText');
                if (customNoteEl) {
                    customNoteEl.contentEditable = 'true';
                    customNoteEl.focus();
                }
            };
        }
    }

    switchTab(tabName) {
        this.activeTab = tabName;
        const tabNotes = document.getElementById('tabNotesBtn');
        const tabToolkit = document.getElementById('tabToolkitBtn');
        const paneNotes = document.getElementById('paneNotes');
        const paneToolkit = document.getElementById('paneToolkit');

        if (tabName === 'notes') {
            tabNotes?.classList.add('active');
            tabToolkit?.classList.remove('active');
            paneNotes?.classList.add('active');
            paneToolkit?.classList.remove('active');
        } else {
            tabToolkit?.classList.add('active');
            tabNotes?.classList.remove('active');
            paneToolkit?.classList.add('active');
            paneNotes?.classList.remove('active');
        }
    }

    /**
     * Copy form input values, check states, and interactive classes from source to destination elements
     */
    syncFormValues(srcElement, destElement) {
        if (!srcElement || !destElement) return;

        const srcInputs = srcElement.querySelectorAll('input, select, textarea');
        const destInputs = destElement.querySelectorAll('input, select, textarea');
        srcInputs.forEach((src, idx) => {
            const dest = destInputs[idx];
            if (!dest) return;
            if (src.tagName === 'SELECT') {
                dest.value = src.value;
            } else if (src.type === 'checkbox' || src.type === 'radio') {
                dest.checked = src.checked;
            } else {
                dest.value = src.value;
            }
            dest.className = src.className;
        });

        // Also sync item-explanations, marks, synonym pairs, and opt-cards
        const srcCards = srcElement.querySelectorAll('.q-card, .opt-card, .word-chip, .item-explanation, mark.evidence, .syn-pair-1, .syn-pair-2, .syn-pair-3, .vocab-word, .vocab-term');
        const destCards = destElement.querySelectorAll('.q-card, .opt-card, .word-chip, .item-explanation, mark.evidence, .syn-pair-1, .syn-pair-2, .syn-pair-3, .vocab-word, .vocab-term');
        srcCards.forEach((src, idx) => {
            const dest = destCards[idx];
            if (dest) {
                dest.className = src.className;
                if (src.style.display) dest.style.display = src.style.display;
            }
        });
    }

    /**
     * Update Presenter Slide Preview & Notes
     */
    updatePresenterSlideView() {
        if (!this.isPresenter) return;
        const slides = document.querySelectorAll('.slide');
        const currentIndex = window.deckEngine ? window.deckEngine.currentSlide : 0;
        const currentSlide = slides[currentIndex];

        // Update Slide Counter (e.g. 13 / 28)
        const counterEl = document.getElementById('cpSlideCounter');
        if (counterEl) {
            counterEl.textContent = `${currentIndex + 1} / ${slides.length}`;
        }

        // Update Scaled Slide Stage
        const scaler = document.getElementById('cpCurrentSlideScaler');
        if (scaler && currentSlide) {
            scaler.innerHTML = '';
            const clone = currentSlide.cloneNode(true);
            clone.classList.add('active', 'preview-clone');
            scaler.appendChild(clone);
            this.syncFormValues(currentSlide, clone);
            this.scalePreviewElement(scaler);
            this.bindPreviewSlideInteractions(scaler, currentSlide, currentIndex);
        }

        // Update Filmstrip active card & scroll
        this.scrollFilmstripToActive(currentIndex);

        // Update Notes
        this.updatePedagogicalNotes(currentSlide, currentIndex);
    }

    bindPreviewSlideInteractions(scaler, currentSlide, currentIndex) {
        if (!scaler || !currentSlide) return;

        // Synchronize inputs & dropdowns typed directly on the preview slide
        scaler.querySelectorAll('.blank-input, .select-input').forEach((input, idx) => {
            const syncInput = () => {
                const allRealInputs = currentSlide.querySelectorAll('.blank-input, .select-input');
                const realInput = allRealInputs[idx];
                if (realInput) {
                    realInput.value = input.value;
                    realInput.dispatchEvent(new Event('input', { bubbles: true }));
                    realInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
                this.sync.emit('INPUT_SYNC', {
                    slideIndex: currentIndex,
                    inputIndex: idx,
                    value: input.value,
                    className: input.className
                });
            };
            input.addEventListener('input', syncInput);
            input.addEventListener('change', syncInput);
        });

        // Click delegation inside preview slide
        scaler.addEventListener('click', (e) => {
            // 1. Vocabulary terms & Explainer popovers
            const vocabTerm = e.target.closest('.vocab-word, .vocab-term, [data-def]');
            if (vocabTerm && window.ReadingGrounder) {
                e.preventDefault();
                e.stopPropagation();
                const text = vocabTerm.textContent.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()"]/g, "").trim();
                const matchedDict = ReadingGrounder.lookupDict ? ReadingGrounder.lookupDict(text, vocabTerm) : null;
                ReadingGrounder.showVocabPopover(vocabTerm, matchedDict);
                return;
            }

            // 2. Synonym / Evidence buttons
            const synBtn = e.target.closest('.syn-btn, [onclick*="toggleSynonymExplanation"]');
            if (synBtn) {
                const card = synBtn.closest('.q-card, .flowchart-step-card');
                let dataQ = synBtn.dataset.q || card?.dataset?.q;
                let dataEv = synBtn.dataset.ev;

                const onclickAttr = synBtn.getAttribute('onclick');
                if ((!dataQ || !dataEv) && onclickAttr) {
                    const match = onclickAttr.match(/toggleSynonymExplanation\(['"]([^'"]+)['"](?:,\s*['"]([^'"]+)['"])?\)/);
                    if (match) {
                        dataQ = dataQ || match[1];
                        dataEv = dataEv || match[2] || `ev-${match[1]}`;
                    }
                }

                if (!dataEv && dataQ) dataEv = `ev-${dataQ}`;
                if (!dataQ && dataEv) dataQ = dataEv.replace(/^ev-/, '');

                if (dataQ || dataEv) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.readingHighlighter) {
                        window.readingHighlighter.focusEvidence(dataQ, dataEv, true);
                    } else if (window.deckEngine) {
                        window.deckEngine.toggleSynonymExplanation(dataQ, dataEv, true);
                    }
                    this.syncFormValues(currentSlide, scaler);
                }
                return;
            }

            // 3. Word chips
            const wordChip = e.target.closest('.word-chip');
            if (wordChip && window.vocabBank) {
                e.preventDefault();
                e.stopPropagation();
                window.vocabBank.handleChipClick(wordChip, currentSlide);
                this.syncFormValues(currentSlide, scaler);
                return;
            }

            // 4. Option cards (.opt-card)
            const optCard = e.target.closest('.opt-card');
            if (optCard) {
                e.preventDefault();
                e.stopPropagation();
                const allCloneCards = Array.from(scaler.querySelectorAll('.opt-card'));
                const cardIdx = allCloneCards.indexOf(optCard);
                const allRealCards = Array.from(currentSlide.querySelectorAll('.opt-card'));
                const realCard = allRealCards[cardIdx];
                if (realCard && window.deckEngine) {
                    window.deckEngine.toggleOptCard(realCard, true);
                    optCard.classList.toggle('selected', realCard.classList.contains('selected'));
                }
                return;
            }

            // 5. Action buttons (Check, Reveal, Reset, Step Reveal)
            const actionBtn = e.target.closest('button, .btn-action');
            if (actionBtn) {
                const btnText = (actionBtn.textContent || '').trim().toLowerCase();
                if (actionBtn.classList.contains('btn-step-reveal') || btnText.includes('step reveal')) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.triggerStepReveal();
                    this.syncFormValues(currentSlide, scaler);
                    return;
                } else if (btnText.includes('check')) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.deckEngine) window.deckEngine.checkAnswers(currentSlide, true);
                    this.syncFormValues(currentSlide, scaler);
                    return;
                } else if (btnText.includes('reveal') || btnText.includes('show evidence') || btnText.includes('show highlight')) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.deckEngine) window.deckEngine.revealAnswers(currentSlide, true);
                    this.syncFormValues(currentSlide, scaler);
                    return;
                } else if (btnText.includes('reset')) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.deckEngine) window.deckEngine.resetTask(currentSlide, true);
                    this.syncFormValues(currentSlide, scaler);
                    return;
                }
            }
        });
    }

    scalePreviewElement(scaler) {
        if (!scaler) return;
        const parent = scaler.parentElement;
        if (!parent) return;

        const parentW = parent.clientWidth;
        const parentH = parent.clientHeight;
        if (parentW <= 0 || parentH <= 0) return;

        const is43 = window.deckEngine && window.deckEngine.aspectRatio === '4:3';
        const targetW = is43 ? 1440 : 1920;
        const targetH = 1080;

        // Tight margins so the slide expands and fills the viewport maximally
        const availW = Math.max(100, parentW - 8);
        const availH = Math.max(100, parentH - 12);

        const scale = Math.min(availW / targetW, availH / targetH);
        const scaledW = targetW * scale;
        const scaledH = targetH * scale;
        const offsetX = Math.max(0, (parentW - scaledW) / 2);
        const offsetY = Math.max(0, (parentH - scaledH) / 2);

        scaler.style.width = `${targetW}px`;
        scaler.style.height = `${targetH}px`;
        scaler.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
        scaler.style.transformOrigin = 'top left';

        // Synchronize drawing canvas exactly over the scaled slide
        const canvas = document.getElementById('presenterDrawCanvas');
        if (canvas) {
            canvas.style.left = `${offsetX}px`;
            canvas.style.top = `${offsetY}px`;
            canvas.style.width = `${scaledW}px`;
            canvas.style.height = `${scaledH}px`;
            canvas.width = scaledW;
            canvas.height = scaledH;
        }
    }

    updatePedagogicalNotes(slide, currentIndex) {
        const notesContainer = document.getElementById('cpNotesContent');
        if (!notesContainer || !slide) return;

        const skill = slide.dataset.skill || 'general';
        const slideTitleEl = slide.querySelector('h1, h2, .slide-title, .module-title');
        const slideTitle = slideTitleEl ? slideTitleEl.textContent.trim().replace(/\s+/g, ' ') : `Slide ${currentIndex + 1}`;
        const slideNum = slide.querySelector('.slide-number')?.textContent || `Slide ${currentIndex + 1}`;
        const customNote = slide.querySelector('.teacher-note')?.innerHTML;

        const storageKey = `cp_custom_note_${window.location.pathname}_${currentIndex}`;
        const userSavedNote = localStorage.getItem(storageKey) || '';

        let guidanceHTML = '';
        if (window.presenterNotesEngine && typeof window.presenterNotesEngine.getDefaultGuidance === 'function') {
            guidanceHTML = window.presenterNotesEngine.getDefaultGuidance(skill, slide);
        } else {
            guidanceHTML = `
                <div class="cp-note-block">
                    <h4>🎯 Masterclass Objective</h4>
                    <p>Guide students through the core concepts and elicit authentic speaking/writing responses.</p>
                </div>
            `;
        }

        notesContainer.innerHTML = `
            <div class="cp-notes-slide-head">
                <div class="cp-notes-slide-title">${slideTitle}</div>
                <div class="cp-notes-meta">
                    <span class="cp-badge-num">${slideNum}</span>
                    <span class="cp-badge-skill ${skill}">${skill.toUpperCase()}</span>
                </div>
            </div>

            <!-- Custom Teacher Sticky Notes -->
            <div class="cp-note-block custom-note">
                <h4>⭐ Teacher Guidance &amp; Cues</h4>
                <div class="cp-editable-note" id="cpCustomNoteText" contenteditable="true" placeholder="Click here to type private teaching notes...">${userSavedNote || customNote || 'Click here to add personal teaching cues for this slide...'}</div>
            </div>

            ${guidanceHTML}
        `;

        const editableEl = document.getElementById('cpCustomNoteText');
        if (editableEl) {
            editableEl.oninput = () => {
                localStorage.setItem(storageKey, editableEl.innerHTML);
            };
        }
    }

    /**
     * Interactive Canvas Drawing & Laser
     */
    setupPresenterDrawCanvas() {
        const canvas = document.getElementById('presenterDrawCanvas');
        const laserDot = document.getElementById('presenterLaserDot');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let isDrawing = false;
        let strokePoints = [];

        canvas.addEventListener('mousedown', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const normX = Math.max(0, Math.min(1, x / rect.width));
            const normY = Math.max(0, Math.min(1, y / rect.height));

            if (this.laserActive) {
                if (laserDot) {
                    laserDot.style.display = 'block';
                    laserDot.style.left = `${e.clientX}px`;
                    laserDot.style.top = `${e.clientY}px`;
                }
                this.sync.emit('LASER_MOVE', { normX, normY });
            }

            if (this.penActive) {
                isDrawing = true;
                strokePoints = [{ normX, normY }];
                ctx.beginPath();
                ctx.moveTo(x, y);
            }
        });

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const normX = Math.max(0, Math.min(1, x / rect.width));
            const normY = Math.max(0, Math.min(1, y / rect.height));

            if (this.laserActive) {
                if (laserDot) {
                    laserDot.style.display = 'block';
                    laserDot.style.left = `${e.clientX}px`;
                    laserDot.style.top = `${e.clientY}px`;
                }
                this.sync.emit('LASER_MOVE', { normX, normY });
            }

            if (this.isSpotlight) {
                this.sync.emit('SPOTLIGHT_MOVE', { normX, normY });
            }

            if (this.penActive && isDrawing) {
                ctx.lineTo(x, y);
                ctx.strokeStyle = this.penColor;
                ctx.lineWidth = this.penWidth;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.stroke();

                strokePoints.push({ normX, normY });
                if (strokePoints.length > 3) {
                    this.sync.emit('PEN_DRAW', {
                        stroke: strokePoints,
                        color: this.penColor,
                        width: this.penWidth
                    });
                    strokePoints = [{ normX, normY }];
                }
            }
        });

        canvas.addEventListener('mouseleave', () => {
            if (laserDot) laserDot.style.display = 'none';
        });

        window.addEventListener('mouseup', () => {
            if (isDrawing && strokePoints.length > 0) {
                this.sync.emit('PEN_DRAW', {
                    stroke: strokePoints,
                    color: this.penColor,
                    width: this.penWidth
                });
            }
            isDrawing = false;
            strokePoints = [];
        });
    }

    /**
     * Presenter Keyboard Shortcuts
     */
    bindPresenterKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable) {
                return;
            }

            const key = e.key.toLowerCase();

            // Next / Prev slide
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
                e.preventDefault();
                window.deckEngine && window.deckEngine.nextSlide();
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                window.deckEngine && window.deckEngine.prevSlide();
            } else if (e.key === 'Home') {
                e.preventDefault();
                window.deckEngine && window.deckEngine.showSlide(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                const total = document.querySelectorAll('.slide').length;
                window.deckEngine && window.deckEngine.showSlide(total - 1);
            } else if (e.shiftKey && key === 'a') {
                e.preventDefault();
                window.deckEngine && window.deckEngine.toggleAspectRatio();
                this.sync.emit('ASPECT_RATIO', { ratio: window.deckEngine.aspectRatio });
                this.updatePresenterSlideView();
            } else if (e.shiftKey && key === 't') {
                e.preventDefault();
                window.deckThemeEngine && window.deckThemeEngine.cycleTheme();
                this.sync.emit('THEME_CHANGE', { themeId: window.deckThemeEngine.currentTheme });
                this.updatePresenterSlideView();
            } else if (key === 'l') {
                e.preventDefault();
                this.setToolMode(this.activeToolMode === 'laser' ? 'none' : 'laser');
            } else if (key === 'p') {
                e.preventDefault();
                this.setToolMode(this.activeToolMode === 'pen' ? 'none' : 'pen');
            } else if (key === 'h') {
                e.preventDefault();
                this.setToolMode(this.activeToolMode === 'highlighter' ? 'none' : 'highlighter');
            } else if (key === 'c') {
                e.preventDefault();
                this.clearDrawings();
            } else if (key === 'e') {
                e.preventDefault();
                this.triggerStepReveal();
            } else if (key === 'r') {
                e.preventDefault();
                this.triggerStudentPicker();
            } else if (key === 'b' || key === '.') {
                e.preventDefault();
                this.toggleBlackout();
            } else if (key === 'w') {
                e.preventDefault();
                this.toggleWhiteout();
            } else if (key === 's') {
                e.preventDefault();
                this.toggleSpotlight();
            } else if (key === 'z') {
                e.preventDefault();
                this.triggerParagraphLoupe();
            } else if (key === 'f') {
                e.preventDefault();
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                } else {
                    document.exitFullscreen().catch(() => {});
                }
            } else if (key === '?' || (e.shiftKey && e.key === '/')) {
                e.preventDefault();
                const modal = document.getElementById('cpHelpModal');
                if (modal) modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
            } else if (key === 'escape') {
                const modal = document.getElementById('cpHelpModal');
                if (modal) modal.style.display = 'none';
                if (this.isBlackout || this.isWhiteout || this.isSpotlight) {
                    this.clearBlanking();
                }
                if (this.activeToolMode !== 'none') {
                    this.setToolMode('none');
                }
            }
        });
    }

    /**
     * Canva Magic Confetti Effect
     */
    launchConfetti() {
        const canvas = document.getElementById('cpConfettiCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const pieces = [];
        const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

        for (let i = 0; i < 140; i++) {
            pieces.push({
                x: window.innerWidth * (0.2 + Math.random() * 0.6),
                y: window.innerHeight * 0.45,
                vx: (Math.random() - 0.5) * 18,
                vy: -Math.random() * 15 - 5,
                size: Math.random() * 8 + 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rSpeed: (Math.random() - 0.5) * 14,
                opacity: 1
            });
        }

        let animationFrame = null;
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let alive = false;

            pieces.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.45;
                p.rotation += p.rSpeed;
                p.opacity -= 0.008;

                if (p.opacity > 0) {
                    alive = true;
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation * Math.PI) / 180);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = Math.max(0, p.opacity);
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                    ctx.restore();
                }
            });

            if (alive) {
                animationFrame = requestAnimationFrame(render);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                cancelAnimationFrame(animationFrame);
            }
        };

        render();
    }

    /**
     * Presenter Stylesheet
     */
    injectPresenterStyles() {
        if (document.getElementById('presenterCockpitStyles')) return;
        const style = document.createElement('style');
        style.id = 'presenterCockpitStyles';
        style.textContent = PRESENTER_COCKPIT_CSS;
        document.head.appendChild(style);
    }
}

// Auto-Instantiate Global Presenter View Module
window.presenterSyncEngine = new PresenterSyncEngine();
window.presenterViewUI = new PresenterViewUI(window.presenterSyncEngine);
