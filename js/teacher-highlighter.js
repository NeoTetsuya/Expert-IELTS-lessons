/**
 * ==========================================================================
 * TEACHER REAL TEXT HIGHLIGHTER ENGINE (TeacherHighlighter)
 * Interactive Text-Selection Highlighter for Classroom Presentations
 * - Directly highlights selected text in the slide with fluorescent marker tones
 * - Preserves original font styling and text legibility (no font re-coloring)
 * - Multi-color support: Fluorescent Yellow, Neon Green, Sky Cyan, Coral Pink
 * - Click any highlighted text to remove/unhighlight
 * - Keyboard shortcuts: 'H' (toggle mode), 'C' (clear all), 'Ctrl+Z' (undo)
 * ==========================================================================
 */

class TeacherHighlighter {
    constructor(deckEngine) {
        this.deckEngine = deckEngine;
        this.isActive = false;
        this.colors = [
            { name: 'Yellow', bg: 'rgba(254, 240, 138, 0.85)', hex: '#facc15', border: '#ca8a04', label: '🟡' },
            { name: 'Green',  bg: 'rgba(187, 247, 208, 0.85)', hex: '#4ade80', border: '#16a34a', label: '🟢' },
            { name: 'Cyan',   bg: 'rgba(186, 230, 253, 0.85)', hex: '#38bdf8', border: '#0284c7', label: '🔵' },
            { name: 'Pink',   bg: 'rgba(251, 207, 232, 0.85)', hex: '#f472b6', border: '#db2777', label: '🌸' }
        ];
        this.currentColorIndex = 0;
        this.history = []; // Array of arrays of created <mark> elements

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindEvents();
                this.setupSyncListeners();
            });
        } else {
            this.bindEvents();
            this.setupSyncListeners();
        }
        this.injectStyles();
    }

    setupSyncListeners() {
        if (!window.presenterSyncEngine) return;

        window.presenterSyncEngine.on('HIGHLIGHTER_STATE', (data) => {
            if (data && typeof data.active === 'boolean' && this.isActive !== data.active) {
                this.toggle(false);
            }
            if (data && typeof data.colorIndex === 'number') {
                this.setColor(data.colorIndex, false);
            }
        });

        window.presenterSyncEngine.on('HIGHLIGHTER_COLOR', (data) => {
            if (data && typeof data.colorIndex === 'number') {
                this.setColor(data.colorIndex, false);
            }
        });

        window.presenterSyncEngine.on('HIGHLIGHTER_ADD', (data) => {
            if (data && (data.chunks || data.targetText)) {
                this.applyRemoteHighlight(data);
            }
        });

        window.presenterSyncEngine.on('HIGHLIGHTER_REMOVE', (data) => {
            if (data && data.text) {
                const targetSlide = (window.deckEngine && window.deckEngine.slides && window.deckEngine.slides[data.slideIndex]) || document.querySelector('.slide.active');
                const previewClone = document.querySelector('.slide.preview-clone');
                [targetSlide, previewClone, document].filter(Boolean).forEach(root => {
                    root.querySelectorAll('.teacher-text-highlight').forEach(mark => {
                        if (mark.textContent === data.text && mark.parentNode) {
                            const textNode = document.createTextNode(mark.textContent);
                            const parent = mark.parentNode;
                            parent.replaceChild(textNode, mark);
                            try { parent.normalize(); } catch(e) {}
                        }
                    });
                });
            }
        });

        window.presenterSyncEngine.on('HIGHLIGHTER_UNDO', (data) => {
            if (this.history.length > 0) {
                const lastBatch = this.history.pop();
                lastBatch.forEach(mark => this.removeHighlight(mark, false));
            } else if (data && Array.isArray(data.removedTexts)) {
                const targetSlide = (window.deckEngine && window.deckEngine.slides && window.deckEngine.slides[data.slideIndex]) || document.querySelector('.slide.active');
                const previewClone = document.querySelector('.slide.preview-clone');
                [targetSlide, previewClone, document].filter(Boolean).forEach(root => {
                    root.querySelectorAll('.teacher-text-highlight').forEach(mark => {
                        if (data.removedTexts.includes(mark.textContent) && mark.parentNode) {
                            const textNode = document.createTextNode(mark.textContent);
                            const parent = mark.parentNode;
                            parent.replaceChild(textNode, mark);
                            try { parent.normalize(); } catch(e) {}
                        }
                    });
                });
            }
        });

        window.presenterSyncEngine.on('HIGHLIGHTER_CLEAR', () => {
            this.clear(false);
        });
    }

    applyRemoteHighlight(data) {
        const activeSlide = (window.deckEngine && window.deckEngine.slides && window.deckEngine.slides[data.slideIndex]) || document.querySelector('.slide.active');
        const previewClone = document.querySelector('.slide.preview-clone');
        const roots = [activeSlide, previewClone].filter(Boolean);

        const colorObj = {
            name: data.colorName || 'Yellow',
            bg: data.bg || 'rgba(254, 240, 138, 0.85)',
            border: data.border || '#ca8a04'
        };

        const targetChunks = (Array.isArray(data.chunks) && data.chunks.length > 0)
            ? data.chunks
            : (data.targetText ? [data.targetText] : []);

        const createdMarks = [];

        roots.forEach(root => {
            targetChunks.forEach(chunk => {
                if (!chunk || !chunk.trim()) return;

                const treeWalker = document.createTreeWalker(
                    root,
                    NodeFilter.SHOW_TEXT,
                    {
                        acceptNode: (node) => {
                            if (!node.nodeValue || !node.nodeValue.includes(chunk)) return NodeFilter.FILTER_REJECT;
                            if (node.parentElement && node.parentElement.closest('.presentation-tools-hud, .tool-modal, .presenter-notes-drawer, .canva-presenter-cockpit, .highlighter-palette')) {
                                return NodeFilter.FILTER_REJECT;
                            }
                            if (node.parentElement && node.parentElement.classList.contains('teacher-text-highlight')) {
                                return NodeFilter.FILTER_REJECT;
                            }
                            return NodeFilter.FILTER_ACCEPT;
                        }
                    }
                );

                let textNode = treeWalker.nextNode();
                while (textNode) {
                    const text = textNode.nodeValue;
                    const idx = text.indexOf(chunk);
                    if (idx !== -1) {
                        const beforeText = text.substring(0, idx);
                        const afterText = text.substring(idx + chunk.length);

                        const mark = document.createElement('mark');
                        mark.className = 'teacher-text-highlight';
                        mark.dataset.colorName = colorObj.name;
                        mark.style.backgroundColor = colorObj.bg;
                        mark.style.borderColor = colorObj.border;
                        mark.textContent = chunk;
                        mark.title = 'Click to unhighlight';

                        mark.addEventListener('click', (e) => {
                            e.stopPropagation();
                            this.removeHighlight(mark, true);
                        });

                        const parent = textNode.parentNode;
                        if (parent) {
                            const fragment = document.createDocumentFragment();
                            if (beforeText) fragment.appendChild(document.createTextNode(beforeText));
                            fragment.appendChild(mark);
                            if (afterText) fragment.appendChild(document.createTextNode(afterText));

                            parent.replaceChild(fragment, textNode);
                            createdMarks.push(mark);
                        }
                        break;
                    }
                    textNode = treeWalker.nextNode();
                }
            });
        });

        if (createdMarks.length > 0) {
            this.history.push(createdMarks);
        }
    }

    bindEvents() {
        // Highlight on mouseup when active and text is selected
        document.addEventListener('mouseup', (e) => {
            if (!this.isActive) return;
            // Avoid triggering when clicking inside HUD controls or modals
            if (e.target.closest('#presentationToolsHUD, .tool-modal, .highlighter-palette, .notes-header, .cp-header, .cp-notes-col')) return;

            setTimeout(() => {
                const selection = window.getSelection();
                if (selection && !selection.isCollapsed && selection.toString().trim().length > 0) {
                    this.highlightSelection(this.colors[this.currentColorIndex]);
                }
            }, 10);
        });

        // Global shortcuts
        document.addEventListener('keydown', (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable) return;

            // 'H' key toggles highlighter mode
            if ((e.key === 'h' || e.key === 'H') && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                this.toggle();
            }

            // 'C' key clear is handled authoritatively by presentation-tools.js which calls
            // both clearCanvas() and teacherHighlighter.clear() — no duplicate handler needed here.

            // 'Ctrl + Z' undoes last highlight
            if (e.ctrlKey && (e.key === 'z' || e.key === 'Z') && this.isActive) {
                e.preventDefault();
                this.undo();
            }
        });
    }

    toggle(broadcast = true) {
        this.isActive = !this.isActive;
        document.body.classList.toggle('highlighter-mode-active', this.isActive);

        const btn = document.getElementById('toolHighlightBtn');
        if (btn) btn.classList.toggle('active', this.isActive);

        const cpBtn = document.getElementById('btnCpHighlighter');
        if (cpBtn) cpBtn.classList.toggle('active', this.isActive);

        // Note: .cp-mode-btn bar state is managed exclusively by PresenterViewUI.setToolMode()
        // to avoid desync. Do NOT toggle modeBtnHighlighter here.

        const palette = document.getElementById('highlighterPalette');
        if (palette) palette.style.display = this.isActive ? 'flex' : 'none';

        if (this.isActive && window.deckEngine) {
            window.deckEngine.showToastNotification(`🖍️ Text Highlighter: ${this.colors[this.currentColorIndex].name} (Select text to highlight)`);
        }

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('HIGHLIGHTER_STATE', { active: this.isActive, colorIndex: this.currentColorIndex });
        }
    }

    setColor(index, broadcast = true) {
        if (index >= 0 && index < this.colors.length) {
            this.currentColorIndex = index;
            document.querySelectorAll('.highlighter-color-btn').forEach((btn, i) => {
                btn.classList.toggle('active', i === index);
            });
            if (window.deckEngine) {
                window.deckEngine.showToastNotification(`🖍️ Color: ${this.colors[index].name}`);
            }
            if (broadcast && window.presenterSyncEngine) {
                window.presenterSyncEngine.emit('HIGHLIGHTER_COLOR', { colorIndex: index });
            }
        }
    }

    highlightSelection(colorObj, broadcast = true) {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const selectedText = selection.toString().trim();
        if (!selectedText) return;

        const commonAncestor = range.commonAncestorContainer;
        const rootElement = commonAncestor.nodeType === Node.ELEMENT_NODE ? commonAncestor : commonAncestor.parentNode;

        // Skip non-content UI
        if (rootElement.closest('.presentation-tools-hud, .tool-modal, .presenter-notes-drawer, .cp-header, .cp-notes-col')) {
            return;
        }

        const treeWalker = document.createTreeWalker(
            rootElement,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                    try {
                        if (range.intersectsNode(node)) {
                            return NodeFilter.FILTER_ACCEPT;
                        }
                    } catch(err) {}
                    return NodeFilter.FILTER_REJECT;
                }
            }
        );

        const textNodes = [];
        let currentNode = treeWalker.nextNode();
        while (currentNode) {
            textNodes.push(currentNode);
            currentNode = treeWalker.nextNode();
        }

        if (textNodes.length === 0 && commonAncestor.nodeType === Node.TEXT_NODE) {
            textNodes.push(commonAncestor);
        }

        const createdMarks = [];
        const chunks = [];

        textNodes.forEach(textNode => {
            const isStart = (textNode === range.startContainer);
            const isEnd = (textNode === range.endContainer);
            const startOffset = isStart ? range.startOffset : 0;
            const endOffset = isEnd ? range.endOffset : textNode.nodeValue.length;

            if (startOffset >= endOffset) return;

            const text = textNode.nodeValue;
            const targetText = text.substring(startOffset, endOffset);
            if (!targetText.trim()) return;

            chunks.push(targetText);

            const beforeText = text.substring(0, startOffset);
            const afterText = text.substring(endOffset);

            const mark = document.createElement('mark');
            mark.className = 'teacher-text-highlight';
            mark.dataset.colorName = colorObj.name;
            mark.style.backgroundColor = colorObj.bg;
            mark.style.borderColor = colorObj.border;
            mark.textContent = targetText;
            mark.title = 'Click to unhighlight';

            mark.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeHighlight(mark, true);
            });

            const parent = textNode.parentNode;
            if (!parent) return;

            const fragment = document.createDocumentFragment();
            if (beforeText) fragment.appendChild(document.createTextNode(beforeText));
            fragment.appendChild(mark);
            if (afterText) fragment.appendChild(document.createTextNode(afterText));

            parent.replaceChild(fragment, textNode);
            createdMarks.push(mark);
        });

        selection.removeAllRanges();

        if (createdMarks.length > 0) {
            this.history.push(createdMarks);
        }

        if (broadcast && window.presenterSyncEngine) {
            const slideIndex = window.deckEngine ? window.deckEngine.currentSlide : 0;
            window.presenterSyncEngine.emit('HIGHLIGHTER_ADD', {
                slideIndex,
                targetText: selectedText,
                chunks: chunks,
                colorName: colorObj.name,
                bg: colorObj.bg,
                border: colorObj.border
            });
        }
    }

    removeHighlight(mark, broadcast = true) {
        if (!mark || !mark.parentNode) return;
        const text = mark.textContent;
        const colorName = mark.dataset.colorName;
        const parent = mark.parentNode;
        const textNode = document.createTextNode(text);
        parent.replaceChild(textNode, mark);
        try { parent.normalize(); } catch(e) {}

        if (broadcast && window.presenterSyncEngine) {
            const slideIndex = window.deckEngine ? window.deckEngine.currentSlide : 0;
            window.presenterSyncEngine.emit('HIGHLIGHTER_REMOVE', { text, colorName, slideIndex });
        }
    }

    undo(broadcast = true) {
        let removedTexts = [];
        if (this.history.length > 0) {
            const lastBatch = this.history.pop();
            lastBatch.forEach(mark => {
                if (mark && mark.parentNode) {
                    removedTexts.push(mark.textContent);
                    const textNode = document.createTextNode(mark.textContent);
                    const parent = mark.parentNode;
                    parent.replaceChild(textNode, mark);
                    try { parent.normalize(); } catch(e) {}
                }
            });
            if (window.deckEngine) {
                window.deckEngine.showToastNotification('↩️ Undid highlight');
            }
        }
        if (broadcast && window.presenterSyncEngine) {
            const slideIndex = window.deckEngine ? window.deckEngine.currentSlide : 0;
            window.presenterSyncEngine.emit('HIGHLIGHTER_UNDO', { slideIndex, removedTexts });
        }
    }

    clear(broadcast = true) {
        const highlights = document.querySelectorAll('.teacher-text-highlight');
        highlights.forEach(mark => {
            if (mark.parentNode) {
                const textNode = document.createTextNode(mark.textContent);
                const parent = mark.parentNode;
                parent.replaceChild(textNode, mark);
            }
        });
        document.querySelectorAll('.slide, .preview-clone, .page-content').forEach(el => {
            try { el.normalize(); } catch(e) {}
        });
        this.history = [];
        if (window.deckEngine) {
            window.deckEngine.showToastNotification('🗑️ Cleared highlights');
        }
        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('HIGHLIGHTER_CLEAR', {});
        }
    }

    injectStyles() {
        if (document.getElementById('teacherHighlighterStyles')) return;
        const style = document.createElement('style');
        style.id = 'teacherHighlighterStyles';
        style.textContent = `
            body.highlighter-mode-active {
                cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23facc15' stroke='%23000' stroke-width='1.5'%3E%3Cpath d='m9 11-6 6v3h3l6-6'/%3E%3Cpath d='m22 7-3-3a2.83 2.83 0 0 0-4 0l-4 4 7 7 4-4a2.83 2.83 0 0 0 0-4Z'/%3E%3C/svg%3E") 2 22, text !important;
            }
            body.highlighter-mode-active * {
                user-select: text !important;
            }
            mark.teacher-text-highlight {
                color: inherit !important;
                background-color: rgba(254, 240, 138, 0.85);
                border-bottom: 2px solid #ca8a04;
                border-radius: 3px;
                padding: 1px 3px;
                cursor: pointer;
                transition: background-color 0.2s ease, opacity 0.2s ease;
                box-decoration-break: clone;
                -webkit-box-decoration-break: clone;
            }
            mark.teacher-text-highlight:hover {
                filter: brightness(0.92);
                outline: 1px dashed rgba(0, 0, 0, 0.3);
            }
            .highlighter-palette {
                position: absolute;
                top: 52px;
                right: 70px;
                background: rgba(15, 23, 42, 0.94);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.16);
                border-radius: 24px;
                padding: 6px 12px;
                display: flex;
                align-items: center;
                gap: 8px;
                z-index: 100000;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
                animation: toolFadeIn 0.2s ease;
            }
            .highlighter-color-btn {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 2px solid transparent;
                cursor: pointer;
                transition: transform 0.15s ease, border-color 0.15s ease;
            }
            .highlighter-color-btn:hover { transform: scale(1.15); }
            .highlighter-color-btn.active {
                border-color: #ffffff;
                box-shadow: 0 0 8px currentColor;
                transform: scale(1.12);
            }
            .highlighter-divider {
                width: 1px;
                height: 18px;
                background: rgba(255, 255, 255, 0.2);
            }
            .highlighter-tool-btn {
                background: transparent;
                border: none;
                color: #cbd5e1;
                font-size: 12px;
                font-weight: 700;
                padding: 3px 6px;
                border-radius: 6px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            .highlighter-tool-btn:hover {
                background: rgba(255, 255, 255, 0.15);
                color: #fff;
            }
        `;
        document.head.appendChild(style);
    }
}

// Global instantiation
window.teacherHighlighter = new TeacherHighlighter();
