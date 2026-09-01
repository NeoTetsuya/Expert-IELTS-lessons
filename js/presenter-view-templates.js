/**
 * ==========================================================================
 * PRESENTER COCKPIT TEMPLATES & STYLES
 * Modular HTML structure & CSS stylesheet for PresenterViewUI
 * ==========================================================================
 */

const PRESENTER_COCKPIT_HTML = `
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
                            <button class="cp-pill-btn" id="btnCpToggleFilmstrip" title="Toggle Thumbnail Filmstrip (F)">🎞️</button>
                            <button class="cp-pill-btn" id="btnCpZoom" title="Toggle Aspect Ratio (Shift+A)">📐</button>
                        </div>

                        <!-- Fullscreen / Expand Slide Toggle -->
                        <button class="cp-fullscreen-btn" id="btnCpFullscreen" title="Maximize Stage Preview (Double-click splitter)">⤢</button>
                    </div>

                    <!-- Bottom Horizontal Filmstrip Carousel -->
                    <div class="cp-filmstrip-section" id="cpFilmstripSection">
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

const PRESENTER_COCKPIT_CSS = `
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
                flex: 0 0 70%;
                display: flex;
                flex-direction: column;
                background: #0f1015;
                border-right: 1px solid rgba(255, 255, 255, 0.08);
                overflow: hidden;
                position: relative;
                transition: flex 0.18s ease;
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
                transition: all 0.15s ease;
            }
            .cp-fullscreen-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                color: #fff;
            }

            /* BOTTOM FILMSTRIP */
            .cp-filmstrip-section {
                height: 94px;
                background: #14151b;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
                display: flex;
                align-items: center;
                padding: 6px 12px;
                position: relative;
                flex-shrink: 0;
                transition: height 0.2s ease, opacity 0.2s ease;
            }
            .cp-filmstrip-section.collapsed {
                height: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                border-top: none !important;
                opacity: 0 !important;
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
                flex: 0 0 30%;
                display: flex;
                flex-direction: column;
                background: #14151b;
                overflow: hidden;
                transition: flex 0.18s ease;
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
