/**
 * ==========================================================================
 * PRESENTER VIEW & SYNCHRONIZED TEACHER TOOLKIT (PresenterViewModule)
 * 
 * Provides a dual-screen presenter cockpit for IELTS classroom teaching:
 * 1. BroadcastChannel / LocalStorage zero-latency bidirectional synchronization
 * 2. Dedicated Presenter Cockpit with Live Current Slide & Next Slide Preview
 * 3. Real-time Presentation Masterclass Clock & Elapsed Stopwatch
 * 4. Rich Pedagogical Notes & Common IELTS Traps guidance
 * 5. Full Master Teacher Toolkit Control Console (Laser, Pen, Highlighter,
 *    Timer, Student Picker, Step-Reveal, Spotlight, Blackout/Whiteout)
 * 6. Visual Slide Grid thumbnail jumper
 * ==========================================================================
 */

class PresenterSyncEngine {
    constructor() {
        this.channelName = 'ielts_presentation_sync_channel';
        this.instanceId = 'deck_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
        this.listeners = new Map();
        this.isConnected = false;
        this.hasRemotePeer = false;

        this.initChannel();
    }

    initChannel() {
        if (typeof BroadcastChannel !== 'undefined') {
            try {
                this.channel = new BroadcastChannel(this.channelName);
                this.channel.onmessage = (event) => this.handleIncomingMessage(event.data);
                this.isConnected = true;
            } catch (err) {
                console.warn('BroadcastChannel failed, using localStorage fallback', err);
                this.initStorageFallback();
            }
        } else {
            this.initStorageFallback();
        }

        // Periodic heartbeat & peer discovery
        setInterval(() => {
            this.emit('HEARTBEAT', { senderId: this.instanceId, isPresenter: window.presenterViewUI ? window.presenterViewUI.isPresenter : false });
        }, 3000);
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
            timestamp: Date.now()
        };

        if (this.channel) {
            try {
                this.channel.postMessage(message);
            } catch (err) {
                console.warn('Channel postMessage failed', err);
            }
        }

        // Also write to localStorage for fallback or cross-origin/cross-context support
        try {
            localStorage.setItem(this.channelName, JSON.stringify(message));
        } catch (e) {}
    }

    handleIncomingMessage(message) {
        if (!message || message.senderId === this.instanceId) return;

        this.hasRemotePeer = true;
        this.notifyStatusChange(true);

        const handlers = this.listeners.get(message.type) || [];
        handlers.forEach(handler => {
            try {
                handler(message.payload, message);
            } catch (err) {
                console.error(`Error in sync handler for ${message.type}:`, err);
            }
        });

        // Universal listeners
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
        const badge = document.getElementById('presenterSyncBadge');
        if (badge) {
            if (connected) {
                badge.className = 'sync-status-badge connected';
                badge.innerHTML = '<span class="status-dot"></span> Synchronized with Audience View';
            } else {
                badge.className = 'sync-status-badge waiting';
                badge.innerHTML = '<span class="status-dot"></span> Waiting for Audience View...';
            }
        }
    }
}

class PresenterViewUI {
    constructor(syncEngine) {
        this.sync = syncEngine;
        this.isPresenter = this.checkIfPresenterMode();
        this.elapsedSeconds = 0;
        this.elapsedInterval = null;
        this.clockInterval = null;
        this.laserActive = false;
        this.penActive = false;
        this.penColor = '#ef4444';
        this.activeTab = 'notes'; // 'notes' | 'toolkit' | 'grid'

        this.init();
    }

    checkIfPresenterMode() {
        const params = new URLSearchParams(window.location.search);
        return params.get('presenter') === 'true' || window.location.hash.toLowerCase() === '#presenter';
    }

