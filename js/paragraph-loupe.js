/**
 * ==========================================================================
 * PARAGRAPH FOCUS LOUPE (ParagraphLoupe)
 * Isolates and magnifies individual reading paragraphs for projector clarity
 * - Click any paragraph tag [Paragraph X] to zoom in (140% scale)
 * - Dims neighboring paragraphs for laser-focused reading analysis
 * - Keyboard shortcut: 'Z' (cycles through paragraphs) / 'Escape' to reset
 * ==========================================================================
 */

class ParagraphLoupe {
    constructor() {
        this.activePara = null;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindTags());
        } else {
            this.bindTags();
        }

        // Global shortcut 'Z' to cycle focus on active slide
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'z' || e.key === 'Z') && !e.ctrlKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                e.preventDefault();
                this.cycleNextParagraph();
            }

            if (e.key === 'Escape' && this.activePara) {
                this.clearFocus();
            }
        });
    }

    bindTags() {
        document.querySelectorAll('.reading-pane p').forEach(p => {
            const tag = p.querySelector('.para-tag');
            if (tag) {
                tag.style.cursor = 'zoom-in';
                tag.title = 'Click to focus & magnify this paragraph (Shortcut: Z)';
                tag.onclick = (e) => {
                    e.stopPropagation();
                    this.toggleFocus(p);
                };
            }
        });

        this.injectStyles();
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
        this.activePara = paraEl;

        const pane = paraEl.closest('.reading-pane');
        if (pane) {
            pane.classList.add('loupe-active');
            paraEl.classList.add('loupe-focused');
            paraEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    clearFocus() {
        if (this.activePara) {
            const pane = this.activePara.closest('.reading-pane');
            if (pane) pane.classList.remove('loupe-active');
            this.activePara.classList.remove('loupe-focused');
            this.activePara = null;
        }
    }

    cycleNextParagraph() {
        const activeSlide = document.querySelector('.slide.active');
        if (!activeSlide) return;
        const paragraphs = Array.from(activeSlide.querySelectorAll('.reading-pane p'));
        if (paragraphs.length === 0) return;

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

    injectStyles() {
        if (document.getElementById('paragraphLoupeStyles')) return;
        const style = document.createElement('style');
        style.id = 'paragraphLoupeStyles';
        style.textContent = `
            .reading-pane.loupe-active p {
                opacity: 0.28;
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            .reading-pane.loupe-active p.loupe-focused {
                opacity: 1 !important;
                transform: scale(1.04);
                transform-origin: left center;
                background: rgba(56, 189, 248, 0.08);
                border-left: 4px solid var(--col-reading, #2563eb);
                padding: 8px 12px;
                border-radius: 0 8px 8px 0;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            }
            .para-tag:hover {
                transform: scale(1.1);
                color: #ffffff;
                background: var(--col-reading, #2563eb) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Global instantiation
window.paragraphLoupe = new ParagraphLoupe();
