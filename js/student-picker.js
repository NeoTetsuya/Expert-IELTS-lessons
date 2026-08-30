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
            document.addEventListener('DOMContentLoaded', () => {
                this.injectUI();
                this.setupSyncListeners();
            });
        } else {
            this.injectUI();
            this.setupSyncListeners();
        }

        // Global shortcut 'R'
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'r' || e.key === 'R') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                e.preventDefault();
                this.toggle(true);
            }
        });
    }

    setupSyncListeners() {
        if (!window.presenterSyncEngine) return;

        window.presenterSyncEngine.on('STUDENT_PICKER_MODAL', (data) => {
            if (data && data.open) {
                this.open(false);
            } else {
                this.close(false);
            }
        });

        window.presenterSyncEngine.on('STUDENT_SPIN', (data) => {
            if (data && data.student) {
                this.open(false);
                this.spin(data.student, false, data.totalCycles);
            }
        });

        window.presenterSyncEngine.on('STUDENT_ROSTER_SYNC', (data) => {
            if (data && Array.isArray(data.students)) {
                this.students = data.students;
                this.saveStudents();
                const input = document.getElementById('rosterInput');
                if (input) input.value = this.students.join(', ');
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
            <div class="student-modal-backdrop" onclick="studentPicker.close(true)"></div>
            <div class="student-modal-dialog">
                <div class="student-modal-header">
                    <div>
                        <h2>🎲 Random Student Selector</h2>
                        <p>Engage students with fair cold-calling &amp; speaking turns.</p>
                    </div>
                    <button class="student-modal-close" onclick="studentPicker.close(true)">×</button>
                </div>

                <div class="picker-display-stage">
                    <div class="picker-result-name" id="pickerResultName">Click Spin to Pick!</div>
                </div>

                <div class="picker-controls-row">
                    <button class="btn-picker-spin" id="pickerSpinBtn" onclick="studentPicker.spin(null, true)">🎲 SPIN WHEEL</button>
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

    spin(targetStudent = null, broadcast = true, customCycles = null) {
        if (this.isSpinning || this.students.length === 0) return;
        this.isSpinning = true;

        const chosenStudent = targetStudent || this.students[Math.floor(Math.random() * this.students.length)];
        const totalCycles = customCycles || (24 + Math.floor(Math.random() * 8));

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('STUDENT_SPIN', {
                student: chosenStudent,
                totalCycles: totalCycles
            });
            window.presenterSyncEngine.emit('STUDENT_PICKED', {
                student: chosenStudent
            });
        }

        const resultEl = document.getElementById('pickerResultName');
        const spinBtn = document.getElementById('pickerSpinBtn');
        if (spinBtn) spinBtn.disabled = true;

        let counter = 0;
        const interval = 60;

        const step = () => {
            if (counter < totalCycles - 1) {
                const randomIndex = Math.floor(Math.random() * this.students.length);
                if (resultEl) {
                    resultEl.textContent = this.students[randomIndex];
                    resultEl.style.transform = `scale(${1 + (counter % 3) * 0.04})`;
                }
                counter++;
                setTimeout(step, interval + counter * 6);
            } else {
                this.isSpinning = false;
                if (spinBtn) spinBtn.disabled = false;
                if (resultEl) {
                    resultEl.textContent = chosenStudent;
                    resultEl.style.transform = 'scale(1.15)';
                    resultEl.style.color = '#38bdf8';
                }

                // Update Cockpit display badge if present
                const pill = document.getElementById('cpPickedStudentDisplay');
                const nameEl = document.getElementById('cpPickedStudentName');
                if (pill && nameEl) {
                    nameEl.textContent = chosenStudent;
                    pill.style.display = 'flex';
                    pill.classList.add('pulse');
                    setTimeout(() => pill.classList.remove('pulse'), 800);
                }

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
            if (window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('STUDENT_ROSTER_SYNC', { students: names });
            }
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
        if (window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('STUDENT_ROSTER_SYNC', { students: numbers });
        }
    }

    open(broadcast = true) {
        const modal = document.getElementById('studentPickerModal');
        if (modal) modal.style.display = 'flex';
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('STUDENT_PICKER_MODAL', { open: true });
        }
    }

    openModal() {
        this.open(true);
    }

    pickRandomStudent(broadcast = true) {
        this.spin(null, broadcast);
    }

    close(broadcast = true) {
        const modal = document.getElementById('studentPickerModal');
        if (modal) modal.style.display = 'none';
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('STUDENT_PICKER_MODAL', { open: false });
        }
    }

    toggle(broadcast = true) {
        const modal = document.getElementById('studentPickerModal');
        if (modal && modal.style.display === 'flex') {
            this.close(broadcast);
        } else {
            this.open(broadcast);
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
                animation: modalPopIn 240ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            @keyframes modalPopIn {
                0% { opacity: 0; transform: scale(0.95) translateY(10px); }
                100% { opacity: 1; transform: scale(1) translateY(0); }
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
                transition: color 120ms ease-out, transform 120ms ease-out;
            }
            .student-modal-close:hover { color: #fff; transform: scale(1.1); }
            .student-modal-close:active { transform: scale(0.92); }
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
                transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1), color 200ms ease-out;
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
                transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), filter 140ms ease-out;
            }
            .btn-picker-spin:hover { transform: translateY(-2px); filter: brightness(1.1); }
            .btn-picker-spin:active { transform: scale(0.97); }
            .btn-picker-edit {
                background: rgba(255, 255, 255, 0.08);
                color: #cbd5e1;
                border: 1px solid rgba(255, 255, 255, 0.15);
                padding: 14px 18px;
                border-radius: 10px;
                cursor: pointer;
                font-weight: 700;
                transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), background-color 140ms ease-out;
            }
            .btn-picker-edit:hover { background: rgba(255, 255, 255, 0.15); color: #fff; transform: translateY(-1px); }
            .btn-picker-edit:active { transform: scale(0.96); }
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
