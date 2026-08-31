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
                .timer-display.ended, .cp-timer-countdown-display.ended {
                    color: #ef4444 !important;
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
                    transition: background-color 130ms ease-out, transform 130ms var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
                }
                .timer-preset-btn:hover { background: rgba(255, 255, 255, 0.2); color: #fff; transform: translateY(-1px); }
                .timer-preset-btn:active { transform: scale(0.94); }
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
                    transition: opacity 130ms ease-out, transform 130ms var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
                }
                .timer-action-btn:hover {
                    opacity: 0.92;
                    transform: translateY(-1px);
                }
                .timer-action-btn:active {
                    transform: scale(0.95);
                }
                .timer-action-btn.start-btn {
                    background: #10b981;
                }
                .timer-action-btn.start-btn.running {
                    background: #f59e0b;
                }
                @keyframes timerFadeIn {
                    from { opacity: 0; transform: translateY(-8px) scale(0.96); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes timerPulseAlert {
                    from { transform: scale(1); }
                    to { transform: scale(1.08); }
                }
            `;
            document.head.appendChild(style);
        }

        this.initModal();
        this.setupSyncListeners();
    }

    setupSyncListeners() {
        if (!window.presenterSyncEngine) return;

        window.presenterSyncEngine.on('TIMER_CMD', (data) => {
            if (!data) return;
            if (data.action === 'set' && typeof data.seconds === 'number') {
                this.setTimer(data.seconds, false);
                this.showModal(false);
            } else if (data.action === 'start') {
                if (typeof data.seconds === 'number') this.timerSeconds = data.seconds;
                if (!this.timerRunning) this.toggleRun(false);
                this.showModal(false);
            } else if (data.action === 'pause') {
                if (this.timerRunning) this.toggleRun(false);
            } else if (data.action === 'reset') {
                this.reset(false);
            } else if (data.action === 'show' || data.action === 'showModal') {
                this.showModal(false);
            } else if (data.action === 'hide' || data.action === 'hideModal') {
                this.hideModal(false);
            }
        });
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
                <button class="timer-modal-close" onclick="classroomTimer.hideModal(true)">×</button>
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

    showModal(broadcast = false) {
        if (!this.modal) {
            this.modal = document.getElementById('timerModal');
        }
        if (this.modal) {
            this.modal.style.display = 'block';
        }
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('TIMER_CMD', { action: 'show' });
        }
    }

    hideModal(broadcast = false) {
        if (!this.modal) {
            this.modal = document.getElementById('timerModal');
        }
        if (this.modal) {
            this.modal.style.display = 'none';
        }
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('TIMER_CMD', { action: 'hide' });
        }
    }

    toggleModal() {
        if (!this.modal) {
            this.modal = document.getElementById('timerModal');
        }
        if (this.modal) {
            if (this.modal.style.display === 'none') {
                this.showModal(true);
            } else {
                this.hideModal(true);
            }
        }
    }

    setTimer(seconds, broadcast = true) {
        this.timerSeconds = seconds;
        this.updateDisplay();
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('TIMER_CMD', { action: 'set', seconds: seconds });
        }
    }

    updateDisplay() {
        const mins = Math.floor(this.timerSeconds / 60);
        const secs = this.timerSeconds % 60;
        const minsStr = String(mins).padStart(2, '0');
        const secsStr = String(secs).padStart(2, '0');
        const timeStr = `${minsStr}:${secsStr}`;

        // Update modal display with NumberFlow if available
        const display = document.getElementById('timerDisplay');
        if (display) {
            if (customElements.get('number-flow')) {
                display.innerHTML = `<number-flow value="${minsStr}"></number-flow>:<number-flow value="${secsStr}"></number-flow>`;
            } else {
                display.textContent = timeStr;
            }
            display.classList.toggle('ended', this.timerSeconds <= 0 && !this.timerRunning);
        }

        // Update Presenter Cockpit countdown displays
        const cpDisplay = document.getElementById('cpCountdownDisplay');
        if (cpDisplay) {
            if (customElements.get('number-flow')) {
                cpDisplay.innerHTML = `<number-flow value="${minsStr}"></number-flow>:<number-flow value="${secsStr}"></number-flow>`;
            } else {
                cpDisplay.textContent = timeStr;
            }
            cpDisplay.classList.toggle('ended', this.timerSeconds <= 0 && !this.timerRunning);
        }

        document.querySelectorAll('.cp-timer-countdown-display').forEach(el => {
            if (customElements.get('number-flow')) {
                el.innerHTML = `<number-flow value="${minsStr}"></number-flow>:<number-flow value="${secsStr}"></number-flow>`;
            } else {
                el.textContent = timeStr;
            }
            el.classList.toggle('ended', this.timerSeconds <= 0 && !this.timerRunning);
        });
    }

    toggleRun(broadcast = true) {
        const startBtn = document.getElementById('timerStartBtn');
        const cpToggleBtn = document.getElementById('btnToolTimerToggle');

        if (this.timerRunning) {
            clearInterval(this.timerInterval);
            this.timerRunning = false;
            if (startBtn) {
                startBtn.textContent = 'Resume';
                startBtn.classList.remove('running');
            }
            if (cpToggleBtn) {
                cpToggleBtn.textContent = '▶ Start Timer';
            }
            if (broadcast && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('TIMER_CMD', { action: 'pause' });
            }
        } else {
            if (this.timerSeconds <= 0) this.timerSeconds = 120;
            this.timerRunning = true;
            if (startBtn) {
                startBtn.textContent = 'Pause';
                startBtn.classList.add('running');
            }
            if (cpToggleBtn) {
                cpToggleBtn.textContent = '⏸ Pause Timer';
            }
            if (broadcast && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('TIMER_CMD', { action: 'start', seconds: this.timerSeconds });
            }
            this.timerInterval = setInterval(() => {
                if (this.timerSeconds > 0) {
                    this.timerSeconds--;
                    this.updateDisplay();
                } else {
                    clearInterval(this.timerInterval);
                    this.timerRunning = false;
                    this.updateDisplay();
                    if (startBtn) {
                        startBtn.textContent = 'Start';
                        startBtn.classList.remove('running');
                    }
                    if (cpToggleBtn) {
                        cpToggleBtn.textContent = '▶ Start Timer';
                    }
                    this.playChime();
                    if (window.toast) {
                        window.toast.warning('Time is up! Classroom activity completed.', {
                            title: '⏱️ Timer Finished',
                            action: {
                                label: '+1 Min',
                                onClick: () => {
                                    this.setTimer(60);
                                    this.toggleRun();
                                }
                            }
                        });
                    }
                }
            }, 1000);
        }
    }

    reset(broadcast = true) {
        clearInterval(this.timerInterval);
        this.timerRunning = false;
        this.timerSeconds = 0;
        this.updateDisplay();
        const startBtn = document.getElementById('timerStartBtn');
        if (startBtn) {
            startBtn.textContent = 'Start';
            startBtn.classList.remove('running');
        }
        const cpToggleBtn = document.getElementById('btnToolTimerToggle');
        if (cpToggleBtn) {
            cpToggleBtn.textContent = '▶ Start Timer';
        }
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('TIMER_CMD', { action: 'reset' });
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

