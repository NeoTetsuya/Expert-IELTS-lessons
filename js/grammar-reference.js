/**
 * ==========================================================================
 * GRAMMAR REFERENCE VIEWER (GrammarReferenceEngine)
 * Interactive Modal & Embedded Viewer for Module Grammar Source References
 * Supports:
 * - Embedded iframe modal viewer with tabs, tests, and deep explanations
 * - Dynamic URL and title binding
 * - Responsive full-screen & new-tab expansion
 * - Keyboard shortcut (Esc to close)
 * - Auto-binds elements with [data-grammar-ref]
 * ==========================================================================
 */

class GrammarReferenceEngine {
    constructor() {
        this.isOpen = false;
        this.currentUrl = '';
        this.currentTitle = 'Grammar Reference';

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
        if (document.getElementById('grammarReferenceModal')) return;

        const modal = document.createElement('div');
        modal.id = 'grammarReferenceModal';
        modal.className = 'grammar-ref-modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="grammar-ref-backdrop" onclick="window.grammarReferenceEngine && window.grammarReferenceEngine.close()"></div>
            <div class="grammar-ref-dialog">
                <div class="grammar-ref-header">
                    <div class="grammar-ref-title-group">
                        <span class="grammar-ref-badge" id="grammarRefBadge">📘 Grammar Handbook</span>
                        <h3 class="grammar-ref-title" id="grammarRefTitle">Grammar Reference</h3>
                    </div>
                    <div class="grammar-ref-actions">
                        <a id="grammarRefExternalLink" href="#" target="_blank" class="grammar-ref-btn" title="Open in New Tab">
                            ↗ New Tab
                        </a>
                        <button class="grammar-ref-btn" onclick="window.grammarReferenceEngine && window.grammarReferenceEngine.toggleFullscreen()" title="Toggle Fullscreen">
                            ⛶ Fullscreen
                        </button>
                        <button class="grammar-ref-close-btn" onclick="window.grammarReferenceEngine && window.grammarReferenceEngine.close()" title="Close (Esc)">
                            ✕
                        </button>
                    </div>
                </div>
                <div class="grammar-ref-body">
                    <div class="grammar-ref-loading" id="grammarRefLoading">
                        <div class="grammar-ref-spinner"></div>
                        <span>Loading Grammar Reference...</span>
                    </div>
                    <iframe id="grammarRefFrame" class="grammar-ref-frame" src="about:blank" frameborder="0"></iframe>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Inject Styles
        const style = document.createElement('style');
        style.id = 'grammarRefStyles';
        style.textContent = `
            .grammar-ref-modal {
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
            .grammar-ref-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(15, 23, 42, 0.75);
                backdrop-filter: blur(6px);
                animation: gRefFadeIn 0.2s ease-out;
            }
            .grammar-ref-dialog {
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
                animation: gRefScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .grammar-ref-dialog.fullscreen {
                width: 100vw !important;
                height: 100vh !important;
                max-width: 100vw !important;
                border-radius: 0 !important;
            }
            .grammar-ref-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 24px;
                background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
                color: #ffffff;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            .grammar-ref-title-group {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .grammar-ref-badge {
                background: rgba(99, 102, 241, 0.35);
                color: #c7d2fe;
                font-size: 13px;
                font-weight: 700;
                padding: 4px 10px;
                border-radius: 9999px;
                border: 1px solid rgba(165, 180, 252, 0.3);
                letter-spacing: 0.5px;
            }
            .grammar-ref-title {
                margin: 0;
                font-size: 19px;
                font-weight: 700;
                color: #ffffff;
                font-family: inherit;
            }
            .grammar-ref-actions {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .grammar-ref-btn {
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
            .grammar-ref-btn:hover {
                background: rgba(255, 255, 255, 0.25);
                color: #ffffff;
                transform: translateY(-1px);
            }
            .grammar-ref-close-btn {
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
            .grammar-ref-close-btn:hover {
                background: #ef4444;
                color: #ffffff;
            }
            .grammar-ref-body {
                position: relative;
                flex: 1;
                background: #f8fafc;
                overflow: hidden;
            }
            .grammar-ref-frame {
                width: 100%;
                height: 100%;
                border: none;
                background: #ffffff;
            }
            .grammar-ref-loading {
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
            .grammar-ref-spinner {
                width: 36px;
                height: 36px;
                border: 3px solid #e2e8f0;
                border-top-color: #4f46e5;
                border-radius: 50%;
                animation: gRefSpin 0.8s linear infinite;
            }
            @keyframes gRefSpin {
                to { transform: rotate(360deg); }
            }
            @keyframes gRefFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes gRefScaleUp {
                from { opacity: 0; transform: scale(0.96); }
                to { opacity: 1; transform: scale(1); }
            }

            /* Dedicated grammar exercise button style */
            .grammar-exercise-trigger-btn {
                background: linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%);
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
                box-shadow: 0 4px 14px rgba(124, 58, 237, 0.35) !important;
                transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
                text-decoration: none !important;
                white-space: nowrap !important;
            }
            .grammar-exercise-trigger-btn:hover {
                transform: translateY(-1.5px) !important;
                box-shadow: 0 6px 18px rgba(124, 58, 237, 0.45) !important;
                background: linear-gradient(135deg, #5b21b6 0%, #6d28d9 100%) !important;
            }
            .grammar-exercise-trigger-btn:active {
                transform: scale(0.97) !important;
            }
        `;
        document.head.appendChild(style);
    }

    bindTriggers() {
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-grammar-ref]');
            if (trigger) {
                e.preventDefault();
                const url = trigger.getAttribute('data-grammar-ref');
                const title = trigger.getAttribute('data-grammar-title') || 'Grammar Reference Handbook';
                const badge = trigger.getAttribute('data-grammar-badge');
                this.open(url, title, badge);
            }
        });
    }

    open(url, title, badge) {
        this.injectModal();

        const modal = document.getElementById('grammarReferenceModal');
        const frame = document.getElementById('grammarRefFrame');
        const titleElem = document.getElementById('grammarRefTitle');
        const badgeElem = document.getElementById('grammarRefBadge');
        const linkElem = document.getElementById('grammarRefExternalLink');
        const loadingElem = document.getElementById('grammarRefLoading');

        if (!modal || !frame) return;

        this.currentUrl = url || this.currentUrl;
        this.currentTitle = title || this.currentTitle;

        titleElem.textContent = this.currentTitle;
        if (badgeElem) {
            badgeElem.textContent = badge || (this.currentTitle.includes('Exercise') || this.currentTitle.includes('Development') ? '📝 Grammar Practice' : '📘 Grammar Handbook');
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
        const modal = document.getElementById('grammarReferenceModal');
        const frame = document.getElementById('grammarRefFrame');
        if (modal) {
            modal.style.display = 'none';
        }
        if (frame) {
            frame.src = 'about:blank';
        }
        this.isOpen = false;
    }

    toggleFullscreen() {
        const dialog = document.querySelector('.grammar-ref-dialog');
        if (dialog) {
            dialog.classList.toggle('fullscreen');
        }
    }
}

// Global Instance & Helper
window.grammarReferenceEngine = new GrammarReferenceEngine();
window.openGrammarReference = function(url, title) {
    if (window.grammarReferenceEngine) {
        window.grammarReferenceEngine.open(url, title);
    }
};
