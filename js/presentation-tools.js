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
                <button class="tool-btn" id="toolAspectBtn" title="Switch Aspect Ratio (16:9 / 4:3) (Shift+A)" onclick="window.deckEngine && window.deckEngine.toggleAspectRatio()">📐 <span class="tool-label">16:9</span></button>
                <button class="tool-btn" id="toolThemeBtn" title="Theme Aesthetics (Shift+T)" onclick="window.deckThemeEngine && window.deckThemeEngine.openModal()">🎨 <span class="tool-label">Theme</span></button>
                <button class="tool-btn" id="toolHighlightBtn" title="Teacher Highlighter (H)" onclick="window.teacherHighlighter && window.teacherHighlighter.toggle()">🖍️ <span class="tool-label">Highlight</span></button>
                <button class="tool-btn" id="toolTimerBtn" title="Classroom Timer (T)" onclick="presentationTools.toggleTimerModal()">⏱️ <span class="tool-label">Timer</span></button>
                <button class="tool-btn" id="toolStudentBtn" title="Random Student Selector (R)" onclick="window.studentPicker && window.studentPicker.toggle()">🎲 <span class="tool-label">Picker</span></button>
                <button class="tool-btn" id="toolNotesBtn" title="Teacher Presenter Notes (N)" onclick="window.presenterNotesEngine && window.presenterNotesEngine.toggle()">📝 <span class="tool-label">Notes</span></button>
                <button class="tool-btn" id="toolLaserBtn" title="Laser Pointer (L)" onclick="presentationTools.toggleLaser()">🔴 <span class="tool-label">Laser</span></button>
                <button class="tool-btn" id="toolPenBtn" title="Draw / Annotate (P)" onclick="presentationTools.togglePen()">✏️ <span class="tool-label">Draw</span></button>
                <button class="tool-btn" id="toolFullscreenBtn" title="Fullscreen (F)" onclick="presentationTools.toggleFullscreen()">⛶</button>
                <button class="tool-btn" id="toolHelpBtn" title="Keyboard Shortcuts (?)" onclick="presentationTools.toggleHelpModal()">❓</button>
                <button class="tool-btn tool-collapse-btn" id="toolCollapseBtn" title="Hide Toolkit (Shift+X)" onclick="presentationTools.toggleHUD()">✕</button>
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
                gap: 6px;
                background: rgba(15, 23, 42, 0.88);
                backdrop-filter: blur(10px);
                padding: 5px 8px;
                border-radius: 30px;
                border: 1px solid rgba(255, 255, 255, 0.16);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
                transition: opacity 0.25s ease, transform 0.25s ease;
            }
            .tool-btn {
                background: transparent;
                border: none;
                color: #e2e8f0;
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 4px;
                transition: all 0.2s ease;
            }
            .tool-btn:hover {
                background: rgba(255, 255, 255, 0.18);
                color: #ffffff;
            }
            .tool-btn.active {
                background: #3b82f6;
                color: #ffffff;
                box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
            }
            .tool-label {
                font-size: 12px;
            }
            .tool-collapse-btn {
                padding: 5px 8px;
                font-size: 12px;
                color: #94a3b8;
                margin-left: 2px;
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
