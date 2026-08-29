/**
 * Universal Presentation Spotlight & Screen Mute (PresentationSpotlight)
 * 
 * Provides essential classroom focus controls:
 * 1. Screen Blackout: Press 'B' (or '.' in standard presenter remotes) to turn the screen pitch black to focus student attention on the teacher.
 * 2. Screen Whiteout: Press 'W' to turn the screen white (for whiteboard projection).
 * 3. Spotlight Mode: Press 'S' to dim the slide background and highlight only the active sentence/cursor area.
 */

class PresentationSpotlight {
    constructor() {
        this.isBlackout = false;
        this.isWhiteout = false;
        this.isSpotlight = false;
        this.init();
    }

    init() {
        this.createOverlays();
        this.bindShortcuts();
    }

    createOverlays() {
        const overlay = document.createElement('div');
        overlay.id = 'screenMuteOverlay';
        overlay.className = 'screen-mute-overlay';
        overlay.style.display = 'none';
        document.body.appendChild(overlay);

        const spotlight = document.createElement('div');
        spotlight.id = 'spotlightMask';
        spotlight.className = 'spotlight-mask';
        spotlight.style.display = 'none';
        document.body.appendChild(spotlight);

        window.addEventListener('mousemove', (e) => {
            if (this.isSpotlight) {
                spotlight.style.setProperty('--cursor-x', `${e.clientX}px`);
                spotlight.style.setProperty('--cursor-y', `${e.clientY}px`);
            }
        });

        // Inject Styles
        const style = document.createElement('style');
        style.id = 'spotlightStyles';
        style.textContent = `
            .screen-mute-overlay {
                position: fixed;
                inset: 0;
                z-index: 9999999;
                transition: opacity 0.25s ease;
                cursor: pointer;
            }
            .screen-mute-overlay.blackout {
                background: #000000;
            }
            .screen-mute-overlay.whiteout {
                background: #ffffff;
            }
            .spotlight-mask {
                position: fixed;
                inset: 0;
                z-index: 99998;
                pointer-events: none;
                background: radial-gradient(circle 180px at var(--cursor-x, 50%) var(--cursor-y, 50%), transparent 0%, rgba(0, 0, 0, 0.78) 100%);
                transition: background 0.05s ease-out;
            }
        `;
        document.head.appendChild(style);
    }

    toggleBlackout() {
        this.isBlackout = !this.isBlackout;
        this.isWhiteout = false;
        const overlay = document.getElementById('screenMuteOverlay');
        if (overlay) {
            overlay.className = 'screen-mute-overlay blackout';
            overlay.style.display = this.isBlackout ? 'block' : 'none';
        }
    }

    toggleWhiteout() {
        this.isWhiteout = !this.isWhiteout;
        this.isBlackout = false;
        const overlay = document.getElementById('screenMuteOverlay');
        if (overlay) {
            overlay.className = 'screen-mute-overlay whiteout';
            overlay.style.display = this.isWhiteout ? 'block' : 'none';
        }
    }

    toggleSpotlight() {
        this.isSpotlight = !this.isSpotlight;
        const mask = document.getElementById('spotlightMask');
        if (mask) {
            mask.style.display = this.isSpotlight ? 'block' : 'none';
        }
    }

    clearMute() {
        this.isBlackout = false;
        this.isWhiteout = false;
        const overlay = document.getElementById('screenMuteOverlay');
        if (overlay) overlay.style.display = 'none';
    }

    bindShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

            const key = e.key.toLowerCase();
            if (key === 'b' || key === '.') {
                e.preventDefault();
                this.toggleBlackout();
            } else if (key === 'w') {
                e.preventDefault();
                this.toggleWhiteout();
            } else if (key === 's') {
                e.preventDefault();
                this.toggleSpotlight();
            } else if (this.isBlackout || this.isWhiteout) {
                this.clearMute();
            }
        });

        document.getElementById('screenMuteOverlay')?.addEventListener('click', () => {
            this.clearMute();
        });
    }

    updatePosition(x, y) {
        const mask = document.getElementById('spotlightMask');
        if (mask) {
            mask.style.setProperty('--cursor-x', `${x}px`);
            mask.style.setProperty('--cursor-y', `${y}px`);
        }
    }

    activate() {
        this.isSpotlight = true;
        const mask = document.getElementById('spotlightMask');
        if (mask) mask.style.display = 'block';
    }

    deactivate() {
        this.isSpotlight = false;
        const mask = document.getElementById('spotlightMask');
        if (mask) mask.style.display = 'none';
    }
}

// Global auto-instantiation
let presentationSpotlight;
window.addEventListener('DOMContentLoaded', () => {
    presentationSpotlight = new PresentationSpotlight();
    window.presentationSpotlight = presentationSpotlight;
});