    init() {
        if (this.isPresenter) {
            document.documentElement.classList.add('presenter-window');
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.buildPresenterCockpit());
            } else {
                this.buildPresenterCockpit();
            }
        } else {
            this.setupAudienceSyncListener();
        }

        // Global shortcut Alt+P to open presenter view
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
        const presenterWindow = window.open(
            url.toString(),
            'ielts_presenter_view_' + window.location.pathname,
            'width=1380,height=860,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes'
        );
        if (presenterWindow) {
            presenterWindow.focus();
        } else {
            alert('Popup was blocked by your browser. Please allow popups for Presenter View.');
        }
    }

    setupAudienceSyncListener() {
        // When audience view starts or receives sync request, reply with current state
        this.sync.on('SYNC_REQUEST', () => {
            this.broadcastCurrentState();
        });

        // Remote slide navigation from presenter
        this.sync.on('NAVIGATE_SLIDE', (data) => {
            if (window.deckEngine && typeof data.slideIndex === 'number') {
                if (window.deckEngine.currentSlide !== data.slideIndex) {
                    window.deckEngine.showSlide(data.slideIndex, false);
                }
            }
        });

        // Remote Laser
        this.sync.on('LASER_STATE', (data) => {
            if (window.laserPointer) {
                if (data.active && !window.laserPointer.isActive) window.laserPointer.activate();
                if (!data.active && window.laserPointer.isActive) window.laserPointer.deactivate();
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
                if (data.active && !window.penAnnotation.isActive) window.penAnnotation.activate();
                if (!data.active && window.penAnnotation.isActive) window.penAnnotation.deactivate();
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
            if (window.penAnnotation) window.penAnnotation.clear();
        });

        // Remote Highlighter Clear / Undo / Color
        this.sync.on('HIGHLIGHTER_CLEAR', () => {
            if (window.teacherHighlighter) window.teacherHighlighter.clear();
        });
        this.sync.on('HIGHLIGHTER_UNDO', () => {
            if (window.teacherHighlighter) window.teacherHighlighter.undo();
        });
        this.sync.on('HIGHLIGHTER_COLOR', (data) => {
            if (window.teacherHighlighter) window.teacherHighlighter.setColor(data.index);
        });

        // Remote Step Reveal
        this.sync.on('STEP_REVEAL_CMD', () => {
            if (window.stepRevealEngine) window.stepRevealEngine.revealNextOnActiveSlide();
        });

        // Remote Spotlight
        this.sync.on('SPOTLIGHT_STATE', (data) => {
            if (window.presentationSpotlight) {
                if (data.active && !window.presentationSpotlight.isActive) window.presentationSpotlight.activate();
                if (!data.active && window.presentationSpotlight.isActive) window.presentationSpotlight.deactivate();
                if (data.active && data.normX != null) {
                    const x = data.normX * window.innerWidth;
                    const y = data.normY * window.innerHeight;
                    window.presentationSpotlight.updatePosition(x, y);
                }
            }
        });

        // Remote Blackout / Whiteout
        this.sync.on('BLACKOUT_STATE', (data) => {
            if (window.deckEngine) {
                if (data.blackout) {
                    window.deckEngine.toggleBlackout(true);
                } else if (data.whiteout) {
                    window.deckEngine.toggleWhiteout(true);
                } else {
                    window.deckEngine.clearScreenCover();
                }
            }
        });

        // Remote Timer Commands
        this.sync.on('TIMER_CMD', (data) => {
            if (window.classroomTimer) {
                if (data.action === 'set') window.classroomTimer.setTimer(data.seconds);
                if (data.action === 'start') {
                    if (!window.classroomTimer.timerRunning) window.classroomTimer.toggleRun();
                }
                if (data.action === 'pause') {
                    if (window.classroomTimer.timerRunning) window.classroomTimer.toggleRun();
                }
                if (data.action === 'reset') window.classroomTimer.reset();
            }
        });

        // Remote Student Picker
        this.sync.on('STUDENT_PICK_CMD', () => {
            if (window.studentPicker) {
                if (!window.studentPicker.isOpen) window.studentPicker.openModal();
                window.studentPicker.pickRandomStudent();
            }
        });

        // Remote Aspect Ratio & Theme
        this.sync.on('ASPECT_RATIO', (data) => {
            if (window.deckEngine && window.deckEngine.aspectRatio !== data.ratio) {
                window.deckEngine.applyAspectRatio(data.ratio, true);
            }
        });

        this.sync.on('THEME', (data) => {
            if (window.deckThemeEngine) {
                window.deckThemeEngine.applyTheme(data.theme);
            }
        });
    }

    broadcastCurrentState() {
        if (!window.deckEngine) return;
        const currentSlide = window.deckEngine.currentSlide || 0;
        const aspectRatio = window.deckEngine.aspectRatio || '16:9';
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'vintage';
        const timerSeconds = window.classroomTimer ? window.classroomTimer.timerSeconds : 0;
        const timerRunning = window.classroomTimer ? window.classroomTimer.timerRunning : false;

        this.sync.emit('SYNC_RESPONSE', {
            currentSlide,
            aspectRatio,
            currentTheme,
            timerSeconds,
            timerRunning
        });
    }

    /**
     * =========================================================================
     * PRESENTER COCKPIT BUILDER & UI LOGIC
     * =========================================================================
     */
    buildPresenterCockpit() {
        const titleText = document.title || 'IELTS Masterclass Deck';

        // Inject Presenter CSS
        this.injectPresenterStyles();

        // Create main Cockpit Container
        const cockpit = document.createElement('div');
        cockpit.id = 'presenterCockpit';
        cockpit.className = 'presenter-cockpit';

        cockpit.innerHTML = `
            <!-- Top Navigation Bar -->
            <header class="cockpit-header">
                <div class="cockpit-header-left">
                    <span class="cockpit-badge">👨‍🏫 PRESENTER COCKPIT</span>
                    <h1 class="cockpit-title" id="cockpitTitle">${titleText}</h1>
                </div>
                <div class="cockpit-header-center">
                    <div class="sync-status-badge connected" id="presenterSyncBadge">
                        <span class="status-dot"></span> Synchronized with Audience View
                    </div>
                </div>
                <div class="cockpit-header-right">
                    <div class="cockpit-clock-box">
                        <span class="cockpit-label">LOCAL TIME</span>
                        <span class="cockpit-value" id="cockpitClock">00:00:00</span>
                    </div>
                    <div class="cockpit-elapsed-box">
                        <span class="cockpit-label">ELAPSED TIME</span>
                        <div class="elapsed-time-row">
                            <span class="cockpit-value highlight" id="cockpitElapsed">00:00:00</span>
                            <button class="btn-elapsed-icon" id="btnElapsedPause" title="Pause / Resume Elapsed Timer">⏸</button>
                            <button class="btn-elapsed-icon" id="btnElapsedReset" title="Reset Elapsed Timer">↺</button>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Main Workspace Dual-Pane Grid -->
            <main class="cockpit-main">
                <!-- Left Pane: Slide Monitor -->
                <section class="cockpit-monitor-pane">
                    <!-- Current Slide Live Stage Preview -->
                    <div class="monitor-card current-slide-card">
                        <div class="monitor-card-header">
                            <div class="monitor-title-wrap">
                                <span class="monitor-badge live">● LIVE AUDIENCE SCREEN</span>
                                <span class="slide-indicator" id="cockpitSlideNum">Slide 1 / 1</span>
                            </div>
                            <div class="monitor-skill-pill" id="cockpitSkillPill">GENERAL</div>
                        </div>
                        <div class="current-slide-viewport" id="currentSlideViewport">
                            <!-- Cloned / Scaled Active Slide -->
                            <div class="slide-preview-scaler" id="currentSlideScaler"></div>
                            <!-- Live Laser / Pen Interactive Canvas Layer -->
                            <canvas id="presenterDrawCanvas" class="presenter-draw-canvas"></canvas>
                        </div>
                    </div>

                    <!-- Slide Navigation Bottom Toolbar -->
                    <div class="monitor-nav-bar">
                        <button class="nav-control-btn" id="btnFirstSlide" title="First Slide (Home)">⏮ First</button>
                        <button class="nav-control-btn primary" id="btnPrevSlide" title="Previous Slide (Left Arrow / PageUp)">◀ Previous</button>
                        <div class="slide-jump-wrapper">
                            <select id="slideJumpSelect" class="slide-jump-select" title="Jump directly to slide"></select>
                        </div>
                        <button class="nav-control-btn primary" id="btnNextSlide" title="Next Slide (Right Arrow / Space / PageDown)">Next ▶</button>
                        <button class="nav-control-btn" id="btnLastSlide" title="Last Slide (End)">Last ⏭</button>
                    </div>

                    <!-- Next Slide Preview Monitor -->
                    <div class="monitor-card next-slide-card">
                        <div class="monitor-card-header">
                            <span class="monitor-badge next">🔜 UPCOMING NEXT SLIDE</span>
                            <span class="next-slide-title" id="nextSlideTitle">Loading next slide...</span>
                        </div>
                        <div class="next-slide-viewport" id="nextSlideViewport">
                            <div class="slide-preview-scaler" id="nextSlideScaler"></div>
                        </div>
                    </div>
                </section>

                <!-- Right Pane: Pedagogical Notes & Toolkit Console -->
                <aside class="cockpit-control-pane">
                    <!-- Tab Selector Buttons -->
                    <div class="cockpit-tabs-header">
                        <button class="cockpit-tab-btn active" data-tab="notes" id="tabBtnNotes">📝 Teacher Notes</button>
                        <button class="cockpit-tab-btn" data-tab="toolkit" id="tabBtnToolkit">🛠️ Toolkit Command</button>
                        <button class="cockpit-tab-btn" data-tab="grid" id="tabBtnGrid">🗂️ All Slides Grid</button>
                    </div>

                    <!-- Tab 1: Pedagogical Guidance & Notes -->
                    <div class="tab-pane-content active" id="tabPaneNotes">
                        <div class="notes-container-inner" id="presenterCockpitNotes">
                            <!-- Dynamic Content -->
                        </div>
                    </div>

                    <!-- Tab 2: Master Teacher Toolkit Console -->
                    <div class="tab-pane-content" id="tabPaneToolkit">
                        <div class="toolkit-console-grid">
                            <!-- Quick Action Row -->
                            <div class="toolkit-section">
                                <h3 class="toolkit-section-title">⚡ Socratic Interaction</h3>
                                <div class="tool-action-group">
                                    <button class="tool-action-btn primary" id="btnToolkitStepReveal" title="Reveal Next Question/Input (E)">
                                        <span class="action-icon">👉</span>
                                        <span class="action-text">Step Reveal (E)</span>
                                    </button>
                                    <button class="tool-action-btn" id="btnToolkitStudentPicker" title="Spin Random Student Wheel (R)">
                                        <span class="action-icon">🎲</span>
                                        <span class="action-text">Student Picker (R)</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Pointer & Annotations -->
                            <div class="toolkit-section">
                                <h3 class="toolkit-section-title">🎯 Pointer &amp; Annotations</h3>
                                <div class="tool-action-group">
                                    <button class="tool-action-btn" id="btnToolkitLaser" title="Toggle Red Laser Pointer (L)">
                                        <span class="action-icon">🔴</span>
                                        <span class="action-text">Laser (L)</span>
                                    </button>
                                    <button class="tool-action-btn" id="btnToolkitPen" title="Toggle Drawing Pen (P)">
                                        <span class="action-icon">✏️</span>
                                        <span class="action-text">Draw Pen (P)</span>
                                    </button>
                                    <button class="tool-action-btn" id="btnToolkitHighlight" title="Toggle Real Text Highlighter (H)">
                                        <span class="action-icon">🖍️</span>
                                        <span class="action-text">Highlighter (H)</span>
                                    </button>
                                    <button class="tool-action-btn danger" id="btnToolkitClearDrawings" title="Clear Canvas &amp; Highlights (C)">
                                        <span class="action-icon">🗑️</span>
                                        <span class="action-text">Clear All (C)</span>
                                    </button>
                                </div>
                                <div class="pen-color-palette" id="toolkitPenPalette">
                                    <span class="palette-label">Pen Color:</span>
                                    <button class="palette-dot active" style="background:#ef4444;" data-color="#ef4444" title="Red"></button>
                                    <button class="palette-dot" style="background:#3b82f6;" data-color="#3b82f6" title="Blue"></button>
                                    <button class="palette-dot" style="background:#facc15;" data-color="#facc15" title="Yellow"></button>
                                    <button class="palette-dot" style="background:#10b981;" data-color="#10b981" title="Green"></button>
                                    <button class="palette-dot" style="background:#ffffff;" data-color="#ffffff" title="White"></button>
                                </div>
                            </div>

                            <!-- Classroom Timer Controls -->
                            <div class="toolkit-section">
                                <div class="timer-section-header">
                                    <h3 class="toolkit-section-title">⏱️ Classroom Timer</h3>
                                    <span class="toolkit-timer-display" id="toolkitTimerDisplay">00:00</span>
                                </div>
                                <div class="timer-preset-row">
                                    <button class="timer-quick-btn" data-time="60">+1m</button>
                                    <button class="timer-quick-btn" data-time="180">+3m</button>
                                    <button class="timer-quick-btn" data-time="300">+5m</button>
                                    <button class="timer-quick-btn" data-time="600">+10m</button>
                                </div>
                                <div class="timer-control-row">
                                    <button class="tool-action-btn primary" id="btnToolkitTimerToggle">▶ Start Timer</button>
                                    <button class="tool-action-btn" id="btnToolkitTimerReset">↺ Reset</button>
                                </div>
                            </div>

                            <!-- Focus & Screen Control -->
                            <div class="toolkit-section">
                                <h3 class="toolkit-section-title">🔒 Attention &amp; Screen Blanking</h3>
                                <div class="tool-action-group">
                                    <button class="tool-action-btn" id="btnToolkitBlackout" title="Blackout Audience Screen (B)">
                                        <span class="action-icon">⬛</span>
                                        <span class="action-text">Blackout (B)</span>
                                    </button>
                                    <button class="tool-action-btn" id="btnToolkitWhiteout" title="Whiteout Audience Screen (W)">
                                        <span class="action-icon">⬜</span>
                                        <span class="action-text">Whiteout (W)</span>
                                    </button>
                                    <button class="tool-action-btn" id="btnToolkitSpotlight" title="Spotlight Dimmer (S)">
                                        <span class="action-icon">💡</span>
                                        <span class="action-text">Spotlight (S)</span>
                                    </button>
                                    <button class="tool-action-btn" id="btnToolkitAspect" title="Aspect Ratio (Shift+A)">
                                        <span class="action-icon">📐</span>
                                        <span class="action-text">16:9 / 4:3</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tab 3: Visual Slide Grid -->
                    <div class="tab-pane-content" id="tabPaneGrid">
                        <div class="slides-thumbnail-grid" id="cockpitThumbnailGrid">
                            <!-- Populated with all slides -->
                        </div>
                    </div>
                </aside>
            </main>
        `;

        document.body.appendChild(cockpit);

        // Hide original audience floating HUD and background if in presenter mode
        const origHUD = document.getElementById('presentationToolsHUD');
        if (origHUD) origHUD.style.display = 'none';

        // Setup Presenter Timers
        this.setupClockAndStopwatch();

        // Setup Tab Navigation
        this.setupTabs();

        // Setup Slide Jumper and Thumbnails
        this.populateSlideList();

        // Bind Navigation Controls
        this.bindNavigationControls();

        // Bind Toolkit Controls
        this.bindToolkitControls();

        // Bind Drawing & Laser on Presenter Preview
        this.setupPresenterDrawCanvas();

        // Request initial state from Audience window
        this.sync.emit('SYNC_REQUEST', {});

        // Listen for slide updates in audience window or local DeckEngine
        this.sync.on('SYNC_RESPONSE', (state) => {
            if (window.deckEngine && typeof state.currentSlide === 'number') {
                window.deckEngine.showSlide(state.currentSlide, false);
            }
            this.updatePresenterSlideView();
        });

        // Whenever local slide changes, update preview and broadcast to audience
        window.addEventListener('slidechanged', () => {
            this.updatePresenterSlideView();
            if (window.deckEngine) {
                this.sync.emit('NAVIGATE_SLIDE', { slideIndex: window.deckEngine.currentSlide });
            }
        });

        // Initial preview update
        setTimeout(() => this.updatePresenterSlideView(), 150);
    }

    setupClockAndStopwatch() {
        const clockEl = document.getElementById('cockpitClock');
        const elapsedEl = document.getElementById('cockpitElapsed');
        const pauseBtn = document.getElementById('btnElapsedPause');
        const resetBtn = document.getElementById('btnElapsedReset');

        let isRunning = true;

        const updateClock = () => {
            const now = new Date();
            if (clockEl) {
                clockEl.textContent = now.toLocaleTimeString('en-US', { hour12: false });
            }
        };
        updateClock();
        this.clockInterval = setInterval(updateClock, 1000);

        const formatElapsed = (sec) => {
            const hrs = String(Math.floor(sec / 3600)).padStart(2, '0');
            const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
            const secs = String(sec % 60).padStart(2, '0');
            return `${hrs}:${mins}:${secs}`;
        };

        this.elapsedInterval = setInterval(() => {
            if (isRunning) {
                this.elapsedSeconds++;
                if (elapsedEl) elapsedEl.textContent = formatElapsed(this.elapsedSeconds);
            }
        }, 1000);

        if (pauseBtn) {
            pauseBtn.onclick = () => {
                isRunning = !isRunning;
                pauseBtn.textContent = isRunning ? '⏸' : '▶';
                pauseBtn.title = isRunning ? 'Pause Elapsed Timer' : 'Resume Elapsed Timer';
            };
        }

        if (resetBtn) {
            resetBtn.onclick = () => {
                this.elapsedSeconds = 0;
                if (elapsedEl) elapsedEl.textContent = '00:00:00';
            };
        }
    }

    setupTabs() {
        const tabs = document.querySelectorAll('.cockpit-tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                tabs.forEach(t => t.classList.toggle('active', t === tab));
                document.querySelectorAll('.tab-pane-content').forEach(pane => {
                    pane.classList.toggle('active', pane.id === 'tabPane' + targetTab.charAt(0).toUpperCase() + targetTab.slice(1));
                });
                this.activeTab = targetTab;
            });
        });
    }

    populateSlideList() {
        const slides = document.querySelectorAll('.slide');
        const select = document.getElementById('slideJumpSelect');
        const grid = document.getElementById('cockpitThumbnailGrid');
        if (!slides.length) return;

        if (select) select.innerHTML = '';
        if (grid) grid.innerHTML = '';

        slides.forEach((slide, idx) => {
            const titleEl = slide.querySelector('h1, h2, .slide-title, .module-title');
            const title = titleEl ? titleEl.textContent.trim().replace(/\s+/g, ' ') : `Slide ${idx + 1}`;
            const skill = slide.dataset.skill || 'general';

            // Populate Dropdown
            if (select) {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.textContent = `${idx + 1}. [${skill.toUpperCase()}] ${title.substring(0, 45)}`;
                select.appendChild(opt);
            }

            // Populate Thumbnail Grid
            if (grid) {
                const item = document.createElement('div');
                item.className = 'grid-thumb-card';
                item.dataset.slideIndex = idx;
                item.innerHTML = `
                    <div class="thumb-header">
                        <span class="thumb-num">#${idx + 1}</span>
                        <span class="thumb-skill ${skill}">${skill}</span>
                    </div>
                    <div class="thumb-title">${title.substring(0, 50)}</div>
                `;
                item.onclick = () => {
                    if (window.deckEngine) window.deckEngine.showSlide(idx);
                };
                grid.appendChild(item);
            }
        });

        if (select) {
            select.onchange = (e) => {
                const targetIdx = parseInt(e.target.value, 10);
                if (window.deckEngine && !isNaN(targetIdx)) {
                    window.deckEngine.showSlide(targetIdx);
                }
            };
        }
    }

    bindNavigationControls() {
        const btnPrev = document.getElementById('btnPrevSlide');
        const btnNext = document.getElementById('btnNextSlide');
        const btnFirst = document.getElementById('btnFirstSlide');
        const btnLast = document.getElementById('btnLastSlide');

        if (btnPrev) {
            btnPrev.onclick = () => {
                if (window.deckEngine) window.deckEngine.prevSlide();
            };
        }

        if (btnNext) {
            btnNext.onclick = () => {
                if (window.deckEngine) window.deckEngine.nextSlide();
            };
        }

        if (btnFirst) {
            btnFirst.onclick = () => {
                if (window.deckEngine) window.deckEngine.showSlide(0);
            };
        }

        if (btnLast) {
            btnLast.onclick = () => {
                const slides = document.querySelectorAll('.slide');
                if (window.deckEngine && slides.length > 0) {
                    window.deckEngine.showSlide(slides.length - 1);
                }
            };
        }
    }

    bindToolkitControls() {
        // Step Reveal
        const btnStep = document.getElementById('btnToolkitStepReveal');
        if (btnStep) {
            btnStep.onclick = () => {
                if (window.stepRevealEngine) window.stepRevealEngine.revealNextOnActiveSlide();
                this.sync.emit('STEP_REVEAL_CMD', {});
            };
        }

        // Student Picker
        const btnStudent = document.getElementById('btnToolkitStudentPicker');
        if (btnStudent) {
            btnStudent.onclick = () => {
                if (window.studentPicker) {
                    if (!window.studentPicker.isOpen) window.studentPicker.openModal();
                    window.studentPicker.pickRandomStudent();
                }
                this.sync.emit('STUDENT_PICK_CMD', {});
            };
        }

        // Laser Toggle
        const btnLaser = document.getElementById('btnToolkitLaser');
        if (btnLaser) {
            btnLaser.onclick = () => {
                this.laserActive = !this.laserActive;
                btnLaser.classList.toggle('active', this.laserActive);
                if (this.laserActive && this.penActive) {
                    this.penActive = false;
                    document.getElementById('btnToolkitPen')?.classList.remove('active');
                }
                this.sync.emit('LASER_STATE', { active: this.laserActive });
            };
        }

        // Pen Toggle
        const btnPen = document.getElementById('btnToolkitPen');
        if (btnPen) {
            btnPen.onclick = () => {
                this.penActive = !this.penActive;
                btnPen.classList.toggle('active', this.penActive);
                if (this.penActive && this.laserActive) {
                    this.laserActive = false;
                    document.getElementById('btnToolkitLaser')?.classList.remove('active');
                }
                this.sync.emit('PEN_STATE', { active: this.penActive, color: this.penColor });
            };
        }

        // Pen Palette Dots
        const dots = document.querySelectorAll('.palette-dot');
        dots.forEach(dot => {
            dot.onclick = () => {
                dots.forEach(d => d.classList.toggle('active', d === dot));
                this.penColor = dot.dataset.color || '#ef4444';
                if (this.penActive) {
                    this.sync.emit('PEN_STATE', { active: true, color: this.penColor });
                }
            };
        });

        // Highlighter Toggle
        const btnHighlighter = document.getElementById('btnToolkitHighlight');
        if (btnHighlighter) {
            btnHighlighter.onclick = () => {
                if (window.teacherHighlighter) window.teacherHighlighter.toggle();
                const isActive = window.teacherHighlighter ? window.teacherHighlighter.isActive : false;
                btnHighlighter.classList.toggle('active', isActive);
            };
        }

        // Clear Canvas & Highlights
        const btnClear = document.getElementById('btnToolkitClearDrawings');
        if (btnClear) {
            btnClear.onclick = () => {
                const canvas = document.getElementById('presenterDrawCanvas');
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                if (window.penAnnotation) window.penAnnotation.clear();
                if (window.teacherHighlighter) window.teacherHighlighter.clear();
                this.sync.emit('PEN_CLEAR', {});
                this.sync.emit('HIGHLIGHTER_CLEAR', {});
            };
        }

        // Classroom Timer Quick Presets & Start/Reset
        const timerBtns = document.querySelectorAll('.timer-quick-btn');
        timerBtns.forEach(btn => {
            btn.onclick = () => {
                const secs = parseInt(btn.dataset.time, 10);
                if (window.classroomTimer && !isNaN(secs)) {
                    window.classroomTimer.setTimer(secs);
                    this.sync.emit('TIMER_CMD', { action: 'set', seconds: secs });
                    this.updateTimerDisplay(secs);
                }
            };
        });

        const btnTimerToggle = document.getElementById('btnToolkitTimerToggle');
        if (btnTimerToggle) {
            btnTimerToggle.onclick = () => {
                if (window.classroomTimer) {
                    window.classroomTimer.toggleRun();
                    const running = window.classroomTimer.timerRunning;
                    btnTimerToggle.textContent = running ? '⏸ Pause Timer' : '▶ Start Timer';
                    this.sync.emit('TIMER_CMD', { action: running ? 'start' : 'pause' });
                }
            };
        }

        const btnTimerReset = document.getElementById('btnToolkitTimerReset');
        if (btnTimerReset) {
            btnTimerReset.onclick = () => {
                if (window.classroomTimer) {
                    window.classroomTimer.reset();
                    btnTimerToggle.textContent = '▶ Start Timer';
                    this.sync.emit('TIMER_CMD', { action: 'reset' });
                    this.updateTimerDisplay(0);
                }
            };
        }

        // Blackout / Whiteout
        let isBlackout = false;
        let isWhiteout = false;
        const btnBlackout = document.getElementById('btnToolkitBlackout');
        const btnWhiteout = document.getElementById('btnToolkitWhiteout');

        if (btnBlackout) {
            btnBlackout.onclick = () => {
                isBlackout = !isBlackout;
                if (isBlackout) isWhiteout = false;
                btnBlackout.classList.toggle('active', isBlackout);
                btnWhiteout?.classList.remove('active');
                if (window.deckEngine) {
                    isBlackout ? window.deckEngine.toggleBlackout(true) : window.deckEngine.clearScreenCover();
                }
                this.sync.emit('BLACKOUT_STATE', { blackout: isBlackout, whiteout: false });
            };
        }

        if (btnWhiteout) {
            btnWhiteout.onclick = () => {
                isWhiteout = !isWhiteout;
                if (isWhiteout) isBlackout = false;
                btnWhiteout.classList.toggle('active', isWhiteout);
                btnBlackout?.classList.remove('active');
                if (window.deckEngine) {
                    isWhiteout ? window.deckEngine.toggleWhiteout(true) : window.deckEngine.clearScreenCover();
                }
                this.sync.emit('BLACKOUT_STATE', { blackout: false, whiteout: isWhiteout });
            };
        }

        // Spotlight
        let isSpotlight = false;
        const btnSpotlight = document.getElementById('btnToolkitSpotlight');
        if (btnSpotlight) {
            btnSpotlight.onclick = () => {
                isSpotlight = !isSpotlight;
                btnSpotlight.classList.toggle('active', isSpotlight);
                if (window.presentationSpotlight) {
                    isSpotlight ? window.presentationSpotlight.activate() : window.presentationSpotlight.deactivate();
                }
                this.sync.emit('SPOTLIGHT_STATE', { active: isSpotlight });
            };
        }

        // Aspect Ratio
        const btnAspect = document.getElementById('btnToolkitAspect');
        if (btnAspect) {
            btnAspect.onclick = () => {
                if (window.deckEngine) {
                    window.deckEngine.toggleAspectRatio();
                    this.sync.emit('ASPECT_RATIO', { ratio: window.deckEngine.aspectRatio });
                }
            };
        }
    }

    updateTimerDisplay(seconds) {
        const display = document.getElementById('toolkitTimerDisplay');
        if (!display) return;
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        display.textContent = `${mins}:${secs}`;
    }

    setupPresenterDrawCanvas() {
        const canvas = document.getElementById('presenterDrawCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let isDrawing = false;
        let strokePoints = [];

        canvas.addEventListener('mousedown', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const normX = x / rect.width;
            const normY = y / rect.height;

            if (this.laserActive) {
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
            const normX = x / rect.width;
            const normY = y / rect.height;

            if (this.laserActive) {
                this.sync.emit('LASER_MOVE', { normX, normY });
            }

            if (this.penActive && isDrawing) {
                ctx.lineTo(x, y);
                ctx.strokeStyle = this.penColor;
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.stroke();

                strokePoints.push({ normX, normY });
                if (strokePoints.length > 3) {
                    this.sync.emit('PEN_DRAW', {
                        stroke: strokePoints,
                        color: this.penColor,
                        width: 3.5
                    });
                    strokePoints = [{ normX, normY }];
                }
            }
        });

        window.addEventListener('mouseup', () => {
            if (isDrawing && strokePoints.length > 0) {
                this.sync.emit('PEN_DRAW', {
                    stroke: strokePoints,
                    color: this.penColor,
                    width: 3.5
                });
            }
            isDrawing = false;
            strokePoints = [];
        });
    }

    updatePresenterSlideView() {
        if (!this.isPresenter) return;
        const slides = document.querySelectorAll('.slide');
        const currentIndex = window.deckEngine ? window.deckEngine.currentSlide : 0;
        const currentSlide = slides[currentIndex];
        const nextSlide = slides[currentIndex + 1];

        // Update Slide Indicator & Skill
        const numEl = document.getElementById('cockpitSlideNum');
        const skillPill = document.getElementById('cockpitSkillPill');
        const select = document.getElementById('slideJumpSelect');

        if (numEl) numEl.textContent = `Slide ${currentIndex + 1} / ${slides.length}`;
        if (select) select.value = currentIndex;

        if (currentSlide && skillPill) {
            const skill = currentSlide.dataset.skill || 'general';
            skillPill.textContent = skill.toUpperCase();
            skillPill.className = 'monitor-skill-pill ' + skill;
        }

        // Update Current Slide Scaled Preview
        const currentScaler = document.getElementById('currentSlideScaler');
        if (currentScaler && currentSlide) {
            currentScaler.innerHTML = '';
            const clone = currentSlide.cloneNode(true);
            clone.classList.add('active', 'preview-clone');
            currentScaler.appendChild(clone);
            this.scalePreviewElement(currentScaler);
        }

        // Update Next Slide Preview
        const nextScaler = document.getElementById('nextSlideScaler');
        const nextTitle = document.getElementById('nextSlideTitle');
        if (nextScaler) {
            nextScaler.innerHTML = '';
            if (nextSlide) {
                const nextClone = nextSlide.cloneNode(true);
                nextClone.classList.add('active', 'preview-clone');
                nextScaler.appendChild(nextClone);
                this.scalePreviewElement(nextScaler);

                const titleEl = nextSlide.querySelector('h1, h2, .slide-title, .module-title');
                const titleStr = titleEl ? titleEl.textContent.trim().replace(/\s+/g, ' ') : `Slide ${currentIndex + 2}`;
                const nextSkill = nextSlide.dataset.skill || 'general';
                if (nextTitle) nextTitle.textContent = `[${nextSkill.toUpperCase()}] ${titleStr.substring(0, 45)}`;
            } else {
                nextScaler.innerHTML = '<div class="end-of-deck-msg">🏁 End of Masterclass Deck</div>';
                if (nextTitle) nextTitle.textContent = 'No more slides';
            }
        }

        // Update Pedagogical Notes in Tab 1
        this.updatePedagogicalNotes(currentSlide);

        // Highlight active thumbnail in Grid
        document.querySelectorAll('.grid-thumb-card').forEach(card => {
            const idx = parseInt(card.dataset.slideIndex, 10);
            card.classList.toggle('active', idx === currentIndex);
        });
    }

    scalePreviewElement(scaler) {
        if (!scaler) return;
        const parent = scaler.parentElement;
        if (!parent) return;

        const parentW = parent.clientWidth;
        const parentH = parent.clientHeight;
        const targetW = 1920;
        const targetH = 1080;

        const scale = Math.min(parentW / targetW, parentH / targetH);
        scaler.style.transform = `scale(${scale})`;
        scaler.style.transformOrigin = 'top left';
    }

    updatePedagogicalNotes(slide) {
        const notesContainer = document.getElementById('presenterCockpitNotes');
        if (!notesContainer || !slide) return;

        const skill = slide.dataset.skill || 'general';
        const slideNum = slide.querySelector('.slide-number')?.textContent || 'Slide Overview';
        const customNote = slide.querySelector('.teacher-note')?.innerHTML;

        let guidanceHTML = '';
        if (window.presenterNotesEngine && typeof window.presenterNotesEngine.getDefaultGuidance === 'function') {
            guidanceHTML = window.presenterNotesEngine.getDefaultGuidance(skill, slide);
        } else {
            guidanceHTML = `
                <div class="note-section">
                    <h4>🎯 Masterclass Objective</h4>
                    <p>Guide students through the core concepts and elicit authentic speaking/writing responses.</p>
                </div>
            `;
        }

        notesContainer.innerHTML = `
            <div class="notes-slide-badge-row">
                <span class="badge-num">${slideNum}</span>
                <span class="badge-skill-tag ${skill}">${skill.toUpperCase()}</span>
            </div>
            ${customNote ? `
                <div class="note-section custom-note">
                    <h4>⭐ Slide-Specific Teacher Guidance</h4>
                    <p>${customNote}</p>
                </div>
            ` : ''}
            ${guidanceHTML}
        `;
    }

    injectPresenterStyles() {
        if (document.getElementById('presenterCockpitStyles')) return;
        const style = document.createElement('style');
        style.id = 'presenterCockpitStyles';
        style.textContent = `
            /* Presenter Mode Root Styles */
            body.presenter-window {
                margin: 0;
                padding: 0;
                background: #090d16 !important;
                color: #f8fafc !important;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                overflow: hidden !important;
                height: 100vh;
                width: 100vw;
            }
            body.presenter-window #deckStage {
                display: none !important;
            }
            body.presenter-window #presentationToolsHUD,
            body.presenter-window .slide-indicator,
            body.presenter-window .aspect-toast {
                display: none !important;
            }

            .presenter-cockpit {
                display: flex;
                flex-direction: column;
                height: 100vh;
                width: 100vw;
                background: #090d16;
                overflow: hidden;
            }

            /* Header */
            .cockpit-header {
                height: 60px;
                background: #0f172a;
                border-bottom: 1.5px solid rgba(255, 255, 255, 0.12);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 24px;
                user-select: none;
                flex-shrink: 0;
            }
            .cockpit-header-left {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .cockpit-badge {
                background: #2563eb;
                color: #ffffff;
                font-size: 11px;
                font-weight: 800;
                padding: 4px 8px;
                border-radius: 6px;
                letter-spacing: 0.5px;
            }
            .cockpit-title {
                font-size: 15px;
                font-weight: 700;
                color: #e2e8f0;
                margin: 0;
                max-width: 420px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .sync-status-badge {
                font-size: 12px;
                font-weight: 600;
                padding: 5px 12px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .sync-status-badge.connected {
                background: rgba(16, 185, 129, 0.15);
                border: 1px solid rgba(16, 185, 129, 0.35);
                color: #34d399;
            }
            .sync-status-badge.waiting {
                background: rgba(245, 158, 11, 0.15);
                border: 1px solid rgba(245, 158, 11, 0.35);
                color: #fbbf24;
            }
            .status-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: currentColor;
                box-shadow: 0 0 8px currentColor;
            }
            .cockpit-header-right {
                display: flex;
                align-items: center;
                gap: 20px;
            }
            .cockpit-clock-box, .cockpit-elapsed-box {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }
            .cockpit-label {
                font-size: 9.5px;
                font-weight: 700;
                letter-spacing: 0.8px;
                color: #94a3b8;
            }
            .cockpit-value {
                font-family: 'JetBrains Mono', monospace;
                font-size: 17px;
                font-weight: 700;
                color: #cbd5e1;
            }
            .cockpit-value.highlight {
                color: #38bdf8;
            }
            .elapsed-time-row {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .btn-elapsed-icon {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.14);
                color: #94a3b8;
                border-radius: 4px;
                font-size: 10px;
                padding: 2px 5px;
                cursor: pointer;
            }
            .btn-elapsed-icon:hover {
                background: rgba(255, 255, 255, 0.2);
                color: #fff;
            }

            /* Main Cockpit Layout */
            .cockpit-main {
                flex: 1;
                display: grid;
                grid-template-columns: 1.15fr 0.85fr;
                gap: 16px;
                padding: 16px;
                overflow: hidden;
            }

            /* Monitor Left Pane */
            .cockpit-monitor-pane {
                display: flex;
                flex-direction: column;
                gap: 12px;
                overflow: hidden;
            }
            .monitor-card {
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 12px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
            }
            .monitor-card.current-slide-card {
                flex: 1.4;
                min-height: 280px;
            }
            .monitor-card.next-slide-card {
                flex: 0.8;
                min-height: 160px;
            }
            .monitor-card-header {
                padding: 8px 14px;
                background: rgba(255, 255, 255, 0.03);
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                display: flex;
                align-items: center;
                justify-content: space-between;
                user-select: none;
            }
            .monitor-title-wrap {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .monitor-badge {
                font-size: 11px;
                font-weight: 800;
                letter-spacing: 0.5px;
            }
            .monitor-badge.live { color: #ef4444; }
            .monitor-badge.next { color: #38bdf8; }
            .slide-indicator {
                font-family: 'JetBrains Mono', monospace;
                font-size: 12px;
                color: #cbd5e1;
                font-weight: 600;
            }
            .monitor-skill-pill {
                font-size: 10px;
                font-weight: 800;
                padding: 3px 8px;
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.1);
                color: #e2e8f0;
            }
            .monitor-skill-pill.read { background: rgba(13, 148, 136, 0.25); color: #2dd4bf; }
            .monitor-skill-pill.grammar { background: rgba(217, 119, 6, 0.25); color: #fbbf24; }
            .monitor-skill-pill.write { background: rgba(79, 70, 229, 0.25); color: #818cf8; }
            .monitor-skill-pill.vocab { background: rgba(22, 163, 74, 0.25); color: #4ade80; }

            .current-slide-viewport, .next-slide-viewport {
                flex: 1;
                position: relative;
                overflow: hidden;
                background: #000000;
            }
            .slide-preview-scaler {
                position: absolute;
                top: 0;
                left: 0;
                width: 1920px;
                height: 1080px;
                pointer-events: none;
            }
            .slide-preview-scaler .slide {
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                transform: none !important;
                position: absolute;
                top: 0;
                left: 0;
                width: 1920px;
                height: 1080px;
            }
            .presenter-draw-canvas {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                z-index: 100;
                cursor: crosshair;
            }
            .next-slide-title {
                font-size: 12px;
                color: #94a3b8;
                font-weight: 600;
            }
            .end-of-deck-msg {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                font-size: 16px;
                font-weight: 700;
                color: #64748b;
            }

            /* Nav Bar */
            .monitor-nav-bar {
                display: flex;
                align-items: center;
                gap: 8px;
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 10px;
                padding: 6px 10px;
            }
            .nav-control-btn {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.12);
                color: #cbd5e1;
                font-size: 12.5px;
                font-weight: 600;
                padding: 6px 12px;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.15s ease;
            }
            .nav-control-btn:hover {
                background: rgba(255, 255, 255, 0.18);
                color: #fff;
            }
            .nav-control-btn.primary {
                background: #2563eb;
                border-color: #3b82f6;
                color: #fff;
                font-weight: 700;
            }
            .nav-control-btn.primary:hover {
                background: #1d4ed8;
            }
            .slide-jump-wrapper {
                flex: 1;
            }
            .slide-jump-select {
                width: 100%;
                background: rgba(15, 23, 42, 0.9);
                border: 1px solid rgba(255, 255, 255, 0.16);
                color: #e2e8f0;
                padding: 6px 10px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                outline: none;
                cursor: pointer;
            }

            /* Right Control & Notes Pane */
            .cockpit-control-pane {
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 12px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
            }
            .cockpit-tabs-header {
                display: flex;
                background: rgba(255, 255, 255, 0.03);
                border-bottom: 1.5px solid rgba(255, 255, 255, 0.1);
            }
            .cockpit-tab-btn {
                flex: 1;
                background: transparent;
                border: none;
                border-bottom: 2.5px solid transparent;
                color: #94a3b8;
                font-size: 13px;
                font-weight: 700;
                padding: 12px 10px;
                cursor: pointer;
                transition: all 0.18s ease;
            }
            .cockpit-tab-btn:hover {
                color: #ffffff;
                background: rgba(255, 255, 255, 0.05);
            }
            .cockpit-tab-btn.active {
                color: #38bdf8;
                border-bottom-color: #38bdf8;
                background: rgba(56, 189, 248, 0.08);
            }
            .tab-pane-content {
                display: none;
                flex: 1;
                overflow-y: auto;
                padding: 16px;
            }
            .tab-pane-content.active {
                display: flex;
                flex-direction: column;
            }

            /* Notes Pane */
            .notes-container-inner {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            .notes-slide-badge-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 4px;
            }
            .badge-num {
                font-family: 'JetBrains Mono', monospace;
                font-size: 12px;
                color: #38bdf8;
                font-weight: 700;
            }
            .badge-skill-tag {
                font-size: 11px;
                font-weight: 800;
                padding: 3px 8px;
                border-radius: 6px;
                background: rgba(255, 255, 255, 0.1);
            }

            /* Toolkit Console */
            .toolkit-console-grid {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .toolkit-section {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 8px;
                padding: 12px;
            }
            .toolkit-section-title {
                font-size: 12.5px;
                font-weight: 700;
                color: #cbd5e1;
                margin: 0 0 10px 0;
            }
            .tool-action-group {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 8px;
            }
            .tool-action-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.12);
                color: #e2e8f0;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.16s ease;
            }
            .tool-action-btn:hover {
                background: rgba(255, 255, 255, 0.15);
                color: #fff;
            }
            .tool-action-btn.active {
                background: #2563eb;
                border-color: #3b82f6;
                color: #fff;
                box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
            }
            .tool-action-btn.primary {
                background: #0284c7;
                border-color: #38bdf8;
                color: #fff;
                font-weight: 700;
            }
            .tool-action-btn.danger:hover {
                background: rgba(239, 68, 68, 0.25);
                border-color: #ef4444;
                color: #fca5a5;
            }
            .pen-color-palette {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-top: 10px;
                font-size: 11px;
                color: #94a3b8;
            }
            .palette-dot {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                border: 2px solid transparent;
                cursor: pointer;
                transition: transform 0.15s;
            }
            .palette-dot.active {
                border-color: #ffffff;
                transform: scale(1.25);
                box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
            }
            .timer-section-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
            }
            .toolkit-timer-display {
                font-family: 'JetBrains Mono', monospace;
                font-size: 20px;
                font-weight: 800;
                color: #38bdf8;
            }
            .timer-preset-row {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 6px;
                margin-bottom: 8px;
            }
            .timer-quick-btn {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.12);
                color: #cbd5e1;
                padding: 5px;
                border-radius: 6px;
                font-size: 11.5px;
                font-weight: 700;
                cursor: pointer;
            }
            .timer-quick-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                color: #fff;
            }
            .timer-control-row {
                display: grid;
                grid-template-columns: 1.5fr 1fr;
                gap: 8px;
            }

            /* Thumbnail Grid */
            .slides-thumbnail-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }
            .grid-thumb-card {
                background: rgba(255, 255, 255, 0.04);
                border: 1.5px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                padding: 10px;
                cursor: pointer;
                transition: all 0.16s ease;
            }
            .grid-thumb-card:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.25);
                transform: translateY(-2px);
            }
            .grid-thumb-card.active {
                border-color: #38bdf8;
                background: rgba(56, 189, 248, 0.12);
                box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
            }
            .thumb-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 6px;
            }
            .thumb-num {
                font-family: 'JetBrains Mono', monospace;
                font-size: 11px;
                font-weight: 700;
                color: #94a3b8;
            }
            .thumb-skill {
                font-size: 9.5px;
                font-weight: 800;
                padding: 2px 6px;
                border-radius: 4px;
                background: rgba(255, 255, 255, 0.1);
                text-transform: uppercase;
            }
            .thumb-title {
                font-size: 12px;
                font-weight: 600;
                color: #cbd5e1;
                line-height: 1.35;
            }
        `;
        document.head.appendChild(style);
    }
}

// Auto-Instantiate Global Presenter View Module
window.presenterSyncEngine = new PresenterSyncEngine();
window.presenterViewUI = new PresenterViewUI(window.presenterSyncEngine);
