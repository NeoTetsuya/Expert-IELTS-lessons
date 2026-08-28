/**
 * ==========================================================================
 * TEACHER HIGHLIGHTER ENGINE (TeacherHighlighter)
 * Translucent Fluorescent Highlighter for Teaching & Presentation Decks
 * - Safe overlay canvas: Never distorts text or mutates slide DOM elements
 * - Realistic marker chisel-tip strokes with translucent fluorescent glow
 * - Multi-color support (Fluorescent Yellow, Neon Green, Sky Cyan, Coral Pink)
 * - Stroke undo & instant clean canvas clear
 * - Keyboard shortcuts: 'H' (toggle), 'C' (clear), 'Ctrl+Z' (undo)
 * ==========================================================================
 */

class TeacherHighlighter {
    constructor(deckEngine) {
        this.deckEngine = deckEngine;
        this.isActive = false;
        this.colors = [
            { name: 'Yellow', rgba: 'rgba(250, 204, 21, 0.45)', hex: '#facc15', label: '🟡' },
            { name: 'Green',  rgba: 'rgba(74, 222, 128, 0.42)', hex: '#4ade80', label: '🟢' },
            { name: 'Cyan',   rgba: 'rgba(56, 189, 248, 0.42)', hex: '#38bdf8', label: '🔵' },
            { name: 'Pink',   rgba: 'rgba(244, 114, 182, 0.45)', hex: '#f472b6', label: '🌸' }
        ];
        this.currentColorIndex = 0;
        this.strokeWidth = 26;
        this.history = []; // Array of drawn paths for undo
        this.currentPath = [];

        this.initCanvas();
        this.initEvents();
        this.injectStyles();
    }

    initCanvas() {
        let canvas = document.getElementById('highlighterCanvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'highlighterCanvas';
            canvas.className = 'highlighter-canvas';
            document.body.appendChild(canvas);
        }
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            this.ctx.scale(dpr, dpr);
            this.redrawHistory();
        };

        resize();
        window.addEventListener('resize', resize);
    }

    initEvents() {
        let isDrawing = false;

        this.canvas.addEventListener('mousedown', (e) => {
            if (!this.isActive) return;
            isDrawing = true;
            this.currentPath = [{ x: e.clientX, y: e.clientY }];
            this.drawPoint(e.clientX, e.clientY);
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing || !this.isActive) return;
            const pt = { x: e.clientX, y: e.clientY };
            this.currentPath.push(pt);
            this.drawSegment(this.currentPath[this.currentPath.length - 2], pt);
        });

        const stopDrawing = () => {
            if (!isDrawing) return;
            isDrawing = false;
            if (this.currentPath.length > 0) {
                this.history.push({
                    color: this.colors[this.currentColorIndex].rgba,
                    width: this.strokeWidth,
                    points: [...this.currentPath]
                });
                this.currentPath = [];
            }
        };

        window.addEventListener('mouseup', stopDrawing);
        window.addEventListener('blur', stopDrawing);

        // Global shortcuts
        document.addEventListener('keydown', (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

            // 'H' key toggles highlighter
            if ((e.key === 'h' || e.key === 'H') && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                this.toggle();
            }

            // 'C' key clears highlights when active
            if ((e.key === 'c' || e.key === 'C') && this.isActive && !e.ctrlKey) {
                this.clear();
            }

            // 'Ctrl + Z' undoes last highlight stroke
            if (e.ctrlKey && (e.key === 'z' || e.key === 'Z') && this.isActive) {
                e.preventDefault();
                this.undo();
            }
        });
    }

    drawPoint(x, y) {
        this.ctx.save();
        this.ctx.fillStyle = this.colors[this.currentColorIndex].rgba;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.strokeWidth / 2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }

    drawSegment(p1, p2) {
        if (!p1 || !p2) return;
        this.ctx.save();
        this.ctx.strokeStyle = this.colors[this.currentColorIndex].rgba;
        this.ctx.lineWidth = this.strokeWidth;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
        this.ctx.restore();
    }

    redrawHistory() {
        const dpr = window.devicePixelRatio || 1;
        this.ctx.clearRect(0, 0, this.canvas.width / dpr, this.canvas.height / dpr);

        this.history.forEach(stroke => {
            if (stroke.points.length === 1) {
                this.ctx.save();
                this.ctx.fillStyle = stroke.color;
                this.ctx.beginPath();
                this.ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.width / 2, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            } else if (stroke.points.length > 1) {
                this.ctx.save();
                this.ctx.strokeStyle = stroke.color;
                this.ctx.lineWidth = stroke.width;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.beginPath();
                this.ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
                for (let i = 1; i < stroke.points.length; i++) {
                    this.ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
                }
                this.ctx.stroke();
                this.ctx.restore();
            }
        });
    }

    toggle() {
        this.isActive = !this.isActive;
        this.canvas.classList.toggle('active', this.isActive);

        const btn = document.getElementById('toolHighlightBtn');
        if (btn) btn.classList.toggle('active', this.isActive);

        const palette = document.getElementById('highlighterPalette');
        if (palette) palette.style.display = this.isActive ? 'flex' : 'none';

        // If pen or laser is on, turn them off to avoid conflict
        if (this.isActive && window.presentationTools) {
            if (window.presentationTools.isPenActive) window.presentationTools.togglePen();
            if (window.presentationTools.isLaserActive) window.presentationTools.toggleLaser();
        }
    }

    setColor(index) {
        if (index >= 0 && index < this.colors.length) {
            this.currentColorIndex = index;
            document.querySelectorAll('.highlighter-color-btn').forEach((btn, i) => {
                btn.classList.toggle('active', i === index);
            });
        }
    }

    setWidth(width) {
        this.strokeWidth = width;
        document.querySelectorAll('.highlighter-width-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.width) === width);
        });
    }

    undo() {
        if (this.history.length > 0) {
            this.history.pop();
            this.redrawHistory();
        }
    }

    clear() {
        this.history = [];
        const dpr = window.devicePixelRatio || 1;
        this.ctx.clearRect(0, 0, this.canvas.width / dpr, this.canvas.height / dpr);
    }

    injectStyles() {
        if (document.getElementById('teacherHighlighterStyles')) return;
        const style = document.createElement('style');
        style.id = 'teacherHighlighterStyles';
        style.textContent = `
            #highlighterCanvas {
                position: fixed;
                inset: 0;
                width: 100vw;
                height: 100vh;
                z-index: 9980;
                pointer-events: none;
                cursor: default;
            }
            #highlighterCanvas.active {
                pointer-events: auto;
                cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='%23facc15' stroke='%23000' stroke-width='1.5'%3E%3Cpath d='m9 11-6 6v3h3l6-6'/%3E%3Cpath d='m22 7-3-3a2.83 2.83 0 0 0-4 0l-4 4 7 7 4-4a2.83 2.83 0 0 0 0-4Z'/%3E%3C/svg%3E") 2 24, crosshair;
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
