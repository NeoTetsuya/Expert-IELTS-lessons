/**
 * ==========================================================================
 * READING WALKTHROUGH VIEWER (ReadingWalkthroughEngine)
 * Interactive Modal & Embedded Viewer for Module Reading Walkthrough Masterclasses
 * Supports:
 * - Embedded iframe modal viewer with high performance, isolated sandbox
 * - Dynamic URL and title binding from [data-walkthrough-ref]
 * - Responsive full-screen & direct new-tab expansion
 * - Keyboard shortcut (Esc to close)
 * - Auto-binds elements with [data-walkthrough-ref] or [data-reading-walkthrough]
 * ==========================================================================
 */

class ReadingWalkthroughEngine {
    constructor() {
        this.isOpen = false;
        this.currentUrl = '';
        this.currentTitle = 'Reading Masterclass Walkthrough';

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
        if (document.getElementById('readingWalkthroughModal')) return;

        const modal = document.createElement('div');
        modal.id = 'readingWalkthroughModal';
        modal.className = 'reading-wt-modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="reading-wt-backdrop" onclick="window.readingWalkthroughEngine && window.readingWalkthroughEngine.close()"></div>
            <div class="reading-wt-dialog" id="readingWtDialog">
                <div class="reading-wt-header">
                    <div class="reading-wt-title-group">
                        <span class="reading-wt-badge">📖 Reading Analysis Walkthrough</span>
                        <h3 class="reading-wt-title" id="readingWtTitle">Reading Question Walkthrough</h3>
                    </div>
                    <div class="reading-wt-actions">
                        <a id="readingWtExternalLink" href="#" target="_blank" class="reading-wt-btn" title="Open Walkthrough in New Tab">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="vertical-align: middle;">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span>New Tab</span>
                        </a>
                        <button class="reading-wt-btn" onclick="window.readingWalkthroughEngine && window.readingWalkthroughEngine.toggleFullscreen()" title="Toggle Fullscreen">
                            <span id="readingWtFsIcon">⛶</span> Fullscreen
                        </button>
                        <button class="reading-wt-close-btn" onclick="window.readingWalkthroughEngine && window.readingWalkthroughEngine.close()" title="Close Walkthrough (Esc)">
                            ✕
                        </button>
                    </div>
                </div>
                <div class="reading-wt-body">
                    <div class="reading-wt-loading" id="readingWtLoading">
                        <div class="reading-wt-spinner"></div>
                        <span>Loading Reading Walkthrough Masterclass...</span>
                    </div>
                    <iframe id="readingWtFrame" class="reading-wt-frame" src="about:blank" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Inject Styles
        const style = document.createElement('style');
        style.id = 'readingWtStyles';
        style.textContent = `
            .reading-wt-modal {
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
            .reading-wt-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(15, 23, 42, 0.78);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                animation: wtFadeIn 0.2s ease-out;
            }
            .reading-wt-dialog {
                position: relative;
                width: 94vw;
                height: 92vh;
                max-width: 1480px;
                background: #ffffff;
                border-radius: 18px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.15);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                z-index: 1;
                animation: wtScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .reading-wt-dialog.fullscreen {
                width: 100vw !important;
                height: 100vh !important;
                max-width: 100vw !important;
                border-radius: 0 !important;
            }
            .reading-wt-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 14px 22px;
                background: linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #1e3a8a 100%);
                color: #ffffff;
                border-bottom: 1px solid rgba(255, 255, 255, 0.12);
                flex-shrink: 0;
            }
            .reading-wt-title-group {
                display: flex;
                align-items: center;
                gap: 12px;
                min-width: 0;
            }
            .reading-wt-badge {
                background: rgba(99, 102, 241, 0.35);
                color: #c7d2fe;
                font-size: 13px;
                font-weight: 700;
                padding: 4px 11px;
                border-radius: 9999px;
                border: 1px solid rgba(165, 180, 252, 0.35);
                letter-spacing: 0.4px;
                white-space: nowrap;
            }
            .reading-wt-title {
                margin: 0;
                font-size: 18px;
                font-weight: 700;
                color: #ffffff;
                font-family: inherit;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .reading-wt-actions {
                display: flex;
                align-items: center;
                gap: 8px;
                flex-shrink: 0;
            }
            .reading-wt-btn {
                background: rgba(255, 255, 255, 0.12);
                color: #ffffff;
                border: 1px solid rgba(255, 255, 255, 0.22);
                border-radius: 8px;
                padding: 6px 13px;
                font-size: 13.5px;
                font-weight: 600;
                text-decoration: none;
                cursor: pointer;
                transition: all 0.2s ease;
                display: inline-flex;
                align-items: center;
                gap: 5px;
            }
            .reading-wt-btn:hover {
                background: rgba(255, 255, 255, 0.25);
                color: #ffffff;
                transform: translateY(-1px);
            }
            .reading-wt-close-btn {
                background: rgba(239, 68, 68, 0.25);
                color: #fca5a5;
                border: 1px solid rgba(239, 68, 68, 0.45);
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
            .reading-wt-close-btn:hover {
                background: #ef4444;
                color: #ffffff;
                transform: scale(1.05);
            }
            .reading-wt-body {
                position: relative;
                flex: 1;
                width: 100%;
                height: 100%;
                background: #f8fafc;
                display: flex;
            }
            .reading-wt-frame {
                width: 100%;
                height: 100%;
                border: none;
                background: #ffffff;
            }
            .reading-wt-loading {
                position: absolute;
                inset: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 14px;
                background: #ffffff;
                color: #475569;
                font-weight: 600;
                font-size: 16px;
                z-index: 2;
                transition: opacity 0.3s ease;
            }
            .reading-wt-spinner {
                width: 44px;
                height: 44px;
                border: 4px solid #e2e8f0;
                border-top-color: #4f46e5;
                border-radius: 50%;
                animation: wtSpin 0.8s linear infinite;
            }
            @keyframes wtSpin {
                to { transform: rotate(360deg); }
            }
            @keyframes wtFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes wtScaleUp {
                from { transform: scale(0.96); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }

            /* Dedicated presentation deck button style */
            .reading-walkthrough-trigger-btn {
                background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
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
                box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35) !important;
                transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
                text-decoration: none !important;
                white-space: nowrap !important;
            }
            .reading-walkthrough-trigger-btn:hover {
                transform: translateY(-1.5px) !important;
                box-shadow: 0 6px 18px rgba(79, 70, 229, 0.45) !important;
                background: linear-gradient(135deg, #4338ca 0%, #4f46e5 100%) !important;
            }
            .reading-walkthrough-trigger-btn:active {
                transform: scale(0.97) !important;
            }
        `;
        document.head.appendChild(style);
    }

