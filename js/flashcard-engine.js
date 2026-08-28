/**
 * Universal Flashcard & 3D Flip Card Engine (FlashcardEngine)
 * 
 * Automatically enables interactive 3D flipping for any .flashcard element:
 * <div class="flashcard">
 *     <div class="card-front">Word / Concept</div>
 *     <div class="card-back">Definition & Collocations</div>
 * </div>
 */

class FlashcardEngine {
    constructor() {
        this.init();
    }

    init() {
        this.injectStyles();
        this.bindFlipHandlers();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.id = 'flashcardStyles';
        style.textContent = `
            .flashcard {
                perspective: 1000px;
                cursor: pointer;
                user-select: none;
                min-height: 140px;
            }
            .flashcard-inner {
                position: relative;
                width: 100%;
                height: 100%;
                text-align: center;
                transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                transform-style: preserve-3d;
            }
            .flashcard.flipped .flashcard-inner {
                transform: rotateY(180deg);
            }
            .card-front, .card-back {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
                border-radius: 12px;
                padding: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                box-shadow: 0 4px 12px rgba(0,0,0,0.06);
            }
            .card-front {
                background: #ffffff;
                border: 1.5px solid var(--border-soft, #cbd5e1);
                color: var(--text-dark, #0f172a);
            }
            .card-back {
                background: #f8fafc;
                border: 1.5px solid var(--col-vocab, #059669);
                color: var(--text-body, #1e293b);
                transform: rotateY(180deg);
            }
        `;
        document.head.appendChild(style);
    }

    bindFlipHandlers() {
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.flashcard, [data-flip]');
            if (!card) return;

            // Ensure inner wrapper exists
            if (!card.querySelector('.flashcard-inner')) {
                const front = card.querySelector('.card-front') || card.children[0];
                const back = card.querySelector('.card-back') || card.children[1];
                if (front && back) {
                    const inner = document.createElement('div');
                    inner.className = 'flashcard-inner';
                    inner.appendChild(front);
                    inner.appendChild(back);
                    card.appendChild(inner);
                }
            }

            card.classList.toggle('flipped');
        });
    }
}

// Global auto-instantiation
let flashcardEngine;
window.addEventListener('DOMContentLoaded', () => {
    flashcardEngine = new FlashcardEngine();
});
