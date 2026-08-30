/**
 * ==========================================================================
 * CANVA-STYLE PRESENTER COCKPIT & BIDIRECTIONAL SCREEN SYNCHRONIZATION
 * (PresenterViewModule - PresenterSyncEngine & PresenterViewUI)
 * 
 * Provides a state-of-the-art dual-screen presentation experience for teachers:
 * 1. 🔄 Bidirectional zero-latency BroadcastChannel & LocalStorage synchronization
 * 2. 🎛️ Full Teacher Toolkit directly inside Presenter Cockpit:
 *    - ⚡ Socratic Actions: Step Reveal, Random Student Picker, Confetti, Loupe
 *    - ✏️ Drawing Studio: Pen, Highlighters, Laser Pointer, Multi-colors, Clear, Undo
 *    - ⏱️ Classroom Countdown Timer & Presentation Elapsed Stopwatch with chimes
 *    - 🎯 Screen Focus: Blackout (B), Whiteout (W), Spotlight (S)
 *    - 🎨 1-Click Aesthetic Themes & 16:9 / 4:3 Aspect Ratio Switcher
 *    - 📝 Pedagogical Guidance, Common IELTS Pitfalls, and Auto-saved Notes
 * 3. 🎯 Interactive Slide Preview Stage: Real-time laser and pen mirroring
 * 4. 🎞️ Bottom Filmstrip Thumbnail Carousel with smooth active scrolling
 * 5. ⌨️ Global Keyboard Shortcut Dispatcher in both views
 * ==========================================================================
 */

class PresenterSyncEngine {
    constructor() {
        this.channelName = 'ielts_presentation_sync_channel';
        this.instanceId = 'deck_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
        this.listeners = new Map();
        this.isConnected = false;
        this.hasRemotePeer = false;
        this.lastPeerHeartbeat = 0;
        this.processedMessageIds = new Set();

        this.initChannel();
    }

    initChannel() {
        if (typeof BroadcastChannel !== 'undefined') {
            try {
                this.channel = new BroadcastChannel(this.channelName);
                this.channel.onmessage = (event) => this.handleIncomingMessage(event.data);
                this.isConnected = true;
            } catch (err) {
                console.warn('BroadcastChannel failed, falling back to localStorage sync', err);
                this.initStorageFallback();
            }
        } else {
            this.initStorageFallback();
        }

        // Periodic heartbeat & peer discovery
        setInterval(() => {
            const isPresenter = window.presenterViewUI ? window.presenterViewUI.isPresenter : false;
            this.emit('HEARTBEAT', { senderId: this.instanceId, isPresenter });

            // Check peer liveness (no message in 8s = waiting)
            if (this.lastPeerHeartbeat > 0 && Date.now() - this.lastPeerHeartbeat > 8000) {
                this.hasRemotePeer = false;
                this.notifyStatusChange(false);
            }
        }, 2500);
    }

    initStorageFallback() {
        window.addEventListener('storage', (e) => {
            if (e.key === this.channelName && e.newValue) {
                try {
                    const data = JSON.parse(e.newValue);
                    this.handleIncomingMessage(data);
                } catch (err) {
                    console.error('Failed to parse storage sync message', err);
                }
            }
        });
        this.isConnected = true;
    }

    send(type, payload = {}) {
        const message = {
            type,
            payload,
            senderId: this.instanceId,
            timestamp: Date.now(),
            nonce: Math.random()
        };

        if (this.channel) {
            try {
                this.channel.postMessage(message);
            } catch (err) {
                console.warn('Channel postMessage failed', err);
            }
        }

        // Also write to localStorage to support cross-process and cross-window sync
        try {
            localStorage.setItem(this.channelName, JSON.stringify(message));
        } catch (e) {}
    }

    handleIncomingMessage(message) {
        if (!message || message.senderId === this.instanceId) return;

        // Deduplicate messages across BroadcastChannel and Storage events
        const msgId = `${message.senderId}_${message.timestamp}_${message.type}_${message.nonce || 0}`;
        if (this.processedMessageIds.has(msgId)) return;
        this.processedMessageIds.add(msgId);
        if (this.processedMessageIds.size > 200) {
            const first = this.processedMessageIds.values().next().value;
            this.processedMessageIds.delete(first);
        }

        this.hasRemotePeer = true;
        this.lastPeerHeartbeat = Date.now();
        this.notifyStatusChange(true);

        const handlers = this.listeners.get(message.type) || [];
        handlers.forEach(handler => {
            try {
                handler(message.payload, message);
            } catch (err) {
                console.error(`Error in sync handler for ${message.type}:`, err);
            }
        });

        // Universal wildcard listeners
        const allHandlers = this.listeners.get('*') || [];
        allHandlers.forEach(handler => {
            try {
                handler(message.type, message.payload, message);
            } catch (err) {}
        });
    }

    on(type, handler) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
        }
        this.listeners.get(type).push(handler);
    }

    off(type, handler) {
        if (!this.listeners.has(type)) return;
        const list = this.listeners.get(type).filter(h => h !== handler);
        this.listeners.set(type, list);
    }

    emit(type, payload) {
        this.send(type, payload);
    }

    notifyStatusChange(connected) {
        const dot = document.getElementById('cpSyncDot');
        if (dot) {
            dot.className = connected ? 'cp-sync-dot connected' : 'cp-sync-dot waiting';
            dot.title = connected ? 'Synchronized with audience presentation window' : 'Waiting for audience presentation window...';
        }
    }
}

