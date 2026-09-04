/**
 * ==========================================================================
 * VOCABULARY REFERENCE VIEWER (VocabReferenceEngine)
 * Interactive Modal & Embedded Viewer for Module Vocabulary Exercises
 * Supports:
 * - Embedded iframe modal viewer with tabs, quizzes, and definitions
 * - Dynamic URL and title binding from [data-vocab-ref]
 * - Responsive full-screen & new-tab expansion
 * - Keyboard shortcut (Esc to close)
 * - Auto-binds elements with [data-vocab-ref]
 * ==========================================================================
 */

class VocabReferenceEngine {
    constructor() {
        this.isOpen = false;
        this.currentUrl = '';
        this.currentTitle = 'Vocabulary Exercises';

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.injectModal();
        this.bindTriggers();

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    injectModal() {
        if (document.getElementById('vocabReferenceModal')) return;

        const modal = document.createElement('div');
        modal.id = 'vocabReferenceModal';
        modal.className = 'vocab-ref-modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="vocab-ref-backdrop" onclick="window.vocabReferenceEngine && window.vocabReferenceEngine.close()"></div>
            <div class="vocab-ref-dialog">
                <div class="vocab-ref-header">
                    <div class="vocab-ref-title-group">
                        <span class="vocab-ref-badge" id="vocabRefBadge">📚 Vocabulary Practice</span>
                        <h3 class="vocab-ref-title" id="vocabRefTitle">Vocabulary Exercises</h3>
                    </div>
                    <div class="vocab-ref-actions">
                        <a id="vocabRefExternalLink" href="#" target="_blank" class="vocab-ref-btn" title="Open in New Tab">
                            ↗ New Tab
                        </a>
                        <button class="vocab-ref-btn" onclick="window.vocabReferenceEngine && window.vocabReferenceEngine.toggleFullscreen()" title="Toggle Fullscreen">
                            ⛶ Fullscreen
                        </button>
                        <button class="vocab-ref-close-btn" onclick="window.vocabReferenceEngine && window.vocabReferenceEngine.close()" title="Close (Esc)">
                            ✕
                        </button>
                    </div>
                </div>
                <div class="vocab-ref-body">
                    <div class="vocab-ref-loading" id="vocabRefLoading">
                        <div class="vocab-ref-spinner"></div>
                        <span>Loading Vocabulary Exercises...</span>
                    </div>
                    <iframe id="vocabRefFrame" class="vocab-ref-frame" src="about:blank" frameborder="0"></iframe>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Inject Styles
        const style = document.createElement('style');
        style.id = 'vocabRefStyles';
        style.textContent = `
            .vocab-ref-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .vocab-ref-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(15, 23, 42, 0.75);
                backdrop-filter: blur(6px);
                animation: vRefFadeIn 0.2s ease-out;
            }
            .vocab-ref-dialog {
                position: relative;
                width: 92vw;
                height: 90vh;
                max-width: 1360px;
                background: #ffffff;
                border-radius: 20px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                z-index: 1;
                animation: vRefScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .vocab-ref-dialog.fullscreen {
                width: 100vw !important;
                height: 100vh !important;
                max-width: 100vw !important;
                border-radius: 0 !important;
            }
            .vocab-ref-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 24px;
                background: linear-gradient(135deg, #064e3b 0%, #047857 100%);
                color: #ffffff;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            .vocab-ref-title-group {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .vocab-ref-badge {
                background: rgba(16, 185, 129, 0.35);
                color: #a7f3d0;
                font-size: 13px;
                font-weight: 700;
                padding: 4px 10px;
                border-radius: 9999px;
                border: 1px solid rgba(110, 231, 183, 0.3);
                letter-spacing: 0.5px;
            }
            .vocab-ref-title {
                margin: 0;
                font-size: 19px;
                font-weight: 700;
                color: #ffffff;
                font-family: inherit;
            }
            .vocab-ref-actions {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .vocab-ref-btn {
                background: rgba(255, 255, 255, 0.12);
                color: #ffffff;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                padding: 6px 14px;
                font-size: 13.5px;
                font-weight: 600;
                text-decoration: none;
                cursor: pointer;
                transition: all 0.2s ease;
                display: inline-flex;
                align-items: center;
                gap: 4px;
            }
            .vocab-ref-btn:hover {
                background: rgba(255, 255, 255, 0.25);
                color: #ffffff;
                transform: translateY(-1px);
            }
            .vocab-ref-close-btn {
                background: rgba(239, 68, 68, 0.2);
                color: #fca5a5;
                border: 1px solid rgba(239, 68, 68, 0.4);
                border-radius: 8px;
                width: 34px;
                height: 34px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s ease;
                margin-left: 6px;
            }
            .vocab-ref-close-btn:hover {
                background: #ef4444;
                color: #ffffff;
            }
            .vocab-ref-body {
                position: relative;
                flex: 1;
                background: #f8fafc;
                overflow: hidden;
            }
            .vocab-ref-frame {
                width: 100%;
                height: 100%;
                border: none;
                background: #ffffff;
            }
            .vocab-ref-loading {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #ffffff;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 12px;
                font-size: 15px;
                color: #64748b;
                z-index: 2;
                transition: opacity 0.3s ease;
            }
            .vocab-ref-spinner {
                width: 36px;
                height: 36px;
                border: 3px solid #e2e8f0;
                border-top-color: #059669;
                border-radius: 50%;
                animation: vRefSpin 0.8s linear infinite;
            }
            @keyframes vRefSpin {
                to { transform: rotate(360deg); }
            }
            @keyframes vRefFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes vRefScaleUp {
                from { opacity: 0; transform: scale(0.96); }
                to { opacity: 1; transform: scale(1); }
            }

            /* Dedicated vocabulary exercise button style */
            .vocab-exercise-trigger-btn {
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
                color: #ffffff !important;
                font-weight: 700 !important;
                border: 1px solid rgba(255, 255, 255, 0.25) !important;
                padding: 7px 16px !important;
                border-radius: 8px !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 7px !important;
                cursor: pointer !important;
                font-size: 14.5px !important;
                box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35) !important;
                transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
                text-decoration: none !important;
                white-space: nowrap !important;
            }
            .vocab-exercise-trigger-btn:hover {
                transform: translateY(-1.5px) !important;
                box-shadow: 0 6px 18px rgba(5, 150, 105, 0.45) !important;
                background: linear-gradient(135deg, #047857 0%, #065f46 100%) !important;
            }
            .vocab-exercise-trigger-btn:active {
                transform: scale(0.97) !important;
            }
        `;
        document.head.appendChild(style);
    }

    bindTriggers() {
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-vocab-ref]');
            if (trigger) {
                e.preventDefault();
                const url = trigger.getAttribute('data-vocab-ref');
                const title = trigger.getAttribute('data-vocab-title') || 'Vocabulary Exercises';
                const badge = trigger.getAttribute('data-vocab-badge');
                this.open(url, title, badge);
            }
        });
    }

    open(url, title, badge) {
        this.injectModal();

        const modal = document.getElementById('vocabReferenceModal');
        const frame = document.getElementById('vocabRefFrame');
        const titleElem = document.getElementById('vocabRefTitle');
        const badgeElem = document.getElementById('vocabRefBadge');
        const linkElem = document.getElementById('vocabRefExternalLink');
        const loadingElem = document.getElementById('vocabRefLoading');

        if (!modal || !frame) return;

        this.currentUrl = url || this.currentUrl;
        this.currentTitle = title || this.currentTitle;

        titleElem.textContent = this.currentTitle;
        if (badgeElem) {
            badgeElem.textContent = badge || '📚 Vocabulary Practice';
        }
        linkElem.href = this.currentUrl;

        loadingElem.style.display = 'flex';
        loadingElem.style.opacity = '1';

        frame.onload = () => {
            loadingElem.style.opacity = '0';
            setTimeout(() => {
                loadingElem.style.display = 'none';
            }, 300);
        };

        frame.src = this.currentUrl;
        modal.style.display = 'flex';
        this.isOpen = true;
    }

    close() {
        const modal = document.getElementById('vocabReferenceModal');
        const frame = document.getElementById('vocabRefFrame');
        if (modal) {
            modal.style.display = 'none';
        }
        if (frame) {
            frame.src = 'about:blank';
        }
        this.isOpen = false;
    }

    toggleFullscreen() {
        const dialog = document.querySelector('.vocab-ref-dialog');
        if (dialog) {
            dialog.classList.toggle('fullscreen');
        }
    }
}

// Global Instance & Helper
window.vocabReferenceEngine = new VocabReferenceEngine();
window.openVocabReference = function(url, title) {
    if (window.vocabReferenceEngine) {
        window.vocabReferenceEngine.open(url, title);
    }
};
