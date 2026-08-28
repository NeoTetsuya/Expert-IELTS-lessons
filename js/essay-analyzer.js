/**
 * Universal Essay Analyzer & Writing Model Tools (EssayAnalyzer)
 * 
 * Provides interactive teaching features for Task 1 & Task 2 model essays:
 * 1. Cohesive Device / Linking Word Highlighter: Highlights transition connectors on demand.
 * 2. Structure Breakdown Highlighter: Colors introduction, topic sentences, supporting data, and conclusion.
 * 3. Dynamic Word Count Counter.
 */

class EssayAnalyzer {
    constructor() {
        this.linkingWordsRegex = /\b(however|furthermore|moreover|in contrast|on the other hand|consequently|therefore|as a result|for instance|for example|in addition|although|despite|in conclusion|to sum up|due to|owing to|firstly|secondly|finally|overall|in particular)\b/gi;
        this.init();
    }

    init() {
        this.bindEssayTools();
    }

    /**
     * Toggles linking word highlights inside .essay-card / .essay-pane elements
     */
    toggleConnectors(essayElement) {
        if (!essayElement) return;
        const isHighlighted = essayElement.classList.contains('highlighted-connectors');

        if (isHighlighted) {
            essayElement.classList.remove('highlighted-connectors');
            essayElement.querySelectorAll('p, .essay-p, li').forEach(p => {
                if (p.dataset.origHtml) {
                    p.innerHTML = p.dataset.origHtml;
                    delete p.dataset.origHtml;
                }
            });
        } else {
            essayElement.classList.add('highlighted-connectors');
            this.highlightConnectorsInElement(essayElement);
        }
    }

    highlightConnectorsInElement(element) {
        const paragraphs = element.querySelectorAll('p, .essay-p, li');
        paragraphs.forEach(p => {
            if (!p.dataset.origHtml) {
                p.dataset.origHtml = p.innerHTML;
            }

            const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT, null, false);
            const textNodes = [];
            let node;
            while ((node = walker.nextNode())) {
                if (node.parentElement && !node.parentElement.classList.contains('connector-mark')) {
                    textNodes.push(node);
                }
            }

            textNodes.forEach(textNode => {
                const text = textNode.nodeValue;
                if (this.linkingWordsRegex.test(text)) {
                    this.linkingWordsRegex.lastIndex = 0;
                    const span = document.createElement('span');
                    span.innerHTML = text.replace(this.linkingWordsRegex, '<mark class="connector-mark">$1</mark>');
                    textNode.parentNode.replaceChild(span, textNode);
                }
            });
        });
    }

    /**
     * Binds control buttons with [data-essay-action="connectors|structure|count"]
     */
    bindEssayTools() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-essay-action]');
            if (!btn) return;

            const action = btn.dataset.essayAction;
            const targetId = btn.dataset.target;
            const essayEl = targetId ? document.getElementById(targetId) : btn.closest('.slide, .two-col')?.querySelector('.essay-card, .model-breakdown-card');

            if (action === 'connectors' && essayEl) {
                this.toggleConnectors(essayEl);
                btn.classList.toggle('active');
            }
        });
    }
}

// Inject styling for essay connector highlighting
(function() {
    const style = document.createElement('style');
    style.id = 'essayAnalyzerStyles';
    style.textContent = `
        mark.connector-mark {
            background: rgba(254, 240, 138, 0.88) !important;
            color: inherit !important;
            border-bottom: 2px solid #ca8a04;
            padding: 1px 4px;
            border-radius: 3px;
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
        }
    `;
    document.head.appendChild(style);
})();

// Global auto-instantiation
let essayAnalyzer;
window.addEventListener('DOMContentLoaded', () => {
    essayAnalyzer = new EssayAnalyzer();
});