class PresenterViewUI {
    constructor(syncEngine) {
        this.sync = syncEngine;
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

        // Remote Highlighter Clear / Undo
        this.sync.on('HIGHLIGHTER_CLEAR', () => {
            if (window.teacherHighlighter) window.teacherHighlighter.clear(false);
        });
        this.sync.on('HIGHLIGHTER_UNDO', () => {
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
        this.sync.on('PARAGRAPH_LOUPE_CMD', () => {
            if (window.paragraphLoupe) window.paragraphLoupe.toggle();
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

        this.sync.emit('SYNC_RESPONSE', {
            currentSlide,
            aspectRatio,
            theme,
            timerSeconds,
            timerRunning,
            isBlackout,
            isWhiteout,
            isSpotlight
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

        cockpit.innerHTML = `
            <!-- Top Canva Navigation Header Bar -->
            <header class="cp-header">
                <div class="cp-header-left">
                    <div class="cp-clock" id="cpLiveClock">--:--</div>
                    <div class="cp-header-divider"></div>
                    <div class="cp-timer-group">
                        <span class="cp-stopwatch" id="cpElapsedTimer">00:00</span>
                        <button class="cp-icon-btn" id="btnCpResetTimer" title="Reset stopwatch (R)">↺</button>
                        <button class="cp-icon-btn" id="btnCpPauseTimer" title="Pause / Resume stopwatch (Space)">⏸</button>
                    </div>
                    <div class="cp-sync-dot waiting" id="cpSyncDot" title="Waiting for audience presentation window..."></div>
                </div>

                <div class="cp-header-right">
                    <button class="cp-action-btn" id="btnCpMagic" title="Step Reveal Next Answer (E)">
                        <span class="cp-icon">🪄</span><span class="cp-btn-lbl">Reveal</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpLaser" title="Laser Pointer (L)">
                        <span class="cp-icon">🔴</span><span class="cp-btn-lbl">Laser</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpPen" title="Drawing Pen (P)">
                        <span class="cp-icon">✏️</span><span class="cp-btn-lbl">Draw</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpHighlighter" title="Text Highlighter (H)">
                        <span class="cp-icon">🖍️</span><span class="cp-btn-lbl">Highlight</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpSpotlight" title="Spotlight Focus (S)">
                        <span class="cp-icon">💡</span><span class="cp-btn-lbl">Spotlight</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpBlackout" title="Blackout Screen (B)">
                        <span class="cp-icon">⬛</span><span class="cp-btn-lbl">Blackout</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpStudent" title="Random Student Picker (R)">
                        <span class="cp-icon">🎲</span><span class="cp-btn-lbl">Picker</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpTimerModal" title="Classroom Timer (T)">
                        <span class="cp-icon">⏱️</span><span class="cp-btn-lbl">Timer</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpTheme" title="Switch Presentation Theme (Shift+T)">
                        <span class="cp-icon">🎨</span><span class="cp-btn-lbl">Theme</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpConfetti" title="Confetti Celebration">
                        <span class="cp-icon">🎉</span>
                    </button>
                    <button class="cp-action-btn" id="btnCpHelp" title="Keyboard Shortcuts (?)">
                        <span class="cp-icon">❓</span>
                    </button>
                    <div class="cp-header-divider"></div>
                    <button class="cp-action-btn cp-close-btn" id="btnCpClose" title="Close Presenter View">
                        <span class="cp-icon">✕</span>
                    </button>
                </div>
            </header>

            <!-- Main Split Workspace -->
            <main class="cp-workspace" id="cpWorkspace">
                <!-- Left Column: Live Slide Stage & Bottom Filmstrip -->
                <section class="cp-stage-col" id="cpStageCol">
                    <!-- Central Slide Viewport Area -->
                    <div class="cp-stage-viewport" id="cpStageViewport">
                        <div class="slide-preview-scaler" id="cpCurrentSlideScaler"></div>
                        <canvas id="presenterDrawCanvas" class="presenter-draw-canvas"></canvas>
                        <div id="presenterLaserDot" class="presenter-laser-dot"></div>

                        <!-- Canva Floating Slide Control Pill -->
                        <div class="cp-nav-pill" id="cpNavPill">
                            <button class="cp-pill-btn" id="btnCpFirst" title="First Slide (Home)">⏮</button>
                            <button class="cp-pill-btn" id="btnCpPrev" title="Previous Slide (Left Arrow / PageUp)">‹</button>
                            <span class="cp-pill-counter" id="cpSlideCounter">1 / 1</span>
                            <button class="cp-pill-btn" id="btnCpNext" title="Next Slide (Right Arrow / Space / PageDown)">›</button>
                            <button class="cp-pill-btn" id="btnCpZoom" title="Toggle Aspect Ratio (Shift+A)">📐</button>
                        </div>

                        <!-- Fullscreen Toggle -->
                        <button class="cp-fullscreen-btn" id="btnCpFullscreen" title="Toggle Fullscreen (F)">⤢</button>
                    </div>

                    <!-- Bottom Horizontal Filmstrip Carousel -->
                    <div class="cp-filmstrip-section">
                        <button class="cp-filmstrip-scroll-btn left" id="btnFilmstripLeft" title="Scroll left">‹</button>
                        <div class="cp-filmstrip-track" id="cpFilmstripTrack">
                            <!-- Populated with all slide thumbnails -->
                        </div>
                        <button class="cp-filmstrip-scroll-btn right" id="btnFilmstripRight" title="Scroll right">›</button>
                    </div>
                </section>

                <!-- Draggable Resizer Splitter -->
                <div class="cp-splitter" id="cpSplitter">
                    <div class="cp-splitter-handle"></div>
                </div>

                <!-- Right Column: Notes & Complete Teacher Toolkit Panel -->
                <aside class="cp-notes-col" id="cpNotesCol">
                    <!-- Tabs Header -->
                    <div class="cp-notes-tabs">
                        <button class="cp-tab-btn active" data-tab="notes" id="tabNotesBtn">
                            <span class="cp-tab-icon">📝</span> Teaching Notes
                        </button>
                        <button class="cp-tab-btn" data-tab="toolkit" id="tabToolkitBtn">
                            <span class="cp-tab-icon">🛠️</span> Teacher's Toolkit
                        </button>
                    </div>

                    <!-- Tab 1: Pedagogical Guidance & Notes -->
                    <div class="cp-tab-pane active" id="paneNotes">
                        <div class="cp-notes-body" id="cpNotesContent">
                            <!-- Dynamic Content -->
                        </div>
                        <!-- Bottom Notes Toolbar (Font Size & Edit) -->
                        <footer class="cp-notes-footer">
                            <div class="cp-font-controls">
                                <button class="cp-footer-btn" id="btnFontDec" title="Decrease font size">—</button>
                                <button class="cp-footer-btn font-label" id="btnFontReset" title="Reset font size">AA</button>
                                <button class="cp-footer-btn" id="btnFontInc" title="Increase font size">+</button>
                            </div>
                            <button class="cp-footer-btn edit-note-btn" id="btnEditCustomNote" title="Edit slide notes">
                                ✏️ Edit Notes
                            </button>
                        </footer>
                    </div>

                    <!-- Tab 2: Full Teacher Toolkit -->
                    <div class="cp-tab-pane" id="paneToolkit">
                        <div class="cp-toolkit-scroll">
                            <!-- Section 1: Socratic & Interactive Actions -->
                            <div class="cp-toolkit-card">
                                <h4>⚡ Interactive Socratic Actions</h4>
                                <div class="cp-btn-grid">
                                    <button class="cp-tool-btn primary" id="btnToolStepReveal">
                                        🪄 Step Reveal (E)
                                    </button>
                                    <button class="cp-tool-btn" id="btnToolStudentPicker">
                                        🎲 Student Picker (R)
                                    </button>
                                    <button class="cp-tool-btn" id="btnToolLoupe">
                                        🔍 Paragraph Loupe (Z)
                                    </button>
                                    <button class="cp-tool-btn" id="btnToolConfetti">
                                        🎉 Confetti Cheer
                                    </button>
                                </div>
                                <div class="cp-student-display-pill" id="cpPickedStudentDisplay" style="display:none;">
                                    <span>Selected:</span> <strong id="cpPickedStudentName">Alex</strong>
                                </div>
                            </div>

                            <!-- Section 2: Drawing & Highlighting Studio -->
                            <div class="cp-toolkit-card">
                                <h4>✏️ Drawing &amp; Highlighting Studio</h4>
                                <div class="cp-tool-mode-bar">
                                    <button class="cp-mode-btn active" data-mode="none" id="modeBtnCursor" title="Normal Cursor">👆 Cursor</button>
                                    <button class="cp-mode-btn" data-mode="laser" id="modeBtnLaser" title="Laser Pointer (L)">🔴 Laser</button>
                                    <button class="cp-mode-btn" data-mode="pen" id="modeBtnPen" title="Pen Drawing (P)">✏️ Pen</button>
                                    <button class="cp-mode-btn" data-mode="highlighter" id="modeBtnHighlighter" title="Text Highlighter (H)">🖍️ Marker</button>
                                </div>

                                <!-- Pen Color Swatches -->
                                <div class="cp-palette-group" id="cpPenPalette" style="display:none;">
                                    <span class="cp-palette-label">Pen Color:</span>
                                    <div class="cp-color-swatches">
                                        <button class="cp-swatch active" style="background:#ef4444;" data-color="#ef4444" title="Red"></button>
                                        <button class="cp-swatch" style="background:#facc15;" data-color="#facc15" title="Yellow"></button>
                                        <button class="cp-swatch" style="background:#10b981;" data-color="#10b981" title="Green"></button>
                                        <button class="cp-swatch" style="background:#38bdf8;" data-color="#38bdf8" title="Sky Cyan"></button>
                                        <button class="cp-swatch" style="background:#ffffff;" data-color="#ffffff" title="White"></button>
                                    </div>
                                    <div class="cp-width-swatches">
                                        <button class="cp-width-btn" data-width="2">Fine</button>
                                        <button class="cp-width-btn active" data-width="3.5">Medium</button>
                                        <button class="cp-width-btn" data-width="6">Thick</button>
                                    </div>
                                </div>

                                <!-- Highlighter Color Swatches -->
                                <div class="cp-palette-group" id="cpHighlighterPalette" style="display:none;">
                                    <span class="cp-palette-label">Highlighter Color:</span>
                                    <div class="cp-color-swatches">
                                        <button class="cp-swatch hl active" style="background:#facc15;" data-index="0" title="Fluorescent Yellow"></button>
                                        <button class="cp-swatch hl" style="background:#4ade80;" data-index="1" title="Neon Green"></button>
                                        <button class="cp-swatch hl" style="background:#38bdf8;" data-index="2" title="Sky Cyan"></button>
                                        <button class="cp-swatch hl" style="background:#f472b6;" data-index="3" title="Coral Pink"></button>
                                    </div>
                                </div>

                                <div class="cp-btn-grid" style="margin-top:10px;">
                                    <button class="cp-tool-btn" id="btnToolUndoHighlight" title="Undo Last Highlight (Ctrl+Z)">
                                        ↩️ Undo Highlight
                                    </button>
                                    <button class="cp-tool-btn danger" id="btnToolClearDrawings" title="Clear All Drawings (C)">
                                        🗑️ Clear Ink (C)
                                    </button>
                                </div>
                            </div>

                            <!-- Section 3: Classroom Countdown Timer & Stopwatch -->
                            <div class="cp-toolkit-card">
                                <h4>⏱️ Classroom Countdown Timer</h4>
                                <div class="cp-timer-countdown-display" id="cpCountdownDisplay">00:00</div>
                                <div class="cp-timer-presets">
                                    <button class="cp-quick-timer-btn" data-sec="60">+1m</button>
                                    <button class="cp-quick-timer-btn" data-sec="120">+2m</button>
                                    <button class="cp-quick-timer-btn" data-sec="180">+3m</button>
                                    <button class="cp-quick-timer-btn" data-sec="300">+5m</button>
                                    <button class="cp-quick-timer-btn" data-sec="600">+10m</button>
                                    <button class="cp-quick-timer-btn" data-sec="900">+15m</button>
                                </div>
                                <div class="cp-btn-grid" style="margin-top:10px;">
                                    <button class="cp-tool-btn primary" id="btnToolTimerToggle">▶ Start Timer</button>
                                    <button class="cp-tool-btn" id="btnToolTimerReset">↺ Reset</button>
                                </div>
                            </div>

                            <!-- Section 4: Screen Blanking & Focus Controls -->
                            <div class="cp-toolkit-card">
                                <h4>🎯 Screen Blanking &amp; Focus</h4>
                                <div class="cp-btn-grid">
                                    <button class="cp-tool-btn" id="btnToolBlackout">⬛ Blackout (B)</button>
                                    <button class="cp-tool-btn" id="btnToolWhiteout">⬜ Whiteout (W)</button>
                                    <button class="cp-tool-btn" id="btnToolSpotlight">💡 Spotlight (S)</button>
                                    <button class="cp-tool-btn" id="btnToolClearBlanking">✨ Clear Mute</button>
                                </div>
                            </div>

                            <!-- Section 5: Presentation Theme & Aesthetics -->
                            <div class="cp-toolkit-card">
                                <h4>🎨 Presentation Theme &amp; Layout</h4>
                                <div class="cp-theme-presets-grid">
                                    <button class="cp-theme-pill-btn" data-theme="academic">🎓 Academic</button>
                                    <button class="cp-theme-pill-btn" data-theme="bold-signal">⚡ Bold Signal</button>
                                    <button class="cp-theme-pill-btn" data-theme="electric">💎 Electric</button>
                                    <button class="cp-theme-pill-btn" data-theme="botanical">🌿 Botanical</button>
                                    <button class="cp-theme-pill-btn" data-theme="voltage">🚀 Voltage</button>
                                    <button class="cp-theme-pill-btn" data-theme="vintage">📜 Vintage</button>
                                </div>
                                <div class="cp-btn-grid" style="margin-top:10px;">
                                    <button class="cp-tool-btn" id="btnToolAspectToggle">📐 Aspect Ratio (16:9 / 4:3)</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            <!-- Confetti Canvas Layer -->
            <canvas id="cpConfettiCanvas" class="cp-confetti-canvas"></canvas>

            <!-- Keyboard Shortcuts Modal -->
            <div class="cp-help-modal" id="cpHelpModal" style="display:none;">
                <div class="cp-help-dialog">
                    <div class="cp-help-header">
                        <span>⌨️ Presenter Cockpit Shortcuts</span>
                        <button class="cp-help-close" id="btnCpHelpClose">×</button>
                    </div>
                    <div class="cp-help-grid">
                        <div><kbd>→</kbd> / <kbd>Space</kbd></div><div>Next Slide</div>
                        <div><kbd>←</kbd> / <kbd>PageUp</kbd></div><div>Previous Slide</div>
                        <div><kbd>Home</kbd> / <kbd>End</kbd></div><div>First / Last Slide</div>
                        <div><kbd>E</kbd></div><div>Step Reveal Next Answer</div>
                        <div><kbd>L</kbd></div><div>Toggle Laser Pointer</div>
                        <div><kbd>P</kbd></div><div>Toggle Pen Drawing</div>
                        <div><kbd>H</kbd></div><div>Toggle Text Highlighter</div>
                        <div><kbd>C</kbd></div><div>Clear All Ink &amp; Drawings</div>
                        <div><kbd>Ctrl + Z</kbd></div><div>Undo Last Highlight</div>
                        <div><kbd>B</kbd> / <kbd>.</kbd></div><div>Screen Blackout</div>
                        <div><kbd>W</kbd></div><div>Screen Whiteout</div>
                        <div><kbd>S</kbd></div><div>Spotlight Dimmer</div>
                        <div><kbd>T</kbd></div><div>Toggle Classroom Timer</div>
                        <div><kbd>R</kbd></div><div>Random Student Picker Spin</div>
                        <div><kbd>Z</kbd></div><div>Paragraph Loupe Zoom</div>
                        <div><kbd>Shift + T</kbd></div><div>Cycle Aesthetic Theme</div>
                        <div><kbd>Shift + A</kbd></div><div>Toggle 16:9 / 4:3 Ratio</div>
                        <div><kbd>F</kbd></div><div>Toggle Fullscreen</div>
                        <div><kbd>?</kbd></div><div>Toggle Shortcuts Help</div>
                    </div>
                </div>
            </div>
        `;

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

        // Sync Evidence Focus / Clear
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

        // Sync Exercise Actions
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
            this.updatePresenterSlideView();
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
            }
            const scaler = document.getElementById('cpCurrentSlideScaler');
            if (scaler) {
                const cloneInputs = scaler.querySelectorAll('.blank-input, .select-input');
                const cloneTarget = cloneInputs[data.inputIndex];
                if (cloneTarget && cloneTarget.value !== data.value) {
                    cloneTarget.value = data.value;
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

        if (btnFirst) {
            btnFirst.onclick = () => window.deckEngine && window.deckEngine.showSlide(0);
        }
        if (btnPrev) {
            btnPrev.onclick = () => window.deckEngine && window.deckEngine.prevSlide();
        }
        if (btnNext) {
            btnNext.onclick = () => window.deckEngine && window.deckEngine.nextSlide();
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
            btnFullscreen.onclick = () => {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                } else {
                    document.exitFullscreen().catch(() => {});
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
            window.teacherHighlighter.toggle(false);
            window.teacherHighlighter.setColor(this.highlighterColorIndex);
        } else if (!this.highlighterActive && window.teacherHighlighter && window.teacherHighlighter.isActive) {
            window.teacherHighlighter.toggle(false);
        }

        // Sync with Audience Screen
        this.sync.emit('LASER_STATE', { active: this.laserActive });
        this.sync.emit('PEN_STATE', { active: this.penActive });
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
            this.sync.emit('PARAGRAPH_LOUPE_CMD', {});
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
                    value: input.value
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
                    if (card) {
                        const exp = card.querySelector('.item-explanation');
                        if (exp) exp.classList.toggle('show');
                    }
                }
                return;
            }

            // 3. Word chips
            const wordChip = e.target.closest('.word-chip');
            if (wordChip && window.vocabBank) {
                e.preventDefault();
                e.stopPropagation();
                window.vocabBank.handleChipClick(wordChip, currentSlide);
                setTimeout(() => this.updatePresenterSlideView(), 60);
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

            // 5. Action buttons (Check, Reveal, Reset)
            const actionBtn = e.target.closest('button');
            if (actionBtn && actionBtn.onclick) {
                setTimeout(() => {
                    this.updatePresenterSlideView();
                }, 60);
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

        const availW = Math.max(100, parentW - 48);
        const availH = Math.max(100, parentH - 72);

        const scale = Math.min(availW / targetW, availH / targetH);
        const scaledW = targetW * scale;
        const scaledH = targetH * scale;
        const offsetX = Math.max(0, (parentW - scaledW) / 2);
        const offsetY = Math.max(0, (parentH - scaledH) / 2 - 12);

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
        style.textContent = `
            html.presenter-window,
            body.presenter-window {
                margin: 0 !important;
                padding: 0 !important;
                background: #111217 !important;
                color: #f1f5f9 !important;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif !important;
                overflow: hidden !important;
                height: 100vh !important;
                width: 100vw !important;
            }
            html.presenter-window .deck-viewport,
            body.presenter-window .deck-viewport,
            html.presenter-window #deckStage,
            body.presenter-window #deckStage,
            html.presenter-window #presentationToolsHUD,
            body.presenter-window #presentationToolsHUD,
            html.presenter-window .slide-indicator,
            body.presenter-window .slide-indicator,
            html.presenter-window .aspect-toast,
            body.presenter-window .aspect-toast,
            html.presenter-window .font-indicator,
            body.presenter-window .font-indicator,
            html.presenter-window #fontIndicator,
            body.presenter-window #fontIndicator,
            html.presenter-window .presenter-notes-drawer,
            body.presenter-window .presenter-notes-drawer,
            html.presenter-window .reading-loupe-card,
            body.presenter-window .reading-loupe-card,
            html.presenter-window .reading-loupe-overlay,
            body.presenter-window .reading-loupe-overlay,
            html.presenter-window .deck-watermark,
            body.presenter-window .deck-watermark {
                display: none !important;
                visibility: hidden !important;
                pointer-events: none !important;
            }

            .canva-presenter-cockpit {
                position: fixed;
                inset: 0;
                z-index: 99999;
                display: flex;
                flex-direction: column;
                height: 100vh;
                width: 100vw;
                background: #111217;
                overflow: hidden;
            }

            /* TOP BAR */
            .cp-header {
                height: 54px;
                background: #18191f;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 16px;
                user-select: none;
                flex-shrink: 0;
            }
            .cp-header-left {
                display: flex;
                align-items: center;
                gap: 14px;
            }
            .cp-clock {
                font-size: 19px;
                font-weight: 700;
                color: #ffffff;
                letter-spacing: -0.5px;
            }
            .cp-header-divider {
                width: 1px;
                height: 20px;
                background: rgba(255, 255, 255, 0.14);
            }
            .cp-timer-group {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .cp-stopwatch {
                font-size: 19px;
                font-weight: 700;
                color: #ffffff;
                letter-spacing: -0.5px;
                min-width: 52px;
            }
            .cp-icon-btn {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.12);
                color: #e2e8f0;
                width: 28px;
                height: 28px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                cursor: pointer;
                transition: all 0.15s ease;
            }
            .cp-icon-btn:hover {
                background: rgba(255, 255, 255, 0.18);
                color: #ffffff;
            }
            .cp-sync-dot {
                width: 9px;
                height: 9px;
                border-radius: 50%;
                margin-left: 6px;
            }
            .cp-sync-dot.connected {
                background: #10b981;
                box-shadow: 0 0 8px #10b981;
            }
            .cp-sync-dot.waiting {
                background: #f59e0b;
                box-shadow: 0 0 8px #f59e0b;
            }

            .cp-header-right {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .cp-action-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.08);
                color: #cbd5e1;
                padding: 6px 10px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 12.5px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.15s ease;
            }
            .cp-action-btn:hover {
                background: rgba(255, 255, 255, 0.15);
                color: #ffffff;
            }
            .cp-action-btn.active {
                background: #3b82f6;
                border-color: #60a5fa;
                color: #ffffff;
                box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
            }
            .cp-btn-lbl {
                font-size: 12px;
            }
            .cp-close-btn:hover {
                background: #ef4444 !important;
                border-color: #ef4444 !important;
                color: #fff !important;
            }

            /* WORKSPACE LAYOUT */
            .cp-workspace {
                flex: 1;
                display: flex;
                overflow: hidden;
                position: relative;
            }

            /* LEFT STAGE COLUMN */
            .cp-stage-col {
                flex: 0 0 65%;
                display: flex;
                flex-direction: column;
                background: #0f1015;
                border-right: 1px solid rgba(255, 255, 255, 0.08);
                overflow: hidden;
                position: relative;
            }
            .cp-stage-viewport {
                flex: 1;
                position: relative;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #0a0a0e;
            }
            .slide-preview-scaler {
                position: absolute;
                top: 0;
                left: 0;
                box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6);
                border-radius: 8px;
                overflow: hidden;
                background: #0b0f19;
                pointer-events: none;
                color: var(--text-dark, #0f172a);
            }
            .slide-preview-scaler .slide {
                width: 100% !important;
                height: 100% !important;
                position: absolute !important;
                inset: 0 !important;
                display: flex !important;
                opacity: 1 !important;
                visibility: visible !important;
                color: var(--text-dark, #0f172a);
            }
            .slide-preview-scaler .slide-inner,
            .slide-preview-scaler .notebook,
            .slide-preview-scaler .page-content {
                color: var(--text-dark, #0f172a);
            }
            .slide-preview-scaler .rule-card,
            .slide-preview-scaler .card,
            .slide-preview-scaler .discuss-card,
            .slide-preview-scaler .reading-pane,
            .slide-preview-scaler .essay-card,
            .slide-preview-scaler .model-breakdown-card,
            .slide-preview-scaler .q-card {
                color: var(--text-dark, #0f172a);
            }
            .slide-preview-scaler p,
            .slide-preview-scaler li,
            .slide-preview-scaler span,
            .slide-preview-scaler em,
            .slide-preview-scaler strong {
                color: inherit;
            }
            .presenter-draw-canvas {
                position: absolute;
                z-index: 100;
                pointer-events: none;
            }
            .presenter-laser-dot {
                position: fixed;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: #ef4444;
                box-shadow: 0 0 14px 4px #ef4444, 0 0 2px 2px #fff;
                pointer-events: none;
                z-index: 101;
                transform: translate(-50%, -50%);
                display: none;
            }

            /* FLOATING NAV PILL */
            .cp-nav-pill {
                position: absolute;
                bottom: 16px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(18, 20, 29, 0.9);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 30px;
                padding: 4px 8px;
                display: flex;
                align-items: center;
                gap: 6px;
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
                z-index: 200;
                user-select: none;
            }
            .cp-pill-btn {
                background: transparent;
                border: none;
                color: #cbd5e1;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.15s;
            }
            .cp-pill-btn:hover {
                background: rgba(255, 255, 255, 0.15);
                color: #fff;
            }
            .cp-pill-counter {
                font-size: 13px;
                font-weight: 700;
                color: #ffffff;
                padding: 0 8px;
                min-width: 60px;
                text-align: center;
                font-family: inherit;
            }
            .cp-fullscreen-btn {
                position: absolute;
                top: 14px;
                right: 14px;
                background: rgba(18, 20, 29, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.12);
                color: #cbd5e1;
                width: 32px;
                height: 32px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                cursor: pointer;
                z-index: 200;
            }
            .cp-fullscreen-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                color: #fff;
            }

            /* BOTTOM FILMSTRIP */
            .cp-filmstrip-section {
                height: 104px;
                background: #14151b;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
                display: flex;
                align-items: center;
                padding: 8px 12px;
                position: relative;
                flex-shrink: 0;
            }
            .cp-filmstrip-scroll-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #cbd5e1;
                width: 26px;
                height: 52px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                cursor: pointer;
                z-index: 10;
                flex-shrink: 0;
            }
            .cp-filmstrip-scroll-btn:hover {
                background: rgba(255, 255, 255, 0.18);
                color: #fff;
            }
            .cp-filmstrip-track {
                flex: 1;
                display: flex;
                gap: 10px;
                overflow-x: auto;
                padding: 4px 10px;
                scroll-behavior: smooth;
            }
            .cp-filmstrip-track::-webkit-scrollbar {
                height: 5px;
            }
            .cp-filmstrip-track::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.18);
                border-radius: 3px;
            }
            .cp-filmstrip-card {
                flex: 0 0 120px;
                height: 72px;
                background: #1e2029;
                border: 1.5px solid rgba(255, 255, 255, 0.12);
                border-radius: 6px;
                padding: 5px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                cursor: pointer;
                transition: all 0.18s ease;
                user-select: none;
            }
            .cp-filmstrip-card:hover {
                border-color: rgba(255, 255, 255, 0.3);
                transform: translateY(-2px);
            }
            .cp-filmstrip-card.active {
                border-color: #3b82f6;
                box-shadow: 0 0 12px rgba(59, 130, 246, 0.4);
                background: #1e293b;
            }
            .cp-card-preview-mini {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .cp-card-num {
                font-size: 11px;
                font-weight: 700;
                color: #94a3b8;
            }
            .cp-card-skill-tag {
                font-size: 9px;
                font-weight: 800;
                text-transform: uppercase;
                padding: 1px 4px;
                border-radius: 3px;
                background: rgba(255, 255, 255, 0.1);
                color: #cbd5e1;
            }
            .cp-card-skill-tag.read { background: rgba(56, 189, 248, 0.2); color: #38bdf8; }
            .cp-card-skill-tag.write { background: rgba(244, 114, 182, 0.2); color: #f472b6; }
            .cp-card-skill-tag.vocab { background: rgba(74, 222, 128, 0.2); color: #4ade80; }
            .cp-card-skill-tag.grammar { background: rgba(250, 204, 21, 0.2); color: #facc15; }
            .cp-card-title {
                font-size: 10.5px;
                color: #e2e8f0;
                font-weight: 600;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            /* RESIZER SPLITTER */
            .cp-splitter {
                width: 8px;
                cursor: col-resize;
                background: #18191f;
                position: relative;
                z-index: 150;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .cp-splitter-handle {
                width: 3px;
                height: 32px;
                background: rgba(255, 255, 255, 0.25);
                border-radius: 2px;
            }
            .cp-splitter:hover .cp-splitter-handle {
                background: #3b82f6;
            }

            /* RIGHT NOTES & TOOLKIT COLUMN */
            .cp-notes-col {
                flex: 0 0 35%;
                display: flex;
                flex-direction: column;
                background: #14151b;
                overflow: hidden;
            }
            .cp-notes-tabs {
                height: 44px;
                background: #18191f;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                display: flex;
                align-items: center;
                padding: 0 12px;
                gap: 6px;
                flex-shrink: 0;
            }
            .cp-tab-btn {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 13px;
                font-weight: 600;
                padding: 6px 12px;
                border-radius: 6px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 6px;
                transition: all 0.15s;
            }
            .cp-tab-btn:hover {
                color: #fff;
                background: rgba(255, 255, 255, 0.06);
            }
            .cp-tab-btn.active {
                color: #ffffff;
                background: rgba(255, 255, 255, 0.12);
                box-shadow: inset 0 -2px 0 #3b82f6;
            }
            .cp-tab-pane {
                display: none;
                flex: 1;
                flex-direction: column;
                overflow: hidden;
            }
            .cp-tab-pane.active {
                display: flex;
            }

            /* NOTES CONTENT */
            .cp-notes-body {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 14px;
            }
            .cp-notes-slide-head {
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                padding-bottom: 10px;
            }
            .cp-notes-slide-title {
                font-size: 17px;
                font-weight: 800;
                color: #ffffff;
                margin-bottom: 4px;
            }
            .cp-notes-meta {
                display: flex;
                gap: 8px;
                align-items: center;
            }
            .cp-badge-num {
                font-size: 11.5px;
                color: #94a3b8;
                font-weight: 600;
            }
            .cp-badge-skill {
                font-size: 10px;
                font-weight: 800;
                padding: 2px 6px;
                border-radius: 4px;
                background: #3b82f6;
                color: #fff;
            }
            .cp-note-block {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 8px;
                padding: 12px 14px;
            }
            .cp-note-block.custom-note {
                border-color: rgba(250, 204, 21, 0.3);
                background: rgba(250, 204, 21, 0.05);
            }
            .cp-note-block h4 {
                font-size: 13.5px;
                font-weight: 700;
                margin: 0 0 6px 0;
                color: #38bdf8;
            }
            .cp-note-block.custom-note h4 {
                color: #facc15;
            }
            .cp-note-block p {
                font-size: 13px;
                color: #cbd5e1;
                margin: 0 0 6px 0;
                line-height: 1.5;
            }
            .cp-editable-note {
                font-size: 13px;
                color: #e2e8f0;
                line-height: 1.5;
                outline: none;
                min-height: 48px;
            }

            /* NOTES FOOTER */
            .cp-notes-footer {
                height: 46px;
                background: #18191f;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 16px;
                flex-shrink: 0;
            }
            .cp-font-controls {
                display: flex;
                align-items: center;
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 6px;
                overflow: hidden;
            }
            .cp-footer-btn {
                background: transparent;
                border: none;
                color: #94a3b8;
                height: 26px;
                min-width: 26px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: 700;
                cursor: pointer;
            }
            .cp-footer-btn:hover { background: rgba(255, 255, 255, 0.15); color: #fff; }
            .cp-footer-btn.font-label { font-size: 11px; padding: 0 4px; cursor: default; }
            .edit-note-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 6px;
                color: #e2e8f0;
                padding: 4px 10px;
                font-size: 12px;
                cursor: pointer;
            }

            /* TOOLKIT TAB CONTENT */
            .cp-toolkit-scroll {
                flex: 1;
                overflow-y: auto;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 14px;
            }
            .cp-toolkit-card {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 10px;
                padding: 14px;
            }
            .cp-toolkit-card h4 {
                font-size: 13.5px;
                font-weight: 700;
                color: #f1f5f9;
                margin: 0 0 10px 0;
            }
            .cp-btn-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }
            .cp-tool-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #e2e8f0;
                padding: 8px 10px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                transition: all 0.15s;
            }
            .cp-tool-btn:hover {
                background: rgba(255, 255, 255, 0.15);
                color: #fff;
            }
            .cp-tool-btn.primary {
                background: #2563eb;
                border-color: #3b82f6;
                color: #fff;
            }
            .cp-tool-btn.primary:hover { background: #1d4ed8; }
            .cp-tool-btn.active {
                background: #8b5cf6;
                border-color: #a78bfa;
                color: #fff;
            }
            .cp-tool-btn.danger:hover {
                background: rgba(239, 68, 68, 0.2);
                border-color: #ef4444;
                color: #f87171;
            }

            .cp-student-display-pill {
                margin-top: 10px;
                padding: 8px 12px;
                background: rgba(59, 130, 246, 0.15);
                border: 1px solid rgba(59, 130, 246, 0.3);
                border-radius: 6px;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 13px;
                color: #93c5fd;
            }
            .cp-student-display-pill strong {
                font-size: 15px;
                color: #ffffff;
            }

            /* Tool Mode Bar */
            .cp-tool-mode-bar {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 4px;
                background: rgba(0, 0, 0, 0.25);
                padding: 3px;
                border-radius: 6px;
                margin-bottom: 10px;
            }
            .cp-mode-btn {
                background: transparent;
                border: none;
                color: #94a3b8;
                padding: 6px 4px;
                border-radius: 4px;
                font-size: 11.5px;
                font-weight: 600;
                cursor: pointer;
            }
            .cp-mode-btn.active {
                background: #3b82f6;
                color: #fff;
            }

            /* Palettes */
            .cp-palette-group {
                margin-bottom: 10px;
            }
            .cp-palette-label {
                font-size: 11.5px;
                color: #94a3b8;
                display: block;
                margin-bottom: 6px;
            }
            .cp-color-swatches {
                display: flex;
                gap: 8px;
                margin-bottom: 8px;
            }
            .cp-swatch {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 2px solid transparent;
                cursor: pointer;
                transition: transform 0.15s;
            }
            .cp-swatch:hover { transform: scale(1.15); }
            .cp-swatch.active { border-color: #fff; transform: scale(1.15); }
            .cp-width-swatches {
                display: flex;
                gap: 6px;
            }
            .cp-width-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #cbd5e1;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 11px;
                cursor: pointer;
            }
            .cp-width-btn.active {
                background: #3b82f6;
                color: #fff;
            }

            /* Timer Section */
            .cp-timer-countdown-display {
                font-size: 32px;
                font-weight: 800;
                color: #38bdf8;
                text-align: center;
                letter-spacing: 1.5px;
                font-family: 'JetBrains Mono', monospace, sans-serif;
                margin: 4px 0 10px 0;
            }
            .cp-timer-presets {
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                gap: 4px;
            }
            .cp-quick-timer-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #cbd5e1;
                padding: 6px 0;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 700;
                cursor: pointer;
            }
            .cp-quick-timer-btn:hover {
                background: #8b5cf6;
                color: #fff;
            }

            /* Themes Grid */
            .cp-theme-presets-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 6px;
            }
            .cp-theme-pill-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #cbd5e1;
                padding: 6px;
                border-radius: 6px;
                font-size: 11px;
                font-weight: 600;
                cursor: pointer;
            }
            .cp-theme-pill-btn:hover {
                background: rgba(255, 255, 255, 0.18);
                color: #fff;
            }

            /* CONFETTI & MODALS */
            .cp-confetti-canvas {
                position: fixed;
                inset: 0;
                pointer-events: none;
                z-index: 100000;
            }

            .cp-help-modal {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.75);
                backdrop-filter: blur(8px);
                z-index: 100001;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .cp-help-dialog {
                width: 440px;
                background: #18191f;
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 12px;
                padding: 18px;
                color: #ffffff;
                box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
            }
            .cp-help-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: 700;
                font-size: 15px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding-bottom: 10px;
                margin-bottom: 14px;
            }
            .cp-help-close {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 20px;
                cursor: pointer;
            }
            .cp-help-close:hover { color: #fff; }
            .cp-help-grid {
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 8px 14px;
                font-size: 12.5px;
                color: #cbd5e1;
            }
            .cp-help-grid kbd {
                background: rgba(255, 255, 255, 0.12);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                padding: 2px 6px;
                font-size: 11px;
                color: #fff;
            }
        `;
        document.head.appendChild(style);
    }
}

// Auto-Instantiate Global Presenter View Module
window.presenterSyncEngine = new PresenterSyncEngine();
window.presenterViewUI = new PresenterViewUI(window.presenterSyncEngine);
