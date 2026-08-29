/**
 * Pen Annotation Module (PenAnnotation)
 * Provides an on-slide transparent drawing and sketch canvas.
 * Shortcuts: 'P' to toggle pen, 'C' to clear drawings.
 */

class PenAnnotation {
    constructor() {
        this.isActive = false;
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        // Inject styles if not present
        if (!document.getElementById('penAnnotationStyles')) {
            const style = document.createElement('style');
            style.id = 'penAnnotationStyles';
            style.textContent = `
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
            `;
            document.head.appendChild(style);
        }

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
        let currentStroke = [];

        canvas.addEventListener('mousedown', (e) => {
            if (!this.isActive) return;
            isDrawing = true;
            [lastX, lastY] = [e.clientX, e.clientY];
            currentStroke = [{
                normX: e.clientX / window.innerWidth,
                normY: e.clientY / window.innerHeight
            }];
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing || !this.isActive) return;
            this.ctx.beginPath();
            this.ctx.moveTo(lastX, lastY);
            this.ctx.lineTo(e.clientX, e.clientY);
            this.ctx.strokeStyle = '#ef4444';
            this.ctx.lineWidth = 3.5;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.stroke();

            currentStroke.push({
                normX: e.clientX / window.innerWidth,
                normY: e.clientY / window.innerHeight
            });

            if (currentStroke.length > 3 && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('PEN_DRAW', {
                    stroke: currentStroke,
                    color: '#ef4444',
                    width: 3.5
                });
                currentStroke = [{
                    normX: e.clientX / window.innerWidth,
                    normY: e.clientY / window.innerHeight
                }];
            }

            [lastX, lastY] = [e.clientX, e.clientY];
        });

        window.addEventListener('mouseup', () => {
            if (isDrawing && currentStroke.length > 0 && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('PEN_DRAW', {
                    stroke: currentStroke,
                    color: '#ef4444',
                    width: 3.5
                });
            }
            isDrawing = false;
            currentStroke = [];
        });
    }

    toggle() {
        this.isActive ? this.deactivate() : this.activate();
    }

    activate(broadcast = true) {
        this.isActive = true;
        if (this.canvas) this.canvas.classList.add('active');

        const btn = document.getElementById('toolPenBtn');
        if (btn) btn.classList.add('active');

        // Mutually exclusive with laser pointer
        if (window.laserPointer && window.laserPointer.isActive) {
            window.laserPointer.deactivate();
        }

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('PEN_STATE', { active: true });
        }
    }

    deactivate(broadcast = true) {
        this.isActive = false;
        if (this.canvas) this.canvas.classList.remove('active');

        const btn = document.getElementById('toolPenBtn');
        if (btn) btn.classList.remove('active');

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('PEN_STATE', { active: false });
        }
    }

    clear(broadcast = true) {
        if (this.canvas && this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('PEN_CLEAR', {});
        }
    }
}

// Global auto-instantiation
let penAnnotation;
window.addEventListener('DOMContentLoaded', () => {
    penAnnotation = new PenAnnotation();
    window.penAnnotation = penAnnotation;
});
