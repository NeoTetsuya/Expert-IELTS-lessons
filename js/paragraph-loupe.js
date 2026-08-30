/**
 * ==========================================================================
 * PARAGRAPH FOCUS LOUPE (ParagraphLoupe)
 * Isolates, magnifies, and illuminates reading paragraphs for classroom clarity
 * - Click any paragraph tag [Paragraph X] to zoom in & spotlight
 * - Dims neighboring paragraphs for laser-focused reading analysis
 * - Keyboard shortcut: 'Z' (cycles through paragraphs) / 'Escape' to reset
 * - Fully synced across Presenter View & Audience Display
 * ==========================================================================
 */

class ParagraphLoupe {
    constructor() {
        this.activePara = null;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindEvents());
        } else {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.injectStyles();

        // 1. Delegated click listener for all paragraph tags (works with dynamic templates)
        document.addEventListener('click', (e) => {
            const tag = e.target.closest('.para-tag');
            if (tag) {
                e.stopPropagation();
                const p = tag.closest('p') || tag.parentElement;
                if (p) {
                    this.toggleFocus(p);
                    this.notifySync();
                }
            }
        });

        // 2. Global keyboard shortcut 'Z' to cycle focus on active slide
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'z' || e.key === 'Z') && !e.ctrlKey && !e.altKey && !e.metaKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                e.preventDefault();
                this.cycleNextParagraph();
                this.notifySync();
            }

            if (e.key === 'Escape' && this.activePara) {
                this.clearFocus();
                this.notifySync();
            }
        });
    }

    /**
     * Master toggle method called by UI buttons and Presenter View
     */
    toggle() {
        this.cycleNextParagraph();
    }

    toggleFocus(paraEl) {
        if (this.activePara === paraEl) {
            this.clearFocus();
        } else {
            this.focusParagraph(paraEl);
        }
    }

    focusParagraph(paraEl) {
        this.clearFocus();
        if (!paraEl) return;

        this.activePara = paraEl;
        const pane = paraEl.closest('.reading-pane') || paraEl.closest('[data-slot="passage"]') || paraEl.parentElement;
        if (pane) {
            pane.classList.add('loupe-active');
        }
        paraEl.classList.add('loupe-focused');

        try {
            paraEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (_) {}
    }

    clearFocus() {
        if (this.activePara) {
            const pane = this.activePara.closest('.reading-pane') || this.activePara.closest('[data-slot="passage"]') || this.activePara.parentElement;
            if (pane) pane.classList.remove('loupe-active');
            this.activePara.classList.remove('loupe-focused');
            this.activePara = null;
        }

        // Also clean any orphan classes
        document.querySelectorAll('.loupe-focused').forEach(el => el.classList.remove('loupe-focused'));
        document.querySelectorAll('.loupe-active').forEach(el => el.classList.remove('loupe-active'));
    }

    getActiveSlideParagraphs() {
        // Target active slide in current document
        const activeSlide = document.querySelector('.slide.active');
        if (!activeSlide) return [];

        // 1. Prefer paragraphs with .para-tag
        let paragraphs = Array.from(activeSlide.querySelectorAll('.para-tag'))
            .map(tag => tag.closest('p') || tag.parentElement)
            .filter(Boolean);

        // 2. Fallback: all paragraphs in reading pane
        if (paragraphs.length === 0) {
            paragraphs = Array.from(activeSlide.querySelectorAll('.reading-pane p, [data-slot="passage"] p, .card p'));
        }

        // Remove duplicates
        return [...new Set(paragraphs)];
    }

    cycleNextParagraph() {
        const paragraphs = this.getActiveSlideParagraphs();
        if (paragraphs.length === 0) {
            // Also attempt inside iframe if in presenter view
            const iframe = document.getElementById('currentSlideFrame') || document.querySelector('iframe.slide-frame');
            if (iframe && iframe.contentWindow && iframe.contentWindow.paragraphLoupe) {
                iframe.contentWindow.paragraphLoupe.cycleNextParagraph();
                return;
            }
            return;
        }

        let nextIndex = 0;
        if (this.activePara) {
            const currentIndex = paragraphs.indexOf(this.activePara);
            nextIndex = (currentIndex + 1) % (paragraphs.length + 1);
        }

        if (nextIndex < paragraphs.length) {
            this.focusParagraph(paragraphs[nextIndex]);
        } else {
            this.clearFocus();
        }
    }

    notifySync(clear = false) {
        const syncEngine = window.presenterSyncEngine || window.presenterViewSync;
        if (syncEngine && typeof syncEngine.emit === 'function') {
            const paragraphs = this.getActiveSlideParagraphs();
            const paraIndex = (!clear && this.activePara) ? paragraphs.indexOf(this.activePara) : -1;
            syncEngine.emit('PARAGRAPH_LOUPE_CMD', {
                slideIndex: window.deckEngine ? window.deckEngine.currentSlide : 0,
                paraIndex,
                clear: clear || (paraIndex === -1)
            });
        }
    }

    applyRemoteSync(data) {
        if (!data) {
            this.cycleNextParagraph();
            return;
        }

        if (data.clear || data.paraIndex === -1) {
            this.clearFocus();
            return;
        }

        const paragraphs = this.getActiveSlideParagraphs();
        if (typeof data.paraIndex === 'number' && data.paraIndex >= 0 && data.paraIndex < paragraphs.length) {
            this.focusParagraph(paragraphs[data.paraIndex]);
        } else {
            this.cycleNextParagraph();
        }
    }

    injectStyles() {
        if (document.getElementById('paragraphLoupeStyles')) return;
        const style = document.createElement('style');
        style.id = 'paragraphLoupeStyles';
        style.textContent = `
            .reading-pane.loupe-active p,
            [data-slot="passage"].loupe-active p {
                opacity: 0.22 !important;
                filter: blur(0.25px);
                transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.35s ease;
            }
            .reading-pane.loupe-active p.loupe-focused,
            [data-slot="passage"].loupe-active p.loupe-focused,
            p.loupe-focused {
                opacity: 1 !important;
                filter: none !important;
                transform: scale(1.035) translateY(-2px) !important;
                transform-origin: left center;
                background: rgba(37, 99, 235, 0.08) !important;
                border-left: 5px solid var(--col-reading, #2563eb) !important;
                padding: 10px 16px !important;
                border-radius: 0 10px 10px 0 !important;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18) !important;
                z-index: 10;
                position: relative;
            }
            .para-tag {
                cursor: zoom-in !important;
                transition: transform 0.15s ease, background 0.15s ease;
            }
            .para-tag:hover {
                transform: scale(1.08);
                color: #ffffff !important;
                background: var(--col-reading, #2563eb) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Global instantiation
window.paragraphLoupe = new ParagraphLoupe();
