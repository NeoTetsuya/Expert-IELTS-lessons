/**
 * Laser Pointer Module (LaserPointer)
 * Provides a high-visibility glowing red laser dot that follows mouse movement.
 * Toggle shortcut: 'L'
 */

class LaserPointer {
    constructor() {
        this.isActive = false;
        this.dot = null;
        this.init();
    }

    init() {
        // Inject styles if not present
        if (!document.getElementById('laserPointerStyles')) {
            const style = document.createElement('style');
            style.id = 'laserPointerStyles';
            style.textContent = `
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
            `;
            document.head.appendChild(style);
        }

        // Create dot element
        const dot = document.createElement('div');
        dot.id = 'laserPointerDot';
        document.body.appendChild(dot);
        this.dot = dot;

        // Mouse tracking
        window.addEventListener('mousemove', (e) => {
            if (this.isActive && this.dot) {
                this.dot.style.left = `${e.clientX}px`;
                this.dot.style.top = `${e.clientY}px`;
            }
        });
    }

    toggle() {
        this.isActive ? this.deactivate() : this.activate();
    }

    activate() {
        this.isActive = true;
        if (this.dot) this.dot.style.display = 'block';

        // Update button UI
        const btn = document.getElementById('toolLaserBtn');
        if (btn) btn.classList.add('active');

        // Mutually exclusive with pen annotation
        if (window.penAnnotation && window.penAnnotation.isActive) {
            window.penAnnotation.deactivate();
        }
    }

    deactivate() {
        this.isActive = false;
        if (this.dot) this.dot.style.display = 'none';

        // Update button UI
        const btn = document.getElementById('toolLaserBtn');
        if (btn) btn.classList.remove('active');
    }
}

// Global auto-instantiation
let laserPointer;
window.addEventListener('DOMContentLoaded', () => {
    laserPointer = new LaserPointer();
    window.laserPointer = laserPointer;
});
