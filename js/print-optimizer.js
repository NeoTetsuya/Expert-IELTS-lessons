/**
 * Universal Print & PDF Handout Optimizer (PrintOptimizer)
 * 
 * Automatically reconfigures the fixed 16:9 stage layout into sequential
 * multi-page printable handouts when the teacher or student presses Ctrl+P (Print).
 */

class PrintOptimizer {
    constructor() {
        this.init();
    }

    init() {
        const style = document.createElement('style');
        style.id = 'printOptimizerStyles';
        style.textContent = `
            @media print {
                html, body {
                    width: 100% !important;
                    height: auto !important;
                    overflow: visible !important;
                    background: #ffffff !important;
                    font-size: 12pt !important;
                }
                .deck-viewport, .deck-stage {
                    position: static !important;
                    width: 100% !important;
                    height: auto !important;
                    transform: none !important;
                    background: transparent !important;
                    overflow: visible !important;
                }
                .slide {
                    position: relative !important;
                    width: 100% !important;
                    height: auto !important;
                    min-height: 90vh !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    page-break-after: always !important;
                    break-after: page !important;
                    margin-bottom: 2cm !important;
                }
                .presentation-tools-hud,
                .font-controls,
                .font-indicator,
                .nav-hint,
                #slideCounter,
                .notebook-tabs,
                #spotlightMask,
                .screen-mute-overlay,
                .slide-nav-modal {
                    display: none !important;
                }
                .notebook, .title-notebook, .section-inner {
                    width: 100% !important;
                    height: auto !important;
                    box-shadow: none !important;
                    border: 1px solid #cbd5e1 !important;
                }
                .reading-pane, .question-pane, .col, .essay-card {
                    overflow: visible !important;
                    max-height: none !important;
                    height: auto !important;
                }
                .item-explanation {
                    display: block !important;
                    opacity: 1 !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Global auto-instantiation
let printOptimizer;
window.addEventListener('DOMContentLoaded', () => {
    printOptimizer = new PrintOptimizer();
});