    bindTriggers() {
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-walkthrough-ref], [data-reading-walkthrough]');
            if (trigger) {
                // If user held Ctrl or Cmd or middle click, allow browser default new tab
                if (e.ctrlKey || e.metaKey || e.button === 1) {
                    return;
                }
                e.preventDefault();
                const url = trigger.getAttribute('data-walkthrough-ref') || trigger.getAttribute('data-reading-walkthrough') || trigger.getAttribute('href');
                const title = trigger.getAttribute('data-walkthrough-title') || trigger.getAttribute('title') || trigger.innerText.trim();
                if (url) {
                    this.open(url, title);
                }
            }
        });
    }

    open(url, title) {
        if (!url) return;

        this.injectModal();

        const modal = document.getElementById('readingWalkthroughModal');
        const titleEl = document.getElementById('readingWtTitle');
        const frame = document.getElementById('readingWtFrame');
        const extLink = document.getElementById('readingWtExternalLink');
        const loading = document.getElementById('readingWtLoading');

        this.currentUrl = url;
        this.currentTitle = title || 'Reading Question Walkthrough';

        if (titleEl) titleEl.textContent = this.currentTitle;
        if (extLink) extLink.href = url;

        // Reset frame loading
        if (loading) loading.style.display = 'flex';

        frame.onload = () => {
            if (loading) {
                loading.style.opacity = '0';
                setTimeout(() => { loading.style.display = 'none'; loading.style.opacity = '1'; }, 300);
            }
        };

        frame.src = url;
        modal.style.display = 'flex';
        this.isOpen = true;

        // Try to focus iframe after slight delay
        setTimeout(() => {
            try { frame.contentWindow.focus(); } catch (e) {}
        }, 200);
    }

    close() {
        const modal = document.getElementById('readingWalkthroughModal');
        const frame = document.getElementById('readingWtFrame');

        if (modal) modal.style.display = 'none';
        if (frame) frame.src = 'about:blank';

        const dialog = document.getElementById('readingWtDialog');
        if (dialog) dialog.classList.remove('fullscreen');

        this.isOpen = false;
    }

    toggleFullscreen() {
        const dialog = document.getElementById('readingWtDialog');
        const icon = document.getElementById('readingWtFsIcon');
        if (dialog) {
            dialog.classList.toggle('fullscreen');
            if (icon) {
                icon.textContent = dialog.classList.contains('fullscreen') ? '🗗' : '⛶';
            }
        }
    }
}

// Global Singleton Initialization
if (typeof window !== 'undefined') {
    window.ReadingWalkthroughEngine = ReadingWalkthroughEngine;
    window.readingWalkthroughEngine = new ReadingWalkthroughEngine();
}
