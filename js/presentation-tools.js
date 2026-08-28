/**
 * Presentation Classroom Tools (PresentationTools)
 * Extends the presentation decks with essential teaching tools:
 * - ⏱️ Interactive Classroom Timer & Stopwatch (with audio chime)
 * - 🔴 Laser Pointer Mode (toggle: 'L')
 * - 🖊️ On-Slide Drawing / Pen Annotation Canvas (toggle: 'P', clear: 'C')
 * - ⛶ Fullscreen Mode (toggle: 'F')
 * - ❓ Help / Keybindings Overlay (toggle: '?')
 * - 📊 Exercise Auto-Scoring & Reset All
 */

class PresentationTools {
    constructor(deckEngine) {
        this.deckEngine = deckEngine;
        this.isLaserActive = false;
        this.isPenActive = false;
        this.timerInterval = null;
        this.timerSeconds = 0;
        this.timerRunning = false;
        
        this.initUI();
        this.initLaserPointer();
        this.initDrawingCanvas();
        this.initKeyboardShortcuts();
    }

    /**
     * Initializes the floating toolbar and modals
     */
    initUI() {
        // Create container
        const toolContainer = document.createElement('div');
        toolContainer.id = 'presentationToolsHUD';
        toolContainer.className = 'presentation-tools-hud';
        toolContainer.innerHTML = `
            <div class="tools-bar">
                <button class="tool-btn" id="toolTimerBtn" title="Classroom Timer (T)" onclick="presentationTools.toggleTimerModal()">⏱️ <span class="tool-label">Timer</span></button>
                <button class="tool-btn" id="toolLaserBtn" title="Laser Pointer (L)" onclick="presentationTools.toggleLaser()">🔴 <span class="tool-label">Laser</span></button>
                <button class="tool-btn" id="toolPenBtn" title="Draw / Annotate (P)" onclick="presentationTools.togglePen()">✏️ <span class="tool-label">Draw</span></button>
                <button class="tool-btn" id="toolFullscreenBtn" title="Fullscreen (F)" onclick="presentationTools.toggleFullscreen()">⛶</button>
                <button class="tool-btn" id="toolHelpBtn" title="Keyboard Shortcuts (?)" onclick="presentationTools.toggleHelpModal()">❓</button>
            </div>

            <!-- Timer Modal / HUD -->
            <div class="tool-modal" id="timerModal" style="display:none;">
                <div class="tool-modal-header">
                    <span>⏱️ Classroom Timer</span>
                    <button class="modal-close" onclick="presentationTools.toggleTimerModal()">×</button>
                </div>
                <div class="timer-display" id="timerDisplay">00:00</div>
                <div class="timer-presets">
                    <button class="preset-btn" onclick="presentationTools.setTimer(60)">1 min</button>
                    <button class="preset-btn" onclick="presentationTools.setTimer(120)">2 min</button>
                    <button class="preset-btn" onclick="presentationTools.setTimer(300)">5 min</button>
                    <button class="preset-btn" onclick="presentationTools.setTimer(600)">10 min</button>
                </div>
                <div class="timer-actions">
                    <button class="action-btn start-btn" id="timerStartBtn" onclick="presentationTools.toggleTimerRun()">Start</button>
                    <button class="action-btn" onclick="presentationTools.resetTimer()">Reset</button>
                </div>
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
                    <div><kbd>Home</kbd> / <kbd>End</kbd></div><div>First / Last Slide</div>
                    <div><kbd>+</kbd> / <kbd>−</kbd></div><div>Scale Font Size (Zoom)</div>
                    <div><kbd>0</kbd></div><div>Reset Font Size (100%)</div>
                    <div><kbd>L</kbd></div><div>Toggle Laser Pointer</div>
                    <div><kbd>P</kbd></div><div>Toggle Drawing Pen</div>
                    <div><kbd>C</kbd></div><div>Clear Canvas Drawings</div>
                    <div><kbd>T</kbd></div><div>Toggle Timer Modal</div>
                    <div><kbd>F</kbd></div><div>Toggle Fullscreen Mode</div>
                    <div><kbd>?</kbd> / <kbd>H</kbd></div><div>Toggle This Help Menu</div>
                </div>
            </div>
        `;
        document.body.appendChild(toolContainer);

        // Inject Styles for Tools
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
                width: 340px;
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

            /* Timer Specifics */
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
                animation: pulseAlert 0.6s infinite alternate;
            }
            .timer-presets {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 5px;
                margin-bottom: 12px;
            }
            .preset-btn {
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
            .preset-btn:hover { background: rgba(255, 255, 255, 0.2); color: #fff; }
            .timer-actions {
                display: flex;
                gap: 8px;
            }
            .action-btn {
                flex: 1;
                background: rgba(255, 255, 255, 0.12);
                border: none;
                color: #fff;
                padding: 7px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
            }
            .action-btn.start-btn {
                background: #10b981;
            }
            .action-btn.start-btn.running {
                background: #f59e0b;
            }

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

            /* Laser Pointer Dot */
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

            /* Drawing Canvas */
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

            @keyframes toolFadeIn {
                from { opacity: 0; transform: translateY(-8px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes pulseAlert {
                from { transform: scale(1); }
                to { transform: scale(1.08); }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Initializes Laser Pointer
     */
    initLaserPointer() {
        const dot = document.createElement('div');
        dot.id = 'laserPointerDot';
        document.body.appendChild(dot);

        window.addEventListener('mousemove', (e) => {
            if (this.isLaserActive) {
                dot.style.left = `${e.clientX}px`;
                dot.style.top = `${e.clientY}px`;
            }
        });
    }

    toggleLaser() {
        this.isLaserActive = !this.isLaserActive;
        const dot = document.getElementById('laserPointerDot');
        const btn = document.getElementById('toolLaserBtn');
        if (dot) dot.style.display = this.isLaserActive ? 'block' : 'none';
        if (btn) btn.classList.toggle('active', this.isLaserActive);
        
        // Disable pen if laser active
        if (this.isLaserActive && this.isPenActive) {
            this.togglePen();
        }
    }

    /**
     * Initializes On-screen Annotation Canvas
     */
    initDrawingCanvas() {
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
            if (!this.isPenActive) return;
            isDrawing = true;
            [lastX, lastY] = [e.clientX, e.clientY];
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing || !this.isPenActive) return;
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

    togglePen() {
        this.isPenActive = !this.isPenActive;
        const btn = document.getElementById('toolPenBtn');
        if (this.canvas) {
            this.canvas.classList.toggle('active', this.isPenActive);
        }
        if (btn) btn.classList.toggle('active', this.isPenActive);

        // Disable laser if pen active
        if (this.isPenActive && this.isLaserActive) {
            this.toggleLaser();
        }
    }

    clearCanvas() {
        if (this.canvas && this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    /**
     * Timer Functionality
     */
    toggleTimerModal() {
        const modal = document.getElementById('timerModal');
        if (modal) {
            modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
        }
    }

    setTimer(seconds) {
        this.timerSeconds = seconds;
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        const display = document.getElementById('timerDisplay');
        if (!display) return;
        const mins = Math.floor(this.timerSeconds / 60);
        const secs = this.timerSeconds % 60;
        display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        display.classList.remove('ended');
    }

    toggleTimerRun() {
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
                    this.updateTimerDisplay();
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

    resetTimer() {
        clearInterval(this.timerInterval);
        this.timerRunning = false;
        this.timerSeconds = 0;
        this.updateTimerDisplay();
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
            // AudioContext not allowed without gesture
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
     * Keyboard Shortcuts Hook
     */
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            const key = e.key.toLowerCase();
            if (key === 'l') {
                e.preventDefault();
                this.toggleLaser();
            } else if (key === 'p') {
                e.preventDefault();
                this.togglePen();
            } else if (key === 'c') {
                e.preventDefault();
                this.clearCanvas();
            } else if (key === 't') {
                e.preventDefault();
                this.toggleTimerModal();
            } else if (key === 'f') {
                e.preventDefault();
                this.toggleFullscreen();
            } else if (key === '?' || key === 'h') {
                e.preventDefault();
                this.toggleHelpModal();
            } else if (key === 'escape') {
                const timerModal = document.getElementById('timerModal');
                const helpModal = document.getElementById('helpModal');
                if (timerModal) timerModal.style.display = 'none';
                if (helpModal) helpModal.style.display = 'none';
                if (this.isPenActive) this.togglePen();
                if (this.isLaserActive) this.toggleLaser();
            }
        });
    }
}

// Global auto-instantiation
let presentationTools;
window.addEventListener('DOMContentLoaded', () => {
    presentationTools = new PresentationTools(window.deckEngine);
});
