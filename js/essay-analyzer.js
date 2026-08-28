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
            essayElement.querySelectorAll('.connector-mark').forEach(span => {
                span.outerHTML = span.textContent;
            });
        } else {
            essayElement.classList.add('highlighted-connectors');
            this.highlightConnectorsInElement(essayElement);
        }
    }

    highlightConnectorsInElement(element) {
        const paragraphs = element.querySelectorAll('p, .essay-p, li');
        paragraphs.forEach(p => {
            p.innerHTML = p.innerHTML.replace(this.linkingWordsRegex, (match) => {
                return `<mark class="connector-mark">${match}</mark>`;
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
            background: #fed7aa !important;
            color: #9a3412 !important;
            font-weight: 700;
            padding: 1px 4px;
            border-radius: 4px;
            border-bottom: 2px solid #ea580c;
        }
    `;
    document.head.appendChild(style);
})();

// Global auto-instantiation
let essayAnalyzer;
window.addEventListener('DOMContentLoaded', () => {
    essayAnalyzer = new EssayAnalyzer();
});
