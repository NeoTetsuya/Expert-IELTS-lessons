/**
 * ==========================================================================
 * PRESENTER DRAWING STUDIO (PresenterDrawingEngine)
 * Handles interactive ink drawing, text highlighters, laser pointer physics,
 * color swatches, line smoothing, undo history, and projector mirror sync.
 * ==========================================================================
 */

class PresenterDrawingEngine {
    constructor(syncEngine) {
        this.sync = syncEngine || window.presenterSyncEngine;
        this.activeToolMode = 'none'; // 'none' | 'laser' | 'pen' | 'highlighter'
        this.laserActive = false;
        this.penActive = false;
        this.highlighterActive = false;

        this.penColor = '#ef4444';
        this.penWidth = 3.5;
        this.highlighterColorIndex = 0;
        this.highlighterColors = [
            { name: 'Yellow', bg: 'rgba(254, 240, 138, 0.85)', hex: '#facc15', border: '#ca8a04' },
            { name: 'Green',  bg: 'rgba(187, 247, 208, 0.85)', hex: '#4ade80', border: '#16a34a' },
            { name: 'Cyan',   bg: 'rgba(186, 230, 253, 0.85)', hex: '#38bdf8', border: '#0284c7' },
            { name: 'Pink',   bg: 'rgba(251, 207, 232, 0.85)', hex: '#f472b6', border: '#db2777' }
        ];

        this.canvas = null;
        this.ctx = null;
        this.laserDot = null;
        this.isDrawing = false;
        this.strokePoints = [];
    }

    attach(canvasEl, laserDotEl) {
        this.canvas = canvasEl;
        this.laserDot = laserDotEl;
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.bindEvents();
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        if (!this.canvas) return;
        const rect = this.canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
        }
    }

    bindEvents() {
        if (!this.canvas) return;

        this.canvas.addEventListener('mousedown', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const normX = Math.max(0, Math.min(1, x / rect.width));
            const normY = Math.max(0, Math.min(1, y / rect.height));

            if (this.laserActive) {
                if (this.laserDot) {
                    this.laserDot.style.display = 'block';
                    this.laserDot.style.left = `${e.clientX}px`;
                    this.laserDot.style.top = `${e.clientY}px`;
                }
                if (this.sync) this.sync.emit('LASER_MOVE', { normX, normY });
            }

            if (this.penActive && this.ctx) {
                this.isDrawing = true;
                this.strokePoints = [{ normX, normY }];
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const normX = Math.max(0, Math.min(1, x / rect.width));
            const normY = Math.max(0, Math.min(1, y / rect.height));

            if (this.laserActive) {
                if (this.laserDot) {
                    this.laserDot.style.display = 'block';
                    this.laserDot.style.left = `${e.clientX}px`;
                    this.laserDot.style.top = `${e.clientY}px`;
                }
                if (this.sync) this.sync.emit('LASER_MOVE', { normX, normY });
            }

            if (this.penActive && this.isDrawing && this.ctx) {
                this.ctx.lineTo(x, y);
                this.ctx.strokeStyle = this.penColor;
                this.ctx.lineWidth = this.penWidth;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.stroke();

                this.strokePoints.push({ normX, normY });
                if (this.strokePoints.length > 3) {
                    if (this.sync) {
                        this.sync.emit('PEN_DRAW', {
                            stroke: this.strokePoints,
                            color: this.penColor,
                            width: this.penWidth
                        });
                    }
                    this.strokePoints = [{ normX, normY }];
                }
            }
        });

        this.canvas.addEventListener('mouseleave', () => {
            if (this.laserDot) this.laserDot.style.display = 'none';
        });

        window.addEventListener('mouseup', () => {
            if (this.isDrawing && this.strokePoints.length > 0) {
                if (this.sync) {
                    this.sync.emit('PEN_DRAW', {
                        stroke: this.strokePoints,
                        color: this.penColor,
                        width: this.penWidth
                    });
                }
            }
            this.isDrawing = false;
            this.strokePoints = [];
        });
    }

    setMode(mode) {
        this.activeToolMode = mode;
        this.laserActive = (mode === 'laser');
        this.penActive = (mode === 'pen');
        this.highlighterActive = (mode === 'highlighter');

        // Update UI buttons
        document.querySelectorAll('.cp-mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        document.getElementById('btnCpLaser')?.classList.toggle('active', this.laserActive);
        document.getElementById('btnCpPen')?.classList.toggle('active', this.penActive);
        document.getElementById('btnCpHighlighter')?.classList.toggle('active', this.highlighterActive);

        // Toggle studio palettes
        const penPalette = document.getElementById('cpPenPalette');
        const penWidthPalette = document.getElementById('cpPenWidthPalette');
        const highlighterPalette = document.getElementById('cpHighlighterPalette');

        if (penPalette) penPalette.style.display = this.penActive ? 'flex' : 'none';
        if (penWidthPalette) penWidthPalette.style.display = this.penActive ? 'flex' : 'none';
        if (highlighterPalette) highlighterPalette.style.display = this.highlighterActive ? 'flex' : 'none';

        if (this.canvas) {
            this.canvas.style.pointerEvents = (this.penActive || this.laserActive) ? 'auto' : 'none';
            if (this.penActive) {
                this.canvas.style.cursor = 'crosshair';
            } else if (this.laserActive) {
                this.canvas.style.cursor = 'none';
            } else {
                this.canvas.style.cursor = 'default';
            }
        }

        if (this.laserDot && !this.laserActive) {
            this.laserDot.style.display = 'none';
        }

        // Audience highlighter activation
        if (window.teacherHighlighter) {
            if (this.highlighterActive) {
                window.teacherHighlighter.activate(false);
            } else {
                window.teacherHighlighter.deactivate(false);
            }
        }

        if (this.sync) {
            this.sync.emit('LASER_STATE', { active: this.laserActive });
            this.sync.emit('PEN_STATE', { active: this.penActive });
            this.sync.emit('HIGHLIGHTER_STATE', { active: this.highlighterActive });
        }
    }

    clear() {
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        if (window.penAnnotation) window.penAnnotation.clear(true);
        if (window.teacherHighlighter) window.teacherHighlighter.clear(true);
        if (window.readingHighlighter) window.readingHighlighter.clearAll(null, true);
    }
}

// Global instantiation
window.presenterDrawingEngine = new PresenterDrawingEngine();
