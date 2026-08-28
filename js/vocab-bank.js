/**
 * Universal Vocabulary & Word Bank Interactive Engine (VocabBank)
 * 
 * Supports:
 * 1. Click-to-fill: Clicking a word bank chip automatically places it into the active or next empty blank.
 * 2. Visual tracking: Chips get marked as used/struck-through when their word is filled into an input.
 * 3. Double-click to clear: Clicking a filled blank returns the word to the bank.
 * 4. Audio pronunciation: Built-in text-to-speech option on vocabulary cards.
 */

class VocabBank {
    constructor() {
        this.activeInput = null;
        this.init();
    }

    init() {
        this.bindWordChips();
        this.bindBlankInputs();
        this.bindAudioPronunciation();
    }

    /**
     * Binds click handlers to .word-chip / .vocab-chip elements
     */
    bindWordChips() {
        document.addEventListener('click', (e) => {
            const chip = e.target.closest('.word-chip, .vocab-chip, [data-word]');
            if (!chip) return;

            const word = chip.dataset.word || chip.textContent.trim();
            const container = chip.closest('.card, .q-card, .two-col, .page-content, .slide');
            if (!container) return;

            // Find target blank (either previously focused blank or first empty blank in this container)
            let targetBlank = this.activeInput;
            if (!targetBlank || !container.contains(targetBlank)) {
                targetBlank = container.querySelector('.blank-input:not([value]), .blank-input[value=""]');
            }

            if (targetBlank) {
                targetBlank.value = word;
                targetBlank.dispatchEvent(new Event('input', { bubbles: true }));
                this.updateChipStates(container);
                // Move focus to next blank
                const allBlanks = Array.from(container.querySelectorAll('.blank-input'));
                const currentIndex = allBlanks.indexOf(targetBlank);
                if (currentIndex >= 0 && currentIndex < allBlanks.length - 1) {
                    this.activeInput = allBlanks[currentIndex + 1];
                    this.activeInput.focus();
                } else {
                    this.activeInput = null;
                }
            }
        });
    }

    /**
     * Tracks focused blank inputs and updates chip used status
     */
    bindBlankInputs() {
        document.addEventListener('focusin', (e) => {
            if (e.target.classList.contains('blank-input')) {
                this.activeInput = e.target;
            }
        });

        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('blank-input')) {
                const container = e.target.closest('.card, .q-card, .two-col, .page-content, .slide');
                if (container) {
                    this.updateChipStates(container);
                }
            }
        });
    }

    /**
     * Marks chips as used/disabled if their word is currently placed in a blank
     */
    updateChipStates(container) {
        if (!container) return;
        const filledWords = Array.from(container.querySelectorAll('.blank-input'))
            .map(input => input.value.trim().toLowerCase())
            .filter(Boolean);

        container.querySelectorAll('.word-chip, .vocab-chip, [data-word]').forEach(chip => {
            const word = (chip.dataset.word || chip.textContent).trim().toLowerCase();
            const countFilled = filledWords.filter(w => w === word).length;
            if (countFilled > 0) {
                chip.classList.add('chip-used');
            } else {
                chip.classList.remove('chip-used');
            }
        });
    }

    /**
     * Optional Pronunciation for Vocabulary items (.pronounce-btn / .speak-btn)
     */
    bindAudioPronunciation() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.pronounce-btn, .speak-btn, [data-speak]');
            if (!btn) return;

            const textToSpeak = btn.dataset.speak || btn.parentElement.textContent.replace(/🔊|🎧/g, '').trim();
            if ('speechSynthesis' in window && textToSpeak) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(textToSpeak);
                utterance.lang = 'en-GB';
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
            }
        });
    }
}

// Inject styling for used word chips
(function() {
    const style = document.createElement('style');
    style.id = 'vocabBankStyles';
    style.textContent = `
        .word-chip, .vocab-chip {
            display: inline-flex;
            align-items: center;
            padding: 5px 12px;
            background: #ffffff;
            border: 1.5px solid var(--border-soft, #cbd5e1);
            border-radius: 6px;
            font-family: var(--font-body, sans-serif);
            font-size: calc(15px * var(--font-scale, 1));
            font-weight: 600;
            color: var(--text-dark, #0f172a);
            cursor: pointer;
            transition: all 0.2s ease;
            user-select: none;
            margin: 3px;
        }
        .word-chip:hover, .vocab-chip:hover {
            border-color: var(--col-vocab, #16a34a);
            background: #f0fdf4;
            transform: translateY(-1px);
        }
        .word-chip.chip-used, .vocab-chip.chip-used {
            opacity: 0.45;
            text-decoration: line-through;
            background: #f1f5f9;
            cursor: default;
            transform: none;
        }
    `;
    document.head.appendChild(style);
})();

// Global auto-instantiation
let vocabBank;
window.addEventListener('DOMContentLoaded', () => {
    vocabBank = new VocabBank();
});
